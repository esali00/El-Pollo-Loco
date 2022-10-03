let level1;
let canvas;
let world;
let keyboard = new Keyboard()

function initLevel() {

    level1 = new Level(
        enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),
        ],
        clouds = [
            new Cloud()
        ],
        backgrounds = [
            new BackgroundObject("img/5_background/layers/air.png", -719),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

            new BackgroundObject("img/5_background/layers/air.png", 719),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

            new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),

            new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

            new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4)
        ]

    )

    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    document.querySelector(".start-screen").style.display = "none"
    document.querySelector(".start-btn").style.display = "none"

    if (document.querySelector(".end-screen-won") && !document.querySelector(".end-screen-won").classList.contains("d-none")) {
        document.querySelector(".end-screen-won").classList.add("d-none")
    }

    if (document.querySelector(".restart-btn") && !document.querySelector(".restart-btn").classList.contains("d-none")) {
        document.querySelector(".restart-btn").classList.add("d-none")
    }

    if (document.querySelector(".end-screen-lost") && !document.querySelector(".end-screen-lost").classList.contains("d-none")) {
        document.querySelector(".end-screen-lost").classList.add("d-none")
    }

}