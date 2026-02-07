import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityBreakdown = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-elevation-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Activity Breakdown</h3>
                <Icon name="PieChart" size={20} className="text-muted-foreground" />
            </div>

            <div className="flex flex-col items-center justify-center py-4">
                {/* Donut Chart Representation using simplistic CSS conic-gradient if supported, or flex bar */}
                <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-6"
                    style={{
                        background: `conic-gradient(var(--color-primary) 0% ${data.learners}%, var(--color-secondary) ${data.learners}% 100%)`
                    }}
                >
                    <div className="w-36 h-36 bg-card rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-3xl font-bold text-foreground">{data.learners}%</span>
                        <span className="text-sm text-muted-foreground">Learner Activity</span>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-sm font-medium">Learners</span>
                        </div>
                        <span className="font-bold">{data.learners}%</span>
                    </div>
                    <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-secondary" />
                            <span className="text-sm font-medium">Instructors</span>
                        </div>
                        <span className="font-bold">{data.instructors}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityBreakdown;
