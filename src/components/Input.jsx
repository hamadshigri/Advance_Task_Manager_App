import React from "react";
import { Plus } from "lucide-react";

const Input = ({value, onChange, onAdd, onKeyPress}) => {

  return (
    <div className="backdrop-blur-2xl bg-white/5 rounded-2xl border border-white/10 p-3 mb-4 shadow-2xl hover:bg-white/10 transition-all duration-300">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyPress}
          placeholder="What's on your mind?"
          className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-medium text-sm border border-white/5 backdrop-blur-xl transition-all"
        />
        <button
          onClick={onAdd}
          className="px-6 py-3 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-xl hover:shadow-purple-500/50 transition duration-300 flex items-center justify-center gap-2 font-bold text-sm hover:scale-105 active:scale-105"
        >
          <Plus size={18} /> Add
        </button>
      </div>
    </div>
  );
};

export default Input;
