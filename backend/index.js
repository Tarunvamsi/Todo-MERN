const express = require("express");
const app = express();
const port=3000;
const {createTodo, updateTodo} = require("./types");
const { todo } =require("./db");
const zod = require("zod");

app.use(express.json());


app.get("/todos", async function(req, res){
    const todos = await todo.find({});
    res.json({
        todos
    })

})

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg: " you sent the woring inputs",
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description : createPayload.description,
        completed : false
    })

    res.json({
        msg: "Todo created"
    })

    
})

app.put("/completed", async function(req, res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!updatePayload.success){
        res.status(411).json({
            msg: " you sent the woring inputs",
        })
        return;
    }
    await todo.update({
        _id: req.body.id 
    },{
        completed: true
    })
    req.json({
        msg: "Marked completed"
    })
    
})

app.listen(3000);