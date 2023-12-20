import React, { useState, useEffect, useRef } from 'react'

import Feed from './Feed'

// import './instaFeeds.css'

const InstaFeeds = () => {
    const [feeds, setFeedsData] = useState([])
    //use useRef to store the latest value of the prop without firing the effect
    

    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchInstagramPost() {
            try {
              const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=4&access_token=IGQWROWTFrLWl6T28ya3RsSmJYaE05Rm5xa1J1NEhvWTdscWlLUFNlT1J0SldxMEdJSl9OOUl1WUlmckRvSkkyYUtHTmNrNy1SM1NrbWpOb1RLSkpSY3VRUU1rVjNCa1hTN1VyZA0tKYWJ6b0JBeTBoRU8yQktEb3cZD`);
              if (!response.ok) {
                throw new Error('Network response was not ok.');
              }
              const data = await response.json();
              setFeedsData(data.data);
            } catch (err) {
              console.log('error', err);
            }
          }
        
        // manually call the fecth function 
        fetchInstagramPost();
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    })

    return (
        <div className="container">
            {feeds.map((feed) => (
                <Feed key={feed.id} feed={feed} />
            ))}
        </div>
    );
}

export default InstaFeeds;