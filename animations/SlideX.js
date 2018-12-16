// @flow
import { Animated } from "react-native";
import { BaseAnimation } from "./BaseAnimation";
import type { BaseAnimationInterface } from "./BaseAnimation";

export class SlideX extends BaseAnimation implements BaseAnimationInterface {
	forward = (): Promise<void> => {
		return new Promise((resolve) => {
			Animated.timing(this.value, {
				toValue: this.to,
				...this.config
			}).start(resolve);
		});
	}

	backward = (): Promise<void> => {
		return new Promise((resolve) => {
			Animated.timing(this.value, {
				toValue: this.from,
				...this.config
			}).start(resolve);
		});
	}

	getAnimation = () => {
		return {
			transform: [{ translateX: this.value }]
		};
	}
}
