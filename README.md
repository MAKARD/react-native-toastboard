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
