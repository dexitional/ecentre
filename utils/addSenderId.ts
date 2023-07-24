import axios from 'axios'

export const addSenderId = async (sender_name: string) => {
   const res = await axios.post(`https://api.mnotify.com/api/senderid/register?key=a1OcCWQjI1C8UADy7Rru0Gw9PEQYmIDxJsKloAF7BhfwS`,{
       sender_name,
       purpose:'Students Election Campaign'
   },{
      headers: {
        'Content-Type': 'application/json'
      }
   })
   return res?.data;
}