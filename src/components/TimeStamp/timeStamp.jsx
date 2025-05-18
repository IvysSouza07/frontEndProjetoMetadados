import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { formatTime, convertTimeToSeconds } from '../../utils/timeUtils';
import { fetchTranscript as fetchTranscriptUtil } from '../../utils/apiUtils';
import bad_romance_lyrics from '../../assets/bad-romance-lyrics.json';
import './timeStamp.css';

const VideoTranscript = ({ videoRef, videoId, apiEndpoint }) => {
  const [transcript, setTranscript] = useState(null);
  const [currentSegment, setCurrentSegment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Busca a transcrição na API ou do arquivo local como fallback
  const fetchTranscript = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const transcriptData = await fetchTranscriptUtil(apiEndpoint, videoId);
      setTranscript(transcriptData);
    } catch (err) {
      console.error('Error fetching transcript, loading local JSON:', err);
      const convertedTranscript = bad_romance_lyrics.map((segment) => ({
        ...segment,
        start: convertTimeToSeconds(segment.start),
        end: convertTimeToSeconds(segment.end),
      }));
      setTranscript(convertedTranscript);
      setError('Error loading transcript from API. Using local data.');
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, videoId]);

  // Atualiza o segmento atual baseado no tempo do vídeo
  const updateCurrentSegment = useCallback(() => {
    if (!transcript || !videoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    const segment = transcript.find(
      (seg) => currentTime >= seg.start && currentTime <= seg.end
    );

    setCurrentSegment(segment || null);
  }, [transcript, videoRef]);

  // Added a more robust debugging mechanism to identify the root cause.
  const seekToTime = (time) => {
    if (videoRef?.current) {
      console.log('Attempting to navigate to time:', time);
      console.log('Video reference state:', {
        readyState: videoRef.current.readyState,
        currentTime: videoRef.current.currentTime,
        duration: videoRef.current.duration,
      });

      if (videoRef.current.readyState >= 1) { // Ensure the video is ready
        videoRef.current.currentTime = time;
        videoRef.current.play(); // Automatically play the video after seeking
        console.log('Navigation successful.');
      } else {
        console.error('Video is not ready to seek.');
      }
    } else {
      console.error('Video reference is not available.');
    }
  };

  // Efeitos
  useEffect(() => {
    fetchTranscript();
  }, [videoId, fetchTranscript]);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    videoElement.addEventListener('timeupdate', updateCurrentSegment);

    return () => {
      videoElement.removeEventListener('timeupdate', updateCurrentSegment);
    };
  }, [transcript, updateCurrentSegment, videoRef]);

  return (
    <div className="video-transcript clean-transcript">
      {loading && <div className="loading">Carregando transcrição...</div>}
      {error && <div className="error">{error}</div>}


      {transcript && (
        <div className="transcript-list clean-list">
          <ul>
            {transcript.map((segment, index) => (
              <li
                key={index}
                className={
                  (currentSegment === segment ? 'active ' : '') + 'clean-list-item'
                }
                onClick={() => seekToTime(segment.start)}
              >
                <span className="clean-segment-time">
                  {formatTime(segment.start)} - {formatTime(segment.end)}
                </span>
                <span className="clean-segment-text">{segment.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

VideoTranscript.propTypes = {
  videoRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLVideoElement),
  }).isRequired,
  videoId: PropTypes.string,
  apiEndpoint: PropTypes.string.isRequired,
};

export default VideoTranscript;
