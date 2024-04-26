import { LightningElement ,wire,api,track} from 'lwc';
import getContact from '@salesforce/apex/collapsableContact.getContact';
import getCase from '@salesforce/apex/collapsableContact.getCase';
const columns=[
    {label:'First Name', fieldName:'FirstName'},
    {label:'Last Name', fieldName:'LastName'},
    {label:'Email', fieldName:'Email'},
]
const caseColumn=[
    {label:'Case Number', fieldName:'CaseNumber'},
    {label:'Status', fieldName:'Status'},
    {label:'Case Origin', fieldName:'Origin'},
]
export default class Collapsable extends LightningElement {
   @track  columns=columns;
   @track caseColumn=caseColumn;
    @api accountid;
    @wire(getContact,{accountid:'$accountid'}) Contacts;
    @wire(getCase,{accountid:'$accountid'})Cases;
}