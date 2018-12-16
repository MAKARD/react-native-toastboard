// @flow
import PropTypes from "prop-types";

// $FlowFixMe
import { BaseAnimation, SlideUp } from "react-native-toastboard/animations";
// $FlowFixMe
import type { BaseAnimationInterface } from "react-native-toastboard/animations";

import { ToasterStyles } from "./ToasterStyles";

export interface ToasterProps {
	onHide?: ?() => void;
	onShow?: ?() => void;

	animation: BaseAnimationInterface;
	duration?: number;

	children?: (item: { type: string, message: string }) => React$Node;
	delayBetween?: number;

	style?: any;
}

export const ToasterPropTypes = {
	onHide: PropTypes.func,
	onShow: PropTypes.func,

	children: PropTypes.func,

	duration: PropTypes.number,

	delayBetween: PropTypes.number,

	animation: PropTypes.instanceOf(BaseAnimation).isRequired
};

export const ToasterDefaultProps = {
	/* eslint-disable-next-line no-magic-numbers */
	animation: new SlideUp(-57, 0),

	duration: 2000,

	style: ToasterStyles
};
