import { async } from "regenerator-runtime";
import { API_URL,REQ_PER_PAGE,key } from "./config";
import {AJAX} from "./helper.js"
export const state={
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
        requestPerPage: REQ_PER_PAGE,
    },
    bookmark:[],
}


const createRecipeObject=function(data){
    const {recipe} =data.data;
    
    
    return{
        cookingTime:recipe.cooking_time,
        id:recipe.id,
        image:recipe.image_url,
        publisher:recipe.publisher,
        title:recipe.title,
        servings:recipe.servings,
        ingredients:recipe.ingredients,
        sourceUrl:recipe.source_url,
        ...(recipe.key && {key:recipe.key}),
    }    
        
        
    
}

export const loadRecipe = async function(id){

   try
   { 
    
    const data = await AJAX(`${API_URL}/${id}?key=${key}`);
    // console.log(response,data);

    
    state.recipe = createRecipeObject(data);

    // console.log(state.recipe);
    state.recipe.page=1;
    if(state.bookmark.some(bookmark => bookmark.id === id )){
        state.recipe.bookmarked=true;
    }
    else{
        state.recipe.bookmarked=false;      
    }
    
  
}catch(err){
    console.error(err+" in model");
    throw err;
}
}

export const loadSearch = async function(query){

    try {
        state.query=query;
        console.log(query);

        const data =await AJAX(`${API_URL}?search=${query}&key=${key}`);
        // console.log(data.data.recipes);
        state.search.results=data.data.recipes.map(res => {
             return{   
                id:res.id,
                image:res.image_url,
                publisher:res.publisher,
                title:res.title,
                ...(res.key && {key:res.key}), 
            }
        })
        
        // console.log(state.search.results);


    } catch (err) {
        throw err;
    }

}

export const getSearchResult=function(page = state.search.page){
    state.search.page=page;
    const start = (page-1)*10;
    const end= (page) * 10;
    return state.search.results.slice(start , end);
}

export const updateServings = function(newServings){

    state.recipe.ingredients.forEach(ing => {
        ing.quantity =  ing.quantity * newServings / state.recipe.servings;
    });
    state.recipe.servings = newServings;

}

const updateLocalStrorage=function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmark));
}

export const addBookmark = function(recipe){
    state.bookmark.push(recipe);
    
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    
    updateLocalStrorage();
}

export const deleteBookmark = function(id){

    const index = state.bookmark.findIndex(el => el.id === id);
     state.bookmark.splice(index,1)
 
    if(id === state.recipe.id ){
        state.recipe.bookmarked = false;

    }
    updateLocalStrorage();
}

export const uplodaRecipe = async function(newRecipe){
try{


    const ingredients = Object.entries(newRecipe).
    filter(entry => entry[0].startsWith('ingredient') && entry[1] !=='')
    .map(ing => {
        // const ingArr = ing[1].replaceAll(' ','').split(',');
        const ingArr = ing[1].split(',').map(ele =>ele.trim() );
        if(ingArr.length !==3)
            throw new Error('Worng ingredient format, Please use correct format :) ');
        
        const [quantity,unit,description] =ingArr;

        return {
            quantity: quantity ? +quantity :null ,
            unit,
            description,
        }
    })
 

    const uploadRecipe ={
        cooking_time: newRecipe.cookingTime,
        image_url:newRecipe.image,
        publisher:newRecipe.publisher,
        title:newRecipe.title,
        servings:newRecipe.servings,
        source_url:newRecipe.sourceUrl,
        ingredients
    }
    
    // console.log(uploadRecipe);
    const data = await AJAX(`${API_URL}?key=${key}`,uploadRecipe);
    // console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);

    } catch(err){
        throw err;
    }


}



const init=function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage)
        state.bookmark= JSON.parse(storage); 
}
init();