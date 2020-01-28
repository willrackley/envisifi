import React from "react";
import "./style.css";


export function TwoPicCollage (props) { 
    return (
        <span>
            <div className={props.className1}  onDoubleClick={props.onClick1} >
                <img id="placeholder1" style={props.img1Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className2} onDoubleClick={props.onClick2} >
                <img id="placeholder2" style={props.img2Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>
        </span>
    ) 
}

export function ThreePicCollage (props) { 
    return (
        <span>
            <div className={props.className1}  onDoubleClick={props.onClick1} >
                <img style={props.img1Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className2} onDoubleClick={props.onClick2} >
                <img  style={props.img2Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className3} onDoubleClick={props.onClick3} >
                <img  style={props.img3Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>
        </span>
    ) 
}

export default {TwoPicCollage, ThreePicCollage};

