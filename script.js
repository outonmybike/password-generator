// Assignment code here
// debugger;
var criteria = {
	size: 0,
	lower: false,
	upper: false,
	number: false,
	special: false,
	lowerText: '',
	upperText:'',
	numberText:'',
	specialText:'',
	reset: function() {
		this.lower=false;
		this.upper=false;
		this.number=false;
		this.special=false;
		this.lowerText='';
		this.upperText='';
		this.numberText='';
		this.specialText='';
	}
};

varCritArray = ['lower','upper','number','special']

var probNumber = 0;
var probNumberString = '';
var probability = [];
var passWordArray = [];
var selectionArray = [];
var lowerArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numberArray = ["1","2","3","4","5","6","7","8","9","0"];
var specialArray = ["!","#","$","%","&","\'","(","\"",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"];

var passWordString = ''

var multiply = function(array) {
	var sum=1;
	for (var i=0; i<array.length; i++) {
		sum=sum*array[i];
	}
	return sum;
}

var passwordProbability = function() {
	probability = []
	if (criteria.lower) {
		probability = probability.concat(lowerArray.length)
	}
	if (criteria.upper) {
		probability = probability.concat(upperArray.length)
	}
	if (criteria.number) {
		probability = probability.concat(numberArray.length)
	}
	if (criteria.special) {
		probability = probability.concat(specialArray.length)
	}
	var probLength = probability.length
	for(var i = 0; i < (criteria.size-probLength); i++) {
		probability = probability.concat(selectionArray.length)
	}
	console.log(probability)
	probNumber = multiply(probability)
	console.log(probNumber)
	probNumberString = probNumber.toLocaleString();
	console.log(probNumberString)
}



var constructArray = function() {
	selectionArray = [];
	if(criteria.lower) {
		selectionArray = selectionArray.concat(lowerArray);
	}
	if(criteria.upper) {
		selectionArray = selectionArray.concat(upperArray);
	}
	if(criteria.number) {
		selectionArray = selectionArray.concat(numberArray);
	}
	if(criteria.special) {
		selectionArray = selectionArray.concat(specialArray);
	}
};

var selectChars = function() {
	var criteriaSatisfied = 0;
	while(criteriaSatisfied<4) {
		criteriaSatisfied = 0;
		passWordArray = [];
		for(var i = 0; i < criteria.size; i++) {
			var addArray = [];
			var value = Math.floor(Math.random()*selectionArray.length);
			passWordArray = passWordArray.concat(selectionArray[value]);
		}
		var foundLower = passWordArray.some(r=> lowerArray.includes(r));
		var foundUpper = passWordArray.some(r=> upperArray.includes(r));
		var foundNumber = passWordArray.some(r=> numberArray.includes(r));
		var foundSpecial = passWordArray.some(r=> specialArray.includes(r));	

		if(criteria.lower && !foundLower) {
		}
		else {
			criteriaSatisfied+=1
		}
		console.log(criteriaSatisfied)
		if(criteria.upper && !foundUpper) {
		}
		else {
			criteriaSatisfied+=1
		}
		console.log(criteriaSatisfied)
		if(criteria.Number && !foundNumber) {
		}
		else {
			criteriaSatisfied+=1
		}	
		console.log(criteriaSatisfied)
		if(criteria.Special && !foundSpecial) {
		}
		else {
			criteriaSatisfied+=1
		}	
		console.log(criteriaSatisfied)
	}
	passWordString = passWordArray.join('');
	return passWordString;
}


var getLength = function() { 
	// debugger;
	pwLength = prompt('Enter a length between 8 and 128 for your new password');
	if(!parseInt(pwLength)) {
		alert('Please enter a numerical value');
		getLength();
		return
	}
	if (parseInt(pwLength) < 8 || parseInt(pwLength) > 128) {
		alert('Please enter a whole number between 8 and 128');
		getLength();
		return
	}
	criteria.size = parseInt(pwLength);
};

var getCrit = function() {
	var critCount=0
	console.log(criteria);
	criteria.reset();
	console.log(criteria);
	alert('Next you will decide which of the 4 characters types to include in your password\r\n(You must select at least 1)');
	criteria.lower = confirm('Click "OK" to include at least one LOWER CASE character in your password');
	if (criteria.lower){
		critCount+=1;
		criteria.lowerText = 'LOWER CASE\r\n'
	}
	criteria.upper = confirm('Click "OK" to include at least one UPPER CASE character in your password');
	if (criteria.upper){
		critCount+=1;
		criteria.upperText = 'UPPER CASE\r\n'
	}
	criteria.number = confirm('Click "OK" to include at least one NUMBER in your password');
	if (criteria.number){
		critCount+=1;
		criteria.numberText = 'NUMBER\r\n'
	}
	criteria.special = confirm('Click "OK" to include at least one SPECIAL CHARACTER in your password');
	if (criteria.special){
		critCount+=1;
		criteria.specialText = 'SPECIAL CHARACTER\r\n'
	}
	if(critCount===0) {
		alert('You must select at least one type of character to include in your password. Try again');
		getCrit();
		return;
	}
	if(critCount>1){
		var theS = 's'
	}
	else {
		var theS =''
	}
	// debugger;
	console.log('pre');
	var validateCrit = confirm('You have chosen to include the following character type'+theS+': \r\n'+criteria.lowerText+criteria.upperText+criteria.numberText+criteria.specialText+'Click OK to confirm or CANCEL to reselct');
	console.log('post');
	if(!validateCrit) {
		getCrit();
		return;
	}

	return 
};


var generatePassword = function() {
	getLength();
	getCrit();
	constructArray();
	console.log(selectionArray);
	selectChars();
	console.log(passWordArray);
	passwordProbability();
	return passWordString

};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
