// @flow
import { Animated } from "react-native";

interface AnimationConfig {
	easing?: (value: number) => number;
	deceleration?: number;
	duration?: number;
	delay?: number;
}

export interface BaseAnimationInterface {
	forward: () => Promise<void>;
	backward: () => Promise<void>;
	getAnimation: () => any;
}

export class BaseAnimation {
	config: AnimationConfig = {
		duration: 250,
		useNativeDriver: true
	};

	from: number;
	to: number;

	value: any;

	constructor(from: number, to: number, config?: AnimationConfig) {
		config !== undefined && (this.config = config);
		this.from = from;
		this.to = to;

		this.value = new Animated.Value(this.from);
	}
}
