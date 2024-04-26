public with sharing class getLead {
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLead(){
       return[select Id,Name,Email,MobilePhone from Lead order by CreatedDate desc limit 10];
    }
}
