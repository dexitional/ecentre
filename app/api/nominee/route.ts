
import { storage } from "@/appwrite";
import { fetchActiveSession, fetchNominee, postNominee, updateNominee } from "@/utils/serverApi";
import uploadImage from "@/utils/uploadImage";
import { ID, InputFile } from "node-appwrite";



export const config = {
    api: {
      bodyParser: false,
    },
}

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
      // /api/verify?ua=413292&tp=g1

    } 

    return new Response(JSON.stringify({ success: true, data: resp }), { status: 200 });

  } catch (error: any) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, data: null, msg: error.message }), { status: 404 });
  }
}








export async function GET(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  // ?action=form&serial=test ( Fetch for form population )
  // ?action=print&serial=test ( Fetch for Printview with 3rd party endpoints )
  
  // Fetch Application Data ( form, print )
  // Fetch Aspirant, Mate, Gurantor 1  & 2 - Biodata ( print )
  return new Response(JSON.stringify({ id }), { status: 200 });
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


