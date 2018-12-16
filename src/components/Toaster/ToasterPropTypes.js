// @flow
import PropTypes from "prop-types";

// $FlowFixMe
import { BaseAnimation, SlideUp } from "react-native-toastboard/animations";
// $FlowFixMe
import type { BaseAnimationInterface } from "react-native-toastboard/animations";

export interface ToasterProps {
	onHide?: ?() => void;
	onShow?: ?() => void;

	animation: BaseAnimationInterface;
	duration?: number;

	delayBetween?: number;

	style?: any;
}

export const ToasterPropTypes = {
	onHide: PropTypes.func,
	onShow: PropTypes.func,

	duration: PropTypes.number,

	delayBetween: PropTypes.number,

	animation: PropTypes.instanceOf(BaseAnimation).isRequired
};

export const ToasterDefaultProps = {
	/* eslint-disable-next-line no-magic-numbers */
	animation: new SlideUp(-50, 0),

	duration: 2000,

	style: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,

		zIndex: 1,
	}
};
