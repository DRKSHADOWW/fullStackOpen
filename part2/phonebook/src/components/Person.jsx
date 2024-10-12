export const Person = ({ person, toggleImportance }) => {
  const label = person.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {person.name} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}