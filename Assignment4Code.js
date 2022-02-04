// ASIGNMENT #4 code

//Author Info
console.log("Prepared by: James ");
console.log("Student Number: ");
console.log("Date Completed: 12-04-2021");

//ASSIGNMENT CODE BEGINS HERE

//This is the code that handles all the functions for an ATM example. 

// List of accounts available to look at. Checking is a default and everyone will have it. Other accounts are optional
var bWayne = new Account('Bruce', 'Wayne', 10101, 1894, true, 357569.22, true, 50002375.62, true, 25907.80, 150000, true, 95350.58, 500000);
var hQuinn = new Account('Harleen', 'Quinzel', 12345, 1234, true, 25.69, false, 0, true, 15166.66, 75000, true, 99690.69, 300000);
var jGordon= new Account('Jim', 'Gordon', 45678, 2956, true, 3899.76, true, 7898.55, true, 1800, 5000, false, 0, 0);
var tDrake = new Account('Tim', 'Drake', 99999, 2209, true, 2659.88, false, 0, false, 0, 0, true, 7515.26, 10000);
var sKyle = new Account('Selina', 'Kyle', 13579, 1708, true, 13524.89, true, 65237.99, true, 652.34, 5000,false, 0,0);

// Global Variables
var accountNames = [bWayne, hQuinn, jGordon, tDrake, sKyle];
var user; // This represents the account that logs in
var transactionReciept =[]; //This will be used to store trasactions the user makes

// Function to login into the ATM using an account number since the debit card is unavailable
function userName(){
  var accountInput = +prompt("What is your 5-digit account number?");
  for (i=0; i < accountNames.length; i++){
    if (accountInput == accountNames[i].custNum){
      user = accountNames[i];
   }
  }
  //If the user enters an incorrect account number, they can try again
  if (user == undefined){
    alert("This is not an account at this bank! Please try again.");
    userName();
  }
}

