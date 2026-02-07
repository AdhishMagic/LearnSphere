import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/learner/course-details', { state: { courseId: course?.id } });
  };

  const handleEnrollClick = (e) => {
    e?.stopPropagation();
    if (isEnrolled) {
      navigate('/learner/lesson-player', { state: { courseId: course?.id } });
    } else {
      onEnroll(course?.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-card rounded-xl overflow-hidden shadow-elevation-2 hover:shadow-elevation-3 transition-smooth cursor-pointer group"
    >
      <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-muted">
        <Image
          src={course?.thumbnail}
          alt={course?.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {course?.isNew && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}
        {isEnrolled && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Icon name="CheckCircle2" size={14} />
            <span>Enrolled</span>
          </div>
        )}
        {course?.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/50">
            <div
              className="h-full bg-primary transition-all duration-250"
              style={{ width: `${course?.progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
            {course?.category}
          </span>
          <div className="flex items-center gap-1 text-sm">
            <Icon name="Star" size={16} color="var(--color-warning)" fill="var(--color-warning)" />
            <span className="font-medium data-text">{course?.rating}</span>
            <span className="text-muted-foreground">({course?.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
          {course?.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={course?.instructorAvatar}
              alt={course?.instructorAvatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground line-clamp-1">
            {course?.instructorName}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Icon name="Clock" size={16} />
            <span>{course?.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Users" size={16} />
            <span className="data-text">{course?.enrolledCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="BarChart3" size={16} />
            <span>{course?.level}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {course?.price === 0 ? (
              <span className="text-xl font-bold text-success">Free</span>
            ) : (
              <>
                <span className="text-2xl font-bold text-foreground data-text">
                  ${course?.price}
                </span>
                {course?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through data-text">
                    ${course?.originalPrice}
                  </span>
                )}
              </>
            )}
          </div>
          <Button
            variant={isEnrolled ? "outline" : "default"}
            size="default"
            onClick={handleEnrollClick}
            iconName={isEnrolled ? "Play" : "Plus"}
            iconPosition="left"
            className="flex-shrink-0"
          >
            {isEnrolled ? "Continue" : "Enroll"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;