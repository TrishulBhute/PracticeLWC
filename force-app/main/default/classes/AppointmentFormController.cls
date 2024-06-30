public with sharing class AppointmentFormController {
    @AuraEnabled
    public static List<Contact> searchContacts(String searchTerm) {
        String searchQuery = '%' + searchTerm + '%';
        return [SELECT Id, Name FROM Contact WHERE Name LIKE :searchQuery LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Appointment_Slots__c> getAvailableSlots() {
        return [
            SELECT Appointment_Date__c, Start_Time__c, End_Time__c
            FROM Appointment_Slots__c
            WHERE IsActive__c = TRUE
        ];
    }

    @AuraEnabled
    public static Boolean checkDuplicateAppointment(Date dates, Time times) {
        List<Appointment_Details__c> existingAppointments = [
            SELECT Id
            FROM Appointment_Details__c
            WHERE Appointment_Date__c = :dates AND Appointment_Time__c = :times
            LIMIT 1
        ];
        return existingAppointments.size() > 0;
    }

    @AuraEnabled
    public static void saveAppointment(Id contactId, String subject, Date dates, Time times , String description) {
        // Your logic to save the appointment details, for example:
        Appointment_Details__c appointment = new Appointment_Details__c(
            Contact__c = contactId,
            Subject__c = subject,
            Appointment_Date__c = dates,
            Appointment_Time__c = times,
            Description__c = description
        );
        insert appointment;
    }
}