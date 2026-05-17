import OpenAI from 'openai';
import { FAQItem, ServiceDetail, DetectedIntent } from './mockData';

// Intelligent client-side response generator to simulate AI when no API key is set
const generateLocalFallbackReply = (
  clientMessage: string,
  clientName: string,
  knowledgeBase: FAQItem[],
  services: ServiceDetail,
  tone: string,
  length: string,
  language: string
): { reply: string; detectedIntent: DetectedIntent } => {
  const text = clientMessage.toLowerCase();
  
  // Auto detect intent
  const isUrgent = text.includes('urgent') || text.includes('asap') || text.includes('fast') || text.includes('friday') || text.includes('right away') || text.includes('today');
  const isBudget = text.includes('budget') || text.includes('cost') || text.includes('price') || text.includes('pricing') || text.includes('how much') || text.includes('rates');
  const isDelivery = text.includes('delivery') || text.includes('when') || text.includes('timeframe') || text.includes('by when') || text.includes('how long');
  const isRevision = text.includes('revision') || text.includes('revisions') || text.includes('change') || text.includes('fix') || text.includes('bug') || text.includes('overlap');
  const isPortfolio = text.includes('portfolio') || text.includes('work') || text.includes('links') || text.includes('live') || text.includes('samples') || text.includes('github') || text.includes('websites');
  const isCustom = text.includes('custom offer') || text.includes('offer') || text.includes('proposal') || text.includes('quote');

  // Build the knowledge injection base
  let targetFaq = knowledgeBase.find(faq => 
    (isBudget && faq.category === 'pricing') || 
    (isDelivery && faq.category === 'delivery') || 
    (isPortfolio && faq.category === 'portfolio')
  ) || knowledgeBase[0];

  // Multi-language greetings
  let greeting = 'Hi';
  let signoff = 'Best regards,\nYour AI Assistant';
  if (language === 'French') {
    greeting = 'Bonjour';
    signoff = 'Cordialement,\nVotre Assistant AI';
  } else if (language === 'German') {
    greeting = 'Hallo';
    signoff = 'Mit freundlichen Grüßen,\nIhr KI-Assistent';
  } else if (language === 'Spanish') {
    greeting = 'Hola';
    signoff = 'Saludos cordiales,\nTu Asistente de IA';
  }

  // Base reply creation logic
  let replyText = '';
  
  if (isPortfolio) {
    replyText = `I'd love to share my work with you! You can explore my latest interactive React portfolios and live project previews here:\n${services.portfolioLinks.map(l => `• ${l}`).join('\n')}\n\nI specialize in ${services.skills.slice(0, 4).join(', ')}, and I build responsive dashboards and websites with custom UI layouts. Let me know if you'd like to see a live demonstration of any design!`;
  } else if (isBudget || isCustom) {
    replyText = `Thank you for detailing your requirements. Regarding the budget and rates:\n- Basic pages/sections start around $50 - $100.\n- ${services.pricingStructure.standard}.\n- For advanced dashboards, pricing typically starts from ${services.pricingStructure.premium.split('for')[0]}.\n\nI would be delighted to design a tailor-made custom offer that perfectly aligns with your timeline and scope. Could we discuss your pages in a bit more detail?`;
  } else if (isUrgent || isDelivery) {
    replyText = `Regarding delivery schedules, my standard package timeline is about ${services.deliveryPackages.toLowerCase()}. However, since you mentioned this is urgent, I can expedite my workflow to meet your deadline! I can prioritize your project and deliver high-quality files safely. Shall we align on the project milestones?`;
  } else if (isRevision) {
    replyText = `To guarantee your peace of mind, I provide a highly flexible revision structure. ${targetFaq ? targetFaq.answer : 'I offer unlimited minor revisions within 14 days to ensure absolute perfection.'} Your satisfaction with the layout, responsiveness, and functional widgets is my top priority.`;
  } else {
    // General responsive reply
    replyText = `Thank you for reaching out to me! I have reviewed your request and would be absolutely thrilled to help you bring your project to life. I specialize in React.js, Tailwind CSS, and creating beautiful glassmorphic responsive apps. Let's discuss your goals and get started!`;
  }

  // Apply Tone adjustment
  if (tone === 'Warm & Friendly') {
    replyText = `✨ Great to connect with you, ${clientName}! 😊\n\n` + replyText + `\n\nLooking forward to creating something amazing together! Let me know what you think. 🚀`;
  } else if (tone === 'Persuasive / Sales') {
    replyText = `Hello ${clientName}!\n\nThis is an exciting project and falls exactly within my core specialty. I have completed over 45+ custom responsive dashboards and high-converting landing pages with 100% client satisfaction. \n\n` + replyText + `\n\nLet's get this started today so we can beat the deadline! I am ready to jump in.`;
  } else if (tone === 'Direct & Brief') {
    // Shorten reply
    replyText = `Hi ${clientName}. I can absolutely help with this. ${replyText.slice(0, 150)}... Let me know if you are ready to proceed with a custom offer!`;
  } else {
    // Professional
    replyText = `${greeting} ${clientName},\n\n` + replyText + `\n\n${signoff}`;
  }

  // Apply length adjustment
  if (length === 'Short & Sweet') {
    replyText = replyText.split('\n\n')[0] + `\n\nLet me know if this works for you!`;
  } else if (length === 'Bullet Points') {
    replyText = replyText.replace(/\. /g, '.\n• ');
  }

  return {
    reply: replyText,
    detectedIntent: {
      projectType: isPortfolio ? 'Portfolio Request' : isBudget ? 'Budget Discussion' : isDelivery ? 'Delivery Time Inquiry' : 'Custom Web App Inquiry',
      budget: isBudget ? '$100 - $500' : 'TBD',
      deliveryTime: isUrgent ? 'Urgent / ASAP' : 'Standard (3-5 days)',
      revisionRequested: isRevision,
      urgent: isUrgent,
      customOffer: isCustom || isBudget
    }
  };
};

