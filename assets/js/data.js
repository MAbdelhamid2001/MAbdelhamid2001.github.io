/* ==========================================================================
   Portfolio content model
   Single source of truth for projects, experience, skills and credentials.
   Edit here - the UI renders itself from these objects.
   ========================================================================== */

const GH = "https://github.com/MAbdelhamid2001";

/* ---------------------------------------------------------------------------
   CONTACT FORM
   Messages are delivered straight to the inbox below via Web3Forms - the
   visitor never leaves the page and no mail app opens.

   TO ACTIVATE (takes about 30 seconds, free, no account):
     1. Go to https://web3forms.com
     2. Type in the email address that should receive the messages
     3. They email you an access key - paste it between the quotes below
   The key is meant to be public; it only ever delivers to your address.

   Cost: the free plan is permanent, not a trial - 250 messages/month,
   unlimited forms, no card. The only thing capped at 30 days is Web3Forms'
   own copy of the submissions; the email itself lands in your inbox and
   stays there. 250/month is far beyond what a portfolio form ever sees.
--------------------------------------------------------------------------- */
const CONTACT_ACCESS_KEY = "0e205802-d1b7-4b8d-afbb-840653c4017f";

/* Category metadata: label + accent hue used for the generated cover art. */
const CATEGORIES = {
  cv:  { label: "Computer Vision",   hue: 188 },
  nlp: { label: "NLP & Language",    hue: 268 },
  dsp: { label: "Signal Processing", hue: 152 },
  ds:  { label: "Data Science",      hue: 32  },
  eng: { label: "Engineering",       hue: 212 },
};

