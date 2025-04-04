import React, { useEffect, useState } from 'react'
import '../styling/home.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Result = () => {

    const [result, setResult] = useState([])

    useEffect(() => {
        loadAllResults();
    }, [])

    const loadAllResults = async () => {
        const result = await axios.get("http://localhost:8080/result/")
        setResult(result.data)
    }

    const deleteResult = async (id) => {
        await axios.delete(`http://localhost:8080/result/deleteresult/${id}`)
        loadAllResults()
    }

    return (

        <div>
            <table className="table border shadow table-striped table-hover table-bordered border-success table-dark table-sm align-middle table-responsive">
                <thead className='t-heading table'>
                    <tr className='t-head-row'>
                        <th scope="col">#</th>
                        <th scope="col">StudentId</th>
                        <th scope="col">OS</th>
                        <th scope="col">Analytical Thinking</th>
                        <th scope="col">C Programming</th>
                        <th scope="col">Linear Algebra</th>
                        <th scope="col">Total</th>
                        <th scope="col">Gained</th>
                        <th scope="col">Perform Actions</th>
                    </tr>
                </thead>
                <tbody className='t-body my-2 mx-2'>

                    {
                        result.map((res, index) => {

                            return (
                                <tr className='my-2 mx-2' key={res.id}>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{res.studentid}</td>
                                    <td>{res.os}</td>
                                    <td>{res.analyticalthinking}</td>
                                    <td>{res.cprogramming}</td>
                                    <td>{res.linearalgebra}</td>
                                    <td>100</td>
                                    <td>{res.total}</td>
                                    <td>
                                        <Link type="button" className="btn btn-secondary my-2 mx-2" to={`/result/studentresult/${res.id}`}>View</Link>
                                        <Link type="button" className="btn btn-primary my-2 mx-2" to={`/result/editresult/${res.id}`}>Edit</Link>
                                        <button type="button" className="btn btn-danger my-2 mx-2"
                                            onClick={() => { deleteResult(res.id) }}>Delete</button>
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

export default Result