import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChangeHandler = (event) => {
    if(event.target.name === 'email'){
      setEmail(event.target.value)
    } else if(event.target.name === 'password'){
      setPassword(event.target.value)
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try{
      let data;
      if(newAccount){
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email,password);
      }
      console.log(data);
    } catch(error){
      setError(error.message);
    }
    
  };

  const toggleAccountHandler = () => {
    setNewAccount((prevAccount) => !prevAccount);
  };

  const onSocialClick = async (event) => {
    let provider;
    if(event.target.name === 'google'){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(event.target.name === 'github'){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmitHandler} className="container">
        <input 
          name="email"
          type="email" 
          placeholder="Email"
          onChange={ onChangeHandler }
          value={ email }
          className="authInput"
          required />
        <input
          name="password"
          type="password"
          placeholder="Password" 
          onChange={ onChangeHandler }
          value={ password }
          className="authInput"
          required />
        <input 
          type="submit" 
          value={newAccount ? 'Create Account' : 'Log In'}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={ toggleAccountHandler } className="authSwitch">
        { newAccount ? 'Sign In' : 'Create Account' }
      </span>

      <div className="authBtns">
        <button onClick={ onSocialClick } name="google" className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
        <button onClick={ onSocialClick } name="github" className="authBtn">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
      </div>
    </div>
  );
};

export default Auth;