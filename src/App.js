import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import './App.css';


const api_key = process.env.REACT_APP_API_LFM_KEY
console.log(process.env.REACT_APP_API_KEY)

export function LovedTracks(){
  console.log("api key: ", api_key)
  console.log("Art1:", SongArt("Money Trees", "Kendrick Lamar"));
  // fetch last 15 loved tracks
  const lfmLovedData = useFetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${'cmeade23'}&api_key=${api_key}&limit=3&nowplaying=true&format=json`);
  console.log("data: ", lfmLovedData);
  console.log(typeof lfmLovedData);

  const buildChart = () => {
    console.log("Art2:", SongArt("Money Trees", "Kendrick Lamar"));
    // console.log(lfmLovedData);
    // let tracksList = [];
    const  { error } = lfmLovedData;
    const tracks = lfmLovedData?.recenttracks?.track;
    console.log("tracks: ", tracks);
    console.log(typeof tracks);
    if (error) {
      return <p>{error}</p>;
    }

    if (!tracks) {
      return <p>Loading</p>;
    }
    let tracksList = [];
    for(let i = 0; i < tracks.length; i++){
      tracksList.push({
        artist: tracks[i].artist['#text'],
        song: tracks[i].name,
        art: tracks[i].image[2]['#text']
      })
    }
    console.log(tracksList);
    // let artist = tracks[0].artist['#text'];
    // let song = tracks[0].name;
    // let art = tracks[0].image[2]['#text'];
    return (
      <div>
       <h1>Most recently listened to songs are:</h1>
        <div>
        <ul className={"ul.no-bullets"}>
          {tracksList.map((song, idx) =>(
            <li key ={idx}><img src={song.art} alt="did not load"/> {song.song} by {song.artist}</li>
          ))}
        </ul>
        </div>
      </div>
      )

  };
  return buildChart();
};

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <img src={props.images.art} alt="did not load"/>
  })

  return <div>{images}</div>
}


// const Image = () =>{
//   return(

//   )  
// }
const SongArt = (track, artist) =>  {
  // const [songData, setSongData] = useState({});
  const correctArtistString = artist.toString().replace(' ', '+');
  const correctTrackString = track.toString().replace(' ', '+');
  const songData = useFetch(`https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=${api_key}&artist=${correctArtistString}&track=${correctTrackString}&format=json`);
  // console.log(songData);
  const  { error } = songData;
  const art = songData?.track?.album?.image[1]['#text'];
  // console.log("art: ", art);

  if (error) {
    return <p>{error}</p>;
  }
  
  if (!art) {
    return <p>Loading...</p>;
  }

  return art;
  // <img src= {art} alt = "loading..."/>
}