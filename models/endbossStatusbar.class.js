class EndbossStatusbar extends drawableObject {
    x = 2150
    y = 10
    width = 150
    height = 40

    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png"
    ]


    constructor(energy) {
        super()
        this.loadImage
        this.loadImages(this.IMAGES)
        this.img = this.ImageCache[this.IMAGES[this.resolveImageIndex(energy)]]

    }

    resolveImageIndex(energy) {
        if (energy == 100) {
            return 5
        }
        if (energy == 80) {
            return 4
        }
        if (energy == 60) {
            return 3
        }
        if (energy == 40) {
            return 2
        }
        if (energy == 20) {
            return 1
        }
        if (energy == 0) {
            return 0
        }
    }
}