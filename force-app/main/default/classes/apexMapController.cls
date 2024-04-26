public with sharing class apexMapController {
    @AuraEnabled
    public static Map<String,String> fetchSimpleMap(){
        try {
            Map<String,String> simpleMap = new Map<String,String>();
            simpleMap.put('fruit','apple');
            simpleMap.put('vegetable','potato');
            return simpleMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Map<String,String>> fetchListMap(){
        try { 
            List<Map<String,String>> lstofMap = new List<Map<String,String>>();
            Map<String,String> simpleMap1 = new Map<String,String>();
            simpleMap1.put('fruit','apple');
            simpleMap1.put('vegetable','potato');
            lstofMap.add(simpleMap1);
            Map<String,String> simpleMap2 = new Map<String,String>();
            simpleMap2.put('fruit','mango');
            simpleMap2.put('vegetable','Cabbage');
            lstofMap.add(simpleMap2);
            return lstofMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String,Map<String,String>> fetchNestedMap(){
        try { 
            Map<String,Map<String,String>> nestedMap = new Map<String,Map<String,String>>();
            Map<String,String> simpleMap1 = new Map<String,String>();
            simpleMap1.put('fruit','apple');
            simpleMap1.put('vegetable','potato');
            nestedMap.put('map1',simpleMap1);
            return nestedMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}