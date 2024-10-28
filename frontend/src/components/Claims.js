import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Claims() {
  const [claims, setClaims] = useState([]);
  const [newClaim, setNewClaim] = useState({ purchase_id: '', claim_status: '', claim_date: '' });
  const [updatedStatus, setUpdatedStatus] = useState({ id: '', status: '' });
  const [selectedColumn, setSelectedColumn] = useState('all');

  const handleData=()=>{
    axios.get('http://localhost:3000/claims')
    .then(response => setClaims(response.data))
    .catch(error => console.error('Error fetching claims:', error));
  }
  useEffect(() => {
    handleData();
  }, []);

  const handleAddClaim = () => {
    axios.post('http://localhost:3000/claims', newClaim)
      .then(response => {
        setClaims([...claims, response.data]);
        setNewClaim({ purchase_id: '', claim_status: '', claim_date: '' });
        handleData()
      })
      .catch(error => console.error('Error adding claim:', error));
  };

  const handleUpdateClaimStatus = () => {
    axios.put(`http://localhost:3000/claims/${updatedStatus.id}`, { claim_status: updatedStatus.status })
      .then(response => {
        setClaims(claims.map(claim =>
          claim.claim_id === parseInt(updatedStatus.id) ? { ...claim, claim_status: updatedStatus.status } : claim
        ));
        setUpdatedStatus({ id: '', status: '' });
      })
      .catch(error => console.error('Error updating claim status:', error));
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
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Claims</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="columnSelect" style={{ marginRight: '10px' }}>Select column to display:</label>
        <select id="columnSelect" value={selectedColumn} onChange={handleColumnChange} style={{ padding: '5px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="purchase_id">Purchase ID</option>
          <option value="claim_status">Claim Status</option>
          <option value="claim_date">Claim Date</option>
        </select>
      </div>

      {selectedColumn === 'all' ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
            <th style={tableHeaderStyle}>Claim ID</th>

              <th style={tableHeaderStyle}>Purchase ID</th>
              <th style={tableHeaderStyle}>Claim Status</th>
              <th style={tableHeaderStyle}>Claim Date</th>
            </tr>
          </thead>
          <tbody>
            {claims.map(claim => (
              <tr key={claim.claim_id}>
                <td style={tableDataStyle}>{claim.claim_id}</td>

                <td style={tableDataStyle}>{claim.purchase_id}</td>
                <td style={tableDataStyle}>{claim.claim_status}</td>
                <td style={tableDataStyle}>{formatDate(claim.claim_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {claims.map(claim => (
            <li key={claim.claim_id} style={listItemStyle}>
              {selectedColumn === 'purchase_id' && `Purchase ID: ${claim.purchase_id}`}
              {selectedColumn === 'claim_status' && `Claim Status: ${claim.claim_status}`}
              {selectedColumn === 'claim_date' && `Claim Date: ${formatDate(claim.claim_date)}`}
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: '20px' }}>Add New Claim</h3>
      <div style={formContainerStyle}>
        <input
          placeholder="Purchase ID"
          value={newClaim.purchase_id}
          onChange={(e) => setNewClaim({ ...newClaim, purchase_id: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Claim Status"
          value={newClaim.claim_status}
          onChange={(e) => setNewClaim({ ...newClaim, claim_status: e.target.value })}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Claim Date"
          value={newClaim.claim_date}
          onChange={(e) => setNewClaim({ ...newClaim, claim_date: e.target.value })}
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

export default Claims;
