import View from "./View";
import previewView from "./previewView";
class ResultView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage='No recipes found for your query. Please try again!';
    _sucessMessage='Start by searching for a recipe or an ingredient. Have fun!';
    
    _generateMarkup(){
        
        return this._data.map(result => previewView.render(result,false)).join('');
    }

    
    // _generateMarkup(){
    //      return this._data.map(this._generateMarkupPreview).join('');

    // }
    // _generateMarkupPreview(ele){
    //    const id = window.location.hash.slice(1);
    //     return `
    //     <li class="preview">
    //         <a class="preview__link ${id===ele.id ? 'preview__link--active':''}" href="#${ele.id}">
    //         <figure class="preview__fig">
    //             <img src="${ele.image}" alt="${ele.title}" />
    //         </figure>
    //         <div class="preview__data">
    //             <h4 class="preview__title">${ele.title}</h4>
    //             <p class="preview__publisher">${ele.publisher}</p>
    //         </div>
    //       </a>
    //   </li>
    //     `
    // }

}

export default new ResultView();