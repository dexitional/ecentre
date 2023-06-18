import { sms } from "./sms";

export const getVerification = async (data: any) => {
    const { aspirant_regno, guarantor1_regno, guarantor2_regno,serial,g1_verified,g2_verified } = data;
    let rowData = [aspirant_regno];
    if(!g1_verified) rowData.push(guarantor1_regno)
    if(!g2_verified) rowData.push(guarantor2_regno)
    
    const res = await Promise.all(rowData.map( async (row: any, i: number) => {
        const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(row)}`)
        const asp = await asp_res.json()
        const phone = asp.data[0].user.phone
        console.log(phone)
        let msg;
        if( i == 0 ){
            // Send Message - Aspirant
            msg = `Hi, Guarantor(s) have been resent a link for your endorsement. Please follow-up on your endorsements !`
        } else {
            // Send Message - Aspirant
            msg = `Hi, Please Click link to endorse Your Aspirant. ${process.env.NEXTAUTH_URL}/api/nominee?action=verify&ua=${serial}&tp=g${i} .Thank you for your time !`
        }
        const asp_sms = sms(phone,msg);
        return asp_sms;
    }))

    return res
}