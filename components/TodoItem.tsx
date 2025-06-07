import { TodoItem as TodoItemType } from '@/hooks/useTodoList';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
    AccessibilityRole,
    Pressable,
    StyleSheet,
    useColorScheme,
    View
} from 'react-native';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TodoItem({ item, onToggle }: TodoItemProps) {
  const colorScheme = useColorScheme();
  const checkAnimation = useSharedValue(item.completed ? 1 : 0);
  const strikethroughAnimation = useSharedValue(item.completed ? 1 : 0);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    checkAnimation.value = withSpring(item.completed ? 1 : 0, {
      damping: 15,
      stiffness: 200,
    });
    strikethroughAnimation.value = withTiming(item.completed ? 1 : 0, {
      duration: 400,
    });
  }, [item.completed, checkAnimation, strikethroughAnimation]);

  const handlePress = () => {
    // Subtle opacity animation on press instead of scale
    scaleAnimation.value = withSpring(0.7, { duration: 60 }, () => {
      scaleAnimation.value = withSpring(1, { duration: 100 });
    });
    onToggle(item.id);
  };

  /**
   * Animated styles for the check circle
   */
  const checkAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(checkAnimation.value, [0, 1], [1, 1.1]);
    const backgroundColor = interpolateColor(
      checkAnimation.value,
      [0, 1],
      ['transparent', '#007AFF']
    );
    const borderColor = interpolateColor(
      checkAnimation.value,
      [0, 1],
      [
        colorScheme === 'dark' ? '#444444' : '#CCCCCC',
        '#007AFF'
      ]
    );

    return {
      backgroundColor,
      borderColor,
      transform: [{ scale }],
    };
  });

  /**
   * Animated styles for the check icon
   */
  const checkIconAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(checkAnimation.value, [0, 0.6, 1], [0, 0, 1]);
    const scale = interpolate(checkAnimation.value, [0, 1], [0.3, 1]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  /**
   * Animated styles for the text with opacity change
   */
  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(strikethroughAnimation.value, [0, 1], [1, 0.5]);
    
    return {
      opacity,
    };
  });

  /**
   * Animated styles for the item container
   */
  const itemAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: scaleAnimation.value,
    };
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 24,
      marginHorizontal: 0,
      marginVertical: 2,
    },
    checkContainer: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
      position: 'relative',
      justifyContent: 'center',
    },
    text: {
      fontSize: 17,
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      fontFamily: 'System',
      lineHeight: 22,
    },
    textCompleted: {
      textDecorationLine: 'line-through',
      textDecorationColor: colorScheme === 'dark' ? '#666666' : '#999999',
    },
  });

  return (
    <AnimatedPressable
      style={[styles.container, itemAnimatedStyle]}
      onPress={handlePress}
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityLabel={`${item.completed ? 'Completed' : 'Incomplete'} task: ${item.text}`}
    >
      {/* Animated Check Circle */}
      <Animated.View style={[styles.checkContainer, checkAnimatedStyle]}>
        <Animated.View style={checkIconAnimatedStyle}>
          <Ionicons 
            name="checkmark" 
            size={12} 
            color="#FFFFFF" 
          />
        </Animated.View>
      </Animated.View>

      {/* Text with Strikethrough */}
      <View style={styles.textContainer}>
        <Animated.Text style={[
          styles.text, 
          textAnimatedStyle,
          item.completed && styles.textCompleted
        ]}>
          {item.text}
        </Animated.Text>
      </View>
    </AnimatedPressable>
  );
} 