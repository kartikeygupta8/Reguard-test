import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Claims() {
  const [claims, setClaims] = useState([]);
  const [newClaim, setNewClaim] = useState({ purchaseId: '', status: '', claimDate: '' });
  const [updatedStatus, setUpdatedStatus] = useState({ id: '', status: '' });
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const claimsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(claims.length / claimsPerPage);

  function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  const handleData = () => {
    axios.get('http://localhost:3000/claims')
      .then(response => setClaims(response.data))
      .catch(error => console.error('Error fetching claims:', error));
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleAddClaim = () => {
    axios.post('http://localhost:3000/claims', { ...newClaim, id: generateRandomId() })
      .then(response => {
        setClaims([...claims, response.data]);
        setNewClaim({ purchaseId: '', status: '', claimDate: '' });
        handleData();
      })
      .catch(error => console.error('Error adding claim:', error));
  };

  const handleUpdateClaimStatus = () => {
    axios.put(`http://localhost:3000/claims/${updatedStatus.id}`, { claim_status: updatedStatus.status })
      .then(response => {
        setClaims(claims.map(claim =>
          claim.id === updatedStatus.id ? { ...claim, status: updatedStatus.status } : claim
        ));
        setUpdatedStatus({ id: '', status: '' });
        handleData();
      })
      .catch(error => console.error('Error updating claim status:', error));
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = claims.slice(indexOfFirstClaim, indexOfLastClaim);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(claims.length / claimsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Claims</h2>

      <div style={{ marginBottom: '10px' }}>
        <strong>Total Claims: {claims.length}</strong>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="columnSelect" style={{ marginRight: '10px' }}>Select column to display:</label>
        <select id="columnSelect" value={selectedColumn} onChange={handleColumnChange} style={{ padding: '5px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="purchaseId">Purchase ID</option>
          <option value="status">Claim Status</option>
          <option value="claimDate">Claim Date</option>
        </select>
      </div>

      {selectedColumn === 'all' ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Claim ID</th>
              <th style={tableHeaderStyle}>Purchase ID</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Claim Date</th>
              <th style={tableHeaderStyle}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentClaims.map(claim => (
              <tr key={claim.id}>
                <td style={tableDataStyle}>{claim.id}</td>
                <td style={tableDataStyle}>{claim.purchaseId}</td>
                <td style={tableDataStyle}>{claim.status}</td>
                <td style={tableDataStyle}>{formatDate(claim.claimDate)}</td>
                <td style={tableDataStyle}>{formatDate(claim.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {currentClaims.map(claim => (
            <li key={claim.id} style={listItemStyle}>
              {selectedColumn === 'purchaseId' && `Purchase ID: ${claim.purchaseId}`}
              {selectedColumn === 'status' && `Claim Status: ${claim.status}`}
              {selectedColumn === 'claimDate' && `Claim Date: ${formatDate(claim.claimDate)}`}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{
            padding: '8px 12px',
            margin: '0 5px',
            backgroundColor: currentPage === 1 ? '#ccc' : '#f2f2f2',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}>
            &larr; 
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {Math.ceil(claims.length / claimsPerPage)}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(claims.length / claimsPerPage)}  style={{
            padding: '8px 12px',
            margin: '0 5px',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#f2f2f2',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
          }}>
        &rarr;

        </button>
      </div>

      <h3 style={{ marginTop: '20px' }}>Add New Claim</h3>
      <div style={formContainerStyle}>
        <input
          placeholder="Purchase ID"
          value={newClaim.purchaseId}
          onChange={(e) => setNewClaim({ ...newClaim, purchaseId: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Status"
          value={newClaim.status}
          onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value })}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Claim Date"
          value={newClaim.claimDate}
          onChange={(e) => setNewClaim({ ...newClaim, claimDate: e.target.value })}
          style={inputStyle}
        />
        <button onClick={handleAddClaim} style={buttonStyle}>Add Claim</button>
      </div>

      <h3>Update Claim Status</h3>
      <div style={formContainerStyle}>
        <input
          placeholder="Claim ID"
          value={updatedStatus.id}
          onChange={(e) => setUpdatedStatus({ ...updatedStatus, id: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="New Status"
          value={updatedStatus.status}
          onChange={(e) => setUpdatedStatus({ ...updatedStatus, status: e.target.value })}
          style={inputStyle}
        />
        <button onClick={handleUpdateClaimStatus} style={buttonStyle}>Update Status</button>
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

const paginationButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0 5px'
};

export default Claims;
