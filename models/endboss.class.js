class Endboss extends movableObject {
    height = 400
    width = 300
    y = 60

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ]
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ]
    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",

    ]
    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ]
    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ]
    world;
    hadFirstContact = false;
    moveLeft;

    offset = {
        top: 5,
        left: 20,
        right: 20,
        bottom: 0
    }

    constructor(world) {
        super().loadImage(this.IMAGES_ALERT[0])
        this.world = world
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_ATTACK)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
        this.x = 2100

    }



    animate() {
        let i = 0;
        this.hadFirstContact = true

        setStopableInterval(() => {

            if (i <= 8) {
                this.playAnimation(this.IMAGES_ALERT)
            } else if (i >= 8 && i <= 16) {
                this.playAnimation(this.IMAGES_ATTACK)
            } else if (i > 16 && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING)
                setStopableInterval(() => {
                    this.x -= this.speed
                }, 1000 / 60)
            }

            if (this.isDead()) {
                this.speed = 0
                this.playAnimation(this.IMAGES_DEAD)

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }

            i++;
        }, 200)

    }

}