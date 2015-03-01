var BUS_INITIAL_POSITION = -50;
var BUS_PIXELS_PER_SECOND = 35;

var LIGHTS_GAP = 500;
if (window.innerWidth < 600) {
    LIGHTS_GAP = 250;
}

var LIGHT_PIXELS_PER_SECOND = 20;
var LIGHT_INTERVAL = LIGHTS_GAP / LIGHT_PIXELS_PER_SECOND * 1000 / 2.2;


function onLoad() {
    var busContainer = document.querySelector('.bus-container');
    snabbt(busContainer, {
        position: [window.innerWidth + 200, 0, 0],
        fromPosition: [BUS_INITIAL_POSITION, 0, 0],
        easing: 'linear',
        duration: window.innerWidth / BUS_PIXELS_PER_SECOND * 1000,
        loop: 1000
    });

    initLights();
}

function initLights() {
    setInterval(animateNewLight, LIGHT_INTERVAL);
    createAndAnimateInitialLights();
}

function animateNewLight(initialHeadStart) {
    initialHeadStart = initialHeadStart || 0;

    var container = document.querySelector('.street-lights');
    var image = createLight();
    container.appendChild(image);

    snabbt(image, {
        position: [-window.innerWidth - initialHeadStart, 0, 0],
        fromPosition: [window.innerWidth - initialHeadStart, 0, 0],
        easing: 'linear',
        duration: window.innerWidth / LIGHT_PIXELS_PER_SECOND * 1000,
        callback: function removeLight() {
            container.removeChild(image);
        }
    });
}

function createAndAnimateInitialLights() {
    for (var i = 0; i < window.innerWidth / LIGHTS_GAP; ++i) {
        animateNewLight(i * LIGHTS_GAP);
    }
}

function createLight() {
    var img = document.createElement('img');
    img.src = 'images/light.svg';
    img.className = 'scene-item street-light';
    return img;
}

function removeClass(element, className) {
    var classes = element.className.split(' ');

    var newClasses = [];
    for (var i = 0; i < classes.length; ++i) {
        if (classes[i] !== className) {
            newClasses.push(classes[i]);
        }
    }

    element.className = newClasses.join(' ');
}

function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}

window.onload = onLoad;
