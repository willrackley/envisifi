import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav"
// import NavDropdown from "react-bootstrap/NavDropdown"
import Jumbotron from "react-bootstrap/Jumbotron"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
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
        deviceTypeButtonDiv: "iphoneTypes",
        editSection: "none",
        phoneOutlinePortrait: <div></div>,
        placeHolder1Style: { backgroundImage:  "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')"},
        divImagePlaceholder1: "url('http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg')",
        clickedPlaceholder: 0,
        size: null,
        phoneSizeChosen: false,
        phoneSize: "null",
        base64Download: "",
        isLoadingPhoneOptions: false,
        isLoadingEditSection: false,
        isLoadingDoneButton: false,
        editSectionDisplay: "none",
        collageType: <div></div>,
        collageOptionNum: 2,
        beginHelperText: <div className="text-center text-white blink" style={{ }}>
        DOUBLE TAP TO BEGIN
        </div>,
        readyToDownload: false,
        imgSelected: false,
        userDevice: "Desktop"
    }

    componentDidMount() {
        if (window.innerWidth <= 425) {
            this.setState({ userDevice: "Phone" });
        }
        else {
            this.setState({ userDevice: "Desktop" });
        }
       
    }
    
    //helper to auto scroll to edit section after choosing an iphone type
    handleScrollToElement(event) {
        if (this.state.phoneSizeChosen){
          this.scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

    // function allowing user to choose an image from their computer/device
    selectImgFile = event => {

        this.setState({readyToDownload: false})
        const file = event.target.files[0];
        
        //allows user to choose a new photo for each section and replaces an image if one was already chosen
        for (let i=1; i <= 6; i++) {
            if (this.state.clickedPlaceholder === i) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    // remove any cropper if user decides to change image
                    document.getElementById(`placeholder${i}`).src = reader.result;
                    let cropper = new Cropper(document.getElementById(`placeholder${i}`), {dragMode: "move", guides: false, background: false, viewMode: 0, autoCropArea: 0, cropBoxResizable: false,cropBoxMovable: false, autoCrop: true, modal: false, center: false, highlight: false })
                    cropper.replace(document.getElementById(`placeholder${i}`).src)
                    this.setState({ imgSelected: true, beginHelperText: "" })
                }, false);
                reader.readAsDataURL(file);
            }
        }
    }

    //uses asynchronous js to handle the users choice of iphone type
    handleDeviceEditSection = async (device, width, height) => {

        //this makes sure the correct dimensions of the phone are stored in the state before continuing
        await this.setState({ 
            size: { device: {device: device, width: width, height: height} },
            phoneOutlinePortrait: <div></div>,
            isLoadingPhoneOptions: true,
            phoneSizeChosen: false, 
            editSectionDisplay: "none", 
            collageOptionNum: 2, 
            phoneSize: `iPhone ${device}`,
            imgSelected: false
         });

        await new Promise((resolve, reject) => setTimeout(resolve, 500));

        //displays the edit section, starting with the two pic choice and the rest of the collage options to choose from
        if (this.state.deviceTypeButtonDiv !== ""){
            this.setState({ phoneOutlinePortrait: 
                <div className="mx-auto mt-2 mb-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2,  overflow: "hidden"}}> 
        
                    <TwoPicCollage
                    onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1 })}}
                    onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2 })}}
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

    //uses asynchronous js to handle the user choosing different picture collage options
    handleCollageOption = async (collageNum) => {
        
        await this.setState({ collageOptionNum: collageNum, isLoadingEditSection: true, imgSelected: false, readyToDownload: false});

        await new Promise((resolve, reject) => setTimeout(resolve, 500));
        
        //switch statement to handle users collage choice
        switch(this.state.collageOptionNum > 1) {
            case (this.state.collageOptionNum === 2):
                this.setState({ phoneOutlinePortrait: 
                    <div className="mx-auto mt-2 mb-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <TwoPicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1 })}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2 })}}
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
                    <div className="mx-auto mt-2 mb-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <ThreePicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1 })}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2 })}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3 })}}
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
                    <div className="mx-auto mt-2 mb-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <FourPicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1 })}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2 })}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3 })}}
                        onClick4 = {() =>{document.getElementById('fileInput4').click(); this.setState({ clickedPlaceholder: 4 })}}
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
                    <div className="mx-auto mt-2 mb-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <FivePicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1 })}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2 })}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3 })}}
                        onClick4 = {() =>{document.getElementById('fileInput4').click(); this.setState({ clickedPlaceholder: 4 })}}
                        onClick5 = {() =>{document.getElementById('fileInput5').click(); this.setState({ clickedPlaceholder: 5 })}}
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
                    <div className="mx-auto mt-2 mb-5 phoneScreen" style={{width: this.state.size.device.width/2, height: this.state.size.device.height/2, background: "#F3F3F3",  overflow: "hidden"}}> 
                        <SixPicCollage
                        onClick1 = {() =>{document.getElementById('fileInput1').click(); this.setState({ clickedPlaceholder: 1 })}}
                        onClick2 = {() =>{document.getElementById('fileInput2').click(); this.setState({ clickedPlaceholder: 2 })}}
                        onClick3 = {() =>{document.getElementById('fileInput3').click(); this.setState({ clickedPlaceholder: 3 })}}
                        onClick4 = {() =>{document.getElementById('fileInput4').click(); this.setState({ clickedPlaceholder: 4 })}}
                        onClick5 = {() =>{document.getElementById('fileInput5').click(); this.setState({ clickedPlaceholder: 5 })}}
                        onClick6 = {() =>{document.getElementById('fileInput6').click(); this.setState({ clickedPlaceholder: 6 })}}
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

    //uses the html2canvas library to capture a copy of the users images
    screenshot = async () => {
        let base64URL;
        let imgdataURL;
        let deviceHeight = this.state.size.device.height;
        let deviceWidth = this.state.size.device.width;

        this.setState({ isLoadingDoneButton: true })

        if (this.state.userDevice === "Desktop") {
            await html2canvas(document.getElementsByClassName('phoneScreen')[0], {height: this.state.size.device.height/2, width: this.state.size.device.width/2, scrollX: 0, scrollY: -window.scrollY}).then(function(canvas) {

                base64URL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    
                const img = new Image();
                img.src = base64URL;
                img.height = deviceHeight;
                img.width = deviceWidth;
    
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
           this.setState({ base64Download: imgdataURL, readyToDownload: true, isLoadingDoneButton: false })
        } else {
            await html2canvas(document.getElementsByClassName('phoneScreen')[0], {height: this.state.size.device.height/4, width: this.state.size.device.width/4, scrollX: 0, scrollY: -window.scrollY}).then(function(canvas) {

                base64URL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    
                const img = new Image();
                img.src = base64URL;
                img.height = deviceHeight;
                img.width = deviceWidth;
    
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
           this.setState({ base64Download: imgdataURL, readyToDownload: true, isLoadingDoneButton: false })
        }
       
    }

    render() {
        let deviceButtons = <div></div>
         
        if (this.state.deviceTypeButtonDiv === "iphoneTypes") { 
            if(this.state.isLoadingPhoneOptions){
                deviceButtons = 
                <span className="text-center mb-5">
                    <div>
                        <h1 className="text-white mb-5">What type of iPhone do you have?</h1>
                    </div>
                    <div className="mx-auto d-flex justify-content-center deviceButtons p-5 deviceBtnSpinner" style={{ background: "none" }}><Spinner style={{width: "45px", height: "45px"}} variant="primary" animation="border" /></div>
                </span>
            } else {
                deviceButtons = 
                <span className="text-center">
                    <div><h1 className="text-white">What type of iPhone do you have? </h1></div>
                    <div className="text-center deviceButtons mt-5  p-3 mx-auto"  style={{width: "50%"}}>
                        <ButtonDisplay 
                        mapped_phone_types={iphoneTypes}
                        handleButtonList={this.handleDeviceEditSection}
                        />
                    </div>
                </span>
            } 
        }

        return (
            <div id="wrapper">
                <Navbar className="nav" bg="light" expand="lg">
                    <Navbar.Brand className="navbar_title text-center w-100" href="/">Envisifi</Navbar.Brand>
                </Navbar>
                
                <Jumbotron id="selectBoardJumbotron">
                    {deviceButtons}
                </Jumbotron>

                {/* section for editting images and choosing collage option */}
                <div className="editSection" style={{display: this.state.editSectionDisplay}}>
                    <div ref={this.scrollRef} className="px-5 pt-5">
                        {this.state.collageType}    
                    </div>

                    <div  className=" mt-5 h3 text-center text-white">
                        {this.state.phoneSize}
                    </div>

                    <div className="text-center text-light">
                        {this.state.beginHelperText}
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

                    {this.state.imgSelected && this.state.readyToDownload ?  <div className="text-center mb-5">  
                        <div>
                        <Button variant="warning">
                            <a href={this.state.base64Download} className="text-decoration-none" download="newBoard.png">Download</a>
                        </Button>
                        </div></div> : 
                        <div/>
                    }

                    {this.state.imgSelected && !this.state.readyToDownload ?  <div className="text-center mb-5">  
                        <Button variant="warning" onClick={() => {this.screenshot()}}>
                                {this.state.isLoadingDoneButton ? <div className="mx-auto d-flex justify-content-center "><Spinner  variant="primary" animation="border" /></div> : <div>Done</div> }
                            </Button></div> : 
                        <div/>
                    }

                </div>
                <div className="footer">
                    <div className="p-2 text-center">&copy; Will Rackley</div>
                </div>
            </div>
        )
    }
}

export default selectBoard;