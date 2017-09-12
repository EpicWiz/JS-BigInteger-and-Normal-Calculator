//calcMain => appears with container and well
//calcWrap => divs that hold all input and buttons
//calc => all buttons
//display, ac, plusMinus, percent, divide, seven, eight, nine, multiply,
//four, five, six, minus, one, two, three, plus, zero, point, equals

let num1 = undefined;
let num2 = undefined;
let num3 = undefined;
let sign = undefined;
let sign2 = undefined;

let display = () => { //updates the number displayed to user
  if (num2 === undefined) {
    $('#display').val(num1);
  } else if (num3 === undefined) {
    $('#display').val(num2);
  } else {
    $('#display').val(num3);
  }
};

let ac = () => { //clears and resets all variables and arrays

  num1 = undefined;
  num2 = undefined;
  num3 = undefined;
  sign = undefined;
  sign2 = undefined;

  $('#display').val('0');
};

let number = (x) => { //builds numbers
  if (num1 === undefined) {
    num1 = x;
    display();
  } else if (sign === undefined) {
    num1 = num1 + x;
    display();
  } else if (num2 === undefined) {
    num2 = x;
    display();
  } else if (sign2 === undefined) {
    num2 = num2 + x;
    display();
  } else {
    num3 = (num3 === undefined) ? x : num3 + x;
    display();
  }
};

let sSign = (x) => { //how to handle the second (or more) signs in a single expression +-*/
  if (sign2 === undefined) {
    if (sign === 'multiply' || sign === 'divide') {
      num1 = (sign === 'multiply') ? num1 * num2 : num1 / num2;
      sign = x;
      num2 = undefined;
      display();
    } else if (x !== 'multiply' && x !== 'divide') {
      num1 = (sign === 'plus') ? +num1 + +num2 : +num1 - +num2;
      sign = x;
      num2 = undefined;
      display();
    } else {
      sign2 = x;
    }
  } else if (num3 !== undefined) {
    num2 = (sign2 === 'multiply') ? num2 * num3 : num2 / num3;
    num3 = undefined;
    sign2 = x;
    if (sign2 !== 'multiply' && sign2 !== 'divide') {
      num1 = (sign === 'plus') ? +num1 + +num2 : +num1 - +num2;
      sign = sign2;
      sign2 = undefined;
      num2 = undefined;
    }
    display();
  } else {
    sign2 = x;
  }
};

let pMinus = () => {
  if (num2 === undefined) {
    num1 = +num1 * -1;
    display();
  } else if (num3 === undefined) {
    num2 = +num2 * -1;
    display();
  } else {
    num3 = +num3 * -1;
    display();
  }
};

//work in progress
// let perCent = () => {
//   if (num2 === undefined) {
//     num1 = +num1 * .01;
//     display();
//   } else if (num3 === undefined) {
//     num2 = +num2 * .01;
//     display();
//   } else {
//     num3 = +num3 * .01;
//     display();
//   }
// };

let signHandler = (x) => { //what to do with selected sign
  switch (x) {
  case 'plusMinus':
    pMinus();
    break;
  case 'percent':
    // perCent();
    break;
  case 'divide':
    if (sign === undefined) {
      sign = 'divide';
    } else {
      sSign('divide');
    }
    break;
  case 'multiply':
    if (sign === undefined) {
      sign = 'multiply';
    } else {
      sSign('multiply');
    }
    break;
  case 'minus':
    if (sign === undefined) {
      sign = 'minus';
    } else {
      sSign('minus');
      }
    break;
  case 'plus':
    if (sign === undefined) {
      sign = 'plus';
    } else {
      sSign('plus');
      }
    break;
    default:
    console.log('An error occured');
  }
};

let total = () => {
  if (num2 === undefined) { //if only 1 number was input
    let x = num1;
    ac();
    num1 = x;
    $('display').val(x);
  } else if (num3 === undefined) { //if two numbers were input
    sign2 = undefined;
    sSign('plus');
    let x = num1;
    ac();
    num1 = x;
    $('#display').val(x);
  } else { // if a third outstanding number was input with two signs
    sSign('plus');
    let x = num1;
    ac();
    num1 = x;
    $('#display').val(x);
  }
};

