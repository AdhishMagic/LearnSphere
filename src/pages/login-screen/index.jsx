import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustBadges from './components/TrustBadges';
import WelcomeSection from './components/WelcomeSection';
import RegisterForm from './components/RegisterForm';

const LoginScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full py-4 md:py-6 px-4 md:px-6 lg:px-8 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "'Crimson Text', serif" }}>
              LearnSphere
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
            <Icon name="HelpCircle" size={20} />
            <span className="hidden sm:inline">Need help?</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {isRegistering ? (
          <RegisterForm onLogin={() => setIsRegistering(false)} />
        ) : (
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="hidden lg:block">
                <WelcomeSection onRegister={() => setIsRegistering(true)} />
              </div>

              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-card rounded-2xl shadow-elevation-3 p-6 md:p-8 border border-border">
                  <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Sign In
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Enter your credentials to access your account
                    </p>
                  </div>

                  <LoginForm />

                  <TrustBadges />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    By signing in, you agree to our{' '}
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </div>

              <div className="lg:hidden">
                <WelcomeSection onRegister={() => setIsRegistering(true)} />
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="w-full py-4 md:py-6 px-4 md:px-6 lg:px-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="hover:text-foreground transition-colors">Support</button>
            <button className="hover:text-foreground transition-colors">Documentation</button>
            <button className="hover:text-foreground transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginScreen;