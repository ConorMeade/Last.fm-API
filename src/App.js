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

  const SongArt = (track, artist) => {
    const [SongData, updateSongData] = useState({});
    let correctArtistString = artist.replace(' ', '+');
    let correctTrackString = track.replace(' ', '+');
    useEffect(() => {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=${api_key}&artist=${correctArtistString}&track=${correctTrackString}&format=json`)
        .then(response => {
          if (response.ok){
            return response.json();
          }
          throw new Error('error');
        })
        .then(data => updateSongData(data))
        .catch(() =>
        updateSongData({ error: "oops, something went wrong with Last.fm data"})
        );
    }, []);

    const getArt = () => {
      const  { error } = SongData;
      const art = SongData?.album?.image[2]['#text'];
  
      if (error) {
        return <p>{error}</p>;
      }
    
      if (!art) {
        return <p>Loading</p>;
      }
  
      return <img src={art} />
  
    };
    return getArt();
  }

  const buildChart = () => {
    console.log('data: ');
    console.log(lfmLovedData);
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
    /*
      we have song and artist, pass that in to SongArt(track, artist)
      use array destructuring to create [song, artist, (image link)]
      parse image as <img src = {arr[2]} />
    */
    for(let i = 0; i < tracks.length; i++){
      let song = tracks[i].name;
      let artist = tracks[i].artist.name;
      result.push([song, artist]);
    }

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


export function SongArt(){
  // get album art
  const [SongData, updateSongData] = useState({});
  let track = 'Money Trees';
  let artist = 'Kendrick Lamar';
  let correctArtistString = artist.replace(' ', '+');
  let correctTrackString = track.replace(' ', '+');
  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=${api_key}&artist=${correctArtistString}&track=${correctTrackString}&format=json`)
    // fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=Kendrick+Lamar&track=Money+Trees&format=json`)
      .then(response => {
        if (response.ok){
          return response.json();
        }
        throw new Error('error');
      })
      .then(data => updateSongData(data))
      .catch(() =>
      updateSongData({ error: "oops, something went wrong with Last.fm data"})
      );
  }, []);

  const getArt = () => {
    console.log(SongData);
    const  { error } = SongData;
    const art = SongData?.track?.album?.image[2]['#text'];

    console.log(art);
    if (error) {
      return <p>{error}</p>;
    }
  
    if (!art) {
      return <p>Loading...</p>;
    }
    
    return <img src={art} />

  };
  return getArt();
};
