export interface OrganizationServiceDocumentGroup {
  entityType: string;
  documents: string[];
}

export interface OrganizationService {
  title: string;
  requiredParticipants?: string[];
  processingTime?: string;
  serviceFee?: string | string[];
  accessUrl?: string;
  /** Flat list of required documents (when documents are not grouped by entity type). */
  documents?: string[];
  /** Required documents grouped by entity/applicant type. */
  documentGroups?: OrganizationServiceDocumentGroup[];
}

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  description: string;
  category: string;
  subcategory: string;
  status: "Active" | "Coming Soon";
  website?: string;
  officeHours?: string;
  services?: OrganizationService[];
}

export const PASTEL_COLORS = [
  { bg: "bg-blue-50", hover: "hover:bg-blue-100", border: "border-blue-200/60" },
  { bg: "bg-green-50", hover: "hover:bg-green-100", border: "border-green-200/60" },
  { bg: "bg-orange-50", hover: "hover:bg-orange-100", border: "border-orange-200/60" },
  { bg: "bg-purple-50", hover: "hover:bg-purple-100", border: "border-purple-200/60" },
  { bg: "bg-pink-50", hover: "hover:bg-pink-100", border: "border-pink-200/60" },
  { bg: "bg-yellow-50", hover: "hover:bg-yellow-100", border: "border-yellow-200/60" },
];

