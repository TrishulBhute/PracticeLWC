public with sharing class accountWired {
    @AuraEnabled(cacheable=true)
    public static List<Account> getSearchAccount(string keySearch) {
          String key='%'+keySearch+'%'   ;
          return[select id,name from account where name like:key limit 3];
    }
   
}