const PROJECTS = [
  {
    id: "eeg",
    title: "EEG-Based Hand Movement Recognition",
    badge: "Graduation Project &middot; A+",
    category: "dsp",
    year: 2023,
    featured: true,
    blurb:
      "A brain-computer interface that decodes six hand movements (forward, backward, left, right, up, down) from raw EEG signals - for both executed motion and imagined motion (motor imagery).",
    highlights: [
      "Full preprocessing pipeline: segmentation, normalization and artifact removal",
      "Feature extraction with Discrete Wavelet Transform, Common Spatial Patterns and statistical descriptors",
      "Benchmarked CNN, LSTM and EEGNet classifiers against the published literature",
      "Results surpassed prior work on the same public dataset",
    ],
    metrics: [
      { value: "6", label: "movement classes" },
      { value: "3", label: "architectures" },
      { value: "IEEE", label: "published" },
    ],
    stack: ["Python", "TensorFlow", "Keras", "NumPy", "SciPy", "EEGNet", "DWT", "CSP"],
    links: [
      { label: "Code", url: GH + "/Recognizing-Hand-Movements-Using-EEG-Signal-Classification", kind: "code" },
      { label: "IEEE Paper", url: "https://ieeexplore.ieee.org/document/10391145/", kind: "paper" },
    ],
  },
  {
    id: "posner",
    title: "POS &amp; Named Entity Recognition Tagger",
    badge: "Live demo",
    category: "nlp",
    year: 2025,
    featured: true,
    blurb:
      "A multi-task Bi-LSTM sequence model that performs part-of-speech tagging and named entity recognition in a single forward pass, served as an interactive web app.",
    highlights: [
      "Shared encoder with two task-specific decoding heads",
      "95% tagging accuracy across both tasks",
      "Deployed to Streamlit Cloud with live entity highlighting",
    ],
    metrics: [
      { value: "95%", label: "accuracy" },
      { value: "2", label: "tasks, one model" },
    ],
    stack: ["TensorFlow", "Keras", "Bi-LSTM", "NLTK", "Streamlit"],
    links: [
      { label: "Live App", url: "https://pos-ner-tagger--2025.streamlit.app/", kind: "live" },
      { label: "Code", url: GH + "/POS-NER-Tagger", kind: "code" },
    ],
  },
  {
    id: "plate",
    title: "Egyptian Car Plate Detection &amp; Recognition",
    badge: "93% mAP",
    category: "cv",
    year: 2025,
    featured: true,
    blurb:
      "An end-to-end ANPR system for Egyptian vehicle plates: detect the plate, track it across frames, then read bilingual Arabic-English plate text.",
    highlights: [
      "YOLOv5 detector trained on a custom Egyptian plate dataset",
      "DeepSORT multi-object tracking for stable per-vehicle identity",
      "EasyOCR and PyTesseract for Arabic-English text extraction",
    ],
    metrics: [
      { value: "93%", label: "mAP" },
      { value: "AR/EN", label: "bilingual OCR" },
    ],
    stack: ["YOLOv5", "DeepSORT", "EasyOCR", "PyTesseract", "OpenCV", "PyTorch"],
    links: [{ label: "Code", url: GH + "/Car-Plate-Detection-and-Recognition", kind: "code" }],
  },
  {
    id: "ecg",
    title: "ECG-Based Biometric Authentication",
    badge: "Biometrics",
    category: "dsp",
    year: 2023,
    featured: true,
    blurb:
      "Identity verification from the heartbeat itself - an ECG signal is filtered, segmented into beats and matched against enrolled users through a desktop interface.",
    highlights: [
      "Signal-processing front end for noise and baseline-wander removal",
      "Per-beat feature representation for user matching",
      "Packaged with a Python GUI for enrollment and verification",
    ],
    metrics: [{ value: "DSP", label: "+ deep learning" }],
    stack: ["Python", "SciPy", "Scikit-learn", "TensorFlow", "Tkinter"],
    links: [{ label: "Code", url: GH + "/Authentication-system-based-on-ECG", kind: "code" }],
  },
  {
    id: "taxi",
    title: "Taxi Service Price &amp; Ride Prediction",
    badge: "3rd Place &middot; ML Competition",
    category: "ds",
    year: 2022,
    featured: true,
    blurb:
      "A dual-objective model over a ride-hailing dataset: regress the fare and classify the ride category. Placed third in the competition.",
    highlights: [
      "95% score on fare prediction with polynomial regression",
      "90% score on ride-category classification with Random Forest",
      "Feature engineering, AdaBoost ensembling and full exploratory analysis",
    ],
    metrics: [
      { value: "95%", label: "price score" },
      { value: "90%", label: "category score" },
    ],
    stack: ["Pandas", "Scikit-learn", "Random Forest", "AdaBoost", "Seaborn"],
    links: [{ label: "Code", url: GH + "/Taxi-Service-", kind: "code" }],
  },
  {
    id: "segments",
    title: "Customer Segmentation for Mail-Order Sales",
    badge: "Unsupervised",
    category: "ds",
    year: 2022,
    featured: true,
    blurb:
      "Identifying which segments of the German population form the core customer base of a mail-order company, by comparing customer records against national demographics.",
    highlights: [
      "Large-scale cleaning and re-encoding of mixed demographic features",
      "PCA for dimensionality reduction ahead of clustering",
      "K-Means segments compared between customers and the general population",
    ],
    metrics: [{ value: "PCA", label: "+ K-Means" }],
    stack: ["Pandas", "Scikit-learn", "PCA", "K-Means", "Matplotlib"],
    links: [{ label: "Code", url: GH + "/Identify-Customers-Segments", kind: "code" }],
  },
  {
    id: "signature",
    title: "Handwritten Signature Detection",
    category: "cv",
    year: 2023,
    blurb:
      "A YOLOv5 object detector trained on a custom dataset to locate handwritten signatures inside scanned documents.",
    stack: ["YOLOv5", "PyTorch", "OpenCV"],
    links: [{ label: "Code", url: GH + "/Detecting-Person-Signature", kind: "code" }],
  },
  {
    id: "sports",
    title: "Sports Image Classification",
    category: "cv",
    year: 2023,
    blurb:
      "Transfer learning over pre-trained CNN backbones to recognize which sport is being played in an image.",
    stack: ["TensorFlow", "Transfer Learning", "Keras"],
    links: [{ label: "Code", url: GH + "/Sports-images-Classification-", kind: "code" }],
  },
  {
    id: "newsgroups",
    title: "20 Newsgroups Text Classification",
    category: "nlp",
    year: 2023,
    blurb:
      "Classifying roughly 20,000 documents into 20 topical newsgroups, comparing classical TF-IDF baselines against neural models.",
    stack: ["Scikit-learn", "NLTK", "TF-IDF", "Neural Networks"],
    links: [{ label: "Code", url: GH + "/20-Newsgroups-Classification", kind: "code" }],
  },
  {
    id: "nlpspec",
    title: "NLP Specialization Workbook",
    category: "nlp",
    year: 2025,
    blurb:
      "Implementation notebooks covering the modern NLP stack - embeddings, sequence models, attention and transformer architectures.",
    stack: ["TensorFlow", "PyTorch", "Transformers", "NLTK"],
    links: [{ label: "Code", url: GH + "/NLP-Speciality", kind: "code" }],
  },
  {
    id: "timeseries",
    title: "Time Series Forecasting",
    category: "ds",
    year: 2025,
    blurb:
      "Hands-on implementations of decomposition, stationarity testing, ARIMA-family models and deep sequence forecasting.",
    stack: ["Statsmodels", "Pandas", "ARIMA", "LSTM"],
    links: [{ label: "Code", url: GH + "/Time-series", kind: "code" }],
  },
  {
    id: "unsup",
    title: "Advanced Unsupervised Learning",
    category: "ds",
    year: 2025,
    blurb:
      "A survey implementation of clustering and dimensionality-reduction techniques - K-Means, hierarchical, DBSCAN, PCA and manifold methods.",
    stack: ["Scikit-learn", "PCA", "DBSCAN", "t-SNE"],
    links: [{ label: "Code", url: GH + "/Advanced-Unsupervised-Learning", kind: "code" }],
  },
  {
    id: "classification",
    title: "Advanced Classification Techniques",
    category: "ds",
    year: 2025,
    blurb:
      "Full exploratory analysis, feature engineering and model comparison on the Titanic dataset, from logistic regression through gradient-boosted ensembles.",
    stack: ["Pandas", "Scikit-learn", "Ensembles", "Seaborn"],
    links: [{ label: "Code", url: GH + "/Advanced-Classification-Techniques", kind: "code" }],
  },
  {
    id: "scraper",
    title: "LinkedIn Job Data Scraper",
    category: "eng",
    year: 2025,
    blurb:
      "An automated crawler that extracts and structures job postings for downstream analysis - started during the Machinfy internship and extended since.",
    stack: ["Selenium", "BeautifulSoup", "Pandas"],
    links: [{ label: "Code", url: GH + "/Linkedin-Scraping-BeautifulSoup-Selenium", kind: "code" }],
  },
  {
    id: "nnscratch",
    title: "Neural Network from Scratch",
    category: "eng",
    year: 2022,
    blurb:
      "A deep neural network implemented in pure Python and NumPy - forward pass, backpropagation and optimizers, no frameworks.",
    stack: ["Python", "NumPy", "Backpropagation"],
    links: [{ label: "Code", url: GH + "/Neural-Network", kind: "code" }],
  },
  {
    id: "puzzle",
    title: "8-Puzzle Solver",
    category: "eng",
    year: 2024,
    blurb:
      "Classical AI search applied to the N-puzzle: BFS, DFS and A* with admissible heuristics, compared on nodes expanded and runtime.",
    stack: ["Python", "A*", "BFS", "Heuristics"],
    links: [{ label: "Code", url: GH + "/8-Puzzle-Solver", kind: "code" }],
  },
  {
    id: "dsa",
    title: "Data Structures &amp; Algorithms in Python",
    category: "eng",
    year: 2024,
    blurb:
      "Reference implementations of linear and non-linear structures, trees, graphs and the classical sorting algorithms.",
    stack: ["Python", "Algorithms", "Graphs", "Trees"],
    links: [{ label: "Code", url: GH + "/Data-Structures-and-Algorithms-In-Python", kind: "code" }],
  },
  {
    id: "flowers",
    title: "Flower Image Classifier CLI",
    category: "cv",
    year: 2022,
    blurb:
      "A MobileNet-based classifier for 102 flower species, wrapped in a command-line application for batch inference.",
    stack: ["TensorFlow", "MobileNet", "Transfer Learning"],
    links: [{ label: "Code", url: GH + "/Image-Classifier", kind: "code" }],
  },
  {
    id: "charity",
    title: "Finding Donors for CharityML",
    category: "ds",
    year: 2022,
    blurb:
      "Supervised learning over census data to identify the individuals most likely to donate, optimizing for precision under class imbalance.",
    stack: ["Scikit-learn", "Pandas", "Ensemble Methods"],
    links: [{ label: "Code", url: GH + "/-Finding-Donors-for-CharityML", kind: "code" }],
  },
  {
    id: "mnist",
    title: "Handwritten Digit Recognition",
    category: "cv",
    year: 2022,
    blurb:
      "A convolutional classifier for MNIST digits, covering augmentation, regularization and error analysis.",
    stack: ["TensorFlow", "CNN", "Keras"],
    links: [{ label: "Code", url: GH + "/Handwritten-Digit-Recognition", kind: "code" }],
  },
  {
    id: "fashion",
    title: "Fashion Image Classification",
    category: "cv",
    year: 2022,
    blurb: "A compact CNN trained on Fashion-MNIST to classify ten garment categories.",
    stack: ["Keras", "CNN", "TensorFlow"],
    links: [{ label: "Code", url: GH + "/Classify-fashion-images", kind: "code" }],
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Software House Solutions Co.",
    place: "Cairo, Egypt",
    period: "Jan 2026 &ndash; Present",
    current: true,
    points: [
      "Design, build and maintain multiple production-grade Django ERP systems for the jewelry and gemstone industry, serving retail shops, factories and gemstone businesses.",
      "Built backend modules for inventory tracking, invoice generation and automated label printing.",
      "Extended the product ecosystem with an Android warehouse-stocktaking app using barcode and RFID scanning, using AI-assisted development tools to accelerate delivery.",
      "Resolved production issues and feature requests tracked in Jira; owned testing, debugging and deployment across environments, improving reliability and user satisfaction.",
    ],
    stack: ["Django", "PostgreSQL", "REST APIs", "Android", "Jira", "Docker"],
  },
  {
    role: "Freelance AI Engineer",
    org: "Upwork",
    place: "Remote",
    period: "Mar 2023 &ndash; Dec 2025",
    points: [
      "Delivered end-to-end AI and data science engagements: image and text classification, model deployment and interactive analytics.",
      "Shipped production apps with FastAPI, Flask and Streamlit, plus dashboards in Tableau, Dash and Plotly.",
      "Worked directly with international clients to turn business problems into predictive-analytics and automation solutions.",
    ],
    stack: ["FastAPI", "Flask", "Streamlit", "Plotly", "Dash", "Tableau"],
  },
  {
    role: "Data Science Intern",
    org: "Machinfy",
    place: "Cairo, Egypt",
    period: "Jul 2022 &ndash; Sep 2022",
    points: [
      "Built a web crawler for automated job-data extraction and processing using Selenium and BeautifulSoup.",
      "Cleaned and structured the scraped corpus for downstream modeling.",
    ],
    stack: ["Selenium", "BeautifulSoup", "Pandas"],
  },
];

