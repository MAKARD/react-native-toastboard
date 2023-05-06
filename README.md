[![codecov](https://codecov.io/gh/MAKARD/react-native-toastboard/branch/master/graph/badge.svg?token=8jbRRNixLc)](https://codecov.io/gh/MAKARD/react-native-toastboard)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/MAKARD/react-native-toastboard/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/MAKARD/react-native-toastboard/tree/master)

[Expo snack](https://snack.expo.io/@makard/react-native-toastboard)

# React-Native-Toastboard

Toast feedback messages for React Native

# Installation

## Via NPM

```bash
 npm install react-native-toastboard
```

## Via YARN

```bash
 yarn add react-native-toastboard
```

# Example

```jsx
const appearAnimation = new SlideX(Dimensions.get('screen').width, 0);
const holdAnimation = new Zoom(1, .95, { duration: 200, useNativeDriver: true });

const toastMiddleware = ({ type, message }: Item) => {
  if (type !== ToastType.ERROR) {
    return message;
  }

  if (typeof message === 'string') {
    return message;
  }

  if (message.response && message.response.data && message.response.data.message) {
    return message.response.data.message;
  } else {
    return 'Some error was happened :(';
  }
};

const renderToast = ({ type, message }: Item) => {
  switch (type) {
    case ToastType.INFO: {
      return (
        <Animated.View style={[styles.info.container, holdAnimation.styles]}>
          <Image
            resizeMode="cover"
            source={Images.iconFaq}
            style={styles.info.icon}
          />
          <Text style={styles.info.text}>{message}</Text>
        </Animated.View>
      );
    }

    case ToastType.ERROR: {
      return (
        <Animated.View style={[styles.error.container, this.holdAnimation.styles]}>
          <Image
            resizeMode="cover"
            source={Images.iconWarning}
            style={styles.error.icon}
          />
          <Text style={styles.error.text}>{message}</Text>
        </Animated.View>
      );
    }

    case ToastType.SUCCESS: {
      return (
        <Animated.View style={[styles.success.container, this.holdAnimation.styles]}>
          <Image
            resizeMode="cover"
            source={Images.iconCheck}
            style={styles.success.icon}
          />
          <Text style={styles.success.text}>{message}</Text>
        </Animated.View>
      );
    }

    default: {
      throw new Error('Unknown type given');
    }
  }
};

export const Example = () => {
  const onHide = () => {
    StatusBar.setHidden(false);
  };

  const onShow = () => {
    StatusBar.setHidden(true);
  };

  return (
    <Toaster
      hideOnPress

      onHide={onHide}
      onShow={onShow}
      onHoldEnd={holdAnimation.backward}
      onHoldStart={holdAnimation.forward}

      middleware={toastMiddleware}

      animation={appearAnimation}
    >
      {renderToast}
    </Toaster>
  );
};
```

# Public interface

## < Toaster />

`Toaster` component represents a container that displays messages.

Accepts the following props: 

`onHide` - a callback that executes `AFTER` message gets hidden. `Optional`.
Takes native event as the first argument and [message item](#Message-item) as the second argument.

`onShow` - a callback that executes `BEFORE` message gets shown. `Optional`.
Takes native event as the first argument and [message item](#Message-item) as the second argument.

`onPress` - a callback that executes on container press. `Optional`.
Takes native event as the first argument and [message item](#Message-item) as the second argument.

`onHoldStart` - a callback that executes when a user holds their touch on message. `Optional`.
Takes native event as the first argument and [message item](#Message-item) as the second argument.

`onHoldEnd` - a callback that executes when a user releases their touch from message after holding it. `Optional`.
Takes native event as the first argument and [message item](#Message-item) as the second argument.

`duration` - specifies `common` display time in `msec` for messages. `Optional`. Default - `2000`.

`delayBetween` - specifies delay time in `msec` between showing messages. `Optional`. Default - `0`.

`hideOnPress` - specifies that the message should be closed when a user touches it. `Optional`. Default - `false`.

`containerViewProps` - specifies props for the container's <View> element. `Optional`.

`animation` - specifies animation that applies to hide/show the message. `Optional`. Default - [SlideY](./src/animations/SlideY.ts). See more details below.

`middleware` - executes before the message will be added to a queue. Should return `string`. `Optional`. 
Takes [message item](#Message-item) as argument.

`Toaster` can take children only as `function`:
```ts
(item: { type: string; message: string }) => React.ReactNode;
```

In this case, the default `Toast` will be replaced with the returned component.

*NOTE: To stop hide-timer, you can tap and hold your touch on the container as long as you want*

##### Message item

Message item represents the following interface:

```ts
item: {
	message: string;
	type: "INFO" | "ERROR" | "SUCCESS" | "DEBUG";
	duration?: number;
}
```

#### Creating a message

`Toaster` is a `singleton`. So make sure that you have only one instance.

`Toaster` has several static methods for messages creation:

```ts
/*
	the first argument specifies the message. REQUIRED.
	the second argument specifies the duration. OPTIONAL. By default - value from props.
*/

Toaster.info("message", 500);
Toaster.error("message", 500);
Toaster.success("message", 500);
Toaster.debug("message", 500);
```

## Animation

There are several built-in animations: 

 - [Opacity](./src/animations/Opacity.ts)
 - [SlideX](./src/animations/SlideX.ts)
 - [SlideY](./src/animations/SlideY.ts)
 - [Zoom](./src/animations/Zoom.ts)

```ts
/*
	- the first argument specifies start-animation value. REQUIRED.
	- the second argument specifies end-animation value. REQUIRED.
	- the third argument specifies the animation config. This is the same config as in AnimationTimingConfig. OPTIONAL. (https://facebook.github.io/react-native/docs/animated)
*/
new Opacity(0, 1, {
		duration: 250,
		useNativeDriver: true
	});
```

Each animation extends `BaseAnimation` and implements `ToasterAnimation`. So if you want to create custom animation, make sure you correctly implement it:

```tsx
class MyCustomAnimation extends BaseAnimation implements ToasterAnimation {
	/*
		1. Animated.timing SHOULD BE WRAPPED INTO PROMISE.
		2. styles SHOULD RETURN VALID OBJECT STYLES.
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
	
	// applies animation to the container
	styles = {
		transform: [{ scale: this.value }]
	}
}

// ...

const animation = new MyCustomAnimation(-2, 15);

<Toaster animation={animation} />
```

*NOTE: Always create animation instances outside from the component body OR use memoisation*
