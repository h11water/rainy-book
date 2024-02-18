import * as React from "react"
import { useEffect } from 'react'
import recipesManager from "../functions/recipesManager"
import { Recipe, Section } from "../types/Recipe";
import HeadrBar from "./HeaderBar";
import { ViewType } from "../types/ViewType";
import NoRecipe from "./NoRecipeView";
import RecipeView from "./RecipeView";
import NewRecipeView from "./NewRecipeView";
import SettingsView from "./SettingsView";
import Modal from "./Modal";
import modalManager from "../functions/modalManager";

export default function MainViewContainer() {
    const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | undefined>();
    const [viewingType, setViewingType] = React.useState<ViewType>(ViewType.noRecipe);
    // use effect will be called if the 2nd param
    // in this case [], changes. [] does not change
    // so it is called at initialisation
    useEffect(() => {
        //console.log(import.meta.env.test1,import.meta.env.VITE_ala)
        recipesManager.setStateFunctions.setSelectedRecipe = setSelectedRecipe;
        recipesManager.setStateFunctions.setViewingType = setViewingType;
        return
        let lastSelectedRecipe = recipesManager.recipesList.find((r: Recipe) => r.id == localStorage.getItem("lastSelected"))
        setSelectedRecipe(lastSelectedRecipe);
        /**/
        recipesManager.setStateFunctions.setRecipesList((recipesList: Recipe[]) => {
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
            <div className="flex">
                <button className="btn btn-sky flex-1" onClick={() => {
                    setSelectedRecipe((r) => {
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