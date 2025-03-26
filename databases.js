var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();

const path = require("path");
const file = path.join(__dirname, "penar.db");
var db = new sqlite3.Database(file);

db.serialize(function () {
    // Ensure the table exists
    db.run("CREATE TABLE IF NOT EXISTS students (student_id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, age INTEGER, hobbies TEXT, email VARCHAR(100) UNIQUE, date_of_birth DATE, major TEXT)"
    , function (err) {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table 'Stuff' ensured.");
        }
    });
    
    db.run(
        "CREATE TABLE IF NOT EXISTS courses(course_id INTEGER PRIMARY KEY AUTOINCREMENT, course_name TEXT UNIQUE, teacher_name TEXT, description TEXT)" 
        , function (err) {
        if (err) console.error("Error creating 'courses' table:", err.message);
        else console.log("Table 'courses' ensured.");
    });

    // Create enrollments table (junction table)
    db.run("CREATE TABLE IF NOT EXISTS enrollments (enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER, course_id INTEGER, enrollment_date DATE DEFAULT CURRENT_DATE,FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE, FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE)"
        , function (err) {
        if (err) console.error("Error creating 'enrollments' table:", err.message);
        else console.log("Table 'enrollments' ensured.");
    });
   
    const stmt_student = db.prepare(
        `INSERT OR IGNORE INTO students (firstname, lastname, age, hobbies, email, date_of_birth, major) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    const stmt_course = db.prepare(
        `INSERT OR IGNORE INTO courses (course_name, teacher_name, description) 
         VALUES (?, ?, ?)`
    );
    
    //adding some data
    stmt_student.run("Alice", "Brown", 22, "Music, Painting", "alice@example.com", "2002-07-10", "Arts");
    stmt_student.run("Bob", "Johnson", 21, "Gaming, Sports", "bob@example.com", "2003-11-22", "Engineering");
    stmt_student.run("Bo", "Faber", 21, "Gaming, Sports", "bo@example.com", "2003-05-21", "Physics");
    stmt_course.run("Webtech", "Sergey Sosnovsky", "Webtechnology is a course about the creation of websites and webapps, in which the corresponding programming languages are learned: html, css and javascript are the most important ones.")
    stmt_course.run("structure of matter", "Raymond Snellings", "Structure of matter is a course about the physics you encounter when dealing with different reactions at the atomic level. You study not only atom reactions, but also the quarks, leptons, gluons, composite particles etc" )

    stmt_student.finalize();
    stmt_course.finalize();
});



//logging the tables 
db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) {
        console.error("Error retrieving students:", err.message);
    } else {
        console.log("Students:", rows);
    }
});

db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) {
        console.error("Error retrieving courses:", err.message);
    } else {
        console.log("Courses:", rows);
    }
});

// Close the database properly
db.close((err) => {
    if (err) {
        console.error("Error closing database:", err.message);
    } else {
        console.log("Database closed successfully!");
    }
});