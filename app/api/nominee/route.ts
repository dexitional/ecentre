
import { options } from "@/options";
import { getContacts } from "@/utils/getContacts";
import { getEndorserLink } from "@/utils/getEndorserLink";
import { getGroup } from "@/utils/getGroup";
import { getHelper, getHelperWithPost } from "@/utils/getHelper";
import { getUserDetail } from "@/utils/getUserDetail";
import { getVerification } from "@/utils/getVerification";
import { sendMessageByRegNo } from "@/utils/sendMessageByRegNo";
import { deleteNominee, fetchActiveSession, fetchCgpa, fetchNominee, fetchNomineeOffset, fetchNomineeOffsetById, fetchNominees, fetchNomineesDisplay, postNominee, updateNominee } from "@/utils/serverApi";
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
      
        let resp;
        if(applicant.total > 0){
          resp = await updateNominee(applicant?.documents[0]?.$id, data);
        
        } else {
           data.g1_verified = false;
           data.g2_verified = false;
          
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
    
    console.log(action)

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

    else if(action == 'load'){
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

    else if(action == 'delete'){
      const serial: any = searchParams.get("serial")
      const applicant:any = await fetchNominee(serial);
      const del = await deleteNominee(applicant.documents[0].$id)
      return new Response(JSON.stringify({ success: true, data:null, message: `Nomination Form Deleted!` }), { status: 200 });
    }

    else if(action == 'remind'){
      const groupId: any = searchParams.get("groupId")
      const noms:any = groupId ? await fetchNomineesDisplay(groupId) : await fetchNominees(); // Get All Nominees
      console.log("NOMS: ",noms.total)
      if(noms.total > 0) {
         let count = 0;
         for(const nom of noms.documents){
           if(nom.photo && nom.cv && nom.g1_verified && nom.g2_verified) continue;
           
           let message = `Hi aspirant! please`
               message += !nom.photo ? `, upload flyer`: ``
               message += !nom.cv ? `, upload CV`: ``
               message += !nom.g1_verified ? `, follow-up on 1st Guarantor`: ``
               message += !nom.g2_verified ? `, follow-up on 2nd Guarantor`: ``
               message += ` to complete nomination.`
               console.log("ASPIRANT: ",nom.aspirant_regno, " MESSAGE: ", message)
               const ss = await sendMessageByRegNo(nom.aspirant_regno,message)
               const sm = await getEndorserLink(nom);
        
               //const ups = await updateNominee(nom.$id, { form_submit: false })
               if(ss) count += 1;
         }
         return new Response(JSON.stringify({ success: true, data:count, message: `Reminders sent!` }), { status: 200 });
      }  return new Response(JSON.stringify({ success: true, data:null, message: `Reminders sent!` }), { status: 200 });
    }

    else if(action == 'finalize'){
      const groupId: any = searchParams.get("groupId")
      const noms:any = groupId ? await fetchNomineesDisplay(groupId) : await fetchNominees(); // Get All Nominees
      if(noms.total > 0) {
         let count = 0;
         for(const nom of noms.documents){
           if(nom.g1_verified && nom.g2_verified) continue;
           
           let message = `Hi aspirant! please`
               message += !nom.g1_verified ? `, 1st endorsement is done`: ``
               message += !nom.g2_verified ? `, 2nd endorsement is done`: ``
               message += `.`
               console.log("ASPIRANT: ",nom.aspirant_regno, " MESSAGE: ", message)
              // const ss = await sendMessageByRegNo(nom.aspirant_regno,message)
               //const sm = await getEndorserLink(nom);
               const ups = await updateNominee(nom.$id, { form_submit: true, g1_verified: true, g2_verified: true })
               //if(ss) count += 1;
               console.log(ups)
         }
         return new Response(JSON.stringify({ success: true, data:count, message: `Form Finalized!` }), { status: 200 });
      }  return new Response(JSON.stringify({ success: true, data:null, message: `Reminders sent!` }), { status: 200 });
    }
    
    else return new Response(JSON.stringify({ action }), { status: 200 });
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


