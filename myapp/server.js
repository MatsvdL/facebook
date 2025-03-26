/*var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');

//default options
app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'HW3')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload', function(req, res) {
    let photoFile;
    let uploadPath;
    if (!req.files || req.files.length ===0) {
        return res.status(400).send('No files were uploaded.');
    }


//The name of the input field is used to retrieve the uploaded file
photoFile = req.files.photo;
uploadPath = path.join(__dirname, 'userData', 'photos' + photoFile.name);
const uploadDir = path.join(__dirname, 'userData', 'photos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
//Place the file on the server
photoFile.mv(uploadPath, function(err) {
    if (err)
        return res.status(500).send(err);
    res.send('File uploaded!')
});
});


/*document.getElementById('dynamicForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll('input[name="items[]"]');
    let arrayData = Array.from(inputs).map(input => input.value).filter(value => value.trim() !== "");

    console.log(arrayData);
    alert("Array stored: " + JSON.stringify(arrayData));
});

    




app.get('/processForm', function(req,res){
    let name = req.query.name;
    let gender = req.query.gender;
    let salutation = (gender ==="male")? "Mr." : "Ms.";
    res.status(200).send('Dear' + salutation + '' + name +
        ', thank you for submitting your contact info\n');

    }
);
app.listen(8023);*/

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();

// Enable file upload
app.use(fileUpload());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'userData', 'photos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// File upload route
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let photoFile = req.files.photo;
    let uploadPath = path.join(uploadDir, photoFile.name);

    photoFile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded successfully!');
    });
});

// Process form submission
app.get('/processForm', function(req, res) {
    let name = req.query.name;
    let gender = req.query.gender;
    let salutation = (gender === "male") ? "Mr." : "Ms.";
    res.status(200).send(`Dear ${salutation} ${name}, thank you for submitting your contact info.`);
});

// Start server
const PORT = 3000; // Change if needed
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


/*const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello, Express!");
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));*/


