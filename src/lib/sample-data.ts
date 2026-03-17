export const patient = {
  firstName: "Margaret",
  middleName: "Anne",
  lastName: "Thompson",
  preferredName: "Maggie",
  dob: "1958-04-12",
  gender: "Female",
  email: "m.thompson@email.com",
  phone: "(512) 555-0147",
  address: {
    street: "4821 Ridgewood Lane",
    apt: "Apt 3B",
    city: "Austin",
    state: "TX",
    zip: "78731",
  },
  language: "English",
  race: "White",
  ethnicity: "Non-Hispanic",
  maritalStatus: "Married",
  mrn: "MRN-20240318-0472",
  facility: "EPOWERdoc Regional Medical Center",
};

export const emergencyContact = {
  name: "Robert Thompson",
  relationship: "Spouse",
  phone: "(512) 555-0193",
  email: "r.thompson@email.com",
};

export const guarantor = {
  sameAsPatient: true,
  name: "Margaret A. Thompson",
  relationship: "Self",
  dob: "1958-04-12",
  phone: "(512) 555-0147",
};

export const insurance = {
  primary: {
    carrier: "Blue Cross Blue Shield of Texas",
    memberId: "XYN928471650",
    groupNumber: "GRP-84201",
    policyHolder: "Margaret A. Thompson",
    relationship: "Self",
    effectiveDate: "2024-01-01",
    status: "Active" as const,
    copay: 25,
    deductibleMet: 1200,
    deductibleTotal: 3000,
    oopMet: 2400,
    oopTotal: 6500,
  },
  secondary: null,
};

export const visits = [
  {
    id: "V-20240312",
    date: "2026-03-12",
    facility: "EPOWERdoc Regional Medical Center",
    provider: "Dr. Sarah Chen, MD",
    department: "Emergency Medicine",
    type: "Emergency Visit",
    status: "Completed" as const,
    reason: "Chest pain, shortness of breath",
    summary: "Patient presented with acute chest pain. Troponin negative. EKG normal sinus rhythm. Discharged with follow-up cardiology referral.",
    diagnoses: ["R07.9 - Chest pain, unspecified", "R06.02 - Shortness of breath"],
    dischargeInstructions: "Follow up with cardiology within 7 days. Take prescribed medications as directed. Return to ED if symptoms worsen.",
    prescriptions: ["Aspirin 81mg daily", "Omeprazole 20mg daily"],
  },
  {
    id: "V-20260215",
    date: "2026-02-15",
    facility: "EPOWERdoc Family Medicine",
    provider: "Dr. Michael Rivera, MD",
    department: "Primary Care",
    type: "Office Visit",
    status: "Completed" as const,
    reason: "Annual wellness examination",
    summary: "Routine annual exam. All vitals within normal limits. Labs ordered for routine screening. Flu vaccine administered.",
    diagnoses: ["Z00.00 - Encounter for general adult medical examination"],
    dischargeInstructions: "Continue current medications. Follow up in 12 months or as needed.",
    prescriptions: [],
  },
  {
    id: "V-20251108",
    date: "2025-11-08",
    facility: "EPOWERdoc Orthopedic Center",
    provider: "Dr. James Park, DO",
    department: "Orthopedics",
    type: "Follow-Up",
    status: "Completed" as const,
    reason: "Right knee pain follow-up",
    summary: "6-week follow-up after MRI. Mild meniscal tear confirmed. Conservative management recommended with physical therapy.",
    diagnoses: ["M23.21 - Derangement of meniscus due to old tear"],
    dischargeInstructions: "Begin physical therapy 2x/week for 6 weeks. Use knee brace during activity.",
    prescriptions: ["Naproxen 500mg twice daily as needed"],
  },
];

