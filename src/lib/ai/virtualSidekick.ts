import OpenAI from 'openai';

interface GenerateResponseOptions {
  petName: string;
  petType: string;
  recentMood?: string;
  completedTasks?: number;
  recentActivities?: string[];
}

export class VirtualSidekick {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateResponse(
    prompt: string,
    options: GenerateResponseOptions
  ): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a friendly virtual pet companion helping a child take care of their ${options.petType} named ${options.petName}. 
                     The pet is currently feeling ${options.recentMood || 'unknown'}.
                     The child has completed ${options.completedTasks || 0} tasks today.
                     Respond in a cheerful, encouraging, and child-friendly way.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'I\'m here to help!';
    } catch (error) {
      console.error('Error generating AI response:', error);
      return 'I\'m here to help you take care of your pet!';
    }
  }

  async suggestActivity(petMood: string, timeOfDay: string, weather?: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a friendly virtual pet companion. Suggest a fun and safe activity for a child to do with their pet.
                     Consider the following:
                     - Pet's current mood: ${petMood}
                     - Time of day: ${timeOfDay}
                     ${weather ? `- Weather: ${weather}` : ''}
                     
                     Keep the suggestion safe, age-appropriate, and engaging.`
          }
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        max_tokens: 100
      });

      return completion.choices[0]?.message?.content || "Let's play with your pet!";
    } catch (error) {
      console.error('Error generating activity suggestion:', error);
      return "How about spending some quality time with your pet?";
    }
  }
} 