import { getVerification } from "@/utils/getVerification";
import { sendMessageByRegNo } from "@/utils/sendMessageByRegNo";
import { sendPhotoReminder } from "@/utils/sendPhotoReminder";
import { fetchActiveSession, fetchCgpa, fetchNominee, fetchNomineeOffset, fetchNominees, fetchVoucher, fetchVoucherById, postVoucher, updateNominee, updateVoucher } from "@/utils/serverApi";
import { sms } from "@/utils/sms";
import { customAlphabet } from 'nanoid'
const serialGen = customAlphabet('abcdefghijklmnopqrstuvwxyz',8)
const pinGen = customAlphabet('1234567890', 4)


export async function POST(request: Request) {
  try {
     const body = await request.json()
    //const body = serialGen()
    console.log(body);
    const { quantity, groupId } = body
    const session = await fetchActiveSession();
    const sessionId =  session?.documents[0]?.$id;
    console.log()
    
    let j = 0;
    for(let i = 0; i < +quantity; i++){
        
      const serial = serialGen()
      const pin = pinGen()
      const data = {
          serial,
          pin,
          groupId,
          sessionId,
          sold: false,
          visible: true
      }
      console.log(data)
      const resp = await postVoucher(data);
      if(resp) j++
    }

    return new Response(JSON.stringify({ success: true, data: null }), { status: 200 });

  } catch (error: any) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, data: null, msg: error.message }), { status: 404 });
  }
}


export async function GET(request: Request) {
 
  const { searchParams } = new URL(request.url);
  const action: any = searchParams.get("action")
  const id: any = searchParams.get("id")
  const phone: any = searchParams.get("phone")
  
  try {
    if(action == 'sell'){
        const ups:any = await updateVoucher(id, { sold: true, buyer_phone: phone });
        console.log(ups)
        if(ups){ 
          // Send SMS to Buyer
          const message = `Hi! Your Voucher, SERIAL: ${ups.serial} , PIN: ${ups.pin} , Please follow link to https://ec.ucc.edu.gh to file nomination`
          const sms_res = await sms(phone,message);
          return new Response(JSON.stringify({ success: true, data: ups, sms_status: sms_res, msg: `Voucher Sold to , ${phone} !` }), { status: 200 });
        }
    }

    if(action == 'print'){
        const ups:any = await fetchVoucherById(id);
        console.log(ups)
        if(ups.total > 0){ 
          return new Response(JSON.stringify({ success: true, data: ups, msg: null }), { status: 200 });
        }
    }

    if(action == 'send'){
        const ups:any = await fetchVoucherById(id);
        console.log(ups)
        if(ups.total > 0){ 
          // Send SMS to Buyer
          const phone = ups.documents[0].buyer_phone;
          const message = `Hi! Your Voucher, SERIAL: ${ups.documents[0].serial} , PIN: ${ups.documents[0].pin} , Please follow link to https://ec.ucc.edu.gh to file nomination`
          const sms_res = await sms(phone,message);
          return new Response(JSON.stringify({ success: true, data: ups, sms_status: sms_res, msg: `Voucher Sold to , ${phone} !` }), { status: 200 });
        }
    }

    if(action == 'unlock'){
      const applicant:any = await fetchNominee(id);
      if(applicant.total > 0){ 
        const data = applicant?.documents[0]
        // Update Form Submit Status
        const ups = await updateNominee(data?.$id, { form_submit: false })
        // Send SMS to Buyer
        const message = `Hi! Your Nomination Form is unlocked for editting. Feel free to do corrections. Thank you!`
        const sms_res = await sendMessageByRegNo(data.aspirant_regno,message)
        return new Response(JSON.stringify({ success: true, data: ups, sms_status: sms_res, msg: `Voucher Sold to , ${phone} !` }), { status: 200 });
      }
    }


    if(action == 'endorse'){
      const applicant:any = await fetchNominee(id);
      if(applicant.total > 0){
        const data = applicant?.documents[0]
        const sm = await getVerification(data);
        return new Response(JSON.stringify({ success: true, data: sm, msg: `Endorsements sent !` }), { status: 200 });
      }
      return new Response(JSON.stringify({ success: false, data: null, msg: `Link could not be sent !` }), { status: 200 });
    }

    if(action == 'updatecgpa'){
      const applicant:any = await fetchNominees();
      if(applicant.total > 0){
        const data = applicant?.documents
        const sd = await Promise.all(data.map( async (row: any) => {
            //  Get CGPA from database
            // const cgpa = await fetchCgpa(row?.aspirant_regno)
           
            // const messages = []
            // let dt = { cgpa: cgpa.toString() }
            let dt = {  }
            
            // Send Message for For Reprint of since update CGPAs
            // if(cgpa.toString() != row?.aspirant_regno) messages.push(`Hi! CGPA value has been updated prior to the close of nominations, Please confirm and refresh browser for a Form Printout.`)
           
            // Conditional Message for CV Uploaded and Candidate Photos
            if(!row?.photo){
               const message = `Hi! Please upload your CV and Candidate Flyer/Photo to complete portfolio. Deadline is 10:00 PM, June 23, 2023`
               const send =  await sendMessageByRegNo(row?.aspirant_regno,message);
               return send
            }

            if(row?.aspirant_regno.toUpperCase() == 'SB/PCM/20/0155' ){
              const message = `Hi Edusei! Please upload new Candidate Flyer/Photo to complete portfolio. Deadline is 10:00 PM, June 23, 2023`
              const send =  await sendMessageByRegNo(row?.aspirant_regno,message);
              return send
           }
            
            //  Update CGPA
            //const resp = await updateNominee(row?.documents[0]?.$id, dt);
          
        }))
        return new Response(JSON.stringify({ success: true, data: sd, msg: `Endorsements sent !` }), { status: 200 });
      }
      
      return new Response(JSON.stringify({ success: false, data: null, msg: `Link could not be sent !` }), { status: 200 });
    }



    // ?action=form&serial=test ( Fetch for form population )
    // ?action=print&serial=test ( Fetch for Printview with 3rd party endpoints )
  
    return new Response(JSON.stringify({ success: false, msg: 'Please check Request!', data: null }), { status: 200 });

    
  } catch (error) {
    return new Response(JSON.stringify({ success: false, msg:error, data: null }), { status: 404 });
  }
  

}



