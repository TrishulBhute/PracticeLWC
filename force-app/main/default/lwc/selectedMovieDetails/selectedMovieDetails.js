import { LightningElement,wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import MOVIE_SELECTED from '@salesforce/messageChannel/movieChannel__c';


export default class SelectedMovieDetails extends LightningElement {
    subscription = null;
    @wire(MessageContext)
    messageContext;
    resultArray=[];
    showComponent = false;

    connectedCallback(){
        this.subscribeToMessageChannel();
        this.showComponent= false; 
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIE_SELECTED,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    async handleMessage(message) {
        this.recordId = message.recordId;
        console.log(this.recordId);
        const url =`https://www.omdbapi.com/?i=${this.recordId}&plot=full&apikey=4582cb25`
        const res = await fetch(url);
        const data = await res.json();
        console.log('data'+ JSON.stringify(data));
        this.resultArray = data;
        this.showComponent= true; 
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

}