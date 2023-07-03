import { sms } from "./sms";

export const getEndorserLink = async (data: any) => {
    const { aspirant_regno, guarantor1_regno, guarantor2_regno,serial,g1_verified,g2_verified } = data;
    let rowData = [];
    if(!g1_verified) rowData.push(guarantor1_regno)
    if(!g2_verified) rowData.push(guarantor2_regno)
    
    const res = await Promise.all(rowData.map( async (row: any, i: number) => {
        const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(row)}`)
        const asp = await asp_res.json()
        const phone = asp.data[0].user.phone
        console.log(phone)
        let msg = `Hi, Please Click link to endorse aspirant. ${process.env.NEXTAUTH_URL}/api/nominee?action=verify&ua=${serial}&tp=g${i+1} .Thank you for your time !`
        const asp_sms = await sms(phone,msg);
        return asp_sms;
    }))

    return res
}