import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({ id: '', purchaseDate: '', totalSaleAmount: '' });
  const [selectedColumn, setSelectedColumn] = useState('all');

  const getData = () => {
    axios.get('http://localhost:3000/purchases')
      .then(response => setPurchases(response.data))
      .catch(error => console.error('Error fetching purchases:', error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddPurchase = () => {
    axios.post('http://localhost:3000/purchases', newPurchase)
      .then(response => {
        setPurchases([...purchases, response.data]);
        setNewPurchase({ id: '', purchase_date: '', totalSaleAmount: '' });
      })
      .catch(error => console.error('Error adding purchase:', error));
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  // Format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Purchases</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="columnSelect" style={{ marginRight: '10px' }}>Select column to display:</label>
        <select id="columnSelect" value={selectedColumn} onChange={handleColumnChange} style={{ padding: '5px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="customer_id">Customer ID</option>
          <option value="purchase_date">Purchase Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>

      {selectedColumn === 'all' ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
            <th style={tableHeaderStyle}>Serial no</th>

              <th style={tableHeaderStyle}>Customer ID</th>
              <th style={tableHeaderStyle}>Purchase Date</th>
              <th style={tableHeaderStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase,idx) => (
              <tr key={purchase.id}>
                <td style={tableDataStyle}>{idx+1}</td>

                <td style={tableDataStyle}>{purchase.customerId}</td>
                <td style={tableDataStyle}>{formatDate(purchase.purchaseDate)}</td>
                <td style={tableDataStyle}>${parseFloat(purchase.totalSaleAmount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {purchases.map(purchase => (
            <li key={purchase.id} style={listItemStyle}>
              {selectedColumn === 'customer_id' && `Customer ID: ${purchase.customerId}`}
              {selectedColumn === 'purchase_date' && `Date: ${formatDate(purchase.purchaseDate)}`}
              {selectedColumn === 'amount' && `Amount: $${parseFloat(purchase.totalSaleAmount).toFixed(2)}`}
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: '20px' }}>Add New Purchase</h3>
      <div style={formContainerStyle}>
        <input
          placeholder="Customer ID"
          value={newPurchase.customer_id}
          onChange={(e) => setNewPurchase({ ...newPurchase, id: e.target.value })}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Purchase Date"
          value={newPurchase.purchaseDate}
          onChange={(e) => setNewPurchase({ ...newPurchase, purchaseDate: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Total Sale Amount"
          value={newPurchase.totalSaleAmount}
          onChange={(e) => setNewPurchase({ ...newPurchase, totalSaleAmount: e.target.value })}
          style={inputStyle}
        />
        <button onClick={handleAddPurchase} style={buttonStyle}>
          Add Purchase
        </button>
      </div>
    </div>
  );
}

// Styles
const tableHeaderStyle = {
  padding: '10px',
  backgroundColor: '#f2f2f2',
  border: '1px solid #ddd',
  textAlign: 'left'
};

const tableDataStyle = {
  padding: '10px',
  border: '1px solid #ddd'
};

const listItemStyle = {
  padding: '10px',
  margin: '5px 0',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  fontSize: '18px',
  color: '#555'
};

const formContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '10px'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default Purchases;
