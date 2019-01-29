const regOperAll = /[\+\-\*\/]/g;
const operators = "/+-*";

let display = document.querySelector("#display");
let eq = '';

document.querySelectorAll(".num, .oper").forEach(b => {
    b.addEventListener("click", () => {
        appendChar(b.textContent);
    });
});

document.querySelector("#bs").addEventListener("click", delChar);

document.querySelector("#cls")
        .addEventListener("click", () => {
            eq = "";
            updateDisplay(eq);
        });

document.querySelector("#eval").addEventListener("click",
                                () => calc(output.textContent));


function calc(input) {
    //TODO: implement this

    output.textContent = punctualize(output.textContent);
}


function punctualize(equation) {
    let nums = equation.split(regOperAll);
    let ops = equation.match(regOperAll);

    nums = nums.map(string => {
        if(string.length === 0) return string;
        if( isNaN(string) ) {
            if(string==='.') return '.';
            else return "ERROR";
        }

        let sides = string.split('.');
        let left = sides[0];
        let right = '';
        if (sides.length === 2) right = '.' + sides[1];

        for(i = left.length-3; i > 0; i -= 3) {
            left = left.slice(0, i) + ',' + left.slice(i);
        }

        return right.length === 0 ? left : left + right;
    });

    let j=0;
    return nums.reduce((a, s) => a + ops[j++] + s);
}

function addDot(string) {
    let i = string.length;
    do {
        i--;
    } while( ! operators.includes(string[i]) && i > 0 );

    if( string.slice(i).includes('.') ) return false;

    return true;
}

function updateDisplay(string) {
    display.textContent = punctualize(string);
}

function appendChar(c) {
    if(operators.includes(c)) {
        let last = eq.slice(-1);
        if(operators.includes(last)) {
            if(c==='-' && last==='-' || c!=='-') return;
        }
    }
    if(c === '.') {
        if( ! addDot(eq) ) return;
    }

    eq += c;
    updateDisplay(eq);
}

function delChar() {
    eq = eq.slice(0, eq.length - 1);
    updateDisplay(eq);
}