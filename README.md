# React-Native-Toastboard

[![Build Status](https://travis-ci.org/MAKARD/react-native-toastboard.svg?branch=master)](https://travis-ci.org/MAKARD/react-native-toastboard)
[![codecov](https://codecov.io/gh/MAKARD/react-native-toastboard/branch/master/graph/badge.svg)](https://codecov.io/gh/MAKARD/react-native-toastboard)

Toast feedback messages for React Native

# Installation

## Via NPM

```bash
 npm install react-native-toastboard
```

# Public interface

## < Toaster />

`Toaster` component is represents container wich displays messages.

Accepts following props: 

`onHide` - callback that executes `AFTER` hide message. `Optional`.
Takes native event as first argument and `message item` as second argument.

`onShow` - callback that executes `BEFORE` show message. `Optional`.
Takes native event as first argument and [message item](#Message-item) as second argument.

`onPress` - callback that executes on container press. `Optional`.
Takes native event as first argument and [message item](#Message-item) as second argument.

`onHoldStart` - callback that executes on container press and hold. `Optional`.
Takes native event as first argument and [message item](#Message-item) as second argument.

`onHoldEnd` - callback that executes on container press and release. `Optional`.
Takes native event as first argument and [message item](#Message-item) as second argument.

`duration` - specifies `common` display time in `msec` for message. `Optional`. Default - `2000`.

`delayBetween` - specifies delay time in `msec` between showing messages. `Optional`. Default - `0`.

`hideOnPress` - specifies that message should hide on press it. `Optional`. Default - `false`.

`style` - specifies styles for container. `Optional`. Default - [ToasterStyles](./src/components/Toaster/ToasterStyles.js)

`animation` - specifies animation that applies to hide/show message. `Optional`. Default - [SlideY](./animations/SlideY.js). See more details below.

`middleware` - executes before message will be added to queue. Should return `string`. `Optional`. 
Takes [message item](#Message-item) as argument.

`Toaster` can takes children only as `function`:
```ts
(item: { type: string; message: string }) => React.ReactNode;
```

In this case, default `Toast` will be replaced with returned component.

*NOTE: To stop hiding timer, you can tap and hold touch on container as long as you want*

##### Message item

Message item represents following interface:

```ts
item: {
	message: string;
	type: "INFO" | "ERROR" | "SUCCESS" | "DEBUG";
	duration?: number;
}
```

#### Creating message

`Toaster` created around `singleton` pattern. So make sure that you have only one instance.

`Toaster` have several static methods, that creates messages:

```ts
/*
	first argument specifies message. REQUIRED.
	second argument specifies duration. OPTIONAL. By default - value from props.
*/

Toaster.info("message", 500);
Toaster.error("message", 500);
Toaster.success("message", 500);
Toaster.debug("message", 500);
```

## Animation

There are several built-in animations: 

 - [Opacity](./animations/Opacity.js)
 - [SlideX](./animations/SlideX.js)
 - [SlideY](./animations/SlideY.js)

```ts
/*
	first argument specifies start animation value. REQUIRED.
	second argument specifies end animation value. REQUIRED.
	third argument specifies anmation config. This is same config as in AnimationTimingConfig. OPTIONAL. (https://facebook.github.io/react-native/docs/animated)
*/
new Opacity(0, 1,{
		duration: 250,
		useNativeDriver: true
	});
```

Each of them extends and implements `BaseAnimation`. So if you want to create custom animation, make sure you correctly implement it:

```tsx
import { BaseAnimation } from "react-native-toastboard/animations";
import { Animated } from "react-native";

class MyCustomAnimation extends BaseAnimation {
	/*
		1. Animated.timing SHOULD BE WRAPPED INTO PROMISE.
		2. getAnimation SHOULD RETURN VALID OBJECT STYLES.
	*/
	
	// start animation forward
	forward() {
		return new Promise((resolve) => {
			Animated.timing(this.value, {
				toValue: this.from,
				...this.config
			}).start(resolve);
		});
	}

	// start animation backward
	backward() {
		return new Promise((resolve) => {
			Animated.timing(this.value, {
				toValue: this.from,
				...this.config
			}).start(resolve);
		});
	}
	
	// applies animation to container
	getAnimation() {
		return {
			transform: [{ scale: this.value }]
		};
	}
}

// ...

<Toaster animation={new MyCustomAnimation(-2, 15)} />
```

*NOTE: import animations from `/animations` subdirectory*
