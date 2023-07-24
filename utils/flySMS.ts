import { bulksms } from "./bulksms";
import axios from 'axios'

export const flySMS = async (message: string, senderId: string, sgroup: string) => {
   const groupId = sgroup?.split('_')[0].trim();
   const sender_group = sgroup?.split('_')[1].trim()
   const asp_res = await axios.get(`https://ehub.ucc.edu.gh/zeus/getsmsdata?groupId=${encodeURI(groupId)}`)
   const asp = asp_res?.data;
   if(asp.success){
        const phones = JSON.parse(asp.data[0]?.data)[sender_group]
        if(phones && phones.length > 0){
            const asp_sms = await bulksms(phones,message,senderId);
            //const asp_sms = await bulksms(["0277675089","0558641826"],message);
            if(asp_sms.code == '2000') return { success: true, credit_used: asp_sms.summary?.credit_used, receipient: asp_sms.summary?.numbers_sent, campaign_id: asp_sms.summary?._id }
        }
    }
   
   return { success: false, credit_used: 0, receipient: [], campaign_id: '' }; 
}