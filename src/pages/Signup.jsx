import React,{useState,useEffect} from 'react'
import {signup} from '../actions'

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';


const Signup = () => {
  const { currentColor} = useStateContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Navigate to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }




  return (
    <section className="register">

    <form onSubmit={userSignup}>
        <h3>register now</h3>
        <input placeholder="enter your name" id="" className="box"  value={firstName} type='firstname' onChange={(e) => setFirstName(e.target.value)}/>
        <input placeholder="enter your name" id="" className="box"  value={lastName} type='lastname'  onChange={(e) => setLastName(e.target.value)}/>
        <input  placeholder="enter your email" id="" className="box"  value={email} type='email'   onChange={(e) => setEmail(e.target.value)}/>
        <input  placeholder="enter your password" id="" className="box"  value={password} type='Password' onChange={(e) => setPassword(e.target.value)}/>
        <input style={{ backgroundColor: currentColor }} type="submit" onSubmit={ (e)=> e.preventDefault()}  value="register now" className="btn link" />
       
    </form>

</section>

  )
}

export default Signup