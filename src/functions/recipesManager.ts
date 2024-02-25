import RecipesList from "../components/RecipeListView";
import { Recipe, Section } from "../types/Recipe"
import { ViewType } from "../types/ViewType";
import { v4 as uuidv4 } from 'uuid';

type RecipesManager = {
  selectedRecipe: Recipe | undefined
  recipesList: Recipe[]
  setStateFunctions: any
  saveRecipesToLocalStorage: Function
  resetDefaultRecipes: Function
  populateRecipes: Function
  addRecipe: Function
  selectRecipe: Function
  showRecipesList: Function
  showNewRecipeView: Function
  addNewSectionTo: Function
  editSection: Function
  deleteSection: Function
  deleteDocument: Function
}


let recipesManager: RecipesManager = {
  selectedRecipe: undefined,
  recipesList: [],
  setStateFunctions: {
    setRecipeTitle: undefined,
    setMainImageUrl: undefined,
    setRecipesections: undefined,
    setSelectedRecipe: undefined,
    setRecipesList: undefined,
    setViewingType: undefined
  },
  saveRecipesToLocalStorage: function () {
    this.setStateFunctions.setRecipesList((recipes: Recipe[]) => {
      //console.log(recipes)
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return recipes;
    });
  },
  resetDefaultRecipes: function () {
    fetch(window.location.href + "recipes.json").then(e => e.json()).then(d => {
      recipesManager.setStateFunctions.setRecipesList(() => {
        console.log(d.recipes);
        return d.recipes;
      });
    });
  },
  populateRecipes: function (setRecipes: (a: any) => void) {
    // empty the recipes list
    setRecipes([]);

    // get the data from localstorage
    let temp: any = localStorage.getItem("recipes");
    if (!temp) {
      return;
    }
    this.setStateFunctions.setRecipesList(() => {
      //console.log(JSON.parse(temp))
      return JSON.parse(temp);
    });
    this.recipesList = JSON.parse(temp).recipes;
    return JSON.parse(temp).recipes;
  },
  addRecipe: function (newRecipe: Recipe) {
    this.setStateFunctions.setRecipesList((oldRecipes: Recipe[]) => {
      return [newRecipe, ...oldRecipes];
    });
    this.saveRecipesToLocalStorage();
  },
  selectRecipe: function (recipe: Recipe) {
    this.selectedRecipe = recipe;
    /*
    this.setStateFunctions.setRecipeTitle(recipe.name);
    this.setStateFunctions.setMainImageUrl(recipe.mainImage);
    this.setStateFunctions.setRecipesections(recipe.sections);
    */
    // stop showing the "create new recipe" view
    this.setStateFunctions.setViewingType(ViewType.hasRecipe);

    this.setStateFunctions.setSelectedRecipe(recipe);

    localStorage.setItem("lastSelected", recipe.id);

    // on mobile, close the recipe list
    if (window.screen.width < 600) {
      this.showRecipesList();
    }

    //return id
    return 0;
  },
  showRecipesList: function () {
    let a = document.getElementById("recipe-list-container");

    if (a === null) return;

    console.log(a.style.display);
    if (a.style.display == "") {
      a.style.display = "none";
    } else {
      a.style.display = "";
    }
  },
  showNewRecipeView: function () {
    this.setStateFunctions.setViewingType(ViewType.createRecipe);

    // on mobile close recipe list
    if (window.screen.width < 600) {
      this.showRecipesList();
    }
  },
  addNewSectionTo: function (recipe: Recipe, a: any) {

    recipe.sections.push(
      {
        sectionOrder: uuidv4(),
        header: "title" + recipe.sections.length,
        type: a,
        content: "text",
        lexiContent: undefined
      }
    );

    this.setStateFunctions.setSelectedRecipe((prev: Recipe) => {

      //must return a clone because otherwise
      //object.is will detect the object as the same
      //so no changes will render
      //structured clone does not work in ios 13
      //return structuredClone(recipe);
      return JSON.parse(JSON.stringify(recipe));
    });
    this.setStateFunctions.setRecipesList((prev: Recipe[]) => {
      //replace recipe with new recipe
      prev = prev.filter(r => r.id !== recipe.id);
      prev = [recipe, ...prev];
      return prev;
    });
    this.saveRecipesToLocalStorage();
    return
  },
  editSection: function (recipe: Recipe, sectionId: string, newSection: Section) {

    this.setStateFunctions.setRecipesList((prev: Recipe[]) => {
      let editedRecipe = prev.find(p => p.id === recipe.id)
      if (!editedRecipe) return prev;
      // get index of edited recipe
      let i = prev.indexOf(editedRecipe);

      let editedSection = prev[i].sections.find(s => s.sectionOrder === sectionId)
      if (!editedSection) return prev;
      // get index of the section
      let index = prev[i].sections.indexOf(editedSection)
      // place the edited section of the edited recipe with new section
      prev[i].sections[index] = newSection;

      return prev;
    })
    this.saveRecipesToLocalStorage();
    return;
  },
  deleteSection(recipe: Recipe, sectionId: string) {
    console.log(JSON.parse(JSON.stringify(recipe)))
    this.setStateFunctions.setSelectedRecipe((prev: Recipe) => {
      let sectionToDelete = prev.sections.find(section => section.sectionOrder === sectionId)

      // if section does not exist
      if (!sectionToDelete) return;

      let index = prev.sections.indexOf(sectionToDelete);

      // remove the section
      recipe.sections.splice(index, 1);

      return JSON.parse(JSON.stringify(prev))
    })
    this.saveRecipesToLocalStorage();
  },
  deleteDocument: function (documentId: string, event: any) {
    // stop click event propogating to parent
    event.stopPropagation();
    this.setStateFunctions.setRecipesList((prev: Recipe[]) => {
      this.setStateFunctions.setViewingType(ViewType.noRecipe)
      return prev.filter(r => r.id !== documentId);
    })
    this.saveRecipesToLocalStorage()
  }
}

export default recipesManager