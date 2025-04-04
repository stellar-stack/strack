import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Viewuser = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [adduser, setAddUser] = useState({
        studentId: "",
        firstname: "",
        lastname: "",
        email: "",
        department: "",
        course: "",
        phone: ""
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/student/${id}`);
        setAddUser(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Details of user id: {adduser.studentId}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>First Name: {adduser.firstname}</b>
                                </li>
                                <li className='list-group-item'>
                                    <b>Last Name: {adduser.lastname}</b>
                                </li>
                                <li className='list-group-item'>
                                    <b>Email: {adduser.email}</b>
                                </li>
                                <li className='list-group-item'>
                                    <b>Department: {adduser.department}</b>
                                </li>
                                <li className='list-group-item'>
                                    <b>Course: {adduser.course}</b>
                                </li>
                                <li className='list-group-item'>
                                    <b>Phone: {adduser.phone}</b>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Link className='btn btn-primary my-2' to={'/'}>
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Viewuser