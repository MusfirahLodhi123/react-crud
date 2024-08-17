import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

const EmpDetails = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p><Spinner animation="grow" variant="dark"  />.</p>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">Employee Details</h3>
        </div>
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">ID</dt>
            <dd className="col-sm-9">{employee.id}</dd>

            <dt className="col-sm-3">Name</dt>
            <dd className="col-sm-9">{employee.name}</dd>

            <dt className="col-sm-3">Email</dt>
            <dd className="col-sm-9">{employee.email}</dd>

            <dt className="col-sm-3">Phone</dt>
            <dd className="col-sm-9">{employee.phone}</dd>
          </dl>
          <Link to="/" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmpDetails;
