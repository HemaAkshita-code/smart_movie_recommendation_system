import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, Check, Trash } from "lucide-react";
import { markNotificationsRead, clearNotifications } from "../../redux/dashboard/dashboardSlice";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.dashboard.notifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Mark read when opened
      dispatch(markNotificationsRead());
    }
  };

  return (
    <div className="relative font-sans select-none" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative p-2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
        aria-label={`View notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border/40 rounded-btn shadow-elevation-3 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">Notifications</span>
            {notifications.length > 0 && (
              <button
                onClick={() => dispatch(clearNotifications())}
                className="text-[10px] text-muted-foreground hover:text-destructive flex items-center gap-1 font-semibold"
              >
                <Trash className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* List items */}
          <div className="max-h-64 overflow-y-auto divide-y divide-border/10">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 hover:bg-muted/30 transition-colors text-xs space-y-1 relative ${
                    item.unread ? "bg-primary/5 border-l-2 border-primary" : ""
                  }`}
                >
                  <p className="text-foreground leading-relaxed pr-2 font-medium">{item.text}</p>
                  <span className="text-[10px] text-muted-foreground block">{item.time}</span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                All caught up. No new notifications.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
export { NotificationBell };
