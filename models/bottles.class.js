class Bottles extends drawableObject {
    y = 365
    height = 70;
    width = 70;

    offset = {
        top: 30,
        left: 30,
        right: 15,
        bottom: 0
    }

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    constructor() {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.x = 400 + Math.random() * 800
    }


}