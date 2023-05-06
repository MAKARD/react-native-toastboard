"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideX = void 0;
const BaseAnimation_1 = require("./BaseAnimation");
class SlideX extends BaseAnimation_1.BaseAnimation {
    constructor() {
        super(...arguments);
        this.styles = {
            transform: [{ translateX: this.value }],
        };
    }
}
exports.SlideX = SlideX;
