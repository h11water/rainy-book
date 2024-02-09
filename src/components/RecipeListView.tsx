import { useEffect } from 'react'
import * as React from "react"
import RecipeListItem from './RecipeListItem'
import { Recipe } from '../types/Recipe'
import recipesManager from '../functions/recipesManager'
import { ViewType } from '../types/ViewType'


export default function RecipesList() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([])
  useEffect(() => {
    recipesManager.setStateFunctions.setRecipesList = setRecipes;
    recipesManager.populateRecipes(setRecipes);
    recipesManager.recipesList = recipes;
  }, [])
  return (
    <>

      <div className="flex-1 rounded-xl bg-sky-300 m-1 shadow border border-slate-400 w-32 p-2 flex flex-col overflow-auto" id='recipe-list-view'>

        <div className=''>
          <div className="m-1 text-xl font-medium inline">My Recipes</div>
          <div className='mt-2 p-4 float-right hover:bg-sky-500 rounded' onClick={e=>{recipesManager.showRecipesList()}}>
            <span className=''>
              <img src="../images/bootstrapIcons/arrow-bar-left.svg" />
            </span>
          </div>
        </div>
        <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded ' onClick={() => { recipesManager.populateRecipes(setRecipes) }}> refresh</button>
        <div className=''>recipes:{recipes.length}</div>

        <div className='overflow-y-auto p-1'>
          {
            recipes.length > 0 ? recipes.map((r, i) => {
              return <RecipeListItem key={i} recipe={r}></RecipeListItem>
            }) :
              <div> No Recipes</div>
          }
        </div>
        <div className='flex'>
          <span className='rounded hover:bg-sky-500 p-2 mt-2' onClick={() => {
            recipesManager.setStateFunctions.setViewingType(ViewType.settings); if (window.screen.width < 600) {
              recipesManager.showRecipesList()
            }
          }} title='Settings'>
            <img src="../images/bootstrapIcons/gear.svg" />
          </span>
          <span className='rounded hover:bg-sky-500 p-2 mt-2 ml-auto' onClick={() => { recipesManager.showNewRecipeView() }} title='New document'>
            <img src="../images/bootstrapIcons/plus.svg" />
          </span>

        </div>

      </div>
    </>
  )
}
