
import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import { studentRouter } from "./Routes/StudentRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //for token
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/student', studentRouter);
//to access server side in our frontend
app.use(express.static('public'));

// Verifying user middleware
const verifyUser = (req, res, next) => {
    // Fetch token
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) return res.json({ status: false, Error: "invalid token" });
            req.id = decoded.id;
            req.role = decoded.role; // Set req.role
            next();
        });
    } else {
        return res.json({ status: false, Error: "Not authenticated" });
    }
};

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, role: req.role, id: req.id });
});


app.listen(5000, () => {
    console.log("server is running")
})