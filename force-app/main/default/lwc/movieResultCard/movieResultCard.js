import { LightningElement, api } from 'lwc';

export default class MovieResultCard extends LightningElement {
         @api movieResult;   
         @api selectedCardId;
         handleClick(event){
            console.log(this.movieResult.imdbID);

            this.dispatchEvent(new CustomEvent('cardclick',
            {detail : this.movieResult.imdbID}
            ));
         }

         get seletedCardCSS(){
            return this.selectedCardId === this.movieResult.imdbID ? 'image-container selected':'image-container';
         }
}