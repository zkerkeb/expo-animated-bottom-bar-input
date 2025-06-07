import { Ionicons } from '@expo/vector-icons';
import React, { createContext, useContext, useRef, useState } from 'react';
import {
    AccessibilityRole,
    Pressable,
    StyleSheet,
    TextInput,
    useColorScheme,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CONSTANTS } from './icons';



interface BottomBarContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
  inputText: string;
  setInputText: (text: string) => void;
  handleSubmitInput: () => void;
  onSubmitInput?: (text: string) => void;
  activeColor: string;
  inputPlaceholder: string;
}

const BottomBarContext = createContext<BottomBarContextType | null>(null);

export const useBottomBar = () => {
  const context = useContext(BottomBarContext);
  if (!context) {
    throw new Error('useBottomBar must be used within a BottomBarProvider');
  }
  return context;
};

interface BottomBarProviderProps {
  children: React.ReactNode;
  onSubmitInput?: (text: string) => void;
  activeColor?: string;
  inputPlaceholder?: string;
}

export function BottomBarProvider({
  children,
  onSubmitInput,
  activeColor = '#007AFF',
  inputPlaceholder = 'Ask me about your expenses...',
}: BottomBarProviderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  
  // Shared values for animations
  const translateY = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  const toggleExpanded = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    if (newExpandedState) {
      // Expand: lift the page and show input
      translateY.value = withSpring(-CONSTANTS.INPUT_HEIGHT, CONSTANTS.OVERLAY_SPRING_CONFIG);
      overlayOpacity.value = withSpring(1, CONSTANTS.OVERLAY_SPRING_CONFIG);
      
      // Focus input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    } else {
      // Collapse: lower the page and hide input
      translateY.value = withSpring(0, CONSTANTS.OVERLAY_SPRING_CONFIG);
      overlayOpacity.value = withSpring(0, CONSTANTS.OVERLAY_SPRING_CONFIG);
      
      // Clear input and blur
      setInputText('');
      inputRef.current?.blur();
    }
  };

  const handleSubmitInput = () => {
    console.log('BottomBarProvider - handleSubmitInput called with:', inputText);
    if (inputText.trim()) {
      console.log('BottomBarProvider - Calling onSubmitInput with:', inputText.trim());
      onSubmitInput?.(inputText.trim());
      setInputText('');
      toggleExpanded(); // Close the input
    } else {
      console.log('BottomBarProvider - Input text is empty, not submitting');
    }
  };

  /**
   * Animated styles for the page container (lifts entire content)
   */
  const pageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  /**
   * Animated styles for the overlay background
   */
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  /**
   * Animated styles for input container (drawer effect)
   */
  const inputContainerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = withSpring(
      isExpanded ? -CONSTANTS.INPUT_HEIGHT - insets.bottom : 0, // Inverse l'animation
      CONSTANTS.OVERLAY_SPRING_CONFIG
    );
    
    return {
      transform: [{ translateY }],
    };
  });

  const styles = StyleSheet.create({
    container: {
        paddingTop: insets.top,
      flex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 1000,
    },
    pageContainer: {
      flex: 1,
    },
    inputContainer: {
      position: 'absolute',
      bottom: -CONSTANTS.INPUT_HEIGHT - insets.bottom, // Positionné sous la barre
      left: 0,
      right: 0,
      height: CONSTANTS.INPUT_HEIGHT + insets.bottom,
      backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: insets.bottom + 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 12,
      zIndex: 1002, // AU-DESSUS de l'overlay !
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#2C2C2E' : '#F2F2F7',
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 10, // Réduit de 12 à 10
      minHeight: 44, // Réduit de 48 à 44
      zIndex: 1003, // Même niveau que le send button
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      fontFamily: 'System',
    },
    sendButton: {
      width: 40, // Augmenté pour être plus cliquable
      height: 40, // Augmenté pour être plus cliquable
      borderRadius: 20,
      backgroundColor: activeColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
      zIndex: 1003, // Le plus haut de tous
    },
  });

  const contextValue: BottomBarContextType = {
    isExpanded,
    toggleExpanded,
    inputText,
    setInputText,
    handleSubmitInput,
    onSubmitInput,
    activeColor,
    inputPlaceholder,
  };

  return (
    <BottomBarContext.Provider value={contextValue}>
      <View style={styles.container}>
        {/* Overlay - Only when expanded */}
        {isExpanded && (
          <Animated.View 
            style={[styles.overlay, overlayAnimatedStyle]}
          >
            <Pressable 
              style={{ flex: 1 }} 
              onPress={toggleExpanded}
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel="Close input"
            />
          </Animated.View>
        )}

        {/* Page Container with lift animation */}
        <Animated.View style={[styles.pageContainer, pageAnimatedStyle]}>
          {children}
        </Animated.View>

        {/* Input Container - Below everything */}
        <Animated.View style={[styles.inputContainer, inputContainerAnimatedStyle]}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputText}
              onChangeText={(text) => {
                console.log('BottomBarProvider - Text changed to:', text);
                setInputText(text);
              }}
              placeholder={inputPlaceholder}
              placeholderTextColor={colorScheme === 'dark' ? '#8E8E93' : '#8E8E93'}
              multiline
              maxLength={200}
              returnKeyType="send"
              onSubmitEditing={() => {
                console.log('BottomBarProvider - onSubmitEditing triggered');
                handleSubmitInput();
              }}
              accessibilityLabel="Input field"
            />
            <Pressable
              style={styles.sendButton}
              onPress={() => {
                console.log('BottomBarProvider - Send button pressed');
                handleSubmitInput();
              }}
              accessibilityRole={'button' as AccessibilityRole}
              accessibilityLabel="Send message"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="send" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </BottomBarContext.Provider>
  );
} 