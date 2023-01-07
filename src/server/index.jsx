const express = require("express");
const db = require("./config/db.jsx");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

/*
    you can write pseudo code if you don't know the specifics, I'll fix the holes later
    if you do, please annotate every block with //pseudo

    Route to get one user
    /api/user/:id is the route we need to call in order to talk to the backend through axios, 
    where :id is what we pass into the route as a parameter
*/

app.get("/api/user/:id", (req, res) => {
    // this is the parameter getting passed in the request
    const { id } = req.params;
    const query = `SELECT * FROM \`${id}\`` 

    db.query(query, (err, result) => {
        // error handling
        if (err){
            if (err.code === "ER_NO_SUCH_TABLE") return res.send("ER_NO_SUCH_TABLE")
            else return console.log(err)
        }

        // currently, this will only return their name for testing purposes
        return res.send(result[0].name)
    });   
});

// <add Routes here>



// </add Routes here>

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
