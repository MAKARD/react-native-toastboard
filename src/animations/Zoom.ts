import { BaseAnimation, ToasterAnimation } from './BaseAnimation';

export class Zoom extends BaseAnimation implements ToasterAnimation {
  styles = {
    transform: [{ scale: this.value }],
  };
}
