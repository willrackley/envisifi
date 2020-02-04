import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav"
// import NavDropdown from "react-bootstrap/NavDropdown"
import Jumbotron from "react-bootstrap/Jumbotron"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import { MdArrowBack } from "react-icons/md";
import { iphoneTypes } from "../Components/PhoneTypes";
import ButtonDisplay from "../Components/ButtonDisplay";
import { TwoPicCollage, ThreePicCollage, FourPicCollage, FivePicCollage, SixPicCollage } from "../Components/CollageOptions";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import html2canvas from 'html2canvas';
import "./style.css";


class selectBoard extends Component {

    scrollRef = React.createRef();

    state = {
        deviceTypeButtonDiv: "PHONE",
        editSection: "none",
        phoneOutlinePortrait: <div></div>,
        placeHolder1Style: { backgroundImage:  "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')"},
        divImagePlaceholder1: "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')",
        clickedPlaceholder: 0,
        size: null,
        phoneSizeChosen: false,
        base64Download: "",
        isLoadingPhoneOptions: false,
        isLoadingEditSection: false,
        editSectionDisplay: "none",
        collageType: <div></div>,
        collageOptionNum: 2
    }
    
    
    handleDeviceButtonClick =  buttonText => {
        this.setState({ deviceTypeButtonDiv: buttonText, editSectionDisplay: "none" });
    }

    handleScrollToElement(event) {
        if (this.state.phoneSizeChosen){
          this.scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

    selectImgFile = event => {

        const file = event.target.files[0];
        
        for (let i=1; i <= 5; i++) {
           
            if (this.state.clickedPlaceholder === i) {
                const reader = new FileReader();
                
                reader.addEventListener("load", () => {
                    // remove any cropper if user decides to change image
                    

                    document.getElementById(`placeholder${i}`).src = reader.result;
                    let cropper = new Cropper(document.getElementById(`placeholder${i}`), {dragMode: "move", guides: false, background: false, viewMode: 0, autoCropArea: 0, cropBoxResizable: false,cropBoxMovable: false, autoCrop: true, modal: false, center: false, highlight: false })
                    cropper.replace(document.getElementById(`placeholder${i}`).src)
              
                }, false);
                reader.readAsDataURL(file);
            }
        } 
    }

    handleDeviceEditSection = async (device, width, height) => {

        await this.setState({size: { device: {device: device, width: width, height: height} }, phoneOutlinePortrait: <div></div>, isLoadingPhoneOptions: true,phoneSizeChosen: false, editSectionDisplay: "none", collageOptionNum: 2});

        await new Promise((resolve, reject) => setTimeout(resolve, 500));

        if (this.state.deviceTypeButtonDiv !== "PHONE"){
            this.setState({ phoneOutlinePortrait: 
                <div className="mx-auto mt-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                    <TwoPicCollage
                    onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}}
                    onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}}
                    id1="placeholder1"
                    id2="placeholder2"
                    className1= "collage2"
                    className2= "collage2"
                    />
              </div>,
              collageType:
              //----- collage options -----//
                <div className="mt-3 p-3 text-center w-100" id="collageOptionDiv" style={{}}>

                    <div className="collOptItem mx-3" style={{display: "inline-block", width: 40, height: 100, verticalAlign: "middle"}} onClick={() => this.handleCollageOption(2)}>
                        <TwoPicCollage 
                        imgDivStyle1={{height: "50%", width: "100%", float: "left"}}
                        imgDivStyle2={{height: "50%", width: "100%", float: "left"}}
                        img1Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}
                        img2Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}/>
                    </div>

