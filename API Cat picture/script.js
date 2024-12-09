const dogImg = document.getElementById('dogImage');
const btnGenerate = document.getElementById('btnGenerate');
const urlAPI = "https://dog.ceo/api/breeds/image/random";

async function fetchPicture() {
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();
        dogImg.src = data.message;
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener("load" , fetchPicture);
btnGenerate.addEventListener("click", () => {
    const imageLoaded = dogImg.complete;

    if(imageLoaded) {
        fetchPicture();
    }
});
