export const INTERVIEW_QUESTIONS = [
  {
    id: 'name_location',
    key: 'name',
    question_hi: 'नमस्ते! आपका शुभ नाम क्या है और आप किस जिले/राज्य से हैं?',
    question_en: 'Namaste! What is your full name and which district/state are you from?',
    placeholder: 'e.g. Ramesh Kumar, Varanasi, Uttar Pradesh',
    suggestions_hi: ['रमेश कुमार, वाराणसी, यूपी', 'सुनीता देवी, गया, बिहार', 'अमित जाटव, जयपुर, राजस्थान'],
    suggestions_en: ['Ramesh Kumar, Varanasi, UP', 'Sunita Devi, Gaya, Bihar', 'Amit Jatav, Jaipur, Rajasthan']
  },
  {
    id: 'education',
    key: 'education',
    question_hi: 'आपकी शिक्षा (Qualification) कहाँ तक हुई है?',
    question_en: 'What is your highest educational qualification?',
    placeholder: 'e.g. 8th Pass, 10th Pass, 12th Pass, Graduate',
    suggestions_hi: ['8वीं पास (8th Pass)', '10वीं मैट्रिक (10th Pass)', '12वीं इंटर (12th Pass)', 'अनपढ़ / बुनियादी साक्षर'],
    suggestions_en: ['8th Standard', '10th Matriculation', '12th Intermediate', 'Basic Literacy']
  },
  {
    id: 'informal_skills',
    key: 'skills',
    question_hi: 'आप पहले से किस काम में माहिर हैं या घर/गांव में क्या काम करते रहे हैं?',
    question_en: 'What informal skills or traditional work do you currently know or practice?',
    placeholder: 'e.g. Handloom weaving, Solar wiring, Dairy farming, Tailoring, Construction',
    suggestions_hi: ['हैंडलूम बुनाई व जरी काम', 'कृषि, जैविक खेती व डेयरी', 'बिजली / सोलर वायरिंग का अनुभव', 'सिलाई, कटाई व कढ़ाई'],
    suggestions_en: ['Handloom Weaving & Embroidery', 'Organic Farming & Dairy', 'Solar & Domestic Electrician', 'Tailoring & Garment Making']
  },
  {
    id: 'aspirations',
    key: 'aspiration',
    question_hi: 'आप आगे क्या करना चाहते हैं—नौकरी (Job) या अपना खुद का छोटा उद्यम/दुकान (Self-Employment)?',
    question_en: 'What is your goal—a formal job or starting your own micro-enterprise/shop?',
    placeholder: 'e.g. Self-employment with PM-AJAY GIA grant, or Factory Job',
    suggestions_hi: ['पीएम-अजय अनुदान से खुद की दुकान / उद्यम', 'प्रमाणित होकर नजदीकी शहर में पक्की नौकरी', 'गांव में ही कृषि/सोलर सर्विस सेंटर'],
    suggestions_en: ['Self-Enterprise with PM-AJAY Grant', 'Certified Job in nearby industrial hub', 'Rural Service Center in Village']
  }
];

