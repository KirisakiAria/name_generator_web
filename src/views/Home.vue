<template>
  <section class="home">
    <header class="header">
      <div class="logo">
        <a href="https://www.bianzizai.com">
          <img src="../assets/img/logo.png" alt="彼岸自在 最懂你的ID生成器" />
          <span>彼岸自在</span>
        </a>
      </div>
      <nav class="nav" v-if="window.innerWidth <= 750">
        <button @click="toggleMenu">
          <i class="iconfont icon-menu"></i>
        </button>
        <transition name="fade">
          <div v-if="menu" class="menu">
            <div class="menu-header">
              <button @click="menu = false" class="close-btn">
                <i class="iconfont icon-close"></i>
              </button>
            </div>
            <ul>
              <li v-for="(item, index) in link" :key="index">
                <router-link :to="item.path">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </transition>
      </nav>
      <nav class="nav" v-else>
        <ul class="menu-pc">
          <li v-for="(item, index) in link" :key="index">
            <router-link :to="item.path">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <section class="main">
      <div class="infinite-lights" id="infinite-lights"></div>
      <section class="screen">
        <h1>
          <a href="https://www.bianzizai.com">
            <img
              src="../assets/img/bianzizai.png"
              alt="彼岸自在 最懂你的ID生成器"
            />
          </a>
        </h1>
        <p>最懂你的ID生成器</p>
        <div class="android">
          <img src="../assets/img/android.png" alt="彼岸自在" />
        </div>
      </section>
      <section class="second">
        <h5>
          彼岸自在是一个功能强大的ID生成器（安卓端），它可以根据您选择类型（中国风和日式）来生成您指定字数的ID。我们的ID库极其庞大，您一定可以从中找到属于您的独一无二的专属ID！登陆之后还将享有更多功能！
        </h5>
        <div class="swiper">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, key) in displayImg" :key="key">
              <img :src="item.img" alt="彼岸自在 最懂你的ID生成器" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </section>
    </section>
    <footer-bar :white="true" />
  </section>
