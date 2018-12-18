# React-Native-Toastboard

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

`onShow` - callback that executes `BEFORE` show message. `Optional`.

`duration` - specifies `common` display time in `msec` for message. `Optional`. Default - `2000`.

`delayBetween` - specifies delay time in `msec` between showing messages. `Optional`. Default - `0`.

`hideOnPress` - specifies that message should hide on press it. `Optional`. Default - `false`.

`style` - specifies styles for container. `Optional`. Default - [ToasterStyles](./src/components/Toaster/ToasterStyles.js)

`animation` - specifies animation that applies to hide/show message. `Optional`. Default - [SlideY](./animations/SlideY.js). See more details below.

`middleware` - executes before message will be added to queue. Should return `string`. `Optional`. 
Takes message item as argument:
```ts
item: {
	message: string;
	type: "INFO" | "ERROR" | "SUCCESS" | "DEBUG";
	duration?: number;
}
```

`Toaster` can takes children only as `function`:
```ts
(item: { type: string; message: string }) => React.ReactNode;
```

In this case, default `Toast` will be replaced with returned component.

## Animation

There are several built-in animations: 

 - [Opacity](./animations/Opacity)
 - [SlideX](./animations/SlideX)
 - [SlideY](./animations/SlideY)

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
