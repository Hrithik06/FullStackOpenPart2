import { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phoneService from './services/phoneService'
const App = () => {

  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notifMsg, setNotifMsg] = useState(null)
  const [showAll, setShowAll] = useState(true)

  const personsNameArray = persons.map(person => person.name)


  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (personsNameArray.includes(personObject.name)) {
      // alert(`${newName} is already added to phonebook`)
      const msg = `${newName} is already added to phonebook, replace the old number with a new one?`

      if (window.confirm(msg)) {
        const person = persons.find(p => p.name === personObject.name)
        const changedPerson = { ...person, number: personObject.number }
        phoneService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setNotifMsg(
              `Information of ${personObject.name} has already been removed from server`
            )
            setTimeout(()=> setNotifMsg(null), 5000)
            setPersons(persons.filter(p => p.id !== personObject.id))
          })
      }

    } else {

      phoneService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setNotifMsg(`Added ${personObject.name}`)
      setTimeout(() =>
        setNotifMsg(null)
        , 5000)
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    // setSearchName('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      // const personsUpdated = persons.filter(p => p.id !== person.id)
      phoneService.deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
        .catch(error => {
          alert('Fail')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    // console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    // console.log(newName)
  }

  const handleSearchChange = (event) => {
    setShowAll(false)
    setSearchName(event.target.value)
  }
  // console.log(persons)

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMsg} />
      <Filter
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person)}
        />)}
    </div>

  )
}

export default App