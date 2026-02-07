import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = () => {
  const badges = [
    {
      icon: "Shield",
      label: "SSL Secured",
      description: "256-bit encryption"
    },
    {
      icon: "Award",
      label: "Accredited",
      description: "Educational standards"
    },
    {
      icon: "Users",
      label: "50K+ Learners",
      description: "Trusted worldwide"
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {badges?.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon name={badge?.icon} size={20} color="var(--color-primary)" />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
              {badge?.label}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;