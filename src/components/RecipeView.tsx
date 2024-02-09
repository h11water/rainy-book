import recipesManager from "../functions/recipesManager"
import SectionAdder from "./SectionAdder";
import IngredientsView from "./IngredientsView";
import SectionView from "./SectionView";
import { Recipe, Section, SectionType } from "../types/Recipe";
import { useState } from "react";
import DrawingCanvas from "./DrawingCanvas";

export default function RecipeView({ ...props }) {

  let selectedRecipe: Recipe = props.recipe;
  let [gridColumns, setGridColumns] = useState<number>(1);
  if (!selectedRecipe) return <div> no recipe</div>

  return (
    <div className='overflow-x-scroll w-full'>

      {/* change the key so the full component refreshes and the animation gets replayed*/}
      <div className="fade-in overflow-auto" key={selectedRecipe.id}>
        <button className="btn btn-sky" onClick={() => {
          setGridColumns(prev => {
            console.log(prev)
            return prev + 1
          })
        }}>increment grid</button>



        <div className="w-full grid" style={{ "gridTemplateColumns": "repeat(" + String(gridColumns) + ", minmax(0, 1fr))" }}>
          {/* 
          <img className="rounded center" src={selectedRecipe.mainImage}></img>
          */}
          {
            !selectedRecipe.sections && <div> no step </div>
          }
          {
            selectedRecipe.sections.map((s: Section, i: number) => {

              if (s.type === SectionType.text) return <SectionView key={i} section={s} selectedRecipe={selectedRecipe} sectionOrder={s.sectionOrder}></SectionView>
              if (s.type === SectionType.drawing) return <DrawingCanvas />
              if (s.type === SectionType.photo) return <DrawingCanvas />
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