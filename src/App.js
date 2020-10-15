import React, { useState, useEffect } from 'react';
import './App.css';


export function LovedTracks(){
  // fetch last 9 loved tracks
  const [lfmLovedData, updateLfmLovedData] = useState({});
  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getLovedTracks&user=${'cmeade23'}&api_key=${api_key}&limit=15&nowplaying=true&format=json`)
      .then(response => {
        if (response.ok){
          return response.json();
        }
        throw new Error('error');
      })
      .then(data => updateLfmLovedData(data))
      .catch(() =>
      updateLfmLovedData({ error: "oops, something went wrong with Last.fm data"})
      );
  }, []);

  const buildChart = () => {
    console.log('data: ');
    console.log(lfmLovedData)
    let result = [];
    const  { error } = lfmLovedData;
    const tracks = lfmLovedData?.lovedtracks?.track;
    console.log("tracks: ");
    console.log(tracks);
    if (error) {
      return <p>{error}</p>;
    }
  
    if (!tracks) {
      return <p>Loading</p>;
    }

    for(let i = 0; i < tracks.length; i++){
      let song = tracks[i].name;
      let artist = tracks[i].artist.name;
      result.push([song, artist]);
    }
    console.log(result);


    const recent_loved = result.map((song, i) => <li key = {i}>{song[0]} by {song[1]}</li>)
    console.log(recent_loved);
    return (
      <div>
        <h2>Most Recently Loved Tracks on Last.fm:</h2>
        <ol>{recent_loved}</ol>
      </div>
      )

  };
  return buildChart();
};


aaa
export function AlbumArt(){
  // get album art
  const [AlbumData, updateAlbumData] = useState({});
  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getInfo&user=${'cmeade23'}&api_key=${api_key}&mbid={'076205ee-7f45-3325-a5a4-38d27ceabd61}&format=json`)
      .then(response => {
        if (response.ok){
          return response.json();
        }
        throw new Error('error');
      })
      .then(data => updateAlbumData(data))
      .catch(() =>
      updateAlbumData({ error: "oops, something went wrong with Last.fm data"})
      );
  }, []);

  const buildChart = () => {
    console.log(AlbumData)
    const  { error } = AlbumData;
    const art = AlbumData?.album?.image[2]['#text'];

    if (error) {
      return <p>{error}</p>;
    }
  
    if (!art) {
      return <p>Loading</p>;
    }

    return <img src={art} />

  };
  return buildChart();
};