export const medications = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", provider: "Dr. Michael Rivera, MD", startDate: "2024-06-15", status: "Active" as const, instructions: "Take in the morning with water" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily", provider: "Dr. Michael Rivera, MD", startDate: "2023-09-01", status: "Active" as const, instructions: "Take with meals" },
  { name: "Aspirin", dosage: "81mg", frequency: "Once daily", provider: "Dr. Sarah Chen, MD", startDate: "2026-03-12", status: "Active" as const, instructions: "Take in the morning" },
  { name: "Omeprazole", dosage: "20mg", frequency: "Once daily", provider: "Dr. Sarah Chen, MD", startDate: "2026-03-12", status: "Active" as const, instructions: "Take 30 minutes before breakfast" },
  { name: "Naproxen", dosage: "500mg", frequency: "As needed", provider: "Dr. James Park, DO", startDate: "2025-11-08", status: "Active" as const, instructions: "Take with food. Max 2 tablets per day." },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", provider: "Dr. Michael Rivera, MD", startDate: "2024-01-10", status: "Discontinued" as const, instructions: "Discontinued per provider 2025-08-20" },
];

export const billing = {
  outstandingBalance: 847.50,
  statements: [
    { id: "S-2026-0312", date: "2026-03-12", description: "Emergency Visit - EPOWERdoc Regional Medical Center", total: 2450.00, insurancePaid: 1927.50, patientResponsibility: 522.50, status: "Due" as const, dueDate: "2026-04-12" },
    { id: "S-2026-0215", date: "2026-02-15", description: "Office Visit - EPOWERdoc Family Medicine", total: 385.00, insurancePaid: 360.00, patientResponsibility: 25.00, status: "Paid" as const, dueDate: "2026-03-15" },
    { id: "S-2025-1108", date: "2025-11-08", description: "Follow-Up Visit - EPOWERdoc Orthopedic Center", total: 625.00, insurancePaid: 300.00, patientResponsibility: 325.00, status: "Due" as const, dueDate: "2026-04-08" },
  ],
};

export const messages = [
  { id: "M1", type: "appointment" as const, title: "Follow-Up Appointment Reminder", body: "You have a cardiology follow-up due by March 19, 2026. Please schedule your appointment at your earliest convenience.", date: "2026-03-14", read: false },
  { id: "M2", type: "billing" as const, title: "New Statement Available", body: "A new billing statement for your March 12 Emergency Visit is now available. Your patient responsibility is $522.50.", date: "2026-03-13", read: false },
  { id: "M3", type: "portal" as const, title: "Welcome to EPOWERdoc Patient Access", body: "Your patient portal account has been created. You can now view visits, manage medications, and update your information.", date: "2026-03-12", read: true },
  { id: "M4", type: "consent" as const, title: "Consent Documents Updated", body: "Updated HIPAA Notice of Privacy Practices is available for your review. Please sign at your next visit.", date: "2026-03-10", read: true },
  { id: "M5", type: "followup" as const, title: "Discharge Instructions Available", body: "Discharge instructions from your March 12 Emergency Visit are now available in your visit details.", date: "2026-03-12", read: true },
];

export const providers = [
  { name: "Dr. Sarah Chen, MD", specialty: "Emergency Medicine", facility: "EPOWERdoc Regional Medical Center" },
  { name: "Dr. Michael Rivera, MD", specialty: "Family Medicine", facility: "EPOWERdoc Family Medicine" },
  { name: "Dr. James Park, DO", specialty: "Orthopedics", facility: "EPOWERdoc Orthopedic Center" },
  { name: "Dr. Lisa Nguyen, MD", specialty: "Cardiology", facility: "EPOWERdoc Heart & Vascular" },
  { name: "Dr. David Kim, MD", specialty: "Internal Medicine", facility: "EPOWERdoc Regional Medical Center" },
];

export const facilities = [
  "EPOWERdoc Regional Medical Center",
  "EPOWERdoc Family Medicine",
  "EPOWERdoc Orthopedic Center",
  "EPOWERdoc Heart & Vascular",
  "EPOWERdoc Urgent Care - North",
];

export const timeSlots = {
  morning: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  evening: ["5:00 PM", "5:30 PM", "6:00 PM"],
};

