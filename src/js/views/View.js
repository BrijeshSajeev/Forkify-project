import icons from 'url:../../img/icons.svg';
export default class View{
    _data;
    render(data,render=true)
    {
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();
        this._data =data;
        const markup =this._generateMarkup();
        if(!render) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
        
    }

    update(data){
      this._data =data;
      const newMarkup =this._generateMarkup();
      const newDom = document.createRange().createContextualFragment(newMarkup);
      const newElements= Array.from(newDom.querySelectorAll('*'));
      const currElements = Array.from(this._parentElement.querySelectorAll('*'));

      newElements.forEach((newEL,i)=>{
        const currEL=currElements[i]; 
        // console.log(currElements[i].isEqualNode(newEL));
          if( 
          !newEL.isEqualNode(currEL) && 
          newEL.firstChild?.nodeValue.trim() !=='' 
          )
          {
            currEL.textContent =newEL.textContent;
          }

          if(!newEL.isEqualNode(currEL)){
              Array.from(newEL.attributes).forEach(attr => currEL.setAttribute(attr.name,attr.value));
          }

      })
    }

    _clear(){
        this._parentElement.innerHTML=''
    }
    renderSpinner(){
        const markup =`
            <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
      
      }
      renderSucess(message=this._sucessMessage){

        const markup=`
        <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
         `
         this._clear();
         this._parentElement.insertAdjacentHTML('afterbegin',markup);
       
    
        }

      renderError(message=this._errorMessage){

        const markup=`
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
         `
         this._clear();
         this._parentElement.insertAdjacentHTML('afterbegin',markup);
       
    
        }

}