export const NSQF_COURSES = [
  {
    id: 'nsqf-1',
    code: 'ELE/Q5901',
    title: 'Solar PV System Installation & Maintenance',
    title_hi: 'सोलर पीवी सिस्टम इंस्टॉलेशन एवं मेंटेनेंस',
    sector: 'Green Jobs & Renewable Energy',
    nsqf_level: 'Level 4',
    duration: '320 Hours (2.5 Months)',
    mode: 'Practical + Hands-on Lab',
    grant_eligible: true,
    subsidy_amount: '₹18,500 (100% Free under PM-AJAY GIA)',
    stipend: '₹3,500/month',
    certifying_body: 'Skill Council for Green Jobs (SCGJ)',
    min_qualification: '8th / 10th Pass',
    career_outcome: 'Solar Technician / Village Micro-Grid Operator',
    expected_income: '₹18,000 - ₹25,000 / month',
    match_score: 96,
    tags: ['High Demand in UP/Bihar', 'PM Surya Ghar Linked', 'Self-Employment Loan Ready'],
    explainability: {
      skill_match: 'Matches your informal wiring & domestic repair experience.',
      eligibility: 'Meets 8th/10th standard prerequisite.',
      demand: 'High demand in solar rooftop projects under PM Surya Ghar & PM-AJAY model villages.',
      accessibility: 'Training available at District PMKK / ITI center within 12km.'
    }
  },
  {
    id: 'nsqf-2',
    code: 'AGR/Q1202',
    title: 'Organic Grower & Bio-Fertilizer Producer',
    title_hi: 'जैविक खेती एवं बायो-फर्टिलाइजर उत्पादन विशेषज्ञ',
    sector: 'Agriculture & Allied',
    nsqf_level: 'Level 3',
    duration: '240 Hours (2 Months)',
    mode: 'Field Demonstration + Classroom',
    grant_eligible: true,
    subsidy_amount: '₹14,000 (100% GIA Grant for SC Artisans)',
    stipend: '₹2,800/month',
    certifying_body: 'Agriculture Skill Council of India (ASCI)',
    min_qualification: '5th Pass / Basic Literacy',
    career_outcome: 'Organic Farmer Group Leader / FPO Member',
    expected_income: '₹15,000 - ₹22,000 / month',
    match_score: 92,
    tags: ['GIA Enterprise Subsidy Ready', 'Direct Market Linkage', 'Zero-Cost Setup'],
    explainability: {
      skill_match: 'Aligns with your traditional agricultural knowledge & cattle management.',
      eligibility: 'No strict academic barrier; ideal for rural SC farmers.',
      demand: 'Export and high local mandi demand for certified organic produce.',
      accessibility: 'KVK (Krishi Vigyan Kendra) mobile batch in your block.'
    }
  },
  {
    id: 'nsqf-3',
    code: 'TXT/Q1001',
    title: 'Handloom Weaver & Modern Zari Designer',
    title_hi: 'हथकरघा बुनकर एवं आधुनिक ज़री/फैब्रिक डिज़ाइनर',
    sector: 'Textiles, Apparel & Handicrafts',
    nsqf_level: 'Level 4',
    duration: '300 Hours (2.5 Months)',
    mode: 'Workshop Practicum',
    grant_eligible: true,
    subsidy_amount: '₹22,000 + ₹50,000 Tool Kit Assistance',
    stipend: '₹4,000/month',
    certifying_body: 'Textile Sector Skill Council (TSC)',
    min_qualification: '8th Pass',
    career_outcome: 'Artisan Entrepreneur / Master Weaver',
    expected_income: '₹20,000 - ₹30,000 / month',
    match_score: 90,
    tags: ['ODOP Scheme Linked', 'PM Vishwakarma & PM-AJAY GIA', 'E-Commerce Export Linkage'],
    explainability: {
      skill_match: 'Formalizes your hereditary handloom & embroidery mastery into export standards.',
      eligibility: 'Eligible for special SC Artisan GIA machinery grant of ₹50,000.',
      demand: 'High craft value in Varanasi & Pan-India e-commerce export clusters.',
      accessibility: 'Common Facility Centre (CFC) within 6km.'
    }
  },
  {
    id: 'nsqf-4',
    code: 'CON/Q0602',
    title: 'Assistant Electrician & Domestic Appliance Repair',
    title_hi: 'सहायक इलेक्ट्रिशियन एवं घरेलू उपकरण मरम्मत',
    sector: 'Construction & Capital Goods',
    nsqf_level: 'Level 3',
    duration: '280 Hours (2 Months)',
    mode: 'Hands-on Tool Training',
    grant_eligible: true,
    subsidy_amount: '₹16,000 (100% Free under PM-AJAY)',
    stipend: '₹3,000/month',
    certifying_body: 'Construction Skill Development Council (CSDCI)',
    min_qualification: '8th Pass',
    career_outcome: 'Certified Electrician / Repair Shop Owner',
    expected_income: '₹16,000 - ₹24,000 / month',
    match_score: 87,
    tags: ['Quick Employment', 'Local Market Demand', 'Tool Kit Included'],
    explainability: {
      skill_match: 'Converts unstructured electrical fixes into certified safety-compliant competence.',
      eligibility: 'Standard 8th pass qualification approved.',
      demand: 'Every panchayat & town has regular demand for household electrical repairs.',
      accessibility: 'Sub-district Vocational Training Center (VTC) nearby.'
    }
  }
];

