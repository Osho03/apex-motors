import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Reflector } from "three/addons/objects/Reflector.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import gsap from "gsap";

export interface HoloConfig {
  name: string;
  stat: string;
  body: number;
  accent: number;
  embed?: string;
}

export const HOLO_CONFIGS: Record<string, HoloConfig> = {
  "bugatti-chiron-ss": {
    name: "BUGATTI CHIRON SUPER SPORT",
    stat: "1577 HP // W16",
    body: 0x1746d4,
    accent: 0x4dc8ff,
    embed: "https://sketchfab.com/models/6a7520f6853f433eb200ed10fef96f94/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "koenigsegg-jesko-absolut": {
    name: "KOENIGSEGG JESKO ABSOLUT",
    stat: "1600 HP // V8",
    body: 0xe8eaf0,
    accent: 0x00f0ff,
    embed: "https://sketchfab.com/models/79d63459afd347c1999e9c0312c3b756/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "rimac-nevera": {
    name: "RIMAC NEVERA",
    stat: "1914 HP // EV",
    body: 0x0f1013,
    accent: 0x00ff8c,
    embed: "https://sketchfab.com/models/d3700fc37a2c4a61adb33ac3ffedd787/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "pagani-utopia": {
    name: "PAGANI UTOPIA",
    stat: "864 HP // V12",
    body: 0xb0893f,
    accent: 0xffbf59,
    embed: "https://sketchfab.com/models/6234da4b156440a6bd9ae8e95cd410f7/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
  "porsche-911-gt3rs": {
    name: "PORSCHE 911 GT3 RS",
    stat: "518 HP // BOXER-6",
    body: 0xd90429,
    accent: 0xff7182,
    embed: "https://sketchfab.com/models/0120592500644be08f935399d1e05d6c/embed?autospin=1&autostart=1&preload=1&transparent=1",
  },
};

interface DustParticle {
  x: number;
  y: number;
  z: number;
  s: number;
}

interface WheelSpinner extends THREE.Group {
  userData: { spinRate?: number };
}

export class ThreeDStage {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private carGroup!: THREE.Group;
  private wingGroup!: THREE.Group;
  private wheels: Record<string, WheelSpinner> = {};
  private currentId = "bugatti-chiron-ss";
  private visible = false;
  private introStarted = false;
  private carScaleTarget = 0.001;
  private carScale = 0.001;
  private pulse = 1;
  private orbitEnabled = true;
  private paused = false;
  private dust: DustParticle[] = [];
  private clock = new THREE.Clock();
  private rafId: number | null = null;
  private ro: ResizeObserver | null = null;
  private isMobile = false;
  private frame = 0;

  private bodyMat!: THREE.MeshPhysicalMaterial;
  private caliperMat!: THREE.MeshStandardMaterial;
  private glowMat!: THREE.MeshBasicMaterial;
  private ringMat!: THREE.MeshBasicMaterial;
  private dustMat!: THREE.PointsMaterial;
  private underglowLight!: THREE.PointLight;
  private dustGeo!: THREE.BufferGeometry;

  private onSelectCar?: (id: string) => void;
  onNoWebGL?: () => void;

  constructor(canvas: HTMLCanvasElement, container: HTMLElement, onSelectCar?: (id: string) => void) {
    this.canvas = canvas;
    this.container = container;
    this.onSelectCar = onSelectCar;
  }

  init() {
    this.isMobile =
      window.innerWidth < 768 ||
      (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 1024);

    try {
      this.initRenderer();
    } catch (err) {
      console.warn("WebGL unavailable for holodeck:", err);
      this.onNoWebGL?.();
      return;
    }

    this.buildScene();
    this.buildStage();
    this.buildHypercar();
    this.buildDust();
    this.setCar(this.currentId, true);

    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.container);

    const io = new IntersectionObserver(
      (entries) => {
        this.visible = entries[0].isIntersecting;
        if (this.visible && !this.introStarted) {
          this.introStarted = true;
          this.carScaleTarget = 1;
        }
      },
      { threshold: 0.03 }
    );
    io.observe(this.container);
    this.animate();
  }

  private initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.isMobile,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.5 : 2)
    );
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
  }

  private buildScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null;
    this.scene.fog = new THREE.Fog(0x05070c, 14, 30);

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    this.camera.position.set(0, 2.7, 8.4);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.95, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.enablePan = false;
    this.controls.minDistance = 5.5;
    this.controls.maxDistance = 13.5;
    this.controls.maxPolarAngle = 1.35;
    this.controls.minPolarAngle = 0.25;
    this.controls.update();

    try {
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    } catch (err) {
      console.warn("Environment reflections unavailable:", err);
    }

    const hemi = new THREE.HemisphereLight(0xd7e5ff, 0x0c0e16, 0.95);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.9);
    key.position.set(6, 9, 5);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x99ccff, 0.45);
    rim.position.set(-4, 4, -6);
    this.scene.add(rim);

    this.underglowLight = new THREE.PointLight(0xffffff, 3, 6, 2);
    this.underglowLight.position.set(0, 0.35, 0);
    this.scene.add(this.underglowLight);

    const exhaustGlow = new THREE.PointLight(0xff6a00, 1.6, 3, 2);
    exhaustGlow.position.set(-2.55, 0.7, 0);
    this.scene.add(exhaustGlow);
  }

  private buildStage() {
    const reflRes = this.isMobile ? 512 : 1024;
    const floor = new Reflector(new THREE.PlaneGeometry(18, 18), {
      clipBias: 0.003,
      color: 0x07090f,
      textureWidth: reflRes,
      textureHeight: reflRes,
    });
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    this.glowMat = new THREE.MeshBasicMaterial({
      color: HOLO_CONFIGS[this.currentId].accent,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowDisc = new THREE.Mesh(new THREE.CircleGeometry(2.3, 64), this.glowMat);
    glowDisc.rotation.x = -Math.PI / 2;
    glowDisc.position.y = 0.02;
    this.scene.add(glowDisc);

    this.ringMat = new THREE.MeshBasicMaterial({
      color: HOLO_CONFIGS[this.currentId].accent,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const stageRing = new THREE.Mesh(new THREE.RingGeometry(2.75, 2.92, 96), this.ringMat);
    stageRing.rotation.x = -Math.PI / 2;
    stageRing.position.y = 0.02;
    this.scene.add(stageRing);

    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const outerRing = new THREE.Mesh(new THREE.RingGeometry(4.4, 4.46, 96), outerMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.015;
    this.scene.add(outerRing);
  }

  private buildHypercar() {
    this.carGroup = new THREE.Group();

    const cfg = HOLO_CONFIGS[this.currentId];

    this.bodyMat = new THREE.MeshPhysicalMaterial({
      color: cfg.body,
      metalness: 0.85,
      roughness: 0.26,
      clearcoat: 1.0,
      clearcoatRoughness: 0.16,
      envMapIntensity: 1.3,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x12151b,
      metalness: 0.6,
      roughness: 0.45,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0d13,
      metalness: 0.2,
      roughness: 0.05,
      transparent: true,
      opacity: 0.86,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
    });

    const emissiveWhite = new THREE.MeshBasicMaterial({ color: 0xcfeaff });
    const emissiveRed = new THREE.MeshBasicMaterial({ color: 0xff2a30 });
    const emissiveTitan = new THREE.MeshBasicMaterial({ color: 0xff7b1a, side: THREE.DoubleSide });

    this.caliperMat = new THREE.MeshStandardMaterial({
      color: cfg.accent,
      metalness: 0.4,
      roughness: 0.3,
      emissive: cfg.accent,
      emissiveIntensity: 0.55,
    });

    const profile: [number, number][] = [
      [2.55, 0.55],
      [2.5, 0.6],
      [2.25, 0.63],
      [2.05, 0.68],
      [1.7, 0.7],
      [1.45, 0.78],
      [1.15, 0.96],
      [0.72, 1.04],
      [0.25, 1.06],
      [-0.15, 1.04],
      [-0.65, 0.98],
      [-1.15, 0.9],
      [-1.6, 0.86],
      [-2.05, 0.82],
      [-2.5, 0.74],
      [-2.52, 0.5],
      [-2.0, 0.4],
      [-1.2, 0.36],
      [0.0, 0.35],
      [1.2, 0.35],
      [2.1, 0.38],
      [2.52, 0.44],
    ];

    const shape = new THREE.Shape();
    profile.forEach((pt, i) => {
      if (i === 0) shape.moveTo(pt[0], pt[1]);
      else shape.lineTo(pt[0], pt[1]);
    });
    shape.closePath();

    const bodyGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.9,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 6,
      curveSegments: 24,
    });
    bodyGeo.translate(0, 0, -0.95);

    const body = new THREE.Mesh(bodyGeo, this.bodyMat);
    this.carGroup.add(body);

    const nuzzle = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.34), carbonMat);
    nuzzle.position.set(2.35, 0.5, 0.78);
    this.carGroup.add(nuzzle);
    const nuzzleB = nuzzle.clone();
    nuzzleB.position.z = -0.78;
    this.carGroup.add(nuzzleB);

    const splitter = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 1.35), carbonMat);
    splitter.position.set(2.35, 0.39, 0);
    this.carGroup.add(splitter);

    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 1.15), carbonMat);
    diffuser.position.set(-2.35, 0.42, 0);
    this.carGroup.add(diffuser);

    const skirtFront = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.1, 0.1), carbonMat);
    skirtFront.position.set(0, 0.4, 0.98);
    this.carGroup.add(skirtFront);
    const skirtRear = skirtFront.clone();
    skirtRear.position.z = -0.98;
    this.carGroup.add(skirtRear);

    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 20), glassMat);
    canopy.scale.set(1.35, 0.58, 0.62);
    canopy.position.set(0.05, 1.0, 0);
    this.carGroup.add(canopy);

    this.wingGroup = new THREE.Group();
    this.wingGroup.position.set(-2.0, 0.98, 0);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 2.0), carbonMat);
    wing.rotation.x = -0.2;
    this.wingGroup.add(wing);

    const plateGeo = new THREE.BoxGeometry(0.6, 0.32, 0.05);
    const plateL = new THREE.Mesh(plateGeo, carbonMat);
    plateL.position.z = -0.99;
    this.wingGroup.add(plateL);
    const plateR = plateL.clone();
    plateR.position.z = 0.99;
    this.wingGroup.add(plateR);

    const strutL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.24, 0.06), carbonMat);
    strutL.position.set(0.14, -0.12, -0.7);
    this.wingGroup.add(strutL);
    const strutR = strutL.clone();
    strutR.position.z = 0.7;
    this.wingGroup.add(strutR);

    this.carGroup.add(this.wingGroup);

    const headlightGeo = new THREE.BoxGeometry(0.16, 0.08, 0.05);
    const headL = new THREE.Mesh(headlightGeo, emissiveWhite);
    headL.position.set(2.42, 0.64, 0.42);
    this.carGroup.add(headL);
    const headR = headL.clone();
    headR.position.z = -0.42;
    this.carGroup.add(headR);

    const taillight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 1.3), emissiveRed);
    taillight.position.set(-2.52, 0.72, 0);
    this.carGroup.add(taillight);

    const exhaustGeo = new THREE.TorusGeometry(0.11, 0.045, 12, 24);
    const exhaustMat = emissiveTitan;
    [
      [0.3, 0],
      [0.18, 0.44],
      [-0.18, 0.44],
      [-0.3, 0],
    ].forEach(([zx, zy]) => {
      const tip = new THREE.Mesh(exhaustGeo, exhaustMat);
      tip.rotation.y = Math.PI / 2;
      tip.position.set(-2.55, 0.55 + zy * 0.35, zx * 0.55);
      this.carGroup.add(tip);
    });

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0a0b0d, roughness: 0.92, metalness: 0.1 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xb9c0ca, metalness: 0.9, roughness: 0.28 });
    const spokeMat = new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.3 });
    const discMat = new THREE.MeshBasicMaterial({ color: 0xff7b1a, side: THREE.DoubleSide });

    const makeWheel = (x: number, z: number): WheelSpinner => {
      const spin = new THREE.Group() as WheelSpinner;
      spin.position.set(x, 0.42, z);
      const outward = Math.sign(z);

      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 40), wheelMat);
      tire.rotation.x = Math.PI / 2;
      spin.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.32, 32), rimMat);
      rim.rotation.x = Math.PI / 2;
      spin.add(rim);

      for (let i = 0; i < 5; i++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.31), spokeMat);
        spoke.position.y = 0.11;
        spoke.rotation.z = (i / 5) * Math.PI * 2;
        spin.add(spoke);
      }

      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.28), this.caliperMat);
      caliper.position.set(0.13, -0.04, 0.02);
      spin.add(caliper);

      const disc = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.21, 32), discMat);
      disc.position.z = 0.17 * outward;
      spin.add(disc);

      this.carGroup.add(spin);
      return spin;
    };

    this.wheels = {
      frontR: makeWheel(1.55, 0.95),
      frontL: makeWheel(1.55, -0.95),
      rearR: makeWheel(-1.55, 0.95),
      rearL: makeWheel(-1.55, -0.95),
    };

    this.carGroup.scale.setScalar(0.001);
    this.scene.add(this.carGroup);
  }

  private buildDust() {
    const COUNT = 200;
    const positions = new Float32Array(COUNT * 3);
    this.dust = [];
    for (let i = 0; i < COUNT; i++) {
      const p = {
        x: (Math.random() - 0.5) * 9,
        y: Math.random() * 3.2,
        z: (Math.random() - 0.5) * 9,
        s: 0.08 + Math.random() * 0.16,
      };
      this.dust.push(p);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.dustGeo = geo;

    this.dustMat = new THREE.PointsMaterial({
      color: HOLO_CONFIGS[this.currentId].accent,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.scene.add(new THREE.Points(geo, this.dustMat));
  }

  setCar(id: string, silent = false) {
    const cfg = HOLO_CONFIGS[id];
    if (!cfg) return;
    this.currentId = id;

    this.bodyMat.color.setHex(cfg.body);
    this.caliperMat.color.setHex(cfg.accent);
    this.caliperMat.emissive.setHex(cfg.accent);
    this.glowMat.color.setHex(cfg.accent);
    this.ringMat.color.setHex(cfg.accent);
    this.dustMat.color.setHex(cfg.accent);
    this.underglowLight.color.setHex(cfg.accent);

    if (!silent) {
      const proxy = { v: 0 };
      gsap.fromTo(
        proxy,
        { v: 0 },
        {
          v: 1,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          onUpdate: () => {
            this.pulse = 0.94 + proxy.v * 0.06;
          },
        }
      );
      this.onSelectCar?.(id);
    }
  }

  setOrbitEnabled(enabled: boolean) {
    this.orbitEnabled = enabled;
  }

  setPaused(paused: boolean) {
    this.paused = paused;
    this.controls.enabled = !paused;
  }

  private updateDust(dt: number) {
    const attr = this.dustGeo.attributes.position;
    for (let i = 0; i < this.dust.length; i++) {
      const p = this.dust[i];
      p.y += p.s * dt;
      if (p.y > 3.4) p.y = 0;
      attr.setXYZ(i, p.x, p.y, p.z);
    }
    attr.needsUpdate = true;
  }

  private animate() {
    const loop = () => {
      this.rafId = requestAnimationFrame(loop);

      if (this.paused) return;

      const dt = Math.min(0.05, this.clock.getDelta());
      const t = this.clock.elapsedTime;

      this.carScale += (this.carScaleTarget - this.carScale) * 0.06;
      this.pulse += (1 - this.pulse) * 0.08;
      this.carGroup.scale.setScalar(Math.max(0.0001, this.carScale * this.pulse));
      this.carGroup.rotation.y += this.orbitEnabled ? dt * 0.3 : 0;
      this.carGroup.position.y = 0.02 + Math.sin(t * 1.4) * 0.015;

      this.wingGroup.rotation.x = -0.2 + Math.sin(t * 0.7) * 0.05;

      const spinRate = this.orbitEnabled ? 5 : 1.2;
      for (const key in this.wheels) {
        this.wheels[key].rotation.z -= dt * spinRate;
      }

      this.glowMat.opacity = 0.26 + Math.sin(t * 1.8) * 0.07;
      this.ringMat.opacity = 0.42 + Math.sin(t * 1.8 + 1) * 0.1;
      this.underglowLight.intensity = 3 + Math.sin(t * 1.8) * 0.8;

      this.updateDust(dt);

      if (this.visible && !document.hidden) {
        this.frame++;
        // Phones render at half rate (30fps) — physics stay per-frame, only
        // the expensive GL render is throttled for smooth experience.
        if (this.frame % (this.isMobile ? 2 : 1) === 0) {
          this.controls.update();
          this.renderer.render(this.scene, this.camera);
        }
      }
    };
    loop();
  }

  private resize() {
    if (!this.renderer) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  destroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.ro?.disconnect();
    this.controls?.dispose();
    this.renderer?.dispose();
    this.scene?.clear();
  }
}