</template>
<script>
  import * as THREE from 'three'
  const POSTPROCESSING = require('postprocessing')
  import mixin from '../mixin/mixin'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'Home',
    mixins: [mixin],
    data() {
      return {
        window: window,
        menu: false,
        downloadLink: '',
        link: [
          {
            name: '隐私政策',
            path: 'privacypolicy',
          },
          {
            name: '服务条款',
            path: 'terms',
          },
          {
            name: '使用方法',
            path: 'usage',
          },
        ],
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          autoplay: {
            delay: 4000,
          },
          effect: 'coverflow',
          slidesPerView: 3,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows: true,
          },
          loop: true,
        },
        displayImg: [
          { img: require('../assets/img/1.png') },
          { img: require('../assets/img/2.png') },
          { img: require('../assets/img/3.png') },
          { img: require('../assets/img/4.png') },
          { img: require('../assets/img/5.png') },
          { img: require('../assets/img/6.png') },
        ],
      }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    methods: {
      toggleMenu() {
        this.menu = !this.menu
      },
      setApp() {
        class App {
          constructor(container, options = {}) {
            // Init ThreeJS Basics
            this.options = options

            if (this.options.distortion == null) {
              this.options.distortion = {
                uniforms: distortion_uniforms,
                getDistortion: distortion_vertex,
              }
            }
            this.container = container
            this.renderer = new THREE.WebGLRenderer({
              antialias: false,
            })
            this.renderer.setSize(
              container.offsetWidth,
              container.offsetHeight,
              false,
            )
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.composer = new POSTPROCESSING.EffectComposer(this.renderer)
            container.append(this.renderer.domElement)

            this.camera = new THREE.PerspectiveCamera(
              options.fov,
              container.offsetWidth / container.offsetHeight,
              0.1,
              10000,
            )
            this.camera.position.z = -5
            this.camera.position.y = 8
            this.camera.position.x = 0
            // this.camera.rotateX(-0.4);
            this.scene = new THREE.Scene()

            let fog = new THREE.Fog(
              options.colors.background,
              options.length * 0.2,
              options.length * 500,
            )
            this.scene.fog = fog
            this.fogUniforms = {
              fogColor: { type: 'c', value: fog.color },
              fogNear: { type: 'f', value: fog.near },
              fogFar: { type: 'f', value: fog.far },
            }
            this.clock = new THREE.Clock()
            this.assets = {}
            this.disposed = false

            // Create Objects
            this.road = new Road(this, options)
            this.leftCarLights = new CarLights(
              this,
              options,
              options.colors.leftCars,
              options.movingAwaySpeed,
              new THREE.Vector2(0, 1 - options.carLightsFade),
            )
            this.rightCarLights = new CarLights(
              this,
              options,
              options.colors.rightCars,
              options.movingCloserSpeed,
              new THREE.Vector2(1, 0 + options.carLightsFade),
            )
            this.leftSticks = new LightsSticks(this, options)

            this.fovTarget = options.fov

            this.speedUpTarget = 0
            this.speedUp = 0
            this.timeOffset = 0

            // Binds
            this.tick = this.tick.bind(this)
            this.init = this.init.bind(this)
            this.setSize = this.setSize.bind(this)
            this.onMouseDown = this.onMouseDown.bind(this)
            this.onMouseUp = this.onMouseUp.bind(this)
          }
          initPasses() {
            this.renderPass = new POSTPROCESSING.RenderPass(
              this.scene,
              this.camera,
            )
            this.bloomPass = new POSTPROCESSING.EffectPass(
              this.camera,
              new POSTPROCESSING.BloomEffect({
                luminanceThreshold: 0.2,
                luminanceSmoothing: 0,
                resolutionScale: 1,
              }),
            )
            const smaaPass = new POSTPROCESSING.EffectPass(
              this.camera,
              new POSTPROCESSING.SMAAEffect(
                this.assets.smaa.search,
                this.assets.smaa.area,
                POSTPROCESSING.SMAAPreset.MEDIUM,
              ),
            )
            this.renderPass.renderToScreen = false
            this.bloomPass.renderToScreen = false
            smaaPass.renderToScreen = true
            this.composer.addPass(this.renderPass)
            this.composer.addPass(this.bloomPass)
            this.composer.addPass(smaaPass)
          }
          loadAssets() {
            const assets = this.assets
            return new Promise((resolve, reject) => {
              const manager = new THREE.LoadingManager(resolve)

              const searchImage = new Image()
              const areaImage = new Image()
              assets.smaa = {}
              searchImage.addEventListener('load', function () {
                assets.smaa.search = this
                manager.itemEnd('smaa-search')
              })

              areaImage.addEventListener('load', function () {
                assets.smaa.area = this
                manager.itemEnd('smaa-area')
              })
              manager.itemStart('smaa-search')
              manager.itemStart('smaa-area')

              searchImage.src = POSTPROCESSING.SMAAEffect.searchImageDataURL
              areaImage.src = POSTPROCESSING.SMAAEffect.areaImageDataURL
            })
          }
          init() {
            this.initPasses()
            const options = this.options
            this.road.init()
            this.leftCarLights.init()

            this.leftCarLights.mesh.position.setX(
              -options.roadWidth / 2 - options.islandWidth / 2,
            )
            this.rightCarLights.init()
            this.rightCarLights.mesh.position.setX(
              options.roadWidth / 2 + options.islandWidth / 2,
            )
            this.leftSticks.init()
            this.leftSticks.mesh.position.setX(
              -(options.roadWidth + options.islandWidth / 2),
            )

            this.container.addEventListener('mousedown', this.onMouseDown)
            this.container.addEventListener('mouseup', this.onMouseUp)
            this.container.addEventListener('mouseout', this.onMouseUp)

            this.tick()
          }
          onMouseDown(ev) {
            if (this.options.onSpeedUp) this.options.onSpeedUp(ev)
            this.fovTarget = this.options.fovSpeedUp
            this.speedUpTarget = this.options.speedUp
          }
          onMouseUp(ev) {
            if (this.options.onSlowDown) this.options.onSlowDown(ev)
            this.fovTarget = this.options.fov
            this.speedUpTarget = 0
            // this.speedupLerp = 0.1;
          }
          update(delta) {
            let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta)
            this.speedUp += lerp(
              this.speedUp,
              this.speedUpTarget,
              lerpPercentage,
              0.00001,
            )
            this.timeOffset += this.speedUp * delta

            let time = this.clock.elapsedTime + this.timeOffset

            this.rightCarLights.update(time)
            this.leftCarLights.update(time)
            this.leftSticks.update(time)
            this.road.update(time)

            let updateCamera = false
            let fovChange = lerp(
              this.camera.fov,
              this.fovTarget,
              lerpPercentage,
            )
            if (fovChange !== 0) {
              this.camera.fov += fovChange * delta * 6
              updateCamera = true
            }

            if (this.options.distortion.getJS) {
              const distortion = this.options.distortion.getJS(0.025, time)

              this.camera.lookAt(
                new THREE.Vector3(
                  this.camera.position.x + distortion.x,
                  this.camera.position.y + distortion.y,
                  this.camera.position.z + distortion.z,
                ),
              )
              updateCamera = true
            }
            if (updateCamera) {
              this.camera.updateProjectionMatrix()
            }
          }
          render(delta) {
            this.composer.render(delta)
          }
          dispose() {
            this.disposed = true
          }
          setSize(width, height, updateStyles) {
            this.composer.setSize(width, height, updateStyles)
          }
          tick() {
            if (this.disposed || !this) return
            if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
              const canvas = this.renderer.domElement
              this.camera.aspect = canvas.clientWidth / canvas.clientHeight
              this.camera.updateProjectionMatrix()
            }
            const delta = this.clock.getDelta()
            this.render(delta)
            this.update(delta)
            requestAnimationFrame(this.tick)
          }
        }

        const distortion_uniforms = {
          uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
          uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5)),
        }

        const distortion_vertex = `
  #define PI 3.14159265358979
    uniform vec2 uDistortionX;
    uniform vec2 uDistortionY;

      float nsin(float val){
      return sin(val) * 0.5+0.5;
      }
    vec3 getDistortion(float progress){
          progress = clamp(progress, 0.,1.);
          float xAmp = uDistortionX.r;
          float xFreq = uDistortionX.g;
          float yAmp = uDistortionY.r;
          float yFreq = uDistortionY.g;
          return vec3(
              xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
              yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
              0.
          );
      }
  `

        const random = base => {
          if (Array.isArray(base))
            return Math.random() * (base[1] - base[0]) + base[0]
          return Math.random() * base
        }
        const pickRandom = arr => {
          if (Array.isArray(arr))
            return arr[Math.floor(Math.random() * arr.length)]
          return arr
        }
        function lerp(current, target, speed = 0.1, limit = 0.001) {
          let change = (target - current) * speed
          if (Math.abs(change) < limit) {
            change = target - current
          }
          return change
        }
        class CarLights {
          constructor(webgl, options, colors, speed, fade) {
            this.webgl = webgl
            this.options = options
            this.colors = colors
            this.speed = speed
            this.fade = fade
          }
          init() {
            const options = this.options
            // Curve with length 1
            let curve = new THREE.LineCurve3(
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, -1),
            )
            // Tube with radius = 1
            let geometry = new THREE.TubeBufferGeometry(curve, 40, 1, 8, false)

            let instanced = new THREE.InstancedBufferGeometry().copy(geometry)
            instanced.instanceCount = options.lightPairsPerRoadWay * 2

            let laneWidth = options.roadWidth / options.lanesPerRoad

            let aOffset = []
            let aMetrics = []
            let aColor = []

            let colors = this.colors
            if (Array.isArray(colors)) {
              colors = colors.map(c => new THREE.Color(c))
            } else {
              colors = new THREE.Color(colors)
            }

            for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
              let radius = random(options.carLightsRadius)
              let length = random(options.carLightsLength)
              let speed = random(this.speed)

              let carLane = i % 3
              let laneX =
                carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2

              let carWidth = random(options.carWidthPercentage) * laneWidth
              // Drunk Driving
              let carShiftX = random(options.carShiftX) * laneWidth
              // Both lights share same shiftX and lane;
              laneX += carShiftX

              let offsetY = random(options.carFloorSeparation) + radius * 1.3

              let offsetZ = -random(options.length)

              aOffset.push(laneX - carWidth / 2)
              aOffset.push(offsetY)
              aOffset.push(offsetZ)

              aOffset.push(laneX + carWidth / 2)
              aOffset.push(offsetY)
              aOffset.push(offsetZ)

              aMetrics.push(radius)
              aMetrics.push(length)
              aMetrics.push(speed)

              aMetrics.push(radius)
              aMetrics.push(length)
              aMetrics.push(speed)

              let color = pickRandom(colors)
              aColor.push(color.r)
              aColor.push(color.g)
              aColor.push(color.b)

              aColor.push(color.r)
              aColor.push(color.g)
              aColor.push(color.b)
            }
            instanced.setAttribute(
              'aOffset',
              new THREE.InstancedBufferAttribute(
                new Float32Array(aOffset),
                3,
                false,
              ),
            )
            instanced.setAttribute(
              'aMetrics',
              new THREE.InstancedBufferAttribute(
                new Float32Array(aMetrics),
                3,
                false,
              ),
            )
            instanced.setAttribute(
              'aColor',
              new THREE.InstancedBufferAttribute(
                new Float32Array(aColor),
                3,
                false,
              ),
            )
            let material = new THREE.ShaderMaterial({
              fragmentShader: carLightsFragment,
              vertexShader: carLightsVertex,
              transparent: true,
              uniforms: Object.assign(
                {
                  // uColor: new THREE.Uniform(new THREE.Color(this.color)),
                  uTime: new THREE.Uniform(0),
                  uTravelLength: new THREE.Uniform(options.length),
                  uFade: new THREE.Uniform(this.fade),
                },
                this.webgl.fogUniforms,
                options.distortion.uniforms,
              ),
            })
            material.onBeforeCompile = shader => {
              shader.vertexShader = shader.vertexShader.replace(
                '#include <getDistortion_vertex>',
                options.distortion.getDistortion,
              )
            }
            let mesh = new THREE.Mesh(instanced, material)
            mesh.frustumCulled = false
            this.webgl.scene.add(mesh)
            this.mesh = mesh
          }
          update(time) {
            this.mesh.material.uniforms.uTime.value = time
          }
        }

        const carLightsFragment = `

    #define USE_FOG;
    ${THREE.ShaderChunk['fog_pars_fragment']}
    varying vec3 vColor;
    varying vec2 vUv;
    uniform vec2 uFade;
    void main() {
    vec3 color = vec3(vColor);
    float fadeStart = 0.4;
    float maxFade = 0.;
    float alpha = 1.;

    alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color,alpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${THREE.ShaderChunk['fog_fragment']}
    }
  `

        const carLightsVertex = `
    #define USE_FOG;
    ${THREE.ShaderChunk['fog_pars_vertex']}
    attribute vec3 aOffset;
    attribute vec3 aMetrics;
    attribute vec3 aColor;



    uniform float uTravelLength;
    uniform float uTime;
    uniform float uSpeed;

    varying vec2 vUv;
    varying vec3 vColor;
    #include <getDistortion_vertex>

    void main() {
      vec3 transformed = position.xyz;
      float radius = aMetrics.r;
      float myLength = aMetrics.g;
      float speed = aMetrics.b;

      transformed.xy *= radius ;
      transformed.z *= myLength;

      // Add my length to make sure it loops after the lights hits the end
      transformed.z += myLength-mod( uTime *speed + aOffset.z, uTravelLength);
      transformed.xy += aOffset.xy;


      float progress = abs(transformed.z / uTravelLength);
      transformed.xyz += getDistortion(progress);

      vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
      gl_Position = projectionMatrix * mvPosition;
      vUv = uv;
      vColor = aColor;
      ${THREE.ShaderChunk['fog_vertex']}
    }`

        class LightsSticks {
          constructor(webgl, options) {
            this.webgl = webgl
            this.options = options
          }
          init() {
            const options = this.options
            const geometry = new THREE.PlaneBufferGeometry(1, 1)
            let instanced = new THREE.InstancedBufferGeometry().copy(geometry)
            let totalSticks = options.totalSideLightSticks
            instanced.instanceCount = totalSticks

            let stickoffset = options.length / (totalSticks - 1)
            const aOffset = []
            const aColor = []
            const aMetrics = []

            let colors = options.colors.sticks
            if (Array.isArray(colors)) {
              colors = colors.map(c => new THREE.Color(c))
            } else {
              colors = new THREE.Color(colors)
            }

            for (let i = 0; i < totalSticks; i++) {
              let width = random(options.lightStickWidth)
              let height = random(options.lightStickHeight)
              aOffset.push(
                (i - 1) * stickoffset * 2 + stickoffset * Math.random(),
              )

              let color = pickRandom(colors)
              aColor.push(color.r)
              aColor.push(color.g)
              aColor.push(color.b)

              aMetrics.push(width)
              aMetrics.push(height)
            }
            instanced.setAttribute(
              'aOffset',
              new THREE.InstancedBufferAttribute(
                new Float32Array(aOffset),
                1,
                false,
              ),
            )
            instanced.setAttribute(
              'aColor',
              new THREE.InstancedBufferAttribute(
                new Float32Array(aColor),
                3,
                false,
              ),
            )
            instanced.setAttribute(
              'aMetrics',
              new THREE.InstancedBufferAttribute(
                new Float32Array(aMetrics),
                2,
                false,
              ),
            )
            const material = new THREE.ShaderMaterial({
              fragmentShader: sideSticksFragment,
              vertexShader: sideSticksVertex,
              // This ones actually need double side
              side: THREE.DoubleSide,
              uniforms: Object.assign(
                {
                  uTravelLength: new THREE.Uniform(options.length),
                  uTime: new THREE.Uniform(0),
                },
                this.webgl.fogUniforms,
                options.distortion.uniforms,
              ),
            })

            material.onBeforeCompile = shader => {
              shader.vertexShader = shader.vertexShader.replace(
                '#include <getDistortion_vertex>',
                options.distortion.getDistortion,
              )
            }

            const mesh = new THREE.Mesh(instanced, material)
            // The object is behind the camera before the vertex shader
            mesh.frustumCulled = false
            // mesh.position.y = options.lightStickHeight / 2;
            this.webgl.scene.add(mesh)
            this.mesh = mesh
          }
          update(time) {
            this.mesh.material.uniforms.uTime.value = time
          }
        }

        const sideSticksVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute float aOffset;
  attribute vec3 aColor;

  attribute vec2 aMetrics;

  uniform float uTravelLength;
  uniform float uTime;

  varying vec3 vColor;
  mat4 rotationY( in float angle ) {
  	return mat4(	cos(angle),		0,		sin(angle),	0,
  			 				0,		1.0,			 0,	0,
  					-sin(angle),	0,		cos(angle),	0,
  							0, 		0,				0,	1);
  }



    #include <getDistortion_vertex>
    void main(){
      vec3 transformed = position.xyz;
      float width = aMetrics.x;
      float height = aMetrics.y;

      transformed.xy *= vec2(width,height);
      float time = mod(uTime  * 60. *2. + aOffset , uTravelLength);

      transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

      transformed.z +=  - uTravelLength + time;


      float progress = abs(transformed.z / uTravelLength);
      transformed.xyz += getDistortion(progress);

      transformed.y += height /2.;
      transformed.x += -width/2.;
      vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
      gl_Position = projectionMatrix * mvPosition;
      vColor = aColor;
      ${THREE.ShaderChunk['fog_vertex']}
    }
  `
        const sideSticksFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor;
    void main(){
      vec3 color = vec3(vColor);
      gl_FragColor = vec4(color,1.);
      ${THREE.ShaderChunk['fog_fragment']}
    }
  `

        class Road {
          constructor(webgl, options) {
            this.webgl = webgl
            this.options = options

            this.uTime = new THREE.Uniform(0)
          }
          createIsland() {
            const options = this.options
            let segments = 100
          }
          // Side  = 0 center, = 1 right = -1 left
          createPlane(side, width, isRoad) {
            const options = this.options
            let segments = 100
            const geometry = new THREE.PlaneBufferGeometry(
              isRoad ? options.roadWidth : options.islandWidth,
              options.length,
              20,
              segments,
            )
            let uniforms = {
              uTravelLength: new THREE.Uniform(options.length),
              uColor: new THREE.Uniform(
                new THREE.Color(
                  isRoad
                    ? options.colors.roadColor
                    : options.colors.islandColor,
                ),
              ),
              uTime: this.uTime,
            }
            if (isRoad) {
              uniforms = Object.assign(uniforms, {
                uLanes: new THREE.Uniform(options.lanesPerRoad),
                uBrokenLinesColor: new THREE.Uniform(
                  new THREE.Color(options.colors.brokenLines),
                ),
                uShoulderLinesColor: new THREE.Uniform(
                  new THREE.Color(options.colors.shoulderLines),
                ),
                uShoulderLinesWidthPercentage: new THREE.Uniform(
                  options.shoulderLinesWidthPercentage,
                ),
                uBrokenLinesLengthPercentage: new THREE.Uniform(
                  options.brokenLinesLengthPercentage,
                ),
                uBrokenLinesWidthPercentage: new THREE.Uniform(
                  options.brokenLinesWidthPercentage,
                ),
              })
            }
            const material = new THREE.ShaderMaterial({
              fragmentShader: isRoad ? roadFragment : islandFragment,
              vertexShader: roadVertex,
              side: THREE.DoubleSide,
              uniforms: Object.assign(
                uniforms,
                this.webgl.fogUniforms,
                options.distortion.uniforms,
              ),
            })

            material.onBeforeCompile = shader => {
              shader.vertexShader = shader.vertexShader.replace(
                '#include <getDistortion_vertex>',
                options.distortion.getDistortion,
              )
            }
            const mesh = new THREE.Mesh(geometry, material)
            mesh.rotation.x = -Math.PI / 2
            // Push it half further away
            mesh.position.z = -options.length / 2
            mesh.position.x +=
              (this.options.islandWidth / 2 + options.roadWidth / 2) * side
            this.webgl.scene.add(mesh)

            return mesh
          }
          init() {
            this.leftRoadWay = this.createPlane(
              -1,
              this.options.roadWidth,
              true,
            )
            this.rightRoadWay = this.createPlane(
              1,
              this.options.roadWidth,
              true,
            )
            this.island = this.createPlane(0, this.options.islandWidth, false)
          }
          update(time) {
            this.uTime.value = time
          }
        }

        const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk['fog_pars_fragment']}
      void main() {
          vec2 uv = vUv;
          vec3 color = vec3(uColor);

          #include <roadMarkings_fragment>

          gl_FragColor = vec4(color,1.);
          ${THREE.ShaderChunk['fog_fragment']}
      }
  `
        const islandFragment = roadBaseFragment
          .replace('#include <roadMarkings_fragment>', '')
          .replace('#include <roadMarkings_vars>', '')
        const roadMarkings_vars = `
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
      highp float random(vec2 co)
      {
          highp float a = 12.9898;
          highp float b = 78.233;
          highp float c = 43758.5453;
          highp float dt= dot(co.xy ,vec2(a,b));
          highp float sn= mod(dt,3.14);
          return fract(sin(sn) * c);
      }
  `
        const roadMarkings_fragment = `

          uv.y = mod(uv.y + uTime * 0.1,1.);
          float brokenLineWidth = 1. / uLanes * uBrokenLinesWidthPercentage;
          // How much % of the lane's space is empty
          float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

          // Horizontal * vertical offset
          float brokenLines = step(1.-brokenLineWidth * uLanes,fract(uv.x * uLanes)) * step(laneEmptySpace, fract(uv.y * 100.)) ;
          // Remove right-hand lines on the right-most lane
          brokenLines *= step(uv.x * uLanes,uLanes-1.);
          color = mix(color, uBrokenLinesColor, brokenLines);


          float shoulderLinesWidth = 1. / uLanes * uShoulderLinesWidthPercentage;
          float shoulderLines = step(1.-shoulderLinesWidth, uv.x) + step(uv.x, shoulderLinesWidth);
          color = mix(color, uBrokenLinesColor, shoulderLines);

          vec2 noiseFreq = vec2(4., 7000.);
          float roadNoise = random( floor(uv * noiseFreq)/noiseFreq ) * 0.02 - 0.01;
          color += roadNoise;
  `
        const roadFragment = roadBaseFragment
          .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)
          .replace('#include <roadMarkings_vars>', roadMarkings_vars)

        const roadVertex = `
  #define USE_FOG;
  uniform float uTime;
  ${THREE.ShaderChunk['fog_pars_vertex']}

  uniform float uTravelLength;

  varying vec2 vUv;
    #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;

      vec3 distortion  = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
      transformed.x += distortion.x;
      transformed.z += distortion.y;
    transformed.y += -1.*distortion.z;

    vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;

    ${THREE.ShaderChunk['fog_vertex']}
  }`

        function resizeRendererToDisplaySize(renderer, setSize) {
          const canvas = renderer.domElement
          const width = canvas.clientWidth
          const height = canvas.clientHeight
          const needResize = canvas.width !== width || canvas.height !== height
          if (needResize) {
            setSize(width, height, false)
          }
          return needResize
        }

        this.init(App)
      },
      init(App) {
        const mountainUniforms = {
          // x, y, z
          uFreq: new THREE.Uniform(new THREE.Vector3(3, 6, 10)),
          uAmp: new THREE.Uniform(new THREE.Vector3(30, 30, 20)),
        }

        const xyUniforms = {
          // x,y
          uFreq: new THREE.Uniform(new THREE.Vector2(5, 2)),
          uAmp: new THREE.Uniform(new THREE.Vector2(25, 15)),
        }

        const LongRaceUniforms = {
          // x, y
          uFreq: new THREE.Uniform(new THREE.Vector2(2, 3)),
          uAmp: new THREE.Uniform(new THREE.Vector2(35, 10)),
        }

        const turbulentUniforms = {
          // x,x, y,y
          uFreq: new THREE.Uniform(new THREE.Vector4(4, 8, 8, 1)),
          uAmp: new THREE.Uniform(new THREE.Vector4(25, 5, 10, 10)),
        }

        const deepUniforms = {
          // x, y
          uFreq: new THREE.Uniform(new THREE.Vector2(4, 8)),
          uAmp: new THREE.Uniform(new THREE.Vector2(10, 20)),
          uPowY: new THREE.Uniform(new THREE.Vector2(20, 2)),
        }

        let nsin = val => Math.sin(val) * 0.5 + 0.5

        let mountainDistortion = {
          uniforms: mountainUniforms,
          getDistortion: `

      uniform vec3 uAmp;
      uniform vec3 uFreq;

      #define PI 3.14159265358979

          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }

      vec3 getDistortion(float progress){

              float movementProgressFix = 0.02;
              return vec3(
                  cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
                  nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
                  nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
              );
          }
  `,
          getJS: (progress, time) => {
            let movementProgressFix = 0.02

            let uFreq = mountainUniforms.uFreq.value
            let uAmp = mountainUniforms.uAmp.value

            let distortion = new THREE.Vector3(
              Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
                Math.cos(movementProgressFix * Math.PI * uFreq.x + time) *
                  uAmp.x,
              nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
                nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
              nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
                nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z,
            )

            let lookAtAmp = new THREE.Vector3(2, 2, 2)
            let lookAtOffset = new THREE.Vector3(0, 0, -5)
            return distortion.multiply(lookAtAmp).add(lookAtOffset)
          },
        }

        let xyDistortion = {
          uniforms: xyUniforms,
          getDistortion: `
      uniform vec2 uFreq;
      uniform vec2 uAmp;

  				#define PI 3.14159265358979


  				vec3 getDistortion(float progress){

  						float movementProgressFix = 0.02;
  						return vec3(
  							cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) *uAmp.x,
  							sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
  							0.
  						);
  					}
  			`,
          getJS: (progress, time) => {
            let movementProgressFix = 0.02

            let uFreq = xyUniforms.uFreq.value
            let uAmp = xyUniforms.uAmp.value

            let distortion = new THREE.Vector3(
              Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
                Math.cos(movementProgressFix * Math.PI * uFreq.x + time) *
                  uAmp.x,
              Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) *
                uAmp.y -
                Math.sin(
                  movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2,
                ) *
                  uAmp.y,
              0,
            )
            let lookAtAmp = new THREE.Vector3(2, 0.4, 1)
            let lookAtOffset = new THREE.Vector3(0, 0, -3)
            return distortion.multiply(lookAtAmp).add(lookAtOffset)
          },
        }

        let LongRaceDistortion = {
          uniforms: LongRaceUniforms,
          getDistortion: `

      uniform vec2 uFreq;
      uniform vec2 uAmp;
  				#define PI 3.14159265358979

  				vec3 getDistortion(float progress){

  						float camProgress = 0.0125;
  						return vec3(
  							sin(progress * PI * uFreq.x +uTime) * uAmp.x - sin(camProgress * PI * uFreq.x+uTime ) * uAmp.x,
  							sin(progress * PI * uFreq.y +uTime) * uAmp.y - sin(camProgress * PI * uFreq.y+uTime ) * uAmp.y,
  							0.
  						);
  					}
          `,
          getJS: (progress, time) => {
            let camProgress = 0.0125

            let uFreq = LongRaceUniforms.uFreq.value
            let uAmp = LongRaceUniforms.uAmp.value
            // Uniforms

            let distortion = new THREE.Vector3(
              Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
                Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,
              Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
                Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,
              0,
            )

            let lookAtAmp = new THREE.Vector3(1, 1, 0)
            let lookAtOffset = new THREE.Vector3(0, 0, -5)
            return distortion.multiply(lookAtAmp).add(lookAtOffset)
          },
        }

        const turbulentDistortion = {
          uniforms: turbulentUniforms,
          getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }

  				#define PI 3.14159265358979
          float getDistortionX(float progress){
              return
                      (
                          cos( PI * progress * uFreq.r + uTime) * uAmp.r +
                          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)),2. )* uAmp.g

                      );
          }
          float getDistortionY(float progress){
              return
                      (
                          -nsin( PI * progress * uFreq.b + uTime) * uAmp.b +
                          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a) ),5.) * uAmp.a

                      );
          }
          vec3 getDistortion(float progress){
              return vec3(
                  getDistortionX(progress)-getDistortionX(0.0125) ,
                  getDistortionY(progress)- getDistortionY(0.0125),
                  0.
              );
          }
      `,
          getJS: (progress, time) => {
            const uFreq = turbulentUniforms.uFreq.value
            const uAmp = turbulentUniforms.uAmp.value

            const getX = p =>
              Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
              Math.pow(
                Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)),
                2,
              ) *
                uAmp.y
            const getY = p =>
              -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
              Math.pow(
                nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)),
                5,
              ) *
                uAmp.w

            let distortion = new THREE.Vector3(
              getX(progress) - getX(progress + 0.007),
              getY(progress) - getY(progress + 0.007),
              0,
            )
            let lookAtAmp = new THREE.Vector3(-2, -5, 0)
            let lookAtOffset = new THREE.Vector3(0, 0, -10)
            return distortion.multiply(lookAtAmp).add(lookAtOffset)
          },
        }

        const turbulentDistortionStill = {
          uniforms: turbulentUniforms,
          getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }

  				#define PI 3.14159265358979
          float getDistortionX(float progress){
              return
                      (
                          cos( PI * progress * uFreq.r ) * uAmp.r +
                          pow(cos(PI * progress * uFreq.g  * (uFreq.g / uFreq.r)),2. )* uAmp.g

                      );
          }
          float getDistortionY(float progress){
              return
                      (
                          -nsin( PI * progress * uFreq.b ) * uAmp.b +
                          -pow(nsin(PI * progress * uFreq.a  / (uFreq.b / uFreq.a) ),5.) * uAmp.a

                      );
          }
          vec3 getDistortion(float progress){
              return vec3(
                  getDistortionX(progress)-getDistortionX(0.02) ,
                  getDistortionY(progress)- getDistortionY(0.02),
                  0.
              );
          }
      `,
        }

        const deepDistortion = {
          uniforms: deepUniforms,
          getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }

  				#define PI 3.14159265358979
          float getDistortionX(float progress){
              return
                      (
                          sin(progress * PI * uFreq.x + uTime) * uAmp.x

                      );
          }
          float getDistortionY(float progress){
              return
                      (
                          pow(abs(progress * uPowY.x),uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
                      );
          }
          vec3 getDistortion(float progress){
              return vec3(
                  getDistortionX(progress)-getDistortionX(0.02) ,
                  getDistortionY(progress)- getDistortionY(0.02),
                  0.
              );
          }
      `,
          getJS: (progress, time) => {
            const uFreq = deepUniforms.uFreq.value
            const uAmp = deepUniforms.uAmp.value
            const uPowY = deepUniforms.uPowY.value

            const getX = p => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x
            const getY = p =>
              Math.pow(p * uPowY.x, uPowY.y) +
              Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y

            let distortion = new THREE.Vector3(
              getX(progress) - getX(progress + 0.01),
              getY(progress) - getY(progress + 0.01),
              0,
            )
            let lookAtAmp = new THREE.Vector3(-2, -4, 0)
            let lookAtOffset = new THREE.Vector3(0, 0, -10)
            return distortion.multiply(lookAtAmp).add(lookAtOffset)
          },
        }

        const deepDistortionStill = {
          uniforms: deepUniforms,
          getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
          return sin(val) * 0.5+0.5;
          }

  				#define PI 3.14159265358979
          float getDistortionX(float progress){
              return
                      (
                          sin(progress * PI * uFreq.x ) * uAmp.x * 2.

                      );
          }
          float getDistortionY(float progress){
              return
                      (
                          pow(abs(progress * uPowY.x),uPowY.y) + sin(progress * PI * uFreq.y ) * uAmp.y
                      );
          }
          vec3 getDistortion(float progress){
              return vec3(
                  getDistortionX(progress)-getDistortionX(0.02) ,
                  getDistortionY(progress)- getDistortionY(0.05),
                  0.
              );
          }
      `,
        }
        const container = document.querySelector('#infinite-lights')

        const options = {
          onSpeedUp: ev => {},
          onSlowDown: ev => {},
          // mountainDistortion || LongRaceDistortion || xyDistortion || turbulentDistortion || turbulentDistortionStill || deepDistortionStill || deepDistortion
          distortion: mountainDistortion,

          length: 400,
          roadWidth: 9,
          islandWidth: 2,
          lanesPerRoad: 3,

          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,

          totalSideLightSticks: 50,
          lightPairsPerRoadWay: 50,

          // Percentage of the lane's width
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,

          /*** These ones have to be arrays of [min,max].  ***/
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],

          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],

          /****  Anything below can be either a number or an array of [min,max] ****/

          // Length of the lights. Best to be less than total length
          carLightsLength: [400 * 0.05, 400 * 0.15],
          // Radius of the tubes
          carLightsRadius: [0.05, 0.14],
          // Width is percentage of a lane. Numbers from 0 to 1
          carWidthPercentage: [0.3, 0.5],
          // How drunk the driver is.
          // carWidthPercentage's max + carShiftX's max -> Cannot go over 1.
          // Or cars start going into other lanes
          carShiftX: [-0.2, 0.2],
          // Self Explanatory
          carFloorSeparation: [0.05, 1],

          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            /***  Only these colors can be an array ***/
            leftCars: [0xff102a, 0xeb383e, 0xff102a],
            rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
            sticks: 0xdadafa,
          },
        }

        const myApp = new App(container, options)
        myApp.loadAssets().then(myApp.init)
      },
      async getDownloadLink() {
        const res = await this.$get(this.API.download)
        if (res.data.code == '1000') {
          this.downloadLink = res.data.data.link
        }
      },
    },
    mounted() {
      this.$nextTick(function () {
        //this.getDownloadLink()
        this.setApp()
      })
    },
  }
</script>

<style lang="less">
  @import url('../assets/css/style.less');
  .home {
    padding: 0;
    color: #fff;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      padding: 0.3rem;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10;
      .logo {
        img {
          width: 0.65rem;
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.36rem;
          color: #fff;
        }
      }

      .nav {
        i {
          font-size: 0.46rem;
          color: #fff;
        }
        .menu {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: #000;
          border-bottom: 1px solid #333;

          .menu-header {
            display: flex;
            justify-content: flex-end;
            padding: 0.3rem;
          }
          li {
            border-top: 1px solid #333;
            a {
              display: block;
              padding: 0.4rem 0.2rem;
              color: #fff;
            }
          }
        }
        .menu-pc {
          display: flex;
          li {
            margin-left: 40px;
            a {
              display: block;
              font-size: 24px;
              color: #fff;
              &:hover {
                color: #5f27cd;
              }
            }
          }
        }
      }
    }

    .main {
      position: relative;
      text-align: center;

      h1 {
        margin-top: 0.5rem;
        font-weight: bold;
        color: #fff;
        z-index: 10;

        img {
          width: 400px;
        }

        @media screen and (max-width: 750px) {
          img {
            width: 220px;
          }
        }
      }

      p {
        margin-top: 0.25rem;
        font-size: 0.34rem;
        text-align: center;
        color: #fff;
        z-index: 10;
        letter-spacing: 14px;
      }

      .android {
        margin-top: 0.25rem;
        z-index: 10;
        img {
          width: 2.6rem;
        }
      }

      .infinite-lights {
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        canvas {
          width: 100vw;
          height: 100vh;
        }
      }

      .screen {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .second {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      h5 {
        z-index: 1;
        margin-bottom: 50px;
        color: #fff;
        max-width: 1400px;
        line-height: 1.6;

        @media screen and (max-width: 750px) {
          padding: 0 0.4rem;
          font-size: 0.32rem;
        }
      }

      .swiper {
        width: 1400px;

        .swiper-container {
          height: 850px;
          padding-top: 35px;

          @media screen and (max-width: 750px) {
            height: auto;
            padding-top: 0;
          }

          .swiper-pagination {
            .swiper-pagination-bullet {
              width: 15px;
              height: 15px;
              margin: 0 8px;
              background: transparent;
              border: 1px solid #fff;
              opacity: 1;
              &.swiper-pagination-bullet-active {
                background: #fff;
              }
            }
          }
        }

        img {
          width: 350px;

          @media screen and (max-width: 750px) {
            width: 6rem;
          }
        }

        .swiper-pagination-fraction,
        .swiper-pagination-custom,
        .swiper-container-horizontal > .swiper-pagination-bullets {
          @media screen and (max-width: 750px) {
            bottom: 0.5rem;
          }
        }
      }
    }
  }
</style>
