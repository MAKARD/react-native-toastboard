// @flow
import PropTypes from "prop-types";

import { BaseAnimation, SlideY } from "../../../animations";
import type { BaseAnimationInterface } from "../../../animations";

import { ToasterStyles } from "./ToasterStyles";

export interface ToasterProps {
	onHide?: ?() => void;
	onShow?: ?() => void;

	animation: BaseAnimationInterface;

	duration?: number;
	delayBetween?: number;

	children?: (item: { type: string, message: string }) => React$Node;
	middleware?: (item: { type: string, message: string, duration?: number }) => string;

	hideOnPress?: boolean;

	style?: any;
}

export const ToasterPropTypes = {
	onHide: PropTypes.func,
	onShow: PropTypes.func,

	animation: PropTypes.instanceOf(BaseAnimation).isRequired,

	duration: PropTypes.number,
	delayBetween: PropTypes.number,

	children: PropTypes.func,

	hideOnPress: PropTypes.bool
};

export const ToasterDefaultProps = {
	/* eslint-disable-next-line no-magic-numbers */
	animation: new SlideY(-57, 0),

	duration: 10000,

	style: ToasterStyles.container
};
