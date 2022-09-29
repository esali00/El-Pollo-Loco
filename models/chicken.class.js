class Chicken extends movableObject {
    y = 355
    height = 80;
    width = 80;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ]

    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"]
    dead = false
    move;
    walking_animation;

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.x = 300 + Math.random() * 500
        this.speed = 0.15 + Math.random() * 0.5
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