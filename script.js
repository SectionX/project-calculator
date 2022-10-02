// functions



function evaluate(e, str = field.textContent+" ") {
    while (str.match(/\(/)) {
        let propenindex = Array.from(str.matchAll(/\(/g));
        propenindex = propenindex[propenindex.length-1].index
        let prcloseindex = str.match(/\)/).index;
        parenthesiscontent = str.slice(propenindex+1, prcloseindex)
        str = str.replace(`(${parenthesiscontent})`, evaluate(e, parenthesiscontent))
    }

    while (str.match(/[\^√]/)) {
        pattern = /(\d*\.?\d*)([\^√])(\d+\.?\d*)(?=[^\^])/g
        let digits = Array.from(str.matchAll(pattern))[Array.from(str.matchAll(pattern)).length - 1]
        let digit1 = digits[1]
        let digit2 = digits[3]
        let operator = digits[2]
        str = str.replace(pattern, function_map[operator](+digit1, +digit2))

    }

    while (str.match(/[*\/%]/)) {
        pattern = /(\d+\.?\d*)([*\/%])(\d+\.?\d*)/g
        let digits = Array.from(str.matchAll(pattern))[0]
        let digit1 = digits[1]
        let digit2 = digits[3]
        let operator = digits[2] 
        str = str.replace(pattern, function_map[operator](+digit1, +digit2))
    }


    while (str.match(/[+-]/)) {
        pattern = /(\d+\.?\d*)([+-])(\d+\.?\d*)/g
        let digits = Array.from(str.matchAll(pattern))[0]
        let digit1 = digits[1]
        let digit2 = digits[3]
        let operator = digits[2] 
        str = str.replace(pattern, function_map[operator](+digit1, +digit2))
    }
    return((Math.floor(Number(str)*10000)/10000).toString().trim())
}

function add(a,b) {return a+b;}
function subtract(a,b) {return a-b;}
function multiply(a,b) {return a*b;}
function divide(a,b) {return a/b;}
function pow(a,b) {return Math.pow(a,b).toString();}
function rt(a,b) {return a ? Math.pow(b, 1/a) : Math.pow(b, 0.5);}
function mod(a,b) {return a%b;}



function clearall() {field.textContent = "";}
function clearentry() {field.textContent = field.textContent.slice(0,-2)}


// delarations

const function_map = {
    '+' : add,
    '-' : subtract,
    '*' : multiply,
    '/' : divide,
    '^' : pow,
    '√' : rt,
    '%' : mod
};

const digits = {
    'one': '1', 
    'two': '2', 
    'three': '3', 
    'four': "4",
    'five': "5", 
    'six': "6", 
    'seven': "7", 
    'eight': "8",
    'nine': "9",
    'zero': "0"
}

const operator_buttons = {
    'plus': "+", 
    'minus': "-",
    'division': "/",
    'multiplication': "*", 
    'pow': "^",
    'root': "√", 
    'leftbracket': "(",
    'rightbracket': ")",
    'comma': ".",
    'modulus': "%", 

};

const keydown_operator_map = {
    "+" : "+",
    "-" : "-" ,
    "*" : "*",
    "/" : "/",
    "%" : "%",
    "^" : "^",
    " " : "",
    "(" : "(",
    ")" : ")"
};


const function_buttons = {
'equals': () => field.textContent = evaluate(),
'clearentry': clearentry, 
'clearall': clearall
}

const digitbuttons = Object.keys(digits).map(id => 
    document.querySelector(`#${id}`));

const operatorbuttons = Object.keys(operator_buttons).map(id => 
    document.querySelector(`#${id}`));

const functionbuttons = Object.keys(function_buttons).map(id => 
    document.querySelector(`#${id}`));

const field = document.querySelector('p.inputfield');
    


// event handlers

digitbuttons.forEach(button => 
    button.addEventListener("click", () => {
        field.textContent += digits[button.getAttribute("id")];
    }));

operatorbuttons.forEach(button => 
    button.addEventListener("click", () => {
        field.textContent += operator_buttons[button.getAttribute("id")];
        const nums = field.textContent.split(" ");
    let lastnum = nums[nums.length-1];
        if (lastnum.slice(0,-1).match(/\./) && field.textContent[field.textContent.length-1] == ".") {
            console.log('true')
            field.textContent = (field.textContent.slice(0,-1));}
    }));

functionbuttons.forEach(button => 
    button.addEventListener("click", 
        function_buttons[button.getAttribute("id")]
    ));


window.addEventListener('keydown', (e) => {
    event.preventDefault()
    if (e.key == 'Space') {return false;}
    field.textContent += !isNaN(Number(e.key)) ? e.key : "";
    const nums = field.textContent.split(" ");
    let lastnum = nums[nums.length-1];
    field.textContent += ((e.key == ',' || e.key == ".") && !lastnum.match(/\.+/)) ? '.' : "";
    field.textContent += (Object.keys(keydown_operator_map).some(el => {return el == e.key})) ? keydown_operator_map[e.key] : "";
    if (e.key == "Enter") { 
        field.textContent = evaluate();
    }
    if (e.key == "Backspace") {
        clearentry();
    }
    field.textContent = field.textContent.replace(" ", "")
    if (lastnum.slice(0,-1).match(/\./) && field.textContent[field.textContent.length-1] == ".") {field.textContent = field.textContent.slice(0,-2);}
    
});