import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import gsap from 'gsap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Adduser = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const inputRefs = useRef([]);

  const [adduser, setAddUser] = useState({
    studentId: "",
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    course: "",
    phone: ""
  });

  const onInputChange = (e) => {
    setAddUser({ ...adduser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/student', adduser);

      toast.success('🎉 User added successfully!', {
        position: "top-right",
        autoClose: 2000
      });

      gsap.to(formRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      });
    } catch (error) {
      toast.error('❌ Error adding user. Try again!', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!formRef.current) return;

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      );

      gsap.from(inputRefs.current.filter(Boolean), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out"
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const inputFields = [
    { label: "Student Id", name: "studentId", type: "text", placeholder: "IU2380820279" },
    { label: "First Name", name: "firstname", type: "text" },
    { label: "Last Name", name: "lastname", type: "text" },
    { label: "Email", name: "email", type: "email", placeholder: "@gmail.com" },
    { label: "Phone", name: "phone", type: "tel", placeholder: "0300..." }
  ];

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white px-4 py-5">
      <form
        ref={formRef}
        className="bg-secondary p-5 rounded-4 shadow-lg w-100"
        onSubmit={onSubmit}
        style={{ maxWidth: "850px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-white">Add New Student</h2>
        <div className="row g-4">
          <div className="col-md-6">
            {inputFields.map((field, i) => (
              <div className="mb-3" key={field.name} ref={el => inputRefs.current[i] = el}>
                <label className="form-label fw-semibold text-light">{field.label}</label>
                <input
                  type={field.type}
                  className="form-control bg-dark text-white border-light"
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={adduser[field.name]}
                  onChange={onInputChange}
                  required
                  onFocus={(e) => gsap.to(e.target, { scale: 1.03, duration: 0.2 })}
                  onBlur={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
                />
              </div>
            ))}
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div className="mb-3" ref={el => inputRefs.current[5] = el}>
              <label className="form-label fw-semibold text-light">Department</label>
              <select
                className="form-select bg-dark text-white border-light"
                name="department"
                value={adduser.department}
                onChange={onInputChange}
                required
              >
                <option disabled value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="SE">Software Engineering</option>
              </select>
            </div>

            <div className="mb-3" ref={el => inputRefs.current[6] = el}>
              <label className="form-label fw-semibold text-light">Course</label>
              <select
                className="form-select bg-dark text-white border-light"
                name="course"
                value={adduser.course}
                onChange={onInputChange}
                required
              >
                <option disabled value="">Select Course</option>
                <option value="1">Course 1</option>
                <option value="2">Course 2</option>
                <option value="3">Course 3</option>
              </select>
            </div>

            <div className="d-flex gap-3 mt-3">
              <button
                type="submit"
                className="btn btn-success w-100 fw-bold"
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05 })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1 })}
              >
                🎓 Submit
              </button>
              <Link
                to="/home"
                className="btn btn-danger w-100 fw-bold text-decoration-none text-white text-center"
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05 })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1 })}
              >
                ❌ Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Adduser;
