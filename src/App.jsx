import { useState,  useEffect, useRef } from 'react'
import Heading from './Heading.jsx'
import VideoPlayer from './VideoPlayer';
import NotesSection from './NotesSection';
import AddNotes from './AddNotes.jsx';

function App() {
  const [timeStamp, setTimeStamp] = useState("0");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [noteflag, setNoteflag] = useState(false);
  const [notes, setNotes] =useState(new Map());
  const playerRef = useRef(null);
  // const [currentTime, setCurrentTime] = useState(timeStamp);

  const heading = "Video Player with Notes";
  const apiKey = "AIzaSyDawCvQJyvXcniuoDljLu1IgaS4eLZk9-4";

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    console.log("This is what was retrieved: " + storedNotes);
    if (storedNotes) {
      setNotes(new Map(storedNotes));
    }
  }, []);

  useEffect(() => {
    if(notes.size===0)
      return;
    localStorage.setItem('notes', JSON.stringify(Array.from(notes.entries())));
    console.log("This is what is being sotred in the storage: " + notes);
  }, [notes]);

  return (
    <div className='bg-slate-100'>
      <div className='ml-20 mr-20 pb-10 pt-10'>
        <Heading heading={heading} />
        <VideoPlayer playerRef={playerRef} timeStamp={timeStamp} apiKey={apiKey} videoId={currentVideoId} setVideoId={setCurrentVideoId} />
        <div className='flex'>
          <div className='flex-auto'><NotesSection playerRef={playerRef} setTimeStamp={setTimeStamp} setNoteflag={setNoteflag} notes={notes} setNotes={setNotes} videoId={currentVideoId} /></div>
          {noteflag && <div className='flex-auto ml-2'><AddNotes setNoteflag={setNoteflag} setNotes={setNotes} videoId={currentVideoId} /></div>}
        </div>
        
      </div>
    </div>
    
  )
}

export default App
