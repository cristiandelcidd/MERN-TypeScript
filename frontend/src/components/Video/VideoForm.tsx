import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'
import { Video } from './Video'
import './VideoForm.css'
import * as videoService from './VideoService'
import { ErrorMessage } from '../Message/ErrorMessage'

type InputChange = ChangeEvent< HTMLInputElement | HTMLTextAreaElement >

interface Params {
    id: string
}

export const VideoForm = () => {

    const history = useHistory()
    const params = useParams< Params >()

    const initialState = {
        title: '',
        description: '',
        url: ''
    }

    const [errorMessage, setErrorMessage] = useState( false )

    const [video, setVideo] = useState< Video >( initialState )

    const handleInputChange = ( e: InputChange ) => {
        setVideo( { ...video, [ e.target.name ]: e.target.value } )
    }

    const handleSubmit = async ( e: FormEvent< HTMLFormElement > ) => {
        e.preventDefault()
        if ( video.title.trim().length < 5 || video.description.trim().length < 5 || video.url.trim().length < 5 ) {
            setErrorMessage( true )

            setTimeout(() => {
                setErrorMessage( false )
            }, 3000)
            return
        }

        if ( !params.id ) {
            await videoService.createVideo( video );
            toast.success( 'New video added' )
            // setVideo( initialState )
        } else {
            await videoService.updateVideo( params.id, video )
        }
        history.push( '/' )
    }

    const getVideo = async ( id: string ) => {
        const { data } = await videoService.getVideo( id )
        const { title, description, url } = data
        setVideo( { title, description, url } )
    }

    useEffect( () => {
        if ( params.id ) getVideo( params.id )
    }, [ params.id ])

    return (
        <div className='row'>
            <form onSubmit={ handleSubmit } >
                <h3>New Video</h3>

                <input
                    type="text"
                    name="title"
                    placeholder="Write a title for this video"
                    autoComplete="off"
                    autoFocus
                    className="form-control"
                    value={ video.title }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    name="url"
                    placeholder="https://google.com"
                    autoComplete="off"
                    className="form-control"
                    value={ video.url }
                    onChange={ handleInputChange }
                />

                <textarea
                    name="description"
                    rows={ 3 }
                    className="form-control"
                    placeholder="Write a description"
                    value={ video.description }
                    onChange={ handleInputChange }
                >
                </textarea>

                {
                    params.id
                    ?
                    (
                        <button className="btn btn-primary">Update Video</button>
                    )
                    :
                    (
                        <button className="btn btn-primary">Create</button>
                    )
                }
            </form>

            {
                errorMessage && <ErrorMessage />
            }
        </div>
    )
}