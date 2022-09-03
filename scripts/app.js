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
    .innerHTML = `So Long, So Long January, `.repeat(100);