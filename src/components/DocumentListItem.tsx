/*
This is a component for a single list item 
within the document list. 
*/

//import Recipe from "../types/Recipe"
import { useState } from "react";
import documentManager from "../functions/documentManager";
import { MyDocument } from "../types/Document";
import modalManager from "../functions/modalManager";
import { ModalContentType } from "./modal/Modal";

export default function RecipeListItem({ ...props }) {
    let recipe: MyDocument = props.recipe;
    const [isHovering, setIsHovering] = useState(false)

    return (
        <div className="flex bg-slate-50 rounded mb-1 p-1 hover:bg-slate-300 shadow-md active:shadow"
            onClick={() => { 
                modalManager.setModalContentType(ModalContentType.aboutDocument)
                documentManager.selectDocument(recipe) }}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex flex-col ">
                <div className="flex-1 ">{recipe.name}</div>
                <div className="flex-1 text-slate-400">{recipe.dateCreated}</div>
            </div>

            {
                isHovering && <button className="!mr-0 !ml-auto btn btn-sky" onClick={(e) => { documentManager.deleteDocument(recipe.id, e) }}>
                    <span>
                        <img src="images/bootstrapIcons/x-lg.svg"></img>
                    </span>
                </button>
            }

        </div>
    )
}