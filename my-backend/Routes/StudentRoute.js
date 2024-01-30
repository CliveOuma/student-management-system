
import express from 'express'
import con from "../utils/db.js"
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt';

const router = express.Router()

router.post('/student_login', (req, res) => {
    const sql = "SELECT * from users  where name = ? AND admno = ?";
    const values = [req.body.name, req.body.admno];

    con.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "query error" });
        }

        if (result.length > 0) {
            const name = result[0].name;
            const token = jwt.sign(
                { role: "student", name: name, id: result[0].id }, 
                "jwt_secret_key", { expiresIn: '1day' }
            );

            res.cookie('token', token);
            return res.json({ loginStatus: true, id: result[0].id });
        } else {
            return res.json({ loginStatus: false, Error: "wrong Name or Admno" });
        }
    });
});

//view student detail
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ status: false });
        return res.json(result)
    });
});

//student logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
});

export { router as studentRouter }
