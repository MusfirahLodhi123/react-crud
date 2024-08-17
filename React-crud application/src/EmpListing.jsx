import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineEventNote } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const EmpListing = () => {
    const navigate = useNavigate();
    const [empData, empDataChange] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/employees');
                empDataChange(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    const updateItem = async (item) => {
        try {
            await axios.put(`http://localhost:5000/employees/${item.id}`, item, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            Swal.fire("Updated succesfully!");
            // Refresh the data
            const response = await axios.get('http://localhost:5000/employees');
            empDataChange(response.data);
        } catch (error) {
            console.error('Error updating item:', error.message);
        }
    };

    const loadEdit = (item) => {
        const newName = prompt('Edit Name:', item.name);
        if (newName === null) return;

        const newEmail = prompt('Edit Email:', item.email);
        if (newEmail === null) return;

        const newPhone = prompt('Edit Phone:', item.phone);
        if (newPhone === null) return;

        if (window.confirm('Are you sure you want to save changes?')) {
            const updatedItem = { ...item, name: newName, email: newEmail, phone: newPhone };
            updateItem(updatedItem);
        }
    };

    const deleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/employees/${id}`);
                Swal.fire('Employee deleted successfully.');
                const response = await axios.get('http://localhost:5000/employees');
                empDataChange(response.data);
            } catch (error) {
                console.error('Error deleting item:', error.message);
            }
        }
    };

    const loadDetails = (id) => {
        navigate('/employee/details/' + id);
    };

    return (
        <>
            <div className="table-container">
                <h1 style={{ textAlign: 'center', color: '#535B87' }}>Employees</h1> <br />
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <a className='btn-icon' onClick={() => loadEdit(item)}><CiEdit /></a>
                                        <a className='btn-icon' onClick={() => deleteItem(item.id)}><RiDeleteBin2Fill /></a>
                                        <a className='btn-icon' onClick={() => loadDetails(item.id)}><MdOutlineEventNote /></a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> <br />
                <Link to='/employee/create' className='btn btn-success' style={{ display: 'block' }}>Add New</Link>
            </div>
        </>
    );
};

export default EmpListing;
