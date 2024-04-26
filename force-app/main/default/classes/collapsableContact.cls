public with sharing class collapsableContact {
    @AuraEnabled(cacheable=true)
    public static List<contact> getContact(string accountid){
        return[select id,FirstName,LastName,Email from Contact where accountId=:accountid limit 5];
    }
    @AuraEnabled(cacheable=true)
    public static List<case> getCase(string accountid){
        return[select id,CaseNumber,Status,Origin from Case where accountId=:accountid limit 5 ];
    }
}
