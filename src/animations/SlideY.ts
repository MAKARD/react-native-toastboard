import { BaseAnimation, ToasterAnimation } from './BaseAnimation';

export class SlideY extends BaseAnimation implements ToasterAnimation {
  styles = {
    transform: [{ translateY: this.value }],
  };
}
