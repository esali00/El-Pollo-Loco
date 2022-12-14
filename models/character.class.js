class Character extends movableObject {
    y = 180
    width = 100
    height = 250
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ]
    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ]
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png"
    ]

    world;
    speed = 6;
    walking_sound = new Audio("audio/running.mp3")
    movement;
    extra_movement;

    offset = {
        top: 120,
        left: 30,
        right: 30,
        bottom: 0
    }


    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png")
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.walking_sound.playbackRate = 2.5
        this.movement = setInterval(
            () => {
                this.walking_sound.pause()
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false
                    this.walking_sound.play()
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft()
                    this.otherDirection = true
                    this.walking_sound.play()
                }
                this.world.camera_x = -this.x + 100
            }, 1000 / 60
        )

        this.extra_movement = setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
                this.walking_sound.pause()
                this.world.chicken.stopAnimation()
                this.world.smallChicken.stopAnimation()
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.world.audio_jump.play()
                this.jump()
            }

        }, 100)

    }

    jump() {
        this.speedY = 30
    }

    stopAnimation() {
        clearInterval(this.movement)
        clearInterval(this.extra_movement)
    }



}