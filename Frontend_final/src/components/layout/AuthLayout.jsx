import React from "react";
import Logo from "../common/Logo";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-200">
      
      {/* Left: Cinematic Branding Panel (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-slate-950 via-slate-900 to-zinc-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
        
        {/* Top Logo */}
        <Logo />

        {/* Big Editorial Quote */}
        <div className="space-y-6 relative z-10 max-w-lg">
          <p className="font-heading font-bold text-3xl lg:text-4xl text-white leading-tight">
            &ldquo;Cinema is a mirror that can focus on the unseen.&rdquo;
          </p>
          <div className="text-xs text-white/50 tracking-wider uppercase font-semibold">
            &mdash; Denis Villeneuve
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-xs text-white/30 font-sans tracking-wide">
          &copy; {new Date().getFullYear()} CineCompass. All Rights Reserved.
        </div>
      </div>

      {/* Right: Forms Content Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:p-16 lg:p-24 bg-background">
        <div className="mx-auto w-full max-w-md space-y-8">
          
          {/* Mobile Logo Header */}
          <div className="flex md:hidden justify-center mb-6">
            <Logo />
          </div>

          {/* Form Header */}
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Children container */}
          <div className="mt-8">{children}</div>

        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
export { AuthLayout };
