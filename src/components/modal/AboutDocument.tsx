import documentManager from "../../functions/documentManager"

export default function AboutDocument({...props}){
    return <div>
        <div className="font-bold text-lg">Document properties</div>
        <div className="flex flex-row">
            <div className="flex-1">Date created:</div>
            <input className="rounded m-1 flex-1 p-1" disabled placeholder={documentManager.selectedDocument?.dateCreated}></input>
        </div>
        <div className="flex flex-row">
            <div className="flex-1">Date modified:</div>
            <input className="rounded m-1 flex-1 p-1" disabled placeholder={documentManager.selectedDocument?.dateModified}></input>
        </div>
        <div className="flex flex-row">
            <div className="flex-1">Document name:</div>
            <input className="rounded m-1 flex-1 p-1" placeholder={documentManager.selectedDocument?.name}></input>
        </div>
        <hr>
        </hr>
        <div className="font-bold text-lg">Document settings</div>
        <div className="flex flex-row">
            <button className="btn btn-sky">a</button>
            <button className="btn btn-sky">a</button>
            <button className="btn btn-sky">a</button>
            <button className="btn btn-sky">a</button>
            <button className="btn btn-sky">a</button>
        </div>
    </div>
}