import { VirtualSidekick } from '@/components/features/virtual-sidekick/VirtualSidekick';
import { PetTranslator } from '@/components/features/pet-translator/PetTranslator';
import { useState } from 'react';

export default function DashboardPage() {
  // This would come from user context/database in a real app
  const petInfo = {
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: 2
  };

  const [petMood, setPetMood] = useState<string>('');
  const [moodConfidence, setMoodConfidence] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const handleMoodUpdate = (mood: string, confidence: number) => {
    setPetMood(mood);
    setMoodConfidence(confidence);
  };

  const handleTaskComplete = (taskType: string) => {
    // In a real app, this would update the database and reward system
    setCompletedTasks(prev => [...prev, taskType]);
    console.log(`Task completed: ${taskType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Pet Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🐕</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{petInfo.name}</h1>
              <p className="text-gray-600">{petInfo.breed}, {petInfo.age} years old</p>
              {petMood && (
                <p className="text-purple-600 mt-1">
                  Current Mood: {petMood} {moodConfidence > 0.7 ? '✨' : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pet Translator Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Pet Translator</h2>
            <PetTranslator
              petName={petInfo.name}
              petType={petInfo.type}
              onMoodUpdate={handleMoodUpdate}
            />
          </div>

          {/* Daily Tasks Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
            <div className="space-y-4">
              {completedTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No tasks completed yet today. Start with a suggestion from your sidekick! ✨
                </p>
              ) : (
                completedTasks.map((task, index) => (
                  <TaskItem
                    key={`${task}-${index}`}
                    icon={getTaskIcon(task)}
                    title={getTaskTitle(task)}
                    time={new Date().toLocaleTimeString()}
                    completed={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Virtual Sidekick (floating helper) */}
      <VirtualSidekick
        petName={petInfo.name}
        petType={petInfo.type}
        onTaskComplete={handleTaskComplete}
        currentMood={petMood}
        moodConfidence={moodConfidence}
      />
    </div>
  );
}

// Helper functions for task display
function getTaskIcon(taskType: string): string {
  const icons: Record<string, string> = {
    grooming: '🦮',
    exercise: '🎾',
    feeding: '🍽️',
    training: '🎯',
    rest: '😴'
  };
  return icons[taskType] || '✨';
}

function getTaskTitle(taskType: string): string {
  const titles: Record<string, string> = {
    grooming: 'Grooming Session',
    exercise: 'Exercise Time',
    feeding: 'Feeding Time',
    training: 'Training Session',
    rest: 'Rest Time'
  };
  return titles[taskType] || taskType;
}

function TaskItem({ icon, title, time, completed }: {
  icon: string;
  title: string;
  time: string;
  completed: boolean;
}) {
  return (
    <div className={`flex items-center p-3 rounded-lg ${completed ? 'bg-green-50' : 'bg-gray-50'}`}>
      <span className="text-2xl mr-3">{icon}</span>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      {completed ? (
        <span className="text-green-500">✓</span>
      ) : (
        <button className="text-sm text-purple-600 hover:text-purple-700">
          Complete
        </button>
      )}
    </div>
  );
} 