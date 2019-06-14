// @flow
import * as React from "react";
import { View, Text } from "react-native";

import { ToastPropTypes } from "./ToastPropTypes";
import { ToastStyles } from "./ToastStyles";

import type { ToastProps } from "./ToastPropTypes";

export const Toast = (props: ToastProps) => (
	<View style={ToastStyles[props.type].container}>
		<Text style={ToastStyles[props.type].message}>
			{props.message}
		</Text>
	</View>
);

Toast.propTypes = ToastPropTypes;
