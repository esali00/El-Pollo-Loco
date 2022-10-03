class World {
    character = new Character();
    endboss = new Endboss(this)
    smallChicken = new smallChicken()
    coins = [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ]
    coin_amount = 0
    coinStatusbar = new CoinStatusbar(this.coin_amount)
    chicken = new Chicken()
    throwable_object = new throwableObject(this.endboss, this.character.x, 0, 0)
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    bottle_amount = 0;
    characterStatusbar = new Statusbar();
    // endbossStatusbar = new EndbossStatusbar(this.endboss.energy)
    bottleStatusbar = new BottleStatusbar(this.bottle_amount)
    throwableObjects = []
    bottles = [
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
    ];
    audio_chicken = new Audio("audio/chicken.mp3")
    audio_jump = new Audio("audio/jump.mp3")
    audio_coin = new Audio("audio/coin.mp3")
    audio_win = new Audio("audio/win.mp3")
    audio_lose = new Audio("audio/lose.mp3")
    audio_throw = new Audio("audio/throw.mp3")
    audio_bottle_breaking = new Audio("audio/bottle_breaking.mp3")

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run()

    }



    checkCollisions() {
        setStopableInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.dead) {
                    this.character.hit();
                    this.characterStatusbar.setPercentage(this.character.energy)
                    console.log("hit by enemy")
                }

                if (this.endboss.isCollidingEndboss(this.character)) {
                    this.character.hit();
                    this.characterStatusbar.setPercentage(this.character.energy)
                }

                if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy instanceof smallChicken) {

                    if (!enemy.dead) {
                        this.audio_chicken.play()
                    }
                    enemy.dead = true
                    enemy.playAnimation(this.smallChicken.IMAGES_DEAD)
                    enemy.stopAnimation()

                } else if (this.character.isCollidingWithOffset(enemy) && this.character.isAboveGround() && enemy instanceof Chicken) {

                    if (!enemy.dead) {
                        this.audio_chicken.play()
                    }
                    enemy.dead = true
                    enemy.playAnimation(this.chicken.IMAGES_DEAD)
                    enemy.stopAnimation()
                }

            })
            this.bottles.forEach(bottle => {
                if (this.character.isCollidingWithOffset(bottle) && (bottle.height != 0 && bottle.width != 0)) {
                    bottle.height = 0
                    bottle.width = 0
                    this.bottle_amount++;
                    this.bottleStatusbar = new BottleStatusbar(this.bottle_amount)
                }
            })
            this.throwableObjects.forEach(throwableObject => {
                if (this.endboss.isCollidingEndboss(throwableObject) && !this.endboss.firstHit && (throwableObject.height != 0 && throwableObject.width != 0)) {
                    throwableObject.playAnimation(this.throwable_object.IMAGES_SPLASH)
                    this.audio_chicken.play()
                    this.endboss.firstHit = true
                    setTimeout(() => {
                        throwableObject.height = 0
                        throwableObject.width = 0
                    }, 25)
                    this.endboss.hitEndboss()
                        // this.endbossStatusbar = new EndbossStatusbar(this.endboss.energy)
                }
            })
            this.coins.forEach(coin => {
                if (this.character.isCollidingWithOffset(coin) && (coin.height != 0 && coin.width != 0)) {
                    this.audio_coin.play()
                    coin.height = 0
                    coin.width = 0
                    this.coin_amount++;
                    this.coinStatusbar = new CoinStatusbar(this.coin_amount)
                }
            })

        }, 200)
    }

    run() {
        setStopableInterval(() => {
            this.checkCollisions()
            this.checkThrowableObject()
            this.checkEndboss()
            this.endGame()
        }, 200)
    }

    checkEndboss() {
        if (this.endboss.x - this.character.x < 400 && !this.endboss.hadFirstContact) {
            this.endboss.animate()
        }
    }

    checkThrowableObject() {
        if (this.keyboard.D && this.bottle_amount > 0) {
            this.audio_throw.play()

            this.throwableObjects.push(this.returnSuitableThrowableObject())
            this.bottle_amount--;
            this.bottleStatusbar = new BottleStatusbar(this.bottle_amount)
        }
    }

    returnSuitableThrowableObject() {
        if (this.character.otherDirection == true) {
            return new throwableObject(this.endboss, this.character.otherDirection, this.character.x - 80, this.character.y + 80)
        } else {
            return new throwableObject(this.endboss, this.character.otherDirection, this.character.x + 80, this.character.y + 80)
        }
    }

    setWorld() {
        this.character.world = this
    }

    endGame() {
        if (this.character.isDead()) {
            this.level.enemies.forEach(enemy => {
                enemy.stopAnimation()
            })

            this.character.walking_sound.pause()
                // setTimeout(() => {
                //     this.audio_lose.play()
                //     GameOver()
                // }, 200)
            this.audio_lose.play()
            GameOver()
        }
        if (this.endboss.isDead()) {
            this.level.enemies.forEach(enemy => {
                enemy.stopAnimation()
            })
            this.character.walking_sound.pause()
            setTimeout(() => {
                this.audio_win.play()
                GameWon()
            }, 2000)
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgrounds)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.characterStatusbar)
        this.addToMap(this.bottleStatusbar)
        this.addToMap(this.coinStatusbar)
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.coins)
        this.addObjectsToMap(this.bottles)
        this.addObjectsToMap(this.throwableObjects)


        this.addToMap(this.character)
        this.addObjectsToMap(this.level.enemies)
        this.addObjectsToMap(this.level.clouds)
            // this.addToMap(this.endbossStatusbar)
        this.addToMap(this.endboss)

        this.ctx.translate(-this.camera_x, 0)

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw()
        })

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save()
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore()
    }
}