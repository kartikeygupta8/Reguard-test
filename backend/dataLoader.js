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

    // Create Customers table
    const createCustomersTable = `
        CREATE TABLE IF NOT EXISTS Customers (
            customer_id INT PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(50),
            phone VARCHAR(15)
        );
    `;
    
    db.query(createCustomersTable, (err) => {
        if (err) {
            console.error("Error creating Customers table:", err);
            return;
        }
        console.log("Customers table created.");

        // Create Purchases table
        const createPurchasesTable = `
            CREATE TABLE IF NOT EXISTS Purchases (
        purchase_id INT AUTO_INCREMENT PRIMARY KEY,
                
                customer_id INT,
                purchase_date DATE,
                amount DECIMAL(10, 2),
                FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
            );
        `;
        
        db.query(createPurchasesTable, (err) => {
            if (err) {
                console.error("Error creating Purchases table:", err);
                return;
            }
            console.log("Purchases table created.");

            // Create Claims table
            const createClaimsTable = `
                CREATE TABLE IF NOT EXISTS Claims (
                    claim_id INT AUTO_INCREMENT PRIMARY KEY,
                    purchase_id INT,
                    claim_status VARCHAR(20),
                    claim_date DATE,
                    FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id)
                );
            `;
            
            db.query(createClaimsTable, (err) => {
                if (err) {
                    console.error("Error creating Claims table:", err);
                    return;
                }
                console.log("Claims table created.");

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
