const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 7
    },
    price: {
        type: Number,
        required: false,
        min: 0
    },
    duration: {
        type: Number,
        required: false,
        min: 0
    },
    image: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

/*courseSchema.methods.toJSON = function () {
    const course = this
    const courseObject = course.toObject()

    courseObject.autor=courseObject.owner.name
    delete courseObject.owner

    return courseObject
}*/

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;