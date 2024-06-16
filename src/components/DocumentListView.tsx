import { useEffect } from 'react'
import * as React from "react"
import RecipeListItem from './DocumentListItem'
import { MyDocument } from '../types/Document'
import documentManager from '../functions/documentManager'
import { ViewType } from '../types/ViewType'


export default function DocumentList() {
  const [recipes, setRecipes] = React.useState<MyDocument[]>([])
  useEffect(() => {
    documentManager.setStateFunctions.setRecipesList = setRecipes;
    documentManager.populateDocuments(setRecipes);
    documentManager.documentList = recipes;
    
  }, [])
  return (
    <>
      <div className='flex flex-1 !safari-full' id='recipe-list-container'>
        <div className="flex flex-4 flex-col rounded-xl bg-sky-400 m-1 shadow border border-slate-400 w-32 p-2 overflow-auto" id='recipe-list-view'>

          <div className='flex-1'>
            <div className=" m-1 text-xl font-medium inline">My Notes</div>
            <div className='mt-2 p-4 float-right hover:bg-sky-500 rounded' onClick={e => { documentManager.showDocumentsList() }}>
              <span className=''>
                <img src="./images/bootstrapIcons/arrow-bar-left.svg" />
              </span>
            </div>
          </div>
          <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded ' onClick={() => { documentManager.populateDocuments(setRecipes) }}> refresh</button>
          <div className=''>notes:{recipes.length}</div>

          <div className='flex-10 overflow-y-auto p-1'>
            {
              recipes.length > 0 ? recipes.map((r, i) => {
                return <RecipeListItem key={i} recipe={r}></RecipeListItem>
              }) :
                <div> No Recipes</div>
            }
          </div>
          <div className='flex'>
            <span className='rounded hover:bg-sky-500 p-2 mt-2' onClick={() => {
              documentManager.setStateFunctions.setViewingType(ViewType.settings); if (window.screen.width < 600) {
                documentManager.showDocumentsList()
              }
            }} title='Settings'>
              <img src="./images/bootstrapIcons/gear.svg" />
            </span>
            <span className='rounded hover:bg-sky-500 p-2 mt-2 ml-auto' onClick={() => { documentManager.showNewDocumentView() }} title='New document'>
              <img src="./images/bootstrapIcons/plus.svg" />
            </span>

          </div>

        </div>
        <div className='' id='recipe-list-backdrop' onClick={() => { documentManager.showDocumentsList() }}>

        </div>
      </div>
    </>
  )
}
