// import React, { useEffect, useState } from 'react'
// import '../styling/home.css'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// const Home = () => {

//     const [students, setStudent] = useState([])
//     const [search, setSearch] = useState('')

//     console.log(search)

//     useEffect(() => {
//         loadAllStudent();
//     }, [])

//     const loadAllStudent = async () => {
//         const result = await axios.get("http://localhost:8080/api/students")
//         setStudent(result.data)
//     }

//     const deleteStudent = async (id) => {
//         await axios.delete(`http://localhost:8080/api/delete/${id}`)
//         loadAllStudent()
//     }

//     return (

//         <div>

//             <div className='search'>
//                 <form className="d-flex" role="search">
//                     <span class="search-icon material-symbols-outlined">
//                         search
//                     </span>                    
//                     <input className="form-control me-2 search-input" type="search" placeholder="OX1999"
//                         aria-label="Search"
//                         onChange={(e) => setSearch(e.target.value)} />

//                 </form>
//             </div>



//             <table className="table border shadow table-striped table-hover table-bordered border-success table-dark table-sm align-middle table-responsive">
//                 <thead className='t-heading table'>
//                     <tr className='t-head-row'>
//                         <th scope="col">#</th>
//                         <th scope="col">StudentId</th>
//                         <th scope="col">Firstname</th>
//                         <th scope="col">Lastname</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Department</th>
//                         <th scope="col">Course</th>
//                         <th scope="col">Phone</th>
//                         <th scope="col">Perform Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody className='t-body my-2 mx-2'>

//                     {
//                         students.filter((item) => {
//                             return search.toLowerCase() === '' ?
//                                 item :
//                                 item.studentId.toLowerCase().includes(search)
//                         }).map((student, index) => {

//                             return (
//                                 <tr className='my-2 mx-2' key={student.id}>
//                                     <th scope="row" key={index}>{index + 1}</th>
//                                     <td>{student.studentId}</td>
//                                     <td>{student.firstname}</td>
//                                     <td>{student.lastname}</td>
//                                     <td>{student.email}</td>
//                                     <td>{student.department}</td>
//                                     <td>{student.course}</td>
//                                     <td>{student.phone}</td>

                                    
//                                     <td>
//                                         <Link type="button" className="btn btn-secondary my-2 mx-2" to={`/home/viewuser/${student.id}`}>View</Link>
//                                         <Link type="button" className="btn btn-primary my-2 mx-2" to={`/home/edituser/${student.id}`}>Edit</Link>
//                                         <button type="button" className="btn btn-danger my-2 mx-2"
//                                             onClick={() => { deleteStudent(student.id) }}>Delete</button>
//                                     </td>




//                                 </tr>
//                             )

//                         })
//                     }


//                 </tbody>
//             </table>
//         </div>
//     )
// }
import React, { useEffect, useState } from 'react';
import '../styling/home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Home = () => {
  const [students, setStudent] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadAllStudent();
  }, []);

  const loadAllStudent = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/students");
      setStudent(result.data);
      setIsLoaded(true); // Mark the data as loaded
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      // Run the animation after the content is loaded
      animateTable();
      animateSearchBar();
    }
  }, [isLoaded]);

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/api/delete/${id}`);
    loadAllStudent();  // Reload students after deletion
  };

  // GSAP Animations for table
  const animateTable = () => {
    gsap.fromTo(
      '.table-wrapper', 
      { opacity: 0, y: 50 }, 
      { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.table th, .table td',
      { opacity: 0, y: 20 },
      { duration: 0.5, opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' }
    );

    // GSAP hover animation for buttons
    gsap.fromTo(
      '.action-btn', 
      { scale: 1, opacity: 1 }, 
      { scale: 1.1, opacity: 0.8, duration: 0.3, ease: 'power2.inOut', paused: true }
    );

    // Add hover effect to buttons
    document.querySelectorAll('.action-btn').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, opacity: 0.8, duration: 0.3 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, opacity: 1, duration: 0.3 });
      });
    });
  };

  // GSAP Animation for the search bar
  const animateSearchBar = () => {
    gsap.fromTo(
      '.search-input', 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1, ease: 'bounce.out' }
    );

    document.querySelector('.search-input').addEventListener('focus', () => {
      gsap.to('.search-input', { scale: 1.05, duration: 0.3, ease: 'power1.out' });
    });

    document.querySelector('.search-input').addEventListener('blur', () => {
      gsap.to('.search-input', { scale: 1, duration: 0.3, ease: 'power1.out' });
    });
  };

  return (
    <div>
      <div className="search">
        <form className="d-flex" role="search">
          <span className="search-icon material-symbols-outlined">search</span>
          <input
            className="form-control me-2 search-input"
            type="search"
            placeholder="Search by Student ID"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="table-wrapper">
        <table className="table table-striped table-hover table-bordered border-success table-dark table-sm align-middle">
          <thead className="t-heading sticky-header">
            <tr>
              <th>#</th>
              <th>StudentId</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Department</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((item) =>
                search.toLowerCase() === ''
                  ? item
                  : item.studentId.toLowerCase().includes(search.toLowerCase())
              )
              .map((student, index) => (
                <tr className="student-row" key={student.id}>
                  <th>{index + 1}</th>
                  <td>{student.studentId}</td>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>{student.course}</td>
                  <td>{student.phone}</td>
                  <td>
                    <Link className="btn btn-secondary action-btn" to={`/home/viewuser/${student.id}`}>
                      View
                    </Link>
                    <Link className="btn btn-primary action-btn" to={`/home/edituser/${student.id}`}>
                      Edit
                    </Link>
                    <button className="btn btn-danger action-btn" onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
