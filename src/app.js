const express =require("express");
require("../src/db/conn");
const register=require("./models/registers");

const path =require("path");
const hbs =require("hbs");
const { log } = require("console");
const Register = require("./models/registers");

const app =express();
const Port = process.env.Port || 8000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register");
})


app.get("/login",(req,res)=>{
    res.render("login");
})




app.post("/register",async(req,res)=>{
    try{
   const password =req.body.password;
   const cpassword =req.body.repeatpassword;
   if(password===cpassword){

   const regEmp = new Register({
    Name: req.body.name,
    Email : req.body.email,
    Password : req.body.password,
    Repeat_Password : req.body.repeatpassword
   })
     
 const registered= await regEmp.save();
  res.status(201).render("index");


   }else{
    res.send("password is not matching");
   }

    }catch(error){
       res.status(400).send(error);
    }
})



app.post("/login",async(req,res)=>{
    try{

     const Email = req.body.email;
     const Password =req.body.psw;
      
         const useremail = await Register.findOne({Email:Email});
         if(useremail.Password===Password){
            res.status(201).render("index");
         }else{
            res.send(" invalid logIn detail");
        }


    }catch(error){
        res.status(400).send("invalid logIn detail");
    }

})




app.listen(Port,()=>{
    console.log(`connected the port is ${Port}`);
})