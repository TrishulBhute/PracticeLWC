import { LightningElement, track, wire, api } from 'lwc';
import getTransactions from '@salesforce/apex/TransactionHistory.getTransactions';
import updateTransaction from '@salesforce/apex/TransactionHistory.updateTransactions';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import January__F from '@salesforce/schema/Company_Budget__c.January__c';
import February__F from '@salesforce/schema/Company_Budget__c.February__c';
import March__F from '@salesforce/schema/Company_Budget__c.March__c';
import April__F from '@salesforce/schema/Company_Budget__c.April__c';
import May__F from '@salesforce/schema/Company_Budget__c.May__c';
import June__F from '@salesforce/schema/Company_Budget__c.June__c';
import July__F from '@salesforce/schema/Company_Budget__c.July__c';
import August__F from '@salesforce/schema/Company_Budget__c.August__c';
import September__F from '@salesforce/schema/Company_Budget__c.September__c';
import October__F from '@salesforce/schema/Company_Budget__c.October__c';
import November__F from '@salesforce/schema/Company_Budget__c.November__c';
import December__F from '@salesforce/schema/Company_Budget__c.December__c';
import Budget_Year__F from '@salesforce/schema/Company_Budget__c.Budget_Year__c';
import Product__F from '@salesforce/schema/Company_Budget__c.Product__c';
import CurrencyIsoCode__F from '@salesforce/schema/Company_Budget__c.CurrencyIsoCode';
import Status__F from '@salesforce/schema/Company_Budget__c.Status__c';
import User__F from '@salesforce/schema/Company_Budget__c.User__c';

import ID_FIELD from '@salesforce/schema/Company_Budget__c.Id';
import addData from '@salesforce/apex/TransactionHistory.addData';


export default class TransactionHistory extends LightningElement {
    
    @api recordId;
    totalwidth=100;
    @track columns = [{
            label: 'Budget ID',
            //fieldName: Name.fieldApiName,
            fieldName: 'Name',
            type: 'text',
            sortable: true,
            initialWidth: 150,
        },
        {
            label: 'Jan',
            fieldName: January__F.fieldApiName,
            //fieldName: 'January__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Feb',
            fieldName: February__F.fieldApiName,
            //fieldName: 'February__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Mar',
            fieldName: March__F.fieldApiName,
            //fieldName: 'March__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Apr',
            fieldName: April__F.fieldApiName,
            //fieldName: 'April__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'May',
            fieldName: May__F.fieldApiName,
            //fieldName: 'May__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Jun',
            fieldName: June__F.fieldApiName,
            //fieldName: 'June__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Jul',
            fieldName: July__F.fieldApiName,
            //fieldName: 'July__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Aug',
            fieldName: August__F.fieldApiName,
            //fieldName: 'August__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Sep',
            fieldName: September__F.fieldApiName,
            //fieldName: 'September__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Oct',
            fieldName: October__F.fieldApiName,
            //fieldName: 'October__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Nov',
            fieldName: November__F.fieldApiName,
            //fieldName: 'November__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Dec',
            fieldName: December__F.fieldApiName,
            //fieldName: 'December__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Cur',
            fieldName: CurrencyIsoCode__F.fieldApiName,
            //fieldName: 'CurrencyIsoCode',
            type: 'currency',
            sortable: true,
            initialWidth: this.totalwidth,
        },
        
        {
            label: 'Product',
            fieldName: Product__F.fieldApiName,
            //fieldName: 'Product__c',
            type: 'currency',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Year',
            fieldName: Budget_Year__F.fieldApiName,
            //fieldName: 'Budget_Year__c',
            type: 'text',
            sortable: true,
            editable: true,
            initialWidth: this.totalwidth,
        },
        {
            label: 'Status',
            fieldName: Status__F.fieldApiName,
            //fieldName: 'Status__c',
            type: 'text',
            editable: true,
            sortable: true,
            initialWidth: this.totalwidth,
            cellAttributes: { alignment: 'center' }
    }];
    @track items;
    rowOffset = 0;
    draftValues = [];
    visible = false;
    arr = {      
        Name:'',  
        January__F: 0,
        February__F: 0,
        March__F: 0,
        April__F: 0,
        May__F: 0,
        June__F: 0,
        July__F: 0,
        August__F: 0,
        September__F: 0,
        October__F: 0,
        November__F: 0,
        December__F: 0
    }; 
    record

    @wire(getTransactions)
    cons(result) {
        console.log('Tesing.....');
        this.items = result;
        console.log('Data : ',result);
        if (result.error) {
            this.items = undefined;
        }
    };
        
        // connectedCallback(){
        //     getTransactions({recordId :this.recordId})
        //         .then(result => {
        //             console.log(result);
        //             this.items = result;
    
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // }
    
    increaseRowOffset() {
        this.rowOffset += 10;
    }

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;
        // Prepare the record IDs for getRecordNotifyChange()
        const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
        try {
            // Pass edited fields to the updateTransactions Apex controller
            const result = await updateTransaction({data: updatedFields});
            console.log(JSON.stringify("Apex update result: "+ result));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Budget updated',
                    variant: 'success'
                })
            );
            // Clear all draft values in the datatable
            this.draftValues = [];
            // Refresh LDS cache and wires
            return this.refresh();   
            //getRecordNotifyChange(notifyChangeIds);
            // Display fresh data in the datatable
        }
        catch(error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,//'Error in Updating Budge',//error.body.message,
                    variant: 'error'
                })
            );
        };
    }
    
    async refresh() {
        console.log('adffdgd');
        await refreshApex(this.items);
    }

    show(){
        this.visible = true;
    }

    balanceId(event){
        this.arr.Name  = event.target.value;
    }
    jan(event){
        this.arr.January__F = event.target.value;
    }
    feb(event){
        this.arr.February__F = event.target.value;
    }
    march(event){
        this.arr.March__F = event.target.value;
    }
    april(event){
        this.arr.April__F = event.target.value;
    }
    may(event){
        this.arr.May__F = event.target.value;
    }
    jun(event){
        this.arr.June__F = event.target.value;
    }
    jul(event){
        this.arr.July__F = event.target.value;
    }
    aug(event){
        this.arr.August__F = event.target.value;
    }
    sept(event){
        this.arr.September__F = event.target.value;
    }
    oct(event){
        this.arr.October__F = event.target.value;
    }
    nov(event){
        this.arr.November__F = event.target.value;
    }
    dec(event){
        this.arr.December__F = event.target.value;
    }
    addRow(){
        console.log('1 data.. : ',this.items);
        this.arr.Id = 'newRecord';
        var i = this.items.data.length
        console.log('length : ',i);
        this.record = this.items.data;
        this.items.data.push(this.arr);//this.items.data = 
        //this.items.data[i].push(this.arr);
        console.log('2 data.. : ',this.items);

        // console.log('data : ',this.arr);
        // addData({ budget: this.arr })
        //     .then((result) => {
        //         console.log('Id : ',result);
        //         this.error = undefined;
        //     })
        //     .catch((error) => {
        //         this.error = error;
        //         console.log('Error : ',error);
        //     });
        //     this.visible = false;
            //return this.refresh();
            
    }
    close()
    {
        this.visible = false;
    }

}