const SKILLS = [
  { group: "Languages",            icon: "code",     items: ["Python", "C++", "Java", "SQL", "JavaScript"] },
  { group: "AI &amp; Deep Learning",   icon: "brain",    items: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "OpenCV", "NLTK", "YOLOv5", "Transformers"] },
  { group: "Data &amp; Visualization", icon: "chart",    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Dash", "Tableau"] },
  { group: "Backend &amp; Automation", icon: "server",   items: ["Django", "FastAPI", "Flask", "REST APIs", "N8N", "Selenium", "BeautifulSoup"] },
  { group: "MLOps &amp; DevOps",       icon: "cloud",    items: ["Docker", "Kubernetes", "MLflow", "Apache Airflow", "GitHub Actions", "Terraform", "CI/CD"] },
  { group: "Databases &amp; Tools",    icon: "database", items: ["PostgreSQL", "SQL", "Git", "GitHub", "Jira", "Linux"] },
];

const PUBLICATIONS = [
  {
    title: "Recognizing Hand Movements using EEG-Signal Classification",
    venue: "11th IEEE International Conference on Intelligent Computing and Information Systems (ICICIS)",
    year: "2023",
    note: "Outperformed the results reported in prior literature on the same EEG dataset.",
    links: [
      { label: "Read on IEEE Xplore", url: "https://ieeexplore.ieee.org/document/10391145/", kind: "live" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=2vy221oAAAAJ&hl=en", kind: "paper" },
    ],
  },
];

const EDUCATION = {
  degree: "B.Sc. Computer Science",
  school: "Ain Shams University &mdash; Faculty of Computer and Information Sciences",
  place: "Cairo, Egypt",
  period: "Sep 2019 &ndash; Jul 2023",
  gpa: "2.9",
  coursework: [
    "Machine Learning", "Deep Learning", "Computer Vision", "NLP",
    "Artificial Intelligence", "Digital Signal Processing",
    "Linear Algebra", "Statistics", "OOP", "Algorithms",
  ],
};

const CERTIFICATIONS = [
  { name: "Generative AI with AWS",            issuer: "Amazon Web Services" },
  { name: "Deep Learning Specialization",      issuer: "DeepLearning.AI" },
  { name: "ML with TensorFlow Nanodegree",     issuer: "Udacity &middot; Bertelsmann Scholarship" },
  { name: "HCIA-AI",                           issuer: "Huawei" },
  { name: "AWS Machine Learning Foundations",  issuer: "Amazon Web Services" },
  { name: "Machine Learning",                  issuer: "Stanford University" },
  { name: "Applied Data Science",              issuer: "WorldQuant University" },
];

const PROFILE = {
  name: "Mohamed Mahmoud Abdelhamid",
  short: "Mohamed Abdelhamid",
  title: "Full-Stack AI Engineer",
  roles: [
    "Full-Stack AI Engineer",
    "Machine Learning Engineer",
    "Django Backend Developer",
    "Computer Vision &amp; NLP",
  ],
  location: "Cairo, Egypt",
  email: "mhmedmhmod184@gmail.com",
  phone: "+20 115 413 7084",
  links: {
    github: GH,
    linkedin: "https://www.linkedin.com/in/mohamed-m-abdelhamid-83984b209/",
    scholar: "https://scholar.google.com/citations?user=2vy221oAAAAJ&hl=en",
    cv: "assets/cv/Mohamed_Abdelhamid_CV.pdf",
  },
  stats: [
    { value: 20, suffix: "+", label: "Projects shipped" },
    { value: 3,  suffix: "+", label: "Years building AI" },
    { value: 1,  suffix: "",  label: "IEEE publication" },
    { value: 7,  suffix: "",  label: "Certifications" },
  ],
};
