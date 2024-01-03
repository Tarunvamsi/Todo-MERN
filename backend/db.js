const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://vamsik1643:vamsik1643@cluster0.bjo7qbt.mongodb.net/")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports={
    todo
}