export const generateReply = async (
  clientMessage: string,
  clientName: string,
  knowledgeBase: FAQItem[],
  services: ServiceDetail,
  tone: string,
  length: string,
  language: string,
  apiKey?: string
): Promise<{ reply: string; detectedIntent: DetectedIntent }> => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY' || apiKey.trim() === '') {
    // Simulate a short network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateLocalFallbackReply(clientMessage, clientName, knowledgeBase, services, tone, length, language);
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const prompt = `
      You are a premium Freelance Seller assistant extension. 
      Generate a professional reply to this Freelance client message.
      
      Client Name: "${clientName}"
      Client Message: "${clientMessage}"
      Preferred Tone: "${tone}" (Professional, Warm & Friendly, Persuasive / Sales, Direct & Brief)
      Preferred Length: "${length}" (Short & Sweet, Detailed, Bullet Points)
      Target Output Language: "${language}"
      
      Use the following Custom Knowledge Base FAQs to formulate the reply if relevant:
      ${knowledgeBase.map(faq => `Q: ${faq.question} | A: ${faq.answer}`).join('\n')}
      
      Use the following Service Details:
      - Skills: ${services.skills.join(', ')}
      - Portfolio Links: ${services.portfolioLinks.join(', ')}
      - Pricing Structure: Basic (${services.pricingStructure.basic}), Standard (${services.pricingStructure.standard}), Premium (${services.pricingStructure.premium})
      - Delivery Packages: ${services.deliveryPackages}
      
      Safety Rule: NEVER auto-send the message. Suggest the perfect reply. Keep it engaging, human-like, and direct. Do not sound like a robotic AI. Add relevant emojis where appropriate.
      
      Return your response in a structured JSON format matching this exact JSON structure:
      {
        "reply": "YOUR GENERATED REPLY HERE",
        "detectedIntent": {
          "projectType": "E.g. React Dashboard / Bug Fix / Logo Design",
          "budget": "E.g. $450 / Ask for details / Standard rate",
          "deliveryTime": "E.g. Friday / Urgent / Standard 3 days",
          "revisionRequested": true/false,
          "urgent": true/false,
          "customOffer": true/false
        }
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert Freelance copywriter helping freelancers close high-ticket deals instantly with perfect client management scripts. Always output JSON." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo", // Cost effective & fast
      response_format: { type: "json_object" }
    });

    const resultText = completion.choices[0].message.content || '{}';
    return JSON.parse(resultText);
  } catch (error) {
    console.error('Error calling OpenAI API, falling back to local intelligence:', error);
    return generateLocalFallbackReply(clientMessage, clientName, knowledgeBase, services, tone, length, language);
  }
};
