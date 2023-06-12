import { sms } from "./sms";

export const getContacts = async (data: any) => {
    const { aspirant_regno, guarantor1_regno, guarantor2_regno } = data;
    const rowData = [aspirant_regno, guarantor1_regno, guarantor2_regno];
    
    const res = await Promise.all(rowData.map( async (row: any, i: number) => {
        console.log(row)
        const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(row)}`)
        const asp = await asp_res.json()
        const phone = asp.data[0].user.phone
        console.log(phone)
        let msg;
        if( i == 0 ){
            // Send Message - Aspirant
            msg = `Hi, Your Nomination has been acknowledged. Thank you and follow-up on your endorsements !`
        } else {
            // Send Message - Aspirant
            msg = `Hi, Please Click link to endorse Your Aspirant. ${process.env.NEXTAUTH_URL}/api/nominee?action=verify&ua=${aspirant_regno}&tp=g${i+1} .Thank you for your time !`
        }
        const asp_sms = sms(phone,msg);
        return asp_sms;
    }))
    return res
}