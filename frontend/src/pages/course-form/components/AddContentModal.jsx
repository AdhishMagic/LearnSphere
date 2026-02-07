import React from 'react';
import { X, Video, HelpCircle } from 'lucide-react';

const AddContentModal = ({ isOpen, onClose, onSelectType }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg border p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-6 text-center">Add Content</h2>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => onSelectType('lesson')}
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                        <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <Video size={32} />
                        </div>
                        <h3 className="font-medium text-gray-900">Add Lesson</h3>
                        <p className="text-sm text-gray-500 text-center mt-1">Video, Document, or Image</p>
                    </button>

                    <button
                        onClick={() => onSelectType('quiz')}
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
                    >
                        <div className="p-4 bg-purple-100 text-purple-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <HelpCircle size={32} />
                        </div>
                        <h3 className="font-medium text-gray-900">Add Quiz</h3>
                        <p className="text-sm text-gray-500 text-center mt-1">Multiple choice questions</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddContentModal;
