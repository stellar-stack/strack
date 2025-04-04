import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/home.css'

const Editresult = () => {
    let navigate = useNavigate();
    const { id } = useParams();  // Get the 'id' from the URL params

    // Initialize state to hold the form values
    const [Editresult, setEditResult] = useState({
        studentid: "",
        os: 0,
        analyticalthinking: 0,
        cprogramming: 0,
        linearalgebra: 0,
        total: 0
    });

    // Destructure values from Editresult state to bind to input fields
    const { studentid, os, analyticalthinking, cprogramming, linearalgebra, total } = Editresult;

    // Fetch data when the component mounts or the id changes
    useEffect(() => {
        const loadResult = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/result/updatedresult/${id}`);
                setEditResult(response.data); // Set the fetched data as the state
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error (e.g., show an error message)
            }
        };

        loadResult();
    }, [id]);  // Re-run when 'id' changes (which happens when navigating to another record's edit page)

    // Handle input changes dynamically
    const onInputChange = (e) => {
        setEditResult({ ...Editresult, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the updated data to the backend
            await axios.put(`http://localhost:8080/result/updatedresult/${id}`, Editresult);
            navigate("/result"); // Redirect to the results page after updating
        } catch (error) {
            console.error("Error updating result:", error);
            // Optional: Show an error message to the user
        }
    };

    return (
        <div className="gsap-nav">
            <h3 className="text-center mb-4">Edit Result</h3>
            <form onSubmit={onSubmit}>
                <div className="grid-container">
                    <div className="grid-one">
                        {/* Student ID */}
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Student Id</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="IU2380820279"
                                name="studentid"
                                value={studentid}
                                onChange={onInputChange}
                            />
                        </div>

                        {/* OS */}
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">OS</span>
                            <input
                                type="number"
                                className="form-control"
                                name="os"
                                value={os}
                                onChange={onInputChange}
                            />
                        </div>

                        {/* Analytical Thinking */}
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Analytical Thinking</span>
                            <input
                                type="number"
                                className="form-control"
                                name="analyticalthinking"
                                value={analyticalthinking}
                                onChange={onInputChange}
                            />
                        </div>

                        {/* C Programming */}
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">C Programming</span>
                            <input
                                type="number"
                                className="form-control"
                                name="cprogramming"
                                value={cprogramming}
                                onChange={onInputChange}
                            />
                        </div>

                        {/* Linear Algebra */}
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Linear Algebra</span>
                            <input
                                type="number"
                                className="form-control"
                                name="linearalgebra"
                                value={linearalgebra}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid-two">
                        {/* Submit and Cancel buttons */}
                        <div className="col-12 add-page-btn">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link type="button" className="btn btn-danger" to={'/result'}>Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Editresult;
