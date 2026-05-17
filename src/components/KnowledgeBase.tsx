import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Save, HelpCircle, BookOpen } from 'lucide-react';
import { FAQItem, ServiceDetail } from '../services/mockData';

interface KnowledgeBaseProps {
  faqs: FAQItem[];
  onAddFaq: (faq: FAQItem) => void;
  onDeleteFaq: (id: string) => void;
  serviceDetails: ServiceDetail;
  onUpdateServiceDetails: (details: ServiceDetail) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  faqs,
  onAddFaq,
  onDeleteFaq,
  serviceDetails,
  onUpdateServiceDetails,
}) => {
  // New FAQ states
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState<'general' | 'pricing' | 'delivery' | 'portfolio'>('general');
  const [showAddFaqForm, setShowAddFaqForm] = useState(false);

  // Service details edit state
  const [skillsText, setSkillsText] = useState(serviceDetails.skills.join(', '));
  const [portfolioText, setPortfolioText] = useState(serviceDetails.portfolioLinks.join('\n'));
  const [pricingBasic, setPricingBasic] = useState(serviceDetails.pricingStructure.basic);
  const [pricingStandard, setPricingStandard] = useState(serviceDetails.pricingStructure.standard);
  const [pricingPremium, setPricingPremium] = useState(serviceDetails.pricingStructure.premium);
  const [deliveryPackages, setDeliveryPackages] = useState(serviceDetails.deliveryPackages);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveServiceDetails = () => {
    onUpdateServiceDetails({
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
      portfolioLinks: portfolioText.split('\n').map(l => l.trim()).filter(Boolean),
      pricingStructure: {
        basic: pricingBasic,
        standard: pricingStandard,
        premium: pricingPremium
      },
      deliveryPackages: deliveryPackages
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    onAddFaq({
      id: 'faq-' + Date.now(),
      question: newQuestion,
      answer: newAnswer,
      category: newCategory
    });

    setNewQuestion('');
    setNewAnswer('');
    setShowAddFaqForm(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">AI Knowledge Base</h2>
          <p className="text-xs text-slate-400">Train the AI by customizing your profile, FAQs, gig pricing, and links.</p>
        </div>
        <button
          onClick={() => setShowAddFaqForm(!showAddFaqForm)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-indigo-600/25"
        >
          <Plus size={16} /> Add Custom FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Auto Service Details training data */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" /> Gig & Profile Details
            </h3>
            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-bold animate-bounce">Saved successfully!</span>
            )}
          </div>

          <div className="space-y-4">
            {/* Skills Tags */}
            <div>
              <label className="block text-xs text-slate-400 font-semibold uppercase mb-1">Core Freelance Skills (comma separated)</label>
              <input
                type="text"
                value={skillsText}
                onChange={e => setSkillsText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition font-mono"
              />
            </div>

            {/* Portfolio links list */}
            <div>
              <label className="block text-xs text-slate-400 font-semibold uppercase mb-1">Portfolio & Case Study Links (one per line)</label>
              <textarea
                value={portfolioText}
                onChange={e => setPortfolioText(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition font-mono resize-none"
              />
            </div>

            {/* Packages / Pricing Tier structures */}
            <div className="space-y-3">
              <label className="block text-xs text-slate-400 font-semibold uppercase">Gig Pricing Packages</label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Basic Pack</span>
                  <input
                    type="text"
                    value={pricingBasic}
                    onChange={e => setPricingBasic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs p-1.5 rounded text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Standard Pack</span>
                  <input
                    type="text"
                    value={pricingStandard}
                    onChange={e => setPricingStandard(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs p-1.5 rounded text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">Premium Pack</span>
                  <input
                    type="text"
                    value={pricingPremium}
                    onChange={e => setPricingPremium(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs p-1.5 rounded text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Standard delivery speed */}
            <div>
              <label className="block text-xs text-slate-400 font-semibold uppercase mb-1">Standard Delivery Timelines</label>
              <textarea
                value={deliveryPackages}
                onChange={e => setDeliveryPackages(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition resize-none"
              />
            </div>

            {/* Save button */}
            <button
              onClick={handleSaveServiceDetails}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-md shadow-indigo-600/20"
            >
              <Save size={16} /> Save Profile Details
            </button>
          </div>
        </div>

        {/* Right Column: custom AI FAQs and categories list */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Add FAQ Form Popover */}
          {showAddFaqForm && (
            <form onSubmit={handleAddFaq} className="bg-slate-900 border-2 border-indigo-500/30 rounded-3xl p-5 space-y-4 animate-fadeIn shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-indigo-400" /> Add New Custom FAQ
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">FAQ Question</label>
                  <input
                    type="text"
                    placeholder="e.g., Do you allow Figma files?"
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as 'general' | 'pricing' | 'delivery' | 'portfolio')}
                    className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="general">General Stack</option>
                    <option value="pricing">Pricing</option>
                    <option value="delivery">Delivery</option>
                    <option value="portfolio">Portfolio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">Answer (AI Context)</label>
                  <textarea
                    placeholder="Provide the answer detail that the AI assistant will use..."
                    value={newAnswer}
                    onChange={e => setNewAnswer(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-lg text-white focus:outline-none focus:border-indigo-500 resize-none"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddFaqForm(false)}
                  className="text-slate-400 hover:text-slate-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-indigo-500"
                >
                  Inject FAQ
                </button>
              </div>
            </form>
          )}

          {/* FAQ Feed list */}
          <div className="bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md space-y-4 h-[500px] overflow-y-auto">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-400" /> Live Trained FAQs ({faqs.length})
            </h3>
            
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex justify-between items-start hover:border-indigo-500/20 transition">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded font-mono text-indigo-300 uppercase font-bold">
                        {faq.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-200">{faq.question}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                  <button
                    onClick={() => onDeleteFaq(faq.id)}
                    className="text-rose-500/80 hover:text-rose-400 shrink-0 transition ml-2"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
