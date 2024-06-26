import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import 'react-notifications/lib/notifications.css';


import axios from "axios";


import {NotificationContainer, NotificationManager} from 'react-notifications';
import Header from "../../../components/header";

const ClassesCreate = (props) => {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [students, setStudents] = useState("");
    const [item, setItem] = useState({});
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // new loading state
    const [redirect, setRedirect] = useState(false); // new redirect state




    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const userIsAdmin = localStorage.getItem('userIsAdmin');

        if (storedToken && userIsAdmin=="true") {
            setToken(storedToken);
            // getHallData function here
        } else {
            setIsLoading(false); // set loading to false after token check
            setRedirect(true); // set redirect to true if there's no token
        }
        setIsLoading(false);
        setItem(props.data);
    }, [props.data])

    if (redirect) {
        window.location.href = "/login";
        return null; // return null to prevent rendering
    }

    if (isLoading) {
        return null; // or return a loading spinner
    } 

    const handleCreate = () => {
        const data = {
            name: name,
            year: year,
            semester: semester,
            count_of_students: students
        }
        axios.post(`https://api.qrdestek.com/api/class/list-create/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {

            NotificationManager.success('Success Message', 'This data is successfully created.');
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="flex">
                <Header />

                <div className="items-center w-full mx-32">
                    <p className="my-4 px-2 text-2xl font-bold tracking-wider">Create</p>
                    <p className="text-lg py-2 font-medium tracking-wider border-b-4">Class</p>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Name</p>
                        <input className="w-full" placeholder="Please input the name..." onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Year</p>
                        <select className="w-full" onChange={(e) => setYear(e.target.value)}>
                            <option value="">Select a year...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Semester</p>
                        <select className="w-full" onChange={(e) => setSemester(e.target.value)}>
                            <option value="">Select a semester...</option>
                            <option value="Sonbahar">Sonbahar</option>
                            <option value="İlkbahar">İlkbahar</option>
                        </select>
                    </div>

                    <div className="w-1/3 my-4">
                        <p className="text-md font-medium">Number Of Students</p>
                        <input className="w-full" type="number" placeholder="Please input the number of seats..." onChange={(e) => setStudents(e.target.value)} />
                    </div>

                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleCreate()}>Save</button>

                    <div className="pt-2">
                        <Link to="/classes" onClick={() => window.location.href="/classes"} className="text-blue-600">Back to List</Link>
                    </div>
                    <NotificationContainer/>
                </div>
            </div>
        </>
    )
}

export default ClassesCreate;