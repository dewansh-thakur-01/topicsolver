export type Language = 'en' | 'ta' | 'te' | 'ml' | 'hi';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  script: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'മലയാളം', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'देवनागरी', flag: '🇮🇳' }
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.practice': 'Practice',
    'nav.mentor': 'CodeMentor',
    'nav.myPath': 'My Path',
    'nav.roadmap': 'Roadmap',
    'nav.dashboard': 'Dashboard',
    'nav.about': 'About',
    'nav.search': 'Search',
    'nav.searchKbd': '⌘K',
    'nav.lowData': 'Low Data',
    'nav.lowDataOn': 'Low Data ON',
    'nav.signOut': 'Sign Out',
    'nav.profile': 'Profile',
    'nav.selectLang': 'Language',

    // Hero Section (Home Page)
    'hero.badge': 'The Adaptive Topic Mastery Engine',
    'hero.title': 'TOPIC SOLVER',
    'hero.tagline': 'Your Personalized 3D Path to Mastering Any Topic.',
    'hero.description': 'TOPIC SOLVER maps your conceptual strengths, identifies knowledge blindspots, and dynamically synthesizes an adaptive curriculum tailored specifically to your speed.',
    'hero.quote': '"Learn at your level. Practice with real test cases. Excel with every topic."',
    'hero.btnDiagnostic': 'Start Diagnostic Assessment',
    'hero.btnPractice': 'Practice Workbench',
    'hero.loopTitle': '⚡ The 4-Stage Continuous Adaptive Loop',
    'hero.loop1Title': 'Diagnostic',
    'hero.loop1Desc': 'Gauges what you know in minutes',
    'hero.loop2Title': 'AI Analysis',
    'hero.loop2Desc': 'Finds gaps & sets initial difficulty',
    'hero.loop3Title': 'Personalized Path',
    'hero.loop3Desc': 'Reinforces gaps & unlocks topics',
    'hero.loop4Title': 'Topic Mastery',
    'hero.loop4Desc': 'Test cases & real code execution',

    // Home Features
    'features.badge': 'Platform Capabilities',
    'features.title': 'Why Choose TOPIC SOLVER?',
    'features.subtitle': 'Built to solve remote learning challenges with intelligent personalization and low-bandwidth optimization.',
    'features.feat1Title': '🎯 Personalized Diagnostic',
    'features.feat1Sub': 'Identify learning gaps in under 3 minutes.',
    'features.feat1Desc': 'Adaptive diagnostic algorithms evaluate your foundational knowledge and calibrate the curriculum automatically.',
    'features.feat2Title': '🧠 3D Adaptive Calibration',
    'features.feat2Sub': 'Questions dynamically adjust in real-time.',
    'features.feat2Desc': 'Our dynamic engine adjusts problem complexity (Easy/Medium/Hard) based on real-time performance and accuracy metrics.',
    'features.feat3Title': '💡 AI Conceptual Breakdown',
    'features.feat3Sub': 'Tailored explanations with deep root-cause tips.',
    'features.feat3Desc': 'Never get stuck with vague generic error prompts. Receive step-by-step algorithmic breakdowns explaining why logic failed.',
    'features.feat4Title': '📶 Rural Low-Bandwidth Mode',
    'features.feat4Sub': 'Zero friction even on 2G or offline networks.',
    'features.feat4Desc': 'Text-first lessons, ultra-compact code modules, and sub-50KB assets ensure 100% smooth learning in remote regions.',

    // Home Subject Selector
    'home.tracksBadge': 'Interactive Subject Curriculums',
    'home.tracksTitle': 'Select a Track to Begin Diagnostic Assessment',
    'home.tracksSubtitle': 'Take an adaptive diagnostic test. TOPIC SOLVER will calibrate your custom sequence immediately.',
    'home.takeAssessment': 'Take 10Q Knowledge Check',
    'home.viewSyllabus': 'View Full Syllabus',

    // CTA
    'cta.title': 'Ready to Master Your Next Programming Topic?',
    'cta.subtitle': 'Join students leveling up with adaptive AI learning, structured curricula, and real-time execution today.',
    'cta.btn': 'Get Started Free',

    // Courses Page
    'courses.title': 'Explore Structured Learning Paths & Curriculums',
    'courses.subtitle': 'Master Java, Python, SQL, DSA, and C Programming with structured module tracks, video tutorials, and adaptive quizzes.',
    'courses.startCourse': 'Start Level 1',
    'courses.takeAssessment': 'Take Diagnostic Check',
    'courses.modules': 'Modules',
    'courses.levels': 'Levels',
    'courses.done': 'Done',

    // Course Detail & Syllabus
    'courseDetail.syllabus': 'Course Syllabus & Structured Levels',
    'courseDetail.levelLock': '🔒 Pass previous quiz with ≥ 80% to unlock',
    'courseDetail.moduleLocked': '🔒 Module Locked',
    'courseDetail.moduleMastered': 'Module Mastered ✓',
    'courseDetail.startLevel': 'Start Level (5Q Quiz)',
    'courseDetail.reviewLevel': 'Review & Retake (5Q)',
    'courseDetail.locked': 'Locked',

    // Adaptive Quizzes & Assessments
    'quiz.headerTitle': 'Comprehension Quiz (5 Questions)',
    'quiz.passingCriteria': 'Passing Criteria: ≥ 80% (4/5) to Unlock Next Level',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.score': 'Score',
    'quiz.passingBadge': '80% Passing Threshold',
    'quiz.submitAnswer': 'Submit Answer',
    'quiz.selectOption': 'Please choose an option to continue',
    'quiz.nextQuestion': 'Next Question',
    'quiz.viewResults': 'View Quiz Results',
    'quiz.congratsPassed': '🎉 Congratulations! You Passed with ≥ 80%',
    'quiz.unlockedNext': 'Next level has been unlocked in your syllabus!',
    'quiz.needsPractice': '⚠️ Passing Score (≥80%) Not Met',
    'quiz.retakePrompt': 'Review the conceptual clues below and retake with randomized questions.',
    'quiz.retakeBtn': 'Retake 5-Question Quiz',
    'quiz.nextLevelBtn': 'Continue to Next Level',
    'quiz.clueTitle': '💡 Conceptual Clue (Why this choice is incorrect):',
    'quiz.correctChoice': '✓ Correct! Concept verified.',

    // Diagnostic Assessment Page (10 Questions)
    'diag.title': '10-Question Knowledge Check Assessment',
    'diag.subtitle': 'Evaluating your module-level understanding to place you in the optimal curriculum module.',
    'diag.resultTitle': 'Assessment Complete & Module Placement Calculated',
    'diag.jumpModuleBtn': 'Start Placed Module',
    'diag.viewSyllabusBtn': 'View Unlocked Syllabus',
    'diag.retakeBtn': 'Retake 10 Questions',

    // Practice Workbench
    'practice.title': 'Practice Workbench & Algorithmic Arena',
    'practice.subtitle': 'Solve coding challenges with live test cases, hidden edge case validations, and instant AI guidance.',
    'practice.allProblems': 'All Problems',
    'practice.solved': 'Solved',
    'practice.runCode': 'Run Code',
    'practice.submitCode': 'Submit Solution',
    'practice.testCases': 'Test Cases',
    'practice.hiddenCases': 'Quality Checks',
    'practice.acceptance': 'Acceptance',

    // CodeMentor AI
    'mentor.title': 'CodeMentor AI Error Assistant',
    'mentor.subtitle': 'Your AI Coding Error Mentor - Guiding you with conceptual clues and hints without spoiling code answers.',
    'mentor.inputPlaceholder': 'Paste your buggy code or error message here...',
    'mentor.analyzeBtn': 'Analyze Code with CodeMentor',
    'mentor.hintLabel': 'Mentor Hint',

    // Profile & Overview
    'profile.title': 'Learner Profile & Performance Analytics',
    'profile.subtitle': 'Detailed analysis of problem solving, topic masteries, strengths, and areas for improvement.',
    'profile.level': 'Level',
    'profile.streak': 'Streak',
    'profile.activeFocus': 'Active Focus',
    'profile.difficulty': 'Calibrated Difficulty',
    'profile.completedLessons': 'Completed Lessons',
    'profile.completedLessonsDesc': 'Across core programming subjects',
    'profile.problemsSolved': 'Practice Solved',
    'profile.problemsSolvedDesc': 'Test cases validated and passed',
    'profile.learningVelocity': 'Learning Velocity',
    'profile.learningVelocityDesc': 'Adaptive progress pace',
    'profile.editTitle': 'Edit Learner Profile',
    'profile.displayName': 'Display Name',
    'profile.email': 'Email Address',
    'profile.saveBtn': 'Save Profile Changes',
    'profile.savedSuccess': 'Profile details updated successfully!',

    // Strengths & Weaknesses Section
    'analytics.strengthsTitle': 'Identified Strengths & Problem Mastery',
    'analytics.strengthsSubtitle': 'Concepts and problem types where you demonstrated high accuracy (≥80%) and strong implementation skills.',
    'analytics.weaknessesTitle': 'Areas for Targeted Improvement',
    'analytics.weaknessesSubtitle': 'Topics and patterns where errors were encountered. Follow our targeted suggestions to achieve complete mastery.',
    'analytics.accuracy': 'Accuracy',
    'analytics.masteryLevel': 'Mastery',
    'analytics.recommendation': 'Actionable Advice',
    'analytics.practiceNow': 'Practice Problem',
    'analytics.reviewLesson': 'Review Lesson',
    'analytics.subjectBreakdown': 'Competency Breakdown by Subject',
    'analytics.problemSolvingHistory': 'Problem-Solving & Quiz Track Record',
    'analytics.masteredBadge': 'Mastered Concepts',
    'analytics.growthBadge': 'Growth Focus Areas',

    // Language Selector
    'lang.settingsTitle': 'Language & Regional Preferences',
    'lang.settingsSubtitle': 'Select your preferred native language for navigation, conceptual guides, and platform feedback.',
    'lang.currentLang': 'Current Language',
    'lang.changeSuccess': 'Language changed to',

    // Common Course & Subject Names
    'subject.java': 'Java Mastery',
    'subject.python': 'Python Programming',
    'subject.sql': 'SQL & Database Design',
    'subject.dsa': 'Data Structures & Algorithms',
    'subject.c': 'C Programming',

    // OKR
    'okr.title': 'Topic Mastery & OKR Progress Metrics',
    'okr.subtitle': 'OKR Status: Gray (0.0), Red (0.01-0.3), Amber (0.4-0.6), Green (0.7-0.99), Blue (1.0).'
  },

  ta: {
    // Nav
    'nav.home': 'முகப்பு',
    'nav.courses': 'பாடப்பிரிவுகள்',
    'nav.practice': 'பயிற்சி',
    'nav.mentor': 'கோட்மென்டார்',
    'nav.myPath': 'எனது கற்றல் பாதை',
    'nav.roadmap': 'கற்றல் வரைபடம்',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.about': 'எங்களை பற்றி',
    'nav.search': 'தேடுக',
    'nav.searchKbd': '⌘K',
    'nav.lowData': 'குறைந்த தரவு',
    'nav.lowDataOn': 'குறைந்த தரவு இயக்கத்தில்',
    'nav.signOut': 'வெளியேறு',
    'nav.profile': 'சுயவிவரம்',
    'nav.selectLang': 'மொழி',

    // Hero Section (Home Page)
    'hero.badge': 'தகவமைப்பு தலைப்பு தேர்ச்சி இயந்திரம்',
    'hero.title': 'டாபிக் சால்வர் (TOPIC SOLVER)',
    'hero.tagline': 'எந்தவொரு தலைப்பிலும் தேர்ச்சி பெறுவதற்கான உங்கள் தனிப்பயனாக்கப்பட்ட பாதை.',
    'hero.description': 'டாபிக் சால்வர் உங்கள் கருத்து வலிமைகளை வரைபடமாக்குகிறது, கற்றல் இடைவெளிகளை அடையாளம் கண்டு, உங்கள் வேகத்திற்கு ஏற்ப வடிவமைக்கப்பட்ட பாடத்திட்டத்தை உருவாக்குகிறது.',
    'hero.quote': '"உங்கள் நிலையில் கற்றுக்கொள்ளுங்கள். உண்மையான சோதனைகளுடன் பயிற்சி செய்யுங்கள். ஒவ்வொரு தலைப்பிலும் சிறந்து விளங்குங்கள்."',
    'hero.btnDiagnostic': 'அறிவு பரிசோதனை மதிப்பீட்டைத் தொடங்குங்கள்',
    'hero.btnPractice': 'பயிற்சி பணிமனை',
    'hero.loopTitle': '⚡ 4-நிலை தொடர் தகவமைப்பு கற்றல் சுழற்சி',
    'hero.loop1Title': 'அறிவு பரிசோதனை',
    'hero.loop1Desc': 'நீங்கள் அறிந்ததை நிமிடங்களில் மதிப்பிடுகிறது',
    'hero.loop2Title': 'AI பகுப்பாய்வு',
    'hero.loop2Desc': 'இடைவெளிகளைக் கண்டறிந்து கடினத்தன்மையை அமைக்கிறது',
    'hero.loop3Title': 'தனிப்பயனாக்கப்பட்ட பாதை',
    'hero.loop3Desc': 'இடைவெளிகளை நிரப்பி புதிய தலைப்புகளைத் திறக்கிறது',
    'hero.loop4Title': 'தலைப்பு தேர்ச்சி',
    'hero.loop4Desc': 'சோதனை வழக்குகள் & நேரடி குறியீட்டு இயக்கம்',

    // Home Features
    'features.badge': 'தளத்தின் சிறப்பம்சங்கள்',
    'features.title': 'டாபிக் சால்வரை ஏன் தேர்ந்தெடுக்க வேண்டும்?',
    'features.subtitle': 'புத்திசாலித்தனமான தனிப்பயனாக்கம் மற்றும் குறைந்த அலைவரிசை ஆதரவுடன் தொலைதூர கற்றல் சவால்களை தீர்க்க உருவாக்கப்பட்டது.',
    'features.feat1Title': '🎯 தனிப்பயனாக்கப்பட்ட பரிசோதனை',
    'features.feat1Sub': '3 நிமிடங்களில் கற்றல் இடைவெளிகளைக் கண்டறியவும்.',
    'features.feat1Desc': 'தகவமைப்பு பரிசோதனை அல்காரிதம்கள் உங்கள் அடிப்படை அறிவை மதிப்பிட்டு தானாகவே பாடத்திட்டத்தை அளவீடு செய்கின்றன.',
    'features.feat2Title': '🧠 தகவமைப்பு அளவீடு',
    'features.feat2Sub': 'வினாக்கள் நிகழ்நேரத்தில் தானாக மாறுகின்றன.',
    'features.feat2Desc': 'உங்கள் செயல்திறன் மற்றும் துல்லிய அளவீடுகளின் அடிப்படையில் சிக்கலின் தீவிரத்தை (எளிது/நடுத்தரம்/கடினம்) எங்களின் இன்ஜின் சரிசெய்கிறது.',
    'features.feat3Title': '💡 AI கருத்து விளக்கம்',
    'features.feat3Sub': 'ஆழமான மூலக் காரணக் குறிப்புகளுடன் கூடிய விளக்கங்கள்.',
    'features.feat3Desc': 'பொதுவான பிழைச் செய்திகளுடன் முடங்கிவிடாதீர்கள். உங்கள் தர்க்கம் ஏன் தவறானது என்பதை விளக்கும் படிப்படியான அல்காரிதம் விளக்கங்களைப் பெறுங்கள்.',
    'features.feat4Title': '📶 குறைந்த அலைவரிசை முறை',
    'features.feat4Sub': '2G அல்லது ஆஃப்லைன் நெட்வொர்க்கிலும் தடையில்லா கற்றல்.',
    'features.feat4Desc': 'உரை அடிப்படையிலான பாடங்கள் மற்றும் 50KB-க்கும் குறைவான தரவு தொலைதூர பகுதிகளில் 100% மென்மையான கற்றலை உறுதி செய்கிறது.',

    // Home Subject Selector
    'home.tracksBadge': 'ஊடாடும் பாடத்திட்டங்கள்',
    'home.tracksTitle': 'அறிவு பரிசோதனையைத் தொடங்க ஒரு பாடப்பிரிவைத் தேர்ந்தெடுக்கவும்',
    'home.tracksSubtitle': 'தகவமைப்பு அறிவு பரிசோதனை சோதனையை மேற்கொள்ளுங்கள். டாபிக் சால்வர் உங்கள் தனிப்பயன் வரிசையை உடனடியாக அமைக்கும்.',
    'home.takeAssessment': '10-வினா அறிவு பரிசோதனை செய்க',
    'home.viewSyllabus': 'முழு பாடத்திட்டத்தைக் காண்க',

    // CTA
    'cta.title': 'உங்கள் அடுத்த நிரலாக்கத் தலைப்பில் தேர்ச்சி பெற தயாரா?',
    'cta.subtitle': 'தகவமைப்பு AI கற்றல், கட்டமைக்கப்பட்ட பாடத்திட்டம் மற்றும் நேரடி பயிற்சி மூலம் முன்னேறும் மாணவர்களுடன் இப்போதே இணையுங்கள்.',
    'cta.btn': 'இலவசமாகத் தொடங்குங்கள்',

    // Courses Page
    'courses.title': 'கட்டமைக்கப்பட்ட கற்றல் பாதைகள் மற்றும் பாடத்திட்டங்களை ஆராயுங்கள்',
    'courses.subtitle': 'ஜாவா, பைதான், SQL, DSA மற்றும் C நிரலாக்கத்தில் கட்டமைக்கப்பட்ட தொகுதிகள், வீடியோக்கள் மற்றும் வினாடி வினாக்களுடன் தேர்ச்சி பெறுங்கள்.',
    'courses.startCourse': 'நிலை 1-ஐத் தொடங்குங்கள்',
    'courses.takeAssessment': 'அறிவு பரிசோதனை செய்க',
    'courses.modules': 'தொகுதிகள்',
    'courses.levels': 'நிலைகள்',
    'courses.done': 'முடிந்தது',

    // Course Detail & Syllabus
    'courseDetail.syllabus': 'பாடத்திட்டம் & கட்டமைக்கப்பட்ட நிலைகள்',
    'courseDetail.levelLock': '🔒 அடுத்த நிலையைத் திறக்க முந்தைய வினாடி வினாவில் ≥ 80% மதிப்பெண் பெறவும்',
    'courseDetail.moduleLocked': '🔒 தொகுதி பூட்டப்பட்டுள்ளது',
    'courseDetail.moduleMastered': 'தொகுதி தேர்ச்சி பெற்றது ✓',
    'courseDetail.startLevel': 'நிலையைத் தொடங்குங்கள் (5 வினாக்கள்)',
    'courseDetail.reviewLevel': 'மறுபரிசீலனை & மறுதேர்வு (5 வினாக்கள்)',
    'courseDetail.locked': 'பூட்டப்பட்டுள்ளது',

    // Adaptive Quizzes & Assessments
    'quiz.headerTitle': 'புரிதல் வினாடி வினா (5 வினாக்கள்)',
    'quiz.passingCriteria': 'தேர்ச்சி அளவுகோல்: அடுத்த நிலையைத் திறக்க ≥ 80% (4/5) தேவை',
    'quiz.question': 'வினா',
    'quiz.of': '/',
    'quiz.score': 'மதிப்பெண்',
    'quiz.passingBadge': '80% தேர்ச்சி வரம்பு',
    'quiz.submitAnswer': 'பதிலைச் சமர்ப்பிக்கவும்',
    'quiz.selectOption': 'தொடர ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
    'quiz.nextQuestion': 'அடுத்த வினா',
    'quiz.viewResults': 'முடிவுகளைக் காண்க',
    'quiz.congratsPassed': '🎉 வாழ்த்துகள்! நீங்கள் ≥ 80% மதிப்பெண்ணுடன் தேர்ச்சி பெற்றுள்ளீர்கள்',
    'quiz.unlockedNext': 'உங்கள் பாடத்திட்டத்தில் அடுத்த நிலை திறக்கப்பட்டுள்ளது!',
    'quiz.needsPractice': '⚠️ தேவையான தேர்ச்சி மதிப்பெண் (≥80%) பெறப்படவில்லை',
    'quiz.retakePrompt': 'கீழே உள்ள கருத்து குறிப்புகளை மதிப்பாய்வு செய்து புதிய வினாக்களுடன் மீண்டும் முயற்சிக்கவும்.',
    'quiz.retakeBtn': '5 வினா வினாடி வினாவை மீண்டும் எடுக்கவும்',
    'quiz.nextLevelBtn': 'அடுத்த நிலைக்குச் செல்லவும்',
    'quiz.clueTitle': '💡 கருத்து குறிப்பு (இந்த விடை ஏன் தவறானது):',
    'quiz.correctChoice': '✓ சரி! கருத்து உறுதிப்படுத்தப்பட்டது.',

    // Diagnostic Assessment Page (10 Questions)
    'diag.title': '10-வினா அறிவு பரிசோதனை மதிப்பீடு',
    'diag.subtitle': 'உங்களை உகந்த தொகுதிக்கு அனுப்ப தொகுதி வாரியான புரிதலை மதிப்பிடுகிறது.',
    'diag.resultTitle': 'மதிப்பீடு முடிந்தது & தொகுதி நிலை கணக்கிடப்பட்டது',
    'diag.jumpModuleBtn': 'ஒதுக்கப்பட்ட தொகுதியைத் தொடங்குங்கள்',
    'diag.viewSyllabusBtn': 'திறக்கப்பட்ட பாடத்திட்டத்தைக் காண்க',
    'diag.retakeBtn': '10 வினாக்களை மீண்டும் எடுக்கவும்',

    // Practice Workbench
    'practice.title': 'பயிற்சி பணிமனை & அல்காரிதம் அரங்கம்',
    'practice.subtitle': 'உண்மையான சோதனை வழக்குகள், மறைக்கப்பட்ட சரிபார்ப்புகள் மற்றும் உடனடி AI வழிகாட்டுதலுடன் குறியீட்டு சவால்களைத் தீர்க்கவும்.',
    'practice.allProblems': 'அனைத்து சிக்கல்களும்',
    'practice.solved': 'தீர்க்கப்பட்டது',
    'practice.runCode': 'குறியீட்டை இயக்குக',
    'practice.submitCode': 'தீர்வைச் சமர்ப்பிக்கவும்',
    'practice.testCases': 'சோதனை வழக்குகள்',
    'practice.hiddenCases': 'தர சோதனைகள்',
    'practice.acceptance': 'ஏற்பு விகிதம்',

    // CodeMentor AI
    'mentor.title': 'கோட்மென்டார் AI பிழை வழிகாட்டி',
    'mentor.subtitle': 'உங்கள் AI கோடிங் வழிகாட்டி - நேரடி பதிலை தராமல் கருத்து குறிப்புகளுடன் உங்களை வழிநடத்துகிறது.',
    'mentor.inputPlaceholder': 'உங்கள் பிழைக் குறியீடு அல்லது செய்தியை இங்கே ஒட்டவும்...',
    'mentor.analyzeBtn': 'கோட்மென்டார் மூலம் பகுப்பாய்வு செய்க',
    'mentor.hintLabel': 'மென்டார் குறிப்பு',

    // Profile & Overview
    'profile.title': 'கற்றல் சுயவிவரம் மற்றும் செயல்திறன் பகுப்பாய்வு',
    'profile.subtitle': 'சிக்கல் தீர்க்கும் திறன், தலைப்பு தேர்ச்சி, வலிமைகள் மற்றும் முன்னேற்றத்திற்கான பகுதிகளின் விரிவான பகுப்பாய்வு.',
    'profile.level': 'நிலை',
    'profile.streak': 'தொடர்ச்சி',
    'profile.activeFocus': 'செயலில் உள்ள கவனம்',
    'profile.difficulty': 'கடினத்தன்மை நிலை',
    'profile.completedLessons': 'முடித்த பாடங்கள்',
    'profile.completedLessonsDesc': 'முதன்மை நிரலாக்க பாடப்பிரிவுகளில்',
    'profile.problemsSolved': 'தீர்க்கப்பட்ட பயிற்சிகள்',
    'profile.problemsSolvedDesc': 'சரிபார்க்கப்பட்டு தேர்ச்சி பெற்ற சோதனைகள்',
    'profile.learningVelocity': 'கற்றல் வேகம்',
    'profile.learningVelocityDesc': 'தகவமைப்பு முன்னேற்ற வேகம்',
    'profile.editTitle': 'சுயவிவரத்தைத் திருத்துக',
    'profile.displayName': 'காட்சிப் பெயர்',
    'profile.email': 'மின்னஞ்சல் முகவரி',
    'profile.saveBtn': 'சுயவிவர மாற்றங்களைச் சேமிக்கவும்',
    'profile.savedSuccess': 'சுயவிவர விவரங்கள் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டன!',

    // Strengths & Weaknesses Section
    'analytics.strengthsTitle': 'கண்டறியப்பட்ட திறன்கள் மற்றும் சிக்கல் தீர்க்கும் தேர்ச்சி',
    'analytics.strengthsSubtitle': 'நீங்கள் அதிக துல்லியம் (≥80%) மற்றும் சிறந்த செயலாக்கத் திறனை வெளிப்படுத்திய தலைப்புகள்.',
    'analytics.weaknessesTitle': 'முன்னேற்றத்திற்கான இலக்கு பகுதிகள் மற்றும் பலவீனங்கள்',
    'analytics.weaknessesSubtitle': 'பிழைகள் ஏற்பட்ட தலைப்புகள் மற்றும் சிக்கல்கள். முழுமையான தேர்ச்சி பெற பரிந்துரைகளைப் பின்பற்றவும்.',
    'analytics.accuracy': 'துல்லியம்',
    'analytics.masteryLevel': 'தேர்ச்சி',
    'analytics.recommendation': 'செயல்படக்கூடிய ஆலோசனை',
    'analytics.practiceNow': 'பயிற்சி சிக்கல்',
    'analytics.reviewLesson': 'பாடத்தை மறுபரிசீலனை செய்க',
    'analytics.subjectBreakdown': 'பாடம் வாரியான திறன் பகுப்பாய்வு',
    'analytics.problemSolvingHistory': 'சிக்கல் தீர்க்கும் மற்றும் வினாடி வினா வரலாறு',
    'analytics.masteredBadge': 'தேர்ச்சி பெற்ற கருத்துகள்',
    'analytics.growthBadge': 'வளர்ச்சி கவனம் பகுதிகள்',

    // Language Selector
    'lang.settingsTitle': 'மொழி மற்றும் பிராந்திய விருப்பங்கள்',
    'lang.settingsSubtitle': 'வழிசெலுத்தல், கருத்து வழிகாட்டிகள் மற்றும் கருத்துக்களுக்கு உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.',
    'lang.currentLang': 'தற்போதைய மொழி',
    'lang.changeSuccess': 'மொழி மாற்றப்பட்டது:',

    // Common Course & Subject Names
    'subject.java': 'ஜாவா தேர்ச்சி (Java Mastery)',
    'subject.python': 'பைதான் நிரலாக்கம் (Python)',
    'subject.sql': 'SQL மற்றும் தரவுத்தளம் (SQL Database)',
    'subject.dsa': 'தரவு கட்டமைப்புகள் மற்றும் அல்காரிதம்கள் (DSA)',
    'subject.c': 'C நிரலாக்கம் (C Programming)',

    // OKR
    'okr.title': 'தலைப்பு தேர்ச்சி மற்றும் OKR முன்னேற்ற அளவீடுகள்',
    'okr.subtitle': 'OKR நிலை: சாம்பல் (0.0), சிவப்பு (0.01-0.3), மஞ்சள் (0.4-0.6), பச்சை (0.7-0.99), நீலம் (1.0).'
  },

  te: {
    // Nav
    'nav.home': 'హోమ్',
    'nav.courses': 'కోర్సులు',
    'nav.practice': 'ప్రాక్టీస్',
    'nav.mentor': 'కోడ్‌మెంటర్',
    'nav.myPath': 'నా అభ్యాస మార్గం',
    'nav.roadmap': 'రోడ్‌మ్యాప్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.about': 'మా గురించి',
    'nav.search': 'వెతకండి',
    'nav.searchKbd': '⌘K',
    'nav.lowData': 'తక్కువ డేటా',
    'nav.lowDataOn': 'తక్కువ డేటా ఆన్‌లో ఉంది',
    'nav.signOut': 'లాగ్ అవుట్',
    'nav.profile': 'ప్రొఫైల్',
    'nav.selectLang': 'భాష',

    // Hero Section (Home Page)
    'hero.badge': 'అడాప్టివ్ టాపిక్ మాస్టరీ ఇంజిన్',
    'hero.title': 'టాపిక్ సాల్వర్ (TOPIC SOLVER)',
    'hero.tagline': 'ఏదైనా అంశంలో ప్రావీణ్యం సాధించడానికి మీ వ్యక్తిగతీకరించిన మార్గం.',
    'hero.description': 'టాపిక్ సాల్వర్ మీ కాన్సెప్ట్ బలాలను గుర్తిస్తుంది, అభ్యాస అంతరాలను విశ్లేషిస్తుంది మరియు మీ వేగానికి తగినట్లుగా కస్టమ్ సిలబస్‌ను అందిస్తుంది.',
    'hero.quote': '"మీ స్థాయిలో నేర్చుకోండి. నిజమైన టెస్ట్ కేసులతో ప్రాక్టీస్ చేయండి. ప్రతి అంశంలో రాణించండి."',
    'hero.btnDiagnostic': 'డయాగ్నస్టిక్ అసెస్‌మెంట్‌ను ప్రారంభించండి',
    'hero.btnPractice': 'ప్రాక్టీస్ వర్క్‌బెంచ్',
    'hero.loopTitle': '⚡ 4-దశల నిరంతర అడాప్టివ్ అభ్యాస లూప్',
    'hero.loop1Title': 'డయాగ్నస్టిక్',
    'hero.loop1Desc': 'మీ పరిజ్ఞానాన్ని నిమిషాల్లో అంచనా వేస్తుంది',
    'hero.loop2Title': 'AI విశ్లేషణ',
    'hero.loop2Desc': 'అంతరాలను గుర్తించి కఠినతను సెట్ చేస్తుంది',
    'hero.loop3Title': 'వ్యక్తిగత మార్గం',
    'hero.loop3Desc': 'లోపాలను సరిదిద్ది కొత్త అంశాలను అన్‌లాక్ చేస్తుంది',
    'hero.loop4Title': 'టాపిక్ మాస్టరీ',
    'hero.loop4Desc': 'టెస్ట్ కేసులు & లైవ్ కోడ్ ఎగ్జిక్యూషన్',

    // Home Features
    'features.badge': 'ప్లాట్‌ఫారమ్ సామర్థ్యాలు',
    'features.title': 'టాపిక్ సాల్వర్‌ను ఎందుకు ఎంచుకోవాలి?',
    'features.subtitle': 'ఇంటెలిజెంట్ పర్సనలైజేషన్ మరియు తక్కువ బ్యాండ్‌విడ్త్ ఆప్టిమైజేషన్‌తో రిమోట్ లెర్నింగ్ సవాళ్లను పరిష్కరించడానికి రూపొందించబడింది.',
    'features.feat1Title': '🎯 వ్యక్తిగతీకరించిన డయాగ్నస్టిక్',
    'features.feat1Sub': '3 నిమిషాల్లోపు అభ్యాస అంతరాలను గుర్తించండి.',
    'features.feat1Desc': 'అడాప్టివ్ డయాగ్నస్టిక్ అల్గారిథమ్‌లు మీ ప్రాథమిక పరిజ్ఞానాన్ని అంచనా వేసి ఆటోమేటిక్‌గా పాఠ్యాంశాలను సెట్ చేస్తాయి.',
    'features.feat2Title': '🧠 అడాప్టివ్ క్యాలిబ్రేషన్',
    'features.feat2Sub': 'ప్రశ్నలు రియల్-టైమ్‌లో మారుతాయి.',
    'features.feat2Desc': 'మీ పనితీరు మరియు ఖచ్చితత్వ కొలమానాల ఆధారంగా సమస్యల కఠినతను (సులభం/మధ్యస్థం/కఠినం) మా ఇంజిన్ సర్దుబాటు చేస్తుంది.',
    'features.feat3Title': '💡 AI కాన్సెప్ట్ విశ్లేషణ',
    'features.feat3Sub': 'మూల కారణాల ఆధారంగా వివరణలు.',
    'features.feat3Desc': 'అస్పష్టమైన లోపం సందేశాలతో ఆగిపోకండి. మీ లాజిక్ ఎందుకు విఫలమైందో వివరించే దశలవారీ అల్గారిథమ్ వివరణలను పొందండి.',
    'features.feat4Title': '📶 తక్కువ బ్యాండ్‌విడ్త్ మోడ్',
    'features.feat4Sub': '2G లేదా ఆఫ్‌లైన్ నెట్‌వర్క్‌లలో కూడా అంతరాయం లేని అభ్యాసం.',
    'features.feat4Desc': 'టెక్స్ట్ ఆధారిత పాఠాలు మరియు 50KB కంటే తక్కువ డేటా మారుమూల ప్రాంతాల్లోనూ 100% సున్నితమైన అభ్యాసాన్ని అందిస్తాయి.',

    // Home Subject Selector
    'home.tracksBadge': 'ఇంటరాక్టివ్ పాఠ్యాంశాలు',
    'home.tracksTitle': 'డయాగ్నస్టిక్ టెస్ట్ ప్రారంభించడానికి సబ్జెక్ట్‌ను ఎంచుకోండి',
    'home.tracksSubtitle': 'అడాప్టివ్ డయాగ్నస్టిక్ పరీక్ష రాయండి. టాపిక్ సాల్వర్ మీ కస్టమ్ క్రమాన్ని వెంటనే సెట్ చేస్తుంది.',
    'home.takeAssessment': '10-ప్రశ్నల నాలెడ్జ్ చెక్ రాయండి',
    'home.viewSyllabus': 'పూర్తి సిలబస్‌ను చూడండి',

    // CTA
    'cta.title': 'మీ తదుపరి ప్రోగ్రామింగ్ అంశంలో ప్రావీణ్యం సాధించడానికి సిద్ధంగా ఉన్నారా?',
    'cta.subtitle': 'అడాప్టివ్ AI లెర్నింగ్, నిర్మాణాత్మక సిలబస్ మరియు రియల్-టైమ్ ఎగ్జిక్యూషన్‌తో నేర్చుకుంటున్న విద్యార్థులతో ఇప్పుడే చేరండి.',
    'cta.btn': 'ఉచితంగా ప్రారంభించండి',

    // Courses Page
    'courses.title': 'నిర్మాణాత్మక లెర్నింగ్ ట్రాక్‌లు మరియు సిలబస్‌ను అన్వేషించండి',
    'courses.subtitle': 'జావా, పైథాన్, SQL, DSA మరియు C ప్రోగ్రామింగ్‌లో స్ట్రక్చర్డ్ మాడ్యూల్స్, వీడియోలు మరియు క్విజ్‌లతో ప్రావీణ్యం సాధించండి.',
    'courses.startCourse': 'లెవల్ 1 ప్రారంభించండి',
    'courses.takeAssessment': 'డయాగ్నస్టిక్ చెక్ రాయండి',
    'courses.modules': 'మాడ్యూల్స్',
    'courses.levels': 'లెవెల్స్',
    'courses.done': 'పూర్తయింది',

    // Course Detail & Syllabus
    'courseDetail.syllabus': 'కోర్సు సిలబస్ & నిర్మాణాత్మక లెవెల్స్',
    'courseDetail.levelLock': '🔒 తదుపరి లెవెల్ అన్‌లాక్ చేయడానికి మునుపటి క్విజ్‌లో ≥ 80% స్కోర్ చేయండి',
    'courseDetail.moduleLocked': '🔒 మాడ్యూల్ లాక్ చేయబడింది',
    'courseDetail.moduleMastered': 'మాడ్యూల్ మాస్టరీ సాధించబడింది ✓',
    'courseDetail.startLevel': 'లెవెల్ ప్రారంభించండి (5 ప్రశ్నలు)',
    'courseDetail.reviewLevel': 'సమీక్ష & రీటేక్ (5 ప్రశ్నలు)',
    'courseDetail.locked': 'లాక్ చేయబడింది',

    // Adaptive Quizzes & Assessments
    'quiz.headerTitle': 'కాంప్రహెన్షన్ క్విజ్ (5 ప్రశ్నలు)',
    'quiz.passingCriteria': 'పాసింగ్ ప్రమాణం: తదుపరి లెవెల్ అన్‌లాక్ కావడానికి ≥ 80% (4/5) అవసరం',
    'quiz.question': 'ప్రశ్న',
    'quiz.of': '/',
    'quiz.score': 'స్కోర్',
    'quiz.passingBadge': '80% పాసింగ్ థ్రెషోల్డ్',
    'quiz.submitAnswer': 'సమాధానాన్ని సమర్పించండి',
    'quiz.selectOption': 'కొనసాగడానికి ఒక ఎంపికను ఎంచుకోండి',
    'quiz.nextQuestion': 'తదుపరి ప్రశ్న',
    'quiz.viewResults': 'ఫలితాలను చూడండి',
    'quiz.congratsPassed': '🎉 అభినందనలు! మీరు ≥ 80% స్కోర్‌తో ఉత్తీర్ణులయ్యారు',
    'quiz.unlockedNext': 'మీ సిలబస్‌లో తదుపరి లెవెల్ అన్‌లాక్ చేయబడింది!',
    'quiz.needsPractice': '⚠️ అవసరమైన పాసింగ్ స్కోర్ (≥80%) రాలేదు',
    'quiz.retakePrompt': 'క్రింది కాన్సెప్ట్ క్లూలను సమీక్షించి, కొత్త ప్రశ్నలతో మళ్లీ ప్రయత్నించండి.',
    'quiz.retakeBtn': '5 ప్రశ్నల క్విజ్ మళ్లీ రాయండి',
    'quiz.nextLevelBtn': 'తదుపరి లెవెల్‌కు కొనసాగండి',
    'quiz.clueTitle': '💡 కాన్సెప్ట్ క్లూ (ఈ సమాధానం ఎందుకు తప్పు):',
    'quiz.correctChoice': '✓ సరైనది! కాన్సెప్ట్ నిర్ధారించబడింది.',

    // Diagnostic Assessment Page (10 Questions)
    'diag.title': '10-ప్రశ్నల డయాగ్నస్టిక్ నాలెడ్జ్ చెక్ అసెస్‌మెంట్',
    'diag.subtitle': 'సరైన మాడ్యూల్‌ను కేటాయించడానికి మీ మాడ్యూల్ స్థాయి అవగాహనను అంచనా వేస్తుంది.',
    'diag.resultTitle': 'అసెస్‌మెంట్ పూర్తయింది & మాడ్యూల్ ప్లేస్‌మెంట్ కేటాయించబడింది',
    'diag.jumpModuleBtn': 'కేటాయించిన మాడ్యూల్‌ను ప్రారంభించండి',
    'diag.viewSyllabusBtn': 'అన్‌లాక్ చేయబడిన సిలబస్‌ను చూడండి',
    'diag.retakeBtn': '10 ప్రశ్నలను మళ్లీ రాయండి',

    // Practice Workbench
    'practice.title': 'ప్రాక్టీస్ వర్క్‌బెంచ్ & అల్గారిథమిక్ అరేనా',
    'practice.subtitle': 'లైవ్ టెస్ట్ కేసులు, దాచిన చెక్‌లు మరియు తక్షణ AI మార్గదర్శకత్వంతో కోడింగ్ సవాళ్లను పరిష్కరించండి.',
    'practice.allProblems': 'అన్ని సమస్యలు',
    'practice.solved': 'సాధించినవి',
    'practice.runCode': 'కోడ్ రన్ చేయండి',
    'practice.submitCode': 'సొల్యూషన్ సబ్మిట్ చేయండి',
    'practice.testCases': 'టెస్ట్ కేసులు',
    'practice.hiddenCases': 'క్వాలిటీ చెక్‌లు',
    'practice.acceptance': 'స్వీకార రేటు',

    // CodeMentor AI
    'mentor.title': 'కోడ్‌మెంటర్ AI ఎర్రర్ అసిస్టెంట్',
    'mentor.subtitle': 'మీ AI కోడింగ్ మెంటర్ - డైరెక్ట్ ఆన్సర్ ఇవ్వకుండా కాన్సెప్ట్ క్లూలతో మిమ్మల్ని గైడ్ చేస్తుంది.',
    'mentor.inputPlaceholder': 'మీ బగ్గీ కోడ్ లేదా ఎర్రర్ మెసేజ్‌ను ఇక్కడ పేస్ట్ చేయండి...',
    'mentor.analyzeBtn': 'కోడ్‌మెంటర్‌తో విశ్లేషించండి',
    'mentor.hintLabel': 'మెంటర్ క్లూ',

    // Profile & Overview
    'profile.title': 'అభ్యాసకుని ప్రొఫైల్ & పనితీరు విశ్లేషణ',
    'profile.subtitle': 'సమస్య పరిష్కార నైపుణ్యం, అంశం ప్రావీణ్యం, బలాలు మరియు మెరుగుపడాల్సిన అంశాల సమగ్ర విశ్లేషణ.',
    'profile.level': 'స్థాయి',
    'profile.streak': 'స్ట్రీక్',
    'profile.activeFocus': 'ప్రస్తుత దృష్టి',
    'profile.difficulty': 'కఠినత స్థాయి',
    'profile.completedLessons': 'పూర్తి చేసిన పాఠాలు',
    'profile.completedLessonsDesc': 'ప్రధాన ప్రోగ్రామింగ్ సబ్జెక్టులలో',
    'profile.problemsSolved': 'సాధించిన సమస్యలు',
    'profile.problemsSolvedDesc': 'ధృవీకరించబడిన టెస్ట్ కేసులు',
    'profile.learningVelocity': 'అభ్యాస వేగం',
    'profile.learningVelocityDesc': 'అడాప్టివ్ పురోగతి వేగం',
    'profile.editTitle': 'ప్రొఫైల్‌ను సవరించండి',
    'profile.displayName': 'ప్రదర్శన పేరు',
    'profile.email': 'ఈమెయిల్ చిరునామా',
    'profile.saveBtn': 'మార్పులను సేవ్ చేయండి',
    'profile.savedSuccess': 'ప్రొఫైల్ వివరాలు విజయవంతంగా నవీకరించబడ్డాయి!',

    // Strengths & Weaknesses Section
    'analytics.strengthsTitle': 'గుర్తించిన బలాలు & సమస్య పరిష్కార ప్రావీణ్యం',
    'analytics.strengthsSubtitle': 'మీరు అధిక ఖచ్చితత్వం (≥80%) మరియు బలమైన అమలు నైపుణ్యాలను ప్రదర్శించిన అంశాలు.',
    'analytics.weaknessesTitle': 'మెరుగుపడాల్సిన లక్ష్య అంశాలు & బలహీనతలు',
    'analytics.weaknessesSubtitle': 'ఎర్రర్లు ఎదురైన అంశాలు. పూర్తి ప్రావీణ్యం సాధించడానికి మా సిఫార్సులను అనుసరించండి.',
    'analytics.accuracy': 'ఖచ్చితత్వం',
    'analytics.masteryLevel': 'ప్రావీణ్యం',
    'analytics.recommendation': 'కార్యాచరణ సలహా',
    'analytics.practiceNow': 'సమస్యను ప్రాక్టీస్ చేయండి',
    'analytics.reviewLesson': 'పాఠాన్ని సమీక్షించండి',
    'analytics.subjectBreakdown': 'సబ్జెక్ట్ వారీగా సామర్థ్య విభజన',
    'analytics.problemSolvingHistory': 'సమస్య పరిష్కారం & క్విజ్ ట్రాక్ రికార్డ్',
    'analytics.masteredBadge': 'ప్రావీణ్యం సాధించిన కాన్సెప్ట్‌లు',
    'analytics.growthBadge': 'వృద్ధి లక్ష్య రంగాలు',

    // Language Selector
    'lang.settingsTitle': 'భాష & ప్రాంతీయ ప్రాధాన్యతలు',
    'lang.settingsSubtitle': 'నావిగేషన్, కాన్సెప్ట్ గైడ్‌లు మరియు ఫీడ్‌బ్యాక్ కోసం మీకు నచ్చిన భాషను ఎంచుకోండి.',
    'lang.currentLang': 'ప్రస్తుత భాష',
    'lang.changeSuccess': 'భాష మార్చబడింది:',

    // Common Course & Subject Names
    'subject.java': 'జావా ప్రావీణ్యం (Java Mastery)',
    'subject.python': 'పైథాన్ ప్రోగ్రామింగ్ (Python)',
    'subject.sql': 'SQL & డేటాబేస్ (SQL Database)',
    'subject.dsa': 'డేటా స్ట్రక్చర్స్ & అల్గారిథమ్స్ (DSA)',
    'subject.c': 'C ప్రోగ్రామింగ్ (C Programming)',

    // OKR
    'okr.title': 'టాపిక్ మాస్టరీ & OKR పురోగతి కొలమానాలు',
    'okr.subtitle': 'OKR స్థితి: బూడిద (0.0), ఎరుపు (0.01-0.3), పసుపు (0.4-0.6), ఆకుపచ్చ (0.7-0.99), నీలం (1.0).'
  },

  ml: {
    // Nav
    'nav.home': 'ഹോം',
    'nav.courses': 'കോഴ്സുകൾ',
    'nav.practice': 'പരിശീലനം',
    'nav.mentor': 'കോഡ് മെന്റർ',
    'nav.myPath': 'എന്റെ പഠന വഴി',
    'nav.roadmap': 'റോഡ്മാപ്പ്',
    'nav.dashboard': 'ഡാഷ്‌ബോർഡ്',
    'nav.about': 'ഞങ്ങളെക്കുറിച്ച്',
    'nav.search': 'തിരയുക',
    'nav.searchKbd': '⌘K',
    'nav.lowData': 'കുറഞ്ഞ ഡാറ്റ',
    'nav.lowDataOn': 'കുറഞ്ഞ ഡാറ്റ ഓൺ ആണ്',
    'nav.signOut': 'പുറത്തുകടക്കുക',
    'nav.profile': 'പ്രൊഫൈൽ',
    'nav.selectLang': 'ഭാഷ',

    // Hero Section (Home Page)
    'hero.badge': 'അഡാപ്റ്റീവ് വിഷയ വൈദഗ്ധ്യ എഞ്ചിൻ',
    'hero.title': 'ടോപിക് സോൾവർ (TOPIC SOLVER)',
    'hero.tagline': 'ഏതൊരു വിഷയത്തിലും വൈദഗ്ദ്ധ്യം നേടാനുള്ള നിങ്ങളുടെ വ്യക്തിഗത വഴി.',
    'hero.description': 'ടോപിക് സോൾവർ നിങ്ങളുടെ ആശയപരമായ കരുത്തുകളെ കണ്ടെത്തുകയും പഠന വിടവുകൾ നികത്തി നിങ്ങളുടെ വേഗതക്കനുസരിച്ചുള്ള പാഠ്യപദ്ധതി രൂപപ്പെടുത്തുകയും ചെയ്യുന്നു.',
    'hero.quote': '"നിങ്ങളുടെ തലത്തിൽ പഠിക്കുക. യഥാർത്ഥ ടെസ്റ്റ് കേസുകളിൽ പരിശീലിക്കുക. ഓരോ വിഷയത്തിലും മികവ് പുലർത്തുക."',
    'hero.btnDiagnostic': 'ഡയഗ്നോസ്റ്റിക് അസസ്മെന്റ് ആരംഭിക്കുക',
    'hero.btnPractice': 'പരിശീലന വർക്ക്ബെഞ്ച്',
    'hero.loopTitle': '⚡ 4-ഘട്ട തുടർച്ചയായ അഡാപ്റ്റീവ് ലൂപ്പ്',
    'hero.loop1Title': 'ഡയഗ്നോസ്റ്റിക്',
    'hero.loop1Desc': 'നിങ്ങൾക്കറിയാവുന്നത് മിനിറ്റുകൾക്കകം വിലയിരുത്തുന്നു',
    'hero.loop2Title': 'AI വിശകലനം',
    'hero.loop2Desc': 'വിടവുകൾ കണ്ടെത്തി കാഠിന്യം നിശ്ചയിക്കുന്നു',
    'hero.loop3Title': 'വ്യക്തിഗത വഴി',
    'hero.loop3Desc': 'വിടവുകൾ പരിഹരിച്ച് പുതിയ വിഷയങ്ങൾ തുറക്കുന്നു',
    'hero.loop4Title': 'വിഷയ വൈദഗ്ദ്ധ്യം',
    'hero.loop4Desc': 'ടെസ്റ്റ് കേസുകളും ലൈവ് കോഡ് എക്സിക്യൂഷനും',

    // Home Features
    'features.badge': 'പ്ലാറ്റ്‌ഫോം സവിശേഷതകൾ',
    'features.title': 'എന്തുകൊണ്ട് ടോപിക് സോൾവർ തിരഞ്ഞെടുക്കണം?',
    'features.subtitle': 'ഇന്റലിജന്റ് പേഴ്സണലൈസേഷനും കുറഞ്ഞ ബാൻഡ്‌വിഡ്ത്ത് പിന്തുണയോടെയും വിദൂര പഠന വെല്ലുവിളികൾ പരിഹരിക്കാൻ രൂപകൽപ്പന ചെയ്തത്.',
    'features.feat1Title': '🎯 വ്യക്തിഗത ഡയഗ്നോസ്റ്റിക്',
    'features.feat1Sub': '3 മിനിറ്റിനുള്ളിൽ പഠന വിടവുകൾ കണ്ടെത്തുക.',
    'features.feat1Desc': 'അഡാപ്റ്റീവ് ഡയഗ്നോസ്റ്റിക് അൽഗോരിതങ്ങൾ നിങ്ങളുടെ അടിസ്ഥാന പരിജ്ഞാനം വിലയിരുത്തി പാഠ്യപദ്ധതി സ്വയമേവ ക്രമീകരിക്കുന്നു.',
    'features.feat2Title': '🧠 അഡാപ്റ്റീവ് ക്രമീകരണം',
    'features.feat2Sub': 'ചോദ്യങ്ങൾ തത്സമയം സ്വയമേവ മാറുന്നു.',
    'features.feat2Desc': 'നിങ്ങളുടെ പ്രകടനത്തിന്റെയും കൃത്യതയുടെയും അടിസ്ഥാനത്തിൽ ചോദ്യങ്ങളുടെ കാഠിന്യം (എളുപ്പം/ഇടത്തരം/കഠിനം) ഞങ്ങളുടെ എഞ്ചിൻ ക്രമീകരിക്കുന്നു.',
    'features.feat3Title': '💡 AI ആശയ വിശകലനം',
    'features.feat3Sub': 'മൂലകാരണങ്ങൾ വിശദീകരിക്കുന്ന പഠനസഹായി.',
    'features.feat3Desc': 'അവ്യക്തമായ പിശക് സന്ദേശങ്ങളിൽ കുടുങ്ങിപ്പോകരുത്. നിങ്ങളുടെ യുക്തി എന്തുക്കൊണ്ട് തെറ്റി എന്ന് വിശദീകരിക്കുന്ന ഘട്ടം ഘട്ടമായുള്ള അൽഗോരിതം വിശകലനം നേടുക.',
    'features.feat4Title': '📶 കുറഞ്ഞ ബാൻഡ്‌വിഡ്ത്ത് മോഡ്',
    'features.feat4Sub': '2G അല്ലെങ്കിൽ ഓഫ്‌ലൈൻ നെറ്റ്‌വർക്കിലും തടസ്സമില്ലാത്ത പഠനം.',
    'features.feat4Desc': 'ടെക്സ്റ്റ് അടിസ്ഥാനമാക്കിയുള്ള പാഠങ്ങളും 50KB-ൽ താഴെയുള്ള ഡാറ്റയും വിദൂര പ്രദേശങ്ങളിലും 100% സുഗമമായ പഠനം ഉറപ്പാക്കുന്നു.',

    // Home Subject Selector
    'home.tracksBadge': 'ഇന്ററാക്ടീവ് പാഠ്യപദ്ധതികൾ',
    'home.tracksTitle': 'ഡയഗ്നോസ്റ്റിക് ടെസ്റ്റ് ആരംഭിക്കാൻ ഒരു വിഷയം തിരഞ്ഞെടുക്കുക',
    'home.tracksSubtitle': 'അഡാപ്റ്റീവ് ഡയഗ്നോസ്റ്റിക് പരീക്ഷ എഴുതുക. ടോപിക് സോൾവർ നിങ്ങളുടെ കസ്റ്റം ലെവൽ ഉടനടി നിശ്ചയിക്കും.',
    'home.takeAssessment': '10-ചോദ്യ നോളജ് ചെക്ക് എടുക്കുക',
    'home.viewSyllabus': 'മുഴുവൻ സിലബസും കാണുക',

    // CTA
    'cta.title': 'നിങ്ങളുടെ അടുത്ത പ്രോഗ്രാമിംഗ് വിഷയത്തിൽ വൈദഗ്ദ്ധ്യം നേടാൻ തയ്യാറാണോ?',
    'cta.subtitle': 'അഡാപ്റ്റീവ് AI പഠനവും യഥാർത്ഥ കോഡിംഗ് പരിശീലനവുമായി മുന്നേറുന്ന വിദ്യാർത്ഥികളോടൊപ്പം ഇപ്പോൾ തന്നെ പങ്കുചേരൂ.',
    'cta.btn': 'സൗജന്യമായി ആരംഭിക്കുക',

    // Courses Page
    'courses.title': 'സ്ട്രക്ചേർഡ് ലേണിംഗ് ട്രാക്കുകളും പാഠ്യപദ്ധതികളും പര്യവേക്ഷണം ചെയ്യുക',
    'courses.subtitle': 'ജാവ, പൈത്തൺ, SQL, DSA, സി പ്രോഗ്രാമിംഗ് എന്നിവയിൽ സ്ട്രക്ചേർഡ് മൊഡ്യൂളുകളും വീഡിയോകളും ക്വിസുകളുമായി വൈദഗ്ദ്ധ്യം നേടുക.',
    'courses.startCourse': 'ലെവൽ 1 ആരംഭിക്കുക',
    'courses.takeAssessment': 'ഡയഗ്നോസ്റ്റിക് ചെക്ക് ചെയ്യുക',
    'courses.modules': 'മൊഡ്യൂളുകൾ',
    'courses.levels': 'ലെവലുകൾ',
    'courses.done': 'പൂർത്തിയായി',

    // Course Detail & Syllabus
    'courseDetail.syllabus': 'കോഴ്സ് സിലബസും സ്ട്രക്ചേർഡ് ലെവലുകളും',
    'courseDetail.levelLock': '🔒 അടുത്ത ലെവൽ തുറക്കാൻ മുൻ ക്വിസിൽ ≥ 80% സ്കോർ നേടുക',
    'courseDetail.moduleLocked': '🔒 മൊഡ്യൂൾ ലോക്ക് ചെയ്തിരിക്കുന്നു',
    'courseDetail.moduleMastered': 'മൊഡ്യൂൾ വൈദഗ്ദ്ധ്യം നേടി ✓',
    'courseDetail.startLevel': 'ലെവൽ ആരംഭിക്കുക (5 ചോദ്യങ്ങൾ)',
    'courseDetail.reviewLevel': 'അവലോകനം & വീണ്ടും എഴുതുക (5 ചോദ്യങ്ങൾ)',
    'courseDetail.locked': 'ലോക്ക് ചെയ്തു',

    // Adaptive Quizzes & Assessments
    'quiz.headerTitle': 'കോംപ്രിഹെൻഷൻ ക്വിസ് (5 ചോദ്യങ്ങൾ)',
    'quiz.passingCriteria': 'പാസിംഗ് മാനദണ്ഡം: അടുത്ത ലെവൽ തുറക്കാൻ ≥ 80% (4/5) നേടുക',
    'quiz.question': 'ചോദ്യം',
    'quiz.of': '/',
    'quiz.score': 'സ്കോർ',
    'quiz.passingBadge': '80% പാസിംഗ് പരിധി',
    'quiz.submitAnswer': 'ഉത്തരം സമർപ്പിക്കുക',
    'quiz.selectOption': 'തുടരാൻ ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക',
    'quiz.nextQuestion': 'അടുത്ത ചോദ്യം',
    'quiz.viewResults': 'ഫലങ്ങൾ കാണുക',
    'quiz.congratsPassed': '🎉 അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ≥ 80% സ്കോറോടെ വിജയിച്ചു',
    'quiz.unlockedNext': 'നിങ്ങളുടെ സിലബസിലെ അടുത്ത ലെവൽ അൺലോക്ക് ചെയ്യപ്പെട്ടു!',
    'quiz.needsPractice': '⚠️ ആവശ്യമായ പാസിംഗ് സ്കോർ (≥80%) ലഭിച്ചില്ല',
    'quiz.retakePrompt': 'താഴെയുള്ള ആശയപരമായ സൂചനകൾ അവലോകനം ചെയ്ത് പുതിയ ചോദ്യങ്ങളോടെ വീണ്ടും ശ്രമിക്കുക.',
    'quiz.retakeBtn': '5 ചോദ്യ ക്വിസ് വീണ്ടും എഴുതുക',
    'quiz.nextLevelBtn': 'അടുത്ത ലെവലിലേക്ക് തുടരുക',
    'quiz.clueTitle': '💡 ആശയപരമായ സൂചന (ഈ ഉത്തരം എന്തുകൊണ്ട് തെറ്റായി):',
    'quiz.correctChoice': '✓ ശരിയാണ്! ആശയം സാധൂകരിച്ചു.',

    // Diagnostic Assessment Page (10 Questions)
    'diag.title': '10-ചോദ്യ ഡയഗ്നോസ്റ്റിക് നോളജ് ചെക്ക് അസസ്മെന്റ്',
    'diag.subtitle': 'നിങ്ങളെ അനുയോജ്യമായ മൊഡ്യൂളിൽ എത്തിക്കാൻ അടിസ്ഥാന ധാരണ വിലയിരുത്തുന്നു.',
    'diag.resultTitle': 'അസസ്മെന്റ് പൂർത്തിയായി & മൊഡ്യൂൾ പ്ലേസ്മെന്റ് നിശ്ചയിച്ചു',
    'diag.jumpModuleBtn': 'നിശ്ചയിച്ച മൊഡ്യൂൾ ആരംഭിക്കുക',
    'diag.viewSyllabusBtn': 'തുറന്ന സിലബസ് കാണുക',
    'diag.retakeBtn': '10 ചോദ്യങ്ങൾ വീണ്ടും എഴുതുക',

    // Practice Workbench
    'practice.title': 'പരിശീലന വർക്ക്ബെഞ്ചും അൽഗോരിതമിക് അരീനയും',
    'practice.subtitle': 'ലൈവ് ടെസ്റ്റ് കേസുകളും മറഞ്ഞിരിക്കുന്ന പരിശോധനകളും തൽക്ഷണ AI മാർഗ്ഗനിർദ്ദേശങ്ങളോടെ കോഡിംഗ് വെല്ലുവിളികൾ പരിഹരിക്കുക.',
    'practice.allProblems': 'എല്ലാ പ്രശ്നങ്ങളും',
    'practice.solved': 'പരിഹരിച്ചവ',
    'practice.runCode': 'കോഡ് റൺ ചെയ്യുക',
    'practice.submitCode': 'പരിഹാരം സമർപ്പിക്കുക',
    'practice.testCases': 'ടെസ്റ്റ് കേസുകൾ',
    'practice.hiddenCases': 'ഗുണനിലവാര പരിശോധനകൾ',
    'practice.acceptance': 'സ്വീകാര്യതാ നിരക്ക്',

    // CodeMentor AI
    'mentor.title': 'കോഡ് മെന്റർ AI പിശക് സഹായി',
    'mentor.subtitle': 'നിങ്ങളുടെ AI കോഡിംഗ് മെന്റർ - നേരിട്ട് ഉത്തരം നൽകാതെ ആശയപരമായ സൂചനകളിലൂടെ നിങ്ങളെ നയിക്കുന്നു.',
    'mentor.inputPlaceholder': 'നിങ്ങളുടെ കോഡ് അല്ലെങ്കിൽ പിശക് സന്ദേശം ഇവിടെ ഒട്ടിക്കുക...',
    'mentor.analyzeBtn': 'കോഡ് മെന്റർ ഉപയോഗിച്ച് വിശകലനം ചെയ്യുക',
    'mentor.hintLabel': 'മെന്റർ സൂചന',

    // Profile & Overview
    'profile.title': 'പഠിതാവിന്റെ പ്രൊഫൈലും പ്രകടന വിശകലനവും',
    'profile.subtitle': 'പ്രശ്നപരിഹാര മികവ്, വിഷയ വൈദഗ്ദ്ധ്യം, കരുത്തുകൾ, മെച്ചപ്പെടുത്തേണ്ട മേഖലകൾ എന്നിവയുടെ സമഗ്ര വിശകലനം.',
    'profile.level': 'ലെവൽ',
    'profile.streak': 'സ്ട്രേക്ക്',
    'profile.activeFocus': 'സജീവ ശ്രദ്ധ',
    'profile.difficulty': 'ബുദ്ധിമുട്ട് നിലവാരം',
    'profile.completedLessons': 'പൂർത്തിയാക്കിയ പാഠങ്ങൾ',
    'profile.completedLessonsDesc': 'പ്രധാന പ്രോഗ്രാമിംഗ് വിഷയങ്ങളിൽ',
    'profile.problemsSolved': 'പരിഹരിച്ച പ്രശ്നങ്ങൾ',
    'profile.problemsSolvedDesc': 'സാധുത തെളിയിച്ച ടെസ്റ്റ് കേസുകൾ',
    'profile.learningVelocity': 'പഠന വേഗത',
    'profile.learningVelocityDesc': 'അഡാപ്റ്റീവ് പുരോഗതി വേഗത',
    'profile.editTitle': 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക',
    'profile.displayName': 'പേര്',
    'profile.email': 'ഇമെയിൽ വിലാസം',
    'profile.saveBtn': 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക',
    'profile.savedSuccess': 'പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി പുതുക്കി!',

    // Strengths & Weaknesses Section
    'analytics.strengthsTitle': 'കണ്ടെത്തിയ കരുത്തുകളും പ്രശ്നപരിഹാര മികവും',
    'analytics.strengthsSubtitle': 'നിങ്ങൾ ഉയർന്ന കൃത്യതയും (≥80%) മികച്ച കോഡിംഗ് വൈദഗ്ധ്യവും പ്രകടിപ്പിച്ച വിഷയങ്ങൾ.',
    'analytics.weaknessesTitle': 'മെച്ചപ്പെടുത്തേണ്ട മേഖലകളും ദൗർബല്യങ്ങളും',
    'analytics.weaknessesSubtitle': 'തെറ്റുകൾ സംഭവിച്ച വിഷയങ്ങൾ. പൂർണ്ണ വൈദഗ്ധ്യം നേടാൻ ഞങ്ങളുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുക.',
    'analytics.accuracy': 'കൃത്യത',
    'analytics.masteryLevel': 'വൈദഗ്ദ്ധ്യം',
    'analytics.recommendation': 'ഉപയോഗപ്രദമായ ഉപദേശം',
    'analytics.practiceNow': 'പ്രശ്നം പരിശീലിക്കുക',
    'analytics.reviewLesson': 'പാഠം അവലോകനം ചെയ്യുക',
    'analytics.subjectBreakdown': 'വിഷയാടിസ്ഥാനത്തിലുള്ള പ്രാവീണ്യ വിശകലനം',
    'analytics.problemSolvingHistory': 'പ്രശ്നപരിഹാരവും ക്വിസ് ചരിത്രവും',
    'analytics.masteredBadge': 'വൈദഗ്ധ്യം നേടിയ ആശയങ്ങൾ',
    'analytics.growthBadge': 'വളർച്ചാ മേഖലകൾ',

    // Language Selector
    'lang.settingsTitle': 'ഭാഷാ മുൻഗണനകൾ',
    'lang.settingsSubtitle': 'നാവിഗേഷൻ, പഠന സഹായികൾ, ഫീഡ്‌ബാക്ക് എന്നിവക്കായി നിങ്ങളുടെ മാതൃഭാഷ തിരഞ്ഞെടുക്കുക.',
    'lang.currentLang': 'നിലവിലെ ഭാഷ',
    'lang.changeSuccess': 'ഭാഷ മാറ്റി:',

    // Common Course & Subject Names
    'subject.java': 'ജാവ മാസ്റ്ററി (Java Mastery)',
    'subject.python': 'പൈത്തൺ പ്രോഗ്രാമിംഗ് (Python)',
    'subject.sql': 'SQL & ഡാറ്റാബേസ് (SQL Database)',
    'subject.dsa': 'ഡാറ്റാ സ്ട്രക്ചേഴ്സ് & അൽഗോരിതങ്ങൾ (DSA)',
    'subject.c': 'സി പ്രോഗ്രാമിംഗ് (C Programming)',

    // OKR
    'okr.title': 'വിഷയ വൈദഗ്ധ്യവും OKR പുരോഗതിയും',
    'okr.subtitle': 'OKR നില: ചാര (0.0), ചുവപ്പ് (0.01-0.3), മഞ്ഞ (0.4-0.6), പച്ച (0.7-0.99), നീല (1.0).'
  },

  hi: {
    // Nav
    'nav.home': 'होम',
    'nav.courses': 'कोर्सेज़',
    'nav.practice': 'अभ्यास',
    'nav.mentor': 'कोड मेंटर',
    'nav.myPath': 'मेरी राह',
    'nav.roadmap': 'रोडमैप',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.about': 'हमारे बारे में',
    'nav.search': 'खोजें',
    'nav.searchKbd': '⌘K',
    'nav.lowData': 'लो डेटा',
    'nav.lowDataOn': 'लो डेटा ऑन',
    'nav.signOut': 'साइन आउट',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.selectLang': 'भाषा',

    // Hero Section (Home Page)
    'hero.badge': 'अनुकूली विषय महारत इंजन',
    'hero.title': 'टॉपिक सॉल्वर (TOPIC SOLVER)',
    'hero.tagline': 'किसी भी विषय में महारत हासिल करने का आपका व्यक्तिगत मार्ग।',
    'hero.description': 'टॉपिक सॉल्वर आपकी वैचारिक ताकत को मैप करता है, सीखने के अंतराल की पहचान करता है, और विशेष रूप से आपकी गति के अनुसार पाठ्यक्रम तैयार करता है।',
    'hero.quote': '"अपने स्तर पर सीखें। वास्तविक टेस्ट केस के साथ अभ्यास करें। हर विषय में उत्कृष्टता प्राप्त करें।"',
    'hero.btnDiagnostic': 'डायग्नोस्टिक मूल्यांकन शुरू करें',
    'hero.btnPractice': 'अभ्यास वर्कबेंच',
    'hero.loopTitle': '⚡ 4-चरणीय निरंतर अनुकूली लूप',
    'hero.loop1Title': 'डायग्नोस्टिक',
    'hero.loop1Desc': 'मिनटों में आपके ज्ञान का आकलन करता है',
    'hero.loop2Title': 'AI विश्लेषण',
    'hero.loop2Desc': 'अंतराल ढूंढकर प्रारंभिक कठिनाई तय करता है',
    'hero.loop3Title': 'व्यक्तिगत मार्ग',
    'hero.loop3Desc': 'अंतरालों को भरकर नए विषय अनलॉक करता है',
    'hero.loop4Title': 'विषय महारत',
    'hero.loop4Desc': 'टेस्ट केस और लाइव कोड निष्पादन',

    // Home Features
    'features.badge': 'प्लेटफ़ॉर्म क्षमताएं',
    'features.title': 'टॉपिक सॉल्वर क्यों चुनें?',
    'features.subtitle': 'स्मार्ट वैयक्तिकरण और कम बैंडविड्थ अनुकूलन के साथ दूरस्थ शिक्षा की चुनौतियों को हल करने के लिए निर्मित।',
    'features.feat1Title': '🎯 व्यक्तिगत डायग्नोस्टिक',
    'features.feat1Sub': '3 मिनट से कम समय में सीखने के अंतराल की पहचान करें।',
    'features.feat1Desc': 'अनुकूली डायग्नोस्टिक एल्गोरिदम आपके बुनियादी ज्ञान का मूल्यांकन करते हैं और स्वचालित रूप से पाठ्यक्रम तय करते हैं।',
    'features.feat2Title': '🧠 अनुकूली कैलिब्रेशन',
    'features.feat2Sub': 'प्रश्न वास्तविक समय में गतिशील रूप से बदलते हैं।',
    'features.feat2Desc': 'हमारा डायनामिक इंजन आपके प्रदर्शन और सटीकता के आधार पर प्रश्नों की जटिलता (सरल/मध्यम/कठिन) को समायोजित करता है।',
    'features.feat3Title': '💡 AI वैचारिक व्याख्या',
    'features.feat3Sub': 'गहन मूल-कारण युक्तियों के साथ अनुरूप व्याख्याएं।',
    'features.feat3Desc': 'अस्पष्ट त्रुटि संदेशों के साथ कभी न अटकें। चरण-दर-चरण एल्गोरिथम व्याख्या प्राप्त करें कि आपका लॉजिक क्यों विफल हुआ।',
    'features.feat4Title': '📶 ग्रामीण कम बैंडविड्थ मोड',
    'features.feat4Sub': '2G या ऑफ़लाइन नेटवर्क पर भी बिना किसी रुकावट के सीखना।',
    'features.feat4Desc': 'टेक्स्ट-आधारित पाठ और 50KB से कम का डेटा दूरदराज के क्षेत्रों में 100% सुगम शिक्षा सुनिश्चित करता है।',

    // Home Subject Selector
    'home.tracksBadge': 'इंटरैक्टिव पाठ्यक्रम',
    'home.tracksTitle': 'डायग्नोस्टिक मूल्यांकन शुरू करने के लिए विषय चुनें',
    'home.tracksSubtitle': 'अनुकूली डायग्नोस्टिक परीक्षा दें। टॉपिक सॉल्वर तुरंत आपका कस्टम स्तर तय करेगा।',
    'home.takeAssessment': '10-प्रश्नों का ज्ञान परीक्षण दें',
    'home.viewSyllabus': 'पूरा पाठ्यक्रम देखें',

    // CTA
    'cta.title': 'अपने अगले प्रोग्रामिंग विषय में महारत हासिल करने के लिए तैयार हैं?',
    'cta.subtitle': 'अनुकूली AI शिक्षण, संरचित पाठ्यक्रम और लाइव अभ्यास के साथ आगे बढ़ रहे छात्रों से आज ही जुड़ें।',
    'cta.btn': 'मुफ़्त में शुरू करें',

    // Courses Page
    'courses.title': 'संरचित शिक्षण पथ और पाठ्यक्रम का अन्वेषण करें',
    'courses.subtitle': 'जावा, पायथन, SQL, DSA और C प्रोग्रामिंग में संरचित मॉड्यूल, वीडियो और क्विज़ के साथ महारत हासिल करें।',
    'courses.startCourse': 'लेवल 1 शुरू करें',
    'courses.takeAssessment': 'डायग्नोस्टिक परीक्षण दें',
    'courses.modules': 'मॉड्यूल',
    'courses.levels': 'लेवल',
    'courses.done': 'पूर्ण',

    // Course Detail & Syllabus
    'courseDetail.syllabus': 'पाठ्यक्रम और संरचित स्तर',
    'courseDetail.levelLock': '🔒 अगला स्तर अनलॉक करने के लिए पिछले क्विज़ में ≥ 80% अंक प्राप्त करें',
    'courseDetail.moduleLocked': '🔒 मॉड्यूल लॉक है',
    'courseDetail.moduleMastered': 'मॉड्यूल में महारत हासिल की ✓',
    'courseDetail.startLevel': 'स्तर शुरू करें (5 प्रश्न)',
    'courseDetail.reviewLevel': 'समीक्षा और पुनः प्रयास (5 प्रश्न)',
    'courseDetail.locked': 'लॉक है',

    // Adaptive Quizzes & Assessments
    'quiz.headerTitle': 'समझ क्विज़ (5 प्रश्न)',
    'quiz.passingCriteria': 'उत्तीर्ण मानदंड: अगला स्तर अनलॉक करने के लिए ≥ 80% (4/5) आवश्यक',
    'quiz.question': 'प्रश्न',
    'quiz.of': '/',
    'quiz.score': 'स्कोर',
    'quiz.passingBadge': '80% उत्तीर्ण सीमा',
    'quiz.submitAnswer': 'उत्तर सबमिट करें',
    'quiz.selectOption': 'जारी रखने के लिए कृपया एक विकल्प चुनें',
    'quiz.nextQuestion': 'अगला प्रश्न',
    'quiz.viewResults': 'परिणाम देखें',
    'quiz.congratsPassed': '🎉 बधाई हो! आपने ≥ 80% अंकों के साथ परीक्षा पास कर ली है',
    'quiz.unlockedNext': 'आपके पाठ्यक्रम में अगला स्तर अनलॉक हो गया है!',
    'quiz.needsPractice': '⚠️ आवश्यक उत्तीर्ण स्कोर (≥80%) प्राप्त नहीं हुआ',
    'quiz.retakePrompt': 'नीचे दिए गए वैचारिक संकेतों की समीक्षा करें और नए प्रश्नों के साथ पुनः प्रयास करें।',
    'quiz.retakeBtn': '5-प्रश्नों का क्विज़ पुनः दें',
    'quiz.nextLevelBtn': 'अगले स्तर पर आगे बढ़ें',
    'quiz.clueTitle': '💡 वैचारिक संकेत (यह विकल्प गलत क्यों है):',
    'quiz.correctChoice': '✓ सही! अवधारणा सत्यापित हुई।',

    // Diagnostic Assessment Page (10 Questions)
    'diag.title': '10-प्रश्नों का डायग्नोस्टिक ज्ञान मूल्यांकन',
    'diag.subtitle': 'आपको सही मॉड्यूल में रखने के लिए मॉड्यूल-स्तरीय समझ का मूल्यांकन।',
    'diag.resultTitle': 'मूल्यांकन पूर्ण हुआ और मॉड्यूल प्लेसमेंट तय हुआ',
    'diag.jumpModuleBtn': 'आवंटित मॉड्यूल शुरू करें',
    'diag.viewSyllabusBtn': 'अनलॉक किया गया पाठ्यक्रम देखें',
    'diag.retakeBtn': '10 प्रश्नों का पुनः प्रयास करें',

    // Practice Workbench
    'practice.title': 'अभ्यास वर्कबेंच और एल्गोरिथम क्षेत्र',
    'practice.subtitle': 'वास्तविक टेस्ट केस, छिपी हुई जांच और तत्काल AI मार्गदर्शन के साथ कोडिंग समस्याओं को हल करें।',
    'practice.allProblems': 'सभी समस्याएं',
    'practice.solved': 'हल किया गया',
    'practice.runCode': 'कोड चलाएं',
    'practice.submitCode': 'समाधान सबमिट करें',
    'practice.testCases': 'टेस्ट केस',
    'practice.hiddenCases': 'गुणवत्ता जांच',
    'practice.acceptance': 'स्वीकृति दर',

    // CodeMentor AI
    'mentor.title': 'कोड मेंटर AI त्रुटि सहायक',
    'mentor.subtitle': 'आपका AI कोडिंग मेंटर - सीधा उत्तर दिए बिना वैचारिक संकेतों के साथ आपका मार्गदर्शन करता है।',
    'mentor.inputPlaceholder': 'अपना त्रुटिपूर्ण कोड या संदेश यहां पेस्ट करें...',
    'mentor.analyzeBtn': 'कोड मेंटर से विश्लेषण करें',
    'mentor.hintLabel': 'मेंटर संकेत',

    // Profile & Overview
    'profile.title': 'शिक्षार्थी प्रोफ़ाइल और प्रदर्शन विश्लेषण',
    'profile.subtitle': 'समस्या समाधान क्षमता, विषय में महारत, ताकत और सुधार के क्षेत्रों का विस्तृत विश्लेषण।',
    'profile.level': 'स्तर',
    'profile.streak': 'स्ट्राइक',
    'profile.activeFocus': 'सक्रिय फ़ोकस',
    'profile.difficulty': 'कठिनाई स्तर',
    'profile.completedLessons': 'पूर्ण किए गए पाठ',
    'profile.completedLessonsDesc': 'मुख्य प्रोग्रामिंग विषयों में',
    'profile.problemsSolved': 'हल किए गए प्रश्न',
    'profile.problemsSolvedDesc': 'सत्यापित और पास किए गए टेस्ट केस',
    'profile.learningVelocity': 'सीखने की गति',
    'profile.learningVelocityDesc': 'अनुकूली प्रगति की गति',
    'profile.editTitle': 'प्रोफ़ाइल संपादित करें',
    'profile.displayName': 'नाम',
    'profile.email': 'ईमेल पता',
    'profile.saveBtn': 'प्रोफ़ाइल परिवर्तन सहेजें',
    'profile.savedSuccess': 'प्रोफ़ाइल विवरण सफलतापूर्वक अपडेट किए गए!',

    // Strengths & Weaknesses Section
    'analytics.strengthsTitle': 'पहचानी गई ताकत और समस्या समाधान में महारत',
    'analytics.strengthsSubtitle': 'वे विषय और अवधारणाएं जहां आपने उच्च सटीकता (≥80%) और मजबूत कोडिंग कौशल का प्रदर्शन किया है।',
    'analytics.weaknessesTitle': 'सुधार के लक्षित क्षेत्र और कमजोरियां',
    'analytics.weaknessesSubtitle': 'वे विषय जहां त्रुटियां हुईं। पूर्ण महारत हासिल करने के लिए हमारे लक्षित सुझावों का पालन करें।',
    'analytics.accuracy': 'सटीकता',
    'analytics.masteryLevel': 'महारत',
    'analytics.recommendation': 'व्यावहारिक सुझाव',
    'analytics.practiceNow': 'प्रश्न का अभ्यास करें',
    'analytics.reviewLesson': 'पाठ दोहराएं',
    'analytics.subjectBreakdown': 'विषय अनुसार दक्षता विश्लेषण',
    'analytics.problemSolvingHistory': 'समस्या समाधान और क्विज़ का ट्रैक रिकॉर्ड',
    'analytics.masteredBadge': 'निपुण अवधारणाएं',
    'analytics.growthBadge': 'विकास के क्षेत्र',

    // Language Selector
    'lang.settingsTitle': 'भाषा और क्षेत्रीय प्राथमिकताएं',
    'lang.settingsSubtitle': 'नेविगेशन, अवधारणा मार्गदर्शिका और प्रतिक्रिया के लिए अपनी पसंदीदा भाषा चुनें।',
    'lang.currentLang': 'वर्तमान भाषा',
    'lang.changeSuccess': 'भाषा बदलकर कर दी गई है:',

    // Common Course & Subject Names
    'subject.java': 'जावा मास्टरी (Java Mastery)',
    'subject.python': 'पायथन प्रोग्रामिंग (Python)',
    'subject.sql': 'SQL और डेटाबेस (SQL Database)',
    'subject.dsa': 'डेटा संरचनाएं और एल्गोरिदम (DSA)',
    'subject.c': 'C प्रोग्रामिंग (C Programming)',

    // OKR
    'okr.title': 'विषय महारत और OKR प्रगति मेट्रिक्स',
    'okr.subtitle': 'OKR स्थिति: ग्रे (0.0), लाल (0.01-0.3), पीला (0.4-0.6), हरा (0.7-0.99), नीला (1.0)।'
  }
};

export function getTranslation(lang: Language, key: string, fallback?: string): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || fallback || key;
}
