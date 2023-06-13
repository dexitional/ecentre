import { fetchActiveSession, fetchVoucher, fetchVoucherById, postVoucher, updateVoucher } from "@/utils/serverApi";
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
    // ?action=form&serial=test ( Fetch for form population )
    // ?action=print&serial=test ( Fetch for Printview with 3rd party endpoints )
  
    return new Response(JSON.stringify({ success: false, msg: 'Please check Request!', data: null }), { status: 200 });

    
  } catch (error) {
    return new Response(JSON.stringify({ success: false, msg:error, data: null }), { status: 404 });
  }
  

}


