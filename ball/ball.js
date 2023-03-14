const field = document.querySelector('.field')

const ball = document.querySelector('.ball')

const goalZones = {
  left: document.querySelector('.goal-zone-left'), 
  right: document.querySelector('.goal-zone-right'),
}

const ballTrail1 = document.querySelector('.ball-trail-1')
const ballTrail2 = document.querySelector('.ball-trail-2')
const ballTrail3 = document.querySelector('.ball-trail-3')
const ballTrail4 = document.querySelector('.ball-trail-4')

const url = 'locate'

function sendMessage(message) {
    fetch(url, {
        method: 'POST',
        body: message
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

goalZones.left.addEventListener('click', (event) => {
  event.stopPropagation()
  // event.preventDefault()
})

goalZones.right.addEventListener('click', (event) => {
  event.stopPropagation()
  // event.preventDefault()
})

field.addEventListener('click', (event) => {
    let fieldCoords = field.getBoundingClientRect()
    let ballCoords = {
        top: event.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / 2 + getRandom(-75, 75),
        left: event.clientX - fieldCoords.left - field.clientLeft - ball.clientWidth / 2 + getRandom(-75, 75),
    }
    if (ballCoords.top < 0) ballCoords.top = 0
    if (ballCoords.left < 0) ballCoords.left = 0
    if (ballCoords.left + ball.clientWidth > field.clientWidth) ballCoords.left = field.clientWidth - ball.clientWidth
    if (ballCoords.top + ball.clientHeight > field.clientHeight) ballCoords.top = field.clientHeight - ball.clientHeight

    ball.style.left = `${ballCoords.left}px`
    ball.style.top = `${ballCoords.top}px`
    ballTrail1.style.left = `${ballCoords.left}px`
    ballTrail1.style.top = `${ballCoords.top}px`
    ballTrail2.style.left = `${ballCoords.left}px`
    ballTrail2.style.top = `${ballCoords.top}px`
    ballTrail3.style.left = `${ballCoords.left}px`
    ballTrail3.style.top = `${ballCoords.top}px`
    ballTrail4.style.left = `${ballCoords.left}px`
    ballTrail4.style.top = `${ballCoords.top}px`


    let message = [`${ballCoords.left}:${ballCoords.top}`]
    sendMessage(message)

})

function SubscribePane(url) {
    function updateCoordinates(coords) {
        coords = coords.split(':')
        ball.style.left = `${+coords[0]}px`
        ball.style.top = `${+coords[1]}px`
        ballTrail1.style.left = `${+coords[0]}px`
        ballTrail1.style.top = `${+coords[1]}px`
        ballTrail2.style.left = `${+coords[0]}px`
        ballTrail2.style.top = `${+coords[1]}px`
        ballTrail3.style.left = `${+coords[0]}px`
        ballTrail3.style.top = `${+coords[1]}px`
        ballTrail4.style.left = `${+coords[0]}px`
        ballTrail4.style.top = `${+coords[1]}px`
        
    }

    async function subscribe() {
        let response = await fetch(url);
    
        if (response.status == 502) {
          // Таймаут подключения
          // случается, когда соединение ждало слишком долго.
          await subscribe();
        } else if (response.status != 200) {
          // Показать ошибку
          showMessage(response.statusText);
          // Подключиться снова через секунду.
          await new Promise(resolve => setTimeout(resolve, 1000));
          await subscribe();
        } else {
          // Получить сообщение
          let coords = await response.text();
          updateCoordinates(coords);
          await subscribe();
        }
      }
    
      subscribe();
}

