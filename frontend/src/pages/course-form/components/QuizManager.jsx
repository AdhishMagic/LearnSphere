import React from 'react';
import { Plus, HelpCircle, Edit2, Trash2, Award } from 'lucide-react';
import Button from '../../../components/ui/Button';

const QuizManager = ({ data, onChange }) => {
    // Mock handler for now, as Quiz Builder details are in a separate module/modal usually
    const handleAddQuiz = () => {
        const newQuiz = {
            id: Date.now(),
            title: 'New Untitled Quiz',
            questionsCount: 0
        };
        const newQuizzes = [...(data.quizzes || []), newQuiz];
        onChange({ ...data, quizzes: newQuizzes });
    };

    const handleDeleteQuiz = (id) => {
        if (window.confirm('Delete this quiz?')) {
            const newQuizzes = data.quizzes.filter(q => q.id !== id);
            onChange({ ...data, quizzes: newQuizzes });
        }
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Quizzes</h2>
                    <p className="text-gray-600">
                        Assess learner understanding with quizzes.
                    </p>
                </div>
                <Button onClick={handleAddQuiz}>
                    <Plus size={18} className="mr-2" /> Add Quiz
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.quizzes?.length > 0 ? (
                    data.quizzes.map((quiz, index) => (
                        <div
                            key={quiz.id}
                            className="bg-white p-5 rounded-lg border flex items-center justify-between hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <HelpCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                                        {quiz.title}
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-normal">
                                            {quiz.questionsCount} Questions
                                        </span>
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Passing this quiz is {quiz.mandatory ? 'required' : 'optional'}.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => console.log('Edit quiz', quiz.id)}>
                                    <Edit2 size={16} className="mr-2" /> Edit Content
                                </Button>
                                <button
                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete Quiz"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 border-2 border-dashed rounded-lg">
                        <Award size={40} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 mb-4">No quizzes added yet.</p>
                        <Button variant="outline" onClick={handleAddQuiz}>Create Your First Quiz</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizManager;
