import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VirtualSidekick as AIHelper } from '@/lib/ai/virtualSidekick';

interface SidekickProps {
  petName: string;
  petType: string;
  onTaskComplete?: (taskType: string) => void;
  currentMood?: string;
  moodConfidence?: number;
}

export function VirtualSidekick({ petName, petType, onTaskComplete, currentMood, moodConfidence }: SidekickProps) {
  const [message, setMessage] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);

  // Animation variants for the floating effect
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  // Character expressions
  const expressions = {
    happy: "😊",
    excited: "🎉",
    thoughtful: "🤔",
    encouraging: "🌟"
  };

  // Enhanced pet care tasks that respond to mood
  const getPetCareTasks = () => {
    const baseTasks = [
      { type: 'grooming', text: `Time to brush ${petName}'s fur!`, mood: ['happy', 'calm'] },
      { type: 'exercise', text: `Let's play fetch with ${petName}!`, mood: ['excited', 'happy'] },
      { type: 'feeding', text: `${petName} might be hungry - feeding time!`, mood: ['hungry', 'sad'] },
      { type: 'rest', text: `${petName} seems tired - let's have quiet time`, mood: ['tired', 'calm'] },
      { type: 'training', text: `Want to teach ${petName} a new trick?`, mood: ['excited', 'happy'] },
    ];

    // Filter tasks based on current mood if available
    if (currentMood && moodConfidence && moodConfidence > 0.7) {
      return baseTasks.filter(task => task.mood.includes(currentMood.toLowerCase()));
    }
    return baseTasks;
  };

  // Track completed tasks
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  const completeTask = () => {
    if (currentTask && onTaskComplete) {
      onTaskComplete(currentTask);
      setCompletedTasks([...completedTasks, currentTask]);
      
      // Generate encouraging message based on completion streak
      const streak = completedTasks.length + 1;
      let message = `Great job taking care of ${petName}! `;
      if (streak === 3) {
        message += "You're on a roll! 🌟";
      } else if (streak === 5) {
        message += "You're becoming a super pet parent! 🏆";
      } else if (streak === 10) {
        message += "You're legendary! ${petName} is so lucky to have you! 👑";
      } else {
        message += "Keep up the amazing work! 🌟";
      }
      
      setMessage(message);
      setCurrentTask(null);
    }
  };

  // Suggest mood-appropriate tasks
  const suggestTask = async () => {
    const availableTasks = getPetCareTasks();
    const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
    
    setCurrentTask(randomTask.type);
    setIsAnimating(true);
    
    // Use AI to generate a personalized message considering mood
    const ai = new AIHelper(process.env.NEXT_PUBLIC_OPENAI_KEY || '');
    const response = await ai.generateResponse(randomTask.text, {
      petName,
      petType,
      recentMood: currentMood || 'unknown',
      completedTasks: completedTasks.length
    });

    setMessage(response);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Randomly suggest tasks throughout the day
    const taskInterval = setInterval(() => {
      suggestTask();
    }, 1800000); // Every 30 minutes

    return () => clearInterval(taskInterval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Message Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white rounded-lg p-4 shadow-lg max-w-xs"
          >
            <p className="text-gray-800">{message}</p>
            {currentTask && (
              <button
                onClick={completeTask}
                className="mt-2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-600 transition-colors"
              >
                Task Complete!
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Character */}
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl cursor-pointer hover:bg-purple-600 transition-colors shadow-lg"
        onClick={() => suggestTask()}
      >
        {isAnimating ? expressions.excited : expressions.happy}
      </motion.div>
    </div>
  );
} 