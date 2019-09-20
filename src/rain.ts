class Rain implements Effect {
  private width: number;
  private height: number;
  private dest: Int16Array;
  private source: Int16Array;
  private tex: ImageData;
  private lastTicks: number = 0;

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
    this.dest = new Int16Array(width * height);
    this.source = new Int16Array(width * height);
    this.tex = await demoFX.loadImage("tile.jpg");
  }

  public render(ctx: CanvasRenderingContext2D, t: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);

    const end: number = (this.height - 1) * this.width;

    if (t / 1000 - this.lastTicks > 0.5) {
      const rx: number = Math.floor(Math.random() * this.width);
      const ry: number = Math.floor(Math.random() * this.height);
      this.source[ry * this.width + rx] = Math.round(Math.random() * 0x3000);
      this.lastTicks = t / 1000;
    }

    for (let i: number = this.width; i < end; i++) {
      this.dest[i] = ((this.source[i - 1] +
                       this.source[i + 1] +
                       this.source[i - this.width] +
                       this.source[i + this.width]) >> 1) - this.dest[i];
      this.dest[i] -= (this.dest[i] >> 5);
    }
    const tmp: Int16Array = this.dest;
    this.dest = this.source;
    this.source = tmp;

    for (let y: number = 1; y < this.height - 1; y++) {
      const ofs: number = y * this.width;
      for (let x: number = 1; x < this.width - 1; x++) {
        const dx: number = this.source[ofs + x - 1] - this.source[ofs + x + 1];
        const dy: number = this.source[ofs + x - this.width] -
            this.source[ofs + x + this.width];
        const tx: number = ((y + dy) & 0x1ff) * this.tex.width * 4 +
            ((x + dx) & 0x1ff) * 4;
        let r: number = this.tex.data[tx];
        let g: number = this.tex.data[tx + 1];
        let b: number = this.tex.data[tx + 2];
        dest.data[ofs * 4 + x * 4] = Math.min(Math.max(r - dx, 0), 255);
        dest.data[ofs * 4 + x * 4 + 1] = Math.min(Math.max(g - dx, 0), 255);
        dest.data[ofs * 4 + x * 4 + 2] = Math.min(Math.max(b - dx, 0), 255);
        dest.data[ofs * 4 + x * 4 + 3] = 0xff;
      }
    }

    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("rain", new Rain());
