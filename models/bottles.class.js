class Bottles extends drawableObject {
    y = 355
    height = 80;
    width = 80;

    offset = {
        top: 30,
        left: 30,
        right: 15,
        bottom: 0
    }

    constructor() {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.x = 400 + Math.random() * 800
    }


}