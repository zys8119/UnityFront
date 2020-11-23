import applicationController from "../controller/applicationController"
import Config from "./config"
const { resolve } = require("path");
const url = resolve(__dirname,"../../");
const dirs = applicationController.prototype.readdirSync(url, Config.ignore);
console.log(dirs)
debugger;
