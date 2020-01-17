import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import { GiSmartphone} from "react-icons/gi";
import { GiTablet} from "react-icons/gi";
import { GiPc} from "react-icons/gi";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import html2canvas from 'html2canvas';
import "./style.css";


class selectBoard extends Component {
    state = {
        deviceTypeButtonDiv: "deviceType",
        editSection: "none",
        phoneOutlinePortrait: <div></div>,
        placeHolder1Style: { backgroundImage:  "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')"},
        divImagePlaceholder1: "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')",
        clickedPlaceholder: 0,
        selectedFile: "",
        selectedRawFile: null,
        imageUploaded: false,
        test: "10px solid black"
    }
    
    
    handleDeviceButtonClick =  buttonText => {
        this.setState({ deviceTypeButtonDiv: buttonText });
    }

    selectImgFile = event => {
        // this.setState({ selectedFile: URL.createObjectURL(event.target.files[0]) });
        // this.setState({ selectedRawFile: event.target.files[0]})
        // this.setState({ imageUploaded: true });
        
        const file = event.target.files[0];
       
        // const preview1 = document.getElementById('placeholder1');
        // const preview2 = document.getElementById('placeholder2');

        for (let i=1; i <= 5; i++) {
            
            if (this.state.clickedPlaceholder === i) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    // remove any cropper if user decides to change image
                    let addedImg = document.getElementsByClassName(`halfSizePlaceholder${i}`)
                    if (addedImg[0].childNodes[1]) {
                        addedImg[0].removeChild(addedImg[0].childNodes[1])
                    }

                    document.getElementById(`placeholder${i}`).src = reader.result;
                    let cropper = new Cropper(document.getElementById(`placeholder${i}`), {dragMode: "move", guides: false, background: false, viewMode: 0, autoCropArea: 0, cropBoxResizable: false,cropBoxMovable: false, autoCrop: true, modal: false, center: false, highlight: false })
                    cropper.replace(document.getElementById(`placeholder${i}`).src)
    
                
                }, false);
                reader.readAsDataURL(file);
            }
        }
        
        if (file) {
            
            
        }
    }

    handleDeviceEditSection = (device, width, height)=> {
        let size = { device: {device: device, width: width, height: height} };
        console.log(size);
        if (this.state.deviceTypeButtonDiv === "iphoneTypes"){
            this.setState({ phoneOutlinePortrait: 
                <div className="mx-auto mb-5 phoneScreen" style={{width: "200px", height: "300px", border: "8px solid #a9a9a9", background: "#F3F3F3", borderRadius: "25px", overflow: "hidden"}}> 
                
                    <div className="halfSizePlaceholder1" onDoubleClick={()=>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}} >
                        <img id="placeholder1" src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
                    </div>

                    <div className="halfSizePlaceholder2" onDoubleClick={()=>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}} >
                        <img id="placeholder2" src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
                    </div>
              </div>
            })
        }
       
    }

    screenshot = () => {
        html2canvas(document.getElementsByClassName('phoneScreen')[0], {height: 500}).then(function(canvas) {
        document.getElementsByClassName('screenshotSec')[0].appendChild(canvas);
        
       });
    
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
                                    <Button variant="none" className="m-2" style={{height: "12em", width: "8em", backgroundImage: "url(https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-purple-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566960958082)", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} onClick={() => this.handleDeviceButtonClick("iphoneTypes")}> <span className="text-dark">iphone</span> </Button>

                                    <Button variant="none" className="m-2 text-dark" style={{height: "12em", width: "8em", backgroundImage: "url(https://images.samsung.com/is/image/samsung/p5/ph/smartphones/ph-pcd-galaxy-a50.png?$ORIGIN_PNG$", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}> <span >SAMSUNG</span> </Button>
                                </div>
                            </div>
        } else if (this.state.deviceTypeButtonDiv === "iphoneTypes") {
            backButton = <Button onClick={() => this.handleDeviceButtonClick("PHONE")}>Back</Button>;
            deviceButtons = <div className="text-center">
                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("Xs Max", 1242, 2688)}}>Xs Max</Button>

                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("11 Pro Max", 1242, 2688)}}>11 Pro Max</Button>


                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("11",828, 1792)}}>11</Button>

                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("Xr", 828, 1792)}}>Xr</Button>
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
                <div className="row">
                    <div className="col-6">
                        <div className="editSection">
                            <div className="form-group">
                                <input id="fileInput1" className="form-control text-center" type="file"
                                onChange={this.selectImgFile}
                                accept="image/*" style={{display: "none"}}/>
                                <input id="fileInput2" className="form-control text-center" type="file"
                                onChange={this.selectImgFile}
                                accept="image/*" style={{display: "none"}}/>
                            </div> 
                            {this.state.phoneOutlinePortrait}
                            <Button onClick={() => {this.screenshot()}}>download</Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="screenshotSec"></div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default selectBoard;