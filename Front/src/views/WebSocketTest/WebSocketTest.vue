<template>
    <div class="WebSocketTest">
        <group style="width: 50%;margin: auto">
            <x-input v-model="value" title="asdas"></x-input>
            <x-button @click.native="send">发送</x-button>
        </group>
        <div class="user">
            <h1>聊天内容</h1>
            <pre>{{JSON.stringify(message,null,4)}}</pre>
        </div>
        <div class="user">
            <h1>在线人数：</h1>
            <pre>{{JSON.stringify(userList,null,4)}}</pre>
        </div>

    </div>
</template>

<script>
    import { XButton, XInput, Group } from "vux"
    export default {
        name: "WebSocketTest",
        data(){
            return {
                value:null,
                userList:[],
                ws:null,
                message:[]
            }
        },
        components:{ XButton, XInput, Group },
        methods:{
            send(){
                let sendData = {
                    message:this.value,
                    username:this.$route.query.userid,
                    to:this.$route.query.touserid
                };
                this.message.push(sendData);
                this.ws.send(JSON.stringify(sendData));
            },
            WebSocketTest(){
                if ("WebSocket" in window)
                {
                    console.log("临时用户",this.$route.query.userid)
                    // 打开一个 web socket
                    this.ws = new WebSocket("ws://192.168.6.118:8088/point/websocket/"+this.$route.query.userid);

                    this.ws.onopen = ()=>
                    {
                        // Web Socket 已连接上，使用 send() 方法发送数据
                        // this.ws.send("发送数据AAAAAAAAAA");
                        // console.log("数据发送中...,111111111");
                    };

                    this.ws.onmessage = (evt)=>
                    {
                        var data = JSON.parse(evt.data);
                        console.log("数据已接收...",data);
                        switch (data.messageType) {
                            //上线
                            case 1:
                                this.userList.push(data.username);
                                break;
                            //下线
                            case 2:
                                this.userList = data.onlineUsers;
                                break;
                            //用户在线人数
                            case 3:
                                this.userList = data.onlineUsers;
                                break;
                            //普通消息
                            case 4:
                                let item = {};
                                item[data.fromusername] = data.textMessage;
                                this.message.push(item);
                                break;
                        }
                    };

                    this.ws.onclose = ()=>
                    {
                        // 关闭 websocket
                        console.log("连接已关闭...");
                    };
                }
                else
                {
                    // 浏览器不支持 WebSocket
                    console.log("您的浏览器不支持 WebSocket!");
                }
            }
        },
        mounted() {
            this.action({
                moduleName:"messageOld",
                fullUrl:"http://192.168.6.118:8088/point/index/websocket/record?tousername=user1&username=user2",
                method:"get",
            //     proxy:{
            //         host: string;
            // port: number;
            //     }
            }).then(res=>{
                this.message = res.retData;
            });
            this.WebSocketTest();
        }
    }
</script>

<style scoped lang="less">
    .WebSocketTest {
        .user{
            background-color: #ffffff;
            width: 50%;
            margin: auto;
            margin-top: 50px;
        }
    }
</style>
