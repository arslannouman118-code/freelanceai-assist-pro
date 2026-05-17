export interface DetectedIntent {
  projectType: string;
  budget: string;
  deliveryTime: string;
  revisionRequested: boolean;
  urgent: boolean;
  customOffer: boolean;
}

export interface ClientMessage {
  id: string;
  sender: string;
  avatarColor: string;
  avatarLetter: string;
  message: string;
  timestamp: string;
  detectedIntent?: DetectedIntent;
  priority: 'High' | 'Medium' | 'Low';
  language: string;
  status: 'unread' | 'read' | 'replied';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'delivery' | 'portfolio';
}

export interface ServiceDetail {
  skills: string[];
  portfolioLinks: string[];
  pricingStructure: {
    basic: string;
    standard: string;
    premium: string;
  };
  deliveryPackages: string;
}

export const INITIAL_MESSAGES: ClientMessage[] = [
  {
    id: 'msg-1',
    sender: 'Alex Rivera (TechStart)',
    avatarColor: 'from-indigo-500 to-blue-500',
    avatarLetter: 'A',
    message: 'Hey! I need a React dashboard with Tailwind CSS. We need a total of 8 pages. Can you deliver this by Friday? Our budget is $450. Let me know if you are available to start now.',
    timestamp: 'Just now',
    priority: 'High',
    language: 'English',
    status: 'unread',
    detectedIntent: {
      projectType: 'React Dashboard & Tailwind CSS',
      budget: '$450',
      deliveryTime: 'Friday (Urgent)',
      revisionRequested: false,
      urgent: true,
      customOffer: true
    }
  },
  {
    id: 'msg-2',
    sender: 'Sophie Dubois',
    avatarColor: 'from-purple-500 to-pink-500',
    avatarLetter: 'S',
    message: 'Bonjour, your portfolio looks amazing. Do you also have experience with Figma design conversions? What are your standard rates, and how many revisions do you allow per project?',
    timestamp: '5 mins ago',
    priority: 'Medium',
    language: 'French',
    status: 'unread',
    detectedIntent: {
      projectType: 'Figma to React Conversion',
      budget: 'Not specified (Asked for rates)',
      deliveryTime: 'Standard timeframe',
      revisionRequested: true,
      urgent: false,
      customOffer: false
    }
  },
  {
    id: 'msg-3',
    sender: 'Markus Weber',
    avatarColor: 'from-teal-500 to-emerald-500',
    avatarLetter: 'M',
    message: 'Hi there! We liked your gig. Could you send us some links to live websites you have coded? Also, do you provide ongoing maintenance after the project is finished?',
    timestamp: '2 hours ago',
    priority: 'Medium',
    language: 'German',
    status: 'read',
    detectedIntent: {
      projectType: 'Web Development',
      budget: 'Unspecified',
      deliveryTime: 'Post-delivery maintenance',
      revisionRequested: false,
      urgent: false,
      customOffer: false
    }
  },
  {
    id: 'msg-4',
    sender: 'Daniel Chen',
    avatarColor: 'from-amber-500 to-orange-500',
    avatarLetter: 'D',
    message: 'URGENT: The landing page you built has a layout issue on mobile safari. The hero section overlaps. Can you look at this right away? We have an active ad campaign running.',
    timestamp: '3 hours ago',
    priority: 'High',
    language: 'English',
    status: 'replied',
    detectedIntent: {
      projectType: 'Mobile Responsive Bug Fix',
      budget: 'Under original contract',
      deliveryTime: 'ASAP / Urgent',
      revisionRequested: true,
      urgent: true,
      customOffer: false
    }
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in modern front-end development using React.js, Next.js, Vite, TypeScript, Tailwind CSS, and Framer Motion for smooth, premium animations.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'What is your revision policy?',
    answer: 'I offer unlimited minor revisions within 14 days of delivery to ensure you are 100% satisfied with the final outcome. Major feature changes outside the original scope will require a custom offer.',
    category: 'delivery'
  },
  {
    id: 'faq-3',
    question: 'How much do custom projects cost?',
    answer: 'Custom projects are estimated based on the complexity, number of pages, and integrations. My basic rates start at $50/page, and I can prepare a tailored custom offer for you.',
    category: 'pricing'
  },
  {
    id: 'faq-4',
    question: 'Can you share your portfolio links?',
    answer: 'Sure! You can explore my live work at portfolio.dev/freelance-expert and my interactive design playground at github.com/developer-pro.',
    category: 'portfolio'
  }
];

export const INITIAL_SERVICE_DETAILS: ServiceDetail = {
  skills: ['React.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Vite', 'REST APIs', 'UI/UX Design conversion'],
  portfolioLinks: [
    'https://portfolio.creative-dev.com',
    'https://dashboard-preview.creative-dev.com',
    'https://github.com/creative-dev-pro'
  ],
  pricingStructure: {
    basic: '$100 for simple landing pages (1-2 sections, responsive)',
    standard: '$250 for complete multi-page websites (up to 5 pages, animations)',
    premium: '$500+ for advanced web apps (API integrations, state management, dashboard)'
  },
  deliveryPackages: 'Standard delivery for basic is 2 days, standard is 5 days, and premium is 10 days. Expedited delivery is available for an extra fee.'
};

export const QUICK_REPLY_TEMPLATES = [
  {
    id: 't-1',
    title: 'Availability Confirm',
    text: 'Hi {client_name}! Yes, I am absolutely available to start working on this right away. I have reviewed your requirements and they fit my expertise perfectly!'
  },
  {
    id: 't-2',
    title: 'Request More Details',
    text: 'Thank you for reaching out, {client_name}! Could you please provide a bit more information, wireframes, or design files (like Figma/Adobe XD) so I can give you a highly accurate quote and timeline?'
  },
  {
    id: 't-3',
    title: 'Portfolio Share',
    text: 'Hello {client_name}, I would love to help! You can check out my portfolio links here: {portfolio_links}. Let me know if any of these align with your design vision!'
  },
  {
    id: 't-4',
    title: 'Custom Offer Proposal',
    text: 'Hi {client_name}! Based on your project, I can set up a custom offer for you. For {project_type}, the pricing would be {pricing_estimate} with a delivery time of {delivery_estimate}. Shall I create the offer now?'
  }
];

export const ANALYTICS_HISTORY = {
  responseTimeMinutes: [25, 20, 18, 14, 11, 9, 8],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  intentDistribution: {
    'Budget & Pricing': 42,
    'Delivery & Availability': 28,
    'Portfolio requests': 18,
    'Urgent revisions': 12
  },
  aiAccuracyScore: 96,
  totalRepliesGenerated: 184,
  timeSavedHours: 15.4
};
