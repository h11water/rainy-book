//import $ from "jquery";
import { useState } from "react";
import EditableContent from "./EditableContentView";
import documentManager from "../functions/documentManager";
import Editor from "./LexicalEditor";
import { Section, SectionType } from "../types/Document";
import { EditorState } from "lexical";
import DrawingCanvas from "./DrawingCanvas";


export default function SectionView({ ...props }) {
    //const [editingTitle, setEditingTitle] = useState(false);
    //const [editingContent, setEditingContent] = useState(false);
    const [isShowingOptions, setIsShowingOptions] = useState(false)
    //console.log("rerendered", props.selectedRecipe)

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
        documentManager.editSection(props.selectedRecipe, props.sectionOrder, editedSection)
    }

    function saveLexiSection(lexiState: EditorState) {
        //console.log("saved lexi", lexiState)

        let editedSection = props.selectedRecipe.sections.find((s: Section) => s.sectionOrder === props.sectionOrder);
        editedSection.lexiContent = lexiState;

        props.selectedRecipe.sections[props.sectionOrder]
        documentManager.editSection(props.selectedRecipe, props.sectionOrder, editedSection)
    }

    function handleDelete() {
        documentManager.deleteSection(props.selectedRecipe, props.sectionOrder)
    }

    return (
        <div className="h-full">

            <div className="border border-slate-400 mt-2 p-1 h-full" onMouseOver={(e) => { setIsShowingOptions(true);e.stopPropagation();}} onMouseLeave={(e) => { setIsShowingOptions(false);e.stopPropagation() }}>
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
                    <div className="flex-3 overflow-auto">

                    {
                        props.sectionType === SectionType.text && <Editor sectionOrder={props.sectionOrder} initialContent={props.section.lexiContent} recipe={props.selectedRecipe} onChangeFn={saveLexiSection} />
                    }
                    {
                        props.sectionType === SectionType.drawing && <DrawingCanvas section={props.section} docId={props.selectedRecipe.id}></DrawingCanvas>
                    }
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