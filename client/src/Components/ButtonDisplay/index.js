import React from "react";
import Button from "react-bootstrap/Button"
import "./style.css"

//shows list of ihpone types
export default function ButtonDisplay (props) {
    return (
        <div className="buttonTypeContainer">
            {props.mapped_phone_types.map(buttonList => (
                <span key={buttonList.device}>
                    <Button 
                    id="buttonDisplayBtn"
                    variant="none"
                    className="m-2"
                    size="lg"
                    style={{
                        color: "#3685B2",
                        border: "3px solid #ffffff",
                        borderRadius: "25px",
                        padding: "20px",
                        
                    }} 
                    onClick={() => {props.handleButtonList(buttonList.device, buttonList.width, buttonList.height)}}>
                        <span className="" style={{fontSize: 24}}>{buttonList.device}</span>
                    </Button>
                </span>
            ))}
        </div>
    )
}