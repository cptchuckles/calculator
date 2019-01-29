let output = document.querySelector("#output");
let op = document.querySelector("#op");

document.querySelectorAll(".num").forEach(b => {
    b.addEventListener("click", () => {
        output.textContent += b.textContent;
    });
});

document.querySelector("#bs").addEventListener("click", () => {
    let n = output.textContent;
    output.textContent = n.slice(0, n.length-1);
});

document.querySelectorAll(".oper").forEach(oper => {
    oper.addEventListener("click", () => {
        op.textContent = oper.textContent;
    });
});

document.querySelector("#cls")
        .addEventListener("click", () => {
            output.textContent = "";
            op.textContent = "";
        });

document.querySelector("#eval").addEventListener("click",
                                () => calc(output.textContent));


function calc(input) {
    //TODO: implement this

    output.textContent = punctualize(output.textContent);
}


function punctualize(string) {
    if( isNaN(string) ) return "ERROR";
    let sides = string.split('.');
    let left = sides[0];
    let right = '';
    if (sides.length === 2) right = sides[1];

    for(i = left.length-3; i > 0; i -= 3) {
        left = left.slice(0, i) + ',' + left.slice(i);
    }

    return right.length === 0 ? left : left + '.' + right;
}