const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const db = mysql.createPool({
  host: "db4free.net",
  user: "prateek",
  password: "abcd1234",
  database: "prom_db",
});

app.use(express.json());

app.options("*", cors())

app.use(cors({
    origin:"*",
    methods:["GET","POST"],
    credentials:true,
    accessControlAllowOrigin: "*"
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key:"prateek",
    secret:"password",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: 60*60
    }

}));

// app.get("/", (req, res) => {

//     // db.connect();
//   const sqlInsert =
//     'INSERT INTO reg_info (name, password) VALUES ("Prateek","pass3")';
//   db.query(
//     sqlInsert,
//     (err, result) => {
//         if (err) throw err;
//         res.send("Is there any difference?")
//     }
//   );
// });

app.get("/",(req,res)=>{
    res.send("Server is up and running")
})

app.post("/api/insert",(req,res)=>{
    const sql1 = 'INSERT INTO reg_info (name, password) VALUES (?,?)';
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    db.query(sql1,[userName,userPassword],(err,result)=>{

    })
})

app.post("/register",(req,res)=>{
    const sql1 = 'INSERT INTO reg_info (name, password) VALUES (?,?)';
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    db.query(sql1,[userName,userPassword],(err,result)=>{
        if (err) throw err
        console.log(result)
    })
})

app.post("/check",(req,res)=>{
    const sql1 = 'SELECT * FROM reg_info WHERE name=? AND password=?';
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    db.query(sql1,[userName,userPassword],(err,result)=>{
        if (err) res.send(err)
        if (result.length>0){
            req.session.user = result;
            console.log(result);
            res.send(result);
        } else {
            res.send({message: "Wrong Credentials"})
        }
    })
})

// app.get("/login", (req, res) => {
//   res.send("This will be not be the login page");
// });

app.listen(3001, () => {
  console.log("Express is working");
});
