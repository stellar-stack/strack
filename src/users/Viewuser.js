// import React from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const Viewuser = () => {
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

//     useEffect(() => {
//         loadUser();
//     }, []);

//     const loadUser = async () => {
//         const result = await axios.get(`http://localhost:8080/api/student/${id}`);
//         setAddUser(result.data);
//     };

//     return (
//         <div className='container'>
//             <div className='row'>
//                 <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
//                     <h2 className='text-center m-4'>User Details</h2>

//                     <div className='card'>
//                         <div className='card-header'>
//                             Details of user id: {adduser.studentId}
//                             <ul className='list-group list-group-flush'>
//                                 <li className='list-group-item'>
//                                     <b>First Name: {adduser.firstname}</b>
//                                 </li>
//                                 <li className='list-group-item'>
//                                     <b>Last Name: {adduser.lastname}</b>
//                                 </li>
//                                 <li className='list-group-item'>
//                                     <b>Email: {adduser.email}</b>
//                                 </li>
//                                 <li className='list-group-item'>
//                                     <b>Department: {adduser.department}</b>
//                                 </li>
//                                 <li className='list-group-item'>
//                                     <b>Course: {adduser.course}</b>
//                                 </li>
//                                 <li className='list-group-item'>
//                                     <b>Phone: {adduser.phone}</b>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     <Link className='btn btn-primary my-2' to={'/'}>
//                         Back To Home
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Viewuser
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import '../styling/ViewUser.css';

const Viewuser = () => {
  const { id } = useParams();
  const cardRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [adduser, setAddUser] = useState({
    studentId: '',
    firstname: '',
    lastname: '',
    email: '',
    department: '',
    course: '',
    phone: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/student/${id}`);
    setAddUser(result.data);
  };

  const handleHover = () => {
    if (!hasAnimated) {
      gsap.to(cardRef.current, {
        duration: 1,
        scale: 1.02,
        boxShadow: '0 0 20px rgba(0, 123, 255, 0.5)',
        ease: 'power3.out',
      });
      setHasAnimated(true);
    }
  };

  return (
    <div className="view-container">
      <div
        className="user-card"
        ref={cardRef}
        onMouseEnter={handleHover}
      >
        <div className="user-info">
          <h2>{adduser.firstname} {adduser.lastname}</h2>
          <p className="role">Student</p>
        </div>

        <div className="user-stats">
          <div className="stat-box">
            <span className="label">ID</span>
            <span className="value">{adduser.studentId}</span>
          </div>
          <div className="stat-box">
            <span className="label">Department</span>
            <span className="value">{adduser.department}</span>
          </div>
          <div className="stat-box">
            <span className="label">Course</span>
            <span className="value">{adduser.course}</span>
          </div>
        </div>

        <div className="extra-details">
          <p><strong>Email:</strong> {adduser.email}</p>
          <p><strong>Phone:</strong> {adduser.phone}</p>
        </div>

        <div className="user-actions">
          <Link className="btn-outline" to="/home">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Viewuser;
