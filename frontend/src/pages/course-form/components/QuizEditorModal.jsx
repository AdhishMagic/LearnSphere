import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check, Plus, Trash2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuizEditorModal = ({ isOpen, onClose, onSave, quiz = null }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        questions: [],
        rewards: { first: 100, second: 80, third: 50, fourth: 20 },
        type: 'quiz'
    });

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            if (quiz) {
                setFormData(quiz);
            } else {
                setFormData({
                    title: '',
                    description: '',
                    questions: [],
                    rewards: { first: 100, second: 80, third: 50, fourth: 20 },
                    type: 'quiz'
                });
            }
        }
    }, [quiz, isOpen]);

    if (!isOpen) return null;

    const isStep1Valid = !!formData.title;
    const isStep2Valid = formData.questions.length > 0;

    const handleNext = () => {
        if (step === 1 && isStep1Valid) setStep(2);
        if (step === 2 && isStep2Valid) setStep(3);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        onSave({ ...formData, id: quiz ? quiz.id : Date.now() });
        onClose();
    };

    const addQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            text: '',
            options: ['', '', '', ''],
            correctAnswer: 0
        };
        setFormData({ ...formData, questions: [...formData.questions, newQuestion] });
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        setFormData({ ...formData, questions: newQuestions });
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[qIndex].options[oIndex] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const removeQuestion = (index) => {
        const newQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData({ ...formData, questions: newQuestions });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg border flex flex-col h-[700px]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">
                        {quiz ? 'Edit Quiz' : 'Add New Quiz'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-center py-4 bg-gray-50 border-b">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === s ? 'bg-purple-600 text-white' :
                                    step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {step > s ? <Check size={16} /> : s}
                            </div>
                            {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-medium mb-4">Step 1: Quiz Basics</h3>
                            <Input
                                label="Quiz Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="e.g. React Fundamentals Quiz"
                            />

                            <div>
                                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                    placeholder="Instructions for the learner..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Step 2: Questions</h3>
                                <Button size="sm" onClick={addQuestion}>
                                    <Plus size={16} className="mr-1" /> Add Question
                                </Button>
                            </div>

                            {formData.questions.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 italic border-2 border-dashed rounded-lg">
                                    No questions added yet.
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {formData.questions.map((q, qIdx) => (
                                        <div key={q.id} className="p-4 border rounded-lg bg-gray-50 relative">
                                            <button
                                                onClick={() => removeQuestion(qIdx)}
                                                className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <div className="mb-3 pr-8">
                                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Question {qIdx + 1}</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded bg-white focus:outline-none focus:border-purple-500"
                                                    placeholder="Enter question text"
                                                    value={q.text}
                                                    onChange={(e) => updateQuestion(qIdx, 'text', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2 pl-4 border-l-2 border-purple-200">
                                                {q.options.map((opt, oIdx) => (
                                                    <div key={oIdx} className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name={`q-${q.id}`}
                                                            checked={q.correctAnswer === oIdx}
                                                            onChange={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                                                            className="text-purple-600 focus:ring-purple-500"
                                                        />
                                                        <input
                                                            type="text"
                                                            className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:border-purple-500"
                                                            placeholder={`Option ${oIdx + 1}`}
                                                            value={opt}
                                                            onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-medium mb-4">Step 3: Rewards</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Set experience points (XP) learners earn based on their attempts.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <Input
                                    label="1st Attempt"
                                    type="number"
                                    value={formData.rewards.first}
                                    onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, first: parseInt(e.target.value) } })}
                                />
                                <Input
                                    label="2nd Attempt"
                                    type="number"
                                    value={formData.rewards.second}
                                    onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, second: parseInt(e.target.value) } })}
                                />
                                <Input
                                    label="3rd Attempt"
                                    type="number"
                                    value={formData.rewards.third}
                                    onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, third: parseInt(e.target.value) } })}
                                />
                                <Input
                                    label="4th+ Attempts"
                                    type="number"
                                    value={formData.rewards.fourth}
                                    onChange={(e) => setFormData({ ...formData, rewards: { ...formData.rewards, fourth: parseInt(e.target.value) } })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 flex justify-between rounded-b-lg">
                    <Button
                        variant="ghost"
                        onClick={step === 1 ? onClose : handleBack}
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </Button>

                    {step < 3 ? (
                        <Button
                            onClick={handleNext}
                            disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                        >
                            Next <ChevronRight size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            Save Quiz
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizEditorModal;
