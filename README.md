# PetPal+

PetPal+ is an AI-powered web application designed to help children bond with their pets through interactive activities and real-time pet mood detection.

## Features

### 🤖 Virtual AI Sidekick
- Personalized task suggestions
- Mood-aware interactions
- Progress tracking and encouragement
- Dynamic activity recommendations

### 🐾 Pet Translator
- Real-time pet mood detection
- Kid-friendly mood translations
- Visual feedback with emojis
- Confidence scoring

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Tailwind CSS, Framer Motion
- **AI/ML**: TensorFlow.js, MediaPipe, OpenAI
- **3D Graphics**: Three.js

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Olawalebeautifulmind/petpal-plus.git
cd petpal-plus
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
NEXT_PUBLIC_OPENAI_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   └── features/          # Main feature components
│       ├── pet-translator/
│       └── virtual-sidekick/
├── lib/
│   └── ai/               # AI utilities
└── public/
    └── models/           # ML models
```

## Environment Variables

- `NEXT_PUBLIC_OPENAI_KEY`: Your OpenAI API key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This software is proprietary and confidential. All rights reserved. See the [LICENSE](LICENSE) file for details.

Unauthorized use, modification, or distribution of this software is strictly prohibited.

## Acknowledgments

- OpenAI for the chat completions API
- TensorFlow.js team for the machine learning capabilities
- MediaPipe team for the vision tasks library
