import React,{useState} from 'react'
import { login } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';


const Signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();


  const dispatch = useDispatch();

  


  const userLogin = (e) => {

      e.preventDefault();

      const user = {
          email, password
      }

      dispatch(login(user));
  }

  if(auth.authenticate){
      return <Navigate to={`/`} />
  }


  return (
    <section className="login">

    <form onSubmit={userLogin}>
        <h3>login now</h3>
        <input type="email" name="" placeholder="enter your email" id="" className="box"  value={email}  onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="" placeholder="enter your password" id="" className="box" value={password}   onChange={(e) => setPassword(e.target.value)} />
        <div className="remember">
            <input type="checkbox" name="" id="remember-me"/>
            <label for="remember-me"> remember me </label>
        </div>
        <input onSubmit={ (e)=> e.preventDefault()} type="submit" value="login now" style={{ backgroundColor: currentColor }} className="btn link" />
    </form>

</section>
  )
}

export default Signin