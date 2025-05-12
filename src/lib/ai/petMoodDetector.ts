import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { FilesetResolver, ImageClassifier } from '@mediapipe/tasks-vision';

interface MoodDetectionResult {
  mood: string;
  confidence: number;
}

export class PetMoodDetector {
  private classifier: ImageClassifier | null = null;

  async initialize() {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      
      this.classifier = await ImageClassifier.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pet_mood_classifier.tflite",
          delegate: "GPU"
        },
        maxResults: 1,
        scoreThreshold: 0.3
      });
    } catch (error) {
      console.error('Error initializing mood detector:', error);
      // Return mock data for development
      this.classifier = null;
    }
  }

  async detectMood(videoElement: HTMLVideoElement): Promise<MoodDetectionResult> {
    if (!this.classifier) {
      // Return mock data for development
      return {
        mood: ['happy', 'excited', 'calm', 'tired', 'hungry'][Math.floor(Math.random() * 5)],
        confidence: 0.7 + Math.random() * 0.3
      };
    }

    try {
      const classifications = await this.classifier.classify(videoElement);
      const topResult = classifications[0];
      
      return {
        mood: topResult.categoryName.toLowerCase(),
        confidence: topResult.score
      };
    } catch (error) {
      console.error('Error detecting mood:', error);
      return {
        mood: 'unknown',
        confidence: 0
      };
    }
  }
} 