import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Button from "react-bootstrap/Button"
import { Redirect } from 'react-router-dom'

class landingPage extends Component {
    state = {
        gsButtonClicked: false
    }

    handleGetStartedButton = () => {
        this.setState({ gsButtonClicked: true });
    }

    render () {
        if (this.state.gsButtonClicked) {
            return <Redirect to="/selectBoard" />
        }

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Envisifi</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div>
                <Button variant="info" onClick={() => this.handleGetStartedButton()}>Get Started</Button>
                {/* <NavLink to="/selectBoard"> Get Started </NavLink> */}
                </div>
            </div>
        )
    }
}

export default landingPage;