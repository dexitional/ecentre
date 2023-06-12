export const sms = async (phone: string,message: string,senderId: string  = 'EC-UCC') => {
    const res = await fetch(
        `https://api.mnotify.com/api/sms/quick?key=a1OcCWQjI1C8UADy7Rru0Gw9PEQYmIDxJsKloAF7BhfwS`,
        {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              'recipient': [phone],
              'sender': senderId,
               message,
              'is_schedule': 'false',
              'schedule_date': '' 
            }),
        }
    )
    const resp = await res.json()
    return resp;

}