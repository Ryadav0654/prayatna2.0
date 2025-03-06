
'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const fireSafetyFAQs: FAQItem[] = [
  {
    question: "What are the most common causes of fires in homes?",
    answer: "The most common causes include cooking accidents, heating equipment malfunctions, electrical issues (faulty wiring or appliances), smoking materials (cigarettes, cigars), and candles."
  },
  {
    question: "How often should I test my smoke alarms?",
    answer: "You should test your smoke alarms at least once a month.  Replace the batteries at least once a year, or immediately if the alarm chirps, indicating a low battery.  Replace the entire smoke alarm unit every 10 years."
  },
  {
    question: "What type of fire extinguisher should I have in my home?",
    answer: "A multi-purpose (ABC) fire extinguisher is recommended for home use.  It can handle fires involving ordinary combustibles (wood, paper, cloth), flammable liquids (gasoline, oil), and electrical equipment."
  },
  {
    question: "Where should I place fire extinguishers in my home?",
    answer: "Place fire extinguishers in easily accessible locations, such as the kitchen, near exits, and in the garage or workshop.  Make sure everyone in the household knows where they are and how to use them."
  },
  {
    question: "What should I do if my clothes catch fire?",
    answer: "STOP, DROP, and ROLL.  Stop immediately, drop to the ground, cover your face with your hands, and roll over and over to smother the flames."
  },
  {
    question: "What is a fire escape plan, and why is it important?",
    answer: "A fire escape plan is a pre-determined route and meeting place for your family in case of a fire.  It's crucial to practice the plan regularly (at least twice a year) so everyone knows what to do in an emergency.  The plan should include two ways out of every room and a designated meeting spot outside the home."
  },
  {
    question: "How do I use a fire extinguisher (PASS method)?",
    answer: "Remember the acronym PASS:  **P**ull the pin. **A**im the nozzle at the base of the fire. **S**queeze the handle. **S**weep the nozzle from side to side."
  },
  {
    question: "What should I do if there's a fire in my building?",
    answer: "1. Activate the fire alarm. 2. Evacuate immediately, following your escape plan.  3.  Do not use elevators.  4.  Once outside, call the fire department (e.g., 911 in the US). 5.  Stay a safe distance away from the building."
  },
  {
    question: "How can I prevent electrical fires?",
    answer: "Avoid overloading outlets or extension cords.  Regularly inspect cords and appliances for damage (fraying, cracks).  Don't run cords under rugs or furniture.  Have a qualified electrician inspect and repair any electrical problems."
  },
  {
      question: "What should I do if a small fire starts on my stovetop?",
      answer: "For a small grease fire, smother the flames by sliding a lid over the pan. Turn off the burner. Leave the lid in place until the pan is completely cool. Never use water on a grease fire!  For other stovetop fires, use a fire extinguisher (aim at the base of the flames) or baking soda (for grease fires). If the fire is large or spreading, evacuate and call the fire department."
  },
  {
      question: "Is it safe to use space heaters?",
      answer: "Space heaters can be safe if used correctly.  Keep them at least 3 feet away from anything flammable (curtains, furniture, bedding).  Never leave a space heater unattended or running while you sleep.  Plug space heaters directly into a wall outlet, not an extension cord."
  },
    {
        question: "What are fire-resistant materials, and should I use them in my home?",
        answer: "Fire-resistant materials are designed to slow down the spread of fire. Using them in construction (e.g., fire-resistant drywall, roofing) can provide extra time to escape.  However, no material is completely 'fireproof'."
    },
];

const FireSafetyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Fire Safety Guide & FAQ
        </h2>
        <div className="space-y-4">
          {fireSafetyFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <button
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                <svg
                  className={`h-6 w-6 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

         <div className="mt-10 text-center">
          <p className="text-gray-600">
            This information is for general guidance only.  Always consult with your local fire department for specific safety recommendations in your area.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FireSafetyFAQ;