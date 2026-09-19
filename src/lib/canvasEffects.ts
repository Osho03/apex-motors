interface Particle {
  x: number;
  y: number;
  z: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
}

export class CanvasEffects {
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private warpSpeed = 1;
  private targetWarp = 1;
  private rafId: number | null = null;
  private io: IntersectionObserver | null = null;
  private inView = true;

  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    if (!this.canvas) {
      this.ctx = null;
      return;
    }
    this.ctx = this.canvas.getContext("2d");
    this.init();
  }

  init() {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    this.resize();
    window.addEventListener("resize", () => this.resize());

    const isMobile =
      window.innerWidth < 768 ||
      (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 1024);
    this.createParticles(isMobile ? 40 : 84);

    this.io = new IntersectionObserver(
      (entries) => {
        this.inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    if (this.canvas) this.io.observe(this.canvas);

    this.resize();
    this.animate();
  }

  private resize() {
    if (!this.canvas || !this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = (this.canvas.offsetWidth || window.innerWidth) * dpr;
    this.canvas.height = (this.canvas.offsetHeight || window.innerHeight) * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private createParticles(count: number) {
    const w = this.canvas?.offsetWidth || window.innerWidth;
    const h = this.canvas?.offsetHeight || window.innerHeight;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1000 + 100,
        length: Math.random() * 40 + 10,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.3 ? "#00f0ff" : "#ff3366",
      });
    }
  }

  setWarpSpeed(level: number) {
    this.targetWarp = level;
  }

  destroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.io?.disconnect();
    window.removeEventListener("resize", this.resize);
  }

  private animate() {
    if (!this.canvas || !this.ctx) return;

    if (this.inView && !document.hidden) {
      const w = this.canvas.offsetWidth || window.innerWidth;
      const h = this.canvas.offsetHeight || window.innerHeight;

      this.warpSpeed += (this.targetWarp - this.warpSpeed) * 0.08;

      this.ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h * 0.65;

      this.ctx.lineWidth = Math.max(1, this.warpSpeed * 0.8);
      this.particles.forEach((p) => {
        p.z -= p.speed * this.warpSpeed * 2.5;
        if (p.z <= 10) {
          p.z = 1000;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }

        const factor = 250 / p.z;
        const sx = (p.x - centerX) * factor + centerX;
        const sy = (p.y - centerY) * factor + centerY;

        const prevFactor = 250 / (p.z + p.length * this.warpSpeed);
        const px = (p.x - centerX) * prevFactor + centerX;
        const py = (p.y - centerY) * prevFactor + centerY;

        if (sx >= 0 && sx <= w && sy >= 0 && sy <= h) {
          this.ctx!.beginPath();
          this.ctx!.strokeStyle = p.color;
          this.ctx!.globalAlpha = p.opacity * Math.min(1, (1000 - p.z) / 400);
          this.ctx!.moveTo(px, py);
          this.ctx!.lineTo(sx, sy);
          this.ctx!.stroke();
        }
      });

      this.ctx.globalAlpha = 1.0;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}