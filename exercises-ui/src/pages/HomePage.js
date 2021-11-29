import ExerciseList from '../components/ExerciseList'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function HomePage() {

    const [exercises, setExercise] = useState([]);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises = {exercises}></ExerciseList>
            <Link to = "/add-exercise">Add Exercise</Link>
        </>
    );
}

export default HomePage