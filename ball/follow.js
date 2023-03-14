const circle = document.querySelector('.follow-circle')

document.addEventListener('mousemove', (event) => {
    circleCoord = {
        left: event.clientX - circle.clientWidth / 2,
        top: event.clientY - circle.clientHeight / 2,
    }
    circle.style.left = `${circleCoord.left}px`
    circle.style.top = `${circleCoord.top}px`

})