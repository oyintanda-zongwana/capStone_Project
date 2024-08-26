import { compare } from 'bcrypt';
import { getUserDB } from '../model/usersDB.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

config();

const checkUser = async (req, res, next) => {
    const { email, userPass } = req.body;
    
    try {
        let user = await getUserDB(email);
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log("User found:", user); // Debug log

        let hashedPassword = user.userPass;
        
        console.log("Provided password:", userPass); // Debug log
        console.log("Hashed password from DB:", hashedPassword); // Debug log

        if (!userPass || !hashedPassword) {
            throw new Error("Missing password or hashed password");
        }

        let result = await compare(userPass, hashedPassword);

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

export {checkUser}