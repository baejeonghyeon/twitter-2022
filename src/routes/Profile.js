import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(props.userObj.displayName);

  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // const getMyTweets = async () => {
  //   const tweets = await dbService
  //     .collection("tweets")
  //     .where("createId", "==", props.userObj.uid)
  //     .orderBy("createdAt", "asc")
  //     .get();

  //     console.log(tweets.docs.map((doc) => doc.data()));
  // };

  const onChangeHandler = (event) => {
    event.preventDefault();
    setNewDisplayName(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(props.userObj.displayName !== newDisplayName){
      await props.userObj.updateProfile({
        displayName: newDisplayName
      });

      props.refreshUser();
    };
  };

  // useEffect(() => {
  //   getMyTweets();
  // }, [])

  return (
    <div className="container">
      <form onSubmit={ onSubmitHandler } className="profileForm">
        <input type="text" placeholder="Change Your Nickname" onChange={ onChangeHandler } value={ newDisplayName } autoFocus className="formInput" />
        <input type="submit" value="Update Profile" className="formBtn" style={{
          marginTop: 10,
        }} />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Logout
      </span>
    </div>
  )
};

export default Profile;