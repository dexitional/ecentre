
import { options } from "@/options";
import { getContacts } from "@/utils/getContacts";
import { getGroup } from "@/utils/getGroup";
import { getHelper, getHelperWithPost } from "@/utils/getHelper";
import { getUserDetail } from "@/utils/getUserDetail";
import { deleteNominee, fetchActiveSession, fetchCgpa, fetchNominee, fetchNomineeOffset, fetchNomineeOffsetById, postNominee, updateNominee } from "@/utils/serverApi";
import { getServerSession } from "next-auth";


export async function POST(request: Request) {
 
  try {
    const formData  = await request.formData()
    const body:any = Object.fromEntries(formData)
    // const body = await request.json();
    
    //delete body.photo
    //delete body.cv
    delete body.$id
    delete body.g1_verified
    delete body.g2_verified

    // Checks & Validations [ Guarantors - assigned, Applicants & Guarantors registered ]

    // Fetch CGPA
    const cgpa = await fetchCgpa(body?.aspirant_regno)
    // if(cgpa && ((cgpa.toString().toLowerCase() == 'pass') || (parseFloat(cgpa) >= 2.5))){ 
       
        // Fetch Helper Data
        const session = await fetchActiveSession();
        const applicant = await fetchNominee(body.serial);
        

        // Condition Data & Insert
        const data = {
          ...body,
          sessionId: session?.documents[0].$id,
          ...(body.consent && { consent: JSON.parse(body.consent)}),
          ...(body.form_submit && { form_submit: JSON.parse(body.form_submit)}),
          ...({ cgpa: cgpa.toString() }),
        }
      
        let resp
        if(applicant.total > 0){
          resp = await updateNominee(applicant?.documents[0]?.$id, data);
        } else {
          resp = await postNominee(data);
        } 

        if(data.form_submit) await getContacts(data); // Send Acknowledgement only after final submission
        return new Response(JSON.stringify({ success: true, data: resp }), { status: 200 });

    // } else {
    //     return new Response(JSON.stringify({ success: false, data: null, msg: 'CGPA dont meet requirement!' }), { status: 404 });
    // }

  } catch (error: any) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, data: null, msg: error.message }), { status: 404 });
  }
}




export async function GET(request: Request) {
    
    const session:any = await getServerSession(options)
    const { searchParams } = new URL(request.url);
    const action: any = searchParams.get("action")
    

    if(action == 'verify'){
        const ua: any = searchParams.get("ua")
        const tp: any = searchParams.get("tp")
        const applicant:any = await fetchNominee(ua);
        const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(applicant?.documents[0]?.aspirant_regno)}`)
        const asp = await asp_res.json()
        const user = asp?.data[0]?.user;
        
        const ups = await updateNominee(applicant.documents[0].$id, { [`${tp}_verified`] : true });
        if(ups) return new Response(JSON.stringify({ message: `Thank you for Approving and Endorsement Aspirant, ${user?.name} !` }), { status: 200 });
    }

    if(action == 'load'){
        const search: any = searchParams.get("search")
        const page: any = searchParams.get("page")
        const limit: any = searchParams.get("limit")
        
        const userDetail:any = await getUserDetail(session?.user?.email);
        const group:any = userDetail?.groupId ? await getGroup(userDetail?.groupId) : {};

        const dt = userDetail?.groupId ? await fetchNomineeOffsetById(userDetail?.groupId,0) : await fetchNomineeOffset(search,page,limit);
      
        const data:any = await Promise.all(dt?.documents?.map(async (row: any) => {
            const { position, session } = await getHelperWithPost(row.sessionId, row.positionId);
            return { ...row, position, session }
        }))

        if(data) return new Response(JSON.stringify({ success: true, data }), { status: 200 });
    }

    if(action == 'delete'){
      const serial: any = searchParams.get("serial")
      const applicant:any = await fetchNominee(serial);
      const del = await deleteNominee(applicant.documents[0].$id)
      console.log(del)
      if(del) return new Response(JSON.stringify({ success: true, data:null, message: `Nomination Form Deleted!` }), { status: 200 });
    }

  // ?action=form&serial=test ( Fetch for form population )
  // ?action=print&serial=test ( Fetch for Printview with 3rd party endpoints )
  
  // Fetch Application Data ( form, print )
  // Fetch Aspirant, Mate, Gurantor 1  & 2 - Biodata ( print )
    return new Response(JSON.stringify({ action }), { status: 200 });
}

export async function DELETE(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  return new Response(JSON.stringify({ id }), { status: 200 });
}

export async function PATCH(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  const body = request.body;
  return new Response(JSON.stringify({ id,body }), { status: 200 });
}


