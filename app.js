const url = "https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=";
const dropMenu = document.querySelector('.dropdown-menu');
const dropBtn = document.querySelector('.drop-btn');
const form = document.querySelector('.search-form');
const search = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const results = document.querySelector('.results');
const singlePlayerUrl = 'https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=';
const btnBoxBtn = [...document.querySelectorAll('.btn-box-btn')];
const basketBallBtn = document.querySelector('.basketball-link');
const basketBallInput = document.querySelector('.basketball-input');
const basketBallForm = document.querySelector('.basketball-form');
const footBallBtn = document.querySelector('.football-link');
const footBallInput = document.querySelector('.football-input');
const footBallForm = document.querySelector('.football-form');
const allBtn = document.querySelector('.all-link');


dropBtn.addEventListener('click', () => {
    dropMenu.classList.toggle('dropdown-active')
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = search.value;
    if(value === ""){
        return
    }
    fetchPlayers(value);
    search.value = ''
})

searchBtn.addEventListener('click', () => {
    search.classList.add('search-input-active');
    form.classList.add('search-form-active');
    searchBtn.classList.add('white');
    btnBoxBtn.forEach((btn) => {
        btn.classList.add('btn-box-active');
    })
})



const fetchPlayers = async (searchValue) => {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const players = data.player;
    console.log(players);
    const list = players.map((item) => {
        const {dateBorn:born, strBirthLocation:birthPlace, strPlayer:name,strHeight:height, strWeight:weight, strThumb:image, idPlayer:ID, strDescriptionEN: description} = item;
        if(!image || !height || !weight || !description){
            console.log('no image')
        } else {
            return `<div class="card">
            <a href="player.html?id=${ID}" target="__blank">
            <img src="${image}" class="player-img">
            </a>
            <div class="card-info">
                <p>${name}</p>
                
                
            </div>
        </div>`
        }
        
    }).join('')
    results.innerHTML = list;

}

const fetchBasketBall = async (searchValue) => {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const players = data.player;
    console.log(players);
    const list = players.map((item) => {
        const {dateBorn:born, strBirthLocation:birthPlace, strPlayer:name,strHeight:height, strWeight:weight, strThumb:image, idPlayer:ID, strDescriptionEN: description, strSport: sport} = item;
        if(!image || !height || !weight || !description || sport != "Basketball"){
            console.log('no image')
            return
        } else {
            return `<div class="card">
            <a href="player.html?id=${ID}" target="__blank">
            <img src="${image}" class="player-img">
            </a>
            <div class="card-info">
                <p>${name}</p>
                
                
            </div>
        </div>`
        }
        
    }).join('')
    results.innerHTML = list;

}

// FORM SWITCH

basketBallBtn.addEventListener('click', () => {
    form.classList.add('hidden');
    footBallForm.classList.add('hidden')
    basketBallForm.classList.remove('hidden');
})

footBallBtn.addEventListener('click', () => {
    form.classList.add('hidden');
    basketBallForm.classList.add('hidden');
    footBallForm.classList.remove('hidden');
})

allBtn.addEventListener('click', () => {
    form.classList.remove('hidden');
    basketBallForm.classList.add('hidden');
    footBallForm.classList.add('hidden');
})

basketBallForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = basketBallInput.value;
    fetchBasketBall(value);
})