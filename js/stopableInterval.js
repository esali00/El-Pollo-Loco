let IntervalIds = []

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time)
    IntervalIds.push(id)
}

function GameOver() {
    IntervalIds.forEach(clearInterval)

    if (document.querySelector(".restart-btn")) {
        document.querySelector(".restart-btn").classList.remove("d-none")
    }

    if (document.querySelector(".end-screen-lost")) {
        document.querySelector(".end-screen-lost").classList.remove("d-none")
    }

}

function GameWon() {
    IntervalIds.forEach(clearInterval)

    if (document.querySelector(".restart-btn")) {
        document.querySelector(".restart-btn").classList.remove("d-none")
    }

    if (document.querySelector(".end-screen-won")) {
        document.querySelector(".end-screen-won").classList.remove("d-none")
    }
}