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
}