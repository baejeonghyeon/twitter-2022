import { v4 as uuidv4 } from 'uuid';
import { storageService, dbService } from '../fbase';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const TweetFactory = (props) => {

  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (tweet === ""){
      return ;
    }
    


    
    const fileRef = storageService.ref().child(`${props.userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    const attachmentUrl = await response.ref.getDownloadURL();
 
   

    
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      createId: props.userObj.uid,
      attachmentUrl,
    });

    setTweet("");
    setAttachment("");
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    setTweet(event.target.value);
  };

  const onChangeFileHandler = (event) => {
    event.preventDefault();
    const theFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result);
    }

    
    if(Boolean(theFile)){
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachmentHandler = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="factoryForm">
      <div className='factoryInput__container'>
        <input
          value={tweet}
          onChange={onChangeHandler}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" style={{ cursor: "pointer" }} />
      </div>
      <label htmlFor='attach-file' className='factoryInput__label'>
        <span>Add Photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input type="file" accept="image/*" onChange={onChangeFileHandler} style={{
        opacity: 0,
      }} id="attach-file" />
      <input value="Tweet" type="submit" />
      { attachment && (
        <div className='factoryForm__attachment'>
          <img src={ attachment } style={{
            backgroundImage: attachment,
          }} />
          <div className='factoryForm__clear' onClick={onClearAttachmentHandler}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      ) }
      
    </form>
  )
};

export default TweetFactory;