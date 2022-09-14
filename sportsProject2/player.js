const singlePlayerURL = 'https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php';
const profile = document.querySelector('.player-profile');





window.addEventListener('DOMContentLoaded', async function(){
const urlID = window.location.search;
try {
    const response = await fetch(`${singlePlayerURL}${urlID}`);
    const data = await response.json();
    const player = data.players;
    console.log(player);
    const list = player.map((item) => {
        const {strSport:sport, strPlayer:name, strThumb:image, strWeight:weight, strHeight:height, strBirthLocation:birthPlace, dateBorn:born, strDescriptionEN:description} = item;

        return `<div class="player-box">
        <div class="inside-box">
        <img src="${image}" class="profile-img">
        <div class="player-info">
            <p><b>Name</b>:${name}</p>
            <p><b>Sport</b>:${sport}</p>
            <p><b>Born</b>:${born}</p>
            <p><b>Birthplace</b>:${birthPlace}</p>
            <p><b>Height</b>:${height}</p>
            <p><b>Weight</b>:${weight}</p>
            </div>
            <button class="arrow-btn"><i class="fa-solid fa-arrow-down"></i></button>
            <button class="arrow-up-btn hidden"><i class="fa-solid fa-arrow-up"></i></button>
            
        </div>
        <div class="player-bio"><p>${description}</p></div>

    </div>`;
    }).join('')
    console.log(list);
    profile.innerHTML = list;
    const arrowBtn = document.querySelector('.arrow-btn');
    const playerBox = document.querySelector('.player-box');
    const rotate = document.querySelector('.rotate-div');
    const arrowUpBtn = document.querySelector('.arrow-up-btn');
    arrowBtn.addEventListener('click', ()=> {
        playerBox.classList.toggle('player-box-active');
        arrowUpBtn.classList.remove('hidden');
        arrowBtn.classList.add('hidden')
    })

    arrowUpBtn.addEventListener('click', () => {
        playerBox.classList.remove('player-box-active');
        arrowUpBtn.classList.add('hidden');
        arrowBtn.classList.remove('hidden');
    })

} catch (error) {
    console.log(error);
}

})