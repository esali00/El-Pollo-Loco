document.querySelector(".left-btn").addEventListener("touchstart", () => {
    keyboard.LEFT = true
})

document.querySelector(".left-btn").addEventListener("touchend", () => {
    keyboard.LEFT = false
})

document.querySelector(".up-btn").addEventListener("touchstart", () => {
    keyboard.SPACE = true
})

document.querySelector(".up-btn").addEventListener("touchend", () => {
    keyboard.SPACE = false
})

document.querySelector(".right-btn").addEventListener("touchstart", () => {
    keyboard.RIGHT = true
})

document.querySelector(".right-btn").addEventListener("touchend", () => {
    keyboard.RIGHT = false
})

document.querySelector(".throw-btn").addEventListener("touchstart", () => {
    keyboard.D = true
})

document.querySelector(".throw-btn").addEventListener("touchend", () => {
    keyboard.D = false
})



window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true
    }
    if (event.keyCode == 38) {
        keyboard.UP = true
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true
    }
    if (event.keyCode == 68) {
        keyboard.D = true
    }

})

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false
    }
    if (event.keyCode == 38) {
        keyboard.UP = false
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false
    }
    if (event.keyCode == 68) {
        keyboard.D = false
    }

})

function redirectBackToMainMenu() {
    location.reload(true)

}