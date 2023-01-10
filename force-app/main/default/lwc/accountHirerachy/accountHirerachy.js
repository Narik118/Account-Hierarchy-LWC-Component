import { LightningElement,api,track, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'; 
import getChildAccounts from '@salesforce/apex/AccountHirerachy.getChildAccounts';
import getParentAccount from '@salesforce/apex/AccountHirerachy.getParentAccount';

export default class AccountHirerach extends NavigationMixin(LightningElement) {
    @api recordId;
    @track childAccList;
    @track parentAcc;
    @track parentAccId;

    @wire(getParentAccount, {CurrentRecId:'$recordId'})
    getParentAcc({data, error}){
        if(data){
            this.parentAcc=data;
            //this.parentAcc=data[0].Parent.Name;
           // this.parentAccId = data[0].ParentId;
            //console.log(data[0].Parent.Name);
            
        }
        else{
            console.log(error);
        }
    }
   

    @wire (getChildAccounts, {CurrentRecId:'$recordId'})
    getChildAccList({data, error}){
        if(data){
            this.childAccList = data;
        }
        else{
            console.log(error);
        }
    }
    
    // to navigate to record detail page
    viewRecordFun(event) {
        // Navigate to Account record page
       // alert(event.target.value)
       //console.log(event.target.value); 
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Account',
                actionName: 'view'
            },
        });
    }

}


// Getting child accounts - done
// Next step is to build UI and figure how to make account names as hyper links
// / = "Acc.Id" works but how to implement
// Next get parent hirerachy

// Check if any child accounts are parent to someother accounts then make that child account as accordian and show its child
