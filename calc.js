const regOperAll = /[\+\-\*\/]/g;

const display = document.querySelector("#display");
let eq = '';


document.querySelectorAll(".num, .oper").forEach(b => {
	b.addEventListener("click", () => {
		appendChar(b.textContent);
	});
});


document.querySelector("#bs").addEventListener("click", delChar);


document.querySelector("#cls").addEventListener("click", clear);


document.querySelector("#eval").addEventListener("click", displayResults);


window.addEventListener("keydown", k => {
	if(k.key.match(/[0-9*/+-.]/)) {
		appendChar(k.key);
		if(k.key === "/") k.preventDefault();
		return;
	}

	switch(k.key) {
		case "Backspace":
			delChar();
			break;
		case "=":
		case "Enter":
			displayResults();
			break;
		case "Delete":
		case "c":
		case "C":
		case "Escape":
			clear();
	}
});



function displayResults() {
	if(eq.slice(-1).match(regOperAll)) return;

	eq = calc(eq);
	updateDisplay(eq);
}


function clear() {
	eq = "";
	updateDisplay(eq);
}


function calc(input) {
	let preNums = input.match(/-?\d*\.?\d*[*/]?/g);

	const finalNums = preNums.map( (n, i) => {
		const nextNum = (index) => {
			const num = preNums[index];
			const last = num.slice(-1);

			if(last !== "*" && last !== "/") return num;

			const cNum = num.slice(0,-1);
			const nNum = nextNum(index+1);
			if(index < preNums.length-1) preNums[index+1] = "0";

			if(last === "*") {
				return String(Number(cNum) * Number(nNum));
			}
			if(last === "/") {
				return String(Number(cNum) / Number(nNum));
			}
		};

		return nextNum(i);
	});

	return String(finalNums.reduce((a,c) => Number(a)+Number(c)));
}


function punctualize(equation) {
	let nums = equation.split(regOperAll);
	let ops = equation.match(regOperAll);

	nums = nums.map(string => {
		if(string.length === 0) return string;
		if(string === "Infinity") return "ERROR"; // for division by 0
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


function canAddDot(string) {
	return ! string.split(regOperAll).slice(-1)[0].includes('.');
}


function canAddZero(string) {
	const n = string.split(regOperAll).slice(-1)[0].length + 1;
	const slice = string.slice(-n);

	if( slice.includes('.') ) return true;

	const zeroAfterOper = slice.match(/[*/+-]0/);
	if( zeroAfterOper && slice.length == 2 ) return false;

	return true;
}


function updateDisplay(string) {
	display.textContent = punctualize(string);
}


function appendChar(c) {
	if(display.textContent.includes("ERROR")) return;

	const operators = "/+-*";
	if(operators.includes(c)) {
		let last = eq.slice(-1);
		if(operators.includes(last)) {
			if(c==='-' && last==='-' || c!=='-') return;
		}
		if (eq.length > 1) {
			let last2 = eq.slice(-2);
			if (operators.includes(last2[0]) && last2[1] === ".")
				return;
		}
	}

	if(c === '.' && ! canAddDot(eq) ) return;

	const caz = canAddZero(eq);
	if(c === '0' && ! caz ) return;

	if(eq === '0' && c !== '.') eq = '';
	if(!caz && c !== '0' && c !== '.') eq = eq.slice(0,-1);
	eq += c;
	updateDisplay(eq);
}


function delChar() {
	eq = eq.slice(0, eq.length - 1);
	updateDisplay(eq);
}
