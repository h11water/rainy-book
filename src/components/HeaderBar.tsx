import documentManager from "../functions/documentManager"
import { useState } from "react"
import modalManager from "../functions/modalManager"

export default function HeadrBar({ ...props }) {


    function openAboutDocument(event:any){
        event.preventDefault()
        modalManager.openModal(true)
    }

    const [isShowingOptions, setIsShowingOptions] = useState(false)

    return (
        <div className="sticky flex top-0 backdrop-blur-sm shadow mb-2 rounded p-2">
            <button className="rounded bg-sky-300 p-3 hover:bg-sky-500" onClick={() => { documentManager.showDocumentsList() }}>
                <span className=''>
                    <img src="./images/bootstrapIcons/arrow-bar-right.svg" />
                </span>
            </button>
            <div className="m-1 text-xl font-medium inline">{props.HeaderContent}</div>

            <div className="ml-auto flex flex-col items-end absolute right-2">
                <button className="rounded  p-3 hover:bg-slate-300" onClick={e=>{openAboutDocument(e)}} title="options">
                    <span className=''>
                        <img src="./images/bootstrapIcons/three-dots-vertical.svg" />
                    </span>
                </button>

                {/*options 3 dot menu 
                {
                    isShowingOptions &&
                    <div className="">
                        <div className="bg-slate-200 shadow-xl border border-slate-400 m-1 p-1 rounded-lg -z-100">
                            <div className="flex flex-col">
                                <button className="btn btn-slate block text-left"
                                onClick={e=>{openAboutDocument(e)}}>
                                    About
                                </button>
                                <button className="btn btn-slate block text-left">
                                    Export
                                </button>
                                <button className="btn btn-slate block text-left">
                                    Document settings
                                </button>
                            </div>

                        </div>
                    </div>

                }
                */}

            </div>


        </div>
    )
}