"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideY = void 0;
const BaseAnimation_1 = require("./BaseAnimation");
class SlideY extends BaseAnimation_1.BaseAnimation {
    constructor() {
        super(...arguments);
        this.styles = {
            transform: [{ translateY: this.value }],
        };
    }
}
exports.SlideY = SlideY;
