const express = require('express');
const Course = require('../model/course');
const Buy = require('../model/buy');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/course', auth, async (req, res) => {
    const course = req.body;
    course.owner = req.user._id;
    const newCourse = new Course(course);

    try {
        await newCourse.save();
        delete newCourse.owner;
        res.status(201).send(newCourse);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/course/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const course = await Course.findById(_id);

        if (!course) {
            return res.status(404).send();
        }

        res.send(course);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/course/:id/buy', auth, async (req, res) => {
    const courseID = req.params.id;
    const userID = req.user._id;
    const newBuy = {
        courseID: courseID,
        userID: userID
    };
    Buy.find(newBuy, async function (err, docs) {
        if (docs.length){
            res.status(400).send({ error: 'Already bought!' });
        } else {
            newBuy.date = new Date();
            const buy = new Buy(newBuy);
            console.log(buy);
            try {
                await buy.save();
                res.status(201).send(buy);
            } catch (e) {
                res.status(400).send(e);
            }
        }
    });
});

router.patch('/course/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const course = await Course.findById(req.params.id);

        updates.forEach((update) => course[update] = req.body[update]);
        await course.save();

        if (!course) {
            return res.status(404).send();
        }

        res.send(course);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/course/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            res.status(404).send();
        }

        res.send(course);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router