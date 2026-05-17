import React from 'react';
import { Shield, Sparkles, Volume2, VolumeX, Zap, BookOpen, LayoutGrid, RefreshCw } from 'lucide-react';
import { FAQItem } from '../services/mockData';

interface ExtensionPopupProps {
  voiceEnabled: boolean;
  setVoiceEnabled: (val: boolean) => void;
  tone: string;
  setTone: (val: string) => void;
  length: string;
  setLength: (val: string) => void;
  language: string;
  setLanguage: (val: string) => void;
  knowledgeBase: FAQItem[];
  apiKey: string;
}

export const ExtensionPopup: React.FC<ExtensionPopupProps> = ({
  voiceEnabled,
  setVoiceEnabled,
  tone,
  setTone,
  length,
  setLength,
  language,
  setLanguage,
  knowledgeBase,
  apiKey
}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-slate-900 border-2 border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Chrome Extension Top Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shadow shadow-indigo-600/30">
            F
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">FreelanceAI Assist Pro</h4>
            <span className="text-[8px] text-slate-400 block -mt-0.5">Extension Popup Mode (Manifest V3)</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 border border-slate-700 font-mono">
            v3.2.0
          </span>
        </div>
      </div>

      {/* Main extension content */}
      <div className="p-4 space-y-4">
        
        {/* Connection status */}
        <div className="bg-slate-950/60 border border-indigo-500/15 p-3 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold">Active Tab Context</span>
            <span className="text-xs font-medium text-indigo-300 font-mono truncate max-w-[180px] block">
              freelance.io/users/inbox...
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25 font-semibold">
            <Shield className="h-3 w-3" /> Secured
          </div>
        </div>

        {/* Quick Settings / Toggles */}
        <div className="space-y-2.5">
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Real-time Automation Controls</h5>
          
          <div className="grid grid-cols-2 gap-2">
            {/* Voice notification toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${
                voiceEnabled 
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-semibold">Voice Notifications</span>
                {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </div>
              <span className="text-[8px] text-slate-400">TTS read out alerts</span>
            </button>

            {/* Premium Instant Mode */}
            <div className="p-2.5 rounded-xl border text-left bg-slate-950 border-slate-800 text-slate-400 flex flex-col gap-1">
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-semibold text-indigo-400">Auto AI Assist</span>
                <Zap className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <span className="text-[8px] text-slate-400">Instant preview prep</span>
            </div>
          </div>
        </div>

        {/* AI Preset controls */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <h5 className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Quick AI Tuner
            </h5>
            <span className="text-[9px] text-slate-400 hover:underline cursor-pointer flex items-center gap-0.5">
              <RefreshCw className="h-2 w-2" /> reset
            </span>
          </div>

          {/* Tone */}
          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <label className="text-[9px] text-slate-400 block mb-0.5">Response Tone</label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[10px] p-1 rounded focus:outline-none focus:border-indigo-500 text-slate-200 font-semibold"
              >
                <option>Warm & Friendly</option>
                <option>Professional</option>
                <option>Persuasive / Sales</option>
                <option>Direct & Brief</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] text-slate-400 block mb-0.5">Reply Style</label>
              <select
                value={length}
                onChange={e => setLength(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[10px] p-1 rounded focus:outline-none focus:border-indigo-500 text-slate-200 font-semibold"
              >
                <option>Short & Sweet</option>
                <option>Detailed</option>
                <option>Bullet Points</option>
              </select>
            </div>
          </div>

          {/* Language & Safety config */}
          <div>
            <label className="text-[9px] text-slate-400 block mb-0.5">Output Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-[10px] p-1 rounded focus:outline-none focus:border-indigo-500 text-slate-200 font-semibold"
            >
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        {/* Extension Quick Knowledge View */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> Extension FAQ Index ({knowledgeBase.length})
          </span>
          <div className="max-h-[110px] overflow-y-auto space-y-1.5 pr-1">
            {knowledgeBase.map(faq => (
              <div key={faq.id} className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/60 text-[10px] flex justify-between items-center">
                <div className="truncate pr-2">
                  <strong className="text-slate-300 block truncate">{faq.question}</strong>
                  <span className="text-slate-500 block truncate text-[8px]">{faq.answer}</span>
                </div>
                <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300 shrink-0 font-mono">
                  {faq.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer key alert */}
        <div className="flex justify-between items-center text-[9px] text-slate-400 border-t border-slate-800/60 pt-3">
          <span className="flex items-center gap-1 text-indigo-400">
            <LayoutGrid className="h-3 w-3" /> V3 Manifest Ready
          </span>
          <span className={apiKey ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}>
            {apiKey ? '● API Key Connected' : '⚠️ Using Free Sandbox AI'}
          </span>
        </div>

      </div>
    </div>
  );
};
