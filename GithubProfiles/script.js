const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div');

const formEl = document.createElement('form');
formEl.classList.add("search");
formEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const inputsValue = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`);

    if(response.ok) {
        const data = await response.json();
        console.log(data);
        wrapper.appendChild(createProfileEl(data));
        mainEl.appendChild(wrapper);
        inputEl.value = '';
    } else {
        alert("Profile not find :");
    }

});

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');

const searchBtEl = document.createElement('button');
searchBtEl.classList.add('search-btn');
searchBtEl.setAttribute('type', 'submit');
searchBtEl.innerText = "Search";

formEl.appendChild(inputEl);
formEl.appendChild(searchBtEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
    const element = document.createElement('div');
    element.classList.add('profile');
    element.innerHTML = `
    <img class="search-image" src="${profileData.avatar_url}" alt="${profileData.name} Avatar">
    <p class="search-text"><span>Name : </span>${profileData.name}</p>
    <p class="search-text"><span>City : </span>${profileData.location || 'Not provided'}</p>
    <p class="search-text"><span>Biography : </span>${profileData.bio || 'No biography available'}</p>
    `;
    element.appendChild(createDeleteBtnEl());
    return element;
}
function createDeleteBtnEl() {
    const element = document.createElement('button');
    element.classList.add('delete-button');
    element.innerText = "Delete";
    element.addEventListener('click', () => {
        wrapper.innerHTML = "" ;
    });
    return element;
}