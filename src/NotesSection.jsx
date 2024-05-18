import { useState } from "react";

export default function NotesSection({ playerRef, setTimeStamp, setNoteflag, notes, setNotes, videoId }) {
    const [time, setTime] = useState("0");
    const [editIndex, setEditIndex] = useState(null);
    const [editNote, setEditNote] = useState("");

    function findTime(ts) {
        const min = Math.floor(ts / 60);
        const sec = ts % 60;
        const str = `${min} min ${sec} sec`;
        return str;
    }

    function toSeek(time) {
        if (playerRef.current) {
            playerRef.current.seekTo(time);
        }
    }

    function handleDelete(index) {
        const updatedNotes = new Map(notes);
        const videoNotes = updatedNotes.get(videoId).filter((_, i) => i !== index);
        updatedNotes.set(videoId, videoNotes);
        setNotes(updatedNotes);
    }

    function handleEdit(index) {
        setEditIndex(index);
        setEditNote(notes.get(videoId)[index][2]);
    }

    function saveEdit(index) {
        if(!editNote) {
            alert("You cannot save an empty note");
            return;
        }
        const updatedNotes = new Map(notes);
        const videoNotes = updatedNotes.get(videoId);
        videoNotes[index][2] = editNote;
        updatedNotes.set(videoId, videoNotes);
        setNotes(updatedNotes);
        setEditIndex(null);
        setEditNote("");
    }

    function handleAddNote() {
        if(!videoId) {
            alert("Add a video id first");
            return;
        }
        setNoteflag(true);
    }

    return (
        <div>
            <div className="ml-4 p-4 border rounded-xl">
                <div className="flex justify-between">
                    <div>
                        <div className="font-medium text-l pb-2">My Notes</div>
                        <div className="font-light text-sm mb-2">All your notes at a single place. Click on any note to go to specific timestamp in the video</div>
                    </div>
                    <button onClick={handleAddNote} className="border rounded-lg m-4 p-2 bg-slate-300 hover:bg-slate-400">Add new note</button>
                </div>
                <hr />
                <ul>
                    {notes.get(videoId) && notes.get(videoId).map(([date, ts, note], index) => (
                        <li key={index}>
                            {editIndex === index ? (
                                <div>
                                    <textarea
                                        className="border rounded-xl p-3 text-sm mt-4 mb-4"
                                        value={editNote}
                                        onChange={(e) => setEditNote(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button onClick={() => saveEdit(index)} className="text-xs border rounded-lg m-2 p-1 bg-slate-300 hover:bg-slate-400">Save</button>
                                        <button onClick={() => setEditIndex(null)} className="text-xs border rounded-lg m-2 p-1 bg-slate-300 hover:bg-slate-400">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mt-2 text-sm font-bold">{date}</div>
                                    <div className="text-sm mt-2 mb-2">
                                    Timestamp: <button onClick={() => toSeek(ts)} className="text-cyan-500">{findTime(ts)}</button>
                                    </div>
                                    <div className="border rounded-xl p-3 text-sm mb-4">
                                        {note}
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => handleDelete(index)} className="text-xs border rounded-lg m-2 p-1 bg-slate-300 hover:bg-slate-400">Delete note</button>
                                        <button onClick={() => handleEdit(index)} className="text-xs border rounded-lg m-2 p-1 bg-slate-300 hover:bg-slate-400">Edit note</button>
                                    </div>
                                </div>
                            )}
                            <hr />
                        </li>
                    ))}
                </ul>
                {!notes.get(videoId) && <div className="mt-2 text-sm">No notes added yet</div>}
            </div>
        </div>
    )
}
