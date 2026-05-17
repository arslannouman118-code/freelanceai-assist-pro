import React, { useState } from 'react';
import { Shield, Key, Save, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface SettingsProps {
  apiKey: string;
  onUpdateApiKey: (key: string) => void;
  tone: string;
  onUpdateTone: (tone: string) => void;
  length: string;
  onUpdateLength: (length: string) => void;
  language: string;
  onUpdateLanguage: (lang: string) => void;
  voiceEnabled: boolean;
  onUpdateVoice: (val: boolean) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  apiKey,
  onUpdateApiKey,
  tone,
  onUpdateTone,
  length,
  onUpdateLength,
  language,
  onUpdateLanguage,
  voiceEnabled,
  onUpdateVoice,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    onUpdateApiKey(inputKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Extension Settings</h2>
        <p className="text-xs text-slate-400">Configure secure Chrome API storage parameters, target tones, languages, and alerts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: secure storage configuration */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md space-y-6">
          
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-400" /> Chrome Storage & API Setup
            </h3>
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-bold animate-bounce">Saved!</span>
            )}
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl space-y-2 text-xs text-indigo-200 leading-relaxed">
            <div className="text-white font-bold flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-indigo-400" /> Chrome Extension Manifest V3 Secure Storage
            </div>
            Your OpenAI API Key is stored securely client-side via `chrome.storage.local`. It is only called directly from the extension's background service worker context to the OpenAI secure endpoint. It is never stored on any third-party servers.
          </div>

          <div className="space-y-4">
            {/* API Key input */}
            <div className="space-y-2">
              <label className="block text-xs text-slate-400 font-semibold uppercase">OpenAI API Key</label>
              <div className="relative flex gap-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Key className="h-4 w-4" />
                </div>
                <input
                  type={showKey ? 'text' : 'password'}
                  value={inputKey}
                  onChange={e => setInputKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute inset-y-0 right-2 flex items-center pr-3 text-slate-500 hover:text-slate-300"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {!inputKey && (
                <span className="text-[10px] text-amber-400/80 block">
                  💡 Leave blank to use our integrated Sandbox AI for instant simulation.
                </span>
              )}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Notification & Voice Triggers</h4>
              
              {/* Voice read-out settings */}
              <div className="flex justify-between items-center bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-200 block">Voice Alerts (Text-to-Speech)</span>
                  <span className="text-[10px] text-slate-400 block">Read incoming messages aloud automatically using the Web Speech API.</span>
                </div>
                <button
                  onClick={() => onUpdateVoice(!voiceEnabled)}
                  className={`h-6 w-11 rounded-full transition ${voiceEnabled ? 'bg-indigo-600' : 'bg-slate-800'} relative p-0.5`}
                >
                  <div className={`h-5 w-5 rounded-full bg-white transition-all ${voiceEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Save */}
            <button
              onClick={handleSaveSettings}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-md shadow-indigo-600/20"
            >
              <Save size={16} /> Save AI & System Configuration
            </button>

          </div>

        </div>

        {/* Right Column: default tone parameter adjustment preview */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" /> Default AI Reply Presets
            </h3>
            <p className="text-xs text-slate-400">Set the initial properties used by the extension background worker when analyzing messages.</p>
          </div>

          <div className="space-y-4">
            {/* Tone selection */}
            <div className="space-y-1.5">
              <label className="block text-xs text-slate-400 font-semibold uppercase">Default Tone</label>
              <select
                value={tone}
                onChange={e => onUpdateTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option>Warm & Friendly</option>
                <option>Professional</option>
                <option>Persuasive / Sales</option>
                <option>Direct & Brief</option>
              </select>
            </div>

            {/* Reply style */}
            <div className="space-y-1.5">
              <label className="block text-xs text-slate-400 font-semibold uppercase">Default Reply Style</label>
              <select
                value={length}
                onChange={e => onUpdateLength(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option>Short & Sweet</option>
                <option>Detailed</option>
                <option>Bullet Points</option>
              </select>
            </div>

            {/* Target Output Language */}
            <div className="space-y-1.5">
              <label className="block text-xs text-slate-400 font-semibold uppercase">Language Conversion</label>
              <select
                value={language}
                onChange={e => onUpdateLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option>English</option>
                <option>French</option>
                <option>German</option>
                <option>Spanish</option>
              </select>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 text-indigo-400" /> Quick Safety Reminder
              </div>
              Platform Terms of Service encourages prompt custom communication. The assistant is designed to augment your response time, but you must review all AI copy inside the text area before final submission.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
