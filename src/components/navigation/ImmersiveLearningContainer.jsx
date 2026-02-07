import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';

const ImmersiveLearningContainer = ({ 
  children, 
  title = 'Learning Session',
  showProgress = false,
  progress = 0,
  onExit,
  showNavigation = true,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}) => {
  const navigate = useNavigate();

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="immersive-container">
      <header className="immersive-header">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExit}
            iconName="X"
          >
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {showProgress && (
              <div className="mt-2 w-full max-w-md">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-250"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 data-text">
                  {progress}% Complete
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="immersive-content">
        {children}
      </main>

      {showNavigation && (
        <footer className="immersive-footer">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!hasPrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            <Button
              variant="default"
              onClick={onNext}
              disabled={!hasNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ImmersiveLearningContainer;