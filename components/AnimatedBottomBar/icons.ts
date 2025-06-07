import { IconConfig, IconName } from './types';

/**
 * Icon configuration mapping for the AnimatedBottomBar component
 * Maps logical icon names to actual icon library configurations
 */
export const ICON_CONFIG: Record<IconName, IconConfig> = {
  home: {
    name: 'home',
    family: 'Ionicons',
    size: 24,
  },
  receipt: {
    name: 'receipt',
    family: 'MaterialIcons',
    size: 24,
  },
  wallet: {
    name: 'account-balance-wallet',
    family: 'MaterialIcons',
    size: 24,
  },
  sparkles: {
    name: 'sparkles',
    family: 'Ionicons',
    size: 24,
  },
  plus: {
    name: 'add',
    family: 'Ionicons',
    size: 24,
  },
  close: {
    name: 'close',
    family: 'Ionicons',
    size: 24,
  },
};

/**
 * Constants for the animated bottom bar
 */
export const CONSTANTS = {
  BAR_HEIGHT: 80,
  PILL_HEIGHT: 44,
  PILL_WIDTH: 60,
  CIRCLE_SIZE: 56,
  ICON_SIZE: 24,
  INPUT_HEIGHT: 60, // Réduit de 120 à 80
  ANIMATION_DURATION: 300,
  SPRING_CONFIG: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  OVERLAY_SPRING_CONFIG: {
    damping: 20,
    stiffness: 200,
    mass: 0.8,
  },
} as const; 