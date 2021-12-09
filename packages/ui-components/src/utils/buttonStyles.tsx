export type ButtonModes = 'primary' | 'secondary' | 'ghost';

/**
 * Utility for returning button style
 * @param mode Button Mode
 * @param bgWhite Whether background is white
 * @returns Corresponding type style
 */
export const getButtonStyles = (
  styles: {[key: string]: string},
  mode: ButtonModes,
  bgWhite: boolean
) => {
  switch (mode) {
    case 'secondary':
      return `${styles.secondary} ${
        bgWhite ? styles.secondaryOnWhite : styles.secondaryOnGray
      }`;

    case 'ghost':
      return `${styles.ghost} ${
        bgWhite ? styles.ghostOnWhite : styles.ghostOnGray
      }`;

    case 'primary':
      return styles.primary;

    default:
      return;
  }
};
