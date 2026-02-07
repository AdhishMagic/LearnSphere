import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import { getAverageRating } from '../mockData';

const ReviewsSection = ({ reviews, learner }) => {
    const [showAddReview, setShowAddReview] = useState(false);
    const averageRating = getAverageRating();

    const handleAddReview = () => {
        if (!learner.isLoggedIn) {
            console.log('[Review] User not logged in - redirect to login');
            return;
        }
        console.log('[Review] Opening add review form');
        setShowAddReview(true);
    };

    // Render stars for average rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-6 h-6 ${i < fullStars
                        ? 'text-yellow-400'
                        : i === fullStars && hasHalf
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                    }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div>
            {/* Rating Summary */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl font-bold text-amber-600">{averageRating}</div>
                        <div>
                            <div className="flex items-center gap-1 mb-1">
                                {renderStars(parseFloat(averageRating))}
                            </div>
                            <p className="text-sm text-amber-700">
                                Based on {reviews.length} reviews
                            </p>
                        </div>
                    </div>

                    {learner.isLoggedIn && (
                        <button
                            onClick={handleAddReview}
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Review
                        </button>
                    )}
                </div>
            </div>

            {/* Add Review Form (simplified) */}
            {showAddReview && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Write a Review</h4>
                    <textarea
                        placeholder="Share your experience with this course..."
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            onClick={() => setShowAddReview(false)}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                console.log('[Review] Submitting review');
                                setShowAddReview(false);
                            }}
                            className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            )}
        </div>
    );
};

export default ReviewsSection;
