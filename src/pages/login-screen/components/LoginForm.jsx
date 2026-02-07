import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = [
    { email: "admin@learnsphere.com", password: "Admin@2026", role: "admin", redirect: "/admin-dashboard" },
    { email: "instructor@learnsphere.com", password: "Instructor@2026", role: "instructor", redirect: "/admin-dashboard" },
    { email: "learner@learnsphere.com", password: "Learner@2026", role: "learner", redirect: "/learner-courses-listing" }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        navigate(user?.redirect);
      } else {
        setErrors({
          email: "Invalid email or password. Please check your credentials and try again.",
          password: "Invalid email or password. Please check your credentials and try again."
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />
      </div>
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <span className="text-card-foreground">Remember me</span>
        </label>
        <button
          type="button"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;