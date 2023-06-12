
import { storage } from "@/appwrite";
import { getContacts } from "@/utils/getContacts";
import { fetchActiveSession, fetchNominee, postNominee, updateNominee } from "@/utils/serverApi";
import uploadImage from "@/utils/uploadImage";
import { ID, InputFile } from "node-appwrite";


export async function POST(request: Request) {
 
  try {
    const formData  = await request.formData()
    const body:any = Object.fromEntries(formData)
    console.log(body)
    //const body = await request.json();
    
    delete body.photo
    delete body.cv
    delete body.$id
    delete body.g1_verified
    delete body.g2_verified

    // Checks & Validations [ Guarantors - assigned, Applicants & Guarantors registered ]

    // Fetch CGPA

    // Fetch Helper Data
    const session = await fetchActiveSession();
    const applicant = await fetchNominee(body.serial);
    
    // Upload Files
    // let photo,cv;
    // if(body.photo){
    //   const file = await InputFile.fromBlob(body.photo, body.photo.name)
    //   console.log(file)
    //   const fileUploaded = await uploadImage(file)
    //   //const fileUploaded = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, ID.unique, InputFile.fromBlob(body.photo, body.photo.name));
    //   console.log(fileUploaded)
    //   console.log("PHOTO: ", fileUploaded)
    //     if(fileUploaded) photo = { bucketId: fileUploaded.bucketId, fileId: fileUploaded.$id }
    // }

    // if(body?.cv){
    //     const fileUploaded = await uploadImage(InputFile.fromBlob(body?.cv, `${body.serial}.pdf`))
    //     console.log("CV: ", fileUploaded)
    //     if(fileUploaded) cv = { bucketId: fileUploaded.bucketId, fileId: fileUploaded.$id }
    // }

    // Condition Data & Insert
    const data = {
      ...body,
      sessionId: session?.documents[0].$id,
      ...(body.consent && { consent: JSON.parse(body.consent)}),
      ...(body.form_submit && { form_submit: JSON.parse(body.form_submit)}),
        // ...(photo && { photo: JSON.stringify(photo)}),
        //     ...(cv && { cv: JSON.stringify(cv)})
    }
    console.log(data)

    let resp
    if(applicant.total > 0){
      resp = await updateNominee(applicant?.documents[0]?.$id, data);
    } else {
      resp = await postNominee(data);
      
      // Send SMS Reminders - [ Guarantors verification, Applicant Success Notice ]
     
    } 
    const broadcast = await getContacts(data)
    return new Response(JSON.stringify({ success: true, data: resp }), { status: 200 });

  } catch (error: any) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, data: null, msg: error.message }), { status: 404 });
  }
}




export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const action: any = searchParams.get("action")
    const ua: any = searchParams.get("ua")
    const tp: any = searchParams.get("tp")

    if(action == 'verify'){
        const applicant:any = await fetchNominee(ua);
        const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(applicant?.documents[0]?.aspirant_regno)}`)
        const asp = await asp_res.json()
        const user = asp?.data[0]?.user;
        
        const ups = await updateNominee(applicant.documents[0].$id, { [`${tp}_verified`] : true });
        if(ups) return new Response(JSON.stringify({ message: `Thank you for Approving and Endorsement Aspirant, ${user?.name} !` }), { status: 200 });
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


