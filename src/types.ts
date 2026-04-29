
export type Language = 'mr' | 'hi' | 'en';

export type Screen = 'login' | 'home' | 'health-info' | 'emergency' | 'doctor-call' | 'medicine-reminder' | 'hospital-locator';

export interface HealthCategory {
  id: string;
  title: Record<Language, string>;
  icon: string;
  description: Record<Language, string>;
}

export interface EmergencyService {
  id: string;
  name: Record<Language, string>;
  icon: string;
  number: string;
  instructions: Record<Language, string>;
}

export interface Hospital {
  id: string;
  name: Record<Language, string>;
  type: Record<Language, string>;
  distance: string;
  location: string;
}

export interface MedicineReminder {
  id: string;
  name: string;
  time: 'morning' | 'afternoon' | 'night';
  audioUri?: string;
}
