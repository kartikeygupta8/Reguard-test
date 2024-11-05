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
//     if (err) {
//         console.error("Connection error:", err);
//         return;
//     }
//     console.log("Connected to database.");

//     // Create Customers table
//     const createCustomersTable = `
//         CREATE TABLE IF NOT EXISTS Customers (
//             customer_id INT PRIMARY KEY,
//             name VARCHAR(50),
//             email VARCHAR(50),
//             phone VARCHAR(15)
//         );
//     `;
    
//     db.query(createCustomersTable, (err) => {
//         if (err) {
//             console.error("Error creating Customers table:", err);
//             return;
//         }
//         console.log("Customers table created.");

//         // Create Purchases table
//         const createPurchasesTable = `
//             CREATE TABLE IF NOT EXISTS Purchases (
//         purchase_id INT AUTO_INCREMENT PRIMARY KEY,
                
//                 customer_id INT,
//                 purchase_date DATE,
//                 amount DECIMAL(10, 2),
//                 FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
//             );
//         `;
        
//         db.query(createPurchasesTable, (err) => {
//             if (err) {
//                 console.error("Error creating Purchases table:", err);
//                 return;
//             }
//             console.log("Purchases table created.");

//             // Create Claims table
//             const createClaimsTable = `
//                 CREATE TABLE IF NOT EXISTS Claims (
//                     claim_id INT AUTO_INCREMENT PRIMARY KEY,
//                     purchase_id INT,
//                     claim_status VARCHAR(20),
//                     claim_date DATE,
//                     FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id)
//                 );
//             `;
            
//             db.query(createClaimsTable, (err) => {
//                 if (err) {
//                     console.error("Error creating Claims table:", err);
//                     return;
//                 }
//                 console.log("Claims table created.");

//                 // Start loading data after tables are created
//                 loadCustomers()
//                     .then(loadPurchases)
//                     .then(loadClaims)
//                     .then(() => {
//                         console.log('All data loaded successfully.');
//                         db.end(); // Close the connection after all operations
//                     })
//                     .catch(err => {
//                         console.error("Error loading data:", err);
//                         db.end(); // Ensure connection is closed on error
//                     });
//             });
//         });
//     });
// });

// // Load CSV data into Customers table
// const loadCustomers = () => {
//     return new Promise((resolve, reject) => {
//         fs.createReadStream('Customers.csv')
//             .pipe(csv())
//             .on('data', (row) => {
//                 db.query('INSERT INTO Customers SET ?', row, (err) => {
//                     if (err) return reject(err); // Reject on error
//                 });
//             })
//             .on('end', () => {
//                 console.log('Customers data loaded.');
//                 resolve(); // Resolve the promise when done
//             });
//     });
// };

// // Load CSV data into Purchases table
// const loadPurchases = () => {
//     return new Promise((resolve, reject) => {
//         fs.createReadStream('Purchases.csv')
//             .pipe(csv())
//             .on('data', (row) => {
//                 db.query('INSERT INTO Purchases SET ?', row, (err) => {
//                     if (err) return reject(err); // Reject on error
//                 });
//             })
//             .on('end', () => {
//                 console.log('Purchases data loaded.');
//                 resolve(); // Resolve the promise when done
//             });
//     });
// };

// // Load CSV data into Claims table
// const loadClaims = () => {
//     return new Promise((resolve, reject) => {
//         fs.createReadStream('Claims1.csv')
//             .pipe(csv())
//             .on('data', (row) => {
//                 db.query('INSERT INTO Claims SET ?', row, (err) => {
//                     if (err) return reject(err); // Reject on error
//                 });
//             })
//             .on('end', () => {
//                 console.log('Claims data loaded.');
//                 resolve(); // Resolve the promise when done
//             });
//     });
// };

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
            id VARCHAR(36) PRIMARY KEY,
            firstName VARCHAR(50),
            lastName VARCHAR(50),
            mainPhone VARCHAR(15),
            mobilePhone VARCHAR(15),
            email VARCHAR(50),
            createdAt DATETIME,
            updatedAt DATETIME,
            deletedAt DATETIME
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
                id VARCHAR(36) PRIMARY KEY,
                status VARCHAR(20),
                totalSaleAmount DECIMAL(10, 2),
                purchaseDate DATETIME,
                vendor VARCHAR(50),
                createdAt DATETIME,
                updatedAt DATETIME,
                deletedAt DATETIME,
                customerId VARCHAR(36),
                merchantId VARCHAR(36),
                orderNumber VARCHAR(50),
                FOREIGN KEY (customerId) REFERENCES Customers(id)
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
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(50),
        claimDate DATETIME,
        startDate DATETIME,
        endDate DATETIME,
        createdAt DATETIME,
        updatedAt DATETIME,
        deletedAt DATETIME,
        customerId VARCHAR(36),
        merchantId VARCHAR(36),
        purchaseId VARCHAR(36),
        status VARCHAR(20),
        contractAmount DECIMAL(10, 2),
        activatedAt DATETIME,
        FOREIGN KEY (purchaseId) REFERENCES Purchases(id)
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
                const customerData = {
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    mainPhone: row.mainPhone,
                    mobilePhone: row.mobilePhone,
                    email: row.email,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    deletedAt: row.deletedAt ? row.deletedAt : null
                };
                db.query('INSERT INTO Customers SET ?', customerData, (err) => {
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
                const purchaseData = {
                    id: row.id,
                    status: row.status,
                    totalSaleAmount: row.totalSaleAmount,
                    purchaseDate: row.purchaseDate,
                    vendor: row.vendor,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    deletedAt: row.deletedAt ? row.deletedAt : null, // Set to null if empty
                    customerId: row.customerId,
                    merchantId: row.merchantId,
                    orderNumber: row.orderNumber
                };
                db.query('INSERT INTO Purchases SET ?', purchaseData, (err) => {
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
                const claimData = {
                    id: row.id,
                    name: row.name,
                    startDate: row.startDate,
                    endDate: row.endDate,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    deletedAt: row.deletedAt ? row.deletedAt : null, // Set to null if empty
                    customerId: row.customerId,
                    merchantId: row.merchantId,
                    purchaseId: row.purchaseId,
                    status: row.status,
                    contractAmount: row.contractAmount,
                    activatedAt: row.activatedAt
                };
                db.query('INSERT INTO Claims SET ?', claimData, (err) => {
                    console.log({ err }); // Log the error if any
                    if (err) return reject(err); // Reject on error
                });
            })
            .on('end', () => {
                console.log('Claims data loaded.');
                resolve(); // Resolve the promise when done
            });
    });
};
