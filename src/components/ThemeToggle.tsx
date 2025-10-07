import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'desktop',
  className = '' 
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 dark:bg-gray-700 rounded-lg">
            {isDark ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Toggle appearance
            </p>
          </div>
        </div>
        
        {/* Toggle Switch */}
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
            isDark 
              ? 'bg-red-600' 
              : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={isDark}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDark ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }

  // Desktop variant
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
        isDark
          ? 'bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-700'
          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-300" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
};