//This function will show the accounts info of the user who is logged in.
function showAmounts(user) {
  document.getElementById('paraName').innerHTML = "Welcome to the ATM, " + user.firstName + " " + user.lastName;

  document.getElementById('checkBalance').innerHTML = "Current Balance: $" + user.checkBal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  // The ending of each of the balance lines is to format the numbers with commas and 2 decimals
  
  // User must have the default checking account but the other 2 are optional
  if (user.savings){
    document.getElementById('savBalance').innerHTML = "Current Balance: $" + user.saveBal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }else{
    document.getElementById('savBalance').innerHTML = "You do not have this type of account. Please come into the branch and talk to our representative to set it up.";
  }

  if (user.lowIntCC) {
    if (user.lowCCBal < 0){
      document.getElementById('lowccBal').innerHTML = "This credit card has been overpayed by the following amount: $" + Math.abs(user.lowCCBal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      document.getElementById('lowIntRate').innerHTML = ""
      document.getElementById('lowCCMax').innerHTML = ""
    } else {
      document.getElementById('lowccBal').innerHTML = "Current Balance to be paid: $" + user.lowCCBal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      let lowIntPay = user.lowCCBal*user.lowIntRate
      document.getElementById('lowIntRate').innerHTML = "The Interest Rate for this card is 25%. Interest to be paid if the debt is not paid by the deadline: $" + lowIntPay.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      document.getElementById('lowCCMax').innerHTML = "The maximum limit for this card is: $" + user.lowIntMax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } 
  }else{
      document.getElementById('lowccBal').innerHTML = "You do not have this type of account. Please come into the branch and talk to our representative to set it up.";
  }

  if (user.highIntCC) {
    
    if (user.highCCBal < 0){
      document.getElementById('highccBal').innerHTML = "This credit card has been overpayed by the following amount: $" + Math.abs(user.highCCBal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      document.getElementById('highIntRate').innerHTML = ""
      document.getElementById('highCCMax').innerHTML = ""
    } else {
      document.getElementById('highccBal').innerHTML = "Current Balance to be paid: $" + user.highCCBal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      let highIntPay = user.highCCBal*user.highIntRate
      document.getElementById('highIntRate').innerHTML = "The Interest Rate for this card is 45%. Interest to be paid if the debt is not paid by the deadline: $" + highIntPay.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      document.getElementById('highCCMax').innerHTML = "The maximum limit for this card is: $" + user.highIntMax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } 
  }else{
      document.getElementById('highccBal').innerHTML = "You do not have this type of account. Please come into the branch and talk to our representative to set it up.";
  }
}

// Function to deposit cash into user's checking account
function deposit() {
  let curBal = user.checkBal;
  let deposit = +prompt("How much would you like to deposit?");
  if(deposit < 0){
    alert('Amounts must be a positive number')
  }else{
    user.checkBal = parseFloat(curBal) + deposit;
    showAmounts(user);
    transRec(deposit, 'deposited', 'cash in', 'your checking account');
  }
}

// Function to withdraw cash from user's checking account. And warnings to stop them from overdraft over entering a negative number.
function withdraw(){
  let curBal = user.checkBal;
  let withdraw = +prompt("How much would you like to withdraw?");
  if ( withdraw < 0){
    alert('Amounts must be a positive number')
  } else{
    if ( withdraw > curBal){
      alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
    } else {
      user.checkBal = parseFloat(curBal) - withdraw;
      showAmounts(user);
      transRec(withdraw, 'withdrawn', 'your checking account in', 'cash')
    }
  }
}

// Function to add money to your savings account from your checking account
function toSavings(){
 if (user.savings){   
    let chqBal = user.checkBal;
    let savings = user.saveBal;
    let transfer = +prompt("How much would you like to send from your checking account to your savings account?");
    if (transfer < 0){
      alert('Amounts must be a positive number')
    }else{
      if ( transfer > chqBal){
        alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
      } else {
        user.checkBal = parseFloat(chqBal) - transfer;
        user.saveBal = parseFloat(savings) + transfer;
        showAmounts(user);
        transRec(transfer, 'transferred', 'your cheking account', 'your savings account');
      }
    }
  }else{
    errorAlert()
  }

}

// Function to pay you low interest credit card off with your checking account.
function paylowCC(){
  if(user.lowIntCC){  
    let chqBal = user.checkBal;
    let ccAmt = user.lowCCBal;
    let transfer = +prompt("How much would you like to pay down your low interest credit card from your checking account?");
    if (transfer < 0){
      alert('Amounts must be a positive number')
    }else {
      if ( transfer > chqBal){
        alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
      } else {
        user.checkBal = parseFloat(chqBal) - transfer;
        user.lowCCBal = parseFloat(ccAmt) - transfer;
        showAmounts(user);
        transRec(transfer, 'transferred', 'your checking account', 'pay down your low interest credit card');
      }
    }
  }else{
    errorAlert()
  } 
}

// Function to pay you high interest credit card off with your checking account.
function payhighCC(){
  if(user.highIntCC){  
    let chqBal = user.checkBal;
    let ccAmt = user.highCCBal;
    let transfer = +prompt("How much would you like to pay down your high interest credit card from your checking account?");
    if (transfer < 0){
      alert('Amounts must be a positive number')
    }else {
      if ( transfer > chqBal){
        alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
      } else {
        user.checkBal = parseFloat(chqBal) - transfer;
        user.highCCBal = parseFloat(ccAmt) - transfer;
        showAmounts(user);
        transRec(transfer, 'transferred', 'your checking account', 'pay down your high interest credit card');
      }
    }
  }else{
    errorAlert()
  }
}

// Function to add money to your savings account from your checking account
function toChecking(){
  if (user.savings){
    let savings = user.saveBal;
    let chqBal = user.checkBal;
    let transfer = +prompt("How much would you like to send from your savings account to your checking account?");
    if (transfer < 0){
      alert('Amounts must be a positive number')
    }else {
      if ( transfer > savings){
        alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
      } else {
        user.checkBal = parseFloat(chqBal) + transfer;
        user.saveBal = parseFloat(savings) - transfer;
        showAmounts(user);
        transRec(transfer, 'transferred', 'your savings account', 'your checking account');
      }
    }
  }else{
    errorAlert()
  }  
}

// Function that will let you withdraw cash from your low interest credit card
function ccLowToCash(){
  if (user.lowIntCC){ 
    let ccAmt = user.lowCCBal;
    let withdraw = +prompt("How much would you like to withdraw from your low interest credit card?");
    if (ccAmt + withdraw > user.lowIntMax){  //To make sure the maximum borrow limit is not exceeded
      alert("This transaction cannot be completed because it will exceed the credit cards maximum borrow limit.")
    } else {
      if (withdraw < 0) {
        alert('Amounts must be a positive number');
      }else {
        user.lowCCBal = parseFloat(ccAmt) + withdraw;
        showAmounts(user);
        transRec(withdraw, 'withdrawn', 'your low interest credit card', 'cash');
      }
    }
  }else {
    errorAlert()
  }
}

// Function that will let you withdraw cash from your high interest credit card
function ccHighToCash(){
  if (user.highIntCC){ 
    let ccAmt = user.highCCBal;
    let withdraw = +prompt("How much would you like to withdraw from your high interest credit card?");
    if (ccAmt + withdraw > user.highIntMax){ //To make sure the maximum borrow limit is not exceeded
      alert("This transaction cannot be completed because it will exceed the credit cards maximum borrow limit.")
    } else {
      if (withdraw < 0) {
        alert('Amounts must be a positive number');
      }else {
        user.highCCBal = parseFloat(ccAmt) + withdraw;
        showAmounts(user);
        transRec(withdraw, 'withdrawn', 'your high interest credit card', 'cash');
      }
    } 
  }else {
    errorAlert()
  }
}

// Function that will let you pay off you low interest credit card from your savings account.
function savingsToLowCC(){
  if (user.savings && user.lowIntCC){
    let savings = user.saveBal;
    let ccAmt = user.lowCCBal;
    let transfer = +prompt("How musch would you like to transfer from your savings account to pay off your low interest credit card?");
    if (transfer < 0){
      alert('Amounts must be a positive number')
    }else {
      if (savings>transfer){
        user.saveBal = savings - transfer;
        user.lowCCBal = ccAmt - transfer;
        showAmounts(user);
        transRec(transfer, 'transferred', 'your savings account', 'pay down your low interest credit card');
      } else{
        alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
      }
    }
  } else{
    errorAlert()
  }
}
// Function that will let you pay off you low interest credit card from your savings account.
function savingsToHighCC(){
  if (user.savings && user.highIntCC){
    let savings = user.saveBal;
    let ccAmt = user.highCCBal;
    let transfer = +prompt("How musch would you like to transfer from your savings account to pay off your high interest credit card?");
    if (transfer < 0){
      alert('Amounts must be a positive number')
    }else {
      if (savings>transfer){
        user.saveBal = savings - transfer;
        user.highCCBal = ccAmt - transfer;
        showAmounts(user);
        transRec(transfer, 'transferred', 'your savings account', 'pay down your high interest credit card');
      } else{
        alert("We're sorry, you do not currently have the funds in this account to make this transaction.");
      }
    }
  } else{
    errorAlert()
  }
}

// displays an error message if user trys to transfer funds in/out of a account they do not have
function errorAlert(){
  alert("You do not have the proper accounts to perform this transaction. Please come into the branch and talk to our representative to set it up.");
}

// Function to print a reciept for the user but won't actually print anyting
function print(){
  alert("Thank you for banking with us today. Don't forget your reciept and have a nice day.")
}

// Function that will take a record of user transactions and add them to the reciept
function transRec(dollars, transfer, acct1,acct2){
  if (dollars > 0){
    let format = dollars.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let str = ` ${transCounter}. You have ${transfer} $${format} from ${acct1} to ${acct2}`
    transactionReciept.push(str);
    document.getElementById('recHistory').innerHTML = transactionReciept
    transCounter += 1
  }
}

// This is the first line of the code. This is the function to start the login
userName();

// To make sure the PIN the user enters, matches the PIN on their account. 3 chances to do it.
for (i=3; i > 0; i--){
  var password = +prompt('What is your 4 digit PIN? You have ' + i + " chance(s) left.");
  if(password == user.PIN){
    showAmounts(user);
    break;
  }
  // If they fail, no info shows and the buttons will not work
  if (i==1){
    document.getElementById('paraName').innerHTML = "You have failed all of your attempts to access this account. You will need to come into the branch to try again.";
    document.getElementById('checkHeader').innerHTML = "";
    document.getElementById('savHeader').innerHTML = "";
    document.getElementById('ccHeader').innerHTML = "";
    user = 0
  }
}

// To generate the user info on the reciept
document.getElementById('recName').innerHTML = `Name: ${user.firstName} ${user.lastName}`;
var acctStar = user.custNum.toString();
var partNum = acctStar.substring(3);
document.getElementById('recNum').innerHTML = `Account Number: ***${partNum}`;
document.getElementById('recDate').innerHTML = "Date: " + new Date
var transCounter = 1; //transactions counter






