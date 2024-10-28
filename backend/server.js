const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors'); // Include CORS

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); 
// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'kartikey',
    password: 'Kartikey@123',
    database: 'crud_db'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
});

// GET all customers
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM Customers', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET all purchases
app.get('/purchases', (req, res) => {
    db.query('SELECT * FROM Purchases', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET all claims
app.get('/claims', (req, res) => {
    db.query('SELECT * FROM Claims', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST a new purchase
app.post('/purchases', (req, res) => {
    const purchase = req.body;
    db.query('INSERT INTO Purchases SET ?', purchase, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Purchase added', purchaseId: result.insertId });
    });
 
});

// POST a new claim
app.post('/claims', (req, res) => {
    const claim = req.body;
    db.query('INSERT INTO Claims SET ?', claim, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Claim added', claimId: result.insertId });
    });
});

// PUT to update claim status
app.put('/claims/:id', (req, res) => {
    const claimId = req.params.id;
    const updatedStatus = req.body.claim_status;
    db.query(
        'UPDATE Claims SET claim_status = ? WHERE claim_id = ?',
        [updatedStatus, claimId],
        (err, result) => {
            console.log({result})
            if (err) return res.status(500).send(err);
            res.json({ message: 'Claim status updated' });
        }
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
