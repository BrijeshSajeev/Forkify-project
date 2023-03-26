import View from "./View";
class SearchView extends View{
_parentElement= document.querySelector('.search');

    _clearForm(){
        this._parentElement.querySelector('.search__field').value='';
    }

    getQuery(){
        const query =this._parentElement.querySelector('.search__field').value;
        this._clearForm();
        return query;
    }
    
    addHandlerRender(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        })
    }

}

export default new SearchView();