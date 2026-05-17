import React, { useState, useEffect } from 'react';
import { Send, Sparkles, CheckCircle2, Volume2, VolumeX, Bell, Zap } from 'lucide-react';
import { ClientMessage, FAQItem, ServiceDetail } from '../services/mockData';
import { generateReply } from '../services/openai';

interface ClientSimulatorProps {
  messages: ClientMessage[];
  onAddMessage: (message: ClientMessage) => void;
  knowledgeBase: FAQItem[];
  serviceDetails: ServiceDetail;
  apiKey: string;
  tone: string;
  length: string;
  language: string;
  voiceEnabled: boolean;
  onSelectMessage: (msg: ClientMessage) => void;
  selectedMessageId: string;
  onReplySent: (messageId: string, replyText: string) => void;
}

export const ClientSimulator: React.FC<ClientSimulatorProps> = ({
  messages,
  onAddMessage,
  knowledgeBase,
  serviceDetails,
  apiKey,
  tone,
  length,
  language,
  voiceEnabled,
  onSelectMessage,
  selectedMessageId,
  onReplySent,
}) => {
  const [chatInput, setChatInput] = useState('');
  const [newClientName, setNewClientName] = useState('Sarah Jenkins');
  const [newClientMessage, setNewClientMessage] = useState(
    "Hi! Can you build a premium landing page for my mobile app? Budget is $200. Let me know if we can finish this by Wednesday!"
  );
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSuggestedReply, setAiSuggestedReply] = useState('');
  const [customOfferPanel, setCustomOfferPanel] = useState(false);
  
  // Offer details state
  const [offerBudget, setOfferBudget] = useState('200');
  const [offerDelivery, setOfferDelivery] = useState('3');
  const [offerDescription, setOfferDescription] = useState('Premium Mobile Landing Page including Tailwind CSS and complete responsive layouts.');

  const currentMessage = messages.find(m => m.id === selectedMessageId) || messages[0];

  // Speak text if voice is enabled
  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger simulated incoming Freelance message
  const handleSimulateIncoming = () => {
    const randomId = 'msg-' + Date.now();
    const isUrgent = newClientMessage.toLowerCase().includes('urgent') || newClientMessage.toLowerCase().includes('wednesday') || newClientMessage.toLowerCase().includes('asap');
    
    const newMsg: ClientMessage = {
      id: randomId,
      sender: newClientName,
      avatarColor: 'from-rose-500 to-orange-500',
      avatarLetter: newClientName.charAt(0),
      message: newClientMessage,
      timestamp: 'Just now',
      priority: isUrgent ? 'High' : 'Medium',
      language: 'English',
      status: 'unread',
      detectedIntent: {
        projectType: 'Custom Freelance Task',
        budget: newClientMessage.match(/\$\d+/) ? newClientMessage.match(/\$\d+/)![0] : 'To be negotiated',
        deliveryTime: newClientMessage.toLowerCase().includes('wednesday') ? 'Wednesday' : '3 Days',
        revisionRequested: false,
        urgent: isUrgent,
        customOffer: true
      }
    };
    
    onAddMessage(newMsg);
    
    // Play simulated browser notification audio or speak
    if (voiceEnabled) {
      speakText(`New Freelance Message from ${newClientName}. ${newClientMessage.slice(0, 60)}`);
    }

    // Auto analyze & generate AI reply immediately in background
    triggerAIExtensionAssistant(newMsg);
  };

  const triggerAIExtensionAssistant = React.useCallback(async (msg: ClientMessage) => {
    setAiGenerating(true);
    try {
      const res = await generateReply(
        msg.message,
        msg.sender,
        knowledgeBase,
        serviceDetails,
        tone,
        length,
        language,
        apiKey
      );
      setAiSuggestedReply(res.reply);
    } catch (error) {
      console.error(error);
    } finally {
      setAiGenerating(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knowledgeBase, serviceDetails, tone, length, language, apiKey]);

  useEffect(() => {
    if (currentMessage) {
      triggerAIExtensionAssistant(currentMessage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMessageId, tone, length, language]);

  const handleSendReply = (textToSend: string) => {
    if (!textToSend.trim()) return;
    onReplySent(currentMessage.id, textToSend);
    setChatInput('');
    setAiSuggestedReply('');
  };

  const handleCreateCustomOffer = () => {
    const offerText = `✨ SPECIAL CUSTOM OFFER PROPOSAL ✨\n\n📌 Project Scope: ${offerDescription}\n💰 Total Budget: $${offerBudget}\n⏱ Delivery Time: ${offerDelivery} Days\n🔄 Revisions: Unlimited minor tweaks included.\n\nClick below to accept this offer. I'm ready to begin!`;
    setAiSuggestedReply(offerText);
    setCustomOfferPanel(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Side: Simulated Client Inbox Page */}
      <div className="lg:col-span-8 bg-slate-900/80 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden flex flex-col h-[680px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/10 via-slate-950/30 to-slate-900/10 -z-10" />
        
        {/* Freelance Header Simulator */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-700/50 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-xs text-slate-400 ml-2 font-mono">Simulator mode: inbox.freelance.io</span>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Injected with FreelanceAI V3
          </div>
        </div>

        {/* Split View: Conversations sidebar & active chat */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Simulated Chat Inbox List */}
          <div className="w-1/3 border-r border-slate-700/50 pr-3 flex flex-col gap-2.5 overflow-y-auto">
            <h3 className="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider">Messages</h3>
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => onSelectMessage(msg)}
                className={`w-full text-left p-3 rounded-xl transition flex flex-col gap-1.5 relative ${
                  msg.id === selectedMessageId
                    ? 'bg-slate-800/80 border border-indigo-500/30 shadow-md'
                    : 'bg-slate-900/30 border border-slate-800 hover:bg-slate-800/45'
                }`}
              >
                {msg.status === 'unread' && (
                  <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                )}
                <div className="flex items-center gap-2">
                  <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${msg.avatarColor} flex items-center justify-center text-[11px] font-bold text-white`}>
                    {msg.avatarLetter}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold truncate text-slate-200">{msg.sender}</h4>
                    <p className="text-[10px] text-slate-400">{msg.timestamp}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
                
                {/* Tag system */}
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                    msg.priority === 'High' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {msg.priority} Priority
                  </span>
                  {msg.detectedIntent?.urgent && (
                    <span className="bg-amber-500/15 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-semibold border border-amber-500/20 flex items-center gap-0.5">
                      <Zap className="h-2 w-2" /> Urgent
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active Chat Box */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-4">
              {/* Buyer Info Header */}
              <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/45 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${currentMessage.avatarColor} flex items-center justify-center font-bold text-white`}>
                    {currentMessage.avatarLetter}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{currentMessage.sender}</h3>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {voiceEnabled ? (
                    <Volume2 className="h-5 w-5 text-indigo-400 hover:text-indigo-300 cursor-pointer" onClick={() => speakText(currentMessage.message)} />
                  ) : (
                    <VolumeX className="h-5 w-5 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Message Thread */}
              <div className="flex flex-col gap-3">
                <div className="bg-slate-800/60 p-4 rounded-2xl max-w-[85%] border border-slate-700/55 self-start relative">
                  <p className="text-sm text-slate-200 leading-relaxed">{currentMessage.message}</p>
                  <span className="text-[10px] text-slate-400 block mt-1 text-right">{currentMessage.timestamp}</span>
                </div>

                {currentMessage.status === 'replied' && (
                  <div className="bg-indigo-600/20 p-4 rounded-2xl max-w-[85%] border border-indigo-500/40 self-end relative">
                    <p className="text-sm text-indigo-100 leading-relaxed">
                      Hi! Thanks for the request. We have reviewed the details and are excited to collaborate. Let me know if you are ready to proceed with a custom offer!
                    </p>
                    <span className="text-[10px] text-indigo-300 block mt-1 text-right">Replied</span>
                  </div>
                )}
              </div>
            </div>

            {/* Extension Injected Toolbar inside Freelance Input Box */}
            <div className="border-t border-slate-700/50 pt-3 flex flex-col gap-3 mt-2">
              {/* Smart AI Intent Badges (Extension Injected) */}
              {currentMessage.detectedIntent && (
                <div className="bg-slate-800/45 border border-indigo-500/25 rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> AI Analyzer (Realtime Extension Detection)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Intents parsed successfully</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                    <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800 text-[11px]">
                      <span className="text-slate-400 block text-[9px]">Project Type</span>
                      <strong className="text-slate-200 truncate block">{currentMessage.detectedIntent.projectType}</strong>
                    </div>
                    <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800 text-[11px]">
                      <span className="text-slate-400 block text-[9px]">Est. Budget</span>
                      <strong className="text-emerald-400 truncate block">{currentMessage.detectedIntent.budget}</strong>
                    </div>
                    <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800 text-[11px]">
                      <span className="text-slate-400 block text-[9px]">Timeframe</span>
                      <strong className="text-amber-400 truncate block">{currentMessage.detectedIntent.deliveryTime}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Offer panel */}
              {customOfferPanel && (
                <div className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase">FreelanceAI Custom Offer Builder</h4>
                    <button onClick={() => setCustomOfferPanel(false)} className="text-slate-400 hover:text-slate-200 text-xs">Cancel</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400">Budget ($)</label>
                      <input
                        type="number"
                        value={offerBudget}
                        onChange={e => setOfferBudget(e.target.value)}
                        className="w-full bg-slate-800 text-white text-xs rounded p-1.5 border border-slate-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400">Delivery (Days)</label>
                      <input
                        type="number"
                        value={offerDelivery}
                        onChange={e => setOfferDelivery(e.target.value)}
                        className="w-full bg-slate-800 text-white text-xs rounded p-1.5 border border-slate-700 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Offer Description</label>
                    <textarea
                      value={offerDescription}
                      onChange={e => setOfferDescription(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-800 text-white text-xs rounded p-1.5 border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleCreateCustomOffer}
                    className="w-full bg-indigo-600 text-white text-xs py-1.5 rounded font-semibold hover:bg-indigo-500"
                  >
                    Inject Custom Offer Proposal
                  </button>
                </div>
              )}

              {/* Message input box and actions */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Respond to ${currentMessage.sender}...`}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendReply(chatInput)}
                  className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSendReply(chatInput)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 flex items-center justify-center transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Injected Extension Content Script HUD */}
      <div className="lg:col-span-4 space-y-6">
        {/* Custom simulated browser notification center */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-5 backdrop-blur-md relative">
          <div className="absolute -top-2.5 -right-2.5 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
            <Bell className="h-3 w-3" /> active notification script
          </div>
          <h3 className="text-sm font-bold text-indigo-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" /> Realtime Notifications
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Simulate what happens when a buyer messages you. The Manifest V3 service worker triggers a push notification instant action block:
          </p>
          
          <div className="space-y-3.5 bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Buyer Name</label>
              <input
                type="text"
                value={newClientName}
                onChange={e => setNewClientName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold uppercase mb-1">Buyer Message</label>
              <textarea
                value={newClientMessage}
                onChange={e => setNewClientMessage(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
            <button
              onClick={handleSimulateIncoming}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/15"
            >
              <Bell className="h-3.5 w-3.5" /> Trigger Desktop Alert & Analysis
            </button>
          </div>
        </div>

        {/* AI Reply Preview Panel */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-5 backdrop-blur-md relative">
          <div className="absolute -top-2.5 -right-2.5 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Safety Active
          </div>
          <h3 className="text-sm font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" /> AI Smart Reply Assistant
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
            Review AI response here. Under platform terms of service, <strong>messages are never sent automatically</strong> without user approval.
          </p>

          {aiGenerating ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <div className="h-7 w-7 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              <p className="text-xs text-slate-400 font-mono">Analyzing intent & generating reply...</p>
            </div>
          ) : aiSuggestedReply ? (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl max-h-[260px] overflow-y-auto">
                <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-mono">{aiSuggestedReply}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setChatInput(aiSuggestedReply)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-1"
                >
                  Edit in Input
                </button>
                <button
                  onClick={() => handleSendReply(aiSuggestedReply)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-emerald-600/20"
                >
                  Approve & Send
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl">
              <Sparkles className="h-8 w-8 mx-auto text-slate-600 mb-2" />
              <p className="text-xs text-slate-500">Select an active conversation or simulate a new message to generate smart replies.</p>
            </div>
          )}

          {/* Quick Action Template Injection Buttons */}
          <div className="border-t border-slate-800 mt-4 pt-4 space-y-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Quick Templates Injection</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const text = `Hi ${currentMessage.sender}! Yes, I am absolutely available to get started immediately on your project. Let me know if we can hop on a quick chat!`;
                  setAiSuggestedReply(text);
                }}
                className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 text-[11px] p-2 rounded-lg transition truncate text-left font-medium"
              >
                ⚡ Available?
              </button>
              <button
                onClick={() => {
                  const text = `Hello ${currentMessage.sender}, I'd be happy to share my active live portfolio sites! Please check out these links:\n• ${serviceDetails.portfolioLinks.join('\n• ')}\n\nLet me know what style you like best!`;
                  setAiSuggestedReply(text);
                }}
                className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 text-[11px] p-2 rounded-lg transition truncate text-left font-medium"
              >
                📂 Share Portfolio
              </button>
              <button
                onClick={() => setCustomOfferPanel(true)}
                className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-indigo-400 text-[11px] p-2 rounded-lg transition truncate text-left font-medium col-span-2 flex items-center justify-center gap-1"
              >
                💼 Injected Custom Offer Builder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
