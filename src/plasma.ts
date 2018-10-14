class Plasma implements Effect {
  private width: number;
  private height: number;

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
  }

  public render(ctx: CanvasRenderingContext2D, t: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);
    const time: number = t / 500;
    let ofs: number = 0;
    for (let y: number = 0; y < this.height; y++) {
      const dy: number = (y / this.height) - 0.5;
      for (let x: number = 0; x < this.width; x++) {
        const dx: number = (x / this.width) - 0.5;
        let v: number = Math.sin(dx * 10 + time);
        const cx: number = dx + 0.5 * Math.sin(time / 5);
        const cy: number = dy + 0.5 * Math.cos(time / 3);
        v += Math.sin(Math.sqrt(50 * (cx * cx + cy * cy) + 1 + time));
        v += Math.cos(Math.sqrt(dx * dx + dy * dy) - time);
        const r: number = Math.floor(Math.sin(v * Math.PI) * 255);
        const b: number = Math.floor(Math.cos(v * Math.PI) * 255);
        dest.data[ofs++] = r;  // r
        dest.data[ofs++] = 0;  // g
        dest.data[ofs++] = b;  // b
        dest.data[ofs++] = 0xff;  // a
      }
    }
    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("plasma", new Plasma());
