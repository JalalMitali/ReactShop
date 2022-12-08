import React, { useEffect, useState } from 'react';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from './components';
import { heroapi, highlight, sneaker, story, footerAPI } from './data/data.js';

const App = () => {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popularsales, setPopularItems] = useState([]);
  const [topRatedItems, setTopRatedItems] = useState([]);
  useEffect(() => {
    fetch("https://nest.jalalmitali.com/products")
      .then(res => res.json())
      .then(
        (result) => {
          setPopularItems(result);
          setTopRatedItems(result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  return (
   <>
      <Navbar/>
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        <Hero heroapi={heroapi} />
        <Sales endpoint={{ title: "Top Rated Items", items: popularsales}} loaded={isLoaded} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={{ title: "Top Rated Items", items: topRatedItems}} loaded={isLoaded} />
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerAPI={footerAPI} />
   </>
  )
}

export default App;