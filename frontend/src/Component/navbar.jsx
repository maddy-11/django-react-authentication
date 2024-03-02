import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const CustomNavbar = ({ logout, isAuthenticated }) => {
    return (
        <Navbar bg="primary" expand="lg" variant="dark" className="p-3">
            <Navbar.Brand as={Link} to="/">Mywebsite.co.id</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    </Nav.Item>
                    { isAuthenticated ? (
                        <>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/change/password">Change Password</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="outline-light" onClick={logout}>Logout</Button>
                            </Nav.Item>
                        </>
                    ) : (
                        <>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
}

export default connect(mapStateToProps, { logout })(CustomNavbar);
