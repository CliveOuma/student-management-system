import express from 'express'
import con from "../utils/db.js"
import jwt from 'jsonwebtoken'


const router = express.Router()

//Admin login
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin  where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
            { role: "admin", email: email, id: result[0].id }, 
            "jwt_secret_key", { expiresIn: '1day' }

            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password"});
        }
    });
});



//Insert student to the database
router.post('/add_student', (req, res) => {
    const sql = `INSERT INTO users (name, admno, course, unit, score) VALUES (?, ?, ?, ?, ?)`;

    const values = [
        req.body.name,
        req.body.admno, 
        req.body.course,
        req.body.unit,
        req.body.score
    ];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ status: false, Error: "Query Error" });
        }

        return res.json({ status: true });
    });
});


//get student list after adding to database
router.get('/student', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if(err) return res.json({status: false, Error: "query Error"})
        return res.json({status: true, Result: result})
    }
    )
})

router.get('/student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({status: false, Error: "query Error"})
        return res.json({status: true, Result: result})
    }
    )
    
})

//Update the student
router.put('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE users SET name=?, course=?, unit=?, score=? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.course,
        req.body.unit,
        req.body.score,
        id,
    ];

    console.log("Received data:", values);

    con.query(sql,[...values,id], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.json({ status: false, error: "Query Error" + err });
        }
        console.log("Database result:", result);
        return res.json({ status: true, result: result });
    });
});

//Delete student from database
router.delete('/delete_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.json({ status: false, Error: "Query Error", Details: err });
        }
        return res.json({ status: true, Result: result });
    });
});

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.json({ status: false, Error: "Query Error", Details: err });
        }
        return res.json({ status: true, Result: result });
    });
})

router.get('/student_count', (req, res) => {
    const sql = "select count(id) as student from users";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.json({ status: false, Error: "Query Error", Details: err });
        }
        return res.json({ status: true, Result: result });
    });
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.json({ status: false, Error: "Query Error", Details: err });
        }
        return res.json({ status: true, Result: result });
    });
})

//Admin logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})


export { router as adminRouter }
