import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MOVIE_SELECTED from '@salesforce/messageChannel/movieChannel__c';

export default class SearchMovie extends LightningElement {
    selectedType = '';
    isLoading =false;
    searchValue ;
    pageNumber = 1;
    delayTimeout; 
    resulTArray =[];
    selectedCardId ;

    @wire(MessageContext)
    messageContext;

    get typeOption(){
        return [
            {label: 'None', value: ''},
            {label: 'movie', value: 'movie'},
            {label:'series',value:'series'},
            {label:'episode',value:'episode'}
        ]
    }

    handleChange(event){
      let {name,value} = event.target;
      if(name == "type"){
        this.selectedType = value;
      }else if(name == "search"){
        this.isLoading = true;
        this.searchValue = value;
      }else if(name == "number"){
        this.pageNumber = value;
      }
     
     clearTimeout(this.delayTimeout);  
     this.delayTimeout = setTimeout(()=>{
        this.loadMovie();
      },300)

    }

    selectedCard(event){
      this.selectedCardId = event.detail;

      const payload = { recordId: this.selectedCardId };

       publish(this.messageContext, MOVIE_SELECTED, payload);
    }

   async loadMovie(){
        if(this.searchValue && this.searchValue != 'undefined' ){
        let url =`https://www.omdbapi.com/?s=${this.searchValue}&type=${this.selectedType}&page=${this.pageNumber}&apikey=4582cb25`
        let res = await fetch(url);
        let data = await res.json();
        this.isLoading = false;
        if(data.Response == "True"){
           this.resulTArray = data.Search;
        }
        }else{
        this.resulTArray = [];  
        this.isLoading = false;
    }
    }

}