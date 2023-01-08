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
    const query = `SELECT * FROM \`${id}\` ORDER BY date ASC` 

    db.query(query, (err, result) => {
        // error handling
        if (err){
            if (err.code === "ER_NO_SUCH_TABLE") return res.send("ER_NO_SUCH_TABLE")
            else return console.log(err)
        }
        var format_res = {};
        var dates = [];
        var steps = [];
        var quests = [];
        var levels = [];
        var npc_kills = [];
        var user_kills = [];

        // grab sequential data
        for (var i = 0; i < result.length; i += 1) {
            var info = result[i]
            dates.push(info.date)
            steps.push(info.steps)
            quests.push(info.quests_performed)
            npc_kills.push(info.npc_kills)
            user_kills.push(info.user_kills)
            levels.push(info.level)
        }

        format_res["dates"] = dates
        format_res["steps"] = steps
        format_res["quests"] = quests
        format_res["levels"] = levels
        format_res["npc_kills"] = npc_kills
        format_res["user_kills"] = user_kills
        format_res["current_data"] = result[result.length - 1]

        // currently, this will only return their name for testing purposes
        return res.send(format_res)
    });   

});

// <add Routes here>



// </add Routes here>

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
