import { LightningElement } from 'lwc';
export default class Demo2 extends LightningElement {
    text = '';
    Change(event){
        this.text = event.target.value;
     }
}
