
import { Dumbbell, Heart, UtensilsCrossed, Calendar, Users, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: <Dumbbell className="w-10 h-10 text-primary" />,
    title: 'Personalized Workout Plans',
    description: 'Get workout routines tailored specifically to your body, goals, and fitness level.'
  },
  {
    icon: <UtensilsCrossed className="w-10 h-10 text-primary" />,
    title: 'Nutrition Guidance',
    description: 'Receive expert advice on diet planning and nutritional requirements for optimal results.'
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: 'Health Monitoring',
    description: 'Track your progress with regular assessments and health monitoring by professionals.'
  },
  {
    icon: <Calendar className="w-10 h-10 text-primary" />,
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience with our flexible scheduling system.'
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: 'Expert Trainers',
    description: 'Work with certified fitness professionals who specialize in different aspects of fitness.'
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-primary" />,
    title: 'Continuous Support',
    description: 'Get ongoing motivation and support through direct messaging with your trainer.'
  }
];

const Features = () => {
  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Fitness Solutions
          </h2>
          <p className="text-muted-foreground">
            Discover our range of personalized services designed to help you achieve your fitness goals efficiently and effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
