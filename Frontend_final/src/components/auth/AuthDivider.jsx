import React from "react";

const AuthDivider = ({ label = "or continue with" }) => {
  return (
    <div className="relative flex items-center justify-center py-4 font-sans select-none">
      <div className="absolute inset-x-0 h-[1px] bg-border/40" />
      <span className="relative px-3 bg-background text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
        {label}
      </span>
    </div>
  );
};

export default AuthDivider;
export { AuthDivider };
