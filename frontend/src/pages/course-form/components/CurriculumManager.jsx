import React, { useState } from 'react';
import { Plus, GripVertical, Video, FileText, Image as ImageIcon, Edit2, Trash2, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../../../components/ui/Button';
import LessonEditorModal from './LessonEditorModal';
import QuizEditorModal from './QuizEditorModal';
import AddContentModal from './AddContentModal';

const CurriculumManager = ({ data, onChange, onNavigate }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Unified curriculum list
    const curriculum = data.curriculum || [];

    const handleAddItem = (item) => {
        const newCurriculum = [...curriculum, item];
        onChange({ ...data, curriculum: newCurriculum });
        setIsLessonModalOpen(false);
        setIsQuizModalOpen(false);
    };

    const handleUpdateItem = (updatedItem) => {
        const newCurriculum = curriculum.map(item => item.id === updatedItem.id ? updatedItem : item);
        onChange({ ...data, curriculum: newCurriculum });
        setIsLessonModalOpen(false);
        setIsQuizModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const newCurriculum = curriculum.filter(item => item.id !== id);
            onChange({ ...data, curriculum: newCurriculum });
        }
    };

    const openAddContent = () => {
        setEditingItem(null);
        setIsAddModalOpen(true);
    };

    const handleSelectType = (type) => {
        setIsAddModalOpen(false);
        if (type === 'lesson') {
            setIsLessonModalOpen(true);
        } else if (type === 'quiz') {
            setIsQuizModalOpen(true);
        }
    };

    const openEdit = (item) => {
        setEditingItem(item);
        if (item.type === 'quiz') {
            setIsQuizModalOpen(true);
        } else {
            setIsLessonModalOpen(true);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'video': return <Video size={16} />;
            case 'document': return <FileText size={16} />;
            case 'image': return <ImageIcon size={16} />;
            case 'quiz': return <HelpCircle size={16} />;
            default: return <FileText size={16} />;
        }
    };

    const getTypeLabel = (type) => {
        if (type === 'quiz') return 'Quiz';
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    return (
        <div className="max-w-4xl space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Curriculum</h2>
                    <p className="text-gray-600">
                        Manage your course content. Add lessons and quizzes to structure your course.
                    </p>
                </div>
                <Button onClick={openAddContent}>
                    <Plus size={18} className="mr-2" /> Add Content
                </Button>
            </div>

            <div className="space-y-3">
                {curriculum.length > 0 ? (
                    curriculum.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between border rounded-lg p-4 group hover:shadow-sm transition-shadow ${item.type === 'quiz' ? 'bg-purple-50 border-purple-100' : 'bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-gray-400 cursor-move">
                                    <GripVertical size={20} />
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${item.type === 'quiz' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span className={`flex items-center gap-1 font-medium ${item.type === 'quiz' ? 'text-purple-600' : 'text-gray-600'
                                            }`}>
                                            {getIcon(item.type)} {getTypeLabel(item.type)}
                                        </span>
                                        {item.duration && (
                                            <>
                                                <span>•</span>
                                                <span>{item.duration}</span>
                                            </>
                                        )}
                                        {item.questions && (
                                            <>
                                                <span>•</span>
                                                <span>{item.questions.length} Questions</span>
                                            </>
                                        )}
                                        {item.isFree && (
                                            <>
                                                <span>•</span>
                                                <span className="text-green-600 font-medium">Free Preview</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                    title="Edit"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 border-2 border-dashed rounded-lg">
                        <p className="text-gray-500 mb-4">No content added yet.</p>
                        <Button variant="outline" onClick={openAddContent}>Start Adding Content</Button>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center pt-8 border-t">
                <Button
                    variant="outline"
                    onClick={() => onNavigate('basics')}
                >
                    <ChevronLeft size={16} className="mr-2" /> Back
                </Button>

                <div className="flex flex-col items-end">
                    <Button
                        onClick={() => onNavigate('description')}
                        disabled={curriculum.length === 0}
                    >
                        Next <ChevronRight size={16} className="ml-2" />
                    </Button>
                    {curriculum.length === 0 && (
                        <p className="text-xs text-red-500 mt-2">
                            Add at least one lesson or quiz to continue.
                        </p>
                    )}
                </div>
            </div>

            <AddContentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSelectType={handleSelectType}
            />

            <LessonEditorModal
                isOpen={isLessonModalOpen}
                onClose={() => setIsLessonModalOpen(false)}
                onSave={editingItem ? handleUpdateItem : handleAddItem}
                lesson={editingItem}
            />

            <QuizEditorModal
                isOpen={isQuizModalOpen}
                onClose={() => setIsQuizModalOpen(false)}
                onSave={editingItem ? handleUpdateItem : handleAddItem}
                quiz={editingItem}
            />
        </div>
    );
};

export default CurriculumManager;
