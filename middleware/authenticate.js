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
        console.log("userRole:", user.userRole);
        

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
            req.body.userRole = user.userRole;
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
    const cookie = req.headers.cookie; // Correct header name is 'cookie'
    
    // checks if the token exists first
    let token;
    if (cookie) {
        const cookies = cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
        if (tokenCookie) {
            token = tokenCookie.split('=')[1];
        }
    }
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token has expired or is invalid' });
        }
        req.body.user = decoded.username; // Add decoded username to request body
        console.log(req.body.user); // Fixed the log statement
        next(); // Ensure 'next' is called inside the verify callback
    });
};


export {checkUser, verifyAToken}