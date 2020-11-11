<template>
    <div class="Login">
        <div id="back">
            <canvas id="canvas" class="canvas-back"></canvas>
            <div class="backRight">
            </div>
            <div class="backLeft">
            </div>
        </div>
        <div id="slideBox">
            <div class="topLayer">
                <div class="left">
                    <div class="content">
                        <img class="logo" src="/images/login/logo_text.png">
                        <h2>注册</h2>
                        <form id="form-signup" method="post" onsubmit="return false;">
                            <div class="form-element form-stack">
                                <label for="email" class="form-label">邮箱</label>
                                <input id="email" type="email" name="email">
                            </div>
                            <div class="form-element form-stack">
                                <label for="username-signup" class="form-label">账号</label>
                                <input id="username-signup" type="text" name="username">
                            </div>
                            <div class="form-element form-stack">
                                <label for="password-signup" class="form-label">密码</label>
                                <input id="password-signup" type="password" name="password">
                            </div>
                            <div class="form-element form-checkbox">
                                <input id="confirm-terms" type="checkbox" name="confirm" value="yes" class="checkbox">
                                <label for="confirm-terms">我同意 <a href="#">UnityFront后台管理系统服务条款</a> 及 <a href="#">隐私政策</a></label>
                            </div>
                            <div class="form-element form-submit">
                                <button id="signUp" class="signup" type="submit" name="signup">注册</button>
                                <button id="goLeft" class="signup off">登录</button>
                            </div>
                        </form>
                        <el-divider class="footer">{{footer}}</el-divider>
                    </div>
                </div>
                <div class="right">
                    <div class="content">
                        <img class="logo" src="/images/login/logo_text.png">
                        <h2>登录</h2>
                        <form id="form-login" method="post" onsubmit="return false;">
                            <div class="form-element form-stack">
                                <label for="username-login" class="form-label">账号</label>
                                <input id="username-login" type="text" name="username">
                            </div>
                            <div class="form-element form-stack">
                                <label for="password-login" class="form-label">密码</label>
                                <input id="password-login" type="password" name="password">
                            </div>
                            <div class="form-element form-submit">
                                <button id="logIn" class="login" type="submit" name="login">登录</button>
                                <button id="goRight" class="login off" name="signup">注册</button>
                            </div>
                        </form>
                        <el-divider class="footer">{{footer}}</el-divider>
                    </div>
                </div>
            </div>
        </div>

        <!--

        Remixed from "Sliding Login Form" Codepen by
        C-Rodg (github.com/C-Rodg)
        https://codepen.io/crodg/pen/yNKxej

        Remixed from "Paper.js - Animated Shapes Header" Codepen by
        Connor Hubeny (@cooper_hu)
        https://codepen.io/cooper_hu/pen/ybxoev

        Custom Checkbox based on the blog post by
        Mik Ted (@inserthtml):
        https://www.inserthtml.com/2012/06/custom-form-radio-checkbox/

        HTML5 Form Validation based on the blog post by
        Thoriq Firdaus (@tfirdaus):
        https://webdesign.tutsplus.com/tutorials/
        html5-form-validation-with-the-pattern-attribute--cms-25145

        -->
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            footer:"UnityFront后台管理系统"
        }
    },
    mounted() {
        Promise.all([
            this.$utils.addJs("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"),
            this.$utils.addJs("https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.11.3/paper-full.min.js"),
        ]).then(()=>{
            this.init();
        })
    },
    methods:{
        /**
         * 初始化
         */
        init(){
            /* ====================== *
 *  Toggle Between        *
 *  Sign Up / Login       *
 * ====================== */
            $(document).ready(function(){
                $('#goRight').on('click', function(){
                    $('#slideBox').animate({
                        'marginLeft' : '0'
                    });
                    $('.topLayer').animate({
                        'marginLeft' : '100%'
                    });
                });
                $('#goLeft').on('click', function(){
                    if (window.innerWidth > 769){
                        $('#slideBox').animate({
                            'marginLeft' : '50%'
                        });
                    }
                    else {
                        $('#slideBox').animate({
                            'marginLeft' : '20%'
                        });
                    }
                    $('.topLayer').animate({
                        'marginLeft': '0'
                    });
                });
            });

            /* ====================== *
             *  Initiate Canvas       *
             * ====================== */
            paper.install(window);
            paper.setup(document.getElementById("canvas"));

// Paper JS Variables
            var canvasWidth,
                canvasHeight,
                canvasMiddleX,
                canvasMiddleY;

            var shapeGroup = new Group();

            var positionArray = [];

            function getCanvasBounds() {
                // Get current canvas size
                canvasWidth = view.size.width;
                canvasHeight = view.size.height;
                canvasMiddleX = canvasWidth / 2;
                canvasMiddleY = canvasHeight / 2;
                // Set path position
                var position1 = {
                    x: (canvasMiddleX / 2) + 100,
                    y: 100,
                };

                var position2 = {
                    x: 200,
                    y: canvasMiddleY,
                };

                var position3 = {
                    x: (canvasMiddleX - 50) + (canvasMiddleX / 2),
                    y: 150,
                };

                var position4 = {
                    x: 0,
                    y: canvasMiddleY + 100,
                };

                var position5 = {
                    x: canvasWidth - 130,
                    y: canvasHeight - 75,
                };

                var position6 = {
                    x: canvasMiddleX + 80,
                    y: canvasHeight - 50,
                };

                var position7 = {
                    x: canvasWidth + 60,
                    y: canvasMiddleY - 50,
                };

                var position8 = {
                    x: canvasMiddleX + 100,
                    y: canvasMiddleY + 100,
                };

                positionArray = [position3, position2, position5, position4, position1, position6, position7, position8];
            }


            /* ====================== *
             * Create Shapes          *
             * ====================== */
            function initializeShapes() {
                // Get Canvas Bounds
                getCanvasBounds();

                var shapePathData = [
                    'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
                    'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
                    'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
                    'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
                    'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
                    'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
                    'M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100',
                    'M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 '
                ];

                for (var i = 0; i <= shapePathData.length; i++) {
                    // Create shape
                    var headerShape = new Path({
                        strokeColor: 'rgba(255, 255, 255, 0.5)',
                        strokeWidth: 2,
                        parent: shapeGroup,
                    });
                    // Set path data
                    headerShape.pathData = shapePathData[i];
                    headerShape.scale(2);
                    // Set path position
                    headerShape.position = positionArray[i];
                }
            }

            initializeShapes();

            /* ====================== *
             * Animation              *
             * ====================== */
            view.onFrame = function paperOnFrame(event) {
                if (event.count % 4 === 0) {
                    // Slows down frame rate
                    for (var i = 0; i < shapeGroup.children.length; i++) {
                        if (i % 2 === 0) {
                            shapeGroup.children[i].rotate(-0.1);
                        } else {
                            shapeGroup.children[i].rotate(0.1);
                        }
                    }
                }
            };

            view.onResize = function paperOnResize() {
                getCanvasBounds();

                for (var i = 0; i < shapeGroup.children.length; i++) {
                    shapeGroup.children[i].position = positionArray[i];
                }

                if (canvasWidth < 700) {
                    shapeGroup.children[3].opacity = 0;
                    shapeGroup.children[2].opacity = 0;
                    shapeGroup.children[5].opacity = 0;
                } else {
                    shapeGroup.children[3].opacity = 1;
                    shapeGroup.children[2].opacity = 1;
                    shapeGroup.children[5].opacity = 1;
                }
            };
        }
    }
}
</script>

