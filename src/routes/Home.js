import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';
import Tweet from '../components/Tweet';

import TweetFactory from '../components/TweetFactory';

const Home = (props) => {
 
  const [tweets, setTweets] = useState([]);


 


  useEffect(() => {
    dbService.collection('tweets').orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTweets(newArray);
    })
  }, []);


  

  return (
    <div className='container'>
      <TweetFactory userObj={props.userObj} /> 
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.createId === props.userObj.uid} />
        ))}
      </div>
    </div>
  );  
};

export default Home;
