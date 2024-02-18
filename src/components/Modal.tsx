import { useState,useEffect } from "react"
import modalManager from "../functions/modalManager";

export default function Modal() {
    const [isShowing, setIsShowing] = useState(false);
    useEffect(()=>{
        modalManager.setModalIsOpen = setIsShowing;
    },[])

    return (
        <>
            {/*modal backdrop*/}
            <div className={"bg-slate-900 absolute top-0 left-0 h-full w-full z-50 fade-in-fast"+(isShowing ? " ":" hidden")}
                style={{ "backgroundColor": "rgba(100, 100, 100, .4)" }}
                onClick={()=>{setIsShowing(false)}}>
                {/*modal */}
                <div className="justify-center items-center flex h-full">
                    <div className="bg-white p-2 rounded-xl h-1/3 w-1/2 flex flex-col border border-slate-400 shadow-xl">
                        <div className="flex-1">
                            Header
                            <button className="float-right btn btn-green" onClick={()=>{setIsShowing(false)}}>close</button>

                        </div>

                        <div className="flex-4">
                            <hr></hr>
                            Content

                        </div>
                        <div className="flex-1">
                            <hr></hr>
                            Footer
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}