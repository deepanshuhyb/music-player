const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audioCur = document.querySelector('#audio');
const container = document.querySelector('.music-container');
const progress = document.querySelector('#progress');
const porgressContainer = document.querySelector('#progress-container');
const title = document.querySelector('#title');
const cover = document.getElementById('cover')




const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audioCur.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;

}




const playSong = (()=>{
    audioCur.play();
    container.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
});

const pauseSong = (()=>{
    audioCur.pause();
    container.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
});

const prevSong = (()=>{
    songIndex = (songIndex + 4) % 3;
    loadSong(songs[songIndex]);
    playPause();
});

const nextSong = (()=>{
    songIndex = (songIndex + 1) % 3;
    loadSong(songs[songIndex]);
    playPause();
});

function playPause() {
    if (audioCur.duration > 0 && !audioCur.paused) {
        pauseSong();        
    } else{
        playSong();
    }
}

const progressBar = ((e)=>{
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`
});

const update = ((e)=>{
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioCur.duration;

    audioCur.currentTime = (clickX/width)*duration;
    // progressBar();
})


playBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioCur.addEventListener('timeupdate', progressBar);
porgressContainer.addEventListener('click', update);