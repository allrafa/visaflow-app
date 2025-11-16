'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'What is EB-1A?',
    answer:
      'EB-1A is an employment-based immigration category for individuals with extraordinary ability in sciences, arts, education, business, or athletics. It allows you to self-petition for a green card without employer sponsorship.',
  },
  {
    question: 'How many criteria do I need to meet?',
    answer:
      'You need to demonstrate that you meet at least 3 out of the 10 listed criteria. However, quality is more important than quantity - strong evidence for 3-4 criteria is better than weak evidence for many.',
  },
  {
    question: 'Can I save my progress?',
    answer:
      'Yes! VisaFlow automatically saves your progress as you work. All your processes, tasks, documents, and data are securely stored and can be accessed from any device.',
  },
  {
    question: 'Do I need a lawyer to use VisaFlow?',
    answer:
      'VisaFlow is designed to help you organize and prepare your EB-1A petition yourself (DIY approach). However, we recommend consulting with an immigration attorney for final review, especially for complex cases.',
  },
  {
    question: 'How long does the EB-1A process take?',
    answer:
      'The preparation time varies (3-12 months depending on your situation), but once submitted, USCIS processing typically takes 15-45 days with premium processing, or 3-6 months without.',
  },
  {
    question: 'What documents do I need to upload?',
    answer:
      'Common documents include: awards/prizes certificates, publications, membership certificates, recommendation letters, media coverage, patents, and proof of high salary. Each criterion has specific documentation requirements.',
  },
  {
    question: 'Can I work on multiple processes at once?',
    answer:
      'Yes! You can create and manage multiple EB-1A processes simultaneously. This is useful if you are helping family members or managing processes for different individuals.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. All your data is encrypted in transit and at rest. We use industry-standard security practices and never share your personal information with third parties.',
  },
  {
    question: 'What if I get an RFE (Request for Evidence)?',
    answer:
      'RFEs are common and not necessarily negative. VisaFlow helps you build a strong initial petition to minimize RFEs. If you do receive one, the platform can help you organize additional evidence to respond effectively.',
  },
  {
    question: 'Can I export my petition documents?',
    answer:
      'Yes, you can export all your documents, letters, and the final merits letter as PDFs at any time. This makes it easy to share with attorneys or submit to USCIS.',
  },
];

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQS.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
