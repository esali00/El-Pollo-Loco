class BottleStatusbar extends drawableObject {
    x = 50
    y = 35
    width = 150
    height = 40

    IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ]


    constructor(amount) {
        super()
        this.loadImages(this.IMAGES)
        this.img = this.resolveImageIndex(amount)
    }

    resolveImageIndex(amount) {
        if (amount > 5) {
            return this.ImageCache[this.IMAGES[5]]
        }
        return this.ImageCache[this.IMAGES[amount]]
    }
}