export const organizations: Organization[] = [
  /* ─── Ministry of Women and Social Affairs ─── */
  {
    id: "mowsa",
    name: "Ministry of Women and Social Affairs",
    shortName: "MOWSA",
    logo: "/government services/Ministry of Women and Social Affairs Services.jpg",
    description: "Formulates and implements policies and programs for gender equality, women's empowerment, and social welfare, coordinating support for vulnerable groups across Ethiopia.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Federal Public Procurement and Property Authority ─── */
  {
    id: "pppa",
    name: "Federal Public Procurement and Property Authority",
    shortName: "PPPA",
    logo: "/government services/Federal Public Procurement and Property Authority Services.png",
    description: "Oversees public procurement and property administration across federal government entities, ensuring transparency, efficiency, and compliance with procurement laws.",
    category: "Authority",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    website: "https://www.ppa.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
    services: [
      {
        title: "Supplier Registration / Revision Service",
        requiredParticipants: ["Business owner", "Legal representative"],
        processingTime: "15 Minutes",
        serviceFee: "100 ETB",
        accessUrl: "https://www.ppa.gov.et/",
        documentGroups: [
          {
            entityType: "Sole Proprietorship / Partnership / Private Limited Company / Share Company",
            documents: [
              "TIN (tax identification number)",
              "Value Added Tax (VAT) certificate",
              "Bank account number",
              "User name (valid email) and password",
              "Competency certificate (if the sector requires it as mandatory)",
              "Shareholder information (if the company is a Private Limited Company or Partnership)",
              "Power of attorney document (in case the legal representative applies)",
            ],
          },
          {
            entityType: "Government-Owned Enterprise",
            documents: [
              "National ID of the principal",
              "Power of attorney document (in case the legal representative applies)",
              "User name (valid email) and password",
              "Bank account number",
              "Board of directors' information",
            ],
          },
          {
            entityType: "Individual Consultant / Trader",
            documents: [
              "National ID of the principal",
              "Tax identification number",
              "User name (valid email) and password",
            ],
          },
          {
            entityType: "Cooperatives",
            documents: [
              "National ID of the principal",
              "Tax identification number",
              "User name (valid email) and password",
            ],
          },
          {
            entityType: "International Companies and Traders",
            documents: [
              "Trade license",
              "Legal document",
              "Capital and country of registration information",
              "Power of attorney",
            ],
          },
        ],
      },
    ],
  },
  /* ─── Ministry of Transport and Logistics ─── */
  {
    id: "motl",
    name: "Ministry of Transport and Logistics",
    shortName: "MoTL",
    logo: "/government services/Ministry of Transport and Logistics Services.png",
    description: "Responsible for developing and regulating Ethiopia's transportation infrastructure and logistics networks across road, rail, air, and maritime systems.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    website: "https://www.motl.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 6:00 PM",
    services: [
      {
        title: "Issuance of a Certificate of Competency for Commercial Freight Transport Service Providers",
        processingTime: "1 hour and 30 minutes",
        serviceFee: [
          "1 to 50 vehicles: 20,000 ETB",
          "51 to 100 vehicles: 30,000 ETB",
          "Above 100 vehicles: 40,000 ETB",
          "Per driver registration: 2,000 ETB",
        ],
        accessUrl: "https://www.motl.gov.et/",
        documents: [
          "Commercial Registration Certificate and the specific business sector category/activity code",
          "A valid and active Business License Certificate",
          "Taxpayer Identification Number (TIN) Certificate",
          "Vehicle Ownership Certificate Book (Libre)",
          "A valid Vehicle Technical Inspection (Annual Inspection) Certificate",
          "A valid Third-Party Vehicle Insurance Certificate",
          "A certified office rent contract/lease agreement or property ownership title deed (Map) — must be authenticated by the Documents Authentication and Registration Agency (DARA) for Addis Ababa, verified by the relevant regional authenticating body for regional states, or bear the official stamp of the Federal Housing Corporation (FHC) for government-owned property",
          "Renewed driving licenses for all employed drivers",
          "An official legal document/certificate verifying that the vehicles are equipped with a functioning GPS tracking system",
          "Educational credentials and signed employment contracts for the required personnel in accordance with the regulatory directives",
          "The Digital National ID (Fayda Number) of both the drivers and drivers' assistants",
          "A complete master list containing detailed specifications of all fleet vehicles",
        ],
      },
      {
        title: "Renewal of Certificates of Competency for Commercial Freight Transport Service Providers",
        processingTime: "1 hour and 30 minutes",
        serviceFee: [
          "Fleet renewal fee (flat rate across all fleet sizes): 5,000 ETB",
          "Per driver registration renewal: 2,000 ETB",
        ],
        accessUrl: "https://www.motl.gov.et/",
        documents: [
          "Commercial Registration Certificate and the specific business sector category/activity code",
          "A valid and active Business License Certificate",
          "Taxpayer Identification Number (TIN) Certificate",
          "Vehicle Ownership Certificate Book (Libre)",
          "A valid Vehicle Technical Inspection (Annual Inspection) Certificate",
          "A valid Third-Party Vehicle Insurance Certificate",
          "A certified office rent contract/lease agreement or property ownership title deed (Map) — must be authenticated by the Documents Authentication and Registration Agency (DARA) for Addis Ababa, verified by the relevant regional authenticating body for regional states, or bear the official stamp of the Federal Housing Corporation (FHC) for government-owned property",
          "Renewed driving licenses for all employed drivers",
          "An official legal document/certificate verifying that the vehicles are equipped with a functioning GPS tracking system",
          "Educational credentials and signed employment contracts for the required personnel in accordance with the regulatory directives",
          "The Digital National ID (Fayda Number) of both the drivers and drivers' assistants",
          "A complete master list containing detailed specifications of all fleet vehicles",
        ],
      },
      {
        title: "Issuance of Cross-Border Permits for Drivers and Drivers' Assistants",
        processingTime: "20 minutes",
        serviceFee: [
          "Per driver permit: 2,000 ETB",
          "Per driver's assistant permit: 1,000 ETB",
          "Cross-border commercial freight vehicle permit: 10,000 ETB per vehicle",
        ],
        accessUrl: "https://www.motl.gov.et/",
        documents: [
          "Vehicle Ownership Certificate Book (Libre)",
          "Renewed Identification Card (Kebele ID or equivalent)",
          "Passport-sized photograph of the driver",
          "Certificate of Competency (CoC)",
          "A complete master list containing detailed specifications of the fleet vehicles",
          "Renewed driving license",
          "Digital National ID (Fayda ID)",
        ],
      },
      {
        title: "Renewal of Cross-Border Permits for Drivers and Drivers' Assistants",
        processingTime: "20 minutes",
        serviceFee: [
          "Per driver permit renewal: 2,000 ETB",
          "Per driver's assistant permit renewal: 1,000 ETB",
        ],
        accessUrl: "https://www.motl.gov.et/",
        documents: [
          "Business Registration Certificate and Business Sector Identification Code",
          "Valid Business License Certificate",
          "Vehicle Ownership Certificate Book (Libre)",
          "Renewed Identification Card (Kebele ID or equivalent)",
          "Passport-sized photograph of the driver",
          "Certificate of Competency (CoC)",
          "A complete master list containing detailed specifications of the fleet vehicles",
          "Renewed driving license",
          "Digital National ID (Fayda ID)",
          "An official police report (required only if the previous permit/ID was lost)",
          "Taxpayer Identification Number",
          "Vehicle Technical Inspection Certificate",
          "Vehicle Third-Party Insurance Certificate",
          "Office Rental Agreement",
          "Vehicles GPS installation certificate",
          "Staff Employment Contract",
        ],
      },
    ],
  },
  /* ─── Commercial Bank of Ethiopia ─── */
  {
    id: "cbe",
    name: "Commercial Bank of Ethiopia",
    shortName: "CBE",
    logo: "/government services/Commercial Bank of Ethiopia Services.png",
    description: "Ethiopia's largest commercial bank, providing banking and financial services to individuals, businesses, and government institutions nationwide.",
    category: "Financial Institution",
    subcategory: "Enterprises & Public Services",
    status: "Active",
    website: "https://www.combanketh.et",
    officeHours: "Monday - Friday: 8:00 AM - 4:00 PM",
  },
  /* ─── Ethio telecom ─── */
  {
    id: "ethio-telecom",
    name: "Ethio telecom",
    shortName: "Ethio Telecom",
    logo: "/government services/Ethio telecom Services.png",
    description: "The leading telecommunications service provider in Ethiopia, offering mobile, internet, and digital services nationwide.",
    category: "State-owned Enterprise",
    subcategory: "Enterprises & Public Services",
    status: "Active",
    website: "https://www.ethiotelecom.et",
    officeHours: "Monday - Friday: 8:00 AM - 6:00 PM",
  },
  /* ─── Education and Training Authority ─── */
  {
    id: "eta",
    name: "Education and Training Authority",
    shortName: "ETA",
    logo: "/government services/Education and Training Authority Services.png",
    description: "Regulates and accredits educational institutions and training programs, ensuring quality standards across the education and training sector.",
    category: "Authority",
    subcategory: "Education & Training",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ethiopian Environmental Protection Authority ─── */
  {
    id: "epa",
    name: "Ethiopian Environmental Protection Authority",
    shortName: "EPA",
    logo: "/government services/Ethiopian Environmental Protection Authority Services.jpeg",
    description: "Protects Ethiopia's environment through regulation, monitoring, and enforcement of environmental laws and sustainable development practices.",
    category: "Authority",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    website: "https://www.epa.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ethiopian Food and Drug Authority ─── */
  {
    id: "efda",
    name: "Ethiopian Food and Drug Authority",
    shortName: "EFDA",
    logo: "/government services/Ethiopian Food and Drug Authority Services.png",
    description: "Regulates the safety, quality, and efficacy of food, medicines, cosmetics, and medical devices to protect public health.",
    category: "Authority",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    website: "https://www.efda.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ethiopian Agricultural Authority ─── */
  {
    id: "eaa",
    name: "Ethiopian Agricultural Authority",
    shortName: "EAA",
    logo: "/government services/Ethiopian Agricultural Authority Services.png",
    description: "Regulates agricultural inputs, services, and products to ensure quality, safety, and compliance with national agricultural standards.",
    category: "Authority",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ethiopian Construction Authority ─── */
  {
    id: "eca",
    name: "Ethiopian Construction Authority",
    shortName: "ECA",
    logo: "/government services/Ethiopian Construction Authority Services.png",
    description: "Regulates construction projects and contracting practices, ensuring quality standards, safety compliance, and professional licensing.",
    category: "Authority",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ministry of Health ─── */
  {
    id: "moh",
    name: "Ministry of Health",
    shortName: "MOH",
    logo: "/government services/Ministry of Health Services.png",
    description: "Develops and implements national health policies, manages public health programs, and oversees healthcare delivery across Ethiopia.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    website: "https://www.moh.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ministry of Justice ─── */
  {
    id: "moj",
    name: "Ministry of Justice",
    shortName: "MOJ",
    logo: "/government services/Ministry of Justice Services.png",
    description: "Provides legal services to the government, oversees the justice system, and ensures the rule of law through legal advice and prosecution.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    website: "https://www.moj.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ministry of Trade and Regional Integration ─── */
  {
    id: "motri",
    name: "Ministry of Trade and Regional Integration",
    shortName: "MOTRI",
    logo: "/government services/Ministry of Trade and Regional Integration Services.png",
    description: "Develops trade policies, promotes regional economic integration, and facilitates domestic and international trade to drive economic growth.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    website: "https://www.motri.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ethiopian Customs Commission ─── */
  {
    id: "ecc",
    name: "Ethiopian Customs Commission",
    shortName: "ECC",
    logo: "/government services/Ethiopian Customs Commission Services.png",
    description: "Manages customs operations, trade facilitation, and border control, ensuring efficient clearance of goods and enforcing customs regulations.",
    category: "Commission",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    website: "https://www.customs.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 6:00 PM",
  },
  /* ─── Ministry of Tourism ─── */
  {
    id: "mot",
    name: "Ministry of Tourism",
    shortName: "MOT",
    logo: "/government services/Ministry of Tourism Services.png",
    description: "Promotes Ethiopia's tourism sector, develops destinations, and implements policies to attract visitors and grow the tourism industry.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ethiopian Postal Service Enterprise ─── */
  {
    id: "epse",
    name: "Ethiopian Postal Service Enterprise",
    shortName: "EPSE",
    logo: "/government services/Ethiopian Postal Service Enterprise Services.png",
    description: "Provides postal and courier services across Ethiopia, including mail delivery, parcel services, and related financial services.",
    category: "State-owned Enterprise",
    subcategory: "Enterprises & Public Services",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 6:00 PM",
  },
  /* ─── Ethiopian Investment Commission ─── */
  {
    id: "eic",
    name: "Ethiopian Investment Commission",
    shortName: "EIC",
    logo: "/government services/Ethiopian Investment Commission Services.png",
    description: "Promotes and facilitates domestic and foreign investment, providing services to investors and creating a conducive business environment.",
    category: "Commission",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    website: "https://www.investethiopia.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Educational Assessment and Examination Service ─── */
  {
    id: "eaes",
    name: "Educational Assessment and Examination Service",
    shortName: "EAES",
    logo: "/government services/Educational Assessment and Examination Service Services.png",
    description: "Conducts national examinations, educational assessments, and certification services for students across Ethiopia's education system.",
    category: "Service",
    subcategory: "Education & Training",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Documents Authentication and Registration Service ─── */
  {
    id: "dars",
    name: "Documents Authentication and Registration Service",
    shortName: "DARS",
    logo: "/government services/Documents Authentication and Registration Service Services.png",
    description: "Provides document authentication, registration, and verification services for legal, educational, and business documents.",
    category: "Service",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ministry of Revenues ─── */
  {
    id: "mor",
    name: "Ministry of Revenues",
    shortName: "MOR",
    logo: "/government services/Ministry of Revenues Services.png",
    description: "Manages tax administration, revenue collection, and customs policies to mobilize domestic revenue for national development.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ministry of Foreign Affairs ─── */
  {
    id: "mfa",
    name: "Ministry of Foreign Affairs",
    shortName: "MFA",
    logo: "/government services/Ministry of Foreign Affairs Services.png",
    description: "Manages Ethiopia's foreign relations, diplomatic missions, and consular services for citizens abroad and foreign nationals.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    website: "https://www.mfa.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Ministry of Labor and Skills ─── */
  {
    id: "mols",
    name: "Ministry of Labor and Skills",
    shortName: "MOLS",
    logo: "/government services/Ministry of Labor and Skills Services.png",
    description: "Oversees labor relations, employment services, and skills development programs to promote decent work and a competitive workforce.",
    category: "Ministry",
    subcategory: "Ministries",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  /* ─── Immigration and Citizenship Service ─── */
  {
    id: "ics",
    name: "Immigration and Citizenship Service",
    shortName: "ICS",
    logo: "/government services/Immigration and Citizenship Service Services.png",
    description: "Manages immigration, passport issuance, visa processing, citizenship applications, and resident permit services.",
    category: "Service",
    subcategory: "Authorities, Commissions & Agencies",
    status: "Active",
    officeHours: "Monday - Friday: 8:00 AM - 6:00 PM",
  },
  /* ─── National ID Program ─── */
  {
    id: "nid",
    name: "National ID Program",
    shortName: "NID",
    logo: "/government services/National ID Program Services.png",
    description: "Responsible for the registration and issuance of national digital IDs to Ethiopian residents for access to government and private services.",
    category: "Public Service",
    subcategory: "Enterprises & Public Services",
    status: "Active",
    website: "https://www.nidp.gov.et",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
];
