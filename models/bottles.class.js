class Bottles extends drawableObject {
    y = 355
    height = 80;
    width = 80;

    constructor() {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.x = 400 + Math.random() * 1000
    }
}