//import $ from "jquery";
import { useState } from "react";
import EditableContent from "./EditableContentView";
import recipesManager from "../functions/recipesManager";
import Editor from "./LexicalEditor";
import { Section } from "../types/Recipe";
import { EditorState } from "lexical";


export default function SectionView({ ...props }) {
    //const [editingTitle, setEditingTitle] = useState(false);
    //const [editingContent, setEditingContent] = useState(false);
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    console.log("rerendered", props.selectedRecipe)

    function handleKeyPress(event: any) {
        // This is perfectly safe in react, it correctly detect the keys
        //console.log(event)

        if (event.key == 'Enter') {
            //saveSection(event)
            console.log("enter key")
            event.preventDefault()
        }
    }

    function saveSection(event: any, sectionEditKey: string) {

        let editedSection = props.selectedRecipe.sections[props.sectionOrder];
        editedSection[sectionEditKey] = event.target.innerHTML;

        props.selectedRecipe.sections[props.sectionOrder]
        recipesManager.editSection(props.selectedRecipe, props.sectionOrder, editedSection)
    }

    function saveLexiSection(lexiState: EditorState) {
        //console.log("saved lexi", lexiState)

        let editedSection = props.selectedRecipe.sections[props.sectionOrder];
        editedSection.lexiContent = lexiState;

        props.selectedRecipe.sections[props.sectionOrder]
        recipesManager.editSection(props.selectedRecipe, props.sectionOrder, editedSection)
    }

    function handleDelete(){
        recipesManager.deleteSection(props.selectedRecipe,props.sectionOrder)
    }

    return (
        <div className="h-full">

            <div className="border border-slate-400 mt-2 p-1 h-full" onMouseOver={() => {setIsShowingOptions(true)}} onMouseLeave={() => {setIsShowingOptions(false)}}>
                {/*
                <EditableContent initialContent={props.section.header} className="h1 block text-slate-400" onInputFn={(e:any)=>{saveSection(e, "header")}}></EditableContent>
                <div className="pl-1 flex">
                    <EditableContent initialContent={props.section.content} className="w-full" onInputFn={(e:any)=>{saveSection(e, "content")}}></EditableContent>
                    <div className={isShowingOptions ? "ml-auto opacity-1" : "ml-auto opacity-0"} >
                        <button className="btn btn-sky">
                            <span>
                                <img src="images/bootstrapIcons/x-lg.svg"></img>
                            </span>
                        </button>

                    </div>
                </div>
                 */}
                <div className="flex h-full">
                    <div className="flex-3">
                        <Editor sectionOrder={props.sectionOrder} initialContent={props.section.lexiContent} recipe={props.selectedRecipe} onChangeFn={saveLexiSection} />
                    </div>
                    <div className={isShowingOptions ? "flex-1 ml-auto opacity-1" : "flex-1 ml-auto opacity-0"} >
                        <button className="btn btn-sky" onClick={handleDelete}>
                            <span>
                                <img src="images/bootstrapIcons/x-lg.svg"></img>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )

}