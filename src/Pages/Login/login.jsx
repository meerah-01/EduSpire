import { Link } from 'react-router'
import './login.css'

export function Login () {
  return (
    <>
    <div className="login-container">
      <div className="intro">
        <h1>Welcome Back!</h1>
        <p>Access your academic information, results, and assignments all in one place.</p>
      </div>
      <div className="sign-up">
        <h2>Login</h2>
          <input type="email" placeholder='Your email' required/>
          <input type="password" placeholder='Your password' required/>
          <Link to="/dashboard"><button className='signBtn'>Login</button> </Link>
          <p>Don't have an account? 
            <Link to="/signup">
             <span>Sign up</span>
            </Link>
          </p>
      </div>
    </div>
    </>
  )
}