import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [lfmData, setLfmData] = useState({});

    useEffect(() => {
        fetch(url)
        .then(response => {
            if (response.ok){
              return response.json();
            }
            throw new Error('error');
          })
          .then(data => setLfmData(data))
          .catch(() =>
          setLfmData({ error : "oops, something went wrong with Last.fm data"})
          );
      }, [url]);
    return lfmData;
};