export const NEARBY_CENTERS = [
  {
    id: 'center-1',
    name: 'Pradhan Mantri Kaushal Kendra (PMKK) Varanasi',
    type: 'Govt. Affiliated District Center',
    address: 'Near Cantt Railway Station, Varanasi, UP - 221002',
    distance: '6.4 km away',
    travel_time: '18 mins by auto/bus',
    contact: '+91 542 2289410',
    schemes: ['PM-AJAY GIA', 'PMKVY 4.0', 'DDU-GKY'],
    free_hostel: true,
    current_batches: ['Solar PV Level 4 (Starts in 3 days)', 'Organic Farming (Open)']
  },
  {
    id: 'center-2',
    name: 'District Krishi Vigyan Kendra (KVK) & Rural Skill Hub',
    type: 'ICAR / Ministry of Social Justice Center',
    address: 'Kallipur, Robertsganj Road, Varanasi Rural, UP',
    distance: '11.2 km away',
    travel_time: '25 mins',
    contact: '+91 94150 88219',
    schemes: ['PM-AJAY GIA component', 'Skill India Rural'],
    free_hostel: false,
    current_batches: ['Bio-Fertilizer Batch B', 'Agri-Tech Solar Pumps']
  },
  {
    id: 'center-3',
    name: 'Common Facility Centre (CFC) Handloom Cluster',
    type: 'Ministry of Textiles & State SC Welfare Dept.',
    address: 'Chowkaghat Weavers Hub, Varanasi, UP',
    distance: '4.8 km away',
    travel_time: '12 mins',
    contact: '+91 542 2501192',
    schemes: ['SC Special Livelihood Grant', 'PM-AJAY GIA'],
    free_hostel: false,
    current_batches: ['Modern Jacquard Weaving Level 4', 'Zari Finishing']
  }
];

export const BENEFICIARIES_DATA = [
  {
    id: 'BEN-2026-0891',
    name: 'Rameshwar Lal',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'SC (Chamar/Jatav)',
    education: '8th Pass',
    informal_skill: 'Traditional Weaving & Wiring',
    nsqf_mapped: 'Solar PV Installer (Level 4)',
    status: 'In Training (Batch 14)',
    status_code: 'training',
    progress: 68,
    grant_sanctioned: '₹18,500',
    disbursed: '₹12,000',
    expected_outcome: 'Micro-Grid Entrepreneur'
  },
  {
    id: 'BEN-2026-0892',
    name: 'Sunita Devi',
    district: 'Gaya',
    state: 'Bihar',
    category: 'SC (Musahar/Manjhi)',
    education: 'Basic Literacy',
    informal_skill: 'Organic Vegetable Farming',
    nsqf_mapped: 'Organic Grower (Level 3)',
    status: 'Certified (Placed in FPO)',
    status_code: 'placed',
    progress: 100,
    grant_sanctioned: '₹14,000',
    disbursed: '₹14,000',
    expected_outcome: 'FPO Agro-Entrepreneur'
  },
  {
    id: 'BEN-2026-0893',
    name: 'Vikram Paswan',
    district: 'Patna',
    state: 'Bihar',
    category: 'SC (Paswan)',
    education: '10th Matric',
    informal_skill: 'Household Electrician',
    nsqf_mapped: 'Assistant Electrician (Level 3)',
    status: 'Profiled & Enrolled',
    status_code: 'enrolled',
    progress: 25,
    grant_sanctioned: '₹16,000',
    disbursed: '₹5,000',
    expected_outcome: 'Electrical Maintenance Contractor'
  },
  {
    id: 'BEN-2026-0894',
    name: 'Meena Kumari',
    district: 'Jaipur Rural',
    state: 'Rajasthan',
    category: 'SC (Bairwa)',
    education: '12th Inter',
    informal_skill: 'Apparel Tailoring & Handicrafts',
    nsqf_mapped: 'Handloom & Fashion Designer (Level 4)',
    status: 'Enterprise Sanctioned (GIA Kit)',
    status_code: 'placed',
    progress: 100,
    grant_sanctioned: '₹50,000',
    disbursed: '₹50,000',
    expected_outcome: 'Self-Employed Boutique Owner'
  },
  {
    id: 'BEN-2026-0895',
    name: 'Dinesh Chandra',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    category: 'SC (Kori)',
    education: '10th Pass',
    informal_skill: 'Agri Machineries Repair',
    nsqf_mapped: 'Solar PV Installer (Level 4)',
    status: 'Under Skill Gap Assessment',
    status_code: 'assessment',
    progress: 15,
    grant_sanctioned: '₹18,500',
    disbursed: 'Pending',
    expected_outcome: 'Solar Agri Pump Technician'
  }
];

export const DISTRICT_STATS = {
  total_sc_profiled: '14,820',
  active_in_training: '6,450',
  nsqf_certified: '5,180',
  placed_or_enterprise: '4,210',
  success_rate: '81.2%',
  gia_funds_allocated: '₹28.40 Cr',
  gia_funds_disbursed: '₹22.15 Cr'
};
