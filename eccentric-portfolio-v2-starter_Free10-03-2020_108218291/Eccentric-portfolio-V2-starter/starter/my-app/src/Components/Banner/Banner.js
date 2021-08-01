import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
import YouTube from 'react-youtube'

function Banner() {
const [movie, setMovie] = useState()
const [play,setPlay]= useState()
const [urlId,setUrlId]=useState('')
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
            console.log(response.data.results[0])
            setMovie(response.data.results[Math.floor(Math.random() * 20)])
            
        })
    },[])
    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
          autoplay: 0,
        },
    };
   
        axios.get(`/movie/${play}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
           if(response.data.results.length!==0)
           { setUrlId(response.data.results[0])} 
            else
            {console.log('Array is empty')}
        })
    
    return (
        
        <div 
        style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path:"" })`}} onClick={()=>{
            setPlay(movie.id)
        }}
        className='banner'>
       {urlId ? <YouTube videoId={urlId.key} opts={opts}/> : 
           <div className='content'>
                <h1 className='title'>{movie ? movie.title :""} </h1>
                <div className='banner_button'>
                    <button className='button' onClick={()=>{setUrlId(movie.id )}}>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'>{movie ? movie.overview :""} </h1>
            </div>}
           
           <div className="fade_bottom"> </div> 
        </div>
    )
}

export default Banner
