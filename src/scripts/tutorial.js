for(let i = 1; i<16; i++) {
    const button = document.getElementById(`copy${i}`);
    button.addEventListener('click', () => {
        const code = document.getElementById(`code${i}`).innerText;
        navigator.clipboard.writeText(code)
    })
}