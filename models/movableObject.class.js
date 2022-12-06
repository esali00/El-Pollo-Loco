class movableObject extends drawableObject {
    speed = 0.15
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    firstHit = false;
    dead = false;
    groundPosition = 180;
    // offsetY = 0

    applyGravity() {
        setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {   
        if (this instanceof throwableObject) {
            return true
        } else {
            return this.y < 180
        }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i];
        this.img = this.ImageCache[path]
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed

    }

    moveLeft() {
        this.x -= this.speed
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
    }

    isCollidingSmallChicken(mo) {
        return this.x + this.width - 50 > mo.x &&
            this.y + this.height > mo.y &&
            this.x + 50 < mo.x + mo.width &&
            this.y < mo.y + mo.height
    }

    isCollidingEndboss(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width - 60 &&
            this.y < mo.y + mo.height - 60
    }

    isCollidingWithOffset(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height < mo.y + mo.height - mo.offset.bottom

    }

    hit() {
        this.energy -= 0.2
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime()
        }
    }

    hitEndboss() {
        this.energy -= 20
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime()
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit // ms
        timepassed = timepassed / 1000 // s
        return timepassed < 1
    }

    isDead() {
        return this.energy == 0
    }


}