import { LightningElement } from 'lwc';

export default class MyPractice extends LightningElement {
    greeting = "Words!"
    changeHandler (event){
        this.greeting=event.target.value;
    }
}