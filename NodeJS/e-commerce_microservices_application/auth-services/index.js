const express = require("express");
const mongoose = require("mongoose");
const User = require("./User");
const jwt = require('jsonwebtoken')
const app = express();
const PORT = 5000;
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/auth-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`auth servies DB connnected`)
})
//register

app.post("/auth/reg", async (req, res) => {
    const { email, password, fullname } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({
            sucess: 0,
            message: "User alredy exits"
        })
    }
    else {
        const newUser = new User({
            email,
            fullname,
            password
        });
        newUser.save();
        return res.json(newUser);
    }
});

// login

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ sucess: 0, message: 'user does not exits' })
    }
    else {
        if(password !== user.password){
            return res.json({sucess: 0, message: "Incorrect password"})
        }
        const payload = {
            email,
            fullname: user.fullname,
        };
        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err);
            else {
                return res.json({ token: token });
            }
        });
    }
})


app.listen(PORT, () => {
    console.log(`Auth services at port ${PORT}`);
})