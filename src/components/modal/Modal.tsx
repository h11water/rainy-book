import { useState, useEffect } from "react"
import modalManager from "../../functions/modalManager";
import AboutDocument from "./AboutDocument";


export enum ModalContentType {
    noContent,
    aboutDocument,
}

export default function Modal() {
    const [isShowing, setIsShowing] = useState(false);
    const [contentType, setModalContentType] = useState(ModalContentType.noContent)
    useEffect(() => {
        modalManager.setModalIsOpen = setIsShowing;
        modalManager.setModalContentType = setModalContentType;
    }, [])

    return (
        <>
            {/*modal backdrop*/}
            <div className={"bg-slate-900 absolute top-0 left-0 h-full w-full z-50 fade-in-fast" + (isShowing ? " " : " hidden")}
                style={{ "backgroundColor": "rgba(100, 100, 100, .4)" }}
                onClick={(e) => { setIsShowing(false); e.stopPropagation(); console.log("a") }}>
                {/*modal */}
                <div className="justify-center items-center flex h-full" onClick={(e) => { e.stopPropagation(); console.log("aa") }}>
                    <div className="bg-white p-2 rounded-xl w-2/3 flex flex-col border border-slate-400 shadow-xl">
                        <div className="flex-1 h1">
                            Header
                            <button className="float-right btn btn-green" onClick={(e) => { setIsShowing(false); e.stopPropagation() }}>close</button>

                        </div>

                        <div className="flex-4">
                            <hr></hr>
                            {
                                contentType == ModalContentType.noContent && <div>nothing</div>
                            }
                            {
                                contentType == ModalContentType.aboutDocument && <AboutDocument/>
                            }

                        </div>
                        <div className="flex-1">
                            <hr></hr>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}