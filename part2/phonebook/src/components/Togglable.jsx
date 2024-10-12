import { useState } from "react"

export const Togglable = ({children, showLogin}) =>{

    const [Visible, setVisible] = useState(false)
  
  const hideWhenVisible = {display: Visible? 'none': ''}
  const showWhenVisible = {display: Visible? '': 'none'}

    return(
        <>
        <div style={hideWhenVisible}>
        <button onClick={()=> setVisible(true)}>{showLogin}</button>
        </div>

        <div style={showWhenVisible}>
        {children}
        <button onClick={()=> setVisible(false)}>cancel</button>
        </div>


        </>
    )
}