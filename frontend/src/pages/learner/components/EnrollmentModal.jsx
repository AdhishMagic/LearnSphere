import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EnrollmentModal = ({ course, onConfirm, onCancel, isProcessing }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elevation-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-48 md:h-64 overflow-hidden bg-muted">
          <Image
            src={course?.thumbnail}
            alt={course?.thumbnailAlt}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={course?.instructorAvatar}
                alt={course?.instructorAvatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {course?.title}
              </h2>
              <p className="text-muted-foreground">
                by {course?.instructorName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-warning mb-1">
                <Icon name="Star" size={16} fill="var(--color-warning)" />
                <span className="font-semibold data-text">{course?.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="Clock" size={16} />
                <span className="font-semibold">{course?.duration}</span>
              </div>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="Users" size={16} />
                <span className="font-semibold data-text">{course?.enrolledCount}</span>
              </div>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="BarChart3" size={16} />
                <span className="font-semibold">{course?.level}</span>
              </div>
              <p className="text-xs text-muted-foreground">Level</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="BookOpen" size={20} />
              What you'll learn
            </h3>
            <ul className="space-y-2">
              {course?.learningPoints?.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={18} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-card-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {course?.prerequisites && course?.prerequisites?.length > 0 && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                Prerequisites
              </h3>
              <ul className="space-y-1">
                {course?.prerequisites?.map((prereq, index) => (
                  <li key={index} className="text-sm text-card-foreground">
                    • {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
            <div>
              {course?.price === 0 ? (
                <span className="text-3xl font-bold text-success">Free</span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground data-text">
                    ${course?.price}
                  </span>
                  {course?.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through data-text">
                      ${course?.originalPrice}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={onConfirm}
                loading={isProcessing}
                iconName="CheckCircle2"
                iconPosition="left"
              >
                Confirm Enrollment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;