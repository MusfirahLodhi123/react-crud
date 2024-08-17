import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 
import Swal from 'sweetalert2'


const Empcreate = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const empdata = { name, email, phone,  };

        try {
            await axios.post("http://localhost:5000/employees", empdata, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            Swal.fire("Saved succefully!");

            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <br /><br />
            <div className="create-cont-wrapper">
                <form className="create-cont" onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: 'center', color: '#ffff' }}>Add Employee</h1> 
                    <label>Id:</label>
                    <input value={id} onChange={e => setId(e.target.value)} disabled type="text" />

                    <label>Name:</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" />
                    
                    <label>Email:</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
                    
                    <label>Phone:</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text" />
                    
                    <br />
                    <button className="btn btn-success" type="submit">Save</button>
                    <br />
                    <Link to="/" className="btn btn-dark">Back</Link>
                </form>
            </div>
        </>
    );
};

export default Empcreate;
