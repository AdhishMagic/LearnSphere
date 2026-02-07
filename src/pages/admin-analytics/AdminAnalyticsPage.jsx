import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSidebar from '../../components/navigation/RoleSidebar';
import BreadcrumbTracker from '../../components/navigation/BreadcrumbTracker';
import TimeRangeSelector from './components/TimeRangeSelector';
import AnalyticsOverview from './components/AnalyticsOverview';
import UsageMetrics from './components/UsageMetrics';
import GrowthTrends from './components/GrowthTrends';
import ActivityBreakdown from './components/ActivityBreakdown';
import { analyticsData } from './mockData';

const AdminAnalyticsPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [timeRange, setTimeRange] = useState('today');

    const handleToggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const currentData = analyticsData[timeRange];

    return (
        <div className="min-h-screen bg-background">
            <RoleSidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={handleToggleSidebar}
                activeRole="admin"
            />
            <main className={`transition-all duration-250 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
                <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
                    <BreadcrumbTracker />

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                System Analytics
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground">
                                High-level platform metrics and growth insights
                            </p>
                        </div>
                        <TimeRangeSelector selectedRange={timeRange} onRangeChange={setTimeRange} />
                    </div>

                    {/* Analytics Content */}
                    <div className="space-y-6 md:space-y-8">
                        <AnalyticsOverview data={currentData.overview} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <GrowthTrends data={currentData.growth} />
                            </div>
                            <div className="lg:col-span-1">
                                <ActivityBreakdown data={currentData.activity} />
                            </div>
                        </div>

                        <UsageMetrics data={currentData.usage} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminAnalyticsPage;
