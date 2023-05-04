import { useState } from 'react'
import Person from './components/Person'
import PersonForm  from './components/PersonForm'
import Filter from './components/Filter'
const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  const [persons, setPersons] = useState([  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

const [showAll, setShowAll] = useState(true)

const personsNameArray = persons.map(person => person.name)


  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
  
    if (personsNameArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }


    setNewName('')
    setNewNumber('')
    // setSearchName('')

  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    // console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    // console.log(newName)
  }

  const handleSearchChange = (event) =>{
    setShowAll(false)
    setSearchName(event.target.value)
  }
  // console.log(persons)
  console.log(searchName)
  const checkSearch = (personName) => (personName.includes(searchName))
const copy = personsNameArray.filter(checkSearch)



console.log(copy)

const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(searchName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>



      {/* filter shown with <input  /> */}


      <h2>Add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      {/* <div>debug: {newName}</div> */}
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />)}
    </div>

  )
}

export default App