//first row
$('#ac').on('click', ac);
$('#plusMinus').on('click', () => signHandler('plusMinus'));
$('#percent').on('click', () => signHandler('percent'));
$('#divide').on('click', () => signHandler('divide'));
//second row
$('#seven').on('click', () => number('7'));
$('#eight').on('click', () => number('8'));
$('#nine').on('click', () => number('9'));
$('#multiply').on('click', () => signHandler('multiply'));
//third row
$('#four').on('click', () => number('4'));
$('#five').on('click', () => number('5'));
$('#six').on('click', () => number('6'));
$('#minus').on('click', () => signHandler('minus'));
//fourth row
$('#one').on('click', () => number('1'));
$('#two').on('click', () => number('2'));
$('#three').on('click', () => number('3'));
$('#plus').on('click', () => signHandler('plus'));
//fifth row
$('#zero').on('click', () => number('0'));
$('#point').on('click', () => number('.'));
$('#equals').on('click', total);


//START BIG-INT calculations
var type = 'exponent';

function bigExponent() {
let myInt = +$('#firstNum').val();
let myPow = +$('#secondNum').val();

let currentN = '1';
let newN = '';
let carry = '';

for (var i = 1; i < myPow + 1; i++) {
  for (var j = currentN.length - 1; j > -1; j--) {
    let addCarry = (carry) ? +carry : 0;
    let multiplyIndex = (+currentN.charAt(j) * myInt + addCarry).toString();

    if (multiplyIndex.length > 1) {
      carry = multiplyIndex.slice(0, -1);
      newNumChar = multiplyIndex.slice(- 1);
      newN = newNumChar + newN;
    } else {
      carry = '';
      newN = multiplyIndex + newN;
    }
  }
  currentN = carry + newN;
  newN = '';
  carry = '';
}

// let finalSum = 0;
// for (var i = 0; i < currentN.length; i++) {
//   finalSum += +currentN[i];
// }
// console.log(currentN);
// console.log(finalSum);
  $('#bigInteger').html('<p>' + currentN + '</p>');
}

function multiplyAny() {
let topNum = $('#firstNum').val();
let bottomNum = $('#secondNum').val();

let newN = '';
let carry = '';
let addArray = [];

let numZeroes = '';

for (var i = bottomNum.length - 1; i > -1; i--) {
  (numZeroes) ? newN = numZeroes : i;
  for (var k = topNum.length - 1; k > -1; k--) {
    let addCarry = (carry) ? +carry : 0;
    let multiplyIndex = (+bottomNum.charAt(i) * +topNum.charAt(k) + addCarry).toString();
    if (multiplyIndex.length > 1) {
      carry = multiplyIndex.slice(0, -1);
      newNumChar = multiplyIndex.slice(- 1);
      newN = newNumChar + newN;
    } else {
      carry = '';
      newN = multiplyIndex + newN;
    }
  }

  if (i === 0) {
    newN = carry + newN;
    addArray.push(newN);
    newN = '';
    numZeroes = '';
  } else {
    newN = carry + newN;
    addArray.push(newN);
    numZeroes += '0';
    carry = '';
  }
}

let bigIntAnswer = ''
let finalCarry = '';
let finalCounter = 0;
let longest = addArray.reduce(function (a, b) { return a.length > b.length ? a : b; });
let indexPos = -1;

for (var l = 0; l < longest.length; l++) {
  for (var v = 0; v < addArray.length; v++) {
    finalCounter += (addArray[v].charAt(addArray[v].length + indexPos)) ? +addArray[v].charAt(addArray[v].length + indexPos) : 0;
  }
  indexPos --;
  finalCounter = +finalCarry + finalCounter;
  finalCounter = finalCounter.toString();
  if (finalCounter.length > 1) {
    finalCarry = finalCounter.slice(0, -1);
    bigIntAnswer = finalCounter.slice(- 1) + bigIntAnswer;
    finalCounter = 0;
  } else {
    bigIntAnswer = finalCounter + bigIntAnswer;
    finalCarry = '';
    finalCounter = 0;
  }
  if (l === longest.length - 1) {
    bigIntAnswer = finalCarry + bigIntAnswer;
  }
}
console.log('THE ANSWER: ' + bigIntAnswer);
$('#bigInteger').html('<p>' + bigIntAnswer + '</p>');

}

function bigAc() {
  $('#firstNum').val('');
  $('#secondNum').val('');
  $('#bigInteger').html('');
  console.log('success');
}

$('#bigEquals').on('click', () => {
  (type === 'exponent') ? bigExponent() : multiplyAny();
});
$('#bigAc').on('click', () => bigAc());
$('#sel1').on('change', () => {
  ($('#sel1').val() === 'exponent') ?
    type = 'exponent' :
    type = 'multiply';
});
