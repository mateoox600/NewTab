import Map from './map/Map';
import Utils from './Utils';
import Segment from './vector/Segment';
import Vector from './vector/Vector';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const searchBox = document.getElementById('search-bar') as HTMLInputElement;

const settingsButton = document.getElementById('settings') as HTMLButtonElement;
const settingsPage = document.getElementById('settings-page') as HTMLDivElement;

settingsButton.addEventListener('click', () => {
    if(settingsPage.style.visibility === 'visible') settingsPage.style.visibility = 'hidden';
    else settingsPage.style.visibility = 'visible';
});

const searchLink = document.getElementById('search-link-input') as HTMLInputElement;
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

canvas.width = innerWidth;
canvas.height = innerHeight;

var cellSize = 100;

const borders: Segment[] = [
    new Segment(new Vector(0, 0), new Vector(0, innerHeight)),
    new Segment(new Vector(0, innerHeight), new Vector(innerWidth, innerHeight)),
    new Segment(new Vector(innerWidth, innerHeight), new Vector(innerWidth, 0)),
    new Segment(new Vector(0, 0), new Vector(innerWidth, 0)),
    new Segment(new Vector(innerWidth / 5 * 4, 0), new Vector(innerWidth / 5 * 4, innerHeight / 5)),
    new Segment(new Vector(innerWidth / 5 * 4, innerHeight / 5), new Vector(innerWidth, innerHeight / 5)),
]

var map: Map = new Map(ctx, cellSize, borders);

function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.fillStyle = '#edefff';
    ctx.font = '128px sans-serif';
    const date = new Date();
    ctx.fillText(`${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`, innerWidth - innerWidth / 5 + 25, innerHeight / 5 - 25);

    ctx.fillStyle = '#313147';
    ctx.font = '12px sans-serif';
    ctx.fillText('Made by Mateoox600', 5, innerHeight - 15);

    map.draw();

    requestAnimationFrame(draw);
}

setInterval(() => {
    map.updatePoints((point) => {
        
        point.rotationSpeed = Utils.clamp(point.rotationSpeed + (Math.random() / 10 - 0.05), 0.5, 1.25);

        const cellCenter = new Vector(point.cell.x * cellSize + (cellSize / 2), point.cell.y * cellSize + (cellSize / 2));
        const translate = new Vector(cellCenter.x - point.x, cellCenter.y - point.y);
        const rotatedTranslate = translate.copy().rotate(point.rotationSpeed);
        const pointTranslate = new Vector(translate.x - rotatedTranslate.x, translate.y - rotatedTranslate.y);

        point.x += pointTranslate.x;
        point.y += pointTranslate.y;

        return point;
    });
}, 1000 / 60);

setInterval(() => {
    map.calculateSegments();
}, 10 * 1000);

draw();