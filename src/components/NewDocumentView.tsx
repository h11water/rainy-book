import documentManager from "../functions/documentManager"
import { Recipe } from "../types/Document"
import { v4 as uuidv4 } from 'uuid';

export default function NewRecipeView() {

    function createRecipe(e: any): Recipe {
        e.preventDefault()
        // template recipe
        let newRecipe = {
            "id": "2",
            "name": "rainbow trout",
            "description": "owowowowoowowowowowo",
            "dateCreated": (new Date()).toLocaleDateString('en-UK'),
            "dateModified": (new Date()).toLocaleDateString('en-UK'),
            "ingredients": [],
            "sections": [],
            "mainImage": ""
        }
        newRecipe.id = uuidv4()
        newRecipe.name = e.target.elements["doc-name"].value

        documentManager.addDocument(newRecipe)
        documentManager.selectDocument(newRecipe)
        return newRecipe
    }

    return (
        <div className="fade-in p-2">

            <form onSubmit={createRecipe}>
                <div className="relative z-0">
                    <input type="text" id="doc-name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " defaultValue="untitled" />
                    <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto" > Document Name</label>
                </div>

                <div>
                    document type
                    <br />
                    <br />
                    <br />
                    use a card for these radio button

                    <div className="flex">

                        <div className="p-2 hover:bg-slate-300 rounded border border-gray-400 m-1">
                            <input type="radio" name="doc-type" id="template1" className="rounded m-1" />
                            <label htmlFor="template1">Blank</label>
                            <span className="p-2">
                                <img className="inline" src="./images/bootstrapIcons/file-earmark.svg" alt="" />
                            </span>
                        </div>

                        <div className="p-2 hover:bg-slate-300 rounded border border-gray-400 m-1">
                            <input type="radio" name="doc-type" id="template2" className="rounded m-1" />
                            <label htmlFor="template2">Step by step instruction</label>
                            <span className="p-2">
                                <img className="inline" src="./images/bootstrapIcons/list-ol.svg" alt="" />
                            </span>
                        </div>

                        <div className="p-2 hover:bg-slate-300 rounded border border-gray-400 m-1">
                            <input type="radio" name="doc-type" id="template3" className="rounded m-1" />
                            <label htmlFor="template3">List</label>
                            <span className="p-2">
                                <img className="inline" src="./images/bootstrapIcons/list.svg" alt="" />
                            </span>
                        </div>

                        <div className="p-2 hover:bg-slate-300 rounded border border-gray-400 m-1">
                            <input type="radio" name="doc-type" id="template4" className="rounded m-1" />
                            <label htmlFor="template4">Log book</label>
                            <span className="p-2">
                                <img className="inline" src="./images/bootstrapIcons/list.svg" alt="" />
                            </span>
                        </div>
                    </div>
                </div>
                <div> Advanced settings</div>
                <button className="btn btn-green" type="submit">Create recipe</button>
            </form>
        </div>
    )
}