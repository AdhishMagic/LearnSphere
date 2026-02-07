import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { MOCK_ROLES } from '../mockData';

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'instructor' // Default to instructor, as learners register themselves
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    // Include all roles
    const createRoles = MOCK_ROLES;

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onCreate(formData);
            setFormData({ name: '', email: '', password: '', role: 'instructor' });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-elevation-2 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Create New User</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={errors.name}
                        />
                    </div>

                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="e.g. john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                        />
                    </div>

                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
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

                    <div>
                        <Select
                            label="Role"
                            options={createRoles}
                            value={formData.role}
                            onChange={(value) => setFormData({ ...formData, role: value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;
