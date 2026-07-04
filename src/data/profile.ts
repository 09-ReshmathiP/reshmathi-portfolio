import type { Profile } from "../types/profile";

export const profile: Profile = {
  name: "Reshmathi P",
  role: "Computer Science Engineer — Data Science & AI",
  tagline: "Turning data into decisions, one model at a time.",
  profileSummary:
    "Enthusiastic B.Tech graduate in Computer Science Engineering, specializing in Data Science and Artificial Intelligence, seeking a Graduate Engineering Trainee position. Strong foundation in data analytics, machine learning, and AI concepts, with a passion for applying technical knowledge to real-world problems. A quick learner and collaborative team player, eager to contribute to innovative projects while gaining hands-on industry experience and continuous professional growth.",
  contact: {
    phone: "9043273026",
    email: "reshmathip@gmail.com",
    linkedin: "https://www.linkedin.com/in/reshmathi36",
    github: "https://github.com/09-ReshmathiP",
    location: "Chennai, Tamil Nadu, India",
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "C (Basics)", "C++ (Basics)"],
    },
    {
      category: "Front-End Development",
      items: ["HTML", "CSS", "JavaScript"],
    },
    {
      category: "BI Tools",
      items: ["IBM Cognos Analytics"],
    },
    {
      category: "Version Control",
      items: ["Git", "GitHub"],
    },
    {
      category: "Cloud",
      items: ["AWS EC2", "AWS Snapshots", "EBS Volume Storage"],
    },
    {
      category: "Soft Skills",
      items: ["Problem-Solving", "Teamwork", "Communication"],
    },
  ],
  education: [
    {
      id: "edu-btech",
      degree: "B.Tech, Computer Science Engineering (Data Science & AI)",
      institution: "Dr. MGR Educational and Research Institute, Chennai",
      period: "2023 – 2027",
      detail: "Current CGPA: 9.07",
    },
    {
      id: "edu-12th",
      degree: "12th Standard",
      institution: "Vimala Matriculation Higher Secondary School",
      period: "",
      detail: "Percentage: 88%",
    },
  ],
  projects: [
    {
      id: "proj-city-weather",
      title: "City Weather Data — BI Analysis",
      year: "2025",
      summary:
        "Business intelligence analysis on a retail dataset: built a data module in IBM Cognos Analytics and a Crosstab report with filtering, grouping, and sorting to surface actionable insights.",
      tags: ["Cognos Analytics", "BI", "Data Analysis"],
      problem:
        "Raw retail data sitting in flat tables is hard for stakeholders to interpret without a way to filter, group, and cross-reference it quickly.",
      solution:
        "Built a structured data module in IBM Cognos Analytics, then designed a Crosstab report that lets users filter, group, and sort the dataset interactively to surface actionable insights.",
      architecture: [
        "Source dataset imported and modeled as a Cognos data module",
        "Crosstab report layer for cross-referencing dimensions and measures",
        "Filtering, grouping, and sorting configured for self-service exploration",
      ],
      challenges: [
        "Structuring the data module so the same fields could support several different groupings",
        "Balancing report detail against readability for non-technical stakeholders",
      ],
      futureImprovements: [
        "Add drill-through detail reports for individual segments",
        "Automate refresh of the underlying dataset on a schedule",
      ],
      accent: "signal",
    },
    {
      id: "proj-captcha",
      title: "CAPTCHA Generator",
      year: "2024",
      summary:
        "Designed and implemented a CAPTCHA generator in Java that produces random, human-readable CAPTCHA images.",
      tags: ["Java"],
      problem:
        "Forms and login flows need a lightweight way to distinguish human users from bots without relying on a third-party service.",
      solution:
        "Built a Java-based generator that renders randomized, human-readable CAPTCHA images on demand, combining distorted text with noise to resist simple OCR.",
      architecture: [
        "Random string generator for CAPTCHA text",
        "Image rendering layer applying distortion and noise",
        "Verification check comparing user input against the generated string",
      ],
      challenges: [
        "Keeping the CAPTCHA readable for humans while still resistant to basic OCR",
        "Generating enough visual randomness without slowing image generation",
      ],
      futureImprovements: [
        "Add an audio CAPTCHA option for accessibility",
        "Package it as a reusable library/API for other projects",
      ],
      accent: "amber",
    },
    {
      id: "proj-scream-detection",
      title: "Human Scream Detection & Analysis",
      year: "2024",
      summary:
        "Python-based system for real-time detection and analysis of human screams, aimed at supporting crime-rate monitoring.",
      tags: ["Python", "Audio Processing"],
      problem:
        "Manually monitoring public safety audio feeds for distress signals doesn't scale, and delayed detection can delay response.",
      solution:
        "Implemented a Python-based pipeline that processes audio in real time, analyzing signal characteristics to detect patterns consistent with human screams and flag them for review.",
      architecture: [
        "Real-time audio input capture",
        "Signal processing / feature extraction stage",
        "Classification logic to flag scream-like patterns",
      ],
      challenges: [
        "Reducing false positives from other loud, non-distress sounds",
        "Processing audio with low enough latency for real-time use",
      ],
      futureImprovements: [
        "Train a dedicated ML classifier on a labeled audio dataset for higher accuracy",
        "Add automatic alerting/notification integration",
      ],
      accent: "synapse",
    },
    {
      id: "proj-driver-site",
      title: "Acting Driver Service Website",
      year: "2026",
      summary:
        "Responsive website for an acting driver service showcasing profiles, booking details, and contact features, built for accessibility and clarity.",
      tags: ["HTML", "CSS", "JavaScript"],
      problem:
        "A local acting-driver service needed an accessible online presence where customers could view driver profiles and booking details without calling in.",
      solution:
        "Built a responsive, accessible website with HTML, CSS, and JavaScript covering driver profiles, booking details, and contact features designed for clarity on any device.",
      architecture: [
        "Static responsive front end (HTML/CSS/JS)",
        "Profile and booking-info pages",
        "Contact section for direct customer reach-out",
      ],
      challenges: [
        "Keeping the layout usable across a wide range of screen sizes",
        "Presenting booking information clearly without a full backend",
      ],
      futureImprovements: [
        "Connect a real booking backend with live availability",
        "Add customer reviews and ratings",
      ],
      accent: "signal",
    },
    {
      id: "proj-ticket-booking",
      title: "Ticket Booking System",
      year: "2026",
      summary:
        "React-based ticket booking system with Home, Book Ticket, and Track Booking modules for dynamic, real-time booking management.",
      tags: ["React"],
      problem:
        "Ticket booking flows need to feel instant and let users track their booking status without page reloads.",
      solution:
        "Built a React single-page app with Home, Book Ticket, and Track Booking modules, using component state to drive dynamic, real-time booking interactions.",
      architecture: [
        "React component tree: Home, Book Ticket, Track Booking",
        "Shared state layer for booking data across modules",
        "Responsive UI for booking and tracking on any device",
      ],
      challenges: [
        "Keeping booking state consistent across the Book and Track modules",
        "Designing a tracking view that's clear with minimal booking data",
      ],
      futureImprovements: [
        "Persist bookings to a real backend/database",
        "Add payment integration and booking confirmation emails",
      ],
      accent: "amber",
    },
    {
      id: "proj-smart-charging",
      title: "Smart Charging Alert App",
      year: "2026",
      summary:
        "Monitors battery charging status and sends intelligent alerts to prevent overcharging, with real-time notifications and battery analytics.",
      tags: ["Mobile", "Battery Analytics"],
      problem:
        "Leaving devices plugged in past a full charge degrades battery health over time, and most devices don't warn users clearly.",
      solution:
        "Built an app that monitors charging status in real time and sends intelligent alerts to prevent overcharging, paired with battery analytics for visibility into charging habits.",
      architecture: [
        "Battery status monitoring layer",
        "Alert/notification engine triggered on charge thresholds",
        "Analytics view summarizing charging history",
      ],
      challenges: [
        "Reading battery status reliably across different device conditions",
        "Tuning alert thresholds so they're helpful, not annoying",
      ],
      futureImprovements: [
        "Add personalized charging recommendations based on usage patterns",
        "Support smart-plug integration to auto-stop charging",
      ],
      accent: "synapse",
    },
    {
      id: "proj-smart-alarm",
      title: "Smart AI-Based Alarm App",
      year: "2026",
      summary:
        "Alarm app with puzzle challenges, photo verification, and ghost mode to prevent oversleeping, featuring customizable alarms and interactive tasks.",
      tags: ["Mobile", "AI"],
      problem:
        "Traditional alarms are easy to dismiss half-asleep, leading to oversleeping even when the alarm did its job.",
      solution:
        "Built an alarm app that requires solving a puzzle or completing photo verification to dismiss the alarm, plus a ghost mode for extra difficulty, alongside fully customizable alarm settings.",
      architecture: [
        "Alarm scheduling engine",
        "Interactive dismissal tasks: puzzle challenge, photo verification, ghost mode",
        "Customization layer for alarm settings",
      ],
      challenges: [
        "Making dismissal tasks hard enough to wake someone up without being frustrating",
        "Handling photo verification reliably in low-light morning conditions",
      ],
      futureImprovements: [
        "Add sleep-cycle-aware smart wake timing",
        "Introduce social/accountability features to track wake-up streaks",
      ],
      accent: "signal",
    },
  ],
  internships: [
    {
      id: "intern-cognifyz",
      role: "Web Development Intern",
      organization: "Cognifyz Technologies",
      summary:
        "Developed 5+ responsive web pages using HTML, CSS, and JavaScript, improving user accessibility and reducing page load time by 30%.",
      responsibilities: [
        "Built 5+ responsive web pages from scratch using HTML, CSS, and JavaScript",
        "Improved page load time by 30% through front-end optimization",
        "Focused on accessibility improvements across pages",
      ],
      skillsLearned: [
        "Responsive web design",
        "Front-end performance optimization",
        "Cross-browser accessibility practices",
      ],
    },
    {
      id: "intern-codebind",
      role: "Python with Data Science Intern",
      organization: "Code Bind Technologies",
      summary:
        "Completed a Python for Data Science internship, gaining hands-on experience in data analysis and machine learning fundamentals.",
      responsibilities: [
        "Completed structured coursework and hands-on exercises in Python for data science",
        "Practiced data analysis workflows on real datasets",
        "Applied machine learning fundamentals in guided projects",
      ],
      skillsLearned: [
        "Python for data analysis",
        "Machine learning fundamentals",
        "Data-driven problem solving",
      ],
    },
  ],
  certificates: [
    { id: "cert-ibm-java", title: "IBM Java Certificate", issuer: "IBM", year: "2024" },
    { id: "cert-aws", title: "Cloud Computing Training — Advantage Pro (60 hours)", issuer: "AWS" },
    { id: "cert-nptel", title: "Mobile Virtual Reality & AI", issuer: "NPTEL" },
    { id: "cert-infosys-ai", title: "Introduction to Artificial Intelligence", issuer: "Infosys Springboard" },
    { id: "cert-infosys-python", title: "Basics of Python", issuer: "Infosys Springboard" },
    { id: "cert-ibm-cloud", title: "Introduction to Cloud", issuer: "IBM" },
    { id: "cert-ibm-bi", title: "Business Intelligence", issuer: "IBM" },
    { id: "cert-web-dev-intern", title: "Web Development Internship", issuer: "Cognifyz Technologies" },
    { id: "cert-py-ds-intern", title: "Python with Data Science Internship", issuer: "Code Bind Technologies" },
    { id: "cert-face-detection", title: "Project Completion — Python with Data Science (Face Detection)", issuer: "Code Bind Technologies" },
    { id: "cert-ai-workshop", title: "AI Workshop", issuer: "Workshop" },
    { id: "cert-ai-tools-workshop", title: "AI & AI Tools Workshop", issuer: "Workshop" },
    { id: "cert-inplant", title: "Inplant Training — Python with Data Science", issuer: "Code Bind Technologies" },
    { id: "cert-corporate-test", title: "Corporate Training Test", issuer: "Code Bind Technologies" },
  ],
};
