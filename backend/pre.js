// const fs = require('fs');
// const csv = require('csv-parser');
// const mysql = require('mysql2');

// // MySQL Database connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'kartikey',
//     password: 'Kartikey@123',
//     database: 'crud_db'
// });

// // Create tables in the database
// db.connect((err) => {
//     console.log("Errorrrrrrrrrrrrrr",err)
//     if (err) throw err;
//     console.log("Connected to database.");

//     const createTablesQuery = `
//         CREATE TABLE IF NOT EXISTS Customers (
//             customer_id INT PRIMARY KEY,
//             name VARCHAR(50),
//             email VARCHAR(50),
//             phone VARCHAR(15)
//         );
//         CREATE TABLE IF NOT EXISTS Purchases (
//             purchase_id INT PRIMARY KEY,
//             customer_id INT,
//             purchase_date DATE,
//             amount DECIMAL(10, 2),
//             FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
//         );
//         CREATE TABLE IF NOT EXISTS Claims (
//             claim_id INT PRIMARY KEY,
//             purchase_id INT,
//             claim_status VARCHAR(20),
//             claim_date DATE,
//             FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id)
//         );
//     `;
//     db.query(createTablesQuery, (err) => {
//         if (err) throw err;
//         console.log("Tables created.");
//     });
// });

// // Load CSV data into Customers table
// const loadCustomers = () => {
//     fs.createReadStream('Customers.csv')
//         .pipe(csv())
//         .on('data', (row) => {
//             db.query('INSERT INTO Customers SET ?', row, (err) => {
//                 if (err) console.error(err);
//             });
//         })
//         .on('end', () => {
//             console.log('Customers data loaded.');
//         });
// };

// // Load CSV data into Purchases table
// const loadPurchases = () => {
//     fs.createReadStream('Purchases.csv')
//         .pipe(csv())
//         .on('data', (row) => {
//             db.query('INSERT INTO Purchases SET ?', row, (err) => {
//                 if (err) console.error(err);
//             });
//         })
//         .on('end', () => {
//             console.log('Purchases data loaded.');
//         });
// };

// // Load CSV data into Claims table
// const loadClaims = () => {
//     fs.createReadStream('Claims.csv')
//         .pipe(csv())
//         .on('data', (row) => {
//             db.query('INSERT INTO Claims SET ?', row, (err) => {
//                 if (err) console.error(err);
//             });
//         })
//         .on('end', () => {
//             console.log('Claims data loaded.');
//             db.end();
//         });
// };

// loadCustomers();
// loadPurchases();
// loadClaims();
const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'kartikey',
    password: 'Kartikey@123',
    database: 'crud_db'
});

// Create tables in the database
db.connect((err) => {
    if (err) {
        console.error("Connection error:", err);
        return;
    }
    console.log("Connected to database.");

    const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS Customers (
            customer_id INT PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(50),
            phone VARCHAR(15)
        );
        CREATE TABLE IF NOT EXISTS Purchases (
            purchase_id INT PRIMARY KEY,
            customer_id INT,
            purchase_date DATE,
            amount DECIMAL(10, 2),
            FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        );
        CREATE TABLE IF NOT EXISTS Claims (
            claim_id INT PRIMARY KEY,
            purchase_id INT,
            claim_status VARCHAR(20),
            claim_date DATE,
            FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id)
        );
    `;
    db.query(createTablesQuery, (err) => {
        if (err) {
            console.error("Error creating tables:", err);
            return;
        }
        console.log("Tables created.");
        // Start loading data after tables are created
        loadCustomers()
            .then(loadPurchases)
            .then(loadClaims)
            .then(() => {
                console.log('All data loaded successfully.');
                db.end(); // Close the connection after all operations
            })
            .catch(err => {
                console.error("Error loading data:", err);
                db.end(); // Ensure connection is closed on error
            });
    });
});

// Load CSV data into Customers table
const loadCustomers = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('Customers.csv')
            .pipe(csv())
            .on('data', (row) => {
                db.query('INSERT INTO Customers SET ?', row, (err) => {
                    if (err) return reject(err); // Reject on error
                });
            })
            .on('end', () => {
                console.log('Customers data loaded.');
                resolve(); // Resolve the promise when done
            });
    });
};

// Load CSV data into Purchases table
const loadPurchases = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('Purchases.csv')
            .pipe(csv())
            .on('data', (row) => {
                db.query('INSERT INTO Purchases SET ?', row, (err) => {
                    if (err) return reject(err); // Reject on error
                });
            })
            .on('end', () => {
                console.log('Purchases data loaded.');
                resolve(); // Resolve the promise when done
            });
    });
};

// Load CSV data into Claims table
const loadClaims = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('Claims.csv')
            .pipe(csv())
            .on('data', (row) => {
                db.query('INSERT INTO Claims SET ?', row, (err) => {
                    if (err) return reject(err); // Reject on error
                });
            })
            .on('end', () => {
                console.log('Claims data loaded.');
                resolve(); // Resolve the promise when done
            });
    });
};
