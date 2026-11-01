import OpenAI from 'openai';
import { getStore } from '../store/dbStore.js';

const SYSTEM_PROMPT = `You are a friendly, glamorous, and knowledgeable beauty consultant assistant for "Glow Like Angel" (Glow Like Angel Luxury Beauty Parlour & Aesthetic Studio) located at 123, Beauty Street, MG Road, Bangalore, Karnataka - 560001 (Phone: +91 98765 43210, Email: care@glowlikeangel.com).
Your role is to assist guests warmly with:
1. Indian bridal styling & makeup packages (HD Airbrush, Saree/Lehenga draping, Kundan jewelry placement, Jasmine gajra styling).
2. Service inquiries & exact pricing (24K Gold Saffron Hydra Facial, Botanical Keratin, Hot Stone Massage, Rica White Chocolate Waxing, Eyebrow threading).
3. Step-by-step appointment booking assistance.
4. Product recommendations tailored to Indian skin types and weather conditions.
5. Professional beauty, skincare, and Ayurvedic wellness tips.
Always be polite, elegant, warm, and encourage booking an appointment through the website. Keep responses concise, helpful, and charmingly formatted with emojis.`;

// Intelligent salon knowledge fallback engine for offline or unconfigured OpenAI key
const generateSalonFallbackResponse = (message, history = []) => {
  const q = message.toLowerCase();

  if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('slot')) {
    return `🌸 We would love to pamper you! You can book an appointment directly through our [Book Appointment](/booking) page in 4 simple steps: choose your treatment, pick your specialist, select your date & time slot, and get instant confirmation with SMS/email receipt! Would you like a bridal, facial, or hair treatment recommendation first?`;
  }

  if (q.includes('bridal') || q.includes('wedding') || q.includes('bride') || q.includes('dulhan')) {
    return `👑 Congratulations on your wedding! Our "Royal Bridal Airbrush & HD Couture Styling" (₹14,999) is designed to make you look like a celestial angel! It includes 24-hr transfer-proof HD Airbrush glass skin makeup (Charlotte Tilbury / Dior), 3D mink lashes, designer lehenga/saree draping, authentic floral jasmine setting, and a complimentary pre-bridal 24K gold facial! Would you like to reserve a bridal trial?`;
  }

  if (q.includes('facial') || q.includes('skin') || q.includes('glow') || q.includes('hydra') || q.includes('gold') || q.includes('saffron')) {
    return `✨ For breathtaking, dewy glass-like Indian skin, we highly recommend our signature "24K Gold Saffron Radiance & Hydra-Glow Facial" (₹2,799, 75 mins) or our "24K Gold Collagen Anti-Aging Treatment" (₹4,999). Both deeply infuse pure Kashmiri saffron and hyaluronic peptides to erase sun tanning!`;
  }

  if (q.includes('hair') || q.includes('keratin') || q.includes('smoothen') || q.includes('haircut')) {
    return `💇‍♀️ For lustrous, manageable hair, our "Botanical Keratin & Indian Silk Smoothening" (₹3,499) eliminates tropical frizz while giving you runway glass shine for up to 5 months without harmful formaldehydes! Or treat your scalp to our Moroccan Argan Hair Spa (₹2,199). What look would you like to achieve?`;
  }

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('charge')) {
    return `💎 Here are our most requested beauty ritual prices at Glow Like Angel:
• Precision Eyebrow Threading & Henna Tint: ₹699
• Italian Rica White Chocolate Waxing: ₹1,699
• Moroccan Argan Hair Spa: ₹2,199
• 24K Saffron Hydra-Glow Facial: ₹2,799
• Botanical Keratin Silk Smoothing: ₹3,499
• Volcanic Hot Stone & Ayurvedic Massage: ₹3,999
• Royal Couture Bridal Package: ₹14,999
Explore our full menu on the [Services](/services) page!`;
  }

  if (q.includes('product') || q.includes('serum') || q.includes('cream') || q.includes('buy')) {
    return `🛍️ Our salon boutique features top-tier formulations like our 24K Gold Saffron Elixir Youth Serum (₹2,499) and Moroccan Argan & Bhringraj Hair Butter (₹1,899). Browse our [3D Boutique](/products) with interactive product previews!`;
  }

  if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('phone') || q.includes('contact')) {
    return `📍 Glow Like Angel Flagship Studio:
123, Beauty Street, MG Road, Bangalore, Karnataka - 560001
📞 Phone: +91 98765 43210
✉️ Email: care@glowlikeangel.com
⏰ Open Daily: 9:00 AM – 9:00 PM (Valet Available)`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('namaste')) {
    return `✨ Namaste & welcome to Glow Like Angel! I'm your dedicated AI Beauty & Spa Consultant. How can I assist your beauty journey today? Ask me about our royal bridal packages, 24K saffron facials, or booking an appointment!`;
  }

  return `✨ Thank you for connecting with Glow Like Angel! We bring you the finest in Indian bridal styling, clinical hydra-facials, and Ayurvedic day spa retreats in Bangalore. How can I pamper you today?`;
};

export const chatWithBot = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.trim() !== '' && !apiKey.includes('your_openai_api_key')) {
      try {
        const openai = new OpenAI({ apiKey });

        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-6).map(h => ({
            role: h.sender === 'user' ? 'user' : 'assistant',
            content: h.text
          })),
          { role: 'user', content: message }
        ];

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
          max_tokens: 350
        });

        const reply = completion.choices[0]?.message?.content || generateSalonFallbackResponse(message, history);

        return res.json({
          success: true,
          reply,
          engine: 'openai-gpt4'
        });
      } catch (apiErr) {
        console.warn('OpenAI API call failed or quota reached, engaging smart salon fallback:', apiErr.message);
        const fallbackReply = generateSalonFallbackResponse(message, history);
        return res.json({
          success: true,
          reply: fallbackReply,
          engine: 'glow-angel-consultant-engine',
          note: 'Active beauty consultant knowledge engine'
        });
      }
    }

    const fallbackReply = generateSalonFallbackResponse(message, history);
    return res.json({
      success: true,
      reply: fallbackReply,
      engine: 'glow-angel-consultant-engine'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