export const consentDocuments = [
  {
    id: "C1",
    title: "HIPAA Notice of Privacy Practices",
    summary: "This notice describes how medical information about you may be used and disclosed and how you can get access to this information.",
    lastUpdated: "2026-01-15",
    required: true,
    content: `NOTICE OF PRIVACY PRACTICES\n\nThis notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.\n\nYOUR RIGHTS\nYou have the right to:\n• Get a copy of your paper or electronic medical record\n• Correct your paper or electronic medical record\n• Request confidential communication\n• Ask us to limit the information we share\n• Get a list of those with whom we've shared your information\n• Get a copy of this privacy notice\n• Choose someone to act for you\n• File a complaint if you believe your privacy rights have been violated\n\nYOUR CHOICES\nYou have some choices in the way that we use and share information as we:\n• Tell family and friends about your condition\n• Provide disaster relief\n• Include you in a hospital directory\n• Provide mental health care\n• Market our services and sell your information\n• Raise funds\n\nOUR USES AND DISCLOSURES\nWe may use and share your information as we:\n• Treat you\n• Run our organization\n• Bill for your services\n• Help with public health and safety issues\n• Do research\n• Comply with the law\n• Respond to organ and tissue donation requests\n• Work with a medical examiner or funeral director\n• Address workers' compensation, law enforcement, and other government requests\n• Respond to lawsuits and legal actions`,
  },
  {
    id: "C2",
    title: "General Consent for Treatment",
    summary: "Authorization for medical examination, treatment, and procedures as deemed necessary by your healthcare providers.",
    lastUpdated: "2026-01-15",
    required: true,
    content: `GENERAL CONSENT FOR TREATMENT\n\nI voluntarily consent to medical treatment and procedures at EPOWERdoc Health System facilities. I understand that:\n\n1. TREATMENT: I consent to routine diagnostic procedures, medical treatment, and hospital services ordered by my physician(s) or other authorized healthcare providers.\n\n2. PHYSICIANS: My care may be provided by physicians who are independent contractors and not employees of this facility.\n\n3. TEACHING: This facility may be a teaching institution. Medical students, residents, and other trainees may participate in my care under appropriate supervision.\n\n4. RISKS: Medicine is not an exact science and no guarantees have been made to me regarding the results of treatments or examinations.\n\n5. PERSONAL VALUABLES: I understand the facility is not responsible for personal belongings.\n\n6. PATIENT RIGHTS: I have been informed of my patient rights and responsibilities.`,
  },
  {
    id: "C3",
    title: "Financial Consent & Assignment of Benefits",
    summary: "Agreement regarding financial responsibility for services rendered and authorization to bill your insurance provider.",
    lastUpdated: "2026-02-01",
    required: true,
    content: `FINANCIAL CONSENT & ASSIGNMENT OF BENEFITS\n\nI understand and agree to the following financial terms:\n\n1. FINANCIAL RESPONSIBILITY: I am financially responsible for all charges not covered by my insurance plan(s). I agree to pay any co-payments, coinsurance, deductibles, and non-covered services.\n\n2. INSURANCE ASSIGNMENT: I authorize payment of medical benefits directly to EPOWERdoc Health System. I authorize the release of medical information necessary to process insurance claims.\n\n3. MEDICARE/MEDICAID: If applicable, I certify that the information given by me in applying for payment under Titles XVIII and XIX of the Social Security Act is correct.\n\n4. ESTIMATES: I understand that cost estimates provided are not guarantees of final charges.\n\n5. COLLECTIONS: I understand that accounts not paid within 90 days may be referred to a collection agency. I agree to pay reasonable attorney's fees and collection costs.\n\n6. FINANCIAL ASSISTANCE: I understand I may apply for financial assistance if I am unable to pay for services.`,
  },
  {
    id: "C4",
    title: "Research & Quality Improvement Consent",
    summary: "Optional consent for participation in quality improvement initiatives and approved research studies.",
    lastUpdated: "2026-01-20",
    required: false,
    content: `RESEARCH & QUALITY IMPROVEMENT CONSENT (OPTIONAL)\n\nEPOWERdoc Health System is committed to improving the quality of healthcare through research and quality improvement activities.\n\nBy signing this consent, you agree that:\n\n1. De-identified health information may be used for quality improvement purposes.\n\n2. You may be contacted about voluntary participation in approved research studies.\n\n3. Your participation is entirely voluntary and will not affect your care.\n\n4. You may withdraw your consent at any time by contacting Patient Services.\n\nThis consent is optional. Declining will not affect your treatment or access to services.`,
  },
];
