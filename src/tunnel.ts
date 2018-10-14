class Tunnel implements Effect {
  private width: number;
  private height: number;
  private src: ImageData;
  private distances: number[] = [];
  private angles: number[] = [];
  private shades: number[] = [];

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
    this.src = await demoFX.loadImage("space.jpg");

    for (let y: number = 0; y < this.height * 2; y++) {
      const sqy: number = (y - this.height) * (y - this.height);
      for (let x: number = 0; x < this.width * 2; x++) {
        const sqx: number = (x - this.width) * (x - this.width);
        this.distances.push(Math.floor(32 * this.src.height /
                                       Math.sqrt(sqx + sqy)) % this.src.height);
        this.angles.push(Math.round(this.src.width *
                                    Math.atan2(y - this.height,
                                               x - this.width) / Math.PI));
        this.shades.push(Math.min(Math.sqrt(sqx + sqy), 255));
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, t: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);
    const time: number = t / 1000;
    const shiftx: number = Math.floor(this.src.width * time);
    const shifty: number = Math.floor(this.src.height * 0.25 * time);
    const centerx: number = this.width / 2 + Math.floor(this.width / 4 *
                                                        Math.sin(time / 4));
    const centery: number = this.height / 2 + Math.floor(this.height / 4 *
                                                         Math.sin(time / 2));
    const stride: number = this.width * 2;
    let destOfs: number = 0;
    for (let y: number = 0; y < this.height; y++) {
      let srcOfs: number = y * stride + centerx + centery * stride;
      for (let x: number = 0; x < this.width; x++) {
        const u: number = (this.distances[srcOfs] + shiftx) & 0xff;
        let v: number = (this.angles[srcOfs] + shifty) % this.src.height;
        while (v < 0) {
          v += this.src.height;
        }
        const shade: number = this.shades[srcOfs] / 255;
        srcOfs++;
        let pixOfs: number = (u + (v << 8)) << 2;
        dest.data[destOfs++] = this.src.data[pixOfs++] * shade;  // r
        dest.data[destOfs++] = this.src.data[pixOfs++] * shade;  // g
        dest.data[destOfs++] = this.src.data[pixOfs++] * shade;  // b
        dest.data[destOfs++] = this.src.data[pixOfs++];  // a
      }
    }
    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("tunnel", new Tunnel());
