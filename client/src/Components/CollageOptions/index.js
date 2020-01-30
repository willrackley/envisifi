import React from "react";
import "./style.css";


export function TwoPicCollage (props) { 
    return (
        <span>
            <div className={props.className1}  onDoubleClick={props.onClick1} >
                <img id={props.id1} style={props.img1Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className2} onDoubleClick={props.onClick2} >
                <img id={props.id2} style={props.img2Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>
        </span>
    ) 
}

export function ThreePicCollage (props) { 
    return (
        <span>
            <div className={props.className1}  onDoubleClick={props.onClick1} >
                <img id={props.id1} style={props.img1Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className2} onDoubleClick={props.onClick2} >
                <img id={props.id2} style={props.img2Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className3} onDoubleClick={props.onClick3} >
                <img id={props.id3} style={props.img3Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>
        </span>
    ) 
}

export function FourPicCollage (props) { 
    return (
        <span>
            <div className={props.className1} style={props.imgDivStyle1} onDoubleClick={props.onClick1} >
                <img id={props.id1} style={props.img1Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className2} style={props.imgDivStyle2} onDoubleClick={props.onClick2} >
                <img id={props.id2} style={props.img2Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className3} style={props.imgDivStyle3} onDoubleClick={props.onClick3} >
                <img id={props.id3} style={props.img3Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className4} style={props.imgDivStyle4} onDoubleClick={props.onClick4} >
                <img id={props.id4} style={props.img4Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>
        </span>
    ) 
}

export function FivePicCollage (props) { 
    return (
        <span>
            <div className={props.className1} style={props.imgDivStyle1} onDoubleClick={props.onClick1} >
                <img id={props.id1} style={props.img1Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className2} style={props.imgDivStyle2} onDoubleClick={props.onClick2} >
                <img id={props.id2} style={props.img2Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className3} style={props.imgDivStyle3} onDoubleClick={props.onClick3} >
                <img id={props.id3} style={props.img3Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className4} style={props.imgDivStyle4} onDoubleClick={props.onClick4} >
                <img id={props.id4} style={props.img4Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>

            <div className={props.className5} style={props.imgDivStyle5} onDoubleClick={props.onClick5} >
                <img id={props.id5} style={props.img5Style} src='http://www.eco-trailer.co.uk/wp-content/uploads/2016/03/placeholder-blank.jpg' alt="placeholder"/>
            </div>
        </span>
    ) 
}

export default {TwoPicCollage, ThreePicCollage, FourPicCollage, FivePicCollage};

