import * as React from "react"
import { MyDocument, Section } from "../types/Document";
import documentManager from "../functions/documentManager";

let mouseRelativePos = [0, 0];

interface myProps {
    section: Section
    docId: string
}
const canvasElemRef = React.createRef<HTMLCanvasElement>()

export default function DrawingCanvas({ section, docId }: myProps) {

    // load the image if it exists
    React.useEffect(() => {
        if (section.canvasDataUrl == undefined || canvasElemRef.current == null) return;

        let canvasElem = canvasElemRef.current;
        const context = canvasElem.getContext('2d');
        if (context == undefined) return;

        const image = new Image();
        image.src = section.canvasDataUrl;
        image.onload = () => {
            context.drawImage(image, 0, 0, canvasElem.width, canvasElem.height);
        };


    }, [])

    //console.log(section)


    function handleOnClick(event: any) {
        if (!canvasElemRef || !canvasElemRef.current) return

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

    function getRelativeMousePos(event: any) {

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
        console.log("mouse up")
        let selectedDocument: MyDocument;
        documentManager.setStateFunctions.setSelectedDocument((prev: MyDocument) => {
            selectedDocument = prev;

            return selectedDocument
        })

        documentManager.setStateFunctions.setRecipesList((oldList: MyDocument[]) => {
            /*
            // find the index of the document
            let selectedDoc = oldList.find(e=>e.id===docId);
            if(selectedDoc == undefined) return oldList;
            let selectedDocIndex = oldList.indexOf(selectedDoc);
            let sectionIndex = oldList[selectedDocIndex].sections.indexOf(section)
            console.log(selectedDoc, selectedDocIndex, sectionIndex, section.sectionOrder)
            oldList[selectedDocIndex].sections[sectionIndex].canvasDataUrl = event.target.toDataURL()
            */
            let a = selectedDocument.sections.find(section => section.sectionOrder === section.sectionOrder)
            if (!a) {
                console.log("selected doc not found")
                return;
            }
            a.canvasDataUrl = event.target.toDataURL()
            return oldList;
        })
        documentManager.saveDocumentsToLocalStorage()
    }

    return (
        <div>
            <canvas ref={canvasElemRef} className=" p-1 m-1 shadow" width={400} height={400} onClick={handleOnClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            </canvas>
        </div>)
}
//onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
//            <canvas ref={canvasElem} className=" p-1 m-1 shadow" width={400} height={400} onClick={handleOnClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></canvas>
//