import { sms } from "./sms";

export const sendMessageByRegNo = async (regno: string, message: string) => {
    const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(regno)}`)
    const asp = await asp_res.json()
    const phone = asp?.data[0]?.user?.phone
    let cleanphone = phone.split('/')[0].trim();
        cleanphone = phone.split('-')[0].trim();
        cleanphone = phone.split('&')[0].trim();
        cleanphone = phone.split('_')[0].trim();
        cleanphone = phone.replaceAll('+233','0');
        cleanphone = phone.replaceAll('(','');
        cleanphone = phone.replaceAll(')','');
        cleanphone = phone.replaceAll('O','0');
        cleanphone = phone.replaceAll('o','0');
        if(cleanphone.length > 10 || cleanphone.length < 9) return;
    const asp_sms = await sms(cleanphone,message);
    console.log(asp_sms)
    return asp_sms;
}