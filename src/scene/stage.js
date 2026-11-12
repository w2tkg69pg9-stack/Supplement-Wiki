// 3D-Bühne: baut Zell-Szenen aus wenigen Bausteinen (Membran, Kanäle, Organellen,
// Teilchenströme) und blendet sie schrittweise um.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const BG = 0x060a13;
const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// deterministischer Zufall, damit Szenen bei jedem Laden gleich aussehen
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function webglVerfuegbar() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export class Stage {
  constructor(container, { ruhig = false } = {}) {
    this.container = container;
    this.ruhig = ruhig;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 1);
    container.appendChild(this.renderer.domElement);

    this.labelLayer = document.createElement('div');
    this.labelLayer.className = 'labels';
    container.appendChild(this.labelLayer);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(BG, 0.006);
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 400);
    this.camera.position.set(0, 5, 34);

    // Hintergrund als Kugel statt Clear-Farbe: so stimmt der Farbton auch hinter der Nachbearbeitung
    this.scene.add(
      new THREE.Mesh(new THREE.SphereGeometry(150, 16, 12), new THREE.MeshBasicMaterial({ color: BG, side: THREE.BackSide, fog: false })),
    );
    this.scene.add(new THREE.HemisphereLight(0x9fc4ff, 0x10131f, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(8, 14, 12);
    this.scene.add(key);
    const rim = new THREE.PointLight(0x35e0c8, 40, 60);
    rim.position.set(-14, -6, 10);
    this.scene.add(rim);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 12;
    this.controls.maxDistance = 60;
    this.controls.target.set(0, -2, 0);
    this.controls.addEventListener('start', () => {
      this.camGoal = null;
      this.userMoved = true;
    });

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.42, 0.45, 0.62);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    this.root = new THREE.Group();
    this.scene.add(this.root);
    this._reset();

    this.last = 0;
    this.time = 0;
    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(container);
    this.resize();
    this._raf = 0;
    this._loop = this._loop.bind(this);
    this.running = false;
  }

  _reset() {
    this.flows = {};
    this.clouds = {};
    this.objs = {};
    this.membranes = [];
    this.labels = [];
    this.steps = [];
    this.step = 0;
    this.camGoal = null;
    this.userMoved = false;
    this.rand = rng(7);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this._raf = requestAnimationFrame(this._loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this._raf);
  }

  dispose() {
    this.stop();
    this.clear();
    this._ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labelLayer.remove();
  }

  resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    // schmale Displays: weiter weg, damit die ganze Szene reinpasst
    this.fit = Math.max(1, 1.5 / (w / h));
    this.camera.updateProjectionMatrix();
    this.size = { w, h };
    if (this.def) this._camTo(this._stepCam(this.step), true);
  }

  clear() {
    this.root.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    this.root.clear();
    this.labelLayer.replaceChildren();
    this._reset();
  }

  load(def) {
    this.clear();
    this.def = def;
    def.build(this);
    this.steps = def.steps;
    this.setStep(0, true);
  }

  // ── Material-Helfer ──────────────────────────────────────────────
  mat(color, { glow = 0.35, opacity = 1, rough = 0.45, metal = 0.05 } = {}) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: glow,
      roughness: rough,
      metalness: metal,
      transparent: opacity < 1,
      opacity,
      depthWrite: opacity >= 1,
    });
  }

  reg(name, obj) {
    const mats = [];
    obj.traverse((o) => o.material && !mats.includes(o.material) && mats.push(o.material));
    this.objs[name] = {
      obj,
      mats,
      base: {
        scale: obj.scale.x,
        mats: mats.map((m) => ({ color: m.color.clone(), glow: m.emissiveIntensity })),
        pos: obj.position.clone(),
      },
      goal: {},
    };
    return obj;
  }

  add(obj, name) {
    this.root.add(obj);
    if (name) this.reg(name, obj);
    return obj;
  }

  // ── Bausteine ────────────────────────────────────────────────────
  /** Lipid-Doppelschicht in der xz-Ebene. holes: [{x, r}] für Kanäle. */
  membrane({ y = 0, x0 = -13, x1 = 13, z0 = -5.5, z1 = 5.5, holes = [], color = 0x3a6ea5 } = {}) {
    const step = 0.62;
    const pts = [];
    for (let x = x0; x <= x1; x += step) {
      for (let z = z0; z <= z1; z += step) {
        if (holes.some((h) => Math.hypot(x - h.x, z - (h.z || 0)) < h.r)) continue;
        pts.push([x + (this.rand() - 0.5) * 0.2, z + (this.rand() - 0.5) * 0.2]);
      }
    }
    const geo = new THREE.SphereGeometry(0.3, 10, 8);
    const mesh = new THREE.InstancedMesh(geo, this.mat(color, { glow: 0.22, rough: 0.6 }), pts.length * 2);
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(x1 - x0 + 0.6, 0.85, z1 - z0 + 0.6),
      new THREE.MeshStandardMaterial({ color: 0xe8b65a, emissive: 0xe8b65a, emissiveIntensity: 0.1, transparent: true, opacity: 0.2, depthWrite: false }),
    );
    slab.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
    this.root.add(mesh, slab);
    this.membranes.push({ mesh, pts, y, m: new THREE.Matrix4() });
    return mesh;
  }

  /** Transportkanal: Ring aus Helices quer durch die Membran. */
  channel({ x, y = 0, z = 0, color = 0x8fd3ff, r = 0.85, n = 6, h = 2.6 }, name) {
    const g = new THREE.Group();
    const geo = new THREE.CapsuleGeometry(0.34, h - 0.68, 4, 10);
    const m = this.mat(color, { glow: 0.5 });
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const c = new THREE.Mesh(geo, m);
      c.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
      c.rotation.z = Math.cos(a) * 0.12;
      c.rotation.x = Math.sin(a) * 0.12;
      g.add(c);
    }
    g.position.set(x, y, z);
    return this.add(g, name);
  }

  /** Rezeptor (7 Helices, Bindetasche oben). */
  receptor({ x, y = 0, z = 0, color = 0xffb347 }, name) {
    const g = new THREE.Group();
    const geo = new THREE.CapsuleGeometry(0.33, 2.2, 4, 10);
    const m = this.mat(color, { glow: 0.45 });
    for (let i = 0; i < 7; i++) {
      const a = (i / 6) * Math.PI * 2;
      const rr = i === 6 ? 0 : 0.72;
      const c = new THREE.Mesh(geo, m);
      c.position.set(Math.cos(a) * rr, i === 6 ? -0.5 : 0, Math.sin(a) * rr);
      g.add(c);
    }
    const cup = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.2, 10, 24), m);
    cup.rotation.x = Math.PI / 2;
    cup.position.y = 1.45;
    g.add(cup);
    g.scale.setScalar(1.35);
    g.position.set(x, y, z);
    return this.add(g, name);
  }

  /** Knubbeliges Protein. */
  blob({ pos, r = 1, color = 0x9aa7c7, glow = 0.35, squash = [1, 1, 1] }, name) {
    const geo = new THREE.IcosahedronGeometry(r, 3);
    const p = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = 1 + 0.16 * Math.sin(v.x * 3.1 / r + pos[0]) * Math.cos(v.y * 2.7 / r) + 0.1 * Math.sin(v.z * 4.3 / r + pos[1]);
      v.multiplyScalar(n);
      p.setXYZ(i, v.x * squash[0], v.y * squash[1], v.z * squash[2]);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, this.mat(color, { glow }));
    mesh.position.copy(V(pos));
    return this.add(mesh, name);
  }

  sphere({ pos, r = 0.4, color = 0xffffff, glow = 0.8, opacity = 1 }, name) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), this.mat(color, { glow, opacity }));
    mesh.position.copy(V(pos));
    return this.add(mesh, name);
  }

  /** Mitochondrium: durchscheinende Hülle, innen Cristae. */
  mito({ pos, s = 1, color = 0xff8a3d }, name) {
    const g = new THREE.Group();
    const outer = new THREE.Mesh(new THREE.CapsuleGeometry(1.5, 3.4, 8, 20), this.mat(color, { glow: 0.25, opacity: 0.26 }));
    outer.rotation.z = Math.PI / 2;
    g.add(outer);
    const cm = this.mat(color, { glow: 0.7 });
    for (let i = 0; i < 6; i++) {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.14, 20, 1, false, 0, Math.PI * 1.25), cm);
      c.rotation.z = Math.PI / 2;
      c.rotation.x = i % 2 ? Math.PI * 0.8 : -Math.PI * 0.2;
      c.position.x = -2 + i * 0.8;
      g.add(c);
    }
    g.scale.setScalar(s);
    g.position.copy(V(pos));
    return this.add(g, name);
  }

  /** Zellkern mit Poren und DNA-Doppelhelix. Gibt {group, are} zurück. */
  nucleus({ pos, r = 5, color = 0x8f6bff }, name, areName) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.SphereGeometry(r, 40, 28), this.mat(color, { glow: 0.2, opacity: 0.18 })));
    const pm = this.mat(0xc5b3ff, { glow: 0.5 });
    const pg = new THREE.TorusGeometry(0.42, 0.13, 8, 18);
    for (let i = 0; i < 14; i++) {
      const th = this.rand() * Math.PI * 2;
      const ph = 0.25 + this.rand() * 1.0;
      const n = new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th));
      const t = new THREE.Mesh(pg, pm);
      t.position.copy(n).multiplyScalar(r);
      t.lookAt(n.clone().multiplyScalar(r * 2));
      g.add(t);
    }
    // DNA
    const n = 46;
    const helix = (color2, from, to) => {
      const cnt = (to - from) * 2;
      const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.2, 8, 6), this.mat(color2, { glow: 0.5 }), cnt);
      const m = new THREE.Matrix4();
      let k = 0;
      for (let i = from; i < to; i++) {
        const x = -r * 0.72 + (i / (n - 1)) * r * 1.44;
        const a = i * 0.55;
        for (const s of [0, Math.PI]) {
          m.setPosition(x, Math.cos(a + s) * 0.7 - 0.4, Math.sin(a + s) * 0.7);
          im.setMatrixAt(k++, m);
        }
      }
      return im;
    };
    g.add(helix(0x6f8cff, 0, 17), helix(0x6f8cff, 29, n));
    g.position.copy(V(pos));
    this.add(g, name);
    const are = helix(0xd7ff5e, 17, 29);
    are.material.emissiveIntensity = 0.25;
    g.add(are);
    if (areName) this.reg(areName, are);
    return g;
  }

  /** Proteasom: Tonne aus Ringen. */
  barrel({ pos, color = 0x7d8aa8 }, name) {
    const g = new THREE.Group();
    const m = this.mat(color, { glow: 0.3 });
    for (let i = 0; i < 4; i++) {
      const t = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.3, 10, 22), m);
      t.rotation.x = Math.PI / 2;
      t.position.y = -0.85 + i * 0.57;
      g.add(t);
    }
    g.rotation.z = 0.5;
    g.position.copy(V(pos));
    return this.add(g, name);
  }

  /** Myofibrille: Bündel gestreifter Filamente. */
  fibril({ pos, len = 9, color = 0xd96a7b }, name) {
    const g = new THREE.Group();
    const m = this.mat(color, { glow: 0.12, rough: 0.7 });
    const band = this.mat(0xf2a7b3, { glow: 0.2 });
    for (let i = 0; i < 7; i++) {
      const a = (i / 6) * Math.PI * 2;
      const rr = i === 6 ? 0 : 0.75;
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, len, 12), m);
      c.rotation.z = Math.PI / 2;
      c.position.set(0, Math.cos(a) * rr, Math.sin(a) * rr);
      g.add(c);
    }
    for (let i = 0; i < 5; i++) {
      const d = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.12, 20), band);
      d.rotation.z = Math.PI / 2;
      d.position.x = -len / 2 + (i + 0.5) * (len / 5);
      g.add(d);
    }
    g.position.copy(V(pos));
    return this.add(g, name);
  }

  /** Bakterien-Rasen auf einem Stück Zunge. */
  bacteria({ pos, color = 0x7de38d }, name) {
    const g = new THREE.Group();
    const pad = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 16), this.mat(0xd9737f, { glow: 0.18 }));
    pad.scale.set(1.25, 0.32, 1);
    pad.position.y = -1;
    g.add(pad);
    const geo = new THREE.CapsuleGeometry(0.28, 0.9, 4, 10);
    const m = this.mat(color, { glow: 0.6 });
    for (let i = 0; i < 12; i++) {
      const b = new THREE.Mesh(geo, m);
      b.position.set((this.rand() - 0.5) * 5.5, -0.35 + this.rand() * 0.3, (this.rand() - 0.5) * 3.5);
      b.rotation.set(this.rand() * 0.6, this.rand() * 3, Math.PI / 2 + (this.rand() - 0.5) * 0.8);
      g.add(b);
    }
    g.position.copy(V(pos));
    return this.add(g, name);
  }

  /** Blutgefäß-Querschnitt als Ring. */
  vessel({ pos, r = 2, color = 0xff5d73 }, name) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.42, 14, 40), this.mat(color, { glow: 0.45 }));
    t.position.copy(V(pos));
    return this.add(t, name);
  }

  /**
   * Teilchenstrom entlang eines oder mehrerer Pfade.
   * Pfadpunkt: [x, y, z, streuung]. Intensität 0..1 steuert, wie viele Teilchen sichtbar sind.
   */
  flow(name, { paths, color, count = 24, size = 0.26, speed = 0.12, glow = 1.5, spiky = false, closed = false }) {
    const geo = spiky ? new THREE.OctahedronGeometry(1, 0) : new THREE.SphereGeometry(1, 10, 8);
    const mesh = new THREE.InstancedMesh(geo, this.mat(color, { glow }), count);
    mesh.frustumCulled = false;
    const tables = paths.map((p) => {
      const curve = new THREE.CatmullRomCurve3(p.map(V), closed, 'catmullrom', 0.4);
      const N = 120;
      const pts = curve.getSpacedPoints(N);
      const spread = new Float32Array(N + 1);
      for (let i = 0; i <= N; i++) {
        const f = (i / N) * (p.length - (closed ? 0 : 1));
        const a = Math.floor(f) % p.length;
        const b = closed ? (a + 1) % p.length : Math.min(p.length - 1, a + 1);
        const sa = p[a][3] ?? 0.4;
        const sb = p[b][3] ?? 0.4;
        spread[i] = sa + (sb - sa) * (f - Math.floor(f));
      }
      return { pts, spread, N };
    });
    const parts = [];
    for (let i = 0; i < count; i++) {
      const th = this.rand() * Math.PI * 2;
      const z = this.rand() * 2 - 1;
      const s = Math.sqrt(1 - z * z);
      parts.push({
        path: i % paths.length,
        u0: this.rand(),
        dir: new THREE.Vector3(s * Math.cos(th), z, s * Math.sin(th)).multiplyScalar(0.35 + this.rand() * 0.65),
        ph: this.rand() * 6.28,
        k: 0.85 + this.rand() * 0.3,
      });
    }
    this.root.add(mesh);
    this.flows[name] = { mesh, tables, parts, size, speed, cur: 0, goal: 0, closed, m: new THREE.Matrix4() };
  }

  /** Wolke aus zitternden Teilchen in einer Box (Ansammlungen, Speicher). */
  cloud(name, { center, box, color, count = 50, size = 0.24, glow = 1.4, spiky = false }) {
    const geo = spiky ? new THREE.OctahedronGeometry(1, 0) : new THREE.SphereGeometry(1, 10, 8);
    const mesh = new THREE.InstancedMesh(geo, this.mat(color, { glow }), count);
    mesh.frustumCulled = false;
    const parts = [];
    for (let i = 0; i < count; i++) {
      parts.push({
        p: new THREE.Vector3(
          center[0] + (this.rand() - 0.5) * box[0],
          center[1] + (this.rand() - 0.5) * box[1],
          center[2] + (this.rand() - 0.5) * box[2],
        ),
        ph: this.rand() * 6.28,
        k: 0.5 + this.rand(),
      });
    }
    this.root.add(mesh);
    this.clouds[name] = { mesh, parts, size, cur: 0, goal: 0, m: new THREE.Matrix4() };
  }

  /** Beschriftung, die an einem Punkt in der Szene klebt. steps: nur in diesen Schritten sichtbar. */
  label(text, pos, { art = 'struktur', steps = null } = {}) {
    const el = document.createElement('div');
    el.className = `label label--${art}`;
    el.textContent = text;
    this.labelLayer.appendChild(el);
    this.labels.push({ el, pos: V(pos), steps, w: new THREE.Vector3() });
  }

  // ── Schritte ─────────────────────────────────────────────────────
  _stepCam(i) {
    const c = (this.steps[i] && this.steps[i].cam) || this.def.cam;
    const t = V(c.target);
    const p = V(c.pos).sub(t).multiplyScalar(this.fit || 1).add(t);
    return { p, t };
  }

  _camTo(goal, sofort = false) {
    if (sofort) {
      this.camera.position.copy(goal.p);
      this.controls.target.copy(goal.t);
      this.camGoal = null;
    } else {
      this.camGoal = goal;
    }
  }

  setStep(i, sofort = false) {
    this.step = i;
    const st = this.steps[i];
    for (const [n, f] of Object.entries(this.flows)) f.goal = (st.flows && st.flows[n]) || 0;
    for (const [n, c] of Object.entries(this.clouds)) c.goal = (st.flows && st.flows[n]) || 0;
    for (const [n, o] of Object.entries(this.objs)) o.goal = (st.set && st.set[n]) || {};
    for (const l of this.labels) l.el.classList.toggle('is-off', !!l.steps && !l.steps.includes(i));
    if (sofort) {
      for (const f of Object.values(this.flows)) f.cur = f.goal;
      for (const c of Object.values(this.clouds)) c.cur = c.goal;
      this._objs(1);
      this._camTo(this._stepCam(i), true);
    } else if (!this.userMoved || st.cam) {
      this._camTo(this._stepCam(i));
    }
  }

  _objs(k) {
    const col = new THREE.Color();
    for (const o of Object.values(this.objs)) {
      const g = o.goal;
      const s = g.scale ?? o.base.scale;
      const cs = o.obj.scale.x + (s - o.obj.scale.x) * k;
      o.obj.scale.setScalar(cs);
      o.obj.visible = cs > 0.01;
      o.mats.forEach((m, i) => {
        const b = o.base.mats[i];
        m.emissiveIntensity += ((g.glow ?? b.glow) - m.emissiveIntensity) * k;
        col.set(g.color ?? b.color);
        m.color.lerp(col, k);
        m.emissive.lerp(col, k);
      });
      if (g.pos) o.obj.position.lerp(V(g.pos), k);
      else o.obj.position.lerp(o.base.pos, k);
    }
  }

  // ── Frame ────────────────────────────────────────────────────────
  _loop() {
    if (!this.running) return;
    const jetzt = performance.now();
    const dt = Math.min(0.05, (jetzt - this.last) / 1000);
    this.last = jetzt;
    this.frame(dt);
    this._raf = requestAnimationFrame(this._loop);
  }

  frame(dt) {
    this.time += dt;
    const t = this.time;
    const k = 1 - Math.exp(-dt * 2.6);
    const q = new THREE.Quaternion();
    const sc = new THREE.Vector3();
    const p = new THREE.Vector3();

    for (const mb of this.membranes) {
      let i = 0;
      for (const [x, z] of mb.pts) {
        const w = Math.sin(x * 0.55 + t * 0.9) * 0.13 + Math.cos(z * 0.7 + t * 0.7) * 0.1;
        mb.m.setPosition(x, mb.y + 0.62 + w, z);
        mb.mesh.setMatrixAt(i++, mb.m);
        mb.m.setPosition(x, mb.y - 0.62 + w, z);
        mb.mesh.setMatrixAt(i++, mb.m);
      }
      mb.mesh.instanceMatrix.needsUpdate = true;
    }

    for (const f of Object.values(this.flows)) {
      f.cur += (f.goal - f.cur) * k;
      const n = f.parts.length;
      const vis = f.cur * n;
      for (let i = 0; i < n; i++) {
        const a = Math.min(1, Math.max(0, vis - i));
        const pt = f.parts[i];
        const tb = f.tables[pt.path];
        const u = (((pt.u0 + t * f.speed * pt.k) % 1) + 1) % 1;
        const fi = u * tb.N;
        const i0 = Math.floor(fi);
        const i1 = Math.min(tb.N, i0 + 1);
        const fr = fi - i0;
        p.copy(tb.pts[i0]).lerp(tb.pts[i1], fr);
        const sp = tb.spread[i0] + (tb.spread[i1] - tb.spread[i0]) * fr;
        p.addScaledVector(pt.dir, sp);
        p.x += Math.sin(t * 1.7 + pt.ph) * 0.08;
        p.y += Math.cos(t * 1.3 + pt.ph * 1.7) * 0.08;
        const fade = f.closed ? 1 : smooth(0, 0.07, u) * (1 - smooth(0.9, 1, u));
        const s = f.size * a * fade;
        sc.setScalar(Math.max(s, 0.0001));
        f.m.compose(p, q, sc);
        f.mesh.setMatrixAt(i, f.m);
      }
      f.mesh.visible = f.cur > 0.005;
      f.mesh.instanceMatrix.needsUpdate = true;
    }

    for (const c of Object.values(this.clouds)) {
      c.cur += (c.goal - c.cur) * k;
      const n = c.parts.length;
      const vis = c.cur * n;
      for (let i = 0; i < n; i++) {
        const a = Math.min(1, Math.max(0, vis - i));
        const pt = c.parts[i];
        p.copy(pt.p);
        p.x += Math.sin(t * pt.k + pt.ph) * 0.35;
        p.y += Math.cos(t * pt.k * 0.8 + pt.ph * 2) * 0.35;
        p.z += Math.sin(t * pt.k * 0.6 + pt.ph * 3) * 0.3;
        sc.setScalar(Math.max(c.size * a * (0.85 + 0.15 * Math.sin(t * 3 + pt.ph)), 0.0001));
        c.m.compose(p, q, sc);
        c.mesh.setMatrixAt(i, c.m);
      }
      c.mesh.visible = c.cur > 0.005;
      c.mesh.instanceMatrix.needsUpdate = true;
    }

    this._objs(k);

    if (!this.ruhig) this.root.rotation.y = Math.sin(t * 0.16) * 0.1;

    if (this.camGoal) {
      const kc = 1 - Math.exp(-dt * 2.2);
      this.camera.position.lerp(this.camGoal.p, kc);
      this.controls.target.lerp(this.camGoal.t, kc);
      if (this.camera.position.distanceTo(this.camGoal.p) < 0.05) this.camGoal = null;
    }
    this.controls.update();

    this.root.updateMatrixWorld();
    const { w, h } = this.size;
    for (const l of this.labels) {
      l.w.copy(l.pos).applyMatrix4(this.root.matrixWorld).project(this.camera);
      const on = l.w.z < 1 && Math.abs(l.w.x) < 1.05 && Math.abs(l.w.y) < 1.05;
      l.el.style.display = on ? '' : 'none';
      if (on) l.el.style.transform = `translate(-50%,-50%) translate(${((l.w.x + 1) / 2) * w}px,${((1 - l.w.y) / 2) * h}px)`;
    }

    this.composer.render();
  }
}
