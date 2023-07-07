
import { options } from "@/options";
import {  fetchNominee, updateNominee } from "@/utils/serverApi";
import { getServerSession } from "next-auth";
import { Queue } from 'async-await-queue';


export async function POST(request: Request) {
  //const queue = new Queue(2, 100);
  //const priority = -1;
 
  try {
        const formData  = await request.formData()
        const body:any = Object.fromEntries(formData)
        console.log(body)
        let ups_count = 0;
        
        for(let i = 0; i < body.count; i++){
          const id = body[`id_${i}`];
          const ballot_no = body[`ballot_no_${i}`] && body[`ballot_no_${i}`] != '' ? parseInt(body[`ballot_no_${i}`]) : null;
          const vetscore = body[`vetscore_${i}`] && body[`vetscore_${i}`] != '' ? parseFloat(body[`vetscore_${i}`]) : null;
          // const is_candidate = body[`is_candidate_${i}`] && body[`is_candidate_${i}`]?.toLowerCase() == 'on' ? true: false;
          const is_candidate = JSON.parse(body[`is_candidate_${i}`])
          const dt = {
             ballot_no,
             vetscore,
             is_candidate
          }
          if(id){
              console.log("COUNT: ",i,", ID:",id,", DATA: ",dt)
              let resp = await updateNominee(id, dt);
              console.log("RESULTS: ",resp)
              if(resp) ups_count += 1;
          }
        } console.log(ups_count)
        return new Response(JSON.stringify({ success: true, data: ups_count }), { status: 200 });

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


