// FOR POLY FILLING
import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import { TIMEOUT_SEC } from './config.js';

// importing frome model
import * as model from './model.js'
// importing from recipeView
import recipeView from './views/recipeView.js';

import searchView from './views/searchView';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

import addRecipeView from './views/addRecipeView.js';
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

// if(model.hot){
//   model.hot.accept();



const getRecipe =async function(){
try
   {
      //Getting id from -- Hashchange event
      const id = window.location.hash.slice(1);
      
      if(!id) return;
      recipeView.renderSpinner();
      
      //  FETCHING REQUEST..From model.js
        await model.loadRecipe(id);         
      // RENDERING REQUEST..in recipeView.js
        recipeView.render(model.state.recipe);
        
        // Activating Results as active
        resultView.update(model.getSearchResult())
        
        bookmarkView.update(model.state.bookmark);
      
     
    }
  catch(err)
  {
    recipeView.renderError();
  }


}

const getSearch= async function(){
  try {
    const query = searchView.getQuery();
      if(!query) return;
      // Load The Query..
      await model.loadSearch(query);

    // Rendring the Query.
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResult());
    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error);
  }


}

const paginationResult =function(goto){
  // Rendring the Query.
    // console.log(goto);
    resultView.render(model.getSearchResult(goto));

    paginationView.render(model.state.search);

}

const controlServings = function(newServings){

  model.updateServings(newServings);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  
  } 
  else
  {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmark);
  
}

const controlBookmarks = function(){
  
  bookmarkView.render(model.state.bookmark);
} 

const controlAddRecipe = async function(data){
  try{

      // Render spinner
      // addRecipeView.renderError();

    await model.uplodaRecipe(data);
    // Sucess message
    addRecipeView.renderSucess();

    // Render the Recipe
    recipeView.render(model.state.recipe);
    // Render book mark view
    bookmarkView.render(model.state.bookmark)

    // Change Hash address on the link
    window.history.pushState(null,'',`#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function(){
      addRecipeView.toggleClass();
    },TIMEOUT_SEC*100)

  } catch(err){
    console.error('🔥🔥🔥',err.message);
    addRecipeView.renderError(err.message);
  }
}

const init =function(){
  bookmarkView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(getRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerRender(getSearch);
  paginationView.addHandlerRender(paginationResult);
  addRecipeView.addHandlerUpload(controlAddRecipe);

}
init();