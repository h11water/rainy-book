import documentManager from "../functions/documentManager";
import { SectionType } from "../types/Document";


export default function SectionAdder({ ...props }) {
    return (

        <div className="rounded border-2 border-dashed border-slate-400 mt-2 text-center">

            <div>
                <img className=" inline" src="./images/bootstrapIcons/plus.svg" />
                <div className="inline">Add new section</div>
            </div>


            <div className="relative text-center">

                <button className="flex-1 hover:bg-slate-300 rounded m-2 text-center p1" title="add text" onClick={()=>{documentManager.addNewSectionTo(props.selectedRecipe, SectionType.text)}}>
                    <span className='text-center'>
                        <img className="w-8" src="./images/bootstrapIcons/fonts.svg" />
                    </span>
                </button>

                <button  className="btn flex-1 hover:bg-slate-300 rounded m-2 text-center" title="add image" onClick={()=>{documentManager.addNewSectionTo(props.selectedRecipe, SectionType.drawing)}}>
                    <span className='text-center'>
                        <img className="w-8" src="./images/bootstrapIcons/image.svg" />
                    </span>
                </button>

                <button disabled className="btn flex-1 hover:bg-slate-300 rounded m-2 text-center p-1" title="add image from camera">
                    <span className='text-center'>
                        <img className="w-8" src="./images/bootstrapIcons/camera.svg" />
                    </span>
                </button>
            </div>

        </div>

    )
}

{/* 

recipesManager.addNewSectionTo(props.selectedRecipe, SectionType.text)

        <button className="btn btn-green w-full !mt-5" onClick={() => {
            recipesManager.addNewSectionTo(props.selectedRecipe)

        }}>
            +Add new section
        </button>

*/}