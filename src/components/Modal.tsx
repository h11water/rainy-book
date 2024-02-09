import { useState } from "react"

export default function Modal() {
    const [isShowing, setIsShowing] = useState(true)

    return (
        <>
            {/*modal backdrop*/}
            <div className={"bg-slate-500 absolute top-0 left-0 h-full w-full z-50"+(isShowing ? " ":" hidden")}
                style={{ "backgroundColor": "rgba(80, 80, 80, .3)" }}>
                {/*modal */}
                <div className="justify-center items-center flex h-full">
                    <div className="bg-white p-2 rounded-xl h-1/3 w-1/2 flex flex-col shadow-lg">
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