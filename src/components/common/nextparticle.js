/* eslint-disable */
// This file contains a minified third-party library
// Disabling ESLint to prevent warnings on the minified code
module.exports = () => {
  'use strict'
  var _createClass = (function () {
    function h(t, i) {
      for (var e = 0; e < i.length; e++) {
        var h = i[e]
        ;(h.enumerable = h.enumerable || !1),
          (h.configurable = !0),
          'value' in h && (h.writable = !0),
          Object.defineProperty(t, h.key, h)
      }
    }
    return function (t, i, e) {
      return i && h(t.prototype, i), e && h(t, e), t
    }
  })()
  function _classCallCheck(t, i) {
    if (!(t instanceof i)) throw new TypeError('Cannot call a class as a function')
  }
  !(function (t) {
    var i =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (t) {
          setTimeout(t, 10)
        },
      h = (Math.PI, void 0),
      s = void 0,
      a = void 0,
      n = void 0,
      o = void 0,
      r = void 0,
      c = void 0,
      d = void 0,
      l = void 0,
      m = void 0,
      g = void 0,
      v = void 0,
      u = void 0,
      x = void 0,
      f = void 0,
      p = void 0,
      y = void 0,
      M = void 0,
      w = void 0,
      I = void 0,
      _ = void 0,
      P = void 0,
      k = void 0,
      b = void 0,
      D = void 0,
      E = void 0,
      C = void 0,
      S = void 0,
      A = void 0,
      e = (function () {
        function e(t) {
          _classCallCheck(this, e)
          var i = {}
          t &&
            (t.nodeName
              ? ((i = JSON.parse(JSON.stringify(t.dataset))),
                'IMG' === t.nodeName ? (i.image = t) : (i.wrapperElement = t))
              : (i = t)),
            (this.state = 'stopped'),
            (this.touches = []),
            this.on('imageLoaded', this._onImageLoaded),
            this._initImage(i)
        }
        return (
          _createClass(e, [
            {
              key: 'on',
              value: function (t, i) {
                ;(this.events = this.events || {}), (this.events[t] = this.events[t] || []), this.events[t].push(i)
              },
            },
            {
              key: 'emit',
              value: function (t, i) {
                var e = this.events[t]
                if (e && e.length)
                  for (var h = 0; h < e.length; h++) {
                    e[h].call(this, i)
                  }
              },
            },
            {
              key: 'start',
              value: function (t) {
                var i = t || {}
                ;(this.initPosition = i.initPosition || this.initPosition),
                  (this.initDirection = i.initDirection || this.initDirection),
                  this.canvas &&
                    ((this.canvas.width = this.width),
                    (this.canvas.height = this.height),
                    (this.canvas.style.display = '')),
                  this._initOrigins(),
                  this._initParticles(),
                  this._webglSetAttributes(),
                  'running' !== this.state &&
                    ((this.state = 'running'),
                    this.disableInteraction ||
                      ('ontouchstart' in window || window.navigator.msPointerEnabled
                        ? (document.body.addEventListener('touchstart', this._touchHandler),
                          document.body.addEventListener('touchmove', this._touchHandler),
                          document.body.addEventListener('touchend', this._clearTouches),
                          document.body.addEventListener('touchcancel', this._clearTouches))
                        : (this.canvas.addEventListener('mousemove', this._mouseHandler),
                          this.canvas.addEventListener('mouseout', this._clearTouches),
                          this.canvas.addEventListener('click', this._clickHandler))),
                    this._animate())
              },
            },
            {
              key: 'stop',
              value: function (t) {
                var i = t || {}
                ;(this.fadePosition = i.fadePosition || this.fadePosition),
                  (this.fadeDirection = i.fadeDirection || this.fadeDirection),
                  this._fade(),
                  document.body.removeEventListener('touchstart', this._touchHandler),
                  document.body.removeEventListener('touchmove', this._touchHandler),
                  document.body.removeEventListener('touchend', this._clearTouches),
                  document.body.removeEventListener('touchcancel', this._clearTouches),
                  this.canvas &&
                    (this.canvas.removeEventListener('mousemove', this._mouseHandler),
                    this.canvas.removeEventListener('mouseout', this._clearTouches),
                    this.canvas.removeEventListener('click', this._clickHandler))
              },
            },
            {
              key: '_animate',
              value: function () {
                var t = this
                'stopped' !== this.state
                  ? (this._calculate(),
                    this._draw(),
                    i(function () {
                      return t._animate()
                    }))
                  : this.emit('stopped')
              },
            },
            {
              key: '_onImageLoaded',
              value: function (t) {
                ;(this.imageWidth = this.image.naturalWidth || this.image.width),
                  (this.imageHeight = this.image.naturalHeight || this.image.height),
                  (this.imageRatio = this.imageWidth / this.imageHeight),
                  (this.width = this.width || this.imageWidth),
                  (this.height = this.height || this.imageHeight),
                  (this.renderSize = (this.width + this.height) / 4),
                  this.srcImage && (this.srcImage.style.display = 'none'),
                  this._initSettings(t),
                  this._initContext(t),
                  this._initResponsive(t),
                  this.start()
              },
            },
            {
              key: '_initImage',
              value: function (t) {
                var i = this
                ;(this.srcImage = t.image),
                  !this.srcImage && t.imageId && (this.srcImage = document.getElementById(t.imageId)),
                  (this.imageUrl = t.imageUrl || this.srcImage.src),
                  (this.image = document.createElement('img')),
                  (this.wrapperElement = t.wrapperElement || this.srcImage.parentElement),
                  (this.image.onload = function () {
                    return i.emit('imageLoaded', t)
                  }),
                  (this.image.crossOrigin = 'Anonymous'),
                  t.addTimestamp &&
                    (/\?/.test(this.imageUrl)
                      ? (this.imageUrl += '&d=' + Date.now())
                      : (this.imageUrl += '?d=' + Date.now())),
                  (this.image.src = this.imageUrl)
              },
            },
            {
              key: '_initContext',
              value: function (t) {
                ;(this.canvas = t.canvas),
                  this.canvas ||
                    this.context ||
                    !this.wrapperElement ||
                    ((this.canvas = document.createElement('canvas')), this.wrapperElement.appendChild(this.canvas)),
                  this.convas && (this.convas.style.display = 'none'),
                  (this.context = t.context),
                  (this.renderer = t.renderer || 'default')
              },
            },
            {
              key: '_defaultInitContext',
              value: function (t) {
                this.context = this.context || this.canvas.getContext('2d')
              },
            },
            {
              key: '_webglInitContext',
              value: function () {
                ;(this.context =
                  this.context || this.canvas.getContext('webgl2') || this.canvas.getContext('experimental-webgl')),
                  (this.fragmentShaderScript =
                    '#version 300 es\n\n        precision highp float;\n\n        in vec4 vColor;\n        out vec4 fragColor;\n\n        void main(void) {\n          // fragColor = vec4(1, 1, 1, 0.1);\n          fragColor = vColor;\n        }\n      '),
                  (this.vertexShaderScript =
                    '#version 300 es\n\n        precision highp float;\n\n        in vec3 vertexPosition;\n        in vec4 vertexColor;\n        uniform vec3 vertexOffset;\n        uniform float pointSize;\n        uniform float depth;\n        vec3 mirror = vec3(1, -1, 1);\n\n        uniform mat4 modelViewMatrix;\n        uniform mat4 perspectiveMatrix;\n        uniform mat4 rotationMatrix;\n\n        out vec4 vColor;\n\n        void main(void) {\n          gl_Position = rotationMatrix * perspectiveMatrix * modelViewMatrix * vec4(mirror * vertexPosition + vertexOffset, vertexPosition);\n          gl_PointSize = pointSize + max((log(vertexPosition.z) - 3.91) * depth, -pointSize + 1.0);\n          vColor = vertexColor;\n        }\n      '),
                  this.context.viewport(0, 0, this.width, this.height)
                var t = this.context.createShader(this.context.VERTEX_SHADER)
                this.context.shaderSource(t, this.vertexShaderScript),
                  this.context.compileShader(t),
                  this.context.getShaderParameter(t, this.context.COMPILE_STATUS) ||
                    console.log(this.context.getShaderInfoLog(t))
                var i = this.context.createShader(this.context.FRAGMENT_SHADER)
                this.context.shaderSource(i, this.fragmentShaderScript),
                  this.context.compileShader(i),
                  this.context.getShaderParameter(i, this.context.COMPILE_STATUS) ||
                    console.log(this.context.getShaderInfoLog(i)),
                  (this.program = this.context.createProgram()),
                  this.context.attachShader(this.program, t),
                  this.context.attachShader(this.program, i),
                  this.context.linkProgram(this.program),
                  this.context.useProgram(this.program),
                  (this.vertexPosition = this.context.getAttribLocation(this.program, 'vertexPosition')),
                  this.context.enableVertexAttribArray(this.vertexPosition),
                  (this.vertexColor = this.context.getAttribLocation(this.program, 'vertexColor')),
                  this.context.enableVertexAttribArray(this.vertexColor),
                  this.context.clearColor(0, 0, 0, 0),
                  this.context.enable(this.context.BLEND),
                  this.context.disable(this.context.DEPTH_TEST),
                  this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE),
                  (this.vertexBuffer = this.context.createBuffer()),
                  this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer),
                  this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT),
                  (this.vertexOffset = this.context.getUniformLocation(this.program, 'vertexOffset')),
                  this.context.uniform3f(this.vertexOffset, 0, 0, 1e3),
                  this.context.vertexAttribPointer(this.vertexPosition, 3, this.context.FLOAT, !1, 28, 0),
                  this.context.vertexAttribPointer(this.vertexColor, 4, this.context.FLOAT, !1, 28, 12),
                  (this.uModelViewMatrix = this.context.getUniformLocation(this.program, 'modelViewMatrix')),
                  (this.uPerspectiveMatrix = this.context.getUniformLocation(this.program, 'perspectiveMatrix')),
                  (this.uRotationMatrix = this.context.getUniformLocation(this.program, 'rotationMatrix')),
                  (this.uPointSize = this.context.getUniformLocation(this.program, 'pointSize')),
                  (this.uDepth = this.context.getUniformLocation(this.program, 'depth')),
                  this._webglSetAttributes()
              },
            },
            {
              key: '_webglSetAttributes',
              value: function () {
                if ('webgl' === this.renderer) {
                  var t = this.canvas.width / this.canvas.height,
                    i = 10 * Math.tan((1 * Math.PI) / 360),
                    e = -i,
                    h = i * t,
                    s = -h,
                    a = [
                      20 / (h - s),
                      0,
                      (h + s) / (h - s),
                      0,
                      0,
                      20 / (i - e),
                      (i + e) / (i - e),
                      0,
                      0,
                      0,
                      110 / 90,
                      2e3 / 90,
                      0,
                      0,
                      -1,
                      0,
                    ]
                  this.context.viewport(0, 0, this.width, this.height),
                    this.context.uniformMatrix4fv(this.uModelViewMatrix, !1, new Float32Array(a)),
                    this.context.uniformMatrix4fv(
                      this.uPerspectiveMatrix,
                      !1,
                      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
                    ),
                    this.context.uniform1f(this.uPointSize, this.particleSize),
                    this.context.uniform1f(this.uDepth, this.depth),
                    this._updateRotation()
                }
              },
            },
            {
              key: '_updateRotation',
              value: function () {
                var t = Math.cos(0),
                  i = Math.sin(0),
                  e = Math.cos(0),
                  h = [e, 0, Math.sin(0), 0, 0, t, -i, 0, -e, i, t, 0, 0, 0, 0, 1]
                this.context.uniformMatrix4fv(this.uRotationMatrix, !1, new Float32Array(h))
              },
            },
            {
              key: '_webglRenderer',
              value: function () {
                ;(_ = new Float32Array(this.vertices)),
                  this.context.bufferData(this.context.ARRAY_BUFFER, _, this.context.STATIC_DRAW),
                  this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT),
                  this.context.drawArrays(this.context.POINTS, 0, this.particles.length),
                  this.context.flush()
              },
            },
            {
              key: '_initSettings',
              value: function (t) {
                ;(this.width = 1 * t.width || this.width),
                  (this.height = 1 * t.height || this.height),
                  (this.maxWidth = t.maxWidth),
                  (this.maxHeight = t.maxHeight),
                  (this.minWidth = t.minWidth),
                  (this.minHeight = t.minHeight),
                  this.maxWidth &&
                    (/%$/.test(this.maxWidth)
                      ? (this.maxWidth = (this.width * this.maxWidth.replace('%', '')) / 100)
                      : (this.maxWidth *= 1)),
                  this.maxHeight &&
                    (/%$/.test(this.maxHeight)
                      ? (this.maxHeight = (this.height * this.maxHeight.replace('%', '')) / 100)
                      : (this.maxHeight *= 1)),
                  this.minWidth &&
                    (/%$/.test(this.minWidth)
                      ? (this.minWidth = (this.width * this.minWidth.replace('%', '')) / 100)
                      : (this.minWidth *= 1)),
                  this.minHeight &&
                    (/%$/.test(this.minHeight)
                      ? (this.minHeight = (this.height * this.minHeight.replace('%', '')) / 100)
                      : (this.minHeight *= 1)),
                  (this.alphaFade = 0.4),
                  (this.gravity = 1 * t.gravity || 0.08),
                  (this.particleGap = 1 * t.particleGap || 3),
                  (this.particleSize = 1 * t.particleSize || 1),
                  (this.layerCount = 1 * t.layerCount || 1),
                  (this.depth = 1 * t.depth || 1),
                  (this.rotationDuration = 1 * t.rotationDuration || 0),
                  (this.growDuration = 1 * t.growDuration || 200),
                  (this.waitDuration = 1 * t.waitDuration || 200),
                  (this.shrinkDuration = 1 * t.shrinkDuration || 200),
                  (this.shrinkDistance = 1 * t.shrinkDistance || 50),
                  (this.threeDimensional =
                    void 0 !== t.threeDimensional && 'false' !== t.threeDimensional && !!t.threeDimensional),
                  (this.lifeCycle = void 0 !== t.lifeCycle && 'false' !== t.lifeCycle && !!t.lifeCycle),
                  (this.layerDistance = t.layerDistance || this.particleGap),
                  (this.initPosition = t.initPosition || 'random'),
                  (this.initDirection = t.initDirection || 'random'),
                  (this.fadePosition = t.fadePosition || 'none'),
                  (this.fadeDirection = t.fadeDirection || 'none'),
                  (this.noise = isNaN(1 * t.noise) ? 10 : 1 * t.noise),
                  (this.disableInteraction = t.disableInteraction),
                  (this.mouseForce = 1 * t.mouseForce || 30),
                  (this.clickStrength = 1 * t.clickStrength || 0),
                  (this.color = t.color),
                  (this.colorArr = t.colorArr || this.colorArr)
              },
            },
            {
              key: '_initResponsive',
              value: function (t) {
                var i = this
                ;(this.responsiveWidth = this.wrapperElement && t.responsiveWidth),
                  this.responsiveWidth &&
                    (this.on('stopped', function () {
                      ;(i.width = i.wrapperElement.clientWidth), i.start()
                    }),
                    this.wrapperElement.addEventListener('resize', function () {
                      i.width !== i.wrapperElement.clientWidth && i.stop()
                    }),
                    (this.width = this.wrapperElement.clientWidth))
              },
            },
            {
              key: '_calculate',
              value: function () {
                for (this.vertices = 'webgl' === this.renderer && [], a = s = 0; a < this.particles.length; a++) {
                  for (
                    r = this.origins[a],
                      c = this.particles[a],
                      x = r.x - c.x + (Math.random() - 0.5) * this.noise,
                      f = r.y - c.y + (Math.random() - 0.5) * this.noise,
                      p = r.z - c.z + ((Math.random() - 0.5) * this.noise) / 1e3,
                      y = Math.sqrt(x * x + f * f + p * p),
                      M = 0.01 * y,
                      c.vx += M * (x / y) * this.speed,
                      c.vy += M * (f / y) * this.speed,
                      c.vz += M * (p / y) * this.speed,
                      l = 0;
                    l < this.touches.length;
                    l++
                  )
                    (d = this.touches[l]),
                      (x = c.x - d.x),
                      (f = c.y - d.y),
                      (p = c.z - d.z),
                      (y = Math.sqrt(x * x + f * f + p * p)),
                      (M = (this.mouseForce * d.force) / y),
                      (c.vx += M * (x / y) * this.speed),
                      (c.vy += M * (f / y) * this.speed),
                      (c.vz += M * (p / y) * this.speed)
                  ;(c.vx *= this.gravityFactor),
                    (c.vy *= this.gravityFactor),
                    (c.vz *= this.gravityFactor),
                    (c.x += c.vx),
                    (c.y += c.vy),
                    (c.z += c.vz),
                    c.x < 0 || c.x >= this.width || c.y < 0 || c.y >= this.height
                      ? ((c.isHidden = !0), 'stopping' === this.state && (c.isDead = !0))
                      : ('stopping' !== this.state || c.isDead || s++, (c.isHidden = !1)),
                    this.vertices &&
                      ((g = c.x - this.width / 2),
                      (v = c.y - this.height / 2),
                      (u = c.z),
                      (S = r.vertexColors[3]),
                      this.lifeCycle &&
                        ((r.tick += 1),
                        0 <= r.tick
                          ? r.tick < this.growDuration
                            ? (S *= r.tick / this.growDuration)
                            : 0 <= (A = r.tick - this.growDuration - this.waitDuration) &&
                              A <= this.shrinkDuration &&
                              ((d = this.touches[l]),
                              (y = Math.sqrt(g * g + v * v + (u - 50) * (u - 50))),
                              (M = A / this.shrinkDuration),
                              (g += this.shrinkDistance * (g / y) * M),
                              (v += this.shrinkDistance * (v / y) * M),
                              (u += this.shrinkDistance * ((u - 50) / y) * M),
                              (S *= 1 - M),
                              A === this.shrinkDuration && (r.tick = 0))
                          : (S = 0)),
                      this.vertices.push(g, v, u, r.vertexColors[0], r.vertexColors[1], r.vertexColors[2], S))
                }
                'stopping' === this.state && 0 === s && (this.state = 'stopped')
              },
            },
            {
              key: '_defaultRenderer',
              value: function () {
                for (
                  this.depth = Math.max((this.layerDistance * this.layerCount) / 2, this.mouseForce),
                    this.minZ = -this.depth,
                    this.maxZ = this.depth,
                    h = this.context.createImageData(this.width, this.height),
                    a = 0;
                  a < this.origins.length;
                  a++
                )
                  (r = this.origins[a]),
                    (c = this.particles[a]).isDead ||
                      c.isHidden ||
                      ((g = ~~c.x),
                      (v = ~~c.y),
                      (S = r.color[3]),
                      0 < this.alphaFade &&
                        1 < this.layerCount &&
                        ((u = Math.max(Math.min(c.z, this.maxZ), this.minZ) - this.minZ),
                        (S = S * (1 - this.alphaFade) + S * this.alphaFade * (u / (this.maxZ - this.minZ))),
                        (S = Math.max(Math.min(~~S, 255), 0))),
                      (n = 4 * (g + v * this.width)),
                      (h.data[n + 0] = r.color[0]),
                      (h.data[n + 1] = r.color[1]),
                      (h.data[n + 2] = r.color[2]),
                      (h.data[n + 3] = S))
                this.context.putImageData(h, 0, 0)
              },
            },
            {
              key: '_initParticles',
              value: function () {
                for (this.particles = void 0, this.particles = [], a = 0; a < this.origins.length; a++)
                  (r = this.origins[a]),
                    (c = {}),
                    this._initParticlePosition(r, c),
                    this._initParticleDirection(c),
                    this.particles.push(c)
              },
            },
            {
              key: '_initParticlePosition',
              value: function (t, i) {
                switch (((i.z = 0), this.initPosition)) {
                  case 'random':
                    ;(i.x = Math.random() * this.width), (i.y = Math.random() * this.height)
                    break
                  case 'top':
                    ;(i.x = Math.random() * this.width * 3 - this.width), (i.y = -Math.random() * this.height)
                    break
                  case 'left':
                    ;(i.x = -Math.random() * this.width), (i.y = Math.random() * this.height * 3 - this.height)
                    break
                  case 'bottom':
                    ;(i.x = Math.random() * this.width * 3 - this.width),
                      (i.y = this.height + Math.random() * this.height)
                    break
                  case 'right':
                    ;(i.x = this.width + Math.random() * this.width),
                      (i.y = Math.random() * this.height * 3 - this.height)
                    break
                  case 'misplaced':
                    ;(i.x = t.x + Math.random() * this.width * 0.3 - 0.1 * this.width),
                      (i.y = t.y + Math.random() * this.height * 0.3 - 0.1 * this.height)
                    break
                  default:
                    ;(i.x = t.x), (i.y = t.y)
                }
              },
            },
            {
              key: '_fade',
              value: function () {
                if (
                  ('explode' === this.fadePosition ||
                  'top' === this.fadePosition ||
                  'left' === this.fadePosition ||
                  'bottom' === this.fadePosition ||
                  'right' === this.fadePosition
                    ? (this.state = 'stopping')
                    : (this.state = 'stopped'),
                  this.origins)
                )
                  for (a = 0; a < this.origins.length; a++)
                    this._fadeOriginPosition(this.origins[a]), this._fadeOriginDirection(this.particles[a])
              },
            },
            {
              key: '_fadeOriginPosition',
              value: function (t) {
                switch (this.fadePosition) {
                  case 'random':
                    ;(t.x = Math.random() * this.width * 2 - this.width),
                      (t.y = Math.random() * this.height * 2 - this.height),
                      0 < t.x && (t.x += this.width),
                      0 < t.y && (t.y += this.height)
                    break
                  case 'top':
                    ;(t.x = Math.random() * this.width * 3 - this.width), (t.y = -Math.random() * this.height)
                    break
                  case 'left':
                    ;(t.x = -Math.random() * this.width), (t.y = Math.random() * this.height * 3 - this.height)
                    break
                  case 'bottom':
                    ;(t.x = Math.random() * this.width * 3 - this.width),
                      (t.y = this.height + Math.random() * this.height)
                    break
                  case 'right':
                    ;(t.x = this.width + Math.random() * this.width),
                      (t.y = Math.random() * this.height * 3 - this.height)
                }
              },
            },
            {
              key: '_initParticleDirection',
              value: function (t) {
                switch (((t.vz = 0), this.initDirection)) {
                  case 'random':
                    ;(w = Math.random() * Math.PI * 2),
                      (I = Math.random()),
                      (t.vx = this.width * I * Math.sin(w) * 0.1),
                      (t.vy = this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'top':
                    ;(w = Math.random() * Math.PI - Math.PI / 2),
                      (I = Math.random()),
                      (t.vx = this.width * I * Math.sin(w) * 0.1),
                      (t.vy = this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'left':
                    ;(w = Math.random() * Math.PI + Math.PI),
                      (I = Math.random()),
                      (t.vx = this.width * I * Math.sin(w) * 0.1),
                      (t.vy = this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'bottom':
                    ;(w = Math.random() * Math.PI + Math.PI / 2),
                      (I = Math.random()),
                      (t.vx = this.width * I * Math.sin(w) * 0.1),
                      (t.vy = this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'right':
                    ;(w = Math.random() * Math.PI),
                      (I = Math.random()),
                      (t.vx = this.width * I * Math.sin(w) * 0.1),
                      (t.vy = this.height * I * Math.cos(w) * 0.1)
                    break
                  default:
                    ;(t.vx = 0), (t.vy = 0)
                }
              },
            },
            {
              key: '_fadeOriginDirection',
              value: function (t) {
                switch (this.fadeDirection) {
                  case 'random':
                    ;(w = Math.random() * Math.PI * 2),
                      (I = Math.random()),
                      (t.vx += this.width * I * Math.sin(w) * 0.1),
                      (t.vy += this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'top':
                    ;(w = Math.random() * Math.PI - Math.PI / 2),
                      (I = Math.random()),
                      (t.vx += this.width * I * Math.sin(w) * 0.1),
                      (t.vy += this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'left':
                    ;(w = Math.random() * Math.PI + Math.PI),
                      (I = Math.random()),
                      (t.vx += this.width * I * Math.sin(w) * 0.1),
                      (t.vy += this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'bottom':
                    ;(w = Math.random() * Math.PI + Math.PI / 2),
                      (I = Math.random()),
                      (t.vx += this.width * I * Math.sin(w) * 0.1),
                      (t.vy += this.height * I * Math.cos(w) * 0.1)
                    break
                  case 'right':
                    ;(w = Math.random() * Math.PI),
                      (I = Math.random()),
                      (t.vx += this.width * I * Math.sin(w) * 0.1),
                      (t.vy += this.height * I * Math.cos(w) * 0.1)
                    break
                  default:
                    ;(t.vx = 0), (t.vy = 0)
                }
              },
            },
            {
              key: '_initOrigins',
              value: function () {
                ;(P = document.createElement('canvas')),
                  this.responsiveWidth && (this.width = this.wrapperElement.clientWidth),
                  (this.ratio =
                    Math.min(this.width, this.maxWidth || Number.POSITIVE_INFINITY) /
                    Math.min(this.height, this.maxHeight || Number.POSITIVE_INFINITY)),
                  this.ratio < this.imageRatio
                    ? ((this.renderWidth = ~~Math.min(
                        this.width || Number.POSITIVE_INFINITY,
                        this.minWidth || this.imageWidth || Number.POSITIVE_INFINITY,
                        this.maxWidth || Number.POSITIVE_INFINITY,
                      )),
                      (this.renderHeight = ~~(this.renderWidth / this.imageRatio)))
                    : ((this.renderHeight = ~~Math.min(
                        this.height || Number.POSITIVE_INFINITY,
                        this.minHeight || this.imageHeight || Number.POSITIVE_INFINITY,
                        this.maxHeight || Number.POSITIVE_INFINITY,
                      )),
                      (this.renderWidth = ~~(this.renderHeight * this.imageRatio))),
                  (this.offsetX = ~~((this.width - this.renderWidth) / 2)),
                  (this.offsetY = ~~((this.height - this.renderHeight) / 2)),
                  (P.width = this.renderWidth),
                  (P.height = this.renderHeight),
                  (k = P.getContext('2d')).drawImage(this.image, 0, 0, this.renderWidth, this.renderHeight),
                  (b = k.getImageData(0, 0, this.renderWidth, this.renderHeight).data),
                  (this.origins = void 0),
                  (this.origins = [])
                var t = this.growDuration + this.waitDuration + this.shrinkDuration
                for (g = 0; g < this.renderWidth; g += this.particleGap)
                  for (v = 0; v < this.renderHeight; v += this.particleGap)
                    if (((a = 4 * (g + v * this.renderWidth)), 0 < (S = b[a + 3]))) {
                      var i = Math.random()
                      if (((A = -Math.floor(i * t)), this.colorArr))
                        for (o = 0; o < this.layerCount; o++)
                          this.origins.push({
                            x: this.offsetX + g,
                            y: this.offsetY + v,
                            z: o * this.layerDistance + 50,
                            color: this.colorArr,
                            tick: A,
                            seed: i,
                            vertexColors: this.colorArr.map(function (t) {
                              return t / 255
                            }),
                          })
                      else
                        for (D = b[a], E = b[a + 1], C = b[a + 2], o = 0; o < this.layerCount; o++)
                          this.origins.push({
                            x: this.offsetX + g,
                            y: this.offsetY + v,
                            z: o * this.layerDistance + 50,
                            color: [D, E, C, S],
                            tick: A,
                            seed: i,
                            vertexColors: [D / 255, E / 255, C / 255, S / 255],
                          })
                    }
                ;(this.speed = Math.log(this.origins.length) / 10), (this.gravityFactor = 1 - this.gravity * this.speed)
              },
            },
            {
              key: '_parseColor',
              value: function (t) {
                var i = void 0
                if ('string' == typeof t) {
                  var e = t.replace(' ', '')
                  if ((i = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(e)))
                    i = [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)]
                  else if ((i = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(e)))
                    i = [17 * parseInt(i[1], 16), 17 * parseInt(i[2], 16), 17 * parseInt(i[3], 16)]
                  else if ((i = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(e)))
                    i = [+i[1], +i[2], +i[3], +i[4]]
                  else {
                    if (!(i = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(e))) return
                    i = [+i[1], +i[2], +i[3]]
                  }
                  return i
                }
              },
            },
            {
              key: 'renderer',
              get: function () {
                return this._renderer
              },
              set: function (i) {
                ;(this._renderer = i), (this._draw = this['_' + i + 'Renderer'])
                try {
                  this['_' + i + 'InitContext']()
                } catch (t) {
                  console.log(t), 'default' !== i && (this.renderer = 'default')
                }
              },
            },
            {
              key: 'color',
              set: function (t) {
                ;(this.colorArr = this._parseColor(t)),
                  this.colorArr &&
                    (isNaN(this.colorArr[3]) && (this.colorArr[3] = 255),
                    0 < this.colorArr[3] && this.colorArr[3] <= 1 && (this.colorArr[3] *= 255))
              },
            },
            {
              key: '_mouseHandler',
              get: function () {
                var i = this
                return function (t) {
                  i.touches = [{ x: t.offsetX, y: t.offsetY, z: 49 + (i.layerCount - 1) * i.layerDistance, force: 1 }]
                }
              },
            },
            {
              key: '_clickHandler',
              get: function () {
                var e = this
                return function (t) {
                  var i = e.clickStrength
                  e.origins.map(function (t) {
                    return (t.z -= i)
                  }),
                    setTimeout(function () {
                      e.origins.map(function (t) {
                        return (t.z += i)
                      })
                    }, 100)
                }
              },
            },
            {
              key: '_touchHandler',
              get: function () {
                var i = this
                return function (t) {
                  for (i.touches = [], m = i.canvas.getBoundingClientRect(), l = 0; l < t.changedTouches.length; l++)
                    (d = t.changedTouches[l]).target === i.canvas &&
                      (i.touches.push({
                        x: d.pageX - m.left,
                        y: d.pageY - m.top,
                        z: 49 + (i.layerCount - 1) * i.layerDistance,
                        force: d.force || 1,
                      }),
                      t.preventDefault())
                }
              },
            },
            {
              key: '_clearTouches',
              get: function () {
                var i = this
                return function (t) {
                  i.touches = []
                }
              },
            },
          ]),
          e
        )
      })()
    t.NextParticle = e
    for (var H = document.getElementsByClassName('next-particle'), F = 0; F < H.length; F++) {
      var T = H[F]
      T.nextParticle = new e(T)
    }
  })(window)
}
