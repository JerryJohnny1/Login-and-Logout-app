//importing the libraries we installed using npm
const express = require("express") 
const app = express ()
const { default: mongoose, syncIndexes } = require('mongoose');
const bcrypt = require("bcrypt")
const { name } = require("ejs")



mongoose.connect(process.env.DATABASE_URL, {useNewUrlparser:true, useUnifiedTopology:true},
    (err)=>{
        if (!err) console.log('db successfully connected');
        else{
            console.log('fail to connect')
        }
    })
    


const users = []




app.use(express.urlencoded({extended: false}))


app.post("/login", async (req, res)=>{
    try {
       const hashedPassword = await bcrypt.hash(req.body.password, 10)
       users.push({
        Id: Date.now().toString(), 
        email: req.body.email,
        password: hashedPassword
       })
       console.log(users); //displays new registerd users in the console
       res.redirect("/")
    } catch (e) {
res.redirect("/login")
    }
})

//configuring the register post function
app.post("/register", async (req, res)=>{
    try {
       const hashedPassword = await bcrypt.hash(req.body.password, 10)
       users.push({
        Id: Date.now().toString(),
        name: req.body.name, 
        email: req.body.email,
        password: hashedPassword
       })
       console.log(users); //displays new registerd users in the console
       res.redirect("/login")
    } catch (e) {
res.redirect("/register")
    }
})



//routes
app.get('/', (req, res)=>{
    res.render("index.ejs")
})

app.get('/login', (req, res)=> {
    res.render("login.ejs")
})
app.get('/register', (req, res)=> {
    res.render("register.ejs")
} )


app.listen(3000)