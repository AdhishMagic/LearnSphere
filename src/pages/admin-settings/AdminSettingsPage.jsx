import React, { useState } from 'react';
import { initialSettings } from './mockData';
import GeneralSettings from './components/GeneralSettings';
import AccessControlSettings from './components/AccessControlSettings';
import CourseSettings from './components/CourseSettings';
import GamificationSettings from './components/GamificationSettings';
import SystemStatus from './components/SystemStatus';

const AdminSettingsPage = () => {
    const [settings, setSettings] = useState(initialSettings);

    const handleToggle = (section, key) => {
        const newValue = !settings[section][key];
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: newValue,
            },
        }));
        console.log(`[Admin Settings] ${section}.${key} updated to:`, newValue);
    };

    const handleChange = (section, key, value) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
        console.log(`[Admin Settings] ${section}.${key} updated to:`, value);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Platform Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <GeneralSettings
                        data={settings.general}
                        onToggle={(key) => handleToggle('general', key)}
                        onChange={(key, value) => handleChange('general', key, value)}
                    />
                    <AccessControlSettings
                        data={settings.accessControl}
                        onToggle={(key) => handleToggle('accessControl', key)}
                    />
                    <CourseSettings
                        data={settings.course}
                        onChange={(key, value) => handleChange('course', key, value)}
                    />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <GamificationSettings
                        data={settings.gamification}
                        onToggle={(key) => handleToggle('gamification', key)}
                    />
                    <SystemStatus data={settings.systemStatus} />
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
