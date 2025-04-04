import React, { useState } from 'react'
import '../styling/home.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'  // Import Toastify
import 'react-toastify/dist/ReactToastify.css'  // Import the styles

const Addresult = () => {

    let navigate = useNavigate()

    const [addresult, setAddResult] = useState({
        studentid: "",
        os: 0,
        analyticalthinking: 0,
        cprogramming: 0,
        linearalgebra: 0,
        total: 0
    })

    const { studentId, os, analyticalthinking, cprogramming, linearalgebra, total } = addresult

    const onInputChange = (e) => {
        setAddResult({ ...addresult, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the API
            await axios.post('http://localhost:8080/result/addresult', addresult)
            
            // Show a success message using react-toastify
            toast.success('User added successfully!', {
                position: "top-right",  // Corrected position as string
                autoClose: 5000
            });

            // Redirect to the home page after submitting
            navigate('/result')
        } catch (error) {
            // Show an error message if something goes wrong
            toast.error('Error adding user. Please try again!', {
                position: "top-right",  // Corrected position as string
                autoClose: 5000
            });
        }
    }

    return (
        <div className='gsap-nav'>

            <form onSubmit={(e) => onSubmit(e)}>

                <div className='grid-container'>
                    <div className='grid-one'>

                    <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Student Id</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="IU2380820279"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="studentid"
                                value={studentId}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">OS</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="os"
                                value={os}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Analytical Thinking</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="analyticalthinking"
                                value={analyticalthinking}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">C Programming</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="cprogramming"
                                value={cprogramming}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Linear Algebra</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="@gmail.com"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="linearalgebra"
                                value={linearalgebra}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                    

                    </div>

                    <div className="grid-two">

                        {/* <select
                            className="form-select"
                            aria-label="Default select example"
                            name="department"
                            value={department}
                            onChange={(e) => onInputChange(e)}
                            required  // Make field required
                        >
                            <option disabled>Open this select menu</option>
                            <option value="CS">Computer Science</option>
                            <option value="IT">Information Technology</option>
                            <option value="SE">Software Engineering</option>
                        </select> */}

                        {/* <select
                            className="form-select"
                            aria-label="Default select example"
                            name="course"
                            value={course}
                            onChange={(e) => onInputChange(e)}
                            required  // Make field required
                        >
                            <option disabled>Open this select menu</option>
                            <option value="1">Course 1</option>
                            <option value="2">Course 2</option>
                            <option value="3">Course 3</option>
                        </select> */}

                        <div className="col-12 add-page-btn">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link type="button" className="btn btn-danger" to="/result">Cancel</Link>
                        </div>
                    </div>

                </div>

            </form>

            {/* Toast container for notifications */}
            <ToastContainer />

        </div>
    )
}

export default Addresult
