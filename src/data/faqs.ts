export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope — a one-page landing page and a multi-view web application are different jobs. After a short conversation about what you need, you'll get a clear, fixed estimate before any work starts. No hourly surprises.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Landing pages typically take one to three weeks. Larger websites and application interfaces are scoped per milestone so you always know what's shipping and when. Small fixes often ship within days.",
  },
  {
    question: "Can you work from our existing designs?",
    answer:
      "Yes. Hand me a Figma file, a Sketch file, or even an existing website you like the look of, and I'll turn it into a fast, responsive implementation. If you don't have designs yet, I can build from a clear description and share direction early.",
  },
  {
    question: "Do you work with existing codebases?",
    answer:
      "Regularly. Fixes, improvements, new features and performance work on existing React or plain HTML/CSS sites are a big part of what I do. I'll first read the code, then tell you honestly what's involved.",
  },
  {
    question: "Can you add AI features to our product?",
    answer:
      "Yes — that's a focus area. Chat assistants, content generation, and AI-powered workflows integrated into your existing site or app, with proper loading states, error handling and cost-aware design.",
  },
  {
    question: "How do we start working together?",
    answer:
      "Send a message describing what you're trying to build. I'll reply — usually within 24 hours — with questions, a suggested approach and a clear estimate. If it's a fit, we start with a small, defined first milestone.",
  },
];
