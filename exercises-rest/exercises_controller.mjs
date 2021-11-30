import * as exercise from './exercises_model.mjs';
import express from 'express';


const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/**
 * Create a new exercise with the title, year and language provided in the query parameters
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
            res.status(500).json({ error: 'Request failed' });
        });
});

/**
 * Retrive all exercises. 
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
            res.status(500).json({ error: 'Request failed' });
        });

});

/**
 * Update the exercise whose _id is provided and set its name, reps, weight, unit, and date to
 * the values provided in the query parameters
 */
app.put('/exercises/:_id', (req, res) => {
    console.log(req.params._id);
    exercise.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(updateCount => {
            if (updateCount === 1){
                res.type('application/json')
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, date: req.body.date})
            }else{
                res.status(500).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose _id is provided in the query parameters
 */
app.delete("/exercises/:_id", (req, res) => {
    exercise.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1){
                res.status(204).send()
            }
            else{
                res.status(500).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});