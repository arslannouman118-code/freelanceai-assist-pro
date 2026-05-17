import React from 'react';
import { Clock, MessageSquare, Zap, CheckCircle2, Sparkles, Compass, Shield, Hourglass, Activity, AlertCircle } from 'lucide-react';
import { ClientMessage } from '../services/mockData';

interface DashboardProps {
  messages: ClientMessage[];
  totalRepliesCount: number;
  timeSaved: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  messages,
  totalRepliesCount,
  timeSaved
}) => {
  const totalUnread = messages.filter(m => m.status === 'unread').length;
  const totalReplied = messages.filter(m => m.status === 'replied').length;
  const avgResponseTime = '8.5m';

  // Distribution statistics
  const highPriorityCount = messages.filter(m => m.priority === 'High').length;
  const urgentCount = messages.filter(m => m.detectedIntent?.urgent).length;

  return (
    <div className="space-y-8">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-slate-900/50 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition" />
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Active Inbox Alerts</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{messages.length}</span>
              <span className="text-xs text-indigo-400 font-semibold">({totalUnread} unread)</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Real-time extension tracking active</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <MessageSquare className="h-6 w-6" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-slate-900/50 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition" />
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">AI Suggestions Speed</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{avgResponseTime}</span>
              <span className="text-xs text-emerald-400 font-semibold">-35% faster</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Avg response time under 10m</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-slate-900/50 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-pink-500/40 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition" />
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Replied with AI Assist</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{totalRepliesCount}</span>
              <span className="text-xs text-pink-400 font-semibold">({totalReplied} in simulator)</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Safety approval rate: 100%</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <Zap className="h-6 w-6" />
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-slate-900/50 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition" />
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Total Freelance Hours Saved</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{timeSaved.toFixed(1)}h</span>
              <span className="text-xs text-amber-400 font-semibold">⏱ Instant prep</span>
            </div>
            <span className="text-[11px] text-slate-500 block">Based on avg 5 min response typing</span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Hourglass className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Middle Layout: Performance Analysis & Client Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Response Time Tracking Card */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-400" /> Response Time Tracking
              </h3>
              <p className="text-xs text-slate-400">Visual weekly response time stats showing the AI acceleration effect</p>
            </div>
            <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full text-indigo-400 font-semibold">
              Last 7 Days
            </span>
          </div>

          {/* Custom Simulated Chart Bars */}
          <div className="flex items-end justify-between h-52 gap-4 pt-4 font-mono">
            {[
              { day: 'Mon', val: 25, label: '25m' },
              { day: 'Tue', val: 20, label: '20m' },
              { day: 'Wed', val: 18, label: '18m' },
              { day: 'Thu', val: 14, label: '14m' },
              { day: 'Fri', val: 11, label: '11m' },
              { day: 'Sat', val: 8, label: '8m', highlight: true },
              { day: 'Sun', val: 6, label: '6m', highlight: true }
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition duration-200">
                  {item.label}
                </span>
                <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden h-36 flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      item.highlight
                        ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-700 group-hover:bg-slate-600'
                    }`}
                    style={{ height: `${(item.val / 30) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 mt-6 pt-4 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block">Platform Requirement</span>
              <span className="text-sm font-bold text-emerald-400">Under 24 hrs</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Your AI Average</span>
              <span className="text-sm font-bold text-indigo-400">8.5 minutes</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Client Satisfaction Score</span>
              <span className="text-sm font-bold text-amber-400">99.8% Positive</span>
            </div>
          </div>
        </div>

        {/* Right: Client Priority Tagging and Smart Intent */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-pink-400" /> Real-time Intent Analytics
            </h3>
            <p className="text-xs text-slate-400">Distribution of topics detected in current active Freelance chats</p>
          </div>

          <div className="space-y-4">
            {/* Priority counts */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-rose-400" /> High Priority Messages
                </span>
                <strong className="text-slate-200">{highPriorityCount} chats</strong>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(highPriorityCount / messages.length) * 100}%` }} />
              </div>
            </div>

            {/* Urgent Orders count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-400" /> Urgent Delivery Milestones
                </span>
                <strong className="text-slate-200">{urgentCount} chats</strong>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(urgentCount / messages.length) * 100}%` }} />
              </div>
            </div>

            {/* Safety Rules and compliance banner */}
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-3.5 rounded-2xl text-xs text-indigo-300 flex gap-2.5">
              <Shield className="h-5 w-5 shrink-0 text-indigo-400" />
              <div>
                <strong className="block mb-0.5 text-slate-200">ToS Compliance Active</strong>
                To prevent account warnings, the FreelanceAI Extension strictly operates on a semi-automated "preview-before-send" safety layout.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* suggestions History */}
      <div className="bg-slate-900/40 border border-slate-700/40 rounded-3xl p-6 backdrop-blur-md space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" /> AI Suggestion & Action History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium uppercase tracking-wider">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Last Message</th>
                <th className="py-3 px-4">Priority Tag</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {messages.map(msg => (
                <tr key={msg.id} className="hover:bg-slate-800/20 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-200">{msg.sender}</td>
                  <td className="py-3.5 px-4 max-w-xs truncate">{msg.message}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                      msg.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25' : 'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      {msg.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`flex items-center gap-1 text-[10px] font-medium ${
                      msg.status === 'replied' ? 'text-emerald-400' : msg.status === 'read' ? 'text-slate-400' : 'text-indigo-400 animate-pulse'
                    }`}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> {msg.status === 'replied' ? 'Replied with AI' : msg.status === 'read' ? 'Analyzed' : 'Waiting Approval'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
