import React, { createContext, useState, useContext } from 'react';

// Define available languages
const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    translations: {
      // Navigation & Common
      home: 'Home',
      about: 'About Us',
      blog: 'Blog',
      dashboard: 'Dashboard',
      login: 'Login',
      signup: 'Sign Up',
      resources: 'Resources',
      findTeacher: 'Find a Teacher Guide',
      becomeTeacher: 'Become a Teacher Guide',
      logout: 'Logout',
      
      // Auth Forms
      welcomeBack: 'Welcome Back!',
      continueJourney: 'Sign in to continue your learning journey with LesonPaw',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      validate: 'Validate',
      captchaText: 'Enter the captcha text',
      newToSite: 'New to LesonPaw?',
      createAccount: 'Create an account',
      successLogin: 'User Login Successful!',
      failedLogin: 'Login Failed',
      tryAgain: 'Try Again',
      
      // Footer
      quickLinks: 'Quick Links',
      subjects: 'Subjects',
      contactUs: 'Contact Us',
      teacherGuide: 'Teacher Guide',
      studentGuide: 'Student Guide',
      connectingStudents: 'Connecting students with professional teachers across Haiti since 2023',
      allRightsReserved: '© 2025 LessonPaw. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: 'Transforming Education',
      inHaiti: 'in Haiti',
      buildingBridges: 'Building bridges between ambitious students and expert educators for a brighter future',
      getStarted: 'Get Started Now',
      
      // About Page
      ourPurpose: 'Our Purpose',
      empoweringEducation: 'Empowering education through innovation and accessibility',
      forStudents: 'For Students',
      forTutors: 'For Tutors',
      accessToTutors: 'Access to qualified tutors across multiple subjects',
      flexibleScheduling: 'Flexible scheduling to fit your needs',
      personalizedLearning: 'Personalized learning experience',
      progressTracking: 'Progress tracking and performance analytics',
      buildProfile: 'Build your teaching profile and reputation',
      setSchedule: 'Set your own schedule and rates',
      teachingResources: 'Access to teaching resources and materials',
      securePayment: 'Secure payment processing',
      
      // Trust & Security
      trustAndSecurity: 'Trust & Security',
      yourSafety: 'Your safety and success are our top priorities',
      verifiedTutors: 'Verified Tutors',
      support247: '24/7 Support',
      satisfactionGuarantee: 'Satisfaction Guarantee',
      tutorsVerified: 'All our tutors undergo thorough background checks and verification processes',
      supportAvailable: 'Our dedicated support team is always available to assist you',
      qualityEducation: 'We ensure quality education and student satisfaction in every session',
      
      // Subjects
      mathematics: 'Mathematics',
      sciences: 'Sciences',
      languages: 'Languages',
      history: 'History',
      computerScience: 'Computer Science',
      artsMusic: 'Arts & Music',
      
      // Stats
      studentsHelped: 'Students Helped',
      successfulLearners: 'Successful learners who achieved their goals',
      expertTutors: 'Expert Tutors',
      qualifiedEducators: 'Qualified educators ready to help',
      subjectsCovered: 'Subjects Covered',
      diverseTopics: 'Diverse range of academic topics',
      successRate: 'Success Rate',
      satisfactionRate: 'Student satisfaction rate',
      
      // Values
      ourValues: 'Our Core Values',
      principlesGuide: 'Principles that guide our mission to transform education',
      integrity: 'Integrity',
      integrityDesc: 'We maintain the highest standards of professional conduct',
      innovation: 'Innovation',
      innovationDesc: 'Constantly improving our platform and methods',
      growth: 'Growth',
      growthDesc: 'Fostering continuous learning and development',
      excellence: 'Excellence',
      excellenceDesc: 'Striving for the best in everything we do',
      
      // Call to Action
      readyToTransform: 'Ready to Transform Your Learning Journey?',
      joinThousands: 'Join thousands of students and tutors who are already part of our growing community',

      // How It Works Section
      howItWorks: 'How It Works',
      searchTeacher: 'Search',
      searchTeacherDesc: 'Find the perfect teacher based on your needs and location in Haiti.',
      connect: 'Connect',
      connectDesc: 'Schedule lessons at times that work for your availability.',
      learn: 'Learn',
      learnDesc: 'Receive personalized instruction and achieve your goals.',
      platformDesc: 'Our platform makes it easy to connect students with qualified teachers in Haiti',
      readyToStart: 'Ready to start your learning journey or offer your teaching services?',
      
      // Why Choose Us Section
      whyChooseUs: 'Why Choose LessonPaw',
      committedToEducation: "We're committed to making quality education accessible throughout Haiti",
      verifiedTeachers: 'Verified Teachers',
      verifiedTeachersDesc: 'All teachers are verified for credentials and expertise in their subjects.',
      studentCount: '5,000+ Students',
      studentCountDesc: 'Join thousands of students who have found their perfect teacher match.',
      qualityGuarantee: 'Quality Guarantee',
      qualityGuaranteeDesc: 'We ensure high-quality teaching or offer a replacement at no extra cost.',
      safePayments: 'Safe Payments',
      safePaymentsDesc: 'Secure payment options including mobile money popular in Haiti.',
      
      // Teacher Section
      meetExperts: 'Meet Our Expert Tutors',
      teacherDesc: 'Learn from experienced educators who are passionate about helping students succeed',
      
      // Success Stories Section
      successStories: 'Our Success Stories',
      successStoriesDesc: 'Discover how our platform has transformed learning experiences and helped students achieve their goals',
      viewAllStories: 'View All Success Stories',
      noStories: 'No success stories to display yet.'
    }
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    translations: {
      // Navigation & Common
      home: 'Accueil',
      about: 'À Propos',
      blog: 'Blog',
      dashboard: 'Tableau de Bord',
      login: 'Connexion',
      signup: "S'inscrire",
      resources: 'Ressources',
      findTeacher: 'Trouver un Professeur',
      becomeTeacher: 'Devenir Professeur',
      logout: 'Déconnexion',
      
      // Auth Forms
      welcomeBack: 'Bon Retour!',
      continueJourney: 'Connectez-vous pour continuer votre parcours avec LesonPaw',
      email: 'Email',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      enterEmail: 'Entrez votre email',
      enterPassword: 'Entrez votre mot de passe',
      validate: 'Valider',
      captchaText: 'Entrez le texte du captcha',
      newToSite: 'Nouveau sur LesonPaw?',
      createAccount: 'Créer un compte',
      successLogin: 'Connexion réussie!',
      failedLogin: 'Échec de la connexion',
      tryAgain: 'Réessayer',
      
      // Footer
      quickLinks: 'Liens Rapides',
      subjects: 'Matières',
      contactUs: 'Contactez-nous',
      teacherGuide: 'Guide du Professeur',
      studentGuide: "Guide de l'Étudiant",
      connectingStudents: 'Connecter les étudiants avec des professeurs professionnels à travers Haïti depuis 2023',
      allRightsReserved: '© 2025 LessonPaw. Tous droits réservés.',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: "Conditions d'Utilisation",
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: "Transformer l'Éducation",
      inHaiti: 'en Haïti',
      buildingBridges: 'Créer des ponts entre les étudiants ambitieux et les éducateurs experts pour un avenir meilleur',
      getStarted: 'Commencer Maintenant',
      
      // About Page
      ourPurpose: 'Notre Mission',
      empoweringEducation: "L'autonomisation de l'éducation par l'innovation et l'accessibilité",
      forStudents: 'Pour les Étudiants',
      forTutors: 'Pour les Professeurs',
      accessToTutors: "Accès à des tuteurs qualifiés dans plusieurs matières",
      flexibleScheduling: "Planification flexible selon vos besoins",
      personalizedLearning: "Expérience d'apprentissage personnalisée",
      progressTracking: "Suivi des progrès et analyses de performance",
      buildProfile: "Construisez votre profil et réputation d'enseignant",
      setSchedule: "Définissez vos horaires et tarifs",
      teachingResources: "Accès aux ressources et matériels d'enseignement",
      securePayment: "Traitement sécurisé des paiements",
      
      // Trust & Security
      trustAndSecurity: 'Confiance et Sécurité',
      yourSafety: 'Votre sécurité et votre réussite sont nos principales priorités',
      verifiedTutors: 'Tuteurs Vérifiés',
      support247: 'Support 24/7',
      satisfactionGuarantee: 'Garantie de Satisfaction',
      tutorsVerified: 'Tous nos tuteurs passent par des vérifications approfondies',
      supportAvailable: 'Notre équipe de support est toujours disponible pour vous aider',
      qualityEducation: 'Nous garantissons une éducation de qualité et la satisfaction des étudiants',
      
      // Subjects
      mathematics: 'Mathématiques',
      sciences: 'Sciences',
      languages: 'Langues',
      history: 'Histoire',
      computerScience: 'Informatique',
      artsMusic: 'Arts et Musique',
      
      // Stats
      studentsHelped: 'Étudiants Aidés',
      successfulLearners: 'Apprenants qui ont atteint leurs objectifs',
      expertTutors: 'Tuteurs Experts',
      qualifiedEducators: 'Éducateurs qualifiés prêts à aider',
      subjectsCovered: 'Matières Couvertes',
      diverseTopics: 'Large gamme de sujets académiques',
      successRate: 'Taux de Réussite',
      satisfactionRate: 'Taux de satisfaction des étudiants',
      
      // Values
      ourValues: 'Nos Valeurs Fondamentales',
      principlesGuide: 'Les principes qui guident notre mission de transformer l\'éducation',
      integrity: 'Intégrité',
      integrityDesc: 'Nous maintenons les plus hauts standards de conduite professionnelle',
      innovation: 'Innovation',
      innovationDesc: 'Amélioration constante de notre plateforme et de nos méthodes',
      growth: 'Croissance',
      growthDesc: 'Favoriser l\'apprentissage et le développement continus',
      excellence: 'Excellence',
      excellenceDesc: 'Viser l\'excellence dans tout ce que nous faisons',
      
      // Call to Action
      readyToTransform: 'Prêt à Transformer Votre Parcours d\'Apprentissage ?',
      joinThousands: 'Rejoignez des milliers d\'étudiants et de tuteurs qui font déjà partie de notre communauté grandissante',

      // How It Works Section
      howItWorks: 'Comment Ça Marche',
      searchTeacher: 'Rechercher',
      searchTeacherDesc: 'Trouvez le professeur idéal selon vos besoins et votre localisation en Haïti.',
      connect: 'Connecter',
      connectDesc: 'Planifiez des leçons selon votre disponibilité.',
      learn: 'Apprendre',
      learnDesc: 'Recevez une instruction personnalisée et atteignez vos objectifs.',
      platformDesc: 'Notre plateforme facilite la connexion entre étudiants et professeurs qualifiés en Haïti',
      readyToStart: "Prêt à commencer votre parcours d'apprentissage ou à offrir vos services d'enseignement ?",
      
      // Why Choose Us Section
      whyChooseUs: 'Pourquoi Choisir LessonPaw',
      committedToEducation: "Nous nous engageons à rendre l'éducation de qualité accessible à travers Haïti",
      verifiedTeachers: 'Professeurs Vérifiés',
      verifiedTeachersDesc: 'Tous nos professeurs sont vérifiés pour leurs qualifications et expertise.',
      studentCount: '5,000+ Étudiants',
      studentCountDesc: 'Rejoignez des milliers d\'étudiants qui ont trouvé leur professeur idéal.',
      qualityGuarantee: 'Garantie Qualité',
      qualityGuaranteeDesc: 'Nous garantissons un enseignement de qualité ou proposons un remplacement sans frais.',
      safePayments: 'Paiements Sécurisés',
      safePaymentsDesc: 'Options de paiement sécurisées incluant le mobile money populaire en Haïti.',
      
      // Teacher Section
      meetExperts: 'Rencontrez Nos Professeurs Experts',
      teacherDesc: 'Apprenez avec des éducateurs expérimentés passionnés par la réussite des étudiants',
      
      // Success Stories Section
      successStories: 'Nos Histoires de Réussite',
      successStoriesDesc: 'Découvrez comment notre plateforme a transformé les expériences d\'apprentissage et aidé les étudiants à atteindre leurs objectifs',
      viewAllStories: 'Voir Toutes les Histoires',
      noStories: 'Aucune histoire de réussite à afficher pour le moment.'
    }
  },
  ht: {
    name: 'Kreyòl Ayisyen',
    flag: '🇭🇹',
    translations: {
      // Navigation & Common
      home: 'Akèy',
      about: 'Sou Nou',
      blog: 'Blog',
      dashboard: 'Tablo',
      login: 'Konekte',
      signup: 'Enskri',
      resources: 'Resous',
      findTeacher: 'Jwenn yon Pwofesè',
      becomeTeacher: 'Vin yon Pwofesè',
      logout: 'Dekonekte',
      
      // Auth Forms
      welcomeBack: 'Byenveni Ankò!',
      continueJourney: 'Konekte pou kontinye aprantisaj ou ak LesonPaw',
      email: 'Imèl',
      password: 'Modpas',
      forgotPassword: 'Ou bliye modpas ou?',
      enterEmail: 'Antre imèl ou',
      enterPassword: 'Antre modpas ou',
      validate: 'Valide',
      captchaText: 'Antre tèks captcha a',
      newToSite: 'Ou nouvo sou LesonPaw?',
      createAccount: 'Kreye yon kont',
      successLogin: 'Koneksyon reyisi!',
      failedLogin: 'Koneksyon echwe',
      tryAgain: 'Eseye ankò',
      
      // Footer
      quickLinks: 'Lyen Rapid',
      subjects: 'Matyè',
      contactUs: 'Kontakte Nou',
      teacherGuide: 'Gid Pwofesè',
      studentGuide: 'Gid Elèv',
      connectingStudents: 'Konekte elèv yo ak pwofesè pwofesyonèl atravè Ayiti depi 2023',
      allRightsReserved: '© 2025 LessonPaw. Tout dwa rezève.',
      privacyPolicy: 'Politik Konfidansyalite',
      termsOfService: 'Kondisyon Sèvis',
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: 'Transfòme Edikasyon',
      inHaiti: 'an Ayiti',
      buildingBridges: 'Bati pon ant elèv ambisye ak edikatè ekspè pou yon pi bon demen',
      getStarted: 'Kòmanse Kounye a',
      
      // About Page
      ourPurpose: 'Misyon Nou',
      empoweringEducation: 'Bay pouvwa edikasyon atravè inovasyon ak aksè',
      forStudents: 'Pou Elèv yo',
      forTutors: 'Pou Pwofesè yo',
      accessToTutors: 'Aksè a pwofesè kalifye nan plizyè matyè',
      flexibleScheduling: 'Orè fleksib selon bezwen ou',
      personalizedLearning: 'Eksperyans aprantisaj pèsonalize',
      progressTracking: 'Swivi pwogrè ak analiz pèfòmans',
      buildProfile: 'Bati pwofil ou ak reputasyon ou kòm pwofesè',
      setSchedule: 'Fikse pwòp orè ak pri ou',
      teachingResources: 'Aksè a resous ak materyèl ansèyman',
      securePayment: 'Tretman peman sekirize',
      
      // Trust & Security
      trustAndSecurity: 'Konfyans ak Sekirite',
      yourSafety: 'Sekirite ou ak siksè ou se priyorite nou yo',
      verifiedTutors: 'Pwofesè Verifye',
      support247: 'Sipò 24/7',
      satisfactionGuarantee: 'Garanti Satisfaksyon',
      tutorsVerified: 'Tout pwofesè nou yo pase pa verifikasyon apwofondi',
      supportAvailable: 'Ekip sipò nou an toujou disponib pou ede ou',
      qualityEducation: 'Nou garanti yon edikasyon kalite ak satisfaksyon elèv yo',
      
      // Subjects
      mathematics: 'Matematik',
      sciences: 'Syans',
      languages: 'Lang',
      history: 'Istwa',
      computerScience: 'Enfòmatik',
      artsMusic: 'Art ak Mizik',
      
      // Stats
      studentsHelped: 'Elèv ki Jwenn Èd',
      successfulLearners: 'Apranti ki reyisi objektif yo',
      expertTutors: 'Pwofesè Ekspè',
      qualifiedEducators: 'Edikatè kalifye ki pare pou ede',
      subjectsCovered: 'Matyè ki Kouvri',
      diverseTopics: 'Divès sijè akademik',
      successRate: 'To Siksè',
      satisfactionRate: 'To satisfaksyon elèv yo',
      
      // Values
      ourValues: 'Valè Fondamantal Nou yo',
      principlesGuide: 'Prensip ki gide misyon nou pou transfòme edikasyon',
      integrity: 'Entegrite',
      integrityDesc: 'Nou kenbe pi wo nivo konduit pwofesyonèl',
      innovation: 'Inovasyon',
      innovationDesc: 'Amelyore platfòm ak metòd nou yo san rete',
      growth: 'Kwasans',
      growthDesc: 'Ankouraje aprantisaj ak devlopman kontinyèl',
      excellence: 'Ekselans',
      excellenceDesc: 'Vize pi bon nan tout sa nou fè',
      
      // Call to Action
      readyToTransform: 'Ou Pare pou Transfòme Pakou Aprantisaj Ou?',
      joinThousands: 'Jwenn ak milye elèv ak pwofesè ki deja fè pati kominote nou an k ap grandi',

      // How It Works Section
      howItWorks: 'Kijan Li Mache',
      searchTeacher: 'Chèche',
      searchTeacherDesc: 'Jwenn pwofesè pafè a selon bezwen ou ak kote ou ye an Ayiti.',
      connect: 'Konekte',
      connectDesc: 'Planifye leson yo selon disponibilite ou.',
      learn: 'Aprann',
      learnDesc: 'Resevwa enstriksyon pèsonalize epi reyalize objektif ou yo.',
      platformDesc: 'Platfòm nou an fasilite koneksyon ant elèv yo ak pwofesè kalifye an Ayiti',
      readyToStart: 'Ou pare pou kòmanse pakou aprantisaj ou oswa ofri sèvis ansèyman ou?',
      
      // Why Choose Us Section
      whyChooseUs: 'Poukisa Chwazi LessonPaw',
      committedToEducation: 'Nou angaje nou pou rann edikasyon kalite aksesib atravè Ayiti',
      verifiedTeachers: 'Pwofesè Verifye',
      verifiedTeachersDesc: 'Tout pwofesè yo verifye pou kalifikasyon ak ekspètiz yo.',
      studentCount: '5,000+ Elèv',
      studentCountDesc: 'Jwenn ak milye elèv ki deja jwenn pwofesè pafè yo.',
      qualityGuarantee: 'Garanti Kalite',
      qualityGuaranteeDesc: 'Nou garanti ansèyman kalite oswa nou ofri yon ranplasman san frè.',
      safePayments: 'Peman Sekirize',
      safePaymentsDesc: 'Opsyon peman sekirize ki gen ladan mobile money popilè an Ayiti.',
      
      // Teacher Section
      meetExperts: 'Rankontre Pwofesè Ekspè Nou yo',
      teacherDesc: 'Aprann ak edikatè ki gen eksperyans ki pasyone pou ede elèv yo reyisi',
      
      // Success Stories Section
      successStories: 'Istwa Siksè Nou yo',
      successStoriesDesc: 'Dekouvri kijan platfòm nou an transfòme eksperyans aprantisaj epi ede elèv yo atenn objektif yo',
      viewAllStories: 'Gade Tout Istwa yo',
      noStories: 'Pa gen istwa siksè pou afiche pou kounye a.'
    }
  }
};

// Move context creation to a separate constant
const LanguageContext = createContext();

// Export context separately
export { LanguageContext };

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translate = (key) => {
    return languages[currentLanguage]?.translations[key] || languages.en.translations[key] || key;
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    translate,
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider; 