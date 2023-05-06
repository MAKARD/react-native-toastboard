import { BaseAnimation, ToasterAnimation } from './BaseAnimation';

export class SlideX extends BaseAnimation implements ToasterAnimation {
  styles = {
    transform: [{ translateX: this.value }],
  };
}
