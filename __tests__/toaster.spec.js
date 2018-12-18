/* eslint-disable no-undef */
import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";

import { Toaster } from "../src";
import { BaseAnimation } from "../animations";

import { wait } from "../src/utils/wait";

const consoleOrigin = global.console;
const mockAnimation = (new class extends BaseAnimation {
    getAnimation = () => 1;
    forward = () => { };
    backward = () => { };
});

describe("<Toaster />", () => {
    beforeAll(() => {
        global.console = {
            ...consoleOrigin,
            warn: () => { }
        };
    });

    afterAll(() => {
        global.console = consoleOrigin;
    });

    test("Should render without <TouchableOpacity>", () => {
        const tree = renderer.create(<Toaster />);

        expect(tree.toJSON()).toMatchSnapshot();

        tree.unmount();
    });

    test("Should render with <TouchableOpacity>", () => {
        const tree = renderer.create(<Toaster hideOnPress />);

        expect(tree.toJSON()).toMatchSnapshot();

        tree.unmount();
    });

    test("Should render specified children instead default <Toast />", async () => {
        const tree = renderer.create(
            <Toaster animation={mockAnimation}>
                {({ message }) => <Text>{message}</Text>}
            </Toaster>
        );

        Toaster.info("test", 0);

        expect(tree.toJSON()).toMatchSnapshot();

        tree.unmount();
    });

    test("Should apply specified middleware", () => {
        const tree = renderer.create(
            <Toaster
                animation={mockAnimation}
                middleware={() => "transformed"}
            />
        );

        Toaster.info("test", 0);

        expect(tree.toJSON()).toMatchSnapshot();

        tree.unmount();
    });

    test("Should warn when try to create message if container not rendered", () => {
        const spy = jest.spyOn(console, "warn");

        Toaster.info("");
        Toaster.debug("");
        Toaster.error("");
        Toaster.success("");

        expect(spy).toHaveBeenCalledTimes(4);

        spy.mockClear();
    });

    test("Should re-define 'createToast' after mount", () => {
        const tree = renderer.create(
            <Toaster
                animation={mockAnimation}
            />
        );

        const spy = jest.spyOn(console, "warn");

        Toaster.info("");
        Toaster.debug("");
        Toaster.error("");
        Toaster.success("");

        expect(spy).not.toBeCalled();

        tree.unmount();
        spy.mockClear();
    });

    // test("Should execute 'nextItem' method if it exist onPress", () => {
    //     const instance = new Toaster({ animation: mockAnimation });
    //     instance.nextItem = () => { };

    //     const spy = jest.spyOn(instance, "nextItem");

    //     instance.handlePress();
    //     expect(spy).toHaveBeenCalledTimes(1);

    //     instance.handlePress();
    //     expect(spy).toHaveBeenCalledTimes(1);
    // });

    test("Should execute specified onShow/onHide props", async () => {
        let showed = false;
        let hided = false;

        const instance = new Toaster({
            animation: mockAnimation,
            onShow: () => { showed = true },
            onHide: () => { hided = true }
        });

        await instance.handleIteration({ duration: 0 });

        expect(showed).toBeTruthy();
        expect(hided).toBeTruthy();
    });

    test("Should add additional timeout specified in delayBetween prop", async () => {
        const spy = jest.spyOn(require("../src/utils/wait"), "wait");

        const instance = new Toaster({
            animation: mockAnimation,
            delayBetween: 1
        });

        await instance.handleIteration({ duration: 0 });

        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockClear();
    });

    // test("Should define 'nextItem' method on each iteration", async () => {
    //     const instance = new Toaster({
    //         animation: mockAnimation
    //     });

    //     instance.handleIteration({ duration: 2 });
    //     await wait(1);
    //     expect(instance.nextItem).toBeInstanceOf(Function);

    //     instance.nextItem();
    //     await wait(1);

    //     expect(instance.nextItem).toBeUndefined();
    // });
});
