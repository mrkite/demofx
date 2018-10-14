class RotoZoom implements Effect {
  private width: number;
  private height: number;
  private src: ImageData;
  private angle: number = 0;

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
    this.src = await demoFX.loadImage("2ndreal.jpg");
  }

  public render(ctx: CanvasRenderingContext2D, _: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);
    const c: number = Math.cos(this.angle * Math.PI / 180);
    const s: number = Math.sin(this.angle * Math.PI / 180);
    this.angle++;
    this.angle %= 360;
    let destOfs: number = 0;
    for (let y: number = 0; y < this.height; y++) {
      for (let x: number = 0; x < this.width; x++) {
        const u: number = Math.floor((x * c - y * s) * (s + 1)) & 0xff;
        let v: number = Math.floor((x * s + y * c) * (s + 1)) % this.src.height;
        while (v < 0) {
          v += this.src.height;
        }
        let srcOfs: number = (u + (v << 8)) << 2;
        dest.data[destOfs++] = this.src.data[srcOfs++];  // r
        dest.data[destOfs++] = this.src.data[srcOfs++];  // g
        dest.data[destOfs++] = this.src.data[srcOfs++];  // b
        dest.data[destOfs++] = this.src.data[srcOfs++];  // a
      }
    }
    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("rotozoom", new RotoZoom());
