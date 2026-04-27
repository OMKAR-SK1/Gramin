
import { Language, HealthCategory, EmergencyService, Hospital } from './types';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  app_name: {
    mr: 'ग्रामीण आरोग्य',
    hi: 'ग्रामीण आरोग्य',
    en: 'Gramin Arogya'
  },
  select_language: {
    mr: 'भाषा निवडा',
    hi: 'भाषा चुनें',
    en: 'Select Language'
  },
  welcome: {
    mr: 'स्वागत आहे',
    hi: 'स्वागत है',
    en: 'Welcome'
  },
  health_info: {
    mr: 'आरोग्य माहिती',
    hi: 'स्वास्थ्य जानकारी',
    en: 'Health Info'
  },
  emergency: {
    mr: 'आणीबाणी मदत',
    hi: 'आपातकालीन सहायता',
    en: 'Emergency Help'
  },
  doctor_call: {
    mr: 'डॉक्टरला फोन करा',
    hi: 'डॉक्टर को कॉल करें',
    en: 'Doctor Call'
  },
  medicine_reminder: {
    mr: 'औषध आठवण',
    hi: 'दवा अनुस्मारक',
    en: 'Medicine Reminder'
  },
  hospital_locator: {
    mr: 'जवळपासचे रुग्णालय',
    hi: 'नजदीकी अस्पताल',
    en: 'Nearby Hospital'
  },
  back: {
    mr: 'मागे',
    hi: 'पीछे',
    en: 'Back'
  },
  call_now: {
    mr: 'आत्ता फोन करा',
    hi: 'अभी कॉल करें',
    en: 'Call Now'
  },
  emergency_btn_desc: {
    mr: 'मदतीसाठी दाबा',
    hi: 'मदद के लिए दबाएं',
    en: 'Press for Help'
  },
  first_aid_title: {
    mr: 'प्रथमोपचार सूचना',
    hi: 'प्राथमिक चिकित्सा निर्देश',
    en: 'First Aid Instructions'
  }
};

export const HEALTH_CATEGORIES: HealthCategory[] = [
  {
    id: 'child_health',
    title: { mr: 'बाल आरोग्य', hi: 'बाल स्वास्थ्य', en: 'Child Health' },
    icon: 'Baby',
    description: {
      mr: 'मुलांच्या लसीकरणाबद्दल आणि पोषणाबद्दल माहिती.',
      hi: 'बच्चों के टीकाकरण और पोषण के बारे में जानकारी।',
      en: 'Information about child vaccination and nutrition.'
    }
  },
  {
    id: 'women_care',
    title: { mr: 'स्त्री आरोग्य आणि गर्भधारणा', hi: 'महिला स्वास्थ्य और गर्भावस्था', en: 'Women & Pregnancy' },
    icon: 'UserRound',
    description: {
      mr: 'गर्भवती महिलांची काळजी आणि प्रसूतीपूर्व माहिती.',
      hi: 'गर्भवती महिलाओं की देखभाल और प्रसव पूर्व जानकारी।',
      en: 'Care for pregnant women and prenatal information.'
    }
  },
  {
    id: 'senior_care',
    title: { mr: 'ज्येष्ठ नागरिक काळजी', hi: 'वरिष्ठ नागरिक देखभाल', en: 'Senior Care' },
    icon: 'User',
    description: {
      mr: 'वृद्धांच्या आरोग्यासाठी आणि व्यायामासाठी माहिती.',
      hi: 'बुजुर्गों के स्वास्थ्य और व्यायाम के लिए जानकारी।',
      en: 'Information for elderly health and exercise.'
    }
  },
  {
    id: 'preventive_care',
    title: { mr: 'प्रतिबंधात्मक काळजी (डेंग्यू, टीबी)', hi: 'निवारक देखभाल (डेंग्यू, टीबी)', en: 'Preventive Care' },
    icon: 'ShieldCheck',
    description: {
      mr: 'डेंग्यू, मलेरिया आणि टीबी यांसारख्या आजारांपासून संरक्षण कसे करावे.',
      hi: 'डेंग्यू, मलेरिया और टीबी जैसी बीमारियों से बचाव कैसे करें।',
      en: 'How to protect yourself from diseases like Dengue, Malaria, and TB.'
    }
  }
];

export const EMERGENCY_SERVICES: EmergencyService[] = [
  {
    id: 'ambulance',
    name: { mr: 'रुग्णवाहिका', hi: 'एम्बुलेंस', en: 'Ambulance' },
    icon: 'Ambulance',
    number: '108',
    instructions: {
      mr: 'शांत राहा. रुग्णवाहिकेची वाट पाहत असताना रुग्णाला मोकळ्या हवेत ठेवा.',
      hi: 'शांत रहें। एम्बुलेंस का इंतज़ार करते समय मरीज को खुली हवा में रखें।',
      en: 'Stay calm. Keep the patient in an airy place while waiting for the ambulance.'
    }
  },
  {
    id: 'police',
    name: { mr: 'पोलीस', hi: 'पुलिस', en: 'Police' },
    icon: 'ShieldAlert',
    number: '100',
    instructions: {
      mr: 'तात्काळ जवळच्या पोलीस स्टेशनला कळवा.',
      hi: 'तुरंत नजदीकी पुलिस स्टेशन को सूचित करें।',
      en: 'Inform the nearest police station immediately.'
    }
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: { mr: 'जिल्हा रुग्णालय', hi: 'जिला अस्पताल', en: 'District Hospital' },
    type: { mr: 'सरकारी', hi: 'सरकारी', en: 'Government' },
    distance: '5 km',
    location: 'Main Road'
  },
  {
    id: 'h2',
    name: { mr: 'साई क्लिनिक', hi: 'साई क्लिनिक', en: 'Sai Clinic' },
    type: { mr: 'खाजगी', hi: 'निजी', en: 'Private' },
    distance: '2 km',
    location: 'Market Area'
  }
];
