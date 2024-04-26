import { LightningElement,wire,track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountList.getAccountList'
const columns=[
    {label:'Name',fieldName:'Name'},
    {label:'ID',fieldName:'Id'}
];
export default class WireAccount extends LightningElement {
@track columns=columns;
@track data=[];
@wire(getAccountList)
wiredAccount({data,error}){
if(data){
    this.data=data;
}
if(error){
    console.error('not proper')
}
}

}