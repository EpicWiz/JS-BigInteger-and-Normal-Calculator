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

let signHandler = (x) => { //what to do with selected sign
  switch (x) {
  case 'plusMinus':
//sc
    break;
  case 'percent':
//sc
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
    case 'point':
    //special case in numbers indexof('.')
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
$('#point').on('click', () => signHandler('point')); //needs update
$('#equals').on('click', total);
