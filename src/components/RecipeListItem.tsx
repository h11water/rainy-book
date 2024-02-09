//import Recipe from "../types/Recipe"
import { useState } from "react";
import recipesManager from "../functions/recipesManager";
import { Recipe } from "../types/Recipe";

export default function RecipeListItem({ ...props }) {
    let recipe: Recipe = props.recipe;
    const [isHovering, setIsHovering] = useState(false)

    return (
        <div className="flex bg-slate-50 rounded mb-1 p-1 hover:bg-slate-300 shadow-md active:shadow"
            onClick={() => { recipesManager.selectRecipe(recipe) }}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex flex-col ">
                <div className="flex-1 ">{recipe.name}</div>
                <div className="flex-1 text-slate-400">{recipe.dateCreated}</div>
            </div>

            {
                isHovering && <button className="!mr-0 !ml-auto btn btn-sky" onClick={() => { recipesManager.deleteDocument(recipe.id) }}>
                    <span>
                        <img src="images/bootstrapIcons/x-lg.svg"></img>
                    </span>
                </button>
            }

        </div>
    )
}