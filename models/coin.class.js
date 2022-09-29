class Coin extends drawableObject {
    y = 320
    x = 300 + Math.random() * 1500
    width = 150
    height = 150

    constructor() {
        super()
        this.loadImage("img/8_coin/coin_1.png")
    }

}