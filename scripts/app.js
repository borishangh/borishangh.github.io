const dateTime = document.querySelector('.date-time');
const section = document.querySelector('.section');
const monitor = document.querySelector('.monitor');

window.addEventListener('DOMContentLoaded', () => {
    setInterval(setTime, 500);
    setClock();
    dragElement(monitor);
})

async function setClock() {
    let timezone = await fetchTmz();
    let tmzText = timezone.offset + ' ' + timezone.tmz;

    let time = document.createElement('div');
    let tmz = document.createElement('div');

    time.className = 'time-text';
    tmz.className = 'tmz-text';

    dateTime.innerHTML = '';
    tmz.innerHTML = tmzText;

    dateTime.appendChild(time);
    dateTime.appendChild(tmz);
}

function setTime() {
    if (document.querySelector('.time-text'))
        document.querySelector('.time-text')
            .innerHTML = moment().format('M/D/YYYY h:mm:ss');
}

async function fetchTmz() {
    return fetch('http://worldtimeapi.org/api/ip')
        .then(res => res.json())
        .then(data => {
            return {
                offset: data.utc_offset,
                tmz: data.timezone
            }
        })
}

document.querySelector('.monitor').addEventListener('mouseup', (e) => {
    let minBtn = document.querySelector('.minimize-btn')
    if (e.target == minBtn || monitor.classList.contains('minimized')) {
        minBtn.closest('.monitor').classList.toggle('minimized');
        document.querySelector('.monitor').setAttribute('style', ' ');
    }
})

function dragElement(element) {
    let isMouseDown, initX, initY,
        height = element.offsetHeight,
        width = element.offsetWidth;

    let rect = element.getBoundingClientRect();

    element.onmousedown = (e) => {

        if (e.target.classList.contains('minimize-btn')) return;

        e.preventDefault();

        initX = e.offsetX;
        initY = e.offsetY;
        isMouseDown = true;

        document.onmousemove = (e) => drag(e);
        document.onmouseup = (e) => isMouseDown = false;
    };

    function drag(e) {
        if (!isMouseDown || element.classList.contains('minimized')) return;

        var cx = e.clientX - initX,
            cy = e.clientY - initY;

        cx = cx < 5 ? 5 : cx;
        cy = cy < 42 ? 42 : cy;

        if (cx + rect.width > window.innerWidth)
            cx = window.innerWidth - width - 5;
        if (cy + rect.height > window.innerHeight - 42)
            cy = window.innerHeight - height - 42;

        console.log();

        element.style.left = cx + 'px';
        element.style.top = cy + 'px';
    }
}

document.addEventListener('click', (e) => {
    let section = e.target.closest(".section");
    if (!section
        || !e.target.classList.contains('section-head')
        && !section.classList.contains('clock-cont'))
        return;

    section.classList.toggle('collapsed');
})

document.querySelector('.footer-marquee')
    .innerHTML = `
If you can keep your head when all about you
    Are losing theirs and blaming it on you,   
If you can trust yourself when all men doubt you,
    But make allowance for their doubting too;   
If you can wait and not be tired by waiting,
    Or being lied about, don't deal in lies,
Or being hated, don't give way to hating,
    And yet don't look too good, nor talk too wise:

If you can dream—and not make dreams your master;   
    If you can think—and not make thoughts your aim;   
If you can meet with Triumph and Disaster
    And treat those two impostors just the same;   
If you can bear to hear the truth you've spoken
    Twisted by knaves to make a trap for fools,
Or watch the things you gave your life to, broken,
    And stoop and build 'em up with worn-out tools:

If you can make one heap of all your winnings
    And risk it on one turn of pitch-and-toss,
And lose, and start again at your beginnings
    And never breathe a word about your loss;
If you can force your heart and nerve and sinew
    To serve your turn long after they are gone,   
And so hold on when there is nothing in you
    Except the Will which says to them: 'Hold on!'

If you can talk with crowds and keep your virtue,   
    Or walk with Kings—nor lose the common touch,
If neither foes nor loving friends can hurt you,
    If all men count with you, but none too much;
If you can fill the unforgiving minute
    With sixty seconds' worth of distance run,   
Yours is the Earth and everything that's in it,   
    And—which is more—you'll be a Man, my son!`.repeat(100);