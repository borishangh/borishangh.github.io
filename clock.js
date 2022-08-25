const clock = document.querySelector('.clock-face');
const centre = document.querySelector('.clock-centre');

const hrs_div = document.querySelector('.hrs-cont');
const min_div = document.querySelector('.min-cont');
const sec_div = document.querySelector('.sec-cont');

const hrs_hand = document.querySelector('.hrs');
const min_hand = document.querySelector('.min');
const sec_hand = document.querySelector('.sec');

const side = clock.clientWidth;

setupClock();
setupHands();

function setupClock() {
    centre.style.height = `${side * 0.06}px`;
    centre.style.width = `${side * 0.06}px`;

    for (var i = 0; i < 60; i++) {
        var degrees = document.createElement('div');
        degrees.style.height = `${side - 6}px`;
        degrees.style.transform = `rotate(${i * 6}deg)`;
        degrees.className = 'degrees';
        clock.appendChild(degrees);
    }
}


function setupClock() {

    centre.style.height = `${side * 0.1}px`;
    centre.style.width = `${side * 0.1}px`;

    for (var i = 0; i < 60; i++) {
        var degrees = document.createElement('div');
        degrees.style.height = `${side - 10}px`;
        degrees.style.transform = `rotate(${i * 6}deg)`;
        degrees.className = 'degrees';
        clock.appendChild(degrees);
    }
}

function setupHands() {
    hrs_hand.style.height = `${0.3 * side}px`;  //60
    hrs_hand.style.width = `${0.05 * side}px`;  //15
    hrs_hand.style.marginLeft = `${-0.022 * side}px`;  //-7.5
    hrs_hand.style.marginTop = `${-0.3 * side}px`;

    min_hand.style.height = `${0.5 * side}px`;
    min_hand.style.width = `${0.02 * side}px`;  //8
    min_hand.style.marginLeft = `${-0.01 * side}px`;  //4
    min_hand.style.marginTop = `${-0.4 * side}px`;

    sec_hand.style.height = `${0.65 * side}px`;
    sec_hand.style.width = `${0.05 * side}px`;  //8
    sec_hand.style.border = `${0.01 * side}px solid var(--white)`;  //4
    sec_hand.style.marginLeft = `${-0.03 * side}px`;  //2.4
    sec_hand.style.marginTop = `${-0.55 * side}px`; //115

}


function getTime() {
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var hrs_angle = hours * 30 + (minutes / 2);
    var min_angle = minutes * 6;
    var sec_angle = seconds * 6;

    hrs_div.style.transform = `rotate(${hrs_angle}deg)`;
    min_div.style.transform = `rotate(${min_angle}deg)`;
    sec_div.style.transform = `rotate(${sec_angle}deg)`;
}


setInterval(getTime, 250);
