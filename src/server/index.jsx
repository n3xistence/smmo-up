const express = require("express");
const db = require("./config/db.jsx");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM \`${id}\` ORDER BY date ASC` 

    db.query(query, (err, result) => {
        if (err){
            if (err.code === "ER_NO_SUCH_TABLE") return res.send("ER_NO_SUCH_TABLE")
            else return console.log(err)
        }
        let dataset = {
            name: result[result.length - 1].name,
            dates: [],
            steps: [],
            quests: [],
            levels: [],
            npc_kills: [],
            user_kills: []
        }

        // grab sequential data
        for (let i = 0;i < result.length;i++) {
            dataset.dates.push(result[i].date)
            dataset.steps.push(result[i].steps)
            dataset.quests.push(result[i].quests_performed)
            dataset.npc_kills.push(result[i].npc_kills)
            dataset.user_kills.push(result[i].user_kills)
            dataset.levels.push(result[i].level)
        }
        return res.send(dataset)
    });   

});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
