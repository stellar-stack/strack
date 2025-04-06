// import React from 'react'
// import { Link } from 'react-router-dom'
// import '../styling/home.css'

// const Navbar = () => {
//   return (

//     <nav className="navbar navbar-expand-lg gsap-nav">
//   <div className="container-fluid">
//     <Link className="navbar-brand logo" to={'/'}>Strack</Link>

//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
//       <li className="nav-item">
//         <Link className="btn links" to='/home'>Students</Link>
          
//         </li>

//         <li className="nav-item">
//         <Link className="btn links" to='/adduser'>Add Student</Link>
//         </li>

//         <li className="nav-item">
//         <Link className="btn links" to='/result'>Result</Link>
//         </li>


//         <li className="nav-item">
//         <Link className="btn links" to='/result/addresult'>Add Result</Link>
//         </li>


//         <li className="nav-item">
//           <a className="nav-link links" href="#">Community</a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link links" href="#">Learn GSAP</a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link links" href="#">Docs</a>
//         </li>
//         {/* <li className="nav-item dropdown">
//           <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Dropdown
//           </a>
//           <ul className="dropdown-menu">
//             <li><a className="dropdown-item" href="#">Action</a></li>
//             <li><a className="dropdown-item" href="#">Another action</a></li>
//             <li><hr className="dropdown-divider" /></li>
//             <li><a className="dropdown-item" href="#">Something else here</a></li>
//           </ul>
//         </li> */}
       
//       </ul>
//       {/* <form className="d-flex" role="search">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
//         {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
        

//       {/* </form> */}
//     </div>
//   </div>
// </nav>

// //     <div>
// //         <nav classNameName="navbar gsap-nav">
// //   <div classNameName="container-fluid">
// //     <Link classNameName="navbar-brand logo" to={'/'}>Strack</Link>
// //     <form classNameName="d-flex" role="search">
// //       {/* <input classNameName="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
// //       <Link classNameName="btn btn-outline-success" to='/adduser'>Add User</Link>
// //     </form>
// //   </div>
// // </nav>
// //     </div>
//   )
// }

// export default Navbar



// updated code
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styling/home.css';

const Navbar = () => {

  useEffect(() => {
    // Ensure that animations only run after the component is mounted
    const timeout = setTimeout(() => {
      // Animate logo and navbar items using GSAP when the component mounts
      gsap.to('.sticky-navbar', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.logo', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.navbar-nav .nav-item', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out',
      });
    }, 100); // Delay to ensure DOM is ready for GSAP

    // Create flower pop-out animation
    const logo = document.querySelector('.logo');

    logo.addEventListener('mouseenter', () => {
      // Create and animate shapes (flower-like elements) around the logo
      for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        logo.appendChild(shape);

        const angle = Math.random() * 360; // Random angle for each shape
        const distance = Math.random() * 50 + 30; // Random distance

        // Animate shape to pop out using GSAP
        gsap.to(shape, {
          opacity: 1,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            // Remove the shape after animation completes
            shape.remove();
          },
        });
      }
    });

    // Animation for the logo itself
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.2,
        rotation: 10,
        duration: 0.5,
        ease: 'elastic.out(1, 0.75)',
        color: "#FFB84D", // Change logo color
        textShadow: "0 0 20px rgba(255, 184, 77, 0.8)", // Glowing effect
        boxShadow: "0 0 15px rgba(255, 184, 77, 0.6)", // Outer shadow effect
      });
    });

    // Reset logo animation on mouse leave
    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'elastic.in(1, 0.75)',
        color: "#fff", // Reset logo color
        textShadow: "none", // Reset text shadow
        boxShadow: "none", // Remove box shadow
      });
    });

    // Cleanup: Remove event listeners when component unmounts
    return () => {
      clearTimeout(timeout); // Clean up the timeout
    };

  }, []); // Empty dependency array means this runs once on mount

  return (
    <nav className="navbar navbar-expand-lg navbar-light gsap-nav sticky-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand logo" to={'/'}>SRMS</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="btn links" to='/home'>Students</Link>
            </li>

            <li className="nav-item">
              <Link className="btn links" to='/adduser'>Add Student</Link>
            </li>

            <li className="nav-item">
              <Link className="btn links" to='/result'>Result</Link>
            </li>

            <li className="nav-item">
              <Link className="btn links" to='/result/addresult'>Add Result</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link links" href="#">Community</a>
            </li>
            <li className="nav-item">
              <a className="nav-link links" href="#">Learn GSAP</a>
            </li>
            <li className="nav-item">
              <a className="nav-link links" href="#">Docs</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

