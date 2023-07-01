import { sms } from "./sms";

export const sendPhotoReminder = async (regno: string, message: string) => {
    const asp_res = await fetch(`https://ehub.ucc.edu.gh/api/sso/identity?search=${encodeURIComponent(regno)}`)
    const asp = await asp_res.json()
    const phone = asp.data[0].user.phone
    const asp_sms = sms(phone,message);
    return asp_sms;
}