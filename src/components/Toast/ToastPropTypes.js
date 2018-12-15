// @flow
import PropTypes from "prop-types";

export interface ToastProps {
	message: string;
	type: $Keys<typeof ToastType>;
}

export const ToastType = {
	INFO: "INFO",
	ERROR: "ERROR",
	DEBUG: "DEBUG",
	SUCCESS: "SUCCESS",
};

export const ToastPropTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(Object.keys(ToastType)).isRequired
};
