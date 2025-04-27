const { Router } = require('express');
const user = Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    port:"3306",
    user: "root",
    password: "root",
    database: "crud"
});

user.get("/get", (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching data",
                error: err
            });
        }

        
        return res.status(200).json({
            message: "Successfully received data",
            data: results 
        });
    });
});

user.post("/create",(req,res) => {
    console.log("req.body:",req.body,)
    const {name,phone,email,age,gender,salary} = req.body;
    console.log("-------------------valuefrom create api:",name,phone,email,age,gender,salary);
    let query = `INSERT INTO users (name, phone, email, age, gender, salary) VALUES (?, ?, ?, ?, ?, ?)`;
    let response = db.query(query,[name,phone,email,age,gender,salary],(error,value) => {
        if(error){
           
            return res.status(500).json({
                message:"Internel Server Error",
                data:error
            })
        }
        return res.status(200).json({
            message:"Successful",
            data:value
        })
    
    })
})
user.post("/edit",(req,res) =>{

    const {id} = req.body;
    console.log("====",id)
    db.query('SELECT * FROM users WHERE id=?',[id],(err,answer) =>{
        if(err){
            return res.status(500).json({
                message: "Error fetching data",
                error: err
            });
        }
        console.log("==============answer",answer)
        return res.status(200).json({
            message:"Successfully Working",
            data:answer
        });
    });

});

user.post("/update",(req,res) => {
    console.log("req.body:",req.body)
    const {id,name,phone,email,age,gender,salary} = req.body;
    console.log("-------------------valuefrom create api:",name,phone,email,age,gender);
    let query = `UPDATE users SET name=?, phone=?, email=?, age=?, gender=?, salary=? WHERE id=?`;
    let response = db.query(query,[name, phone, email, age, gender, salary,  id],(error,value) => {
        if(error){
           
            return res.status(500).json({
                message:"Internal Server Error",
                data:error
            })
        }
        return res.status(200).json({
            message:"Successful",
            data:value
        })
    
    })
})

user.post("/delete",(req,res) =>{
    const del = req.body.value;
    db.query('DELETE FROM users WHERE id=?',[del],(err,result) =>{
        if(err){
            return res.status(500).json({
                message: "Error fetching data",
                error: err
            });
        }
        return res.status(200).json({
            message: "Successfully working",
            data: result
        });
    });
});


module.exports = user;
