import React, { createContext, useContext, useState, useEffect } from "react";
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "../../utils/helpers";

const ToastContext = createContext({
  showToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "p-4 rounded-card border shadow-elevation-3 flex items-start gap-3 bg-card text-foreground pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-200",
              toast.type === "success" && "border-secondary/20 bg-secondary/5",
              toast.type === "error" && "border-destructive/20 bg-destructive/5",
              toast.type === "warning" && "border-accent/20 bg-accent/5",
              toast.type === "info" && "border-brand-blue/20 bg-brand-blue/5"
            )}
          >
            {/* Toast Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" && <CheckCircle className="w-5 h-5 text-secondary" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-destructive" />}
              {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-accent" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-brand-blue" />}
            </div>
            
            {/* Message */}
            <p className="text-sm font-sans flex-grow leading-relaxed">
              {toast.message}
            </p>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 rounded-btn p-1 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all focus:outline-none"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

// Default component shell to compile
const Toast = () => null;
export default Toast;
