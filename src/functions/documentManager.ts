import { MyDocument, Section } from "../types/Document"
import { ViewType } from "../types/ViewType";
import { v4 as uuidv4 } from 'uuid';

type DocumentManager = {
  selectedDocument: MyDocument | undefined
  documentList: MyDocument[]
  setStateFunctions: {
    setDocumentTitle: Function ,
    setMainImageUrl: Function,
    setDocumentSections: Function,
    setSelectedDocument: Function ,
    setRecipesList: Function,
    setViewingType: Function
  }
  saveDocumentsToLocalStorage: Function
  resetDefaultDocuement: Function
  populateDocuments: Function
  addDocument: Function
  selectDocument: Function
  showDocumentsList: Function
  showNewDocumentView: Function
  addNewSectionTo: Function
  editSection: Function
  deleteSection: Function
  deleteDocument: Function
}


let documentManager: DocumentManager = {
  selectedDocument: undefined,
  documentList: [],
  setStateFunctions: {
    setDocumentTitle: ()=>{},
    setMainImageUrl: ()=>{},
    setDocumentSections: ()=>{},
    setSelectedDocument: ()=>{},
    setRecipesList: ()=>{},
    setViewingType: ()=>{}
  },
  saveDocumentsToLocalStorage: function () {
    this.setStateFunctions.setRecipesList((recipes: MyDocument[]) => {
      //console.log(recipes)
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return recipes;
    });
  },
  resetDefaultDocuement: function () {
    fetch(window.location.href + "recipes.json").then(e => e.json()).then(d => {
      documentManager.setStateFunctions.setRecipesList(() => {
        console.log(d.recipes);
        return d.recipes;
      });
    });
  },
  populateDocuments: function (setRecipes: (a: any) => void) {
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
    this.documentList = JSON.parse(temp).recipes;
    return JSON.parse(temp).recipes;
  },
  addDocument: function (newRecipe: MyDocument) {
    this.setStateFunctions.setRecipesList((oldRecipes: MyDocument[]) => {
      return [newRecipe, ...oldRecipes];
    });
    this.saveDocumentsToLocalStorage();
  },
  selectDocument: function (recipe: MyDocument) {
    this.selectedDocument = recipe;
    /*
    this.setStateFunctions.setRecipeTitle(recipe.name);
    this.setStateFunctions.setMainImageUrl(recipe.mainImage);
    this.setStateFunctions.setRecipesections(recipe.sections);
    */
    // stop showing the "create new recipe" view
    this.setStateFunctions.setViewingType(ViewType.hasRecipe);

    this.setStateFunctions.setSelectedDocument(recipe);

    localStorage.setItem("lastSelected", recipe.id);

    // on mobile, close the recipe list
    if (window.screen.width < 600) {
      this.showDocumentsList();
    }

    //return id
    return 0;
  },
  showDocumentsList: function () {
    let a = document.getElementById("recipe-list-container");

    if (a === null) return;

    console.log(a.style.display);
    if (a.style.display == "") {
      a.style.display = "none";
    } else {
      a.style.display = "";
    }
  },
  showNewDocumentView: function () {
    this.setStateFunctions.setViewingType(ViewType.createRecipe);

    // on mobile close recipe list
    if (window.screen.width < 600) {
      this.showDocumentsList();
    }
  },
  addNewSectionTo: function (recipe: MyDocument, a: any) {

    recipe.sections.push(
      {
        sectionOrder: uuidv4(),
        header: "title" + recipe.sections.length,
        type: a,
        content: "text",
        lexiContent: undefined,
        canvasDataUrl: undefined
      }
    );

    this.setStateFunctions.setSelectedDocument(() => {

      //must return a clone because otherwise
      //object.is will detect the object as the same
      //so no changes will render
      //structured clone does not work in ios 13
      //return structuredClone(recipe);
      return JSON.parse(JSON.stringify(recipe));
    });
    this.setStateFunctions.setRecipesList((prev: MyDocument[]) => {
      //replace recipe with new recipe
      prev = prev.filter(r => r.id !== recipe.id);
      prev = [recipe, ...prev];
      return prev;
    });
    this.saveDocumentsToLocalStorage();
    return
  },
  editSection: function (recipe: MyDocument, sectionId: string, newSection: Section) {

    this.setStateFunctions.setRecipesList((prev: MyDocument[]) => {
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
    this.saveDocumentsToLocalStorage();
    return;
  },
  deleteSection(recipe: MyDocument, sectionId: string) {
    console.log(JSON.parse(JSON.stringify(recipe)))
    this.setStateFunctions.setSelectedDocument((prev: MyDocument) => {
      let sectionToDelete = prev.sections.find(section => section.sectionOrder === sectionId)

      // if section does not exist
      if (!sectionToDelete) return;

      let index = prev.sections.indexOf(sectionToDelete);

      // remove the section
      recipe.sections.splice(index, 1);

      return JSON.parse(JSON.stringify(prev))
    })
    this.saveDocumentsToLocalStorage();
  },
  deleteDocument: function (documentId: string, event: any) {
    // stop click event propogating to parent
    event.stopPropagation();
    this.setStateFunctions.setRecipesList((prev: MyDocument[]) => {
      this.setStateFunctions.setViewingType(ViewType.noRecipe)
      return prev.filter(r => r.id !== documentId);
    })
    this.saveDocumentsToLocalStorage()
  }
}

export default documentManager