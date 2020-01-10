import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import { GiSmartphone} from "react-icons/gi";
import { GiTablet} from "react-icons/gi";
import { GiPc} from "react-icons/gi";

class selectBoard extends Component {
    state = {
        deviceTypeButtonDiv: "deviceType"
    }

    handleDeviceButtonClick =  buttonText => {
        this.setState({ deviceTypeButtonDiv: buttonText })
    }

    render() {
        let deviceButtons = <div></div>
        let backButton = <div></div>
        let initialButtonScreen = 
            <div>
                <div className="text-center"> Where is your vision board going to be seen?</div>

                <div className="text-center">
                    <Button className="m-2" onClick={() => this.handleDeviceButtonClick("PHONE")}> PHONE <br/><GiSmartphone size="10em"/> </Button>
                    <Button className="m-2"> TABLET<br/> <GiTablet size="10em"/> </Button>
                    <Button className="m-2"> COMPUTER <br/> <GiPc size="10em"/> </Button>
                </div>
            </div>;

        if (this.state.deviceTypeButtonDiv === "deviceType"){
            deviceButtons = initialButtonScreen
        } else if (this.state.deviceTypeButtonDiv === "PHONE") {
            backButton = <Button onClick={() => this.handleDeviceButtonClick("deviceType")}>Back</Button>;
            deviceButtons = <div>
                                 <div className="text-center"> Which Type of Phone?</div>
                                 <div className="text-center">
                                    <Button variant="none" className="m-2" style={{height: "12em", width: "8em", backgroundImage: "url(https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-purple-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566960958082)", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}> <span className="text-dark">iphone</span> </Button>

                                    <Button variant="none" className="m-2 text-dark" style={{height: "12em", width: "8em", backgroundImage: "url(https://images.samsung.com/is/image/samsung/p5/ph/smartphones/ph-pcd-galaxy-a50.png?$ORIGIN_PNG$", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}> <span >SAMSUNG</span> </Button>
                                </div>
                            </div>

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
                
                <Jumbotron>
                    <div>
                        {backButton}
                    </div>
                    {deviceButtons}
                </Jumbotron>
            </div>
        )
    }
}

export default selectBoard;