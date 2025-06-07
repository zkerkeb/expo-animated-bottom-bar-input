export interface AnimatedBottomBarProps {
  /**
   * Callback function triggered after the plus button animation completes
   */
  onPressPlus?: () => void;
  
  /**
   * Callback function triggered when input is submitted
   */
  onSubmitInput?: (text: string) => void;
  
  /**
   * Color for active/selected icons
   * @default '#007AFF'
   */
  activeColor?: string;
  
  /**
   * Color for inactive/unselected icons
   * @default '#8E8E93'
   */
  inactiveColor?: string;
  
  /**
   * Background color of the bottom bar
   * @default '#FFFFFF' (light) / '#1C1C1E' (dark)
   */
  backgroundColor?: string;
  
  /**
   * Placeholder text for the input field
   * @default 'Ask me about your expenses...'
   */
  inputPlaceholder?: string;
}

export interface IconConfig {
  name: string;
  family: 'MaterialIcons' | 'Ionicons' | 'AntDesign' | 'FontAwesome5';
  size: number;
}

export type IconName = 'home' | 'receipt' | 'wallet' | 'sparkles' | 'plus' | 'close'; 