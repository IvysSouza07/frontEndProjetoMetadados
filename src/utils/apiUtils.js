// Utility functions for API interactions
import axios from 'axios';

/**
 * Fetches a transcript from the API.
 * @param {string} apiEndpoint - The API endpoint URL.
 * @param {string} videoId - The ID of the video.
 * @returns {Promise<Object>} - The transcript data.
 */
export const fetchTranscript = async (apiEndpoint, videoId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};
