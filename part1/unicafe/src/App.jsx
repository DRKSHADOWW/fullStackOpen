import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}


const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  
        const totalVotes = good + neutral + bad
        const average = totalVotes === 0 ? 0 : (good - bad) / totalVotes
        const positive = totalVotes === 0 ? 0 : (good / totalVotes) * 100

        return (
          <>
           <h1>Give Feedback</h1>
           <table>
            <tr>
              <th>feedback</th>
              <th>Value</th>
            </tr>
            <tr>
              <td > <StatisticLine  text="Good" /> </td>
              <td style={{ textAlign: "center" }}> <StatisticLine value={good}  /></td>             
            </tr>
            <tr>
              <td> <StatisticLine text="Neutral" /> </td>
              <td style={{ textAlign: "center" }}> <StatisticLine value={neutral}  /></td>             
            </tr>
            <tr>
              <td> <StatisticLine text="Bad" /> </td>
              <td style={{ textAlign: "center" }}> <StatisticLine value={bad}  /></td>             
            </tr>
           </table>
            
        
          <h1>Statistics</h1>

          <table>
            <tr>
              <th>statistics</th>
              <th>Value</th>
            </tr>
            <tr>
              <td> <StatisticLine text="All " /> </td>
              <td style={{ textAlign: "center" }}> <StatisticLine value={totalVotes}  /></td>             
            </tr>
            <tr>
              <td> <StatisticLine text="Average" /> </td>
              <td style={{ textAlign: "center" }}> <StatisticLine value={average}  /></td>             
            </tr>
            <tr>
              <td> <StatisticLine text="Positive" /> </td>
              <td style={{ textAlign: "center" }}> <StatisticLine value={positive + "%"}  /></td>             
            </tr>
           </table>
          
          </>
        )
    
 
}



const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleClickGood = () =>{
    const newState = {
      good: state.good + 1,
      neutral: state.neutral,
      bad: state.bad
    }
    setState(newState)
  }

  const handleClickNeutral = () =>{
    const newState = {
      good: state.good,
      neutral: state.neutral + 1,
      bad: state.bad
    }
    setState(newState)
  }

  const handleClickBad = () =>{
    const newState = {
      good: state.good ,
      neutral: state.neutral,
      bad: state.bad + 1
    }
    setState(newState)
  }

  const hasFeedback = state.good + state.neutral + state.bad > 0
 
  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClickGood} text="Good" />
      <Button handleClick={handleClickNeutral} text="Neutral" />
      <Button handleClick={handleClickBad} text="Bad" />

      
      
      {hasFeedback ? (
        <Statistics good={state.good} neutral={state.neutral} bad={state.bad} />
      ) : (
        <h1>No feedback given</h1>
      )}
    
    </>
  )
}

export default App