// threejs.org/license
(function (k, xa) {
    "object" === typeof exports && "undefined" !== typeof module ? xa(exports) : "function" === typeof define && define.amd ? define(["exports"], xa) : xa(k.THREE = {})
})(this, function (k) {
    function xa() {}

    function A(a, b) {
        this.x = a || 0;
        this.y = b || 0
    }

    function K() {
        this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
    }

    function ia(a, b, c, d) {
        this._x = a || 0;
        this._y = b || 0;
        this._z = c || 0;
        this._w = void 0 !== d ? d : 1
    }

    function p(a,
        b, c) {
        this.x = a || 0;
        this.y = b || 0;
        this.z = c || 0
    }

    function oa() {
        this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        0 < arguments.length && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
    }

    function X(a, b, c, d, e, f, g, h, l, m) {
        Object.defineProperty(this, "id", {
            value: xf++
        });
        this.uuid = R.generateUUID();
        this.name = "";
        this.image = void 0 !== a ? a : X.DEFAULT_IMAGE;
        this.mipmaps = [];
        this.mapping = void 0 !== b ? b : X.DEFAULT_MAPPING;
        this.wrapS = void 0 !== c ? c : 1001;
        this.wrapT = void 0 !== d ? d : 1001;
        this.magFilter = void 0 !==
            e ? e : 1006;
        this.minFilter = void 0 !== f ? f : 1008;
        this.anisotropy = void 0 !== l ? l : 1;
        this.format = void 0 !== g ? g : 1023;
        this.type = void 0 !== h ? h : 1009;
        this.offset = new A(0, 0);
        this.repeat = new A(1, 1);
        this.center = new A(0, 0);
        this.rotation = 0;
        this.matrixAutoUpdate = !0;
        this.matrix = new oa;
        this.generateMipmaps = !0;
        this.premultiplyAlpha = !1;
        this.flipY = !0;
        this.unpackAlignment = 4;
        this.encoding = void 0 !== m ? m : 3E3;
        this.version = 0;
        this.onUpdate = null
    }

    function da(a, b, c, d) {
        this.x = a || 0;
        this.y = b || 0;
        this.z = c || 0;
        this.w = void 0 !== d ? d : 1
    }

    function ib(a,
        b, c) {
        this.width = a;
        this.height = b;
        this.scissor = new da(0, 0, a, b);
        this.scissorTest = !1;
        this.viewport = new da(0, 0, a, b);
        c = c || {};
        void 0 === c.minFilter && (c.minFilter = 1006);
        this.texture = new X(void 0, void 0, c.wrapS, c.wrapT, c.magFilter, c.minFilter, c.format, c.type, c.anisotropy, c.encoding);
        this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
        this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
        this.depthTexture = void 0 !== c.depthTexture ? c.depthTexture : null
    }

    function Ib(a, b, c) {
        ib.call(this, a, b, c);
        this.activeMipMapLevel =
            this.activeCubeFace = 0
    }

    function jb(a, b, c, d, e, f, g, h, l, m, w, n) {
        X.call(this, null, f, g, h, l, m, d, e, w, n);
        this.image = {
            data: a,
            width: b,
            height: c
        };
        this.magFilter = void 0 !== l ? l : 1003;
        this.minFilter = void 0 !== m ? m : 1003;
        this.flipY = this.generateMipmaps = !1;
        this.unpackAlignment = 1
    }

    function Va(a, b) {
        this.min = void 0 !== a ? a : new p(Infinity, Infinity, Infinity);
        this.max = void 0 !== b ? b : new p(-Infinity, -Infinity, -Infinity)
    }

    function Ga(a, b) {
        this.center = void 0 !== a ? a : new p;
        this.radius = void 0 !== b ? b : 0
    }

    function Ha(a, b) {
        this.normal = void 0 !==
            a ? a : new p(1, 0, 0);
        this.constant = void 0 !== b ? b : 0
    }

    function od(a, b, c, d, e, f) {
        this.planes = [void 0 !== a ? a : new Ha, void 0 !== b ? b : new Ha, void 0 !== c ? c : new Ha, void 0 !== d ? d : new Ha, void 0 !== e ? e : new Ha, void 0 !== f ? f : new Ha]
    }

    function L(a, b, c) {
        return void 0 === b && void 0 === c ? this.set(a) : this.setRGB(a, b, c)
    }

    function yf(a) {
        function b(b, c) {
            var d = b.array,
                e = b.dynamic ? a.DYNAMIC_DRAW : a.STATIC_DRAW,
                h = a.createBuffer();
            a.bindBuffer(c, h);
            a.bufferData(c, d, e);
            b.onUploadCallback();
            c = a.FLOAT;
            d instanceof Float32Array ? c = a.FLOAT : d instanceof
            Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : d instanceof Uint16Array ? c = a.UNSIGNED_SHORT : d instanceof Int16Array ? c = a.SHORT : d instanceof Uint32Array ? c = a.UNSIGNED_INT : d instanceof Int32Array ? c = a.INT : d instanceof Int8Array ? c = a.BYTE : d instanceof Uint8Array && (c = a.UNSIGNED_BYTE);
            return {
                buffer: h,
                type: c,
                bytesPerElement: d.BYTES_PER_ELEMENT,
                version: b.version
            }
        }
        var c = new WeakMap;
        return {
            get: function (a) {
                a.isInterleavedBufferAttribute && (a = a.data);
                return c.get(a)
            },
            remove: function (b) {
                b.isInterleavedBufferAttribute && (b = b.data);
                var d = c.get(b);
                d && (a.deleteBuffer(d.buffer), c.delete(b))
            },
            update: function (d, e) {
                d.isInterleavedBufferAttribute && (d = d.data);
                var f = c.get(d);
                if (void 0 === f) c.set(d, b(d, e));
                else if (f.version < d.version) {
                    var g = d,
                        h = g.array,
                        l = g.updateRange;
                    a.bindBuffer(e, f.buffer);
                    !1 === g.dynamic ? a.bufferData(e, h, a.STATIC_DRAW) : -1 === l.count ? a.bufferSubData(e, 0, h) : 0 === l.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") :
                        (a.bufferSubData(e, l.offset * h.BYTES_PER_ELEMENT, h.subarray(l.offset, l.offset + l.count)), l.count = -1);
                    f.version = d.version
                }
            }
        }
    }

    function kb(a, b, c, d) {
        this._x = a || 0;
        this._y = b || 0;
        this._z = c || 0;
        this._order = d || kb.DefaultOrder
    }

    function Sd() {
        this.mask = 1
    }

    function B() {
        Object.defineProperty(this, "id", {
            value: zf++
        });
        this.uuid = R.generateUUID();
        this.name = "";
        this.type = "Object3D";
        this.parent = null;
        this.children = [];
        this.up = B.DefaultUp.clone();
        var a = new p,
            b = new kb,
            c = new ia,
            d = new p(1, 1, 1);
        b.onChange(function () {
            c.setFromEuler(b,
                !1)
        });
        c.onChange(function () {
            b.setFromQuaternion(c, void 0, !1)
        });
        Object.defineProperties(this, {
            position: {
                enumerable: !0,
                value: a
            },
            rotation: {
                enumerable: !0,
                value: b
            },
            quaternion: {
                enumerable: !0,
                value: c
            },
            scale: {
                enumerable: !0,
                value: d
            },
            modelViewMatrix: {
                value: new K
            },
            normalMatrix: {
                value: new oa
            }
        });
        this.matrix = new K;
        this.matrixWorld = new K;
        this.matrixAutoUpdate = B.DefaultMatrixAutoUpdate;
        this.matrixWorldNeedsUpdate = !1;
        this.layers = new Sd;
        this.visible = !0;
        this.receiveShadow = this.castShadow = !1;
        this.frustumCulled = !0;
        this.renderOrder =
            0;
        this.userData = {}
    }

    function Qa() {
        B.call(this);
        this.type = "Camera";
        this.matrixWorldInverse = new K;
        this.projectionMatrix = new K
    }

    function Jb(a, b, c, d, e, f) {
        Qa.call(this);
        this.type = "OrthographicCamera";
        this.zoom = 1;
        this.view = null;
        this.left = a;
        this.right = b;
        this.top = c;
        this.bottom = d;
        this.near = void 0 !== e ? e : .1;
        this.far = void 0 !== f ? f : 2E3;
        this.updateProjectionMatrix()
    }

    function Wa(a, b, c, d, e, f) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.normal = d && d.isVector3 ? d : new p;
        this.vertexNormals = Array.isArray(d) ? d : [];
        this.color = e && e.isColor ?
            e : new L;
        this.vertexColors = Array.isArray(e) ? e : [];
        this.materialIndex = void 0 !== f ? f : 0
    }

    function M() {
        Object.defineProperty(this, "id", {
            value: Af += 2
        });
        this.uuid = R.generateUUID();
        this.name = "";
        this.type = "Geometry";
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [
            []
        ];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingSphere = this.boundingBox = null;
        this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate =
            this.uvsNeedUpdate = this.verticesNeedUpdate = this.elementsNeedUpdate = !1
    }

    function H(a, b, c) {
        if (Array.isArray(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.name = "";
        this.array = a;
        this.itemSize = b;
        this.count = void 0 !== a ? a.length / b : 0;
        this.normalized = !0 === c;
        this.dynamic = !1;
        this.updateRange = {
            offset: 0,
            count: -1
        };
        this.version = 0
    }

    function uc(a, b, c) {
        H.call(this, new Int8Array(a), b, c)
    }

    function vc(a, b, c) {
        H.call(this, new Uint8Array(a), b, c)
    }

    function wc(a, b, c) {
        H.call(this, new Uint8ClampedArray(a),
            b, c)
    }

    function xc(a, b, c) {
        H.call(this, new Int16Array(a), b, c)
    }

    function lb(a, b, c) {
        H.call(this, new Uint16Array(a), b, c)
    }

    function yc(a, b, c) {
        H.call(this, new Int32Array(a), b, c)
    }

    function mb(a, b, c) {
        H.call(this, new Uint32Array(a), b, c)
    }

    function z(a, b, c) {
        H.call(this, new Float32Array(a), b, c)
    }

    function zc(a, b, c) {
        H.call(this, new Float64Array(a), b, c)
    }

    function Ce() {
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];
        this.groups = [];
        this.morphTargets = {};
        this.skinWeights = [];
        this.skinIndices = [];
        this.boundingSphere =
            this.boundingBox = null;
        this.groupsNeedUpdate = this.uvsNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.verticesNeedUpdate = !1
    }

    function De(a) {
        if (0 === a.length) return -Infinity;
        for (var b = a[0], c = 1, d = a.length; c < d; ++c) a[c] > b && (b = a[c]);
        return b
    }

    function I() {
        Object.defineProperty(this, "id", {
            value: Bf += 2
        });
        this.uuid = R.generateUUID();
        this.name = "";
        this.type = "BufferGeometry";
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingSphere = this.boundingBox = null;
        this.drawRange = {
            start: 0,
            count: Infinity
        }
    }

    function Kb(a, b, c, d, e, f) {
        M.call(this);
        this.type = "BoxGeometry";
        this.parameters = {
            width: a,
            height: b,
            depth: c,
            widthSegments: d,
            heightSegments: e,
            depthSegments: f
        };
        this.fromBufferGeometry(new nb(a, b, c, d, e, f));
        this.mergeVertices()
    }

    function nb(a, b, c, d, e, f) {
        function g(a, b, c, d, e, f, g, k, O, G, Lb) {
            var q = f / O,
                u = g / G,
                x = f / 2,
                N = g / 2,
                v = k / 2;
            g = O + 1;
            var y = G + 1,
                C = f = 0,
                F, A, z = new p;
            for (A = 0; A < y; A++) {
                var B = A * u - N;
                for (F = 0; F < g; F++) z[a] = (F * q - x) * d, z[b] = B * e, z[c] = v, m.push(z.x, z.y, z.z), z[a] = 0, z[b] = 0, z[c] = 0 < k ? 1 : -1, w.push(z.x,
                    z.y, z.z), n.push(F / O), n.push(1 - A / G), f += 1
            }
            for (A = 0; A < G; A++)
                for (F = 0; F < O; F++) a = t + F + g * (A + 1), b = t + (F + 1) + g * (A + 1), c = t + (F + 1) + g * A, l.push(t + F + g * A, a, c), l.push(a, b, c), C += 6;
            h.addGroup(r, C, Lb);
            r += C;
            t += f
        }
        I.call(this);
        this.type = "BoxBufferGeometry";
        this.parameters = {
            width: a,
            height: b,
            depth: c,
            widthSegments: d,
            heightSegments: e,
            depthSegments: f
        };
        var h = this;
        a = a || 1;
        b = b || 1;
        c = c || 1;
        d = Math.floor(d) || 1;
        e = Math.floor(e) || 1;
        f = Math.floor(f) || 1;
        var l = [],
            m = [],
            w = [],
            n = [],
            t = 0,
            r = 0;
        g("z", "y", "x", -1, -1, c, b, a, f, e, 0);
        g("z", "y", "x", 1, -1, c, b, -a,
            f, e, 1);
        g("x", "z", "y", 1, 1, a, c, b, d, f, 2);
        g("x", "z", "y", 1, -1, a, c, -b, d, f, 3);
        g("x", "y", "z", 1, -1, a, b, c, d, e, 4);
        g("x", "y", "z", -1, -1, a, b, -c, d, e, 5);
        this.setIndex(l);
        this.addAttribute("position", new z(m, 3));
        this.addAttribute("normal", new z(w, 3));
        this.addAttribute("uv", new z(n, 2))
    }

    function Ac(a, b, c, d) {
        M.call(this);
        this.type = "PlaneGeometry";
        this.parameters = {
            width: a,
            height: b,
            widthSegments: c,
            heightSegments: d
        };
        this.fromBufferGeometry(new pb(a, b, c, d));
        this.mergeVertices()
    }

    function pb(a, b, c, d) {
        I.call(this);
        this.type =
            "PlaneBufferGeometry";
        this.parameters = {
            width: a,
            height: b,
            widthSegments: c,
            heightSegments: d
        };
        a = a || 1;
        b = b || 1;
        var e = a / 2,
            f = b / 2;
        c = Math.floor(c) || 1;
        d = Math.floor(d) || 1;
        var g = c + 1,
            h = d + 1,
            l = a / c,
            m = b / d,
            w = [],
            n = [],
            t = [],
            r = [];
        for (a = 0; a < h; a++) {
            var q = a * m - f;
            for (b = 0; b < g; b++) n.push(b * l - e, -q, 0), t.push(0, 0, 1), r.push(b / c), r.push(1 - a / d)
        }
        for (a = 0; a < d; a++)
            for (b = 0; b < c; b++) e = b + g * (a + 1), f = b + 1 + g * (a + 1), h = b + 1 + g * a, w.push(b + g * a, e, h), w.push(e, f, h);
        this.setIndex(w);
        this.addAttribute("position", new z(n, 3));
        this.addAttribute("normal", new z(t,
            3));
        this.addAttribute("uv", new z(r, 2))
    }

    function Q() {
        Object.defineProperty(this, "id", {
            value: Cf++
        });
        this.uuid = R.generateUUID();
        this.name = "";
        this.type = "Material";
        this.lights = this.fog = !0;
        this.blending = 1;
        this.side = 0;
        this.flatShading = !1;
        this.vertexColors = 0;
        this.opacity = 1;
        this.transparent = !1;
        this.blendSrc = 204;
        this.blendDst = 205;
        this.blendEquation = 100;
        this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null;
        this.depthFunc = 3;
        this.depthWrite = this.depthTest = !0;
        this.clippingPlanes = null;
        this.clipShadows =
            this.clipIntersection = !1;
        this.shadowSide = null;
        this.colorWrite = !0;
        this.precision = null;
        this.polygonOffset = !1;
        this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
        this.dithering = !1;
        this.alphaTest = 0;
        this.premultipliedAlpha = !1;
        this.overdraw = 0;
        this.visible = !0;
        this.userData = {};
        this.needsUpdate = !0
    }

    function ya(a) {
        Q.call(this);
        this.type = "MeshBasicMaterial";
        this.color = new L(16777215);
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.envMap = this.alphaMap = this.specularMap =
            null;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.lights = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function za(a) {
        Q.call(this);
        this.type = "ShaderMaterial";
        this.defines = {};
        this.uniforms = {};
        this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
        this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
        this.linewidth = 1;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.morphNormals = this.morphTargets = this.skinning = this.clipping = this.lights = this.fog = !1;
        this.extensions = {
            derivatives: !1,
            fragDepth: !1,
            drawBuffers: !1,
            shaderTextureLOD: !1
        };
        this.defaultAttributeValues = {
            color: [1, 1, 1],
            uv: [0, 0],
            uv2: [0, 0]
        };
        this.index0AttributeName = void 0;
        this.uniformsNeedUpdate = !1;
        void 0 !== a && (void 0 !== a.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(a))
    }

    function qb(a, b) {
        this.origin = void 0 !== a ? a : new p;
        this.direction = void 0 !== b ? b : new p
    }

    function Nb(a, b) {
        this.start = void 0 !== a ? a : new p;
        this.end = void 0 !== b ? b : new p
    }

    function ja(a, b, c) {
        this.a = void 0 !== a ? a : new p;
        this.b = void 0 !== b ? b : new p;
        this.c = void 0 !== c ? c : new p
    }

    function ta(a, b) {
        B.call(this);
        this.type = "Mesh";
        this.geometry = void 0 !== a ? a : new I;
        this.material = void 0 !== b ? b : new ya({
            color: 16777215 * Math.random()
        });
        this.drawMode = 0;
        this.updateMorphTargets()
    }

    function Df(a, b, c, d) {
        function e(a, c) {
            b.buffers.color.setClear(a.r,
                a.g, a.b, c, d)
        }
        var f = new L(0),
            g = 0,
            h, l, m;
        return {
            getClearColor: function () {
                return f
            },
            setClearColor: function (a, b) {
                f.set(a);
                g = void 0 !== b ? b : 1;
                e(f, g)
            },
            getClearAlpha: function () {
                return g
            },
            setClearAlpha: function (a) {
                g = a;
                e(f, g)
            },
            render: function (b, d, t, r) {
                d = d.background;
                null === d ? e(f, g) : d && d.isColor && (e(d, 1), r = !0);
                (a.autoClear || r) && a.clear(a.autoClearColor, a.autoClearDepth, a.autoClearStencil);
                d && d.isCubeTexture ? (void 0 === m && (m = new ta(new nb(1, 1, 1), new za({
                    uniforms: rb.cube.uniforms,
                    vertexShader: rb.cube.vertexShader,
                    fragmentShader: rb.cube.fragmentShader,
                    side: 1,
                    depthTest: !0,
                    depthWrite: !1,
                    fog: !1
                })), m.geometry.removeAttribute("normal"), m.geometry.removeAttribute("uv"), m.onBeforeRender = function (a, b, c) {
                    this.matrixWorld.copyPosition(c.matrixWorld)
                }, c.update(m.geometry)), m.material.uniforms.tCube.value = d, b.push(m, m.geometry, m.material, 0, null)) : d && d.isTexture && (void 0 === h && (h = new Jb(-1, 1, 1, -1, 0, 1), l = new ta(new pb(2, 2), new ya({
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                })), c.update(l.geometry)), l.material.map = d, a.renderBufferDirect(h,
                    null, l.geometry, l.material, l, null))
            }
        }
    }

    function Ef(a, b, c) {
        var d;
        this.setMode = function (a) {
            d = a
        };
        this.render = function (b, f) {
            a.drawArrays(d, b, f);
            c.update(f, d)
        };
        this.renderInstances = function (a, f, g) {
            var e = b.get("ANGLE_instanced_arrays");
            if (null === e) console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            else {
                var l = a.attributes.position;
                l.isInterleavedBufferAttribute ? (g = l.data.count, e.drawArraysInstancedANGLE(d, 0, g, a.maxInstancedCount)) :
                    e.drawArraysInstancedANGLE(d, f, g, a.maxInstancedCount);
                c.update(g, d, a.maxInstancedCount)
            }
        }
    }

    function Ff(a, b, c) {
        function d(b) {
            if ("highp" === b) {
                if (0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).precision) return "highp";
                b = "mediump"
            }
            return "mediump" === b && 0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).precision ? "mediump" : "lowp"
        }
        var e, f = void 0 !==
            c.precision ? c.precision : "highp",
            g = d(f);
        g !== f && (console.warn("THREE.WebGLRenderer:", f, "not supported, using", g, "instead."), f = g);
        c = !0 === c.logarithmicDepthBuffer;
        g = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS);
        var h = a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            l = a.getParameter(a.MAX_TEXTURE_SIZE),
            m = a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),
            w = a.getParameter(a.MAX_VERTEX_ATTRIBS),
            n = a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),
            t = a.getParameter(a.MAX_VARYING_VECTORS),
            r = a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),
            q = 0 < h,
            k = !!b.get("OES_texture_float");
        return {
            getMaxAnisotropy: function () {
                if (void 0 !== e) return e;
                var c = b.get("EXT_texture_filter_anisotropic");
                return e = null !== c ? a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
            },
            getMaxPrecision: d,
            precision: f,
            logarithmicDepthBuffer: c,
            maxTextures: g,
            maxVertexTextures: h,
            maxTextureSize: l,
            maxCubemapSize: m,
            maxAttributes: w,
            maxVertexUniforms: n,
            maxVaryings: t,
            maxFragmentUniforms: r,
            vertexTextures: q,
            floatFragmentTextures: k,
            floatVertexTextures: q && k
        }
    }

    function Gf() {
        function a() {
            m.value !==
                d && (m.value = d, m.needsUpdate = 0 < e);
            c.numPlanes = e;
            c.numIntersection = 0
        }

        function b(a, b, d, e) {
            var f = null !== a ? a.length : 0,
                g = null;
            if (0 !== f) {
                g = m.value;
                if (!0 !== e || null === g) {
                    e = d + 4 * f;
                    b = b.matrixWorldInverse;
                    l.getNormalMatrix(b);
                    if (null === g || g.length < e) g = new Float32Array(e);
                    for (e = 0; e !== f; ++e, d += 4) h.copy(a[e]).applyMatrix4(b, l), h.normal.toArray(g, d), g[d + 3] = h.constant
                }
                m.value = g;
                m.needsUpdate = !0
            }
            c.numPlanes = f;
            return g
        }
        var c = this,
            d = null,
            e = 0,
            f = !1,
            g = !1,
            h = new Ha,
            l = new oa,
            m = {
                value: null,
                needsUpdate: !1
            };
        this.uniform = m;
        this.numIntersection =
            this.numPlanes = 0;
        this.init = function (a, c, g) {
            var h = 0 !== a.length || c || 0 !== e || f;
            f = c;
            d = b(a, g, 0);
            e = a.length;
            return h
        };
        this.beginShadows = function () {
            g = !0;
            b(null)
        };
        this.endShadows = function () {
            g = !1;
            a()
        };
        this.setState = function (c, h, l, r, q, k) {
            if (!f || null === c || 0 === c.length || g && !l) g ? b(null) : a();
            else {
                l = g ? 0 : e;
                var n = 4 * l,
                    w = q.clippingState || null;
                m.value = w;
                w = b(c, r, n, k);
                for (c = 0; c !== n; ++c) w[c] = d[c];
                q.clippingState = w;
                this.numIntersection = h ? this.numPlanes : 0;
                this.numPlanes += l
            }
        }
    }

    function Hf(a) {
        var b = {};
        return {
            get: function (c) {
                if (void 0 !==
                    b[c]) return b[c];
                switch (c) {
                    case "WEBGL_depth_texture":
                        var d = a.getExtension("WEBGL_depth_texture") || a.getExtension("MOZ_WEBGL_depth_texture") || a.getExtension("WEBKIT_WEBGL_depth_texture");
                        break;
                    case "EXT_texture_filter_anisotropic":
                        d = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                        break;
                    case "WEBGL_compressed_texture_s3tc":
                        d = a.getExtension("WEBGL_compressed_texture_s3tc") || a.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
                            a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                        break;
                    case "WEBGL_compressed_texture_pvrtc":
                        d = a.getExtension("WEBGL_compressed_texture_pvrtc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                        break;
                    default:
                        d = a.getExtension(c)
                }
                null === d && console.warn("THREE.WebGLRenderer: " + c + " extension not supported.");
                return b[c] = d
            }
        }
    }

    function If(a, b, c) {
        function d(a) {
            a = a.target;
            var g = e[a.id];
            null !== g.index && b.remove(g.index);
            for (var l in g.attributes) b.remove(g.attributes[l]);
            a.removeEventListener("dispose",
                d);
            delete e[a.id];
            if (l = f[a.id]) b.remove(l), delete f[a.id];
            if (l = f[g.id]) b.remove(l), delete f[g.id];
            c.memory.geometries--
        }
        var e = {},
            f = {};
        return {
            get: function (a, b) {
                var f = e[b.id];
                if (f) return f;
                b.addEventListener("dispose", d);
                b.isBufferGeometry ? f = b : b.isGeometry && (void 0 === b._bufferGeometry && (b._bufferGeometry = (new I).setFromObject(a)), f = b._bufferGeometry);
                e[b.id] = f;
                c.memory.geometries++;
                return f
            },
            update: function (c) {
                var d = c.index,
                    e = c.attributes;
                null !== d && b.update(d, a.ELEMENT_ARRAY_BUFFER);
                for (var f in e) b.update(e[f],
                    a.ARRAY_BUFFER);
                c = c.morphAttributes;
                for (f in c) {
                    d = c[f];
                    e = 0;
                    for (var g = d.length; e < g; e++) b.update(d[e], a.ARRAY_BUFFER)
                }
            },
            getWireframeAttribute: function (c) {
                var d = f[c.id];
                if (d) return d;
                d = [];
                var e = c.index,
                    g = c.attributes;
                if (null !== e) {
                    e = e.array;
                    g = 0;
                    for (var w = e.length; g < w; g += 3) {
                        var n = e[g + 0],
                            t = e[g + 1],
                            r = e[g + 2];
                        d.push(n, t, t, r, r, n)
                    }
                } else
                    for (e = g.position.array, g = 0, w = e.length / 3 - 1; g < w; g += 3) n = g + 0, t = g + 1, r = g + 2, d.push(n, t, t, r, r, n);
                d = new(65535 < De(d) ? mb : lb)(d, 1);
                b.update(d, a.ELEMENT_ARRAY_BUFFER);
                return f[c.id] = d
            }
        }
    }

    function Jf(a, b, c) {
        var d, e, f;
        this.setMode = function (a) {
            d = a
        };
        this.setIndex = function (a) {
            e = a.type;
            f = a.bytesPerElement
        };
        this.render = function (b, h) {
            a.drawElements(d, h, e, b * f);
            c.update(h, d)
        };
        this.renderInstances = function (a, h, l) {
            var g = b.get("ANGLE_instanced_arrays");
            null === g ? console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.") : (g.drawElementsInstancedANGLE(d, l, e, h * f, a.maxInstancedCount), c.update(l, d, a.maxInstancedCount))
        }
    }

    function Kf(a) {
        var b = {
            frame: 0,
            calls: 0,
            triangles: 0,
            points: 0,
            lines: 0
        };
        return {
            memory: {
                geometries: 0,
                textures: 0
            },
            render: b,
            programs: null,
            autoReset: !0,
            reset: function () {
                b.frame++;
                b.calls = 0;
                b.triangles = 0;
                b.points = 0;
                b.lines = 0
            },
            update: function (c, d, e) {
                e = e || 1;
                b.calls++;
                switch (d) {
                    case a.TRIANGLES:
                        b.triangles += c / 3 * e;
                        break;
                    case a.TRIANGLE_STRIP:
                    case a.TRIANGLE_FAN:
                        b.triangles += e * (c - 2);
                        break;
                    case a.LINES:
                        b.lines += c / 2 * e;
                        break;
                    case a.LINE_STRIP:
                        b.lines += e * (c - 1);
                        break;
                    case a.LINE_LOOP:
                        b.lines += e * c;
                        break;
                    case a.POINTS:
                        b.points +=
                            e * c;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", d)
                }
            }
        }
    }

    function Lf(a, b) {
        return Math.abs(b[1]) - Math.abs(a[1])
    }

    function Mf(a) {
        var b = {},
            c = new Float32Array(8);
        return {
            update: function (d, e, f, g) {
                var h = d.morphTargetInfluences,
                    l = h.length;
                d = b[e.id];
                if (void 0 === d) {
                    d = [];
                    for (var m = 0; m < l; m++) d[m] = [m, 0];
                    b[e.id] = d
                }
                var w = f.morphTargets && e.morphAttributes.position;
                f = f.morphNormals && e.morphAttributes.normal;
                for (m = 0; m < l; m++) {
                    var n = d[m];
                    0 !== n[1] && (w && e.removeAttribute("morphTarget" + m), f && e.removeAttribute("morphNormal" +
                        m))
                }
                for (m = 0; m < l; m++) n = d[m], n[0] = m, n[1] = h[m];
                d.sort(Lf);
                for (m = 0; 8 > m; m++) {
                    if (n = d[m])
                        if (h = n[0], l = n[1]) {
                            w && e.addAttribute("morphTarget" + m, w[h]);
                            f && e.addAttribute("morphNormal" + m, f[h]);
                            c[m] = l;
                            continue
                        } c[m] = 0
                }
                g.getUniforms().setValue(a, "morphTargetInfluences", c)
            }
        }
    }

    function Nf(a, b) {
        var c = {};
        return {
            update: function (d) {
                var e = b.render.frame,
                    f = d.geometry,
                    g = a.get(d, f);
                c[g.id] !== e && (f.isGeometry && g.updateFromObject(d), a.update(g), c[g.id] = e);
                return g
            },
            dispose: function () {
                c = {}
            }
        }
    }

    function bb(a, b, c, d, e, f, g, h, l, m) {
        a =
            void 0 !== a ? a : [];
        X.call(this, a, void 0 !== b ? b : 301, c, d, e, f, g, h, l, m);
        this.flipY = !1
    }

    function Ob(a, b, c) {
        var d = a[0];
        if (0 >= d || 0 < d) return a;
        var e = b * c,
            f = Ee[e];
        void 0 === f && (f = new Float32Array(e), Ee[e] = f);
        if (0 !== b)
            for (d.toArray(f, 0), d = 1, e = 0; d !== b; ++d) e += c, a[d].toArray(f, e);
        return f
    }

    function Fe(a, b) {
        var c = Ge[b];
        void 0 === c && (c = new Int32Array(b), Ge[b] = c);
        for (var d = 0; d !== b; ++d) c[d] = a.allocTextureUnit();
        return c
    }

    function Of(a, b) {
        a.uniform1f(this.addr, b)
    }

    function Pf(a, b) {
        a.uniform1i(this.addr, b)
    }

    function Qf(a, b) {
        void 0 ===
            b.x ? a.uniform2fv(this.addr, b) : a.uniform2f(this.addr, b.x, b.y)
    }

    function Rf(a, b) {
        void 0 !== b.x ? a.uniform3f(this.addr, b.x, b.y, b.z) : void 0 !== b.r ? a.uniform3f(this.addr, b.r, b.g, b.b) : a.uniform3fv(this.addr, b)
    }

    function Sf(a, b) {
        void 0 === b.x ? a.uniform4fv(this.addr, b) : a.uniform4f(this.addr, b.x, b.y, b.z, b.w)
    }

    function Tf(a, b) {
        a.uniformMatrix2fv(this.addr, !1, b.elements || b)
    }

    function Uf(a, b) {
        void 0 === b.elements ? a.uniformMatrix3fv(this.addr, !1, b) : (He.set(b.elements), a.uniformMatrix3fv(this.addr, !1, He))
    }

    function Vf(a,
        b) {
        void 0 === b.elements ? a.uniformMatrix4fv(this.addr, !1, b) : (Ie.set(b.elements), a.uniformMatrix4fv(this.addr, !1, Ie))
    }

    function Wf(a, b, c) {
        var d = c.allocTextureUnit();
        a.uniform1i(this.addr, d);
        c.setTexture2D(b || Je, d)
    }

    function Xf(a, b, c) {
        var d = c.allocTextureUnit();
        a.uniform1i(this.addr, d);
        c.setTextureCube(b || Ke, d)
    }

    function Le(a, b) {
        a.uniform2iv(this.addr, b)
    }

    function Me(a, b) {
        a.uniform3iv(this.addr, b)
    }

    function Ne(a, b) {
        a.uniform4iv(this.addr, b)
    }

    function Yf(a) {
        switch (a) {
            case 5126:
                return Of;
            case 35664:
                return Qf;
            case 35665:
                return Rf;
            case 35666:
                return Sf;
            case 35674:
                return Tf;
            case 35675:
                return Uf;
            case 35676:
                return Vf;
            case 35678:
            case 36198:
                return Wf;
            case 35680:
                return Xf;
            case 5124:
            case 35670:
                return Pf;
            case 35667:
            case 35671:
                return Le;
            case 35668:
            case 35672:
                return Me;
            case 35669:
            case 35673:
                return Ne
        }
    }

    function Zf(a, b) {
        a.uniform1fv(this.addr, b)
    }

    function $f(a, b) {
        a.uniform1iv(this.addr, b)
    }

    function ag(a, b) {
        a.uniform2fv(this.addr, Ob(b, this.size, 2))
    }

    function bg(a, b) {
        a.uniform3fv(this.addr, Ob(b, this.size, 3))
    }

    function cg(a,
        b) {
        a.uniform4fv(this.addr, Ob(b, this.size, 4))
    }

    function dg(a, b) {
        a.uniformMatrix2fv(this.addr, !1, Ob(b, this.size, 4))
    }

    function eg(a, b) {
        a.uniformMatrix3fv(this.addr, !1, Ob(b, this.size, 9))
    }

    function fg(a, b) {
        a.uniformMatrix4fv(this.addr, !1, Ob(b, this.size, 16))
    }

    function gg(a, b, c) {
        var d = b.length,
            e = Fe(c, d);
        a.uniform1iv(this.addr, e);
        for (a = 0; a !== d; ++a) c.setTexture2D(b[a] || Je, e[a])
    }

    function hg(a, b, c) {
        var d = b.length,
            e = Fe(c, d);
        a.uniform1iv(this.addr, e);
        for (a = 0; a !== d; ++a) c.setTextureCube(b[a] || Ke, e[a])
    }

    function ig(a) {
        switch (a) {
            case 5126:
                return Zf;
            case 35664:
                return ag;
            case 35665:
                return bg;
            case 35666:
                return cg;
            case 35674:
                return dg;
            case 35675:
                return eg;
            case 35676:
                return fg;
            case 35678:
                return gg;
            case 35680:
                return hg;
            case 5124:
            case 35670:
                return $f;
            case 35667:
            case 35671:
                return Le;
            case 35668:
            case 35672:
                return Me;
            case 35669:
            case 35673:
                return Ne
        }
    }

    function jg(a, b, c) {
        this.id = a;
        this.addr = c;
        this.setValue = Yf(b.type)
    }

    function kg(a, b, c) {
        this.id = a;
        this.addr = c;
        this.size = b.size;
        this.setValue = ig(b.type)
    }

    function Oe(a) {
        this.id = a;
        this.seq = [];
        this.map = {}
    }

    function cb(a,
        b, c) {
        this.seq = [];
        this.map = {};
        this.renderer = c;
        c = a.getProgramParameter(b, a.ACTIVE_UNIFORMS);
        for (var d = 0; d < c; ++d) {
            var e = a.getActiveUniform(b, d),
                f = a.getUniformLocation(b, e.name),
                g = this,
                h = e.name,
                l = h.length;
            for (Td.lastIndex = 0;;) {
                var m = Td.exec(h),
                    w = Td.lastIndex,
                    n = m[1],
                    t = m[3];
                "]" === m[2] && (n |= 0);
                if (void 0 === t || "[" === t && w + 2 === l) {
                    h = g;
                    e = void 0 === t ? new jg(n, e, f) : new kg(n, e, f);
                    h.seq.push(e);
                    h.map[e.id] = e;
                    break
                } else t = g.map[n], void 0 === t && (t = new Oe(n), n = g, g = t, n.seq.push(g), n.map[g.id] = g), g = t
            }
        }
    }

    function lg(a) {
        a =
            a.split("\n");
        for (var b = 0; b < a.length; b++) a[b] = b + 1 + ": " + a[b];
        return a.join("\n")
    }

    function Pe(a, b, c) {
        var d = a.createShader(b);
        a.shaderSource(d, c);
        a.compileShader(d);
        !1 === a.getShaderParameter(d, a.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile.");
        "" !== a.getShaderInfoLog(d) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", b === a.VERTEX_SHADER ? "vertex" : "fragment", a.getShaderInfoLog(d), lg(c));
        return d
    }

    function Qe(a) {
        switch (a) {
            case 3E3:
                return ["Linear", "( value )"];
            case 3001:
                return ["sRGB",
                    "( value )"
                ];
            case 3002:
                return ["RGBE", "( value )"];
            case 3004:
                return ["RGBM", "( value, 7.0 )"];
            case 3005:
                return ["RGBM", "( value, 16.0 )"];
            case 3006:
                return ["RGBD", "( value, 256.0 )"];
            case 3007:
                return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
            default:
                throw Error("unsupported encoding: " + a);
        }
    }

    function Ud(a, b) {
        b = Qe(b);
        return "vec4 " + a + "( vec4 value ) { return " + b[0] + "ToLinear" + b[1] + "; }"
    }

    function mg(a, b) {
        b = Qe(b);
        return "vec4 " + a + "( vec4 value ) { return LinearTo" + b[0] + b[1] + "; }"
    }

    function ng(a, b) {
        switch (b) {
            case 1:
                b =
                    "Linear";
                break;
            case 2:
                b = "Reinhard";
                break;
            case 3:
                b = "Uncharted2";
                break;
            case 4:
                b = "OptimizedCineon";
                break;
            default:
                throw Error("unsupported toneMapping: " + b);
        }
        return "vec3 " + a + "( vec3 color ) { return " + b + "ToneMapping( color ); }"
    }

    function og(a, b, c) {
        a = a || {};
        return [a.derivatives || b.envMapCubeUV || b.bumpMap || b.normalMap || b.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (a.fragDepth || b.logarithmicDepthBuffer) && c.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", a.drawBuffers &&
            c.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (a.shaderTextureLOD || b.envMap) && c.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""
        ].filter(Bc).join("\n")
    }

    function pg(a) {
        var b = [],
            c;
        for (c in a) {
            var d = a[c];
            !1 !== d && b.push("#define " + c + " " + d)
        }
        return b.join("\n")
    }

    function Bc(a) {
        return "" !== a
    }

    function Re(a, b) {
        return a.replace(/NUM_DIR_LIGHTS/g, b.numDirLights).replace(/NUM_SPOT_LIGHTS/g, b.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, b.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,
            b.numPointLights).replace(/NUM_HEMI_LIGHTS/g, b.numHemiLights)
    }

    function Se(a, b) {
        return a.replace(/NUM_CLIPPING_PLANES/g, b.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, b.numClippingPlanes - b.numClipIntersection)
    }

    function Vd(a) {
        return a.replace(/^[ \t]*#include +<([\w\d.]+)>/gm, function (a, c) {
            a = W[c];
            if (void 0 === a) throw Error("Can not resolve #include <" + c + ">");
            return Vd(a)
        })
    }

    function Te(a) {
        return a.replace(/#pragma unroll_loop[\s]+?for \( int i = (\d+); i < (\d+); i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
            function (a, c, d, e) {
                a = "";
                for (c = parseInt(c); c < parseInt(d); c++) a += e.replace(/\[ i \]/g, "[ " + c + " ]");
                return a
            })
    }

    function qg(a, b, c, d, e, f) {
        var g = a.context,
            h = d.defines,
            l = e.vertexShader,
            m = e.fragmentShader,
            w = "SHADOWMAP_TYPE_BASIC";
        1 === f.shadowMapType ? w = "SHADOWMAP_TYPE_PCF" : 2 === f.shadowMapType && (w = "SHADOWMAP_TYPE_PCF_SOFT");
        var n = "ENVMAP_TYPE_CUBE",
            t = "ENVMAP_MODE_REFLECTION",
            r = "ENVMAP_BLENDING_MULTIPLY";
        if (f.envMap) {
            switch (d.envMap.mapping) {
                case 301:
                case 302:
                    n = "ENVMAP_TYPE_CUBE";
                    break;
                case 306:
                case 307:
                    n = "ENVMAP_TYPE_CUBE_UV";
                    break;
                case 303:
                case 304:
                    n = "ENVMAP_TYPE_EQUIREC";
                    break;
                case 305:
                    n = "ENVMAP_TYPE_SPHERE"
            }
            switch (d.envMap.mapping) {
                case 302:
                case 304:
                    t = "ENVMAP_MODE_REFRACTION"
            }
            switch (d.combine) {
                case 0:
                    r = "ENVMAP_BLENDING_MULTIPLY";
                    break;
                case 1:
                    r = "ENVMAP_BLENDING_MIX";
                    break;
                case 2:
                    r = "ENVMAP_BLENDING_ADD"
            }
        }
        var q = 0 < a.gammaFactor ? a.gammaFactor : 1,
            k = og(d.extensions, f, b),
            x = pg(h),
            p = g.createProgram();
        d.isRawShaderMaterial ? (h = [x].filter(Bc).join("\n"), 0 < h.length && (h += "\n"), b = [k, x].filter(Bc).join("\n"), 0 < b.length && (b += "\n")) : (h = ["precision " + f.precision + " float;", "precision " + f.precision + " int;", "#define SHADER_NAME " + e.name, x, f.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + q, "#define MAX_BONES " + f.maxBones, f.useFog && f.fog ? "#define USE_FOG" : "", f.useFog && f.fogExp ? "#define FOG_EXP2" : "", f.map ? "#define USE_MAP" : "", f.envMap ? "#define USE_ENVMAP" : "", f.envMap ? "#define " + t : "", f.lightMap ? "#define USE_LIGHTMAP" : "", f.aoMap ? "#define USE_AOMAP" : "", f.emissiveMap ? "#define USE_EMISSIVEMAP" : "", f.bumpMap ? "#define USE_BUMPMAP" :
            "", f.normalMap ? "#define USE_NORMALMAP" : "", f.displacementMap && f.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", f.specularMap ? "#define USE_SPECULARMAP" : "", f.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", f.metalnessMap ? "#define USE_METALNESSMAP" : "", f.alphaMap ? "#define USE_ALPHAMAP" : "", f.vertexColors ? "#define USE_COLOR" : "", f.flatShading ? "#define FLAT_SHADED" : "", f.skinning ? "#define USE_SKINNING" : "", f.useVertexTexture ? "#define BONE_TEXTURE" : "", f.morphTargets ? "#define USE_MORPHTARGETS" : "", f.morphNormals &&
            !1 === f.flatShading ? "#define USE_MORPHNORMALS" : "", f.doubleSided ? "#define DOUBLE_SIDED" : "", f.flipSided ? "#define FLIP_SIDED" : "", f.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", f.shadowMapEnabled ? "#define " + w : "", f.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", f.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", f.logarithmicDepthBuffer && b.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;",
            "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;",
            "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"
        ].filter(Bc).join("\n"), b = [k, "precision " + f.precision + " float;", "precision " + f.precision + " int;", "#define SHADER_NAME " + e.name, x, f.alphaTest ? "#define ALPHATEST " + f.alphaTest : "", "#define GAMMA_FACTOR " + q, f.useFog && f.fog ? "#define USE_FOG" :
            "", f.useFog && f.fogExp ? "#define FOG_EXP2" : "", f.map ? "#define USE_MAP" : "", f.envMap ? "#define USE_ENVMAP" : "", f.envMap ? "#define " + n : "", f.envMap ? "#define " + t : "", f.envMap ? "#define " + r : "", f.lightMap ? "#define USE_LIGHTMAP" : "", f.aoMap ? "#define USE_AOMAP" : "", f.emissiveMap ? "#define USE_EMISSIVEMAP" : "", f.bumpMap ? "#define USE_BUMPMAP" : "", f.normalMap ? "#define USE_NORMALMAP" : "", f.specularMap ? "#define USE_SPECULARMAP" : "", f.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", f.metalnessMap ? "#define USE_METALNESSMAP" : "", f.alphaMap ?
            "#define USE_ALPHAMAP" : "", f.vertexColors ? "#define USE_COLOR" : "", f.gradientMap ? "#define USE_GRADIENTMAP" : "", f.flatShading ? "#define FLAT_SHADED" : "", f.doubleSided ? "#define DOUBLE_SIDED" : "", f.flipSided ? "#define FLIP_SIDED" : "", f.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", f.shadowMapEnabled ? "#define " + w : "", f.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", f.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", f.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", f.logarithmicDepthBuffer &&
            b.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", f.envMap && b.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", 0 !== f.toneMapping ? "#define TONE_MAPPING" : "", 0 !== f.toneMapping ? W.tonemapping_pars_fragment : "", 0 !== f.toneMapping ? ng("toneMapping", f.toneMapping) : "", f.dithering ? "#define DITHERING" : "", f.outputEncoding || f.mapEncoding || f.envMapEncoding || f.emissiveMapEncoding ? W.encodings_pars_fragment : "", f.mapEncoding ? Ud("mapTexelToLinear",
                f.mapEncoding) : "", f.envMapEncoding ? Ud("envMapTexelToLinear", f.envMapEncoding) : "", f.emissiveMapEncoding ? Ud("emissiveMapTexelToLinear", f.emissiveMapEncoding) : "", f.outputEncoding ? mg("linearToOutputTexel", f.outputEncoding) : "", f.depthPacking ? "#define DEPTH_PACKING " + d.depthPacking : "", "\n"
        ].filter(Bc).join("\n"));
        l = Vd(l);
        l = Re(l, f);
        l = Se(l, f);
        m = Vd(m);
        m = Re(m, f);
        m = Se(m, f);
        l = Te(l);
        m = Te(m);
        m = b + m;
        l = Pe(g, g.VERTEX_SHADER, h + l);
        m = Pe(g, g.FRAGMENT_SHADER, m);
        g.attachShader(p, l);
        g.attachShader(p, m);
        void 0 !== d.index0AttributeName ?
            g.bindAttribLocation(p, 0, d.index0AttributeName) : !0 === f.morphTargets && g.bindAttribLocation(p, 0, "position");
        g.linkProgram(p);
        f = g.getProgramInfoLog(p).trim();
        w = g.getShaderInfoLog(l).trim();
        n = g.getShaderInfoLog(m).trim();
        r = t = !0;
        if (!1 === g.getProgramParameter(p, g.LINK_STATUS)) t = !1, console.error("THREE.WebGLProgram: shader error: ", g.getError(), "gl.VALIDATE_STATUS", g.getProgramParameter(p, g.VALIDATE_STATUS), "gl.getProgramInfoLog", f, w, n);
        else if ("" !== f) console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",
            f);
        else if ("" === w || "" === n) r = !1;
        r && (this.diagnostics = {
            runnable: t,
            material: d,
            programLog: f,
            vertexShader: {
                log: w,
                prefix: h
            },
            fragmentShader: {
                log: n,
                prefix: b
            }
        });
        g.deleteShader(l);
        g.deleteShader(m);
        var v;
        this.getUniforms = function () {
            void 0 === v && (v = new cb(g, p, a));
            return v
        };
        var C;
        this.getAttributes = function () {
            if (void 0 === C) {
                for (var a = {}, b = g.getProgramParameter(p, g.ACTIVE_ATTRIBUTES), c = 0; c < b; c++) {
                    var d = g.getActiveAttrib(p, c).name;
                    a[d] = g.getAttribLocation(p, d)
                }
                C = a
            }
            return C
        };
        this.destroy = function () {
            g.deleteProgram(p);
            this.program = void 0
        };
        Object.defineProperties(this, {
            uniforms: {
                get: function () {
                    console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms().");
                    return this.getUniforms()
                }
            },
            attributes: {
                get: function () {
                    console.warn("THREE.WebGLProgram: .attributes is now .getAttributes().");
                    return this.getAttributes()
                }
            }
        });
        this.name = e.name;
        this.id = rg++;
        this.code = c;
        this.usedTimes = 1;
        this.program = p;
        this.vertexShader = l;
        this.fragmentShader = m;
        return this
    }

    function sg(a, b, c) {
        function d(a, b) {
            if (a) a.isTexture ? c = a.encoding : a.isWebGLRenderTarget &&
                (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), c = a.texture.encoding);
            else var c = 3E3;
            3E3 === c && b && (c = 3007);
            return c
        }
        var e = [],
            f = {
                MeshDepthMaterial: "depth",
                MeshDistanceMaterial: "distanceRGBA",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshToonMaterial: "phong",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points",
                ShadowMaterial: "shadow"
            },
            g = "precision supportsVertexTextures map mapEncoding envMap envMapMode envMapEncoding lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap displacementMap specularMap roughnessMap metalnessMap gradientMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights numRectAreaLights shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes numClipIntersection depthPacking dithering".split(" ");
        this.getParameters = function (b, e, g, w, n, t, r) {
            var h = f[b.type];
            if (r.isSkinnedMesh) {
                var l = r.skeleton.bones;
                if (c.floatVertexTextures) l = 1024;
                else {
                    var m = Math.min(Math.floor((c.maxVertexUniforms - 20) / 4), l.length);
                    m < l.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + l.length + " bones. This GPU supports " + m + "."), l = 0) : l = m
                }
            } else l = 0;
            m = c.precision;
            null !== b.precision && (m = c.getMaxPrecision(b.precision), m !== b.precision && console.warn("THREE.WebGLProgram.getParameters:", b.precision, "not supported, using", m, "instead."));
            var k = a.getRenderTarget();
            return {
                shaderID: h,
                precision: m,
                supportsVertexTextures: c.vertexTextures,
                outputEncoding: d(k ? k.texture : null, a.gammaOutput),
                map: !!b.map,
                mapEncoding: d(b.map, a.gammaInput),
                envMap: !!b.envMap,
                envMapMode: b.envMap && b.envMap.mapping,
                envMapEncoding: d(b.envMap, a.gammaInput),
                envMapCubeUV: !!b.envMap && (306 === b.envMap.mapping || 307 === b.envMap.mapping),
                lightMap: !!b.lightMap,
                aoMap: !!b.aoMap,
                emissiveMap: !!b.emissiveMap,
                emissiveMapEncoding: d(b.emissiveMap, a.gammaInput),
                bumpMap: !!b.bumpMap,
                normalMap: !!b.normalMap,
                displacementMap: !!b.displacementMap,
                roughnessMap: !!b.roughnessMap,
                metalnessMap: !!b.metalnessMap,
                specularMap: !!b.specularMap,
                alphaMap: !!b.alphaMap,
                gradientMap: !!b.gradientMap,
                combine: b.combine,
                vertexColors: b.vertexColors,
                fog: !!w,
                useFog: b.fog,
                fogExp: w && w.isFogExp2,
                flatShading: b.flatShading,
                sizeAttenuation: b.sizeAttenuation,
                logarithmicDepthBuffer: c.logarithmicDepthBuffer,
                skinning: b.skinning && 0 < l,
                maxBones: l,
                useVertexTexture: c.floatVertexTextures,
                morphTargets: b.morphTargets,
                morphNormals: b.morphNormals,
                maxMorphTargets: a.maxMorphTargets,
                maxMorphNormals: a.maxMorphNormals,
                numDirLights: e.directional.length,
                numPointLights: e.point.length,
                numSpotLights: e.spot.length,
                numRectAreaLights: e.rectArea.length,
                numHemiLights: e.hemi.length,
                numClippingPlanes: n,
                numClipIntersection: t,
                dithering: b.dithering,
                shadowMapEnabled: a.shadowMap.enabled && r.receiveShadow && 0 < g.length,
                shadowMapType: a.shadowMap.type,
                toneMapping: a.toneMapping,
                physicallyCorrectLights: a.physicallyCorrectLights,
                premultipliedAlpha: b.premultipliedAlpha,
                alphaTest: b.alphaTest,
                doubleSided: 2 === b.side,
                flipSided: 1 === b.side,
                depthPacking: void 0 !== b.depthPacking ? b.depthPacking : !1
            }
        };
        this.getProgramCode = function (b, c) {
            var d = [];
            c.shaderID ? d.push(c.shaderID) : (d.push(b.fragmentShader), d.push(b.vertexShader));
            if (void 0 !== b.defines)
                for (var e in b.defines) d.push(e), d.push(b.defines[e]);
            for (e = 0; e < g.length; e++) d.push(c[g[e]]);
            d.push(b.onBeforeCompile.toString());
            d.push(a.gammaOutput);
            return d.join()
        };
        this.acquireProgram = function (c, d, f, g) {
            for (var h, l = 0, m = e.length; l <
                m; l++) {
                var w = e[l];
                if (w.code === g) {
                    h = w;
                    ++h.usedTimes;
                    break
                }
            }
            void 0 === h && (h = new qg(a, b, g, c, d, f), e.push(h));
            return h
        };
        this.releaseProgram = function (a) {
            if (0 === --a.usedTimes) {
                var b = e.indexOf(a);
                e[b] = e[e.length - 1];
                e.pop();
                a.destroy()
            }
        };
        this.programs = e
    }

    function tg() {
        var a = new WeakMap;
        return {
            get: function (b) {
                var c = a.get(b);
                void 0 === c && (c = {}, a.set(b, c));
                return c
            },
            remove: function (b) {
                a.delete(b)
            },
            update: function (b, c, d) {
                a.get(b)[c] = d
            },
            dispose: function () {
                a = new WeakMap
            }
        }
    }

    function ug(a, b) {
        return a.renderOrder !== b.renderOrder ?
            a.renderOrder - b.renderOrder : a.program && b.program && a.program !== b.program ? a.program.id - b.program.id : a.material.id !== b.material.id ? a.material.id - b.material.id : a.z !== b.z ? a.z - b.z : a.id - b.id
    }

    function vg(a, b) {
        return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.z !== b.z ? b.z - a.z : a.id - b.id
    }

    function wg() {
        var a = [],
            b = 0,
            c = [],
            d = [];
        return {
            opaque: c,
            transparent: d,
            init: function () {
                b = 0;
                c.length = 0;
                d.length = 0
            },
            push: function (e, f, g, h, l) {
                var m = a[b];
                void 0 === m ? (m = {
                    id: e.id,
                    object: e,
                    geometry: f,
                    material: g,
                    program: g.program,
                    renderOrder: e.renderOrder,
                    z: h,
                    group: l
                }, a[b] = m) : (m.id = e.id, m.object = e, m.geometry = f, m.material = g, m.program = g.program, m.renderOrder = e.renderOrder, m.z = h, m.group = l);
                (!0 === g.transparent ? d : c).push(m);
                b++
            },
            sort: function () {
                1 < c.length && c.sort(ug);
                1 < d.length && d.sort(vg)
            }
        }
    }

    function xg() {
        var a = {};
        return {
            get: function (b, c) {
                b = b.id + "," + c.id;
                c = a[b];
                void 0 === c && (c = new wg, a[b] = c);
                return c
            },
            dispose: function () {
                a = {}
            }
        }
    }

    function yg() {
        var a = {};
        return {
            get: function (b) {
                if (void 0 !== a[b.id]) return a[b.id];
                switch (b.type) {
                    case "DirectionalLight":
                        var c = {
                            direction: new p,
                            color: new L,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new A
                        };
                        break;
                    case "SpotLight":
                        c = {
                            position: new p,
                            direction: new p,
                            color: new L,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new A
                        };
                        break;
                    case "PointLight":
                        c = {
                            position: new p,
                            color: new L,
                            distance: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new A,
                            shadowCameraNear: 1,
                            shadowCameraFar: 1E3
                        };
                        break;
                    case "HemisphereLight":
                        c = {
                            direction: new p,
                            skyColor: new L,
                            groundColor: new L
                        };
                        break;
                    case "RectAreaLight":
                        c = {
                            color: new L,
                            position: new p,
                            halfWidth: new p,
                            halfHeight: new p
                        }
                }
                return a[b.id] = c
            }
        }
    }

    function zg() {
        var a = new yg,
            b = {
                id: Ag++,
                hash: "",
                ambient: [0, 0, 0],
                directional: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                rectArea: [],
                point: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: []
            },
            c = new p,
            d = new K,
            e = new K;
        return {
            setup: function (f, g, h) {
                var l = 0,
                    m = 0,
                    w = 0,
                    n = 0,
                    t = 0,
                    r = 0,
                    k = 0,
                    u = 0;
                h = h.matrixWorldInverse;
                for (var x = 0, p = f.length; x < p; x++) {
                    var v =
                        f[x],
                        C = v.color,
                        F = v.intensity,
                        N = v.distance,
                        O = v.shadow && v.shadow.map ? v.shadow.map.texture : null;
                    if (v.isAmbientLight) l += C.r * F, m += C.g * F, w += C.b * F;
                    else if (v.isDirectionalLight) {
                        var G = a.get(v);
                        G.color.copy(v.color).multiplyScalar(v.intensity);
                        G.direction.setFromMatrixPosition(v.matrixWorld);
                        c.setFromMatrixPosition(v.target.matrixWorld);
                        G.direction.sub(c);
                        G.direction.transformDirection(h);
                        if (G.shadow = v.castShadow) C = v.shadow, G.shadowBias = C.bias, G.shadowRadius = C.radius, G.shadowMapSize = C.mapSize;
                        b.directionalShadowMap[n] =
                            O;
                        b.directionalShadowMatrix[n] = v.shadow.matrix;
                        b.directional[n] = G;
                        n++
                    } else if (v.isSpotLight) {
                        G = a.get(v);
                        G.position.setFromMatrixPosition(v.matrixWorld);
                        G.position.applyMatrix4(h);
                        G.color.copy(C).multiplyScalar(F);
                        G.distance = N;
                        G.direction.setFromMatrixPosition(v.matrixWorld);
                        c.setFromMatrixPosition(v.target.matrixWorld);
                        G.direction.sub(c);
                        G.direction.transformDirection(h);
                        G.coneCos = Math.cos(v.angle);
                        G.penumbraCos = Math.cos(v.angle * (1 - v.penumbra));
                        G.decay = 0 === v.distance ? 0 : v.decay;
                        if (G.shadow = v.castShadow) C =
                            v.shadow, G.shadowBias = C.bias, G.shadowRadius = C.radius, G.shadowMapSize = C.mapSize;
                        b.spotShadowMap[r] = O;
                        b.spotShadowMatrix[r] = v.shadow.matrix;
                        b.spot[r] = G;
                        r++
                    } else if (v.isRectAreaLight) G = a.get(v), G.color.copy(C).multiplyScalar(F), G.position.setFromMatrixPosition(v.matrixWorld), G.position.applyMatrix4(h), e.identity(), d.copy(v.matrixWorld), d.premultiply(h), e.extractRotation(d), G.halfWidth.set(.5 * v.width, 0, 0), G.halfHeight.set(0, .5 * v.height, 0), G.halfWidth.applyMatrix4(e), G.halfHeight.applyMatrix4(e), b.rectArea[k] =
                        G, k++;
                    else if (v.isPointLight) {
                        G = a.get(v);
                        G.position.setFromMatrixPosition(v.matrixWorld);
                        G.position.applyMatrix4(h);
                        G.color.copy(v.color).multiplyScalar(v.intensity);
                        G.distance = v.distance;
                        G.decay = 0 === v.distance ? 0 : v.decay;
                        if (G.shadow = v.castShadow) C = v.shadow, G.shadowBias = C.bias, G.shadowRadius = C.radius, G.shadowMapSize = C.mapSize, G.shadowCameraNear = C.camera.near, G.shadowCameraFar = C.camera.far;
                        b.pointShadowMap[t] = O;
                        b.pointShadowMatrix[t] = v.shadow.matrix;
                        b.point[t] = G;
                        t++
                    } else v.isHemisphereLight && (G = a.get(v),
                        G.direction.setFromMatrixPosition(v.matrixWorld), G.direction.transformDirection(h), G.direction.normalize(), G.skyColor.copy(v.color).multiplyScalar(F), G.groundColor.copy(v.groundColor).multiplyScalar(F), b.hemi[u] = G, u++)
                }
                b.ambient[0] = l;
                b.ambient[1] = m;
                b.ambient[2] = w;
                b.directional.length = n;
                b.spot.length = r;
                b.rectArea.length = k;
                b.point.length = t;
                b.hemi.length = u;
                b.hash = b.id + "," + n + "," + t + "," + r + "," + k + "," + u + "," + g.length
            },
            state: b
        }
    }

    function Bg() {
        var a = new zg,
            b = [],
            c = [],
            d = [];
        return {
            init: function () {
                b.length = 0;
                c.length =
                    0;
                d.length = 0
            },
            state: {
                lightsArray: b,
                shadowsArray: c,
                spritesArray: d,
                lights: a
            },
            setupLights: function (d) {
                a.setup(b, c, d)
            },
            pushLight: function (a) {
                b.push(a)
            },
            pushShadow: function (a) {
                c.push(a)
            },
            pushSprite: function (a) {
                d.push(a)
            }
        }
    }

    function Cg() {
        var a = {};
        return {
            get: function (b, c) {
                b = b.id + "," + c.id;
                c = a[b];
                void 0 === c && (c = new Bg, a[b] = c);
                return c
            },
            dispose: function () {
                a = {}
            }
        }
    }

    function db(a) {
        Q.call(this);
        this.type = "MeshDepthMaterial";
        this.depthPacking = 3200;
        this.morphTargets = this.skinning = !1;
        this.displacementMap = this.alphaMap =
            this.map = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.lights = this.fog = !1;
        this.setValues(a)
    }

    function eb(a) {
        Q.call(this);
        this.type = "MeshDistanceMaterial";
        this.referencePosition = new p;
        this.nearDistance = 1;
        this.farDistance = 1E3;
        this.morphTargets = this.skinning = !1;
        this.displacementMap = this.alphaMap = this.map = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.lights = this.fog = !1;
        this.setValues(a)
    }

    function Ue(a, b, c) {
        function d(b, c, d, e, f, g) {
            var h =
                b.geometry;
            var l = n;
            var m = b.customDepthMaterial;
            d && (l = t, m = b.customDistanceMaterial);
            m ? l = m : (m = !1, c.morphTargets && (h && h.isBufferGeometry ? m = h.morphAttributes && h.morphAttributes.position && 0 < h.morphAttributes.position.length : h && h.isGeometry && (m = h.morphTargets && 0 < h.morphTargets.length)), b.isSkinnedMesh && !1 === c.skinning && console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", b), b = b.isSkinnedMesh && c.skinning, h = 0, m && (h |= 1), b && (h |= 2), l = l[h]);
            a.localClippingEnabled && !0 ===
                c.clipShadows && 0 !== c.clippingPlanes.length && (h = l.uuid, m = c.uuid, b = r[h], void 0 === b && (b = {}, r[h] = b), h = b[m], void 0 === h && (h = l.clone(), b[m] = h), l = h);
            l.visible = c.visible;
            l.wireframe = c.wireframe;
            l.side = null != c.shadowSide ? c.shadowSide : k[c.side];
            l.clipShadows = c.clipShadows;
            l.clippingPlanes = c.clippingPlanes;
            l.clipIntersection = c.clipIntersection;
            l.wireframeLinewidth = c.wireframeLinewidth;
            l.linewidth = c.linewidth;
            d && l.isMeshDistanceMaterial && (l.referencePosition.copy(e), l.nearDistance = f, l.farDistance = g);
            return l
        }

        function e(c, g, h, l) {
            if (!1 !== c.visible) {
                if (c.layers.test(g.layers) && (c.isMesh || c.isLine || c.isPoints) && c.castShadow && (!c.frustumCulled || f.intersectsObject(c))) {
                    c.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse, c.matrixWorld);
                    var m = b.update(c),
                        n = c.material;
                    if (Array.isArray(n))
                        for (var t = m.groups, r = 0, k = t.length; r < k; r++) {
                            var q = t[r],
                                u = n[q.materialIndex];
                            u && u.visible && (u = d(c, u, l, w, h.near, h.far), a.renderBufferDirect(h, null, m, u, c, q))
                        } else n.visible && (u = d(c, n, l, w, h.near, h.far), a.renderBufferDirect(h, null,
                            m, u, c, null))
                }
                c = c.children;
                m = 0;
                for (n = c.length; m < n; m++) e(c[m], g, h, l)
            }
        }
        var f = new od,
            g = new K,
            h = new A,
            l = new A(c, c),
            m = new p,
            w = new p,
            n = Array(4),
            t = Array(4),
            r = {},
            k = {
                0: 1,
                1: 0,
                2: 2
            },
            u = [new p(1, 0, 0), new p(-1, 0, 0), new p(0, 0, 1), new p(0, 0, -1), new p(0, 1, 0), new p(0, -1, 0)],
            x = [new p(0, 1, 0), new p(0, 1, 0), new p(0, 1, 0), new p(0, 1, 0), new p(0, 0, 1), new p(0, 0, -1)],
            y = [new da, new da, new da, new da, new da, new da];
        for (c = 0; 4 !== c; ++c) {
            var v = 0 !== (c & 1),
                C = 0 !== (c & 2),
                F = new db({
                    depthPacking: 3201,
                    morphTargets: v,
                    skinning: C
                });
            n[c] = F;
            v = new eb({
                morphTargets: v,
                skinning: C
            });
            t[c] = v
        }
        var N = this;
        this.enabled = !1;
        this.autoUpdate = !0;
        this.needsUpdate = !1;
        this.type = 1;
        this.render = function (b, c, d) {
            if (!1 !== N.enabled && (!1 !== N.autoUpdate || !1 !== N.needsUpdate) && 0 !== b.length) {
                var n = a.state;
                n.disable(a.context.BLEND);
                n.buffers.color.setClear(1, 1, 1, 1);
                n.buffers.depth.setTest(!0);
                n.setScissorTest(!1);
                for (var t, r = 0, k = b.length; r < k; r++) {
                    var q = b[r];
                    t = q.shadow;
                    var p = q && q.isPointLight;
                    if (void 0 === t) console.warn("THREE.WebGLShadowMap:", q, "has no shadow.");
                    else {
                        var v = t.camera;
                        h.copy(t.mapSize);
                        h.min(l);
                        if (p) {
                            var O = h.x,
                                G = h.y;
                            y[0].set(2 * O, G, O, G);
                            y[1].set(0, G, O, G);
                            y[2].set(3 * O, G, O, G);
                            y[3].set(O, G, O, G);
                            y[4].set(3 * O, 0, O, G);
                            y[5].set(O, 0, O, G);
                            h.x *= 4;
                            h.y *= 2
                        }
                        null === t.map && (t.map = new ib(h.x, h.y, {
                            minFilter: 1003,
                            magFilter: 1003,
                            format: 1023
                        }), t.map.texture.name = q.name + ".shadowMap", v.updateProjectionMatrix());
                        t.isSpotLightShadow && t.update(q);
                        O = t.map;
                        G = t.matrix;
                        w.setFromMatrixPosition(q.matrixWorld);
                        v.position.copy(w);
                        p ? (t = 6, G.makeTranslation(-w.x, -w.y, -w.z)) : (t = 1, m.setFromMatrixPosition(q.target.matrixWorld),
                            v.lookAt(m), v.updateMatrixWorld(), G.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), G.multiply(v.projectionMatrix), G.multiply(v.matrixWorldInverse));
                        a.setRenderTarget(O);
                        a.clear();
                        for (q = 0; q < t; q++) p && (m.copy(v.position), m.add(u[q]), v.up.copy(x[q]), v.lookAt(m), v.updateMatrixWorld(), n.viewport(y[q])), g.multiplyMatrices(v.projectionMatrix, v.matrixWorldInverse), f.setFromMatrix(g), e(c, d, v, p)
                    }
                }
                N.needsUpdate = !1
            }
        }
    }

    function Cc(a, b, c, d, e, f, g, h, l) {
        X.call(this, a, b, c, d, e, f, g, h, l);
        this.needsUpdate = !0
    }

    function Dg(a, b,
        c, d, e) {
        var f, g, h, l, m, w, n, t, r, k, u, x, y, v, C, F, N, O;

        function G(a, b) {
            return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.z !== b.z ? b.z - a.z : b.id - a.id
        }
        var A, ob, ha, z, B = new p,
            I = new ia,
            L = new p;
        this.render = function (q, p, Lb) {
            if (0 !== q.length) {
                if (void 0 === ha) {
                    var T = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                        Da = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    A = b.createBuffer();
                    ob = b.createBuffer();
                    b.bindBuffer(b.ARRAY_BUFFER, A);
                    b.bufferData(b.ARRAY_BUFFER, T, b.STATIC_DRAW);
                    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
                        ob);
                    b.bufferData(b.ELEMENT_ARRAY_BUFFER, Da, b.STATIC_DRAW);
                    T = b.createProgram();
                    Da = b.createShader(b.VERTEX_SHADER);
                    var D = b.createShader(b.FRAGMENT_SHADER);
                    b.shaderSource(Da, ["precision " + e.precision + " float;", "#define SHADER_NAME SpriteMaterial\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 center;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float fogDepth;\nvoid main() {\n\tvUV = uvOffset + uv * uvScale;\n\tvec2 alignedPosition = ( position - center ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tvec4 mvPosition;\n\tmvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\tfogDepth = - mvPosition.z;\n}"].join("\n"));
                    b.shaderSource(D, ["precision " + e.precision + " float;", "#define SHADER_NAME SpriteMaterial\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvarying float fogDepth;\nvoid main() {\n\tvec4 texture = texture2D( map, vUV );\n\tgl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n\tif ( gl_FragColor.a < alphaTest ) discard;\n\tif ( fogType > 0 ) {\n\t\tfloat fogFactor = 0.0;\n\t\tif ( fogType == 1 ) {\n\t\t\tfogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t\t} else {\n\t\t\tconst float LOG2 = 1.442695;\n\t\t\tfogFactor = exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 );\n\t\t\tfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\t\t}\n\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\t}\n}"].join("\n"));
                    b.compileShader(Da);
                    b.compileShader(D);
                    b.attachShader(T, Da);
                    b.attachShader(T, D);
                    b.linkProgram(T);
                    ha = T;
                    N = b.getAttribLocation(ha, "position");
                    O = b.getAttribLocation(ha, "uv");
                    f = b.getUniformLocation(ha, "uvOffset");
                    g = b.getUniformLocation(ha, "uvScale");
                    h = b.getUniformLocation(ha, "rotation");
                    l = b.getUniformLocation(ha, "center");
                    m = b.getUniformLocation(ha, "scale");
                    w = b.getUniformLocation(ha, "color");
                    n = b.getUniformLocation(ha, "map");
                    t = b.getUniformLocation(ha, "opacity");
                    r = b.getUniformLocation(ha, "modelViewMatrix");
                    k = b.getUniformLocation(ha, "projectionMatrix");
                    u = b.getUniformLocation(ha, "fogType");
                    x = b.getUniformLocation(ha, "fogDensity");
                    y = b.getUniformLocation(ha, "fogNear");
                    v = b.getUniformLocation(ha, "fogFar");
                    C = b.getUniformLocation(ha, "fogColor");
                    b.getUniformLocation(ha, "fogDepth");
                    F = b.getUniformLocation(ha, "alphaTest");
                    T = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                    T.width = 8;
                    T.height = 8;
                    Da = T.getContext("2d");
                    Da.fillStyle = "white";
                    Da.fillRect(0, 0, 8, 8);
                    z = new Cc(T)
                }
                c.useProgram(ha);
                c.initAttributes();
                c.enableAttribute(N);
                c.enableAttribute(O);
                c.disableUnusedAttributes();
                c.disable(b.CULL_FACE);
                c.enable(b.BLEND);
                b.bindBuffer(b.ARRAY_BUFFER, A);
                b.vertexAttribPointer(N, 2, b.FLOAT, !1, 16, 0);
                b.vertexAttribPointer(O, 2, b.FLOAT, !1, 16, 8);
                b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, ob);
                b.uniformMatrix4fv(k, !1, Lb.projectionMatrix.elements);
                c.activeTexture(b.TEXTURE0);
                b.uniform1i(n, 0);
                Da = T = 0;
                (D = p.fog) ? (b.uniform3f(C, D.color.r, D.color.g, D.color.b), D.isFog ? (b.uniform1f(y, D.near), b.uniform1f(v, D.far), b.uniform1i(u, 1), Da =
                    T = 1) : D.isFogExp2 && (b.uniform1f(x, D.density), b.uniform1i(u, 2), Da = T = 2)) : (b.uniform1i(u, 0), Da = T = 0);
                D = 0;
                for (var J = q.length; D < J; D++) {
                    var Ea = q[D];
                    Ea.modelViewMatrix.multiplyMatrices(Lb.matrixWorldInverse, Ea.matrixWorld);
                    Ea.z = -Ea.modelViewMatrix.elements[14]
                }
                q.sort(G);
                var M = [],
                    K = [];
                D = 0;
                for (J = q.length; D < J; D++) {
                    Ea = q[D];
                    var U = Ea.material;
                    if (!1 !== U.visible) {
                        Ea.onBeforeRender(a, p, Lb, void 0, U, void 0);
                        b.uniform1f(F, U.alphaTest);
                        b.uniformMatrix4fv(r, !1, Ea.modelViewMatrix.elements);
                        Ea.matrixWorld.decompose(B, I, L);
                        M[0] = L.x;
                        M[1] = L.y;
                        K[0] = Ea.center.x - .5;
                        K[1] = Ea.center.y - .5;
                        var P = 0;
                        p.fog && U.fog && (P = Da);
                        T !== P && (b.uniform1i(u, P), T = P);
                        null !== U.map ? (b.uniform2f(f, U.map.offset.x, U.map.offset.y), b.uniform2f(g, U.map.repeat.x, U.map.repeat.y)) : (b.uniform2f(f, 0, 0), b.uniform2f(g, 1, 1));
                        b.uniform1f(t, U.opacity);
                        b.uniform3f(w, U.color.r, U.color.g, U.color.b);
                        b.uniform1f(h, U.rotation);
                        b.uniform2fv(l, K);
                        b.uniform2fv(m, M);
                        c.setBlending(U.blending, U.blendEquation, U.blendSrc, U.blendDst, U.blendEquationAlpha, U.blendSrcAlpha, U.blendDstAlpha,
                            U.premultipliedAlpha);
                        c.buffers.depth.setTest(U.depthTest);
                        c.buffers.depth.setMask(U.depthWrite);
                        c.buffers.color.setMask(U.colorWrite);
                        d.setTexture2D(U.map || z, 0);
                        b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                        Ea.onAfterRender(a, p, Lb, void 0, U, void 0)
                    }
                }
                c.enable(b.CULL_FACE);
                c.reset()
            }
        }
    }

    function Eg(a, b, c) {
        function d(b, c, d) {
            var e = new Uint8Array(4),
                f = a.createTexture();
            a.bindTexture(b, f);
            a.texParameteri(b, a.TEXTURE_MIN_FILTER, a.NEAREST);
            a.texParameteri(b, a.TEXTURE_MAG_FILTER, a.NEAREST);
            for (b = 0; b < d; b++) a.texImage2D(c +
                b, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, e);
            return f
        }

        function e(b) {
            !0 !== v[b] && (a.enable(b), v[b] = !0)
        }

        function f(b) {
            !1 !== v[b] && (a.disable(b), v[b] = !1)
        }

        function g(b, d, g, h, l, m, n, w) {
            0 !== b ? e(a.BLEND) : f(a.BLEND);
            if (5 !== b) {
                if (b !== N || w !== z) switch (b) {
                    case 2:
                        w ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ONE, a.ONE, a.ONE, a.ONE)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.SRC_ALPHA, a.ONE));
                        break;
                    case 3:
                        w ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ZERO, a.ZERO, a.ONE_MINUS_SRC_COLOR,
                            a.ONE_MINUS_SRC_ALPHA)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.ZERO, a.ONE_MINUS_SRC_COLOR));
                        break;
                    case 4:
                        w ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ZERO, a.SRC_COLOR, a.ZERO, a.SRC_ALPHA)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.ZERO, a.SRC_COLOR));
                        break;
                    default:
                        w ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ONE, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA)) : (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.SRC_ALPHA,
                            a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA))
                }
                T = ha = ob = A = G = O = null
            } else {
                l = l || d;
                m = m || g;
                n = n || h;
                if (d !== O || l !== ob) a.blendEquationSeparate(c.convert(d), c.convert(l)), O = d, ob = l;
                if (g !== G || h !== A || m !== ha || n !== T) a.blendFuncSeparate(c.convert(g), c.convert(h), c.convert(m), c.convert(n)), G = g, A = h, ha = m, T = n
            }
            N = b;
            z = w
        }

        function h(b) {
            B !== b && (b ? a.frontFace(a.CW) : a.frontFace(a.CCW), B = b)
        }

        function l(b) {
            0 !== b ? (e(a.CULL_FACE), b !== D && (1 === b ? a.cullFace(a.BACK) : 2 === b ? a.cullFace(a.FRONT) : a.cullFace(a.FRONT_AND_BACK))) : f(a.CULL_FACE);
            D = b
        }

        function m(b, c, d) {
            if (b) {
                if (e(a.POLYGON_OFFSET_FILL), L !== c || J !== d) a.polygonOffset(c, d), L = c, J = d
            } else f(a.POLYGON_OFFSET_FILL)
        }

        function w(b) {
            void 0 === b && (b = a.TEXTURE0 + M - 1);
            Q !== b && (a.activeTexture(b), Q = b)
        }
        var n = new function () {
                var b = !1,
                    c = new da,
                    d = null,
                    e = new da(0, 0, 0, 0);
                return {
                    setMask: function (c) {
                        d === c || b || (a.colorMask(c, c, c, c), d = c)
                    },
                    setLocked: function (a) {
                        b = a
                    },
                    setClear: function (b, d, f, g, h) {
                        !0 === h && (b *= g, d *= g, f *= g);
                        c.set(b, d, f, g);
                        !1 === e.equals(c) && (a.clearColor(b, d, f, g), e.copy(c))
                    },
                    reset: function () {
                        b = !1;
                        d = null;
                        e.set(-1, 0, 0, 0)
                    }
                }
            },
            t = new function () {
                var b = !1,
                    c = null,
                    d = null,
                    g = null;
                return {
                    setTest: function (b) {
                        b ? e(a.DEPTH_TEST) : f(a.DEPTH_TEST)
                    },
                    setMask: function (d) {
                        c === d || b || (a.depthMask(d), c = d)
                    },
                    setFunc: function (b) {
                        if (d !== b) {
                            if (b) switch (b) {
                                case 0:
                                    a.depthFunc(a.NEVER);
                                    break;
                                case 1:
                                    a.depthFunc(a.ALWAYS);
                                    break;
                                case 2:
                                    a.depthFunc(a.LESS);
                                    break;
                                case 3:
                                    a.depthFunc(a.LEQUAL);
                                    break;
                                case 4:
                                    a.depthFunc(a.EQUAL);
                                    break;
                                case 5:
                                    a.depthFunc(a.GEQUAL);
                                    break;
                                case 6:
                                    a.depthFunc(a.GREATER);
                                    break;
                                case 7:
                                    a.depthFunc(a.NOTEQUAL);
                                    break;
                                default:
                                    a.depthFunc(a.LEQUAL)
                            } else a.depthFunc(a.LEQUAL);
                            d = b
                        }
                    },
                    setLocked: function (a) {
                        b = a
                    },
                    setClear: function (b) {
                        g !== b && (a.clearDepth(b), g = b)
                    },
                    reset: function () {
                        b = !1;
                        g = d = c = null
                    }
                }
            },
            r = new function () {
                var b = !1,
                    c = null,
                    d = null,
                    g = null,
                    h = null,
                    l = null,
                    m = null,
                    n = null,
                    w = null;
                return {
                    setTest: function (b) {
                        b ? e(a.STENCIL_TEST) : f(a.STENCIL_TEST)
                    },
                    setMask: function (d) {
                        c === d || b || (a.stencilMask(d), c = d)
                    },
                    setFunc: function (b, c, e) {
                        if (d !== b || g !== c || h !== e) a.stencilFunc(b, c, e), d = b, g = c, h = e
                    },
                    setOp: function (b, c, d) {
                        if (l !== b || m !==
                            c || n !== d) a.stencilOp(b, c, d), l = b, m = c, n = d
                    },
                    setLocked: function (a) {
                        b = a
                    },
                    setClear: function (b) {
                        w !== b && (a.clearStencil(b), w = b)
                    },
                    reset: function () {
                        b = !1;
                        w = n = m = l = h = g = d = c = null
                    }
                }
            },
            k = a.getParameter(a.MAX_VERTEX_ATTRIBS),
            u = new Uint8Array(k),
            p = new Uint8Array(k),
            y = new Uint8Array(k),
            v = {},
            C = null,
            F = null,
            N = null,
            O = null,
            G = null,
            A = null,
            ob = null,
            ha = null,
            T = null,
            z = !1,
            B = null,
            D = null,
            I = null,
            L = null,
            J = null,
            M = a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
            K = !1;
        k = 0;
        k = a.getParameter(a.VERSION); - 1 !== k.indexOf("WebGL") ? (k = parseFloat(/^WebGL ([0-9])/.exec(k)[1]),
            K = 1 <= k) : -1 !== k.indexOf("OpenGL ES") && (k = parseFloat(/^OpenGL ES ([0-9])/.exec(k)[1]), K = 2 <= k);
        var Q = null,
            H = {},
            R = new da,
            W = new da,
            ba = {};
        ba[a.TEXTURE_2D] = d(a.TEXTURE_2D, a.TEXTURE_2D, 1);
        ba[a.TEXTURE_CUBE_MAP] = d(a.TEXTURE_CUBE_MAP, a.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
        n.setClear(0, 0, 0, 1);
        t.setClear(1);
        r.setClear(0);
        e(a.DEPTH_TEST);
        t.setFunc(3);
        h(!1);
        l(1);
        e(a.CULL_FACE);
        e(a.BLEND);
        g(1);
        return {
            buffers: {
                color: n,
                depth: t,
                stencil: r
            },
            initAttributes: function () {
                for (var a = 0, b = u.length; a < b; a++) u[a] = 0
            },
            enableAttribute: function (c) {
                u[c] =
                    1;
                0 === p[c] && (a.enableVertexAttribArray(c), p[c] = 1);
                0 !== y[c] && (b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c, 0), y[c] = 0)
            },
            enableAttributeAndDivisor: function (c, d) {
                u[c] = 1;
                0 === p[c] && (a.enableVertexAttribArray(c), p[c] = 1);
                y[c] !== d && (b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c, d), y[c] = d)
            },
            disableUnusedAttributes: function () {
                for (var b = 0, c = p.length; b !== c; ++b) p[b] !== u[b] && (a.disableVertexAttribArray(b), p[b] = 0)
            },
            enable: e,
            disable: f,
            getCompressedTextureFormats: function () {
                if (null === C &&
                    (C = [], b.get("WEBGL_compressed_texture_pvrtc") || b.get("WEBGL_compressed_texture_s3tc") || b.get("WEBGL_compressed_texture_etc1") || b.get("WEBGL_compressed_texture_astc")))
                    for (var c = a.getParameter(a.COMPRESSED_TEXTURE_FORMATS), d = 0; d < c.length; d++) C.push(c[d]);
                return C
            },
            useProgram: function (b) {
                return F !== b ? (a.useProgram(b), F = b, !0) : !1
            },
            setBlending: g,
            setMaterial: function (b, c) {
                2 === b.side ? f(a.CULL_FACE) : e(a.CULL_FACE);
                var d = 1 === b.side;
                c && (d = !d);
                h(d);
                !0 === b.transparent ? g(b.blending, b.blendEquation, b.blendSrc,
                    b.blendDst, b.blendEquationAlpha, b.blendSrcAlpha, b.blendDstAlpha, b.premultipliedAlpha) : g(0);
                t.setFunc(b.depthFunc);
                t.setTest(b.depthTest);
                t.setMask(b.depthWrite);
                n.setMask(b.colorWrite);
                m(b.polygonOffset, b.polygonOffsetFactor, b.polygonOffsetUnits)
            },
            setFlipSided: h,
            setCullFace: l,
            setLineWidth: function (b) {
                b !== I && (K && a.lineWidth(b), I = b)
            },
            setPolygonOffset: m,
            setScissorTest: function (b) {
                b ? e(a.SCISSOR_TEST) : f(a.SCISSOR_TEST)
            },
            activeTexture: w,
            bindTexture: function (b, c) {
                null === Q && w();
                var d = H[Q];
                void 0 === d && (d = {
                    type: void 0,
                    texture: void 0
                }, H[Q] = d);
                if (d.type !== b || d.texture !== c) a.bindTexture(b, c || ba[b]), d.type = b, d.texture = c
            },
            compressedTexImage2D: function () {
                try {
                    a.compressedTexImage2D.apply(a, arguments)
                } catch (U) {
                    console.error("THREE.WebGLState:", U)
                }
            },
            texImage2D: function () {
                try {
                    a.texImage2D.apply(a, arguments)
                } catch (U) {
                    console.error("THREE.WebGLState:", U)
                }
            },
            scissor: function (b) {
                !1 === R.equals(b) && (a.scissor(b.x, b.y, b.z, b.w), R.copy(b))
            },
            viewport: function (b) {
                !1 === W.equals(b) && (a.viewport(b.x, b.y, b.z, b.w), W.copy(b))
            },
            reset: function () {
                for (var b = 0; b < p.length; b++) 1 === p[b] && (a.disableVertexAttribArray(b), p[b] = 0);
                v = {};
                Q = C = null;
                H = {};
                D = B = N = F = null;
                n.reset();
                t.reset();
                r.reset()
            }
        }
    }

    function Fg(a, b, c, d, e, f, g) {
        function h(a, b) {
            if (a.width > b || a.height > b) {
                if ("data" in a) {
                    console.warn("THREE.WebGLRenderer: image in DataTexture is too big (" + a.width + "x" + a.height + ").");
                    return
                }
                b /= Math.max(a.width, a.height);
                var c = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                c.width = Math.floor(a.width * b);
                c.height = Math.floor(a.height *
                    b);
                c.getContext("2d").drawImage(a, 0, 0, a.width, a.height, 0, 0, c.width, c.height);
                console.warn("THREE.WebGLRenderer: image is too big (" + a.width + "x" + a.height + "). Resized to " + c.width + "x" + c.height, a);
                return c
            }
            return a
        }

        function l(a) {
            return R.isPowerOfTwo(a.width) && R.isPowerOfTwo(a.height)
        }

        function m(a, b) {
            return a.generateMipmaps && b && 1003 !== a.minFilter && 1006 !== a.minFilter
        }

        function w(b, c, e, f) {
            a.generateMipmap(b);
            d.get(c).__maxMipLevel = Math.log(Math.max(e, f)) * Math.LOG2E
        }

        function n(b) {
            return 1003 === b || 1004 ===
                b || 1005 === b ? a.NEAREST : a.LINEAR
        }

        function t(b) {
            b = b.target;
            b.removeEventListener("dispose", t);
            a: {
                var c = d.get(b);
                if (b.image && c.__image__webglTextureCube) a.deleteTexture(c.__image__webglTextureCube);
                else {
                    if (void 0 === c.__webglInit) break a;
                    a.deleteTexture(c.__webglTexture)
                }
                d.remove(b)
            }
            b.isVideoTexture && delete C[b.id];
            g.memory.textures--
        }

        function k(b) {
            b = b.target;
            b.removeEventListener("dispose", k);
            var c = d.get(b),
                e = d.get(b.texture);
            if (b) {
                void 0 !== e.__webglTexture && a.deleteTexture(e.__webglTexture);
                b.depthTexture &&
                    b.depthTexture.dispose();
                if (b.isWebGLRenderTargetCube)
                    for (e = 0; 6 > e; e++) a.deleteFramebuffer(c.__webglFramebuffer[e]), c.__webglDepthbuffer && a.deleteRenderbuffer(c.__webglDepthbuffer[e]);
                else a.deleteFramebuffer(c.__webglFramebuffer), c.__webglDepthbuffer && a.deleteRenderbuffer(c.__webglDepthbuffer);
                d.remove(b.texture);
                d.remove(b)
            }
            g.memory.textures--
        }

        function q(b, n) {
            var k = d.get(b);
            if (b.isVideoTexture) {
                var r = b.id,
                    q = g.render.frame;
                C[r] !== q && (C[r] = q, b.update())
            }
            if (0 < b.version && k.__version !== b.version)
                if (r =
                    b.image, void 0 === r) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", b);
                else if (!1 === r.complete) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", b);
            else {
                void 0 === k.__webglInit && (k.__webglInit = !0, b.addEventListener("dispose", t), k.__webglTexture = a.createTexture(), g.memory.textures++);
                c.activeTexture(a.TEXTURE0 + n);
                c.bindTexture(a.TEXTURE_2D, k.__webglTexture);
                a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, b.flipY);
                a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                    b.premultiplyAlpha);
                a.pixelStorei(a.UNPACK_ALIGNMENT, b.unpackAlignment);
                n = h(b.image, e.maxTextureSize);
                (1001 !== b.wrapS || 1001 !== b.wrapT || 1003 !== b.minFilter && 1006 !== b.minFilter) && !1 === l(n) && (n instanceof HTMLImageElement || n instanceof HTMLCanvasElement || n instanceof ImageBitmap) && (void 0 === F && (F = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), F.width = R.floorPowerOfTwo(n.width), F.height = R.floorPowerOfTwo(n.height), F.getContext("2d").drawImage(n, 0, 0, F.width, F.height), console.warn("THREE.WebGLRenderer: image is not power of two (" +
                    n.width + "x" + n.height + "). Resized to " + F.width + "x" + F.height, n), n = F);
                r = l(n);
                q = f.convert(b.format);
                var p = f.convert(b.type);
                u(a.TEXTURE_2D, b, r);
                var x = b.mipmaps;
                if (b.isDepthTexture) {
                    var N = a.DEPTH_COMPONENT;
                    if (1015 === b.type) {
                        if (!v) throw Error("Float Depth Texture only supported in WebGL2.0");
                        N = a.DEPTH_COMPONENT32F
                    } else v && (N = a.DEPTH_COMPONENT16);
                    1026 === b.format && N === a.DEPTH_COMPONENT && 1012 !== b.type && 1014 !== b.type && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
                        b.type = 1012, p = f.convert(b.type));
                    1027 === b.format && (N = a.DEPTH_STENCIL, 1020 !== b.type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), b.type = 1020, p = f.convert(b.type)));
                    c.texImage2D(a.TEXTURE_2D, 0, N, n.width, n.height, 0, q, p, null)
                } else if (b.isDataTexture)
                    if (0 < x.length && r) {
                        for (var O = 0, y = x.length; O < y; O++) N = x[O], c.texImage2D(a.TEXTURE_2D, O, q, N.width, N.height, 0, q, p, N.data);
                        b.generateMipmaps = !1;
                        k.__maxMipLevel = x.length - 1
                    } else c.texImage2D(a.TEXTURE_2D, 0, q, n.width,
                        n.height, 0, q, p, n.data), k.__maxMipLevel = 0;
                else if (b.isCompressedTexture) {
                    O = 0;
                    for (y = x.length; O < y; O++) N = x[O], 1023 !== b.format && 1022 !== b.format ? -1 < c.getCompressedTextureFormats().indexOf(q) ? c.compressedTexImage2D(a.TEXTURE_2D, O, q, N.width, N.height, 0, N.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : c.texImage2D(a.TEXTURE_2D, O, q, N.width, N.height, 0, q, p, N.data);
                    k.__maxMipLevel = x.length - 1
                } else if (0 < x.length && r) {
                    O = 0;
                    for (y = x.length; O < y; O++) N =
                        x[O], c.texImage2D(a.TEXTURE_2D, O, q, q, p, N);
                    b.generateMipmaps = !1;
                    k.__maxMipLevel = x.length - 1
                } else c.texImage2D(a.TEXTURE_2D, 0, q, q, p, n), k.__maxMipLevel = 0;
                m(b, r) && w(a.TEXTURE_2D, b, n.width, n.height);
                k.__version = b.version;
                if (b.onUpdate) b.onUpdate(b);
                return
            }
            c.activeTexture(a.TEXTURE0 + n);
            c.bindTexture(a.TEXTURE_2D, k.__webglTexture)
        }

        function u(c, g, h) {
            h ? (a.texParameteri(c, a.TEXTURE_WRAP_S, f.convert(g.wrapS)), a.texParameteri(c, a.TEXTURE_WRAP_T, f.convert(g.wrapT)), a.texParameteri(c, a.TEXTURE_MAG_FILTER, f.convert(g.magFilter)),
                a.texParameteri(c, a.TEXTURE_MIN_FILTER, f.convert(g.minFilter))) : (a.texParameteri(c, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(c, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), 1001 === g.wrapS && 1001 === g.wrapT || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", g), a.texParameteri(c, a.TEXTURE_MAG_FILTER, n(g.magFilter)), a.texParameteri(c, a.TEXTURE_MIN_FILTER, n(g.minFilter)), 1003 !== g.minFilter && 1006 !== g.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",
                g));
            !(h = b.get("EXT_texture_filter_anisotropic")) || 1015 === g.type && null === b.get("OES_texture_float_linear") || 1016 === g.type && null === b.get("OES_texture_half_float_linear") || !(1 < g.anisotropy || d.get(g).__currentAnisotropy) || (a.texParameterf(c, h.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, e.getMaxAnisotropy())), d.get(g).__currentAnisotropy = g.anisotropy)
        }

        function p(b, e, g, h) {
            var l = f.convert(e.texture.format),
                m = f.convert(e.texture.type);
            c.texImage2D(h, 0, l, e.width, e.height, 0, l, m, null);
            a.bindFramebuffer(a.FRAMEBUFFER,
                b);
            a.framebufferTexture2D(a.FRAMEBUFFER, g, h, d.get(e.texture).__webglTexture, 0);
            a.bindFramebuffer(a.FRAMEBUFFER, null)
        }

        function y(b, c) {
            a.bindRenderbuffer(a.RENDERBUFFER, b);
            c.depthBuffer && !c.stencilBuffer ? (a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, c.width, c.height), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, b)) : c.depthBuffer && c.stencilBuffer ? (a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, c.width, c.height), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT,
                a.RENDERBUFFER, b)) : a.renderbufferStorage(a.RENDERBUFFER, a.RGBA4, c.width, c.height);
            a.bindRenderbuffer(a.RENDERBUFFER, null)
        }
        var v = "undefined" !== typeof WebGL2RenderingContext && a instanceof WebGL2RenderingContext,
            C = {},
            F;
        this.setTexture2D = q;
        this.setTextureCube = function (b, n) {
            var k = d.get(b);
            if (6 === b.image.length)
                if (0 < b.version && k.__version !== b.version) {
                    k.__image__webglTextureCube || (b.addEventListener("dispose", t), k.__image__webglTextureCube = a.createTexture(), g.memory.textures++);
                    c.activeTexture(a.TEXTURE0 +
                        n);
                    c.bindTexture(a.TEXTURE_CUBE_MAP, k.__image__webglTextureCube);
                    a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, b.flipY);
                    n = b && b.isCompressedTexture;
                    for (var r = b.image[0] && b.image[0].isDataTexture, q = [], p = 0; 6 > p; p++) q[p] = n || r ? r ? b.image[p].image : b.image[p] : h(b.image[p], e.maxCubemapSize);
                    var x = q[0],
                        v = l(x),
                        N = f.convert(b.format),
                        y = f.convert(b.type);
                    u(a.TEXTURE_CUBE_MAP, b, v);
                    for (p = 0; 6 > p; p++)
                        if (n)
                            for (var C, F = q[p].mipmaps, O = 0, A = F.length; O < A; O++) C = F[O], 1023 !== b.format && 1022 !== b.format ? -1 < c.getCompressedTextureFormats().indexOf(N) ?
                                c.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, O, N, C.width, C.height, 0, C.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, O, N, C.width, C.height, 0, N, y, C.data);
                        else r ? c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, 0, N, q[p].width, q[p].height, 0, N, y, q[p].data) : c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, 0, N, N, y, q[p]);
                    k.__maxMipLevel = n ? F.length - 1 : 0;
                    m(b, v) && w(a.TEXTURE_CUBE_MAP, b, x.width,
                        x.height);
                    k.__version = b.version;
                    if (b.onUpdate) b.onUpdate(b)
                } else c.activeTexture(a.TEXTURE0 + n), c.bindTexture(a.TEXTURE_CUBE_MAP, k.__image__webglTextureCube)
        };
        this.setTextureCubeDynamic = function (b, e) {
            c.activeTexture(a.TEXTURE0 + e);
            c.bindTexture(a.TEXTURE_CUBE_MAP, d.get(b).__webglTexture)
        };
        this.setupRenderTarget = function (b) {
            var e = d.get(b),
                f = d.get(b.texture);
            b.addEventListener("dispose", k);
            f.__webglTexture = a.createTexture();
            g.memory.textures++;
            var h = !0 === b.isWebGLRenderTargetCube,
                n = l(b);
            if (h) {
                e.__webglFramebuffer = [];
                for (var t = 0; 6 > t; t++) e.__webglFramebuffer[t] = a.createFramebuffer()
            } else e.__webglFramebuffer = a.createFramebuffer();
            if (h) {
                c.bindTexture(a.TEXTURE_CUBE_MAP, f.__webglTexture);
                u(a.TEXTURE_CUBE_MAP, b.texture, n);
                for (t = 0; 6 > t; t++) p(e.__webglFramebuffer[t], b, a.COLOR_ATTACHMENT0, a.TEXTURE_CUBE_MAP_POSITIVE_X + t);
                m(b.texture, n) && w(a.TEXTURE_CUBE_MAP, b.texture, b.width, b.height);
                c.bindTexture(a.TEXTURE_CUBE_MAP, null)
            } else c.bindTexture(a.TEXTURE_2D, f.__webglTexture), u(a.TEXTURE_2D, b.texture, n), p(e.__webglFramebuffer,
                b, a.COLOR_ATTACHMENT0, a.TEXTURE_2D), m(b.texture, n) && w(a.TEXTURE_2D, b.texture, b.width, b.height), c.bindTexture(a.TEXTURE_2D, null);
            if (b.depthBuffer) {
                e = d.get(b);
                f = !0 === b.isWebGLRenderTargetCube;
                if (b.depthTexture) {
                    if (f) throw Error("target.depthTexture not supported in Cube render targets");
                    if (b && b.isWebGLRenderTargetCube) throw Error("Depth Texture with cube render targets is not supported");
                    a.bindFramebuffer(a.FRAMEBUFFER, e.__webglFramebuffer);
                    if (!b.depthTexture || !b.depthTexture.isDepthTexture) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    d.get(b.depthTexture).__webglTexture && b.depthTexture.image.width === b.width && b.depthTexture.image.height === b.height || (b.depthTexture.image.width = b.width, b.depthTexture.image.height = b.height, b.depthTexture.needsUpdate = !0);
                    q(b.depthTexture, 0);
                    e = d.get(b.depthTexture).__webglTexture;
                    if (1026 === b.depthTexture.format) a.framebufferTexture2D(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.TEXTURE_2D, e, 0);
                    else if (1027 === b.depthTexture.format) a.framebufferTexture2D(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.TEXTURE_2D, e,
                        0);
                    else throw Error("Unknown depthTexture format");
                } else if (f)
                    for (e.__webglDepthbuffer = [], f = 0; 6 > f; f++) a.bindFramebuffer(a.FRAMEBUFFER, e.__webglFramebuffer[f]), e.__webglDepthbuffer[f] = a.createRenderbuffer(), y(e.__webglDepthbuffer[f], b);
                else a.bindFramebuffer(a.FRAMEBUFFER, e.__webglFramebuffer), e.__webglDepthbuffer = a.createRenderbuffer(), y(e.__webglDepthbuffer, b);
                a.bindFramebuffer(a.FRAMEBUFFER, null)
            }
        };
        this.updateRenderTargetMipmap = function (b) {
            var e = b.texture,
                f = l(b);
            if (m(e, f)) {
                f = b.isWebGLRenderTargetCube ?
                    a.TEXTURE_CUBE_MAP : a.TEXTURE_2D;
                var g = d.get(e).__webglTexture;
                c.bindTexture(f, g);
                w(f, e, b.width, b.height);
                c.bindTexture(f, null)
            }
        }
    }

    function Ve(a, b) {
        return {
            convert: function (c) {
                if (1E3 === c) return a.REPEAT;
                if (1001 === c) return a.CLAMP_TO_EDGE;
                if (1002 === c) return a.MIRRORED_REPEAT;
                if (1003 === c) return a.NEAREST;
                if (1004 === c) return a.NEAREST_MIPMAP_NEAREST;
                if (1005 === c) return a.NEAREST_MIPMAP_LINEAR;
                if (1006 === c) return a.LINEAR;
                if (1007 === c) return a.LINEAR_MIPMAP_NEAREST;
                if (1008 === c) return a.LINEAR_MIPMAP_LINEAR;
                if (1009 === c) return a.UNSIGNED_BYTE;
                if (1017 === c) return a.UNSIGNED_SHORT_4_4_4_4;
                if (1018 === c) return a.UNSIGNED_SHORT_5_5_5_1;
                if (1019 === c) return a.UNSIGNED_SHORT_5_6_5;
                if (1010 === c) return a.BYTE;
                if (1011 === c) return a.SHORT;
                if (1012 === c) return a.UNSIGNED_SHORT;
                if (1013 === c) return a.INT;
                if (1014 === c) return a.UNSIGNED_INT;
                if (1015 === c) return a.FLOAT;
                if (1016 === c) {
                    var d = b.get("OES_texture_half_float");
                    if (null !== d) return d.HALF_FLOAT_OES
                }
                if (1021 === c) return a.ALPHA;
                if (1022 === c) return a.RGB;
                if (1023 === c) return a.RGBA;
                if (1024 === c) return a.LUMINANCE;
                if (1025 === c) return a.LUMINANCE_ALPHA;
                if (1026 === c) return a.DEPTH_COMPONENT;
                if (1027 === c) return a.DEPTH_STENCIL;
                if (100 === c) return a.FUNC_ADD;
                if (101 === c) return a.FUNC_SUBTRACT;
                if (102 === c) return a.FUNC_REVERSE_SUBTRACT;
                if (200 === c) return a.ZERO;
                if (201 === c) return a.ONE;
                if (202 === c) return a.SRC_COLOR;
                if (203 === c) return a.ONE_MINUS_SRC_COLOR;
                if (204 === c) return a.SRC_ALPHA;
                if (205 === c) return a.ONE_MINUS_SRC_ALPHA;
                if (206 === c) return a.DST_ALPHA;
                if (207 === c) return a.ONE_MINUS_DST_ALPHA;
                if (208 === c) return a.DST_COLOR;
                if (209 === c) return a.ONE_MINUS_DST_COLOR;
                if (210 === c) return a.SRC_ALPHA_SATURATE;
                if (33776 === c || 33777 === c || 33778 === c || 33779 === c)
                    if (d = b.get("WEBGL_compressed_texture_s3tc"), null !== d) {
                        if (33776 === c) return d.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (33777 === c) return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (33778 === c) return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (33779 === c) return d.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    } if (35840 === c || 35841 === c || 35842 === c || 35843 === c)
                    if (d = b.get("WEBGL_compressed_texture_pvrtc"),
                        null !== d) {
                        if (35840 === c) return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                        if (35841 === c) return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                        if (35842 === c) return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                        if (35843 === c) return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                    } if (36196 === c && (d = b.get("WEBGL_compressed_texture_etc1"), null !== d)) return d.COMPRESSED_RGB_ETC1_WEBGL;
                if (37808 === c || 37809 === c || 37810 === c || 37811 === c || 37812 === c || 37813 === c || 37814 === c || 37815 === c || 37816 === c || 37817 === c || 37818 === c || 37819 === c || 37820 === c || 37821 === c)
                    if (d = b.get("WEBGL_compressed_texture_astc"),
                        null !== d) return c;
                if (103 === c || 104 === c)
                    if (d = b.get("EXT_blend_minmax"), null !== d) {
                        if (103 === c) return d.MIN_EXT;
                        if (104 === c) return d.MAX_EXT
                    } return 1020 === c && (d = b.get("WEBGL_depth_texture"), null !== d) ? d.UNSIGNED_INT_24_8_WEBGL : 0
            }
        }
    }

    function Y(a, b, c, d) {
        Qa.call(this);
        this.type = "PerspectiveCamera";
        this.fov = void 0 !== a ? a : 50;
        this.zoom = 1;
        this.near = void 0 !== c ? c : .1;
        this.far = void 0 !== d ? d : 2E3;
        this.focus = 10;
        this.aspect = void 0 !== b ? b : 1;
        this.view = null;
        this.filmGauge = 35;
        this.filmOffset = 0;
        this.updateProjectionMatrix()
    }

    function qd(a) {
        Y.call(this);
        this.cameras = a || []
    }

    function We(a) {
        function b() {
            if (null !== d && d.isPresenting) {
                var b = d.getEyeParameters("left"),
                    e = b.renderWidth;
                b = b.renderHeight;
                u = a.getPixelRatio();
                q = a.getSize();
                a.setDrawingBufferSize(2 * e, b, 1)
            } else c.enabled && a.setDrawingBufferSize(q.width, q.height, u)
        }
        var c = this,
            d = null,
            e = null,
            f = null,
            g = new K,
            h = new K;
        "undefined" !== typeof window && "VRFrameData" in window && (e = new window.VRFrameData);
        var l = new K,
            m = new ia,
            w = new p,
            n = new Y;
        n.bounds = new da(0, 0, .5, 1);
        n.layers.enable(1);
        var t = new Y;
        t.bounds = new da(.5,
            0, .5, 1);
        t.layers.enable(2);
        var k = new qd([n, t]);
        k.layers.enable(1);
        k.layers.enable(2);
        var q, u;
        "undefined" !== typeof window && window.addEventListener("vrdisplaypresentchange", b, !1);
        this.enabled = !1;
        this.userHeight = 1.6;
        this.getDevice = function () {
            return d
        };
        this.setDevice = function (a) {
            void 0 !== a && (d = a)
        };
        this.setPoseTarget = function (a) {
            void 0 !== a && (f = a)
        };
        this.getCamera = function (a) {
            if (null === d) return a;
            d.depthNear = a.near;
            d.depthFar = a.far;
            d.getFrameData(e);
            var b = d.stageParameters;
            b ? g.fromArray(b.sittingToStandingTransform) :
                g.makeTranslation(0, c.userHeight, 0);
            b = e.pose;
            var r = null !== f ? f : a;
            r.matrix.copy(g);
            r.matrix.decompose(r.position, r.quaternion, r.scale);
            null !== b.orientation && (m.fromArray(b.orientation), r.quaternion.multiply(m));
            null !== b.position && (m.setFromRotationMatrix(g), w.fromArray(b.position), w.applyQuaternion(m), r.position.add(w));
            r.updateMatrixWorld();
            if (!1 === d.isPresenting) return a;
            n.near = a.near;
            t.near = a.near;
            n.far = a.far;
            t.far = a.far;
            k.matrixWorld.copy(a.matrixWorld);
            k.matrixWorldInverse.copy(a.matrixWorldInverse);
            n.matrixWorldInverse.fromArray(e.leftViewMatrix);
            t.matrixWorldInverse.fromArray(e.rightViewMatrix);
            h.getInverse(g);
            n.matrixWorldInverse.multiply(h);
            t.matrixWorldInverse.multiply(h);
            a = r.parent;
            null !== a && (l.getInverse(a.matrixWorld), n.matrixWorldInverse.multiply(l), t.matrixWorldInverse.multiply(l));
            n.matrixWorld.getInverse(n.matrixWorldInverse);
            t.matrixWorld.getInverse(t.matrixWorldInverse);
            n.projectionMatrix.fromArray(e.leftProjectionMatrix);
            t.projectionMatrix.fromArray(e.rightProjectionMatrix);
            k.projectionMatrix.copy(n.projectionMatrix);
            a = d.getLayers();
            a.length && (a = a[0], null !== a.leftBounds && 4 === a.leftBounds.length && n.bounds.fromArray(a.leftBounds), null !== a.rightBounds && 4 === a.rightBounds.length && t.bounds.fromArray(a.rightBounds));
            return k
        };
        this.getStandingMatrix = function () {
            return g
        };
        this.submitFrame = function () {
            d && d.isPresenting && d.submitFrame()
        };
        this.dispose = function () {
            "undefined" !== typeof window && window.removeEventListener("vrdisplaypresentchange", b)
        }
    }

    function Xd(a) {
        function b() {
            la = new Hf(E);
            la.get("WEBGL_depth_texture");
            la.get("OES_texture_float");
            la.get("OES_texture_float_linear");
            la.get("OES_texture_half_float");
            la.get("OES_texture_half_float_linear");
            la.get("OES_standard_derivatives");
            la.get("OES_element_index_uint");
            la.get("ANGLE_instanced_arrays");
            ja = new Ve(E, la);
            Ra = new Ff(E, la, a);
            aa = new Eg(E, la, ja);
            aa.scissor(S.copy(Z).multiplyScalar(U));
            aa.viewport(W.copy(P).multiplyScalar(U));
            fb = new Kf(E);
            Ba = new tg;
            ca = new Fg(E, la, aa, Ba, Ra, ja, fb);
            qa = new yf(E);
            ra = new If(E, qa, fb);
            sa = new Nf(ra, fb);
            va = new Mf(E);
            oa = new sg(T, la, Ra);
            ta = new xg;
            pa = new Cg;
            ma =
                new Df(T, aa, ra, O);
            wa = new Ef(E, la, fb);
            xa = new Jf(E, la, fb);
            ya = new Dg(T, E, aa, ca, Ra);
            fb.programs = oa.programs;
            T.context = E;
            T.capabilities = Ra;
            T.extensions = la;
            T.properties = Ba;
            T.renderLists = ta;
            T.state = aa;
            T.info = fb
        }

        function c(a) {
            a.preventDefault();
            console.log("THREE.WebGLRenderer: Context Lost.");
            I = !0
        }

        function d() {
            console.log("THREE.WebGLRenderer: Context Restored.");
            I = !1;
            b()
        }

        function e(a) {
            a = a.target;
            a.removeEventListener("dispose", e);
            f(a);
            Ba.remove(a)
        }

        function f(a) {
            var b = Ba.get(a).program;
            a.program = void 0;
            void 0 !== b && oa.releaseProgram(b)
        }

        function g(a, b, c) {
            a.render(function (a) {
                T.renderBufferImmediate(a, b, c)
            })
        }

        function h() {
            var a = na.getDevice();
            a && a.isPresenting ? a.requestAnimationFrame(l) : window.requestAnimationFrame(l)
        }

        function l(a) {
            !1 !== ua && (za(a), h())
        }

        function m(a, b, c) {
            if (!1 !== a.visible) {
                if (a.layers.test(b.layers))
                    if (a.isLight) B.pushLight(a), a.castShadow && B.pushShadow(a);
                    else if (a.isSprite) a.frustumCulled && !ia.intersectsSprite(a) || B.pushSprite(a);
                else if (a.isImmediateRenderObject) c && Pb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(pd),
                    z.push(a, null, a.material, Pb.z, null);
                else if (a.isMesh || a.isLine || a.isPoints)
                    if (a.isSkinnedMesh && a.skeleton.update(), !a.frustumCulled || ia.intersectsObject(a)) {
                        c && Pb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(pd);
                        var d = sa.update(a),
                            e = a.material;
                        if (Array.isArray(e))
                            for (var f = d.groups, g = 0, h = f.length; g < h; g++) {
                                var l = f[g],
                                    n = e[l.materialIndex];
                                n && n.visible && z.push(a, d, n, Pb.z, l)
                            } else e.visible && z.push(a, d, e, Pb.z, null)
                    } a = a.children;
                g = 0;
                for (h = a.length; g < h; g++) m(a[g], b, c)
            }
        }

        function w(a, b, c, d) {
            for (var e =
                    0, f = a.length; e < f; e++) {
                var g = a[e],
                    h = g.object,
                    l = g.geometry,
                    m = void 0 === d ? g.material : d;
                g = g.group;
                if (c.isArrayCamera) {
                    Mb = c;
                    for (var w = c.cameras, t = 0, k = w.length; t < k; t++) {
                        var r = w[t];
                        if (h.layers.test(r.layers)) {
                            var q = r.bounds;
                            aa.viewport(W.set(q.x * X, q.y * ba, q.z * X, q.w * ba).multiplyScalar(U));
                            n(h, b, r, l, m, g)
                        }
                    }
                } else Mb = null, n(h, b, c, l, m, g)
            }
        }

        function n(a, b, c, d, e, f) {
            a.onBeforeRender(T, b, c, d, e, f);
            B = pa.get(b, Mb || c);
            a.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse, a.matrixWorld);
            a.normalMatrix.getNormalMatrix(a.modelViewMatrix);
            if (a.isImmediateRenderObject) {
                var h = a.isMesh && 0 > a.matrixWorld.determinant();
                aa.setMaterial(e, h);
                h = k(c, b.fog, e, a);
                Q = "";
                g(a, h, e)
            } else T.renderBufferDirect(c, b.fog, d, e, a, f);
            a.onAfterRender(T, b, c, d, e, f);
            B = pa.get(b, Mb || c)
        }

        function t(a, b, c) {
            var d = Ba.get(a),
                g = B.state.lights;
            c = oa.getParameters(a, g.state, B.state.shadowsArray, b, Y.numPlanes, Y.numIntersection, c);
            var h = oa.getProgramCode(a, c),
                l = d.program,
                m = !0;
            if (void 0 === l) a.addEventListener("dispose", e);
            else if (l.code !== h) f(a);
            else {
                if (d.lightsHash !== g.state.hash) Ba.update(a,
                    "lightsHash", g.state.hash);
                else if (void 0 !== c.shaderID) return;
                m = !1
            }
            m && (c.shaderID ? (l = rb[c.shaderID], d.shader = {
                name: a.type,
                uniforms: Ca.clone(l.uniforms),
                vertexShader: l.vertexShader,
                fragmentShader: l.fragmentShader
            }) : d.shader = {
                name: a.type,
                uniforms: a.uniforms,
                vertexShader: a.vertexShader,
                fragmentShader: a.fragmentShader
            }, a.onBeforeCompile(d.shader, T), l = oa.acquireProgram(a, d.shader, c, h), d.program = l, a.program = l);
            c = l.getAttributes();
            if (a.morphTargets)
                for (h = a.numSupportedMorphTargets = 0; h < T.maxMorphTargets; h++) 0 <=
                    c["morphTarget" + h] && a.numSupportedMorphTargets++;
            if (a.morphNormals)
                for (h = a.numSupportedMorphNormals = 0; h < T.maxMorphNormals; h++) 0 <= c["morphNormal" + h] && a.numSupportedMorphNormals++;
            c = d.shader.uniforms;
            if (!a.isShaderMaterial && !a.isRawShaderMaterial || !0 === a.clipping) d.numClippingPlanes = Y.numPlanes, d.numIntersection = Y.numIntersection, c.clippingPlanes = Y.uniform;
            d.fog = b;
            d.lightsHash = g.state.hash;
            a.lights && (c.ambientLightColor.value = g.state.ambient, c.directionalLights.value = g.state.directional, c.spotLights.value =
                g.state.spot, c.rectAreaLights.value = g.state.rectArea, c.pointLights.value = g.state.point, c.hemisphereLights.value = g.state.hemi, c.directionalShadowMap.value = g.state.directionalShadowMap, c.directionalShadowMatrix.value = g.state.directionalShadowMatrix, c.spotShadowMap.value = g.state.spotShadowMap, c.spotShadowMatrix.value = g.state.spotShadowMatrix, c.pointShadowMap.value = g.state.pointShadowMap, c.pointShadowMatrix.value = g.state.pointShadowMatrix);
            a = d.program.getUniforms();
            a = cb.seqWithValue(a.seq, c);
            d.uniformsList =
                a
        }

        function k(a, b, c, d) {
            Wd = 0;
            var e = Ba.get(c),
                f = B.state.lights;
            ka && (fa || a !== H) && Y.setState(c.clippingPlanes, c.clipIntersection, c.clipShadows, a, e, a === H && c.id === M);
            !1 === c.needsUpdate && (void 0 === e.program ? c.needsUpdate = !0 : c.fog && e.fog !== b ? c.needsUpdate = !0 : c.lights && e.lightsHash !== f.state.hash ? c.needsUpdate = !0 : void 0 === e.numClippingPlanes || e.numClippingPlanes === Y.numPlanes && e.numIntersection === Y.numIntersection || (c.needsUpdate = !0));
            c.needsUpdate && (t(c, b, d), c.needsUpdate = !1);
            var g = !1,
                h = !1,
                l = !1;
            f = e.program;
            var m = f.getUniforms(),
                n = e.shader.uniforms;
            aa.useProgram(f.program) && (l = h = g = !0);
            c.id !== M && (M = c.id, h = !0);
            if (g || a !== H) {
                m.setValue(E, "projectionMatrix", a.projectionMatrix);
                Ra.logarithmicDepthBuffer && m.setValue(E, "logDepthBufFC", 2 / (Math.log(a.far + 1) / Math.LN2));
                H !== (Mb || a) && (H = Mb || a, l = h = !0);
                if (c.isShaderMaterial || c.isMeshPhongMaterial || c.isMeshStandardMaterial || c.envMap) g = m.map.cameraPosition, void 0 !== g && g.setValue(E, Pb.setFromMatrixPosition(a.matrixWorld));
                (c.isMeshPhongMaterial || c.isMeshLambertMaterial ||
                    c.isMeshBasicMaterial || c.isMeshStandardMaterial || c.isShaderMaterial || c.skinning) && m.setValue(E, "viewMatrix", a.matrixWorldInverse)
            }
            if (c.skinning && (m.setOptional(E, d, "bindMatrix"), m.setOptional(E, d, "bindMatrixInverse"), a = d.skeleton))
                if (g = a.bones, Ra.floatVertexTextures) {
                    if (void 0 === a.boneTexture) {
                        g = Math.sqrt(4 * g.length);
                        g = R.ceilPowerOfTwo(g);
                        g = Math.max(g, 4);
                        var w = new Float32Array(g * g * 4);
                        w.set(a.boneMatrices);
                        var k = new jb(w, g, g, 1023, 1015);
                        k.needsUpdate = !0;
                        a.boneMatrices = w;
                        a.boneTexture = k;
                        a.boneTextureSize =
                            g
                    }
                    m.setValue(E, "boneTexture", a.boneTexture);
                    m.setValue(E, "boneTextureSize", a.boneTextureSize)
                } else m.setOptional(E, a, "boneMatrices");
            h && (m.setValue(E, "toneMappingExposure", T.toneMappingExposure), m.setValue(E, "toneMappingWhitePoint", T.toneMappingWhitePoint), c.lights && (h = l, n.ambientLightColor.needsUpdate = h, n.directionalLights.needsUpdate = h, n.pointLights.needsUpdate = h, n.spotLights.needsUpdate = h, n.rectAreaLights.needsUpdate = h, n.hemisphereLights.needsUpdate = h), b && c.fog && (n.fogColor.value = b.color, b.isFog ?
                    (n.fogNear.value = b.near, n.fogFar.value = b.far) : b.isFogExp2 && (n.fogDensity.value = b.density)), c.isMeshBasicMaterial ? q(n, c) : c.isMeshLambertMaterial ? (q(n, c), c.emissiveMap && (n.emissiveMap.value = c.emissiveMap)) : c.isMeshPhongMaterial ? (q(n, c), c.isMeshToonMaterial ? (u(n, c), c.gradientMap && (n.gradientMap.value = c.gradientMap)) : u(n, c)) : c.isMeshStandardMaterial ? (q(n, c), c.isMeshPhysicalMaterial && (n.clearCoat.value = c.clearCoat, n.clearCoatRoughness.value = c.clearCoatRoughness), n.roughness.value = c.roughness, n.metalness.value =
                    c.metalness, c.roughnessMap && (n.roughnessMap.value = c.roughnessMap), c.metalnessMap && (n.metalnessMap.value = c.metalnessMap), c.emissiveMap && (n.emissiveMap.value = c.emissiveMap), c.bumpMap && (n.bumpMap.value = c.bumpMap, n.bumpScale.value = c.bumpScale), c.normalMap && (n.normalMap.value = c.normalMap, n.normalScale.value.copy(c.normalScale)), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias), c.envMap && (n.envMapIntensity.value =
                        c.envMapIntensity)) : c.isMeshDepthMaterial ? (q(n, c), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias)) : c.isMeshDistanceMaterial ? (q(n, c), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias), n.referencePosition.value.copy(c.referencePosition), n.nearDistance.value = c.nearDistance, n.farDistance.value = c.farDistance) :
                c.isMeshNormalMaterial ? (q(n, c), c.bumpMap && (n.bumpMap.value = c.bumpMap, n.bumpScale.value = c.bumpScale), c.normalMap && (n.normalMap.value = c.normalMap, n.normalScale.value.copy(c.normalScale)), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias)) : c.isLineBasicMaterial ? (n.diffuse.value = c.color, n.opacity.value = c.opacity, c.isLineDashedMaterial && (n.dashSize.value = c.dashSize, n.totalSize.value = c.dashSize + c.gapSize,
                    n.scale.value = c.scale)) : c.isPointsMaterial ? (n.diffuse.value = c.color, n.opacity.value = c.opacity, n.size.value = c.size * U, n.scale.value = .5 * ba, n.map.value = c.map, null !== c.map && (!0 === c.map.matrixAutoUpdate && (b = c.map.offset, h = c.map.repeat, l = c.map.center, c.map.matrix.setUvTransform(b.x, b.y, h.x, h.y, c.map.rotation, l.x, l.y)), n.uvTransform.value.copy(c.map.matrix))) : c.isShadowMaterial && (n.color.value = c.color, n.opacity.value = c.opacity), void 0 !== n.ltc_1 && (n.ltc_1.value = D.LTC_1), void 0 !== n.ltc_2 && (n.ltc_2.value = D.LTC_2),
                cb.upload(E, e.uniformsList, n, T));
            c.isShaderMaterial && !0 === c.uniformsNeedUpdate && (cb.upload(E, e.uniformsList, n, T), c.uniformsNeedUpdate = !1);
            m.setValue(E, "modelViewMatrix", d.modelViewMatrix);
            m.setValue(E, "normalMatrix", d.normalMatrix);
            m.setValue(E, "modelMatrix", d.matrixWorld);
            return f
        }

        function q(a, b) {
            a.opacity.value = b.opacity;
            b.color && (a.diffuse.value = b.color);
            b.emissive && a.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity);
            b.map && (a.map.value = b.map);
            b.alphaMap && (a.alphaMap.value = b.alphaMap);
            b.specularMap && (a.specularMap.value = b.specularMap);
            b.envMap && (a.envMap.value = b.envMap, a.flipEnvMap.value = b.envMap && b.envMap.isCubeTexture ? -1 : 1, a.reflectivity.value = b.reflectivity, a.refractionRatio.value = b.refractionRatio, a.maxMipLevel.value = Ba.get(b.envMap).__maxMipLevel);
            b.lightMap && (a.lightMap.value = b.lightMap, a.lightMapIntensity.value = b.lightMapIntensity);
            b.aoMap && (a.aoMap.value = b.aoMap, a.aoMapIntensity.value = b.aoMapIntensity);
            if (b.map) var c = b.map;
            else b.specularMap ? c = b.specularMap : b.displacementMap ?
                c = b.displacementMap : b.normalMap ? c = b.normalMap : b.bumpMap ? c = b.bumpMap : b.roughnessMap ? c = b.roughnessMap : b.metalnessMap ? c = b.metalnessMap : b.alphaMap ? c = b.alphaMap : b.emissiveMap && (c = b.emissiveMap);
            if (void 0 !== c) {
                c.isWebGLRenderTarget && (c = c.texture);
                if (!0 === c.matrixAutoUpdate) {
                    b = c.offset;
                    var d = c.repeat,
                        e = c.center;
                    c.matrix.setUvTransform(b.x, b.y, d.x, d.y, c.rotation, e.x, e.y)
                }
                a.uvTransform.value.copy(c.matrix)
            }
        }

        function u(a, b) {
            a.specular.value = b.specular;
            a.shininess.value = Math.max(b.shininess, 1E-4);
            b.emissiveMap &&
                (a.emissiveMap.value = b.emissiveMap);
            b.bumpMap && (a.bumpMap.value = b.bumpMap, a.bumpScale.value = b.bumpScale);
            b.normalMap && (a.normalMap.value = b.normalMap, a.normalScale.value.copy(b.normalScale));
            b.displacementMap && (a.displacementMap.value = b.displacementMap, a.displacementScale.value = b.displacementScale, a.displacementBias.value = b.displacementBias)
        }
        console.log("THREE.WebGLRenderer", "92dev");
        a = a || {};
        var x = void 0 !== a.canvas ? a.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
            y = void 0 !==
            a.context ? a.context : null,
            v = void 0 !== a.alpha ? a.alpha : !1,
            C = void 0 !== a.depth ? a.depth : !0,
            F = void 0 !== a.stencil ? a.stencil : !0,
            N = void 0 !== a.antialias ? a.antialias : !1,
            O = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
            G = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
            A = void 0 !== a.powerPreference ? a.powerPreference : "default",
            z = null,
            B = null;
        this.domElement = x;
        this.context = null;
        this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
        this.clippingPlanes = [];
        this.localClippingEnabled = !1;
        this.gammaFactor = 2;
        this.physicallyCorrectLights = this.gammaOutput = this.gammaInput = !1;
        this.toneMappingWhitePoint = this.toneMappingExposure = this.toneMapping = 1;
        this.maxMorphTargets = 8;
        this.maxMorphNormals = 4;
        var T = this,
            I = !1,
            L = null,
            J = null,
            M = -1,
            Q = "",
            H = null,
            Mb = null,
            W = new da,
            S = new da,
            V = null,
            Wd = 0,
            X = x.width,
            ba = x.height,
            U = 1,
            P = new da(0, 0, X, ba),
            Z = new da(0, 0, X, ba),
            ea = !1,
            ia = new od,
            Y = new Gf,
            ka = !1,
            fa = !1,
            pd = new K,
            Pb = new p;
        try {
            v = {
                alpha: v,
                depth: C,
                stencil: F,
                antialias: N,
                premultipliedAlpha: O,
                preserveDrawingBuffer: G,
                powerPreference: A
            };
            x.addEventListener("webglcontextlost", c, !1);
            x.addEventListener("webglcontextrestored", d, !1);
            var E = y || x.getContext("webgl", v) || x.getContext("experimental-webgl", v);
            if (null === E) {
                if (null !== x.getContext("webgl")) throw Error("Error creating WebGL context with your selected attributes.");
                throw Error("Error creating WebGL context.");
            }
            void 0 === E.getShaderPrecisionFormat && (E.getShaderPrecisionFormat = function () {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                }
            })
        } catch (Gg) {
            console.error("THREE.WebGLRenderer: " +
                Gg.message)
        }
        var la, Ra, aa, fb, Ba, ca, qa, ra, sa, oa, ta, pa, ma, va, wa, xa, ya, ja;
        b();
        var na = new We(T);
        this.vr = na;
        var Aa = new Ue(T, sa, Ra.maxTextureSize);
        this.shadowMap = Aa;
        this.getContext = function () {
            return E
        };
        this.getContextAttributes = function () {
            return E.getContextAttributes()
        };
        this.forceContextLoss = function () {
            var a = la.get("WEBGL_lose_context");
            a && a.loseContext()
        };
        this.forceContextRestore = function () {
            var a = la.get("WEBGL_lose_context");
            a && a.restoreContext()
        };
        this.getPixelRatio = function () {
            return U
        };
        this.setPixelRatio =
            function (a) {
                void 0 !== a && (U = a, this.setSize(X, ba, !1))
            };
        this.getSize = function () {
            return {
                width: X,
                height: ba
            }
        };
        this.setSize = function (a, b, c) {
            var d = na.getDevice();
            d && d.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (X = a, ba = b, x.width = a * U, x.height = b * U, !1 !== c && (x.style.width = a + "px", x.style.height = b + "px"), this.setViewport(0, 0, a, b))
        };
        this.getDrawingBufferSize = function () {
            return {
                width: X * U,
                height: ba * U
            }
        };
        this.setDrawingBufferSize = function (a, b, c) {
            X = a;
            ba = b;
            U = c;
            x.width =
                a * c;
            x.height = b * c;
            this.setViewport(0, 0, a, b)
        };
        this.getCurrentViewport = function () {
            return W
        };
        this.setViewport = function (a, b, c, d) {
            P.set(a, ba - b - d, c, d);
            aa.viewport(W.copy(P).multiplyScalar(U))
        };
        this.setScissor = function (a, b, c, d) {
            Z.set(a, ba - b - d, c, d);
            aa.scissor(S.copy(Z).multiplyScalar(U))
        };
        this.setScissorTest = function (a) {
            aa.setScissorTest(ea = a)
        };
        this.getClearColor = function () {
            return ma.getClearColor()
        };
        this.setClearColor = function () {
            ma.setClearColor.apply(ma, arguments)
        };
        this.getClearAlpha = function () {
            return ma.getClearAlpha()
        };
        this.setClearAlpha = function () {
            ma.setClearAlpha.apply(ma, arguments)
        };
        this.clear = function (a, b, c) {
            var d = 0;
            if (void 0 === a || a) d |= E.COLOR_BUFFER_BIT;
            if (void 0 === b || b) d |= E.DEPTH_BUFFER_BIT;
            if (void 0 === c || c) d |= E.STENCIL_BUFFER_BIT;
            E.clear(d)
        };
        this.clearColor = function () {
            this.clear(!0, !1, !1)
        };
        this.clearDepth = function () {
            this.clear(!1, !0, !1)
        };
        this.clearStencil = function () {
            this.clear(!1, !1, !0)
        };
        this.clearTarget = function (a, b, c, d) {
            this.setRenderTarget(a);
            this.clear(b, c, d)
        };
        this.dispose = function () {
            x.removeEventListener("webglcontextlost",
                c, !1);
            x.removeEventListener("webglcontextrestored", d, !1);
            ta.dispose();
            pa.dispose();
            Ba.dispose();
            sa.dispose();
            na.dispose();
            ua = !1
        };
        this.renderBufferImmediate = function (a, b, c) {
            aa.initAttributes();
            var d = Ba.get(a);
            a.hasPositions && !d.position && (d.position = E.createBuffer());
            a.hasNormals && !d.normal && (d.normal = E.createBuffer());
            a.hasUvs && !d.uv && (d.uv = E.createBuffer());
            a.hasColors && !d.color && (d.color = E.createBuffer());
            b = b.getAttributes();
            a.hasPositions && (E.bindBuffer(E.ARRAY_BUFFER, d.position), E.bufferData(E.ARRAY_BUFFER,
                a.positionArray, E.DYNAMIC_DRAW), aa.enableAttribute(b.position), E.vertexAttribPointer(b.position, 3, E.FLOAT, !1, 0, 0));
            if (a.hasNormals) {
                E.bindBuffer(E.ARRAY_BUFFER, d.normal);
                if (!c.isMeshPhongMaterial && !c.isMeshStandardMaterial && !c.isMeshNormalMaterial && !0 === c.flatShading)
                    for (var e = 0, f = 3 * a.count; e < f; e += 9) {
                        var g = a.normalArray,
                            h = (g[e + 0] + g[e + 3] + g[e + 6]) / 3,
                            l = (g[e + 1] + g[e + 4] + g[e + 7]) / 3,
                            m = (g[e + 2] + g[e + 5] + g[e + 8]) / 3;
                        g[e + 0] = h;
                        g[e + 1] = l;
                        g[e + 2] = m;
                        g[e + 3] = h;
                        g[e + 4] = l;
                        g[e + 5] = m;
                        g[e + 6] = h;
                        g[e + 7] = l;
                        g[e + 8] = m
                    }
                E.bufferData(E.ARRAY_BUFFER,
                    a.normalArray, E.DYNAMIC_DRAW);
                aa.enableAttribute(b.normal);
                E.vertexAttribPointer(b.normal, 3, E.FLOAT, !1, 0, 0)
            }
            a.hasUvs && c.map && (E.bindBuffer(E.ARRAY_BUFFER, d.uv), E.bufferData(E.ARRAY_BUFFER, a.uvArray, E.DYNAMIC_DRAW), aa.enableAttribute(b.uv), E.vertexAttribPointer(b.uv, 2, E.FLOAT, !1, 0, 0));
            a.hasColors && 0 !== c.vertexColors && (E.bindBuffer(E.ARRAY_BUFFER, d.color), E.bufferData(E.ARRAY_BUFFER, a.colorArray, E.DYNAMIC_DRAW), aa.enableAttribute(b.color), E.vertexAttribPointer(b.color, 3, E.FLOAT, !1, 0, 0));
            aa.disableUnusedAttributes();
            E.drawArrays(E.TRIANGLES, 0, a.count);
            a.count = 0
        };
        this.renderBufferDirect = function (a, b, c, d, e, f) {
            var g = e.isMesh && 0 > e.matrixWorld.determinant();
            aa.setMaterial(d, g);
            var h = k(a, b, d, e);
            a = c.id + "_" + h.id + "_" + (!0 === d.wireframe);
            var l = !1;
            a !== Q && (Q = a, l = !0);
            e.morphTargetInfluences && (va.update(e, c, d, h), l = !0);
            g = c.index;
            var m = c.attributes.position;
            b = 1;
            !0 === d.wireframe && (g = ra.getWireframeAttribute(c), b = 2);
            a = wa;
            if (null !== g) {
                var n = qa.get(g);
                a = xa;
                a.setIndex(n)
            }
            if (l) {
                if (c && c.isInstancedBufferGeometry && null === la.get("ANGLE_instanced_arrays")) console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                else {
                    aa.initAttributes();
                    l = c.attributes;
                    h = h.getAttributes();
                    var w = d.defaultAttributeValues;
                    for (F in h) {
                        var t = h[F];
                        if (0 <= t) {
                            var r = l[F];
                            if (void 0 !== r) {
                                var q = r.normalized,
                                    p = r.itemSize,
                                    u = qa.get(r);
                                if (void 0 !== u) {
                                    var x = u.buffer,
                                        v = u.type;
                                    u = u.bytesPerElement;
                                    if (r.isInterleavedBufferAttribute) {
                                        var y = r.data,
                                            C = y.stride;
                                        r = r.offset;
                                        y && y.isInstancedInterleavedBuffer ? (aa.enableAttributeAndDivisor(t, y.meshPerAttribute), void 0 === c.maxInstancedCount && (c.maxInstancedCount = y.meshPerAttribute * y.count)) : aa.enableAttribute(t);
                                        E.bindBuffer(E.ARRAY_BUFFER, x);
                                        E.vertexAttribPointer(t, p, v, q, C * u, r * u)
                                    } else r.isInstancedBufferAttribute ? (aa.enableAttributeAndDivisor(t, r.meshPerAttribute), void 0 === c.maxInstancedCount && (c.maxInstancedCount = r.meshPerAttribute * r.count)) : aa.enableAttribute(t), E.bindBuffer(E.ARRAY_BUFFER, x), E.vertexAttribPointer(t, p, v, q, 0, 0)
                                }
                            } else if (void 0 !== w && (q = w[F], void 0 !== q)) switch (q.length) {
                                case 2:
                                    E.vertexAttrib2fv(t, q);
                                    break;
                                case 3:
                                    E.vertexAttrib3fv(t, q);
                                    break;
                                case 4:
                                    E.vertexAttrib4fv(t, q);
                                    break;
                                default:
                                    E.vertexAttrib1fv(t,
                                        q)
                            }
                        }
                    }
                    aa.disableUnusedAttributes()
                }
                null !== g && E.bindBuffer(E.ELEMENT_ARRAY_BUFFER, n.buffer)
            }
            n = Infinity;
            null !== g ? n = g.count : void 0 !== m && (n = m.count);
            g = c.drawRange.start * b;
            m = null !== f ? f.start * b : 0;
            var F = Math.max(g, m);
            f = Math.max(0, Math.min(n, g + c.drawRange.count * b, m + (null !== f ? f.count * b : Infinity)) - 1 - F + 1);
            if (0 !== f) {
                if (e.isMesh)
                    if (!0 === d.wireframe) aa.setLineWidth(d.wireframeLinewidth * (null === L ? U : 1)), a.setMode(E.LINES);
                    else switch (e.drawMode) {
                        case 0:
                            a.setMode(E.TRIANGLES);
                            break;
                        case 1:
                            a.setMode(E.TRIANGLE_STRIP);
                            break;
                        case 2:
                            a.setMode(E.TRIANGLE_FAN)
                    } else e.isLine ? (d = d.linewidth, void 0 === d && (d = 1), aa.setLineWidth(d * (null === L ? U : 1)), e.isLineSegments ? a.setMode(E.LINES) : e.isLineLoop ? a.setMode(E.LINE_LOOP) : a.setMode(E.LINE_STRIP)) : e.isPoints && a.setMode(E.POINTS);
                c && c.isInstancedBufferGeometry ? 0 < c.maxInstancedCount && a.renderInstances(c, F, f) : a.render(F, f)
            }
        };
        this.compile = function (a, b) {
            B = pa.get(a, b);
            B.init();
            a.traverse(function (a) {
                a.isLight && (B.pushLight(a), a.castShadow && B.pushShadow(a))
            });
            B.setupLights(b);
            a.traverse(function (b) {
                if (b.material)
                    if (Array.isArray(b.material))
                        for (var c =
                                0; c < b.material.length; c++) t(b.material[c], a.fog, b);
                    else t(b.material, a.fog, b)
            })
        };
        var ua = !1,
            za = null;
        this.animate = function (a) {
            za = a;
            null !== za ? ua || (h(), ua = !0) : ua = !1
        };
        this.render = function (a, b, c, d) {
            if (!b || !b.isCamera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            else if (!I) {
                Q = "";
                M = -1;
                H = null;
                !0 === a.autoUpdate && a.updateMatrixWorld();
                null === b.parent && b.updateMatrixWorld();
                na.enabled && (b = na.getCamera(b));
                B = pa.get(a, b);
                B.init();
                a.onBeforeRender(T, a, b, c);
                pd.multiplyMatrices(b.projectionMatrix,
                    b.matrixWorldInverse);
                ia.setFromMatrix(pd);
                fa = this.localClippingEnabled;
                ka = Y.init(this.clippingPlanes, fa, b);
                z = ta.get(a, b);
                z.init();
                m(a, b, T.sortObjects);
                !0 === T.sortObjects && z.sort();
                ka && Y.beginShadows();
                Aa.render(B.state.shadowsArray, a, b);
                B.setupLights(b);
                ka && Y.endShadows();
                this.info.autoReset && this.info.reset();
                void 0 === c && (c = null);
                this.setRenderTarget(c);
                ma.render(z, a, b, d);
                d = z.opaque;
                var e = z.transparent;
                if (a.overrideMaterial) {
                    var f = a.overrideMaterial;
                    d.length && w(d, a, b, f);
                    e.length && w(e, a, b, f)
                } else d.length &&
                    w(d, a, b), e.length && w(e, a, b);
                ya.render(B.state.spritesArray, a, b);
                c && ca.updateRenderTargetMipmap(c);
                aa.buffers.depth.setTest(!0);
                aa.buffers.depth.setMask(!0);
                aa.buffers.color.setMask(!0);
                aa.setPolygonOffset(!1);
                a.onAfterRender(T, a, b);
                na.enabled && na.submitFrame();
                B = z = null
            }
        };
        this.allocTextureUnit = function () {
            var a = Wd;
            a >= Ra.maxTextures && console.warn("THREE.WebGLRenderer: Trying to use " + a + " texture units while this GPU supports only " + Ra.maxTextures);
            Wd += 1;
            return a
        };
        this.setTexture2D = function () {
            var a = !1;
            return function (b, c) {
                b && b.isWebGLRenderTarget && (a || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), a = !0), b = b.texture);
                ca.setTexture2D(b, c)
            }
        }();
        this.setTexture = function () {
            var a = !1;
            return function (b, c) {
                a || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), a = !0);
                ca.setTexture2D(b, c)
            }
        }();
        this.setTextureCube = function () {
            var a = !1;
            return function (b, c) {
                b && b.isWebGLRenderTargetCube && (a || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."),
                    a = !0), b = b.texture);
                b && b.isCubeTexture || Array.isArray(b.image) && 6 === b.image.length ? ca.setTextureCube(b, c) : ca.setTextureCubeDynamic(b, c)
            }
        }();
        this.getRenderTarget = function () {
            return L
        };
        this.setRenderTarget = function (a) {
            (L = a) && void 0 === Ba.get(a).__webglFramebuffer && ca.setupRenderTarget(a);
            var b = null,
                c = !1;
            a ? (b = Ba.get(a).__webglFramebuffer, a.isWebGLRenderTargetCube && (b = b[a.activeCubeFace], c = !0), W.copy(a.viewport), S.copy(a.scissor), V = a.scissorTest) : (W.copy(P).multiplyScalar(U), S.copy(Z).multiplyScalar(U),
                V = ea);
            J !== b && (E.bindFramebuffer(E.FRAMEBUFFER, b), J = b);
            aa.viewport(W);
            aa.scissor(S);
            aa.setScissorTest(V);
            c && (c = Ba.get(a.texture), E.framebufferTexture2D(E.FRAMEBUFFER, E.COLOR_ATTACHMENT0, E.TEXTURE_CUBE_MAP_POSITIVE_X + a.activeCubeFace, c.__webglTexture, a.activeMipMapLevel))
        };
        this.readRenderTargetPixels = function (a, b, c, d, e, f) {
            if (a && a.isWebGLRenderTarget) {
                var g = Ba.get(a).__webglFramebuffer;
                if (g) {
                    var h = !1;
                    g !== J && (E.bindFramebuffer(E.FRAMEBUFFER, g), h = !0);
                    try {
                        var l = a.texture,
                            m = l.format,
                            n = l.type;
                        1023 !== m && ja.convert(m) !==
                            E.getParameter(E.IMPLEMENTATION_COLOR_READ_FORMAT) ? console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.") : 1009 === n || ja.convert(n) === E.getParameter(E.IMPLEMENTATION_COLOR_READ_TYPE) || 1015 === n && (la.get("OES_texture_float") || la.get("WEBGL_color_buffer_float")) || 1016 === n && la.get("EXT_color_buffer_half_float") ? E.checkFramebufferStatus(E.FRAMEBUFFER) === E.FRAMEBUFFER_COMPLETE ? 0 <= b && b <= a.width - d && 0 <= c && c <= a.height - e && E.readPixels(b, c, d, e,
                                ja.convert(m), ja.convert(n), f) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.") : console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.")
                    } finally {
                        h && E.bindFramebuffer(E.FRAMEBUFFER, J)
                    }
                }
            } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
        };
        this.copyFramebufferToTexture = function (a, b, c) {
            var d = b.image.width,
                e = b.image.height,
                f = ja.convert(b.format);
            this.setTexture2D(b, 0);
            E.copyTexImage2D(E.TEXTURE_2D, c || 0, f, a.x, a.y, d, e, 0)
        };
        this.copyTextureToTexture = function (a, b, c, d) {
            var e = b.image.width,
                f = b.image.height,
                g = ja.convert(c.format),
                h = ja.convert(c.type);
            b = b.isDataTexture ? b.image.data : b.image;
            this.setTexture2D(c, 0);
            E.texSubImage2D(E.TEXTURE_2D, d || 0, a.x, a.y, e, f, g, h, b)
        }
    }

    function Qb(a, b) {
        this.name = "";
        this.color = new L(a);
        this.density = void 0 !== b ? b : 2.5E-4
    }

    function Rb(a, b, c) {
        this.name = "";
        this.color = new L(a);
        this.near =
            void 0 !== b ? b : 1;
        this.far = void 0 !== c ? c : 1E3
    }

    function rd() {
        B.call(this);
        this.type = "Scene";
        this.overrideMaterial = this.fog = this.background = null;
        this.autoUpdate = !0
    }

    function gb(a) {
        Q.call(this);
        this.type = "SpriteMaterial";
        this.color = new L(16777215);
        this.map = null;
        this.rotation = 0;
        this.lights = this.fog = !1;
        this.setValues(a)
    }

    function Dc(a) {
        B.call(this);
        this.type = "Sprite";
        this.material = void 0 !== a ? a : new gb;
        this.center = new A(.5, .5)
    }

    function Ec() {
        B.call(this);
        this.type = "LOD";
        Object.defineProperties(this, {
            levels: {
                enumerable: !0,
                value: []
            }
        })
    }

    function Fc(a, b) {
        a = a || [];
        this.bones = a.slice(0);
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        if (void 0 === b) this.calculateInverses();
        else if (this.bones.length === b.length) this.boneInverses = b.slice(0);
        else
            for (console.warn("THREE.Skeleton boneInverses is the wrong length."), this.boneInverses = [], a = 0, b = this.bones.length; a < b; a++) this.boneInverses.push(new K)
    }

    function sd() {
        B.call(this);
        this.type = "Bone"
    }

    function td(a, b) {
        ta.call(this, a, b);
        this.type = "SkinnedMesh";
        this.bindMode = "attached";
        this.bindMatrix = new K;
        this.bindMatrixInverse = new K;
        a = this.initBones();
        a = new Fc(a);
        this.bind(a, this.matrixWorld);
        this.normalizeSkinWeights()
    }

    function S(a) {
        Q.call(this);
        this.type = "LineBasicMaterial";
        this.color = new L(16777215);
        this.linewidth = 1;
        this.linejoin = this.linecap = "round";
        this.lights = !1;
        this.setValues(a)
    }

    function pa(a, b, c) {
        if (1 === c) return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), new V(a, b);
        B.call(this);
        this.type = "Line";
        this.geometry =
            void 0 !== a ? a : new I;
        this.material = void 0 !== b ? b : new S({
            color: 16777215 * Math.random()
        })
    }

    function V(a, b) {
        pa.call(this, a, b);
        this.type = "LineSegments"
    }

    function ud(a, b) {
        pa.call(this, a, b);
        this.type = "LineLoop"
    }

    function Ia(a) {
        Q.call(this);
        this.type = "PointsMaterial";
        this.color = new L(16777215);
        this.map = null;
        this.size = 1;
        this.sizeAttenuation = !0;
        this.lights = !1;
        this.setValues(a)
    }

    function Sb(a, b) {
        B.call(this);
        this.type = "Points";
        this.geometry = void 0 !== a ? a : new I;
        this.material = void 0 !== b ? b : new Ia({
            color: 16777215 * Math.random()
        })
    }

    function vd() {
        B.call(this);
        this.type = "Group"
    }

    function Yd(a, b, c, d, e, f, g, h, l) {
        X.call(this, a, b, c, d, e, f, g, h, l);
        this.generateMipmaps = !1
    }

    function Tb(a, b, c, d, e, f, g, h, l, m, w, n) {
        X.call(this, null, f, g, h, l, m, d, e, w, n);
        this.image = {
            width: b,
            height: c
        };
        this.mipmaps = a;
        this.generateMipmaps = this.flipY = !1
    }

    function Gc(a, b, c, d, e, f, g, h, l, m) {
        m = void 0 !== m ? m : 1026;
        if (1026 !== m && 1027 !== m) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        void 0 === c && 1026 === m && (c = 1012);
        void 0 === c && 1027 ===
            m && (c = 1020);
        X.call(this, null, d, e, f, g, h, m, c, l);
        this.image = {
            width: a,
            height: b
        };
        this.magFilter = void 0 !== g ? g : 1003;
        this.minFilter = void 0 !== h ? h : 1003;
        this.generateMipmaps = this.flipY = !1
    }

    function Ub(a) {
        I.call(this);
        this.type = "WireframeGeometry";
        var b = [],
            c, d, e, f = [0, 0],
            g = {},
            h = ["a", "b", "c"];
        if (a && a.isGeometry) {
            var l = a.faces;
            var m = 0;
            for (d = l.length; m < d; m++) {
                var w = l[m];
                for (c = 0; 3 > c; c++) {
                    var n = w[h[c]];
                    var t = w[h[(c + 1) % 3]];
                    f[0] = Math.min(n, t);
                    f[1] = Math.max(n, t);
                    n = f[0] + "," + f[1];
                    void 0 === g[n] && (g[n] = {
                        index1: f[0],
                        index2: f[1]
                    })
                }
            }
            for (n in g) m =
                g[n], h = a.vertices[m.index1], b.push(h.x, h.y, h.z), h = a.vertices[m.index2], b.push(h.x, h.y, h.z)
        } else if (a && a.isBufferGeometry)
            if (h = new p, null !== a.index) {
                l = a.attributes.position;
                w = a.index;
                var k = a.groups;
                0 === k.length && (k = [{
                    start: 0,
                    count: w.count,
                    materialIndex: 0
                }]);
                a = 0;
                for (e = k.length; a < e; ++a)
                    for (m = k[a], c = m.start, d = m.count, m = c, d = c + d; m < d; m += 3)
                        for (c = 0; 3 > c; c++) n = w.getX(m + c), t = w.getX(m + (c + 1) % 3), f[0] = Math.min(n, t), f[1] = Math.max(n, t), n = f[0] + "," + f[1], void 0 === g[n] && (g[n] = {
                            index1: f[0],
                            index2: f[1]
                        });
                for (n in g) m = g[n],
                    h.fromBufferAttribute(l, m.index1), b.push(h.x, h.y, h.z), h.fromBufferAttribute(l, m.index2), b.push(h.x, h.y, h.z)
            } else
                for (l = a.attributes.position, m = 0, d = l.count / 3; m < d; m++)
                    for (c = 0; 3 > c; c++) g = 3 * m + c, h.fromBufferAttribute(l, g), b.push(h.x, h.y, h.z), g = 3 * m + (c + 1) % 3, h.fromBufferAttribute(l, g), b.push(h.x, h.y, h.z);
        this.addAttribute("position", new z(b, 3))
    }

    function Hc(a, b, c) {
        M.call(this);
        this.type = "ParametricGeometry";
        this.parameters = {
            func: a,
            slices: b,
            stacks: c
        };
        this.fromBufferGeometry(new Vb(a, b, c));
        this.mergeVertices()
    }

    function Vb(a, b, c) {
        I.call(this);
        this.type = "ParametricBufferGeometry";
        this.parameters = {
            func: a,
            slices: b,
            stacks: c
        };
        var d = [],
            e = [],
            f = [],
            g = [],
            h = new p,
            l = new p,
            m = new p,
            w = new p,
            n = new p,
            t, k, q = b + 1;
        for (t = 0; t <= c; t++) {
            var u = t / c;
            for (k = 0; k <= b; k++) {
                var x = k / b;
                a(x, u, l);
                e.push(l.x, l.y, l.z);
                0 <= x - 1E-5 ? (a(x - 1E-5, u, m), w.subVectors(l, m)) : (a(x + 1E-5, u, m), w.subVectors(m, l));
                0 <= u - 1E-5 ? (a(x, u - 1E-5, m), n.subVectors(l, m)) : (a(x, u + 1E-5, m), n.subVectors(m, l));
                h.crossVectors(w, n).normalize();
                f.push(h.x, h.y, h.z);
                g.push(x, u)
            }
        }
        for (t = 0; t <
            c; t++)
            for (k = 0; k < b; k++) a = t * q + k + 1, h = (t + 1) * q + k + 1, l = (t + 1) * q + k, d.push(t * q + k, a, l), d.push(a, h, l);
        this.setIndex(d);
        this.addAttribute("position", new z(e, 3));
        this.addAttribute("normal", new z(f, 3));
        this.addAttribute("uv", new z(g, 2))
    }

    function Ic(a, b, c, d) {
        M.call(this);
        this.type = "PolyhedronGeometry";
        this.parameters = {
            vertices: a,
            indices: b,
            radius: c,
            detail: d
        };
        this.fromBufferGeometry(new ma(a, b, c, d));
        this.mergeVertices()
    }

    function ma(a, b, c, d) {
        function e(a) {
            h.push(a.x, a.y, a.z)
        }

        function f(b, c) {
            b *= 3;
            c.x = a[b + 0];
            c.y = a[b +
                1];
            c.z = a[b + 2]
        }

        function g(a, b, c, d) {
            0 > d && 1 === a.x && (l[b] = a.x - 1);
            0 === c.x && 0 === c.z && (l[b] = d / 2 / Math.PI + .5)
        }
        I.call(this);
        this.type = "PolyhedronBufferGeometry";
        this.parameters = {
            vertices: a,
            indices: b,
            radius: c,
            detail: d
        };
        c = c || 1;
        d = d || 0;
        var h = [],
            l = [];
        (function (a) {
            for (var c = new p, d = new p, g = new p, h = 0; h < b.length; h += 3) {
                f(b[h + 0], c);
                f(b[h + 1], d);
                f(b[h + 2], g);
                var l, m, k = c,
                    y = d,
                    v = g,
                    C = Math.pow(2, a),
                    F = [];
                for (m = 0; m <= C; m++) {
                    F[m] = [];
                    var N = k.clone().lerp(v, m / C),
                        O = y.clone().lerp(v, m / C),
                        G = C - m;
                    for (l = 0; l <= G; l++) F[m][l] = 0 === l && m === C ?
                        N : N.clone().lerp(O, l / G)
                }
                for (m = 0; m < C; m++)
                    for (l = 0; l < 2 * (C - m) - 1; l++) k = Math.floor(l / 2), 0 === l % 2 ? (e(F[m][k + 1]), e(F[m + 1][k]), e(F[m][k])) : (e(F[m][k + 1]), e(F[m + 1][k + 1]), e(F[m + 1][k]))
            }
        })(d);
        (function (a) {
            for (var b = new p, c = 0; c < h.length; c += 3) b.x = h[c + 0], b.y = h[c + 1], b.z = h[c + 2], b.normalize().multiplyScalar(a), h[c + 0] = b.x, h[c + 1] = b.y, h[c + 2] = b.z
        })(c);
        (function () {
            for (var a = new p, b = 0; b < h.length; b += 3) a.x = h[b + 0], a.y = h[b + 1], a.z = h[b + 2], l.push(Math.atan2(a.z, -a.x) / 2 / Math.PI + .5, 1 - (Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI +
                .5));
            a = new p;
            b = new p;
            for (var c = new p, d = new p, e = new A, f = new A, k = new A, x = 0, y = 0; x < h.length; x += 9, y += 6) {
                a.set(h[x + 0], h[x + 1], h[x + 2]);
                b.set(h[x + 3], h[x + 4], h[x + 5]);
                c.set(h[x + 6], h[x + 7], h[x + 8]);
                e.set(l[y + 0], l[y + 1]);
                f.set(l[y + 2], l[y + 3]);
                k.set(l[y + 4], l[y + 5]);
                d.copy(a).add(b).add(c).divideScalar(3);
                var v = Math.atan2(d.z, -d.x);
                g(e, y + 0, a, v);
                g(f, y + 2, b, v);
                g(k, y + 4, c, v)
            }
            for (a = 0; a < l.length; a += 6) b = l[a + 0], c = l[a + 2], d = l[a + 4], e = Math.min(b, c, d), .9 < Math.max(b, c, d) && .1 > e && (.2 > b && (l[a + 0] += 1), .2 > c && (l[a + 2] += 1), .2 > d && (l[a + 4] += 1))
        })();
        this.addAttribute("position", new z(h, 3));
        this.addAttribute("normal", new z(h.slice(), 3));
        this.addAttribute("uv", new z(l, 2));
        0 === d ? this.computeVertexNormals() : this.normalizeNormals()
    }

    function Jc(a, b) {
        M.call(this);
        this.type = "TetrahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        };
        this.fromBufferGeometry(new Wb(a, b));
        this.mergeVertices()
    }

    function Wb(a, b) {
        ma.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], a, b);
        this.type = "TetrahedronBufferGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function Kc(a, b) {
        M.call(this);
        this.type = "OctahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        };
        this.fromBufferGeometry(new sb(a, b));
        this.mergeVertices()
    }

    function sb(a, b) {
        ma.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], a, b);
        this.type = "OctahedronBufferGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function Lc(a, b) {
        M.call(this);
        this.type = "IcosahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        };
        this.fromBufferGeometry(new Xb(a, b));
        this.mergeVertices()
    }

    function Xb(a, b) {
        var c = (1 + Math.sqrt(5)) / 2;
        ma.call(this, [-1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, 0, 0, -1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, c, 0, -1, c, 0, 1, -c, 0, -1, -c, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], a, b);
        this.type = "IcosahedronBufferGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function Mc(a, b) {
        M.call(this);
        this.type = "DodecahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        };
        this.fromBufferGeometry(new Yb(a, b));
        this.mergeVertices()
    }

    function Yb(a, b) {
        var c = (1 + Math.sqrt(5)) / 2,
            d = 1 / c;
        ma.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -d, -c, 0, -d, c, 0, d, -c, 0, d, c, -d, -c, 0, -d, c, 0, d, -c, 0, d, c, 0, -c, 0, -d, c, 0, -d, -c, 0, d, c, 0, d], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], a, b);
        this.type = "DodecahedronBufferGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function Nc(a, b, c, d, e, f) {
        M.call(this);
        this.type = "TubeGeometry";
        this.parameters = {
            path: a,
            tubularSegments: b,
            radius: c,
            radialSegments: d,
            closed: e
        };
        void 0 !== f && console.warn("THREE.TubeGeometry: taper has been removed.");
        a = new Zb(a, b, c, d, e);
        this.tangents = a.tangents;
        this.normals = a.normals;
        this.binormals = a.binormals;
        this.fromBufferGeometry(a);
        this.mergeVertices()
    }

    function Zb(a, b, c, d, e) {
        function f(e) {
            w = a.getPointAt(e / b, w);
            var f = g.normals[e];
            e = g.binormals[e];
            for (k = 0; k <= d; k++) {
                var m =
                    k / d * Math.PI * 2,
                    n = Math.sin(m);
                m = -Math.cos(m);
                l.x = m * f.x + n * e.x;
                l.y = m * f.y + n * e.y;
                l.z = m * f.z + n * e.z;
                l.normalize();
                q.push(l.x, l.y, l.z);
                h.x = w.x + c * l.x;
                h.y = w.y + c * l.y;
                h.z = w.z + c * l.z;
                r.push(h.x, h.y, h.z)
            }
        }
        I.call(this);
        this.type = "TubeBufferGeometry";
        this.parameters = {
            path: a,
            tubularSegments: b,
            radius: c,
            radialSegments: d,
            closed: e
        };
        b = b || 64;
        c = c || 1;
        d = d || 8;
        e = e || !1;
        var g = a.computeFrenetFrames(b, e);
        this.tangents = g.tangents;
        this.normals = g.normals;
        this.binormals = g.binormals;
        var h = new p,
            l = new p,
            m = new A,
            w = new p,
            n, k, r = [],
            q = [],
            u = [],
            x = [];
        for (n = 0; n < b; n++) f(n);
        f(!1 === e ? b : 0);
        for (n = 0; n <= b; n++)
            for (k = 0; k <= d; k++) m.x = n / b, m.y = k / d, u.push(m.x, m.y);
        (function () {
            for (k = 1; k <= b; k++)
                for (n = 1; n <= d; n++) {
                    var a = (d + 1) * k + (n - 1),
                        c = (d + 1) * k + n,
                        e = (d + 1) * (k - 1) + n;
                    x.push((d + 1) * (k - 1) + (n - 1), a, e);
                    x.push(a, c, e)
                }
        })();
        this.setIndex(x);
        this.addAttribute("position", new z(r, 3));
        this.addAttribute("normal", new z(q, 3));
        this.addAttribute("uv", new z(u, 2))
    }

    function Oc(a, b, c, d, e, f, g) {
        M.call(this);
        this.type = "TorusKnotGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            tubularSegments: c,
            radialSegments: d,
            p: e,
            q: f
        };
        void 0 !== g && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.");
        this.fromBufferGeometry(new $b(a, b, c, d, e, f));
        this.mergeVertices()
    }

    function $b(a, b, c, d, e, f) {
        function g(a, b, c, d, e) {
            var f = Math.sin(a);
            b = c / b * a;
            c = Math.cos(b);
            e.x = d * (2 + c) * .5 * Math.cos(a);
            e.y = d * (2 + c) * f * .5;
            e.z = d * Math.sin(b) * .5
        }
        I.call(this);
        this.type = "TorusKnotBufferGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            tubularSegments: c,
            radialSegments: d,
            p: e,
            q: f
        };
        a = a || 1;
        b = b || .4;
        c = Math.floor(c) || 64;
        d = Math.floor(d) || 8;
        e = e || 2;
        f = f || 3;
        var h = [],
            l = [],
            m = [],
            w = [],
            n, k = new p,
            r = new p,
            q = new p,
            u = new p,
            x = new p,
            y = new p,
            v = new p;
        for (n = 0; n <= c; ++n) {
            var C = n / c * e * Math.PI * 2;
            g(C, e, f, a, q);
            g(C + .01, e, f, a, u);
            y.subVectors(u, q);
            v.addVectors(u, q);
            x.crossVectors(y, v);
            v.crossVectors(x, y);
            x.normalize();
            v.normalize();
            for (C = 0; C <= d; ++C) {
                var F = C / d * Math.PI * 2,
                    N = -b * Math.cos(F);
                F = b * Math.sin(F);
                k.x = q.x + (N * v.x + F * x.x);
                k.y = q.y + (N * v.y + F * x.y);
                k.z = q.z + (N * v.z + F * x.z);
                l.push(k.x, k.y, k.z);
                r.subVectors(k, q).normalize();
                m.push(r.x,
                    r.y, r.z);
                w.push(n / c);
                w.push(C / d)
            }
        }
        for (C = 1; C <= c; C++)
            for (n = 1; n <= d; n++) a = (d + 1) * C + (n - 1), b = (d + 1) * C + n, e = (d + 1) * (C - 1) + n, h.push((d + 1) * (C - 1) + (n - 1), a, e), h.push(a, b, e);
        this.setIndex(h);
        this.addAttribute("position", new z(l, 3));
        this.addAttribute("normal", new z(m, 3));
        this.addAttribute("uv", new z(w, 2))
    }

    function Pc(a, b, c, d, e) {
        M.call(this);
        this.type = "TorusGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            radialSegments: c,
            tubularSegments: d,
            arc: e
        };
        this.fromBufferGeometry(new ac(a, b, c, d, e));
        this.mergeVertices()
    }

    function ac(a,
        b, c, d, e) {
        I.call(this);
        this.type = "TorusBufferGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            radialSegments: c,
            tubularSegments: d,
            arc: e
        };
        a = a || 1;
        b = b || .4;
        c = Math.floor(c) || 8;
        d = Math.floor(d) || 6;
        e = e || 2 * Math.PI;
        var f = [],
            g = [],
            h = [],
            l = [],
            m = new p,
            w = new p,
            n = new p,
            k, r;
        for (k = 0; k <= c; k++)
            for (r = 0; r <= d; r++) {
                var q = r / d * e,
                    u = k / c * Math.PI * 2;
                w.x = (a + b * Math.cos(u)) * Math.cos(q);
                w.y = (a + b * Math.cos(u)) * Math.sin(q);
                w.z = b * Math.sin(u);
                g.push(w.x, w.y, w.z);
                m.x = a * Math.cos(q);
                m.y = a * Math.sin(q);
                n.subVectors(w, m).normalize();
                h.push(n.x, n.y, n.z);
                l.push(r / d);
                l.push(k / c)
            }
        for (k = 1; k <= c; k++)
            for (r = 1; r <= d; r++) a = (d + 1) * (k - 1) + r - 1, b = (d + 1) * (k - 1) + r, e = (d + 1) * k + r, f.push((d + 1) * k + r - 1, a, e), f.push(a, b, e);
        this.setIndex(f);
        this.addAttribute("position", new z(g, 3));
        this.addAttribute("normal", new z(h, 3));
        this.addAttribute("uv", new z(l, 2))
    }

    function Xe(a, b, c, d, e) {
        for (var f, g = 0, h = b, l = c - d; h < c; h += d) g += (a[l] - a[h]) * (a[h + 1] + a[l + 1]), l = h;
        if (e === 0 < g)
            for (e = b; e < c; e += d) f = Ye(e, a[e], a[e + 1], f);
        else
            for (e = c - d; e >= b; e -= d) f = Ye(e, a[e], a[e + 1], f);
        f && tb(f, f.next) && (Qc(f), f = f.next);
        return f
    }

    function Rc(a, b) {
        if (!a) return a;
        b || (b = a);
        do {
            var c = !1;
            if (a.steiner || !tb(a, a.next) && 0 !== sa(a.prev, a, a.next)) a = a.next;
            else {
                Qc(a);
                a = b = a.prev;
                if (a === a.next) break;
                c = !0
            }
        } while (c || a !== b);
        return b
    }

    function Sc(a, b, c, d, e, f, g) {
        if (a) {
            if (!g && f) {
                var h = a,
                    l = h;
                do null === l.z && (l.z = Zd(l.x, l.y, d, e, f)), l.prevZ = l.prev, l = l.nextZ = l.next; while (l !== h);
                l.prevZ.nextZ = null;
                l.prevZ = null;
                h = l;
                var m, w, n, k, r = 1;
                do {
                    l = h;
                    var q = h = null;
                    for (w = 0; l;) {
                        w++;
                        var p = l;
                        for (m = n = 0; m < r && (n++, p = p.nextZ, p); m++);
                        for (k = r; 0 < n || 0 < k && p;) 0 !== n && (0 === k || !p ||
                            l.z <= p.z) ? (m = l, l = l.nextZ, n--) : (m = p, p = p.nextZ, k--), q ? q.nextZ = m : h = m, m.prevZ = q, q = m;
                        l = p
                    }
                    q.nextZ = null;
                    r *= 2
                } while (1 < w)
            }
            for (h = a; a.prev !== a.next;) {
                l = a.prev;
                p = a.next;
                if (f) a: {
                    q = a;k = d;
                    var x = e,
                        y = f;w = q.prev;n = q;r = q.next;
                    if (0 <= sa(w, n, r)) q = !1;
                    else {
                        var v = w.x > n.x ? w.x > r.x ? w.x : r.x : n.x > r.x ? n.x : r.x,
                            C = w.y > n.y ? w.y > r.y ? w.y : r.y : n.y > r.y ? n.y : r.y;
                        m = Zd(w.x < n.x ? w.x < r.x ? w.x : r.x : n.x < r.x ? n.x : r.x, w.y < n.y ? w.y < r.y ? w.y : r.y : n.y < r.y ? n.y : r.y, k, x, y);
                        k = Zd(v, C, k, x, y);
                        for (x = q.nextZ; x && x.z <= k;) {
                            if (x !== q.prev && x !== q.next && wd(w.x, w.y, n.x, n.y,
                                    r.x, r.y, x.x, x.y) && 0 <= sa(x.prev, x, x.next)) {
                                q = !1;
                                break a
                            }
                            x = x.nextZ
                        }
                        for (x = q.prevZ; x && x.z >= m;) {
                            if (x !== q.prev && x !== q.next && wd(w.x, w.y, n.x, n.y, r.x, r.y, x.x, x.y) && 0 <= sa(x.prev, x, x.next)) {
                                q = !1;
                                break a
                            }
                            x = x.prevZ
                        }
                        q = !0
                    }
                }
                else a: if (q = a, w = q.prev, n = q, r = q.next, 0 <= sa(w, n, r)) q = !1;
                    else {
                        for (m = q.next.next; m !== q.prev;) {
                            if (wd(w.x, w.y, n.x, n.y, r.x, r.y, m.x, m.y) && 0 <= sa(m.prev, m, m.next)) {
                                q = !1;
                                break a
                            }
                            m = m.next
                        }
                        q = !0
                    } if (q) b.push(l.i / c), b.push(a.i / c), b.push(p.i / c), Qc(a), h = a = p.next;
                else if (a = p, a === h) {
                    if (!g) Sc(Rc(a), b, c, d, e, f, 1);
                    else if (1 ===
                        g) {
                        g = b;
                        h = c;
                        l = a;
                        do p = l.prev, q = l.next.next, !tb(p, q) && Ze(p, l, l.next, q) && Tc(p, q) && Tc(q, p) && (g.push(p.i / h), g.push(l.i / h), g.push(q.i / h), Qc(l), Qc(l.next), l = a = q), l = l.next; while (l !== a);
                        a = l;
                        Sc(a, b, c, d, e, f, 2)
                    } else if (2 === g) a: {
                        g = a;do {
                            for (h = g.next.next; h !== g.prev;) {
                                if (l = g.i !== h.i) {
                                    l = g;
                                    p = h;
                                    if (q = l.next.i !== p.i && l.prev.i !== p.i) {
                                        b: {
                                            q = l;do {
                                                if (q.i !== l.i && q.next.i !== l.i && q.i !== p.i && q.next.i !== p.i && Ze(q, q.next, l, p)) {
                                                    q = !0;
                                                    break b
                                                }
                                                q = q.next
                                            } while (q !== l);q = !1
                                        }
                                        q = !q
                                    }
                                    if (q = q && Tc(l, p) && Tc(p, l)) {
                                        q = l;
                                        w = !1;
                                        n = (l.x + p.x) / 2;
                                        p = (l.y + p.y) /
                                            2;
                                        do q.y > p !== q.next.y > p && q.next.y !== q.y && n < (q.next.x - q.x) * (p - q.y) / (q.next.y - q.y) + q.x && (w = !w), q = q.next; while (q !== l);
                                        q = w
                                    }
                                    l = q
                                }
                                if (l) {
                                    a = $e(g, h);
                                    g = Rc(g, g.next);
                                    a = Rc(a, a.next);
                                    Sc(g, b, c, d, e, f);
                                    Sc(a, b, c, d, e, f);
                                    break a
                                }
                                h = h.next
                            }
                            g = g.next
                        } while (g !== a)
                    }
                    break
                }
            }
        }
    }

    function Hg(a, b) {
        return a.x - b.x
    }

    function Ig(a, b) {
        var c = b,
            d = a.x,
            e = a.y,
            f = -Infinity;
        do {
            if (e <= c.y && e >= c.next.y && c.next.y !== c.y) {
                var g = c.x + (e - c.y) * (c.next.x - c.x) / (c.next.y - c.y);
                if (g <= d && g > f) {
                    f = g;
                    if (g === d) {
                        if (e === c.y) return c;
                        if (e === c.next.y) return c.next
                    }
                    var h =
                        c.x < c.next.x ? c : c.next
                }
            }
            c = c.next
        } while (c !== b);
        if (!h) return null;
        if (d === f) return h.prev;
        b = h;
        g = h.x;
        var l = h.y,
            m = Infinity;
        for (c = h.next; c !== b;) {
            if (d >= c.x && c.x >= g && d !== c.x && wd(e < l ? d : f, e, g, l, e < l ? f : d, e, c.x, c.y)) {
                var k = Math.abs(e - c.y) / (d - c.x);
                (k < m || k === m && c.x > h.x) && Tc(c, a) && (h = c, m = k)
            }
            c = c.next
        }
        return h
    }

    function Zd(a, b, c, d, e) {
        a = 32767 * (a - c) * e;
        b = 32767 * (b - d) * e;
        a = (a | a << 8) & 16711935;
        a = (a | a << 4) & 252645135;
        a = (a | a << 2) & 858993459;
        b = (b | b << 8) & 16711935;
        b = (b | b << 4) & 252645135;
        b = (b | b << 2) & 858993459;
        return (a | a << 1) & 1431655765 | ((b |
            b << 1) & 1431655765) << 1
    }

    function Jg(a) {
        var b = a,
            c = a;
        do b.x < c.x && (c = b), b = b.next; while (b !== a);
        return c
    }

    function wd(a, b, c, d, e, f, g, h) {
        return 0 <= (e - g) * (b - h) - (a - g) * (f - h) && 0 <= (a - g) * (d - h) - (c - g) * (b - h) && 0 <= (c - g) * (f - h) - (e - g) * (d - h)
    }

    function sa(a, b, c) {
        return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
    }

    function tb(a, b) {
        return a.x === b.x && a.y === b.y
    }

    function Ze(a, b, c, d) {
        return tb(a, b) && tb(c, d) || tb(a, d) && tb(c, b) ? !0 : 0 < sa(a, b, c) !== 0 < sa(a, b, d) && 0 < sa(c, d, a) !== 0 < sa(c, d, b)
    }

    function Tc(a, b) {
        return 0 > sa(a.prev, a, a.next) ? 0 <= sa(a, b,
            a.next) && 0 <= sa(a, a.prev, b) : 0 > sa(a, b, a.prev) || 0 > sa(a, a.next, b)
    }

    function $e(a, b) {
        var c = new $d(a.i, a.x, a.y),
            d = new $d(b.i, b.x, b.y),
            e = a.next,
            f = b.prev;
        a.next = b;
        b.prev = a;
        c.next = e;
        e.prev = c;
        d.next = c;
        c.prev = d;
        f.next = d;
        d.prev = f;
        return d
    }

    function Ye(a, b, c, d) {
        a = new $d(a, b, c);
        d ? (a.next = d.next, a.prev = d, d.next.prev = a, d.next = a) : (a.prev = a, a.next = a);
        return a
    }

    function Qc(a) {
        a.next.prev = a.prev;
        a.prev.next = a.next;
        a.prevZ && (a.prevZ.nextZ = a.nextZ);
        a.nextZ && (a.nextZ.prevZ = a.prevZ)
    }

    function $d(a, b, c) {
        this.i = a;
        this.x = b;
        this.y =
            c;
        this.nextZ = this.prevZ = this.z = this.next = this.prev = null;
        this.steiner = !1
    }

    function af(a) {
        var b = a.length;
        2 < b && a[b - 1].equals(a[0]) && a.pop()
    }

    function bf(a, b) {
        for (var c = 0; c < b.length; c++) a.push(b[c].x), a.push(b[c].y)
    }

    function bc(a, b) {
        M.call(this);
        this.type = "ExtrudeGeometry";
        this.parameters = {
            shapes: a,
            options: b
        };
        this.fromBufferGeometry(new Xa(a, b));
        this.mergeVertices()
    }

    function Xa(a, b) {
        function c(a) {
            function c(a, b, c) {
                b || console.error("THREE.ExtrudeGeometry: vec does not exist");
                return b.clone().multiplyScalar(c).add(a)
            }

            function g(a, b, c) {
                var d = a.x - b.x;
                var e = a.y - b.y;
                var f = c.x - a.x;
                var g = c.y - a.y,
                    h = d * d + e * e;
                if (Math.abs(d * g - e * f) > Number.EPSILON) {
                    var l = Math.sqrt(h),
                        m = Math.sqrt(f * f + g * g);
                    h = b.x - e / l;
                    b = b.y + d / l;
                    g = ((c.x - g / m - h) * g - (c.y + f / m - b) * f) / (d * g - e * f);
                    f = h + d * g - a.x;
                    d = b + e * g - a.y;
                    e = f * f + d * d;
                    if (2 >= e) return new A(f, d);
                    e = Math.sqrt(e / 2)
                } else a = !1, d > Number.EPSILON ? f > Number.EPSILON && (a = !0) : d < -Number.EPSILON ? f < -Number.EPSILON && (a = !0) : Math.sign(e) === Math.sign(g) && (a = !0), a ? (f = -e, e = Math.sqrt(h)) : (f = d, d = e, e = Math.sqrt(h / 2));
                return new A(f / e, d /
                    e)
            }

            function h(a, b) {
                for (P = a.length; 0 <= --P;) {
                    var c = P;
                    var f = P - 1;
                    0 > f && (f = a.length - 1);
                    var g, h = v + 2 * G;
                    for (g = 0; g < h; g++) {
                        var l = Y * g,
                            m = Y * (g + 1),
                            n = b + f + l,
                            k = b + f + m;
                        m = b + c + m;
                        q(b + c + l);
                        q(n);
                        q(m);
                        q(n);
                        q(k);
                        q(m);
                        l = e.length / 3;
                        l = B.generateSideWallUV(d, e, l - 6, l - 3, l - 2, l - 1);
                        u(l[0]);
                        u(l[1]);
                        u(l[3]);
                        u(l[1]);
                        u(l[2]);
                        u(l[3])
                    }
                }
            }

            function l(a, b, c) {
                x.push(a);
                x.push(b);
                x.push(c)
            }

            function k(a, b, c) {
                q(a);
                q(b);
                q(c);
                a = e.length / 3;
                a = B.generateTopUV(d, e, a - 3, a - 2, a - 1);
                u(a[0]);
                u(a[1]);
                u(a[2])
            }

            function q(a) {
                e.push(x[3 * a]);
                e.push(x[3 * a + 1]);
                e.push(x[3 *
                    a + 2])
            }

            function u(a) {
                f.push(a.x);
                f.push(a.y)
            }
            var x = [],
                y = void 0 !== b.curveSegments ? b.curveSegments : 12,
                v = void 0 !== b.steps ? b.steps : 1,
                C = void 0 !== b.amount ? b.amount : 100,
                F = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
                N = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
                O = void 0 !== b.bevelSize ? b.bevelSize : N - 2,
                G = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
                z = b.extrudePath,
                B = void 0 !== b.UVGenerator ? b.UVGenerator : Kg,
                D = !1;
            if (z) {
                var T = z.getSpacedPoints(v);
                D = !0;
                F = !1;
                var I = z.computeFrenetFrames(v, !1);
                var L = new p;
                var J = new p;
                var M =
                    new p
            }
            F || (O = N = G = 0);
            var K;
            y = a.extractPoints(y);
            a = y.shape;
            var Q = y.holes;
            if (!Ya.isClockWise(a)) {
                a = a.reverse();
                var H = 0;
                for (K = Q.length; H < K; H++) {
                    var R = Q[H];
                    Ya.isClockWise(R) && (Q[H] = R.reverse())
                }
            }
            var W = Ya.triangulateShape(a, Q),
                X = a;
            H = 0;
            for (K = Q.length; H < K; H++) R = Q[H], a = a.concat(R);
            var S, Y = a.length,
                ba, U = W.length;
            y = [];
            var P = 0;
            var Z = X.length;
            var V = Z - 1;
            for (S = P + 1; P < Z; P++, V++, S++) V === Z && (V = 0), S === Z && (S = 0), y[P] = g(X[P], X[V], X[S]);
            z = [];
            var da = y.concat();
            H = 0;
            for (K = Q.length; H < K; H++) {
                R = Q[H];
                var ca = [];
                P = 0;
                Z = R.length;
                V =
                    Z - 1;
                for (S = P + 1; P < Z; P++, V++, S++) V === Z && (V = 0), S === Z && (S = 0), ca[P] = g(R[P], R[V], R[S]);
                z.push(ca);
                da = da.concat(ca)
            }
            for (V = 0; V < G; V++) {
                Z = V / G;
                var ea = N * Math.cos(Z * Math.PI / 2);
                S = O * Math.sin(Z * Math.PI / 2);
                P = 0;
                for (Z = X.length; P < Z; P++) {
                    var fa = c(X[P], y[P], S);
                    l(fa.x, fa.y, -ea)
                }
                H = 0;
                for (K = Q.length; H < K; H++)
                    for (R = Q[H], ca = z[H], P = 0, Z = R.length; P < Z; P++) fa = c(R[P], ca[P], S), l(fa.x, fa.y, -ea)
            }
            S = O;
            for (P = 0; P < Y; P++) fa = F ? c(a[P], da[P], S) : a[P], D ? (J.copy(I.normals[0]).multiplyScalar(fa.x), L.copy(I.binormals[0]).multiplyScalar(fa.y), M.copy(T[0]).add(J).add(L),
                l(M.x, M.y, M.z)) : l(fa.x, fa.y, 0);
            for (Z = 1; Z <= v; Z++)
                for (P = 0; P < Y; P++) fa = F ? c(a[P], da[P], S) : a[P], D ? (J.copy(I.normals[Z]).multiplyScalar(fa.x), L.copy(I.binormals[Z]).multiplyScalar(fa.y), M.copy(T[Z]).add(J).add(L), l(M.x, M.y, M.z)) : l(fa.x, fa.y, C / v * Z);
            for (V = G - 1; 0 <= V; V--) {
                Z = V / G;
                ea = N * Math.cos(Z * Math.PI / 2);
                S = O * Math.sin(Z * Math.PI / 2);
                P = 0;
                for (Z = X.length; P < Z; P++) fa = c(X[P], y[P], S), l(fa.x, fa.y, C + ea);
                H = 0;
                for (K = Q.length; H < K; H++)
                    for (R = Q[H], ca = z[H], P = 0, Z = R.length; P < Z; P++) fa = c(R[P], ca[P], S), D ? l(fa.x, fa.y + T[v - 1].y, T[v - 1].x +
                        ea) : l(fa.x, fa.y, C + ea)
            }(function () {
                var a = e.length / 3;
                if (F) {
                    var b = 0 * Y;
                    for (P = 0; P < U; P++) ba = W[P], k(ba[2] + b, ba[1] + b, ba[0] + b);
                    b = Y * (v + 2 * G);
                    for (P = 0; P < U; P++) ba = W[P], k(ba[0] + b, ba[1] + b, ba[2] + b)
                } else {
                    for (P = 0; P < U; P++) ba = W[P], k(ba[2], ba[1], ba[0]);
                    for (P = 0; P < U; P++) ba = W[P], k(ba[0] + Y * v, ba[1] + Y * v, ba[2] + Y * v)
                }
                d.addGroup(a, e.length / 3 - a, 0)
            })();
            (function () {
                var a = e.length / 3,
                    b = 0;
                h(X, b);
                b += X.length;
                H = 0;
                for (K = Q.length; H < K; H++) R = Q[H], h(R, b), b += R.length;
                d.addGroup(a, e.length / 3 - a, 1)
            })()
        }
        I.call(this);
        this.type = "ExtrudeBufferGeometry";
        this.parameters = {
            shapes: a,
            options: b
        };
        a = Array.isArray(a) ? a : [a];
        for (var d = this, e = [], f = [], g = 0, h = a.length; g < h; g++) c(a[g], b);
        this.addAttribute("position", new z(e, 3));
        this.addAttribute("uv", new z(f, 2));
        this.computeVertexNormals()
    }

    function Uc(a, b) {
        M.call(this);
        this.type = "TextGeometry";
        this.parameters = {
            text: a,
            parameters: b
        };
        this.fromBufferGeometry(new cc(a, b));
        this.mergeVertices()
    }

    function cc(a, b) {
        b = b || {};
        var c = b.font;
        if (!c || !c.isFont) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),
            new M;
        a = c.generateShapes(a, b.size, b.curveSegments);
        b.amount = void 0 !== b.height ? b.height : 50;
        void 0 === b.bevelThickness && (b.bevelThickness = 10);
        void 0 === b.bevelSize && (b.bevelSize = 8);
        void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
        Xa.call(this, a, b);
        this.type = "TextBufferGeometry"
    }

    function Vc(a, b, c, d, e, f, g) {
        M.call(this);
        this.type = "SphereGeometry";
        this.parameters = {
            radius: a,
            widthSegments: b,
            heightSegments: c,
            phiStart: d,
            phiLength: e,
            thetaStart: f,
            thetaLength: g
        };
        this.fromBufferGeometry(new ub(a, b, c, d, e, f, g));
        this.mergeVertices()
    }

    function ub(a, b, c, d, e, f, g) {
        I.call(this);
        this.type = "SphereBufferGeometry";
        this.parameters = {
            radius: a,
            widthSegments: b,
            heightSegments: c,
            phiStart: d,
            phiLength: e,
            thetaStart: f,
            thetaLength: g
        };
        a = a || 1;
        b = Math.max(3, Math.floor(b) || 8);
        c = Math.max(2, Math.floor(c) || 6);
        d = void 0 !== d ? d : 0;
        e = void 0 !== e ? e : 2 * Math.PI;
        f = void 0 !== f ? f : 0;
        g = void 0 !== g ? g : Math.PI;
        var h = f + g,
            l, m, k = 0,
            n = [],
            t = new p,
            r = new p,
            q = [],
            u = [],
            x = [],
            y = [];
        for (m = 0; m <= c; m++) {
            var v = [],
                C = m / c;
            for (l = 0; l <= b; l++) {
                var F = l / b;
                t.x = -a * Math.cos(d + F * e) * Math.sin(f + C * g);
                t.y = a * Math.cos(f +
                    C * g);
                t.z = a * Math.sin(d + F * e) * Math.sin(f + C * g);
                u.push(t.x, t.y, t.z);
                r.set(t.x, t.y, t.z).normalize();
                x.push(r.x, r.y, r.z);
                y.push(F, 1 - C);
                v.push(k++)
            }
            n.push(v)
        }
        for (m = 0; m < c; m++)
            for (l = 0; l < b; l++) a = n[m][l + 1], d = n[m][l], e = n[m + 1][l], g = n[m + 1][l + 1], (0 !== m || 0 < f) && q.push(a, d, g), (m !== c - 1 || h < Math.PI) && q.push(d, e, g);
        this.setIndex(q);
        this.addAttribute("position", new z(u, 3));
        this.addAttribute("normal", new z(x, 3));
        this.addAttribute("uv", new z(y, 2))
    }

    function Wc(a, b, c, d, e, f) {
        M.call(this);
        this.type = "RingGeometry";
        this.parameters = {
            innerRadius: a,
            outerRadius: b,
            thetaSegments: c,
            phiSegments: d,
            thetaStart: e,
            thetaLength: f
        };
        this.fromBufferGeometry(new dc(a, b, c, d, e, f));
        this.mergeVertices()
    }

    function dc(a, b, c, d, e, f) {
        I.call(this);
        this.type = "RingBufferGeometry";
        this.parameters = {
            innerRadius: a,
            outerRadius: b,
            thetaSegments: c,
            phiSegments: d,
            thetaStart: e,
            thetaLength: f
        };
        a = a || .5;
        b = b || 1;
        e = void 0 !== e ? e : 0;
        f = void 0 !== f ? f : 2 * Math.PI;
        c = void 0 !== c ? Math.max(3, c) : 8;
        d = void 0 !== d ? Math.max(1, d) : 1;
        var g = [],
            h = [],
            l = [],
            m = [],
            k = a,
            n = (b - a) / d,
            t = new p,
            r = new A,
            q, u;
        for (q =
            0; q <= d; q++) {
            for (u = 0; u <= c; u++) a = e + u / c * f, t.x = k * Math.cos(a), t.y = k * Math.sin(a), h.push(t.x, t.y, t.z), l.push(0, 0, 1), r.x = (t.x / b + 1) / 2, r.y = (t.y / b + 1) / 2, m.push(r.x, r.y);
            k += n
        }
        for (q = 0; q < d; q++)
            for (b = q * (c + 1), u = 0; u < c; u++) a = u + b, e = a + c + 1, f = a + c + 2, k = a + 1, g.push(a, e, k), g.push(e, f, k);
        this.setIndex(g);
        this.addAttribute("position", new z(h, 3));
        this.addAttribute("normal", new z(l, 3));
        this.addAttribute("uv", new z(m, 2))
    }

    function Xc(a, b, c, d) {
        M.call(this);
        this.type = "LatheGeometry";
        this.parameters = {
            points: a,
            segments: b,
            phiStart: c,
            phiLength: d
        };
        this.fromBufferGeometry(new ec(a, b, c, d));
        this.mergeVertices()
    }

    function ec(a, b, c, d) {
        I.call(this);
        this.type = "LatheBufferGeometry";
        this.parameters = {
            points: a,
            segments: b,
            phiStart: c,
            phiLength: d
        };
        b = Math.floor(b) || 12;
        c = c || 0;
        d = d || 2 * Math.PI;
        d = R.clamp(d, 0, 2 * Math.PI);
        var e = [],
            f = [],
            g = [],
            h = 1 / b,
            l = new p,
            m = new A,
            k;
        for (k = 0; k <= b; k++) {
            var n = c + k * h * d;
            var t = Math.sin(n),
                r = Math.cos(n);
            for (n = 0; n <= a.length - 1; n++) l.x = a[n].x * t, l.y = a[n].y, l.z = a[n].x * r, f.push(l.x, l.y, l.z), m.x = k / b, m.y = n / (a.length - 1), g.push(m.x, m.y)
        }
        for (k = 0; k < b; k++)
            for (n =
                0; n < a.length - 1; n++) c = n + k * a.length, h = c + a.length, l = c + a.length + 1, m = c + 1, e.push(c, h, m), e.push(h, l, m);
        this.setIndex(e);
        this.addAttribute("position", new z(f, 3));
        this.addAttribute("uv", new z(g, 2));
        this.computeVertexNormals();
        if (d === 2 * Math.PI)
            for (d = this.attributes.normal.array, e = new p, f = new p, g = new p, c = b * a.length * 3, n = k = 0; k < a.length; k++, n += 3) e.x = d[n + 0], e.y = d[n + 1], e.z = d[n + 2], f.x = d[c + n + 0], f.y = d[c + n + 1], f.z = d[c + n + 2], g.addVectors(e, f).normalize(), d[n + 0] = d[c + n + 0] = g.x, d[n + 1] = d[c + n + 1] = g.y, d[n + 2] = d[c + n + 2] = g.z
    }

    function vb(a,
        b) {
        M.call(this);
        this.type = "ShapeGeometry";
        "object" === typeof b && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), b = b.curveSegments);
        this.parameters = {
            shapes: a,
            curveSegments: b
        };
        this.fromBufferGeometry(new wb(a, b));
        this.mergeVertices()
    }

    function wb(a, b) {
        function c(a) {
            var c, h = e.length / 3;
            a = a.extractPoints(b);
            var m = a.shape,
                k = a.holes;
            if (!1 === Ya.isClockWise(m))
                for (m = m.reverse(), a = 0, c = k.length; a < c; a++) {
                    var w = k[a];
                    !0 === Ya.isClockWise(w) && (k[a] = w.reverse())
                }
            var p = Ya.triangulateShape(m,
                k);
            a = 0;
            for (c = k.length; a < c; a++) w = k[a], m = m.concat(w);
            a = 0;
            for (c = m.length; a < c; a++) w = m[a], e.push(w.x, w.y, 0), f.push(0, 0, 1), g.push(w.x, w.y);
            a = 0;
            for (c = p.length; a < c; a++) m = p[a], d.push(m[0] + h, m[1] + h, m[2] + h), l += 3
        }
        I.call(this);
        this.type = "ShapeBufferGeometry";
        this.parameters = {
            shapes: a,
            curveSegments: b
        };
        b = b || 12;
        var d = [],
            e = [],
            f = [],
            g = [],
            h = 0,
            l = 0;
        if (!1 === Array.isArray(a)) c(a);
        else
            for (var m = 0; m < a.length; m++) c(a[m]), this.addGroup(h, l, m), h += l, l = 0;
        this.setIndex(d);
        this.addAttribute("position", new z(e, 3));
        this.addAttribute("normal",
            new z(f, 3));
        this.addAttribute("uv", new z(g, 2))
    }

    function cf(a, b) {
        b.shapes = [];
        if (Array.isArray(a))
            for (var c = 0, d = a.length; c < d; c++) b.shapes.push(a[c].uuid);
        else b.shapes.push(a.uuid);
        return b
    }

    function fc(a, b) {
        I.call(this);
        this.type = "EdgesGeometry";
        this.parameters = {
            thresholdAngle: b
        };
        var c = [];
        b = Math.cos(R.DEG2RAD * (void 0 !== b ? b : 1));
        var d = [0, 0],
            e = {},
            f = ["a", "b", "c"];
        if (a.isBufferGeometry) {
            var g = new M;
            g.fromBufferGeometry(a)
        } else g = a.clone();
        g.mergeVertices();
        g.computeFaceNormals();
        a = g.vertices;
        g = g.faces;
        for (var h =
                0, l = g.length; h < l; h++)
            for (var m = g[h], k = 0; 3 > k; k++) {
                var n = m[f[k]];
                var t = m[f[(k + 1) % 3]];
                d[0] = Math.min(n, t);
                d[1] = Math.max(n, t);
                n = d[0] + "," + d[1];
                void 0 === e[n] ? e[n] = {
                    index1: d[0],
                    index2: d[1],
                    face1: h,
                    face2: void 0
                } : e[n].face2 = h
            }
        for (n in e)
            if (d = e[n], void 0 === d.face2 || g[d.face1].normal.dot(g[d.face2].normal) <= b) f = a[d.index1], c.push(f.x, f.y, f.z), f = a[d.index2], c.push(f.x, f.y, f.z);
        this.addAttribute("position", new z(c, 3))
    }

    function xb(a, b, c, d, e, f, g, h) {
        M.call(this);
        this.type = "CylinderGeometry";
        this.parameters = {
            radiusTop: a,
            radiusBottom: b,
            height: c,
            radialSegments: d,
            heightSegments: e,
            openEnded: f,
            thetaStart: g,
            thetaLength: h
        };
        this.fromBufferGeometry(new Za(a, b, c, d, e, f, g, h));
        this.mergeVertices()
    }

    function Za(a, b, c, d, e, f, g, h) {
        function l(c) {
            var e, f = new A,
                l = new p,
                w = 0,
                u = !0 === c ? a : b,
                v = !0 === c ? 1 : -1;
            var z = q;
            for (e = 1; e <= d; e++) n.push(0, x * v, 0), t.push(0, v, 0), r.push(.5, .5), q++;
            var B = q;
            for (e = 0; e <= d; e++) {
                var D = e / d * h + g,
                    H = Math.cos(D);
                D = Math.sin(D);
                l.x = u * D;
                l.y = x * v;
                l.z = u * H;
                n.push(l.x, l.y, l.z);
                t.push(0, v, 0);
                f.x = .5 * H + .5;
                f.y = .5 * D * v + .5;
                r.push(f.x, f.y);
                q++
            }
            for (e = 0; e < d; e++) f = z + e, l = B + e, !0 === c ? k.push(l, l + 1, f) : k.push(l + 1, l, f), w += 3;
            m.addGroup(y, w, !0 === c ? 1 : 2);
            y += w
        }
        I.call(this);
        this.type = "CylinderBufferGeometry";
        this.parameters = {
            radiusTop: a,
            radiusBottom: b,
            height: c,
            radialSegments: d,
            heightSegments: e,
            openEnded: f,
            thetaStart: g,
            thetaLength: h
        };
        var m = this;
        a = void 0 !== a ? a : 1;
        b = void 0 !== b ? b : 1;
        c = c || 1;
        d = Math.floor(d) || 8;
        e = Math.floor(e) || 1;
        f = void 0 !== f ? f : !1;
        g = void 0 !== g ? g : 0;
        h = void 0 !== h ? h : 2 * Math.PI;
        var k = [],
            n = [],
            t = [],
            r = [],
            q = 0,
            u = [],
            x = c / 2,
            y = 0;
        (function () {
            var f, l, w = new p,
                N = new p,
                O = 0,
                G = (b - a) / c;
            for (l = 0; l <= e; l++) {
                var z = [],
                    A = l / e,
                    B = A * (b - a) + a;
                for (f = 0; f <= d; f++) {
                    var D = f / d,
                        H = D * h + g,
                        I = Math.sin(H);
                    H = Math.cos(H);
                    N.x = B * I;
                    N.y = -A * c + x;
                    N.z = B * H;
                    n.push(N.x, N.y, N.z);
                    w.set(I, G, H).normalize();
                    t.push(w.x, w.y, w.z);
                    r.push(D, 1 - A);
                    z.push(q++)
                }
                u.push(z)
            }
            for (f = 0; f < d; f++)
                for (l = 0; l < e; l++) w = u[l + 1][f], N = u[l + 1][f + 1], G = u[l][f + 1], k.push(u[l][f], w, G), k.push(w, N, G), O += 6;
            m.addGroup(y, O, 0);
            y += O
        })();
        !1 === f && (0 < a && l(!0), 0 < b && l(!1));
        this.setIndex(k);
        this.addAttribute("position", new z(n, 3));
        this.addAttribute("normal",
            new z(t, 3));
        this.addAttribute("uv", new z(r, 2))
    }

    function Yc(a, b, c, d, e, f, g) {
        xb.call(this, 0, a, b, c, d, e, f, g);
        this.type = "ConeGeometry";
        this.parameters = {
            radius: a,
            height: b,
            radialSegments: c,
            heightSegments: d,
            openEnded: e,
            thetaStart: f,
            thetaLength: g
        }
    }

    function Zc(a, b, c, d, e, f, g) {
        Za.call(this, 0, a, b, c, d, e, f, g);
        this.type = "ConeBufferGeometry";
        this.parameters = {
            radius: a,
            height: b,
            radialSegments: c,
            heightSegments: d,
            openEnded: e,
            thetaStart: f,
            thetaLength: g
        }
    }

    function $c(a, b, c, d) {
        M.call(this);
        this.type = "CircleGeometry";
        this.parameters = {
            radius: a,
            segments: b,
            thetaStart: c,
            thetaLength: d
        };
        this.fromBufferGeometry(new gc(a, b, c, d));
        this.mergeVertices()
    }

    function gc(a, b, c, d) {
        I.call(this);
        this.type = "CircleBufferGeometry";
        this.parameters = {
            radius: a,
            segments: b,
            thetaStart: c,
            thetaLength: d
        };
        a = a || 1;
        b = void 0 !== b ? Math.max(3, b) : 8;
        c = void 0 !== c ? c : 0;
        d = void 0 !== d ? d : 2 * Math.PI;
        var e = [],
            f = [],
            g = [],
            h = [],
            l, m = new p,
            k = new A;
        f.push(0, 0, 0);
        g.push(0, 0, 1);
        h.push(.5, .5);
        var n = 0;
        for (l = 3; n <= b; n++, l += 3) {
            var t = c + n / b * d;
            m.x = a * Math.cos(t);
            m.y = a * Math.sin(t);
            f.push(m.x, m.y,
                m.z);
            g.push(0, 0, 1);
            k.x = (f[l] / a + 1) / 2;
            k.y = (f[l + 1] / a + 1) / 2;
            h.push(k.x, k.y)
        }
        for (l = 1; l <= b; l++) e.push(l, l + 1, 0);
        this.setIndex(e);
        this.addAttribute("position", new z(f, 3));
        this.addAttribute("normal", new z(g, 3));
        this.addAttribute("uv", new z(h, 2))
    }

    function yb(a) {
        Q.call(this);
        this.type = "ShadowMaterial";
        this.color = new L(0);
        this.transparent = !0;
        this.setValues(a)
    }

    function hc(a) {
        za.call(this, a);
        this.type = "RawShaderMaterial"
    }

    function Sa(a) {
        Q.call(this);
        this.defines = {
            STANDARD: ""
        };
        this.type = "MeshStandardMaterial";
        this.color =
            new L(16777215);
        this.metalness = this.roughness = .5;
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new L(0);
        this.emissiveIntensity = 1;
        this.bumpMap = this.emissiveMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalScale = new A(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.envMap = this.alphaMap = this.metalnessMap = this.roughnessMap = null;
        this.envMapIntensity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth =
            1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.morphNormals = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function zb(a) {
        Sa.call(this);
        this.defines = {
            PHYSICAL: ""
        };
        this.type = "MeshPhysicalMaterial";
        this.reflectivity = .5;
        this.clearCoatRoughness = this.clearCoat = 0;
        this.setValues(a)
    }

    function Ja(a) {
        Q.call(this);
        this.type = "MeshPhongMaterial";
        this.color = new L(16777215);
        this.specular = new L(1118481);
        this.shininess = 30;
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity =
            1;
        this.emissive = new L(0);
        this.emissiveIntensity = 1;
        this.bumpMap = this.emissiveMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalScale = new A(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.envMap = this.alphaMap = this.specularMap = null;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.morphNormals = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function Ab(a) {
        Ja.call(this);
        this.defines = {
            TOON: ""
        };
        this.type = "MeshToonMaterial";
        this.gradientMap = null;
        this.setValues(a)
    }

    function Bb(a) {
        Q.call(this);
        this.type = "MeshNormalMaterial";
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalScale = new A(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.morphNormals = this.morphTargets = this.skinning = this.lights = this.fog = !1;
        this.setValues(a)
    }

    function Cb(a) {
        Q.call(this);
        this.type = "MeshLambertMaterial";
        this.color = new L(16777215);
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new L(0);
        this.emissiveIntensity = 1;
        this.envMap = this.alphaMap = this.specularMap = this.emissiveMap = null;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.morphNormals = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function Db(a) {
        S.call(this);
        this.type = "LineDashedMaterial";
        this.scale = 1;
        this.dashSize = 3;
        this.gapSize = 1;
        this.setValues(a)
    }

    function ae(a, b, c) {
        var d = this,
            e = !1,
            f = 0,
            g = 0,
            h = void 0;
        this.onStart = void 0;
        this.onLoad = a;
        this.onProgress = b;
        this.onError = c;
        this.itemStart = function (a) {
            g++;
            if (!1 === e && void 0 !== d.onStart) d.onStart(a, f, g);
            e = !0
        };
        this.itemEnd = function (a) {
            f++;
            if (void 0 !== d.onProgress) d.onProgress(a, f, g);
            if (f === g && (e = !1, void 0 !== d.onLoad)) d.onLoad()
        };
        this.itemError = function (a) {
            if (void 0 !== d.onError) d.onError(a)
        };
        this.resolveURL = function (a) {
            return h ?
                h(a) : a
        };
        this.setURLModifier = function (a) {
            h = a;
            return this
        }
    }

    function Ka(a) {
        this.manager = void 0 !== a ? a : va
    }

    function df(a) {
        this.manager = void 0 !== a ? a : va;
        this._parser = null
    }

    function be(a) {
        this.manager = void 0 !== a ? a : va;
        this._parser = null
    }

    function ad(a) {
        this.manager = void 0 !== a ? a : va
    }

    function ce(a) {
        this.manager = void 0 !== a ? a : va
    }

    function xd(a) {
        this.manager = void 0 !== a ? a : va
    }

    function J() {
        this.type = "Curve";
        this.arcLengthDivisions = 200
    }

    function na(a, b, c, d, e, f, g, h) {
        J.call(this);
        this.type = "EllipseCurve";
        this.aX = a || 0;
        this.aY =
            b || 0;
        this.xRadius = c || 1;
        this.yRadius = d || 1;
        this.aStartAngle = e || 0;
        this.aEndAngle = f || 2 * Math.PI;
        this.aClockwise = g || !1;
        this.aRotation = h || 0
    }

    function ic(a, b, c, d, e, f) {
        na.call(this, a, b, c, c, d, e, f);
        this.type = "ArcCurve"
    }

    function de() {
        var a = 0,
            b = 0,
            c = 0,
            d = 0;
        return {
            initCatmullRom: function (e, f, g, h, l) {
                e = l * (g - e);
                h = l * (h - f);
                a = f;
                b = e;
                c = -3 * f + 3 * g - 2 * e - h;
                d = 2 * f - 2 * g + e + h
            },
            initNonuniformCatmullRom: function (e, f, g, h, l, m, k) {
                e = ((f - e) / l - (g - e) / (l + m) + (g - f) / m) * m;
                h = ((g - f) / m - (h - f) / (m + k) + (h - g) / k) * m;
                a = f;
                b = e;
                c = -3 * f + 3 * g - 2 * e - h;
                d = 2 * f - 2 * g + e + h
            },
            calc: function (e) {
                var f =
                    e * e;
                return a + b * e + c * f + d * f * e
            }
        }
    }

    function ca(a, b, c, d) {
        J.call(this);
        this.type = "CatmullRomCurve3";
        this.points = a || [];
        this.closed = b || !1;
        this.curveType = c || "centripetal";
        this.tension = d || .5
    }

    function ef(a, b, c, d, e) {
        b = .5 * (d - b);
        e = .5 * (e - c);
        var f = a * a;
        return (2 * c - 2 * d + b + e) * a * f + (-3 * c + 3 * d - 2 * b - e) * f + b * a + c
    }

    function bd(a, b, c, d) {
        var e = 1 - a;
        return e * e * b + 2 * (1 - a) * a * c + a * a * d
    }

    function cd(a, b, c, d, e) {
        var f = 1 - a,
            g = 1 - a;
        return f * f * f * b + 3 * g * g * a * c + 3 * (1 - a) * a * a * d + a * a * a * e
    }

    function La(a, b, c, d) {
        J.call(this);
        this.type = "CubicBezierCurve";
        this.v0 =
            a || new A;
        this.v1 = b || new A;
        this.v2 = c || new A;
        this.v3 = d || new A
    }

    function Ta(a, b, c, d) {
        J.call(this);
        this.type = "CubicBezierCurve3";
        this.v0 = a || new p;
        this.v1 = b || new p;
        this.v2 = c || new p;
        this.v3 = d || new p
    }

    function wa(a, b) {
        J.call(this);
        this.type = "LineCurve";
        this.v1 = a || new A;
        this.v2 = b || new A
    }

    function Ma(a, b) {
        J.call(this);
        this.type = "LineCurve3";
        this.v1 = a || new p;
        this.v2 = b || new p
    }

    function Na(a, b, c) {
        J.call(this);
        this.type = "QuadraticBezierCurve";
        this.v0 = a || new A;
        this.v1 = b || new A;
        this.v2 = c || new A
    }

    function Ua(a, b, c) {
        J.call(this);
        this.type = "QuadraticBezierCurve3";
        this.v0 = a || new p;
        this.v1 = b || new p;
        this.v2 = c || new p
    }

    function Oa(a) {
        J.call(this);
        this.type = "SplineCurve";
        this.points = a || []
    }

    function $a() {
        J.call(this);
        this.type = "CurvePath";
        this.curves = [];
        this.autoClose = !1
    }

    function Pa(a) {
        $a.call(this);
        this.type = "Path";
        this.currentPoint = new A;
        a && this.setFromPoints(a)
    }

    function hb(a) {
        Pa.call(this, a);
        this.uuid = R.generateUUID();
        this.type = "Shape";
        this.holes = []
    }

    function ea(a, b) {
        B.call(this);
        this.type = "Light";
        this.color = new L(a);
        this.intensity =
            void 0 !== b ? b : 1;
        this.receiveShadow = void 0
    }

    function yd(a, b, c) {
        ea.call(this, a, c);
        this.type = "HemisphereLight";
        this.castShadow = void 0;
        this.position.copy(B.DefaultUp);
        this.updateMatrix();
        this.groundColor = new L(b)
    }

    function Eb(a) {
        this.camera = a;
        this.bias = 0;
        this.radius = 1;
        this.mapSize = new A(512, 512);
        this.map = null;
        this.matrix = new K
    }

    function zd() {
        Eb.call(this, new Y(50, 1, .5, 500))
    }

    function Ad(a, b, c, d, e, f) {
        ea.call(this, a, b);
        this.type = "SpotLight";
        this.position.copy(B.DefaultUp);
        this.updateMatrix();
        this.target = new B;
        Object.defineProperty(this, "power", {
            get: function () {
                return this.intensity * Math.PI
            },
            set: function (a) {
                this.intensity = a / Math.PI
            }
        });
        this.distance = void 0 !== c ? c : 0;
        this.angle = void 0 !== d ? d : Math.PI / 3;
        this.penumbra = void 0 !== e ? e : 0;
        this.decay = void 0 !== f ? f : 1;
        this.shadow = new zd
    }

    function Bd(a, b, c, d) {
        ea.call(this, a, b);
        this.type = "PointLight";
        Object.defineProperty(this, "power", {
            get: function () {
                return 4 * this.intensity * Math.PI
            },
            set: function (a) {
                this.intensity = a / (4 * Math.PI)
            }
        });
        this.distance = void 0 !== c ? c : 0;
        this.decay = void 0 !==
            d ? d : 1;
        this.shadow = new Eb(new Y(90, 1, .5, 500))
    }

    function Cd() {
        Eb.call(this, new Jb(-5, 5, 5, -5, .5, 500))
    }

    function Dd(a, b) {
        ea.call(this, a, b);
        this.type = "DirectionalLight";
        this.position.copy(B.DefaultUp);
        this.updateMatrix();
        this.target = new B;
        this.shadow = new Cd
    }

    function Ed(a, b) {
        ea.call(this, a, b);
        this.type = "AmbientLight";
        this.castShadow = void 0
    }

    function Fd(a, b, c, d) {
        ea.call(this, a, b);
        this.type = "RectAreaLight";
        this.width = void 0 !== c ? c : 10;
        this.height = void 0 !== d ? d : 10
    }

    function Gd(a, b, c, d) {
        ka.call(this, a, b, c, d)
    }

    function Hd(a,
        b, c) {
        ka.call(this, a, b, c)
    }

    function Aa(a, b, c, d) {
        this.parameterPositions = a;
        this._cachedIndex = 0;
        this.resultBuffer = void 0 !== d ? d : new b.constructor(c);
        this.sampleValues = b;
        this.valueSize = c
    }

    function Id(a, b, c, d) {
        Aa.call(this, a, b, c, d)
    }

    function dd(a, b, c, d) {
        ka.call(this, a, b, c, d)
    }

    function Jd(a, b, c, d) {
        ka.call(this, a, b, c, d)
    }

    function jc(a, b, c, d) {
        ka.call(this, a, b, c, d)
    }

    function Kd(a, b, c, d) {
        Aa.call(this, a, b, c, d);
        this._offsetNext = this._weightNext = this._offsetPrev = this._weightPrev = -0
    }

    function ed(a, b, c, d) {
        Aa.call(this,
            a, b, c, d)
    }

    function Ld(a, b, c, d) {
        Aa.call(this, a, b, c, d)
    }

    function ka(a, b, c, d) {
        if (void 0 === a) throw Error("THREE.KeyframeTrack: track name is undefined");
        if (void 0 === b || 0 === b.length) throw Error("THREE.KeyframeTrack: no keyframes in track named " + a);
        this.name = a;
        this.times = qa.convertArray(b, this.TimeBufferType);
        this.values = qa.convertArray(c, this.ValueBufferType);
        this.setInterpolation(d || this.DefaultInterpolation);
        this.validate();
        this.optimize()
    }

    function kc(a, b, c, d) {
        ka.call(this, a, b, c, d)
    }

    function Fa(a, b, c) {
        this.name =
            a;
        this.tracks = c;
        this.duration = void 0 !== b ? b : -1;
        this.uuid = R.generateUUID();
        0 > this.duration && this.resetDuration();
        this.optimize()
    }

    function Md(a) {
        this.manager = void 0 !== a ? a : va;
        this.textures = {}
    }

    function ee(a) {
        this.manager = void 0 !== a ? a : va
    }

    function lc() {}

    function fe(a) {
        "boolean" === typeof a && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), a = void 0);
        this.manager = void 0 !== a ? a : va;
        this.withCredentials = !1
    }

    function ff(a) {
        this.manager = void 0 !== a ? a : va;
        this.texturePath = ""
    }

    function ge(a) {
        "undefined" === typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");
        "undefined" === typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported.");
        this.manager = void 0 !== a ? a : va;
        this.options = void 0
    }

    function he() {
        this.type = "ShapePath";
        this.color = new L;
        this.subPaths = [];
        this.currentPath = null
    }

    function ie(a) {
        this.type = "Font";
        this.data = a
    }

    function gf(a) {
        this.manager = void 0 !== a ? a : va
    }

    function je(a) {
        this.manager = void 0 !== a ? a : va
    }

    function hf() {
        this.type =
            "StereoCamera";
        this.aspect = 1;
        this.eyeSep = .064;
        this.cameraL = new Y;
        this.cameraL.layers.enable(1);
        this.cameraL.matrixAutoUpdate = !1;
        this.cameraR = new Y;
        this.cameraR.layers.enable(2);
        this.cameraR.matrixAutoUpdate = !1
    }

    function fd(a, b, c) {
        B.call(this);
        this.type = "CubeCamera";
        var d = new Y(90, 1, a, b);
        d.up.set(0, -1, 0);
        d.lookAt(new p(1, 0, 0));
        this.add(d);
        var e = new Y(90, 1, a, b);
        e.up.set(0, -1, 0);
        e.lookAt(new p(-1, 0, 0));
        this.add(e);
        var f = new Y(90, 1, a, b);
        f.up.set(0, 0, 1);
        f.lookAt(new p(0, 1, 0));
        this.add(f);
        var g = new Y(90,
            1, a, b);
        g.up.set(0, 0, -1);
        g.lookAt(new p(0, -1, 0));
        this.add(g);
        var h = new Y(90, 1, a, b);
        h.up.set(0, -1, 0);
        h.lookAt(new p(0, 0, 1));
        this.add(h);
        var l = new Y(90, 1, a, b);
        l.up.set(0, -1, 0);
        l.lookAt(new p(0, 0, -1));
        this.add(l);
        this.renderTarget = new Ib(c, c, {
            format: 1022,
            magFilter: 1006,
            minFilter: 1006
        });
        this.renderTarget.texture.name = "CubeCamera";
        this.update = function (a, b) {
            null === this.parent && this.updateMatrixWorld();
            var c = this.renderTarget,
                m = c.texture.generateMipmaps;
            c.texture.generateMipmaps = !1;
            c.activeCubeFace = 0;
            a.render(b,
                d, c);
            c.activeCubeFace = 1;
            a.render(b, e, c);
            c.activeCubeFace = 2;
            a.render(b, f, c);
            c.activeCubeFace = 3;
            a.render(b, g, c);
            c.activeCubeFace = 4;
            a.render(b, h, c);
            c.texture.generateMipmaps = m;
            c.activeCubeFace = 5;
            a.render(b, l, c);
            a.setRenderTarget(null)
        };
        this.clear = function (a, b, c, d) {
            for (var e = this.renderTarget, f = 0; 6 > f; f++) e.activeCubeFace = f, a.setRenderTarget(e), a.clear(b, c, d);
            a.setRenderTarget(null)
        }
    }

    function ke() {
        B.call(this);
        this.type = "AudioListener";
        this.context = le.getContext();
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
        this.filter = null
    }

    function mc(a) {
        B.call(this);
        this.type = "Audio";
        this.context = a.context;
        this.gain = this.context.createGain();
        this.gain.connect(a.getInput());
        this.autoplay = !1;
        this.buffer = null;
        this.loop = !1;
        this.offset = this.startTime = 0;
        this.playbackRate = 1;
        this.isPlaying = !1;
        this.hasPlaybackControl = !0;
        this.sourceType = "empty";
        this.filters = []
    }

    function me(a) {
        mc.call(this, a);
        this.panner = this.context.createPanner();
        this.panner.connect(this.gain)
    }

    function ne(a, b) {
        this.analyser = a.context.createAnalyser();
        this.analyser.fftSize =
            void 0 !== b ? b : 2048;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
        a.getOutput().connect(this.analyser)
    }

    function oe(a, b, c) {
        this.binding = a;
        this.valueSize = c;
        a = Float64Array;
        switch (b) {
            case "quaternion":
                b = this._slerp;
                break;
            case "string":
            case "bool":
                a = Array;
                b = this._select;
                break;
            default:
                b = this._lerp
        }
        this.buffer = new a(4 * c);
        this._mixBufferRegion = b;
        this.referenceCount = this.useCount = this.cumulativeWeight = 0
    }

    function jf(a, b, c) {
        c = c || ra.parseTrackName(b);
        this._targetGroup = a;
        this._bindings = a.subscribe_(b,
            c)
    }

    function ra(a, b, c) {
        this.path = b;
        this.parsedPath = c || ra.parseTrackName(b);
        this.node = ra.findNode(a, this.parsedPath.nodeName) || a;
        this.rootNode = a
    }

    function kf() {
        this.uuid = R.generateUUID();
        this._objects = Array.prototype.slice.call(arguments);
        this.nCachedObjects_ = 0;
        var a = {};
        this._indicesByUUID = a;
        for (var b = 0, c = arguments.length; b !== c; ++b) a[arguments[b].uuid] = b;
        this._paths = [];
        this._parsedPaths = [];
        this._bindings = [];
        this._bindingsIndicesByPath = {};
        var d = this;
        this.stats = {
            objects: {
                get total() {
                    return d._objects.length
                },
                get inUse() {
                    return this.total - d.nCachedObjects_
                }
            },
            get bindingsPerObject() {
                return d._bindings.length
            }
        }
    }

    function lf(a, b, c) {
        this._mixer = a;
        this._clip = b;
        this._localRoot = c || null;
        a = b.tracks;
        b = a.length;
        c = Array(b);
        for (var d = {
                endingStart: 2400,
                endingEnd: 2400
            }, e = 0; e !== b; ++e) {
            var f = a[e].createInterpolant(null);
            c[e] = f;
            f.settings = d
        }
        this._interpolantSettings = d;
        this._interpolants = c;
        this._propertyBindings = Array(b);
        this._weightInterpolant = this._timeScaleInterpolant = this._byClipCacheIndex = this._cacheIndex = null;
        this.loop =
            2201;
        this._loopCount = -1;
        this._startTime = null;
        this.time = 0;
        this._effectiveWeight = this.weight = this._effectiveTimeScale = this.timeScale = 1;
        this.repetitions = Infinity;
        this.paused = !1;
        this.enabled = !0;
        this.clampWhenFinished = !1;
        this.zeroSlopeAtEnd = this.zeroSlopeAtStart = !0
    }

    function pe(a) {
        this._root = a;
        this._initMemoryManager();
        this.time = this._accuIndex = 0;
        this.timeScale = 1
    }

    function Nd(a, b) {
        "string" === typeof a && (console.warn("THREE.Uniform: Type parameter is no longer needed."), a = b);
        this.value = a
    }

    function qe() {
        I.call(this);
        this.type = "InstancedBufferGeometry";
        this.maxInstancedCount = void 0
    }

    function re(a, b, c, d) {
        this.data = a;
        this.itemSize = b;
        this.offset = c;
        this.normalized = !0 === d
    }

    function nc(a, b) {
        this.array = a;
        this.stride = b;
        this.count = void 0 !== a ? a.length / b : 0;
        this.dynamic = !1;
        this.updateRange = {
            offset: 0,
            count: -1
        };
        this.version = 0
    }

    function se(a, b, c) {
        nc.call(this, a, b);
        this.meshPerAttribute = c || 1
    }

    function te(a, b, c) {
        H.call(this, a, b);
        this.meshPerAttribute = c || 1
    }

    function mf(a, b, c, d) {
        this.ray = new qb(a, b);
        this.near = c || 0;
        this.far = d || Infinity;
        this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: {
                threshold: 1
            },
            Sprite: {}
        };
        Object.defineProperties(this.params, {
            PointCloud: {
                get: function () {
                    console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points.");
                    return this.Points
                }
            }
        })
    }

    function nf(a, b) {
        return a.distance - b.distance
    }

    function ue(a, b, c, d) {
        if (!1 !== a.visible && (a.raycast(b, c), !0 === d)) {
            a = a.children;
            d = 0;
            for (var e = a.length; d < e; d++) ue(a[d], b, c, !0)
        }
    }

    function of (a) {
        this.autoStart = void 0 !== a ? a : !0;
        this.elapsedTime = this.oldTime = this.startTime =
            0;
        this.running = !1
    }

    function pf(a, b, c) {
        this.radius = void 0 !== a ? a : 1;
        this.phi = void 0 !== b ? b : 0;
        this.theta = void 0 !== c ? c : 0;
        return this
    }

    function qf(a, b, c) {
        this.radius = void 0 !== a ? a : 1;
        this.theta = void 0 !== b ? b : 0;
        this.y = void 0 !== c ? c : 0;
        return this
    }

    function ve(a, b) {
        this.min = void 0 !== a ? a : new A(Infinity, Infinity);
        this.max = void 0 !== b ? b : new A(-Infinity, -Infinity)
    }

    function gd(a) {
        B.call(this);
        this.material = a;
        this.render = function () {}
    }

    function hd(a, b, c, d) {
        this.object = a;
        this.size = void 0 !== b ? b : 1;
        a = void 0 !== c ? c : 16711680;
        d = void 0 !==
            d ? d : 1;
        b = 0;
        (c = this.object.geometry) && c.isGeometry ? b = 3 * c.faces.length : c && c.isBufferGeometry && (b = c.attributes.normal.count);
        c = new I;
        b = new z(6 * b, 3);
        c.addAttribute("position", b);
        V.call(this, c, new S({
            color: a,
            linewidth: d
        }));
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function oc(a, b) {
        B.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.color = b;
        a = new I;
        b = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];
        for (var c = 0, d = 1; 32 > c; c++, d++) {
            var e =
                c / 32 * Math.PI * 2,
                f = d / 32 * Math.PI * 2;
            b.push(Math.cos(e), Math.sin(e), 1, Math.cos(f), Math.sin(f), 1)
        }
        a.addAttribute("position", new z(b, 3));
        b = new S({
            fog: !1
        });
        this.cone = new V(a, b);
        this.add(this.cone);
        this.update()
    }

    function rf(a) {
        var b = [];
        a && a.isBone && b.push(a);
        for (var c = 0; c < a.children.length; c++) b.push.apply(b, rf(a.children[c]));
        return b
    }

    function pc(a) {
        for (var b = rf(a), c = new I, d = [], e = [], f = new L(0, 0, 1), g = new L(0, 1, 0), h = 0; h < b.length; h++) {
            var l = b[h];
            l.parent && l.parent.isBone && (d.push(0, 0, 0), d.push(0, 0, 0), e.push(f.r,
                f.g, f.b), e.push(g.r, g.g, g.b))
        }
        c.addAttribute("position", new z(d, 3));
        c.addAttribute("color", new z(e, 3));
        d = new S({
            vertexColors: 2,
            depthTest: !1,
            depthWrite: !1,
            transparent: !0
        });
        V.call(this, c, d);
        this.root = a;
        this.bones = b;
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1
    }

    function qc(a, b, c) {
        this.light = a;
        this.light.updateMatrixWorld();
        this.color = c;
        a = new ub(b, 4, 2);
        b = new ya({
            wireframe: !0,
            fog: !1
        });
        ta.call(this, a, b);
        this.matrix = this.light.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function rc(a, b) {
        B.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.color = b;
        a = new S({
            fog: !1
        });
        b = new I;
        b.addAttribute("position", new H(new Float32Array(15), 3));
        this.line = new pa(b, a);
        this.add(this.line);
        this.update()
    }

    function sc(a, b, c) {
        B.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.color = c;
        a = new sb(b);
        a.rotateY(.5 * Math.PI);
        this.material = new ya({
            wireframe: !0,
            fog: !1
        });
        void 0 === this.color && (this.material.vertexColors =
            2);
        b = a.getAttribute("position");
        b = new Float32Array(3 * b.count);
        a.addAttribute("color", new H(b, 3));
        this.add(new ta(a, this.material));
        this.update()
    }

    function id(a, b, c, d) {
        a = a || 10;
        b = b || 10;
        c = new L(void 0 !== c ? c : 4473924);
        d = new L(void 0 !== d ? d : 8947848);
        var e = b / 2,
            f = a / b,
            g = a / 2;
        a = [];
        for (var h = [], l = 0, m = 0, k = -g; l <= b; l++, k += f) {
            a.push(-g, 0, k, g, 0, k);
            a.push(k, 0, -g, k, 0, g);
            var n = l === e ? c : d;
            n.toArray(h, m);
            m += 3;
            n.toArray(h, m);
            m += 3;
            n.toArray(h, m);
            m += 3;
            n.toArray(h, m);
            m += 3
        }
        b = new I;
        b.addAttribute("position", new z(a, 3));
        b.addAttribute("color",
            new z(h, 3));
        c = new S({
            vertexColors: 2
        });
        V.call(this, b, c)
    }

    function Od(a, b, c, d, e, f) {
        a = a || 10;
        b = b || 16;
        c = c || 8;
        d = d || 64;
        e = new L(void 0 !== e ? e : 4473924);
        f = new L(void 0 !== f ? f : 8947848);
        var g = [],
            h = [],
            l;
        for (l = 0; l <= b; l++) {
            var m = l / b * 2 * Math.PI;
            var k = Math.sin(m) * a;
            m = Math.cos(m) * a;
            g.push(0, 0, 0);
            g.push(k, 0, m);
            var n = l & 1 ? e : f;
            h.push(n.r, n.g, n.b);
            h.push(n.r, n.g, n.b)
        }
        for (l = 0; l <= c; l++) {
            n = l & 1 ? e : f;
            var t = a - a / c * l;
            for (b = 0; b < d; b++) m = b / d * 2 * Math.PI, k = Math.sin(m) * t, m = Math.cos(m) * t, g.push(k, 0, m), h.push(n.r, n.g, n.b), m = (b + 1) / d * 2 * Math.PI,
                k = Math.sin(m) * t, m = Math.cos(m) * t, g.push(k, 0, m), h.push(n.r, n.g, n.b)
        }
        a = new I;
        a.addAttribute("position", new z(g, 3));
        a.addAttribute("color", new z(h, 3));
        g = new S({
            vertexColors: 2
        });
        V.call(this, a, g)
    }

    function jd(a, b, c, d) {
        this.object = a;
        this.size = void 0 !== b ? b : 1;
        a = void 0 !== c ? c : 16776960;
        d = void 0 !== d ? d : 1;
        b = 0;
        (c = this.object.geometry) && c.isGeometry ? b = c.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
        c = new I;
        b = new z(6 * b, 3);
        c.addAttribute("position",
            b);
        V.call(this, c, new S({
            color: a,
            linewidth: d
        }));
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function tc(a, b, c) {
        B.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.color = c;
        void 0 === b && (b = 1);
        a = new I;
        a.addAttribute("position", new z([-b, b, 0, b, b, 0, b, -b, 0, -b, -b, 0, -b, b, 0], 3));
        b = new S({
            fog: !1
        });
        this.lightPlane = new pa(a, b);
        this.add(this.lightPlane);
        a = new I;
        a.addAttribute("position", new z([0, 0, 0, 0, 0, 1], 3));
        this.targetLine = new pa(a, b);
        this.add(this.targetLine);
        this.update()
    }

    function kd(a) {
        function b(a, b, d) {
            c(a, d);
            c(b, d)
        }

        function c(a, b) {
            f.push(0, 0, 0);
            g.push(b.r, b.g, b.b);
            void 0 === h[a] && (h[a] = []);
            h[a].push(f.length / 3 - 1)
        }
        var d = new I,
            e = new S({
                color: 16777215,
                vertexColors: 1
            }),
            f = [],
            g = [],
            h = {},
            l = new L(16755200),
            m = new L(16711680),
            k = new L(43775),
            n = new L(16777215),
            t = new L(3355443);
        b("n1", "n2", l);
        b("n2", "n4", l);
        b("n4", "n3", l);
        b("n3", "n1", l);
        b("f1", "f2", l);
        b("f2", "f4", l);
        b("f4", "f3", l);
        b("f3", "f1", l);
        b("n1", "f1", l);
        b("n2", "f2", l);
        b("n3", "f3", l);
        b("n4", "f4", l);
        b("p", "n1",
            m);
        b("p", "n2", m);
        b("p", "n3", m);
        b("p", "n4", m);
        b("u1", "u2", k);
        b("u2", "u3", k);
        b("u3", "u1", k);
        b("c", "t", n);
        b("p", "c", t);
        b("cn1", "cn2", t);
        b("cn3", "cn4", t);
        b("cf1", "cf2", t);
        b("cf3", "cf4", t);
        d.addAttribute("position", new z(f, 3));
        d.addAttribute("color", new z(g, 3));
        V.call(this, d, e);
        this.camera = a;
        this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.pointMap = h;
        this.update()
    }

    function Fb(a, b) {
        this.object = a;
        void 0 === b && (b = 16776960);
        a = new Uint16Array([0,
            1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7
        ]);
        var c = new Float32Array(24),
            d = new I;
        d.setIndex(new H(a, 1));
        d.addAttribute("position", new H(c, 3));
        V.call(this, d, new S({
            color: b
        }));
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function ld(a, b) {
        this.type = "Box3Helper";
        this.box = a;
        a = void 0 !== b ? b : 16776960;
        b = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
        var c = new I;
        c.setIndex(new H(b, 1));
        c.addAttribute("position", new z([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3));
        V.call(this,
            c, new S({
                color: a
            }));
        this.geometry.computeBoundingSphere()
    }

    function md(a, b, c) {
        this.type = "PlaneHelper";
        this.plane = a;
        this.size = void 0 === b ? 1 : b;
        a = void 0 !== c ? c : 16776960;
        b = new I;
        b.addAttribute("position", new z([1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], 3));
        b.computeBoundingSphere();
        pa.call(this, b, new S({
            color: a
        }));
        b = new I;
        b.addAttribute("position", new z([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1], 3));
        b.computeBoundingSphere();
        this.add(new ta(b, new ya({
            color: a,
            opacity: .2,
            transparent: !0,
            depthWrite: !1
        })))
    }

    function Gb(a, b, c, d, e, f) {
        B.call(this);
        void 0 === d && (d = 16776960);
        void 0 === c && (c = 1);
        void 0 === e && (e = .2 * c);
        void 0 === f && (f = .2 * e);
        void 0 === Pd && (Pd = new I, Pd.addAttribute("position", new z([0, 0, 0, 0, 1, 0], 3)), we = new Za(0, .5, 1, 5, 1), we.translate(0, -.5, 0));
        this.position.copy(b);
        this.line = new pa(Pd, new S({
            color: d
        }));
        this.line.matrixAutoUpdate = !1;
        this.add(this.line);
        this.cone = new ta(we, new ya({
            color: d
        }));
        this.cone.matrixAutoUpdate = !1;
        this.add(this.cone);
        this.setDirection(a);
        this.setLength(c, e, f)
    }

    function nd(a) {
        a = a || 1;
        var b = [0, 0, 0, a, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 0, a];
        a = new I;
        a.addAttribute("position", new z(b, 3));
        a.addAttribute("color", new z([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
        b = new S({
            vertexColors: 2
        });
        V.call(this, a, b)
    }

    function sf(a) {
        console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");
        ca.call(this, a);
        this.type = "catmullrom";
        this.closed = !0
    }

    function tf(a) {
        console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");
        ca.call(this, a);
        this.type = "catmullrom"
    }

    function xe(a) {
        console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.");
        ca.call(this, a);
        this.type = "catmullrom"
    }
    void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52));
    void 0 === Number.isInteger && (Number.isInteger = function (a) {
        return "number" === typeof a && isFinite(a) && Math.floor(a) === a
    });
    void 0 === Math.sign && (Math.sign = function (a) {
        return 0 > a ? -1 : 0 < a ? 1 : +a
    });
    !1 === "name" in Function.prototype && Object.defineProperty(Function.prototype, "name", {
        get: function () {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
        }
    });
    void 0 === Object.assign && function () {
        Object.assign = function (a) {
            if (void 0 === a || null === a) throw new TypeError("Cannot convert undefined or null to object");
            for (var b = Object(a), c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (void 0 !== d && null !== d)
                    for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (b[e] = d[e])
            }
            return b
        }
    }();
    Object.assign(xa.prototype, {
        addEventListener: function (a, b) {
            void 0 === this._listeners && (this._listeners = {});
            var c = this._listeners;
            void 0 === c[a] && (c[a] = []); - 1 === c[a].indexOf(b) && c[a].push(b)
        },
        hasEventListener: function (a, b) {
            if (void 0 === this._listeners) return !1;
            var c = this._listeners;
            return void 0 !== c[a] && -1 !== c[a].indexOf(b)
        },
        removeEventListener: function (a, b) {
            void 0 !== this._listeners && (a = this._listeners[a], void 0 !== a && (b = a.indexOf(b), -1 !== b && a.splice(b, 1)))
        },
        dispatchEvent: function (a) {
            if (void 0 !== this._listeners) {
                var b = this._listeners[a.type];
                if (void 0 !== b) {
                    a.target = this;
                    b = b.slice(0);
                    for (var c = 0, d = b.length; c <
                        d; c++) b[c].call(this, a)
                }
            }
        }
    });
    var R = {
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
        generateUUID: function () {
            for (var a = [], b = 0; 256 > b; b++) a[b] = (16 > b ? "0" : "") + b.toString(16);
            return function () {
                var b = 4294967295 * Math.random() | 0,
                    d = 4294967295 * Math.random() | 0,
                    e = 4294967295 * Math.random() | 0,
                    f = 4294967295 * Math.random() | 0;
                return (a[b & 255] + a[b >> 8 & 255] + a[b >> 16 & 255] + a[b >> 24 & 255] + "-" + a[d & 255] + a[d >> 8 & 255] + "-" + a[d >> 16 & 15 | 64] + a[d >> 24 & 255] + "-" + a[e & 63 | 128] + a[e >> 8 & 255] + "-" + a[e >> 16 & 255] + a[e >> 24 & 255] + a[f & 255] + a[f >> 8 & 255] + a[f >> 16 & 255] +
                    a[f >> 24 & 255]).toUpperCase()
            }
        }(),
        clamp: function (a, b, c) {
            return Math.max(b, Math.min(c, a))
        },
        euclideanModulo: function (a, b) {
            return (a % b + b) % b
        },
        mapLinear: function (a, b, c, d, e) {
            return d + (a - b) * (e - d) / (c - b)
        },
        lerp: function (a, b, c) {
            return (1 - c) * a + c * b
        },
        smoothstep: function (a, b, c) {
            if (a <= b) return 0;
            if (a >= c) return 1;
            a = (a - b) / (c - b);
            return a * a * (3 - 2 * a)
        },
        smootherstep: function (a, b, c) {
            if (a <= b) return 0;
            if (a >= c) return 1;
            a = (a - b) / (c - b);
            return a * a * a * (a * (6 * a - 15) + 10)
        },
        randInt: function (a, b) {
            return a + Math.floor(Math.random() * (b - a + 1))
        },
        randFloat: function (a, b) {
            return a + Math.random() * (b - a)
        },
        randFloatSpread: function (a) {
            return a * (.5 - Math.random())
        },
        degToRad: function (a) {
            return a * R.DEG2RAD
        },
        radToDeg: function (a) {
            return a * R.RAD2DEG
        },
        isPowerOfTwo: function (a) {
            return 0 === (a & a - 1) && 0 !== a
        },
        ceilPowerOfTwo: function (a) {
            return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2))
        },
        floorPowerOfTwo: function (a) {
            return Math.pow(2, Math.floor(Math.log(a) / Math.LN2))
        }
    };
    Object.defineProperties(A.prototype, {
        width: {
            get: function () {
                return this.x
            },
            set: function (a) {
                this.x =
                    a
            }
        },
        height: {
            get: function () {
                return this.y
            },
            set: function (a) {
                this.y = a
            }
        }
    });
    Object.assign(A.prototype, {
        isVector2: !0,
        set: function (a, b) {
            this.x = a;
            this.y = b;
            return this
        },
        setScalar: function (a) {
            this.y = this.x = a;
            return this
        },
        setX: function (a) {
            this.x = a;
            return this
        },
        setY: function (a) {
            this.y = a;
            return this
        },
        setComponent: function (a, b) {
            switch (a) {
                case 0:
                    this.x = b;
                    break;
                case 1:
                    this.y = b;
                    break;
                default:
                    throw Error("index is out of range: " + a);
            }
            return this
        },
        getComponent: function (a) {
            switch (a) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        clone: function () {
            return new this.constructor(this.x, this.y)
        },
        copy: function (a) {
            this.x = a.x;
            this.y = a.y;
            return this
        },
        add: function (a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
            this.x += a.x;
            this.y += a.y;
            return this
        },
        addScalar: function (a) {
            this.x += a;
            this.y += a;
            return this
        },
        addVectors: function (a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            return this
        },
        addScaledVector: function (a,
            b) {
            this.x += a.x * b;
            this.y += a.y * b;
            return this
        },
        sub: function (a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
            this.x -= a.x;
            this.y -= a.y;
            return this
        },
        subScalar: function (a) {
            this.x -= a;
            this.y -= a;
            return this
        },
        subVectors: function (a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this
        },
        multiply: function (a) {
            this.x *= a.x;
            this.y *= a.y;
            return this
        },
        multiplyScalar: function (a) {
            this.x *= a;
            this.y *= a;
            return this
        },
        divide: function (a) {
            this.x /=
                a.x;
            this.y /= a.y;
            return this
        },
        divideScalar: function (a) {
            return this.multiplyScalar(1 / a)
        },
        applyMatrix3: function (a) {
            var b = this.x,
                c = this.y;
            a = a.elements;
            this.x = a[0] * b + a[3] * c + a[6];
            this.y = a[1] * b + a[4] * c + a[7];
            return this
        },
        min: function (a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            return this
        },
        max: function (a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            return this
        },
        clamp: function (a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            return this
        },
        clampScalar: function () {
            var a =
                new A,
                b = new A;
            return function (c, d) {
                a.set(c, c);
                b.set(d, d);
                return this.clamp(a, b)
            }
        }(),
        clampLength: function (a, b) {
            var c = this.length();
            return this.divideScalar(c || 1).multiplyScalar(Math.max(a, Math.min(b, c)))
        },
        floor: function () {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this
        },
        ceil: function () {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this
        },
        round: function () {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this
        },
        roundToZero: function () {
            this.x = 0 > this.x ? Math.ceil(this.x) :
                Math.floor(this.x);
            this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
            return this
        },
        negate: function () {
            this.x = -this.x;
            this.y = -this.y;
            return this
        },
        dot: function (a) {
            return this.x * a.x + this.y * a.y
        },
        lengthSq: function () {
            return this.x * this.x + this.y * this.y
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        manhattanLength: function () {
            return Math.abs(this.x) + Math.abs(this.y)
        },
        normalize: function () {
            return this.divideScalar(this.length() || 1)
        },
        angle: function () {
            var a = Math.atan2(this.y, this.x);
            0 > a &&
                (a += 2 * Math.PI);
            return a
        },
        distanceTo: function (a) {
            return Math.sqrt(this.distanceToSquared(a))
        },
        distanceToSquared: function (a) {
            var b = this.x - a.x;
            a = this.y - a.y;
            return b * b + a * a
        },
        manhattanDistanceTo: function (a) {
            return Math.abs(this.x - a.x) + Math.abs(this.y - a.y)
        },
        setLength: function (a) {
            return this.normalize().multiplyScalar(a)
        },
        lerp: function (a, b) {
            this.x += (a.x - this.x) * b;
            this.y += (a.y - this.y) * b;
            return this
        },
        lerpVectors: function (a, b, c) {
            return this.subVectors(b, a).multiplyScalar(c).add(a)
        },
        equals: function (a) {
            return a.x ===
                this.x && a.y === this.y
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.x;
            a[b + 1] = this.y;
            return a
        },
        fromBufferAttribute: function (a, b, c) {
            void 0 !== c && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute().");
            this.x = a.getX(b);
            this.y = a.getY(b);
            return this
        },
        rotateAround: function (a, b) {
            var c = Math.cos(b);
            b = Math.sin(b);
            var d = this.x - a.x,
                e = this.y - a.y;
            this.x = d * c - e * b + a.x;
            this.y = d * b + e * c + a.y;
            return this
        }
    });
    Object.assign(K.prototype, {
        isMatrix4: !0,
        set: function (a, b, c, d, e, f, g, h, l, m, k, n, t, r, q, p) {
            var w = this.elements;
            w[0] = a;
            w[4] = b;
            w[8] = c;
            w[12] = d;
            w[1] = e;
            w[5] = f;
            w[9] = g;
            w[13] = h;
            w[2] = l;
            w[6] = m;
            w[10] = k;
            w[14] = n;
            w[3] = t;
            w[7] = r;
            w[11] = q;
            w[15] = p;
            return this
        },
        identity: function () {
            this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return this
        },
        clone: function () {
            return (new K).fromArray(this.elements)
        },
        copy: function (a) {
            var b = this.elements;
            a = a.elements;
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            b[8] = a[8];
            b[9] = a[9];
            b[10] = a[10];
            b[11] = a[11];
            b[12] = a[12];
            b[13] = a[13];
            b[14] = a[14];
            b[15] = a[15];
            return this
        },
        copyPosition: function (a) {
            var b = this.elements;
            a = a.elements;
            b[12] = a[12];
            b[13] = a[13];
            b[14] = a[14];
            return this
        },
        extractBasis: function (a, b, c) {
            a.setFromMatrixColumn(this, 0);
            b.setFromMatrixColumn(this, 1);
            c.setFromMatrixColumn(this, 2);
            return this
        },
        makeBasis: function (a, b, c) {
            this.set(a.x, b.x, c.x, 0, a.y, b.y, c.y, 0, a.z, b.z, c.z, 0, 0, 0, 0, 1);
            return this
        },
        extractRotation: function () {
            var a = new p;
            return function (b) {
                var c =
                    this.elements,
                    d = b.elements,
                    e = 1 / a.setFromMatrixColumn(b, 0).length(),
                    f = 1 / a.setFromMatrixColumn(b, 1).length();
                b = 1 / a.setFromMatrixColumn(b, 2).length();
                c[0] = d[0] * e;
                c[1] = d[1] * e;
                c[2] = d[2] * e;
                c[4] = d[4] * f;
                c[5] = d[5] * f;
                c[6] = d[6] * f;
                c[8] = d[8] * b;
                c[9] = d[9] * b;
                c[10] = d[10] * b;
                return this
            }
        }(),
        makeRotationFromEuler: function (a) {
            a && a.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            var b = this.elements,
                c = a.x,
                d = a.y,
                e = a.z,
                f = Math.cos(c);
            c = Math.sin(c);
            var g = Math.cos(d);
            d = Math.sin(d);
            var h = Math.cos(e);
            e = Math.sin(e);
            if ("XYZ" === a.order) {
                a = f * h;
                var l = f * e,
                    m = c * h,
                    k = c * e;
                b[0] = g * h;
                b[4] = -g * e;
                b[8] = d;
                b[1] = l + m * d;
                b[5] = a - k * d;
                b[9] = -c * g;
                b[2] = k - a * d;
                b[6] = m + l * d;
                b[10] = f * g
            } else "YXZ" === a.order ? (a = g * h, l = g * e, m = d * h, k = d * e, b[0] = a + k * c, b[4] = m * c - l, b[8] = f * d, b[1] = f * e, b[5] = f * h, b[9] = -c, b[2] = l * c - m, b[6] = k + a * c, b[10] = f * g) : "ZXY" === a.order ? (a = g * h, l = g * e, m = d * h, k = d * e, b[0] = a - k * c, b[4] = -f * e, b[8] = m + l * c, b[1] = l + m * c, b[5] = f * h, b[9] = k - a * c, b[2] = -f * d, b[6] = c, b[10] = f * g) : "ZYX" === a.order ? (a = f * h, l = f * e, m = c *
                h, k = c * e, b[0] = g * h, b[4] = m * d - l, b[8] = a * d + k, b[1] = g * e, b[5] = k * d + a, b[9] = l * d - m, b[2] = -d, b[6] = c * g, b[10] = f * g) : "YZX" === a.order ? (a = f * g, l = f * d, m = c * g, k = c * d, b[0] = g * h, b[4] = k - a * e, b[8] = m * e + l, b[1] = e, b[5] = f * h, b[9] = -c * h, b[2] = -d * h, b[6] = l * e + m, b[10] = a - k * e) : "XZY" === a.order && (a = f * g, l = f * d, m = c * g, k = c * d, b[0] = g * h, b[4] = -e, b[8] = d * h, b[1] = a * e + k, b[5] = f * h, b[9] = l * e - m, b[2] = m * e - l, b[6] = c * h, b[10] = k * e + a);
            b[3] = 0;
            b[7] = 0;
            b[11] = 0;
            b[12] = 0;
            b[13] = 0;
            b[14] = 0;
            b[15] = 1;
            return this
        },
        makeRotationFromQuaternion: function (a) {
            var b = this.elements,
                c = a._x,
                d = a._y,
                e = a._z,
                f = a._w,
                g = c + c,
                h = d + d,
                l = e + e;
            a = c * g;
            var m = c * h;
            c *= l;
            var k = d * h;
            d *= l;
            e *= l;
            g *= f;
            h *= f;
            f *= l;
            b[0] = 1 - (k + e);
            b[4] = m - f;
            b[8] = c + h;
            b[1] = m + f;
            b[5] = 1 - (a + e);
            b[9] = d - g;
            b[2] = c - h;
            b[6] = d + g;
            b[10] = 1 - (a + k);
            b[3] = 0;
            b[7] = 0;
            b[11] = 0;
            b[12] = 0;
            b[13] = 0;
            b[14] = 0;
            b[15] = 1;
            return this
        },
        lookAt: function () {
            var a = new p,
                b = new p,
                c = new p;
            return function (d, e, f) {
                var g = this.elements;
                c.subVectors(d, e);
                0 === c.lengthSq() && (c.z = 1);
                c.normalize();
                a.crossVectors(f, c);
                0 === a.lengthSq() && (1 === Math.abs(f.z) ? c.x += 1E-4 : c.z += 1E-4, c.normalize(), a.crossVectors(f,
                    c));
                a.normalize();
                b.crossVectors(c, a);
                g[0] = a.x;
                g[4] = b.x;
                g[8] = c.x;
                g[1] = a.y;
                g[5] = b.y;
                g[9] = c.y;
                g[2] = a.z;
                g[6] = b.z;
                g[10] = c.z;
                return this
            }
        }(),
        multiply: function (a, b) {
            return void 0 !== b ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
        },
        premultiply: function (a) {
            return this.multiplyMatrices(a, this)
        },
        multiplyMatrices: function (a, b) {
            var c = a.elements,
                d = b.elements;
            b = this.elements;
            a = c[0];
            var e =
                c[4],
                f = c[8],
                g = c[12],
                h = c[1],
                l = c[5],
                m = c[9],
                k = c[13],
                n = c[2],
                t = c[6],
                r = c[10],
                q = c[14],
                p = c[3],
                x = c[7],
                y = c[11];
            c = c[15];
            var v = d[0],
                C = d[4],
                F = d[8],
                N = d[12],
                O = d[1],
                G = d[5],
                z = d[9],
                A = d[13],
                B = d[2],
                D = d[6],
                H = d[10],
                I = d[14],
                L = d[3],
                J = d[7],
                K = d[11];
            d = d[15];
            b[0] = a * v + e * O + f * B + g * L;
            b[4] = a * C + e * G + f * D + g * J;
            b[8] = a * F + e * z + f * H + g * K;
            b[12] = a * N + e * A + f * I + g * d;
            b[1] = h * v + l * O + m * B + k * L;
            b[5] = h * C + l * G + m * D + k * J;
            b[9] = h * F + l * z + m * H + k * K;
            b[13] = h * N + l * A + m * I + k * d;
            b[2] = n * v + t * O + r * B + q * L;
            b[6] = n * C + t * G + r * D + q * J;
            b[10] = n * F + t * z + r * H + q * K;
            b[14] = n * N + t * A + r * I + q * d;
            b[3] = p * v + x * O + y *
                B + c * L;
            b[7] = p * C + x * G + y * D + c * J;
            b[11] = p * F + x * z + y * H + c * K;
            b[15] = p * N + x * A + y * I + c * d;
            return this
        },
        multiplyScalar: function (a) {
            var b = this.elements;
            b[0] *= a;
            b[4] *= a;
            b[8] *= a;
            b[12] *= a;
            b[1] *= a;
            b[5] *= a;
            b[9] *= a;
            b[13] *= a;
            b[2] *= a;
            b[6] *= a;
            b[10] *= a;
            b[14] *= a;
            b[3] *= a;
            b[7] *= a;
            b[11] *= a;
            b[15] *= a;
            return this
        },
        applyToBufferAttribute: function () {
            var a = new p;
            return function (b) {
                for (var c = 0, d = b.count; c < d; c++) a.x = b.getX(c), a.y = b.getY(c), a.z = b.getZ(c), a.applyMatrix4(this), b.setXYZ(c, a.x, a.y, a.z);
                return b
            }
        }(),
        determinant: function () {
            var a =
                this.elements,
                b = a[0],
                c = a[4],
                d = a[8],
                e = a[12],
                f = a[1],
                g = a[5],
                h = a[9],
                l = a[13],
                m = a[2],
                k = a[6],
                n = a[10],
                t = a[14];
            return a[3] * (+e * h * k - d * l * k - e * g * n + c * l * n + d * g * t - c * h * t) + a[7] * (+b * h * t - b * l * n + e * f * n - d * f * t + d * l * m - e * h * m) + a[11] * (+b * l * k - b * g * t - e * f * k + c * f * t + e * g * m - c * l * m) + a[15] * (-d * g * m - b * h * k + b * g * n + d * f * k - c * f * n + c * h * m)
        },
        transpose: function () {
            var a = this.elements;
            var b = a[1];
            a[1] = a[4];
            a[4] = b;
            b = a[2];
            a[2] = a[8];
            a[8] = b;
            b = a[6];
            a[6] = a[9];
            a[9] = b;
            b = a[3];
            a[3] = a[12];
            a[12] = b;
            b = a[7];
            a[7] = a[13];
            a[13] = b;
            b = a[11];
            a[11] = a[14];
            a[14] = b;
            return this
        },
        setPosition: function (a) {
            var b =
                this.elements;
            b[12] = a.x;
            b[13] = a.y;
            b[14] = a.z;
            return this
        },
        getInverse: function (a, b) {
            var c = this.elements,
                d = a.elements;
            a = d[0];
            var e = d[1],
                f = d[2],
                g = d[3],
                h = d[4],
                l = d[5],
                m = d[6],
                k = d[7],
                n = d[8],
                t = d[9],
                r = d[10],
                q = d[11],
                p = d[12],
                x = d[13],
                y = d[14];
            d = d[15];
            var v = t * y * k - x * r * k + x * m * q - l * y * q - t * m * d + l * r * d,
                C = p * r * k - n * y * k - p * m * q + h * y * q + n * m * d - h * r * d,
                F = n * x * k - p * t * k + p * l * q - h * x * q - n * l * d + h * t * d,
                N = p * t * m - n * x * m - p * l * r + h * x * r + n * l * y - h * t * y,
                O = a * v + e * C + f * F + g * N;
            if (0 === O) {
                if (!0 === b) throw Error("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");
                console.warn("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");
                return this.identity()
            }
            b = 1 / O;
            c[0] = v * b;
            c[1] = (x * r * g - t * y * g - x * f * q + e * y * q + t * f * d - e * r * d) * b;
            c[2] = (l * y * g - x * m * g + x * f * k - e * y * k - l * f * d + e * m * d) * b;
            c[3] = (t * m * g - l * r * g - t * f * k + e * r * k + l * f * q - e * m * q) * b;
            c[4] = C * b;
            c[5] = (n * y * g - p * r * g + p * f * q - a * y * q - n * f * d + a * r * d) * b;
            c[6] = (p * m * g - h * y * g - p * f * k + a * y * k + h * f * d - a * m * d) * b;
            c[7] = (h * r * g - n * m * g + n * f * k - a * r * k - h * f * q + a * m * q) * b;
            c[8] = F * b;
            c[9] = (p * t * g - n * x * g - p * e * q + a * x * q + n * e * d - a * t * d) * b;
            c[10] = (h * x * g - p * l * g + p * e * k - a * x * k - h * e * d + a * l * d) * b;
            c[11] =
                (n * l * g - h * t * g - n * e * k + a * t * k + h * e * q - a * l * q) * b;
            c[12] = N * b;
            c[13] = (n * x * f - p * t * f + p * e * r - a * x * r - n * e * y + a * t * y) * b;
            c[14] = (p * l * f - h * x * f - p * e * m + a * x * m + h * e * y - a * l * y) * b;
            c[15] = (h * t * f - n * l * f + n * e * m - a * t * m - h * e * r + a * l * r) * b;
            return this
        },
        scale: function (a) {
            var b = this.elements,
                c = a.x,
                d = a.y;
            a = a.z;
            b[0] *= c;
            b[4] *= d;
            b[8] *= a;
            b[1] *= c;
            b[5] *= d;
            b[9] *= a;
            b[2] *= c;
            b[6] *= d;
            b[10] *= a;
            b[3] *= c;
            b[7] *= d;
            b[11] *= a;
            return this
        },
        getMaxScaleOnAxis: function () {
            var a = this.elements;
            return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
                a[8] * a[8] + a[9] * a[9] + a[10] * a[10]))
        },
        makeTranslation: function (a, b, c) {
            this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
            return this
        },
        makeRotationX: function (a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
            return this
        },
        makeRotationY: function (a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
            return this
        },
        makeRotationZ: function (a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return this
        },
        makeRotationAxis: function (a, b) {
            var c =
                Math.cos(b);
            b = Math.sin(b);
            var d = 1 - c,
                e = a.x,
                f = a.y;
            a = a.z;
            var g = d * e,
                h = d * f;
            this.set(g * e + c, g * f - b * a, g * a + b * f, 0, g * f + b * a, h * f + c, h * a - b * e, 0, g * a - b * f, h * a + b * e, d * a * a + c, 0, 0, 0, 0, 1);
            return this
        },
        makeScale: function (a, b, c) {
            this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
            return this
        },
        makeShear: function (a, b, c) {
            this.set(1, b, c, 0, a, 1, c, 0, a, b, 1, 0, 0, 0, 0, 1);
            return this
        },
        compose: function (a, b, c) {
            this.makeRotationFromQuaternion(b);
            this.scale(c);
            this.setPosition(a);
            return this
        },
        decompose: function () {
            var a = new p,
                b = new K;
            return function (c,
                d, e) {
                var f = this.elements,
                    g = a.set(f[0], f[1], f[2]).length(),
                    h = a.set(f[4], f[5], f[6]).length(),
                    l = a.set(f[8], f[9], f[10]).length();
                0 > this.determinant() && (g = -g);
                c.x = f[12];
                c.y = f[13];
                c.z = f[14];
                b.copy(this);
                c = 1 / g;
                f = 1 / h;
                var m = 1 / l;
                b.elements[0] *= c;
                b.elements[1] *= c;
                b.elements[2] *= c;
                b.elements[4] *= f;
                b.elements[5] *= f;
                b.elements[6] *= f;
                b.elements[8] *= m;
                b.elements[9] *= m;
                b.elements[10] *= m;
                d.setFromRotationMatrix(b);
                e.x = g;
                e.y = h;
                e.z = l;
                return this
            }
        }(),
        makePerspective: function (a, b, c, d, e, f) {
            void 0 === f && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
            var g = this.elements;
            g[0] = 2 * e / (b - a);
            g[4] = 0;
            g[8] = (b + a) / (b - a);
            g[12] = 0;
            g[1] = 0;
            g[5] = 2 * e / (c - d);
            g[9] = (c + d) / (c - d);
            g[13] = 0;
            g[2] = 0;
            g[6] = 0;
            g[10] = -(f + e) / (f - e);
            g[14] = -2 * f * e / (f - e);
            g[3] = 0;
            g[7] = 0;
            g[11] = -1;
            g[15] = 0;
            return this
        },
        makeOrthographic: function (a, b, c, d, e, f) {
            var g = this.elements,
                h = 1 / (b - a),
                l = 1 / (c - d),
                m = 1 / (f - e);
            g[0] = 2 * h;
            g[4] = 0;
            g[8] = 0;
            g[12] = -((b + a) * h);
            g[1] = 0;
            g[5] = 2 * l;
            g[9] = 0;
            g[13] = -((c + d) * l);
            g[2] = 0;
            g[6] = 0;
            g[10] = -2 * m;
            g[14] = -((f + e) * m);
            g[3] = 0;
            g[7] = 0;
            g[11] = 0;
            g[15] = 1;
            return this
        },
        equals: function (a) {
            var b = this.elements;
            a = a.elements;
            for (var c = 0; 16 > c; c++)
                if (b[c] !== a[c]) return !1;
            return !0
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            for (var c = 0; 16 > c; c++) this.elements[c] = a[c + b];
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            var c = this.elements;
            a[b] = c[0];
            a[b + 1] = c[1];
            a[b + 2] = c[2];
            a[b + 3] = c[3];
            a[b + 4] = c[4];
            a[b + 5] = c[5];
            a[b + 6] = c[6];
            a[b + 7] = c[7];
            a[b + 8] = c[8];
            a[b + 9] = c[9];
            a[b + 10] = c[10];
            a[b + 11] = c[11];
            a[b + 12] = c[12];
            a[b + 13] = c[13];
            a[b + 14] = c[14];
            a[b + 15] = c[15];
            return a
        }
    });
    Object.assign(ia, {
        slerp: function (a, b, c, d) {
            return c.copy(a).slerp(b,
                d)
        },
        slerpFlat: function (a, b, c, d, e, f, g) {
            var h = c[d + 0],
                l = c[d + 1],
                m = c[d + 2];
            c = c[d + 3];
            d = e[f + 0];
            var k = e[f + 1],
                n = e[f + 2];
            e = e[f + 3];
            if (c !== e || h !== d || l !== k || m !== n) {
                f = 1 - g;
                var t = h * d + l * k + m * n + c * e,
                    p = 0 <= t ? 1 : -1,
                    q = 1 - t * t;
                q > Number.EPSILON && (q = Math.sqrt(q), t = Math.atan2(q, t * p), f = Math.sin(f * t) / q, g = Math.sin(g * t) / q);
                p *= g;
                h = h * f + d * p;
                l = l * f + k * p;
                m = m * f + n * p;
                c = c * f + e * p;
                f === 1 - g && (g = 1 / Math.sqrt(h * h + l * l + m * m + c * c), h *= g, l *= g, m *= g, c *= g)
            }
            a[b] = h;
            a[b + 1] = l;
            a[b + 2] = m;
            a[b + 3] = c
        }
    });
    Object.defineProperties(ia.prototype, {
        x: {
            get: function () {
                return this._x
            },
            set: function (a) {
                this._x = a;
                this.onChangeCallback()
            }
        },
        y: {
            get: function () {
                return this._y
            },
            set: function (a) {
                this._y = a;
                this.onChangeCallback()
            }
        },
        z: {
            get: function () {
                return this._z
            },
            set: function (a) {
                this._z = a;
                this.onChangeCallback()
            }
        },
        w: {
            get: function () {
                return this._w
            },
            set: function (a) {
                this._w = a;
                this.onChangeCallback()
            }
        }
    });
    Object.assign(ia.prototype, {
        set: function (a, b, c, d) {
            this._x = a;
            this._y = b;
            this._z = c;
            this._w = d;
            this.onChangeCallback();
            return this
        },
        clone: function () {
            return new this.constructor(this._x, this._y, this._z,
                this._w)
        },
        copy: function (a) {
            this._x = a.x;
            this._y = a.y;
            this._z = a.z;
            this._w = a.w;
            this.onChangeCallback();
            return this
        },
        setFromEuler: function (a, b) {
            if (!a || !a.isEuler) throw Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
            var c = a._x,
                d = a._y,
                e = a._z;
            a = a.order;
            var f = Math.cos,
                g = Math.sin,
                h = f(c / 2),
                l = f(d / 2);
            f = f(e / 2);
            c = g(c / 2);
            d = g(d / 2);
            e = g(e / 2);
            "XYZ" === a ? (this._x = c * l * f + h * d * e, this._y = h * d * f - c * l * e, this._z = h * l * e + c * d * f, this._w = h * l * f - c * d * e) : "YXZ" === a ? (this._x = c * l * f +
                h * d * e, this._y = h * d * f - c * l * e, this._z = h * l * e - c * d * f, this._w = h * l * f + c * d * e) : "ZXY" === a ? (this._x = c * l * f - h * d * e, this._y = h * d * f + c * l * e, this._z = h * l * e + c * d * f, this._w = h * l * f - c * d * e) : "ZYX" === a ? (this._x = c * l * f - h * d * e, this._y = h * d * f + c * l * e, this._z = h * l * e - c * d * f, this._w = h * l * f + c * d * e) : "YZX" === a ? (this._x = c * l * f + h * d * e, this._y = h * d * f + c * l * e, this._z = h * l * e - c * d * f, this._w = h * l * f - c * d * e) : "XZY" === a && (this._x = c * l * f - h * d * e, this._y = h * d * f - c * l * e, this._z = h * l * e + c * d * f, this._w = h * l * f + c * d * e);
            if (!1 !== b) this.onChangeCallback();
            return this
        },
        setFromAxisAngle: function (a,
            b) {
            b /= 2;
            var c = Math.sin(b);
            this._x = a.x * c;
            this._y = a.y * c;
            this._z = a.z * c;
            this._w = Math.cos(b);
            this.onChangeCallback();
            return this
        },
        setFromRotationMatrix: function (a) {
            var b = a.elements,
                c = b[0];
            a = b[4];
            var d = b[8],
                e = b[1],
                f = b[5],
                g = b[9],
                h = b[2],
                l = b[6];
            b = b[10];
            var m = c + f + b;
            0 < m ? (c = .5 / Math.sqrt(m + 1), this._w = .25 / c, this._x = (l - g) * c, this._y = (d - h) * c, this._z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this._w = (l - g) / c, this._x = .25 * c, this._y = (a + e) / c, this._z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this._w = (d - h) / c, this._x = (a + e) / c, this._y =
                .25 * c, this._z = (g + l) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this._w = (e - a) / c, this._x = (d + h) / c, this._y = (g + l) / c, this._z = .25 * c);
            this.onChangeCallback();
            return this
        },
        setFromUnitVectors: function () {
            var a = new p,
                b;
            return function (c, d) {
                void 0 === a && (a = new p);
                b = c.dot(d) + 1;
                1E-6 > b ? (b = 0, Math.abs(c.x) > Math.abs(c.z) ? a.set(-c.y, c.x, 0) : a.set(0, -c.z, c.y)) : a.crossVectors(c, d);
                this._x = a.x;
                this._y = a.y;
                this._z = a.z;
                this._w = b;
                return this.normalize()
            }
        }(),
        inverse: function () {
            return this.conjugate()
        },
        conjugate: function () {
            this._x *= -1;
            this._y *=
                -1;
            this._z *= -1;
            this.onChangeCallback();
            return this
        },
        dot: function (a) {
            return this._x * a._x + this._y * a._y + this._z * a._z + this._w * a._w
        },
        lengthSq: function () {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        },
        length: function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
        },
        normalize: function () {
            var a = this.length();
            0 === a ? (this._z = this._y = this._x = 0, this._w = 1) : (a = 1 / a, this._x *= a, this._y *= a, this._z *= a, this._w *= a);
            this.onChangeCallback();
            return this
        },
        multiply: function (a,
            b) {
            return void 0 !== b ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
        },
        premultiply: function (a) {
            return this.multiplyQuaternions(a, this)
        },
        multiplyQuaternions: function (a, b) {
            var c = a._x,
                d = a._y,
                e = a._z;
            a = a._w;
            var f = b._x,
                g = b._y,
                h = b._z;
            b = b._w;
            this._x = c * b + a * f + d * h - e * g;
            this._y = d * b + a * g + e * f - c * h;
            this._z = e * b + a * h + c * g - d * f;
            this._w = a * b - c * f - d * g - e * h;
            this.onChangeCallback();
            return this
        },
        slerp: function (a, b) {
            if (0 === b) return this;
            if (1 === b) return this.copy(a);
            var c = this._x,
                d = this._y,
                e = this._z,
                f = this._w,
                g = f * a._w + c * a._x + d * a._y + e * a._z;
            0 > g ? (this._w = -a._w, this._x = -a._x, this._y = -a._y, this._z = -a._z, g = -g) : this.copy(a);
            if (1 <= g) return this._w = f, this._x = c, this._y = d, this._z = e, this;
            a = Math.sqrt(1 - g * g);
            if (.001 > Math.abs(a)) return this._w = .5 * (f + this._w), this._x = .5 * (c + this._x), this._y = .5 * (d + this._y), this._z = .5 * (e + this._z), this;
            var h = Math.atan2(a, g);
            g = Math.sin((1 - b) * h) / a;
            b = Math.sin(b * h) / a;
            this._w = f * g +
                this._w * b;
            this._x = c * g + this._x * b;
            this._y = d * g + this._y * b;
            this._z = e * g + this._z * b;
            this.onChangeCallback();
            return this
        },
        equals: function (a) {
            return a._x === this._x && a._y === this._y && a._z === this._z && a._w === this._w
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            this._x = a[b];
            this._y = a[b + 1];
            this._z = a[b + 2];
            this._w = a[b + 3];
            this.onChangeCallback();
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this._x;
            a[b + 1] = this._y;
            a[b + 2] = this._z;
            a[b + 3] = this._w;
            return a
        },
        onChange: function (a) {
            this.onChangeCallback =
                a;
            return this
        },
        onChangeCallback: function () {}
    });
    Object.assign(p.prototype, {
        isVector3: !0,
        set: function (a, b, c) {
            this.x = a;
            this.y = b;
            this.z = c;
            return this
        },
        setScalar: function (a) {
            this.z = this.y = this.x = a;
            return this
        },
        setX: function (a) {
            this.x = a;
            return this
        },
        setY: function (a) {
            this.y = a;
            return this
        },
        setZ: function (a) {
            this.z = a;
            return this
        },
        setComponent: function (a, b) {
            switch (a) {
                case 0:
                    this.x = b;
                    break;
                case 1:
                    this.y = b;
                    break;
                case 2:
                    this.z = b;
                    break;
                default:
                    throw Error("index is out of range: " + a);
            }
            return this
        },
        getComponent: function (a) {
            switch (a) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        clone: function () {
            return new this.constructor(this.x, this.y, this.z)
        },
        copy: function (a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            return this
        },
        add: function (a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
            return this
        },
        addScalar: function (a) {
            this.x += a;
            this.y += a;
            this.z += a;
            return this
        },
        addVectors: function (a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            return this
        },
        addScaledVector: function (a, b) {
            this.x += a.x * b;
            this.y += a.y * b;
            this.z += a.z * b;
            return this
        },
        sub: function (a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            return this
        },
        subScalar: function (a) {
            this.x -= a;
            this.y -= a;
            this.z -= a;
            return this
        },
        subVectors: function (a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z =
                a.z - b.z;
            return this
        },
        multiply: function (a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, b);
            this.x *= a.x;
            this.y *= a.y;
            this.z *= a.z;
            return this
        },
        multiplyScalar: function (a) {
            this.x *= a;
            this.y *= a;
            this.z *= a;
            return this
        },
        multiplyVectors: function (a, b) {
            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;
            return this
        },
        applyEuler: function () {
            var a = new ia;
            return function (b) {
                b && b.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");
                return this.applyQuaternion(a.setFromEuler(b))
            }
        }(),
        applyAxisAngle: function () {
            var a = new ia;
            return function (b, c) {
                return this.applyQuaternion(a.setFromAxisAngle(b, c))
            }
        }(),
        applyMatrix3: function (a) {
            var b = this.x,
                c = this.y,
                d = this.z;
            a = a.elements;
            this.x = a[0] * b + a[3] * c + a[6] * d;
            this.y = a[1] * b + a[4] * c + a[7] * d;
            this.z = a[2] * b + a[5] * c + a[8] * d;
            return this
        },
        applyMatrix4: function (a) {
            var b = this.x,
                c = this.y,
                d = this.z;
            a = a.elements;
            var e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
            this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
            this.y = (a[1] * b + a[5] * c +
                a[9] * d + a[13]) * e;
            this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
            return this
        },
        applyQuaternion: function (a) {
            var b = this.x,
                c = this.y,
                d = this.z,
                e = a.x,
                f = a.y,
                g = a.z;
            a = a.w;
            var h = a * b + f * d - g * c,
                l = a * c + g * b - e * d,
                m = a * d + e * c - f * b;
            b = -e * b - f * c - g * d;
            this.x = h * a + b * -e + l * -g - m * -f;
            this.y = l * a + b * -f + m * -e - h * -g;
            this.z = m * a + b * -g + h * -f - l * -e;
            return this
        },
        project: function () {
            var a = new K;
            return function (b) {
                a.multiplyMatrices(b.projectionMatrix, a.getInverse(b.matrixWorld));
                return this.applyMatrix4(a)
            }
        }(),
        unproject: function () {
            var a = new K;
            return function (b) {
                a.multiplyMatrices(b.matrixWorld,
                    a.getInverse(b.projectionMatrix));
                return this.applyMatrix4(a)
            }
        }(),
        transformDirection: function (a) {
            var b = this.x,
                c = this.y,
                d = this.z;
            a = a.elements;
            this.x = a[0] * b + a[4] * c + a[8] * d;
            this.y = a[1] * b + a[5] * c + a[9] * d;
            this.z = a[2] * b + a[6] * c + a[10] * d;
            return this.normalize()
        },
        divide: function (a) {
            this.x /= a.x;
            this.y /= a.y;
            this.z /= a.z;
            return this
        },
        divideScalar: function (a) {
            return this.multiplyScalar(1 / a)
        },
        min: function (a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            this.z = Math.min(this.z, a.z);
            return this
        },
        max: function (a) {
            this.x =
                Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            this.z = Math.max(this.z, a.z);
            return this
        },
        clamp: function (a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            this.z = Math.max(a.z, Math.min(b.z, this.z));
            return this
        },
        clampScalar: function () {
            var a = new p,
                b = new p;
            return function (c, d) {
                a.set(c, c, c);
                b.set(d, d, d);
                return this.clamp(a, b)
            }
        }(),
        clampLength: function (a, b) {
            var c = this.length();
            return this.divideScalar(c || 1).multiplyScalar(Math.max(a, Math.min(b, c)))
        },
        floor: function () {
            this.x =
                Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            return this
        },
        ceil: function () {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            return this
        },
        round: function () {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            return this
        },
        roundToZero: function () {
            this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
            return this
        },
        negate: function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this
        },
        dot: function (a) {
            return this.x * a.x + this.y * a.y + this.z * a.z
        },
        lengthSq: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        },
        manhattanLength: function () {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
        },
        normalize: function () {
            return this.divideScalar(this.length() || 1)
        },
        setLength: function (a) {
            return this.normalize().multiplyScalar(a)
        },
        lerp: function (a, b) {
            this.x += (a.x -
                this.x) * b;
            this.y += (a.y - this.y) * b;
            this.z += (a.z - this.z) * b;
            return this
        },
        lerpVectors: function (a, b, c) {
            return this.subVectors(b, a).multiplyScalar(c).add(a)
        },
        cross: function (a, b) {
            return void 0 !== b ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a, b)) : this.crossVectors(this, a)
        },
        crossVectors: function (a, b) {
            var c = a.x,
                d = a.y;
            a = a.z;
            var e = b.x,
                f = b.y;
            b = b.z;
            this.x = d * b - a * f;
            this.y = a * e - c * b;
            this.z = c * f - d * e;
            return this
        },
        projectOnVector: function (a) {
            var b =
                a.dot(this) / a.lengthSq();
            return this.copy(a).multiplyScalar(b)
        },
        projectOnPlane: function () {
            var a = new p;
            return function (b) {
                a.copy(this).projectOnVector(b);
                return this.sub(a)
            }
        }(),
        reflect: function () {
            var a = new p;
            return function (b) {
                return this.sub(a.copy(b).multiplyScalar(2 * this.dot(b)))
            }
        }(),
        angleTo: function (a) {
            a = this.dot(a) / Math.sqrt(this.lengthSq() * a.lengthSq());
            return Math.acos(R.clamp(a, -1, 1))
        },
        distanceTo: function (a) {
            return Math.sqrt(this.distanceToSquared(a))
        },
        distanceToSquared: function (a) {
            var b = this.x -
                a.x,
                c = this.y - a.y;
            a = this.z - a.z;
            return b * b + c * c + a * a
        },
        manhattanDistanceTo: function (a) {
            return Math.abs(this.x - a.x) + Math.abs(this.y - a.y) + Math.abs(this.z - a.z)
        },
        setFromSpherical: function (a) {
            var b = Math.sin(a.phi) * a.radius;
            this.x = b * Math.sin(a.theta);
            this.y = Math.cos(a.phi) * a.radius;
            this.z = b * Math.cos(a.theta);
            return this
        },
        setFromCylindrical: function (a) {
            this.x = a.radius * Math.sin(a.theta);
            this.y = a.y;
            this.z = a.radius * Math.cos(a.theta);
            return this
        },
        setFromMatrixPosition: function (a) {
            a = a.elements;
            this.x = a[12];
            this.y =
                a[13];
            this.z = a[14];
            return this
        },
        setFromMatrixScale: function (a) {
            var b = this.setFromMatrixColumn(a, 0).length(),
                c = this.setFromMatrixColumn(a, 1).length();
            a = this.setFromMatrixColumn(a, 2).length();
            this.x = b;
            this.y = c;
            this.z = a;
            return this
        },
        setFromMatrixColumn: function (a, b) {
            return this.fromArray(a.elements, 4 * b)
        },
        equals: function (a) {
            return a.x === this.x && a.y === this.y && a.z === this.z
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            this.z = a[b + 2];
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.x;
            a[b + 1] = this.y;
            a[b + 2] = this.z;
            return a
        },
        fromBufferAttribute: function (a, b, c) {
            void 0 !== c && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute().");
            this.x = a.getX(b);
            this.y = a.getY(b);
            this.z = a.getZ(b);
            return this
        }
    });
    Object.assign(oa.prototype, {
        isMatrix3: !0,
        set: function (a, b, c, d, e, f, g, h, l) {
            var m = this.elements;
            m[0] = a;
            m[1] = d;
            m[2] = g;
            m[3] = b;
            m[4] = e;
            m[5] = h;
            m[6] = c;
            m[7] = f;
            m[8] = l;
            return this
        },
        identity: function () {
            this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
            return this
        },
        clone: function () {
            return (new this.constructor).fromArray(this.elements)
        },
        copy: function (a) {
            var b = this.elements;
            a = a.elements;
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            b[8] = a[8];
            return this
        },
        setFromMatrix4: function (a) {
            a = a.elements;
            this.set(a[0], a[4], a[8], a[1], a[5], a[9], a[2], a[6], a[10]);
            return this
        },
        applyToBufferAttribute: function () {
            var a = new p;
            return function (b) {
                for (var c = 0, d = b.count; c < d; c++) a.x = b.getX(c), a.y = b.getY(c), a.z = b.getZ(c), a.applyMatrix3(this), b.setXYZ(c, a.x, a.y, a.z);
                return b
            }
        }(),
        multiply: function (a) {
            return this.multiplyMatrices(this,
                a)
        },
        premultiply: function (a) {
            return this.multiplyMatrices(a, this)
        },
        multiplyMatrices: function (a, b) {
            var c = a.elements,
                d = b.elements;
            b = this.elements;
            a = c[0];
            var e = c[3],
                f = c[6],
                g = c[1],
                h = c[4],
                l = c[7],
                m = c[2],
                k = c[5];
            c = c[8];
            var n = d[0],
                t = d[3],
                p = d[6],
                q = d[1],
                u = d[4],
                x = d[7],
                y = d[2],
                v = d[5];
            d = d[8];
            b[0] = a * n + e * q + f * y;
            b[3] = a * t + e * u + f * v;
            b[6] = a * p + e * x + f * d;
            b[1] = g * n + h * q + l * y;
            b[4] = g * t + h * u + l * v;
            b[7] = g * p + h * x + l * d;
            b[2] = m * n + k * q + c * y;
            b[5] = m * t + k * u + c * v;
            b[8] = m * p + k * x + c * d;
            return this
        },
        multiplyScalar: function (a) {
            var b = this.elements;
            b[0] *= a;
            b[3] *=
                a;
            b[6] *= a;
            b[1] *= a;
            b[4] *= a;
            b[7] *= a;
            b[2] *= a;
            b[5] *= a;
            b[8] *= a;
            return this
        },
        determinant: function () {
            var a = this.elements,
                b = a[0],
                c = a[1],
                d = a[2],
                e = a[3],
                f = a[4],
                g = a[5],
                h = a[6],
                l = a[7];
            a = a[8];
            return b * f * a - b * g * l - c * e * a + c * g * h + d * e * l - d * f * h
        },
        getInverse: function (a, b) {
            a && a.isMatrix4 && console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
            var c = a.elements;
            a = this.elements;
            var d = c[0],
                e = c[1],
                f = c[2],
                g = c[3],
                h = c[4],
                l = c[5],
                m = c[6],
                k = c[7];
            c = c[8];
            var n = c * h - l * k,
                t = l * m - c * g,
                p = k * g - h * m,
                q = d * n + e * t + f * p;
            if (0 === q) {
                if (!0 ===
                    b) throw Error("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");
                console.warn("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");
                return this.identity()
            }
            b = 1 / q;
            a[0] = n * b;
            a[1] = (f * k - c * e) * b;
            a[2] = (l * e - f * h) * b;
            a[3] = t * b;
            a[4] = (c * d - f * m) * b;
            a[5] = (f * g - l * d) * b;
            a[6] = p * b;
            a[7] = (e * m - k * d) * b;
            a[8] = (h * d - e * g) * b;
            return this
        },
        transpose: function () {
            var a = this.elements;
            var b = a[1];
            a[1] = a[3];
            a[3] = b;
            b = a[2];
            a[2] = a[6];
            a[6] = b;
            b = a[5];
            a[5] = a[7];
            a[7] = b;
            return this
        },
        getNormalMatrix: function (a) {
            return this.setFromMatrix4(a).getInverse(this).transpose()
        },
        transposeIntoArray: function (a) {
            var b = this.elements;
            a[0] = b[0];
            a[1] = b[3];
            a[2] = b[6];
            a[3] = b[1];
            a[4] = b[4];
            a[5] = b[7];
            a[6] = b[2];
            a[7] = b[5];
            a[8] = b[8];
            return this
        },
        setUvTransform: function (a, b, c, d, e, f, g) {
            var h = Math.cos(e);
            e = Math.sin(e);
            this.set(c * h, c * e, -c * (h * f + e * g) + f + a, -d * e, d * h, -d * (-e * f + h * g) + g + b, 0, 0, 1)
        },
        scale: function (a, b) {
            var c = this.elements;
            c[0] *= a;
            c[3] *= a;
            c[6] *= a;
            c[1] *= b;
            c[4] *= b;
            c[7] *= b;
            return this
        },
        rotate: function (a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            var c = this.elements,
                d = c[0],
                e = c[3],
                f = c[6],
                g = c[1],
                h = c[4],
                l = c[7];
            c[0] = b * d + a * g;
            c[3] = b * e + a * h;
            c[6] = b * f + a * l;
            c[1] = -a * d + b * g;
            c[4] = -a * e + b * h;
            c[7] = -a * f + b * l;
            return this
        },
        translate: function (a, b) {
            var c = this.elements;
            c[0] += a * c[2];
            c[3] += a * c[5];
            c[6] += a * c[8];
            c[1] += b * c[2];
            c[4] += b * c[5];
            c[7] += b * c[8];
            return this
        },
        equals: function (a) {
            var b = this.elements;
            a = a.elements;
            for (var c = 0; 9 > c; c++)
                if (b[c] !== a[c]) return !1;
            return !0
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            for (var c = 0; 9 > c; c++) this.elements[c] = a[c + b];
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            var c =
                this.elements;
            a[b] = c[0];
            a[b + 1] = c[1];
            a[b + 2] = c[2];
            a[b + 3] = c[3];
            a[b + 4] = c[4];
            a[b + 5] = c[5];
            a[b + 6] = c[6];
            a[b + 7] = c[7];
            a[b + 8] = c[8];
            return a
        }
    });
    var xf = 0;
    X.DEFAULT_IMAGE = void 0;
    X.DEFAULT_MAPPING = 300;
    X.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: X,
        isTexture: !0,
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.name = a.name;
            this.image = a.image;
            this.mipmaps = a.mipmaps.slice(0);
            this.mapping = a.mapping;
            this.wrapS = a.wrapS;
            this.wrapT = a.wrapT;
            this.magFilter = a.magFilter;
            this.minFilter =
                a.minFilter;
            this.anisotropy = a.anisotropy;
            this.format = a.format;
            this.type = a.type;
            this.offset.copy(a.offset);
            this.repeat.copy(a.repeat);
            this.center.copy(a.center);
            this.rotation = a.rotation;
            this.matrixAutoUpdate = a.matrixAutoUpdate;
            this.matrix.copy(a.matrix);
            this.generateMipmaps = a.generateMipmaps;
            this.premultiplyAlpha = a.premultiplyAlpha;
            this.flipY = a.flipY;
            this.unpackAlignment = a.unpackAlignment;
            this.encoding = a.encoding;
            return this
        },
        toJSON: function (a) {
            var b = void 0 === a || "string" === typeof a;
            if (!b && void 0 !==
                a.textures[this.uuid]) return a.textures[this.uuid];
            var c = {
                metadata: {
                    version: 4.5,
                    type: "Texture",
                    generator: "Texture.toJSON"
                },
                uuid: this.uuid,
                name: this.name,
                mapping: this.mapping,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                center: [this.center.x, this.center.y],
                rotation: this.rotation,
                wrap: [this.wrapS, this.wrapT],
                format: this.format,
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY
            };
            if (void 0 !== this.image) {
                var d = this.image;
                void 0 ===
                    d.uuid && (d.uuid = R.generateUUID());
                if (!b && void 0 === a.images[d.uuid]) {
                    var e = a.images,
                        f = d.uuid,
                        g = d.uuid;
                    if (d instanceof HTMLCanvasElement) var h = d;
                    else {
                        h = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                        h.width = d.width;
                        h.height = d.height;
                        var l = h.getContext("2d");
                        d instanceof ImageData ? l.putImageData(d, 0, 0) : l.drawImage(d, 0, 0, d.width, d.height)
                    }
                    h = 2048 < h.width || 2048 < h.height ? h.toDataURL("image/jpeg", .6) : h.toDataURL("image/png");
                    e[f] = {
                        uuid: g,
                        url: h
                    }
                }
                c.image = d.uuid
            }
            b || (a.textures[this.uuid] =
                c);
            return c
        },
        dispose: function () {
            this.dispatchEvent({
                type: "dispose"
            })
        },
        transformUv: function (a) {
            if (300 === this.mapping) {
                a.applyMatrix3(this.matrix);
                if (0 > a.x || 1 < a.x) switch (this.wrapS) {
                    case 1E3:
                        a.x -= Math.floor(a.x);
                        break;
                    case 1001:
                        a.x = 0 > a.x ? 0 : 1;
                        break;
                    case 1002:
                        a.x = 1 === Math.abs(Math.floor(a.x) % 2) ? Math.ceil(a.x) - a.x : a.x - Math.floor(a.x)
                }
                if (0 > a.y || 1 < a.y) switch (this.wrapT) {
                    case 1E3:
                        a.y -= Math.floor(a.y);
                        break;
                    case 1001:
                        a.y = 0 > a.y ? 0 : 1;
                        break;
                    case 1002:
                        a.y = 1 === Math.abs(Math.floor(a.y) % 2) ? Math.ceil(a.y) - a.y : a.y -
                            Math.floor(a.y)
                }
                this.flipY && (a.y = 1 - a.y)
            }
        }
    });
    Object.defineProperty(X.prototype, "needsUpdate", {
        set: function (a) {
            !0 === a && this.version++
        }
    });
    Object.assign(da.prototype, {
        isVector4: !0,
        set: function (a, b, c, d) {
            this.x = a;
            this.y = b;
            this.z = c;
            this.w = d;
            return this
        },
        setScalar: function (a) {
            this.w = this.z = this.y = this.x = a;
            return this
        },
        setX: function (a) {
            this.x = a;
            return this
        },
        setY: function (a) {
            this.y = a;
            return this
        },
        setZ: function (a) {
            this.z = a;
            return this
        },
        setW: function (a) {
            this.w = a;
            return this
        },
        setComponent: function (a, b) {
            switch (a) {
                case 0:
                    this.x =
                        b;
                    break;
                case 1:
                    this.y = b;
                    break;
                case 2:
                    this.z = b;
                    break;
                case 3:
                    this.w = b;
                    break;
                default:
                    throw Error("index is out of range: " + a);
            }
            return this
        },
        getComponent: function (a) {
            switch (a) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        clone: function () {
            return new this.constructor(this.x, this.y, this.z, this.w)
        },
        copy: function (a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            this.w = void 0 !== a.w ? a.w : 1;
            return this
        },
        add: function (a, b) {
            if (void 0 !==
                b) return console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
            this.w += a.w;
            return this
        },
        addScalar: function (a) {
            this.x += a;
            this.y += a;
            this.z += a;
            this.w += a;
            return this
        },
        addVectors: function (a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            this.w = a.w + b.w;
            return this
        },
        addScaledVector: function (a, b) {
            this.x += a.x * b;
            this.y += a.y * b;
            this.z += a.z * b;
            this.w += a.w * b;
            return this
        },
        sub: function (a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                this.subVectors(a, b);
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            this.w -= a.w;
            return this
        },
        subScalar: function (a) {
            this.x -= a;
            this.y -= a;
            this.z -= a;
            this.w -= a;
            return this
        },
        subVectors: function (a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            this.w = a.w - b.w;
            return this
        },
        multiplyScalar: function (a) {
            this.x *= a;
            this.y *= a;
            this.z *= a;
            this.w *= a;
            return this
        },
        applyMatrix4: function (a) {
            var b = this.x,
                c = this.y,
                d = this.z,
                e = this.w;
            a = a.elements;
            this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
            this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
            this.z = a[2] * b + a[6] *
                c + a[10] * d + a[14] * e;
            this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
            return this
        },
        divideScalar: function (a) {
            return this.multiplyScalar(1 / a)
        },
        setAxisAngleFromQuaternion: function (a) {
            this.w = 2 * Math.acos(a.w);
            var b = Math.sqrt(1 - a.w * a.w);
            1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
            return this
        },
        setAxisAngleFromRotationMatrix: function (a) {
            a = a.elements;
            var b = a[0];
            var c = a[4];
            var d = a[8],
                e = a[1],
                f = a[5],
                g = a[9];
            var h = a[2];
            var l = a[6];
            var m = a[10];
            if (.01 > Math.abs(c - e) && .01 > Math.abs(d - h) && .01 > Math.abs(g -
                    l)) {
                if (.1 > Math.abs(c + e) && .1 > Math.abs(d + h) && .1 > Math.abs(g + l) && .1 > Math.abs(b + f + m - 3)) return this.set(1, 0, 0, 0), this;
                a = Math.PI;
                b = (b + 1) / 2;
                f = (f + 1) / 2;
                m = (m + 1) / 2;
                c = (c + e) / 4;
                d = (d + h) / 4;
                g = (g + l) / 4;
                b > f && b > m ? .01 > b ? (l = 0, c = h = .707106781) : (l = Math.sqrt(b), h = c / l, c = d / l) : f > m ? .01 > f ? (l = .707106781, h = 0, c = .707106781) : (h = Math.sqrt(f), l = c / h, c = g / h) : .01 > m ? (h = l = .707106781, c = 0) : (c = Math.sqrt(m), l = d / c, h = g / c);
                this.set(l, h, c, a);
                return this
            }
            a = Math.sqrt((l - g) * (l - g) + (d - h) * (d - h) + (e - c) * (e - c));
            .001 > Math.abs(a) && (a = 1);
            this.x = (l - g) / a;
            this.y = (d -
                h) / a;
            this.z = (e - c) / a;
            this.w = Math.acos((b + f + m - 1) / 2);
            return this
        },
        min: function (a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            this.z = Math.min(this.z, a.z);
            this.w = Math.min(this.w, a.w);
            return this
        },
        max: function (a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            this.z = Math.max(this.z, a.z);
            this.w = Math.max(this.w, a.w);
            return this
        },
        clamp: function (a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            this.z = Math.max(a.z, Math.min(b.z, this.z));
            this.w = Math.max(a.w,
                Math.min(b.w, this.w));
            return this
        },
        clampScalar: function () {
            var a, b;
            return function (c, d) {
                void 0 === a && (a = new da, b = new da);
                a.set(c, c, c, c);
                b.set(d, d, d, d);
                return this.clamp(a, b)
            }
        }(),
        clampLength: function (a, b) {
            var c = this.length();
            return this.divideScalar(c || 1).multiplyScalar(Math.max(a, Math.min(b, c)))
        },
        floor: function () {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            this.w = Math.floor(this.w);
            return this
        },
        ceil: function () {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z =
                Math.ceil(this.z);
            this.w = Math.ceil(this.w);
            return this
        },
        round: function () {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            this.w = Math.round(this.w);
            return this
        },
        roundToZero: function () {
            this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
            this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w);
            return this
        },
        negate: function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.w = -this.w;
            return this
        },
        dot: function (a) {
            return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
        },
        lengthSq: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        },
        manhattanLength: function () {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        },
        normalize: function () {
            return this.divideScalar(this.length() || 1)
        },
        setLength: function (a) {
            return this.normalize().multiplyScalar(a)
        },
        lerp: function (a, b) {
            this.x += (a.x - this.x) * b;
            this.y += (a.y - this.y) * b;
            this.z += (a.z - this.z) * b;
            this.w += (a.w - this.w) * b;
            return this
        },
        lerpVectors: function (a, b, c) {
            return this.subVectors(b, a).multiplyScalar(c).add(a)
        },
        equals: function (a) {
            return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            this.z = a[b + 2];
            this.w = a[b + 3];
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.x;
            a[b + 1] = this.y;
            a[b + 2] = this.z;
            a[b + 3] =
                this.w;
            return a
        },
        fromBufferAttribute: function (a, b, c) {
            void 0 !== c && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute().");
            this.x = a.getX(b);
            this.y = a.getY(b);
            this.z = a.getZ(b);
            this.w = a.getW(b);
            return this
        }
    });
    ib.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: ib,
        isWebGLRenderTarget: !0,
        setSize: function (a, b) {
            if (this.width !== a || this.height !== b) this.width = a, this.height = b, this.dispose();
            this.viewport.set(0, 0, a, b);
            this.scissor.set(0, 0, a, b)
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.width = a.width;
            this.height = a.height;
            this.viewport.copy(a.viewport);
            this.texture = a.texture.clone();
            this.depthBuffer = a.depthBuffer;
            this.stencilBuffer = a.stencilBuffer;
            this.depthTexture = a.depthTexture;
            return this
        },
        dispose: function () {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    Ib.prototype = Object.create(ib.prototype);
    Ib.prototype.constructor = Ib;
    Ib.prototype.isWebGLRenderTargetCube = !0;
    jb.prototype = Object.create(X.prototype);
    jb.prototype.constructor = jb;
    jb.prototype.isDataTexture = !0;
    Object.assign(Va.prototype, {
        isBox3: !0,
        set: function (a, b) {
            this.min.copy(a);
            this.max.copy(b);
            return this
        },
        setFromArray: function (a) {
            for (var b = Infinity, c = Infinity, d = Infinity, e = -Infinity, f = -Infinity, g = -Infinity, h = 0, l = a.length; h < l; h += 3) {
                var m = a[h],
                    k = a[h + 1],
                    n = a[h + 2];
                m < b && (b = m);
                k < c && (c = k);
                n < d && (d = n);
                m > e && (e = m);
                k > f && (f = k);
                n > g && (g = n)
            }
            this.min.set(b, c, d);
            this.max.set(e, f, g);
            return this
        },
        setFromBufferAttribute: function (a) {
            for (var b = Infinity, c = Infinity, d = Infinity, e = -Infinity, f = -Infinity, g = -Infinity, h = 0, l = a.count; h < l; h++) {
                var m = a.getX(h),
                    k = a.getY(h),
                    n = a.getZ(h);
                m < b && (b = m);
                k < c && (c = k);
                n < d && (d = n);
                m > e && (e = m);
                k > f && (f = k);
                n > g && (g = n)
            }
            this.min.set(b, c, d);
            this.max.set(e, f, g);
            return this
        },
        setFromPoints: function (a) {
            this.makeEmpty();
            for (var b = 0, c = a.length; b < c; b++) this.expandByPoint(a[b]);
            return this
        },
        setFromCenterAndSize: function () {
            var a = new p;
            return function (b, c) {
                c = a.copy(c).multiplyScalar(.5);
                this.min.copy(b).sub(c);
                this.max.copy(b).add(c);
                return this
            }
        }(),
        setFromObject: function (a) {
            this.makeEmpty();
            return this.expandByObject(a)
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.min.copy(a.min);
            this.max.copy(a.max);
            return this
        },
        makeEmpty: function () {
            this.min.x = this.min.y = this.min.z = Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;
            return this
        },
        isEmpty: function () {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        },
        getCenter: function (a) {
            void 0 === a && (console.warn("THREE.Box3: .getCenter() target is now required"), a = new p);
            return this.isEmpty() ? a.set(0, 0, 0) : a.addVectors(this.min, this.max).multiplyScalar(.5)
        },
        getSize: function (a) {
            void 0 ===
                a && (console.warn("THREE.Box3: .getSize() target is now required"), a = new p);
            return this.isEmpty() ? a.set(0, 0, 0) : a.subVectors(this.max, this.min)
        },
        expandByPoint: function (a) {
            this.min.min(a);
            this.max.max(a);
            return this
        },
        expandByVector: function (a) {
            this.min.sub(a);
            this.max.add(a);
            return this
        },
        expandByScalar: function (a) {
            this.min.addScalar(-a);
            this.max.addScalar(a);
            return this
        },
        expandByObject: function () {
            function a(a) {
                var f = a.geometry;
                if (void 0 !== f)
                    if (f.isGeometry)
                        for (f = f.vertices, c = 0, d = f.length; c < d; c++) e.copy(f[c]),
                            e.applyMatrix4(a.matrixWorld), b.expandByPoint(e);
                    else if (f.isBufferGeometry && (f = f.attributes.position, void 0 !== f))
                    for (c = 0, d = f.count; c < d; c++) e.fromBufferAttribute(f, c).applyMatrix4(a.matrixWorld), b.expandByPoint(e)
            }
            var b, c, d, e = new p;
            return function (c) {
                b = this;
                c.updateMatrixWorld(!0);
                c.traverse(a);
                return this
            }
        }(),
        containsPoint: function (a) {
            return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
        },
        containsBox: function (a) {
            return this.min.x <= a.min.x && a.max.x <=
                this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z
        },
        getParameter: function (a, b) {
            void 0 === b && (console.warn("THREE.Box3: .getParameter() target is now required"), b = new p);
            return b.set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
        },
        intersectsBox: function (a) {
            return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ?
                !1 : !0
        },
        intersectsSphere: function () {
            var a = new p;
            return function (b) {
                this.clampPoint(b.center, a);
                return a.distanceToSquared(b.center) <= b.radius * b.radius
            }
        }(),
        intersectsPlane: function (a) {
            if (0 < a.normal.x) {
                var b = a.normal.x * this.min.x;
                var c = a.normal.x * this.max.x
            } else b = a.normal.x * this.max.x, c = a.normal.x * this.min.x;
            0 < a.normal.y ? (b += a.normal.y * this.min.y, c += a.normal.y * this.max.y) : (b += a.normal.y * this.max.y, c += a.normal.y * this.min.y);
            0 < a.normal.z ? (b += a.normal.z * this.min.z, c += a.normal.z * this.max.z) : (b += a.normal.z *
                this.max.z, c += a.normal.z * this.min.z);
            return b <= a.constant && c >= a.constant
        },
        intersectsTriangle: function () {
            function a(a) {
                var e;
                var f = 0;
                for (e = a.length - 3; f <= e; f += 3) {
                    h.fromArray(a, f);
                    var g = m.x * Math.abs(h.x) + m.y * Math.abs(h.y) + m.z * Math.abs(h.z),
                        l = b.dot(h),
                        k = c.dot(h),
                        n = d.dot(h);
                    if (Math.max(-Math.max(l, k, n), Math.min(l, k, n)) > g) return !1
                }
                return !0
            }
            var b = new p,
                c = new p,
                d = new p,
                e = new p,
                f = new p,
                g = new p,
                h = new p,
                l = new p,
                m = new p,
                k = new p;
            return function (h) {
                if (this.isEmpty()) return !1;
                this.getCenter(l);
                m.subVectors(this.max,
                    l);
                b.subVectors(h.a, l);
                c.subVectors(h.b, l);
                d.subVectors(h.c, l);
                e.subVectors(c, b);
                f.subVectors(d, c);
                g.subVectors(b, d);
                h = [0, -e.z, e.y, 0, -f.z, f.y, 0, -g.z, g.y, e.z, 0, -e.x, f.z, 0, -f.x, g.z, 0, -g.x, -e.y, e.x, 0, -f.y, f.x, 0, -g.y, g.x, 0];
                if (!a(h)) return !1;
                h = [1, 0, 0, 0, 1, 0, 0, 0, 1];
                if (!a(h)) return !1;
                k.crossVectors(e, f);
                h = [k.x, k.y, k.z];
                return a(h)
            }
        }(),
        clampPoint: function (a, b) {
            void 0 === b && (console.warn("THREE.Box3: .clampPoint() target is now required"), b = new p);
            return b.copy(a).clamp(this.min, this.max)
        },
        distanceToPoint: function () {
            var a =
                new p;
            return function (b) {
                return a.copy(b).clamp(this.min, this.max).sub(b).length()
            }
        }(),
        getBoundingSphere: function () {
            var a = new p;
            return function (b) {
                void 0 === b && (console.warn("THREE.Box3: .getBoundingSphere() target is now required"), b = new Ga);
                this.getCenter(b.center);
                b.radius = .5 * this.getSize(a).length();
                return b
            }
        }(),
        intersect: function (a) {
            this.min.max(a.min);
            this.max.min(a.max);
            this.isEmpty() && this.makeEmpty();
            return this
        },
        union: function (a) {
            this.min.min(a.min);
            this.max.max(a.max);
            return this
        },
        applyMatrix4: function () {
            var a = [new p, new p, new p, new p, new p, new p, new p, new p];
            return function (b) {
                if (this.isEmpty()) return this;
                a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
                a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
                a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
                a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
                a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
                a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
                a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
                a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
                this.setFromPoints(a);
                return this
            }
        }(),
        translate: function (a) {
            this.min.add(a);
            this.max.add(a);
            return this
        },
        equals: function (a) {
            return a.min.equals(this.min) && a.max.equals(this.max)
        }
    });
    Object.assign(Ga.prototype, {
        set: function (a, b) {
            this.center.copy(a);
            this.radius = b;
            return this
        },
        setFromPoints: function () {
            var a = new Va;
            return function (b, c) {
                var d = this.center;
                void 0 !== c ? d.copy(c) : a.setFromPoints(b).getCenter(d);
                for (var e = c = 0, f = b.length; e < f; e++) c = Math.max(c,
                    d.distanceToSquared(b[e]));
                this.radius = Math.sqrt(c);
                return this
            }
        }(),
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.center.copy(a.center);
            this.radius = a.radius;
            return this
        },
        empty: function () {
            return 0 >= this.radius
        },
        containsPoint: function (a) {
            return a.distanceToSquared(this.center) <= this.radius * this.radius
        },
        distanceToPoint: function (a) {
            return a.distanceTo(this.center) - this.radius
        },
        intersectsSphere: function (a) {
            var b = this.radius + a.radius;
            return a.center.distanceToSquared(this.center) <=
                b * b
        },
        intersectsBox: function (a) {
            return a.intersectsSphere(this)
        },
        intersectsPlane: function (a) {
            return Math.abs(a.distanceToPoint(this.center)) <= this.radius
        },
        clampPoint: function (a, b) {
            var c = this.center.distanceToSquared(a);
            void 0 === b && (console.warn("THREE.Sphere: .clampPoint() target is now required"), b = new p);
            b.copy(a);
            c > this.radius * this.radius && (b.sub(this.center).normalize(), b.multiplyScalar(this.radius).add(this.center));
            return b
        },
        getBoundingBox: function (a) {
            void 0 === a && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"),
                a = new Va);
            a.set(this.center, this.center);
            a.expandByScalar(this.radius);
            return a
        },
        applyMatrix4: function (a) {
            this.center.applyMatrix4(a);
            this.radius *= a.getMaxScaleOnAxis();
            return this
        },
        translate: function (a) {
            this.center.add(a);
            return this
        },
        equals: function (a) {
            return a.center.equals(this.center) && a.radius === this.radius
        }
    });
    Object.assign(Ha.prototype, {
        set: function (a, b) {
            this.normal.copy(a);
            this.constant = b;
            return this
        },
        setComponents: function (a, b, c, d) {
            this.normal.set(a, b, c);
            this.constant = d;
            return this
        },
        setFromNormalAndCoplanarPoint: function (a,
            b) {
            this.normal.copy(a);
            this.constant = -b.dot(this.normal);
            return this
        },
        setFromCoplanarPoints: function () {
            var a = new p,
                b = new p;
            return function (c, d, e) {
                d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
                this.setFromNormalAndCoplanarPoint(d, c);
                return this
            }
        }(),
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.normal.copy(a.normal);
            this.constant = a.constant;
            return this
        },
        normalize: function () {
            var a = 1 / this.normal.length();
            this.normal.multiplyScalar(a);
            this.constant *= a;
            return this
        },
        negate: function () {
            this.constant *= -1;
            this.normal.negate();
            return this
        },
        distanceToPoint: function (a) {
            return this.normal.dot(a) + this.constant
        },
        distanceToSphere: function (a) {
            return this.distanceToPoint(a.center) - a.radius
        },
        projectPoint: function (a, b) {
            void 0 === b && (console.warn("THREE.Plane: .projectPoint() target is now required"), b = new p);
            return b.copy(this.normal).multiplyScalar(-this.distanceToPoint(a)).add(a)
        },
        intersectLine: function () {
            var a = new p;
            return function (b, c) {
                void 0 === c && (console.warn("THREE.Plane: .intersectLine() target is now required"),
                    c = new p);
                var d = b.delta(a),
                    e = this.normal.dot(d);
                if (0 === e) {
                    if (0 === this.distanceToPoint(b.start)) return c.copy(b.start)
                } else if (e = -(b.start.dot(this.normal) + this.constant) / e, !(0 > e || 1 < e)) return c.copy(d).multiplyScalar(e).add(b.start)
            }
        }(),
        intersectsLine: function (a) {
            var b = this.distanceToPoint(a.start);
            a = this.distanceToPoint(a.end);
            return 0 > b && 0 < a || 0 > a && 0 < b
        },
        intersectsBox: function (a) {
            return a.intersectsPlane(this)
        },
        intersectsSphere: function (a) {
            return a.intersectsPlane(this)
        },
        coplanarPoint: function (a) {
            void 0 ===
                a && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), a = new p);
            return a.copy(this.normal).multiplyScalar(-this.constant)
        },
        applyMatrix4: function () {
            var a = new p,
                b = new oa;
            return function (c, d) {
                d = d || b.getNormalMatrix(c);
                c = this.coplanarPoint(a).applyMatrix4(c);
                d = this.normal.applyMatrix3(d).normalize();
                this.constant = -c.dot(d);
                return this
            }
        }(),
        translate: function (a) {
            this.constant -= a.dot(this.normal);
            return this
        },
        equals: function (a) {
            return a.normal.equals(this.normal) && a.constant === this.constant
        }
    });
    Object.assign(od.prototype, {
        set: function (a, b, c, d, e, f) {
            var g = this.planes;
            g[0].copy(a);
            g[1].copy(b);
            g[2].copy(c);
            g[3].copy(d);
            g[4].copy(e);
            g[5].copy(f);
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
            return this
        },
        setFromMatrix: function (a) {
            var b = this.planes,
                c = a.elements;
            a = c[0];
            var d = c[1],
                e = c[2],
                f = c[3],
                g = c[4],
                h = c[5],
                l = c[6],
                m = c[7],
                k = c[8],
                n = c[9],
                p = c[10],
                r = c[11],
                q = c[12],
                u = c[13],
                x = c[14];
            c = c[15];
            b[0].setComponents(f -
                a, m - g, r - k, c - q).normalize();
            b[1].setComponents(f + a, m + g, r + k, c + q).normalize();
            b[2].setComponents(f + d, m + h, r + n, c + u).normalize();
            b[3].setComponents(f - d, m - h, r - n, c - u).normalize();
            b[4].setComponents(f - e, m - l, r - p, c - x).normalize();
            b[5].setComponents(f + e, m + l, r + p, c + x).normalize();
            return this
        },
        intersectsObject: function () {
            var a = new Ga;
            return function (b) {
                var c = b.geometry;
                null === c.boundingSphere && c.computeBoundingSphere();
                a.copy(c.boundingSphere).applyMatrix4(b.matrixWorld);
                return this.intersectsSphere(a)
            }
        }(),
        intersectsSprite: function () {
            var a =
                new Ga;
            return function (b) {
                a.center.set(0, 0, 0);
                a.radius = .7071067811865476;
                a.applyMatrix4(b.matrixWorld);
                return this.intersectsSphere(a)
            }
        }(),
        intersectsSphere: function (a) {
            var b = this.planes,
                c = a.center;
            a = -a.radius;
            for (var d = 0; 6 > d; d++)
                if (b[d].distanceToPoint(c) < a) return !1;
            return !0
        },
        intersectsBox: function () {
            var a = new p,
                b = new p;
            return function (c) {
                for (var d = this.planes, e = 0; 6 > e; e++) {
                    var f = d[e];
                    a.x = 0 < f.normal.x ? c.min.x : c.max.x;
                    b.x = 0 < f.normal.x ? c.max.x : c.min.x;
                    a.y = 0 < f.normal.y ? c.min.y : c.max.y;
                    b.y = 0 < f.normal.y ?
                        c.max.y : c.min.y;
                    a.z = 0 < f.normal.z ? c.min.z : c.max.z;
                    b.z = 0 < f.normal.z ? c.max.z : c.min.z;
                    var g = f.distanceToPoint(a);
                    f = f.distanceToPoint(b);
                    if (0 > g && 0 > f) return !1
                }
                return !0
            }
        }(),
        containsPoint: function (a) {
            for (var b = this.planes, c = 0; 6 > c; c++)
                if (0 > b[c].distanceToPoint(a)) return !1;
            return !0
        }
    });
    var W = {
            alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
            alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
            alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
            aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
            aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
            begin_vertex: "\nvec3 transformed = vec3( position );\n",
            beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n",
            bsdfs: "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
            bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
            clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n",
            clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
            clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
            clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
            color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
            color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
            color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
            color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
            common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n",
            cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
            defaultnormal_vertex: "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",
            displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
            displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
            emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
            emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
            encodings_fragment: "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
            encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",
            envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
            envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
            envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
            envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
            fog_vertex: "\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",
            fog_pars_vertex: "#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",
            fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
            fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
            gradientmap_pars_fragment: "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
            lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
            lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
            lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
            lights_pars_begin: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n",
            lights_pars_maps: "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
            lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
            lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
            lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
            lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
            lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n",
            lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n",
            lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
            logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
            logdepthbuf_pars_fragment: "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
            logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
            logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n",
            map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
            map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
            map_particle_fragment: "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
            map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n",
            metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",
            metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
            morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
            morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
            morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
            normal_fragment_begin: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n",
            normal_fragment_maps: "#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
            normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\t\tscale *= float( gl_FrontFacing ) * 2.0 - 1.0;\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
            packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
            premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
            project_vertex: "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",
            dithering_fragment: "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",
            dithering_pars_fragment: "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",
            roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",
            roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
            shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
            shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
            shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
            shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
            skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
            skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
            skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",
            skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
            specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
            specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
            tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
            tonemapping_pars_fragment: "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
            uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
            uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n",
            uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
            uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
            uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
            uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
            worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",
            cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
            cube_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n",
            depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
            depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
            distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",
            distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",
            equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
            equirect_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
            linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
            meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
            meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
            meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
            meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
            meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
            meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
            meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
            normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
            normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
            points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
            points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
            shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n",
            shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n"
        },
        Ca = {
            merge: function (a) {
                for (var b = {}, c = 0; c < a.length; c++) {
                    var d = this.clone(a[c]),
                        e;
                    for (e in d) b[e] = d[e]
                }
                return b
            },
            clone: function (a) {
                var b = {},
                    c;
                for (c in a) {
                    b[c] = {};
                    for (var d in a[c]) {
                        var e = a[c][d];
                        e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture) ? b[c][d] = e.clone() : Array.isArray(e) ? b[c][d] = e.slice() : b[c][d] = e
                    }
                }
                return b
            }
        },
        Lg = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };
    Object.assign(L.prototype, {
        isColor: !0,
        r: 1,
        g: 1,
        b: 1,
        set: function (a) {
            a && a.isColor ? this.copy(a) : "number" === typeof a ? this.setHex(a) : "string" === typeof a && this.setStyle(a);
            return this
        },
        setScalar: function (a) {
            this.b = this.g = this.r = a;
            return this
        },
        setHex: function (a) {
            a = Math.floor(a);
            this.r = (a >> 16 & 255) / 255;
            this.g = (a >> 8 & 255) / 255;
            this.b = (a & 255) / 255;
            return this
        },
        setRGB: function (a, b, c) {
            this.r = a;
            this.g = b;
            this.b = c;
            return this
        },
        setHSL: function () {
            function a(a, c, d) {
                0 > d && (d += 1);
                1 < d && --d;
                return d < 1 / 6 ? a + 6 * (c - a) * d : .5 > d ? c : d < 2 / 3 ? a + 6 * (c - a) * (2 / 3 - d) : a
            }
            return function (b,
                c, d) {
                b = R.euclideanModulo(b, 1);
                c = R.clamp(c, 0, 1);
                d = R.clamp(d, 0, 1);
                0 === c ? this.r = this.g = this.b = d : (c = .5 >= d ? d * (1 + c) : d + c - d * c, d = 2 * d - c, this.r = a(d, c, b + 1 / 3), this.g = a(d, c, b), this.b = a(d, c, b - 1 / 3));
                return this
            }
        }(),
        setStyle: function (a) {
            function b(b) {
                void 0 !== b && 1 > parseFloat(b) && console.warn("THREE.Color: Alpha component of " + a + " will be ignored.")
            }
            var c;
            if (c = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)) {
                var d = c[2];
                switch (c[1]) {
                    case "rgb":
                    case "rgba":
                        if (c = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) return this.r =
                            Math.min(255, parseInt(c[1], 10)) / 255, this.g = Math.min(255, parseInt(c[2], 10)) / 255, this.b = Math.min(255, parseInt(c[3], 10)) / 255, b(c[5]), this;
                        if (c = /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) return this.r = Math.min(100, parseInt(c[1], 10)) / 100, this.g = Math.min(100, parseInt(c[2], 10)) / 100, this.b = Math.min(100, parseInt(c[3], 10)) / 100, b(c[5]), this;
                        break;
                    case "hsl":
                    case "hsla":
                        if (c = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) {
                            d = parseFloat(c[1]) /
                                360;
                            var e = parseInt(c[2], 10) / 100,
                                f = parseInt(c[3], 10) / 100;
                            b(c[5]);
                            return this.setHSL(d, e, f)
                        }
                }
            } else if (c = /^#([A-Fa-f0-9]+)$/.exec(a)) {
                c = c[1];
                d = c.length;
                if (3 === d) return this.r = parseInt(c.charAt(0) + c.charAt(0), 16) / 255, this.g = parseInt(c.charAt(1) + c.charAt(1), 16) / 255, this.b = parseInt(c.charAt(2) + c.charAt(2), 16) / 255, this;
                if (6 === d) return this.r = parseInt(c.charAt(0) + c.charAt(1), 16) / 255, this.g = parseInt(c.charAt(2) + c.charAt(3), 16) / 255, this.b = parseInt(c.charAt(4) + c.charAt(5), 16) / 255, this
            }
            a && 0 < a.length && (c = Lg[a],
                void 0 !== c ? this.setHex(c) : console.warn("THREE.Color: Unknown color " + a));
            return this
        },
        clone: function () {
            return new this.constructor(this.r, this.g, this.b)
        },
        copy: function (a) {
            this.r = a.r;
            this.g = a.g;
            this.b = a.b;
            return this
        },
        copyGammaToLinear: function (a, b) {
            void 0 === b && (b = 2);
            this.r = Math.pow(a.r, b);
            this.g = Math.pow(a.g, b);
            this.b = Math.pow(a.b, b);
            return this
        },
        copyLinearToGamma: function (a, b) {
            void 0 === b && (b = 2);
            b = 0 < b ? 1 / b : 1;
            this.r = Math.pow(a.r, b);
            this.g = Math.pow(a.g, b);
            this.b = Math.pow(a.b, b);
            return this
        },
        convertGammaToLinear: function () {
            var a =
                this.r,
                b = this.g,
                c = this.b;
            this.r = a * a;
            this.g = b * b;
            this.b = c * c;
            return this
        },
        convertLinearToGamma: function () {
            this.r = Math.sqrt(this.r);
            this.g = Math.sqrt(this.g);
            this.b = Math.sqrt(this.b);
            return this
        },
        getHex: function () {
            return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
        },
        getHexString: function () {
            return ("000000" + this.getHex().toString(16)).slice(-6)
        },
        getHSL: function (a) {
            void 0 === a && (console.warn("THREE.Color: .getHSL() target is now required"), a = {
                h: 0,
                s: 0,
                l: 0
            });
            var b = this.r,
                c = this.g,
                d = this.b,
                e = Math.max(b, c, d),
                f =
                Math.min(b, c, d),
                g, h = (f + e) / 2;
            if (f === e) f = g = 0;
            else {
                var l = e - f;
                f = .5 >= h ? l / (e + f) : l / (2 - e - f);
                switch (e) {
                    case b:
                        g = (c - d) / l + (c < d ? 6 : 0);
                        break;
                    case c:
                        g = (d - b) / l + 2;
                        break;
                    case d:
                        g = (b - c) / l + 4
                }
                g /= 6
            }
            a.h = g;
            a.s = f;
            a.l = h;
            return a
        },
        getStyle: function () {
            return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
        },
        offsetHSL: function () {
            var a = {};
            return function (b, c, d) {
                this.getHSL(a);
                a.h += b;
                a.s += c;
                a.l += d;
                this.setHSL(a.h, a.s, a.l);
                return this
            }
        }(),
        add: function (a) {
            this.r += a.r;
            this.g += a.g;
            this.b += a.b;
            return this
        },
        addColors: function (a,
            b) {
            this.r = a.r + b.r;
            this.g = a.g + b.g;
            this.b = a.b + b.b;
            return this
        },
        addScalar: function (a) {
            this.r += a;
            this.g += a;
            this.b += a;
            return this
        },
        sub: function (a) {
            this.r = Math.max(0, this.r - a.r);
            this.g = Math.max(0, this.g - a.g);
            this.b = Math.max(0, this.b - a.b);
            return this
        },
        multiply: function (a) {
            this.r *= a.r;
            this.g *= a.g;
            this.b *= a.b;
            return this
        },
        multiplyScalar: function (a) {
            this.r *= a;
            this.g *= a;
            this.b *= a;
            return this
        },
        lerp: function (a, b) {
            this.r += (a.r - this.r) * b;
            this.g += (a.g - this.g) * b;
            this.b += (a.b - this.b) * b;
            return this
        },
        equals: function (a) {
            return a.r ===
                this.r && a.g === this.g && a.b === this.b
        },
        fromArray: function (a, b) {
            void 0 === b && (b = 0);
            this.r = a[b];
            this.g = a[b + 1];
            this.b = a[b + 2];
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.r;
            a[b + 1] = this.g;
            a[b + 2] = this.b;
            return a
        },
        toJSON: function () {
            return this.getHex()
        }
    });
    var D = {
            common: {
                diffuse: {
                    value: new L(15658734)
                },
                opacity: {
                    value: 1
                },
                map: {
                    value: null
                },
                uvTransform: {
                    value: new oa
                },
                alphaMap: {
                    value: null
                }
            },
            specularmap: {
                specularMap: {
                    value: null
                }
            },
            envmap: {
                envMap: {
                    value: null
                },
                flipEnvMap: {
                    value: -1
                },
                reflectivity: {
                    value: 1
                },
                refractionRatio: {
                    value: .98
                },
                maxMipLevel: {
                    value: 0
                }
            },
            aomap: {
                aoMap: {
                    value: null
                },
                aoMapIntensity: {
                    value: 1
                }
            },
            lightmap: {
                lightMap: {
                    value: null
                },
                lightMapIntensity: {
                    value: 1
                }
            },
            emissivemap: {
                emissiveMap: {
                    value: null
                }
            },
            bumpmap: {
                bumpMap: {
                    value: null
                },
                bumpScale: {
                    value: 1
                }
            },
            normalmap: {
                normalMap: {
                    value: null
                },
                normalScale: {
                    value: new A(1, 1)
                }
            },
            displacementmap: {
                displacementMap: {
                    value: null
                },
                displacementScale: {
                    value: 1
                },
                displacementBias: {
                    value: 0
                }
            },
            roughnessmap: {
                roughnessMap: {
                    value: null
                }
            },
            metalnessmap: {
                metalnessMap: {
                    value: null
                }
            },
            gradientmap: {
                gradientMap: {
                    value: null
                }
            },
            fog: {
                fogDensity: {
                    value: 2.5E-4
                },
                fogNear: {
                    value: 1
                },
                fogFar: {
                    value: 2E3
                },
                fogColor: {
                    value: new L(16777215)
                }
            },
            lights: {
                ambientLightColor: {
                    value: []
                },
                directionalLights: {
                    value: [],
                    properties: {
                        direction: {},
                        color: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                directionalShadowMap: {
                    value: []
                },
                directionalShadowMatrix: {
                    value: []
                },
                spotLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        direction: {},
                        distance: {},
                        coneCos: {},
                        penumbraCos: {},
                        decay: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                spotShadowMap: {
                    value: []
                },
                spotShadowMatrix: {
                    value: []
                },
                pointLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        decay: {},
                        distance: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {},
                        shadowCameraNear: {},
                        shadowCameraFar: {}
                    }
                },
                pointShadowMap: {
                    value: []
                },
                pointShadowMatrix: {
                    value: []
                },
                hemisphereLights: {
                    value: [],
                    properties: {
                        direction: {},
                        skyColor: {},
                        groundColor: {}
                    }
                },
                rectAreaLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        width: {},
                        height: {}
                    }
                }
            },
            points: {
                diffuse: {
                    value: new L(15658734)
                },
                opacity: {
                    value: 1
                },
                size: {
                    value: 1
                },
                scale: {
                    value: 1
                },
                map: {
                    value: null
                },
                uvTransform: {
                    value: new oa
                }
            }
        },
        rb = {
            basic: {
                uniforms: Ca.merge([D.common, D.specularmap, D.envmap, D.aomap, D.lightmap, D.fog]),
                vertexShader: W.meshbasic_vert,
                fragmentShader: W.meshbasic_frag
            },
            lambert: {
                uniforms: Ca.merge([D.common, D.specularmap, D.envmap, D.aomap, D.lightmap, D.emissivemap, D.fog, D.lights, {
                    emissive: {
                        value: new L(0)
                    }
                }]),
                vertexShader: W.meshlambert_vert,
                fragmentShader: W.meshlambert_frag
            },
            phong: {
                uniforms: Ca.merge([D.common, D.specularmap,
                    D.envmap, D.aomap, D.lightmap, D.emissivemap, D.bumpmap, D.normalmap, D.displacementmap, D.gradientmap, D.fog, D.lights, {
                        emissive: {
                            value: new L(0)
                        },
                        specular: {
                            value: new L(1118481)
                        },
                        shininess: {
                            value: 30
                        }
                    }
                ]),
                vertexShader: W.meshphong_vert,
                fragmentShader: W.meshphong_frag
            },
            standard: {
                uniforms: Ca.merge([D.common, D.envmap, D.aomap, D.lightmap, D.emissivemap, D.bumpmap, D.normalmap, D.displacementmap, D.roughnessmap, D.metalnessmap, D.fog, D.lights, {
                    emissive: {
                        value: new L(0)
                    },
                    roughness: {
                        value: .5
                    },
                    metalness: {
                        value: .5
                    },
                    envMapIntensity: {
                        value: 1
                    }
                }]),
                vertexShader: W.meshphysical_vert,
                fragmentShader: W.meshphysical_frag
            },
            points: {
                uniforms: Ca.merge([D.points, D.fog]),
                vertexShader: W.points_vert,
                fragmentShader: W.points_frag
            },
            dashed: {
                uniforms: Ca.merge([D.common, D.fog, {
                    scale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    totalSize: {
                        value: 2
                    }
                }]),
                vertexShader: W.linedashed_vert,
                fragmentShader: W.linedashed_frag
            },
            depth: {
                uniforms: Ca.merge([D.common, D.displacementmap]),
                vertexShader: W.depth_vert,
                fragmentShader: W.depth_frag
            },
            normal: {
                uniforms: Ca.merge([D.common, D.bumpmap, D.normalmap,
                    D.displacementmap, {
                        opacity: {
                            value: 1
                        }
                    }
                ]),
                vertexShader: W.normal_vert,
                fragmentShader: W.normal_frag
            },
            cube: {
                uniforms: {
                    tCube: {
                        value: null
                    },
                    tFlip: {
                        value: -1
                    },
                    opacity: {
                        value: 1
                    }
                },
                vertexShader: W.cube_vert,
                fragmentShader: W.cube_frag
            },
            equirect: {
                uniforms: {
                    tEquirect: {
                        value: null
                    }
                },
                vertexShader: W.equirect_vert,
                fragmentShader: W.equirect_frag
            },
            distanceRGBA: {
                uniforms: Ca.merge([D.common, D.displacementmap, {
                    referencePosition: {
                        value: new p
                    },
                    nearDistance: {
                        value: 1
                    },
                    farDistance: {
                        value: 1E3
                    }
                }]),
                vertexShader: W.distanceRGBA_vert,
                fragmentShader: W.distanceRGBA_frag
            },
            shadow: {
                uniforms: Ca.merge([D.lights, D.fog, {
                    color: {
                        value: new L(0)
                    },
                    opacity: {
                        value: 1
                    }
                }]),
                vertexShader: W.shadow_vert,
                fragmentShader: W.shadow_frag
            }
        };
    rb.physical = {
        uniforms: Ca.merge([rb.standard.uniforms, {
            clearCoat: {
                value: 0
            },
            clearCoatRoughness: {
                value: 0
            }
        }]),
        vertexShader: W.meshphysical_vert,
        fragmentShader: W.meshphysical_frag
    };
    kb.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" ");
    kb.DefaultOrder = "XYZ";
    Object.defineProperties(kb.prototype, {
        x: {
            get: function () {
                return this._x
            },
            set: function (a) {
                this._x = a;
                this.onChangeCallback()
            }
        },
        y: {
            get: function () {
                return this._y
            },
            set: function (a) {
                this._y = a;
                this.onChangeCallback()
            }
        },
        z: {
            get: function () {
                return this._z
            },
            set: function (a) {
                this._z = a;
                this.onChangeCallback()
            }
        },
        order: {
            get: function () {
                return this._order
            },
            set: function (a) {
                this._order = a;
                this.onChangeCallback()
            }
        }
    });
    Object.assign(kb.prototype, {
        isEuler: !0,
        set: function (a, b, c, d) {
            this._x = a;
            this._y = b;
            this._z = c;
            this._order = d || this._order;
            this.onChangeCallback();
            return this
        },
        clone: function () {
            return new this.constructor(this._x,
                this._y, this._z, this._order)
        },
        copy: function (a) {
            this._x = a._x;
            this._y = a._y;
            this._z = a._z;
            this._order = a._order;
            this.onChangeCallback();
            return this
        },
        setFromRotationMatrix: function (a, b, c) {
            var d = R.clamp,
                e = a.elements;
            a = e[0];
            var f = e[4],
                g = e[8],
                h = e[1],
                l = e[5],
                m = e[9],
                k = e[2],
                n = e[6];
            e = e[10];
            b = b || this._order;
            "XYZ" === b ? (this._y = Math.asin(d(g, -1, 1)), .99999 > Math.abs(g) ? (this._x = Math.atan2(-m, e), this._z = Math.atan2(-f, a)) : (this._x = Math.atan2(n, l), this._z = 0)) : "YXZ" === b ? (this._x = Math.asin(-d(m, -1, 1)), .99999 > Math.abs(m) ?
                (this._y = Math.atan2(g, e), this._z = Math.atan2(h, l)) : (this._y = Math.atan2(-k, a), this._z = 0)) : "ZXY" === b ? (this._x = Math.asin(d(n, -1, 1)), .99999 > Math.abs(n) ? (this._y = Math.atan2(-k, e), this._z = Math.atan2(-f, l)) : (this._y = 0, this._z = Math.atan2(h, a))) : "ZYX" === b ? (this._y = Math.asin(-d(k, -1, 1)), .99999 > Math.abs(k) ? (this._x = Math.atan2(n, e), this._z = Math.atan2(h, a)) : (this._x = 0, this._z = Math.atan2(-f, l))) : "YZX" === b ? (this._z = Math.asin(d(h, -1, 1)), .99999 > Math.abs(h) ? (this._x = Math.atan2(-m, l), this._y = Math.atan2(-k, a)) : (this._x =
                0, this._y = Math.atan2(g, e))) : "XZY" === b ? (this._z = Math.asin(-d(f, -1, 1)), .99999 > Math.abs(f) ? (this._x = Math.atan2(n, l), this._y = Math.atan2(g, a)) : (this._x = Math.atan2(-m, e), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + b);
            this._order = b;
            if (!1 !== c) this.onChangeCallback();
            return this
        },
        setFromQuaternion: function () {
            var a = new K;
            return function (b, c, d) {
                a.makeRotationFromQuaternion(b);
                return this.setFromRotationMatrix(a, c, d)
            }
        }(),
        setFromVector3: function (a, b) {
            return this.set(a.x,
                a.y, a.z, b || this._order)
        },
        reorder: function () {
            var a = new ia;
            return function (b) {
                a.setFromEuler(this);
                return this.setFromQuaternion(a, b)
            }
        }(),
        equals: function (a) {
            return a._x === this._x && a._y === this._y && a._z === this._z && a._order === this._order
        },
        fromArray: function (a) {
            this._x = a[0];
            this._y = a[1];
            this._z = a[2];
            void 0 !== a[3] && (this._order = a[3]);
            this.onChangeCallback();
            return this
        },
        toArray: function (a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this._x;
            a[b + 1] = this._y;
            a[b + 2] = this._z;
            a[b + 3] = this._order;
            return a
        },
        toVector3: function (a) {
            return a ?
                a.set(this._x, this._y, this._z) : new p(this._x, this._y, this._z)
        },
        onChange: function (a) {
            this.onChangeCallback = a;
            return this
        },
        onChangeCallback: function () {}
    });
    Object.assign(Sd.prototype, {
        set: function (a) {
            this.mask = 1 << a | 0
        },
        enable: function (a) {
            this.mask = this.mask | 1 << a | 0
        },
        toggle: function (a) {
            this.mask ^= 1 << a | 0
        },
        disable: function (a) {
            this.mask &= ~(1 << a | 0)
        },
        test: function (a) {
            return 0 !== (this.mask & a.mask)
        }
    });
    var zf = 0;
    B.DefaultUp = new p(0, 1, 0);
    B.DefaultMatrixAutoUpdate = !0;
    B.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: B,
        isObject3D: !0,
        onBeforeRender: function () {},
        onAfterRender: function () {},
        applyMatrix: function (a) {
            this.matrix.multiplyMatrices(a, this.matrix);
            this.matrix.decompose(this.position, this.quaternion, this.scale)
        },
        applyQuaternion: function (a) {
            this.quaternion.premultiply(a);
            return this
        },
        setRotationFromAxisAngle: function (a, b) {
            this.quaternion.setFromAxisAngle(a, b)
        },
        setRotationFromEuler: function (a) {
            this.quaternion.setFromEuler(a, !0)
        },
        setRotationFromMatrix: function (a) {
            this.quaternion.setFromRotationMatrix(a)
        },
        setRotationFromQuaternion: function (a) {
            this.quaternion.copy(a)
        },
        rotateOnAxis: function () {
            var a = new ia;
            return function (b, c) {
                a.setFromAxisAngle(b, c);
                this.quaternion.multiply(a);
                return this
            }
        }(),
        rotateOnWorldAxis: function () {
            var a = new ia;
            return function (b, c) {
                a.setFromAxisAngle(b, c);
                this.quaternion.premultiply(a);
                return this
            }
        }(),
        rotateX: function () {
            var a = new p(1, 0, 0);
            return function (b) {
                return this.rotateOnAxis(a, b)
            }
        }(),
        rotateY: function () {
            var a = new p(0, 1, 0);
            return function (b) {
                return this.rotateOnAxis(a, b)
            }
        }(),
        rotateZ: function () {
            var a = new p(0, 0, 1);
            return function (b) {
                return this.rotateOnAxis(a, b)
            }
        }(),
        translateOnAxis: function () {
            var a = new p;
            return function (b, c) {
                a.copy(b).applyQuaternion(this.quaternion);
                this.position.add(a.multiplyScalar(c));
                return this
            }
        }(),
        translateX: function () {
            var a = new p(1, 0, 0);
            return function (b) {
                return this.translateOnAxis(a, b)
            }
        }(),
        translateY: function () {
            var a = new p(0, 1, 0);
            return function (b) {
                return this.translateOnAxis(a, b)
            }
        }(),
        translateZ: function () {
            var a = new p(0, 0, 1);
            return function (b) {
                return this.translateOnAxis(a,
                    b)
            }
        }(),
        localToWorld: function (a) {
            return a.applyMatrix4(this.matrixWorld)
        },
        worldToLocal: function () {
            var a = new K;
            return function (b) {
                return b.applyMatrix4(a.getInverse(this.matrixWorld))
            }
        }(),
        lookAt: function () {
            var a = new K,
                b = new p;
            return function (c, d, e) {
                c.isVector3 ? b.copy(c) : b.set(c, d, e);
                this.isCamera ? a.lookAt(this.position, b, this.up) : a.lookAt(b, this.position, this.up);
                this.quaternion.setFromRotationMatrix(a)
            }
        }(),
        add: function (a) {
            if (1 < arguments.length) {
                for (var b = 0; b < arguments.length; b++) this.add(arguments[b]);
                return this
            }
            if (a === this) return console.error("THREE.Object3D.add: object can't be added as a child of itself.", a), this;
            a && a.isObject3D ? (null !== a.parent && a.parent.remove(a), a.parent = this, a.dispatchEvent({
                type: "added"
            }), this.children.push(a)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", a);
            return this
        },
        remove: function (a) {
            if (1 < arguments.length) {
                for (var b = 0; b < arguments.length; b++) this.remove(arguments[b]);
                return this
            }
            b = this.children.indexOf(a); - 1 !== b && (a.parent = null, a.dispatchEvent({
                    type: "removed"
                }),
                this.children.splice(b, 1));
            return this
        },
        getObjectById: function (a) {
            return this.getObjectByProperty("id", a)
        },
        getObjectByName: function (a) {
            return this.getObjectByProperty("name", a)
        },
        getObjectByProperty: function (a, b) {
            if (this[a] === b) return this;
            for (var c = 0, d = this.children.length; c < d; c++) {
                var e = this.children[c].getObjectByProperty(a, b);
                if (void 0 !== e) return e
            }
        },
        getWorldPosition: function (a) {
            void 0 === a && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), a = new p);
            this.updateMatrixWorld(!0);
            return a.setFromMatrixPosition(this.matrixWorld)
        },
        getWorldQuaternion: function () {
            var a = new p,
                b = new p;
            return function (c) {
                void 0 === c && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), c = new ia);
                this.updateMatrixWorld(!0);
                this.matrixWorld.decompose(a, c, b);
                return c
            }
        }(),
        getWorldScale: function () {
            var a = new p,
                b = new ia;
            return function (c) {
                void 0 === c && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), c = new p);
                this.updateMatrixWorld(!0);
                this.matrixWorld.decompose(a,
                    b, c);
                return c
            }
        }(),
        getWorldDirection: function () {
            var a = new ia;
            return function (b) {
                void 0 === b && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), b = new p);
                this.getWorldQuaternion(a);
                return b.set(0, 0, 1).applyQuaternion(a)
            }
        }(),
        raycast: function () {},
        traverse: function (a) {
            a(this);
            for (var b = this.children, c = 0, d = b.length; c < d; c++) b[c].traverse(a)
        },
        traverseVisible: function (a) {
            if (!1 !== this.visible) {
                a(this);
                for (var b = this.children, c = 0, d = b.length; c < d; c++) b[c].traverseVisible(a)
            }
        },
        traverseAncestors: function (a) {
            var b =
                this.parent;
            null !== b && (a(b), b.traverseAncestors(a))
        },
        updateMatrix: function () {
            this.matrix.compose(this.position, this.quaternion, this.scale);
            this.matrixWorldNeedsUpdate = !0
        },
        updateMatrixWorld: function (a) {
            this.matrixAutoUpdate && this.updateMatrix();
            if (this.matrixWorldNeedsUpdate || a) null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
            for (var b = this.children, c = 0, d = b.length; c < d; c++) b[c].updateMatrixWorld(a)
        },
        toJSON: function (a) {
            function b(b, c) {
                void 0 === b[c.uuid] && (b[c.uuid] = c.toJSON(a));
                return c.uuid
            }

            function c(a) {
                var b = [],
                    c;
                for (c in a) {
                    var d = a[c];
                    delete d.metadata;
                    b.push(d)
                }
                return b
            }
            var d = void 0 === a || "string" === typeof a,
                e = {};
            d && (a = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {}
            }, e.metadata = {
                version: 4.5,
                type: "Object",
                generator: "Object3D.toJSON"
            });
            var f = {};
            f.uuid = this.uuid;
            f.type = this.type;
            "" !== this.name && (f.name = this.name);
            !0 === this.castShadow && (f.castShadow = !0);
            !0 === this.receiveShadow && (f.receiveShadow = !0);
            !1 === this.visible && (f.visible = !1);
            !1 === this.frustumCulled && (f.frustumCulled = !1);
            0 !== this.renderOrder && (f.renderOrder = this.renderOrder);
            "{}" !== JSON.stringify(this.userData) && (f.userData = this.userData);
            f.matrix = this.matrix.toArray();
            if (void 0 !== this.geometry) {
                f.geometry = b(a.geometries, this.geometry);
                var g = this.geometry.parameters;
                if (void 0 !== g && void 0 !== g.shapes)
                    if (g = g.shapes, Array.isArray(g))
                        for (var h = 0, l = g.length; h < l; h++) b(a.shapes, g[h]);
                    else b(a.shapes, g)
            }
            if (void 0 !== this.material)
                if (Array.isArray(this.material)) {
                    g = [];
                    h = 0;
                    for (l = this.material.length; h < l; h++) g.push(b(a.materials, this.material[h]));
                    f.material = g
                } else f.material = b(a.materials, this.material);
            if (0 < this.children.length)
                for (f.children = [], h = 0; h < this.children.length; h++) f.children.push(this.children[h].toJSON(a).object);
            if (d) {
                d = c(a.geometries);
                h = c(a.materials);
                l = c(a.textures);
                var m = c(a.images);
                g = c(a.shapes);
                0 < d.length && (e.geometries = d);
                0 < h.length && (e.materials = h);
                0 < l.length && (e.textures = l);
                0 < m.length && (e.images = m);
                0 < g.length && (e.shapes = g)
            }
            e.object = f;
            return e
        },
        clone: function (a) {
            return (new this.constructor).copy(this, a)
        },
        copy: function (a, b) {
            void 0 === b && (b = !0);
            this.name = a.name;
            this.up.copy(a.up);
            this.position.copy(a.position);
            this.quaternion.copy(a.quaternion);
            this.scale.copy(a.scale);
            this.matrix.copy(a.matrix);
            this.matrixWorld.copy(a.matrixWorld);
            this.matrixAutoUpdate = a.matrixAutoUpdate;
            this.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
            this.layers.mask = a.layers.mask;
            this.visible = a.visible;
            this.castShadow = a.castShadow;
            this.receiveShadow = a.receiveShadow;
            this.frustumCulled = a.frustumCulled;
            this.renderOrder = a.renderOrder;
            this.userData = JSON.parse(JSON.stringify(a.userData));
            if (!0 === b)
                for (b = 0; b < a.children.length; b++) this.add(a.children[b].clone());
            return this
        }
    });
    Qa.prototype = Object.assign(Object.create(B.prototype), {
        constructor: Qa,
        isCamera: !0,
        copy: function (a, b) {
            B.prototype.copy.call(this, a, b);
            this.matrixWorldInverse.copy(a.matrixWorldInverse);
            this.projectionMatrix.copy(a.projectionMatrix);
            return this
        },
        getWorldDirection: function () {
            var a = new ia;
            return function (b) {
                void 0 ===
                    b && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), b = new p);
                this.getWorldQuaternion(a);
                return b.set(0, 0, -1).applyQuaternion(a)
            }
        }(),
        updateMatrixWorld: function (a) {
            B.prototype.updateMatrixWorld.call(this, a);
            this.matrixWorldInverse.getInverse(this.matrixWorld)
        },
        clone: function () {
            return (new this.constructor).copy(this)
        }
    });
    Jb.prototype = Object.assign(Object.create(Qa.prototype), {
        constructor: Jb,
        isOrthographicCamera: !0,
        copy: function (a, b) {
            Qa.prototype.copy.call(this, a, b);
            this.left =
                a.left;
            this.right = a.right;
            this.top = a.top;
            this.bottom = a.bottom;
            this.near = a.near;
            this.far = a.far;
            this.zoom = a.zoom;
            this.view = null === a.view ? null : Object.assign({}, a.view);
            return this
        },
        setViewOffset: function (a, b, c, d, e, f) {
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            });
            this.view.enabled = !0;
            this.view.fullWidth = a;
            this.view.fullHeight = b;
            this.view.offsetX = c;
            this.view.offsetY = d;
            this.view.width = e;
            this.view.height = f;
            this.updateProjectionMatrix()
        },
        clearViewOffset: function () {
            null !==
                this.view && (this.view.enabled = !1);
            this.updateProjectionMatrix()
        },
        updateProjectionMatrix: function () {
            var a = (this.right - this.left) / (2 * this.zoom),
                b = (this.top - this.bottom) / (2 * this.zoom),
                c = (this.right + this.left) / 2,
                d = (this.top + this.bottom) / 2,
                e = c - a;
            c += a;
            a = d + b;
            b = d - b;
            if (null !== this.view && this.view.enabled) {
                c = this.zoom / (this.view.width / this.view.fullWidth);
                b = this.zoom / (this.view.height / this.view.fullHeight);
                var f = (this.right - this.left) / this.view.width;
                d = (this.top - this.bottom) / this.view.height;
                e += this.view.offsetX /
                    c * f;
                c = e + this.view.width / c * f;
                a -= this.view.offsetY / b * d;
                b = a - this.view.height / b * d
            }
            this.projectionMatrix.makeOrthographic(e, c, a, b, this.near, this.far)
        },
        toJSON: function (a) {
            a = B.prototype.toJSON.call(this, a);
            a.object.zoom = this.zoom;
            a.object.left = this.left;
            a.object.right = this.right;
            a.object.top = this.top;
            a.object.bottom = this.bottom;
            a.object.near = this.near;
            a.object.far = this.far;
            null !== this.view && (a.object.view = Object.assign({}, this.view));
            return a
        }
    });
    Object.assign(Wa.prototype, {
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.normal.copy(a.normal);
            this.color.copy(a.color);
            this.materialIndex = a.materialIndex;
            for (var b = 0, c = a.vertexNormals.length; b < c; b++) this.vertexNormals[b] = a.vertexNormals[b].clone();
            b = 0;
            for (c = a.vertexColors.length; b < c; b++) this.vertexColors[b] = a.vertexColors[b].clone();
            return this
        }
    });
    var Af = 0;
    M.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: M,
        isGeometry: !0,
        applyMatrix: function (a) {
            for (var b = (new oa).getNormalMatrix(a), c = 0, d = this.vertices.length; c <
                d; c++) this.vertices[c].applyMatrix4(a);
            c = 0;
            for (d = this.faces.length; c < d; c++) {
                a = this.faces[c];
                a.normal.applyMatrix3(b).normalize();
                for (var e = 0, f = a.vertexNormals.length; e < f; e++) a.vertexNormals[e].applyMatrix3(b).normalize()
            }
            null !== this.boundingBox && this.computeBoundingBox();
            null !== this.boundingSphere && this.computeBoundingSphere();
            this.normalsNeedUpdate = this.verticesNeedUpdate = !0;
            return this
        },
        rotateX: function () {
            var a = new K;
            return function (b) {
                a.makeRotationX(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateY: function () {
            var a =
                new K;
            return function (b) {
                a.makeRotationY(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateZ: function () {
            var a = new K;
            return function (b) {
                a.makeRotationZ(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        translate: function () {
            var a = new K;
            return function (b, c, d) {
                a.makeTranslation(b, c, d);
                this.applyMatrix(a);
                return this
            }
        }(),
        scale: function () {
            var a = new K;
            return function (b, c, d) {
                a.makeScale(b, c, d);
                this.applyMatrix(a);
                return this
            }
        }(),
        lookAt: function () {
            var a = new B;
            return function (b) {
                a.lookAt(b);
                a.updateMatrix();
                this.applyMatrix(a.matrix)
            }
        }(),
        fromBufferGeometry: function (a) {
            function b(a, b, d, e) {
                var f = void 0 !== g ? [k[a].clone(), k[b].clone(), k[d].clone()] : [],
                    p = void 0 !== h ? [c.colors[a].clone(), c.colors[b].clone(), c.colors[d].clone()] : [];
                e = new Wa(a, b, d, f, p, e);
                c.faces.push(e);
                void 0 !== l && c.faceVertexUvs[0].push([n[a].clone(), n[b].clone(), n[d].clone()]);
                void 0 !== m && c.faceVertexUvs[1].push([t[a].clone(), t[b].clone(), t[d].clone()])
            }
            var c = this,
                d = null !== a.index ? a.index.array : void 0,
                e = a.attributes,
                f = e.position.array,
                g = void 0 !== e.normal ? e.normal.array :
                void 0,
                h = void 0 !== e.color ? e.color.array : void 0,
                l = void 0 !== e.uv ? e.uv.array : void 0,
                m = void 0 !== e.uv2 ? e.uv2.array : void 0;
            void 0 !== m && (this.faceVertexUvs[1] = []);
            for (var k = [], n = [], t = [], r = e = 0; e < f.length; e += 3, r += 2) c.vertices.push(new p(f[e], f[e + 1], f[e + 2])), void 0 !== g && k.push(new p(g[e], g[e + 1], g[e + 2])), void 0 !== h && c.colors.push(new L(h[e], h[e + 1], h[e + 2])), void 0 !== l && n.push(new A(l[r], l[r + 1])), void 0 !== m && t.push(new A(m[r], m[r + 1]));
            var q = a.groups;
            if (0 < q.length)
                for (e = 0; e < q.length; e++) {
                    f = q[e];
                    var u = f.start,
                        x =
                        f.count;
                    r = u;
                    for (u += x; r < u; r += 3) void 0 !== d ? b(d[r], d[r + 1], d[r + 2], f.materialIndex) : b(r, r + 1, r + 2, f.materialIndex)
                } else if (void 0 !== d)
                    for (e = 0; e < d.length; e += 3) b(d[e], d[e + 1], d[e + 2]);
                else
                    for (e = 0; e < f.length / 3; e += 3) b(e, e + 1, e + 2);
            this.computeFaceNormals();
            null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
            null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
            return this
        },
        center: function () {
            var a = new p;
            return function () {
                this.computeBoundingBox();
                this.boundingBox.getCenter(a).negate();
                this.translate(a.x, a.y, a.z);
                return this
            }
        }(),
        normalize: function () {
            this.computeBoundingSphere();
            var a = this.boundingSphere.center,
                b = this.boundingSphere.radius;
            b = 0 === b ? 1 : 1 / b;
            var c = new K;
            c.set(b, 0, 0, -b * a.x, 0, b, 0, -b * a.y, 0, 0, b, -b * a.z, 0, 0, 0, 1);
            this.applyMatrix(c);
            return this
        },
        computeFaceNormals: function () {
            for (var a = new p, b = new p, c = 0, d = this.faces.length; c < d; c++) {
                var e = this.faces[c],
                    f = this.vertices[e.a],
                    g = this.vertices[e.b];
                a.subVectors(this.vertices[e.c], g);
                b.subVectors(f, g);
                a.cross(b);
                a.normalize();
                e.normal.copy(a)
            }
        },
        computeVertexNormals: function (a) {
            void 0 === a && (a = !0);
            var b;
            var c = Array(this.vertices.length);
            var d = 0;
            for (b = this.vertices.length; d < b; d++) c[d] = new p;
            if (a) {
                var e = new p,
                    f = new p;
                a = 0;
                for (d = this.faces.length; a < d; a++) {
                    b = this.faces[a];
                    var g = this.vertices[b.a];
                    var h = this.vertices[b.b];
                    var l = this.vertices[b.c];
                    e.subVectors(l, h);
                    f.subVectors(g, h);
                    e.cross(f);
                    c[b.a].add(e);
                    c[b.b].add(e);
                    c[b.c].add(e)
                }
            } else
                for (this.computeFaceNormals(), a = 0, d = this.faces.length; a < d; a++) b = this.faces[a], c[b.a].add(b.normal), c[b.b].add(b.normal),
                    c[b.c].add(b.normal);
            d = 0;
            for (b = this.vertices.length; d < b; d++) c[d].normalize();
            a = 0;
            for (d = this.faces.length; a < d; a++) b = this.faces[a], g = b.vertexNormals, 3 === g.length ? (g[0].copy(c[b.a]), g[1].copy(c[b.b]), g[2].copy(c[b.c])) : (g[0] = c[b.a].clone(), g[1] = c[b.b].clone(), g[2] = c[b.c].clone());
            0 < this.faces.length && (this.normalsNeedUpdate = !0)
        },
        computeFlatVertexNormals: function () {
            var a;
            this.computeFaceNormals();
            var b = 0;
            for (a = this.faces.length; b < a; b++) {
                var c = this.faces[b];
                var d = c.vertexNormals;
                3 === d.length ? (d[0].copy(c.normal),
                    d[1].copy(c.normal), d[2].copy(c.normal)) : (d[0] = c.normal.clone(), d[1] = c.normal.clone(), d[2] = c.normal.clone())
            }
            0 < this.faces.length && (this.normalsNeedUpdate = !0)
        },
        computeMorphNormals: function () {
            var a, b;
            var c = 0;
            for (b = this.faces.length; c < b; c++) {
                var d = this.faces[c];
                d.__originalFaceNormal ? d.__originalFaceNormal.copy(d.normal) : d.__originalFaceNormal = d.normal.clone();
                d.__originalVertexNormals || (d.__originalVertexNormals = []);
                var e = 0;
                for (a = d.vertexNormals.length; e < a; e++) d.__originalVertexNormals[e] ? d.__originalVertexNormals[e].copy(d.vertexNormals[e]) :
                    d.__originalVertexNormals[e] = d.vertexNormals[e].clone()
            }
            var f = new M;
            f.faces = this.faces;
            e = 0;
            for (a = this.morphTargets.length; e < a; e++) {
                if (!this.morphNormals[e]) {
                    this.morphNormals[e] = {};
                    this.morphNormals[e].faceNormals = [];
                    this.morphNormals[e].vertexNormals = [];
                    d = this.morphNormals[e].faceNormals;
                    var g = this.morphNormals[e].vertexNormals;
                    c = 0;
                    for (b = this.faces.length; c < b; c++) {
                        var h = new p;
                        var l = {
                            a: new p,
                            b: new p,
                            c: new p
                        };
                        d.push(h);
                        g.push(l)
                    }
                }
                g = this.morphNormals[e];
                f.vertices = this.morphTargets[e].vertices;
                f.computeFaceNormals();
                f.computeVertexNormals();
                c = 0;
                for (b = this.faces.length; c < b; c++) d = this.faces[c], h = g.faceNormals[c], l = g.vertexNormals[c], h.copy(d.normal), l.a.copy(d.vertexNormals[0]), l.b.copy(d.vertexNormals[1]), l.c.copy(d.vertexNormals[2])
            }
            c = 0;
            for (b = this.faces.length; c < b; c++) d = this.faces[c], d.normal = d.__originalFaceNormal, d.vertexNormals = d.__originalVertexNormals
        },
        computeBoundingBox: function () {
            null === this.boundingBox && (this.boundingBox = new Va);
            this.boundingBox.setFromPoints(this.vertices)
        },
        computeBoundingSphere: function () {
            null ===
                this.boundingSphere && (this.boundingSphere = new Ga);
            this.boundingSphere.setFromPoints(this.vertices)
        },
        merge: function (a, b, c) {
            if (a && a.isGeometry) {
                var d, e = this.vertices.length,
                    f = this.vertices,
                    g = a.vertices,
                    h = this.faces,
                    l = a.faces,
                    m = this.faceVertexUvs[0],
                    k = a.faceVertexUvs[0],
                    n = this.colors,
                    p = a.colors;
                void 0 === c && (c = 0);
                void 0 !== b && (d = (new oa).getNormalMatrix(b));
                a = 0;
                for (var r = g.length; a < r; a++) {
                    var q = g[a].clone();
                    void 0 !== b && q.applyMatrix4(b);
                    f.push(q)
                }
                a = 0;
                for (r = p.length; a < r; a++) n.push(p[a].clone());
                a = 0;
                for (r =
                    l.length; a < r; a++) {
                    g = l[a];
                    var u = g.vertexNormals;
                    p = g.vertexColors;
                    n = new Wa(g.a + e, g.b + e, g.c + e);
                    n.normal.copy(g.normal);
                    void 0 !== d && n.normal.applyMatrix3(d).normalize();
                    b = 0;
                    for (f = u.length; b < f; b++) q = u[b].clone(), void 0 !== d && q.applyMatrix3(d).normalize(), n.vertexNormals.push(q);
                    n.color.copy(g.color);
                    b = 0;
                    for (f = p.length; b < f; b++) q = p[b], n.vertexColors.push(q.clone());
                    n.materialIndex = g.materialIndex + c;
                    h.push(n)
                }
                a = 0;
                for (r = k.length; a < r; a++)
                    if (c = k[a], d = [], void 0 !== c) {
                        b = 0;
                        for (f = c.length; b < f; b++) d.push(c[b].clone());
                        m.push(d)
                    }
            } else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", a)
        },
        mergeMesh: function (a) {
            a && a.isMesh ? (a.matrixAutoUpdate && a.updateMatrix(), this.merge(a.geometry, a.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", a)
        },
        mergeVertices: function () {
            var a = {},
                b = [],
                c = [],
                d = Math.pow(10, 4),
                e;
            var f = 0;
            for (e = this.vertices.length; f < e; f++) {
                var g = this.vertices[f];
                g = Math.round(g.x * d) + "_" + Math.round(g.y * d) + "_" + Math.round(g.z * d);
                void 0 === a[g] ?
                    (a[g] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] = c[a[g]]
            }
            a = [];
            f = 0;
            for (e = this.faces.length; f < e; f++)
                for (d = this.faces[f], d.a = c[d.a], d.b = c[d.b], d.c = c[d.c], d = [d.a, d.b, d.c], g = 0; 3 > g; g++)
                    if (d[g] === d[(g + 1) % 3]) {
                        a.push(f);
                        break
                    } for (f = a.length - 1; 0 <= f; f--)
                for (d = a[f], this.faces.splice(d, 1), c = 0, e = this.faceVertexUvs.length; c < e; c++) this.faceVertexUvs[c].splice(d, 1);
            f = this.vertices.length - b.length;
            this.vertices = b;
            return f
        },
        setFromPoints: function (a) {
            this.vertices = [];
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                this.vertices.push(new p(d.x, d.y, d.z || 0))
            }
            return this
        },
        sortFacesByMaterialIndex: function () {
            for (var a = this.faces, b = a.length, c = 0; c < b; c++) a[c]._id = c;
            a.sort(function (a, b) {
                return a.materialIndex - b.materialIndex
            });
            var d = this.faceVertexUvs[0],
                e = this.faceVertexUvs[1],
                f, g;
            d && d.length === b && (f = []);
            e && e.length === b && (g = []);
            for (c = 0; c < b; c++) {
                var h = a[c]._id;
                f && f.push(d[h]);
                g && g.push(e[h])
            }
            f && (this.faceVertexUvs[0] = f);
            g && (this.faceVertexUvs[1] = g)
        },
        toJSON: function () {
            function a(a, b, c) {
                return c ? a | 1 << b : a & ~(1 << b)
            }

            function b(a) {
                var b =
                    a.x.toString() + a.y.toString() + a.z.toString();
                if (void 0 !== m[b]) return m[b];
                m[b] = l.length / 3;
                l.push(a.x, a.y, a.z);
                return m[b]
            }

            function c(a) {
                var b = a.r.toString() + a.g.toString() + a.b.toString();
                if (void 0 !== n[b]) return n[b];
                n[b] = k.length;
                k.push(a.getHex());
                return n[b]
            }

            function d(a) {
                var b = a.x.toString() + a.y.toString();
                if (void 0 !== r[b]) return r[b];
                r[b] = p.length / 2;
                p.push(a.x, a.y);
                return r[b]
            }
            var e = {
                metadata: {
                    version: 4.5,
                    type: "Geometry",
                    generator: "Geometry.toJSON"
                }
            };
            e.uuid = this.uuid;
            e.type = this.type;
            "" !== this.name &&
                (e.name = this.name);
            if (void 0 !== this.parameters) {
                var f = this.parameters,
                    g;
                for (g in f) void 0 !== f[g] && (e[g] = f[g]);
                return e
            }
            f = [];
            for (g = 0; g < this.vertices.length; g++) {
                var h = this.vertices[g];
                f.push(h.x, h.y, h.z)
            }
            h = [];
            var l = [],
                m = {},
                k = [],
                n = {},
                p = [],
                r = {};
            for (g = 0; g < this.faces.length; g++) {
                var q = this.faces[g],
                    u = void 0 !== this.faceVertexUvs[0][g],
                    x = 0 < q.normal.length(),
                    y = 0 < q.vertexNormals.length,
                    v = 1 !== q.color.r || 1 !== q.color.g || 1 !== q.color.b,
                    C = 0 < q.vertexColors.length,
                    F = 0;
                F = a(F, 0, 0);
                F = a(F, 1, !0);
                F = a(F, 2, !1);
                F = a(F, 3, u);
                F = a(F, 4, x);
                F = a(F, 5, y);
                F = a(F, 6, v);
                F = a(F, 7, C);
                h.push(F);
                h.push(q.a, q.b, q.c);
                h.push(q.materialIndex);
                u && (u = this.faceVertexUvs[0][g], h.push(d(u[0]), d(u[1]), d(u[2])));
                x && h.push(b(q.normal));
                y && (x = q.vertexNormals, h.push(b(x[0]), b(x[1]), b(x[2])));
                v && h.push(c(q.color));
                C && (q = q.vertexColors, h.push(c(q[0]), c(q[1]), c(q[2])))
            }
            e.data = {};
            e.data.vertices = f;
            e.data.normals = l;
            0 < k.length && (e.data.colors = k);
            0 < p.length && (e.data.uvs = [p]);
            e.data.faces = h;
            return e
        },
        clone: function () {
            return (new M).copy(this)
        },
        copy: function (a) {
            var b,
                c, d;
            this.vertices = [];
            this.colors = [];
            this.faces = [];
            this.faceVertexUvs = [
                []
            ];
            this.morphTargets = [];
            this.morphNormals = [];
            this.skinWeights = [];
            this.skinIndices = [];
            this.lineDistances = [];
            this.boundingSphere = this.boundingBox = null;
            this.name = a.name;
            var e = a.vertices;
            var f = 0;
            for (b = e.length; f < b; f++) this.vertices.push(e[f].clone());
            e = a.colors;
            f = 0;
            for (b = e.length; f < b; f++) this.colors.push(e[f].clone());
            e = a.faces;
            f = 0;
            for (b = e.length; f < b; f++) this.faces.push(e[f].clone());
            f = 0;
            for (b = a.faceVertexUvs.length; f < b; f++) {
                var g =
                    a.faceVertexUvs[f];
                void 0 === this.faceVertexUvs[f] && (this.faceVertexUvs[f] = []);
                e = 0;
                for (c = g.length; e < c; e++) {
                    var h = g[e],
                        l = [];
                    var m = 0;
                    for (d = h.length; m < d; m++) l.push(h[m].clone());
                    this.faceVertexUvs[f].push(l)
                }
            }
            m = a.morphTargets;
            f = 0;
            for (b = m.length; f < b; f++) {
                d = {};
                d.name = m[f].name;
                if (void 0 !== m[f].vertices)
                    for (d.vertices = [], e = 0, c = m[f].vertices.length; e < c; e++) d.vertices.push(m[f].vertices[e].clone());
                if (void 0 !== m[f].normals)
                    for (d.normals = [], e = 0, c = m[f].normals.length; e < c; e++) d.normals.push(m[f].normals[e].clone());
                this.morphTargets.push(d)
            }
            m = a.morphNormals;
            f = 0;
            for (b = m.length; f < b; f++) {
                d = {};
                if (void 0 !== m[f].vertexNormals)
                    for (d.vertexNormals = [], e = 0, c = m[f].vertexNormals.length; e < c; e++) g = m[f].vertexNormals[e], h = {}, h.a = g.a.clone(), h.b = g.b.clone(), h.c = g.c.clone(), d.vertexNormals.push(h);
                if (void 0 !== m[f].faceNormals)
                    for (d.faceNormals = [], e = 0, c = m[f].faceNormals.length; e < c; e++) d.faceNormals.push(m[f].faceNormals[e].clone());
                this.morphNormals.push(d)
            }
            e = a.skinWeights;
            f = 0;
            for (b = e.length; f < b; f++) this.skinWeights.push(e[f].clone());
            e = a.skinIndices;
            f = 0;
            for (b = e.length; f < b; f++) this.skinIndices.push(e[f].clone());
            e = a.lineDistances;
            f = 0;
            for (b = e.length; f < b; f++) this.lineDistances.push(e[f]);
            f = a.boundingBox;
            null !== f && (this.boundingBox = f.clone());
            f = a.boundingSphere;
            null !== f && (this.boundingSphere = f.clone());
            this.elementsNeedUpdate = a.elementsNeedUpdate;
            this.verticesNeedUpdate = a.verticesNeedUpdate;
            this.uvsNeedUpdate = a.uvsNeedUpdate;
            this.normalsNeedUpdate = a.normalsNeedUpdate;
            this.colorsNeedUpdate = a.colorsNeedUpdate;
            this.lineDistancesNeedUpdate =
                a.lineDistancesNeedUpdate;
            this.groupsNeedUpdate = a.groupsNeedUpdate;
            return this
        },
        dispose: function () {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    Object.defineProperty(H.prototype, "needsUpdate", {
        set: function (a) {
            !0 === a && this.version++
        }
    });
    Object.assign(H.prototype, {
        isBufferAttribute: !0,
        onUploadCallback: function () {},
        setArray: function (a) {
            if (Array.isArray(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.count = void 0 !== a ? a.length / this.itemSize : 0;
            this.array = a
        },
        setDynamic: function (a) {
            this.dynamic =
                a;
            return this
        },
        copy: function (a) {
            this.name = a.name;
            this.array = new a.array.constructor(a.array);
            this.itemSize = a.itemSize;
            this.count = a.count;
            this.normalized = a.normalized;
            this.dynamic = a.dynamic;
            return this
        },
        copyAt: function (a, b, c) {
            a *= this.itemSize;
            c *= b.itemSize;
            for (var d = 0, e = this.itemSize; d < e; d++) this.array[a + d] = b.array[c + d];
            return this
        },
        copyArray: function (a) {
            this.array.set(a);
            return this
        },
        copyColorsArray: function (a) {
            for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                void 0 === f && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",
                    d), f = new L);
                b[c++] = f.r;
                b[c++] = f.g;
                b[c++] = f.b
            }
            return this
        },
        copyVector2sArray: function (a) {
            for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                void 0 === f && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", d), f = new A);
                b[c++] = f.x;
                b[c++] = f.y
            }
            return this
        },
        copyVector3sArray: function (a) {
            for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                void 0 === f && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", d), f = new p);
                b[c++] = f.x;
                b[c++] = f.y;
                b[c++] = f.z
            }
            return this
        },
        copyVector4sArray: function (a) {
            for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                void 0 === f && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", d), f = new da);
                b[c++] = f.x;
                b[c++] = f.y;
                b[c++] = f.z;
                b[c++] = f.w
            }
            return this
        },
        set: function (a, b) {
            void 0 === b && (b = 0);
            this.array.set(a, b);
            return this
        },
        getX: function (a) {
            return this.array[a * this.itemSize]
        },
        setX: function (a, b) {
            this.array[a * this.itemSize] = b;
            return this
        },
        getY: function (a) {
            return this.array[a * this.itemSize +
                1]
        },
        setY: function (a, b) {
            this.array[a * this.itemSize + 1] = b;
            return this
        },
        getZ: function (a) {
            return this.array[a * this.itemSize + 2]
        },
        setZ: function (a, b) {
            this.array[a * this.itemSize + 2] = b;
            return this
        },
        getW: function (a) {
            return this.array[a * this.itemSize + 3]
        },
        setW: function (a, b) {
            this.array[a * this.itemSize + 3] = b;
            return this
        },
        setXY: function (a, b, c) {
            a *= this.itemSize;
            this.array[a + 0] = b;
            this.array[a + 1] = c;
            return this
        },
        setXYZ: function (a, b, c, d) {
            a *= this.itemSize;
            this.array[a + 0] = b;
            this.array[a + 1] = c;
            this.array[a + 2] = d;
            return this
        },
        setXYZW: function (a, b, c, d, e) {
            a *= this.itemSize;
            this.array[a + 0] = b;
            this.array[a + 1] = c;
            this.array[a + 2] = d;
            this.array[a + 3] = e;
            return this
        },
        onUpload: function (a) {
            this.onUploadCallback = a;
            return this
        },
        clone: function () {
            return (new this.constructor(this.array, this.itemSize)).copy(this)
        }
    });
    uc.prototype = Object.create(H.prototype);
    uc.prototype.constructor = uc;
    vc.prototype = Object.create(H.prototype);
    vc.prototype.constructor = vc;
    wc.prototype = Object.create(H.prototype);
    wc.prototype.constructor = wc;
    xc.prototype = Object.create(H.prototype);
    xc.prototype.constructor = xc;
    lb.prototype = Object.create(H.prototype);
    lb.prototype.constructor = lb;
    yc.prototype = Object.create(H.prototype);
    yc.prototype.constructor = yc;
    mb.prototype = Object.create(H.prototype);
    mb.prototype.constructor = mb;
    z.prototype = Object.create(H.prototype);
    z.prototype.constructor = z;
    zc.prototype = Object.create(H.prototype);
    zc.prototype.constructor = zc;
    Object.assign(Ce.prototype, {
        computeGroups: function (a) {
            var b = [],
                c = void 0;
            a = a.faces;
            for (var d = 0; d < a.length; d++) {
                var e = a[d];
                if (e.materialIndex !==
                    c) {
                    c = e.materialIndex;
                    void 0 !== f && (f.count = 3 * d - f.start, b.push(f));
                    var f = {
                        start: 3 * d,
                        materialIndex: c
                    }
                }
            }
            void 0 !== f && (f.count = 3 * d - f.start, b.push(f));
            this.groups = b
        },
        fromGeometry: function (a) {
            var b = a.faces,
                c = a.vertices,
                d = a.faceVertexUvs,
                e = d[0] && 0 < d[0].length,
                f = d[1] && 0 < d[1].length,
                g = a.morphTargets,
                h = g.length;
            if (0 < h) {
                var l = [];
                for (var m = 0; m < h; m++) l[m] = [];
                this.morphTargets.position = l
            }
            var k = a.morphNormals,
                n = k.length;
            if (0 < n) {
                var p = [];
                for (m = 0; m < n; m++) p[m] = [];
                this.morphTargets.normal = p
            }
            var r = a.skinIndices,
                q = a.skinWeights,
                u = r.length === c.length,
                x = q.length === c.length;
            for (m = 0; m < b.length; m++) {
                var y = b[m];
                this.vertices.push(c[y.a], c[y.b], c[y.c]);
                var v = y.vertexNormals;
                3 === v.length ? this.normals.push(v[0], v[1], v[2]) : (v = y.normal, this.normals.push(v, v, v));
                v = y.vertexColors;
                3 === v.length ? this.colors.push(v[0], v[1], v[2]) : (v = y.color, this.colors.push(v, v, v));
                !0 === e && (v = d[0][m], void 0 !== v ? this.uvs.push(v[0], v[1], v[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", m), this.uvs.push(new A, new A, new A)));
                !0 ===
                    f && (v = d[1][m], void 0 !== v ? this.uvs2.push(v[0], v[1], v[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", m), this.uvs2.push(new A, new A, new A)));
                for (v = 0; v < h; v++) {
                    var C = g[v].vertices;
                    l[v].push(C[y.a], C[y.b], C[y.c])
                }
                for (v = 0; v < n; v++) C = k[v].vertexNormals[m], p[v].push(C.a, C.b, C.c);
                u && this.skinIndices.push(r[y.a], r[y.b], r[y.c]);
                x && this.skinWeights.push(q[y.a], q[y.b], q[y.c])
            }
            this.computeGroups(a);
            this.verticesNeedUpdate = a.verticesNeedUpdate;
            this.normalsNeedUpdate = a.normalsNeedUpdate;
            this.colorsNeedUpdate = a.colorsNeedUpdate;
            this.uvsNeedUpdate = a.uvsNeedUpdate;
            this.groupsNeedUpdate = a.groupsNeedUpdate;
            return this
        }
    });
    var Bf = 1;
    I.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: I,
        isBufferGeometry: !0,
        getIndex: function () {
            return this.index
        },
        setIndex: function (a) {
            Array.isArray(a) ? this.index = new(65535 < De(a) ? mb : lb)(a, 1) : this.index = a
        },
        addAttribute: function (a, b, c) {
            if (b && b.isBufferAttribute || b && b.isInterleavedBufferAttribute)
                if ("index" === a) console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),
                    this.setIndex(b);
                else return this.attributes[a] = b, this;
            else console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.addAttribute(a, new H(b, c))
        },
        getAttribute: function (a) {
            return this.attributes[a]
        },
        removeAttribute: function (a) {
            delete this.attributes[a];
            return this
        },
        addGroup: function (a, b, c) {
            this.groups.push({
                start: a,
                count: b,
                materialIndex: void 0 !== c ? c : 0
            })
        },
        clearGroups: function () {
            this.groups = []
        },
        setDrawRange: function (a, b) {
            this.drawRange.start = a;
            this.drawRange.count = b
        },
        applyMatrix: function (a) {
            var b = this.attributes.position;
            void 0 !== b && (a.applyToBufferAttribute(b), b.needsUpdate = !0);
            b = this.attributes.normal;
            void 0 !== b && ((new oa).getNormalMatrix(a).applyToBufferAttribute(b), b.needsUpdate = !0);
            null !== this.boundingBox && this.computeBoundingBox();
            null !== this.boundingSphere && this.computeBoundingSphere();
            return this
        },
        rotateX: function () {
            var a = new K;
            return function (b) {
                a.makeRotationX(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateY: function () {
            var a = new K;
            return function (b) {
                a.makeRotationY(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateZ: function () {
            var a = new K;
            return function (b) {
                a.makeRotationZ(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        translate: function () {
            var a = new K;
            return function (b, c, d) {
                a.makeTranslation(b, c, d);
                this.applyMatrix(a);
                return this
            }
        }(),
        scale: function () {
            var a = new K;
            return function (b, c, d) {
                a.makeScale(b, c, d);
                this.applyMatrix(a);
                return this
            }
        }(),
        lookAt: function () {
            var a = new B;
            return function (b) {
                a.lookAt(b);
                a.updateMatrix();
                this.applyMatrix(a.matrix)
            }
        }(),
        center: function () {
            var a = new p;
            return function () {
                this.computeBoundingBox();
                this.boundingBox.getCenter(a).negate();
                this.translate(a.x, a.y, a.z);
                return this
            }
        }(),
        setFromObject: function (a) {
            var b = a.geometry;
            if (a.isPoints || a.isLine) {
                a = new z(3 * b.vertices.length, 3);
                var c = new z(3 * b.colors.length, 3);
                this.addAttribute("position", a.copyVector3sArray(b.vertices));
                this.addAttribute("color", c.copyColorsArray(b.colors));
                b.lineDistances && b.lineDistances.length === b.vertices.length && (a = new z(b.lineDistances.length, 1), this.addAttribute("lineDistance",
                    a.copyArray(b.lineDistances)));
                null !== b.boundingSphere && (this.boundingSphere = b.boundingSphere.clone());
                null !== b.boundingBox && (this.boundingBox = b.boundingBox.clone())
            } else a.isMesh && b && b.isGeometry && this.fromGeometry(b);
            return this
        },
        setFromPoints: function (a) {
            for (var b = [], c = 0, d = a.length; c < d; c++) {
                var e = a[c];
                b.push(e.x, e.y, e.z || 0)
            }
            this.addAttribute("position", new z(b, 3));
            return this
        },
        updateFromObject: function (a) {
            var b = a.geometry;
            if (a.isMesh) {
                var c = b.__directGeometry;
                !0 === b.elementsNeedUpdate && (c = void 0,
                    b.elementsNeedUpdate = !1);
                if (void 0 === c) return this.fromGeometry(b);
                c.verticesNeedUpdate = b.verticesNeedUpdate;
                c.normalsNeedUpdate = b.normalsNeedUpdate;
                c.colorsNeedUpdate = b.colorsNeedUpdate;
                c.uvsNeedUpdate = b.uvsNeedUpdate;
                c.groupsNeedUpdate = b.groupsNeedUpdate;
                b.verticesNeedUpdate = !1;
                b.normalsNeedUpdate = !1;
                b.colorsNeedUpdate = !1;
                b.uvsNeedUpdate = !1;
                b.groupsNeedUpdate = !1;
                b = c
            }!0 === b.verticesNeedUpdate && (c = this.attributes.position, void 0 !== c && (c.copyVector3sArray(b.vertices), c.needsUpdate = !0), b.verticesNeedUpdate = !1);
            !0 === b.normalsNeedUpdate && (c = this.attributes.normal, void 0 !== c && (c.copyVector3sArray(b.normals), c.needsUpdate = !0), b.normalsNeedUpdate = !1);
            !0 === b.colorsNeedUpdate && (c = this.attributes.color, void 0 !== c && (c.copyColorsArray(b.colors), c.needsUpdate = !0), b.colorsNeedUpdate = !1);
            b.uvsNeedUpdate && (c = this.attributes.uv, void 0 !== c && (c.copyVector2sArray(b.uvs), c.needsUpdate = !0), b.uvsNeedUpdate = !1);
            b.lineDistancesNeedUpdate && (c = this.attributes.lineDistance, void 0 !== c && (c.copyArray(b.lineDistances), c.needsUpdate = !0), b.lineDistancesNeedUpdate = !1);
            b.groupsNeedUpdate && (b.computeGroups(a.geometry), this.groups = b.groups, b.groupsNeedUpdate = !1);
            return this
        },
        fromGeometry: function (a) {
            a.__directGeometry = (new Ce).fromGeometry(a);
            return this.fromDirectGeometry(a.__directGeometry)
        },
        fromDirectGeometry: function (a) {
            var b = new Float32Array(3 * a.vertices.length);
            this.addAttribute("position", (new H(b, 3)).copyVector3sArray(a.vertices));
            0 < a.normals.length && (b = new Float32Array(3 * a.normals.length), this.addAttribute("normal", (new H(b,
                3)).copyVector3sArray(a.normals)));
            0 < a.colors.length && (b = new Float32Array(3 * a.colors.length), this.addAttribute("color", (new H(b, 3)).copyColorsArray(a.colors)));
            0 < a.uvs.length && (b = new Float32Array(2 * a.uvs.length), this.addAttribute("uv", (new H(b, 2)).copyVector2sArray(a.uvs)));
            0 < a.uvs2.length && (b = new Float32Array(2 * a.uvs2.length), this.addAttribute("uv2", (new H(b, 2)).copyVector2sArray(a.uvs2)));
            this.groups = a.groups;
            for (var c in a.morphTargets) {
                b = [];
                for (var d = a.morphTargets[c], e = 0, f = d.length; e < f; e++) {
                    var g =
                        d[e],
                        h = new z(3 * g.length, 3);
                    b.push(h.copyVector3sArray(g))
                }
                this.morphAttributes[c] = b
            }
            0 < a.skinIndices.length && (c = new z(4 * a.skinIndices.length, 4), this.addAttribute("skinIndex", c.copyVector4sArray(a.skinIndices)));
            0 < a.skinWeights.length && (c = new z(4 * a.skinWeights.length, 4), this.addAttribute("skinWeight", c.copyVector4sArray(a.skinWeights)));
            null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
            null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
            return this
        },
        computeBoundingBox: function () {
            null ===
                this.boundingBox && (this.boundingBox = new Va);
            var a = this.attributes.position;
            void 0 !== a ? this.boundingBox.setFromBufferAttribute(a) : this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        },
        computeBoundingSphere: function () {
            var a = new Va,
                b = new p;
            return function () {
                null === this.boundingSphere &&
                    (this.boundingSphere = new Ga);
                var c = this.attributes.position;
                if (c) {
                    var d = this.boundingSphere.center;
                    a.setFromBufferAttribute(c);
                    a.getCenter(d);
                    for (var e = 0, f = 0, g = c.count; f < g; f++) b.x = c.getX(f), b.y = c.getY(f), b.z = c.getZ(f), e = Math.max(e, d.distanceToSquared(b));
                    this.boundingSphere.radius = Math.sqrt(e);
                    isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
                }
            }
        }(),
        computeFaceNormals: function () {},
        computeVertexNormals: function () {
            var a = this.index,
                b = this.attributes,
                c = this.groups;
            if (b.position) {
                var d = b.position.array;
                if (void 0 === b.normal) this.addAttribute("normal", new H(new Float32Array(d.length), 3));
                else
                    for (var e = b.normal.array, f = 0, g = e.length; f < g; f++) e[f] = 0;
                e = b.normal.array;
                var h = new p,
                    l = new p,
                    m = new p,
                    k = new p,
                    n = new p;
                if (a) {
                    a = a.array;
                    0 === c.length && this.addGroup(0, a.length);
                    for (var t = 0, r = c.length; t < r; ++t) {
                        f = c[t];
                        g = f.start;
                        var q = f.count;
                        f = g;
                        for (g += q; f < g; f += 3) {
                            q = 3 * a[f + 0];
                            var u = 3 * a[f + 1];
                            var x = 3 *
                                a[f + 2];
                            h.fromArray(d, q);
                            l.fromArray(d, u);
                            m.fromArray(d, x);
                            k.subVectors(m, l);
                            n.subVectors(h, l);
                            k.cross(n);
                            e[q] += k.x;
                            e[q + 1] += k.y;
                            e[q + 2] += k.z;
                            e[u] += k.x;
                            e[u + 1] += k.y;
                            e[u + 2] += k.z;
                            e[x] += k.x;
                            e[x + 1] += k.y;
                            e[x + 2] += k.z
                        }
                    }
                } else
                    for (f = 0, g = d.length; f < g; f += 9) h.fromArray(d, f), l.fromArray(d, f + 3), m.fromArray(d, f + 6), k.subVectors(m, l), n.subVectors(h, l), k.cross(n), e[f] = k.x, e[f + 1] = k.y, e[f + 2] = k.z, e[f + 3] = k.x, e[f + 4] = k.y, e[f + 5] = k.z, e[f + 6] = k.x, e[f + 7] = k.y, e[f + 8] = k.z;
                this.normalizeNormals();
                b.normal.needsUpdate = !0
            }
        },
        merge: function (a,
            b) {
            if (a && a.isBufferGeometry) {
                void 0 === b && (b = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
                var c = this.attributes,
                    d;
                for (d in c)
                    if (void 0 !== a.attributes[d]) {
                        var e = c[d].array,
                            f = a.attributes[d],
                            g = f.array,
                            h = 0;
                        for (f = f.itemSize * b; h < g.length; h++, f++) e[f] = g[h]
                    } return this
            }
            console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", a)
        },
        normalizeNormals: function () {
            var a =
                new p;
            return function () {
                for (var b = this.attributes.normal, c = 0, d = b.count; c < d; c++) a.x = b.getX(c), a.y = b.getY(c), a.z = b.getZ(c), a.normalize(), b.setXYZ(c, a.x, a.y, a.z)
            }
        }(),
        toNonIndexed: function () {
            if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
            var a = new I,
                b = this.index.array,
                c = this.attributes,
                d;
            for (d in c) {
                var e = c[d],
                    f = e.array,
                    g = e.itemSize,
                    h = new f.constructor(b.length * g),
                    l = 0;
                e = 0;
                for (var m = b.length; e < m; e++) {
                    var k = b[e] * g;
                    for (var n = 0; n < g; n++) h[l++] =
                        f[k++]
                }
                a.addAttribute(d, new H(h, g))
            }
            b = this.groups;
            e = 0;
            for (m = b.length; e < m; e++) c = b[e], a.addGroup(c.start, c.count, c.materialIndex);
            return a
        },
        toJSON: function () {
            var a = {
                metadata: {
                    version: 4.5,
                    type: "BufferGeometry",
                    generator: "BufferGeometry.toJSON"
                }
            };
            a.uuid = this.uuid;
            a.type = this.type;
            "" !== this.name && (a.name = this.name);
            if (void 0 !== this.parameters) {
                var b = this.parameters;
                for (e in b) void 0 !== b[e] && (a[e] = b[e]);
                return a
            }
            a.data = {
                attributes: {}
            };
            var c = this.index;
            null !== c && (b = Array.prototype.slice.call(c.array), a.data.index = {
                type: c.array.constructor.name,
                array: b
            });
            c = this.attributes;
            for (e in c) {
                var d = c[e];
                b = Array.prototype.slice.call(d.array);
                a.data.attributes[e] = {
                    itemSize: d.itemSize,
                    type: d.array.constructor.name,
                    array: b,
                    normalized: d.normalized
                }
            }
            var e = this.groups;
            0 < e.length && (a.data.groups = JSON.parse(JSON.stringify(e)));
            e = this.boundingSphere;
            null !== e && (a.data.boundingSphere = {
                center: e.center.toArray(),
                radius: e.radius
            });
            return a
        },
        clone: function () {
            return (new I).copy(this)
        },
        copy: function (a) {
            var b;
            this.index = null;
            this.attributes = {};
            this.morphAttributes = {};
            this.groups = [];
            this.boundingSphere = this.boundingBox = null;
            this.name = a.name;
            var c = a.index;
            null !== c && this.setIndex(c.clone());
            c = a.attributes;
            for (g in c) this.addAttribute(g, c[g].clone());
            var d = a.morphAttributes;
            for (g in d) {
                var e = [],
                    f = d[g];
                c = 0;
                for (b = f.length; c < b; c++) e.push(f[c].clone());
                this.morphAttributes[g] = e
            }
            var g = a.groups;
            c = 0;
            for (b = g.length; c < b; c++) d = g[c], this.addGroup(d.start, d.count, d.materialIndex);
            g = a.boundingBox;
            null !== g && (this.boundingBox = g.clone());
            g = a.boundingSphere;
            null !== g && (this.boundingSphere = g.clone());
            this.drawRange.start = a.drawRange.start;
            this.drawRange.count = a.drawRange.count;
            return this
        },
        dispose: function () {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    Kb.prototype = Object.create(M.prototype);
    Kb.prototype.constructor = Kb;
    nb.prototype = Object.create(I.prototype);
    nb.prototype.constructor = nb;
    Ac.prototype = Object.create(M.prototype);
    Ac.prototype.constructor = Ac;
    pb.prototype = Object.create(I.prototype);
    pb.prototype.constructor = pb;
    var Cf = 0;
    Q.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: Q,
        isMaterial: !0,
        onBeforeCompile: function () {},
        setValues: function (a) {
            if (void 0 !== a)
                for (var b in a) {
                    var c = a[b];
                    if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
                    else if ("shading" === b) console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === c ? !0 : !1;
                    else {
                        var d = this[b];
                        void 0 === d ? console.warn("THREE." + this.type + ": '" + b + "' is not a property of this material.") : d && d.isColor ? d.set(c) : d && d.isVector3 &&
                            c && c.isVector3 ? d.copy(c) : this[b] = "overdraw" === b ? Number(c) : c
                    }
                }
        },
        toJSON: function (a) {
            function b(a) {
                var b = [],
                    c;
                for (c in a) {
                    var d = a[c];
                    delete d.metadata;
                    b.push(d)
                }
                return b
            }
            var c = void 0 === a || "string" === typeof a;
            c && (a = {
                textures: {},
                images: {}
            });
            var d = {
                metadata: {
                    version: 4.5,
                    type: "Material",
                    generator: "Material.toJSON"
                }
            };
            d.uuid = this.uuid;
            d.type = this.type;
            "" !== this.name && (d.name = this.name);
            this.color && this.color.isColor && (d.color = this.color.getHex());
            void 0 !== this.roughness && (d.roughness = this.roughness);
            void 0 !==
                this.metalness && (d.metalness = this.metalness);
            this.emissive && this.emissive.isColor && (d.emissive = this.emissive.getHex());
            1 !== this.emissiveIntensity && (d.emissiveIntensity = this.emissiveIntensity);
            this.specular && this.specular.isColor && (d.specular = this.specular.getHex());
            void 0 !== this.shininess && (d.shininess = this.shininess);
            void 0 !== this.clearCoat && (d.clearCoat = this.clearCoat);
            void 0 !== this.clearCoatRoughness && (d.clearCoatRoughness = this.clearCoatRoughness);
            this.map && this.map.isTexture && (d.map = this.map.toJSON(a).uuid);
            this.alphaMap && this.alphaMap.isTexture && (d.alphaMap = this.alphaMap.toJSON(a).uuid);
            this.lightMap && this.lightMap.isTexture && (d.lightMap = this.lightMap.toJSON(a).uuid);
            this.bumpMap && this.bumpMap.isTexture && (d.bumpMap = this.bumpMap.toJSON(a).uuid, d.bumpScale = this.bumpScale);
            this.normalMap && this.normalMap.isTexture && (d.normalMap = this.normalMap.toJSON(a).uuid, d.normalScale = this.normalScale.toArray());
            this.displacementMap && this.displacementMap.isTexture && (d.displacementMap = this.displacementMap.toJSON(a).uuid,
                d.displacementScale = this.displacementScale, d.displacementBias = this.displacementBias);
            this.roughnessMap && this.roughnessMap.isTexture && (d.roughnessMap = this.roughnessMap.toJSON(a).uuid);
            this.metalnessMap && this.metalnessMap.isTexture && (d.metalnessMap = this.metalnessMap.toJSON(a).uuid);
            this.emissiveMap && this.emissiveMap.isTexture && (d.emissiveMap = this.emissiveMap.toJSON(a).uuid);
            this.specularMap && this.specularMap.isTexture && (d.specularMap = this.specularMap.toJSON(a).uuid);
            this.envMap && this.envMap.isTexture &&
                (d.envMap = this.envMap.toJSON(a).uuid, d.reflectivity = this.reflectivity);
            this.gradientMap && this.gradientMap.isTexture && (d.gradientMap = this.gradientMap.toJSON(a).uuid);
            void 0 !== this.size && (d.size = this.size);
            void 0 !== this.sizeAttenuation && (d.sizeAttenuation = this.sizeAttenuation);
            1 !== this.blending && (d.blending = this.blending);
            !0 === this.flatShading && (d.flatShading = this.flatShading);
            0 !== this.side && (d.side = this.side);
            0 !== this.vertexColors && (d.vertexColors = this.vertexColors);
            1 > this.opacity && (d.opacity = this.opacity);
            !0 === this.transparent && (d.transparent = this.transparent);
            d.depthFunc = this.depthFunc;
            d.depthTest = this.depthTest;
            d.depthWrite = this.depthWrite;
            0 !== this.rotation && (d.rotation = this.rotation);
            1 !== this.linewidth && (d.linewidth = this.linewidth);
            void 0 !== this.dashSize && (d.dashSize = this.dashSize);
            void 0 !== this.gapSize && (d.gapSize = this.gapSize);
            void 0 !== this.scale && (d.scale = this.scale);
            !0 === this.dithering && (d.dithering = !0);
            0 < this.alphaTest && (d.alphaTest = this.alphaTest);
            !0 === this.premultipliedAlpha && (d.premultipliedAlpha =
                this.premultipliedAlpha);
            !0 === this.wireframe && (d.wireframe = this.wireframe);
            1 < this.wireframeLinewidth && (d.wireframeLinewidth = this.wireframeLinewidth);
            "round" !== this.wireframeLinecap && (d.wireframeLinecap = this.wireframeLinecap);
            "round" !== this.wireframeLinejoin && (d.wireframeLinejoin = this.wireframeLinejoin);
            !0 === this.morphTargets && (d.morphTargets = !0);
            !0 === this.skinning && (d.skinning = !0);
            !1 === this.visible && (d.visible = !1);
            "{}" !== JSON.stringify(this.userData) && (d.userData = this.userData);
            c && (c = b(a.textures),
                a = b(a.images), 0 < c.length && (d.textures = c), 0 < a.length && (d.images = a));
            return d
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.name = a.name;
            this.fog = a.fog;
            this.lights = a.lights;
            this.blending = a.blending;
            this.side = a.side;
            this.flatShading = a.flatShading;
            this.vertexColors = a.vertexColors;
            this.opacity = a.opacity;
            this.transparent = a.transparent;
            this.blendSrc = a.blendSrc;
            this.blendDst = a.blendDst;
            this.blendEquation = a.blendEquation;
            this.blendSrcAlpha = a.blendSrcAlpha;
            this.blendDstAlpha =
                a.blendDstAlpha;
            this.blendEquationAlpha = a.blendEquationAlpha;
            this.depthFunc = a.depthFunc;
            this.depthTest = a.depthTest;
            this.depthWrite = a.depthWrite;
            this.colorWrite = a.colorWrite;
            this.precision = a.precision;
            this.polygonOffset = a.polygonOffset;
            this.polygonOffsetFactor = a.polygonOffsetFactor;
            this.polygonOffsetUnits = a.polygonOffsetUnits;
            this.dithering = a.dithering;
            this.alphaTest = a.alphaTest;
            this.premultipliedAlpha = a.premultipliedAlpha;
            this.overdraw = a.overdraw;
            this.visible = a.visible;
            this.userData = JSON.parse(JSON.stringify(a.userData));
            this.clipShadows = a.clipShadows;
            this.clipIntersection = a.clipIntersection;
            var b = a.clippingPlanes,
                c = null;
            if (null !== b) {
                var d = b.length;
                c = Array(d);
                for (var e = 0; e !== d; ++e) c[e] = b[e].clone()
            }
            this.clippingPlanes = c;
            this.shadowSide = a.shadowSide;
            return this
        },
        dispose: function () {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    ya.prototype = Object.create(Q.prototype);
    ya.prototype.constructor = ya;
    ya.prototype.isMeshBasicMaterial = !0;
    ya.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map =
            a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity = a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.specularMap = a.specularMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.combine = a.combine;
        this.reflectivity = a.reflectivity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets =
            a.morphTargets;
        return this
    };
    za.prototype = Object.create(Q.prototype);
    za.prototype.constructor = za;
    za.prototype.isShaderMaterial = !0;
    za.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.fragmentShader = a.fragmentShader;
        this.vertexShader = a.vertexShader;
        this.uniforms = Ca.clone(a.uniforms);
        this.defines = Object.assign({}, a.defines);
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.lights = a.lights;
        this.clipping = a.clipping;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        this.extensions = a.extensions;
        return this
    };
    za.prototype.toJSON = function (a) {
        a = Q.prototype.toJSON.call(this, a);
        a.uniforms = this.uniforms;
        a.vertexShader = this.vertexShader;
        a.fragmentShader = this.fragmentShader;
        return a
    };
    Object.assign(qb.prototype, {
        set: function (a, b) {
            this.origin.copy(a);
            this.direction.copy(b);
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.origin.copy(a.origin);
            this.direction.copy(a.direction);
            return this
        },
        at: function (a,
            b) {
            void 0 === b && (console.warn("THREE.Ray: .at() target is now required"), b = new p);
            return b.copy(this.direction).multiplyScalar(a).add(this.origin)
        },
        lookAt: function (a) {
            this.direction.copy(a).sub(this.origin).normalize();
            return this
        },
        recast: function () {
            var a = new p;
            return function (b) {
                this.origin.copy(this.at(b, a));
                return this
            }
        }(),
        closestPointToPoint: function (a, b) {
            void 0 === b && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), b = new p);
            b.subVectors(a, this.origin);
            a = b.dot(this.direction);
            return 0 > a ? b.copy(this.origin) : b.copy(this.direction).multiplyScalar(a).add(this.origin)
        },
        distanceToPoint: function (a) {
            return Math.sqrt(this.distanceSqToPoint(a))
        },
        distanceSqToPoint: function () {
            var a = new p;
            return function (b) {
                var c = a.subVectors(b, this.origin).dot(this.direction);
                if (0 > c) return this.origin.distanceToSquared(b);
                a.copy(this.direction).multiplyScalar(c).add(this.origin);
                return a.distanceToSquared(b)
            }
        }(),
        distanceSqToSegment: function () {
            var a = new p,
                b = new p,
                c = new p;
            return function (d, e, f, g) {
                a.copy(d).add(e).multiplyScalar(.5);
                b.copy(e).sub(d).normalize();
                c.copy(this.origin).sub(a);
                var h = .5 * d.distanceTo(e),
                    l = -this.direction.dot(b),
                    m = c.dot(this.direction),
                    k = -c.dot(b),
                    n = c.lengthSq(),
                    p = Math.abs(1 - l * l);
                if (0 < p) {
                    d = l * k - m;
                    e = l * m - k;
                    var r = h * p;
                    0 <= d ? e >= -r ? e <= r ? (h = 1 / p, d *= h, e *= h, l = d * (d + l * e + 2 * m) + e * (l * d + e + 2 * k) + n) : (e = h, d = Math.max(0, -(l * e + m)), l = -d * d + e * (e + 2 * k) + n) : (e = -h, d = Math.max(0, -(l * e + m)), l = -d * d + e * (e + 2 * k) + n) : e <= -r ? (d = Math.max(0, -(-l * h + m)), e = 0 < d ? -h : Math.min(Math.max(-h, -k), h), l = -d * d + e * (e + 2 * k) + n) : e <= r ? (d = 0, e = Math.min(Math.max(-h, -k), h), l =
                        e * (e + 2 * k) + n) : (d = Math.max(0, -(l * h + m)), e = 0 < d ? h : Math.min(Math.max(-h, -k), h), l = -d * d + e * (e + 2 * k) + n)
                } else e = 0 < l ? -h : h, d = Math.max(0, -(l * e + m)), l = -d * d + e * (e + 2 * k) + n;
                f && f.copy(this.direction).multiplyScalar(d).add(this.origin);
                g && g.copy(b).multiplyScalar(e).add(a);
                return l
            }
        }(),
        intersectSphere: function () {
            var a = new p;
            return function (b, c) {
                a.subVectors(b.center, this.origin);
                var d = a.dot(this.direction),
                    e = a.dot(a) - d * d;
                b = b.radius * b.radius;
                if (e > b) return null;
                b = Math.sqrt(b - e);
                e = d - b;
                d += b;
                return 0 > e && 0 > d ? null : 0 > e ? this.at(d,
                    c) : this.at(e, c)
            }
        }(),
        intersectsSphere: function (a) {
            return this.distanceToPoint(a.center) <= a.radius
        },
        distanceToPlane: function (a) {
            var b = a.normal.dot(this.direction);
            if (0 === b) return 0 === a.distanceToPoint(this.origin) ? 0 : null;
            a = -(this.origin.dot(a.normal) + a.constant) / b;
            return 0 <= a ? a : null
        },
        intersectPlane: function (a, b) {
            a = this.distanceToPlane(a);
            return null === a ? null : this.at(a, b)
        },
        intersectsPlane: function (a) {
            var b = a.distanceToPoint(this.origin);
            return 0 === b || 0 > a.normal.dot(this.direction) * b ? !0 : !1
        },
        intersectBox: function (a,
            b) {
            var c = 1 / this.direction.x;
            var d = 1 / this.direction.y;
            var e = 1 / this.direction.z,
                f = this.origin;
            if (0 <= c) {
                var g = (a.min.x - f.x) * c;
                c *= a.max.x - f.x
            } else g = (a.max.x - f.x) * c, c *= a.min.x - f.x;
            if (0 <= d) {
                var h = (a.min.y - f.y) * d;
                d *= a.max.y - f.y
            } else h = (a.max.y - f.y) * d, d *= a.min.y - f.y;
            if (g > d || h > c) return null;
            if (h > g || g !== g) g = h;
            if (d < c || c !== c) c = d;
            0 <= e ? (h = (a.min.z - f.z) * e, a = (a.max.z - f.z) * e) : (h = (a.max.z - f.z) * e, a = (a.min.z - f.z) * e);
            if (g > a || h > c) return null;
            if (h > g || g !== g) g = h;
            if (a < c || c !== c) c = a;
            return 0 > c ? null : this.at(0 <= g ? g : c, b)
        },
        intersectsBox: function () {
            var a =
                new p;
            return function (b) {
                return null !== this.intersectBox(b, a)
            }
        }(),
        intersectTriangle: function () {
            var a = new p,
                b = new p,
                c = new p,
                d = new p;
            return function (e, f, g, h, l) {
                b.subVectors(f, e);
                c.subVectors(g, e);
                d.crossVectors(b, c);
                f = this.direction.dot(d);
                if (0 < f) {
                    if (h) return null;
                    h = 1
                } else if (0 > f) h = -1, f = -f;
                else return null;
                a.subVectors(this.origin, e);
                e = h * this.direction.dot(c.crossVectors(a, c));
                if (0 > e) return null;
                g = h * this.direction.dot(b.cross(a));
                if (0 > g || e + g > f) return null;
                e = -h * a.dot(d);
                return 0 > e ? null : this.at(e / f, l)
            }
        }(),
        applyMatrix4: function (a) {
            this.origin.applyMatrix4(a);
            this.direction.transformDirection(a);
            return this
        },
        equals: function (a) {
            return a.origin.equals(this.origin) && a.direction.equals(this.direction)
        }
    });
    Object.assign(Nb.prototype, {
        set: function (a, b) {
            this.start.copy(a);
            this.end.copy(b);
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.start.copy(a.start);
            this.end.copy(a.end);
            return this
        },
        getCenter: function (a) {
            void 0 === a && (console.warn("THREE.Line3: .getCenter() target is now required"),
                a = new p);
            return a.addVectors(this.start, this.end).multiplyScalar(.5)
        },
        delta: function (a) {
            void 0 === a && (console.warn("THREE.Line3: .delta() target is now required"), a = new p);
            return a.subVectors(this.end, this.start)
        },
        distanceSq: function () {
            return this.start.distanceToSquared(this.end)
        },
        distance: function () {
            return this.start.distanceTo(this.end)
        },
        at: function (a, b) {
            void 0 === b && (console.warn("THREE.Line3: .at() target is now required"), b = new p);
            return this.delta(b).multiplyScalar(a).add(this.start)
        },
        closestPointToPointParameter: function () {
            var a =
                new p,
                b = new p;
            return function (c, d) {
                a.subVectors(c, this.start);
                b.subVectors(this.end, this.start);
                c = b.dot(b);
                c = b.dot(a) / c;
                d && (c = R.clamp(c, 0, 1));
                return c
            }
        }(),
        closestPointToPoint: function (a, b, c) {
            a = this.closestPointToPointParameter(a, b);
            void 0 === c && (console.warn("THREE.Line3: .closestPointToPoint() target is now required"), c = new p);
            return this.delta(c).multiplyScalar(a).add(this.start)
        },
        applyMatrix4: function (a) {
            this.start.applyMatrix4(a);
            this.end.applyMatrix4(a);
            return this
        },
        equals: function (a) {
            return a.start.equals(this.start) &&
                a.end.equals(this.end)
        }
    });
    Object.assign(ja, {
        getNormal: function () {
            var a = new p;
            return function (b, c, d, e) {
                void 0 === e && (console.warn("THREE.Triangle: .getNormal() target is now required"), e = new p);
                e.subVectors(d, c);
                a.subVectors(b, c);
                e.cross(a);
                b = e.lengthSq();
                return 0 < b ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0)
            }
        }(),
        getBarycoord: function () {
            var a = new p,
                b = new p,
                c = new p;
            return function (d, e, f, g, h) {
                a.subVectors(g, e);
                b.subVectors(f, e);
                c.subVectors(d, e);
                d = a.dot(a);
                e = a.dot(b);
                f = a.dot(c);
                var l = b.dot(b);
                g = b.dot(c);
                var m = d * l - e * e;
                void 0 === h && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), h = new p);
                if (0 === m) return h.set(-2, -1, -1);
                m = 1 / m;
                l = (l * f - e * g) * m;
                d = (d * g - e * f) * m;
                return h.set(1 - l - d, d, l)
            }
        }(),
        containsPoint: function () {
            var a = new p;
            return function (b, c, d, e) {
                ja.getBarycoord(b, c, d, e, a);
                return 0 <= a.x && 0 <= a.y && 1 >= a.x + a.y
            }
        }()
    });
    Object.assign(ja.prototype, {
        set: function (a, b, c) {
            this.a.copy(a);
            this.b.copy(b);
            this.c.copy(c);
            return this
        },
        setFromPointsAndIndices: function (a, b, c, d) {
            this.a.copy(a[b]);
            this.b.copy(a[c]);
            this.c.copy(a[d]);
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.a.copy(a.a);
            this.b.copy(a.b);
            this.c.copy(a.c);
            return this
        },
        getArea: function () {
            var a = new p,
                b = new p;
            return function () {
                a.subVectors(this.c, this.b);
                b.subVectors(this.a, this.b);
                return .5 * a.cross(b).length()
            }
        }(),
        getMidpoint: function (a) {
            void 0 === a && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), a = new p);
            return a.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
        },
        getNormal: function (a) {
            return ja.getNormal(this.a,
                this.b, this.c, a)
        },
        getPlane: function (a) {
            void 0 === a && (console.warn("THREE.Triangle: .getPlane() target is now required"), a = new p);
            return a.setFromCoplanarPoints(this.a, this.b, this.c)
        },
        getBarycoord: function (a, b) {
            return ja.getBarycoord(a, this.a, this.b, this.c, b)
        },
        containsPoint: function (a) {
            return ja.containsPoint(a, this.a, this.b, this.c)
        },
        intersectsBox: function (a) {
            return a.intersectsTriangle(this)
        },
        closestPointToPoint: function () {
            var a = new Ha,
                b = [new Nb, new Nb, new Nb],
                c = new p,
                d = new p;
            return function (e, f) {
                void 0 ===
                    f && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), f = new p);
                var g = Infinity;
                a.setFromCoplanarPoints(this.a, this.b, this.c);
                a.projectPoint(e, c);
                if (!0 === this.containsPoint(c)) f.copy(c);
                else
                    for (b[0].set(this.a, this.b), b[1].set(this.b, this.c), b[2].set(this.c, this.a), e = 0; e < b.length; e++) {
                        b[e].closestPointToPoint(c, !0, d);
                        var h = c.distanceToSquared(d);
                        h < g && (g = h, f.copy(d))
                    }
                return f
            }
        }(),
        equals: function (a) {
            return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
        }
    });
    ta.prototype =
        Object.assign(Object.create(B.prototype), {
            constructor: ta,
            isMesh: !0,
            setDrawMode: function (a) {
                this.drawMode = a
            },
            copy: function (a) {
                B.prototype.copy.call(this, a);
                this.drawMode = a.drawMode;
                void 0 !== a.morphTargetInfluences && (this.morphTargetInfluences = a.morphTargetInfluences.slice());
                void 0 !== a.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, a.morphTargetDictionary));
                return this
            },
            updateMorphTargets: function () {
                var a = this.geometry;
                if (a.isBufferGeometry) {
                    a = a.morphAttributes;
                    var b = Object.keys(a);
                    if (0 < b.length) {
                        var c = a[b[0]];
                        if (void 0 !== c)
                            for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, a = 0, b = c.length; a < b; a++) {
                                var d = c[a].name || String(a);
                                this.morphTargetInfluences.push(0);
                                this.morphTargetDictionary[d] = a
                            }
                    }
                } else if (c = a.morphTargets, void 0 !== c && 0 < c.length)
                    for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, a = 0, b = c.length; a < b; a++) d = c[a].name || String(a), this.morphTargetInfluences.push(0), this.morphTargetDictionary[d] = a
            },
            raycast: function () {
                function a(a, b, c, d, e, f, g) {
                    ja.getBarycoord(a,
                        b, c, d, u);
                    e.multiplyScalar(u.x);
                    f.multiplyScalar(u.y);
                    g.multiplyScalar(u.z);
                    e.add(f).add(g);
                    return e.clone()
                }

                function b(a, b, c, d, e, f, g, h) {
                    if (null === (1 === b.side ? d.intersectTriangle(g, f, e, !0, h) : d.intersectTriangle(e, f, g, 2 !== b.side, h))) return null;
                    y.copy(h);
                    y.applyMatrix4(a.matrixWorld);
                    b = c.ray.origin.distanceTo(y);
                    return b < c.near || b > c.far ? null : {
                        distance: b,
                        point: y.clone(),
                        object: a
                    }
                }

                function c(c, d, e, f, m, k, n, p) {
                    g.fromBufferAttribute(f, k);
                    h.fromBufferAttribute(f, n);
                    l.fromBufferAttribute(f, p);
                    if (c = b(c, c.material,
                            d, e, g, h, l, x)) m && (t.fromBufferAttribute(m, k), r.fromBufferAttribute(m, n), q.fromBufferAttribute(m, p), c.uv = a(x, g, h, l, t, r, q)), m = new Wa(k, n, p), ja.getNormal(g, h, l, m.normal), c.face = m, c.faceIndex = k;
                    return c
                }
                var d = new K,
                    e = new qb,
                    f = new Ga,
                    g = new p,
                    h = new p,
                    l = new p,
                    m = new p,
                    k = new p,
                    n = new p,
                    t = new A,
                    r = new A,
                    q = new A,
                    u = new p,
                    x = new p,
                    y = new p;
                return function (p, w) {
                    var u = this.geometry,
                        v = this.material,
                        y = this.matrixWorld;
                    if (void 0 !== v && (null === u.boundingSphere && u.computeBoundingSphere(), f.copy(u.boundingSphere), f.applyMatrix4(y),
                            !1 !== p.ray.intersectsSphere(f) && (d.getInverse(y), e.copy(p.ray).applyMatrix4(d), null === u.boundingBox || !1 !== e.intersectsBox(u.boundingBox)))) {
                        var C;
                        if (u.isBufferGeometry) {
                            v = u.index;
                            var z = u.attributes.position;
                            u = u.attributes.uv;
                            var A;
                            if (null !== v)
                                for (y = 0, A = v.count; y < A; y += 3) {
                                    var B = v.getX(y);
                                    var D = v.getX(y + 1);
                                    var H = v.getX(y + 2);
                                    if (C = c(this, p, e, z, u, B, D, H)) C.faceIndex = Math.floor(y / 3), w.push(C)
                                } else if (void 0 !== z)
                                    for (y = 0, A = z.count; y < A; y += 3) B = y, D = y + 1, H = y + 2, (C = c(this, p, e, z, u, B, D, H)) && w.push(C)
                        } else if (u.isGeometry) {
                            y =
                                Array.isArray(v);
                            A = u.vertices;
                            B = u.faces;
                            D = u.faceVertexUvs[0];
                            0 < D.length && (z = D);
                            for (var I = 0, L = B.length; I < L; I++) {
                                var J = B[I];
                                C = y ? v[J.materialIndex] : v;
                                if (void 0 !== C) {
                                    D = A[J.a];
                                    H = A[J.b];
                                    var K = A[J.c];
                                    if (!0 === C.morphTargets) {
                                        var M = u.morphTargets,
                                            Q = this.morphTargetInfluences;
                                        g.set(0, 0, 0);
                                        h.set(0, 0, 0);
                                        l.set(0, 0, 0);
                                        for (var R = 0, S = M.length; R < S; R++) {
                                            var V = Q[R];
                                            if (0 !== V) {
                                                var W = M[R].vertices;
                                                g.addScaledVector(m.subVectors(W[J.a], D), V);
                                                h.addScaledVector(k.subVectors(W[J.b], H), V);
                                                l.addScaledVector(n.subVectors(W[J.c],
                                                    K), V)
                                            }
                                        }
                                        g.add(D);
                                        h.add(H);
                                        l.add(K);
                                        D = g;
                                        H = h;
                                        K = l
                                    }
                                    if (C = b(this, C, p, e, D, H, K, x)) z && z[I] && (M = z[I], t.copy(M[0]), r.copy(M[1]), q.copy(M[2]), C.uv = a(x, D, H, K, t, r, q)), C.face = J, C.faceIndex = I, w.push(C)
                                }
                            }
                        }
                    }
                }
            }(),
            clone: function () {
                return (new this.constructor(this.geometry, this.material)).copy(this)
            }
        });
    bb.prototype = Object.create(X.prototype);
    bb.prototype.constructor = bb;
    bb.prototype.isCubeTexture = !0;
    Object.defineProperty(bb.prototype, "images", {
        get: function () {
            return this.image
        },
        set: function (a) {
            this.image = a
        }
    });
    var Je = new X,
        Ke = new bb,
        Ee = [],
        Ge = [],
        Ie = new Float32Array(16),
        He = new Float32Array(9);
    Oe.prototype.setValue = function (a, b) {
        for (var c = this.seq, d = 0, e = c.length; d !== e; ++d) {
            var f = c[d];
            f.setValue(a, b[f.id])
        }
    };
    var Td = /([\w\d_]+)(\])?(\[|\.)?/g;
    cb.prototype.setValue = function (a, b, c) {
        b = this.map[b];
        void 0 !== b && b.setValue(a, c, this.renderer)
    };
    cb.prototype.setOptional = function (a, b, c) {
        b = b[c];
        void 0 !== b && this.setValue(a, c, b)
    };
    cb.upload = function (a, b, c, d) {
        for (var e = 0, f = b.length; e !== f; ++e) {
            var g = b[e],
                h = c[g.id];
            !1 !== h.needsUpdate && g.setValue(a,
                h.value, d)
        }
    };
    cb.seqWithValue = function (a, b) {
        for (var c = [], d = 0, e = a.length; d !== e; ++d) {
            var f = a[d];
            f.id in b && c.push(f)
        }
        return c
    };
    var rg = 0,
        Ag = 0;
    db.prototype = Object.create(Q.prototype);
    db.prototype.constructor = db;
    db.prototype.isMeshDepthMaterial = !0;
    db.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.depthPacking = a.depthPacking;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.map = a.map;
        this.alphaMap = a.alphaMap;
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        return this
    };
    eb.prototype = Object.create(Q.prototype);
    eb.prototype.constructor = eb;
    eb.prototype.isMeshDistanceMaterial = !0;
    eb.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.referencePosition.copy(a.referencePosition);
        this.nearDistance = a.nearDistance;
        this.farDistance = a.farDistance;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.map = a.map;
        this.alphaMap = a.alphaMap;
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        return this
    };
    Cc.prototype = Object.create(X.prototype);
    Cc.prototype.constructor = Cc;
    Y.prototype = Object.assign(Object.create(Qa.prototype), {
        constructor: Y,
        isPerspectiveCamera: !0,
        copy: function (a, b) {
            Qa.prototype.copy.call(this, a, b);
            this.fov = a.fov;
            this.zoom = a.zoom;
            this.near = a.near;
            this.far = a.far;
            this.focus = a.focus;
            this.aspect = a.aspect;
            this.view = null === a.view ? null : Object.assign({}, a.view);
            this.filmGauge = a.filmGauge;
            this.filmOffset = a.filmOffset;
            return this
        },
        setFocalLength: function (a) {
            a = .5 * this.getFilmHeight() / a;
            this.fov = 2 * R.RAD2DEG * Math.atan(a);
            this.updateProjectionMatrix()
        },
        getFocalLength: function () {
            var a = Math.tan(.5 * R.DEG2RAD * this.fov);
            return .5 * this.getFilmHeight() / a
        },
        getEffectiveFOV: function () {
            return 2 * R.RAD2DEG * Math.atan(Math.tan(.5 * R.DEG2RAD * this.fov) / this.zoom)
        },
        getFilmWidth: function () {
            return this.filmGauge * Math.min(this.aspect, 1)
        },
        getFilmHeight: function () {
            return this.filmGauge /
                Math.max(this.aspect, 1)
        },
        setViewOffset: function (a, b, c, d, e, f) {
            this.aspect = a / b;
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            });
            this.view.enabled = !0;
            this.view.fullWidth = a;
            this.view.fullHeight = b;
            this.view.offsetX = c;
            this.view.offsetY = d;
            this.view.width = e;
            this.view.height = f;
            this.updateProjectionMatrix()
        },
        clearViewOffset: function () {
            null !== this.view && (this.view.enabled = !1);
            this.updateProjectionMatrix()
        },
        updateProjectionMatrix: function () {
            var a = this.near,
                b = a * Math.tan(.5 * R.DEG2RAD * this.fov) / this.zoom,
                c = 2 * b,
                d = this.aspect * c,
                e = -.5 * d,
                f = this.view;
            if (null !== this.view && this.view.enabled) {
                var g = f.fullWidth,
                    h = f.fullHeight;
                e += f.offsetX * d / g;
                b -= f.offsetY * c / h;
                d *= f.width / g;
                c *= f.height / h
            }
            f = this.filmOffset;
            0 !== f && (e += a * f / this.getFilmWidth());
            this.projectionMatrix.makePerspective(e, e + d, b, b - c, a, this.far)
        },
        toJSON: function (a) {
            a = B.prototype.toJSON.call(this, a);
            a.object.fov = this.fov;
            a.object.zoom = this.zoom;
            a.object.near = this.near;
            a.object.far = this.far;
            a.object.focus = this.focus;
            a.object.aspect = this.aspect;
            null !== this.view && (a.object.view = Object.assign({}, this.view));
            a.object.filmGauge = this.filmGauge;
            a.object.filmOffset = this.filmOffset;
            return a
        }
    });
    qd.prototype = Object.assign(Object.create(Y.prototype), {
        constructor: qd,
        isArrayCamera: !0
    });
    Qb.prototype.isFogExp2 = !0;
    Qb.prototype.clone = function () {
        return new Qb(this.color.getHex(), this.density)
    };
    Qb.prototype.toJSON = function () {
        return {
            type: "FogExp2",
            color: this.color.getHex(),
            density: this.density
        }
    };
    Rb.prototype.isFog = !0;
    Rb.prototype.clone =
        function () {
            return new Rb(this.color.getHex(), this.near, this.far)
        };
    Rb.prototype.toJSON = function () {
        return {
            type: "Fog",
            color: this.color.getHex(),
            near: this.near,
            far: this.far
        }
    };
    rd.prototype = Object.assign(Object.create(B.prototype), {
        constructor: rd,
        copy: function (a, b) {
            B.prototype.copy.call(this, a, b);
            null !== a.background && (this.background = a.background.clone());
            null !== a.fog && (this.fog = a.fog.clone());
            null !== a.overrideMaterial && (this.overrideMaterial = a.overrideMaterial.clone());
            this.autoUpdate = a.autoUpdate;
            this.matrixAutoUpdate =
                a.matrixAutoUpdate;
            return this
        },
        toJSON: function (a) {
            var b = B.prototype.toJSON.call(this, a);
            null !== this.background && (b.object.background = this.background.toJSON(a));
            null !== this.fog && (b.object.fog = this.fog.toJSON());
            return b
        }
    });
    gb.prototype = Object.create(Q.prototype);
    gb.prototype.constructor = gb;
    gb.prototype.isSpriteMaterial = !0;
    gb.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.rotation = a.rotation;
        return this
    };
    Dc.prototype = Object.assign(Object.create(B.prototype), {
        constructor: Dc,
        isSprite: !0,
        raycast: function () {
            var a = new p,
                b = new p,
                c = new p;
            return function (d, e) {
                b.setFromMatrixPosition(this.matrixWorld);
                d.ray.closestPointToPoint(b, a);
                c.setFromMatrixScale(this.matrixWorld);
                var f = c.x * c.y / 4;
                b.distanceToSquared(a) > f || (f = d.ray.origin.distanceTo(a), f < d.near || f > d.far || e.push({
                    distance: f,
                    point: a.clone(),
                    face: null,
                    object: this
                }))
            }
        }(),
        clone: function () {
            return (new this.constructor(this.material)).copy(this)
        },
        copy: function (a) {
            B.prototype.copy.call(this, a);
            void 0 !== a.center &&
                this.center.copy(a.center);
            return this
        }
    });
    Ec.prototype = Object.assign(Object.create(B.prototype), {
        constructor: Ec,
        copy: function (a) {
            B.prototype.copy.call(this, a, !1);
            a = a.levels;
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                this.addLevel(d.object.clone(), d.distance)
            }
            return this
        },
        addLevel: function (a, b) {
            void 0 === b && (b = 0);
            b = Math.abs(b);
            for (var c = this.levels, d = 0; d < c.length && !(b < c[d].distance); d++);
            c.splice(d, 0, {
                distance: b,
                object: a
            });
            this.add(a)
        },
        getObjectForDistance: function (a) {
            for (var b = this.levels, c = 1, d = b.length; c <
                d && !(a < b[c].distance); c++);
            return b[c - 1].object
        },
        raycast: function () {
            var a = new p;
            return function (b, c) {
                a.setFromMatrixPosition(this.matrixWorld);
                var d = b.ray.origin.distanceTo(a);
                this.getObjectForDistance(d).raycast(b, c)
            }
        }(),
        update: function () {
            var a = new p,
                b = new p;
            return function (c) {
                var d = this.levels;
                if (1 < d.length) {
                    a.setFromMatrixPosition(c.matrixWorld);
                    b.setFromMatrixPosition(this.matrixWorld);
                    c = a.distanceTo(b);
                    d[0].object.visible = !0;
                    for (var e = 1, f = d.length; e < f; e++)
                        if (c >= d[e].distance) d[e - 1].object.visible = !1, d[e].object.visible = !0;
                        else break;
                    for (; e < f; e++) d[e].object.visible = !1
                }
            }
        }(),
        toJSON: function (a) {
            a = B.prototype.toJSON.call(this, a);
            a.object.levels = [];
            for (var b = this.levels, c = 0, d = b.length; c < d; c++) {
                var e = b[c];
                a.object.levels.push({
                    object: e.object.uuid,
                    distance: e.distance
                })
            }
            return a
        }
    });
    Object.assign(Fc.prototype, {
        calculateInverses: function () {
            this.boneInverses = [];
            for (var a = 0, b = this.bones.length; a < b; a++) {
                var c = new K;
                this.bones[a] && c.getInverse(this.bones[a].matrixWorld);
                this.boneInverses.push(c)
            }
        },
        pose: function () {
            var a,
                b;
            var c = 0;
            for (b = this.bones.length; c < b; c++)(a = this.bones[c]) && a.matrixWorld.getInverse(this.boneInverses[c]);
            c = 0;
            for (b = this.bones.length; c < b; c++)
                if (a = this.bones[c]) a.parent && a.parent.isBone ? (a.matrix.getInverse(a.parent.matrixWorld), a.matrix.multiply(a.matrixWorld)) : a.matrix.copy(a.matrixWorld), a.matrix.decompose(a.position, a.quaternion, a.scale)
        },
        update: function () {
            var a = new K,
                b = new K;
            return function () {
                for (var c = this.bones, d = this.boneInverses, e = this.boneMatrices, f = this.boneTexture, g = 0, h = c.length; g <
                    h; g++) a.multiplyMatrices(c[g] ? c[g].matrixWorld : b, d[g]), a.toArray(e, 16 * g);
                void 0 !== f && (f.needsUpdate = !0)
            }
        }(),
        clone: function () {
            return new Fc(this.bones, this.boneInverses)
        },
        getBoneByName: function (a) {
            for (var b = 0, c = this.bones.length; b < c; b++) {
                var d = this.bones[b];
                if (d.name === a) return d
            }
        }
    });
    sd.prototype = Object.assign(Object.create(B.prototype), {
        constructor: sd,
        isBone: !0
    });
    td.prototype = Object.assign(Object.create(ta.prototype), {
        constructor: td,
        isSkinnedMesh: !0,
        initBones: function () {
            var a = [],
                b;
            if (this.geometry &&
                void 0 !== this.geometry.bones) {
                var c = 0;
                for (b = this.geometry.bones.length; c < b; c++) {
                    var d = this.geometry.bones[c];
                    var e = new sd;
                    a.push(e);
                    e.name = d.name;
                    e.position.fromArray(d.pos);
                    e.quaternion.fromArray(d.rotq);
                    void 0 !== d.scl && e.scale.fromArray(d.scl)
                }
                c = 0;
                for (b = this.geometry.bones.length; c < b; c++) d = this.geometry.bones[c], -1 !== d.parent && null !== d.parent && void 0 !== a[d.parent] ? a[d.parent].add(a[c]) : this.add(a[c])
            }
            this.updateMatrixWorld(!0);
            return a
        },
        bind: function (a, b) {
            this.skeleton = a;
            void 0 === b && (this.updateMatrixWorld(!0),
                this.skeleton.calculateInverses(), b = this.matrixWorld);
            this.bindMatrix.copy(b);
            this.bindMatrixInverse.getInverse(b)
        },
        pose: function () {
            this.skeleton.pose()
        },
        normalizeSkinWeights: function () {
            var a;
            if (this.geometry && this.geometry.isGeometry)
                for (a = 0; a < this.geometry.skinWeights.length; a++) {
                    var b = this.geometry.skinWeights[a];
                    var c = 1 / b.manhattanLength();
                    Infinity !== c ? b.multiplyScalar(c) : b.set(1, 0, 0, 0)
                } else if (this.geometry && this.geometry.isBufferGeometry) {
                    b = new da;
                    var d = this.geometry.attributes.skinWeight;
                    for (a =
                        0; a < d.count; a++) b.x = d.getX(a), b.y = d.getY(a), b.z = d.getZ(a), b.w = d.getW(a), c = 1 / b.manhattanLength(), Infinity !== c ? b.multiplyScalar(c) : b.set(1, 0, 0, 0), d.setXYZW(a, b.x, b.y, b.z, b.w)
                }
        },
        updateMatrixWorld: function (a) {
            ta.prototype.updateMatrixWorld.call(this, a);
            "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode)
        },
        clone: function () {
            return (new this.constructor(this.geometry,
                this.material)).copy(this)
        }
    });
    S.prototype = Object.create(Q.prototype);
    S.prototype.constructor = S;
    S.prototype.isLineBasicMaterial = !0;
    S.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.linewidth = a.linewidth;
        this.linecap = a.linecap;
        this.linejoin = a.linejoin;
        return this
    };
    pa.prototype = Object.assign(Object.create(B.prototype), {
        constructor: pa,
        isLine: !0,
        computeLineDistances: function () {
            var a = new p,
                b = new p;
            return function () {
                var c = this.geometry;
                if (c.isBufferGeometry)
                    if (null ===
                        c.index) {
                        for (var d = c.attributes.position, e = [0], f = 1, g = d.count; f < g; f++) a.fromBufferAttribute(d, f - 1), b.fromBufferAttribute(d, f), e[f] = e[f - 1], e[f] += a.distanceTo(b);
                        c.addAttribute("lineDistance", new z(e, 1))
                    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
                else if (c.isGeometry)
                    for (d = c.vertices, e = c.lineDistances, e[0] = 0, f = 1, g = d.length; f < g; f++) e[f] = e[f - 1], e[f] += d[f - 1].distanceTo(d[f]);
                return this
            }
        }(),
        raycast: function () {
            var a = new K,
                b = new qb,
                c =
                new Ga;
            return function (d, e) {
                var f = d.linePrecision;
                f *= f;
                var g = this.geometry,
                    h = this.matrixWorld;
                null === g.boundingSphere && g.computeBoundingSphere();
                c.copy(g.boundingSphere);
                c.applyMatrix4(h);
                if (!1 !== d.ray.intersectsSphere(c)) {
                    a.getInverse(h);
                    b.copy(d.ray).applyMatrix4(a);
                    var l = new p,
                        m = new p;
                    h = new p;
                    var k = new p,
                        n = this && this.isLineSegments ? 2 : 1;
                    if (g.isBufferGeometry) {
                        var t = g.index,
                            r = g.attributes.position.array;
                        if (null !== t) {
                            t = t.array;
                            g = 0;
                            for (var q = t.length - 1; g < q; g += n) {
                                var u = t[g + 1];
                                l.fromArray(r, 3 * t[g]);
                                m.fromArray(r, 3 * u);
                                u = b.distanceSqToSegment(l, m, k, h);
                                u > f || (k.applyMatrix4(this.matrixWorld), u = d.ray.origin.distanceTo(k), u < d.near || u > d.far || e.push({
                                    distance: u,
                                    point: h.clone().applyMatrix4(this.matrixWorld),
                                    index: g,
                                    face: null,
                                    faceIndex: null,
                                    object: this
                                }))
                            }
                        } else
                            for (g = 0, q = r.length / 3 - 1; g < q; g += n) l.fromArray(r, 3 * g), m.fromArray(r, 3 * g + 3), u = b.distanceSqToSegment(l, m, k, h), u > f || (k.applyMatrix4(this.matrixWorld), u = d.ray.origin.distanceTo(k), u < d.near || u > d.far || e.push({
                                distance: u,
                                point: h.clone().applyMatrix4(this.matrixWorld),
                                index: g,
                                face: null,
                                faceIndex: null,
                                object: this
                            }))
                    } else if (g.isGeometry)
                        for (l = g.vertices, m = l.length, g = 0; g < m - 1; g += n) u = b.distanceSqToSegment(l[g], l[g + 1], k, h), u > f || (k.applyMatrix4(this.matrixWorld), u = d.ray.origin.distanceTo(k), u < d.near || u > d.far || e.push({
                            distance: u,
                            point: h.clone().applyMatrix4(this.matrixWorld),
                            index: g,
                            face: null,
                            faceIndex: null,
                            object: this
                        }))
                }
            }
        }(),
        clone: function () {
            return (new this.constructor(this.geometry, this.material)).copy(this)
        }
    });
    V.prototype = Object.assign(Object.create(pa.prototype), {
        constructor: V,
        isLineSegments: !0,
        computeLineDistances: function () {
            var a = new p,
                b = new p;
            return function () {
                var c = this.geometry;
                if (c.isBufferGeometry)
                    if (null === c.index) {
                        for (var d = c.attributes.position, e = [], f = 0, g = d.count; f < g; f += 2) a.fromBufferAttribute(d, f), b.fromBufferAttribute(d, f + 1), e[f] = 0 === f ? 0 : e[f - 1], e[f + 1] = e[f] + a.distanceTo(b);
                        c.addAttribute("lineDistance", new z(e, 1))
                    } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
                else if (c.isGeometry)
                    for (d =
                        c.vertices, e = c.lineDistances, f = 0, g = d.length; f < g; f += 2) a.copy(d[f]), b.copy(d[f + 1]), e[f] = 0 === f ? 0 : e[f - 1], e[f + 1] = e[f] + a.distanceTo(b);
                return this
            }
        }()
    });
    ud.prototype = Object.assign(Object.create(pa.prototype), {
        constructor: ud,
        isLineLoop: !0
    });
    Ia.prototype = Object.create(Q.prototype);
    Ia.prototype.constructor = Ia;
    Ia.prototype.isPointsMaterial = !0;
    Ia.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.size = a.size;
        this.sizeAttenuation = a.sizeAttenuation;
        return this
    };
    Sb.prototype = Object.assign(Object.create(B.prototype), {
        constructor: Sb,
        isPoints: !0,
        raycast: function () {
            var a = new K,
                b = new qb,
                c = new Ga;
            return function (d, e) {
                function f(a, c) {
                    var f = b.distanceSqToPoint(a);
                    f < k && (b.closestPointToPoint(a, n), n.applyMatrix4(l), a = d.ray.origin.distanceTo(n), a < d.near || a > d.far || e.push({
                        distance: a,
                        distanceToRay: Math.sqrt(f),
                        point: n.clone(),
                        index: c,
                        face: null,
                        object: g
                    }))
                }
                var g = this,
                    h = this.geometry,
                    l = this.matrixWorld,
                    m = d.params.Points.threshold;
                null === h.boundingSphere && h.computeBoundingSphere();
                c.copy(h.boundingSphere);
                c.applyMatrix4(l);
                c.radius += m;
                if (!1 !== d.ray.intersectsSphere(c)) {
                    a.getInverse(l);
                    b.copy(d.ray).applyMatrix4(a);
                    m /= (this.scale.x + this.scale.y + this.scale.z) / 3;
                    var k = m * m;
                    m = new p;
                    var n = new p;
                    if (h.isBufferGeometry) {
                        var t = h.index;
                        h = h.attributes.position.array;
                        if (null !== t) {
                            var r = t.array;
                            t = 0;
                            for (var q = r.length; t < q; t++) {
                                var u = r[t];
                                m.fromArray(h, 3 * u);
                                f(m, u)
                            }
                        } else
                            for (t = 0, r = h.length / 3; t < r; t++) m.fromArray(h, 3 * t), f(m, t)
                    } else
                        for (m = h.vertices, t = 0, r = m.length; t < r; t++) f(m[t], t)
                }
            }
        }(),
        clone: function () {
            return (new this.constructor(this.geometry,
                this.material)).copy(this)
        }
    });
    vd.prototype = Object.assign(Object.create(B.prototype), {
        constructor: vd,
        isGroup: !0
    });
    Yd.prototype = Object.assign(Object.create(X.prototype), {
        constructor: Yd,
        isVideoTexture: !0,
        update: function () {
            var a = this.image;
            a.readyState >= a.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
        }
    });
    Tb.prototype = Object.create(X.prototype);
    Tb.prototype.constructor = Tb;
    Tb.prototype.isCompressedTexture = !0;
    Gc.prototype = Object.create(X.prototype);
    Gc.prototype.constructor = Gc;
    Gc.prototype.isDepthTexture = !0;
    Ub.prototype =
        Object.create(I.prototype);
    Ub.prototype.constructor = Ub;
    Hc.prototype = Object.create(M.prototype);
    Hc.prototype.constructor = Hc;
    Vb.prototype = Object.create(I.prototype);
    Vb.prototype.constructor = Vb;
    Ic.prototype = Object.create(M.prototype);
    Ic.prototype.constructor = Ic;
    ma.prototype = Object.create(I.prototype);
    ma.prototype.constructor = ma;
    Jc.prototype = Object.create(M.prototype);
    Jc.prototype.constructor = Jc;
    Wb.prototype = Object.create(ma.prototype);
    Wb.prototype.constructor = Wb;
    Kc.prototype = Object.create(M.prototype);
    Kc.prototype.constructor = Kc;
    sb.prototype = Object.create(ma.prototype);
    sb.prototype.constructor = sb;
    Lc.prototype = Object.create(M.prototype);
    Lc.prototype.constructor = Lc;
    Xb.prototype = Object.create(ma.prototype);
    Xb.prototype.constructor = Xb;
    Mc.prototype = Object.create(M.prototype);
    Mc.prototype.constructor = Mc;
    Yb.prototype = Object.create(ma.prototype);
    Yb.prototype.constructor = Yb;
    Nc.prototype = Object.create(M.prototype);
    Nc.prototype.constructor = Nc;
    Zb.prototype = Object.create(I.prototype);
    Zb.prototype.constructor =
        Zb;
    Oc.prototype = Object.create(M.prototype);
    Oc.prototype.constructor = Oc;
    $b.prototype = Object.create(I.prototype);
    $b.prototype.constructor = $b;
    Pc.prototype = Object.create(M.prototype);
    Pc.prototype.constructor = Pc;
    ac.prototype = Object.create(I.prototype);
    ac.prototype.constructor = ac;
    var Mg = {
            triangulate: function (a, b, c) {
                c = c || 2;
                var d = b && b.length,
                    e = d ? b[0] * c : a.length,
                    f = Xe(a, 0, e, c, !0),
                    g = [];
                if (!f) return g;
                var h;
                if (d) {
                    var l = c;
                    d = [];
                    var m;
                    var k = 0;
                    for (m = b.length; k < m; k++) {
                        var n = b[k] * l;
                        var p = k < m - 1 ? b[k + 1] * l : a.length;
                        n =
                            Xe(a, n, p, l, !1);
                        n === n.next && (n.steiner = !0);
                        d.push(Jg(n))
                    }
                    d.sort(Hg);
                    for (k = 0; k < d.length; k++) {
                        b = d[k];
                        l = f;
                        if (l = Ig(b, l)) b = $e(l, b), Rc(b, b.next);
                        f = Rc(f, f.next)
                    }
                }
                if (a.length > 80 * c) {
                    var r = h = a[0];
                    var q = d = a[1];
                    for (l = c; l < e; l += c) k = a[l], b = a[l + 1], k < r && (r = k), b < q && (q = b), k > h && (h = k), b > d && (d = b);
                    h = Math.max(h - r, d - q);
                    h = 0 !== h ? 1 / h : 0
                }
                Sc(f, g, c, r, q, h);
                return g
            }
        },
        Ya = {
            area: function (a) {
                for (var b = a.length, c = 0, d = b - 1, e = 0; e < b; d = e++) c += a[d].x * a[e].y - a[e].x * a[d].y;
                return .5 * c
            },
            isClockWise: function (a) {
                return 0 > Ya.area(a)
            },
            triangulateShape: function (a,
                b) {
                var c = [],
                    d = [],
                    e = [];
                af(a);
                bf(c, a);
                var f = a.length;
                b.forEach(af);
                for (a = 0; a < b.length; a++) d.push(f), f += b[a].length, bf(c, b[a]);
                b = Mg.triangulate(c, d);
                for (a = 0; a < b.length; a += 3) e.push(b.slice(a, a + 3));
                return e
            }
        };
    bc.prototype = Object.create(M.prototype);
    bc.prototype.constructor = bc;
    Xa.prototype = Object.create(I.prototype);
    Xa.prototype.constructor = Xa;
    var Kg = {
        generateTopUV: function (a, b, c, d, e) {
            a = b[3 * d];
            d = b[3 * d + 1];
            var f = b[3 * e];
            e = b[3 * e + 1];
            return [new A(b[3 * c], b[3 * c + 1]), new A(a, d), new A(f, e)]
        },
        generateSideWallUV: function (a,
            b, c, d, e, f) {
            a = b[3 * c];
            var g = b[3 * c + 1];
            c = b[3 * c + 2];
            var h = b[3 * d],
                l = b[3 * d + 1];
            d = b[3 * d + 2];
            var m = b[3 * e],
                k = b[3 * e + 1];
            e = b[3 * e + 2];
            var n = b[3 * f],
                p = b[3 * f + 1];
            b = b[3 * f + 2];
            return .01 > Math.abs(g - l) ? [new A(a, 1 - c), new A(h, 1 - d), new A(m, 1 - e), new A(n, 1 - b)] : [new A(g, 1 - c), new A(l, 1 - d), new A(k, 1 - e), new A(p, 1 - b)]
        }
    };
    Uc.prototype = Object.create(M.prototype);
    Uc.prototype.constructor = Uc;
    cc.prototype = Object.create(Xa.prototype);
    cc.prototype.constructor = cc;
    Vc.prototype = Object.create(M.prototype);
    Vc.prototype.constructor = Vc;
    ub.prototype =
        Object.create(I.prototype);
    ub.prototype.constructor = ub;
    Wc.prototype = Object.create(M.prototype);
    Wc.prototype.constructor = Wc;
    dc.prototype = Object.create(I.prototype);
    dc.prototype.constructor = dc;
    Xc.prototype = Object.create(M.prototype);
    Xc.prototype.constructor = Xc;
    ec.prototype = Object.create(I.prototype);
    ec.prototype.constructor = ec;
    vb.prototype = Object.create(M.prototype);
    vb.prototype.constructor = vb;
    vb.prototype.toJSON = function () {
        var a = M.prototype.toJSON.call(this);
        return cf(this.parameters.shapes, a)
    };
    wb.prototype =
        Object.create(I.prototype);
    wb.prototype.constructor = wb;
    wb.prototype.toJSON = function () {
        var a = I.prototype.toJSON.call(this);
        return cf(this.parameters.shapes, a)
    };
    fc.prototype = Object.create(I.prototype);
    fc.prototype.constructor = fc;
    xb.prototype = Object.create(M.prototype);
    xb.prototype.constructor = xb;
    Za.prototype = Object.create(I.prototype);
    Za.prototype.constructor = Za;
    Yc.prototype = Object.create(xb.prototype);
    Yc.prototype.constructor = Yc;
    Zc.prototype = Object.create(Za.prototype);
    Zc.prototype.constructor = Zc;
    $c.prototype = Object.create(M.prototype);
    $c.prototype.constructor = $c;
    gc.prototype = Object.create(I.prototype);
    gc.prototype.constructor = gc;
    var ua = Object.freeze({
        WireframeGeometry: Ub,
        ParametricGeometry: Hc,
        ParametricBufferGeometry: Vb,
        TetrahedronGeometry: Jc,
        TetrahedronBufferGeometry: Wb,
        OctahedronGeometry: Kc,
        OctahedronBufferGeometry: sb,
        IcosahedronGeometry: Lc,
        IcosahedronBufferGeometry: Xb,
        DodecahedronGeometry: Mc,
        DodecahedronBufferGeometry: Yb,
        PolyhedronGeometry: Ic,
        PolyhedronBufferGeometry: ma,
        TubeGeometry: Nc,
        TubeBufferGeometry: Zb,
        TorusKnotGeometry: Oc,
        TorusKnotBufferGeometry: $b,
        TorusGeometry: Pc,
        TorusBufferGeometry: ac,
        TextGeometry: Uc,
        TextBufferGeometry: cc,
        SphereGeometry: Vc,
        SphereBufferGeometry: ub,
        RingGeometry: Wc,
        RingBufferGeometry: dc,
        PlaneGeometry: Ac,
        PlaneBufferGeometry: pb,
        LatheGeometry: Xc,
        LatheBufferGeometry: ec,
        ShapeGeometry: vb,
        ShapeBufferGeometry: wb,
        ExtrudeGeometry: bc,
        ExtrudeBufferGeometry: Xa,
        EdgesGeometry: fc,
        ConeGeometry: Yc,
        ConeBufferGeometry: Zc,
        CylinderGeometry: xb,
        CylinderBufferGeometry: Za,
        CircleGeometry: $c,
        CircleBufferGeometry: gc,
        BoxGeometry: Kb,
        BoxBufferGeometry: nb
    });
    yb.prototype = Object.create(Q.prototype);
    yb.prototype.constructor = yb;
    yb.prototype.isShadowMaterial = !0;
    yb.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.color.copy(a.color);
        return this
    };
    hc.prototype = Object.create(za.prototype);
    hc.prototype.constructor = hc;
    hc.prototype.isRawShaderMaterial = !0;
    Sa.prototype = Object.create(Q.prototype);
    Sa.prototype.constructor = Sa;
    Sa.prototype.isMeshStandardMaterial = !0;
    Sa.prototype.copy = function (a) {
        Q.prototype.copy.call(this,
            a);
        this.defines = {
            STANDARD: ""
        };
        this.color.copy(a.color);
        this.roughness = a.roughness;
        this.metalness = a.metalness;
        this.map = a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity = a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.emissive.copy(a.emissive);
        this.emissiveMap = a.emissiveMap;
        this.emissiveIntensity = a.emissiveIntensity;
        this.bumpMap = a.bumpMap;
        this.bumpScale = a.bumpScale;
        this.normalMap = a.normalMap;
        this.normalScale.copy(a.normalScale);
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.roughnessMap = a.roughnessMap;
        this.metalnessMap = a.metalnessMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.envMapIntensity = a.envMapIntensity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals =
            a.morphNormals;
        return this
    };
    zb.prototype = Object.create(Sa.prototype);
    zb.prototype.constructor = zb;
    zb.prototype.isMeshPhysicalMaterial = !0;
    zb.prototype.copy = function (a) {
        Sa.prototype.copy.call(this, a);
        this.defines = {
            PHYSICAL: ""
        };
        this.reflectivity = a.reflectivity;
        this.clearCoat = a.clearCoat;
        this.clearCoatRoughness = a.clearCoatRoughness;
        return this
    };
    Ja.prototype = Object.create(Q.prototype);
    Ja.prototype.constructor = Ja;
    Ja.prototype.isMeshPhongMaterial = !0;
    Ja.prototype.copy = function (a) {
        Q.prototype.copy.call(this,
            a);
        this.color.copy(a.color);
        this.specular.copy(a.specular);
        this.shininess = a.shininess;
        this.map = a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity = a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.emissive.copy(a.emissive);
        this.emissiveMap = a.emissiveMap;
        this.emissiveIntensity = a.emissiveIntensity;
        this.bumpMap = a.bumpMap;
        this.bumpScale = a.bumpScale;
        this.normalMap = a.normalMap;
        this.normalScale.copy(a.normalScale);
        this.displacementMap = a.displacementMap;
        this.displacementScale =
            a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.specularMap = a.specularMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.combine = a.combine;
        this.reflectivity = a.reflectivity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        return this
    };
    Ab.prototype =
        Object.create(Ja.prototype);
    Ab.prototype.constructor = Ab;
    Ab.prototype.isMeshToonMaterial = !0;
    Ab.prototype.copy = function (a) {
        Ja.prototype.copy.call(this, a);
        this.gradientMap = a.gradientMap;
        return this
    };
    Bb.prototype = Object.create(Q.prototype);
    Bb.prototype.constructor = Bb;
    Bb.prototype.isMeshNormalMaterial = !0;
    Bb.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.bumpMap = a.bumpMap;
        this.bumpScale = a.bumpScale;
        this.normalMap = a.normalMap;
        this.normalScale.copy(a.normalScale);
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        return this
    };
    Cb.prototype = Object.create(Q.prototype);
    Cb.prototype.constructor = Cb;
    Cb.prototype.isMeshLambertMaterial = !0;
    Cb.prototype.copy = function (a) {
        Q.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity =
            a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.emissive.copy(a.emissive);
        this.emissiveMap = a.emissiveMap;
        this.emissiveIntensity = a.emissiveIntensity;
        this.specularMap = a.specularMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.combine = a.combine;
        this.reflectivity = a.reflectivity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        return this
    };
    Db.prototype = Object.create(S.prototype);
    Db.prototype.constructor = Db;
    Db.prototype.isLineDashedMaterial = !0;
    Db.prototype.copy = function (a) {
        S.prototype.copy.call(this, a);
        this.scale = a.scale;
        this.dashSize = a.dashSize;
        this.gapSize = a.gapSize;
        return this
    };
    var Ng = Object.freeze({
            ShadowMaterial: yb,
            SpriteMaterial: gb,
            RawShaderMaterial: hc,
            ShaderMaterial: za,
            PointsMaterial: Ia,
            MeshPhysicalMaterial: zb,
            MeshStandardMaterial: Sa,
            MeshPhongMaterial: Ja,
            MeshToonMaterial: Ab,
            MeshNormalMaterial: Bb,
            MeshLambertMaterial: Cb,
            MeshDepthMaterial: db,
            MeshDistanceMaterial: eb,
            MeshBasicMaterial: ya,
            LineDashedMaterial: Db,
            LineBasicMaterial: S,
            Material: Q
        }),
        Hb = {
            enabled: !1,
            files: {},
            add: function (a, b) {
                !1 !== this.enabled && (this.files[a] = b)
            },
            get: function (a) {
                if (!1 !== this.enabled) return this.files[a]
            },
            remove: function (a) {
                delete this.files[a]
            },
            clear: function () {
                this.files = {}
            }
        },
        va = new ae,
        ab = {};
    Object.assign(Ka.prototype, {
        load: function (a, b, c, d) {
            void 0 === a && (a =
                "");
            void 0 !== this.path && (a = this.path + a);
            a = this.manager.resolveURL(a);
            var e = this,
                f = Hb.get(a);
            if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
                b && b(f);
                e.manager.itemEnd(a)
            }, 0), f;
            if (void 0 !== ab[a]) ab[a].push({
                onLoad: b,
                onProgress: c,
                onError: d
            });
            else {
                var g = a.match(/^data:(.*?)(;base64)?,(.*)$/);
                if (g) {
                    c = g[1];
                    var h = !!g[2];
                    g = g[3];
                    g = window.decodeURIComponent(g);
                    h && (g = window.atob(g));
                    try {
                        var l = (this.responseType || "").toLowerCase();
                        switch (l) {
                            case "arraybuffer":
                            case "blob":
                                var m = new Uint8Array(g.length);
                                for (h = 0; h < g.length; h++) m[h] = g.charCodeAt(h);
                                var k = "blob" === l ? new Blob([m.buffer], {
                                    type: c
                                }) : m.buffer;
                                break;
                            case "document":
                                k = (new DOMParser).parseFromString(g, c);
                                break;
                            case "json":
                                k = JSON.parse(g);
                                break;
                            default:
                                k = g
                        }
                        window.setTimeout(function () {
                            b && b(k);
                            e.manager.itemEnd(a)
                        }, 0)
                    } catch (t) {
                        window.setTimeout(function () {
                            d && d(t);
                            e.manager.itemEnd(a);
                            e.manager.itemError(a)
                        }, 0)
                    }
                } else {
                    ab[a] = [];
                    ab[a].push({
                        onLoad: b,
                        onProgress: c,
                        onError: d
                    });
                    var n = new XMLHttpRequest;
                    n.open("GET", a, !0);
                    n.addEventListener("load", function (b) {
                        var c =
                            this.response;
                        Hb.add(a, c);
                        var d = ab[a];
                        delete ab[a];
                        if (200 === this.status) {
                            for (var f = 0, g = d.length; f < g; f++) {
                                var h = d[f];
                                if (h.onLoad) h.onLoad(c)
                            }
                            e.manager.itemEnd(a)
                        } else if (0 === this.status) {
                            console.warn("THREE.FileLoader: HTTP Status 0 received.");
                            f = 0;
                            for (g = d.length; f < g; f++)
                                if (h = d[f], h.onLoad) h.onLoad(c);
                            e.manager.itemEnd(a)
                        } else {
                            f = 0;
                            for (g = d.length; f < g; f++)
                                if (h = d[f], h.onError) h.onError(b);
                            e.manager.itemEnd(a);
                            e.manager.itemError(a)
                        }
                    }, !1);
                    n.addEventListener("progress", function (b) {
                        for (var c = ab[a], d = 0, e =
                                c.length; d < e; d++) {
                            var f = c[d];
                            if (f.onProgress) f.onProgress(b)
                        }
                    }, !1);
                    n.addEventListener("error", function (b) {
                        var c = ab[a];
                        delete ab[a];
                        for (var d = 0, f = c.length; d < f; d++) {
                            var g = c[d];
                            if (g.onError) g.onError(b)
                        }
                        e.manager.itemEnd(a);
                        e.manager.itemError(a)
                    }, !1);
                    void 0 !== this.responseType && (n.responseType = this.responseType);
                    void 0 !== this.withCredentials && (n.withCredentials = this.withCredentials);
                    n.overrideMimeType && n.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain");
                    for (h in this.requestHeader) n.setRequestHeader(h,
                        this.requestHeader[h]);
                    n.send(null)
                }
                e.manager.itemStart(a);
                return n
            }
        },
        setPath: function (a) {
            this.path = a;
            return this
        },
        setResponseType: function (a) {
            this.responseType = a;
            return this
        },
        setWithCredentials: function (a) {
            this.withCredentials = a;
            return this
        },
        setMimeType: function (a) {
            this.mimeType = a;
            return this
        },
        setRequestHeader: function (a) {
            this.requestHeader = a;
            return this
        }
    });
    Object.assign(df.prototype, {
        load: function (a, b, c, d) {
            function e(e) {
                l.load(a[e], function (a) {
                    a = f._parser(a, !0);
                    g[e] = {
                        width: a.width,
                        height: a.height,
                        format: a.format,
                        mipmaps: a.mipmaps
                    };
                    m += 1;
                    6 === m && (1 === a.mipmapCount && (h.minFilter = 1006), h.format = a.format, h.needsUpdate = !0, b && b(h))
                }, c, d)
            }
            var f = this,
                g = [],
                h = new Tb;
            h.image = g;
            var l = new Ka(this.manager);
            l.setPath(this.path);
            l.setResponseType("arraybuffer");
            if (Array.isArray(a))
                for (var m = 0, k = 0, n = a.length; k < n; ++k) e(k);
            else l.load(a, function (a) {
                a = f._parser(a, !0);
                if (a.isCubemap)
                    for (var c = a.mipmaps.length / a.mipmapCount, d = 0; d < c; d++) {
                        g[d] = {
                            mipmaps: []
                        };
                        for (var e = 0; e < a.mipmapCount; e++) g[d].mipmaps.push(a.mipmaps[d *
                            a.mipmapCount + e]), g[d].format = a.format, g[d].width = a.width, g[d].height = a.height
                    } else h.image.width = a.width, h.image.height = a.height, h.mipmaps = a.mipmaps;
                1 === a.mipmapCount && (h.minFilter = 1006);
                h.format = a.format;
                h.needsUpdate = !0;
                b && b(h)
            }, c, d);
            return h
        },
        setPath: function (a) {
            this.path = a;
            return this
        }
    });
    Object.assign(be.prototype, {
        load: function (a, b, c, d) {
            var e = this,
                f = new jb,
                g = new Ka(this.manager);
            g.setResponseType("arraybuffer");
            g.load(a, function (a) {
                if (a = e._parser(a)) void 0 !== a.image ? f.image = a.image : void 0 !==
                    a.data && (f.image.width = a.width, f.image.height = a.height, f.image.data = a.data), f.wrapS = void 0 !== a.wrapS ? a.wrapS : 1001, f.wrapT = void 0 !== a.wrapT ? a.wrapT : 1001, f.magFilter = void 0 !== a.magFilter ? a.magFilter : 1006, f.minFilter = void 0 !== a.minFilter ? a.minFilter : 1008, f.anisotropy = void 0 !== a.anisotropy ? a.anisotropy : 1, void 0 !== a.format && (f.format = a.format), void 0 !== a.type && (f.type = a.type), void 0 !== a.mipmaps && (f.mipmaps = a.mipmaps), 1 === a.mipmapCount && (f.minFilter = 1006), f.needsUpdate = !0, b && b(f, a)
            }, c, d);
            return f
        }
    });
    Object.assign(ad.prototype, {
        crossOrigin: "Anonymous",
        load: function (a, b, c, d) {
            void 0 === a && (a = "");
            void 0 !== this.path && (a = this.path + a);
            a = this.manager.resolveURL(a);
            var e = this,
                f = Hb.get(a);
            if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
                b && b(f);
                e.manager.itemEnd(a)
            }, 0), f;
            c = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
            c.addEventListener("load", function () {
                Hb.add(a, this);
                b && b(this);
                e.manager.itemEnd(a)
            }, !1);
            c.addEventListener("error", function (b) {
                    d && d(b);
                    e.manager.itemEnd(a);
                    e.manager.itemError(a)
                },
                !1);
            "data:" !== a.substr(0, 5) && void 0 !== this.crossOrigin && (c.crossOrigin = this.crossOrigin);
            e.manager.itemStart(a);
            c.src = a;
            return c
        },
        setCrossOrigin: function (a) {
            this.crossOrigin = a;
            return this
        },
        setPath: function (a) {
            this.path = a;
            return this
        }
    });
    Object.assign(ce.prototype, {
        crossOrigin: "Anonymous",
        load: function (a, b, c, d) {
            function e(c) {
                g.load(a[c], function (a) {
                    f.images[c] = a;
                    h++;
                    6 === h && (f.needsUpdate = !0, b && b(f))
                }, void 0, d)
            }
            var f = new bb,
                g = new ad(this.manager);
            g.setCrossOrigin(this.crossOrigin);
            g.setPath(this.path);
            var h = 0;
            for (c = 0; c < a.length; ++c) e(c);
            return f
        },
        setCrossOrigin: function (a) {
            this.crossOrigin = a;
            return this
        },
        setPath: function (a) {
            this.path = a;
            return this
        }
    });
    Object.assign(xd.prototype, {
        crossOrigin: "Anonymous",
        load: function (a, b, c, d) {
            var e = new X,
                f = new ad(this.manager);
            f.setCrossOrigin(this.crossOrigin);
            f.setPath(this.path);
            f.load(a, function (c) {
                e.image = c;
                c = 0 < a.search(/\.(jpg|jpeg)$/) || 0 === a.search(/^data:image\/jpeg/);
                e.format = c ? 1022 : 1023;
                e.needsUpdate = !0;
                void 0 !== b && b(e)
            }, c, d);
            return e
        },
        setCrossOrigin: function (a) {
            this.crossOrigin =
                a;
            return this
        },
        setPath: function (a) {
            this.path = a;
            return this
        }
    });
    Object.assign(J.prototype, {
        getPoint: function () {
            console.warn("THREE.Curve: .getPoint() not implemented.");
            return null
        },
        getPointAt: function (a, b) {
            a = this.getUtoTmapping(a);
            return this.getPoint(a, b)
        },
        getPoints: function (a) {
            void 0 === a && (a = 5);
            for (var b = [], c = 0; c <= a; c++) b.push(this.getPoint(c / a));
            return b
        },
        getSpacedPoints: function (a) {
            void 0 === a && (a = 5);
            for (var b = [], c = 0; c <= a; c++) b.push(this.getPointAt(c / a));
            return b
        },
        getLength: function () {
            var a = this.getLengths();
            return a[a.length - 1]
        },
        getLengths: function (a) {
            void 0 === a && (a = this.arcLengthDivisions);
            if (this.cacheArcLengths && this.cacheArcLengths.length === a + 1 && !this.needsUpdate) return this.cacheArcLengths;
            this.needsUpdate = !1;
            var b = [],
                c = this.getPoint(0),
                d, e = 0;
            b.push(0);
            for (d = 1; d <= a; d++) {
                var f = this.getPoint(d / a);
                e += f.distanceTo(c);
                b.push(e);
                c = f
            }
            return this.cacheArcLengths = b
        },
        updateArcLengths: function () {
            this.needsUpdate = !0;
            this.getLengths()
        },
        getUtoTmapping: function (a, b) {
            var c = this.getLengths(),
                d = c.length;
            b = b ? b : a *
                c[d - 1];
            for (var e = 0, f = d - 1, g; e <= f;)
                if (a = Math.floor(e + (f - e) / 2), g = c[a] - b, 0 > g) e = a + 1;
                else if (0 < g) f = a - 1;
            else {
                f = a;
                break
            }
            a = f;
            if (c[a] === b) return a / (d - 1);
            e = c[a];
            return (a + (b - e) / (c[a + 1] - e)) / (d - 1)
        },
        getTangent: function (a) {
            var b = a - 1E-4;
            a += 1E-4;
            0 > b && (b = 0);
            1 < a && (a = 1);
            b = this.getPoint(b);
            return this.getPoint(a).clone().sub(b).normalize()
        },
        getTangentAt: function (a) {
            a = this.getUtoTmapping(a);
            return this.getTangent(a)
        },
        computeFrenetFrames: function (a, b) {
            var c = new p,
                d = [],
                e = [],
                f = [],
                g = new p,
                h = new K,
                l;
            for (l = 0; l <= a; l++) {
                var m =
                    l / a;
                d[l] = this.getTangentAt(m);
                d[l].normalize()
            }
            e[0] = new p;
            f[0] = new p;
            l = Number.MAX_VALUE;
            m = Math.abs(d[0].x);
            var k = Math.abs(d[0].y),
                n = Math.abs(d[0].z);
            m <= l && (l = m, c.set(1, 0, 0));
            k <= l && (l = k, c.set(0, 1, 0));
            n <= l && c.set(0, 0, 1);
            g.crossVectors(d[0], c).normalize();
            e[0].crossVectors(d[0], g);
            f[0].crossVectors(d[0], e[0]);
            for (l = 1; l <= a; l++) e[l] = e[l - 1].clone(), f[l] = f[l - 1].clone(), g.crossVectors(d[l - 1], d[l]), g.length() > Number.EPSILON && (g.normalize(), c = Math.acos(R.clamp(d[l - 1].dot(d[l]), -1, 1)), e[l].applyMatrix4(h.makeRotationAxis(g,
                c))), f[l].crossVectors(d[l], e[l]);
            if (!0 === b)
                for (c = Math.acos(R.clamp(e[0].dot(e[a]), -1, 1)), c /= a, 0 < d[0].dot(g.crossVectors(e[0], e[a])) && (c = -c), l = 1; l <= a; l++) e[l].applyMatrix4(h.makeRotationAxis(d[l], c * l)), f[l].crossVectors(d[l], e[l]);
            return {
                tangents: d,
                normals: e,
                binormals: f
            }
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.arcLengthDivisions = a.arcLengthDivisions;
            return this
        },
        toJSON: function () {
            var a = {
                metadata: {
                    version: 4.5,
                    type: "Curve",
                    generator: "Curve.toJSON"
                }
            };
            a.arcLengthDivisions =
                this.arcLengthDivisions;
            a.type = this.type;
            return a
        },
        fromJSON: function (a) {
            this.arcLengthDivisions = a.arcLengthDivisions;
            return this
        }
    });
    na.prototype = Object.create(J.prototype);
    na.prototype.constructor = na;
    na.prototype.isEllipseCurve = !0;
    na.prototype.getPoint = function (a, b) {
        b = b || new A;
        for (var c = 2 * Math.PI, d = this.aEndAngle - this.aStartAngle, e = Math.abs(d) < Number.EPSILON; 0 > d;) d += c;
        for (; d > c;) d -= c;
        d < Number.EPSILON && (d = e ? 0 : c);
        !0 !== this.aClockwise || e || (d = d === c ? -c : d - c);
        c = this.aStartAngle + a * d;
        a = this.aX + this.xRadius *
            Math.cos(c);
        var f = this.aY + this.yRadius * Math.sin(c);
        0 !== this.aRotation && (c = Math.cos(this.aRotation), d = Math.sin(this.aRotation), e = a - this.aX, f -= this.aY, a = e * c - f * d + this.aX, f = e * d + f * c + this.aY);
        return b.set(a, f)
    };
    na.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.aX = a.aX;
        this.aY = a.aY;
        this.xRadius = a.xRadius;
        this.yRadius = a.yRadius;
        this.aStartAngle = a.aStartAngle;
        this.aEndAngle = a.aEndAngle;
        this.aClockwise = a.aClockwise;
        this.aRotation = a.aRotation;
        return this
    };
    na.prototype.toJSON = function () {
        var a =
            J.prototype.toJSON.call(this);
        a.aX = this.aX;
        a.aY = this.aY;
        a.xRadius = this.xRadius;
        a.yRadius = this.yRadius;
        a.aStartAngle = this.aStartAngle;
        a.aEndAngle = this.aEndAngle;
        a.aClockwise = this.aClockwise;
        a.aRotation = this.aRotation;
        return a
    };
    na.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.aX = a.aX;
        this.aY = a.aY;
        this.xRadius = a.xRadius;
        this.yRadius = a.yRadius;
        this.aStartAngle = a.aStartAngle;
        this.aEndAngle = a.aEndAngle;
        this.aClockwise = a.aClockwise;
        this.aRotation = a.aRotation;
        return this
    };
    ic.prototype =
        Object.create(na.prototype);
    ic.prototype.constructor = ic;
    ic.prototype.isArcCurve = !0;
    var Qd = new p,
        ye = new de,
        ze = new de,
        Ae = new de;
    ca.prototype = Object.create(J.prototype);
    ca.prototype.constructor = ca;
    ca.prototype.isCatmullRomCurve3 = !0;
    ca.prototype.getPoint = function (a, b) {
        b = b || new p;
        var c = this.points,
            d = c.length;
        a *= d - (this.closed ? 0 : 1);
        var e = Math.floor(a);
        a -= e;
        this.closed ? e += 0 < e ? 0 : (Math.floor(Math.abs(e) / c.length) + 1) * c.length : 0 === a && e === d - 1 && (e = d - 2, a = 1);
        if (this.closed || 0 < e) var f = c[(e - 1) % d];
        else Qd.subVectors(c[0],
            c[1]).add(c[0]), f = Qd;
        var g = c[e % d];
        var h = c[(e + 1) % d];
        this.closed || e + 2 < d ? c = c[(e + 2) % d] : (Qd.subVectors(c[d - 1], c[d - 2]).add(c[d - 1]), c = Qd);
        if ("centripetal" === this.curveType || "chordal" === this.curveType) {
            var l = "chordal" === this.curveType ? .5 : .25;
            d = Math.pow(f.distanceToSquared(g), l);
            e = Math.pow(g.distanceToSquared(h), l);
            l = Math.pow(h.distanceToSquared(c), l);
            1E-4 > e && (e = 1);
            1E-4 > d && (d = e);
            1E-4 > l && (l = e);
            ye.initNonuniformCatmullRom(f.x, g.x, h.x, c.x, d, e, l);
            ze.initNonuniformCatmullRom(f.y, g.y, h.y, c.y, d, e, l);
            Ae.initNonuniformCatmullRom(f.z,
                g.z, h.z, c.z, d, e, l)
        } else "catmullrom" === this.curveType && (ye.initCatmullRom(f.x, g.x, h.x, c.x, this.tension), ze.initCatmullRom(f.y, g.y, h.y, c.y, this.tension), Ae.initCatmullRom(f.z, g.z, h.z, c.z, this.tension));
        b.set(ye.calc(a), ze.calc(a), Ae.calc(a));
        return b
    };
    ca.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.points = [];
        for (var b = 0, c = a.points.length; b < c; b++) this.points.push(a.points[b].clone());
        this.closed = a.closed;
        this.curveType = a.curveType;
        this.tension = a.tension;
        return this
    };
    ca.prototype.toJSON =
        function () {
            var a = J.prototype.toJSON.call(this);
            a.points = [];
            for (var b = 0, c = this.points.length; b < c; b++) a.points.push(this.points[b].toArray());
            a.closed = this.closed;
            a.curveType = this.curveType;
            a.tension = this.tension;
            return a
        };
    ca.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.points = [];
        for (var b = 0, c = a.points.length; b < c; b++) {
            var d = a.points[b];
            this.points.push((new p).fromArray(d))
        }
        this.closed = a.closed;
        this.curveType = a.curveType;
        this.tension = a.tension;
        return this
    };
    La.prototype = Object.create(J.prototype);
    La.prototype.constructor = La;
    La.prototype.isCubicBezierCurve = !0;
    La.prototype.getPoint = function (a, b) {
        b = b || new A;
        var c = this.v0,
            d = this.v1,
            e = this.v2,
            f = this.v3;
        b.set(cd(a, c.x, d.x, e.x, f.x), cd(a, c.y, d.y, e.y, f.y));
        return b
    };
    La.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.v0.copy(a.v0);
        this.v1.copy(a.v1);
        this.v2.copy(a.v2);
        this.v3.copy(a.v3);
        return this
    };
    La.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.v0 = this.v0.toArray();
        a.v1 = this.v1.toArray();
        a.v2 = this.v2.toArray();
        a.v3 =
            this.v3.toArray();
        return a
    };
    La.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.v0.fromArray(a.v0);
        this.v1.fromArray(a.v1);
        this.v2.fromArray(a.v2);
        this.v3.fromArray(a.v3);
        return this
    };
    Ta.prototype = Object.create(J.prototype);
    Ta.prototype.constructor = Ta;
    Ta.prototype.isCubicBezierCurve3 = !0;
    Ta.prototype.getPoint = function (a, b) {
        b = b || new p;
        var c = this.v0,
            d = this.v1,
            e = this.v2,
            f = this.v3;
        b.set(cd(a, c.x, d.x, e.x, f.x), cd(a, c.y, d.y, e.y, f.y), cd(a, c.z, d.z, e.z, f.z));
        return b
    };
    Ta.prototype.copy =
        function (a) {
            J.prototype.copy.call(this, a);
            this.v0.copy(a.v0);
            this.v1.copy(a.v1);
            this.v2.copy(a.v2);
            this.v3.copy(a.v3);
            return this
        };
    Ta.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.v0 = this.v0.toArray();
        a.v1 = this.v1.toArray();
        a.v2 = this.v2.toArray();
        a.v3 = this.v3.toArray();
        return a
    };
    Ta.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.v0.fromArray(a.v0);
        this.v1.fromArray(a.v1);
        this.v2.fromArray(a.v2);
        this.v3.fromArray(a.v3);
        return this
    };
    wa.prototype = Object.create(J.prototype);
    wa.prototype.constructor = wa;
    wa.prototype.isLineCurve = !0;
    wa.prototype.getPoint = function (a, b) {
        b = b || new A;
        1 === a ? b.copy(this.v2) : (b.copy(this.v2).sub(this.v1), b.multiplyScalar(a).add(this.v1));
        return b
    };
    wa.prototype.getPointAt = function (a, b) {
        return this.getPoint(a, b)
    };
    wa.prototype.getTangent = function () {
        return this.v2.clone().sub(this.v1).normalize()
    };
    wa.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.v1.copy(a.v1);
        this.v2.copy(a.v2);
        return this
    };
    wa.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.v1 = this.v1.toArray();
        a.v2 = this.v2.toArray();
        return a
    };
    wa.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.v1.fromArray(a.v1);
        this.v2.fromArray(a.v2);
        return this
    };
    Ma.prototype = Object.create(J.prototype);
    Ma.prototype.constructor = Ma;
    Ma.prototype.isLineCurve3 = !0;
    Ma.prototype.getPoint = function (a, b) {
        b = b || new p;
        1 === a ? b.copy(this.v2) : (b.copy(this.v2).sub(this.v1), b.multiplyScalar(a).add(this.v1));
        return b
    };
    Ma.prototype.getPointAt = function (a, b) {
        return this.getPoint(a, b)
    };
    Ma.prototype.copy =
        function (a) {
            J.prototype.copy.call(this, a);
            this.v1.copy(a.v1);
            this.v2.copy(a.v2);
            return this
        };
    Ma.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.v1 = this.v1.toArray();
        a.v2 = this.v2.toArray();
        return a
    };
    Ma.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.v1.fromArray(a.v1);
        this.v2.fromArray(a.v2);
        return this
    };
    Na.prototype = Object.create(J.prototype);
    Na.prototype.constructor = Na;
    Na.prototype.isQuadraticBezierCurve = !0;
    Na.prototype.getPoint = function (a, b) {
        b = b || new A;
        var c =
            this.v0,
            d = this.v1,
            e = this.v2;
        b.set(bd(a, c.x, d.x, e.x), bd(a, c.y, d.y, e.y));
        return b
    };
    Na.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.v0.copy(a.v0);
        this.v1.copy(a.v1);
        this.v2.copy(a.v2);
        return this
    };
    Na.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.v0 = this.v0.toArray();
        a.v1 = this.v1.toArray();
        a.v2 = this.v2.toArray();
        return a
    };
    Na.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.v0.fromArray(a.v0);
        this.v1.fromArray(a.v1);
        this.v2.fromArray(a.v2);
        return this
    };
    Ua.prototype = Object.create(J.prototype);
    Ua.prototype.constructor = Ua;
    Ua.prototype.isQuadraticBezierCurve3 = !0;
    Ua.prototype.getPoint = function (a, b) {
        b = b || new p;
        var c = this.v0,
            d = this.v1,
            e = this.v2;
        b.set(bd(a, c.x, d.x, e.x), bd(a, c.y, d.y, e.y), bd(a, c.z, d.z, e.z));
        return b
    };
    Ua.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.v0.copy(a.v0);
        this.v1.copy(a.v1);
        this.v2.copy(a.v2);
        return this
    };
    Ua.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.v0 = this.v0.toArray();
        a.v1 = this.v1.toArray();
        a.v2 = this.v2.toArray();
        return a
    };
    Ua.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.v0.fromArray(a.v0);
        this.v1.fromArray(a.v1);
        this.v2.fromArray(a.v2);
        return this
    };
    Oa.prototype = Object.create(J.prototype);
    Oa.prototype.constructor = Oa;
    Oa.prototype.isSplineCurve = !0;
    Oa.prototype.getPoint = function (a, b) {
        b = b || new A;
        var c = this.points,
            d = (c.length - 1) * a;
        a = Math.floor(d);
        d -= a;
        var e = c[0 === a ? a : a - 1],
            f = c[a],
            g = c[a > c.length - 2 ? c.length - 1 : a + 1];
        c = c[a > c.length - 3 ? c.length - 1 : a + 2];
        b.set(ef(d, e.x, f.x, g.x,
            c.x), ef(d, e.y, f.y, g.y, c.y));
        return b
    };
    Oa.prototype.copy = function (a) {
        J.prototype.copy.call(this, a);
        this.points = [];
        for (var b = 0, c = a.points.length; b < c; b++) this.points.push(a.points[b].clone());
        return this
    };
    Oa.prototype.toJSON = function () {
        var a = J.prototype.toJSON.call(this);
        a.points = [];
        for (var b = 0, c = this.points.length; b < c; b++) a.points.push(this.points[b].toArray());
        return a
    };
    Oa.prototype.fromJSON = function (a) {
        J.prototype.fromJSON.call(this, a);
        this.points = [];
        for (var b = 0, c = a.points.length; b < c; b++) {
            var d = a.points[b];
            this.points.push((new A).fromArray(d))
        }
        return this
    };
    var Og = Object.freeze({
        ArcCurve: ic,
        CatmullRomCurve3: ca,
        CubicBezierCurve: La,
        CubicBezierCurve3: Ta,
        EllipseCurve: na,
        LineCurve: wa,
        LineCurve3: Ma,
        QuadraticBezierCurve: Na,
        QuadraticBezierCurve3: Ua,
        SplineCurve: Oa
    });
    $a.prototype = Object.assign(Object.create(J.prototype), {
        constructor: $a,
        add: function (a) {
            this.curves.push(a)
        },
        closePath: function () {
            var a = this.curves[0].getPoint(0),
                b = this.curves[this.curves.length - 1].getPoint(1);
            a.equals(b) || this.curves.push(new wa(b,
                a))
        },
        getPoint: function (a) {
            var b = a * this.getLength(),
                c = this.getCurveLengths();
            for (a = 0; a < c.length;) {
                if (c[a] >= b) return b = c[a] - b, a = this.curves[a], c = a.getLength(), a.getPointAt(0 === c ? 0 : 1 - b / c);
                a++
            }
            return null
        },
        getLength: function () {
            var a = this.getCurveLengths();
            return a[a.length - 1]
        },
        updateArcLengths: function () {
            this.needsUpdate = !0;
            this.cacheLengths = null;
            this.getCurveLengths()
        },
        getCurveLengths: function () {
            if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
            for (var a = [],
                    b = 0, c = 0, d = this.curves.length; c < d; c++) b += this.curves[c].getLength(), a.push(b);
            return this.cacheLengths = a
        },
        getSpacedPoints: function (a) {
            void 0 === a && (a = 40);
            for (var b = [], c = 0; c <= a; c++) b.push(this.getPoint(c / a));
            this.autoClose && b.push(b[0]);
            return b
        },
        getPoints: function (a) {
            a = a || 12;
            for (var b = [], c, d = 0, e = this.curves; d < e.length; d++) {
                var f = e[d];
                f = f.getPoints(f && f.isEllipseCurve ? 2 * a : f && f.isLineCurve ? 1 : f && f.isSplineCurve ? a * f.points.length : a);
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    c && c.equals(h) || (b.push(h), c = h)
                }
            }
            this.autoClose &&
                1 < b.length && !b[b.length - 1].equals(b[0]) && b.push(b[0]);
            return b
        },
        copy: function (a) {
            J.prototype.copy.call(this, a);
            this.curves = [];
            for (var b = 0, c = a.curves.length; b < c; b++) this.curves.push(a.curves[b].clone());
            this.autoClose = a.autoClose;
            return this
        },
        toJSON: function () {
            var a = J.prototype.toJSON.call(this);
            a.autoClose = this.autoClose;
            a.curves = [];
            for (var b = 0, c = this.curves.length; b < c; b++) a.curves.push(this.curves[b].toJSON());
            return a
        },
        fromJSON: function (a) {
            J.prototype.fromJSON.call(this, a);
            this.autoClose = a.autoClose;
            this.curves = [];
            for (var b = 0, c = a.curves.length; b < c; b++) {
                var d = a.curves[b];
                this.curves.push((new Og[d.type]).fromJSON(d))
            }
            return this
        }
    });
    Pa.prototype = Object.assign(Object.create($a.prototype), {
        constructor: Pa,
        setFromPoints: function (a) {
            this.moveTo(a[0].x, a[0].y);
            for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
        },
        moveTo: function (a, b) {
            this.currentPoint.set(a, b)
        },
        lineTo: function (a, b) {
            var c = new wa(this.currentPoint.clone(), new A(a, b));
            this.curves.push(c);
            this.currentPoint.set(a, b)
        },
        quadraticCurveTo: function (a,
            b, c, d) {
            a = new Na(this.currentPoint.clone(), new A(a, b), new A(c, d));
            this.curves.push(a);
            this.currentPoint.set(c, d)
        },
        bezierCurveTo: function (a, b, c, d, e, f) {
            a = new La(this.currentPoint.clone(), new A(a, b), new A(c, d), new A(e, f));
            this.curves.push(a);
            this.currentPoint.set(e, f)
        },
        splineThru: function (a) {
            var b = [this.currentPoint.clone()].concat(a);
            b = new Oa(b);
            this.curves.push(b);
            this.currentPoint.copy(a[a.length - 1])
        },
        arc: function (a, b, c, d, e, f) {
            this.absarc(a + this.currentPoint.x, b + this.currentPoint.y, c, d, e, f)
        },
        absarc: function (a,
            b, c, d, e, f) {
            this.absellipse(a, b, c, c, d, e, f)
        },
        ellipse: function (a, b, c, d, e, f, g, h) {
            this.absellipse(a + this.currentPoint.x, b + this.currentPoint.y, c, d, e, f, g, h)
        },
        absellipse: function (a, b, c, d, e, f, g, h) {
            a = new na(a, b, c, d, e, f, g, h);
            0 < this.curves.length && (b = a.getPoint(0), b.equals(this.currentPoint) || this.lineTo(b.x, b.y));
            this.curves.push(a);
            a = a.getPoint(1);
            this.currentPoint.copy(a)
        },
        copy: function (a) {
            $a.prototype.copy.call(this, a);
            this.currentPoint.copy(a.currentPoint);
            return this
        },
        toJSON: function () {
            var a = $a.prototype.toJSON.call(this);
            a.currentPoint = this.currentPoint.toArray();
            return a
        },
        fromJSON: function (a) {
            $a.prototype.fromJSON.call(this, a);
            this.currentPoint.fromArray(a.currentPoint);
            return this
        }
    });
    hb.prototype = Object.assign(Object.create(Pa.prototype), {
        constructor: hb,
        getPointsHoles: function (a) {
            for (var b = [], c = 0, d = this.holes.length; c < d; c++) b[c] = this.holes[c].getPoints(a);
            return b
        },
        extractPoints: function (a) {
            return {
                shape: this.getPoints(a),
                holes: this.getPointsHoles(a)
            }
        },
        copy: function (a) {
            Pa.prototype.copy.call(this, a);
            this.holes = [];
            for (var b = 0, c = a.holes.length; b < c; b++) this.holes.push(a.holes[b].clone());
            return this
        },
        toJSON: function () {
            var a = Pa.prototype.toJSON.call(this);
            a.uuid = this.uuid;
            a.holes = [];
            for (var b = 0, c = this.holes.length; b < c; b++) a.holes.push(this.holes[b].toJSON());
            return a
        },
        fromJSON: function (a) {
            Pa.prototype.fromJSON.call(this, a);
            this.uuid = a.uuid;
            this.holes = [];
            for (var b = 0, c = a.holes.length; b < c; b++) {
                var d = a.holes[b];
                this.holes.push((new Pa).fromJSON(d))
            }
            return this
        }
    });
    ea.prototype = Object.assign(Object.create(B.prototype), {
        constructor: ea,
        isLight: !0,
        copy: function (a) {
            B.prototype.copy.call(this, a);
            this.color.copy(a.color);
            this.intensity = a.intensity;
            return this
        },
        toJSON: function (a) {
            a = B.prototype.toJSON.call(this, a);
            a.object.color = this.color.getHex();
            a.object.intensity = this.intensity;
            void 0 !== this.groundColor && (a.object.groundColor = this.groundColor.getHex());
            void 0 !== this.distance && (a.object.distance = this.distance);
            void 0 !== this.angle && (a.object.angle = this.angle);
            void 0 !== this.decay && (a.object.decay = this.decay);
            void 0 !==
                this.penumbra && (a.object.penumbra = this.penumbra);
            void 0 !== this.shadow && (a.object.shadow = this.shadow.toJSON());
            return a
        }
    });
    yd.prototype = Object.assign(Object.create(ea.prototype), {
        constructor: yd,
        isHemisphereLight: !0,
        copy: function (a) {
            ea.prototype.copy.call(this, a);
            this.groundColor.copy(a.groundColor);
            return this
        }
    });
    Object.assign(Eb.prototype, {
        copy: function (a) {
            this.camera = a.camera.clone();
            this.bias = a.bias;
            this.radius = a.radius;
            this.mapSize.copy(a.mapSize);
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        toJSON: function () {
            var a = {};
            0 !== this.bias && (a.bias = this.bias);
            1 !== this.radius && (a.radius = this.radius);
            if (512 !== this.mapSize.x || 512 !== this.mapSize.y) a.mapSize = this.mapSize.toArray();
            a.camera = this.camera.toJSON(!1).object;
            delete a.camera.matrix;
            return a
        }
    });
    zd.prototype = Object.assign(Object.create(Eb.prototype), {
        constructor: zd,
        isSpotLightShadow: !0,
        update: function (a) {
            var b = this.camera,
                c = 2 * R.RAD2DEG * a.angle,
                d = this.mapSize.width / this.mapSize.height;
            a = a.distance || b.far;
            if (c !== b.fov || d !== b.aspect || a !== b.far) b.fov =
                c, b.aspect = d, b.far = a, b.updateProjectionMatrix()
        }
    });
    Ad.prototype = Object.assign(Object.create(ea.prototype), {
        constructor: Ad,
        isSpotLight: !0,
        copy: function (a) {
            ea.prototype.copy.call(this, a);
            this.distance = a.distance;
            this.angle = a.angle;
            this.penumbra = a.penumbra;
            this.decay = a.decay;
            this.target = a.target.clone();
            this.shadow = a.shadow.clone();
            return this
        }
    });
    Bd.prototype = Object.assign(Object.create(ea.prototype), {
        constructor: Bd,
        isPointLight: !0,
        copy: function (a) {
            ea.prototype.copy.call(this, a);
            this.distance = a.distance;
            this.decay = a.decay;
            this.shadow = a.shadow.clone();
            return this
        }
    });
    Cd.prototype = Object.assign(Object.create(Eb.prototype), {
        constructor: Cd
    });
    Dd.prototype = Object.assign(Object.create(ea.prototype), {
        constructor: Dd,
        isDirectionalLight: !0,
        copy: function (a) {
            ea.prototype.copy.call(this, a);
            this.target = a.target.clone();
            this.shadow = a.shadow.clone();
            return this
        }
    });
    Ed.prototype = Object.assign(Object.create(ea.prototype), {
        constructor: Ed,
        isAmbientLight: !0
    });
    Fd.prototype = Object.assign(Object.create(ea.prototype), {
        constructor: Fd,
        isRectAreaLight: !0,
        copy: function (a) {
            ea.prototype.copy.call(this, a);
            this.width = a.width;
            this.height = a.height;
            return this
        },
        toJSON: function (a) {
            a = ea.prototype.toJSON.call(this, a);
            a.object.width = this.width;
            a.object.height = this.height;
            return a
        }
    });
    Gd.prototype = Object.assign(Object.create(ka.prototype), {
        constructor: Gd,
        ValueTypeName: "string",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    });
    Hd.prototype = Object.assign(Object.create(ka.prototype), {
        constructor: Hd,
        ValueTypeName: "bool",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    });
    Object.assign(Aa.prototype, {
        evaluate: function (a) {
            var b = this.parameterPositions,
                c = this._cachedIndex,
                d = b[c],
                e = b[c - 1];
            a: {
                b: {
                    c: {
                        d: if (!(a < d)) {
                            for (var f = c + 2;;) {
                                if (void 0 === d) {
                                    if (a < e) break d;
                                    this._cachedIndex = c = b.length;
                                    return this.afterEnd_(c - 1, a, e)
                                }
                                if (c === f) break;
                                e = d;
                                d = b[++c];
                                if (a < d) break b
                            }
                            d = b.length;
                            break c
                        }if (a >= e) break a;
                        else {
                            f = b[1];
                            a < f &&
                                (c = 2, e = f);
                            for (f = c - 2;;) {
                                if (void 0 === e) return this._cachedIndex = 0, this.beforeStart_(0, a, d);
                                if (c === f) break;
                                d = e;
                                e = b[--c - 1];
                                if (a >= e) break b
                            }
                            d = c;
                            c = 0
                        }
                    }
                    for (; c < d;) e = c + d >>> 1,
                    a < b[e] ? d = e : c = e + 1;d = b[c];e = b[c - 1];
                    if (void 0 === e) return this._cachedIndex = 0,
                    this.beforeStart_(0, a, d);
                    if (void 0 === d) return this._cachedIndex = c = b.length,
                    this.afterEnd_(c - 1, e, a)
                }
                this._cachedIndex = c;this.intervalChanged_(c, e, d)
            }
            return this.interpolate_(c, e, a, d)
        },
        settings: null,
        DefaultSettings_: {},
        getSettings_: function () {
            return this.settings ||
                this.DefaultSettings_
        },
        copySampleValue_: function (a) {
            var b = this.resultBuffer,
                c = this.sampleValues,
                d = this.valueSize;
            a *= d;
            for (var e = 0; e !== d; ++e) b[e] = c[a + e];
            return b
        },
        interpolate_: function () {
            throw Error("call to abstract method");
        },
        intervalChanged_: function () {}
    });
    Object.assign(Aa.prototype, {
        beforeStart_: Aa.prototype.copySampleValue_,
        afterEnd_: Aa.prototype.copySampleValue_
    });
    Id.prototype = Object.assign(Object.create(Aa.prototype), {
        constructor: Id,
        interpolate_: function (a, b, c, d) {
            var e = this.resultBuffer,
                f = this.sampleValues,
                g = this.valueSize;
            a *= g;
            b = (c - b) / (d - b);
            for (c = a + g; a !== c; a += 4) ia.slerpFlat(e, 0, f, a - g, f, a, b);
            return e
        }
    });
    dd.prototype = Object.assign(Object.create(ka.prototype), {
        constructor: dd,
        ValueTypeName: "quaternion",
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodLinear: function (a) {
            return new Id(this.times, this.values, this.getValueSize(), a)
        },
        InterpolantFactoryMethodSmooth: void 0
    });
    Jd.prototype = Object.assign(Object.create(ka.prototype), {
        constructor: Jd,
        ValueTypeName: "color"
    });
    jc.prototype = Object.assign(Object.create(ka.prototype), {
        constructor: jc,
        ValueTypeName: "number"
    });
    Kd.prototype = Object.assign(Object.create(Aa.prototype), {
        constructor: Kd,
        DefaultSettings_: {
            endingStart: 2400,
            endingEnd: 2400
        },
        intervalChanged_: function (a, b, c) {
            var d = this.parameterPositions,
                e = a - 2,
                f = a + 1,
                g = d[e],
                h = d[f];
            if (void 0 === g) switch (this.getSettings_().endingStart) {
                case 2401:
                    e = a;
                    g = 2 * b - c;
                    break;
                case 2402:
                    e = d.length - 2;
                    g = b + d[e] - d[e + 1];
                    break;
                default:
                    e = a, g = c
            }
            if (void 0 === h) switch (this.getSettings_().endingEnd) {
                case 2401:
                    f = a;
                    h = 2 * c - b;
                    break;
                case 2402:
                    f = 1;
                    h = c + d[1] - d[0];
                    break;
                default:
                    f = a - 1, h = b
            }
            a = .5 * (c - b);
            d = this.valueSize;
            this._weightPrev = a / (b - g);
            this._weightNext = a / (h - c);
            this._offsetPrev = e * d;
            this._offsetNext = f * d
        },
        interpolate_: function (a, b, c, d) {
            var e = this.resultBuffer,
                f = this.sampleValues,
                g = this.valueSize;
            a *= g;
            var h = a - g,
                l = this._offsetPrev,
                m = this._offsetNext,
                k = this._weightPrev,
                n = this._weightNext,
                p = (c - b) / (d - b);
            c = p * p;
            d = c * p;
            b = -k * d + 2 * k * c - k * p;
            k = (1 + k) * d + (-1.5 - 2 * k) * c + (-.5 + k) * p + 1;
            p = (-1 - n) * d + (1.5 + n) * c + .5 * p;
            n = n * d - n * c;
            for (c = 0; c !== g; ++c) e[c] = b * f[l + c] + k * f[h + c] + p * f[a + c] + n * f[m + c];
            return e
        }
    });
    ed.prototype = Object.assign(Object.create(Aa.prototype), {
        constructor: ed,
        interpolate_: function (a, b, c, d) {
            var e = this.resultBuffer,
                f = this.sampleValues,
                g = this.valueSize;
            a *= g;
            var h = a - g;
            b = (c - b) / (d - b);
            c = 1 - b;
            for (d = 0; d !== g; ++d) e[d] = f[h + d] * c + f[a + d] * b;
            return e
        }
    });
    Ld.prototype = Object.assign(Object.create(Aa.prototype), {
        constructor: Ld,
        interpolate_: function (a) {
            return this.copySampleValue_(a - 1)
        }
    });
    var qa = {
        arraySlice: function (a, b, c) {
            return qa.isTypedArray(a) ? new a.constructor(a.subarray(b, void 0 !== c ? c :
                a.length)) : a.slice(b, c)
        },
        convertArray: function (a, b, c) {
            return !a || !c && a.constructor === b ? a : "number" === typeof b.BYTES_PER_ELEMENT ? new b(a) : Array.prototype.slice.call(a)
        },
        isTypedArray: function (a) {
            return ArrayBuffer.isView(a) && !(a instanceof DataView)
        },
        getKeyframeOrder: function (a) {
            for (var b = a.length, c = Array(b), d = 0; d !== b; ++d) c[d] = d;
            c.sort(function (b, c) {
                return a[b] - a[c]
            });
            return c
        },
        sortedArray: function (a, b, c) {
            for (var d = a.length, e = new a.constructor(d), f = 0, g = 0; g !== d; ++f)
                for (var h = c[f] * b, l = 0; l !== b; ++l) e[g++] =
                    a[h + l];
            return e
        },
        flattenJSON: function (a, b, c, d) {
            for (var e = 1, f = a[0]; void 0 !== f && void 0 === f[d];) f = a[e++];
            if (void 0 !== f) {
                var g = f[d];
                if (void 0 !== g)
                    if (Array.isArray(g)) {
                        do g = f[d], void 0 !== g && (b.push(f.time), c.push.apply(c, g)), f = a[e++]; while (void 0 !== f)
                    } else if (void 0 !== g.toArray) {
                    do g = f[d], void 0 !== g && (b.push(f.time), g.toArray(c, c.length)), f = a[e++]; while (void 0 !== f)
                } else {
                    do g = f[d], void 0 !== g && (b.push(f.time), c.push(g)), f = a[e++]; while (void 0 !== f)
                }
            }
        }
    };
    Object.assign(ka, {
        parse: function (a) {
            if (void 0 === a.type) throw Error("THREE.KeyframeTrack: track type undefined, can not parse");
            var b = ka._getTrackTypeForValueTypeName(a.type);
            if (void 0 === a.times) {
                var c = [],
                    d = [];
                qa.flattenJSON(a.keys, c, d, "value");
                a.times = c;
                a.values = d
            }
            return void 0 !== b.parse ? b.parse(a) : new b(a.name, a.times, a.values, a.interpolation)
        },
        toJSON: function (a) {
            var b = a.constructor;
            if (void 0 !== b.toJSON) b = b.toJSON(a);
            else {
                b = {
                    name: a.name,
                    times: qa.convertArray(a.times, Array),
                    values: qa.convertArray(a.values, Array)
                };
                var c = a.getInterpolation();
                c !== a.DefaultInterpolation && (b.interpolation = c)
            }
            b.type = a.ValueTypeName;
            return b
        },
        _getTrackTypeForValueTypeName: function (a) {
            switch (a.toLowerCase()) {
                case "scalar":
                case "double":
                case "float":
                case "number":
                case "integer":
                    return jc;
                case "vector":
                case "vector2":
                case "vector3":
                case "vector4":
                    return kc;
                case "color":
                    return Jd;
                case "quaternion":
                    return dd;
                case "bool":
                case "boolean":
                    return Hd;
                case "string":
                    return Gd
            }
            throw Error("THREE.KeyframeTrack: Unsupported typeName: " + a);
        }
    });
    Object.assign(ka.prototype, {
        constructor: ka,
        TimeBufferType: Float32Array,
        ValueBufferType: Float32Array,
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodDiscrete: function (a) {
            return new Ld(this.times, this.values, this.getValueSize(), a)
        },
        InterpolantFactoryMethodLinear: function (a) {
            return new ed(this.times,
                this.values, this.getValueSize(), a)
        },
        InterpolantFactoryMethodSmooth: function (a) {
            return new Kd(this.times, this.values, this.getValueSize(), a)
        },
        setInterpolation: function (a) {
            switch (a) {
                case 2300:
                    var b = this.InterpolantFactoryMethodDiscrete;
                    break;
                case 2301:
                    b = this.InterpolantFactoryMethodLinear;
                    break;
                case 2302:
                    b = this.InterpolantFactoryMethodSmooth
            }
            if (void 0 === b) {
                b = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                if (void 0 === this.createInterpolant)
                    if (a !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
                    else throw Error(b);
                console.warn("THREE.KeyframeTrack:", b)
            } else this.createInterpolant = b
        },
        getInterpolation: function () {
            switch (this.createInterpolant) {
                case this.InterpolantFactoryMethodDiscrete:
                    return 2300;
                case this.InterpolantFactoryMethodLinear:
                    return 2301;
                case this.InterpolantFactoryMethodSmooth:
                    return 2302
            }
        },
        getValueSize: function () {
            return this.values.length / this.times.length
        },
        shift: function (a) {
            if (0 !== a)
                for (var b = this.times, c = 0, d = b.length; c !== d; ++c) b[c] += a;
            return this
        },
        scale: function (a) {
            if (1 !== a)
                for (var b =
                        this.times, c = 0, d = b.length; c !== d; ++c) b[c] *= a;
            return this
        },
        trim: function (a, b) {
            for (var c = this.times, d = c.length, e = 0, f = d - 1; e !== d && c[e] < a;) ++e;
            for (; - 1 !== f && c[f] > b;) --f;
            ++f;
            if (0 !== e || f !== d) e >= f && (f = Math.max(f, 1), e = f - 1), a = this.getValueSize(), this.times = qa.arraySlice(c, e, f), this.values = qa.arraySlice(this.values, e * a, f * a);
            return this
        },
        validate: function () {
            var a = !0,
                b = this.getValueSize();
            0 !== b - Math.floor(b) && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), a = !1);
            var c = this.times;
            b = this.values;
            var d = c.length;
            0 === d && (console.error("THREE.KeyframeTrack: Track is empty.", this), a = !1);
            for (var e = null, f = 0; f !== d; f++) {
                var g = c[f];
                if ("number" === typeof g && isNaN(g)) {
                    console.error("THREE.KeyframeTrack: Time is not a valid number.", this, f, g);
                    a = !1;
                    break
                }
                if (null !== e && e > g) {
                    console.error("THREE.KeyframeTrack: Out of order keys.", this, f, g, e);
                    a = !1;
                    break
                }
                e = g
            }
            if (void 0 !== b && qa.isTypedArray(b))
                for (f = 0, c = b.length; f !== c; ++f)
                    if (d = b[f], isNaN(d)) {
                        console.error("THREE.KeyframeTrack: Value is not a valid number.", this,
                            f, d);
                        a = !1;
                        break
                    } return a
        },
        optimize: function () {
            for (var a = this.times, b = this.values, c = this.getValueSize(), d = 2302 === this.getInterpolation(), e = 1, f = a.length - 1, g = 1; g < f; ++g) {
                var h = !1,
                    l = a[g];
                if (l !== a[g + 1] && (1 !== g || l !== l[0]))
                    if (d) h = !0;
                    else {
                        var m = g * c,
                            k = m - c,
                            n = m + c;
                        for (l = 0; l !== c; ++l) {
                            var p = b[m + l];
                            if (p !== b[k + l] || p !== b[n + l]) {
                                h = !0;
                                break
                            }
                        }
                    } if (h) {
                    if (g !== e)
                        for (a[e] = a[g], h = g * c, m = e * c, l = 0; l !== c; ++l) b[m + l] = b[h + l];
                    ++e
                }
            }
            if (0 < f) {
                a[e] = a[f];
                h = f * c;
                m = e * c;
                for (l = 0; l !== c; ++l) b[m + l] = b[h + l];
                ++e
            }
            e !== a.length && (this.times = qa.arraySlice(a,
                0, e), this.values = qa.arraySlice(b, 0, e * c));
            return this
        }
    });
    kc.prototype = Object.assign(Object.create(ka.prototype), {
        constructor: kc,
        ValueTypeName: "vector"
    });
    Object.assign(Fa, {
        parse: function (a) {
            for (var b = [], c = a.tracks, d = 1 / (a.fps || 1), e = 0, f = c.length; e !== f; ++e) b.push(ka.parse(c[e]).scale(d));
            return new Fa(a.name, a.duration, b)
        },
        toJSON: function (a) {
            var b = [],
                c = a.tracks;
            a = {
                name: a.name,
                duration: a.duration,
                tracks: b
            };
            for (var d = 0, e = c.length; d !== e; ++d) b.push(ka.toJSON(c[d]));
            return a
        },
        CreateFromMorphTargetSequence: function (a,
            b, c, d) {
            for (var e = b.length, f = [], g = 0; g < e; g++) {
                var h = [],
                    l = [];
                h.push((g + e - 1) % e, g, (g + 1) % e);
                l.push(0, 1, 0);
                var k = qa.getKeyframeOrder(h);
                h = qa.sortedArray(h, 1, k);
                l = qa.sortedArray(l, 1, k);
                d || 0 !== h[0] || (h.push(e), l.push(l[0]));
                f.push((new jc(".morphTargetInfluences[" + b[g].name + "]", h, l)).scale(1 / c))
            }
            return new Fa(a, -1, f)
        },
        findByName: function (a, b) {
            var c = a;
            Array.isArray(a) || (c = a.geometry && a.geometry.animations || a.animations);
            for (a = 0; a < c.length; a++)
                if (c[a].name === b) return c[a];
            return null
        },
        CreateClipsFromMorphTargetSequences: function (a,
            b, c) {
            for (var d = {}, e = /^([\w-]*?)([\d]+)$/, f = 0, g = a.length; f < g; f++) {
                var h = a[f],
                    l = h.name.match(e);
                if (l && 1 < l.length) {
                    var k = l[1];
                    (l = d[k]) || (d[k] = l = []);
                    l.push(h)
                }
            }
            a = [];
            for (k in d) a.push(Fa.CreateFromMorphTargetSequence(k, d[k], b, c));
            return a
        },
        parseAnimation: function (a, b) {
            if (!a) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
            var c = function (a, b, c, d, e) {
                    if (0 !== c.length) {
                        var f = [],
                            g = [];
                        qa.flattenJSON(c, f, g, d);
                        0 !== f.length && e.push(new a(b, f, g))
                    }
                },
                d = [],
                e = a.name || "default",
                f = a.length ||
                -1,
                g = a.fps || 30;
            a = a.hierarchy || [];
            for (var h = 0; h < a.length; h++) {
                var l = a[h].keys;
                if (l && 0 !== l.length)
                    if (l[0].morphTargets) {
                        f = {};
                        for (var k = 0; k < l.length; k++)
                            if (l[k].morphTargets)
                                for (var p = 0; p < l[k].morphTargets.length; p++) f[l[k].morphTargets[p]] = -1;
                        for (var n in f) {
                            var t = [],
                                r = [];
                            for (p = 0; p !== l[k].morphTargets.length; ++p) {
                                var q = l[k];
                                t.push(q.time);
                                r.push(q.morphTarget === n ? 1 : 0)
                            }
                            d.push(new jc(".morphTargetInfluence[" + n + "]", t, r))
                        }
                        f = f.length * (g || 1)
                    } else k = ".bones[" + b[h].name + "]", c(kc, k + ".position", l, "pos", d), c(dd,
                        k + ".quaternion", l, "rot", d), c(kc, k + ".scale", l, "scl", d)
            }
            return 0 === d.length ? null : new Fa(e, f, d)
        }
    });
    Object.assign(Fa.prototype, {
        resetDuration: function () {
            for (var a = 0, b = 0, c = this.tracks.length; b !== c; ++b) {
                var d = this.tracks[b];
                a = Math.max(a, d.times[d.times.length - 1])
            }
            this.duration = a
        },
        trim: function () {
            for (var a = 0; a < this.tracks.length; a++) this.tracks[a].trim(0, this.duration);
            return this
        },
        optimize: function () {
            for (var a = 0; a < this.tracks.length; a++) this.tracks[a].optimize();
            return this
        }
    });
    Object.assign(Md.prototype, {
        load: function (a, b, c, d) {
            var e = this;
            (new Ka(e.manager)).load(a, function (a) {
                b(e.parse(JSON.parse(a)))
            }, c, d)
        },
        setTextures: function (a) {
            this.textures = a
        },
        parse: function (a) {
            function b(a) {
                void 0 === c[a] && console.warn("THREE.MaterialLoader: Undefined texture", a);
                return c[a]
            }
            var c = this.textures,
                d = new Ng[a.type];
            void 0 !== a.uuid && (d.uuid = a.uuid);
            void 0 !== a.name && (d.name = a.name);
            void 0 !== a.color && d.color.setHex(a.color);
            void 0 !== a.roughness && (d.roughness = a.roughness);
            void 0 !== a.metalness && (d.metalness = a.metalness);
            void 0 !== a.emissive && d.emissive.setHex(a.emissive);
            void 0 !== a.specular && d.specular.setHex(a.specular);
            void 0 !== a.shininess && (d.shininess = a.shininess);
            void 0 !== a.clearCoat && (d.clearCoat = a.clearCoat);
            void 0 !== a.clearCoatRoughness && (d.clearCoatRoughness = a.clearCoatRoughness);
            void 0 !== a.uniforms && (d.uniforms = a.uniforms);
            void 0 !== a.vertexShader && (d.vertexShader = a.vertexShader);
            void 0 !== a.fragmentShader && (d.fragmentShader = a.fragmentShader);
            void 0 !== a.vertexColors && (d.vertexColors = a.vertexColors);
            void 0 !==
                a.fog && (d.fog = a.fog);
            void 0 !== a.flatShading && (d.flatShading = a.flatShading);
            void 0 !== a.blending && (d.blending = a.blending);
            void 0 !== a.side && (d.side = a.side);
            void 0 !== a.opacity && (d.opacity = a.opacity);
            void 0 !== a.transparent && (d.transparent = a.transparent);
            void 0 !== a.alphaTest && (d.alphaTest = a.alphaTest);
            void 0 !== a.depthTest && (d.depthTest = a.depthTest);
            void 0 !== a.depthWrite && (d.depthWrite = a.depthWrite);
            void 0 !== a.colorWrite && (d.colorWrite = a.colorWrite);
            void 0 !== a.wireframe && (d.wireframe = a.wireframe);
            void 0 !==
                a.wireframeLinewidth && (d.wireframeLinewidth = a.wireframeLinewidth);
            void 0 !== a.wireframeLinecap && (d.wireframeLinecap = a.wireframeLinecap);
            void 0 !== a.wireframeLinejoin && (d.wireframeLinejoin = a.wireframeLinejoin);
            void 0 !== a.rotation && (d.rotation = a.rotation);
            1 !== a.linewidth && (d.linewidth = a.linewidth);
            void 0 !== a.dashSize && (d.dashSize = a.dashSize);
            void 0 !== a.gapSize && (d.gapSize = a.gapSize);
            void 0 !== a.scale && (d.scale = a.scale);
            void 0 !== a.polygonOffset && (d.polygonOffset = a.polygonOffset);
            void 0 !== a.polygonOffsetFactor &&
                (d.polygonOffsetFactor = a.polygonOffsetFactor);
            void 0 !== a.polygonOffsetUnits && (d.polygonOffsetUnits = a.polygonOffsetUnits);
            void 0 !== a.skinning && (d.skinning = a.skinning);
            void 0 !== a.morphTargets && (d.morphTargets = a.morphTargets);
            void 0 !== a.dithering && (d.dithering = a.dithering);
            void 0 !== a.visible && (d.visible = a.visible);
            void 0 !== a.userData && (d.userData = a.userData);
            void 0 !== a.shading && (d.flatShading = 1 === a.shading);
            void 0 !== a.size && (d.size = a.size);
            void 0 !== a.sizeAttenuation && (d.sizeAttenuation = a.sizeAttenuation);
            void 0 !== a.map && (d.map = b(a.map));
            void 0 !== a.alphaMap && (d.alphaMap = b(a.alphaMap), d.transparent = !0);
            void 0 !== a.bumpMap && (d.bumpMap = b(a.bumpMap));
            void 0 !== a.bumpScale && (d.bumpScale = a.bumpScale);
            void 0 !== a.normalMap && (d.normalMap = b(a.normalMap));
            if (void 0 !== a.normalScale) {
                var e = a.normalScale;
                !1 === Array.isArray(e) && (e = [e, e]);
                d.normalScale = (new A).fromArray(e)
            }
            void 0 !== a.displacementMap && (d.displacementMap = b(a.displacementMap));
            void 0 !== a.displacementScale && (d.displacementScale = a.displacementScale);
            void 0 !==
                a.displacementBias && (d.displacementBias = a.displacementBias);
            void 0 !== a.roughnessMap && (d.roughnessMap = b(a.roughnessMap));
            void 0 !== a.metalnessMap && (d.metalnessMap = b(a.metalnessMap));
            void 0 !== a.emissiveMap && (d.emissiveMap = b(a.emissiveMap));
            void 0 !== a.emissiveIntensity && (d.emissiveIntensity = a.emissiveIntensity);
            void 0 !== a.specularMap && (d.specularMap = b(a.specularMap));
            void 0 !== a.envMap && (d.envMap = b(a.envMap));
            void 0 !== a.reflectivity && (d.reflectivity = a.reflectivity);
            void 0 !== a.lightMap && (d.lightMap = b(a.lightMap));
            void 0 !== a.lightMapIntensity && (d.lightMapIntensity = a.lightMapIntensity);
            void 0 !== a.aoMap && (d.aoMap = b(a.aoMap));
            void 0 !== a.aoMapIntensity && (d.aoMapIntensity = a.aoMapIntensity);
            void 0 !== a.gradientMap && (d.gradientMap = b(a.gradientMap));
            return d
        }
    });
    Object.assign(ee.prototype, {
        load: function (a, b, c, d) {
            var e = this;
            (new Ka(e.manager)).load(a, function (a) {
                b(e.parse(JSON.parse(a)))
            }, c, d)
        },
        parse: function (a) {
            var b = new I,
                c = a.data.index;
            void 0 !== c && (c = new uf[c.type](c.array), b.setIndex(new H(c, 1)));
            var d = a.data.attributes;
            for (f in d) {
                var e = d[f];
                c = new uf[e.type](e.array);
                b.addAttribute(f, new H(c, e.itemSize, e.normalized))
            }
            var f = a.data.groups || a.data.drawcalls || a.data.offsets;
            if (void 0 !== f)
                for (c = 0, d = f.length; c !== d; ++c) e = f[c], b.addGroup(e.start, e.count, e.materialIndex);
            a = a.data.boundingSphere;
            void 0 !== a && (f = new p, void 0 !== a.center && f.fromArray(a.center), b.boundingSphere = new Ga(f, a.radius));
            return b
        }
    });
    var uf = {
        Int8Array: Int8Array,
        Uint8Array: Uint8Array,
        Uint8ClampedArray: "undefined" !== typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
        Int16Array: Int16Array,
        Uint16Array: Uint16Array,
        Int32Array: Int32Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Float64Array: Float64Array
    };
    lc.Handlers = {
        handlers: [],
        add: function (a, b) {
            this.handlers.push(a, b)
        },
        get: function (a) {
            for (var b = this.handlers, c = 0, d = b.length; c < d; c += 2) {
                var e = b[c + 1];
                if (b[c].test(a)) return e
            }
            return null
        }
    };
    Object.assign(lc.prototype, {
        crossOrigin: void 0,
        onLoadStart: function () {},
        onLoadProgress: function () {},
        onLoadComplete: function () {},
        initMaterials: function (a, b, c) {
            for (var d = [], e = 0; e < a.length; ++e) d[e] = this.createMaterial(a[e], b, c);
            return d
        },
        createMaterial: function () {
            var a = {
                    NoBlending: 0,
                    NormalBlending: 1,
                    AdditiveBlending: 2,
                    SubtractiveBlending: 3,
                    MultiplyBlending: 4,
                    CustomBlending: 5
                },
                b = new L,
                c = new xd,
                d = new Md;
            return function (e, f, g) {
                function h(a, b, d, e, h) {
                    a = f + a;
                    var k = lc.Handlers.get(a);
                    null !== k ? a = k.load(a) : (c.setCrossOrigin(g), a = c.load(a));
                    void 0 !== b && (a.repeat.fromArray(b), 1 !== b[0] && (a.wrapS = 1E3), 1 !== b[1] && (a.wrapT = 1E3));
                    void 0 !== d && a.offset.fromArray(d);
                    void 0 !== e && ("repeat" ===
                        e[0] && (a.wrapS = 1E3), "mirror" === e[0] && (a.wrapS = 1002), "repeat" === e[1] && (a.wrapT = 1E3), "mirror" === e[1] && (a.wrapT = 1002));
                    void 0 !== h && (a.anisotropy = h);
                    b = R.generateUUID();
                    l[b] = a;
                    return b
                }
                var l = {},
                    k = {
                        uuid: R.generateUUID(),
                        type: "MeshLambertMaterial"
                    },
                    p;
                for (p in e) {
                    var n = e[p];
                    switch (p) {
                        case "DbgColor":
                        case "DbgIndex":
                        case "opticalDensity":
                        case "illumination":
                            break;
                        case "DbgName":
                            k.name = n;
                            break;
                        case "blending":
                            k.blending = a[n];
                            break;
                        case "colorAmbient":
                        case "mapAmbient":
                            console.warn("THREE.Loader.createMaterial:",
                                p, "is no longer supported.");
                            break;
                        case "colorDiffuse":
                            k.color = b.fromArray(n).getHex();
                            break;
                        case "colorSpecular":
                            k.specular = b.fromArray(n).getHex();
                            break;
                        case "colorEmissive":
                            k.emissive = b.fromArray(n).getHex();
                            break;
                        case "specularCoef":
                            k.shininess = n;
                            break;
                        case "shading":
                            "basic" === n.toLowerCase() && (k.type = "MeshBasicMaterial");
                            "phong" === n.toLowerCase() && (k.type = "MeshPhongMaterial");
                            "standard" === n.toLowerCase() && (k.type = "MeshStandardMaterial");
                            break;
                        case "mapDiffuse":
                            k.map = h(n, e.mapDiffuseRepeat, e.mapDiffuseOffset,
                                e.mapDiffuseWrap, e.mapDiffuseAnisotropy);
                            break;
                        case "mapDiffuseRepeat":
                        case "mapDiffuseOffset":
                        case "mapDiffuseWrap":
                        case "mapDiffuseAnisotropy":
                            break;
                        case "mapEmissive":
                            k.emissiveMap = h(n, e.mapEmissiveRepeat, e.mapEmissiveOffset, e.mapEmissiveWrap, e.mapEmissiveAnisotropy);
                            break;
                        case "mapEmissiveRepeat":
                        case "mapEmissiveOffset":
                        case "mapEmissiveWrap":
                        case "mapEmissiveAnisotropy":
                            break;
                        case "mapLight":
                            k.lightMap = h(n, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy);
                            break;
                        case "mapLightRepeat":
                        case "mapLightOffset":
                        case "mapLightWrap":
                        case "mapLightAnisotropy":
                            break;
                        case "mapAO":
                            k.aoMap = h(n, e.mapAORepeat, e.mapAOOffset, e.mapAOWrap, e.mapAOAnisotropy);
                            break;
                        case "mapAORepeat":
                        case "mapAOOffset":
                        case "mapAOWrap":
                        case "mapAOAnisotropy":
                            break;
                        case "mapBump":
                            k.bumpMap = h(n, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy);
                            break;
                        case "mapBumpScale":
                            k.bumpScale = n;
                            break;
                        case "mapBumpRepeat":
                        case "mapBumpOffset":
                        case "mapBumpWrap":
                        case "mapBumpAnisotropy":
                            break;
                        case "mapNormal":
                            k.normalMap = h(n, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy);
                            break;
                        case "mapNormalFactor":
                            k.normalScale = n;
                            break;
                        case "mapNormalRepeat":
                        case "mapNormalOffset":
                        case "mapNormalWrap":
                        case "mapNormalAnisotropy":
                            break;
                        case "mapSpecular":
                            k.specularMap = h(n, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy);
                            break;
                        case "mapSpecularRepeat":
                        case "mapSpecularOffset":
                        case "mapSpecularWrap":
                        case "mapSpecularAnisotropy":
                            break;
                        case "mapMetalness":
                            k.metalnessMap = h(n, e.mapMetalnessRepeat, e.mapMetalnessOffset, e.mapMetalnessWrap, e.mapMetalnessAnisotropy);
                            break;
                        case "mapMetalnessRepeat":
                        case "mapMetalnessOffset":
                        case "mapMetalnessWrap":
                        case "mapMetalnessAnisotropy":
                            break;
                        case "mapRoughness":
                            k.roughnessMap = h(n, e.mapRoughnessRepeat, e.mapRoughnessOffset, e.mapRoughnessWrap, e.mapRoughnessAnisotropy);
                            break;
                        case "mapRoughnessRepeat":
                        case "mapRoughnessOffset":
                        case "mapRoughnessWrap":
                        case "mapRoughnessAnisotropy":
                            break;
                        case "mapAlpha":
                            k.alphaMap = h(n, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy);
                            break;
                        case "mapAlphaRepeat":
                        case "mapAlphaOffset":
                        case "mapAlphaWrap":
                        case "mapAlphaAnisotropy":
                            break;
                        case "flipSided":
                            k.side = 1;
                            break;
                        case "doubleSided":
                            k.side = 2;
                            break;
                        case "transparency":
                            console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity");
                            k.opacity = n;
                            break;
                        case "depthTest":
                        case "depthWrite":
                        case "colorWrite":
                        case "opacity":
                        case "reflectivity":
                        case "transparent":
                        case "visible":
                        case "wireframe":
                            k[p] = n;
                            break;
                        case "vertexColors":
                            !0 === n && (k.vertexColors = 2);
                            "face" === n && (k.vertexColors = 1);
                            break;
                        default:
                            console.error("THREE.Loader.createMaterial: Unsupported", p, n)
                    }
                }
                "MeshBasicMaterial" ===
                k.type && delete k.emissive;
                "MeshPhongMaterial" !== k.type && delete k.specular;
                1 > k.opacity && (k.transparent = !0);
                d.setTextures(l);
                return d.parse(k)
            }
        }()
    });
    var Be = {
        decodeText: function (a) {
            if ("undefined" !== typeof TextDecoder) return (new TextDecoder).decode(a);
            for (var b = "", c = 0, d = a.length; c < d; c++) b += String.fromCharCode(a[c]);
            return decodeURIComponent(escape(b))
        },
        extractUrlBase: function (a) {
            var b = a.lastIndexOf("/");
            return -1 === b ? "./" : a.substr(0, b + 1)
        }
    };
    Object.assign(fe.prototype, {
        load: function (a, b, c, d) {
            var e = this,
                f = this.texturePath && "string" === typeof this.texturePath ? this.texturePath : Be.extractUrlBase(a),
                g = new Ka(this.manager);
            g.setWithCredentials(this.withCredentials);
            g.load(a, function (c) {
                c = JSON.parse(c);
                var d = c.metadata;
                if (void 0 !== d && (d = d.type, void 0 !== d && "object" === d.toLowerCase())) {
                    console.error("THREE.JSONLoader: " + a + " should be loaded with THREE.ObjectLoader instead.");
                    return
                }
                c = e.parse(c, f);
                b(c.geometry, c.materials)
            }, c, d)
        },
        setTexturePath: function (a) {
            this.texturePath = a
        },
        parse: function () {
            return function (a,
                b) {
                void 0 !== a.data && (a = a.data);
                a.scale = void 0 !== a.scale ? 1 / a.scale : 1;
                var c = new M,
                    d = a,
                    e, f, g, h = d.faces;
                var l = d.vertices;
                var k = d.normals,
                    w = d.colors;
                var n = d.scale;
                var t = 0;
                if (void 0 !== d.uvs) {
                    for (e = 0; e < d.uvs.length; e++) d.uvs[e].length && t++;
                    for (e = 0; e < t; e++) c.faceVertexUvs[e] = []
                }
                var r = 0;
                for (g = l.length; r < g;) e = new p, e.x = l[r++] * n, e.y = l[r++] * n, e.z = l[r++] * n, c.vertices.push(e);
                r = 0;
                for (g = h.length; r < g;) {
                    l = h[r++];
                    var q = l & 1;
                    var u = l & 2;
                    e = l & 8;
                    var x = l & 16;
                    var y = l & 32;
                    n = l & 64;
                    l &= 128;
                    if (q) {
                        q = new Wa;
                        q.a = h[r];
                        q.b = h[r + 1];
                        q.c = h[r +
                            3];
                        var v = new Wa;
                        v.a = h[r + 1];
                        v.b = h[r + 2];
                        v.c = h[r + 3];
                        r += 4;
                        u && (u = h[r++], q.materialIndex = u, v.materialIndex = u);
                        u = c.faces.length;
                        if (e)
                            for (e = 0; e < t; e++) {
                                var C = d.uvs[e];
                                c.faceVertexUvs[e][u] = [];
                                c.faceVertexUvs[e][u + 1] = [];
                                for (f = 0; 4 > f; f++) {
                                    var z = h[r++];
                                    var B = C[2 * z];
                                    z = C[2 * z + 1];
                                    B = new A(B, z);
                                    2 !== f && c.faceVertexUvs[e][u].push(B);
                                    0 !== f && c.faceVertexUvs[e][u + 1].push(B)
                                }
                            }
                        x && (x = 3 * h[r++], q.normal.set(k[x++], k[x++], k[x]), v.normal.copy(q.normal));
                        if (y)
                            for (e = 0; 4 > e; e++) x = 3 * h[r++], y = new p(k[x++], k[x++], k[x]), 2 !== e && q.vertexNormals.push(y),
                                0 !== e && v.vertexNormals.push(y);
                        n && (n = h[r++], n = w[n], q.color.setHex(n), v.color.setHex(n));
                        if (l)
                            for (e = 0; 4 > e; e++) n = h[r++], n = w[n], 2 !== e && q.vertexColors.push(new L(n)), 0 !== e && v.vertexColors.push(new L(n));
                        c.faces.push(q);
                        c.faces.push(v)
                    } else {
                        q = new Wa;
                        q.a = h[r++];
                        q.b = h[r++];
                        q.c = h[r++];
                        u && (u = h[r++], q.materialIndex = u);
                        u = c.faces.length;
                        if (e)
                            for (e = 0; e < t; e++)
                                for (C = d.uvs[e], c.faceVertexUvs[e][u] = [], f = 0; 3 > f; f++) z = h[r++], B = C[2 * z], z = C[2 * z + 1], B = new A(B, z), c.faceVertexUvs[e][u].push(B);
                        x && (x = 3 * h[r++], q.normal.set(k[x++],
                            k[x++], k[x]));
                        if (y)
                            for (e = 0; 3 > e; e++) x = 3 * h[r++], y = new p(k[x++], k[x++], k[x]), q.vertexNormals.push(y);
                        n && (n = h[r++], q.color.setHex(w[n]));
                        if (l)
                            for (e = 0; 3 > e; e++) n = h[r++], q.vertexColors.push(new L(w[n]));
                        c.faces.push(q)
                    }
                }
                d = a;
                r = void 0 !== d.influencesPerVertex ? d.influencesPerVertex : 2;
                if (d.skinWeights)
                    for (g = 0, h = d.skinWeights.length; g < h; g += r) c.skinWeights.push(new da(d.skinWeights[g], 1 < r ? d.skinWeights[g + 1] : 0, 2 < r ? d.skinWeights[g + 2] : 0, 3 < r ? d.skinWeights[g + 3] : 0));
                if (d.skinIndices)
                    for (g = 0, h = d.skinIndices.length; g <
                        h; g += r) c.skinIndices.push(new da(d.skinIndices[g], 1 < r ? d.skinIndices[g + 1] : 0, 2 < r ? d.skinIndices[g + 2] : 0, 3 < r ? d.skinIndices[g + 3] : 0));
                c.bones = d.bones;
                c.bones && 0 < c.bones.length && (c.skinWeights.length !== c.skinIndices.length || c.skinIndices.length !== c.vertices.length) && console.warn("When skinning, number of vertices (" + c.vertices.length + "), skinIndices (" + c.skinIndices.length + "), and skinWeights (" + c.skinWeights.length + ") should match.");
                g = a;
                h = g.scale;
                if (void 0 !== g.morphTargets)
                    for (d = 0, r = g.morphTargets.length; d <
                        r; d++)
                        for (c.morphTargets[d] = {}, c.morphTargets[d].name = g.morphTargets[d].name, c.morphTargets[d].vertices = [], k = c.morphTargets[d].vertices, w = g.morphTargets[d].vertices, t = 0, l = w.length; t < l; t += 3) n = new p, n.x = w[t] * h, n.y = w[t + 1] * h, n.z = w[t + 2] * h, k.push(n);
                if (void 0 !== g.morphColors && 0 < g.morphColors.length)
                    for (console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.'), h = c.faces, g = g.morphColors[0].colors, d = 0, r = h.length; d < r; d++) h[d].color.fromArray(g, 3 * d);
                g = a;
                d = [];
                r = [];
                void 0 !==
                    g.animation && r.push(g.animation);
                void 0 !== g.animations && (g.animations.length ? r = r.concat(g.animations) : r.push(g.animations));
                for (g = 0; g < r.length; g++)(h = Fa.parseAnimation(r[g], c.bones)) && d.push(h);
                c.morphTargets && (r = Fa.CreateClipsFromMorphTargetSequences(c.morphTargets, 10), d = d.concat(r));
                0 < d.length && (c.animations = d);
                c.computeFaceNormals();
                c.computeBoundingSphere();
                if (void 0 === a.materials || 0 === a.materials.length) return {
                    geometry: c
                };
                a = lc.prototype.initMaterials(a.materials, b, this.crossOrigin);
                return {
                    geometry: c,
                    materials: a
                }
            }
        }()
    });
    Object.assign(ff.prototype, {
        load: function (a, b, c, d) {
            "" === this.texturePath && (this.texturePath = a.substring(0, a.lastIndexOf("/") + 1));
            var e = this;
            (new Ka(e.manager)).load(a, function (c) {
                    var f = null;
                    try {
                        f = JSON.parse(c)
                    } catch (h) {
                        void 0 !== d && d(h);
                        console.error("THREE:ObjectLoader: Can't parse " + a + ".", h.message);
                        return
                    }
                    c = f.metadata;
                    void 0 === c || void 0 === c.type || "geometry" === c.type.toLowerCase() ? console.error("THREE.ObjectLoader: Can't load " + a + ". Use THREE.JSONLoader instead.") : e.parse(f, b)
                },
                c, d)
        },
        setTexturePath: function (a) {
            this.texturePath = a
        },
        setCrossOrigin: function (a) {
            this.crossOrigin = a
        },
        parse: function (a, b) {
            var c = this.parseShape(a.shapes);
            c = this.parseGeometries(a.geometries, c);
            var d = this.parseImages(a.images, function () {
                void 0 !== b && b(e)
            });
            d = this.parseTextures(a.textures, d);
            d = this.parseMaterials(a.materials, d);
            var e = this.parseObject(a.object, c, d);
            a.animations && (e.animations = this.parseAnimations(a.animations));
            void 0 !== a.images && 0 !== a.images.length || void 0 === b || b(e);
            return e
        },
        parseShape: function (a) {
            var b = {};
            if (void 0 !== a)
                for (var c = 0, d = a.length; c < d; c++) {
                    var e = (new hb).fromJSON(a[c]);
                    b[e.uuid] = e
                }
            return b
        },
        parseGeometries: function (a, b) {
            var c = {};
            if (void 0 !== a)
                for (var d = new fe, e = new ee, f = 0, g = a.length; f < g; f++) {
                    var h = a[f];
                    switch (h.type) {
                        case "PlaneGeometry":
                        case "PlaneBufferGeometry":
                            var l = new ua[h.type](h.width, h.height, h.widthSegments, h.heightSegments);
                            break;
                        case "BoxGeometry":
                        case "BoxBufferGeometry":
                        case "CubeGeometry":
                            l = new ua[h.type](h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                            break;
                        case "CircleGeometry":
                        case "CircleBufferGeometry":
                            l = new ua[h.type](h.radius, h.segments, h.thetaStart, h.thetaLength);
                            break;
                        case "CylinderGeometry":
                        case "CylinderBufferGeometry":
                            l = new ua[h.type](h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
                            break;
                        case "ConeGeometry":
                        case "ConeBufferGeometry":
                            l = new ua[h.type](h.radius, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
                            break;
                        case "SphereGeometry":
                        case "SphereBufferGeometry":
                            l =
                                new ua[h.type](h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                            break;
                        case "DodecahedronGeometry":
                        case "DodecahedronBufferGeometry":
                        case "IcosahedronGeometry":
                        case "IcosahedronBufferGeometry":
                        case "OctahedronGeometry":
                        case "OctahedronBufferGeometry":
                        case "TetrahedronGeometry":
                        case "TetrahedronBufferGeometry":
                            l = new ua[h.type](h.radius, h.detail);
                            break;
                        case "RingGeometry":
                        case "RingBufferGeometry":
                            l = new ua[h.type](h.innerRadius, h.outerRadius, h.thetaSegments,
                                h.phiSegments, h.thetaStart, h.thetaLength);
                            break;
                        case "TorusGeometry":
                        case "TorusBufferGeometry":
                            l = new ua[h.type](h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                            break;
                        case "TorusKnotGeometry":
                        case "TorusKnotBufferGeometry":
                            l = new ua[h.type](h.radius, h.tube, h.tubularSegments, h.radialSegments, h.p, h.q);
                            break;
                        case "LatheGeometry":
                        case "LatheBufferGeometry":
                            l = new ua[h.type](h.points, h.segments, h.phiStart, h.phiLength);
                            break;
                        case "PolyhedronGeometry":
                        case "PolyhedronBufferGeometry":
                            l = new ua[h.type](h.vertices,
                                h.indices, h.radius, h.details);
                            break;
                        case "ShapeGeometry":
                        case "ShapeBufferGeometry":
                            l = [];
                            for (var k = 0, p = h.shapes.length; k < p; k++) l.push(b[h.shapes[k]]);
                            l = new ua[h.type](l, h.curveSegments);
                            break;
                        case "BufferGeometry":
                            l = e.parse(h);
                            break;
                        case "Geometry":
                            l = d.parse(h, this.texturePath).geometry;
                            break;
                        default:
                            console.warn('THREE.ObjectLoader: Unsupported geometry type "' + h.type + '"');
                            continue
                    }
                    l.uuid = h.uuid;
                    void 0 !== h.name && (l.name = h.name);
                    c[h.uuid] = l
                }
            return c
        },
        parseMaterials: function (a, b) {
            var c = {};
            if (void 0 !==
                a) {
                var d = new Md;
                d.setTextures(b);
                b = 0;
                for (var e = a.length; b < e; b++) {
                    var f = a[b];
                    if ("MultiMaterial" === f.type) {
                        for (var g = [], h = 0; h < f.materials.length; h++) g.push(d.parse(f.materials[h]));
                        c[f.uuid] = g
                    } else c[f.uuid] = d.parse(f)
                }
            }
            return c
        },
        parseAnimations: function (a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = Fa.parse(a[c]);
                b.push(d)
            }
            return b
        },
        parseImages: function (a, b) {
            function c(a) {
                d.manager.itemStart(a);
                return f.load(a, function () {
                    d.manager.itemEnd(a)
                }, void 0, function () {
                    d.manager.itemEnd(a);
                    d.manager.itemError(a)
                })
            }
            var d = this,
                e = {};
            if (void 0 !== a && 0 < a.length) {
                b = new ae(b);
                var f = new ad(b);
                f.setCrossOrigin(this.crossOrigin);
                b = 0;
                for (var g = a.length; b < g; b++) {
                    var h = a[b],
                        l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(h.url) ? h.url : d.texturePath + h.url;
                    e[h.uuid] = c(l)
                }
            }
            return e
        },
        parseTextures: function (a, b) {
            function c(a, b) {
                if ("number" === typeof a) return a;
                console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", a);
                return b[a]
            }
            var d = {};
            if (void 0 !== a)
                for (var e = 0, f = a.length; e < f; e++) {
                    var g = a[e];
                    void 0 === g.image &&
                        console.warn('THREE.ObjectLoader: No "image" specified for', g.uuid);
                    void 0 === b[g.image] && console.warn("THREE.ObjectLoader: Undefined image", g.image);
                    var h = new X(b[g.image]);
                    h.needsUpdate = !0;
                    h.uuid = g.uuid;
                    void 0 !== g.name && (h.name = g.name);
                    void 0 !== g.mapping && (h.mapping = c(g.mapping, Pg));
                    void 0 !== g.offset && h.offset.fromArray(g.offset);
                    void 0 !== g.repeat && h.repeat.fromArray(g.repeat);
                    void 0 !== g.center && h.center.fromArray(g.center);
                    void 0 !== g.rotation && (h.rotation = g.rotation);
                    void 0 !== g.wrap && (h.wrapS = c(g.wrap[0],
                        vf), h.wrapT = c(g.wrap[1], vf));
                    void 0 !== g.format && (h.format = g.format);
                    void 0 !== g.minFilter && (h.minFilter = c(g.minFilter, wf));
                    void 0 !== g.magFilter && (h.magFilter = c(g.magFilter, wf));
                    void 0 !== g.anisotropy && (h.anisotropy = g.anisotropy);
                    void 0 !== g.flipY && (h.flipY = g.flipY);
                    d[g.uuid] = h
                }
            return d
        },
        parseObject: function (a, b, c) {
            function d(a) {
                void 0 === b[a] && console.warn("THREE.ObjectLoader: Undefined geometry", a);
                return b[a]
            }

            function e(a) {
                if (void 0 !== a) {
                    if (Array.isArray(a)) {
                        for (var b = [], d = 0, e = a.length; d < e; d++) {
                            var f =
                                a[d];
                            void 0 === c[f] && console.warn("THREE.ObjectLoader: Undefined material", f);
                            b.push(c[f])
                        }
                        return b
                    }
                    void 0 === c[a] && console.warn("THREE.ObjectLoader: Undefined material", a);
                    return c[a]
                }
            }
            switch (a.type) {
                case "Scene":
                    var f = new rd;
                    void 0 !== a.background && Number.isInteger(a.background) && (f.background = new L(a.background));
                    void 0 !== a.fog && ("Fog" === a.fog.type ? f.fog = new Rb(a.fog.color, a.fog.near, a.fog.far) : "FogExp2" === a.fog.type && (f.fog = new Qb(a.fog.color, a.fog.density)));
                    break;
                case "PerspectiveCamera":
                    f = new Y(a.fov,
                        a.aspect, a.near, a.far);
                    void 0 !== a.focus && (f.focus = a.focus);
                    void 0 !== a.zoom && (f.zoom = a.zoom);
                    void 0 !== a.filmGauge && (f.filmGauge = a.filmGauge);
                    void 0 !== a.filmOffset && (f.filmOffset = a.filmOffset);
                    void 0 !== a.view && (f.view = Object.assign({}, a.view));
                    break;
                case "OrthographicCamera":
                    f = new Jb(a.left, a.right, a.top, a.bottom, a.near, a.far);
                    void 0 !== a.zoom && (f.zoom = a.zoom);
                    void 0 !== a.view && (f.view = Object.assign({}, a.view));
                    break;
                case "AmbientLight":
                    f = new Ed(a.color, a.intensity);
                    break;
                case "DirectionalLight":
                    f = new Dd(a.color,
                        a.intensity);
                    break;
                case "PointLight":
                    f = new Bd(a.color, a.intensity, a.distance, a.decay);
                    break;
                case "RectAreaLight":
                    f = new Fd(a.color, a.intensity, a.width, a.height);
                    break;
                case "SpotLight":
                    f = new Ad(a.color, a.intensity, a.distance, a.angle, a.penumbra, a.decay);
                    break;
                case "HemisphereLight":
                    f = new yd(a.color, a.groundColor, a.intensity);
                    break;
                case "SkinnedMesh":
                    console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");
                case "Mesh":
                    f = d(a.geometry);
                    var g = e(a.material);
                    f = f.bones && 0 < f.bones.length ?
                        new td(f, g) : new ta(f, g);
                    break;
                case "LOD":
                    f = new Ec;
                    break;
                case "Line":
                    f = new pa(d(a.geometry), e(a.material), a.mode);
                    break;
                case "LineLoop":
                    f = new ud(d(a.geometry), e(a.material));
                    break;
                case "LineSegments":
                    f = new V(d(a.geometry), e(a.material));
                    break;
                case "PointCloud":
                case "Points":
                    f = new Sb(d(a.geometry), e(a.material));
                    break;
                case "Sprite":
                    f = new Dc(e(a.material));
                    break;
                case "Group":
                    f = new vd;
                    break;
                default:
                    f = new B
            }
            f.uuid = a.uuid;
            void 0 !== a.name && (f.name = a.name);
            void 0 !== a.matrix ? (f.matrix.fromArray(a.matrix),
                f.matrix.decompose(f.position, f.quaternion, f.scale)) : (void 0 !== a.position && f.position.fromArray(a.position), void 0 !== a.rotation && f.rotation.fromArray(a.rotation), void 0 !== a.quaternion && f.quaternion.fromArray(a.quaternion), void 0 !== a.scale && f.scale.fromArray(a.scale));
            void 0 !== a.castShadow && (f.castShadow = a.castShadow);
            void 0 !== a.receiveShadow && (f.receiveShadow = a.receiveShadow);
            a.shadow && (void 0 !== a.shadow.bias && (f.shadow.bias = a.shadow.bias), void 0 !== a.shadow.radius && (f.shadow.radius = a.shadow.radius),
                void 0 !== a.shadow.mapSize && f.shadow.mapSize.fromArray(a.shadow.mapSize), void 0 !== a.shadow.camera && (f.shadow.camera = this.parseObject(a.shadow.camera)));
            void 0 !== a.visible && (f.visible = a.visible);
            void 0 !== a.frustumCulled && (f.frustumCulled = a.frustumCulled);
            void 0 !== a.renderOrder && (f.renderOrder = a.renderOrder);
            void 0 !== a.userData && (f.userData = a.userData);
            if (void 0 !== a.children) {
                g = a.children;
                for (var h = 0; h < g.length; h++) f.add(this.parseObject(g[h], b, c))
            }
            if ("LOD" === a.type)
                for (a = a.levels, g = 0; g < a.length; g++) {
                    h =
                        a[g];
                    var l = f.getObjectByProperty("uuid", h.object);
                    void 0 !== l && f.addLevel(l, h.distance)
                }
            return f
        }
    });
    var Pg = {
            UVMapping: 300,
            CubeReflectionMapping: 301,
            CubeRefractionMapping: 302,
            EquirectangularReflectionMapping: 303,
            EquirectangularRefractionMapping: 304,
            SphericalReflectionMapping: 305,
            CubeUVReflectionMapping: 306,
            CubeUVRefractionMapping: 307
        },
        vf = {
            RepeatWrapping: 1E3,
            ClampToEdgeWrapping: 1001,
            MirroredRepeatWrapping: 1002
        },
        wf = {
            NearestFilter: 1003,
            NearestMipMapNearestFilter: 1004,
            NearestMipMapLinearFilter: 1005,
            LinearFilter: 1006,
            LinearMipMapNearestFilter: 1007,
            LinearMipMapLinearFilter: 1008
        };
    ge.prototype = {
        constructor: ge,
        setOptions: function (a) {
            this.options = a;
            return this
        },
        load: function (a, b, c, d) {
            void 0 === a && (a = "");
            void 0 !== this.path && (a = this.path + a);
            var e = this,
                f = Hb.get(a);
            if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
                b && b(f);
                e.manager.itemEnd(a)
            }, 0), f;
            fetch(a).then(function (a) {
                return a.blob()
            }).then(function (a) {
                return createImageBitmap(a, e.options)
            }).then(function (c) {
                Hb.add(a, c);
                b && b(c);
                e.manager.itemEnd(a)
            }).catch(function (b) {
                d &&
                    d(b);
                e.manager.itemEnd(a);
                e.manager.itemError(a)
            })
        },
        setCrossOrigin: function () {
            return this
        },
        setPath: function (a) {
            this.path = a;
            return this
        }
    };
    Object.assign(he.prototype, {
        moveTo: function (a, b) {
            this.currentPath = new Pa;
            this.subPaths.push(this.currentPath);
            this.currentPath.moveTo(a, b)
        },
        lineTo: function (a, b) {
            this.currentPath.lineTo(a, b)
        },
        quadraticCurveTo: function (a, b, c, d) {
            this.currentPath.quadraticCurveTo(a, b, c, d)
        },
        bezierCurveTo: function (a, b, c, d, e, f) {
            this.currentPath.bezierCurveTo(a, b, c, d, e, f)
        },
        splineThru: function (a) {
            this.currentPath.splineThru(a)
        },
        toShapes: function (a, b) {
            function c(a) {
                for (var b = [], c = 0, d = a.length; c < d; c++) {
                    var e = a[c],
                        f = new hb;
                    f.curves = e.curves;
                    b.push(f)
                }
                return b
            }

            function d(a, b) {
                for (var c = b.length, d = !1, e = c - 1, f = 0; f < c; e = f++) {
                    var g = b[e],
                        h = b[f],
                        l = h.x - g.x,
                        k = h.y - g.y;
                    if (Math.abs(k) > Number.EPSILON) {
                        if (0 > k && (g = b[f], l = -l, h = b[e], k = -k), !(a.y < g.y || a.y > h.y))
                            if (a.y === g.y) {
                                if (a.x === g.x) return !0
                            } else {
                                e = k * (a.x - g.x) - l * (a.y - g.y);
                                if (0 === e) return !0;
                                0 > e || (d = !d)
                            }
                    } else if (a.y === g.y && (h.x <= a.x && a.x <= g.x || g.x <= a.x && a.x <= h.x)) return !0
                }
                return d
            }
            var e = Ya.isClockWise,
                f = this.subPaths;
            if (0 === f.length) return [];
            if (!0 === b) return c(f);
            b = [];
            if (1 === f.length) {
                var g = f[0];
                var h = new hb;
                h.curves = g.curves;
                b.push(h);
                return b
            }
            var l = !e(f[0].getPoints());
            l = a ? !l : l;
            h = [];
            var k = [],
                p = [],
                n = 0;
            k[n] = void 0;
            p[n] = [];
            for (var t = 0, r = f.length; t < r; t++) {
                g = f[t];
                var q = g.getPoints();
                var u = e(q);
                (u = a ? !u : u) ? (!l && k[n] && n++, k[n] = {
                    s: new hb,
                    p: q
                }, k[n].s.curves = g.curves, l && n++, p[n] = []) : p[n].push({
                    h: g,
                    p: q[0]
                })
            }
            if (!k[0]) return c(f);
            if (1 < k.length) {
                t = !1;
                a = [];
                e = 0;
                for (f = k.length; e < f; e++) h[e] = [];
                e = 0;
                for (f = k.length; e <
                    f; e++)
                    for (g = p[e], u = 0; u < g.length; u++) {
                        l = g[u];
                        n = !0;
                        for (q = 0; q < k.length; q++) d(l.p, k[q].p) && (e !== q && a.push({
                            froms: e,
                            tos: q,
                            hole: u
                        }), n ? (n = !1, h[q].push(l)) : t = !0);
                        n && h[e].push(l)
                    }
                0 < a.length && (t || (p = h))
            }
            t = 0;
            for (e = k.length; t < e; t++)
                for (h = k[t].s, b.push(h), a = p[t], f = 0, g = a.length; f < g; f++) h.holes.push(a[f].h);
            return b
        }
    });
    Object.assign(ie.prototype, {
        isFont: !0,
        generateShapes: function (a, b, c) {
            void 0 === b && (b = 100);
            c = [];
            var d = b;
            b = this.data;
            var e = String(a).split("");
            d /= b.resolution;
            var f = (b.boundingBox.yMax - b.boundingBox.yMin +
                b.underlineThickness) * d;
            a = [];
            for (var g = 0, h = 0, l = 0; l < e.length; l++) {
                var k = e[l];
                if ("\n" === k) g = 0, h -= f;
                else {
                    var p = d;
                    var n = g,
                        t = h;
                    if (k = b.glyphs[k] || b.glyphs["?"]) {
                        var r = new he;
                        if (k.o)
                            for (var q = k._cachedOutline || (k._cachedOutline = k.o.split(" ")), u = 0, x = q.length; u < x;) switch (q[u++]) {
                                case "m":
                                    var y = q[u++] * p + n;
                                    var v = q[u++] * p + t;
                                    r.moveTo(y, v);
                                    break;
                                case "l":
                                    y = q[u++] * p + n;
                                    v = q[u++] * p + t;
                                    r.lineTo(y, v);
                                    break;
                                case "q":
                                    var z = q[u++] * p + n;
                                    var A = q[u++] * p + t;
                                    var B = q[u++] * p + n;
                                    var D = q[u++] * p + t;
                                    r.quadraticCurveTo(B, D, z, A);
                                    break;
                                case "b":
                                    z = q[u++] * p + n, A = q[u++] * p + t, B = q[u++] * p + n, D = q[u++] * p + t, y = q[u++] * p + n, v = q[u++] * p + t, r.bezierCurveTo(B, D, y, v, z, A)
                            }
                        p = {
                            offsetX: k.ha * p,
                            path: r
                        }
                    } else p = void 0;
                    g += p.offsetX;
                    a.push(p.path)
                }
            }
            b = 0;
            for (e = a.length; b < e; b++) Array.prototype.push.apply(c, a[b].toShapes());
            return c
        }
    });
    Object.assign(gf.prototype, {
        load: function (a, b, c, d) {
            var e = this,
                f = new Ka(this.manager);
            f.setPath(this.path);
            f.load(a, function (a) {
                try {
                    var c = JSON.parse(a)
                } catch (l) {
                    console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),
                        c = JSON.parse(a.substring(65, a.length - 2))
                }
                a = e.parse(c);
                b && b(a)
            }, c, d)
        },
        parse: function (a) {
            return new ie(a)
        },
        setPath: function (a) {
            this.path = a;
            return this
        }
    });
    var Rd, le = {
        getContext: function () {
            void 0 === Rd && (Rd = new(window.AudioContext || window.webkitAudioContext));
            return Rd
        },
        setContext: function (a) {
            Rd = a
        }
    };
    Object.assign(je.prototype, {
        load: function (a, b, c, d) {
            var e = new Ka(this.manager);
            e.setResponseType("arraybuffer");
            e.load(a, function (a) {
                le.getContext().decodeAudioData(a, function (a) {
                    b(a)
                })
            }, c, d)
        }
    });
    Object.assign(hf.prototype, {
        update: function () {
            var a, b, c, d, e, f, g, h, l = new K,
                k = new K;
            return function (m) {
                if (a !== this || b !== m.focus || c !== m.fov || d !== m.aspect * this.aspect || e !== m.near || f !== m.far || g !== m.zoom || h !== this.eyeSep) {
                    a = this;
                    b = m.focus;
                    c = m.fov;
                    d = m.aspect * this.aspect;
                    e = m.near;
                    f = m.far;
                    g = m.zoom;
                    var n = m.projectionMatrix.clone();
                    h = this.eyeSep / 2;
                    var p = h * e / b,
                        r = e * Math.tan(R.DEG2RAD * c * .5) / g;
                    k.elements[12] = -h;
                    l.elements[12] = h;
                    var q = -r * d + p;
                    var w = r * d + p;
                    n.elements[0] = 2 * e / (w - q);
                    n.elements[8] = (w + q) / (w - q);
                    this.cameraL.projectionMatrix.copy(n);
                    q = -r * d - p;
                    w = r * d - p;
                    n.elements[0] = 2 * e / (w - q);
                    n.elements[8] = (w + q) / (w - q);
                    this.cameraR.projectionMatrix.copy(n)
                }
                this.cameraL.matrixWorld.copy(m.matrixWorld).multiply(k);
                this.cameraR.matrixWorld.copy(m.matrixWorld).multiply(l)
            }
        }()
    });
    fd.prototype = Object.create(B.prototype);
    fd.prototype.constructor = fd;
    ke.prototype = Object.assign(Object.create(B.prototype), {
        constructor: ke,
        getInput: function () {
            return this.gain
        },
        removeFilter: function () {
            null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination),
                this.gain.connect(this.context.destination), this.filter = null)
        },
        getFilter: function () {
            return this.filter
        },
        setFilter: function (a) {
            null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination);
            this.filter = a;
            this.gain.connect(this.filter);
            this.filter.connect(this.context.destination)
        },
        getMasterVolume: function () {
            return this.gain.gain.value
        },
        setMasterVolume: function (a) {
            this.gain.gain.setTargetAtTime(a, this.context.currentTime,
                .01)
        },
        updateMatrixWorld: function () {
            var a = new p,
                b = new ia,
                c = new p,
                d = new p;
            return function (e) {
                B.prototype.updateMatrixWorld.call(this, e);
                e = this.context.listener;
                var f = this.up;
                this.matrixWorld.decompose(a, b, c);
                d.set(0, 0, -1).applyQuaternion(b);
                e.positionX ? (e.positionX.setValueAtTime(a.x, this.context.currentTime), e.positionY.setValueAtTime(a.y, this.context.currentTime), e.positionZ.setValueAtTime(a.z, this.context.currentTime), e.forwardX.setValueAtTime(d.x, this.context.currentTime), e.forwardY.setValueAtTime(d.y,
                    this.context.currentTime), e.forwardZ.setValueAtTime(d.z, this.context.currentTime), e.upX.setValueAtTime(f.x, this.context.currentTime), e.upY.setValueAtTime(f.y, this.context.currentTime), e.upZ.setValueAtTime(f.z, this.context.currentTime)) : (e.setPosition(a.x, a.y, a.z), e.setOrientation(d.x, d.y, d.z, f.x, f.y, f.z))
            }
        }()
    });
    mc.prototype = Object.assign(Object.create(B.prototype), {
        constructor: mc,
        getOutput: function () {
            return this.gain
        },
        setNodeSource: function (a) {
            this.hasPlaybackControl = !1;
            this.sourceType = "audioNode";
            this.source = a;
            this.connect();
            return this
        },
        setBuffer: function (a) {
            this.buffer = a;
            this.sourceType = "buffer";
            this.autoplay && this.play();
            return this
        },
        play: function () {
            if (!0 === this.isPlaying) console.warn("THREE.Audio: Audio is already playing.");
            else if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else {
                var a = this.context.createBufferSource();
                a.buffer = this.buffer;
                a.loop = this.loop;
                a.onended = this.onEnded.bind(this);
                a.playbackRate.setValueAtTime(this.playbackRate,
                    this.startTime);
                this.startTime = this.context.currentTime;
                a.start(this.startTime, this.offset);
                this.isPlaying = !0;
                this.source = a;
                return this.connect()
            }
        },
        pause: function () {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return !0 === this.isPlaying && (this.source.stop(), this.offset += (this.context.currentTime - this.startTime) * this.playbackRate, this.isPlaying = !1), this
        },
        stop: function () {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return this.source.stop(), this.offset = 0, this.isPlaying = !1, this
        },
        connect: function () {
            if (0 < this.filters.length) {
                this.source.connect(this.filters[0]);
                for (var a = 1, b = this.filters.length; a < b; a++) this.filters[a - 1].connect(this.filters[a]);
                this.filters[this.filters.length - 1].connect(this.getOutput())
            } else this.source.connect(this.getOutput());
            return this
        },
        disconnect: function () {
            if (0 < this.filters.length) {
                this.source.disconnect(this.filters[0]);
                for (var a = 1, b = this.filters.length; a < b; a++) this.filters[a - 1].disconnect(this.filters[a]);
                this.filters[this.filters.length - 1].disconnect(this.getOutput())
            } else this.source.disconnect(this.getOutput());
            return this
        },
        getFilters: function () {
            return this.filters
        },
        setFilters: function (a) {
            a || (a = []);
            !0 === this.isPlaying ? (this.disconnect(), this.filters = a, this.connect()) : this.filters = a;
            return this
        },
        getFilter: function () {
            return this.getFilters()[0]
        },
        setFilter: function (a) {
            return this.setFilters(a ? [a] : [])
        },
        setPlaybackRate: function (a) {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return this.playbackRate = a, !0 === this.isPlaying && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), this
        },
        getPlaybackRate: function () {
            return this.playbackRate
        },
        onEnded: function () {
            this.isPlaying = !1
        },
        getLoop: function () {
            return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
        },
        setLoop: function (a) {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return this.loop =
                a, !0 === this.isPlaying && (this.source.loop = this.loop), this
        },
        getVolume: function () {
            return this.gain.gain.value
        },
        setVolume: function (a) {
            this.gain.gain.setTargetAtTime(a, this.context.currentTime, .01);
            return this
        }
    });
    me.prototype = Object.assign(Object.create(mc.prototype), {
        constructor: me,
        getOutput: function () {
            return this.panner
        },
        getRefDistance: function () {
            return this.panner.refDistance
        },
        setRefDistance: function (a) {
            this.panner.refDistance = a
        },
        getRolloffFactor: function () {
            return this.panner.rolloffFactor
        },
        setRolloffFactor: function (a) {
            this.panner.rolloffFactor =
                a
        },
        getDistanceModel: function () {
            return this.panner.distanceModel
        },
        setDistanceModel: function (a) {
            this.panner.distanceModel = a
        },
        getMaxDistance: function () {
            return this.panner.maxDistance
        },
        setMaxDistance: function (a) {
            this.panner.maxDistance = a
        },
        updateMatrixWorld: function () {
            var a = new p;
            return function (b) {
                B.prototype.updateMatrixWorld.call(this, b);
                a.setFromMatrixPosition(this.matrixWorld);
                this.panner.setPosition(a.x, a.y, a.z)
            }
        }()
    });
    Object.assign(ne.prototype, {
        getFrequencyData: function () {
            this.analyser.getByteFrequencyData(this.data);
            return this.data
        },
        getAverageFrequency: function () {
            for (var a = 0, b = this.getFrequencyData(), c = 0; c < b.length; c++) a += b[c];
            return a / b.length
        }
    });
    Object.assign(oe.prototype, {
        accumulate: function (a, b) {
            var c = this.buffer,
                d = this.valueSize;
            a = a * d + d;
            var e = this.cumulativeWeight;
            if (0 === e) {
                for (e = 0; e !== d; ++e) c[a + e] = c[e];
                e = b
            } else e += b, this._mixBufferRegion(c, a, 0, b / e, d);
            this.cumulativeWeight = e
        },
        apply: function (a) {
            var b = this.valueSize,
                c = this.buffer;
            a = a * b + b;
            var d = this.cumulativeWeight,
                e = this.binding;
            this.cumulativeWeight = 0;
            1 > d && this._mixBufferRegion(c, a, 3 * b, 1 - d, b);
            d = b;
            for (var f = b + b; d !== f; ++d)
                if (c[d] !== c[d + b]) {
                    e.setValue(c, a);
                    break
                }
        },
        saveOriginalState: function () {
            var a = this.buffer,
                b = this.valueSize,
                c = 3 * b;
            this.binding.getValue(a, c);
            for (var d = b; d !== c; ++d) a[d] = a[c + d % b];
            this.cumulativeWeight = 0
        },
        restoreOriginalState: function () {
            this.binding.setValue(this.buffer, 3 * this.valueSize)
        },
        _select: function (a, b, c, d, e) {
            if (.5 <= d)
                for (d = 0; d !== e; ++d) a[b + d] = a[c + d]
        },
        _slerp: function (a, b, c, d) {
            ia.slerpFlat(a, b, a, b, a, c, d)
        },
        _lerp: function (a, b, c, d,
            e) {
            for (var f = 1 - d, g = 0; g !== e; ++g) {
                var h = b + g;
                a[h] = a[h] * f + a[c + g] * d
            }
        }
    });
    Object.assign(jf.prototype, {
        getValue: function (a, b) {
            this.bind();
            var c = this._bindings[this._targetGroup.nCachedObjects_];
            void 0 !== c && c.getValue(a, b)
        },
        setValue: function (a, b) {
            for (var c = this._bindings, d = this._targetGroup.nCachedObjects_, e = c.length; d !== e; ++d) c[d].setValue(a, b)
        },
        bind: function () {
            for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, c = a.length; b !== c; ++b) a[b].bind()
        },
        unbind: function () {
            for (var a = this._bindings, b = this._targetGroup.nCachedObjects_,
                    c = a.length; b !== c; ++b) a[b].unbind()
        }
    });
    Object.assign(ra, {
        Composite: jf,
        create: function (a, b, c) {
            return a && a.isAnimationObjectGroup ? new ra.Composite(a, b, c) : new ra(a, b, c)
        },
        sanitizeNodeName: function () {
            var a = /[\[\]\.:\/]/g;
            return function (b) {
                return b.replace(/\s/g, "_").replace(a, "")
            }
        }(),
        parseTrackName: function () {
            var a = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]",
                b = /((?:WC+[\/:])*)/.source.replace("WC", "[^\\[\\]\\.:\\/]");
            a = /(WCOD+)?/.source.replace("WCOD", a);
            var c = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",
                    "[^\\[\\]\\.:\\/]"),
                d = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
                e = new RegExp("^" + b + a + c + d + "$"),
                f = ["material", "materials", "bones"];
            return function (a) {
                var b = e.exec(a);
                if (!b) throw Error("PropertyBinding: Cannot parse trackName: " + a);
                b = {
                    nodeName: b[2],
                    objectName: b[3],
                    objectIndex: b[4],
                    propertyName: b[5],
                    propertyIndex: b[6]
                };
                var c = b.nodeName && b.nodeName.lastIndexOf(".");
                if (void 0 !== c && -1 !== c) {
                    var d = b.nodeName.substring(c + 1); - 1 !== f.indexOf(d) && (b.nodeName = b.nodeName.substring(0, c), b.objectName =
                        d)
                }
                if (null === b.propertyName || 0 === b.propertyName.length) throw Error("PropertyBinding: can not parse propertyName from trackName: " + a);
                return b
            }
        }(),
        findNode: function (a, b) {
            if (!b || "" === b || "root" === b || "." === b || -1 === b || b === a.name || b === a.uuid) return a;
            if (a.skeleton) {
                var c = a.skeleton.getBoneByName(b);
                if (void 0 !== c) return c
            }
            if (a.children) {
                var d = function (a) {
                    for (var c = 0; c < a.length; c++) {
                        var e = a[c];
                        if (e.name === b || e.uuid === b || (e = d(e.children))) return e
                    }
                    return null
                };
                if (a = d(a.children)) return a
            }
            return null
        }
    });
    Object.assign(ra.prototype, {
        _getValue_unavailable: function () {},
        _setValue_unavailable: function () {},
        BindingType: {
            Direct: 0,
            EntireArray: 1,
            ArrayElement: 2,
            HasFromToArray: 3
        },
        Versioning: {
            None: 0,
            NeedsUpdate: 1,
            MatrixWorldNeedsUpdate: 2
        },
        GetterByBindingType: [function (a, b) {
            a[b] = this.node[this.propertyName]
        }, function (a, b) {
            for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) a[b++] = c[d]
        }, function (a, b) {
            a[b] = this.resolvedProperty[this.propertyIndex]
        }, function (a, b) {
            this.resolvedProperty.toArray(a, b)
        }],
        SetterByBindingTypeAndVersioning: [
            [function (a,
                b) {
                this.targetObject[this.propertyName] = a[b]
            }, function (a, b) {
                this.targetObject[this.propertyName] = a[b];
                this.targetObject.needsUpdate = !0
            }, function (a, b) {
                this.targetObject[this.propertyName] = a[b];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }],
            [function (a, b) {
                for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) c[d] = a[b++]
            }, function (a, b) {
                for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) c[d] = a[b++];
                this.targetObject.needsUpdate = !0
            }, function (a, b) {
                for (var c = this.resolvedProperty, d = 0, e = c.length; d !==
                    e; ++d) c[d] = a[b++];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }],
            [function (a, b) {
                this.resolvedProperty[this.propertyIndex] = a[b]
            }, function (a, b) {
                this.resolvedProperty[this.propertyIndex] = a[b];
                this.targetObject.needsUpdate = !0
            }, function (a, b) {
                this.resolvedProperty[this.propertyIndex] = a[b];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }],
            [function (a, b) {
                this.resolvedProperty.fromArray(a, b)
            }, function (a, b) {
                this.resolvedProperty.fromArray(a, b);
                this.targetObject.needsUpdate = !0
            }, function (a, b) {
                this.resolvedProperty.fromArray(a,
                    b);
                this.targetObject.matrixWorldNeedsUpdate = !0
            }]
        ],
        getValue: function (a, b) {
            this.bind();
            this.getValue(a, b)
        },
        setValue: function (a, b) {
            this.bind();
            this.setValue(a, b)
        },
        bind: function () {
            var a = this.node,
                b = this.parsedPath,
                c = b.objectName,
                d = b.propertyName,
                e = b.propertyIndex;
            a || (this.node = a = ra.findNode(this.rootNode, b.nodeName) || this.rootNode);
            this.getValue = this._getValue_unavailable;
            this.setValue = this._setValue_unavailable;
            if (a) {
                if (c) {
                    var f = b.objectIndex;
                    switch (c) {
                        case "materials":
                            if (!a.material) {
                                console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                                    this);
                                return
                            }
                            if (!a.material.materials) {
                                console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                                return
                            }
                            a = a.material.materials;
                            break;
                        case "bones":
                            if (!a.skeleton) {
                                console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                                return
                            }
                            a = a.skeleton.bones;
                            for (c = 0; c < a.length; c++)
                                if (a[c].name === f) {
                                    f = c;
                                    break
                                } break;
                        default:
                            if (void 0 === a[c]) {
                                console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",
                                    this);
                                return
                            }
                            a = a[c]
                    }
                    if (void 0 !== f) {
                        if (void 0 === a[f]) {
                            console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, a);
                            return
                        }
                        a = a[f]
                    }
                }
                f = a[d];
                if (void 0 === f) console.error("THREE.PropertyBinding: Trying to update property for track: " + b.nodeName + "." + d + " but it wasn't found.", a);
                else {
                    b = this.Versioning.None;
                    void 0 !== a.needsUpdate ? (b = this.Versioning.NeedsUpdate, this.targetObject = a) : void 0 !== a.matrixWorldNeedsUpdate && (b = this.Versioning.MatrixWorldNeedsUpdate, this.targetObject =
                        a);
                    c = this.BindingType.Direct;
                    if (void 0 !== e) {
                        if ("morphTargetInfluences" === d) {
                            if (!a.geometry) {
                                console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                                return
                            }
                            if (a.geometry.isBufferGeometry) {
                                if (!a.geometry.morphAttributes) {
                                    console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                                    return
                                }
                                for (c = 0; c < this.node.geometry.morphAttributes.position.length; c++)
                                    if (a.geometry.morphAttributes.position[c].name ===
                                        e) {
                                        e = c;
                                        break
                                    }
                            } else {
                                if (!a.geometry.morphTargets) {
                                    console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.", this);
                                    return
                                }
                                for (c = 0; c < this.node.geometry.morphTargets.length; c++)
                                    if (a.geometry.morphTargets[c].name === e) {
                                        e = c;
                                        break
                                    }
                            }
                        }
                        c = this.BindingType.ArrayElement;
                        this.resolvedProperty = f;
                        this.propertyIndex = e
                    } else void 0 !== f.fromArray && void 0 !== f.toArray ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = f) : Array.isArray(f) ? (c = this.BindingType.EntireArray,
                        this.resolvedProperty = f) : this.propertyName = d;
                    this.getValue = this.GetterByBindingType[c];
                    this.setValue = this.SetterByBindingTypeAndVersioning[c][b]
                }
            } else console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.")
        },
        unbind: function () {
            this.node = null;
            this.getValue = this._getValue_unbound;
            this.setValue = this._setValue_unbound
        }
    });
    Object.assign(ra.prototype, {
        _getValue_unbound: ra.prototype.getValue,
        _setValue_unbound: ra.prototype.setValue
    });
    Object.assign(kf.prototype, {
        isAnimationObjectGroup: !0,
        add: function () {
            for (var a = this._objects, b = a.length, c = this.nCachedObjects_, d = this._indicesByUUID, e = this._paths, f = this._parsedPaths, g = this._bindings, h = g.length, l = void 0, k = 0, p = arguments.length; k !== p; ++k) {
                var n = arguments[k],
                    t = n.uuid,
                    r = d[t];
                if (void 0 === r) {
                    r = b++;
                    d[t] = r;
                    a.push(n);
                    t = 0;
                    for (var q = h; t !== q; ++t) g[t].push(new ra(n, e[t], f[t]))
                } else if (r < c) {
                    l = a[r];
                    var u = --c;
                    q = a[u];
                    d[q.uuid] = r;
                    a[r] = q;
                    d[t] = u;
                    a[u] = n;
                    t = 0;
                    for (q = h; t !== q; ++t) {
                        var x = g[t],
                            y = x[r];
                        x[r] = x[u];
                        void 0 === y && (y = new ra(n,
                            e[t], f[t]));
                        x[u] = y
                    }
                } else a[r] !== l && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")
            }
            this.nCachedObjects_ = c
        },
        remove: function () {
            for (var a = this._objects, b = this.nCachedObjects_, c = this._indicesByUUID, d = this._bindings, e = d.length, f = 0, g = arguments.length; f !== g; ++f) {
                var h = arguments[f],
                    l = h.uuid,
                    k = c[l];
                if (void 0 !== k && k >= b) {
                    var p = b++,
                        n = a[p];
                    c[n.uuid] = k;
                    a[k] = n;
                    c[l] = p;
                    a[p] = h;
                    h = 0;
                    for (l = e; h !== l; ++h) {
                        n =
                            d[h];
                        var t = n[k];
                        n[k] = n[p];
                        n[p] = t
                    }
                }
            }
            this.nCachedObjects_ = b
        },
        uncache: function () {
            for (var a = this._objects, b = a.length, c = this.nCachedObjects_, d = this._indicesByUUID, e = this._bindings, f = e.length, g = 0, h = arguments.length; g !== h; ++g) {
                var l = arguments[g].uuid,
                    k = d[l];
                if (void 0 !== k)
                    if (delete d[l], k < c) {
                        l = --c;
                        var p = a[l],
                            n = --b,
                            t = a[n];
                        d[p.uuid] = k;
                        a[k] = p;
                        d[t.uuid] = l;
                        a[l] = t;
                        a.pop();
                        p = 0;
                        for (t = f; p !== t; ++p) {
                            var r = e[p],
                                q = r[n];
                            r[k] = r[l];
                            r[l] = q;
                            r.pop()
                        }
                    } else
                        for (n = --b, t = a[n], d[t.uuid] = k, a[k] = t, a.pop(), p = 0, t = f; p !== t; ++p) r = e[p],
                            r[k] = r[n], r.pop()
            }
            this.nCachedObjects_ = c
        },
        subscribe_: function (a, b) {
            var c = this._bindingsIndicesByPath,
                d = c[a],
                e = this._bindings;
            if (void 0 !== d) return e[d];
            var f = this._paths,
                g = this._parsedPaths,
                h = this._objects,
                k = this.nCachedObjects_,
                m = Array(h.length);
            d = e.length;
            c[a] = d;
            f.push(a);
            g.push(b);
            e.push(m);
            c = k;
            for (d = h.length; c !== d; ++c) m[c] = new ra(h[c], a, b);
            return m
        },
        unsubscribe_: function (a) {
            var b = this._bindingsIndicesByPath,
                c = b[a];
            if (void 0 !== c) {
                var d = this._paths,
                    e = this._parsedPaths,
                    f = this._bindings,
                    g = f.length -
                    1,
                    h = f[g];
                b[a[g]] = c;
                f[c] = h;
                f.pop();
                e[c] = e[g];
                e.pop();
                d[c] = d[g];
                d.pop()
            }
        }
    });
    Object.assign(lf.prototype, {
        play: function () {
            this._mixer._activateAction(this);
            return this
        },
        stop: function () {
            this._mixer._deactivateAction(this);
            return this.reset()
        },
        reset: function () {
            this.paused = !1;
            this.enabled = !0;
            this.time = 0;
            this._loopCount = -1;
            this._startTime = null;
            return this.stopFading().stopWarping()
        },
        isRunning: function () {
            return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
        },
        isScheduled: function () {
            return this._mixer._isActiveAction(this)
        },
        startAt: function (a) {
            this._startTime = a;
            return this
        },
        setLoop: function (a, b) {
            this.loop = a;
            this.repetitions = b;
            return this
        },
        setEffectiveWeight: function (a) {
            this.weight = a;
            this._effectiveWeight = this.enabled ? a : 0;
            return this.stopFading()
        },
        getEffectiveWeight: function () {
            return this._effectiveWeight
        },
        fadeIn: function (a) {
            return this._scheduleFading(a, 0, 1)
        },
        fadeOut: function (a) {
            return this._scheduleFading(a, 1, 0)
        },
        crossFadeFrom: function (a, b, c) {
            a.fadeOut(b);
            this.fadeIn(b);
            if (c) {
                c = this._clip.duration;
                var d = a._clip.duration,
                    e = c / d;
                a.warp(1, d / c, b);
                this.warp(e, 1, b)
            }
            return this
        },
        crossFadeTo: function (a, b, c) {
            return a.crossFadeFrom(this, b, c)
        },
        stopFading: function () {
            var a = this._weightInterpolant;
            null !== a && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(a));
            return this
        },
        setEffectiveTimeScale: function (a) {
            this.timeScale = a;
            this._effectiveTimeScale = this.paused ? 0 : a;
            return this.stopWarping()
        },
        getEffectiveTimeScale: function () {
            return this._effectiveTimeScale
        },
        setDuration: function (a) {
            this.timeScale = this._clip.duration / a;
            return this.stopWarping()
        },
        syncWith: function (a) {
            this.time = a.time;
            this.timeScale = a.timeScale;
            return this.stopWarping()
        },
        halt: function (a) {
            return this.warp(this._effectiveTimeScale, 0, a)
        },
        warp: function (a, b, c) {
            var d = this._mixer,
                e = d.time,
                f = this._timeScaleInterpolant,
                g = this.timeScale;
            null === f && (this._timeScaleInterpolant = f = d._lendControlInterpolant());
            d = f.parameterPositions;
            f = f.sampleValues;
            d[0] = e;
            d[1] = e + c;
            f[0] = a / g;
            f[1] = b / g;
            return this
        },
        stopWarping: function () {
            var a =
                this._timeScaleInterpolant;
            null !== a && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(a));
            return this
        },
        getMixer: function () {
            return this._mixer
        },
        getClip: function () {
            return this._clip
        },
        getRoot: function () {
            return this._localRoot || this._mixer._root
        },
        _update: function (a, b, c, d) {
            if (this.enabled) {
                var e = this._startTime;
                if (null !== e) {
                    b = (a - e) * c;
                    if (0 > b || 0 === c) return;
                    this._startTime = null;
                    b *= c
                }
                b *= this._updateTimeScale(a);
                c = this._updateTime(b);
                a = this._updateWeight(a);
                if (0 < a) {
                    b = this._interpolants;
                    e = this._propertyBindings;
                    for (var f = 0, g = b.length; f !== g; ++f) b[f].evaluate(c), e[f].accumulate(d, a)
                }
            } else this._updateWeight(a)
        },
        _updateWeight: function (a) {
            var b = 0;
            if (this.enabled) {
                b = this.weight;
                var c = this._weightInterpolant;
                if (null !== c) {
                    var d = c.evaluate(a)[0];
                    b *= d;
                    a > c.parameterPositions[1] && (this.stopFading(), 0 === d && (this.enabled = !1))
                }
            }
            return this._effectiveWeight = b
        },
        _updateTimeScale: function (a) {
            var b = 0;
            if (!this.paused) {
                b = this.timeScale;
                var c = this._timeScaleInterpolant;
                if (null !== c) {
                    var d = c.evaluate(a)[0];
                    b *= d;
                    a > c.parameterPositions[1] && (this.stopWarping(), 0 === b ? this.paused = !0 : this.timeScale = b)
                }
            }
            return this._effectiveTimeScale = b
        },
        _updateTime: function (a) {
            var b = this.time + a;
            if (0 === a) return b;
            var c = this._clip.duration,
                d = this.loop,
                e = this._loopCount;
            if (2200 === d) a: {
                if (-1 === e && (this._loopCount = 0, this._setEndings(!0, !0, !1)), b >= c) b = c;
                else if (0 > b) b = 0;
                else break a;this.clampWhenFinished ? this.paused = !0 : this.enabled = !1;this._mixer.dispatchEvent({
                    type: "finished",
                    action: this,
                    direction: 0 > a ? -1 : 1
                })
            }
            else {
                d = 2202 === d; - 1 ===
                    e && (0 <= a ? (e = 0, this._setEndings(!0, 0 === this.repetitions, d)) : this._setEndings(0 === this.repetitions, !0, d));
                if (b >= c || 0 > b) {
                    var f = Math.floor(b / c);
                    b -= c * f;
                    e += Math.abs(f);
                    var g = this.repetitions - e;
                    0 >= g ? (this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, b = 0 < a ? c : 0, this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: 0 < a ? 1 : -1
                    })) : (1 === g ? (a = 0 > a, this._setEndings(a, !a, d)) : this._setEndings(!1, !1, d), this._loopCount = e, this._mixer.dispatchEvent({
                        type: "loop",
                        action: this,
                        loopDelta: f
                    }))
                }
                if (d && 1 === (e & 1)) return this.time =
                    b, c - b
            }
            return this.time = b
        },
        _setEndings: function (a, b, c) {
            var d = this._interpolantSettings;
            c ? (d.endingStart = 2401, d.endingEnd = 2401) : (d.endingStart = a ? this.zeroSlopeAtStart ? 2401 : 2400 : 2402, d.endingEnd = b ? this.zeroSlopeAtEnd ? 2401 : 2400 : 2402)
        },
        _scheduleFading: function (a, b, c) {
            var d = this._mixer,
                e = d.time,
                f = this._weightInterpolant;
            null === f && (this._weightInterpolant = f = d._lendControlInterpolant());
            d = f.parameterPositions;
            f = f.sampleValues;
            d[0] = e;
            f[0] = b;
            d[1] = e + a;
            f[1] = c;
            return this
        }
    });
    pe.prototype = Object.assign(Object.create(xa.prototype), {
        constructor: pe,
        _bindAction: function (a, b) {
            var c = a._localRoot || this._root,
                d = a._clip.tracks,
                e = d.length,
                f = a._propertyBindings;
            a = a._interpolants;
            var g = c.uuid,
                h = this._bindingsByRootAndName,
                k = h[g];
            void 0 === k && (k = {}, h[g] = k);
            for (h = 0; h !== e; ++h) {
                var m = d[h],
                    p = m.name,
                    n = k[p];
                if (void 0 === n) {
                    n = f[h];
                    if (void 0 !== n) {
                        null === n._cacheIndex && (++n.referenceCount, this._addInactiveBinding(n, g, p));
                        continue
                    }
                    n = new oe(ra.create(c, p, b && b._propertyBindings[h].binding.parsedPath), m.ValueTypeName, m.getValueSize());
                    ++n.referenceCount;
                    this._addInactiveBinding(n, g, p)
                }
                f[h] = n;
                a[h].resultBuffer = n.buffer
            }
        },
        _activateAction: function (a) {
            if (!this._isActiveAction(a)) {
                if (null === a._cacheIndex) {
                    var b = (a._localRoot || this._root).uuid,
                        c = a._clip.uuid,
                        d = this._actionsByClip[c];
                    this._bindAction(a, d && d.knownActions[0]);
                    this._addInactiveAction(a, c, b)
                }
                b = a._propertyBindings;
                c = 0;
                for (d = b.length; c !== d; ++c) {
                    var e = b[c];
                    0 === e.useCount++ && (this._lendBinding(e), e.saveOriginalState())
                }
                this._lendAction(a)
            }
        },
        _deactivateAction: function (a) {
            if (this._isActiveAction(a)) {
                for (var b =
                        a._propertyBindings, c = 0, d = b.length; c !== d; ++c) {
                    var e = b[c];
                    0 === --e.useCount && (e.restoreOriginalState(), this._takeBackBinding(e))
                }
                this._takeBackAction(a)
            }
        },
        _initMemoryManager: function () {
            this._actions = [];
            this._nActiveActions = 0;
            this._actionsByClip = {};
            this._bindings = [];
            this._nActiveBindings = 0;
            this._bindingsByRootAndName = {};
            this._controlInterpolants = [];
            this._nActiveControlInterpolants = 0;
            var a = this;
            this.stats = {
                actions: {
                    get total() {
                        return a._actions.length
                    },
                    get inUse() {
                        return a._nActiveActions
                    }
                },
                bindings: {
                    get total() {
                        return a._bindings.length
                    },
                    get inUse() {
                        return a._nActiveBindings
                    }
                },
                controlInterpolants: {
                    get total() {
                        return a._controlInterpolants.length
                    },
                    get inUse() {
                        return a._nActiveControlInterpolants
                    }
                }
            }
        },
        _isActiveAction: function (a) {
            a = a._cacheIndex;
            return null !== a && a < this._nActiveActions
        },
        _addInactiveAction: function (a, b, c) {
            var d = this._actions,
                e = this._actionsByClip,
                f = e[b];
            void 0 === f ? (f = {
                knownActions: [a],
                actionByRoot: {}
            }, a._byClipCacheIndex = 0, e[b] = f) : (b = f.knownActions, a._byClipCacheIndex = b.length, b.push(a));
            a._cacheIndex = d.length;
            d.push(a);
            f.actionByRoot[c] = a
        },
        _removeInactiveAction: function (a) {
            var b = this._actions,
                c = b[b.length - 1],
                d = a._cacheIndex;
            c._cacheIndex = d;
            b[d] = c;
            b.pop();
            a._cacheIndex = null;
            b = a._clip.uuid;
            c = this._actionsByClip;
            d = c[b];
            var e = d.knownActions,
                f = e[e.length - 1],
                g = a._byClipCacheIndex;
            f._byClipCacheIndex = g;
            e[g] = f;
            e.pop();
            a._byClipCacheIndex = null;
            delete d.actionByRoot[(a._localRoot || this._root).uuid];
            0 === e.length && delete c[b];
            this._removeInactiveBindingsForAction(a)
        },
        _removeInactiveBindingsForAction: function (a) {
            a = a._propertyBindings;
            for (var b = 0, c = a.length; b !== c; ++b) {
                var d = a[b];
                0 === --d.referenceCount && this._removeInactiveBinding(d)
            }
        },
        _lendAction: function (a) {
            var b = this._actions,
                c = a._cacheIndex,
                d = this._nActiveActions++,
                e = b[d];
            a._cacheIndex = d;
            b[d] = a;
            e._cacheIndex = c;
            b[c] = e
        },
        _takeBackAction: function (a) {
            var b = this._actions,
                c = a._cacheIndex,
                d = --this._nActiveActions,
                e = b[d];
            a._cacheIndex = d;
            b[d] = a;
            e._cacheIndex = c;
            b[c] = e
        },
        _addInactiveBinding: function (a, b, c) {
            var d = this._bindingsByRootAndName,
                e = d[b],
                f = this._bindings;
            void 0 === e && (e = {}, d[b] =
                e);
            e[c] = a;
            a._cacheIndex = f.length;
            f.push(a)
        },
        _removeInactiveBinding: function (a) {
            var b = this._bindings,
                c = a.binding,
                d = c.rootNode.uuid;
            c = c.path;
            var e = this._bindingsByRootAndName,
                f = e[d],
                g = b[b.length - 1];
            a = a._cacheIndex;
            g._cacheIndex = a;
            b[a] = g;
            b.pop();
            delete f[c];
            a: {
                for (var h in f) break a;delete e[d]
            }
        },
        _lendBinding: function (a) {
            var b = this._bindings,
                c = a._cacheIndex,
                d = this._nActiveBindings++,
                e = b[d];
            a._cacheIndex = d;
            b[d] = a;
            e._cacheIndex = c;
            b[c] = e
        },
        _takeBackBinding: function (a) {
            var b = this._bindings,
                c = a._cacheIndex,
                d = --this._nActiveBindings,
                e = b[d];
            a._cacheIndex = d;
            b[d] = a;
            e._cacheIndex = c;
            b[c] = e
        },
        _lendControlInterpolant: function () {
            var a = this._controlInterpolants,
                b = this._nActiveControlInterpolants++,
                c = a[b];
            void 0 === c && (c = new ed(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), c.__cacheIndex = b, a[b] = c);
            return c
        },
        _takeBackControlInterpolant: function (a) {
            var b = this._controlInterpolants,
                c = a.__cacheIndex,
                d = --this._nActiveControlInterpolants,
                e = b[d];
            a.__cacheIndex = d;
            b[d] = a;
            e.__cacheIndex =
                c;
            b[c] = e
        },
        _controlInterpolantsResultBuffer: new Float32Array(1),
        clipAction: function (a, b) {
            var c = b || this._root,
                d = c.uuid;
            c = "string" === typeof a ? Fa.findByName(c, a) : a;
            a = null !== c ? c.uuid : a;
            var e = this._actionsByClip[a],
                f = null;
            if (void 0 !== e) {
                f = e.actionByRoot[d];
                if (void 0 !== f) return f;
                f = e.knownActions[0];
                null === c && (c = f._clip)
            }
            if (null === c) return null;
            b = new lf(this, c, b);
            this._bindAction(b, f);
            this._addInactiveAction(b, a, d);
            return b
        },
        existingAction: function (a, b) {
            var c = b || this._root;
            b = c.uuid;
            c = "string" === typeof a ?
                Fa.findByName(c, a) : a;
            a = this._actionsByClip[c ? c.uuid : a];
            return void 0 !== a ? a.actionByRoot[b] || null : null
        },
        stopAllAction: function () {
            for (var a = this._actions, b = this._nActiveActions, c = this._bindings, d = this._nActiveBindings, e = this._nActiveBindings = this._nActiveActions = 0; e !== b; ++e) a[e].reset();
            for (e = 0; e !== d; ++e) c[e].useCount = 0;
            return this
        },
        update: function (a) {
            a *= this.timeScale;
            for (var b = this._actions, c = this._nActiveActions, d = this.time += a, e = Math.sign(a), f = this._accuIndex ^= 1, g = 0; g !== c; ++g) b[g]._update(d, a, e,
                f);
            a = this._bindings;
            b = this._nActiveBindings;
            for (g = 0; g !== b; ++g) a[g].apply(f);
            return this
        },
        getRoot: function () {
            return this._root
        },
        uncacheClip: function (a) {
            var b = this._actions;
            a = a.uuid;
            var c = this._actionsByClip,
                d = c[a];
            if (void 0 !== d) {
                d = d.knownActions;
                for (var e = 0, f = d.length; e !== f; ++e) {
                    var g = d[e];
                    this._deactivateAction(g);
                    var h = g._cacheIndex,
                        k = b[b.length - 1];
                    g._cacheIndex = null;
                    g._byClipCacheIndex = null;
                    k._cacheIndex = h;
                    b[h] = k;
                    b.pop();
                    this._removeInactiveBindingsForAction(g)
                }
                delete c[a]
            }
        },
        uncacheRoot: function (a) {
            a =
                a.uuid;
            var b = this._actionsByClip;
            for (d in b) {
                var c = b[d].actionByRoot[a];
                void 0 !== c && (this._deactivateAction(c), this._removeInactiveAction(c))
            }
            var d = this._bindingsByRootAndName[a];
            if (void 0 !== d)
                for (var e in d) a = d[e], a.restoreOriginalState(), this._removeInactiveBinding(a)
        },
        uncacheAction: function (a, b) {
            a = this.existingAction(a, b);
            null !== a && (this._deactivateAction(a), this._removeInactiveAction(a))
        }
    });
    Nd.prototype.clone = function () {
        return new Nd(void 0 === this.value.clone ? this.value : this.value.clone())
    };
    qe.prototype =
        Object.assign(Object.create(I.prototype), {
            constructor: qe,
            isInstancedBufferGeometry: !0,
            copy: function (a) {
                I.prototype.copy.call(this, a);
                this.maxInstancedCount = a.maxInstancedCount;
                return this
            },
            clone: function () {
                return (new this.constructor).copy(this)
            }
        });
    Object.defineProperties(re.prototype, {
        count: {
            get: function () {
                return this.data.count
            }
        },
        array: {
            get: function () {
                return this.data.array
            }
        }
    });
    Object.assign(re.prototype, {
        isInterleavedBufferAttribute: !0,
        setX: function (a, b) {
            this.data.array[a * this.data.stride + this.offset] =
                b;
            return this
        },
        setY: function (a, b) {
            this.data.array[a * this.data.stride + this.offset + 1] = b;
            return this
        },
        setZ: function (a, b) {
            this.data.array[a * this.data.stride + this.offset + 2] = b;
            return this
        },
        setW: function (a, b) {
            this.data.array[a * this.data.stride + this.offset + 3] = b;
            return this
        },
        getX: function (a) {
            return this.data.array[a * this.data.stride + this.offset]
        },
        getY: function (a) {
            return this.data.array[a * this.data.stride + this.offset + 1]
        },
        getZ: function (a) {
            return this.data.array[a * this.data.stride + this.offset + 2]
        },
        getW: function (a) {
            return this.data.array[a *
                this.data.stride + this.offset + 3]
        },
        setXY: function (a, b, c) {
            a = a * this.data.stride + this.offset;
            this.data.array[a + 0] = b;
            this.data.array[a + 1] = c;
            return this
        },
        setXYZ: function (a, b, c, d) {
            a = a * this.data.stride + this.offset;
            this.data.array[a + 0] = b;
            this.data.array[a + 1] = c;
            this.data.array[a + 2] = d;
            return this
        },
        setXYZW: function (a, b, c, d, e) {
            a = a * this.data.stride + this.offset;
            this.data.array[a + 0] = b;
            this.data.array[a + 1] = c;
            this.data.array[a + 2] = d;
            this.data.array[a + 3] = e;
            return this
        }
    });
    Object.defineProperty(nc.prototype, "needsUpdate", {
        set: function (a) {
            !0 === a && this.version++
        }
    });
    Object.assign(nc.prototype, {
        isInterleavedBuffer: !0,
        onUploadCallback: function () {},
        setArray: function (a) {
            if (Array.isArray(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.count = void 0 !== a ? a.length / this.stride : 0;
            this.array = a
        },
        setDynamic: function (a) {
            this.dynamic = a;
            return this
        },
        copy: function (a) {
            this.array = new a.array.constructor(a.array);
            this.count = a.count;
            this.stride = a.stride;
            this.dynamic = a.dynamic;
            return this
        },
        copyAt: function (a,
            b, c) {
            a *= this.stride;
            c *= b.stride;
            for (var d = 0, e = this.stride; d < e; d++) this.array[a + d] = b.array[c + d];
            return this
        },
        set: function (a, b) {
            void 0 === b && (b = 0);
            this.array.set(a, b);
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        onUpload: function (a) {
            this.onUploadCallback = a;
            return this
        }
    });
    se.prototype = Object.assign(Object.create(nc.prototype), {
        constructor: se,
        isInstancedInterleavedBuffer: !0,
        copy: function (a) {
            nc.prototype.copy.call(this, a);
            this.meshPerAttribute = a.meshPerAttribute;
            return this
        }
    });
    te.prototype = Object.assign(Object.create(H.prototype), {
        constructor: te,
        isInstancedBufferAttribute: !0,
        copy: function (a) {
            H.prototype.copy.call(this, a);
            this.meshPerAttribute = a.meshPerAttribute;
            return this
        }
    });
    Object.assign(mf.prototype, {
        linePrecision: 1,
        set: function (a, b) {
            this.ray.set(a, b)
        },
        setFromCamera: function (a, b) {
            b && b.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(b.matrixWorld), this.ray.direction.set(a.x, a.y, .5).unproject(b).sub(this.ray.origin).normalize()) : b && b.isOrthographicCamera ? (this.ray.origin.set(a.x,
                a.y, (b.near + b.far) / (b.near - b.far)).unproject(b), this.ray.direction.set(0, 0, -1).transformDirection(b.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
        },
        intersectObject: function (a, b, c) {
            c = c || [];
            ue(a, this, c, b);
            c.sort(nf);
            return c
        },
        intersectObjects: function (a, b, c) {
            c = c || [];
            if (!1 === Array.isArray(a)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), c;
            for (var d = 0, e = a.length; d < e; d++) ue(a[d], this, c, b);
            c.sort(nf);
            return c
        }
    });
    Object.assign( of .prototype, {
        start: function () {
            this.oldTime =
                this.startTime = ("undefined" === typeof performance ? Date : performance).now();
            this.elapsedTime = 0;
            this.running = !0
        },
        stop: function () {
            this.getElapsedTime();
            this.autoStart = this.running = !1
        },
        getElapsedTime: function () {
            this.getDelta();
            return this.elapsedTime
        },
        getDelta: function () {
            var a = 0;
            if (this.autoStart && !this.running) return this.start(), 0;
            if (this.running) {
                var b = ("undefined" === typeof performance ? Date : performance).now();
                a = (b - this.oldTime) / 1E3;
                this.oldTime = b;
                this.elapsedTime += a
            }
            return a
        }
    });
    Object.assign(pf.prototype, {
        set: function (a, b, c) {
            this.radius = a;
            this.phi = b;
            this.theta = c;
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.radius = a.radius;
            this.phi = a.phi;
            this.theta = a.theta;
            return this
        },
        makeSafe: function () {
            this.phi = Math.max(1E-6, Math.min(Math.PI - 1E-6, this.phi));
            return this
        },
        setFromVector3: function (a) {
            this.radius = a.length();
            0 === this.radius ? this.phi = this.theta = 0 : (this.theta = Math.atan2(a.x, a.z), this.phi = Math.acos(R.clamp(a.y / this.radius, -1, 1)));
            return this
        }
    });
    Object.assign(qf.prototype, {
        set: function (a, b, c) {
            this.radius = a;
            this.theta = b;
            this.y = c;
            return this
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.radius = a.radius;
            this.theta = a.theta;
            this.y = a.y;
            return this
        },
        setFromVector3: function (a) {
            this.radius = Math.sqrt(a.x * a.x + a.z * a.z);
            this.theta = Math.atan2(a.x, a.z);
            this.y = a.y;
            return this
        }
    });
    Object.assign(ve.prototype, {
        set: function (a, b) {
            this.min.copy(a);
            this.max.copy(b);
            return this
        },
        setFromPoints: function (a) {
            this.makeEmpty();
            for (var b = 0, c = a.length; b < c; b++) this.expandByPoint(a[b]);
            return this
        },
        setFromCenterAndSize: function () {
            var a = new A;
            return function (b, c) {
                c = a.copy(c).multiplyScalar(.5);
                this.min.copy(b).sub(c);
                this.max.copy(b).add(c);
                return this
            }
        }(),
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (a) {
            this.min.copy(a.min);
            this.max.copy(a.max);
            return this
        },
        makeEmpty: function () {
            this.min.x = this.min.y = Infinity;
            this.max.x = this.max.y = -Infinity;
            return this
        },
        isEmpty: function () {
            return this.max.x < this.min.x || this.max.y < this.min.y
        },
        getCenter: function (a) {
            void 0 ===
                a && (console.warn("THREE.Box2: .getCenter() target is now required"), a = new A);
            return this.isEmpty() ? a.set(0, 0) : a.addVectors(this.min, this.max).multiplyScalar(.5)
        },
        getSize: function (a) {
            void 0 === a && (console.warn("THREE.Box2: .getSize() target is now required"), a = new A);
            return this.isEmpty() ? a.set(0, 0) : a.subVectors(this.max, this.min)
        },
        expandByPoint: function (a) {
            this.min.min(a);
            this.max.max(a);
            return this
        },
        expandByVector: function (a) {
            this.min.sub(a);
            this.max.add(a);
            return this
        },
        expandByScalar: function (a) {
            this.min.addScalar(-a);
            this.max.addScalar(a);
            return this
        },
        containsPoint: function (a) {
            return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
        },
        containsBox: function (a) {
            return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y
        },
        getParameter: function (a, b) {
            void 0 === b && (console.warn("THREE.Box2: .getParameter() target is now required"), b = new A);
            return b.set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y))
        },
        intersectsBox: function (a) {
            return a.max.x <
                this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
        },
        clampPoint: function (a, b) {
            void 0 === b && (console.warn("THREE.Box2: .clampPoint() target is now required"), b = new A);
            return b.copy(a).clamp(this.min, this.max)
        },
        distanceToPoint: function () {
            var a = new A;
            return function (b) {
                return a.copy(b).clamp(this.min, this.max).sub(b).length()
            }
        }(),
        intersect: function (a) {
            this.min.max(a.min);
            this.max.min(a.max);
            return this
        },
        union: function (a) {
            this.min.min(a.min);
            this.max.max(a.max);
            return this
        },
        translate: function (a) {
            this.min.add(a);
            this.max.add(a);
            return this
        },
        equals: function (a) {
            return a.min.equals(this.min) && a.max.equals(this.max)
        }
    });
    gd.prototype = Object.create(B.prototype);
    gd.prototype.constructor = gd;
    gd.prototype.isImmediateRenderObject = !0;
    hd.prototype = Object.create(V.prototype);
    hd.prototype.constructor = hd;
    hd.prototype.update = function () {
        var a = new p,
            b = new p,
            c = new oa;
        return function () {
            var d = ["a", "b", "c"];
            this.object.updateMatrixWorld(!0);
            c.getNormalMatrix(this.object.matrixWorld);
            var e = this.object.matrixWorld,
                f = this.geometry.attributes.position,
                g = this.object.geometry;
            if (g && g.isGeometry)
                for (var h = g.vertices, k = g.faces, m = g = 0, p = k.length; m < p; m++)
                    for (var n = k[m], t = 0, r = n.vertexNormals.length; t < r; t++) {
                        var q = n.vertexNormals[t];
                        a.copy(h[n[d[t]]]).applyMatrix4(e);
                        b.copy(q).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);
                        f.setXYZ(g, a.x, a.y, a.z);
                        g += 1;
                        f.setXYZ(g, b.x, b.y, b.z);
                        g += 1
                    } else if (g && g.isBufferGeometry)
                        for (d = g.attributes.position, h = g.attributes.normal, t = g = 0, r = d.count; t < r; t++) a.set(d.getX(t), d.getY(t), d.getZ(t)).applyMatrix4(e), b.set(h.getX(t),
                            h.getY(t), h.getZ(t)), b.applyMatrix3(c).normalize().multiplyScalar(this.size).add(a), f.setXYZ(g, a.x, a.y, a.z), g += 1, f.setXYZ(g, b.x, b.y, b.z), g += 1;
            f.needsUpdate = !0
        }
    }();
    oc.prototype = Object.create(B.prototype);
    oc.prototype.constructor = oc;
    oc.prototype.dispose = function () {
        this.cone.geometry.dispose();
        this.cone.material.dispose()
    };
    oc.prototype.update = function () {
        var a = new p,
            b = new p;
        return function () {
            this.light.updateMatrixWorld();
            var c = this.light.distance ? this.light.distance : 1E3,
                d = c * Math.tan(this.light.angle);
            this.cone.scale.set(d, d, c);
            a.setFromMatrixPosition(this.light.matrixWorld);
            b.setFromMatrixPosition(this.light.target.matrixWorld);
            this.cone.lookAt(b.sub(a));
            void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color)
        }
    }();
    pc.prototype = Object.create(V.prototype);
    pc.prototype.constructor = pc;
    pc.prototype.updateMatrixWorld = function () {
        var a = new p,
            b = new K,
            c = new K;
        return function (d) {
            var e = this.bones,
                f = this.geometry,
                g = f.getAttribute("position");
            c.getInverse(this.root.matrixWorld);
            for (var h = 0, k = 0; h < e.length; h++) {
                var m = e[h];
                m.parent && m.parent.isBone && (b.multiplyMatrices(c, m.matrixWorld), a.setFromMatrixPosition(b), g.setXYZ(k, a.x, a.y, a.z), b.multiplyMatrices(c, m.parent.matrixWorld), a.setFromMatrixPosition(b), g.setXYZ(k + 1, a.x, a.y, a.z), k += 2)
            }
            f.getAttribute("position").needsUpdate = !0;
            B.prototype.updateMatrixWorld.call(this, d)
        }
    }();
    qc.prototype = Object.create(ta.prototype);
    qc.prototype.constructor = qc;
    qc.prototype.dispose = function () {
        this.geometry.dispose();
        this.material.dispose()
    };
    qc.prototype.update =
        function () {
            void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color)
        };
    rc.prototype = Object.create(B.prototype);
    rc.prototype.constructor = rc;
    rc.prototype.dispose = function () {
        this.children[0].geometry.dispose();
        this.children[0].material.dispose()
    };
    rc.prototype.update = function () {
        var a = .5 * this.light.width,
            b = .5 * this.light.height,
            c = this.line.geometry.attributes.position,
            d = c.array;
        d[0] = a;
        d[1] = -b;
        d[2] = 0;
        d[3] = a;
        d[4] = b;
        d[5] = 0;
        d[6] = -a;
        d[7] = b;
        d[8] = 0;
        d[9] = -a;
        d[10] = -b;
        d[11] =
            0;
        d[12] = a;
        d[13] = -b;
        d[14] = 0;
        c.needsUpdate = !0;
        void 0 !== this.color ? this.line.material.color.set(this.color) : this.line.material.color.copy(this.light.color)
    };
    sc.prototype = Object.create(B.prototype);
    sc.prototype.constructor = sc;
    sc.prototype.dispose = function () {
        this.children[0].geometry.dispose();
        this.children[0].material.dispose()
    };
    sc.prototype.update = function () {
        var a = new p,
            b = new L,
            c = new L;
        return function () {
            var d = this.children[0];
            if (void 0 !== this.color) this.material.color.set(this.color);
            else {
                var e = d.geometry.getAttribute("color");
                b.copy(this.light.color);
                c.copy(this.light.groundColor);
                for (var f = 0, g = e.count; f < g; f++) {
                    var h = f < g / 2 ? b : c;
                    e.setXYZ(f, h.r, h.g, h.b)
                }
                e.needsUpdate = !0
            }
            d.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate())
        }
    }();
    id.prototype = Object.create(V.prototype);
    id.prototype.constructor = id;
    Od.prototype = Object.create(V.prototype);
    Od.prototype.constructor = Od;
    jd.prototype = Object.create(V.prototype);
    jd.prototype.constructor = jd;
    jd.prototype.update = function () {
        var a = new p,
            b = new p,
            c = new oa;
        return function () {
            this.object.updateMatrixWorld(!0);
            c.getNormalMatrix(this.object.matrixWorld);
            var d = this.object.matrixWorld,
                e = this.geometry.attributes.position,
                f = this.object.geometry,
                g = f.vertices;
            f = f.faces;
            for (var h = 0, k = 0, m = f.length; k < m; k++) {
                var p = f[k],
                    n = p.normal;
                a.copy(g[p.a]).add(g[p.b]).add(g[p.c]).divideScalar(3).applyMatrix4(d);
                b.copy(n).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);
                e.setXYZ(h, a.x, a.y, a.z);
                h += 1;
                e.setXYZ(h, b.x, b.y, b.z);
                h += 1
            }
            e.needsUpdate = !0
        }
    }();
    tc.prototype = Object.create(B.prototype);
    tc.prototype.constructor = tc;
    tc.prototype.dispose = function () {
        this.lightPlane.geometry.dispose();
        this.lightPlane.material.dispose();
        this.targetLine.geometry.dispose();
        this.targetLine.material.dispose()
    };
    tc.prototype.update = function () {
        var a = new p,
            b = new p,
            c = new p;
        return function () {
            a.setFromMatrixPosition(this.light.matrixWorld);
            b.setFromMatrixPosition(this.light.target.matrixWorld);
            c.subVectors(b, a);
            this.lightPlane.lookAt(c);
            void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) :
                (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color));
            this.targetLine.lookAt(c);
            this.targetLine.scale.z = c.length()
        }
    }();
    kd.prototype = Object.create(V.prototype);
    kd.prototype.constructor = kd;
    kd.prototype.update = function () {
        function a(a, g, h, k) {
            d.set(g, h, k).unproject(e);
            a = c[a];
            if (void 0 !== a)
                for (g = b.getAttribute("position"), h = 0, k = a.length; h < k; h++) g.setXYZ(a[h], d.x, d.y, d.z)
        }
        var b, c, d = new p,
            e = new Qa;
        return function () {
            b = this.geometry;
            c = this.pointMap;
            e.projectionMatrix.copy(this.camera.projectionMatrix);
            a("c", 0, 0, -1);
            a("t", 0, 0, 1);
            a("n1", -1, -1, -1);
            a("n2", 1, -1, -1);
            a("n3", -1, 1, -1);
            a("n4", 1, 1, -1);
            a("f1", -1, -1, 1);
            a("f2", 1, -1, 1);
            a("f3", -1, 1, 1);
            a("f4", 1, 1, 1);
            a("u1", .7, 1.1, -1);
            a("u2", -.7, 1.1, -1);
            a("u3", 0, 2, -1);
            a("cf1", -1, 0, 1);
            a("cf2", 1, 0, 1);
            a("cf3", 0, -1, 1);
            a("cf4", 0, 1, 1);
            a("cn1", -1, 0, -1);
            a("cn2", 1, 0, -1);
            a("cn3", 0, -1, -1);
            a("cn4", 0, 1, -1);
            b.getAttribute("position").needsUpdate = !0
        }
    }();
    Fb.prototype = Object.create(V.prototype);
    Fb.prototype.constructor = Fb;
    Fb.prototype.update = function () {
        var a = new Va;
        return function (b) {
            void 0 !==
                b && console.warn("THREE.BoxHelper: .update() has no longer arguments.");
            void 0 !== this.object && a.setFromObject(this.object);
            if (!a.isEmpty()) {
                b = a.min;
                var c = a.max,
                    d = this.geometry.attributes.position,
                    e = d.array;
                e[0] = c.x;
                e[1] = c.y;
                e[2] = c.z;
                e[3] = b.x;
                e[4] = c.y;
                e[5] = c.z;
                e[6] = b.x;
                e[7] = b.y;
                e[8] = c.z;
                e[9] = c.x;
                e[10] = b.y;
                e[11] = c.z;
                e[12] = c.x;
                e[13] = c.y;
                e[14] = b.z;
                e[15] = b.x;
                e[16] = c.y;
                e[17] = b.z;
                e[18] = b.x;
                e[19] = b.y;
                e[20] = b.z;
                e[21] = c.x;
                e[22] = b.y;
                e[23] = b.z;
                d.needsUpdate = !0;
                this.geometry.computeBoundingSphere()
            }
        }
    }();
    Fb.prototype.setFromObject =
        function (a) {
            this.object = a;
            this.update();
            return this
        };
    ld.prototype = Object.create(V.prototype);
    ld.prototype.constructor = ld;
    ld.prototype.updateMatrixWorld = function (a) {
        var b = this.box;
        b.isEmpty() || (b.getCenter(this.position), b.getSize(this.scale), this.scale.multiplyScalar(.5), B.prototype.updateMatrixWorld.call(this, a))
    };
    md.prototype = Object.create(pa.prototype);
    md.prototype.constructor = md;
    md.prototype.updateMatrixWorld = function (a) {
        var b = -this.plane.constant;
        1E-8 > Math.abs(b) && (b = 1E-8);
        this.scale.set(.5 *
            this.size, .5 * this.size, b);
        this.lookAt(this.plane.normal);
        B.prototype.updateMatrixWorld.call(this, a)
    };
    var Pd, we;
    Gb.prototype = Object.create(B.prototype);
    Gb.prototype.constructor = Gb;
    Gb.prototype.setDirection = function () {
        var a = new p,
            b;
        return function (c) {
            .99999 < c.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > c.y ? this.quaternion.set(1, 0, 0, 0) : (a.set(c.z, 0, -c.x).normalize(), b = Math.acos(c.y), this.quaternion.setFromAxisAngle(a, b))
        }
    }();
    Gb.prototype.setLength = function (a, b, c) {
        void 0 === b && (b = .2 * a);
        void 0 === c && (c = .2 * b);
        this.line.scale.set(1, Math.max(0, a - b), 1);
        this.line.updateMatrix();
        this.cone.scale.set(c, b, c);
        this.cone.position.y = a;
        this.cone.updateMatrix()
    };
    Gb.prototype.setColor = function (a) {
        this.line.material.color.copy(a);
        this.cone.material.color.copy(a)
    };
    nd.prototype = Object.create(V.prototype);
    nd.prototype.constructor = nd;
    J.create = function (a, b) {
        console.log("THREE.Curve.create() has been deprecated");
        a.prototype = Object.create(J.prototype);
        a.prototype.constructor = a;
        a.prototype.getPoint = b;
        return a
    };
    Object.assign($a.prototype, {
        createPointsGeometry: function (a) {
            console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
            a = this.getPoints(a);
            return this.createGeometry(a)
        },
        createSpacedPointsGeometry: function (a) {
            console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
            a = this.getSpacedPoints(a);
            return this.createGeometry(a)
        },
        createGeometry: function (a) {
            console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
            for (var b = new M, c = 0, d = a.length; c < d; c++) {
                var e = a[c];
                b.vertices.push(new p(e.x, e.y, e.z || 0))
            }
            return b
        }
    });
    Object.assign(Pa.prototype, {
        fromPoints: function (a) {
            console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints().");
            this.setFromPoints(a)
        }
    });
    sf.prototype = Object.create(ca.prototype);
    tf.prototype = Object.create(ca.prototype);
    xe.prototype = Object.create(ca.prototype);
    Object.assign(xe.prototype, {
        initFromArray: function () {
            console.error("THREE.Spline: .initFromArray() has been removed.")
        },
        getControlPointsArray: function () {
            console.error("THREE.Spline: .getControlPointsArray() has been removed.")
        },
        reparametrizeByArcLength: function () {
            console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")
        }
    });
    id.prototype.setColors = function () {
        console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
    };
    pc.prototype.update = function () {
        console.error("THREE.SkeletonHelper: update() no longer needs to be called.")
    };
    Object.assign(lc.prototype, {
        extractUrlBase: function (a) {
            console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.");
            return Be.extractUrlBase(a)
        }
    });
    Object.assign(ve.prototype, {
        center: function (a) {
            console.warn("THREE.Box2: .center() has been renamed to .getCenter().");
            return this.getCenter(a)
        },
        empty: function () {
            console.warn("THREE.Box2: .empty() has been renamed to .isEmpty().");
            return this.isEmpty()
        },
        isIntersectionBox: function (a) {
            console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        },
        size: function (a) {
            console.warn("THREE.Box2: .size() has been renamed to .getSize().");
            return this.getSize(a)
        }
    });
    Object.assign(Va.prototype, {
        center: function (a) {
            console.warn("THREE.Box3: .center() has been renamed to .getCenter().");
            return this.getCenter(a)
        },
        empty: function () {
            console.warn("THREE.Box3: .empty() has been renamed to .isEmpty().");
            return this.isEmpty()
        },
        isIntersectionBox: function (a) {
            console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        },
        isIntersectionSphere: function (a) {
            console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().");
            return this.intersectsSphere(a)
        },
        size: function (a) {
            console.warn("THREE.Box3: .size() has been renamed to .getSize().");
            return this.getSize(a)
        }
    });
    Nb.prototype.center = function (a) {
        console.warn("THREE.Line3: .center() has been renamed to .getCenter().");
        return this.getCenter(a)
    };
    Object.assign(R, {
        random16: function () {
            console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead.");
            return Math.random()
        },
        nearestPowerOfTwo: function (a) {
            console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().");
            return R.floorPowerOfTwo(a)
        },
        nextPowerOfTwo: function (a) {
            console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().");
            return R.ceilPowerOfTwo(a)
        }
    });
    Object.assign(oa.prototype, {
        flattenToArrayOffset: function (a, b) {
            console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
            return this.toArray(a, b)
        },
        multiplyVector3: function (a) {
            console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
            return a.applyMatrix3(this)
        },
        multiplyVector3Array: function () {
            console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")
        },
        applyToBuffer: function (a) {
            console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");
            return this.applyToBufferAttribute(a)
        },
        applyToVector3Array: function () {
            console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")
        }
    });
    Object.assign(K.prototype, {
        extractPosition: function (a) {
            console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
            return this.copyPosition(a)
        },
        flattenToArrayOffset: function (a, b) {
            console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
            return this.toArray(a, b)
        },
        getPosition: function () {
            var a;
            return function () {
                void 0 === a && (a = new p);
                console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                return a.setFromMatrixColumn(this, 3)
            }
        }(),
        setRotationFromQuaternion: function (a) {
            console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
            return this.makeRotationFromQuaternion(a)
        },
        multiplyToArray: function () {
            console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")
        },
        multiplyVector3: function (a) {
            console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        },
        multiplyVector4: function (a) {
            console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        },
        multiplyVector3Array: function () {
            console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")
        },
        rotateAxis: function (a) {
            console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
            a.transformDirection(this)
        },
        crossVector: function (a) {
            console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        },
        translate: function () {
            console.error("THREE.Matrix4: .translate() has been removed.")
        },
        rotateX: function () {
            console.error("THREE.Matrix4: .rotateX() has been removed.")
        },
        rotateY: function () {
            console.error("THREE.Matrix4: .rotateY() has been removed.")
        },
        rotateZ: function () {
            console.error("THREE.Matrix4: .rotateZ() has been removed.")
        },
        rotateByAxis: function () {
            console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
        },
        applyToBuffer: function (a) {
            console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");
            return this.applyToBufferAttribute(a)
        },
        applyToVector3Array: function () {
            console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")
        },
        makeFrustum: function (a, b, c, d, e, f) {
            console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.");
            return this.makePerspective(a, b, d, c, e, f)
        }
    });
    Ha.prototype.isIntersectionLine = function (a) {
        console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().");
        return this.intersectsLine(a)
    };
    ia.prototype.multiplyVector3 =
        function (a) {
            console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
            return a.applyQuaternion(this)
        };
    Object.assign(qb.prototype, {
        isIntersectionBox: function (a) {
            console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        },
        isIntersectionPlane: function (a) {
            console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().");
            return this.intersectsPlane(a)
        },
        isIntersectionSphere: function (a) {
            console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().");
            return this.intersectsSphere(a)
        }
    });
    Object.assign(ja.prototype, {
        area: function () {
            console.warn("THREE.Triangle: .area() has been renamed to .getArea().");
            return this.getArea()
        },
        barycoordFromPoint: function (a, b) {
            console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().");
            return this.getBarycoord(a, b)
        },
        midpoint: function (a) {
            console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint().");
            return this.getMidpoint(a)
        },
        normal: function (a) {
            console.warn("THREE.Triangle: .normal() has been renamed to .getNormal().");
            return this.getNormal(a)
        },
        plane: function (a) {
            console.warn("THREE.Triangle: .plane() has been renamed to .getPlane().");
            return this.getPlane(a)
        }
    });
    Object.assign(ja, {
        barycoordFromPoint: function (a, b, c, d, e) {
            console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().");
            return ja.getBarycoord(a, b, c, d, e)
        },
        normal: function (a, b, c, d) {
            console.warn("THREE.Triangle: .normal() has been renamed to .getNormal().");
            return ja.getNormal(a, b, c, d)
        }
    });
    Object.assign(hb.prototype, {
        extractAllPoints: function (a) {
            console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead.");
            return this.extractPoints(a)
        },
        extrude: function (a) {
            console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.");
            return new bc(this, a)
        },
        makeGeometry: function (a) {
            console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.");
            return new vb(this, a)
        }
    });
    Object.assign(A.prototype, {
        fromAttribute: function (a, b, c) {
            console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().");
            return this.fromBufferAttribute(a, b, c)
        },
        distanceToManhattan: function (a) {
            console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().");
            return this.manhattanDistanceTo(a)
        },
        lengthManhattan: function () {
            console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().");
            return this.manhattanLength()
        }
    });
    Object.assign(p.prototype, {
        setEulerFromRotationMatrix: function () {
            console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
        },
        setEulerFromQuaternion: function () {
            console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
        },
        getPositionFromMatrix: function (a) {
            console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
            return this.setFromMatrixPosition(a)
        },
        getScaleFromMatrix: function (a) {
            console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
            return this.setFromMatrixScale(a)
        },
        getColumnFromMatrix: function (a, b) {
            console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
            return this.setFromMatrixColumn(b,
                a)
        },
        applyProjection: function (a) {
            console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.");
            return this.applyMatrix4(a)
        },
        fromAttribute: function (a, b, c) {
            console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().");
            return this.fromBufferAttribute(a, b, c)
        },
        distanceToManhattan: function (a) {
            console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().");
            return this.manhattanDistanceTo(a)
        },
        lengthManhattan: function () {
            console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().");
            return this.manhattanLength()
        }
    });
    Object.assign(da.prototype, {
        fromAttribute: function (a, b, c) {
            console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().");
            return this.fromBufferAttribute(a, b, c)
        },
        lengthManhattan: function () {
            console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().");
            return this.manhattanLength()
        }
    });
    Object.assign(M.prototype, {
        computeTangents: function () {
            console.error("THREE.Geometry: .computeTangents() has been removed.")
        },
        computeLineDistances: function () {
            console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.")
        }
    });
    Object.assign(B.prototype, {
        getChildByName: function (a) {
            console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
            return this.getObjectByName(a)
        },
        renderDepth: function () {
            console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
        },
        translate: function (a, b) {
            console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");
            return this.translateOnAxis(b, a)
        },
        getWorldRotation: function () {
            console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")
        }
    });
    Object.defineProperties(B.prototype, {
        eulerOrder: {
            get: function () {
                console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
                return this.rotation.order
            },
            set: function (a) {
                console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
                this.rotation.order = a
            }
        },
        useQuaternion: {
            get: function () {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            },
            set: function () {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            }
        }
    });
    Object.defineProperties(Ec.prototype, {
        objects: {
            get: function () {
                console.warn("THREE.LOD: .objects has been renamed to .levels.");
                return this.levels
            }
        }
    });
    Object.defineProperty(Fc.prototype, "useVertexTexture", {
        get: function () {
            console.warn("THREE.Skeleton: useVertexTexture has been removed.")
        },
        set: function () {
            console.warn("THREE.Skeleton: useVertexTexture has been removed.")
        }
    });
    Object.defineProperty(J.prototype, "__arcLengthDivisions", {
        get: function () {
            console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");
            return this.arcLengthDivisions
        },
        set: function (a) {
            console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");
            this.arcLengthDivisions = a
        }
    });
    Y.prototype.setLens = function (a, b) {
        console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.");
        void 0 !== b && (this.filmGauge = b);
        this.setFocalLength(a)
    };
    Object.defineProperties(ea.prototype, {
        onlyShadow: {
            set: function () {
                console.warn("THREE.Light: .onlyShadow has been removed.")
            }
        },
        shadowCameraFov: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov.");
                this.shadow.camera.fov = a
            }
        },
        shadowCameraLeft: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left.");
                this.shadow.camera.left = a
            }
        },
        shadowCameraRight: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right.");
                this.shadow.camera.right = a
            }
        },
        shadowCameraTop: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top.");
                this.shadow.camera.top = a
            }
        },
        shadowCameraBottom: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.");
                this.shadow.camera.bottom = a
            }
        },
        shadowCameraNear: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near.");
                this.shadow.camera.near = a
            }
        },
        shadowCameraFar: {
            set: function (a) {
                console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far.");
                this.shadow.camera.far = a
            }
        },
        shadowCameraVisible: {
            set: function () {
                console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
            }
        },
        shadowBias: {
            set: function (a) {
                console.warn("THREE.Light: .shadowBias is now .shadow.bias.");
                this.shadow.bias = a
            }
        },
        shadowDarkness: {
            set: function () {
                console.warn("THREE.Light: .shadowDarkness has been removed.")
            }
        },
        shadowMapWidth: {
            set: function (a) {
                console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.");
                this.shadow.mapSize.width = a
            }
        },
        shadowMapHeight: {
            set: function (a) {
                console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.");
                this.shadow.mapSize.height = a
            }
        }
    });
    Object.defineProperties(H.prototype, {
        length: {
            get: function () {
                console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead.");
                return this.array.length
            }
        },
        copyIndicesArray: function () {
            console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")
        }
    });
    Object.assign(I.prototype, {
        addIndex: function (a) {
            console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().");
            this.setIndex(a)
        },
        addDrawCall: function (a, b, c) {
            void 0 !== c && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.");
            console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup().");
            this.addGroup(a, b)
        },
        clearDrawCalls: function () {
            console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().");
            this.clearGroups()
        },
        computeTangents: function () {
            console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
        },
        computeOffsets: function () {
            console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
        }
    });
    Object.defineProperties(I.prototype, {
        drawcalls: {
            get: function () {
                console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups.");
                return this.groups
            }
        },
        offsets: {
            get: function () {
                console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups.");
                return this.groups
            }
        }
    });
    Object.assign(Xa.prototype, {
        getArrays: function () {
            console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.")
        },
        addShapeList: function () {
            console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.")
        },
        addShape: function () {
            console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.")
        }
    });
    Object.defineProperties(Nd.prototype, {
        dynamic: {
            set: function () {
                console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")
            }
        },
        onUpdate: {
            value: function () {
                console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.");
                return this
            }
        }
    });
    Object.defineProperties(Q.prototype, {
        wrapAround: {
            get: function () {
                console.warn("THREE.Material: .wrapAround has been removed.")
            },
            set: function () {
                console.warn("THREE.Material: .wrapAround has been removed.")
            }
        },
        wrapRGB: {
            get: function () {
                console.warn("THREE.Material: .wrapRGB has been removed.");
                return new L
            }
        },
        shading: {
            get: function () {
                console.error("THREE." + this.type +
                    ": .shading has been removed. Use the boolean .flatShading instead.")
            },
            set: function (a) {
                console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.");
                this.flatShading = 1 === a
            }
        }
    });
    Object.defineProperties(Ja.prototype, {
        metal: {
            get: function () {
                console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.");
                return !1
            },
            set: function () {
                console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
            }
        }
    });
    Object.defineProperties(za.prototype, {
        derivatives: {
            get: function () {
                console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
                return this.extensions.derivatives
            },
            set: function (a) {
                console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
                this.extensions.derivatives = a
            }
        }
    });
    Object.assign(Xd.prototype, {
        getCurrentRenderTarget: function () {
            console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().");
            return this.getRenderTarget()
        },
        getMaxAnisotropy: function () {
            console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().");
            return this.capabilities.getMaxAnisotropy()
        },
        getPrecision: function () {
            console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.");
            return this.capabilities.precision
        },
        resetGLState: function () {
            console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset().");
            return this.state.reset()
        },
        supportsFloatTextures: function () {
            console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).");
            return this.extensions.get("OES_texture_float")
        },
        supportsHalfFloatTextures: function () {
            console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).");
            return this.extensions.get("OES_texture_half_float")
        },
        supportsStandardDerivatives: function () {
            console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).");
            return this.extensions.get("OES_standard_derivatives")
        },
        supportsCompressedTextureS3TC: function () {
            console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).");
            return this.extensions.get("WEBGL_compressed_texture_s3tc")
        },
        supportsCompressedTexturePVRTC: function () {
            console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).");
            return this.extensions.get("WEBGL_compressed_texture_pvrtc")
        },
        supportsBlendMinMax: function () {
            console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).");
            return this.extensions.get("EXT_blend_minmax")
        },
        supportsVertexTextures: function () {
            console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.");
            return this.capabilities.vertexTextures
        },
        supportsInstancedArrays: function () {
            console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).");
            return this.extensions.get("ANGLE_instanced_arrays")
        },
        enableScissorTest: function (a) {
            console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().");
            this.setScissorTest(a)
        },
        initMaterial: function () {
            console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
        },
        addPrePlugin: function () {
            console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
        },
        addPostPlugin: function () {
            console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
        },
        updateShadowMap: function () {
            console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
        },
        setFaceCulling: function () {
            console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")
        }
    });
    Object.defineProperties(Xd.prototype, {
        shadowMapEnabled: {
            get: function () {
                return this.shadowMap.enabled
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.");
                this.shadowMap.enabled = a
            }
        },
        shadowMapType: {
            get: function () {
                return this.shadowMap.type
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.");
                this.shadowMap.type = a
            }
        },
        shadowMapCullFace: {
            get: function () {
                console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
            },
            set: function () {
                console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
            }
        }
    });
    Object.defineProperties(Ue.prototype, {
        cullFace: {
            get: function () {
                console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
            },
            set: function () {
                console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
            }
        },
        renderReverseSided: {
            get: function () {
                console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
            },
            set: function () {
                console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
            }
        },
        renderSingleSided: {
            get: function () {
                console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
            },
            set: function () {
                console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
            }
        }
    });
    Object.defineProperties(ib.prototype, {
        wrapS: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
                return this.texture.wrapS
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
                this.texture.wrapS = a
            }
        },
        wrapT: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
                return this.texture.wrapT
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
                this.texture.wrapT = a
            }
        },
        magFilter: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
                return this.texture.magFilter
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
                this.texture.magFilter =
                    a
            }
        },
        minFilter: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
                return this.texture.minFilter
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
                this.texture.minFilter = a
            }
        },
        anisotropy: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
                return this.texture.anisotropy
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
                this.texture.anisotropy =
                    a
            }
        },
        offset: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
                return this.texture.offset
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
                this.texture.offset = a
            }
        },
        repeat: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
                return this.texture.repeat
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
                this.texture.repeat = a
            }
        },
        format: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
                return this.texture.format
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
                this.texture.format = a
            }
        },
        type: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
                return this.texture.type
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
                this.texture.type = a
            }
        },
        generateMipmaps: {
            get: function () {
                console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
                return this.texture.generateMipmaps
            },
            set: function (a) {
                console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
                this.texture.generateMipmaps = a
            }
        }
    });
    Object.defineProperties(We.prototype, {
        standing: {
            set: function () {
                console.warn("THREE.WebVRManager: .standing has been removed.")
            }
        }
    });
    mc.prototype.load = function (a) {
        console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
        var b = this;
        (new je).load(a, function (a) {
            b.setBuffer(a)
        });
        return this
    };
    ne.prototype.getData = function () {
        console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData().");
        return this.getFrequencyData()
    };
    fd.prototype.updateCubeMap = function (a, b) {
        console.warn("THREE.CubeCamera: .updateCubeMap() is now .update().");
        return this.update(a, b)
    };
    k.WebGLRenderTargetCube = Ib;
    k.WebGLRenderTarget = ib;
    k.WebGLRenderer = Xd;
    k.ShaderLib = rb;
    k.UniformsLib = D;
    k.UniformsUtils = Ca;
    k.ShaderChunk = W;
    k.FogExp2 = Qb;
    k.Fog = Rb;
    k.Scene = rd;
    k.Sprite = Dc;
    k.LOD = Ec;
    k.SkinnedMesh = td;
    k.Skeleton = Fc;
    k.Bone = sd;
    k.Mesh = ta;
    k.LineSegments = V;
    k.LineLoop = ud;
    k.Line = pa;
    k.Points = Sb;
    k.Group = vd;
    k.VideoTexture = Yd;
    k.DataTexture =
        jb;
    k.CompressedTexture = Tb;
    k.CubeTexture = bb;
    k.CanvasTexture = Cc;
    k.DepthTexture = Gc;
    k.Texture = X;
    k.CompressedTextureLoader = df;
    k.DataTextureLoader = be;
    k.CubeTextureLoader = ce;
    k.TextureLoader = xd;
    k.ObjectLoader = ff;
    k.MaterialLoader = Md;
    k.BufferGeometryLoader = ee;
    k.DefaultLoadingManager = va;
    k.LoadingManager = ae;
    k.JSONLoader = fe;
    k.ImageLoader = ad;
    k.ImageBitmapLoader = ge;
    k.FontLoader = gf;
    k.FileLoader = Ka;
    k.Loader = lc;
    k.LoaderUtils = Be;
    k.Cache = Hb;
    k.AudioLoader = je;
    k.SpotLightShadow = zd;
    k.SpotLight = Ad;
    k.PointLight = Bd;
    k.RectAreaLight =
        Fd;
    k.HemisphereLight = yd;
    k.DirectionalLightShadow = Cd;
    k.DirectionalLight = Dd;
    k.AmbientLight = Ed;
    k.LightShadow = Eb;
    k.Light = ea;
    k.StereoCamera = hf;
    k.PerspectiveCamera = Y;
    k.OrthographicCamera = Jb;
    k.CubeCamera = fd;
    k.ArrayCamera = qd;
    k.Camera = Qa;
    k.AudioListener = ke;
    k.PositionalAudio = me;
    k.AudioContext = le;
    k.AudioAnalyser = ne;
    k.Audio = mc;
    k.VectorKeyframeTrack = kc;
    k.StringKeyframeTrack = Gd;
    k.QuaternionKeyframeTrack = dd;
    k.NumberKeyframeTrack = jc;
    k.ColorKeyframeTrack = Jd;
    k.BooleanKeyframeTrack = Hd;
    k.PropertyMixer = oe;
    k.PropertyBinding =
        ra;
    k.KeyframeTrack = ka;
    k.AnimationUtils = qa;
    k.AnimationObjectGroup = kf;
    k.AnimationMixer = pe;
    k.AnimationClip = Fa;
    k.Uniform = Nd;
    k.InstancedBufferGeometry = qe;
    k.BufferGeometry = I;
    k.Geometry = M;
    k.InterleavedBufferAttribute = re;
    k.InstancedInterleavedBuffer = se;
    k.InterleavedBuffer = nc;
    k.InstancedBufferAttribute = te;
    k.Face3 = Wa;
    k.Object3D = B;
    k.Raycaster = mf;
    k.Layers = Sd;
    k.EventDispatcher = xa;
    k.Clock = of ;
    k.QuaternionLinearInterpolant = Id;
    k.LinearInterpolant = ed;
    k.DiscreteInterpolant = Ld;
    k.CubicInterpolant = Kd;
    k.Interpolant = Aa;
    k.Triangle = ja;
    k.Math = R;
    k.Spherical = pf;
    k.Cylindrical = qf;
    k.Plane = Ha;
    k.Frustum = od;
    k.Sphere = Ga;
    k.Ray = qb;
    k.Matrix4 = K;
    k.Matrix3 = oa;
    k.Box3 = Va;
    k.Box2 = ve;
    k.Line3 = Nb;
    k.Euler = kb;
    k.Vector4 = da;
    k.Vector3 = p;
    k.Vector2 = A;
    k.Quaternion = ia;
    k.Color = L;
    k.ImmediateRenderObject = gd;
    k.VertexNormalsHelper = hd;
    k.SpotLightHelper = oc;
    k.SkeletonHelper = pc;
    k.PointLightHelper = qc;
    k.RectAreaLightHelper = rc;
    k.HemisphereLightHelper = sc;
    k.GridHelper = id;
    k.PolarGridHelper = Od;
    k.FaceNormalsHelper = jd;
    k.DirectionalLightHelper = tc;
    k.CameraHelper = kd;
    k.BoxHelper = Fb;
    k.Box3Helper = ld;
    k.PlaneHelper = md;
    k.ArrowHelper = Gb;
    k.AxesHelper = nd;
    k.Shape = hb;
    k.Path = Pa;
    k.ShapePath = he;
    k.Font = ie;
    k.CurvePath = $a;
    k.Curve = J;
    k.ShapeUtils = Ya;
    k.WebGLUtils = Ve;
    k.WireframeGeometry = Ub;
    k.ParametricGeometry = Hc;
    k.ParametricBufferGeometry = Vb;
    k.TetrahedronGeometry = Jc;
    k.TetrahedronBufferGeometry = Wb;
    k.OctahedronGeometry = Kc;
    k.OctahedronBufferGeometry = sb;
    k.IcosahedronGeometry = Lc;
    k.IcosahedronBufferGeometry = Xb;
    k.DodecahedronGeometry = Mc;
    k.DodecahedronBufferGeometry = Yb;
    k.PolyhedronGeometry =
        Ic;
    k.PolyhedronBufferGeometry = ma;
    k.TubeGeometry = Nc;
    k.TubeBufferGeometry = Zb;
    k.TorusKnotGeometry = Oc;
    k.TorusKnotBufferGeometry = $b;
    k.TorusGeometry = Pc;
    k.TorusBufferGeometry = ac;
    k.TextGeometry = Uc;
    k.TextBufferGeometry = cc;
    k.SphereGeometry = Vc;
    k.SphereBufferGeometry = ub;
    k.RingGeometry = Wc;
    k.RingBufferGeometry = dc;
    k.PlaneGeometry = Ac;
    k.PlaneBufferGeometry = pb;
    k.LatheGeometry = Xc;
    k.LatheBufferGeometry = ec;
    k.ShapeGeometry = vb;
    k.ShapeBufferGeometry = wb;
    k.ExtrudeGeometry = bc;
    k.ExtrudeBufferGeometry = Xa;
    k.EdgesGeometry = fc;
    k.ConeGeometry =
        Yc;
    k.ConeBufferGeometry = Zc;
    k.CylinderGeometry = xb;
    k.CylinderBufferGeometry = Za;
    k.CircleGeometry = $c;
    k.CircleBufferGeometry = gc;
    k.BoxGeometry = Kb;
    k.BoxBufferGeometry = nb;
    k.ShadowMaterial = yb;
    k.SpriteMaterial = gb;
    k.RawShaderMaterial = hc;
    k.ShaderMaterial = za;
    k.PointsMaterial = Ia;
    k.MeshPhysicalMaterial = zb;
    k.MeshStandardMaterial = Sa;
    k.MeshPhongMaterial = Ja;
    k.MeshToonMaterial = Ab;
    k.MeshNormalMaterial = Bb;
    k.MeshLambertMaterial = Cb;
    k.MeshDepthMaterial = db;
    k.MeshDistanceMaterial = eb;
    k.MeshBasicMaterial = ya;
    k.LineDashedMaterial =
        Db;
    k.LineBasicMaterial = S;
    k.Material = Q;
    k.Float64BufferAttribute = zc;
    k.Float32BufferAttribute = z;
    k.Uint32BufferAttribute = mb;
    k.Int32BufferAttribute = yc;
    k.Uint16BufferAttribute = lb;
    k.Int16BufferAttribute = xc;
    k.Uint8ClampedBufferAttribute = wc;
    k.Uint8BufferAttribute = vc;
    k.Int8BufferAttribute = uc;
    k.BufferAttribute = H;
    k.ArcCurve = ic;
    k.CatmullRomCurve3 = ca;
    k.CubicBezierCurve = La;
    k.CubicBezierCurve3 = Ta;
    k.EllipseCurve = na;
    k.LineCurve = wa;
    k.LineCurve3 = Ma;
    k.QuadraticBezierCurve = Na;
    k.QuadraticBezierCurve3 = Ua;
    k.SplineCurve = Oa;
    k.REVISION = "92dev";
    k.MOUSE = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };
    k.CullFaceNone = 0;
    k.CullFaceBack = 1;
    k.CullFaceFront = 2;
    k.CullFaceFrontBack = 3;
    k.FrontFaceDirectionCW = 0;
    k.FrontFaceDirectionCCW = 1;
    k.BasicShadowMap = 0;
    k.PCFShadowMap = 1;
    k.PCFSoftShadowMap = 2;
    k.FrontSide = 0;
    k.BackSide = 1;
    k.DoubleSide = 2;
    k.FlatShading = 1;
    k.SmoothShading = 2;
    k.NoColors = 0;
    k.FaceColors = 1;
    k.VertexColors = 2;
    k.NoBlending = 0;
    k.NormalBlending = 1;
    k.AdditiveBlending = 2;
    k.SubtractiveBlending = 3;
    k.MultiplyBlending = 4;
    k.CustomBlending = 5;
    k.AddEquation = 100;
    k.SubtractEquation =
        101;
    k.ReverseSubtractEquation = 102;
    k.MinEquation = 103;
    k.MaxEquation = 104;
    k.ZeroFactor = 200;
    k.OneFactor = 201;
    k.SrcColorFactor = 202;
    k.OneMinusSrcColorFactor = 203;
    k.SrcAlphaFactor = 204;
    k.OneMinusSrcAlphaFactor = 205;
    k.DstAlphaFactor = 206;
    k.OneMinusDstAlphaFactor = 207;
    k.DstColorFactor = 208;
    k.OneMinusDstColorFactor = 209;
    k.SrcAlphaSaturateFactor = 210;
    k.NeverDepth = 0;
    k.AlwaysDepth = 1;
    k.LessDepth = 2;
    k.LessEqualDepth = 3;
    k.EqualDepth = 4;
    k.GreaterEqualDepth = 5;
    k.GreaterDepth = 6;
    k.NotEqualDepth = 7;
    k.MultiplyOperation = 0;
    k.MixOperation =
        1;
    k.AddOperation = 2;
    k.NoToneMapping = 0;
    k.LinearToneMapping = 1;
    k.ReinhardToneMapping = 2;
    k.Uncharted2ToneMapping = 3;
    k.CineonToneMapping = 4;
    k.UVMapping = 300;
    k.CubeReflectionMapping = 301;
    k.CubeRefractionMapping = 302;
    k.EquirectangularReflectionMapping = 303;
    k.EquirectangularRefractionMapping = 304;
    k.SphericalReflectionMapping = 305;
    k.CubeUVReflectionMapping = 306;
    k.CubeUVRefractionMapping = 307;
    k.RepeatWrapping = 1E3;
    k.ClampToEdgeWrapping = 1001;
    k.MirroredRepeatWrapping = 1002;
    k.NearestFilter = 1003;
    k.NearestMipMapNearestFilter =
        1004;
    k.NearestMipMapLinearFilter = 1005;
    k.LinearFilter = 1006;
    k.LinearMipMapNearestFilter = 1007;
    k.LinearMipMapLinearFilter = 1008;
    k.UnsignedByteType = 1009;
    k.ByteType = 1010;
    k.ShortType = 1011;
    k.UnsignedShortType = 1012;
    k.IntType = 1013;
    k.UnsignedIntType = 1014;
    k.FloatType = 1015;
    k.HalfFloatType = 1016;
    k.UnsignedShort4444Type = 1017;
    k.UnsignedShort5551Type = 1018;
    k.UnsignedShort565Type = 1019;
    k.UnsignedInt248Type = 1020;
    k.AlphaFormat = 1021;
    k.RGBFormat = 1022;
    k.RGBAFormat = 1023;
    k.LuminanceFormat = 1024;
    k.LuminanceAlphaFormat = 1025;
    k.RGBEFormat =
        1023;
    k.DepthFormat = 1026;
    k.DepthStencilFormat = 1027;
    k.RGB_S3TC_DXT1_Format = 33776;
    k.RGBA_S3TC_DXT1_Format = 33777;
    k.RGBA_S3TC_DXT3_Format = 33778;
    k.RGBA_S3TC_DXT5_Format = 33779;
    k.RGB_PVRTC_4BPPV1_Format = 35840;
    k.RGB_PVRTC_2BPPV1_Format = 35841;
    k.RGBA_PVRTC_4BPPV1_Format = 35842;
    k.RGBA_PVRTC_2BPPV1_Format = 35843;
    k.RGB_ETC1_Format = 36196;
    k.RGBA_ASTC_4x4_Format = 37808;
    k.RGBA_ASTC_5x4_Format = 37809;
    k.RGBA_ASTC_5x5_Format = 37810;
    k.RGBA_ASTC_6x5_Format = 37811;
    k.RGBA_ASTC_6x6_Format = 37812;
    k.RGBA_ASTC_8x5_Format = 37813;
    k.RGBA_ASTC_8x6_Format =
        37814;
    k.RGBA_ASTC_8x8_Format = 37815;
    k.RGBA_ASTC_10x5_Format = 37816;
    k.RGBA_ASTC_10x6_Format = 37817;
    k.RGBA_ASTC_10x8_Format = 37818;
    k.RGBA_ASTC_10x10_Format = 37819;
    k.RGBA_ASTC_12x10_Format = 37820;
    k.RGBA_ASTC_12x12_Format = 37821;
    k.LoopOnce = 2200;
    k.LoopRepeat = 2201;
    k.LoopPingPong = 2202;
    k.InterpolateDiscrete = 2300;
    k.InterpolateLinear = 2301;
    k.InterpolateSmooth = 2302;
    k.ZeroCurvatureEnding = 2400;
    k.ZeroSlopeEnding = 2401;
    k.WrapAroundEnding = 2402;
    k.TrianglesDrawMode = 0;
    k.TriangleStripDrawMode = 1;
    k.TriangleFanDrawMode = 2;
    k.LinearEncoding =
        3E3;
    k.sRGBEncoding = 3001;
    k.GammaEncoding = 3007;
    k.RGBEEncoding = 3002;
    k.LogLuvEncoding = 3003;
    k.RGBM7Encoding = 3004;
    k.RGBM16Encoding = 3005;
    k.RGBDEncoding = 3006;
    k.BasicDepthPacking = 3200;
    k.RGBADepthPacking = 3201;
    k.CubeGeometry = Kb;
    k.Face4 = function (a, b, c, d, e, f, g) {
        console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");
        return new Wa(a, b, c, e, f, g)
    };
    k.LineStrip = 0;
    k.LinePieces = 1;
    k.MeshFaceMaterial = function (a) {
        console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead.");
        return a
    };
    k.MultiMaterial = function (a) {
        void 0 === a && (a = []);
        console.warn("THREE.MultiMaterial has been removed. Use an Array instead.");
        a.isMultiMaterial = !0;
        a.materials = a;
        a.clone = function () {
            return a.slice()
        };
        return a
    };
    k.PointCloud = function (a, b) {
        console.warn("THREE.PointCloud has been renamed to THREE.Points.");
        return new Sb(a, b)
    };
    k.Particle = function (a) {
        console.warn("THREE.Particle has been renamed to THREE.Sprite.");
        return new Dc(a)
    };
    k.ParticleSystem = function (a, b) {
        console.warn("THREE.ParticleSystem has been renamed to THREE.Points.");
        return new Sb(a, b)
    };
    k.PointCloudMaterial = function (a) {
        console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.");
        return new Ia(a)
    };
    k.ParticleBasicMaterial = function (a) {
        console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.");
        return new Ia(a)
    };
    k.ParticleSystemMaterial = function (a) {
        console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.");
        return new Ia(a)
    };
    k.Vertex = function (a, b, c) {
        console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead.");
        return new p(a, b, c)
    };
    k.DynamicBufferAttribute = function (a, b) {
        console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.");
        return (new H(a, b)).setDynamic(!0)
    };
    k.Int8Attribute = function (a, b) {
        console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.");
        return new uc(a, b)
    };
    k.Uint8Attribute = function (a, b) {
        console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.");
        return new vc(a,
            b)
    };
    k.Uint8ClampedAttribute = function (a, b) {
        console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.");
        return new wc(a, b)
    };
    k.Int16Attribute = function (a, b) {
        console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.");
        return new xc(a, b)
    };
    k.Uint16Attribute = function (a, b) {
        console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.");
        return new lb(a, b)
    };
    k.Int32Attribute =
        function (a, b) {
            console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.");
            return new yc(a, b)
        };
    k.Uint32Attribute = function (a, b) {
        console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.");
        return new mb(a, b)
    };
    k.Float32Attribute = function (a, b) {
        console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.");
        return new z(a, b)
    };
    k.Float64Attribute = function (a, b) {
        console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.");
        return new zc(a, b)
    };
    k.ClosedSplineCurve3 = sf;
    k.SplineCurve3 = tf;
    k.Spline = xe;
    k.AxisHelper = function (a) {
        console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper.");
        return new nd(a)
    };
    k.BoundingBoxHelper = function (a, b) {
        console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead.");
        return new Fb(a, b)
    };
    k.EdgesHelper = function (a, b) {
        console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.");
        return new V(new fc(a.geometry), new S({
            color: void 0 !==
                b ? b : 16777215
        }))
    };
    k.WireframeHelper = function (a, b) {
        console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.");
        return new V(new Ub(a.geometry), new S({
            color: void 0 !== b ? b : 16777215
        }))
    };
    k.XHRLoader = function (a) {
        console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader.");
        return new Ka(a)
    };
    k.BinaryTextureLoader = function (a) {
        console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.");
        return new be(a)
    };
    k.GeometryUtils = {
        merge: function (a, b, c) {
            console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
            if (b.isMesh) {
                b.matrixAutoUpdate && b.updateMatrix();
                var d = b.matrix;
                b = b.geometry
            }
            a.merge(b, d, c)
        },
        center: function (a) {
            console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");
            return a.center()
        }
    };
    k.ImageUtils = {
        crossOrigin: void 0,
        loadTexture: function (a, b, c, d) {
            console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
            var e = new xd;
            e.setCrossOrigin(this.crossOrigin);
            a = e.load(a, c, void 0, d);
            b && (a.mapping = b);
            return a
        },
        loadTextureCube: function (a, b, c, d) {
            console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
            var e = new ce;
            e.setCrossOrigin(this.crossOrigin);
            a = e.load(a, c, void 0, d);
            b && (a.mapping = b);
            return a
        },
        loadCompressedTexture: function () {
            console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
        },
        loadCompressedTextureCube: function () {
            console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
        }
    };
    k.Projector = function () {
        console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");
        this.projectVector = function (a, b) {
            console.warn("THREE.Projector: .projectVector() is now vector.project().");
            a.project(b)
        };
        this.unprojectVector = function (a, b) {
            console.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
            a.unproject(b)
        };
        this.pickingRay = function () {
            console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
        }
    };
    k.CanvasRenderer = function () {
        console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
        this.domElement = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
        this.clear = function () {};
        this.render = function () {};
        this.setClearColor = function () {};
        this.setSize = function () {}
    };
    k.SceneUtils = {
        createMultiMaterialObject: function () {
            console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")
        },
        detach: function () {
            console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")
        },
        attach: function () {
            console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js")
        }
    };
    k.LensFlare = function () {
        console.error("THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js")
    };
    Object.defineProperty(k, "__esModule", {
        value: !0
    })
});