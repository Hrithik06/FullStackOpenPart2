const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const sum = parts.reduce((partialSum, part) => partialSum + part.exercises, 0)
    // .map(part => part.exercises)
    // const sum = exercises.reduce((partialSum, exercise)=> partialSum+exercise, 0)

    return (
        <h3>total of {sum} excerises</h3>
    )
}
const Part = ({ part }) => <p>    {part.name} {part.exercises}  </p>

const Content = ({ parts }) => (
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>
)


const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}


export default Course