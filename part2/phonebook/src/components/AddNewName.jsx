
// eslint-disable-next-line react/prop-types
export const AddNewName = ({addPerson,newPersonName,newPersonNumber,  text,   text2, handleLogout, handleNameChange, handleNumberChange}) =>{


  return(
      <>
       <div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>

      <form onSubmit={addPerson}>
          <h2>add a new</h2>
          <p>{text}</p><input placeholder="write your name content" value={newPersonName} onChange={handleNameChange} />
          <p>{text2}</p><input placeholder="write your number content"value={newPersonNumber} onChange={handleNumberChange} />
          <button type="submit">add</button>
        </form>

       
      </>
    )
  }