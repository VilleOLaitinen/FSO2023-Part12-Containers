const Persons = ({ persons, filter, delPerson }) => {

    const filteredNames = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <ul>
            {filteredNames.map(person =>
                <li key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => delPerson(person.id)}>delete</button>
                </li>)}
        </ul>
    )
}

export default Persons