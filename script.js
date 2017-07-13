//calcMain => appears with container and well
//calcWrap => divs that hold all input and buttons
//calc => all buttons
//display, ac, plusMinus, percent, divide, seven, eight, nine, multiply,
//four, five, six, minus, one, two, three, plus, zero, point, equals

let num1 = undefined;
let num2 = undefined;
let sign = undefined;
let calcArray = [];

let display = () => { //updates the number displayed to user
  if (num2 === undefined) {
    $('#display').val(num1);
  } else {
    $('#display').val(num2);
  }
};

let ac = () => { //clears and resets all variables and arrays

  num1 = undefined;
  num2 = undefined;
  sign = undefined;
  calcArray = [];

  $('#display').val('0');
};

let number = (x) => { //extends relevant number beyond 1 digit
  if (num1 === undefined) {
    num1 = x;
    display();
  } else if (sign === undefined) {
    num1 = num1 + x;
    display();
  } else if (num2 === undefined) {
    num2 = x;
    display();
  } else {
    num2 = num2 + x;
    display();
  }
};

let fsSign = ()

let signHandler = (x) => {
  switch (x) {
    case 'plusMinus':

    break;
    case 'percent':

    break;
    case 'divide':

    break;
    case 'multiply':

    break;
    case 'minus':

    break;
    case 'plus':

    break;
    case 'point':
    //special case in numbers indexof('.')
    break;
    default:
    console.log('An error occured');
  }
};




















//first row
$('#ac').on('click', ac);
$('#plusMinus').on('click', function(){ console.log('success'); });
$('#percent').on('click', function(){ console.log('success'); });
$('#divide').on('click', function(){ console.log('success'); });
//second row
$('#seven').on('click', () => number('7'));
$('#eight').on('click', () => number('8'));
$('#nine').on('click', () => number('9'));
$('#multiply').on('click', function(){ console.log('success'); });
//third row
$('#four').on('click', () => number('4'));
$('#five').on('click', () => number('5'));
$('#six').on('click', () => number('6'));
$('#minus').on('click', function(){ console.log('success'); });
//fourth row
$('#one').on('click', () => number('1'));
$('#two').on('click', () => number('2'));
$('#three').on('click', () => number('3'));
$('#plus').on('click', function(){ console.log('success'); });
//fifth row
$('#zero').on('click', () => number('0'));
$('#point').on('click', function(){ console.log('success'); });
$('#equals').on('click', function(){ console.log('success'); });
