// functions

function evaluate() {field.textContent = "evaluated";}
function clearall() {field.textContent = "";}
function clearentry() {field.textContent = field.textContent.slice(0,-2)}


// delarations

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
    'plus': " + ", 
    'minus': " - ",
    'division': " / ",
    'multiplication': " * ", 
    'pow': "^",
    'root': "√", 
    'leftbracket': "(",
    'rightbracket': ")",
    'comma': ",",
    'modulus': " % ", 

};

const keydown_operator_map = {
    "+" : " + ",
    "-" : " - " ,
    "*" : " * ",
    "/" : " / ",
    "%" : " % ",
    "^" : "^",
    " " : "",
};


const function_buttons = {
'equals': evaluate,
'clearentry': clearentry, 
'clearall': clearall
}

const digitbuttons = Object.keys(digits).map(id => 
    document.querySelector(`#${id}`));

const operatorbuttons = Object.keys(operator_buttons).map(id => 
    document.querySelector(`#${id}`));

const functionbuttons = Object.keys(function_buttons).map(id => 
    document.querySelector(`#${id}`));

const field = document.querySelector('.inputfield');
    


// event handlers

digitbuttons.forEach(button => 
    button.addEventListener("click", () => {
        field.textContent += digits[button.getAttribute("id")];
    }));

operatorbuttons.forEach(button => 
    button.addEventListener("click", () => {
        field.textContent += operator_buttons[button.getAttribute("id")];
    }));

functionbuttons.forEach(button => 
    button.addEventListener("click", 
        function_buttons[button.getAttribute("id")]
    ));


window.addEventListener('keydown', (e) => {
    field.textContent += !isNaN(Number(e.key)) ? e.key : "";
    const nums = field.textContent.split(" ");
    let lastnum = nums[nums.length-1];
    field.textContent += ((e.key == ',' || e.key == ".") && !lastnum.match(",")) ? ',' : "";
    field.textContent += (Object.keys(keydown_operator_map).some(el => {return el == e.key})) ? keydown_operator_map[e.key] : "";
    if (e.key == "Enter") {
        evaluate()
    }
});