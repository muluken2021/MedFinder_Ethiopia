import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is MedFinder Ethiopia?",
      answer:
        "MedFinder Ethiopia is a digital platform that helps people easily locate medicines and pharmacies across the country. Users can search for a medicine and see which pharmacies nearby have it in stock.",
    },
    {
      question: "How can pharmacies join the platform?",
      answer:
        "Pharmacies can easily register by clicking the 'Register Pharmacy' button on the home page. After registration, they can log in to their dashboard to list available medicines and manage their inventory.",
    },
    {
      question: "Do I need to create an account to search for medicines?",
      answer:
        "No account is needed for searching. Anyone can freely search for medicines and see pharmacy details. Only pharmacies need an account to manage their listings.",
    },
    {
      question: "Does MedFinder work in all Ethiopian cities?",
      answer:
        "Yes! MedFinder Ethiopia connects pharmacies and users across all major cities — including Addis Ababa, Bahir Dar, Hawassa, Mekelle, and more. As more pharmacies join, coverage continues expanding.",
    },
    {
      question: "Is there a mobile app for MedFinder Ethiopia?",
      answer:
        "A mobile version is under development! Currently, our website is fully responsive and optimized for mobile devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: "#2D2D49" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#0B6B6B" }}
                >
                  {faq.question}
                </h3>
                <span
                  className={`text-2xl transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  style={{ color: "#0B6B6B" }}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-40 px-6 pb-4" : "max-h-0"
                }`}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#1A1A1A" }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
