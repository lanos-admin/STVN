import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './VideoSection.module.css'
import CardImg from "../assets/News1 6.png";

export const VideoSection = () => {
    const navigate = useNavigate();
    const videos = [
        {
          id: 1,
          title: 'Video 1',
          url: 'https://www.youtube.com/watch?v=video1',
          thumbnail: 'https://example.com/thumbnail1.jpg',
        },
        {
          id: 2,
          title: 'Video 2',
          url: 'https://www.youtube.com/watch?v=video2',
          thumbnail: 'https://example.com/thumbnail2.jpg'
        },
        {
            id: 3,
            title: 'Video 3',
            url: 'https://www.youtube.com/watch?v=video3',
            thumbnail: 'https://example.com/thumbnail3.jpg'
        },
        {
            id: 4,
            title: 'Video 4',
            url: 'https://www.youtube.com/watch?v=video4',
            thumbnail: 'https://example.com/thumbnail4.jpg'
        },
        {
            id: 5,
            title: 'Video 5',
            url: 'https://www.youtube.com/watch?v=video5',
            thumbnail: 'https://example.com/thumbnail5.jpg'
        }
    
    ]
        
  return (
    <div className={styles.container}>
     <h2 className={styles.title}>Viral Videos</h2>
        <div className={styles['video-grid']}>
            {videos.slice(0,4).map((video) => (
                <div 
                    key={video.id} 
                    className={styles['video-card']}
                    onClick={() => navigate(`/video/${video.id}`, { state: { video } })}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={CardImg} alt={video.title} />
                    <div className={styles['video-title']}>{video.title}</div>
                    <div className={styles['video-actions']}>
                    </div>
                </div>
            ))}
            </div>
    </div>
  )
}

export default VideoSection;
