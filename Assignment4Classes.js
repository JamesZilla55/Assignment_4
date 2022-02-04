// ASSIGNMENT #4 - Class component

//Author Info
//Prepared by: James Kehoe
//Student Number: 000870105
//Date Completed: 12-04-2021

//ASSIGNMENT CODE BEGINS HERE

// This file contains the construction of an Account class to be used in the ATM assignment
// Customer Number & PIN go with customer because they are login info for the customer and not stuck with an account for the customer
class Customer {
    constructor (firstName, lastName, custNum, PIN){
        this.firstName = firstName;
        this.lastName = lastName;
        this.custNum = custNum;
        this.PIN = PIN;
    }

    // methods
    changeFName(newFName){
        this.firstName = newFName;
    }

    changeLName(newLName){
        this.lastName = newLName;
    }

    changePIN(newPIN){
        this.PIN = newPIN;
    }


}


class Account extends Customer{
    constructor (firstName, lastName, custNum, PIN, checking, checkBal, savings, saveBal, lowIntCC, lowCCBal, lowIntMax, highIntCC, highCCBal, highIntMax ){
        super(firstName, lastName, custNum, PIN)
        this.checking = checking;
        this.checkBal = checkBal;
        this.savings = savings;
        this.saveBal = saveBal;
        this.lowIntCC = lowIntCC;
        this.lowCCBal = lowCCBal;
        this.lowIntRate = 0.25;
        this.lowIntMax = lowIntMax;
        this.highIntCC = highIntCC;
        this.highCCBal = highCCBal;
        this.highIntRate = 0.45;
        this.highIntMax = highIntMax;
    }  // Interest rates are fixed to the card but the max they borrow can be changed

    //getter
    get totalWorth(){
        return this.checkBal + this.saveBal - this.lowCCBal - this.highCCBal
    }

    //methods
    changeChkBal(newChkBal){
        this.checkBal = newChkBal;
    }

    changeSavBal(newSavBal){
        this.saveBal = newSavBal;
    }

    changeLowCCBal(newCCBal){
        this.lowCCBal = newCCBal;
    }

    changeLowIntMax(newLowMax){
        this.lowIntMax = newLowMax;
    }
    
    changeHighCCBal(newCCBal){
        this.highCCBal = newCCBal;
    }

    changeHighIntMax(newHighMax){
        this.highIntMax = newHighMax;
    }

}
