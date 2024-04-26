public with sharing class insertTask {
    @AuraEnabled
    public static List<Task> setTask(string subject,string priority,string type ,String description ,date datet ,List<Lead> reId){
       List<Task> create=new List<Task>();
       for (Lead l : reId) {
           
           Task t=new Task();
           t.Subject=subject;
           t.Description=description;
           t.Priority=priority;
           t.Type= type;
           t.WhoId=l.Id;
           t.OwnerId= UserInfo.getUserId();
           t.ActivityDate=datet;
           
           create.add(t);
        }
        
       
           insert create;
           return create;

       
    }
}
