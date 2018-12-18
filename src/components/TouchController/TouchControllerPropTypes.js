// @flow
import PropTypes from "prop-types";

export interface TouchControllerProps {
	pressEventDuration?: number;

	onPress: () => void;
	onHoldEnd: () => void;
	onHoldStart: () => void;

	children: React$Node;
}

export const TouchControllerPropTypes = {
	pressEventDuration: PropTypes.number,

	onHoldEnd: PropTypes.func.isRequired,
	onHoldStart: PropTypes.func.isRequired
};

export const TouchControllerDefaultProps = {
	pressEventDuration: 200
};
