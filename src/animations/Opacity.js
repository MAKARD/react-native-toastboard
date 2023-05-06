"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opacity = void 0;
const BaseAnimation_1 = require("./BaseAnimation");
class Opacity extends BaseAnimation_1.BaseAnimation {
    constructor() {
        super(...arguments);
        this.styles = {
            opacity: this.value,
        };
    }
}
exports.Opacity = Opacity;
