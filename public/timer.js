const circle = document.getElementById('circle2');
const button = document.getElementById('button');
const reset = document.getElementById('reset')
const length = circle.getTotalLength();
const minute = document.getElementById('minute');
const second = document.getElementById('second');

circle.style.strokeDasharray = length;
circle.style.strokeDashoffset = length;

let count = 0;
let timer;
let isPlaying = false;

button.addEventListener('click',
    function () {
        isPlaying = !isPlaying;
        if (isPlaying) {
            startTimer();
        } else {
            stopTimer();
        }
    }
);

reset.addEventListener('click', resetTimer);

function startTimer() {
    button.innerHTML = `<span class="glow-blob"></span><i class="fa-solid fa-stop ms-1"></i> Stop`;
    timer = setInterval(function () {
        count++;
        minute.textContent = (Math.floor(count / 60) < 10 ? '0' : '') + Math.floor(count / 60);
        second.textContent = (count % 60 < 10 ? '0' : '') + count % 60;
        circle.style.strokeDashoffset = length - (count / 60) * length;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    button.innerHTML = `<span class="glow-blob"></span><i class="fa-solid fa-play ms-1"></i> Start`;
}


function resetTimer() {
    stopTimer();
    count = 0;
    minute.textContent = '00';
    second.textContent = '00'
    circle.style.strokeDashoffset = length;
    isPlaying = false;
}