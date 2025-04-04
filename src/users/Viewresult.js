import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Viewresult = () => {
    const { id } = useParams(); // Extract the id from the URL
    console.log("Received ID:", id);  // This will tell us if `id` is correct

    const [viewresult, setViewResult] = useState({
        studentid: "",
        os: 0,
        analyticalthinking: 0,
        cprogramming: 0,
        linearalgebra: 0,
        total: 0
    });

    useEffect(() => {
        if (!id) {
            console.error("No ID found in URL!"); // In case `id` is not present
            return;
        }

        console.log("Fetching result for ID:", id); // Check if the id is correct

        const loadLoneResult = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/result/studentresult/${id}`);
                console.log("API Response:", response.data);  // Log the data received
                setViewResult(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        loadLoneResult();
    }, [id]); // Re-run effect when `id` changes

    return (
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>User Details</h2>

                <div className='card'>
                    <div className='card-header'>
                        Details of user id: {viewresult.studentid}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>OS: {viewresult.os}</b>
                            </li>
                            <li className='list-group-item'>
                                <b>Analytical Thinking: {viewresult.analyticalthinking}</b>
                            </li>
                            <li className='list-group-item'>
                                <b>C Programming: {viewresult.cprogramming}</b>
                            </li>
                            <li className='list-group-item'>
                                <b>Linear Algebra: {viewresult.linearalgebra}</b>
                            </li>
                            <li className='list-group-item'>
                                <b>Total: {viewresult.total}</b>
                            </li>
                            
                        </ul>
                    </div>
                </div>

                <Link className='btn btn-primary my-2' to={'/result'}>
                    Back To Home
                </Link>
            </div>
        </div>
    </div>
    );
};

export default Viewresult;
