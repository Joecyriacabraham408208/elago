"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Eye, EyeOff, HelpCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState('Yasir Ekinci'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // State to track the selected role
  const [role, setRole] = useState<'super_admin' | 'admin'>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, role });
    
    // Sends the user to the map dashboard page after clicking Start Creating
    router.push('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4 lg:p-8 font-body">
      {/* Main Container */}
      <div className="w-full max-w-[1200px] h-[85vh] min-h-[700px] flex gap-12 lg:gap-24">
        
        {/* Left Side - Image Panel */}
        <div className="hidden lg:block w-1/2 relative rounded-[2rem] overflow-hidden">
          {/* Badge */}
          <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
            <span className="font-display text-2xl font-medium">Gen</span>
            <span className="border border-white/30 rounded-md px-1.5 py-0.5 text-sm backdrop-blur-sm">Ai</span>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
            alt="Surreal Landscape"
            fill
            className="object-cover"
            priority
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

          {/* Bottom text */}
          <div className="absolute bottom-6 left-8">
            <p className="text-white/40 text-[10px]">Image generated using by Adobe Firefly Image Model 2</p>
          </div>
        </div>

        {/* Right Side - Form Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-md mx-auto relative z-10">
          
          {/* Header text */}
          <h1 className="text-4xl sm:text-[2.75rem] leading-[1.1] font-display font-medium mb-12">
            Create Your Account to Unleash Your Dreams
          </h1>

          {/* Top Navigation Row */}
          <div className="flex items-center justify-between mb-8">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowLeft size={18} className="text-white/70" />
            </button>
            <div className="text-sm text-white/50">
              Already have an account?{' '}
              <Link href="/login" className="text-white border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors ml-2">
                Log in
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1A1A1A]/80 border border-elago-accent/50 text-white px-5 py-4 rounded-2xl outline-none transition-colors shadow-[0_0_15px_rgba(46,204,154,0.1)]"
                placeholder="Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1A]/50 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A]/50 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-white/30 transition-colors placeholder:text-white/30 pr-20"
                placeholder="Password"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3 text-white/40">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <HelpCircle size={18} className="cursor-help hover:text-white transition-colors" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-b from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 border border-white/10 text-white rounded-2xl py-4 px-6 flex items-center justify-between transition-all mt-6 group"
            >
              <span className="mx-auto font-medium text-[15px]">Start Creating</span>
              <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors absolute right-6">
                <ArrowRight size={16} />
              </div>
            </button>

            {/* Role Selection Buttons (Added Below Start Creating) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setRole('super_admin')}
                className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 transition-all duration-200 ${
                  role === 'super_admin'
                    ? 'bg-white/10 border-elago-accent text-white shadow-[0_0_10px_rgba(46,204,154,0.1)]'
                    : 'bg-transparent border-white/10 text-white/40 hover:bg-white/5 hover:text-white/70'
                }`}
              >
                <ShieldAlert size={16} className={role === 'super_admin' ? 'text-elago-accent' : ''} />
                <span className="text-sm font-medium">Super Admin</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 transition-all duration-200 ${
                  role === 'admin'
                    ? 'bg-white/10 border-elago-accent text-white shadow-[0_0_10px_rgba(46,204,154,0.1)]'
                    : 'bg-transparent border-white/10 text-white/40 hover:bg-white/5 hover:text-white/70'
                }`}
              >
                <ShieldCheck size={16} className={role === 'admin' ? 'text-elago-accent' : ''} />
                <span className="text-sm font-medium">Admin</span>
              </button>
            </div>

          </form>

          {/* Footer Terms */}
          <div className="mt-8 text-[11px] text-white/40 leading-relaxed max-w-[90%]">
            By signing in, you agree to Generative AI's <a href="#" className="underline hover:text-white/70 transition-colors underline-offset-2">Terms of Service</a>, <a href="#" className="underline hover:text-white/70 transition-colors underline-offset-2">Privacy Policy</a> and <a href="#" className="underline hover:text-white/70 transition-colors underline-offset-2">Data Usage Properties</a>.
          </div>

        </div>
      </div>
    </div>
  );
}
