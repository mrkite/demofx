interface Effect {
  init(width: number, height: number): Promise<void>;
  render(ctx: CanvasRenderingContext2D, time: number): void;
}
interface LoadedEffect {
  effect: Effect;
  ctx: CanvasRenderingContext2D | null;
}

class DemoFX {
  private effects: {[name: string]: LoadedEffect} = {};
  private runningEl: HTMLInputElement | null = null;
  private running: number | null = null;

  public register(name: string, effect: Effect): void {
    if (this.effects[name] != undefined) {
      throw new Error("Effect '" + name + "' is already registered.");
    }
    this.effects[name] = {effect, ctx: null};
  }

  public async loadImage(path: string): Promise<ImageData> {
    return new Promise<ImageData>((resolve: (img: ImageData) => void) => {
      const img: HTMLImageElement = document.createElement("img");
      img.onload = () => {
        const width: number = img.width;
        const height: number = img.height;
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (ctx != null) {
          ctx.drawImage(img, 0, 0, width, height);
          const pixels: ImageData = ctx.getImageData(0, 0, width, height);
          document.body.removeChild(canvas);
          resolve(pixels);
        }
      };
      img.src = path;
    });
  }

  public async toggle(name: string, el: HTMLInputElement): Promise<void> {
    const fx: LoadedEffect | undefined = this.effects[name];
    if (fx == undefined) {
      throw new Error("Effect not found: " + name);
    }
    if (fx.ctx == null) {
      const canvas = document.getElementById(name) as HTMLCanvasElement | null;
      if (canvas == null) {
        throw new Error("Canvas not found: " + name);
      }
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx == null) {
        throw new Error("No canvas suppport");
      }
      fx.ctx = ctx;
      await fx.effect.init(canvas.width, canvas.height);
    }

    // stop previous effect
    if (this.running != null) {
      window.cancelAnimationFrame(this.running);
      this.running = null;
      if (this.runningEl != null) {
        this.runningEl.value = "Run";
      }
    }
    // was previous effect this effect?
    if (el == this.runningEl) {
      this.runningEl = null;
      return;
    }

    // start new effect
    el.value = "Pause";
    this.runningEl = el;
    const render = (time: number): void => {
      if (fx.ctx != null) {
        fx.effect.render(fx.ctx, time);
        this.running = window.requestAnimationFrame(render);
      } else {
        this.running = null;
      }
    };
    this.running = window.requestAnimationFrame(render);
  }
}

const demoFX: DemoFX = new DemoFX();

async function toggle(name: string, el: HTMLInputElement): Promise<void> {
  await demoFX.toggle(name, el);
}
