const Contact = ({ person ,  deletePerson }) => {
    const { name, number } = person
    // console.log('hello',person.name)
    return (
        <p>{name} {number} <button onClick={deletePerson}>delete</button></p>

    )
}
export default Contact