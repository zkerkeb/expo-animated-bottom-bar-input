# AnimatedBottomBar ✨

A beautiful, animated bottom navigation component for React Native with an expandable input field. Perfect for modern mobile applications.

![Demo](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## 🎥 Preview

The component features:
- **Pill-shaped navigation** that transforms into an input field
- **Smooth spring animations** using react-native-reanimated v3
- **Page lifting effect** when input is active
- **Clean, minimal design** with dark/light mode support
- **TypeScript** support out of the box
- **Accessibility** optimized

## 🚀 Features

- ✅ **Morphing Animation**: Pill to circle transformation
- ✅ **Input Integration**: Slide-up input field with send button
- ✅ **Spring Physics**: Smooth, natural animations
- ✅ **Theme Support**: Automatic dark/light mode adaptation
- ✅ **Keyboard Handling**: Smart keyboard avoidance
- ✅ **Accessibility**: Full a11y support
- ✅ **TypeScript**: Type-safe props and callbacks
- ✅ **Customizable**: Colors, placeholder, callbacks

## 📦 Installation

```bash
npm install react-native-reanimated react-native-safe-area-context
# or
yarn add react-native-reanimated react-native-safe-area-context
```

### iOS Setup
```bash
cd ios && pod install
```

For complete react-native-reanimated setup, follow the [official guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/).

## 🎯 Usage

### Basic Setup

```tsx
import { BottomBarProvider } from './components/AnimatedBottomBar';
import { AnimatedBottomBar } from './components/AnimatedBottomBar';

export default function App() {
  const handleSubmitInput = (text: string) => {
    console.log('User input:', text);
    // Handle the input text
  };

  return (
    <BottomBarProvider 
      onSubmitInput={handleSubmitInput}
      activeColor="#007AFF"
      inputPlaceholder="Ask me something..."
    >
      <YourMainContent />
      <AnimatedBottomBar />
    </BottomBarProvider>
  );
}
```

### With Todo List Integration

```tsx
import { useTodoList } from './hooks/useTodoList';
import { TodoList } from './components/TodoList';

export default function TodoApp() {
  const { todos, addTodo, toggleTodo } = useTodoList();

  return (
    <BottomBarProvider onSubmitInput={addTodo}>
      <TodoList 
        todos={todos} 
        onToggleTodo={toggleTodo} 
      />
      <AnimatedBottomBar />
    </BottomBarProvider>
  );
}
```

## 🎨 API Reference

### BottomBarProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmitInput` | `(text: string) => void` | - | Callback when user submits input |
| `activeColor` | `string` | `#007AFF` | Primary color for active states |
| `inputPlaceholder` | `string` | `Ask me about your expenses...` | Input field placeholder |

### AnimatedBottomBar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| All standard navigation props | - | - | Customize icons and behavior |

## 🏗️ Project Structure

```
components/
├── AnimatedBottomBar/
│   ├── AnimatedBottomBar.tsx    # Main navigation component
│   ├── BottomBarProvider.tsx    # Context provider with input logic
│   ├── icons.ts                 # Icon definitions
│   ├── types.ts                 # TypeScript definitions
│   └── index.ts                 # Exports
├── TodoItem.tsx                 # Animated todo item
├── TodoList.tsx                 # Todo list container
└── hooks/
    └── useTodoList.ts          # Todo state management
```

## 🎭 Animations

The component uses several animation techniques:

- **Spring Physics**: Natural, bouncy transitions
- **Page Lifting**: Content moves up when input appears
- **Icon Morphing**: Smooth icon transitions
- **Opacity Fades**: Elegant overlay effects
- **Scale Transforms**: Responsive touch feedback

## 🌙 Theme Support

Automatically adapts to system color scheme:

```tsx
// Dark mode colors
const darkTheme = {
  background: '#1C1C1E',
  text: '#FFFFFF',
  border: '#444444'
};

// Light mode colors  
const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  border: '#CCCCCC'
};
```

## 🔧 Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/expo-hidden-input.git
cd expo-hidden-input
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Open in simulator/device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Compatibility

- **React Native**: 0.72+
- **Expo**: SDK 49+
- **iOS**: 13.0+
- **Android**: API 21+
- **TypeScript**: 4.9+

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) for amazing animations
- [Expo](https://expo.dev) for the development platform
- [React Native](https://reactnative.dev) community for inspiration

## 📫 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

⭐ If you found this useful, please consider giving it a star!
