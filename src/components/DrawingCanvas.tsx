import * as React from "react"
import { Section } from "../types/Document";

let mouseRelativePos = [0, 0];

interface myProps{
    section:Section
}

export default function DrawingCanvas({section}:myProps) {

    const canvasElem = React.createRef<HTMLCanvasElement>()
    //console.log(section)
    

    function handleOnClick(event: any) {
        if (!canvasElem || !canvasElem.current) return

        //console.log(canvasElem.current.getContext, canvasElem, canvasElem.current.getBoundingClientRect(), event)

        /* */
        return
        var ctx = event.target.getContext("2d");
        let temp = event.target.getBoundingClientRect()
        mouseRelativePos = [
            Math.abs(temp.left - event.clientX),
            Math.abs(temp.top - event.clientY)
        ]


        ctx.lineTo(mouseRelativePos[0], mouseRelativePos[1]);
        //ctx.lineTo(mouseRelativePos[0]+10, mouseRelativePos[1]);
        ctx.stroke();
        console.log(mouseRelativePos)

    }

    function getRelativeMousePos(event:any){
        
        //get the mouse position relative to the canvas
        let temp = event.target.getBoundingClientRect();
        let mouseRelativePos = [
            event.clientX - temp.left,
            event.clientY - temp.top
        ];
       
        return mouseRelativePos;
    }

    function handleMouseDown(event: any) {
        var ctx = event.target.getContext("2d");
        ctx.moveTo(...getRelativeMousePos(event));
    }

    function handleMouseMove(event: any) {
        if (event.buttons !== 1) return;
        var ctx = event.target.getContext("2d");
        /*
        let temp = event.target.getBoundingClientRect()
        mouseRelativePos = [
            Math.abs(temp.left - event.clientX),
            Math.abs(temp.top - event.clientY)
        ]
        ctx.lineTo(mouseRelativePos[0], mouseRelativePos[1]);
        */
        ctx.lineTo(...getRelativeMousePos(event));
        ctx.stroke();
    }

    function handleMouseUp(event: any) {
        var ctx = event.target.getContext("2d");
        ctx.stroke();
    }

    return (
        <div>
            <canvas ref={canvasElem} className=" p-1 m-1 shadow" width={400} height={400} onClick={handleOnClick}  onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            </canvas>
        </div>)
}
//onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
//            <canvas ref={canvasElem} className=" p-1 m-1 shadow" width={400} height={400} onClick={handleOnClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></canvas>
//