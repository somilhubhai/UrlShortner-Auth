const User = require("../models/user");
const {v4 : uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

async function handleUser(req , res) {
    const {name , email , password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req , res) {
    const {email , password} = req.body;
    const user = await User.findOne({email , password});
    if(!user) {
       return res.render("login" , {error : "invalid username and password"});
    }
    const token = setUser(user);
    res.cookie("token" , token);
    return res.redirect("/");
}
module.exports = {
    handleUser,
    handleUserLogin,
}