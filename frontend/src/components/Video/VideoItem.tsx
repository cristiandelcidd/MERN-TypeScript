import React from 'react'
import ReactPlayer from 'react-player'
import { useHistory } from 'react-router-dom'
import * as videoService from './VideoService'
import { Video } from './Video'

import './VideoItem.css'

interface Props {
    video: Video
    loadVideos: () => void
}

export const VideoItem = ( { video, loadVideos }: Props,  ) => {

    const history = useHistory()

    const handleDelete = async ( id: string ) => {
        await videoService.deleteVideo( id  )
        loadVideos()
    }

    return (
        <li className='video-item'>
            <div className="video-item__header">
                <h2
                    onClick={ () => history.push( `/update/${ video._id }` ) }
                >
                    { video.title }
                </h2>
                <span onClick={ () => video._id && handleDelete( video._id ) }>&times;</span>
            </div>
            <ReactPlayer  className='react-player' url={ video.url } width='100%' height='65%'/>
            <p>{ video.description }</p>
        </li>
    )
}