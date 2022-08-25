import { dbService, storageService } from "../fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = (props) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(props.tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Would you like to delete this tweet?");
      if(ok){
        await dbService.doc(`tweets/${props.tweetObj.id}`).delete();
        if(props.tweetObj.attachmentUrl !==""){
          await storageService.refFromURL(props.tweetObj.attachmentUrl).delete();
        }
      }
  };
  
  const onChangeHandler = (event) => {
    event.preventDefault();
    setNewTweet(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${props.tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const toggleEditingHandler = () => {
    setEditing((prev) => !prev);
  };

  return (
      <div className="nweet">
        {editing ? (
          <React.Fragment>
            <form onSubmit={onSubmitHandler} className="container nweetEdit">
              <input onChange={onChangeHandler} value={newTweet} required placeholder="Edit Your Tweet" />
              <input type="submit" value="Update Tweet" className="formBtn" />
            </form>
            <button onClick={toggleEditingHandler} className="formBtn cancelBtn">Cancel</button>
          </React.Fragment>          
        ) : (
          <React.Fragment>
            <h4>{props.tweetObj.text}</h4>
            {props.tweetObj.attachmentUrl && (
              <img src={props.tweetObj.attachmentUrl} width="100px" height="100px" />
            )}
            {props.isOwner && (
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditingHandler}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </React.Fragment>
          
        )}      
      </div>
  )
};

export default Tweet;