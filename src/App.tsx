import { useState } from 'react';
import { LayoutDashboard, MessageSquare, BookOpen, Settings as SettingsIcon, Sparkles, HelpCircle } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Settings } from './components/Settings';
import { ClientSimulator } from './components/ClientSimulator';
import { ExtensionPopup } from './components/ExtensionPopup';
import { 
  INITIAL_MESSAGES, 
  INITIAL_FAQS, 
  INITIAL_SERVICE_DETAILS, 
  ClientMessage, 
  FAQItem, 
  ServiceDetail 
} from './services/mockData';

function App() {
  // Core states synchronized across the simulated extension environment
  const [messages, setMessages] = useState<ClientMessage[]>(INITIAL_MESSAGES);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetail>(INITIAL_SERVICE_DETAILS);
  
  // Configuration states
  const [apiKey, setApiKey] = useState('');
  const [tone, setTone] = useState('Warm & Friendly');
  const [length, setLength] = useState('Short & Sweet');
  const [language, setLanguage] = useState('English');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Interactive statistics
  const [totalRepliesCount, setTotalRepliesCount] = useState(42);
  const [timeSaved, setTimeSaved] = useState(3.5);

  // Navigation & Selected chat context
  const [activeTab, setActiveTab] = useState<'dashboard' | 'simulator' | 'knowledge' | 'settings'>('dashboard');
  const [selectedMessageId, setSelectedMessageId] = useState<string>(INITIAL_MESSAGES[0].id);

  // Helper functions to add new message or FAQ
  const handleAddMessage = (newMsg: ClientMessage) => {
    setMessages(prev => [newMsg, ...prev]);
    setSelectedMessageId(newMsg.id);
  };

  const handleAddFaq = (newFaq: FAQItem) => {
    setFaqs(prev => [...prev, newFaq]);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  const handleUpdateServiceDetails = (updatedDetails: ServiceDetail) => {
    setServiceDetails(updatedDetails);
  };

  const handleReplySent = (messageId: string, replyText: string) => {
    // Mark simulated message as replied
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, status: 'replied' };
      }
      return msg;
    }));
    
    // Update stats with replyText length modifier
    const words = replyText.split(/\s+/).length;
    setTotalRepliesCount(prev => prev + 1);
    // approx 6 minutes saved per message response + extra for long answers
    setTimeSaved(prev => prev + (words > 50 ? 0.15 : 0.1)); 
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <nav className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Header logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white">FreelanceAI Assist</h1>
              <span className="text-[10px] font-semibold text-indigo-400 tracking-wider uppercase">Pro Seller V3</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
              { id: 'simulator', label: 'Client Chat Simulator', icon: MessageSquare, badge: 'Active' },
              { id: 'knowledge', label: 'AI Knowledge Base', icon: BookOpen },
              { id: 'settings', label: 'Extension Settings', icon: SettingsIcon },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as 'dashboard' | 'simulator' | 'knowledge' | 'settings')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full font-semibold uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer: Extension Active status */}
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Daemon</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            AI V3 listener extension injected correctly. Ready to receive simulated chat hooks.
          </p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        
        {/* Top Bar Banner */}
        <header className="bg-slate-900/20 border-b border-slate-800 px-8 py-4 shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="h-5 w-5 text-indigo-400" />
            <div>
              <span className="text-xs font-bold text-slate-200 block">Interactive Sandbox & Workspace</span>
              <p className="text-[10px] text-slate-400">Explore live extension features, train settings, and simulate customer requests instantly.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">API Status:</span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              apiKey ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
            }`}>
              {apiKey ? 'Connected (Custom Key)' : 'Integrated Sandbox Mode'}
            </span>
          </div>
        </header>

        {/* Tab Content Router */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'dashboard' && (
            <Dashboard 
              messages={messages}
              totalRepliesCount={totalRepliesCount}
              timeSaved={timeSaved}
            />
          )}

          {activeTab === 'simulator' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Left Panel: Main chat flow */}
              <div className="xl:col-span-9">
                <ClientSimulator
                  messages={messages}
                  onAddMessage={handleAddMessage}
                  knowledgeBase={faqs}
                  serviceDetails={serviceDetails}
                  apiKey={apiKey}
                  tone={tone}
                  length={length}
                  language={language}
                  voiceEnabled={voiceEnabled}
                  selectedMessageId={selectedMessageId}
                  onSelectMessage={(msg) => setSelectedMessageId(msg.id)}
                  onReplySent={handleReplySent}
                />
              </div>
              
              {/* Right Panel: Visual representation of the Floating Extension Widget itself */}
              <div className="xl:col-span-3 space-y-4">
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interactive Extension Panel</span>
                  <p className="text-[10px] text-slate-500 mt-1">Tweak setting targets live and see outcomes</p>
                </div>
                <ExtensionPopup
                  voiceEnabled={voiceEnabled}
                  setVoiceEnabled={setVoiceEnabled}
                  tone={tone}
                  setTone={setTone}
                  length={length}
                  setLength={setLength}
                  language={language}
                  setLanguage={setLanguage}
                  knowledgeBase={faqs}
                  apiKey={apiKey}
                />
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeBase
              faqs={faqs}
              onAddFaq={handleAddFaq}
              onDeleteFaq={handleDeleteFaq}
              serviceDetails={serviceDetails}
              onUpdateServiceDetails={handleUpdateServiceDetails}
            />
          )}

          {activeTab === 'settings' && (
            <Settings
              apiKey={apiKey}
              onUpdateApiKey={setApiKey}
              tone={tone}
              onUpdateTone={setTone}
              length={length}
              onUpdateLength={setLength}
              language={language}
              onUpdateLanguage={setLanguage}
              voiceEnabled={voiceEnabled}
              onUpdateVoice={setVoiceEnabled}
            />
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
