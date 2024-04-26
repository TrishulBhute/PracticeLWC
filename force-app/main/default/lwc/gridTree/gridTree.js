import { LightningElement, track, wire } from 'lwc';
import getCallAccount from '@salesforce/apex/callAccount.getCallAccount';
const column=[
    
    {
        label:'Name',
        fieldName:'Name'
    }
]
export default class GridTree extends LightningElement {
@track columns=column;    
@track data=[];

@wire(getCallAccount)
callaccount({data,error}){
if(data){
this.gtDataGrid(data);

}
if(error)
 console.error(error);
}
gtDataGrid(result){
    this.data=result.map(item=>{
      const {Contacts,...Accounts} = item;
      return {...Accounts,"_children":Contacts}
     
    })
    
}

}
