const ex = require("express");
const Course = require("../models/course")
const router = ex.Router()

router.get("/", (req, res) => {
    res.send("This is sample");
})
router.get("/allCourses", async (req, res) => {
    try {
        const course = await Course.find();

        res.json(course);
    } catch (err) {
        res.json(err);
    }
})


router.post("/addcourse", async (req, res) => {
    try {
        console.log("does this printing body" + req.body)
        const course = await Course.create(req.body);
        res.json(course);
    } catch (err) {
        res.json(err)
    }
})

router.delete("/deletecourse/:courseId", async (req, res) => {
    try {
        const course = await Course.remove({_id : req.params.courseId});
        res.json(course);
    } catch (err) {
        res.json(err)
    }
})

router.put("/update/:courseId", async (req, res) => {
    const courseId = req.params.courseId
    try {
        const course = await Course.updateOne({_id : 
         courseId },req.body);
        res.json(course);
    } catch (err) {
        res.json(err)
    }
})



module.exports = router;