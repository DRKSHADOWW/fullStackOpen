
import { Togglable } from "./Togglable"
// eslint-disable-next-line react/prop-types
export const LoginForm = ({handleLogin, username, handleUserNameChange, password, handlePasswordChange}) =>{
  
  return (
  <>
      

      <Togglable showLogin={'show login'}>
      <form onSubmit={handleLogin}>
        <div>
        username: 
            <input
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={handleUserNameChange}
        /> 
        </div>
        <div>
        password:
            <input
            type="password"
            value={password}
            name="Password"
            placeholder="password"
            onChange={handlePasswordChange}
        />
        </div>
       
        <button type="submit">login</button>
       
    </form>
   
      </Togglable>
  
      
    
  </>
  )
}