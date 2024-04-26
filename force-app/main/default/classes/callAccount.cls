public with sharing class callAccount {
   @AuraEnabled(cacheable=true)
   public static List<Account> getCallAccount(){
    try {
        return[select id,name,(select id,name from contacts ) from Account];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
    

}

