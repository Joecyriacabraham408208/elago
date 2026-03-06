"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ShieldAlert, ShieldCheck, Eye, EyeOff } from 'lucide-react';

type AdminRole = 'super_admin' | 'admin' | null;

export default function AdminAuthPage() {
  const [role, setRole] = useState<AdminRole>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ role, username, password });
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen bg-elago-dark text-white flex items-center justify-center p-4 lg:p-6 font-body">
      {/* Main Container */}
      <div className="w-full max-w-7xl h-[90vh] min-h-[700px] flex rounded-3xl overflow-hidden bg-elago-dark">
        
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/2 relative p-4">
          <div className="absolute inset-0 m-4 rounded-3xl overflow-hidden">
            {/* Using Unsplash source as configured in your next.config.js */}
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Abstract Landscape"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Gradient for smooth blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-elago-dark/90" />
            
            {/* Logo area */}
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <span className="font-display text-3xl font-bold tracking-wide">Elago</span>
              <span className="px-2 py-1 text-xs border border-white/30 rounded-md backdrop-blur-sm">Admin</span>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-8 left-8">
              <p className="text-white/60 text-xs">Image dynamically loaded via Unsplash</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
          
          <div className="w-full max-w-md mx-auto">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-12">
              <button className="w-10 h-10 rounded-full bg-elago-panel border border-elago-border flex items-center justify-center hover:bg-elago-card transition-colors">
                <ArrowLeft size={18} className="text-elago-muted" />
              </button>
              <div className="text-sm text-elago-muted">
                Already have an account? <a href="#" className="text-white ml-2 hover:text-elago-accent transition-colors px-3 py-1.5 rounded-lg bg-elago-panel border border-elago-border">Log in</a>
              </div>
            </div>

            {/* Header */}
            <h1 className="text-3xl sm:text-4xl font-display font-medium mb-8 leading-tight">
              Create Your Account to Manage Elago
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Role Selection Boxes */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('super_admin')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                    role === 'super_admin' 
                      ? 'bg-elago-card border-elago-accent text-white shadow-[0_0_15px_rgba(46,204,154,0.15)]' 
                      : 'bg-elago-panel border-elago-border text-elago-muted hover:bg-elago-card hover:border-elago-muted'
                  }`}
                >
                  <ShieldAlert size={24} className={`mb-2 ${role === 'super_admin' ? 'text-elago-accent' : 'text-elago-muted'}`} />
                  <span className="text-sm font-medium">Super Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                    role === 'admin' 
                      ? 'bg-elago-card border-elago-accent text-white shadow-[0_0_15px_rgba(46,204,154,0.15)]' 
                      : 'bg-elago-panel border-elago-border text-elago-muted hover:bg-elago-card hover:border-elago-muted'
                  }`}
                >
                  <ShieldCheck size={24} className={`mb-2 ${role === 'admin' ? 'text-elago-accent' : 'text-elago-muted'}`} />
                  <span className="text-sm font-medium">Admin</span>
                </button>
              </div>

              {/* Username Input */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-elago-panel border border-elago-border text-white px-5 py-4 rounded-xl outline-none focus:border-elago-muted transition-colors peer placeholder-transparent"
                  placeholder="Username"
                />
                <label className="absolute left-5 top-4 text-elago-muted text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-elago-dark peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:bg-elago-dark peer-valid:px-1 cursor-text pointer-events-none">
                  Username
                </label>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-elago-panel border border-elago-border text-white px-5 py-4 rounded-xl outline-none focus:border-elago-muted transition-colors peer placeholder-transparent pr-12"
                  placeholder="Password"
                />
                <label className="absolute left-5 top-4 text-elago-muted text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-elago-dark peer-focus:px-1 peer-valid:-top-2 peer-valid:text-xs peer-valid:bg-elago-dark peer-valid:px-1 cursor-text pointer-events-none">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-elago-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-elago-light font-medium py-4 px-5 rounded-xl flex items-center justify-between transition-colors mt-4 group"
              >
                <span>Create Admin Account</span>
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <ArrowRight size={16} />
                </div>
              </button>
            </form>

            {/* Footer Terms */}
            <div className="mt-8 text-xs text-elago-muted leading-relaxed">
              By signing up, you agree to Elago's <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>, <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-white transition-colors">Data Usage Properties</a>.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
