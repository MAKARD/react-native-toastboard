// @flow
import * as React from "react";
import { Animated, TouchableOpacity } from "react-native";

import { Queue } from "../../utils/Queue";
import { wait } from "../../utils/wait";

import { Toast, ToastType } from "../Toast";

import { ToasterPropTypes, ToasterDefaultProps } from "./ToasterPropTypes";
import type { ToasterProps } from "./ToasterPropTypes";

/* eslint-disable-next-line no-unused-vars */
const unmountedHandler = function (message: string, type: string, duration?: number) {
	/* eslint-disable-next-line no-console */
	console.warn("Toaster should be rendered before creating message");
};

let createToast = unmountedHandler;

export class Toaster extends React.PureComponent<ToasterProps> {
	static propTypes = ToasterPropTypes;
	static defaultProps = ToasterDefaultProps;

	static info = function (message: string, duration?: number) {
		createToast(message, ToastType.INFO, duration);
	}

	static error = function (message: string, duration?: number) {
		createToast(message, ToastType.ERROR, duration);
	}

	static success = function (message: string, duration?: number) {
		createToast(message, ToastType.SUCCESS, duration);
	}

	static debug = function (message: string, duration?: number) {
		createToast(message, ToastType.DEBUG, duration);
	}

	constructor(props: ToasterProps) {
		super(props);

		this.queue = new Queue({
			onIteration: this.handleIteration,
			beforeIteration: () => this.forceUpdate()
		});
	}

	componentDidMount() {
		createToast = (message: string, type: string, duration?: number) => {
			this.queue.push({ message, type, duration });
			this.queue.start();
		};
	}

	componentWillUnmount() {
		createToast = unmountedHandler;
		this.queue.stop();
	}

	render() {
		return (
			<Animated.View style={[this.props.style, this.props.animation.getAnimation()]}>
				{this.props.hideOnPress
					? (
						<TouchableOpacity onPress={this.handlePress}>
							{this.Toast}
						</TouchableOpacity>
					)
					: this.Toast}
			</Animated.View>
		);
	}

	get Toast() {
		if (!this.queue.list.length) {
			return null;
		}

		if (this.props.children) {
			return this.props.children({
				type: this.queue.list[0].type,
				message: this.queue.list[0].message
			});
		}

		return (
			<Toast
				type={this.queue.list[0].type}
				message={this.queue.list[0].message}
			/>
		);
	}

	queue: Queue;

	nextItem: (() => void) | void

	handlePress = () => {
		if (!this.nextItem) {
			return;
		}

		this.nextItem();
		this.nextItem = undefined;
	}

	handleIteration = async (item: any) => {
		this.props.onShow && this.props.onShow();
		await this.props.animation.forward();

		await wait(item.duration || this.props.duration, (resolve) => {
			this.nextItem = () => resolve();
		});
		this.nextItem = undefined;

		await this.props.animation.backward();
		this.props.onHide && this.props.onHide();

		if (this.props.delayBetween) {
			await wait(this.props.delayBetween);
		}
	}
}
