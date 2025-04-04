import React, { useState } from 'react'
import '../styling/home.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'  // Import Toastify
import 'react-toastify/dist/ReactToastify.css'  // Import the styles

const Adduser = () => {

    let navigate = useNavigate()

    const [adduser, setAddUser] = useState({
        studentId: "",
        firstname: "",
        lastname: "",
        email: "",
        department: "",
        course: "",
        phone: ""
    })

    const { studentId, firstname, lastname, email, department, course, phone } = adduser

    const onInputChange = (e) => {
        setAddUser({ ...adduser, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the API
            await axios.post('http://localhost:8080/api/student', adduser)
            
            // Show a success message using react-toastify
            toast.success('User added successfully!', {
                position: "top-right",  // Corrected position as string
                autoClose: 5000
            });

            // Redirect to the home page after submitting
            navigate('/')
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
                                type="text"
                                className="form-control"
                                placeholder="IU2380820279"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="studentId"
                                value={studentId}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">First Name</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Last Name</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Email</span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="@gmail.com"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Phone</span>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="phone"
                                aria-label="Username"
                                aria-describedby="addon-wrapping"
                                name="phone"
                                value={phone}
                                onChange={(e) => onInputChange(e)}
                                required  // Make field required
                            />
                        </div>

                    </div>

                    <div className="grid-two">

                        <select
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
                        </select>

                        <select
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
                        </select>

                        <div className="col-12 add-page-btn">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link type="button" className="btn btn-danger" to="/">Cancel</Link>
                        </div>
                    </div>

                </div>

            </form>

            {/* Toast container for notifications */}
            <ToastContainer />

        </div>
    )
}

export default Adduser
