const Contact =({person}) => {
    const {name, number} = person
    // console.log('hello',person.name)
    return(
     <p>{name} {number} </p> 

    )
}
export default Contact