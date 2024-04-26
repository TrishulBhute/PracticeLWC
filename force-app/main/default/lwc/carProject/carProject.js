import { LightningElement, track, wire } from 'lwc';
import carData from '@salesforce/apex/getCar.carData';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class CarProject extends LightningElement {
    @track data=[];
    @track selectedNews={};
    
    @track result = [];
    @wire(carData)
    carData({data,error}){
        if(data){
            this.data=data;
            console.log(this.data);
        }
        if(error){
            console.alert('Error Record');
        }
        }
        @track isModalOpen = false;
         get modalClass(){
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" :""}`
        }
        get modalBackdropClass(){
        return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
        }
        showModal(event){
            let id = event.target.dataset.id;
            console.log(id);
            // const passEventr = new CustomEvent('recordselection', {
            //     detail: { selectedRecordId: id }
            //     });
            //     this.dispatchEvent(passEventr);
                
         //this.result=this.data.map();  
        // console.log('result'+this.result)
         this.data.forEach(item=>{
            console.log('HHHHHHHHHHHHHHH'+JSON.stringify(item));
            console.log(item.Id);
                if(item.Id === id){
                  this.selectedNews ={...item}
                  console.log(this.selectedNews)
              }
            })
            this.isModalOpen = true;
        }
        closeModal(){
            this.isModalOpen = false;
        }

}