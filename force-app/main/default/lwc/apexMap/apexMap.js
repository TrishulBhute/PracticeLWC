import { LightningElement } from 'lwc';
import fetchSimpleMap from '@salesforce/apex/apexMapController.fetchSimpleMap';
import fetchListMap from '@salesforce/apex/apexMapController.fetchListMap';
import fetchNestedMap from '@salesforce/apex/apexMapController.fetchNestedMap';

export default class ApexMap extends LightningElement {
    simpleMapStr;
    listOfMapStr;
    nestedMapStr;
    simpleMap = [];
    listOfMap = [];
    nestedMap = [];
    showSimpleMapCard = false;
    showListMapCard = false;
    showNestedMapCard = false;

    handleLoadSimpleMap() {
        fetchSimpleMap().then((result) => {
            console.log('result', result);
            this.simpleMap = [];
            for (var key in result) {
                this.simpleMap.push({ key: key, value: result[key] });
                console.log('key', key, result[key]);
            }
            this.simpleMapStr = JSON.stringify(result, null, 2);
            this.showSimpleMapCard = true;
            this.showListMapCard = false;
            this.showNestedMapCard = false;
        }).catch((error) => {
            console.log(error);
        });
    }
    handleLoadListMap() {
        fetchListMap().then((result) => {
            console.log('result', result);
            this.listOfMap = [];
            let idCounter = 0;
            result.forEach(element => {
                for (var key in element) {
                    this.listOfMap.push({ key: key, value: element[key], Id: idCounter });
                    ++idCounter;
                    console.log('key', key, element[key],idCounter);
                }
            });
            this.listOfMapStr = JSON.stringify(result, null, 2);
            this.showSimpleMapCard = false;
            this.showListMapCard = true;
            this.showNestedMapCard = false;
        }).catch((error) => {
            console.log(error);
        });
    }
    handleNestedMap() {
        fetchNestedMap().then((result) => {
            this.nestedMap = [];
            console.log('result', result);
            for (var key in result) {
                let value = [];
                for (var innerkey in result[key]) {
                    value.push({ key: innerkey, value: result[key][innerkey] });
                }
                this.nestedMap.push({ key: key, value: value })
                console.log('key', key, result[key]);
            }
            this.nestedMapStr = JSON.stringify(result, null, 2);
            this.showSimpleMapCard = false;
            this.showListMapCard = false;
            this.showNestedMapCard = true;
        }).catch((error) => {
            console.log(error);
        });
    }
}