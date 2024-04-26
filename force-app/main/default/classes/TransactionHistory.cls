public with sharing class TransactionHistory {

    @AuraEnabled(cacheable=true)
    public static List<Company_Budget__c> getTransactions(){
        try {
            return [Select Id, Name, January__c, February__c, March__c, April__c, May__c, June__c, July__c, August__c, September__c, October__c, November__c, December__c, Product__c, User__c, Budget_Year__c, Status__c from Company_Budget__c  WITH SECURITY_ENFORCED];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string updateTransactions(List<Company_Budget__c> data){
        System.debug('Update ....');
         List<Company_Budget__c> accsForUpdate = (List<Company_Budget__c>) JSON.deserialize(
            JSON.serialize(data),
            List<Company_Budget__c>.class);
        try {
            update accsForUpdate;
            return 'Success: Budget updated successfully';
        } catch (Exception e) {
            System.debug('Error : '+e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string addData(Company_Budget__c budget){
        try {
            insert budget;
            return budget.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}