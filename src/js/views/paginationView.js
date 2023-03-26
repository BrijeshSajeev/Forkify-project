
import icons from 'url:../../img/icons.svg';

// console.log(Fraction);
import View from './View.js'

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    
    addHandlerRender(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goto=+btn.dataset.goto;
            // console.log(goto);
            handler(goto);
        })
    }
    
    _generateMarkup(){
        const currPage = this._data.page;
        const totalPage = Math.ceil(this._data.results.length / this._data.requestPerPage);

        // At Page 1 and more pages
        if(currPage===1 && totalPage > 1){
            return `
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }

        // At last Page
        if(currPage === totalPage){
            return `
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
            `
        }

        // At the middle page 
        if(currPage > 1 && currPage < totalPage){
            return `
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
               <span>Page ${currPage + 1}</span>
               <svg class="search__icon">
                   <use href="${icons}#icon-arrow-right"></use>
               </svg>
           </button>
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage - 1}</span>
            </button>
            `
        }

        // There is only one page ..
        return '';
    }
   

}

export default new PaginationView();