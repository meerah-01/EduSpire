import './signup.css'
import { Link } from 'react-router'

export function Signup () {
  return (
    <>
     <div className='formContainer'>
      <form action="" className='formField'>
        <h1>Sign Up</h1>
        <input type="text" placeholder='Enter Full Name'/>
        <input type="email" placeholder='Enter Email'/>
        <input type="password" placeholder='Enter Password'/>
        <input type="text" placeholder='Enter Program'/>
        <Link to='/dashboard'>
         <button className='submitBtn'>Submit</button>
        </Link>
       
      </form>
     </div>
    </>
  )
}