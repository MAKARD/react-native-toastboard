// @flow
import * as React from "react";
import { TouchableOpacity } from "react-native";

import type { TouchControllerProps } from "./TouchControllerPropTypes";

import { TouchControllerPropTypes, TouchControllerDefaultProps } from "./TouchControllerPropTypes";

interface TouchControllerState {
	timestamp: number;
}

export class TouchController extends React.Component<TouchControllerProps, TouchControllerState> {
	static propTypes = TouchControllerPropTypes;
	static defaultProps = TouchControllerDefaultProps;

	timer: TimeoutID;

	state = {
		timestamp: 0
	};

	render() {
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPressIn={this.handlePressIn}
				onPressOut={this.hanldePressOut}
			>
				{this.props.children}
			</TouchableOpacity>
		);
	}

	get isPressEvent(): boolean {
		return (this.state.timestamp + this.props.pressEventDuration) >= Date.now();
	}

	handlePressIn = () => {
		clearTimeout(this.timer);

		this.setState({
			timestamp: Date.now()
		});

		this.timer = setTimeout(this.props.onHoldStart, this.props.pressEventDuration);
	}

	hanldePressOut = () => {
		if (this.isPressEvent) {
			clearTimeout(this.timer);

			return this.props.onPress();
		}

		this.props.onHoldEnd();
	}
}
