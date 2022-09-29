class CoinStatusbar extends drawableObject {
    x = 50
    y = 65
    width = 150
    height = 40

    IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ]


    constructor(amount) {
        super()
        this.loadImages(this.IMAGES)
        this.img = this.resolveImageIndex(amount)
    }

    resolveImageIndex(amount) {
        return this.ImageCache[this.IMAGES[amount]]
    }
}