var My3D = /** @class */ (function () {
    function My3D() {
        this.stats = this.initStats();
        window.onload = this.onload.bind(this);
    }
    /**
     * 页面绘制完后加载
     */
    My3D.prototype.onload = function () {
        this.init();
        this.animate();
    };
    /**
     * 场景
     */
    My3D.prototype.initScene = function () {
        this.scene = new THREE.Scene();
    };
    /**
     * 相机
     */
    My3D.prototype.initCamera = function () {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(-100, 300, 300);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    };
    /**
     * 渲染器
     */
    My3D.prototype.initRenderer = function () {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // 设置渲染器的像素比例，按照设备
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // 渲染背景色
        this.renderer.setClearColor(0x050505);
        // 渲染范围
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 开启阴影支持
        this.renderer.shadowMap.enabled = true;
        // 阴影类型
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    };
    /**
     * 灯光
     */
    My3D.prototype.initLight = function () {
        this.scene.add(new THREE.AmbientLight(0xCCCCCC));
        this.spotLight = new THREE.SpotLight();
        this.spotLight.color = new THREE.Color(0xffffff);
        this.spotLight.castShadow = true;
        this.spotLight.position.set(-80, 180, -80);
        // 光的强度 默认值为1
        this.spotLight.intensity = 1;
        // 从发光点发出的距离，光的亮度，会随着距离的远近线性衰减
        this.spotLight.distance = 350;
        // 光色散角度，默认是 Math.PI * 2
        this.spotLight.angle = 0.4;
        // 光影的减弱程度，默认值为0， 取值范围 0 -- 1之间
        this.spotLight.penumbra = 0.1;
        // 光在距离上的量值, 和光的强度类似（衰减指数）
        this.spotLight.decay = 1;
        // 设置阴影分辨率
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;
        // 投影近点 --> 从距离光源的哪一才产生阴影
        this.spotLight.shadow.camera.near = 0.1;
        // 投影原点 --> 到光源的哪一点位置不产生阴影
        this.spotLight.shadow.camera.far = 300;
        // 投影视场
        this.spotLight.shadow.camera.fov = 40;
        this.scene.add(this.spotLight);
        // 阴影相机助手
        this.shadowCameraHelper = new THREE.CameraHelper(this.spotLight.shadow.camera);
        // scene.add(shadowCameraHelper);
        // 聚光光源助手
        this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        // scene.add(spotLightHelper);
    };
    /**
     * 控制器
     */
    My3D.prototype.initControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // 添加惯性
        this.controls.enableDamping = true;
        // 最大偏移角度
        this.controls.maxPolarAngle = 0.45 * Math.PI;
        // 进制移动
        this.controls.noPan = true;
        // 旋转速度
        this.controls.rotateSpeed = 0.05;
        // 最大可视距离
        this.controls.maxDistance = 500;
        // 最小可视距离
        this.controls.minDistance = 100;
    };
    /**
     * 调试插件
     */
    My3D.prototype.initGui = function () {
        var _this = this;
        this.guiControls = new function () {
            this.spotLightColor = 0xffffff;
            this.intensity = 1;
            this.distance = 350;
            this.angle = 0.4;
            this.penumbra = 0.1;
            this.castShadow = true;
            this.decay = 1;
        };
        var gui = new dat.GUI();
        gui.addColor(this.guiControls, 'spotLightColor').onChange(function (e) {
            _this.spotLight.color = new THREE.Color(e);
        });
        gui.add(this.guiControls, 'intensity', 0, 4).onChange(function (e) {
            _this.spotLight.intensity = e;
        });
        gui.add(this.guiControls, 'distance', 200, 500).onChange(function (e) {
            _this.spotLight.distance = e;
        });
        gui.add(this.guiControls, 'angle', 0, 1).onChange(function (e) {
            _this.spotLight.angle = e;
        });
        gui.add(this.guiControls, 'penumbra', 0, 1).onChange(function (e) {
            _this.spotLight.penumbra = e;
        });
        gui.add(this.guiControls, 'castShadow').onChange(function (e) {
            _this.spotLight.castShadow = e;
        });
        gui.add(this.guiControls, 'decay', 0, 1).onChange(function (e) {
            _this.spotLight.decay = e;
        });
    };
    /**
     * 场景中的内容
     */
    My3D.prototype.initContent = function () {
        // 接收阴影的片面段，也会对阴影产生一定的效果，片面段越多，阴影分辨率越清晰
        var planeGeometry = new THREE.PlaneGeometry(300, 300, 300, 300);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // 绕 x 轴旋转 -90 度
        plane.rotation.x = -0.5 * Math.PI;
        plane.receiveShadow = true;
        this.scene.add(plane);
        var cubeGeometry = new THREE.CubeGeometry(20, 5, 10);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x99CCCC });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.position.y = 15;
        this.scene.add(cube);
    };
    /**
     * 性能插件
     */
    My3D.prototype.initStats = function () {
        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
        return stats;
    };
    /**
     * 更新
     */
    My3D.prototype.update = function () {
        var _a, _b, _c, _d;
        (_a = this.stats) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.controls) === null || _b === void 0 ? void 0 : _b.update();
        (_c = this.shadowCameraHelper) === null || _c === void 0 ? void 0 : _c.update();
        (_d = this.spotLightHelper) === null || _d === void 0 ? void 0 : _d.update();
    };
    /**
     * 初始化
     */
    My3D.prototype.init = function () {
        // 兼容性判断，若不兼容会提示信息
        if (!Detector.webgl)
            Detector.addGetWebGLMessage();
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLight();
        this.initControls();
        this.initContent();
        this.initGui();
        window.addEventListener('resize', this.onWindowResize, false);
    };
    /**
     * 窗口变动触发的方法
     */
    My3D.prototype.onWindowResize = function () {
        // 重新设置相机的宽高比
        this.camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机投影矩阵
        this.camera.updateProjectionMatrix();
        // 更新渲染器大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    /**
     * 循环渲染
     */
    My3D.prototype.animate = function () {
        window.requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.update();
    };
    return My3D;
}());
new My3D();
