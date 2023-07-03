'use client'
import Notiflix from 'notiflix';
import React from 'react'

function ActionGroup({ groupId }: { groupId: string }) {

  const sendRemind = async (e:any) => {
     e.preventDefault();
     try {
        const ok = window.confirm("Remind Aspirants !")
        if(!ok) return
        const res = await fetch(`/api/nominee?action=remind&groupId=${groupId}`);
        const resp = await res.json()
        if(resp.success){
          Notiflix.Notify.success("REMINDERS SENT!")
          window.location.href = `/nominees`
        }
     } catch (error) {
        console.log(error)
     }
  }

  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 text-xs">
       <button className="px-2 py-1 rounded border">VETTING SCORE CARD</button>
       <button onClick={sendRemind} className="px-2 py-1 rounded border">SEND REMINDERS</button>
    </div>
  )
}

export default ActionGroup