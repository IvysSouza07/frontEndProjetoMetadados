// Utility functions for time formatting and conversion

/**
 * Converts seconds to a formatted time string (MM:SS).
 * @param {number} seconds - The time in seconds.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * Converts a formatted time string (MM:SS) to seconds.
 * @param {string} time - The formatted time string.
 * @returns {number} - The time in seconds.
 */
export const convertTimeToSeconds = (time) => {
  const [mins, secs] = time.split(':').map(Number);
  return mins * 60 + secs;
};
