
import { options } from "@/options";
import { addSenderId } from "@/utils/addSenderId";
import { flySMS } from "@/utils/flySMS";
import { deleteNominee, fetchActiveSession, fetchCgpa, fetchNominee, fetchNomineeOffset, fetchNomineeOffsetById, fetchNominees, fetchNomineesDisplay, postNominee, updateNominee } from "@/utils/serverApi";
import { getServerSession } from "next-auth";


export async function POST(request: Request) {
 
  try {
        //const formData  = await request.formData()
        //const body:any = Object.fromEntries(formData)
        const body = await request.json();
        
        const serial: any = body.serial
        const sgroup: any = body.sgroup
        const message: any = body.message
        const estimated_credit: any = body.credit
        // Get Current SMS Credit & Campaign No
        const applicant:any = await fetchNominee(serial);
        const { credit, sender_id,campaigns } = applicant.documents[0]
        console.log(message,sender_id,sgroup)
        
        if(parseInt(estimated_credit) > (credit || 0) ) 
           return new Response(JSON.stringify({ success: false, data:null, message: `You don't have enough balance!` }), { status: 401 });
        // Calculate & Send SMS
        const sms_res = await flySMS(message,sender_id,sgroup) // return { receipient: [], credits_used: 5000 } 
        if(sms_res.success){
           // Update New SMS Credit Balance & Campaign No
           const ups = await updateNominee(applicant.documents[0].$id, { credit: ((credit || 0) - parseInt(sms_res.credit_used)), campaigns: campaigns+1, })
           // Store SMS History By Serial
           return new Response(JSON.stringify({ success: true, data:ups, message: `Message sent!` }), { status: 200 });
        }
        
  } catch (error: any) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, data: null, msg: error.message }), { status: 404 });
  }
}




export async function GET(request: Request) {
    
    const session:any = await getServerSession(options)
    const { searchParams } = new URL(request.url);
    const action: any = searchParams.get("action")
    
    if(action == 'updatesenderid'){
      const serial: any = searchParams.get("serial")
      const sender_id: any = searchParams.get("sender_id")
      const applicant:any = await fetchNominee(serial);
      // Update Sender ID
      const resp = await addSenderId(sender_id);
      if(resp.status){
        const ups = await updateNominee(applicant.documents[0].$id, { sender_id })
        if(ups) return new Response(JSON.stringify({ message: `Sender ID updated for ${serial}!` }), { status: 200 });
      }
      return new Response(JSON.stringify({ message: `Sender ID update failed!` }), { status: 401 });
    }

    else if(action == 'updatecredit'){
      const serial: any = searchParams.get("serial")
      const credit: any = searchParams.get("credit")
      const applicant:any = await fetchNominee(serial);
      console.log(applicant);
      if(applicant.total > 0){
        // Update SMS Credit Balance & Campaign No
        const ups = await updateNominee(applicant.documents[0].$id, { credit: ((applicant.documents[0].credit || 0) + parseInt(credit)) })
        if(ups) return new Response(JSON.stringify({ success:true, message: `Candidate SMS Credit of ${credit} added!` }), { status: 200 });
      }
      return new Response(JSON.stringify({ success: false, data: null, message: "Invalid Request" }), { status: 200 });
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


