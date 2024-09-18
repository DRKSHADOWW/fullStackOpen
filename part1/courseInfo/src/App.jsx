const Header = ({course}) => <h1>{course}</h1>

const Content = (props) =>{
  return (
    <>
    <p>{props.parts[0].name} {props.parts[0].exercises}</p>
    <p>{props.parts[1].name} {props.parts[1].exercises}</p>
    <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    
    </>

  )
}

const Total = ({total}) => <p> Total Exercises: {total}</p>
  
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  let totalExercises = 0
  for (let i = 0; i < parts.length; i++) {
    totalExercises += parts[i].exercises
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
<<<<<<< HEAD:part1/courseInfo/src/App.jsx
      <Total total={totalExercises}/>
=======
      <Total total={totalExercises}/> 
>>>>>>> 7dc2d516bd95bc138ccf02ce1939546a574d23a7:part1/src/App.jsx
    </div>
  )
}

export default App
