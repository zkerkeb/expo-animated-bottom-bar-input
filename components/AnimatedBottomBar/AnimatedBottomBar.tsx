import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    AccessibilityRole,
    Pressable,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBottomBar } from './BottomBarProvider';
import { CONSTANTS, ICON_CONFIG } from './icons';
import { AnimatedBottomBarProps, IconName } from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Professional AnimatedBottomBar component with smooth spring animations
 * Features a minimalist design with a central expandable plus button
 */
export function AnimatedBottomBar({
  onPressPlus,
  activeColor = '#007AFF',
  inactiveColor = '#8E8E93',
  backgroundColor,
}: Omit<AnimatedBottomBarProps, 'onSubmitInput' | 'inputPlaceholder'>) {
  const { isExpanded, toggleExpanded } = useBottomBar();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const defaultBackgroundColor = backgroundColor || 
    (colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF');

  /**
   * Handles the plus button press
   */
  const handlePlusPress = () => {
    toggleExpanded();
    
    // Trigger callback after animation starts
    setTimeout(() => {
      onPressPlus?.();
    }, 50);
  };

  /**
   * Renders an icon based on the icon configuration
   */
  const renderIcon = (iconName: IconName, color: string) => {
    const config = ICON_CONFIG[iconName];
    const IconComponent = config.family === 'Ionicons' ? Ionicons : MaterialIcons;
    
    return (
      <IconComponent
        name={config.name as any}
        size={config.size}
        color={color}
      />
    );
  };

  /**
   * Animated styles for the central plus button container
   */
  const pillAnimatedStyle = useAnimatedStyle(() => {
    const width = withSpring(
      isExpanded ? CONSTANTS.CIRCLE_SIZE : CONSTANTS.PILL_WIDTH,
      CONSTANTS.SPRING_CONFIG
    );
    const borderRadius = withSpring(
      isExpanded ? CONSTANTS.CIRCLE_SIZE / 2 : CONSTANTS.PILL_HEIGHT / 2,
      CONSTANTS.SPRING_CONFIG
    );
    
    return {
      width,
      borderRadius,
    };
  });

  /**
   * Animated styles for the plus icon rotation
   */
  const plusIconAnimatedStyle = useAnimatedStyle(() => {
    const rotation = withSpring(
      isExpanded ? 45 : 0,
      CONSTANTS.SPRING_CONFIG
    );
    
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: CONSTANTS.BAR_HEIGHT + insets.bottom,
      backgroundColor: defaultBackgroundColor,
      paddingBottom: insets.bottom,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 1002, // Above the input container
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
    },
    leftIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 100,
    },
    rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 100,
    },
    plusContainer: {
      height: CONSTANTS.PILL_HEIGHT,
      backgroundColor: '#2C2C2E',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left Icons */}
        <View style={styles.leftIcons}>
          <Pressable
            style={styles.iconContainer}
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Home"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            {renderIcon('home', inactiveColor)}
          </Pressable>
          
          <Pressable
            style={styles.iconContainer}
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Receipt"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            {renderIcon('receipt', inactiveColor)}
          </Pressable>
        </View>

        {/* Central Plus Button */}
        <AnimatedPressable
          style={[styles.plusContainer, pillAnimatedStyle]}
          onPress={handlePlusPress}
          accessibilityRole={'button' as AccessibilityRole}
          accessibilityLabel={isExpanded ? 'Close input' : 'Open input'}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Animated.View style={plusIconAnimatedStyle}>
            {renderIcon(isExpanded ? 'close' : 'plus', '#FFFFFF')}
          </Animated.View>
        </AnimatedPressable>

        {/* Right Icons */}
        <View style={styles.rightIcons}>
          <Pressable
            style={styles.iconContainer}
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Sparkles"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            {renderIcon('sparkles', inactiveColor)}
          </Pressable>
          
          <Pressable
            style={styles.iconContainer}
            accessibilityRole={'button' as AccessibilityRole}
            accessibilityLabel="Wallet"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            {renderIcon('wallet', inactiveColor)}
          </Pressable>
        </View>
      </View>
    </View>
  );
} 