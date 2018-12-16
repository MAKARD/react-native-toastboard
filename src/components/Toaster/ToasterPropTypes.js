// @flow4
import PropTypes from "prop-types";

import { BaseAnimation, SlideUp } from "../../animations";
import type { BaseAnimationInterface } from "../../animations/BaseAnimation";

export interface ToasterProps {
	onHide?: ?() => void;
	onShow?: ?() => void;

	animation: BaseAnimationInterface;
	duration?: number;

	children?: (item: { type: string, message: string }) => $React.Node;

	style?: any;
}

export const ToasterPropTypes = {
	onHide: PropTypes.func,
	onShow: PropTypes.func,

	children: PropTypes.func,

	duration: PropTypes.number,

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
