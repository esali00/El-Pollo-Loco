class Cloud extends movableObject {
    y = 20
    width = 500
    height = 250
    speed = 0.15

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 2300
        this.animate();
    }

    animate() {
        this.moveLeft()
    }


}