import { useState } from "react";
export default function AddNotes({setNoteflag, setNotes, videoId, currentTime}) {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[today.getMonth()];
        const day = String(today.getDate()).padStart(2, '0');
        return `${day} ${month}' ${year}`;
      };

    const [date, setDate] = useState(getCurrentDate);
    const [ts, setTs] = useState();
    const [note, setNote] = useState();

    function appendNote() {
        if(!date || !ts || !note) {
            alert("Fill in all three blanks");
            return;
        }
        setNotes(prevMap => {
            const newMap = new Map(prevMap);
            const prevArr = newMap.get(videoId) || [];
            newMap.set(videoId, [...prevArr, [date, ts, note]]);
            console.log(newMap);
            return newMap;
        })
        setNoteflag(false);
    }

    function noteToCurrentTime() {
        setTs(currentTime);
        document.getElementById('time').value = currentTime;
    }

    return (
        <>
            <div className="border rounded-xl flex flex-col p-5">
                <div className="m-2 flex">Enter Date:  <input className="pl-2 rounded-xl text-xs ml-2" type="text" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
                <div className="m-2 flex">Enter TimeStamp in seconds: <input id='time' className="pl-2 rounded-xl text-xs ml-2" type="text" value={ts} onChange={(e)=>setTs(e.target.value)} />
                <button className="border border-black text-xs rounded-xl p-1 ml-2" onClick={noteToCurrentTime}>Use current time</button></div>
                <div className="m-2 flex"><div>Enter Note: </div><input className="w-4/6 pl-2 rounded-xl text-xs ml-2" type="text" value={note} onChange={(e)=>setNote(e.target.value)} /> </div>
                <div className="flex justify-center gap-3">
                    <button onClick={appendNote} className="w-full border pl-2 rounded-lg mt-4 p-2 bg-slate-300 hover:bg-slate-400">Add new Note</button>
                    <button onClick={()=>setNoteflag(false)} className="w-full border pl-2 rounded-lg mt-4 p-2 bg-slate-300 hover:bg-slate-400">Cancel</button>
                </div>
            </div>
        </>
    )
}