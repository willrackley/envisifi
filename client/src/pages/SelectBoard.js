import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Jumbotron from "react-bootstrap/Jumbotron"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import { GiSmartphone} from "react-icons/gi";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import html2canvas from 'html2canvas';
import "./style.css";


class selectBoard extends Component {
    state = {
        deviceTypeButtonDiv: "PHONE",
        editSection: "none",
        phoneOutlinePortrait: <div></div>,
        placeHolder1Style: { backgroundImage:  "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')"},
        divImagePlaceholder1: "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')",
        clickedPlaceholder: 0,
        size: null,
        base64Download: "",
        isLoading: false
    }
    
    
    handleDeviceButtonClick =  buttonText => {
        this.setState({ deviceTypeButtonDiv: buttonText });
    }

    selectImgFile = event => {

        const file = event.target.files[0];
        
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
    }

    handleDeviceEditSection = async (device, width, height)=> {

        await this.setState({size: { device: {device: device, width: width, height: height} }, phoneOutlinePortrait: <div></div>, isLoading: true });

        await new Promise((resolve, reject) => setTimeout(resolve, 500));

        if (this.state.deviceTypeButtonDiv === "iphoneTypes"){
            this.setState({ phoneOutlinePortrait: 
                <div className="mx-auto phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden", display: "block"}}> 
                
                    <div className="halfSizePlaceholder1" onDoubleClick={()=>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}} >
                        <img id="placeholder1" src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
                    </div>

                    <div className="halfSizePlaceholder2" onDoubleClick={()=>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}} >
                        <img id="placeholder2" src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
                    </div>
              </div>,
              isLoading: false
            })
        }
       
    }

    screenshot = async () => {
        let base64URL;
        let imgdataURL;
        let deviceHeight = this.state.size.device.height;
        let deviceWidth = this.state.size.device.width;

        await html2canvas(document.getElementsByClassName('phoneScreen')[0], {height: this.state.size.device.height/2, scrollX: 0, scrollY: -window.scrollY}).then(function(canvas) {
       
            document.getElementsByClassName('screenshotSec')[0].appendChild(canvas);

            base64URL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

            const img = new Image();
            img.src = base64URL;
            img.height = deviceHeight;
            img.width = deviceWidth;
            img.classList.add('increasedSize')
            document.getElementsByClassName('largePic')[0].append(img)

            img.onload = function() {
                let newCanvas = document.createElement("canvas");
                newCanvas.width = img.width;
                newCanvas.height = img.height;
                let ctx = newCanvas.getContext("2d");
                ctx.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
                imgdataURL = newCanvas.toDataURL("image/png").replace('image/png', 'image/octet-stream');
            }
        });

      
       await new Promise((resolve, reject) => setTimeout(resolve, 1000))
       this.setState({ base64Download: imgdataURL })
       
    }



    render() {
        let deviceButtons = <div></div>
        let backButton = <div></div>
        let initialButtonScreen = 
            <div>
                <div className="text-center"> Where is your vision board going to be seen?</div>

                <div className="text-center">
                    <Button className="m-2" onClick={() => this.handleDeviceButtonClick("PHONE")}> PHONE <br/><GiSmartphone size="10em"/> </Button>
                    {/* <Button className="m-2"> TABLET<br/> <GiTablet size="10em"/> </Button>
                    <Button className="m-2"> COMPUTER <br/> <GiPc size="10em"/> </Button> */}
                </div>
            </div>;

        

        if (this.state.deviceTypeButtonDiv === "deviceType"){
            deviceButtons = initialButtonScreen
        } else if (this.state.deviceTypeButtonDiv === "PHONE") {
            backButton = <Button onClick={() => this.handleDeviceButtonClick("deviceType")}>Back</Button>;
            deviceButtons = <div>
                                 <div className="text-center"> Which Type of Phone?</div>
                                 <div className="text-center">
                                    <Button 
                                    variant="none" 
                                    className="m-2" 
                                    style={{height: "12em", width: "8em", backgroundImage: "url(https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-purple-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566960958082)", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} 
                                    onClick={() => this.handleDeviceButtonClick("iphoneTypes")}>
                                        <span className="text-dark">iphone</span>
                                    </Button>

                                    <Button variant="none" className="m-2 text-dark" style={{height: "12em", width: "8em", backgroundImage: "url(https://images.samsung.com/is/image/samsung/p5/ph/smartphones/ph-pcd-galaxy-a50.png?$ORIGIN_PNG$", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}> <span >SAMSUNG</span> </Button>
                                </div>
                            </div>
        } else if (this.state.deviceTypeButtonDiv === "iphoneTypes") {
            
            backButton = <Button onClick={() => this.handleDeviceButtonClick("PHONE")}>Back</Button>;

            if(this.state.isLoading){
                deviceButtons = <div className="text-center"><Spinner animation="border" /></div>
            } else {
                deviceButtons = <div className="text-center">
                                <Button 
                                className="m-2" 
                                onClick={() => {this.handleDeviceEditSection("Xs Max", 414, 896)}}>
                                    Xs Max
                                </Button>

                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("11 Pro Max", 414, 896)}}>11 Pro Max</Button>


                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("11",828, 1792)}}>11</Button>

                                <Button className="m-2" onClick={() => {this.handleDeviceEditSection("Xr", 828, 1792)}}>Xr</Button>
                            </div>
            }
            
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

                <div className="editSection">
                    {this.state.phoneOutlinePortrait}   
                    <div className="form-group">
                        <input id="fileInput1" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                        <input id="fileInput2" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                    </div> 
                            
                    <Button onClick={() => {this.screenshot()}}>Done</Button>

                    <a href={this.state.base64Download} download="newBoard.png"   >Download</a>
                        
                    <div>
                        <div className="screenshotSec"></div>
                    </div>
               
                    <div className="largePic"></div>
                </div>
            </div>
        )
    }
}

export default selectBoard;