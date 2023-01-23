const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const indexHTML = fs.readFileSync("index.html", "utf8");
    res.send(indexHTML);
    console.log('html done');
});

app.get("/style.css", (req, res) => {
    const styleCSS = fs.readFileSync("style.css", "utf8");
    res.set("Content-Type", "text/css");
    res.send(styleCSS);
    console.log('css done');
});

app.get("/index.js", (req, res) => {
    const indexJS = fs.readFileSync("index.js", "utf8");
    res.set("Content-Type", "text/javascript");
    res.send(indexJS);
    console.log('index done');
});

app.use("/images", express.static("images"));

app.get("/scores", (req, res) => {
    res.sendFile(path.join(__dirname, "scores.json"));
});


app.post("/scores", (req, res) => {
    fs.readFile("scores.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading scores file");
        }
        let scores;
        try {
            scores = JSON.parse(data);
        } catch (err) {
            return res.status(500).send("Error parsing scores file");
        }
        scores.kashi = req.body.kashi;
        scores.aliza = req.body.aliza;
        fs.writeFile("scores.json", JSON.stringify(scores), err => {
            if (err) {
                return res.status(500).send("Error writing scores file");
            }
            res.send({ message: "Scores updated successfully" });
            console.log('scores done');
        });
    });
});



app.listen(80, () => {
    console.log("Server is running on port 3000");
});
