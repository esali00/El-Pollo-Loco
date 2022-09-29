class drawableObject {
    x = 120;
    y = 280;
    img;
    width = 150;
    height = 150;
    ImageCache = {};
    currentImage = 0;

    //loadImage(test.png)
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path
            this.ImageCache[path] = img
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.log("could not load", this.img)
        }

    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

    }


}