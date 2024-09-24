import { useState } from 'react'

const Anecdote = ({anecdotes, anecdoteVotes}) =>{
  return(
    <>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes}</p>
        <p>Votes:  {anecdoteVotes}</p>
    </>
  )
}

const Button = ({onClick, text}) =>{
  return(
    <>
    <button onClick={onClick}>{text}</button>
    
    </>
  )
}

const MostVoted = ({mostVotedAnec, mostVotedVotes}) =>{
  return(
    <>
    <h1>Anecdote with most Votes</h1>
    <p>{mostVotedAnec}</p>
    <p>Votes: {mostVotedVotes}</p>
    </>
  ) 
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
 
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleClickNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    setVotes({
      ...votes,
      [anecdotes[selected]]: (votes[anecdotes[selected]] || 0) + 1
    })
    
  }
  const mostVotedAnecdote = () => {
    let maxVotes = 0;
    let mostVoted = '';
  
    for (const anecdote in votes) {
      if (votes[anecdote] > maxVotes) {
        maxVotes = votes[anecdote];
        mostVoted = anecdote;
      }
    }
  
    return { anecdote: mostVoted, votes: maxVotes };
  }

  const mostVoted = mostVotedAnecdote()
  const votesAnecdote = votes[anecdotes[selected]] ? votes[anecdotes[selected]] : 0

  return (
    <>
    <Anecdote anecdotes={anecdotes[selected]} anecdoteVotes={votesAnecdote} />
    <Button onClick={handleVote} text="Vote" />
    <Button onClick={handleClickNextAnecdote} text="next anecdote" />
    <MostVoted mostVotedAnec={mostVoted.anecdote} mostVotedVotes={mostVoted.votes}/>
  </>
  )
}

export default App