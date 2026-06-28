require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AaraTech Backend Running");
});

/* CONTACT FORM API */

app.post("/api/contact", (req, res) => {

    console.log("Received Contact Data:");
    console.log(req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const sql =
        "INSERT INTO contacts(name,email,message) VALUES(?,?,?)";

    db.query(
        sql,
        [name, email, message],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Contact Saved Successfully"
            });
        }
    );
});

/* LEAD CAPTURE API */

app.post("/api/lead", (req, res) => {

    console.log("Received Lead Data:");
    console.log(req.body);

    const {
        name,
        email,
        phone,
        company
    } = req.body;

    const sql =
        "INSERT INTO leads(name,email,phone,company) VALUES(?,?,?,?)";

    db.query(
        sql,
        [name, email, phone, company],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Lead Saved Successfully"
            });
        }
    );
});

/* VIEW CONTACTS */

app.get("/api/contacts", (req, res) => {

    db.query(
        "SELECT * FROM contacts",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

/* VIEW LEADS */

app.get("/api/leads", (req, res) => {

    db.query(
        "SELECT * FROM leads",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});