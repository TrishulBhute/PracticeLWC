import { LightningElement,wire,track } from 'lwc';
import getSearchAccount from '@salesforce/apex/accountWired.getSearchAccount'

const Delay=300;
export default class WireInput extends LightningElement {
   @track recordsList;
   @track keySearch="";
   @track selectedValue ;
//  @wire(getSearchAccount,{keySearch:'$keySearch'}) Accounts;
//  accounttid;
 selectedRecordId;
 
 handleChange(event){
     window.clearTimeout(this.delayTimeout);
     const keySearch=event.target.value;
     
     this.delayTimeout = setTimeout(() => {
        this.keySearch= keySearch;
    }, Delay);
 }
//  handleClick(event){
//     event.preventDefault();
//     this.accounttid=event.target.dataset.key;
//  }
onRecordSelection(event) {
   event.preventDefault();
   this.selectedRecordId = event.target.dataset.key;
   this.selectedValue = event.target.dataset.name;
   // this.keySearch = "";
   this.onSeletedRecordUpdate();
   }
onLeave() {
      setTimeout(() => {
      this.searchKey = "";
      this.recordsList = null;
      }, 300);
      }
handleKeyChange(event) {
      const keySearch = event.target.value;
      this.keySearch = keySearch;
      this.getLookupResult();
      }
removeRecordOnLookup(event) {
      this.keySearch = "";
      this.selectedValue = null;
      this.selectedRecordId = null;
      this.recordsList = null;
      this.onSeletedRecordUpdate();
      }
getLookupResult() {
      getSearchAccount({ keySearch: this.keySearch})
      .then((result) => {
      if (result.length===0) {
      this.recordsList = [];
      this.message = "No Records Found";
      } else {
      this.recordsList = result;
      this.message = "";
      }
      this.error = undefined;
      })
      .catch((error) => {
      this.error = error;
      this.recordsList = undefined;
      });
      }   
onSeletedRecordUpdate(){
         const passEventr = new CustomEvent('recordselection', {
         detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }
         });
         this.dispatchEvent(passEventr);
         }
    
}