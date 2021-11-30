import ExerciseList from '../components/ExerciseList'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';

function HomePage() {

    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        const response = await fetch (`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204){
            setExercises(exercises.filter( e => e._id !== _id));
        } else{
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const loadExercises = async () => {
        const response = await fetch ('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect ( () => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises = {exercises} onDelete = {onDelete}></ExerciseList>
            <Link to = "/add-exercise">Add Exercise</Link>
        </>
    );
}

export default HomePage;