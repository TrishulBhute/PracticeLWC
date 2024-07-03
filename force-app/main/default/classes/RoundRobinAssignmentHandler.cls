public class RoundRobinAssignmentHandler {

    public static void handleBeforeInsert(List<Case> newCases) {
        // Fetch active Case Routing records
        List<Case_Routing__c> activeCaseRoutings = [
            SELECT Id, Admission_Sub_Categorious__c, User__c, IsActive__c, Queue_Name__c
            FROM Case_Routing__c
            WHERE IsActive__c = true
        ];

        // Exit if no active Case Routing records are found
        if (activeCaseRoutings.isEmpty()) {
            return;
        }

        // Initialize a map to store user assignments
        Map<Id, List<String>> userAssignmentsMap = new Map<Id, List<String>>();
        Set<String> userIdStringsSet = new Set<String>();

        // Populate the map with user IDs from the Case Routing records
        for (Case_Routing__c routing : activeCaseRoutings) {
            List<String> userIdStrings = routing.User__c.split(';');
            userAssignmentsMap.put(routing.Id, userIdStrings);
            userIdStringsSet.addAll(userIdStrings);
        }

        // Static variable to maintain the round-robin state
        RoundRobinState.initialize();

        Integer totalUsers = userIdStringsSet.size();
        Map<Id, String> userMap = new Map<Id, String>();

        List<User> users = [SELECT Id, Name FROM User WHERE Name IN :userIdStringsSet];
        for (User u : users) {
            userMap.put(u.Id, u.Name);
        }

        Map<String, Integer> count = new Map<String, Integer>();
        List<AggregateResult> results = [SELECT COUNT(Id), OwnerId FROM Case WHERE OwnerId IN :userMap.keySet() GROUP BY OwnerId];

        for (AggregateResult result : results) {
            Id ownerId = (Id) result.get('OwnerId');
            count.put(userMap.get(ownerId), (Integer) result.get('expr0'));
        }

        // Ensure all relevant users have a count initialized
        for (User u : users) {
            if (!count.containsKey(u.Name)) {
                count.put(u.Name, 0);
            }
        }

        for (Case newCase : newCases) {
            // Determine the appropriate user assignment list
            if (totalUsers > 1) {
                Id selectedId;
                Integer minCount;
                for (User ur : users) {
                    if (selectedId == null || count.get(ur.Name) < minCount) {
                        minCount = count.get(ur.Name);
                        selectedId = ur.Id;
                    }else if(selectedId == null || count.get(ur.Name) == minCount){
                        minCount = count.get(ur.Name);
                        selectedId = ur.Id;
                    }
                }
                newCase.OwnerId = selectedId;
                // Increment the count for the selected user
                count.put(userMap.get(selectedId), count.get(userMap.get(selectedId)) + 1);
            } else {
                newCase.OwnerId = users[0].Id;
            }
        }
    }
}