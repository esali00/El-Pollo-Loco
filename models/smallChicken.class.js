class smallChicken extends movableObject {
    y = 385
    height = 40;
    width = 40;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ]
    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"]
    isDead = false
    move;
    walking_animation;

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 0
    }

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.x = 300 + Math.random() * 1900
        this.speed = 2 + Math.floor(Math.random() * 0.5)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.animate();
    }

    animate() {

        this.move = setInterval(() => {
            this.x -= this.speed
        }, 1000 / 60)

        this.walking_animation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200)

    }

    stopAnimation() {
        clearInterval(this.move)
        clearInterval(this.walking_animation)
    }

}