import MovingSegmentsBackground from './backgrounds/movingSegments/MovingSegmentsBackground';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const searchBox = document.getElementById('search-bar') as HTMLInputElement;
const timeLabel = document.getElementById('time') as HTMLParagraphElement;

const settingsButton = document.getElementById('settings') as HTMLButtonElement;
const settingsPage = document.getElementById('settings-page') as HTMLDivElement;
const searchLink = document.getElementById('search-link-input') as HTMLInputElement;

settingsButton.addEventListener('click', () => {
    if(settingsPage.style.visibility === 'visible') settingsPage.style.visibility = 'hidden';
    else settingsPage.style.visibility = 'visible';
});

searchLink.value = window.localStorage.getItem('search') || 'https://www.google.com/search?q=%s';

searchLink.addEventListener('input', () => {
    window.localStorage.setItem('search', searchLink.value);
});

searchBox.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        if(searchBox.value.length < 1) return;
        const search = searchBox.value.replace(' ', '+');
        window.location.href = searchLink.value.replace('%s', search);
    }
});

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const backgrounds = {
    movingSegments: MovingSegmentsBackground
};

const background = new backgrounds.movingSegments(ctx);

let last = Date.now();
function draw() {
    requestAnimationFrame(draw);

    let now = Date.now();
    let elapsed = now - last;

    if(elapsed <= 1000/60) return;
    else last = now - (elapsed % 1000/60);

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    background.draw();
}

let lastDateUpdate = Date.now();
let lastDate = '';
function updateDate() {
    requestAnimationFrame(updateDate);

    let now = Date.now();
    let elapsed = now - lastDateUpdate;

    if(elapsed <= 1000/10) return;
    else lastDateUpdate = now - (elapsed % 1000/10);

    const date = new Date();
    const dateText = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    if(dateText === lastDate) return;
    lastDate = dateText;
    timeLabel.innerText = dateText;    
}
requestAnimationFrame(updateDate);

requestAnimationFrame(draw);