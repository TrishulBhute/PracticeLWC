import { LightningElement } from 'lwc';
import id from '@salesforce/user/Id';
export default class LwcProject extends LightningElement {
    Name='Trishul';
    phone='8788213377';
    email='trishulbhute@gmail.com';
    userid=id;
    onChange(){
        console.log('proper');
        this.Name='Trshul Bhute';
    }
}