interface MetaBlob {
  scaleX: number;
  scaleY: number;
  speed: number;
  x: number;
  y: number;
}

class MetaBlobs implements Effect {
  private width: number;
  private height: number;
  private numBlobs: number = 5;
  private blobs: MetaBlob[] = [];

  public async init(width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;

    for (let i: number = 0; i < this.numBlobs; i++) {
      this.blobs.push({scaleX: Math.random() * 0.6,
        scaleY: Math.random() * 0.6,
        speed: Math.random() * Math.PI * 32 - Math.PI * 16,
        x: 0, y: 0});
    }
  }

  public render(ctx: CanvasRenderingContext2D, t: number): void {
    const dest: ImageData = ctx.getImageData(0, 0, this.width, this.height);
    const time: number = t / 50000;

    let shift: number = 0;
    for (const b of this.blobs) {
      b.x = Math.sin((time + shift) * Math.PI * b.speed) * this.width *
          b.scaleX + this.width / 2;
      b.y = Math.cos((time + shift) * Math.PI * b.speed) * this.height *
          b.scaleY + this.height / 2;
      shift += 0.5;
    }

    let ofs: number = 0;
    for (let y: number = 0; y < this.height; y++) {
      for (let x: number = 0; x < this.width; x++) {
        let dSq: number = 1;
        for (const b of this.blobs) {
          const xSq: number = (x - b.x) * (x - b.x);
          const ySq: number = (y - b.y) * (y - b.y);
          dSq *= Math.sqrt(xSq + ySq);
        }
        const pix: number = Math.max(Math.min(Math.floor(1024 - (dSq / 3e8)),
                                              255), 0);
        dest.data[ofs++] = pix;
        dest.data[ofs++] = 0;
        dest.data[ofs++] = pix;
        dest.data[ofs++] = 0xff;
      }
    }
    ctx.putImageData(dest, 0, 0);
  }
}

demoFX.register("blob", new MetaBlobs());
