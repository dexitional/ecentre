import axios from 'axios'

export const bulksms = async (phones: any,message: string, senderId: string  = 'EC-UCC') => {
    const res = await axios.post(
      `https://api.mnotify.com/api/sms/quick?key=a1OcCWQjI1C8UADy7Rru0Gw9PEQYmIDxJsKloAF7BhfwS`,
        {
            'recipient': phones,
            'sender': senderId,
            message,
            'is_schedule': 'false',
            'schedule_date': '' 
        },
        {
            headers: {
            'Content-Type': 'application/json',
            }
        }
    )
    // `https://api.mnotify.com/api/sms/quick?key=a1OcCWQjI1C8UADy7Rru0Gw9PEQYmIDxJsKloAF7BhfwS`,
    // {
    //     method: 'POST',
    //     headers: {
    //      'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ 
    //       'recipient': phones,
    //       'sender': senderId,
    //        message,
    //       'is_schedule': 'false',
    //       'schedule_date': '' 
    //     }),
    // }
    //const resp = await res.json()
    //return resp;
    console.log(res.data)
    return res.data;

}