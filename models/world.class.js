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
    splash = new Splash();
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
        new Bottles(),
        new Bottles(), 
    ];
    splash_object = new Bottles()

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


    characterIsTakingDamage() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCollidingWithOffset(enemy) && !this.character.isAboveGround() && !enemy.dead) {
                this.character.hit();
                this.characterStatusbar.setPercentage(this.character.energy)
            }
            if (this.character.isCollidingSmallChicken(enemy) && enemy instanceof smallChicken && !this.character.isAboveGround() && !enemy.dead) {
                this.character.hit();
                this.characterStatusbar.setPercentage(this.character.energy)
            }
        })
    }

    
    characterIskillingEnemies() {
        this.level.enemies.forEach(enemy => {

            this.throwableBottleIsCollidingWithEnemies(enemy)

            if (this.character.isCollidingWithOffset(enemy) && this.character.isAboveGround() && (enemy instanceof smallChicken || enemy instanceof Chicken)) {
                if (!enemy.dead) {
                    this.audio_chicken.play()
                }
                enemy.dead = true

                if (enemy instanceof smallChicken) {
                    enemy.playAnimation(this.smallChicken.IMAGES_DEAD)
                } else {
                    enemy.playAnimation(this.chicken.IMAGES_DEAD)
                }
                enemy.stopAnimation()
            }
        })
    }

    characterisCollidingWithEndboss() {
        if (this.endboss.isCollidingEndboss(this.character)) {
            this.character.hit();
            this.characterStatusbar.setPercentage(this.character.energy)
        }
    }


    bottleIsCollidingWithCharacter() {
        this.bottles.forEach(bottle => {
            if (this.character.isCollidingWithOffset(bottle) && (bottle.height != 0 && bottle.width != 0)) {
                bottle.height = 0
                bottle.width = 0
                this.bottle_amount++;
                this.bottleStatusbar = new BottleStatusbar(this.bottle_amount)
            }
        })
    }


    throwableBottleIsCollidingWithEnemies(enemy) {
        this.throwableObjects.forEach(throwableObject => {
            if (enemy.isColliding(throwableObject)) {
                throwableObject.splash(this.throwable_object.IMAGES_SPLASH)
                // throwableObject.playAnimation(this.throwable_object.IMAGES_SPLASH)
                setTimeout(() => {
                    throwableObject.height = 0
                    throwableObject.width = 0
                }, 150)

                if (!enemy.dead) {
                    this.audio_chicken.play()
                }
                enemy.dead = true

                if (enemy instanceof smallChicken) {
                    enemy.playAnimation(this.smallChicken.IMAGES_DEAD)
                } else {
                    enemy.playAnimation(this.chicken.IMAGES_DEAD)
                }
                enemy.stopAnimation()
            }   
        })
    }


    bottleIsCollidingWithEndboss() {
        this.throwableObjects.forEach(throwableObject => {
            if (this.endboss.isCollidingEndboss(throwableObject)) {
                throwableObject.splash(this.throwable_object.IMAGES_SPLASH)
                
                setTimeout(() => {
                    throwableObject.height = 0
                    throwableObject.width = 0
                }, 250)
            }

            if (this.endboss.isCollidingEndboss(throwableObject) && !this.endboss.firstHit && (throwableObject.height != 0 && throwableObject.width != 0)) {
                this.endboss.firstHit = true
                this.endboss.hitEndboss()
                    // this.endbossStatusbar = new EndbossStatusbar(this.endboss.energy)
            }
        })
    }

    coinIsCollidingWithCharacter() {
        this.coins.forEach(coin => {
            if (this.character.isCollidingWithOffset(coin) && (coin.height != 0 && coin.width != 0)) {
                this.audio_coin.play()
                coin.height = 0
                coin.width = 0
                this.coin_amount++;
                this.coinStatusbar = new CoinStatusbar(this.coin_amount)
            }
        })
    }



    checkCollisions() {
        setStopableInterval(() => {
            this.characterIsTakingDamage()
            this.characterIskillingEnemies()
            this.characterisCollidingWithEndboss()
            this.bottleIsCollidingWithCharacter()
            this.bottleIsCollidingWithEndboss()
            // this.throwableBottleIsCollidingWithEnemies()
            this.coinIsCollidingWithCharacter()

        }, 100)
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
        if (this.endboss.x - this.character.x < 550 && !this.endboss.hadFirstContact) {
            this.endboss.animate()
            setTimeout(() => {
                this.endboss.walkingAnimation()
            },3500)
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
            this.character.stopAnimation()
            this.character.walking_sound.pause()
            this.audio_lose.play()
            GameOver()
        }
        if (this.endboss.isDead()) {
            this.level.enemies.forEach(enemy => {
                enemy.stopAnimation()
            })
            this.character.stopAnimation()
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
        this.addObjectsToMap(this.level.clouds)

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.characterStatusbar)
        this.addToMap(this.bottleStatusbar)
        this.addToMap(this.coinStatusbar)
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.coins)
        this.addObjectsToMap(this.bottles)

        this.addToMap(this.character)
        this.addObjectsToMap(this.level.enemies)

        // this.addToMap(this.endbossStatusbar)
        this.addToMap(this.endboss)
        this.addObjectsToMap(this.throwableObjects)

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
            // mo.drawFrame(this.ctx)

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