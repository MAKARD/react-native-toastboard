// @flow
import PropTypes from "prop-types";

import { BaseAnimation, SlideY } from "../../../animations";
import type { BaseAnimationInterface } from "../../../animations";

import { ToasterStyles } from "./ToasterStyles";

interface Item {
	type: string;
	message: string;
	duration?: ?number;
}

export interface ToasterProps {
	onHide?: (item: Item) => void;
	onShow?: (item: Item) => void;

	onPress?: (event: any, item: Item) => void;
	onHoldEnd?: (event: any, item: Item) => void;
	onHoldStart?: (event: any, item: Item) => void;

	animation: BaseAnimationInterface;

	duration?: number;
	delayBetween?: number;

	children?: (item: Item) => React$Node;
	middleware?: (item: Item) => string;

	hideOnPress?: boolean;

	style?: any;
}

export const ToasterPropTypes = {
	onHide: PropTypes.func,
	onShow: PropTypes.func,

	onPress: PropTypes.func,
	onHoldEnd: PropTypes.func,
	onHoldStart: PropTypes.func,

	animation: PropTypes.instanceOf(BaseAnimation).isRequired,

	duration: PropTypes.number,
	delayBetween: PropTypes.number,

	children: PropTypes.func,

	hideOnPress: PropTypes.bool
};

export const ToasterDefaultProps = {
	/* eslint-disable-next-line no-magic-numbers */
	animation: new SlideY(-57, 0),

	duration: 2000,

	style: ToasterStyles.container
};
