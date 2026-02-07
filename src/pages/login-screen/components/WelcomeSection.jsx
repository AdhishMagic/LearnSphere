import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ onRegister }) => {
  const features = [
    {
      icon: "BookOpen",
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: "TrendingUp",
      title: "Track Your Progress",
      description: "Monitor your learning journey with detailed analytics"
    },
    {
      icon: "Award",
      title: "Earn Certificates",
      description: "Get recognized for your achievements with verified certificates"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
          Welcome to LearnSphere
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Your gateway to world-class education. Sign in to continue your learning journey.
        </p>
      </div>
      <div className="space-y-4 md:space-y-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 md:pt-8 border-t border-border">
        <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
          <Icon name="Info" size={18} />
          <p>
            New to LearnSphere?{' '}
            <button
              onClick={onRegister}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;