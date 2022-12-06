class throwableObject extends movableObject {
    character_otherDirection;
    groundPosition = 340

    IMAGES_ROTATING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]
    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]
    endboss;


    constructor(endboss, otherDirection, x, y) {
        super().loadImages(this.IMAGES_ROTATING)
        this.loadImages(this.IMAGES_SPLASH)
        this.x = x
        this.y = y
        this.height = 70
        this.width = 70
        this.endboss = endboss
        this.character_otherDirection = otherDirection
        this.throw()
    }

    throw () {
        this.speedY = 30
        this.applyGravity()
        this.endboss.firstHit = false
        setStopableInterval(() => {
            if (this.character_otherDirection) {
                this.playAnimation(this.IMAGES_ROTATING)
                this.x -= 15
            } else {
                this.playAnimation(this.IMAGES_ROTATING)
                this.x += 15
            }
        }, 50)
    }

    splash() {
        this.breakbottle = setStopableInterval( () => {
            this.playAnimation(this.IMAGES_SPLASH)
            this.stopSplash()        
       }, 25)
   }

   stopSplash() {
        clearInterval(this.breakbottle)
   }


}