import axios from "axios";

// Basic Axios configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
  timeout: 30000, // Request timeout set to 30 seconds
});

// Function to handle video uploads with progress tracking
export const uploadVideo = (formData, onProgress) => {
  return api.post(import.meta.env.VITE_UPLOAD_ENDPOINT, formData, {
    headers: { 
      "Content-Type": "multipart/form-data" // Required header for file uploads
    },
    onUploadProgress: onProgress // Callback for tracking upload progress
  });
};

export default api; // Exporting the Axios instance for reuse