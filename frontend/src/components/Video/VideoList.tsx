import React, { useEffect, useState } from 'react'
import { Video } from './Video'
import { VideoItem } from './VideoItem';
import { getVideos } from './VideoService';

import './VideoList.css'

export const VideoList = () => {

    const [videos, setVideos] = useState< Video[] >([]);

    const loadVideos = async () => {
        const { data } = await getVideos()
        const sortedVideos = data.map( video => {
            return {
                ...video,
                createdAt: video.createdAt ? new Date( video.createdAt ): new Date(),
                updatedAt: video.updatedAt ? new Date( video.updatedAt ): new Date()
            }
        })
        .sort( ( a, b ) => b.createdAt.getTime() - a.createdAt.getTime() )
        setVideos( sortedVideos )
    }

    useEffect( () => {
        loadVideos()
    }, [] )

    return (
        <div>
            {
                videos.length === 0
                ?
                (
                    <h2 className='info'>No hay Elementos</h2>
                )
                :
                (
                    <ul className="video-list" >
                        {
                            videos.map( video => (
                                <VideoItem
                                    video={ video }
                                    key={ video._id }
                                    loadVideos={ loadVideos }
                                />
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}