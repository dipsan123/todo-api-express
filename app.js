// Importing the express module 

const express = require('express');
const app = express();
app.use (express.json());


PORT = 3000; 

// creating a server 
app.get ('/', (req,res)=>{

    res.send ('Welcome to the express server'); 
    


}); 


// Defining the routes and Data module 
let todo= []; //! In memory data store 
let nextId = 1; //! ID  counter 

// Get/ todos ---- Retrieve all data 
app.get ('/todos', (req,res)=>{
    res.json(todo); // res.json pick the data from the frontend and store into the todo variables 

}); 


// POST /todos ---add a new todo 
app.post ('/todos', (req,res)=>{
    const {title}= req.body; 
    const newTodo= {
        id : nextId++, 
        title: title, 
        completed: false
    }; 

    todo.push(newTodo);  //! todo .push () help to push the data from the newTdo; 
    console.log(todo);
    res.json(todo);
}); 

// PUT /todos/:id ---- Update a todo by id
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert id to a number
    const { title, completed } = req.body; // Destructure completed along with title
    const todos = todo.find(t => t.id === id); 

    if (todos) {
        if (title !== undefined) todos.title = title; 
        if (completed !== undefined) todos.completed = completed; 
        res.json(todos); // Send back the updated todo
    } else { 
        res.status(404).json({
            error: 'Not Found',
        });
    }
}); 

// DELETE /todos/:id ---- Delete a todo by id
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert id to a number
    const todoIndex = todo.findIndex(t => t.id === id);

    if (todoIndex !== -1) {
        todo.splice(todoIndex, 1); 
        res.status(200).json({ message: 'Todo deleted successfully' }); // Send a success message
    } else {
        res.status(404).json({
            error: 'Not Found', // Return error if id not found in the todo list
        });
    }
});




// Listening on the port number and server 
app.listen( PORT , ()=>{
    console.log(' server is lsitening on port '+ PORT ); 

})