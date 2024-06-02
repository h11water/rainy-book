import * as React from "react"
import { useEffect } from 'react'
import documentManager from "../functions/documentManager"
import { Recipe } from "../types/Document";
import HeadrBar from "./HeaderBar";
import { ViewType } from "../types/ViewType";
import NoRecipe from "./NoDocumentView";
import RecipeView from "./DocumentView";
import NewRecipeView from "./NewDocumentView";
import SettingsView from "./SettingsView";
import Modal from "./modal/Modal";
import modalManager from "../functions/modalManager";


export default function MainViewContainer() {
    const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | undefined>();
    const [viewingType, setViewingType] = React.useState<ViewType>(ViewType.noRecipe);
    // use effect will be called if the 2nd param
    // in this case [], changes. [] does not change
    // so it is called at initialisation
    useEffect(() => {
        //console.log(import.meta.env.test1,import.meta.env.VITE_ala)
        documentManager.setStateFunctions.setSelectedRecipe = setSelectedRecipe;
        documentManager.setStateFunctions.setViewingType = setViewingType;


        let lastSelectedRecipe = documentManager.documentList.find((r: Recipe) => r.id == localStorage.getItem("lastSelected"))
        setSelectedRecipe(lastSelectedRecipe);
        /**/
        documentManager.setStateFunctions.setRecipesList((recipesList: Recipe[]) => {
            let lastSelectedRecipe: any = recipesList.find(r => r.id == localStorage.getItem("lastSelected"))
            if (lastSelectedRecipe) {
                setSelectedRecipe(lastSelectedRecipe);
                setViewingType(ViewType.hasRecipe);
            }
            return recipesList;
        })

    }, [])

    useEffect(() => {
    }, [selectedRecipe])

    return (


        <div className="flex-3 rounded-xl bg-slate-50 m-1 shadow border border-slate-400 w-64 p-2 overflow-hidden flex-col flex">
            <Modal></Modal>
            <HeadrBar HeaderContent={selectedRecipe?.name}></HeadrBar>
            {/*
                <div className="flex">

                <button onClick={()=>{recipesManager.setStateFunctions.setViewingType(ViewType.noRecipe)}}>test </button>

                <button className="btn btn-sky flex-1" onClick={() => {
                    setSelectedRecipe(() => {
                        console.log(selectedRecipe);
                        //this.forceUpdate()
                        //console.log(selectedRecipe, structuredClone(selectedRecipe))

                        return JSON.parse(JSON.stringify(selectedRecipe));
                    })
                }}>
                    change state
                </button>
                <button className="btn btn-sky flex-1" onClick={() => { modalManager.setModalIsOpen(true) }} > show modal</button>
            </div>
            */}



            {
                viewingType === ViewType.noRecipe && <NoRecipe></NoRecipe>
            }
            {
                viewingType === ViewType.hasRecipe && <RecipeView recipe={selectedRecipe} setRecipe={setSelectedRecipe}></RecipeView>
            }
            {
                viewingType === ViewType.createRecipe && <NewRecipeView></NewRecipeView>
            }
            {
                viewingType === ViewType.settings && <SettingsView></SettingsView>
            }
        </div>

    )
}