import React from "react";
import Button from "react-bootstrap/Button"

export default function ButtonDisplay (props) {
    return (
        <div>
            {props.mapped_phone_types.map(buttonList => (
                <span key={buttonList.device}>
                    <Button 
                    className="m-2" 
                    onClick={() => {props.handleButtonList(buttonList.device, buttonList.width, buttonList.height)}}>
                        {buttonList.device}
                    </Button>
                </span>
            ))}
        </div>
    )
}