import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Clock, MessageCircle, Search } from "lucide-react";

const faqs = [
  { q: "How do I schedule a follow-up visit?", a: "Navigate to 'Schedule Follow-Up' from the sidebar or dashboard. Select your appointment type, provider, facility, and preferred date and time. You'll receive a confirmation once booked." },
  { q: "How do I update my insurance?", a: "Go to your Profile page and select the Insurance tab. Click 'Edit Profile' to make changes. Note that insurance updates require staff review before being finalized in your record." },
  { q: "Why do I need to review consent documents?", a: "Consent documents are required by federal and state law before receiving medical care. They explain your rights, how your information is used, and your financial responsibilities." },
  { q: "How do I access discharge instructions?", a: "Go to Visits, find the relevant visit, and click 'View Details.' Discharge instructions, prescriptions, and follow-up recommendations are all available on the visit detail page." },
  { q: "How do I reset my password?", a: "On the Sign In page, click 'Forgot password?' and follow the prompts. You'll receive an email with instructions to create a new password." },
  { q: "Why is my insurance showing as unverified?", a: "Insurance verification happens in real-time during registration. If verification failed, it may be due to incorrect information or a temporary system issue. Please contact our billing team for assistance." },
  { q: "Can I view my medical records?", a: "Your visit summaries, discharge instructions, medications, and billing are all available in the portal. For complete medical records, use the 'Request Records' option on any visit detail page." },
  { q: "How do I pay my bill?", a: "Go to Billing & Insurance and click 'Pay Now' on your outstanding balance. We accept all major credit cards and offer payment plan options." },
];

export default function Support() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Support</h1>
          <p className="text-sm text-muted-foreground mt-1">Find answers to common questions or contact our support team.</p>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <SectionCard>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Phone Support</p>
                <p className="text-xs text-muted-foreground tabular-nums">(512) 555-0300</p>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email Support</p>
                <p className="text-xs text-muted-foreground">support@epowerdoc.com</p>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Office Hours</p>
                <p className="text-xs text-muted-foreground">Mon–Fri: 7 AM – 7 PM CT</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search support topics..." className="pl-9 min-h-[44px]" />
        </div>

        {/* FAQs */}
        <SectionCard title="Frequently Asked Questions">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-medium text-foreground text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionCard>

        {/* Live chat placeholder */}
        <SectionCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Live Chat</p>
                <p className="text-xs text-muted-foreground">Chat with a patient services representative</p>
              </div>
            </div>
            <Button variant="outline" disabled>Coming Soon</Button>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
