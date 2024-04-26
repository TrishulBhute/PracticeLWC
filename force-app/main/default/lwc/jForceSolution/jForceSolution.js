import {LightningElement,track, wire } from 'lwc';
import getLead from '@salesforce/apex/getLead.getLead';
import setTask from '@salesforce/apex/insertTask.setTask';

import {ShowToastEvent} from 'lightning/platformShowToastEvent'

const columns=[
    {label:'Name', fieldName:'Name' },
    {label:'Email', fieldName:'Email'},
    {label:'Mobile', fieldName:'MobilePhone'},
]
export default class JForceSolution extends LightningElement {
@track columns=columns;
@track data=[];
selectedRecords;
@wire(getLead)
wiredLead({data,error}){
    if(data){
        this.data=data;
    }
    if(error){
        console.alert('Error Record');
    }
}
customFormModal = false; 
    
customShowModalPopup() {            
    this.customFormModal = true;
    this.selectedRecords =  
      this.template.querySelector("lightning-datatable").getSelectedRows();
    console.log("this.RecordId"+JSON.stringify(this.selectedRecords));
   

}

customHideModalPopup() {    
    
    this.customFormModal = false;
}
// @api recordId;
subject;
// name;
datet;
// relatedto;
// assing;
// @track status;
description;
priority;
type;
get typePickListValue(){
    return[
    {label:'Call',value:'Call'},
    {label:'Meeting',value:'Meeting'},
    {label:'Other',value:'Other'},
    {label:'Email',value:'Email'},
     ];
}

get priorityPickListValue(){
    return[
        {label:'High',value:'High'},
        {label:'Normal',value:'Normal'},
        {label:'Low',value:'Low'},
    ];
}

subjectChange(event){
    this.subject=event.target.value;
}
descriptionChange(event){
    this.description=event.target.value;
}
// nameChage(event){
//     this.name=event.target.value;
// }
dateChange(event){
    this.datet=event.target.value;
}
// relatedtoChange(event){
//     this.relatedto=event.target.value;
// }
// assingChange(event){
//     this.assing=event.target.value;
// }
// statusChange(event){
//     this.status=event.target.value;
// }
priorityChange(event){
    this.priority=event.target.value;
}
typeChange(event){
    this.type=event.target.value;
}
onCreateRecord(){
    setTask({subject:this.subject , type:this.type , priority:this.priority , description:this.description ,datet:this.datet,reId:this.selectedRecords})
        .then(task=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Success',
                    message:'Task Created',
                    variant:'success'
                })
            );
            this.subject='';
            this.type='';
            this.priority='';
            this.description='';
            this.datet='';
            this.customFormModal=false;
        })
         .catch(error=>{
             this.dispatchEvent(
                new ShowToastEvent({
                    title:'Error Creating Record',
                    message:error,
                    variant:'error'
                })
             );
         });
}
}