import { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table';
import { DeleteIcon } from '../../components/ui/delete.js';
import { X, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────
function getInitials(name) {
  return (
    name
      ?.split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const avatarColors = [
  'bg-purple-500/20 border-purple-500/30 text-purple-400',
  'bg-pink-500/20   border-pink-500/30   text-pink-400',
  'bg-cyan-500/20   border-cyan-500/30   text-cyan-400',
  'bg-orange-500/20 border-orange-500/30 text-orange-400',
  'bg-green-500/20  border-green-500/30  text-green-400',
];

function getAvatarColor(index) {
  return avatarColors[index % avatarColors.length];
}

// ── Detail Modal ───────────────────────────────────────────
function LeadModal({ lead, index, onClose }) {
  if (!lead) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Card */}
      <div
        className="relative z-10 w-full max-w-md bg-[#0f1e38] border border-[#1361b6]/50 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#1361b6]/40 to-[#1b2a4a] px-6 pt-8 pb-6 flex flex-col items-center gap-3">
          <div
            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-bold ${getAvatarColor(index)}`}
          >
            {getInitials(lead.name)}
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold text-lg">{lead.name}</h2>
            <p className="text-gray-400 text-xs mt-1 flex items-center justify-center gap-1">
              <Calendar size={12} />
              Received {formatDate(lead.created_at)}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Mail size={14} className="text-blue-400" />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Email</p>
              <a
                href={`mailto:${lead.email}`}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors break-all"
              >
                {lead.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
              <Phone size={14} className="text-green-400" />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Phone</p>
              <a
                href={`tel:${lead.phone}`}
                className="text-gray-200 hover:text-white text-sm transition-colors"
              >
                {lead.phone}
              </a>
            </div>
          </div>

          {/* Message */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={14} className="text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-xs mb-0.5">Message</p>
              <p className="text-gray-300 text-sm leading-relaxed break-words">
                {lead.message}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-5 flex gap-3">
          <a
            href={`mailto:${lead.email}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <Mail size={14} />
            Send Email
          </a>
          <a
            href={`tel:${lead.phone}`
            }
            className="flex-1 flex items-center justify-center gap-2 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <Phone size={14} />
            Call Now
          </a >
        </div >
      </div >
    </div >
  );
}

// ── Main Component ─────────────────────────────────────────
export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    api
      .get('/api/v1/leads')
      .then((res) => setLeads(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await api.delete(`/api/v1/leads/${id}`);
      if (response.status === 200) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full gap-4 sm:gap-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Leads
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              All incoming patient inquiries
            </p>
          </div>
          <span className="text-xs sm:text-sm text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
            Total: {leads.length}
          </span>
        </div>

        {/* ── Table Card ── */}
        <div className="flex flex-col flex-1 min-h-0 bg-[#1b2a4a]/60 border border-[#1361b6]/40 rounded-2xl shadow-lg overflow-hidden">

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-gray-400 text-sm">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
              Loading leads...
            </div>

            /* Empty */
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-400 text-sm gap-2">
              <span className="text-4xl">📋</span>
              <p>No leads found</p>
            </div>

            /* Table — single scroll, header + body together */
          ) : (
            <div className="
              flex-1 min-h-0
              overflow-auto
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]
            ">
              <Table className="w-full min-w-[420px]">

                {/* Sticky Header */}
                <TableHeader>
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="
                      sticky top-0 z-10
                      bg-[#1b2a4a]
                      text-gray-400 font-semibold text-xs uppercase tracking-wider
                      px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                      w-10
                    ">
                      #
                    </TableHead>
                    <TableHead className="
                      sticky top-0 z-10
                      bg-[#1b2a4a]
                      text-gray-400 font-semibold text-xs uppercase tracking-wider
                      px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                      min-w-[140px] sm:min-w-[180px]
                    ">
                      Name
                    </TableHead>
                    <TableHead className="
                      sticky top-0 z-10
                      bg-[#1b2a4a]
                      text-gray-400 font-semibold text-xs uppercase tracking-wider
                      px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                      min-w-[160px] sm:min-w-[200px]
                    ">
                      Received Date
                    </TableHead>
                    <TableHead className="
                      sticky top-0 z-10
                      bg-[#1b2a4a]
                      text-gray-400 font-semibold text-xs uppercase tracking-wider
                      px-3 sm:px-5 lg:px-6 py-3 sm:py-4
                      text-right w-14 sm:w-16
                    ">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* Body */}
                <TableBody>
                  {leads.map((lead, index) => (
                    <TableRow
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setSelectedIndex(index);
                      }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >

                      {/* Index */}
                      <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-gray-500 text-xs sm:text-sm w-10">
                        {index + 1}
                      </TableCell>

                      {/* Name */}
                      <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 min-w-[140px] sm:min-w-[180px]">
                        <div className="flex items-center gap-2">
                          <div className={`
                            w-6 h-6 sm:w-8 sm:h-8
                            flex-shrink-0 rounded-full border
                            flex items-center justify-center
                            text-xs font-bold
                            ${getAvatarColor(index)}
                          `}>
                            {getInitials(lead.name)}
                          </div>
                          <span className="text-white font-medium text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px] lg:max-w-none">
                            {lead.name}
                          </span>
                        </div>
                      </TableCell>

                      {/* Received Date */}
                      <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 min-w-[160px] sm:min-w-[200px]">
                        <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                          <Calendar size={12} className="text-gray-500 flex-shrink-0" />
                          {formatDate(lead.created_at)}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-right w-14 sm:w-16">
                        <button
                          onClick={(e) => handleDelete(e, lead.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors group"
                          title="Delete lead"
                        >
                          <DeleteIcon
                            size={15}
                            className="text-gray-500 group-hover:text-red-400 transition-colors"
                          />
                        </button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <LeadModal
        lead={selectedLead}
        index={selectedIndex}
        onClose={() => setSelectedLead(null)}
      />
    </>
  );
}