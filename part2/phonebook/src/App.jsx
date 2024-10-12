import { useState, useEffect } from 'react'
import {AddNewName} from './components/AddNewName'
import {SearchPerson} from './components/SearchPerson'
import { FilterPersons } from './components/FilterPersons'
import personService from  './services/Persons'
import './index.css'
import { Notification } from './components/Notification'
import  { Person } from './components/Person'
import {LoginForm} from './components/LoginForm'
import loginService from './services/login'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPersonName, setNewPersonName] = useState('')
  const  [newPersonNumber, setPersonNumber] = useState('')
  const [searchName, setsearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


 useEffect(()=>{
  personService
  .getAll()
  .then(response => {
    setPersons(response.data)
  })
 }, [])

 useEffect(() => {
 
    const loggedUserJSON = window.localStorage.getItem('loggedPersonAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
        setUser(user)
        personService.setToken(user.token);
      
    }
  
}, [])

 const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService
    .login({
      username, 
      password
    })

    window.localStorage.setItem(
      "loggedPersonAppUser",  JSON.stringify(user)

    )
    personService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (e) {
    setErrorMessage('Wrong credentials', e)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogout = () => {
  console.log(user)
  try {
    if (user) { 
      setUser(null)
      personService.setToken(user.token)
      window.localStorage.removeItem('loggedPersonAppUser')
    }
  } catch (error) {
    console.error(`Error al cerrar sesión:`, error);
  }
};

 const handleDelete = (id) => {
  personService
    .delPerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setErrorMessage(`Person deleted successfully!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)    }).catch(error => console.error('Error deleting:', error));
    
}

const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    
    name: newPersonName,
    number: newPersonNumber
  }

  const existingPerson = persons.find(person => person.name.toLowerCase() === newPersonName.toLowerCase())

  if (existingPerson) {
    const confirm = window.confirm(`${newPersonName} is already added to phonebook, replace the old number with a new one ? `)
    if (confirm) {
      personService
        .update(existingPerson.id, { number: newPersonNumber })
        .then(() => {
          setPersons(persons.map(person => person.id === existingPerson.id ? { ...person, number: newPersonNumber } : person))
          setErrorMessage(`Person updated successfully!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  } else {
    personService
      .create(personObject)
      .then(response => {
        setPersons([...persons, response.data])
        setErrorMessage(`Person added successfully!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  setNewPersonName('')
  setPersonNumber('')
}


  const handleNameChange = (e) =>{
    setNewPersonName(e.target.value)  
  }
  const handleNumberChange = (e) =>{
    setPersonNumber(e.target.value)
  }

  const handleSearchChange = (e) =>{
    setsearchName(e.target.value)  
  }

  const toggleImportanceOf = id => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, important: !person.important }
  
    personService
      .update(id, changedPerson)
        .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        setErrorMessage(
          `Person '${persons.name} ${error}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.important)

  return (
    <>



    <Notification message={errorMessage} />

    
    
    {user
    ?<AddNewName
    onSubmit={addPerson} 
    value={newPersonName} 
    value2={newPersonNumber} 
    onChange={handleNameChange} 
    onChange2={handleNumberChange} 
    text={'name'} text2={'number'}
    onclick={handleLogout}
    />
    :<LoginForm
    handleLogin={handleLogin}
    username={username}
    password={password}
    handleUserNameChange={({target})=> setUsername(target.value)}
    handlePasswordChange={({target})=> setPassword(target.value)}
    />
    }

    <SearchPerson value={searchName} onChange={handleSearchChange}/>
      
  <div>
    <button onClick={() => setShowAll(!showAll)}>
      show {showAll ? 'important' : 'all' }
    </button>
  </div>

  <ul>
    {personsToShow.map(person =>{
      <Person 
      key={person.id}
      person={person}
      toggleImportance={() => toggleImportanceOf(person.id)}
      />
    })}
  </ul>

        <FilterPersons persons={persons} searchName={searchName} onDelete={handleDelete}/>

    </>
  )
}

export default App