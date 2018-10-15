class Moire implements Effect {
  private width: number;
  private height: number;

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
  }

  public render(ctx: CanvasRenderingContext2D, t: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);
    const time: number = t / 1000;

    const cx1: number = Math.sin(time / 2) * this.width / 3 + this.width / 2;
    const cy1: number = Math.sin(time / 4) * this.height / 3 + this.height / 2;
    const cx2: number = Math.cos(time / 3) * this.width / 3 + this.width / 2;
    const cy2: number = Math.cos(time) * this.height / 3 + this.height / 2;

    let destOfs: number = 0;
    for (let y: number = 0; y < this.height; y++) {
      const dy: number = (y - cy1) * (y - cy1);
      const dy2: number = (y - cy2) * (y - cy2);
      for (let x: number = 0; x < this.width; x++) {
        const dx: number = (x - cx1) * (x - cx1);
        const dx2: number = (x - cx2) * (x - cx2);
        const shade: number = (((Math.sqrt(dx + dy) ^
                                 Math.sqrt(dx2 + dy2)) >> 4) & 1) * 255;

        dest.data[destOfs++] = shade;  // r
        dest.data[destOfs++] = shade;  // g
        dest.data[destOfs++] = shade;  // b
        dest.data[destOfs++] = 0xff;  // a
      }
    }
    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("moire", new Moire());
