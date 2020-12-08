import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
import {ServerConfig} from "../../../UnityFrontUtils/config";
const path = require("path")
const fs = require("fs")
export class OcrController extends applicationController{
    constructor() {
        super();
    }
    index(){
        this.$_success();
    }

    /**
     * 解析TTF字体
     */
    ttf(){
        let simheiJson = {};
        try {
            simheiJson = require(path.resolve(ServerConfig.Template.publicPath,"./font/simhei.json"));
        }catch (e){
            let ttf_path = path.resolve(ServerConfig.Template.publicPath,"./font/simhei.ttf");
            let fontCarrier = require('font-carrier')
            let transFont = fontCarrier.transfer(ttf_path)
            let allGlyph = transFont.allGlyph()
            let allGlyphJson = {};
            for(var k in allGlyph){
                allGlyphJson[k] = {
                    options:allGlyph[k].options,
                    w:allGlyph[k].__font.options.horizAdvX,
                    h:allGlyph[k].__font.options.vertAdvY,
                }
            }
            simheiJson = allGlyphJson;
            fs.writeFileSync(path.resolve(ServerConfig.Template.publicPath,"./font/simhei.json"),JSON.stringify(allGlyphJson),"utf8")
        }
        let key = "&#x"+(<any>"徐").charCodeAt(0).toString(16).toLocaleUpperCase()+";";
        let textData = simheiJson[key]
        this.setHeaders({
            "Content-Type":"text/html; charset=utf-8",
        })
        this.$_send(`
        <svg 
        viewBox="4 -32 ${textData.w} ${textData.h}"
         xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style="transform: rotateX(180deg); transform-origin: 0"
          >
            <path d="${textData.options.d}"/>
        </svg>
        <div>识</div>
        `);
    }
}