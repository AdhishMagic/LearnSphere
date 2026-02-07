import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onLogin }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const features = [
        {
            icon: "BookOpen",
            title: "Access Expert-Led Courses",
            description: "Learn from industry professionals with real-world experience"
        },
        {
            icon: "TrendingUp",
            title: "Track Your Learning Progress",
            description: "Monitor your learning journey with detailed analytics"
        },
        {
            icon: "Award",
            title: "Earn Points & Badges",
            description: "Get recognized for your achievements as you learn"
        }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Optional: Validate agreeToTerms if it was strict, but requirements listed it as optional UI element. 
        // I'll make it required for a realistic flow if checked.
        // "Optional UI Elements: Checkbox..." -> The element is optional, or the agreement? Usually required.
        // I will not block submit on it unless I want to be strict. I'll leave it as non-blocking for now or just visual.

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        email: formData.email,
                        password: formData.password
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const message = errorData?.detail || "Registration failed. Please try again.";
                    setErrors(prev => ({
                        ...prev,
                        email: message
                    }));
                    return;
                }

                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    agreeToTerms: false
                });

                onLogin?.();
            } catch (error) {
                setErrors(prev => ({
                    ...prev,
                    email: "Unable to register right now. Please try again."
                }));
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Section - Branding */}
                <div className="hidden lg:block space-y-8">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Join LearnSphere
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Create your account and start your learning journey today.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Icon name={feature.icon} size={24} color="var(--color-primary)" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-border">
                        <div className="flex items-center gap-2 text-base text-muted-foreground">
                            <p>
                                Already have an account?{' '}
                                <button onClick={onLogin} className="text-primary hover:text-primary/80 font-medium transition-colors">
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section - Form Card */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="bg-card rounded-2xl shadow-elevation-3 p-6 md:p-8 border border-border">
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                Create Account
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Enter your details to get started
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Full Name"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                error={errors.fullName}
                                required
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                                required
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={errors.password}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    label="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={errors.confirmPassword}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground cursor-pointer">
                                    I agree to the <button type="button" className="text-primary hover:text-primary/80 font-medium">Terms</button> & <button type="button" className="text-primary hover:text-primary/80 font-medium">Privacy Policy</button>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                variant="default"
                                fullWidth
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center lg:hidden">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <button onClick={onLogin} className="text-primary hover:text-primary/80 font-medium transition-colors">
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
