# AnimatedBottomBar

A professional, minimalist animated bottom navigation bar for React Native with smooth spring animations. Features a central expandable plus button that reveals additional actions.

## Features

- 🎯 **Minimalist Design**: Clean, professional appearance that fits any app
- 🚀 **Smooth Animations**: Powered by `react-native-reanimated` v3 with spring physics
- 📱 **Responsive**: Adapts to light/dark themes and safe area constraints
- ♿ **Accessible**: Full accessibility support with proper labels and hit targets
- 🎨 **Customizable**: Configurable colors and callback functions
- 📦 **Zero Dependencies**: Uses only peer dependencies you likely already have

## Installation

This component requires the following peer dependencies:

```bash
npm install react-native-reanimated react-native-safe-area-context @expo/vector-icons
```

For Expo projects, these are typically already installed.

## Usage

### Basic Implementation

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedBottomBar } from './components/AnimatedBottomBar';

export default function App() {
  const handlePlusPress = () => {
    console.log('Plus button pressed!');
    // Add your logic here
  };

  return (
    <View style={styles.container}>
      {/* Your app content */}
      
      <AnimatedBottomBar
        onPressPlus={handlePlusPress}
        activeColor="#007AFF"
        inactiveColor="#8E8E93"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Advanced Configuration

```tsx
<AnimatedBottomBar
  onPressPlus={() => {
    // Handle plus button press
    console.log('Input opened/closed');
  }}
  onSubmitInput={(text) => {
    // Handle input submission
    console.log('User input:', text);
    // Process the text (send to API, navigate, etc.)
  }}
  activeColor="#FF6B35"
  inactiveColor="#A0A0A0"
  backgroundColor="#F8F9FA"
  inputPlaceholder="What would you like to do?"
/>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPressPlus` | `() => void` | `undefined` | Callback triggered after plus button animation completes |
| `onSubmitInput` | `(text: string) => void` | `undefined` | Callback triggered when input is submitted |
| `activeColor` | `string` | `'#007AFF'` | Color for active/highlighted icons and send button |
| `inactiveColor` | `string` | `'#8E8E93'` | Color for inactive icons |
| `backgroundColor` | `string` | Auto (theme-based) | Background color of the bottom bar and input area |
| `inputPlaceholder` | `string` | `'Ask me about your expenses...'` | Placeholder text for the input field |

### Animation Behavior

**Collapsed State (Default):**
```
┌── Home ── Receipt ── [ + ] ── Sparkles ── Wallet ──┐
```

**Expanded State (After Plus Press):**
- The entire page lifts up smoothly
- An input field appears with "Ask me about your expenses..." placeholder
- The plus button rotates 45° to become a close (✖) button
- A semi-transparent overlay appears behind the content

```
┌─────── Input Field with Send Button ──────────┐
┌── Home ── Receipt ── [ ✖ ] ── Sparkles ── Wallet ──┐
```

### Animation Details

- **Page Lift**: Entire content smoothly lifts up by 120px when expanded
- **Plus Button**: Transforms from pill shape to circle with 45° rotation
- **Input Field**: Fades in with subtle translate animation from bottom
- **Overlay**: Semi-transparent background fades in/out
- **Keyboard Handling**: Automatic keyboard avoidance on iOS/Android
- **Duration**: ~300ms with spring physics
- **Performance**: Optimized for 60fps on all devices

## Customization

### Icon Configuration

The component uses a predefined set of icons that can be customized in `icons.ts`:

```tsx
export const ICON_CONFIG: Record<IconName, IconConfig> = {
  home: { name: 'home', family: 'Ionicons', size: 24 },
  receipt: { name: 'receipt', family: 'MaterialIcons', size: 24 },
  wallet: { name: 'account-balance-wallet', family: 'MaterialIcons', size: 24 },
  sparkles: { name: 'sparkles', family: 'Ionicons', size: 24 },
  plus: { name: 'add', family: 'Ionicons', size: 24 },
  close: { name: 'close', family: 'Ionicons', size: 24 },
};
```

### Animation Constants

Fine-tune animations in `icons.ts`:

```tsx
export const CONSTANTS = {
  BAR_HEIGHT: 80,
  PILL_HEIGHT: 44,
  ANIMATION_DURATION: 300,
  SPRING_CONFIG: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
};
```

## Accessibility

The component includes comprehensive accessibility support:

- **Roles**: All interactive elements have proper `button` roles
- **Labels**: Descriptive labels for screen readers
- **Hit Targets**: Generous hit areas (44x44pt minimum)
- **State Announcements**: Dynamic labels based on expanded state

## Theming

Automatic theme support:

- **Light Mode**: White background (`#FFFFFF`)
- **Dark Mode**: Dark background (`#1C1C1E`)
- **Custom**: Override with `backgroundColor` prop

## Performance

- **Optimized Animations**: Uses `react-native-reanimated` for 60fps performance
- **Minimal Re-renders**: Efficient state management
- **Memory Efficient**: No memory leaks or unnecessary allocations

## Browser/Platform Support

- ✅ iOS
- ✅ Android  
- ✅ Expo
- ✅ React Native >= 0.73

## License

MIT License - feel free to use in your projects!

## Contributing

Contributions welcome! Please ensure all animations remain smooth and accessibility features are maintained. 