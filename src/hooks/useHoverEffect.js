import { useCallback } from 'react';

/**
 * Custom hook for handling hover effects consistently
 * @param {Object} styles - Object with 'normal' and 'hover' style properties
 * @returns {Object} - onMouseOver and onMouseOut event handlers
 */
export const useHoverEffect = (styles) => {
  const handleMouseOver = useCallback((e) => {
    if (styles.hover) {
      Object.assign(e.currentTarget.style, styles.hover);
    }
  }, [styles.hover]);

  const handleMouseOut = useCallback((e) => {
    if (styles.normal) {
      Object.assign(e.currentTarget.style, styles.normal);
    }
  }, [styles.normal]);

  return { onMouseOver: handleMouseOver, onMouseOut: handleMouseOut };
};
