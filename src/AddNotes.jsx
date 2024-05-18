import { useState } from "react";
export default function AddNotes({setNoteflag, setNotes, videoId}) {
    const [date, setDate] = useState();
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

    return (
        <>
            <div className="border rounded-xl flex flex-col p-5">
                <div className="m-2 flex">Enter Date:  <input className="pl-2 rounded-xl text-xs ml-2" type="text" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
                <div className="m-2 flex">Enter TimeStamp in seconds: <input className="pl-2 rounded-xl text-xs ml-2" type="text" value={ts} onChange={(e)=>setTs(e.target.value)} /></div>
                <div className="m-2 flex">Enter Note: <input className="pl-2 rounded-xl text-xs ml-2" type="text" value={note} onChange={(e)=>setNote(e.target.value)} /> </div>
                <div className="flex justify-center gap-3">
                    <button onClick={appendNote} className="w-full border pl-2 rounded-lg mt-4 p-2 bg-slate-300 hover:bg-slate-400">Add new Note</button>
                    <button onClick={()=>setNoteflag(false)} className="w-full border pl-2 rounded-lg mt-4 p-2 bg-slate-300 hover:bg-slate-400">Cancel</button>
                </div>
            </div>
        </>
    )
}