const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts/", (req, res) => {
    Workout.find({})
        .then(workoutDb => {
            res.json(workoutDb)
        }).catch(err => {
            res.json(err)
        })
});

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(workoutDb => {
            res.json(workoutDb);
        })
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {
            $push: {
                exercises: body
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).then(workoutDb => {
        res.json(workoutDb);
    })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;