import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemAnalyticsTab = () => {
  const analyticsData = {
    platformUsage: {
      dailyActiveUsers: 8456,
      weeklyActiveUsers: 12234,
      monthlyActiveUsers: 15847,
      averageSessionDuration: "24m 35s",
      totalSessions: 45678,
      bounceRate: 23.4
    },
    completionMetrics: {
      overallCompletionRate: 67.8,
      averageCompletionTime: "45 days",
      certificatesIssued: 5678,
      quizCompletionRate: 82.3
    },
    revenueTracking: {
      totalRevenue: 1245678,
      monthlyRevenue: 156789,
      averageRevenuePerUser: 78.65,
      revenueGrowth: 18.5,
      monthlyTrend: [
        { month: "Jan", revenue: 98456 },
        { month: "Feb", revenue: 112345 },
        { month: "Mar", revenue: 125678 },
        { month: "Apr", revenue: 138901 },
        { month: "May", revenue: 145234 },
        { month: "Jun", revenue: 156789 }
      ]
    },
    engagementMetrics: [
      { metric: "Course Completion Rate", value: 67.8, trend: "up", change: 5.2 },
      { metric: "Quiz Pass Rate", value: 78.5, trend: "up", change: 3.8 },
      { metric: "Average Rating", value: 4.6, trend: "up", change: 0.2 },
      { metric: "Student Satisfaction", value: 89.2, trend: "up", change: 2.5 }
    ],
    topPerformingInstructors: [
      { name: "Dr. Sarah Mitchell", courses: 12, students: 8456, rating: 4.9 },
      { name: "Prof. James Chen", courses: 8, students: 6234, rating: 4.8 },
      { name: "Maria Rodriguez", courses: 15, students: 5678, rating: 4.7 },
      { name: "Alex Thompson", courses: 10, students: 4567, rating: 4.8 },
      { name: "Emily Watson", courses: 7, students: 3456, rating: 4.6 }
    ]
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Platform Usage Overview */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Platform Usage</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-xs md:text-sm text-muted-foreground">Daily Active Users</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">
              {analyticsData?.platformUsage?.dailyActiveUsers?.toLocaleString()}
            </p>
          </div>
          <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" size={16} className="text-secondary" />
              <span className="text-xs md:text-sm text-muted-foreground">Weekly Active Users</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">
              {analyticsData?.platformUsage?.weeklyActiveUsers?.toLocaleString()}
            </p>
          </div>
          <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="CalendarDays" size={16} className="text-accent" />
              <span className="text-xs md:text-sm text-muted-foreground">Monthly Active Users</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">
              {analyticsData?.platformUsage?.monthlyActiveUsers?.toLocaleString()}
            </p>
          </div>
          <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-xs md:text-sm text-muted-foreground">Avg Session Duration</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">
              {analyticsData?.platformUsage?.averageSessionDuration}
            </p>
          </div>
          <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="MousePointerClick" size={16} className="text-primary" />
              <span className="text-xs md:text-sm text-muted-foreground">Total Sessions</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">
              {analyticsData?.platformUsage?.totalSessions?.toLocaleString()}
            </p>
          </div>
          <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="LogOut" size={16} className="text-warning" />
              <span className="text-xs md:text-sm text-muted-foreground">Bounce Rate</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">
              {analyticsData?.platformUsage?.bounceRate}%
            </p>
          </div>
        </div>
      </div>
      {/* Completion Metrics and Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Completion Metrics */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Completion Metrics</h3>
            <Icon name="CheckCircle" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="p-3 md:p-4 bg-success/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm md:text-base text-foreground">Overall Completion Rate</span>
                <span className="text-lg md:text-xl font-bold text-success data-text">
                  {analyticsData?.completionMetrics?.overallCompletionRate}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success transition-all duration-500"
                  style={{ width: `${analyticsData?.completionMetrics?.overallCompletionRate}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-xs md:text-sm text-muted-foreground">Avg Completion Time</span>
                </div>
                <p className="text-base md:text-lg font-bold text-foreground">
                  {analyticsData?.completionMetrics?.averageCompletionTime}
                </p>
              </div>
              <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Award" size={16} className="text-accent" />
                  <span className="text-xs md:text-sm text-muted-foreground">Certificates Issued</span>
                </div>
                <p className="text-base md:text-lg font-bold text-foreground data-text">
                  {analyticsData?.completionMetrics?.certificatesIssued?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-3 md:p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-foreground">Quiz Completion Rate</span>
                <span className="text-lg md:text-xl font-bold text-primary data-text">
                  {analyticsData?.completionMetrics?.quizCompletionRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Tracking */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Revenue Tracking</h3>
            <Icon name="DollarSign" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-success/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="text-xs md:text-sm text-muted-foreground">Total Revenue</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-success data-text">
                  ${analyticsData?.revenueTracking?.totalRevenue?.toLocaleString()}
                </p>
              </div>
              <div className="p-3 md:p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-xs md:text-sm text-muted-foreground">Monthly Revenue</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-primary data-text">
                  ${analyticsData?.revenueTracking?.monthlyRevenue?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm md:text-base text-foreground">Revenue Growth</span>
                <span className="text-base md:text-lg font-bold text-success data-text">
                  +{analyticsData?.revenueTracking?.revenueGrowth}%
                </span>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Avg per user: ${analyticsData?.revenueTracking?.averageRevenuePerUser}
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <h4 className="text-sm md:text-base font-medium text-foreground">Monthly Trend</h4>
              {analyticsData?.revenueTracking?.monthlyTrend?.map((trend, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground w-8 md:w-10">
                    {trend?.month}
                  </span>
                  <div className="flex-1 h-6 md:h-8 bg-muted rounded overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(trend?.revenue / 200000) * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-white data-text">
                        ${(trend?.revenue / 1000)?.toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Engagement Metrics */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Engagement Metrics</h3>
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {analyticsData?.engagementMetrics?.map((metric, index) => (
            <div key={index} className="p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <span className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {metric?.metric}
                </span>
                <div className={`flex items-center gap-1 ${metric?.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                  <span className="text-xs font-medium data-text">+{metric?.change}%</span>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground data-text">
                {metric?.value}%
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Top Performing Instructors */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Top Performing Instructors</h3>
          <Icon name="Award" size={20} className="text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">
                  Instructor
                </th>
                <th className="text-center py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">
                  Courses
                </th>
                <th className="text-center py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">
                  Students
                </th>
                <th className="text-center py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData?.topPerformingInstructors?.map((instructor, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs md:text-sm font-semibold text-primary">
                          {instructor?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <span className="text-sm md:text-base font-medium text-foreground">
                        {instructor?.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                    <span className="text-sm md:text-base font-semibold text-foreground data-text">
                      {instructor?.courses}
                    </span>
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                    <span className="text-sm md:text-base font-semibold text-foreground data-text">
                      {instructor?.students?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Icon name="Star" size={14} className="text-accent" />
                      <span className="text-sm md:text-base font-semibold text-foreground data-text">
                        {instructor?.rating}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalyticsTab;