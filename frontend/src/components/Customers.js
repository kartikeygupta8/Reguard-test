import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('all'); // Default selected column

  useEffect(() => {
    axios.get('http://localhost:3000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Customers</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="columnSelect" style={{ marginRight: '10px' }}>Select column to display:</label>
        <select id="columnSelect" value={selectedColumn} onChange={handleColumnChange} style={{ padding: '5px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      {selectedColumn === 'all' ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.customer_id}>
                <td style={tableDataStyle}>{customer.name}</td>
                <td style={tableDataStyle}>{customer.email}</td>
                <td style={tableDataStyle}>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {customers.map(customer => (
            <li key={customer.customer_id} style={listItemStyle}>
              {selectedColumn === 'name' && customer.name}
              {selectedColumn === 'email' && customer.email}
              {selectedColumn === 'phone' && customer.phone}
            </li>
          ))}
        </ul>
      )}
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

export default Customers;