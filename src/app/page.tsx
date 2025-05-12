import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-purple-600 mb-6">
            PetPal+ 🐾
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Help your kids bond with their pets through interactive AI features
          </p>
          <Link 
            href="/get-started"
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureCard 
            title="Virtual AI Sidekick"
            description="A cute, animated AI character that acts as a pet-care coach"
            icon="🤖"
          />
          <FeatureCard 
            title="Pet Translator"
            description="Fun simulation to interpret your pet's actions and give them a voice"
            icon="🗣️"
          />
          <FeatureCard 
            title="Story Mode"
            description="Go on magical missions with your real pet via interactive stories"
            icon="🎮"
          />
          <FeatureCard 
            title="AR Playroom"
            description="Use AR to create interactive play experiences with your pet"
            icon="📱"
          />
        </div>

        {/* How It Works Section */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-purple-600 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number={1}
              title="Create Profile"
              description="Set up profiles for you and your pets"
            />
            <StepCard 
              number={2}
              title="Start Adventures"
              description="Choose from various activities and games"
            />
            <StepCard 
              number={3}
              title="Earn Rewards"
              description="Complete tasks and unlock special features"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { 
  title: string
  description: string
  icon: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-purple-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
