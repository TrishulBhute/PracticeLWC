import { LightningElement,wire } from 'lwc';
import {gql,graphql} from 'lightning/uiGraphQLApi';
export default class CarDataTable extends LightningElement {

    errors;
    accounts;
    @wire(graphql,{
        query:gql`
        query AccountInfo{
            uiapi{
                query{
                    Car_Data__c(first:5){
                        edges{
                            node{
                                Id
                                Name{
                                    value
                                    displayValue
                                    }
                                    Price__c{
                                        value
                                        displayValue
                                        }  
                                      }
                                    }
                                }
                            }
                        }
                    }
                 `
    }) getAccounts({data,errors}){
        if(data){
           this.accounts=data.uiapi.query.Car_Data__c.edges.map((edge)=> edge.node);
          }
          if(errors){
              this.errors=errors;
          }
      }

}