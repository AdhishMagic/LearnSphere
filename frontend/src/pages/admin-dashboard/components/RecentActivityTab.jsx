import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';

const RecentActivityTab = () => {
  const [activityFilter, setActivityFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');

  const activities = [
    {
      id: 1,
      type: "user_registration",
      user: "John Anderson",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      userAvatarAlt: "Professional headshot of Caucasian man with short brown hair wearing navy blue business suit",
      action: "registered as a new learner",
      timestamp: "2 minutes ago",
      icon: "UserPlus",
      iconColor: "var(--color-success)"
    },
    {
      id: 2,
      type: "course_published",
      user: "Dr. Sarah Mitchell",
      userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      userAvatarAlt: "Professional headshot of Asian woman with long black hair wearing white blouse and glasses",
      action: "published a new course",
      courseName: "Advanced React Development",
      timestamp: "15 minutes ago",
      icon: "BookOpen",
      iconColor: "var(--color-primary)"
    },
    {
      id: 3,
      type: "course_completion",
      user: "Michael Rodriguez",
      userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      userAvatarAlt: "Professional headshot of Hispanic man with short black hair wearing gray suit and blue tie",
      action: "completed the course",
      courseName: "Machine Learning Fundamentals",
      timestamp: "32 minutes ago",
      icon: "Award",
      iconColor: "var(--color-accent)"
    },
    {
      id: 4,
      type: "course_approval",
      user: "Admin Team",
      userAvatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e",
      userAvatarAlt: "Professional headshot of African American woman with curly hair wearing red blazer",
      action: "approved the course",
      courseName: "Digital Marketing Strategies 2026",
      timestamp: "1 hour ago",
      icon: "CheckCircle",
      iconColor: "var(--color-success)"
    },
    {
      id: 5,
      type: "quiz_submission",
      user: "Emily Watson",
      userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      userAvatarAlt: "Professional headshot of Caucasian woman with blonde hair wearing purple sweater",
      action: "submitted a quiz attempt",
      courseName: "Full Stack Web Development",
      score: 92,
      timestamp: "1 hour ago",
      icon: "ClipboardCheck",
      iconColor: "var(--color-primary)"
    },
    {
      id: 6,
      type: "course_review",
      user: "James Chen",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      userAvatarAlt: "Professional headshot of Asian man with short black hair wearing white shirt and black tie",
      action: "left a 5-star review on",
      courseName: "Introduction to Blockchain Technology",
      rating: 5,
      timestamp: "2 hours ago",
      icon: "Star",
      iconColor: "var(--color-accent)"
    },
    {
      id: 7,
      type: "user_login",
      user: "Maria Rodriguez",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      userAvatarAlt: "Professional headshot of Hispanic woman with long brown hair wearing green blouse",
      action: "logged into the platform",
      timestamp: "2 hours ago",
      icon: "LogIn",
      iconColor: "var(--color-secondary)"
    },
    {
      id: 8,
      type: "course_enrollment",
      user: "Alex Thompson",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      userAvatarAlt: "Professional headshot of Caucasian man with short blonde hair wearing blue shirt",
      action: "enrolled in",
      courseName: "Python for Data Science",
      timestamp: "3 hours ago",
      icon: "BookMarked",
      iconColor: "var(--color-primary)"
    },
    {
      id: 9,
      type: "system_update",
      user: "System",
      userAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
      userAvatarAlt: "Professional headshot of African American woman with short hair wearing orange blazer",
      action: "performed automated backup",
      timestamp: "4 hours ago",
      icon: "Database",
      iconColor: "var(--color-muted-foreground)"
    },
    {
      id: 10,
      type: "course_update",
      user: "Prof. James Chen",
      userAvatar: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
      userAvatarAlt: "Professional headshot of Asian man with glasses wearing brown sweater",
      action: "updated course content for",
      courseName: "Machine Learning Fundamentals",
      timestamp: "5 hours ago",
      icon: "Edit3",
      iconColor: "var(--color-secondary)"
    }];


  const activityFilterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'user_registration', label: 'User Registrations' },
    { value: 'course_published', label: 'Course Publications' },
    { value: 'course_completion', label: 'Course Completions' },
    { value: 'course_approval', label: 'Course Approvals' },
    { value: 'quiz_submission', label: 'Quiz Submissions' },
    { value: 'course_review', label: 'Course Reviews' }];


  const timeFilterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }];


  const filteredActivities = activities?.filter((activity) => {
    if (activityFilter === 'all') return true;
    return activity?.type === activityFilter;
  });

  const getActivityIcon = (activity) => {
    return (
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${activity?.iconColor}20` }}>
        <Icon name={activity?.icon} size={20} color={activity?.iconColor} />
      </div>);

  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Filters */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <Select
              label="Activity Type"
              options={activityFilterOptions}
              value={activityFilter}
              onChange={setActivityFilter} />

          </div>
          <div className="flex-1">
            <Select
              label="Time Period"
              options={timeFilterOptions}
              value={timeFilter}
              onChange={setTimeFilter} />

          </div>
        </div>
      </div>
      {/* Activity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-xs md:text-sm text-muted-foreground">Total Activities</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground data-text">
            {filteredActivities?.length}
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Users" size={16} className="text-success" />
            <span className="text-xs md:text-sm text-muted-foreground">User Actions</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground data-text">
            {filteredActivities?.filter((a) => a?.type?.includes('user'))?.length}
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="BookOpen" size={16} className="text-secondary" />
            <span className="text-xs md:text-sm text-muted-foreground">Course Actions</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground data-text">
            {filteredActivities?.filter((a) => a?.type?.includes('course'))?.length}
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Database" size={16} className="text-accent" />
            <span className="text-xs md:text-sm text-muted-foreground">System Events</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground data-text">
            {filteredActivities?.filter((a) => a?.type === 'system_update')?.length}
          </p>
        </div>
      </div>
      {/* Activity Feed */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Activity Feed</h3>
          <Icon name="RefreshCw" size={20} className="text-muted-foreground cursor-pointer hover:text-primary transition-smooth" />
        </div>
        <div className="space-y-4 md:space-y-6">
          {filteredActivities?.length > 0 ?
            filteredActivities?.map((activity) =>
              <div key={activity?.id} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                {getActivityIcon(activity)}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={activity?.userAvatar}
                          alt={activity?.userAvatarAlt}
                          className="w-full h-full object-cover" />

                      </div>
                      <span className="text-sm md:text-base font-semibold text-foreground truncate">
                        {activity?.user}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {activity?.timestamp}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-card-foreground mb-2">
                    {activity?.action}
                    {activity?.courseName &&
                      <span className="font-semibold text-primary"> {activity?.courseName}</span>
                    }
                  </p>
                  {activity?.score &&
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm text-muted-foreground">Score:</span>
                      <span className="text-xs md:text-sm font-semibold text-success data-text">
                        {activity?.score}%
                      </span>
                    </div>
                  }
                  {activity?.rating &&
                    <div className="flex items-center gap-1">
                      {[...Array(activity?.rating)]?.map((_, i) =>
                        <Icon key={i} name="Star" size={14} className="text-accent" />
                      )}
                    </div>
                  }
                </div>
              </div>
            ) :

            <div className="text-center py-8 md:py-12">
              <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-base md:text-lg text-muted-foreground">
                No activities found for the selected filters
              </p>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default RecentActivityTab;