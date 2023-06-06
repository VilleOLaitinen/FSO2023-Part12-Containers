import { useState, useEffect } from 'react'
import NameFilter from './components/NameFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const updateNumber = (person, id) => {
    if (window.confirm(`${person.name} is already added to phonebook, do you wish to replace the old number?`)) {
      personsService
        .update(id, person)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNotification(`Number for ${person.name} has been updated`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(`Error: ${person.name} has already been removed from server.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      const personid = (persons.find(person => person.name === newName).id)
      updateNumber(nameObject, personid)
      setNewName('')
      setNewNumber('')
    } else {
      personsService
        .add(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNotification(`${newName} has been added!`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const delPerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsService
        .delet(id)
        .then(reutnedName => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`${person.name} has been successfully deleted.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(`Error: ${person.name} has already been removed from server.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <NameFilter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} delPerson={delPerson} />
    </div>
  )

}

export default App