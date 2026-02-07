import React from 'react';
import Icon from '../../../components/AppIcon';

const GrowthTrends = ({ data }) => {
    if (!data) return null;

    // Find max value to scale the graph
    const maxUsers = Math.max(...data.map(item => item.users)) * 1.2;

    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-elevation-1">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Growth Trends</h3>
                    <p className="text-sm text-muted-foreground">User Registration vs Course Creation</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <span className="text-xs text-muted-foreground">Courses</span>
                    </div>
                </div>
            </div>

            <div className="h-64 relative flex items-end justify-between gap-2 px-2">
                {/* Y-Axis Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 25, 50, 75, 100].map((tick) => (
                        <div key={tick} className="w-full border-t border-border/40 h-0 relative">
                            <span className="absolute -top-3 -left-8 text-xs text-muted-foreground w-6 text-right">
                                {Math.round((maxUsers * tick) / 100).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

                {data.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end h-full gap-1 z-10 group relative">
                        {/* User Bar */}
                        <div
                            className="w-3 md:w-4 bg-primary rounded-t-sm hover:opacity-80 transition-all duration-500 relative"
                            style={{ height: `${(item.users / maxUsers) * 100}%` }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                Users: {item.users}
                            </div>
                        </div>

                        {/* Course Bar */}
                        <div
                            className="w-3 md:w-4 bg-secondary rounded-t-sm hover:opacity-80 transition-all duration-500 relative"
                            style={{ height: `${(item.courses / maxUsers) * 500}%` }} // Scale courses up for visibility
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                Courses: {item.courses}
                            </div>
                        </div>

                        <span className="text-[10px] md:text-xs text-muted-foreground mt-2 rotate-45 md:rotate-0 origin-left translate-y-2 md:translate-y-0">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GrowthTrends;
