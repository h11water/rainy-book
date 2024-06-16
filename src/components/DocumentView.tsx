import documentManager from "../functions/documentManager"
import SectionAdder from "./SectionAdder";
import IngredientsView from "./IngredientsView";
import SectionView from "./SectionView";
import { MyDocument, Section, SectionType } from "../types/Document";
import { useState } from "react";
import DrawingCanvas from "./DrawingCanvas";

export default function RecipeView({ ...props }) {
  var selectedRecipe: MyDocument
  try {
    selectedRecipe = props.recipe;
    //this code will give undefined access error if sections does not exist
    selectedRecipe.sections.map
  } catch {
    //console.log("not a recipe type")
    return (<div>failed to load document</div>)
  }

  let [gridColumns, setGridColumns] = useState<number>(1);
  if (!selectedRecipe) return <div> no recipe</div>


  return (
    <div className='overflow-x-scroll w-full'>

      {/* change the key so the full component refreshes and the animation gets replayed*/}
      <div className="fade-in overflow-y-auto overflow-x-hidden" key={selectedRecipe.id}>

        {/*
        <button className="btn btn-sky" onClick={() => {
          setGridColumns(prev => {
            console.log(prev)
            return prev + 1
          })
        }}>increment grid</button>
        */}


        <div className="grid" style={{ "gridTemplateColumns": "repeat(" + String(gridColumns) + ", minmax(0, 1fr))" }}>
          {/* 
          <img className="rounded center" src={selectedRecipe.mainImage}></img>
          */}
          {
            !selectedRecipe.sections && <div> no step </div>
          }
          {
            selectedRecipe.sections.map((s: Section, i: number) => {

              return <SectionView key={i} section={s} selectedRecipe={selectedRecipe} sectionOrder={s.sectionOrder} sectionType={s.type}></SectionView>
            })
          }
          <SectionAdder selectedRecipe={selectedRecipe} setRecipe={props.setRecipe}></SectionAdder>
        </div>
        {/*
            <div className="flex-1">
              <IngredientsView></IngredientsView>
            </div>
             */}

      </div>
    </div>

  )
}