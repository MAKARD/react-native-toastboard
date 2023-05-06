"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zoom = void 0;
const BaseAnimation_1 = require("./BaseAnimation");
class Zoom extends BaseAnimation_1.BaseAnimation {
    constructor() {
        super(...arguments);
        this.styles = {
            transform: [{ scale: this.value }],
        };
    }
}
exports.Zoom = Zoom;
