import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageMetrics = ({ data }) => {
    if (!data) return null;

    // Calculate percentages for the active/inactive bar
    const totalUsers = data.activeUsers + data.inactiveUsers;
    const activePercent = (data.activeUsers / totalUsers) * 100;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Average Session & User Ratio */}
            <div className="lg:col-span-1 space-y-6">
                {/* Avg Session */}
                <div className="bg-card p-6 rounded-xl border border-border shadow-elevation-1">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="Clock" size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Avg. Session</h3>
                            <p className="text-sm text-muted-foreground">Time spent per login</p>
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">{data.avgSession}</div>
                    <div className="text-sm text-success flex items-center gap-1">
                        <Icon name="TrendingUp" size={14} />
                        <span>+12% vs last period</span>
                    </div>
                </div>

                {/* User Ratio */}
                <div className="bg-card p-6 rounded-xl border border-border shadow-elevation-1">
                    <h3 className="text-lg font-semibold text-foreground mb-4">User Status</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-success">Active ({data.activeUsers.toLocaleString()})</span>
                        <span className="text-sm font-medium text-muted-foreground">Inactive ({data.inactiveUsers.toLocaleString()})</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-success transition-all duration-500"
                            style={{ width: `${activePercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                        {activePercent.toFixed(1)}% of total registered users are currently active.
                    </p>
                </div>
            </div>

            {/* Course Access Frequency */}
            <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border shadow-elevation-1">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Course Access Frequency</h3>
                        <p className="text-sm text-muted-foreground">When users are accessing content</p>
                    </div>
                    <Icon name="BarChart" size={20} className="text-muted-foreground" />
                </div>

                <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                    {data.courseAccess.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-muted/30 rounded-t-lg relative h-full flex items-end overflow-hidden group-hover:bg-muted/50 transition-colors">
                                <div
                                    className="w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-lg"
                                    style={{ height: `${item.value}%` }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md transition-opacity whitespace-nowrap z-10">
                                        {item.value}%
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground text-center line-clamp-1 w-full">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsageMetrics;
