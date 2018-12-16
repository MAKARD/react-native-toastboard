import { StyleSheet } from "react-native";

import { ToastType } from "./ToastPropTypes";

export const ToastStyles = {
	[ToastType.INFO]: StyleSheet.create({
		container: {
			backgroundColor: "blue",

			padding: 20
		},
		message: {
			color: "#fff",

			textAlign: "center"
		}
	}),
	[ToastType.ERROR]: StyleSheet.create({
		container: {
			backgroundColor: "red",

			padding: 20
		},
		message: {
			color: "#fff",

			textAlign: "center"
		}
	}),
	[ToastType.SUCCESS]: StyleSheet.create({
		container: {
			backgroundColor: "green",

			padding: 20
		},
		message: {
			color: "#fff",

			textAlign: "center"
		}
	}),
	[ToastType.DEBUG]: StyleSheet.create({
		container: {
			backgroundColor: "yellow",

			padding: 20
		},
		message: {
			color: "black",

			textAlign: "center"
		}
	})
};
