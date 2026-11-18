import {
  Layers,
  Bot,
  MessageCircle,
  Megaphone,
  Headphones,
  Link2,
} from "lucide-react";
export const solutions = [
  {
    slug: "business-process",
    name: "Business Process Automation",
    icon: Layers,
    description: "Automate daily operations, approvals and workflows.",
    tasks: [
      "Document intake and validation",
      "Approval routing with human oversight",
      "Status updates and exception reporting",
    ],
  },
  {
    slug: "ai-agents",
    name: "AI Workflows & Agents",
    icon: Bot,
    description: "AI-assisted workflows for sales, support and operations.",
    tasks: [
      "Knowledge-grounded assistance",
      "Lead and request classification",
      "Human approval before sensitive actions",
    ],
  },
  {
    slug: "sales-marketing",
    name: "Sales & Marketing Automation",
    icon: Megaphone,
    description: "Connect lead capture, follow-up, CRM and campaigns.",
    tasks: [
      "Capture enquiries across channels",
      "Route leads to the right owner",
      "Schedule consent-based follow-ups",
    ],
  },
  {
    slug: "customer-support",
    name: "Customer Support Automation",
    icon: Headphones,
    description: "Connect ticketing, suggested replies and human support.",
    tasks: [
      "Classify and prioritise requests",
      "Suggest answers from approved knowledge",
      "Escalate complex cases to people",
    ],
  },
  {
    slug: "integrations-data",
    name: "Integrations & Data Automation",
    icon: Link2,
    description: "Connect your tools, sync data and reduce manual entry.",
    tasks: [
      "Map fields between business tools",
      "Validate and deduplicate records",
      "Monitor retries and failed synchronisations",
    ],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp Automation",
    icon: MessageCircle,
    description: "Organise enquiries, approved replies and human handoffs.",
    tasks: [
      "Classify incoming enquiries",
      "Use approved messaging templates",
      "Keep CRM context available to your team",
    ],
  },
];
export const industries = [
  "Retail & e-commerce",
  "Professional services",
  "Healthcare operations",
  "Education",
  "Travel & hospitality",
  "Manufacturing",
  "Real estate",
  "Finance operations",
];
export const demos = [
  {
    name: "Lead automation",
    sample:
      "Sample enquiry: Asha at Northstar needs a CRM workflow for a 12-person sales team.",
    steps: [
      "New enquiry",
      "AI qualification",
      "CRM update",
      "Follow-up",
      "Sales notification",
    ],
    details: [
      "Web form received with consent.",
      "Suggested fit: CRM + lead routing. Human review available.",
      "Sample lead LZ-1042 assigned to Sales.",
      "Draft follow-up prepared; nothing sent.",
      "Sales owner notified in this simulation.",
    ],
  },
  {
    name: "Customer support",
    sample: "Sample request: “My order arrived, but one item is missing.”",
    steps: [
      "Customer request",
      "Classification",
      "Suggested response",
      "Ticket routing",
      "Human escalation",
    ],
    details: [
      "Support request captured.",
      "Classified as order fulfilment.",
      "A draft acknowledgement is prepared.",
      "Ticket assigned to the operations queue.",
      "An agent reviews the missing-item claim.",
    ],
  },
  {
    name: "Business operations",
    sample: "Sample invoice: INV-208, ₹24,000, awaiting manager approval.",
    steps: [
      "Data submission",
      "Validation",
      "Approval",
      "System update",
      "Reporting",
    ],
    details: [
      "Invoice fields received.",
      "Required fields and duplicate checks pass.",
      "A manager approval is requested.",
      "Approved sample record added to the ledger.",
      "Activity added to the audit report.",
    ],
  },
  {
    name: "WhatsApp automation",
    sample: "Sample message: “Can I book a consultation this week?”",
    steps: [
      "Incoming message",
      "Intent detection",
      "Approved reply",
      "CRM sync",
      "Human handoff",
    ],
    details: [
      "A sample inbound message is received.",
      "Consultation intent identified.",
      "A booking reply is drafted, not sent.",
      "Conversation context attached to a sample lead.",
      "A team member takes over scheduling.",
    ],
  },
];
export const tasks = [
  "Lead capture & follow-up",
  "Customer support",
  "Approvals & documents",
  "Data entry & reporting",
  "WhatsApp enquiries",
];
