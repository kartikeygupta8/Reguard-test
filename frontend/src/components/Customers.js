import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
const navigate=useNavigate();
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Customers</h2>
      <p>Total Customers: {customers.length}</p>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="columnSelect" style={{ marginRight: '10px' }}>Select column to display:</label>
        <select id="columnSelect" value={selectedColumn} onChange={handleColumnChange} style={{ padding: '5px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="mainPhone">Main Phone</option>
          <option value="mobilePhone">Mobile Phone</option>
        </select>
      </div>
``
      {selectedColumn === 'all' ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>First Name</th>
              <th style={tableHeaderStyle}>Last Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Main Phone</th>
              <th style={tableHeaderStyle}>Mobile Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(customer => (
              <tr key={customer.id} onClick={()=>navigate(`/userclaims/${customer.id}`)} style={{cursor:"pointer"}}>
                <td style={tableDataStyle}>{customer.id}</td>
                <td style={tableDataStyle}>{customer.firstName}</td>
                <td style={tableDataStyle}>{customer.lastName}</td>
                <td style={tableDataStyle}>{customer.email}</td>
                <td style={tableDataStyle}>{customer.mainPhone}</td>
                <td style={tableDataStyle}>{customer.mobilePhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {currentCustomers.map(customer => (
            <li key={customer.id} style={listItemStyle}>
              {selectedColumn === 'firstName' && customer.firstName}
              {selectedColumn === 'lastName' && customer.lastName}
              {selectedColumn === 'email' && customer.email}
              {selectedColumn === 'mainPhone' && customer.mainPhone}
              {selectedColumn === 'mobilePhone' && customer.mobilePhone}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            margin: '0 5px',
            backgroundColor: currentPage === 1 ? '#ccc' : '#f2f2f2',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          &larr;
        </button>

        <span style={{ padding: '0 15px', fontSize: '16px' }}>Page {currentPage} of {totalPages}</span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            margin: '0 5px',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#f2f2f2',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
           &rarr;
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

export default Customers;
