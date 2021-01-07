const {exec} = require("child_process");
const express = require("express");
const app = express();
const fs = require('fs');
const crypto = require('crypto');

const hash = crypto.createHash('sha256').update(fs.readFileSync('./data.txt').toString()).digest('hex');

app.get("/", (req, res) => {
    const data = fs.readFileSync('./data.txt').toString();
    const dataHash = crypto.createHash('sha256').update(data).digest('hex');
    if(hash === dataHash) 
        res.send(data);
    else
        process.exit()
});

app.get("/ransome_attack", (req, res) => {
    exec("node ransomewareEncrypt.js", (err) => {
        const data = fs.readFileSync('./data.txt').toString();
        const dataHash = crypto.createHash('sha256').update(data).digest('hex');
        if(hash === dataHash) 
            res.send(data);
        else
            process.exit()
    })
});

app.listen(8080, () => {
    console.log("Server Started");
})