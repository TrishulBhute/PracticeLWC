trigger RoundRobinAssignment on Case (before insert) {
    if (Trigger.isBefore && Trigger.isInsert) {
            RoundRobinAssignmentHandler.handleBeforeInsert(Trigger.new);
    }   
}