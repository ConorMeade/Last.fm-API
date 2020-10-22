import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import './App.css';


const api_key = process.env.REACT_APP_API_LFM_KEY
console.log(process.env.REACT_APP_API_KEY)
export function LovedTracks(){
  console.log("api key: ", api_key)
  // fetch last 9 loved tracks
  // const [lfmLovedData, updateLfmLovedData] = useState({});
  const lfmLovedData = useFetch(`https://ws.audioscrobbler.com/2.0/?method=user.getLovedTracks&user=${'cmeade23'}&api_key=${api_key}&limit=15&nowplaying=true&format=json`);

  console.log("data: ", lfmLovedData);

  const buildChart = () => {
    console.log(lfmLovedData);
    let tracksList = [];
    const  { error } = lfmLovedData;
    const tracks = lfmLovedData?.lovedtracks?.track;
    console.log("tracks: ", tracks);
    if (error) {
      return <p>{error}</p>;
    }
  
    if (!tracks) {
      return <p>Loading</p>;
    }
    /*
      we have song and artist, pass that in to SongArt(track, artist)
      use array destructuring to create [song, artist, (image link)]
      parse image as <img src = {arr[2]} />
    */
    // let images = [];
    for(let i = 0; i < tracks.length; i++){
      tracksList.push({ song: tracks[i].name,
                    artist: tracks[i].artist.name,
                    image: tracks[i].image[0]['#text']});
    }

    console.log("results: ", tracksList);

    // const recent_loved = tracksList.map((song, artist, i) => <li key = {i}>{song} by {artist}</li>)
    // console.log("recent_loved: ", recent_loved);
    return (
      <div>
        {/* <h2>Most Recently Loved Tracks on Last.fm:</h2>
        <ol>{tracksList}</ol> */}
      </div>
      )

  };
  return buildChart();
};

export const SongArt = () =>  {

  let track = "Money Trees";
  let artist = "Kendrick Lamar"
  // if(typeof track == 'string' && typeof artist == 'string'){
  const correctArtistString = artist.toString().replace(' ', '+');
  const correctTrackString = track.toString().replace(' ', '+');
  // }
  const SongData = useFetch(`https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=${api_key}&artist=${correctArtistString}&track=${correctTrackString}&format=json`);
  console.log(SongData);
  const  { error } = SongData;
  const art = SongData?.track?.album?.image[2]['#text'];
  console.log("art: ", art);

  if (error) {
    return <p>{error}</p>;
  }
  
  if (!art) {
    return <p>Loading...</p>;
  }

  return <img src= {art} alt = "loading..."/>
}