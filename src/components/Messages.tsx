
import { Send } from 'lucide-react';

export const Messages = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Inbox</h2>
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">J</div>
          <div>
            <h3 className="font-bold">John Doe</h3>
            <p className="text-slate-400">"Hey, can you help me with a new logo?"</p>
          </div>
        </div>
        <button className="bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-500 transition">
          <Send size={20} /> Generate AI Reply
        </button>
      </div>
    </div>
  );
};
