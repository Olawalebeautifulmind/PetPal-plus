import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PetMoodDetector } from '@/lib/ai/petMoodDetector';
import { VirtualSidekick } from '@/lib/ai/virtualSidekick';

interface PetTranslatorProps {
  petName: string;
  petType: string;
  onMoodUpdate?: (mood: string, confidence: number) => void;
}

export function PetTranslator({ petName, petType, onMoodUpdate }: PetTranslatorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [translation, setTranslation] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);

  const moodDetector = new PetMoodDetector();
  const aiSidekick = new VirtualSidekick(process.env.NEXT_PUBLIC_OPENAI_KEY || '');

  useEffect(() => {
    moodDetector.initialize();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsRecording(true);
        startMoodDetection();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
    }
  };

  const startMoodDetection = () => {
    if (!videoRef.current) return;

    const detectMood = async () => {
      try {
        const result = await moodDetector.detectMood(videoRef.current!);
        setMood(result.mood);
        setConfidence(result.confidence);

        // Notify parent component of mood update
        if (onMoodUpdate) {
          onMoodUpdate(result.mood, result.confidence);
        }

        // Generate a fun translation based on the mood
        const response = await aiSidekick.generateResponse(
          `My pet is feeling ${result.mood}`,
          { petName, petType, recentMood: result.mood }
        );
        setTranslation(response);
      } catch (error) {
        console.error('Error detecting mood:', error);
      }
    };

    // Detect mood every 5 seconds
    const interval = setInterval(detectMood, 5000);
    return () => clearInterval(interval);
  };

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      happy: "😊",
      sad: "😢",
      excited: "🎉",
      tired: "😴",
      hungry: "🍽️"
    };
    return emojis[mood] || "🤔";
  };

  return (
    <div className="relative max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Camera View */}
        <div className="relative aspect-video bg-gray-900 rounded-t-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Mood Indicator */}
          <AnimatePresence>
            {mood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-4 right-4 bg-white/90 rounded-full px-4 py-2 flex items-center space-x-2"
              >
                <span className="text-2xl">{getMoodEmoji(mood)}</span>
                <div className="text-sm">
                  <div className="font-semibold capitalize">{mood}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round(confidence * 100)}% sure
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Translation Bubble */}
        <div className="p-4">
          <AnimatePresence>
            {translation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-purple-100 rounded-lg p-4 mb-4"
              >
                <div className="flex items-start space-x-2">
                  <span className="text-2xl">{getMoodEmoji(mood)}</span>
                  <div className="flex-1">
                    <p className="text-purple-800 font-medium">{petName} says:</p>
                    <p className="text-gray-700">{translation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={isRecording ? stopCamera : startCamera}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {isRecording ? 'Stop Translation' : 'Start Translation'}
          </button>
        </div>
      </div>
    </div>
  );
} 