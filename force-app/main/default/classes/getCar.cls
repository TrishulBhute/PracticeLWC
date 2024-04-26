public with sharing class getCar {
    @AuraEnabled(cacheable=true)
    public static List<Car_Data__c> carData(){
      return[select id ,Name,Car_Image_Url__c,Price__c from Car_Data__c ORDER BY Name asc]; 
    }
    
}
