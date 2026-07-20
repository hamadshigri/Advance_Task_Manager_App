import { CheckCircle2, AlertCircle, X } from "lucide-react";
import React from "react";

const Notification = ({notification, onClose}) => {

  if (!notification) return null;

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
        <div
          className={`flex items-center gap-3 px-3 py-3 rounded-2xl shadow-2xl backdrop-blue-2xl border ${
            notification.type === "success"
              ? "bg-emerald-500/90 border-emerald-400/50 text-white"
              : notification.type === "error"
                ? "bg-rose-500/50 border-rose-400/50 text-white"
                : "bg-blue-500/90 border-blue-400/50 text-white"
          }`}
        >
          {notification.type == "success" && <CheckCircle2 size={18} />}
          {notification.type == "error" && <AlertCircle size={18} />}
          <span className="font-semibold text-sm">{notification.message}</span>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
