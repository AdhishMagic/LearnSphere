import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatsTab = () => {
  const userStats = {
    totalUsers: 15847,
    activeUsers: 12456,
    newUsersThisMonth: 1234,
    userGrowth: 15.3,
    roleDistribution: [
      { role: "Learners", count: 14250, percentage: 89.9, color: "bg-primary" },
      { role: "Instructors", count: 1342, percentage: 8.5, color: "bg-secondary" },
      { role: "Administrators", count: 255, percentage: 1.6, color: "bg-accent" }
    ],
    enrollmentTrends: [
      { month: "Jan", enrollments: 1245 },
      { month: "Feb", enrollments: 1567 },
      { month: "Mar", enrollments: 1890 },
      { month: "Apr", enrollments: 2134 },
      { month: "May", enrollments: 2456 },
      { month: "Jun", enrollments: 2789 }
    ],
    topRegions: [
      { region: "North America", users: 6234, percentage: 39.3 },
      { region: "Europe", users: 4567, percentage: 28.8 },
      { region: "Asia Pacific", users: 3456, percentage: 21.8 },
      { region: "Latin America", users: 1234, percentage: 7.8 },
      { region: "Others", users: 356, percentage: 2.3 }
    ]
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Users" size={20} color="var(--color-primary)" />
            </div>
            <span className="text-xs md:text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-md">
              +{userStats?.userGrowth}%
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {userStats?.totalUsers?.toLocaleString()}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Total Users</p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="UserCheck" size={20} color="var(--color-success)" />
            </div>
            <span className="text-xs md:text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
              Active
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {userStats?.activeUsers?.toLocaleString()}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Active Users</p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="UserPlus" size={20} color="var(--color-secondary)" />
            </div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
              This Month
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {userStats?.newUsersThisMonth?.toLocaleString()}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">New Users</p>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
            </div>
            <span className="text-xs md:text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-md">
              Growth
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 data-text">
            {userStats?.userGrowth}%
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">Monthly Growth</p>
        </div>
      </div>
      {/* Role Distribution and Enrollment Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Role Distribution */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Role Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4 md:space-y-6">
            {userStats?.roleDistribution?.map((role, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base font-medium text-foreground">{role?.role}</span>
                  <span className="text-sm md:text-base font-semibold text-foreground data-text">
                    {role?.count?.toLocaleString()} ({role?.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 md:h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${role?.color} transition-all duration-500`}
                    style={{ width: `${role?.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Trends */}
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Enrollment Trends</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-3 md:space-y-4">
            {userStats?.enrollmentTrends?.map((trend, index) => (
              <div key={index} className="flex items-center gap-3 md:gap-4">
                <span className="text-xs md:text-sm font-medium text-muted-foreground w-8 md:w-10">
                  {trend?.month}
                </span>
                <div className="flex-1 h-8 md:h-10 bg-muted rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 flex items-center justify-end pr-2 md:pr-3"
                    style={{ width: `${(trend?.enrollments / 3000) * 100}%` }}
                  >
                    <span className="text-xs md:text-sm font-semibold text-white data-text">
                      {trend?.enrollments?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Regions */}
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Users by Region</h3>
          <Icon name="Globe" size={20} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {userStats?.topRegions?.map((region, index) => (
            <div key={index} className="text-center p-3 md:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2 data-text">
                {region?.users?.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm font-medium text-muted-foreground mb-1">
                {region?.region}
              </div>
              <div className="text-xs md:text-sm font-semibold text-primary data-text">
                {region?.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserStatsTab;