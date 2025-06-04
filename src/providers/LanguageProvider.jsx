import React, { createContext, useState, useContext } from 'react';

// Create and export the context
export const LanguageContext = createContext(null);

// Define available languages
const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    translations: {
      // Navigation & Common
      home: 'Home',
      about: 'About Us',
      blog: 'Blogs',
      dashboard: 'Dashboard',
      login: 'Login',
      signup: 'Sign Up',
      resources: 'Resources',
      findTeacher: 'Find a Teacher Guide',
      becomeTeacher: 'Become a Teacher Guide',
      logout: 'Logout',
      contact: 'Contact',
      
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
      allRightsReserved: '© 2025 LesonPaw. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: 'Transforming Education',
      inHaiti: 'in Haiti',
      buildingBridges: "Unlock your potential with expert educators who inspire. Join thousands of successful students on Haiti's premier learning platform. Your journey to excellence starts here!",
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
      noStories: 'No success stories to display yet.',
      
      // Support Section
      support: 'Support',
      supportDesc: 'Need help? Our support team is here for you',
      contactSupport: 'Contact Support',
      supportEmail: 'Email Support',
      supportPhone: 'Phone Support',
      supportChat: 'Live Chat',
      supportHours: 'Support Hours',
      supportAvailability: 'Support Available 24/7',
      supportResponse: 'Typical response time: 2 hours',
      supportTicket: 'Create Support Ticket',
      supportFAQ: 'FAQ',
      supportHelp: 'Need Support?',
      supportTeam: 'We are here to Help',
      
      // Message Component
      pleaseEnterMessage: 'Please enter a message',
      sent: 'Sent',
      messageSent: 'Message sent',
      error: 'Error',
      failedToSendMessage: 'Failed to send message',
      quickResponse: 'Quick Response',
      writeMessage: 'Write your message here...',
      sendMessage: 'Send Message',
      signInToMessage: 'Sign in to Send a Message',
      pleaseLoginMessage: 'Please log in to your account to send us a message.',
      
      // What is LesonPaw Section
      whatIsLesonPaw: 'What is',
      connectingStudents: 'Connecting students with professional teachers across Haiti since 2024',
      qualityEducation: 'Quality Education',
      qualityEducationDesc: 'We provide access to high-quality education through our network of verified professional teachers.',
      connecting: 'Building Connections',
      connectingDesc: 'Creating meaningful connections between students and teachers to foster a collaborative learning environment.',
      innovation: 'Innovative Learning',
      innovationDesc: 'Leveraging technology to make education more accessible and engaging for everyone.',
      lesonPawMission: 'Our mission is to transform education in Haiti by making quality learning accessible to all students through our innovative platform.',

      // Contact Page
      getInTouch: 'Get in Touch with',
      contactSubtitle: "We're here to help! Send us a message and we'll respond within 24 business hours.",
      fullName: 'Full Name',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      invalidEmail: 'Invalid email address',
      phone: 'Phone Number',
      optional: 'Optional',
      subject: 'Subject',
      subjectRequired: 'Subject is required',
      message: 'Message',
      messageRequired: 'Message is required',
      messageMinLength: 'Message must be at least 20 characters',
      attachments: 'Attachments',
      fileUploadInfo: 'Max file size: 5MB. Supported formats: PDF, DOC, DOCX, JPG, PNG',
      verifyCaptcha: 'Verify Captcha',
      enterCaptcha: 'Enter captcha text',
      captchaValidated: 'Captcha Validated!',
      captchaRequired: 'Captcha Required',
      pleaseVerifyCaptcha: 'Please verify the captcha before submitting',
      sending: 'Sending...',
      responseTime: 'We will get back to you within 24 business hours.',
      submissionFailed: 'Submission Failed',
      tryAlternativeContact: 'Please try again later or use alternative contact methods.',
      businessHours: 'Business Hours',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      timeZone: 'All times are in Eastern Time (ET)',
      contactInfo: 'Contact Information',
      address: 'Address',
      connectWithUs: 'Connect With Us',
      ourLocation: 'Our Location',
      getDirections: 'Get Directions',

      // Dashboard Menu
      manageProfile: 'Manage Profile',
      myBookings: 'My Bookings',
      joinAsTeacher: 'Join as Teacher',
      postJob: 'Post Job',
      availableJobs: 'Available Jobs',
      manageServices: 'Manage Services',
      manageUsers: 'Manage Users',
      allTutors: 'All Tutors',
      showMessages: 'Show Messages',
      addTutor: 'Add Tutor',
      applications: 'Applications',
      payments: 'Payments',
      analytics: 'Analytics',
      students: 'Students',
      allJobs: 'All Jobs',
      allServices: 'All Services',
      story: 'Story',
      manageStory: 'Manage Story',
      addBlog: 'Add Blog',
      editBlog: 'Edit Blog',
      menu: 'Menu'
    }
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    translations: {
      // Navigation & Common
      home: 'Inicio',
      about: 'Sobre Nosotros',
      blog: 'Blogs',
      dashboard: 'Panel de Control',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      resources: 'Recursos',
      findTeacher: 'Encontrar Profesor',
      becomeTeacher: 'Conviértete en Profesor',
      logout: 'Cerrar Sesión',
      contact: 'Contacto',
      
      // Auth Forms
      welcomeBack: '¡Bienvenido de Nuevo!',
      continueJourney: 'Inicia sesión para continuar tu viaje de aprendizaje con LesonPaw',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      enterEmail: 'Ingresa tu correo electrónico',
      enterPassword: 'Ingresa tu contraseña',
      validate: 'Validar',
      captchaText: 'Ingresa el texto del captcha',
      newToSite: '¿Nuevo en LesonPaw?',
      createAccount: 'Crear una cuenta',
      successLogin: '¡Inicio de sesión exitoso!',
      failedLogin: 'Error al iniciar sesión',
      tryAgain: 'Intentar de nuevo',
      
      // Footer
      quickLinks: 'Enlaces Rápidos',
      subjects: 'Materias',
      contactUs: 'Contáctanos',
      teacherGuide: 'Guía del Profesor',
      studentGuide: 'Guía del Estudiante',
      connectingStudents: 'Conectando estudiantes con profesores profesionales en Haití desde 2024',
      allRightsReserved: '© 2025 LesonPaw. Todos los derechos reservados.',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: 'Transformando la Educación',
      inHaiti: 'en Haití',
      buildingBridges: '¡Desbloquea tu potencial con educadores expertos que inspiran. Únete a miles de estudiantes exitosos en la principal plataforma de aprendizaje de Haití. Tu camino hacia la excelencia comienza aquí!',
      getStarted: 'Comenzar Ahora',
      
      // About Page
      ourPurpose: 'Nuestro Propósito',
      empoweringEducation: 'Empoderando la educación a través de la innovación y la accesibilidad',
      forStudents: 'Para Estudiantes',
      forTutors: 'Para Profesores',
      accessToTutors: 'Acceso a tutores calificados en múltiples materias',
      flexibleScheduling: 'Programación flexible según tus necesidades',
      personalizedLearning: 'Experiencia de aprendizaje personalizada',
      progressTracking: 'Seguimiento de progreso y análisis de rendimiento',
      buildProfile: 'Construye tu perfil y reputación como profesor',
      setSchedule: 'Establece tu propio horario y tarifas',
      teachingResources: 'Acceso a recursos y materiales de enseñanza',
      securePayment: 'Procesamiento seguro de pagos',
      
      // Trust & Security
      trustAndSecurity: 'Confianza y Seguridad',
      yourSafety: 'Tu seguridad y éxito son nuestras principales prioridades',
      verifiedTutors: 'Tutores Verificados',
      support247: 'Soporte 24/7',
      satisfactionGuarantee: 'Garantía de Satisfacción',
      tutorsVerified: 'Todos nuestros tutores pasan por verificaciones exhaustivas',
      supportAvailable: 'Nuestro equipo de soporte está siempre disponible para ayudarte',
      qualityEducation: 'Educación de Calidad',
      qualityEducationDesc: 'Proporcionamos acceso a educación de alta calidad a través de nuestra red de profesores profesionales verificados.',
      
      // Subjects
      mathematics: 'Matemáticas',
      sciences: 'Ciencias',
      languages: 'Idiomas',
      history: 'Historia',
      computerScience: 'Informática',
      artsMusic: 'Arte y Música',
      
      // Stats
      studentsHelped: 'Estudiantes Ayudados',
      successfulLearners: 'Aprendices que lograron sus objetivos',
      expertTutors: 'Profesores Expertos',
      qualifiedEducators: 'Educadores Calificados Listos para Ayudar',
      subjectsCovered: 'Materias Cubiertas',
      diverseTopics: 'Amplia Gama de Temas Académicos',
      successRate: 'Tasa de Éxito',
      satisfactionRate: 'Tasa de Satisfacción del Estudiante',
      
      // Values
      ourValues: 'Valores Fundamentales Nuestros',
      principlesGuide: 'Principios que Guían Nuestra Misión para Transformar la Educación',
      integrity: 'Integridad',
      integrityDesc: 'Mantenemos los más altos Estándares de Conducta Profesional',
      innovation: 'Innovación',
      innovationDesc: 'Mejora Continua de Nuestra Plataforma y Métodos',
      growth: 'Crecimiento',
      growthDesc: 'Fomentar el Aprendizaje y Desarrollo Continuo',
      excellence: 'Excelencia',
      excellenceDesc: 'Buscar la Excelencia en Todo lo Que Hacemos',
      
      // Call to Action
      readyToTransform: '¿Listo para Transformar Tu Viaje de Aprendizaje?',
      joinThousands: 'Únete a miles de estudiantes y tutores que ya forman parte de nuestra comunidad en crecimiento',

      // How It Works Section
      howItWorks: '¿Cómo Funciona?',
      searchTeacher: 'Buscar',
      searchTeacherDesc: 'Encuentra el profesor ideal según sus necesidades y ubicación en Haití.',
      connect: 'Conectarse',
      connectDesc: 'Planifique las lecciones según su disponibilité.',
      learn: 'Aprender',
      learnDesc: 'Reciba instrucción personalizada y logre sus objetivos.',
      platformDesc: 'Nuestra plataforma facilita la conexión entre estudiantes y profesores calificados en Haití',
      readyToStart: '¿Listo para comenzar su viaje de aprendizaje o ofrecer sus servicios de enseñanza?',
      
      // Why Choose Us Section
      whyChooseUs: '¿Por Qué Elegir LessonPaw?',
      committedToEducation: 'Nos comprometemos a hacer la educación de calidad accesible a través de Haití',
      verifiedTeachers: 'Profesores Verificados',
      verifiedTeachersDesc: 'Todos nuestros profesores están verificados para su calificación y expertise.',
      studentCount: '5,000+ Estudiantes',
      studentCountDesc: 'Únete a miles de estudiantes que ya encontraron su profesor ideal.',
      qualityGuarantee: 'Garantía de Calidad',
      qualityGuaranteeDesc: 'Nos comprometemos a ofrecer enseñanza de calidad o proponer una sustitución sin cargo.',
      safePayments: 'Pagos Seguros',
      safePaymentsDesc: 'Opciones de pago seguro que incluyen el dinero móvil popular en Haití.',
      
      // Teacher Section
      meetExperts: 'Conoce a Nuestros Profesores Expertos',
      teacherDesc: 'Aprenda con educadores experimentados apasionados por ayudar a los estudiantes a lograr',
      
      // Success Stories Section
      successStories: 'Nuestras Historias de Éxito',
      successStoriesDesc: 'Descubre cómo nuestra plataforma ha transformado experiencias de aprendizaje y ayudado a estudiantes a alcanzar sus metas',
      viewAllStories: 'Ver Todas las Historias',
      noStories: 'No hay historias de éxito para mostrar por el momento.',
      
      // Support Section
      support: 'Soporte',
      supportDesc: '¿Necesitas ayuda? Nuestro equipo de soporte está aquí para ti',
      contactSupport: 'Contactar Soporte',
      supportEmail: 'Soporte por Email',
      supportPhone: 'Soporte Telefónico',
      supportChat: 'Chat en Vivo',
      supportHours: 'Horario de Soporte',
      supportAvailability: 'Soporte Disponible 24/7',
      supportResponse: 'Tiempo de respuesta típico: 2 horas',
      supportTicket: 'Crear Ticket de Soporte',
      supportFAQ: 'Preguntas Frecuentes',
      supportHelp: '¿Cómo podemos ayudarte?',
      supportTeam: 'Nuestro Equipo de Soporte',
      
      // Message Component
      pleaseEnterMessage: 'Por favor, ingrese un mensaje',
      sent: 'Enviado',
      messageSent: 'Mensaje enviado',
      error: 'Error',
      failedToSendMessage: 'Error al enviar el mensaje',
      quickResponse: 'Respuesta Rápida',
      writeMessage: 'Escribe tu mensaje aquí...',
      sendMessage: 'Enviar Mensaje',
      signInToMessage: 'Inicia sesión para enviar un mensaje',
      pleaseLoginMessage: 'Por favor, inicia sesión en tu cuenta para enviarnos un mensaje.',
      
      // What is LesonPaw Section
      whatIsLesonPaw: '¿Qué es',
      connectingStudents: 'Conectando estudiantes con profesores profesionales en Haití desde 2024',
      qualityEducation: 'Educación de Calidad',
      qualityEducationDesc: 'Proporcionamos acceso a educación de alta calidad a través de nuestra red de profesores profesionales verificados.',
      connecting: 'Construyendo Conexiones',
      connectingDesc: 'Creando conexiones significativas entre estudiantes y profesores para fomentar un ambiente de aprendizaje colaborativo.',
      innovation: 'Aprendizaje Innovador',
      innovationDesc: 'Aprovechando la tecnología para hacer la educación más accesible y atractiva para todos.',
      lesonPawMission: 'Nuestra misión es transformar la educación en Haití haciendo que el aprendizaje de calidad sea accesible para todos los estudiantes a través de nuestra plataforma innovadora.',

      // Contact Page
      getInTouch: 'Contacta con',
      contactSubtitle: '¡Estamos aquí para ayudar! Envíanos un mensaje y responderemos dentro de las 24 horas hábiles.',
      fullName: 'Nombre Completo',
      nameRequired: 'El nombre es requerido',
      emailRequired: 'El correo electrónico es requerido',
      invalidEmail: 'Dirección de correo electrónico inválida',
      phone: 'Número de Teléfono',
      optional: 'Opcional',
      subject: 'Asunto',
      subjectRequired: 'El asunto es requerido',
      message: 'Mensaje',
      messageRequired: 'El mensaje es requerido',
      messageMinLength: 'El mensaje debe tener al menos 20 caracteres',
      attachments: 'Archivos Adjuntos',
      fileUploadInfo: 'Tamaño máximo: 5MB. Formatos soportados: PDF, DOC, DOCX, JPG, PNG',
      verifyCaptcha: 'Verificar Captcha',
      enterCaptcha: 'Ingrese el texto del captcha',
      captchaValidated: '¡Captcha Validado!',
      captchaRequired: 'Captcha Requerido',
      pleaseVerifyCaptcha: 'Por favor, verifica el captcha antes de enviar',
      sending: 'Enviando...',
      responseTime: 'Te responderemos dentro de las 24 horas hábiles.',
      submissionFailed: 'Error al Enviar',
      tryAlternativeContact: 'Por favor, intenta más tarde o usa métodos alternativos de contacto.',
      businessHours: 'Horario de Atención',
      mondayFriday: 'Lunes - Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
      closed: 'Cerrado',
      timeZone: 'Todos los horarios están en Hora del Este (ET)',
      contactInfo: 'Información de Contacto',
      address: 'Dirección',
      connectWithUs: 'Conéctate con Nosotros',
      ourLocation: 'Nuestra Ubicación',
      getDirections: 'Obtenir Direksyon',

      // Dashboard Menu
      manageProfile: 'Gestionar Perfil',
      myBookings: 'Mis Reservas',
      joinAsTeacher: 'Unirse como Profesor',
      postJob: 'Publicar Trabajo',
      availableJobs: 'Trabajos Disponibles',
      manageServices: 'Gestionar Servicios',
      manageUsers: 'Gestionar Usuarios',
      allTutors: 'Todos los Tutores',
      showMessages: 'Mostrar Mensajes',
      addTutor: 'Añadir Tutor',
      applications: 'Solicitudes',
      payments: 'Pagos',
      analytics: 'Análisis',
      students: 'Estudiantes',
      allJobs: 'Todos los Trabajos',
      allServices: 'Todos los Servicios',
      story: 'Historia',
      manageStory: 'Gestionar Historia',
      addBlog: 'Añadir Blog',
      editBlog: 'Editar Blog',
      menu: 'Menú'
    }
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    translations: {
      // Navigation & Common
      home: 'Accueil',
      about: 'À Propos',
      blog: 'Blogs',
      dashboard: 'Tableau de Bord',
      login: 'Connexion',
      signup: "S'inscrire",
      resources: 'Ressources',
      findTeacher: 'Trouver un Professeur',
      becomeTeacher: 'Devenir Professeur',
      logout: 'Déconnexion',
      contact: 'Contact',
      
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
      connectingStudents: 'Connecter les étudiants avec des professeurs professionnels à travers Haïti depuis 2024',
      allRightsReserved: '© 2025 LesonPaw. Tous droits réservés.',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: "Conditions d'Utilisation",
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: "Transformer l'Éducation",
      inHaiti: 'en Haïti',
      buildingBridges: 'Libérez votre potentiel avec des éducateurs experts qui inspirent. Rejoignez des milliers d\'étudiants qui réussissent sur la première plateforme d\'apprentissage d\'Haïti. Votre chemin vers l\'excellence commence ici !',
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
      noStories: 'Aucune histoire de réussite à afficher pour le moment.',
      
      // Support Section
      support: 'Support',
      supportDesc: 'Besoin d\'aide ? Notre équipe de support est là pour vous',
      contactSupport: 'Contacter le Support',
      supportEmail: 'Support par Email',
      supportPhone: 'Support Téléphonique',
      supportChat: 'Chat en Direct',
      supportHours: 'Heures de Support',
      supportAvailability: 'Support Disponible 24/7',
      supportResponse: 'Temps de réponse typique : 2 heures',
      supportTicket: 'Créer un Ticket de Support',
      supportFAQ: 'FAQ',
      supportHelp: 'Comment pouvons-nous vous aider ?',
      supportTeam: 'Notre Équipe de Support',
      
      // Message Component
      pleaseEnterMessage: 'Veuillez entrer un message',
      sent: 'Envoyé',
      messageSent: 'Message envoyé',
      error: 'Erreur',
      failedToSendMessage: 'Échec de l\'envoi du message',
      quickResponse: 'Réponse Rapide',
      writeMessage: 'Écrivez votre message ici...',
      sendMessage: 'Envoyer le Message',
      signInToMessage: 'Connectez-vous pour envoyer un message',
      pleaseLoginMessage: 'Veuillez vous connecter à votre compte pour nous envoyer un message.',
      
      // What is LesonPaw Section
      whatIsLesonPaw: "Qu'est-ce que",
      connectingStudents: 'Connecter les étudiants avec des professeurs professionnels à travers Haïti depuis 2024',
      qualityEducation: 'Éducation de Qualité',
      qualityEducationDesc: 'Nous fournissons un accès à une éducation de haute qualité grâce à notre réseau de professeurs professionnels vérifiés.',
      connecting: 'Créer des Connexions',
      connectingDesc: 'Créer des connexions significatives entre les étudiants et les professeurs pour favoriser un environnement d\'apprentissage collaboratif.',
      innovation: 'Apprentissage Innovant',
      innovationDesc: 'Utiliser la technologie pour rendre l\'éducation plus accessible et engageante pour tous.',
      lesonPawMission: 'Notre mission est de transformer l\'éducation en Haïti en rendant l\'apprentissage de qualité accessible à tous les étudiants grâce à notre plateforme innovante.',

      // Contact Page
      getInTouch: 'Contactez',
      contactSubtitle: 'Nous sommes là pour vous aider ! Envoyez-nous un message et nous répondrons dans les 24 heures ouvrables.',
      fullName: 'Nom Complet',
      nameRequired: 'Le nom est requis',
      emailRequired: "L'email est requis",
      invalidEmail: 'Adresse email invalide',
      phone: 'Numéro de Téléphone',
      optional: 'Optionnel',
      subject: 'Sujet',
      subjectRequired: 'Le sujet est requis',
      message: 'Message',
      messageRequired: 'Le message est requis',
      messageMinLength: 'Le message doit contenir au moins 20 caractères',
      attachments: 'Pièces Jointes',
      fileUploadInfo: 'Taille maximale : 5MB. Formats supportés : PDF, DOC, DOCX, JPG, PNG',
      verifyCaptcha: 'Vérifier le Captcha',
      enterCaptcha: 'Entrez le texte du captcha',
      captchaValidated: 'Captcha Validé !',
      captchaRequired: 'Captcha Requis',
      pleaseVerifyCaptcha: 'Veuillez vérifier le captcha avant de soumettre',
      sending: 'Ap voye...',
      responseTime: 'Nous ap reponn ou nan 24 èdtan.',
      submissionFailed: 'Echèk nan Voye',
      tryAlternativeContact: "Veuillez réessayer plus tard ou utiliser d'autres méthodes pour kontakte nou.",
      businessHours: "Heures d'Ouverture",
      mondayFriday: 'Lundi - Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
      closed: 'Fèmen',
      timeZone: 'Tout lè yo se nan Lè Lès (ET)',
      contactInfo: 'Enfòmasyon Kontak',
      address: 'Adrès',
      connectWithUs: 'Konekte ak Nou',
      ourLocation: 'Lokalizasyon Nou',
      getDirections: 'Jwenn Direksyon',

      // Dashboard Menu
      manageProfile: 'Gérer le Profil',
      myBookings: 'Mes Réservations',
      joinAsTeacher: 'Devenir Professeur',
      postJob: 'Publier une Offre',
      availableJobs: 'Offres Disponibles',
      manageServices: 'Gérer les Services',
      manageUsers: 'Gérer les Utilisateurs',
      allTutors: 'Tous les Tuteurs',
      showMessages: 'Afficher les Messages',
      addTutor: 'Ajouter un Tuteur',
      applications: 'Candidatures',
      payments: 'Paiements',
      analytics: 'Analyses',
      students: 'Étudiants',
      allJobs: 'Toutes les Offres',
      allServices: 'Tous les Services',
      story: 'Histoire',
      manageStory: 'Gérer l\'Histoire',
      addBlog: 'Ajouter un Blog',
      editBlog: 'Éditer le Blog',
      menu: 'Meni'
    }
  },
  ht: {
    name: 'Kreyòl',
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
      contact: 'Kontak',
      
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
      allRightsReserved: '© 2025 LesonPaw. Tout dwa rezève.',
      privacyPolicy: 'Politik Konfidansyalite',
      termsOfService: 'Kondisyon Sèvis',
      cookies: 'Cookies',
      
      // Home Page
      transformingEducation: 'Transfòme Edikasyon',
      inHaiti: 'an Ayiti',
      buildingBridges: 'Debloke potansyèl ou ak pwofesè ekspè ki enspire. Jwenn ak plizyè milye elèv ki gen siksè sou pi bon platfòm aprantisaj Ayiti a. Chemen ou pou ekselans la kòmanse isit la!',
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
      noStories: 'Pa gen istwa siksè pou afiche pou kounye a.',
      
      // Support Section
      support: 'Sipò',
      supportDesc: 'Bezwen èd? Ekip sipò nou an la pou ou',
      contactSupport: 'Kontakte Sipò',
      supportEmail: 'Sipò pa Imèl',
      supportPhone: 'Sipò pa Telefòn',
      supportChat: 'Chat an Dirèk',
      supportHours: 'Orè Sipò',
      supportAvailability: 'Sipò Disponib 24/7',
      supportResponse: 'Tan repons tipik: 2 èdtan',
      supportTicket: 'Kreye Tikè Sipò',
      supportFAQ: 'FAQ',
      supportHelp: 'Need Support?',
      supportTeam: 'We are here to Help',
      
      // Message Component
      pleaseEnterMessage: 'Tanpri antre yon mesaj',
      sent: 'Voye',
      messageSent: 'Mesaj voye',
      error: 'Erè',
      failedToSendMessage: 'Echèk pou voye mesaj la',
      quickResponse: 'Repons Rapid',
      writeMessage: 'Ekri mesaj ou a isit la...',
      sendMessage: 'Voye Mesaj',
      signInToMessage: 'Konekte pou voye yon mesaj',
      pleaseLoginMessage: 'Tanpri konekte nan kont ou pou voye nou yon mesaj.',
      
      // What is LesonPaw Section
      whatIsLesonPaw: 'Kisa',
      connectingStudents: 'Konekte elèv yo ak pwofesè pwofesyonèl atravè Ayiti depi 2024',
      qualityEducation: 'Edikasyon Kalite',
      qualityEducationDesc: 'Nou bay aksè a edikasyon kalite siperyè atravè rezo pwofesè pwofesyonèl verifye nou yo.',
      connecting: 'Bati Koneksyon',
      connectingDesc: 'Kreye koneksyon ki gen sans ant elèv ak pwofesè yo pou ankouraje yon anviwònman aprantisaj kolaboratif.',
      innovation: 'Aprantisaj Inovatif',
      innovationDesc: 'Itilize teknoloji pou rann edikasyon pi aksesib ak pi angajan pou tout moun.',
      lesonPawMission: 'Misyon nou se transfòme edikasyon an Ayiti lè nou rann aprantisaj kalite aksesib pou tout elèv atravè platfòm inovatif nou an.',

      // Contact Page
      getInTouch: 'Kontakte',
      contactSubtitle: 'Nou la pou ede w! Voye nou yon mesaj epi nou ap reponn nan 24 èdtan.',
      fullName: 'Non Konplè',
      nameRequired: 'Non an obligatwa',
      emailRequired: 'Imèl la obligatwa',
      invalidEmail: 'Adrès imèl la pa valid',
      phone: 'Nimewo Telefòn',
      optional: 'Opsyonèl',
      subject: 'Sijè',
      subjectRequired: 'Sijè a obligatwa',
      message: 'Mesaj',
      messageRequired: 'Mesaj la obligatwa',
      messageMinLength: 'Mesaj la dwe gen omwen 20 karaktè',
      attachments: 'Dokiman',
      fileUploadInfo: 'Gwosè maksimòm: 5MB. Fòma ki aksepte: PDF, DOC, DOCX, JPG, PNG',
      verifyCaptcha: 'Verifye Captcha',
      enterCaptcha: 'Antre tèks captcha a',
      captchaValidated: 'Captcha Verifye!',
      captchaRequired: 'Captcha Obligatwa',
      pleaseVerifyCaptcha: 'Tanpri verifye captcha a anvan ou soumèt',
      sending: 'Ap voye...',
      responseTime: 'Nou ap reponn ou nan 24 èdtan.',
      submissionFailed: 'Echèk nan Voye',
      tryAlternativeContact: 'Tanpri eseye pita oswa itilize lòt metòd pou kontakte nou.',
      businessHours: 'Orè Biznis',
      mondayFriday: 'Lendi - Vandredi',
      saturday: 'Samdi',
      sunday: 'Dimanch',
      closed: 'Fèmen',
      timeZone: 'Tout lè yo se nan Lè Lès (ET)',
      contactInfo: 'Enfòmasyon Kontak',
      address: 'Adrès',
      connectWithUs: 'Konekte ak Nou',
      ourLocation: 'Lokalizasyon Nou',
      getDirections: 'Jwenn Direksyon',

      // Dashboard Menu
      manageProfile: 'Jere Pwofil',
      myBookings: 'Rezèvasyon Mwen',
      joinAsTeacher: 'Vin yon Pwofesè',
      postJob: 'Poste Travay',
      availableJobs: 'Travay Disponib',
      manageServices: 'Jere Sèvis',
      manageUsers: 'Jere Itilizatè',
      allTutors: 'Tout Pwofesè',
      showMessages: 'Montre Mesaj',
      addTutor: 'Ajoute Pwofesè',
      applications: 'Aplikasyon',
      payments: 'Peman',
      analytics: 'Analiz',
      students: 'Elèv',
      allJobs: 'Tout Travay',
      allServices: 'Tout Sèvis',
      story: 'Istwa',
      manageStory: 'Jere Istwa',
      addBlog: 'Ajoute Blog',
      editBlog: 'Modifye Blog',
      menu: 'Meni'
    }
  }
};

// Language Provider Component
const LanguageProvider = ({ children }) => {
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

// Custom hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageProvider; 