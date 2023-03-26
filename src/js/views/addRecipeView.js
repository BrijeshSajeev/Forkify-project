import View from './View.js'

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    _sucessMessage='Recipe was sucessfully uploaded :)'
    constructor(){
        super();
        this._addHandlerOpen();
        this._addHandlerClose();
    }

    toggleClass(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    _addHandlerOpen(){
        this._btnOpen.addEventListener('click',this.toggleClass.bind(this));
    }
    _addHandlerClose(){
        this._btnClose.addEventListener('click',this.toggleClass.bind(this));
        this._overlay.addEventListener('click',this.toggleClass.bind(this));
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr= [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })

    }

    _generateMarkup(){}
   

}

export default new AddRecipeView();