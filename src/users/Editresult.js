import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/Editresult.css';

const Editresult = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [Editresult, setEditResult] = useState({
        studentid: "",
        os: 0,
        analyticalthinking: 0,
        cprogramming: 0,
        linearalgebra: 0,
        total: 0
    });

    const { studentid, os, analyticalthinking, cprogramming, linearalgebra } = Editresult;

    useEffect(() => {
        const loadResult = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/result/updatedresult/${id}`);
                setEditResult(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        loadResult();
    }, [id]);

    const onInputChange = (e) => {
        setEditResult({ ...Editresult, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/result/updatedresult/${id}`, Editresult);
            navigate("/result");
        } catch (error) {
            console.error("Error updating result:", error);
        }
    };

    return (
        <div className="editresult-dark">
            <h3 className="text-center mb-4">Edit Result</h3>
            <form onSubmit={onSubmit}>
                <div className="editresult-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Student ID</label>
                            <input
                                type="text"
                                name="studentid"
                                placeholder="IU2380820279"
                                value={studentid}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Operating Systems</label>
                            <input
                                type="number"
                                name="os"
                                min="1"
                                max="100"
                                value={os}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Analytical Thinking</label>
                            <input
                                type="number"
                                name="analyticalthinking"
                                min="1"
                                max="100"
                                value={analyticalthinking}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>C Programming</label>
                            <input
                                type="number"
                                name="cprogramming"
                                min="1"
                                max="100"
                                value={cprogramming}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Linear Algebra</label>
                            <input
                                type="number"
                                name="linearalgebra"
                                min="1"
                                max="100"
                                value={linearalgebra}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">Submit</button>
                        <Link to="/result" className="btn-secondary">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Editresult;
