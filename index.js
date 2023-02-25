const express = require("express");
const app = express();
const path = require('path')
const fs = require("fs");

const PORT = 4000;

// Welcome

app.get("/", function (request, response) {
    response.send("Welcome, Bro!...")
});

// 1. Write an API endpoint which will create a text file in a particular folder

app.get("/create-file", function (request, response) {

    const dt = new Date()

    const path = './creating-file';
    const fileName = `${dt.getDate()} ${dt.getMonth() + 1} ${dt.getFullYear()} - ${dt.getHours()} ${dt.getMinutes()} ${dt.getSeconds()}.txt`;
    const content = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;

    console.log(dt.getMonth())

    fs.writeFile(`${path}/${fileName}`, content, (err) => {
        if(err){
            console.log(err)
            response.send("Error creating a File")
        }
        else{
            response.send('File created Successfully')
        }
    })
});

// 2. Write an API endpoint to retrieve all the text files in that particular folder

app.get("/retrieve-files", function (request, response) {
    const srcfolderPath = '/Users/Nithish Kumar/Desktop/FSD/ReactProjects/Tasks/Day 39 task/retrieve-folder';

    const files = fs.readdirSync(srcfolderPath);
    const allFiles = files.filter((file) => path.extname(file) === '.txt');
    response.send(allFiles)
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
