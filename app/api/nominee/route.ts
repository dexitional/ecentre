import { fetchActiveSession, fetchNominee, postNominee, updateNominee } from "@/utils/serverApi";

export async function GET(request: Request, { params}:{ params: { id: string }} ) {
  const id = params.id;
  // ?action=form&serial=test ( Fetch for form population )
  // ?action=print&serial=test ( Fetch for Printview with 3rd party endpoints )
  
  // Fetch Application Data ( form, print )
  // Fetch Aspirant, Mate, Gurantor 1  & 2 - Biodata ( print )
  return new Response(JSON.stringify({ id }), { status: 200 });
}



export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body)
    delete body.photo
    delete body.cv
    delete body.$id
    // Fetch CGPA
    // Fetch Helper Data
    const session = await fetchActiveSession();
    const applicant = await fetchNominee(body.serial);
    // Format Data & Insert
    const data = {
      ...body,
      sessionId: session?.documents[0].$id
    }

    let resp
    if(applicant.total > 0){
      console.log("TEST: ", applicant.total)
      resp = await updateNominee(applicant?.documents[0]?.$id,data);
    } else {
      resp = await postNominee(data);
    } 
    return new Response(JSON.stringify({ success: true, data: resp }), { status: 200 });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, data: null, msg: error.message }), { status: 404 });
  }
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


