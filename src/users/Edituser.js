// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const Edituser = () => {
//     let navigate = useNavigate();
//     const { id } = useParams();

//     const [adduser, setAddUser] = useState({
//         studentId: "",
//         firstname: "",
//         lastname: "",
//         email: "",
//         department: "",
//         course: "",
//         phone: ""
//     });

//     const { studentId, firstname, lastname, email, department, course, phone } = adduser;

//     // Handle input changes
//     const onInputChange = (e) => {
//         setAddUser({ ...adduser, [e.target.name]: e.target.value });
//     };

//     // Load user data on component mount
//     useEffect(() => {
//         const loadUser = async () => {
//             try {
//                 const result = await axios.get(`http://localhost:8080/api/update/${id}`);
//                 setAddUser(result.data);
//             } catch (error) {
//                 console.error("There was an error fetching the user:", error);
//                 // Optional: Handle error (e.g., show an error message to the user)
//             }
//         };
//         loadUser();
//     }, [id]); // Make sure the effect depends on the `id` param

//     // Handle form submission
//     const onSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.put(`http://localhost:8080/api/update/${id}`, adduser);
//             navigate("/");
//         } catch (error) {
//             console.error("There was an error updating the user:", error);
//             // Optional: Show an error message to the user
//         }
//     };

//     return (
//         <div className='gsap-nav'>
//             <form onSubmit={onSubmit}>
//                 <div className='grid-container'>
//                     <div className='grid-one'>
//                         {/* Student ID */}
//                         <div className="input-group flex-nowrap">
//                             <span className="input-group-text" id="addon-wrapping">Student Id</span>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="IU2380820279"
//                                 name="studentId"
//                                 value={studentId}
//                                 onChange={onInputChange}
//                             />
//                         </div>

//                         {/* First Name */}
//                         <div className="input-group flex-nowrap">
//                             <span className="input-group-text" id="addon-wrapping">First Name</span>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="firstname"
//                                 value={firstname}
//                                 onChange={onInputChange}
//                             />
//                         </div>

//                         {/* Last Name */}
//                         <div className="input-group flex-nowrap">
//                             <span className="input-group-text" id="addon-wrapping">Last Name</span>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="lastname"
//                                 value={lastname}
//                                 onChange={onInputChange}
//                             />
//                         </div>

//                         {/* Email */}
//                         <div className="input-group flex-nowrap">
//                             <span className="input-group-text" id="addon-wrapping">Email</span>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 placeholder="@gmail.com"
//                                 name="email"
//                                 value={email}
//                                 onChange={onInputChange}
//                             />
//                         </div>

//                         {/* Phone */}
//                         <div className="input-group flex-nowrap">
//                             <span className="input-group-text" id="addon-wrapping">Phone</span>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="e.g. 123-456-7890"
//                                 name="phone"
//                                 value={phone}
//                                 onChange={onInputChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="grid-two">
//                         {/* Department Select */}
//                         <select
//                             className="form-select"
//                             name="department"
//                             value={department}
//                             onChange={onInputChange}
//                         >
//                             <option disabled>Open this select menu</option>
//                             <option value="CS">Computer Science</option>
//                             <option value="IT">Information Technology</option>
//                             <option value="SE">Software Engineering</option>
//                         </select>

//                         {/* Course Select */}
//                         <select
//                             className="form-select"
//                             name="course"
//                             value={course}
//                             onChange={onInputChange}
//                         >
//                             <option disabled>Open this select menu</option>
//                             <option value="1">Course 1</option>
//                             <option value="2">Course 2</option>
//                             <option value="3">Course 3</option>
//                         </select>

//                         {/* Submit and Cancel buttons */}
//                         <div className="col-12 add-page-btn">
//                             <button type="submit" className="btn btn-primary">Submit</button>
//                             <Link type="button" className="btn btn-danger" to={'/'}>Cancel</Link>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Edituser;


// updated
// Edituser.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/Edituser.css'

const Edituser = () => {
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

    const { studentId, firstname, lastname, email, department, course, phone } = adduser;

    const onInputChange = (e) => {
        setAddUser({ ...adduser, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/api/update/${id}`);
                setAddUser(result.data);
            } catch (error) {
                console.error("There was an error fetching the user:", error);
            }
        };
        loadUser();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/update/${id}`, adduser);
            navigate("/home");
        } catch (error) {
            console.error("There was an error updating the user:", error);
        }
    };

    return (
        <div className='edituser-dark'>
            <form onSubmit={onSubmit} className='edituser-form'>
                <div className='edituser-header'>
                    <div className='avatar-box'>
                        <img src="https://i.pravatar.cc/100" alt="Avatar" className='avatar-img' />
                        <div>
                            <h3>{firstname} {lastname}</h3>
                            <p className='email-text'>{email}</p>
                        </div>
                    </div>
                </div>

                <div className='form-grid'>
                    <div className="form-group">
                        <label>Student ID</label>
                        <input type="text" name="studentId" value={studentId} onChange={onInputChange} />
                    </div>

                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstname" value={firstname} onChange={onInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastname" value={lastname} onChange={onInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={onInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" value={phone} onChange={onInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <select name="department" value={department} onChange={onInputChange}>
                            <option disabled>Open this select menu</option>
                            <option value="CS">Computer Science</option>
                            <option value="IT">Information Technology</option>
                            <option value="SE">Software Engineering</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Course</label>
                        <select name="course" value={course} onChange={onInputChange}>
                            <option disabled>Open this select menu</option>
                            <option value="1">Course 1</option>
                            <option value="2">Course 2</option>
                            <option value="3">Course 3</option>
                        </select>
                    </div>
                </div>

                <div className='form-actions'>
                    <button type="submit" className="btn-primary">Submit</button>
                    <Link to='/home' className="btn-secondary">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default Edituser;