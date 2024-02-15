import { eventWrapper } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";


function Signup() {

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })



    function handleInput(event) {
        setUserData({ ...userData, [event.target.name]: event.target.event });
    }

    function handleSubmit(){
        event.preventDefault();
    }


    return (
        <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-warning">
            <div className="form_container p-5 rounded bg-white">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Sign Up</h3>
                    <div className="mb-2">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" placeholder="Enter First Name" className="form-control" name="first-name" onChange={handleInput} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" className="form-control" name="last-name" onChange={handleInput} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" name="email" onChange={handleInput} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" className="form-control" name="password" onChange={handleInput} />
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                    <p className="text-end mt-2">
                        Already Registered <Link to="/" className="ms-2" href="">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;