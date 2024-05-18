import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';


export default function VideoPlayer({ playerRef, timeStamp, apiKey, videoId, setVideoId }) {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');

    useEffect(() => {
        const fetchVideoInfo = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
                );
                const { title, description } = response.data.items[0].snippet;
                setVideoTitle(title);
                setVideoDescription(description);
            } catch (error) {
                console.error('Error fetching video info:', error);
            }
        };

        if (videoId) {
            fetchVideoInfo();
        }
    }, [videoId, apiKey]);

    function onReady(e) {
        playerRef.current = e.target;
        console.log("Video Player Referenced");
    }

    function seekTo(time) {
        if (playerRef.current) {
            playerRef.current.seekTo(time);
        }
    }

    return (
        <div className="p-4">
            <input
                className='border p-2 rounded-lg shadow mb-4 w-full'
                placeholder='Paste the video-id here'
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
            />
            <div className='video-container'>
                <YouTube className=" w-full h-full rounded-xl overflow-hidden" videoId={videoId} onReady={onReady} />
            </div>
            
            <div className="mt-4">
                <div className='text-2xl font-normal mb-4'>{videoTitle}</div>
                <p className=' ml-2 font-thin'>{videoDescription}</p>
            </div>
            <hr className='mt-5' />
        </div>
    );
}
