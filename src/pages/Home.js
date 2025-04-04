import React, { useEffect, useState } from 'react'
import '../styling/home.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

    const [students, setStudent] = useState([])
    const [search, setSearch] = useState('')

    console.log(search)

    useEffect(() => {
        loadAllStudent();
    }, [])

    const loadAllStudent = async () => {
        const result = await axios.get("http://localhost:8080/api/students")
        setStudent(result.data)
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:8080/api/delete/${id}`)
        loadAllStudent()
    }

    return (

        <div>

            <div className='search'>
                <form className="d-flex" role="search">
                    <span class="search-icon material-symbols-outlined">
                        search
                    </span>                    
                    <input className="form-control me-2 search-input" type="search" placeholder="OX1999"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)} />

                </form>
            </div>



            <table className="table border shadow table-striped table-hover table-bordered border-success table-dark table-sm align-middle table-responsive">
                <thead className='t-heading table'>
                    <tr className='t-head-row'>
                        <th scope="col">#</th>
                        <th scope="col">StudentId</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                        <th scope="col">Course</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Perform Actions</th>
                    </tr>
                </thead>
                <tbody className='t-body my-2 mx-2'>

                    {
                        students.filter((item) => {
                            return search.toLowerCase() === '' ?
                                item :
                                item.studentId.toLowerCase().includes(search)
                        }).map((student, index) => {

                            return (
                                <tr className='my-2 mx-2' key={student.id}>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{student.studentId}</td>
                                    <td>{student.firstname}</td>
                                    <td>{student.lastname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.department}</td>
                                    <td>{student.course}</td>
                                    <td>{student.phone}</td>


                                    <td>
                                        <Link type="button" className="btn btn-secondary my-2 mx-2" to={`viewuser/${student.id}`}>View</Link>
                                        <Link type="button" className="btn btn-primary my-2 mx-2" to={`edituser/${student.id}`}>Edit</Link>
                                        <button type="button" className="btn btn-danger my-2 mx-2"
                                            onClick={() => { deleteStudent(student.id) }}>Delete</button>
                                    </td>




                                </tr>
                            )

                        })
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Home