import React from "react";
import { Check, Save, X, Trash2, Edit2 } from "lucide-react";

const TodoItem = ({
  index,
  todo,
  editingId,
  editText,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditTextChange,
  onEditKeyPress,
}) => {
  const isEditing = editingId == todo.id;

  return (
    <>
      <div
        className={`group backdrop-blur-2xl bg-white/5 hover:bg-white-10 rounded-xl p-3 flex items-center gap-3 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 ${todo.completed ? "opacity-50" : ""}`}
        style={{
          animation: `slideIn 0.4s ease-out ${index * 0.05}s backwards`,
        }}
      >
        <button
          onClick={() => onToggle(todo.id)}
          className={`shrink w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${todo.completed ? "bg-linear-to-br from-emerald-400 to-teal-500 border-emerald-400 shadow-lg shadow-emerald-400/50" : "border-white/30 hover:border-violet-400 hover:bg-violet-500/20"}`}
        >
          {todo.completed && (
            <Check size={14} className="text-white font-bold" />
          )}
        </button>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={onEditTextChange}
              onKeyDown={(e) => onEditKeyPress(e, todo.id)}
              className="flex-1 px-3 py-1.5 bg-white/10 text-white placeholder-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 font-medium text-sm border-white/10" autoFocus
            />
          </>
        ) : (
          <>
          <span className={`flex-1 font-medium text-sm transition-all duration-300 ${todo.completed ? "line-through text-white/40": "text-white"}`}>
            {todo.text}
          </span>
          </>
        )}

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {isEditing ? (<>
          <button onClick={() => onSaveEdit(todo.id)} className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center transform hover:scale-110 active:scale-95 border border-emerald-500/30">
            <Save size={14}/>
          </button>

          <button onClick={onCancelEdit} className="w-7 h-7 rounded-lg bg-white-500/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center transform hover:scale-110 active:scale-95">
            <X size={14}/>
          </button>

          </>) : (<>
          <button onClick={() => onStartEdit(todo.id, todo.text)} className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center transform hover:scale-110 active:scale-95 border border-blue-500/30">
            <Edit2 size={14}/>
          </button>

          <button onClick={() => onDelete(todo.id)} className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center transform hover:scale-110 active:scale-95 border border-rose-500/30 ">
            <Trash2 size={14}/>
          </button>
          </>)}
        </div>
      </div>
    </>
  );
};

export default TodoItem;
