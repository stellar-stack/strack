// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const Viewresult = () => {
//     const { id } = useParams(); // Extract the id from the URL
//     console.log("Received ID:", id);  // This will tell us if `id` is correct

//     const [viewresult, setViewResult] = useState({
//         studentid: "",
//         os: 0,
//         analyticalthinking: 0,
//         cprogramming: 0,
//         linearalgebra: 0,
//         total: 0
//     });

//     useEffect(() => {
//         if (!id) {
//             console.error("No ID found in URL!"); // In case `id` is not present
//             return;
//         }

//         console.log("Fetching result for ID:", id); // Check if the id is correct

//         const loadLoneResult = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/result/studentresult/${id}`);
//                 console.log("API Response:", response.data);  // Log the data received
//                 setViewResult(response.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         loadLoneResult();
//     }, [id]); // Re-run effect when `id` changes

//     return (
//         <div className='container'>
//         <div className='row'>
//             <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
//                 <h2 className='text-center m-4'>User Details</h2>

//                 <div className='card'>
//                     <div className='card-header'>
//                         Details of user id: {viewresult.studentid}
//                         <ul className='list-group list-group-flush'>
//                             <li className='list-group-item'>
//                                 <b>OS: {viewresult.os}</b>
//                             </li>
//                             <li className='list-group-item'>
//                                 <b>Analytical Thinking: {viewresult.analyticalthinking}</b>
//                             </li>
//                             <li className='list-group-item'>
//                                 <b>C Programming: {viewresult.cprogramming}</b>
//                             </li>
//                             <li className='list-group-item'>
//                                 <b>Linear Algebra: {viewresult.linearalgebra}</b>
//                             </li>
//                             <li className='list-group-item'>
//                                 <b>Total: {viewresult.total}</b>
//                             </li>
                            
//                         </ul>
//                     </div>
//                 </div>

//                 <Link className='btn btn-primary my-2' to={'/result'}>
//                     Back To Home
//                 </Link>
//             </div>
//         </div>
//     </div>
//     );
// };

// export default Viewresult;


// // updated
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import '../styling/Viewresult.css';

const Viewresult = () => {
    const { id } = useParams();
    const cardRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const [viewresult, setViewResult] = useState({
        studentid: "",
        os: 0,
        analyticalthinking: 0,
        cprogramming: 0,
        linearalgebra: 0,
        total: 0
    });

    useEffect(() => {
        const loadLoneResult = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/result/studentresult/${id}`);
                setViewResult(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            loadLoneResult();
        }
    }, [id]);

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

    // Conditional styling for total
    const totalClass = viewresult.total < 170 ? "value fail" : "value";

    return (
        <div className="view-container">
            <div
                className="result-card"
                ref={cardRef}
                onMouseEnter={handleHover}
            >
                <div className="result-info">
                    <h2>Student Result</h2>
                    <p className="role">Student ID: {viewresult.studentid}</p>
                </div>

                <div className="result-stats">
                    <div className="stat-box">
                        <span className="label">OS</span>
                        <span className="value">{viewresult.os}</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">Analytical</span>
                        <span className="value">{viewresult.analyticalthinking}</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">C Programming</span>
                        <span className="value">{viewresult.cprogramming}</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">Linear Algebra</span>
                        <span className="value">{viewresult.linearalgebra}</span>
                    </div>
                    <div className="stat-box highlight">
                        <span className="label">Total</span>
                        <span className={totalClass}>{viewresult.total}</span>
                    </div>
                </div>

                <div className="result-actions">
                    <Link className="btn-outline" to="/result">
                        Back to Results
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Viewresult;


// updated 2

// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../styling/Viewresult.css';
// import gsap from 'gsap';

// const Viewresult = () => {
//     const { id } = useParams();
//     const cardRef = useRef(null);
//     const [viewresult, setViewResult] = useState({
//         studentid: "",
//         os: 0,
//         analyticalthinking: 0,
//         cprogramming: 0,
//         linearalgebra: 0,
//         total: 0
//     });

//     useEffect(() => {
//         const loadLoneResult = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/result/studentresult/${id}`);
//                 setViewResult(response.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         if (id) {
//             loadLoneResult();
//         }
//     }, [id]);

//     useEffect(() => {
//         gsap.from(cardRef.current, {
//             duration: 1,
//             y: 100,
//             opacity: 0,
//             ease: 'power4.out'
//         });
//     }, []);

//     return (
//         <div className="game-card-container">
//             <div className="game-card" ref={cardRef}>
//                 <div className="card-header">
//                     <span className="star">★</span>
//                     <span className="card-id"># {id}</span>
//                 </div>

//                 <div className="student-name">Student ID: {viewresult.studentid}</div>

//                 <div className="card-body">
//                     <div className="stat-row">
//                         <span>OS</span>
//                         <span>{viewresult.os}</span>
//                     </div>
//                     <div className="stat-row">
//                         <span>Analytical</span>
//                         <span>{viewresult.analyticalthinking}</span>
//                     </div>
//                     <div className="stat-row">
//                         <span>C Programming</span>
//                         <span>{viewresult.cprogramming}</span>
//                     </div>
//                     <div className="stat-row">
//                         <span>Linear Algebra</span>
//                         <span>{viewresult.linearalgebra}</span>
//                     </div>
//                     <div className="stat-row total">
//                         <span>Total</span>
//                         <span>{viewresult.total}</span>
//                     </div>
//                 </div>

//                 <div className="special-action">
//                     <Link to="/result" className="special-button">⮜ Back to Results</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Viewresult;
