import React, { useEffect, useState } from 'react';

const PointsPopup = ({ points, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animate in
        setTimeout(() => setIsVisible(true), 50);

        // Auto-dismiss after 5 seconds
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isVisible ? 'bg-black/50' : 'bg-transparent'
            }`}>
            <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}>
                {/* Trophy Animation */}
                <div className="mb-4 relative">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full animate-bounce">
                        <span className="text-5xl">🏆</span>
                    </div>
                    {/* Sparkles */}
                    <span className="absolute top-0 left-1/4 text-2xl animate-ping">✨</span>
                    <span className="absolute top-2 right-1/4 text-xl animate-pulse">⭐</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Congratulations!
                </h2>

                {/* Points */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-4">
                    <p className="text-amber-600 font-medium mb-1">You earned</p>
                    <p className="text-4xl font-bold text-amber-500">+{points} points</p>
                </div>

                {/* Badge Progress (mock) */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Progress to next badge</p>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                            style={{ width: '75%' }}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">15 more points to Specialist</p>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                    Continue Learning
                </button>
            </div>
        </div>
    );
};

export default PointsPopup;
