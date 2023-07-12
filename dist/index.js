"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const port = 5001;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // if (!process.env.JWT_KEY) {
    //   throw new Error("jwt key dose not exist");
    // }
    // try {
    //   await mongoose.connect("mongodb://127.0.0.1:27017/e-sme");
    //   console.log("connected");
    // } catch (error) {
    //   console.error(error);
    // }
    app_1.app.listen(port, () => {
        console.log(`Main Route on ${port}!!!!`);
    });
});
start();
//# sourceMappingURL=index.js.map