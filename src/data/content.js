export const CONTENT = {
  personal: {
    name: 'Anushka Nilangekar',
    titles: [
      'Full Stack Engineer',
      'Mobile Developer',
      'AI/ML Enthusiast',
      'Open Source Contributor',
      'React Developer',
      'Backend Engineer',
      'Cloud & DevOps',
      'Python Developer',
      'Android Developer',
      'API Designer',
      'Boba-fueled Coder',
      'Lifelong Learner',
      'Problem Solver',
      'Detail-Oriented',
      'CS @ Purdue',
    ],
    tagline: 'Building things that matter, one line at a time.',
    bio: 'Full stack software engineer with a passion for building across the entire stack, from mobile apps to cloud infrastructure to AI-powered experiences. BS Computer Science, Purdue University. Based in San Jose, CA.',
    location: 'San Jose, CA',
    email: 'anushka.nilangekar1@gmail.com',
    github: 'https://github.com/AnushkaNilangekar',
    linkedin: 'https://www.linkedin.com/in/anushka-nilangekar',
    resume: '/Anushka_Nilangekar_Resume.pdf',
  },

  funFacts: [
    {
      emoji: '✈️',
      text: "Dream city since childhood: London. Still haven't been — at this point I just want to explore everywhere!",
    },
    {
      emoji: '🍜',
      text: 'Certified foodie (vegetarian edition). Will try any cuisine at least once.',
    },
    {
      emoji: '🧋',
      text: 'Boba and chocolate chip cookies are non-negotiable life essentials!',
    },
    {
      emoji: '📺',
      text: 'Brooklyn Nine Nine is a forever favorite. Also deep in a never-ending kdrama watchlist.',
    },
    {
      emoji: '💜',
      text: 'Purple is my favorite color!',
    },
    {
      emoji: '🎲',
      text: 'Hobbies: sudoku, board games, dancing, painting, and crafts.',
    },
    {
      emoji: '💬',
      text: 'Dream superpower: fluency in every language on Earth.',
    },
    {
      emoji: '🧠',
      text: 'MBTI: ISFJ.',
    },
  ],

  hotTakes: [
    'Nutty flavors (peanuts, sesame) are overrated.',
    'Mint chocolate chip is just not it.',
    'Ice in drinks is a scam.',
  ],

  experience: [
    {
      company: 'PolicyEngine',
      role: 'Software Engineer',
      period: 'Jul 2025 – Present',
      bullets: [
        'Contributing to open-source Python API platform, migrating legacy Flask endpoints to a modernized architecture for improved scalability and response times.',
        'Built reusable React + TypeScript components for v2 of the web app, reducing UI development time and ensuring design consistency.',
      ],
    },
    {
      company: 'Indiana Farm Bureau Insurance',
      role: 'Software Development Intern',
      period: 'May 2024 – Aug 2024',
      bullets: [
        'Built a Java/Spring Boot REST API integrating Jira and Dynatrace to automate log identification for error tickets — boosted support engineer productivity by 20%.',
        'Resolved backend errors in insurance policy management software, reducing system-detected issues by 6%.',
      ],
    },
    {
      company: 'Sports.Excitement LLC',
      role: 'Software Engineering Intern',
      period: 'Jul 2023 – Aug 2023',
      bullets: [
        'Developed responsive React components for ‘Velosaty’, a job search platform for retired athletes, translating Figma designs into production UI.',
        'Collaborated with cross-functional teams in an Agile environment using Jira for sprint planning and delivery.',
      ],
    },
    {
      company: 'Nuvve Corp — The Data Mine, Purdue University',
      role: 'Undergraduate Research Assistant',
      period: 'Aug 2022 – May 2023',
      bullets: [
        'Built an ML energy price prediction system in Python, training RNN, DNN, and LSTM models — identified LSTM as optimal with an 8% MSE reduction over alternatives.',
        'Conducted hyperparameter tuning research to further optimize model accuracy and minimize forecasting error.',
      ],
    },
  ],

  projects: [
    {
      title: 'NewsInsight',
      description:
        'LLM-powered Q&A tool that uses Retrieval-Augmented Generation with FAISS and Hugging Face to extract insights from news articles via semantic search.',
      tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'LangChain', 'Hugging Face', 'FAISS'],
      github: 'https://github.com/AnushkaNilangekar/NewsInsight',
      live: null,
      image: '/assets/NewsInsight.jpeg',
    },
    {
      title: 'ResHub',
      description:
        'Cross-platform roommate-matching app for Purdue students with a React Native frontend, Java Spring Boot backend, AWS infrastructure, and FAISS-powered personalized discovery.',
      tech: ['Java', 'Spring Boot', 'React Native', 'FAISS', 'AWS', 'Botpress'],
      github: 'https://github.com/AnushkaNilangekar/resHub',
      live: null,
      image: '/assets/resHub.jpeg',
    },
    {
      title: 'Botaniq',
      description:
        'Android gardening app built with Kotlin and MVVM that helps users discover plants and access species info and care guides via real-time API integration.',
      tech: ['Kotlin', 'Android Studio', 'MVVM'],
      github: 'https://github.com/AnushkaNilangekar/Botaniq',
      live: null,
      image: '/assets/Botaniq.png',
    },
    {
      title: 'Moonships Game',
      description:
        '2D desktop food delivery game built with Java LibGDX — shipped 60 features across 6 levels including customizations, boosts, and Purdue-themed elements.',
      tech: ['Java', 'LibGDX', 'Agile'],
      github: 'https://github.com/AnushkaNilangekar/moonships',
      live: null,
      image: '/assets/Moonships.jpeg',
    },
    {
      title: 'Shell Interpreter',
      description:
        'Unix-style shell in C/C++ supporting piping, I/O redirection, job control, signal handling, and wildcard expansion.',
      tech: ['C', 'C++'],
      github: '#',
      live: null,
      image: '/assets/shell.png',
    },
  ],

  skills: {
    Languages: [
      'Java',
      'Python',
      'JavaScript',
      'TypeScript',
      'Kotlin',
      'C',
      'C++',
      'SQL',
      'Bash',
      'R',
    ],
    Frontend: ['React', 'React Native', 'Tailwind CSS', 'Vite', 'HTML/CSS'],
    Backend: ['Spring Boot', 'FastAPI', 'Flask', 'REST APIs'],
    'Cloud & DevOps': ['AWS (DynamoDB, S3, EC2, Lambda)', 'Docker', 'Kubernetes'],
    'AI / ML': ['TensorFlow', 'Keras', 'LangChain', 'Hugging Face', 'FAISS', 'Pandas', 'NumPy'],
    Tools: ['Git', 'Android Studio', 'Jira', 'Agile', 'Dynatrace', 'Figma', 'Vercel'],
  },
};