                    <div className="collOptItem mx-3" style={{display: "inline-block", width: 40, height: 100, verticalAlign: "middle"}} onClick={() => this.handleCollageOption(3)}>
                        <ThreePicCollage 
                        imgDivStyle1={{height: "33%", width: "100%", float: "left"}}
                        imgDivStyle2={{height: "33%", width: "100%", float: "left"}}
                        imgDivStyle3={{height: "33%", width: "100%", float: "left"}}
                        img1Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}
                        img2Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}
                        img3Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}/>
                    </div>

                    <div className="collOptItem mx-3" style={{display: "inline-block", width: 40, height: 100, verticalAlign: "middle"}} onClick={() => this.handleCollageOption(4)}>
                        <FourPicCollage 
                        className1="collage4Float"
                        className2="collage4Float"
                        className3="collage4Float"
                        className4="collage4Float"
                        img1Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}
                        img2Style= {{height: "100%", width: "100%", border: "2px solid #ffffff" }}
                        img3Style= {{height: "100%", width: "100%", border: "2px solid #ffffff" }}
                        img4Style= {{ height: "100%", width: "100%",border: "2px solid #ffffff" }}/>
                    </div>

                    <div className="collOptItem mx-3" style={{display: "inline-block", width: 40, height: 100, verticalAlign: "middle"}} onClick={() => this.handleCollageOption(5)}>
                        <FivePicCollage
                        imgDivStyle1={{height: "30%", width: "50%", float: "left"}}
                        imgDivStyle2={{height: "30%", width: "50%", float: "left"}}
                        imgDivStyle3={{height: "40%", width: "100%", float: "left"}}
                        imgDivStyle4={{height: "30%", width: "50%", float: "left"}}
                        imgDivStyle5={{height: "30%", width: "50%", float: "left"}}
                        img1Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}
                        img2Style= {{height: "100%", width: "100%", border: "2px solid #ffffff" }}
                        img3Style= {{height: "100%", width: "100%", border: "2px solid #ffffff" }}
                        img4Style= {{ height: "100%", width: "100%",border: "2px solid #ffffff" }}
                        img5Style= {{ height: "100%", width: "100%",border: "2px solid #ffffff" }}/>
                        
                    </div>

                    <div className="collOptItem mx-3" style={{display: "inline-block", width: 40, height: 100, verticalAlign: "middle"}} onClick={() => this.handleCollageOption(6)}>
                        <SixPicCollage
                        imgDivStyle1={{height: "33%", width: "50%", float: "left"}}
                        imgDivStyle2={{height: "33%", width: "50%", float: "left"}}
                        imgDivStyle3={{height: "33%", width: "50%", float: "left"}}
                        imgDivStyle4={{height: "33%", width: "50%", float: "left"}}
                        imgDivStyle5={{height: "33%", width: "50%", float: "left"}}
                        imgDivStyle6={{height: "33%", width: "50%", float: "left"}}
                        img1Style= {{height: "100%", width: "100%", border: "2px solid #ffffff"}}
                        img2Style= {{height: "100%", width: "100%", border: "2px solid #ffffff" }}
                        img3Style= {{height: "100%", width: "100%", border: "2px solid #ffffff" }}
                        img4Style= {{ height: "100%", width: "100%",border: "2px solid #ffffff" }}
                        img5Style= {{ height: "100%", width: "100%",border: "2px solid #ffffff" }}
                        img6Style= {{ height: "100%", width: "100%",border: "2px solid #ffffff" }}/>
                    </div>
                </div>,
              isLoadingPhoneOptions: false,
              phoneSizeChosen: true,
              editSectionDisplay: "inline-block",
              
            })
            this.handleScrollToElement()
        }
       
    }

    handleCollageOption = async (collageNum) => {
        
        await this.setState({ collageOptionNum: collageNum, isLoadingEditSection: true});

        await new Promise((resolve, reject) => setTimeout(resolve, 500));
        
        switch(this.state.collageOptionNum > 1) {
            case (this.state.collageOptionNum === 2):
                this.setState({ phoneOutlinePortrait: 
                    <div className="mx-auto mt-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <TwoPicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}}
                        className1= "collage2"
                        className2= "collage2"
                        id1="placeholder1"
                        id2="placeholder2"
                        />
                </div>,
                isLoadingEditSection: false })
              break;
            case (this.state.collageOptionNum === 3):
                this.setState({ phoneOutlinePortrait: 
                    <div className="mx-auto mt-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <ThreePicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3})}}
                        className1= "collage3"
                        className2= "collage3"
                        className3= "collage3 border-bottom-0"
                        id1="placeholder1"
                        id2="placeholder2"
                        id3="placeholder3"
                        />
                </div> ,
                isLoadingEditSection: false });
              break;
            case (this.state.collageOptionNum === 4):
                this.setState({ phoneOutlinePortrait: 
                    <div className="mx-auto mt-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <FourPicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3})}}
                        onClick4 = {() =>{document.getElementById('fileInput4').click(); this.setState({ clickedPlaceholder: 4})}}
                        className1= "collage4"
                        className2= "collage4"
                        className3= "collage4"
                        className4= "collage4"
                        id1="placeholder1"
                        id2="placeholder2"
                        id3="placeholder3"
                        id4="placeholder4"
                        />
                </div> ,
                isLoadingEditSection: false });
            break;
            case (this.state.collageOptionNum === 5):
                this.setState({ phoneOutlinePortrait: 
                    <div className="mx-auto mt-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <FivePicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3})}}
                        onClick4 = {() =>{document.getElementById('fileInput4').click(); this.setState({ clickedPlaceholder: 4})}}
                        onClick5 = {() =>{document.getElementById('fileInput5').click(); this.setState({ clickedPlaceholder: 5})}}
                        imgDivStyle1={{height: "30%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle2={{height: "30%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle3={{height: "40%", width: "100%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle4={{height: "30%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle5={{height: "30%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        id1="placeholder1"
                        id2="placeholder2"
                        id3="placeholder3"
                        id4="placeholder4"
                        id5="placeholder5"
                        />
                </div> ,
                isLoadingEditSection: false });
            break;
            case (this.state.collageOptionNum === 6):
                this.setState({ phoneOutlinePortrait: 
                    <div className="mx-auto mt-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <SixPicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1})}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2})}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3})}}
                        onClick4 = {() =>{document.getElementById('fileInput4').click(); this.setState({ clickedPlaceholder: 4})}}
                        onClick5 = {() =>{document.getElementById('fileInput5').click(); this.setState({ clickedPlaceholder: 5})}}
                        onClick6 = {() =>{document.getElementById('fileInput6').click(); this.setState({ clickedPlaceholder: 5})}}
                        imgDivStyle1={{height: "33%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle2={{height: "33%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle3={{height: "33%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle4={{height: "33%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff",
                        overflow: "hidden"}}
                        imgDivStyle5={{height: "33%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff", borderBottom: "none",
                        overflow: "hidden"}}
                        imgDivStyle6={{height: "33%", width: "50%", float: "left", cursor: "pointer", border: "3px solid #ffffff", borderBottom: "none",
                        overflow: "hidden"}}
                        id1="placeholder1"
                        id2="placeholder2"
                        id3="placeholder3"
                        id4="placeholder4"
                        id5="placeholder5"
                        id6="placeholder6"
                        />
                </div> ,
                isLoadingEditSection: false });
            break;
            default:
              return;
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
        // let initialButtonScreen = 
        //     <div>
        //         <div className="text-center"> Where is your vision board going to be seen?</div>

        //         <div className="text-center">
        //             <Button className="m-2" onClick={() => this.handleDeviceButtonClick("PHONE")}> PHONE <br/><GiSmartphone size="10em"/> </Button>
        //             {/* <Button className="m-2"> TABLET<br/> <GiTablet size="10em"/> </Button>
        //             <Button className="m-2"> COMPUTER <br/> <GiPc size="10em"/> </Button> */}
        //         </div>
        //     </div>;

        //------choice screen for choosing device brand------//
        if (this.state.deviceTypeButtonDiv === "deviceType"){
            //deviceButtons = initialButtonScreen
        } else if (this.state.deviceTypeButtonDiv === "PHONE") {
            
            deviceButtons = <div className=" mx-auto" >
                                 <div className="text-center jumbotron_text mb-5"> <h1>What type of phone do you have?</h1></div>

                                 <div className="row text-center w-75 mx-auto" >
                                    <div className="col-md-4" style={{}}>
                                        <Button 
                                        variant="none" 
                                        className="m-2 buttonLogo" 
                                        style={{ width: "200px", height: "200px",backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg)", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", filter: "invert(1)"}} 
                                        onClick={() => this.handleDeviceButtonClick("iphoneTypes")}>
                                            <span className="iphoneText">iphone</span>
                                        </Button>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <Button 
                                        variant="none" 
                                        className="m-2 buttonLogo" 
                                        style={{width: "200px", height: "200px", backgroundImage: "url(http://pngimg.com/uploads/samsung_logo/samsung_logo_PNG16.png)", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", filter: "invert(1)"}}>
                                            <div className="samsungText">samsung</div>
                                        </Button>
                                    </div>

                                    <div className="col-md-4">
                                        <Button 
                                        variant="none" 
                                        className="m-2 buttonLogo" 
                                        style={{width: "200px", height: "200px", backgroundImage: "url(http://pngimg.com/uploads/lg_logo/lg_logo_PNG3.png)", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", filter: "invert(1)"}}>
                                            <div className="samsungText">LG</div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
        } else if (this.state.deviceTypeButtonDiv === "iphoneTypes") {
            
            //-----button display of phone types-----//

            backButton = 
                <Button 
                className="mb-2"
                variant="none"
                onClick={() => this.handleDeviceButtonClick("PHONE")}
                >
                    <MdArrowBack
                    size="60"
                    style={{
                        color: "#ffffff",
                        border: "3px solid #ffffff",
                        borderRadius: "50px",
                        padding: "10px",
                    }}
                    />

                </Button>;

            if(this.state.isLoadingPhoneOptions){
                deviceButtons = 
                <span className="text-center mb-5">
                    <div>
                        <h1 className="text-white mb-5">What type of iphone do you have?</h1>
                    </div>
                    <div className="mx-auto d-flex justify-content-center deviceButtons"><Spinner style={{width: "8rem", height: "8rem"}} variant="primary" animation="border" /></div>
                </span>
            } else {
                deviceButtons = 
                <span className="text-center">
                    <div><h1 className="text-white">What type of iphone do you have? </h1></div>
                    <div className="text-center deviceButtons p-5 mx-auto"  style={{width: "50%"}}>
                        <ButtonDisplay 
                        mapped_phone_types={iphoneTypes}
                        handleButtonList={this.handleDeviceEditSection}
                        />
                    </div>
                </span>
            }
            
        }

        

        return (
            <div>
                <Navbar className="nav" bg="light" expand="lg">
                    <Navbar.Brand className="navbar_title" href="/">Envisifi</Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                    </Navbar.Collapse> */}
                </Navbar>
                
                <Jumbotron id="selectBoardJumbotron">
                    <div>
                        {backButton}
                    </div>
                    {deviceButtons}
                </Jumbotron>

                <div ref={this.scrollRef} className="editSection" style={{display: this.state.editSectionDisplay}}>
                    <div className="px-5">
                        {this.state.collageType}    
                    </div>
                    {this.state.isLoadingEditSection ? <div className="mx-auto d-flex justify-content-center  mt-5"><Spinner style={{width: "8rem", height: "8rem"}} variant="primary" animation="border" /></div> : this.state.phoneOutlinePortrait}
                       
                    <div className="form-group">
                        <input id="fileInput1" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                        <input id="fileInput2" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                        <input id="fileInput3" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                        <input id="fileInput4" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                        <input id="fileInput5" className="form-control text-center" type="file"
                        onChange={this.selectImgFile}
                        accept="image/*" style={{display: "none"}}/>
                        <input id="fileInput6" className="form-control text-center" type="file"
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