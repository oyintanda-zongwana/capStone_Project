import { compare } from 'bcrypt';
import { getUserDB } from '../model/userDB.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

config();

const checkUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        let user = await getUserDB(email);
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log("User found:", user); // Debug log

        let hashedPassword = user.password;
        
        console.log("Provided password:", password); // Debug log
        console.log("Hashed password from DB:", hashedPassword); // Debug log

        if (!password || !hashedPassword) {
            throw new Error("Missing password or hashed password");
        }

        let result = await compare(password, hashedPassword);

        if (result) {
            let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            console.log("Generated token:", token); // Debug log
            req.body.token = token;
            next();
        } else {
            res.status(401).send("Password is incorrect");
        }
    } catch (error) {
        console.error("Error in checkUser:", error);
        res.status(500).send("Internal server error: " + error.message);
    }
};

const verifyAToken = (req, res, next) => {
    let {cookie} = req.headers;
    // checks if the token exists first
    let token = cookie && cookie.split("=")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.json({message: 'token has expired'});
            return;
        }
        req.body.user = decoded.username
        console.log(req.body.username);
    })
    console.log(token);
    next();
};

export {checkUser, verifyAToken}