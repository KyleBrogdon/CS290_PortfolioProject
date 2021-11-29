import * as exercise from './exercises_model.mjs';
import express from 'express';
import { Exercise } from './exercises_model.mjs';
import  * as mongoose  from 'mongoose';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/**
 * Create a new movie with the title, year and language provided in the query parameters
 */
app.post("/exercises", (req, res) => {
    console.log(req.query);
    exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.type('application/json')
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: 'Request failed' });
        });
});

/**
 * Retrive movies. 
 * If the query parameters include a year, then only the movies for that year are returned.
 * Otherwise, all movies are returned.
 */
app.get("/exercises", (req, res) => {
    console.log(req.query);
    let filter = {}
    exercise.findExercise(filter, '', 0)
        .then(exercise => {
            console.log(exercise)
            res.type('application/json')
            res.status(200).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });

});

/**
 * Update the movie whose _id is provided and set its title, year and language to
 * the values provided in the query parameters
 */
app.put('/exercises/:_id', (req, res) => {
    console.log(req.params._id);
    exercise.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(updateCount => {
            if (updateCount === 1){
                res.type('application/json')
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, date: req.body.date})
            }else{
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: 'Request failed' });
        });
});

/**
 * Delete the movie whose _id is provided in the query parameters
 */
app.delete("/exercises/:_id", (req, res) => {
    exercise.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1){
                res.status(204).send()
            }
            else{
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});