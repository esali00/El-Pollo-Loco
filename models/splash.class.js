class Splash extends movableObject {

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
        super().loadImage("img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png")
        this.loadImages(this.IMAGES_SPLASH)
        this.height = 60;
        this.width = 60;
    }

    // animate() {
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_SPLASH);
    //     }, 200);
    //   }

}