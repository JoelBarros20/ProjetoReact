import React from 'react';
import { ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut, Easing } from 'react-native-reanimated';

type AnimatedScreenProps = ViewProps & {
    children: React.ReactNode;
};

export default function AnimatedPages({ children, style, ...props }: AnimatedScreenProps) {
    return (
        <Animated.View
            style={style}
            entering={FadeIn.duration(500).easing(Easing.out(Easing.exp))}
            exiting={FadeOut.duration(300).easing(Easing.in(Easing.ease))}
            {...props}
        >
            {children}
        </Animated.View>
    );
}
