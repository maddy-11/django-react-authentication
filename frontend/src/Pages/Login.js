import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../reducer/Actions";

const Login = ({ login, isAuthenticated }) => {
    const [ formData, setFormData ] = useState ({
        email: "",
        password: ""
    });
    const { email, password } = formData;
    const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const handlingSubmit = (e) => {
        e.preventDefault();
        login( email, password );
    }
    const continueWithGoogle = () => {
        const clientID = "132960106269-1dm1vkhif7qlh8je7t2s1pa3f7i9kquo.apps.googleusercontent.com";
        const callBackURI = "http://localhost:8000/";
        window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`)
    }
    if (isAuthenticated) {
        return <Navigate to={"../"}></Navigate>
    }
    return (
        <div className="main-box bg-light card shadow">
            <h2 className="text-center mb-4">Login</h2>
            <form className="mb-3" onSubmit={e => handlingSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="email" value={email} onChange={e => handlingInput(e)} type="email" className="form-control" id="email" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" value={password} onChange={e => handlingInput(e)} type="password" className="form-control" id="password" placeholder="password"/>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
                <Button variant="outline-danger col-lg-12 my-1" onClick={continueWithGoogle}>
                    <i className="fab fa-google"></i> Google
                </Button>
            </form>
            <p>Forgot your password? <Link to={"../reset/password/"}>Reset Password</Link></p>
            <p>Don't have any account? <Link to={"../signup/"}>Signup</Link></p>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
}

export default connect(mapStateToProps, { login })(Login)