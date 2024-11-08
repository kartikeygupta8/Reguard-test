import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customerId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/claims/customer/${customerId}`)
      .then((response) => {
        setClaims(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching claims');
        setLoading(false);
      });
  }, [customerId]);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Claims for User: {customerId}</h2>
      {claims.length === 0 ? (
        <p style={styles.noClaims}>No claims found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Claim ID</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Claim Date</th>
              <th style={styles.headerCell}>Status</th>
              <th style={styles.headerCell}>Contract Amount</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td style={styles.cell}>{claim.id}</td>
                <td style={styles.cell}>{claim.name}</td>
                <td style={styles.cell}>{new Date(claim.claimDate).toLocaleDateString()}</td>
                <td style={{ ...styles.cell, color: claim.status === 'Approved' ? 'green' : 'red' }}>{claim.status}</td>
                <td style={styles.cell}>${parseFloat(claim.contractAmount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  loading: {
    fontSize: '18px',
    color: '#007bff',
    textAlign: 'center',
    padding: '20px',
  },
  error: {
    fontSize: '18px',
    color: '#ff4d4f',
    textAlign: 'center',
    padding: '20px',
  },
  noClaims: {
    fontSize: '16px',
    color: '#666',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  headerCell: {
    backgroundColor: 'rgb(242, 242, 242)',
    color: 'black',
    padding: '10px',
    fontWeight: 'bold',
  },
  cell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '14px',
  },
};

export default UserClaims;
