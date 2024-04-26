public class getCarView {
    @AuraEnabled(cacheable = true)
    public static string getLatestView(){
        string defaultView = 'CarDataTable';
       
        List<carView__mdt> selectedComp = [select Id, component__c  from carView__mdt where DeveloperName = 'Car_View'];
        
        if(selectedComp.size()>0){
            defaultView = selectedComp[0].component__c;
        }
        return defaultView;
    }

}