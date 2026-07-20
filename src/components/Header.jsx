import React from "react";
import { Sparkles, TrendingUp } from "lucide-react";

const Header = ({ progress, activeTodos, totalTodos }) => {
  return (
    <>
      <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 mb-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white size={24}" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                TaskFlow
              </h1>
              <p className="text-purple-300 text-xs font-medium">
                Productivity Reimagined
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full border border-violet-400/30">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-white font-bold text-sm">
              {activeTodos} Active
            </span>
          </div>
        </div>

        {/* Progress Bar */}

        {totalTodos > 0 && (
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-xs font-semibold">
                Progress
              </span>
              <span className="text-white font-bold text-sm">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-linear-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
