import { LightningElement,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveAppointment from '@salesforce/apex/AppointmentFormController.saveAppointment';
import searchContacts from '@salesforce/apex/AppointmentFormController.searchContacts';
import checkDuplicateAppointment from '@salesforce/apex/AppointmentFormController.checkDuplicateAppointment';
import getAvailableSlots from '@salesforce/apex/AppointmentFormController.getAvailableSlots';
export default class AppointmentForm extends LightningElement {
    @track searchTerm = '';
    @track contacts = [];
    @track selectedContact;
    @track error;
    @track Subject;
    @track date;
    @track time;
    @track Description;
    @track checkValidity = false;
    @track availableSlots;


    get hasResults() {
        return this.contacts.length > 0;
    }

    get isSelected() {
        return this.selectedContact !== undefined;
    }

    get isDisabled() {
      if(this.checkValidity) {
          return false;
      }
      return true;
    }
    
    @wire(getAvailableSlots)
    wiredAvailableSlots({ error, data }) {
        if (data) {
           let result = data.map(res => {
                    return {
                        ...res,
                        Start_Time__c: this.millisecondsToTimeString(res.Start_Time__c),
                        End_Time__c: this.millisecondsToTimeString(res.End_Time__c)
                    };
                });
            this.availableSlots = result;
        } else if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
    
    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        if (this.searchTerm.length >= 2) {
            this.handleSearch();
        } else {
            this.contacts = [];
        }
    }

    handleSearch() {
        searchContacts({ searchTerm: this.searchTerm })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = [];
            });
    }

    handleSelect(event) {
        const contactId = event.currentTarget.dataset.id;
        this.selectedContact = this.contacts.find(contact => contact.Id === contactId);
        this.contacts = [];
        this.searchTerm = this.selectedContact.Name;
    }

    handleRemove() {
        this.selectedContact = undefined;
        this.searchTerm = '';
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
        this.isFormValid();
    }

    handleSubmit() {
        if (this.isFormValid()) {
            const dateValue = this.date;
            const timeValue = this.time;
            let timeStringToSeconds = this.timeStringToSeconds(timeValue);

            if (!this.isAppointmentTimeValid(dateValue, timeValue)) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Selected appointment time is not within the available slots.',
                        variant: 'error'
                    })
                );
                return;
            }
            
            checkDuplicateAppointment({ dates: dateValue, times: timeStringToSeconds })
                .then(isDuplicate => {
                    if (isDuplicate) {
                        this.checkValidity = false;
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error',
                                message: 'An appointment already exists for the selected date and time.',
                                variant: 'error'
                            })
                        );
            } else {
            let timeStringToSeconds2 = this.timeStringToSeconds(timeValue);
            saveAppointment({
                contactId: this.selectedContact.Id,
                subject: this.Subject,
                dates: dateValue,
                times: timeStringToSeconds2,
                description: this.Description
            })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Appointment saved successfully',
                        variant: 'success'
                    })
                );
                this.resetForm();
            })
            .catch(error => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Error',
                                    message: error.body.message,
                                    variant: 'error'
                                })
                            );
                        });
                    }
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please fill in all required fields',
                    variant: 'error'
                })
            );
        }
    }

    isAppointmentTimeValid(date, time) {
        for (let slot of this.availableSlots) {
        //  let timeStart = this.millisecondsToTimeString(slot.Start_Time__c);
        // let timeEnd = this.millisecondsToTimeString(slot.End_Time__c);
            if (new Date(slot.Appointment_Date__c).getTime() === new Date(date).getTime()) {
                const startTime = new Date(`1970-01-01T${slot.Start_Time__c}`);
                const endTime = new Date(`1970-01-01T${slot.End_Time__c}`);
                const appointmentTime = new Date(`1970-01-01T${time}`);

                if (appointmentTime >= startTime && appointmentTime <= endTime) {
                    return true;
                }
            }
        }
        this.checkValidity = false;
        return false;
    }

    millisecondsToTimeString(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;
    let minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    let seconds = (milliseconds / 1000).toFixed(3);

    // Pad hours and minutes with leading zeros if needed
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    // Ensure seconds have two digits before the decimal and three digits after
    if (seconds.indexOf('.') === -1) {
        seconds += '.000';
    } else {
        seconds = seconds.split('.');
        seconds[0] = seconds[0].padStart(2, '0');
        seconds[1] = seconds[1].padEnd(3, '0');
        seconds = seconds.join('.');
    }

    return `${hours}:${minutes}:${seconds}`;
}

timeStringToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);
    return totalSeconds;
}
    isFormValid() {
        let isValid = true;
        if (!this.selectedContact) {
            isValid = false;
        }
        if (!this.Subject) {
            isValid = false;
        }
        if (!this.date) {
            isValid = false;
        }
        if (!this.time) {
            isValid = false;
        }
        if (!this.Description) {
            isValid = false;
        }
        this.checkValidity = isValid;
        return isValid;
    }

    resetForm() {
        this.selectedContact = undefined;
        this.searchTerm = '';
        this.Subject = '';
        this.date = '';
        this.time = '';
        this.Description = '';
        this.checkValidity = false;
    }

   
}