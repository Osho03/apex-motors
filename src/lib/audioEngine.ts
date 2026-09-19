import type { EngineType } from "./types";

export interface RPMData {
  rpm: number;
  percent: number;
  maxRPM: number;
  idleRPM: number;
  throttleActive: boolean;
}

interface EnginePreset {
  src: string;
  idleRPM: number;
  maxRPM: number;
  idleRate: number;
  maxRate: number;
  idleGain: number;
  maxGain: number;
}

const PRESETS: Record<EngineType, EnginePreset> = {
  w16: {
    src: "/sounds/engine-w16.mp3",
    idleRPM: 850,
    maxRPM: 7200,
    idleRate: 0.8,
    maxRate: 1.35,
    idleGain: 0.28,
    maxGain: 0.9,
  },
  v12: {
    src: "/sounds/engine-v12.mp3",
    idleRPM: 950,
    maxRPM: 9500,
    idleRate: 0.8,
    maxRate: 1.3,
    idleGain: 0.28,
    maxGain: 0.9,
  },
  v8: {
    src: "/sounds/engine-v8.mp3",
    idleRPM: 900,
    maxRPM: 8600,
    idleRate: 0.8,
    maxRate: 1.3,
    idleGain: 0.28,
    maxGain: 0.9,
  },
  boxer6: {
    src: "/sounds/engine-boxer6.mp3",
    idleRPM: 900,
    maxRPM: 9000,
    idleRate: 0.8,
    maxRate: 1.28,
    idleGain: 0.28,
    maxGain: 0.88,
  },
  ev: {
    src: "/sounds/engine-ev.mp3",
    idleRPM: 0,
    maxRPM: 20000,
    idleRate: 0.5,
    maxRate: 1.9,
    idleGain: 0.18,
    maxGain: 0.8,
  },
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private buffers = new Map<EngineType, AudioBuffer>();
  private loads: Partial<Record<EngineType, Promise<void>>> = {};

  private source: AudioBufferSourceNode | null = null;
  private srcGain: GainNode | null = null;

  private isPlaying = false;
  private isMuted = false;
  private isThrottlePressed = false;
  private currentRPM = 1000;
  private targetRPM = 1000;
  private engineType: EngineType = "w16";
  private rpmListeners: ((data: RPMData) => void)[] = [];
  private animationFrameId: number | null = null;
  private wantStart = false;

  init() {
    if (this.ctx) return;
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextCtor) return;

    this.ctx = new AudioContextCtor();

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(18, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.004, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.16, this.ctx.currentTime);

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);

    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.preloadAll();

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    this.startRpmLoop();
  }

  private preloadAll() {
    for (const type of Object.keys(PRESETS) as EngineType[]) {
      this.loadBuffer(type);
    }
  }

  private loadBuffer(type: EngineType): Promise<void> {
    if (this.buffers.has(type)) return Promise.resolve();
    if (this.loads[type]) return this.loads[type]!;

    const p = (async () => {
      if (!this.ctx) return;
      try {
        const res = await fetch(PRESETS[type].src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arrayBuf = await res.arrayBuffer();
        const buffer = await this.ctx.decodeAudioData(arrayBuf);
        this.buffers.set(type, buffer);
        if (this.wantStart && type === this.engineType) {
          this.wantStart = false;
          this.playCurrent();
        }
      } catch (err) {
        console.warn(`AudioEngine: failed to load ${PRESETS[type].src}`, err);
        this.loads[type] = undefined;
      }
    })();

    this.loads[type] = p;
    return p;
  }

  setEngineType(type: EngineType) {
    this.engineType = type;
    this.resetToPreset();
    if (this.isPlaying) {
      this.playCurrent();
    }
    this.loadBuffer(type);
  }

  private resetToPreset() {
    const p = PRESETS[this.engineType];
    this.currentRPM = p.idleRPM;
    this.targetRPM = p.idleRPM;
  }

  startEngine() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.buffers.has(this.engineType)) {
      this.playCurrent();
    } else {
      this.wantStart = true;
      this.loadBuffer(this.engineType);
    }
  }

  private playCurrent() {
    if (!this.ctx) return;

    if (this.source) {
      this.teardownSource();
    }

    const buffer = this.buffers.get(this.engineType);
    if (!buffer) return;

    this.srcGain = this.ctx.createGain();
    const preset = PRESETS[this.engineType];
    this.srcGain.gain.setValueAtTime(
      this.isThrottlePressed ? preset.maxGain * 0.8 : preset.idleGain,
      this.ctx.currentTime
    );

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.playbackRate.setValueAtTime(
      this.rateForPercent(this.rpmPercent()),
      this.ctx.currentTime
    );

    source.connect(this.srcGain);
    this.srcGain.connect(this.compressor ?? this.ctx.destination);
    source.start();

    this.source = source;
  }

  private rpmPercent() {
    const p = PRESETS[this.engineType];
    if (p.maxRPM <= p.idleRPM) return 0;
    return Math.min(
      1,
      Math.max(0, (this.currentRPM - p.idleRPM) / (p.maxRPM - p.idleRPM))
    );
  }

  private rateForPercent(percent: number) {
    const p = PRESETS[this.engineType];
    return p.idleRate + percent * (p.maxRate - p.idleRate);
  }

  private gainForPercent(percent: number) {
    const p = PRESETS[this.engineType];
    return p.idleGain + percent * (p.maxGain - p.idleGain);
  }

  pressThrottle() {
    if (!this.isPlaying) this.startEngine();
    this.isThrottlePressed = true;
    this.targetRPM = PRESETS[this.engineType].maxRPM * 0.95;
  }

  releaseThrottle() {
    this.isThrottlePressed = false;
    this.targetRPM = PRESETS[this.engineType].idleRPM;
  }

  stop() {
    if (this.isPlaying) {
      this.fadeOutSource();
    }
    this.isPlaying = false;
    this.isThrottlePressed = false;
    this.resetToPreset();
  }

  private fadeOutSource() {
    const source = this.source;
    const gain = this.srcGain;
    if (!source || !gain || !this.ctx) {
      this.teardownSource();
      return;
    }
    const now = this.ctx.currentTime;
    gain.gain.setTargetAtTime(0.0001, now, 0.05);
    try {
      source.stop(now + 0.35);
    } catch {
      /* already stopped */
    }
    setTimeout(() => this.teardownSource(), 450);
  }

  private teardownSource() {
    try {
      this.source?.stop();
    } catch {
      /* ignore */
    }
    try {
      this.source?.disconnect();
      this.srcGain?.disconnect();
    } catch {
      /* ignore */
    }
    this.source = null;
    this.srcGain = null;
  }

  private startRpmLoop() {
    const update = () => {
      if (this.ctx) {
        const preset = PRESETS[this.engineType];
        const smoothing = this.isThrottlePressed ? 0.09 : 0.045;
        this.currentRPM += (this.targetRPM - this.currentRPM) * smoothing;
        this.currentRPM = Math.max(
          preset.idleRPM,
          Math.min(preset.maxRPM, this.currentRPM)
        );

        if (this.isPlaying && this.source && this.srcGain && this.ctx) {
          const percent = this.rpmPercent();
          const now = this.ctx.currentTime;
          this.source.playbackRate.setTargetAtTime(
            this.rateForPercent(percent),
            now,
            0.04
          );
          this.srcGain.gain.setTargetAtTime(
            this.gainForPercent(percent),
            now,
            0.07
          );
        }

        this.rpmListeners.forEach((listener) => {
          listener({
            rpm: Math.round(this.currentRPM),
            percent: this.rpmPercent(),
            maxRPM: preset.maxRPM,
            idleRPM: preset.idleRPM,
            throttleActive: this.isThrottlePressed,
          });
        });
      }

      this.animationFrameId = requestAnimationFrame(update);
    };

    update();
  }

  onRPMChange(callback: (data: RPMData) => void): () => void {
    this.rpmListeners.push(callback);
    return () => {
      this.rpmListeners = this.rpmListeners.filter((l) => l !== callback);
    };
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, now, 0.05);
    }
    return this.isMuted;
  }

  isSoundMuted(): boolean {
    return this.isMuted;
  }

  stopNodes() {
    this.stop();
  }

  getEngineType(): EngineType {
    return this.engineType;
  }
}

export const audioEngine = new AudioEngine();