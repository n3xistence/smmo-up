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
            current_data: result[result.length -1],
            dates: [],
            steps: [],
            quests: [],
            levels: [],
            npc_kills: [],
            user_kills: [],
            weekly_change: {
                steps: [],
                quests: [],
                levels: [],
                npc_kills: [],
                user_kills: []
            },
            monthly_change: {
                steps: [],
                quests: [],
                levels: [],
                npc_kills: [],
                user_kills: []
            }
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

        // grab historical data differences
        if (result.length > 14) {
            dataset.weekly_change.steps.push((result[result.length-1].steps - result[result.length-8].steps)/7)
            dataset.weekly_change.steps.push(result[result.length-1].steps - result[result.length-8].steps)
            dataset.weekly_change.steps.push(((result[result.length-1].steps - result[result.length-8].steps)-(result[result.length-8].steps - result[result.length-15].steps)))

            dataset.weekly_change.quests.push((result[result.length-1].quests_performed - result[result.length-8].quests_performed)/7)
            dataset.weekly_change.quests.push(result[result.length-1].quests_performed - result[result.length-8].quests_performed)
            dataset.weekly_change.quests.push(((result[result.length-1].quests_performed - result[result.length-8].quests_performed)-(result[result.length-8].quests_performed - result[result.length-15].quests_performed)))

            dataset.weekly_change.levels.push((result[result.length-1].level - result[result.length-8].level)/7)
            dataset.weekly_change.levels.push(result[result.length-1].level - result[result.length-8].level)
            dataset.weekly_change.levels.push(((result[result.length-1].level - result[result.length-8].level)-(result[result.length-8].level - result[result.length-15].level)))

            dataset.weekly_change.npc_kills.push((result[result.length-1].npc_kills - result[result.length-8].npc_kills)/7)
            dataset.weekly_change.npc_kills.push(result[result.length-1].npc_kills - result[result.length-8].npc_kills)
            dataset.weekly_change.npc_kills.push(((result[result.length-1].npc_kills - result[result.length-8].npc_kills)-(result[result.length-8].npc_kills - result[result.length-15].npc_kills)))

            dataset.weekly_change.user_kills.push((result[result.length-1].user_kills - result[result.length-8].user_kills)/7)
            dataset.weekly_change.user_kills.push(result[result.length-1].user_kills - result[result.length-8].user_kills)
            dataset.weekly_change.user_kills.push(((result[result.length-1].user_kills - result[result.length-8].user_kills)-(result[result.length-8].user_kills - result[result.length-15].user_kills)))

        } else {

            dataset.weekly_change.steps.push(-1)
            dataset.weekly_change.steps.push(-1)
            dataset.weekly_change.steps.push(0)

            dataset.weekly_change.quests.push(-1)
            dataset.weekly_change.quests.push(-1)
            dataset.weekly_change.quests.push(0)

            dataset.weekly_change.levels.push(-1)
            dataset.weekly_change.levels.push(-1)
            dataset.weekly_change.levels.push(0)

            dataset.weekly_change.npc_kills.push(-1)
            dataset.weekly_change.npc_kills.push(-1)
            dataset.weekly_change.npc_kills.push(0)

            dataset.weekly_change.user_kills.push(-1)
            dataset.weekly_change.user_kills.push(-1)
            dataset.weekly_change.user_kills.push(0)

        }
        
        if (result.length > 60) {
            dataset.monthly_change.steps.push((result[result.length-1].steps - result[result.length-31].steps)/30)
            dataset.monthly_change.steps.push(result[result.length-1].steps - result[result.length-31].steps)
            dataset.monthly_change.steps.push(((result[result.length-1].steps - result[result.length-31].steps)-(result[result.length-31].steps - result[result.length-61].steps)))

            dataset.monthly_change.quests.push((result[result.length-1].quests_performed - result[result.length-31].quests_performed)/30)
            dataset.monthly_change.quests.push(result[result.length-1].quests_performed - result[result.length-31].quests_performed)
            dataset.monthly_change.quests.push(((result[result.length-1].quests_performed - result[result.length-31].quests_performed)-(result[result.length-31].quests_performed - result[result.length-61].quests_performed)))

            dataset.monthly_change.levels.push((result[result.length-1].level - result[result.length-31].level)/30)
            dataset.monthly_change.levels.push(result[result.length-1].level - result[result.length-31].level)
            dataset.monthly_change.levels.push(((result[result.length-1].level - result[result.length-31].level)-(result[result.length-31].level - result[result.length-61].level)))

            dataset.monthly_change.npc_kills.push((result[result.length-1].npc_kills - result[result.length-31].npc_kills)/30)
            dataset.monthly_change.npc_kills.push(result[result.length-1].npc_kills - result[result.length-31].npc_kills)
            dataset.monthly_change.npc_kills.push(((result[result.length-1].npc_kills - result[result.length-31].npc_kills)-(result[result.length-31].npc_kills - result[result.length-61].npc_kills)))

            dataset.monthly_change.user_kills.push((result[result.length-1].user_kills - result[result.length-31].user_kills)/30)
            dataset.monthly_change.user_kills.push(result[result.length-1].user_kills - result[result.length-31].user_kills)
            dataset.monthly_change.user_kills.push(((result[result.length-1].user_kills - result[result.length-31].user_kills)-(result[result.length-31].user_kills - result[result.length-61].user_kills)))

        } else {
            dataset.monthly_change.steps.push(-1)
            dataset.monthly_change.steps.push(-1)
            dataset.monthly_change.steps.push(0)

            dataset.monthly_change.quests.push(-1)
            dataset.monthly_change.quests.push(-1)
            dataset.monthly_change.quests.push(0)

            dataset.monthly_change.levels.push(-1)
            dataset.monthly_change.levels.push(-1)
            dataset.monthly_change.levels.push(0)

            dataset.monthly_change.npc_kills.push(-1)
            dataset.monthly_change.npc_kills.push(-1)
            dataset.monthly_change.npc_kills.push(0)

            dataset.monthly_change.user_kills.push(-1)
            dataset.monthly_change.user_kills.push(-1)
            dataset.monthly_change.user_kills.push(0)
        }

        return res.send(dataset)
    });   

});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
