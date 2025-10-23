import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const ApartmentManager = () => {
  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState({
    Houseno: null,
    Housename: '',
    Housemembers: '',
    Houseemail: '',
    Housecontact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/aapi`;

  useEffect(() => {
    fetchAllApartments();
  }, []);

  const mapBackendApartment = (apt) => ({
    Houseno: apt.id,
    Housename: apt.name,
    Housemembers: apt.age,
    Houseemail: apt.email,
    Housecontact: apt.contact
  });

  const fetchAllApartments = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      const mapped = res.data.map(mapBackendApartment);
      setApartments(mapped);
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch apartments.');
    }
  };

  const handleChange = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!apartment.Housename || apartment.Housename.trim() === '') {
      setMessage("House Name is required");
      return false;
    }
    if (!apartment.Housemembers || isNaN(apartment.Housemembers)) {
      setMessage("Number of Members must be a valid number");
      return false;
    }
    return true;
  };

  const addApartment = async () => {
    if (!validateForm()) return;
    try {
      const payload = {
        id: null,
        name: apartment.Housename.trim(),
        age: Number(apartment.Housemembers),
        email: apartment.Houseemail.trim() || null,
        contact: apartment.Housecontact.trim() || null
      };
      await axios.post(`${baseUrl}/add`, payload);
      setMessage('Apartment added successfully.');
      fetchAllApartments();
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage(
        typeof error.response?.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response?.data) || 'Error adding apartment.'
      );
    }
  };

  const updateApartment = async () => {
    if (!validateForm()) return;
    try {
      const payload = {
        id: apartment.Houseno,
        name: apartment.Housename.trim(),
        age: Number(apartment.Housemembers),
        email: apartment.Houseemail.trim() || null,
        contact: apartment.Housecontact.trim() || null
      };
      await axios.put(`${baseUrl}/update`, payload);
      setMessage('Apartment updated successfully.');
      fetchAllApartments();
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage(
        typeof error.response?.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response?.data) || 'Error updating apartment.'
      );
    }
  };

  const deleteApartment = async (Houseno) => {
    if (!window.confirm(`Are you sure you want to delete House No ${Houseno}?`)) return;
    try {
      await axios.delete(`${baseUrl}/delete/${Houseno}`);
      setMessage('Apartment deleted successfully.');
      fetchAllApartments();
    } catch (error) {
      console.error(error);
      setMessage('Error deleting apartment.');
    }
  };

  const getApartmentById = async () => {
    if (!idToFetch) return;
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      const apt = mapBackendApartment(res.data);

      // Populate form for editing
      setApartment({
        Houseno: apt.Houseno,
        Housename: apt.Housename,
        Housemembers: apt.Housemembers.toString(),
        Houseemail: apt.Houseemail || '',
        Housecontact: apt.Housecontact || ''
      });
      setEditMode(true);
      setMessage(`Editing Apartment House No ${apt.Houseno}`);
    } catch (error) {
      setMessage('Apartment not found.');
    }
  };

  const handleEdit = (apt) => {
    setApartment({
      ...apt,
      Housemembers: apt.Housemembers.toString()
    });
    setEditMode(true);
    setMessage(`Editing Apartment House No ${apt.Houseno}`);
  };

  const resetForm = () => {
    setApartment({
      Houseno: null,
      Housename: '',
      Housemembers: '',
      Houseemail: '',
      Housecontact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="container">
      {message && <div className={`message-banner ${message.toString().toLowerCase().includes('error') ? 'error' : 'success'}`}>{message}</div>}

      <h2>🏠 Apartment Management</h2>

      {/* Add/Edit Form */}
      <div>
        <h3>{editMode ? 'Edit Apartment' : 'Add Apartment'}</h3>
        <div className="form-grid">
          <input type="text" name="Housename" placeholder="House Name" value={apartment.Housename} onChange={handleChange} />
          <input type="number" name="Housemembers" placeholder="No. of Members" value={apartment.Housemembers} onChange={handleChange} />
          <input type="email" name="Houseemail" placeholder="Email" value={apartment.Houseemail} onChange={handleChange} />
          <input type="text" name="Housecontact" placeholder="Contact Number" value={apartment.Housecontact} onChange={handleChange} />
        </div>
        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addApartment}>Add Apartment</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateApartment}>Update Apartment</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Fetch by ID */}
      <div>
        <h3>Get Apartment By House No</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter House No"
          className="fetch-input"
        />
        <button className="btn-blue" onClick={getApartmentById}>Fetch</button>
      </div>

      {/* All Apartments Table */}
      <div>
        <h3>All Apartments</h3>
        {apartments.length === 0 ? <p>No apartments found.</p> :
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(apartment).map((key) => <th key={key}>{key}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apt) => (
                  <tr key={apt.Houseno}>
                    {Object.keys(apartment).map((key) => <td key={key}>{apt[key]}</td>)}
                    <td>
                      <button className="btn-green" onClick={() => handleEdit(apt)}>Edit</button>
                      <button className="btn-red" onClick={() => deleteApartment(apt.Houseno)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default ApartmentManager;
