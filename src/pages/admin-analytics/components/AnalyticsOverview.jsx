import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, trend, change, icon, color }) => (
    <div className="bg-card p-4 md:p-6 rounded-xl border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}>
                <Icon name={icon} size={20} className={`text-${color}`} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                    <span className="text-xs md:text-sm font-medium">{change}%</span>
                </div>
            )}
        </div>
        <h3 className="text-sm md:text-base text-muted-foreground font-medium">{title}</h3>
        <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{value}</p>
    </div>
);

const AnalyticsOverview = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <MetricCard
                title="Daily Active Users"
                value={data.dailyActiveUsers.value.toLocaleString()}
                trend={data.dailyActiveUsers.trend}
                change={data.dailyActiveUsers.change}
                icon="Users"
                color="primary"
            />
            <MetricCard
                title="Monthly Active Users"
                value={data.monthlyActiveUsers.value.toLocaleString()}
                trend={data.monthlyActiveUsers.trend}
                change={data.monthlyActiveUsers.change}
                icon="Globe"
                color="secondary"
            />
            <MetricCard
                title="New Registrations"
                value={data.newRegistrations.value.toLocaleString()}
                trend={data.newRegistrations.trend}
                change={data.newRegistrations.change}
                icon="UserPlus"
                color="accent"
            />
            <MetricCard
                title="Course Engagement"
                value={`${data.courseEngagement.value}%`}
                trend={data.courseEngagement.trend}
                change={data.courseEngagement.change}
                icon="Activity"
                color="success"
            />
        </div>
    );
};

export default AnalyticsOverview;
