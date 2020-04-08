import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import { Redirect } from 'react-router-dom'

class landingPage extends Component {
    state = {
        gsButtonClicked: false
    }

    //for toggling to next page
    handleGetStartedButton = () => {
        this.setState({ gsButtonClicked: true });
    }

    render () {
        if (this.state.gsButtonClicked) {
            return <Redirect to="/selectBoard" />
        }

        return (
            <div id="wrapper">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand className="navbar_title text-center w-100" href="#home">Envisifi</Navbar.Brand>
                </Navbar>

                <Jumbotron id="landingPageJumbotron">
                    <div className="">
                        <p className="lpText text-center display-4 mt-4">
                            Make a collage wallpaper to fit your iPhone perfectly!
                        </p>
                        <div className="text-center mt-5">
                            <Button variant="info" id="getStartedBtn" onClick={() => this.handleGetStartedButton()}>GET STARTED</Button>
                        </div>
                    </div>
                </Jumbotron>
                <div className="footer">
                    <div className="p-2 text-center">&copy; Will Rackley</div>
                </div>
            </div>
        )
    }
}

export default landingPage;