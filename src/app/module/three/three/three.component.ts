import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.less'],
})
export class ThreeComponent implements OnInit {
  cubes: Mesh<BoxGeometry, MeshBasicMaterial>[] = [];
  camera!: PerspectiveCamera;
  scene!: Scene;
  renderer!: WebGLRenderer;
  canvasElement!: HTMLCanvasElement;
  geometry!: BoxGeometry;
  material!: MeshBasicMaterial;
  light!: DirectionalLight;
  constructor(private el: ElementRef,private zone: NgZone) {
    console.log(zone);
    
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.canvasElement = this.el.nativeElement.querySelector('#c');
    this.initThree();
    requestAnimationFrame((time) => {
      this.render(time);
    });
  }
  initThree() {
    // 渲染器 相当于画布
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvasElement,
    });
    // 场景
    this.scene = new THREE.Scene();
    // 透视相机75：可视角度 2 长宽比例，短距，长距
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvasElement.clientWidth / this.canvasElement.clientHeight,
      0.1,
      5
    );
    // 相机后移2
    this.camera.position.z = 2;
    // 几何形状 长宽高 正方体
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    // 材质
    this.material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    // Mesh集合构成几何体
    this.cubes = [
      this.makeInstance(0x44aa88, 0),
      this.makeInstance(0x8844aa, -2),
      this.makeInstance(0xaa8844, 2),
    ];
    // 添加场景
    this.scene.add(...this.cubes);
    this.scene.add(this.addLight());
    // 渲染
    this.renderer.render(this.scene, this.camera);
  }
  resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    renderer.setPixelRatio(window.devicePixelRatio);
    return true;
  }
  render(time: number) {
    time *= 0.001; // 将时间单位变为秒
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame((time) => {
      this.render(time);
    });
  }
  addLight() {
    const color = 0xffffff;
    const intensity = 1;
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(-1, 2, 4);
    return this.light;
  }
  makeInstance(color: number, x: number) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(this.geometry, material);
    this.scene.add(cube);

    cube.position.x = x;

    return cube;
  }
}
