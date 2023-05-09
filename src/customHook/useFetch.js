import { useState, useEffect } from 'react';


// this is the custom hook asked for, it takes in a url and returns the data, loading, state, and error

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // this is the fetch functionality, just like the previous ones.
  // we are using the useEffect to run this when the pages are rendered and the url changes.
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
    // the last part [url] is called a dependency array, this are the variables that are going to make the useEffect run, so whenever the variable placed in this array changes, it fires up the useEffect hook
  }, [url]);

  return { data, loading, error };
};

export {useFetch};