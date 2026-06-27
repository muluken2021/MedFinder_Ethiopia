import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Med Finder Ethiopia?",
    answer:
      "Med Finder Ethiopia is a digital platform that connects people with pharmacies across the country. Search for any medicine and instantly see which verified pharmacies nearby have it in stock, along with prices and directions.",
  },
  {
    question: "How can a pharmacy join the platform?",
    answer:
      "Pharmacies can register by clicking 'Pharmacy Portal' in the navigation bar. After completing registration, pharmacies get access to a dashboard to manage their medicine inventory, update stock, and connect with patients.",
  },
  {
    question: "Do I need an account to search for medicines?",
    answer:
      "No account needed. Anyone can freely search for medicines and view pharmacy details. Only pharmacies need an account to manage their inventory listings.",
  },
  {
    question: "Does Med Finder cover all Ethiopian cities?",
    answer:
      "We're growing rapidly. Our current network spans Addis Ababa, Bahir Dar, Hawassa, Mekelle, Dire Dawa, and more. As more pharmacies register, our coverage expands every week.",
  },
  {
    question: "How accurate is the stock availability information?",
    answer:
      "Pharmacies update their inventory in real time via our dashboard. We also perform regular verification checks to ensure data quality. While we strive for 100% accuracy, we recommend calling ahead for critical medications.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "A dedicated mobile app is currently in development. In the meantime, our website is fully responsive and optimized for mobile browsers, giving you a near-native experience on any device.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section className="py-24 bg-white">
      <div className=" mx-auto px-6 lg:px-30">

        <div className="grid lg:grid-cols-5 gap-16">

          {/* ── Left: Header ── */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-300">
              FAQ
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              Got questions?<br />We've got answers.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Everything you need to know about Med Finder.
              Can't find the answer here? Reach out to our support team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-sm transition-all"
            >
              Contact Support
            </a>
          </div>

          {/* ── Right: Accordion ── */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-slate-200 bg-gray-50/80 shadow-sm"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        isOpen
                          ? "bg-brand-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
