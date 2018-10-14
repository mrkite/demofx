class Fire implements Effect {
  private width: number;
  private height: number;
  private palette: Uint8Array = new Uint8Array(256 * 4);
  private screen: Uint8Array = new Uint8Array(0);

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
    this.screen = new Uint8Array(this.width * (this.height + 2));

    let vOfs: number = 0;
    for (let v: number = 0; v < 256; v++) {
      this.palette[vOfs++] = v >> 1;
      this.palette[vOfs++] = v >> 3;
      this.palette[vOfs++] = v >> 4;
      vOfs++;
    }
  }

  public render(ctx: CanvasRenderingContext2D, _: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);
    let ofs: number = 0;
    // average screen
    for (; ofs < this.width * this.height; ofs++) {
      const y1: number = (this.screen[ofs + this.width - 1] +
                          this.screen[ofs + this.width]) >> 1;
      const y2: number = (this.screen[ofs + this.width * 2] +
                          this.screen[ofs + this.width * 2 + 1]) >> 1;
      this.screen[ofs] = Math.max(((y1 + y2) >> 1) - 2, 0);
    }
    // generate new lines
    for (; ofs < this.width * (this.height + 2); ofs++) {
      this.screen[ofs] = Math.random() > 0.5 ? 255 : 0;
    }
    // and output
    ofs = 0;
    for (let destOfs: number = 0; destOfs < this.width * this.height * 4;) {
      let pix: number = this.screen[ofs++] * 4;
      dest.data[destOfs++] = this.palette[pix++];
      dest.data[destOfs++] = this.palette[pix++];
      dest.data[destOfs++] = this.palette[pix++];
      dest.data[destOfs++] = 0xff;
    }
    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("fire", new Fire());
