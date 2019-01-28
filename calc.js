let output = document.querySelector("#output");

document.querySelectorAll(".numpad button, .oper").forEach(b => {
    b.addEventListener("click", () => {
        output.textContent += b.textContent;
    });
});

document.querySelector("#cls").addEventListener("click", 
                                () => output.textContent = "");