<style scoped lang="less">
.Login{
    @theme-signup: @themeColor3;
    @theme-signup-darken: tint(@themeColor3,20%);
    @theme-signup-background: #2C3034;
    @theme-login: @themeColor;
    @theme-login-darken: @themeColor2;
    @theme-login-background: #f9f9f9;
    @theme-dark: #212121;
    @theme-light: #e3e3e3;
    @font-default: 'Roboto', sans-serif;

    @success: #5cb85c;
    @error: #d9534f;

    .backRight {
        position: absolute;
        right: 0;
        width: 50%;
        height: 100%;
        background: @theme-signup;
    }

    .backLeft {
        position: absolute;
        left: 0;
        width: 50%;
        height: 100%;
        background: @theme-login;
    }

    #back {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -999;
    }

    .canvas-back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    #slideBox {
        width: 50%;
        max-height: 100%;
        height: 100%;
        overflow: hidden;
        margin-left: 50%;
        position: absolute;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .topLayer {
        width: 200%;
        height: 100%;
        position: relative;
        left: 0;
        left: -100%;
    }

    label {
        font-size: 0.8em;
        text-transform: uppercase;
    }

    input {
        background-color: transparent;
        border: 0;
        outline: 0;
        font-size: 1em;
        padding: 8px 1px;
        margin-top: 0.1em;
    }

    .left {
        width: 50%;
        height: 100%;
        overflow: scroll;
        background: @theme-signup-background;
        left: 0;
        position: absolute;
        label {
            color: @theme-light;
        }
        input {
            border-bottom: 1px solid @theme-light;
            color: @theme-light;
            &:focus, &:active {
                border-color: @theme-signup;
                color: @theme-signup;
            }
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 30px @theme-signup-background inset;
                -webkit-text-fill-color: @theme-light;
            }
        }
        a {
            color: @theme-signup;
        }
    }

    .right {
        width: 50%;
        height: 100%;
        overflow: scroll;
        background: @theme-login-background;
        right: 0;
        position: absolute;
        label {
            color: @theme-dark;
        }
        input {
            border-bottom: 1px solid @theme-dark;
            &:focus, &:active {
                border-color: @theme-login;
            }
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 30px @theme-login-background inset;
                -webkit-text-fill-color: @theme-dark;
            }
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100%;
        width: 80%;
        margin: 0 auto;
        position: relative;
        .logo{
            position: absolute;
            left: 50%;
            top: 100px;
            width: 50%;
            transform: translateX(-50%);
        }
        .footer{
            position: absolute;
            left: 0;
            bottom: @unit15;
            text-align: center;
            width: 100%;
            font-size: 12px;
            &/deep/ .el-divider__text{
                //background-color: transparent;
            }
        }
    }

    .content h2 {
        font-weight: 300;
        font-size: 2.6em;
        margin: 0.2em 0 0.1em;
    }
    .left .content .footer{
        &/deep/ .el-divider__text{
            background-color: @theme-signup-background;
            color: #ffffff;
        }
    }
    .left .content h2 {
        color: @theme-signup;
    }

    .right .content h2 {
        color: @theme-login;
    }

    .form-element {
        margin: 1.6em 0;
        &.form-submit {
            margin: 1.6em 0 0;
        }
    }

    .form-stack {
        display: flex;
        flex-direction: column;
    }

    .checkbox {
        -webkit-appearance: none;
        outline: none;
        background-color: @theme-light;
        border: 1px solid @theme-light;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
        padding: 12px;
        border-radius: 4px;
        display: inline-block;
        position: relative;
    }
    .checkbox:focus, .checkbox:checked:focus,
    .checkbox:active, .checkbox:checked:active {
        border-color: @theme-signup;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
    }

    .checkbox:checked {
        outline: none;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    }

    .checkbox:checked:after {
        outline: none;
        content: '\2713';
        color: @theme-signup;
        font-size: 1.4em;
        font-weight: 900;
        position: absolute;
        top: -4px;
        left: 4px;
    }

    .form-checkbox {
        display: flex;
        align-items: center;

        label {
            margin: 0 6px 0;
            font-size: 0.72em;
        }
    }

    button {
        padding: 0.8em 1.2em;
        margin: 0 10px 0 0;
        width: auto;
        font-weight: 600;
        text-transform:  uppercase;
        font-size: 1em;
        color: #fff;
        line-height: 1em;
        letter-spacing: 0.6px;
        border-radius: 3px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.1);
        border: 0;
        outline: 0;
        transition: all 0.25s;
        &.signup {
            background: @theme-signup;
        }
        &.login {
            background: @theme-login;
        }
        &.off {
            background: none;
            box-shadow: none;
            margin: 0;

            &.signup {
                color: @theme-signup;
            }
            &.login {
                color: @theme-login;
            }
        }
    }

    button:focus, button:active, button:hover {
        box-shadow: 0 4px 7px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.1);
        &.signup {
            background: @theme-signup-darken;
        }
        &.login {
            background: @theme-login-darken;
        }
        &.off {
            box-shadow: none;
            &.signup {
                color: @theme-signup;
                background: @theme-dark;
            }
            &.login {
                color: @theme-login-darken;
                background: @theme-light;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        #slideBox {
            width: 80%;
            margin-left: 20%;
        }
        .signup-info, .login-info {
            display: none;
        }
    }
}
</style>