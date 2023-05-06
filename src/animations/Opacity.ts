import { BaseAnimation, ToasterAnimation } from './BaseAnimation';

export class Opacity extends BaseAnimation implements ToasterAnimation {
  styles = {
    opacity: this.value,
  };
}
