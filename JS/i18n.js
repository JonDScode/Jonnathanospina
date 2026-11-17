/* ══════════════════════════════════════════════════════════
   i18n.js — Language switcher
   Supported: es | en | pt | fr
   Usage: add data-i18n="key" to any element.
   Lang persisted in localStorage.
══════════════════════════════════════════════════════════ */

const TRANSLATIONS = {

  /* ── NAV ── */
  'nav.home':     { es:'Inicio',    en:'Home',      pt:'Início',   fr:'Accueil'  },
  'nav.cv':       { es:'CV',        en:'CV',         pt:'CV',       fr:'CV'       },
  'nav.projects': { es:'Proyectos', en:'Projects',   pt:'Projetos', fr:'Projets'  },
  'nav.blog':     { es:'Blog',      en:'Blog',       pt:'Blog',     fr:'Blog'     },

  /* ── INDEX — hero ── */
  'index.subtitle': {
    es: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agentes &amp; Pipelines',
    en: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agents &amp; Pipelines',
    pt: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agentes &amp; Pipelines',
    fr: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agents &amp; Pipelines',
  },
  'index.cta.projects': { es:'Ver proyectos', en:'View projects', pt:'Ver projetos', fr:'Voir les projets' },
  'index.cta.cv':       { es:'Currículum',    en:'Curriculum',    pt:'Currículo',    fr:'Curriculum'       },

  /* ── INDEX — cards ── */
  'index.card1.title': { es:'AI Engineering', en:'AI Engineering', pt:'AI Engineering', fr:'Ingénierie IA' },
  'index.card1.desc': {
    es: 'Sistemas basados en LLMs y agentes con una frontera clara entre lo determinista y lo generado. Evaluación medida y despliegue en producción con Docker, CI/CD y Azure.',
    en: 'LLM and agent systems with a clear boundary between what is deterministic and what is generated. Measured evaluation and production deployment with Docker, CI/CD and Azure.',
    pt: 'Sistemas baseados em LLMs e agentes com uma fronteira clara entre o determinístico e o gerado. Avaliação medida e implantação em produção com Docker, CI/CD e Azure.',
    fr: 'Systèmes à base de LLMs et d’agents avec une frontière claire entre le déterministe et le généré. Évaluation mesurée et déploiement en production avec Docker, CI/CD et Azure.',
  },
  'index.card2.title': { es:'Data Engineering', en:'Data Engineering', pt:'Data Engineering', fr:'Ingénierie Data' },
  'index.card2.desc': {
    es: 'Pipelines de datos y lakehouse: ingesta, transformación y calidad con Python y SQL, tablas Delta, MLflow y Unity Catalog en Databricks. Modelos de ML industrializados con trazabilidad.',
    en: 'Data pipelines and lakehouse: ingestion, transformation and quality with Python and SQL, Delta tables, MLflow and Unity Catalog on Databricks. ML models industrialized with traceability.',
    pt: 'Pipelines de dados e lakehouse: ingestão, transformação e qualidade com Python e SQL, tabelas Delta, MLflow e Unity Catalog no Databricks. Modelos de ML industrializados com rastreabilidade.',
    fr: 'Pipelines de données et lakehouse : ingestion, transformation et qualité avec Python et SQL, tables Delta, MLflow et Unity Catalog sur Databricks. Modèles de ML industrialisés avec traçabilité.',
  },
  'index.card3.title': { es:'GenAI &amp; Agentes', en:'GenAI &amp; Agents', pt:'GenAI &amp; Agentes', fr:'GenAI &amp; Agents' },
  'index.card3.desc': {
    es: 'Arquitecturas RAG, sistemas multi-agente con LangChain / LangGraph, embeddings y tool calling. Soluciones de IA generativa en producción con Azure AI y Claude.',
    en: 'RAG architectures, multi-agent systems with LangChain / LangGraph, embeddings and tool calling. Generative AI solutions in production with Azure AI and Claude.',
    pt: 'Arquiteturas RAG, sistemas multi-agente com LangChain / LangGraph, embeddings e tool calling. Soluções de IA generativa em produção com Azure AI e Claude.',
    fr: 'Architectures RAG, systèmes multi-agents avec LangChain / LangGraph, embeddings et tool calling. Solutions d\'IA générative en production avec Azure AI et Claude.',
  },

  /* ── INDEX — footer ── */
  'index.footer': {
    es: '© 2026 Jonnathan Ospina &nbsp;·&nbsp; Construyendo el futuro, un algoritmo a la vez',
    en: '© 2026 Jonnathan Ospina &nbsp;·&nbsp; Building the future, one algorithm at a time',
    pt: '© 2026 Jonnathan Ospina &nbsp;·&nbsp; Construindo o futuro, um algoritmo de cada vez',
    fr: '© 2026 Jonnathan Ospina &nbsp;·&nbsp; Construire l\'avenir, un algorithme à la fois',
  },

  /* ── CV — header ── */
  'cv.label':    { es:'// curriculum_vitae', en:'// curriculum_vitae', pt:'// curriculum_vitae', fr:'// curriculum_vitae' },
  'cv.subtitle': {
    es: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agentes &amp; Pipelines',
    en: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agents &amp; Pipelines',
    pt: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agentes &amp; Pipelines',
    fr: 'Data &amp; AI Engineer &nbsp;·&nbsp; GenAI, Agents &amp; Pipelines',
  },
  'cv.location':  { es:'Madrid, España', en:'Madrid, Spain', pt:'Madrid, Espanha', fr:'Madrid, Espagne' },
  'cv.download':  { es:'Descargar PDF',  en:'Download PDF',  pt:'Baixar PDF',      fr:'Télécharger PDF' },

  /* ── CV — section headings ── */
  'cv.s.profile':  { es:'// perfil_profesional',                  en:'// professional_profile',               pt:'// perfil_profissional',                  fr:'// profil_professionnel'                },
  'cv.s.skills':   { es:'// habilidades_técnicas',                en:'// technical_skills',                   pt:'// competências_técnicas',                fr:'// compétences_techniques'              },
  'cv.s.exp':      { es:'// experiencia_profesional',             en:'// professional_experience',            pt:'// experiência_profissional',             fr:'// expérience_professionnelle'          },
  'cv.s.edu':      { es:'// formación_académica_y_certificaciones', en:'// education_and_certifications',    pt:'// formação_académica_e_certificações',   fr:'// formation_et_certifications'         },
  'cv.s.lang':     { es:'// idiomas',                             en:'// languages',                          pt:'// idiomas',                              fr:'// langues'                             },

  /* ── CV — summary ── */
  'cv.summary': {
    es: 'Ingeniero de Datos e IA: construyo sistemas de IA generativa y agentes, y los pipelines de datos y el MLOps que los llevan a producción. Certificado Azure AI Engineer, con experiencia en Databricks, Docker y CI/CD. Enfoque de IA responsable: explicabilidad, privacidad medida y trazabilidad.',
    en: 'Data &amp; AI Engineer: I build generative AI and agent systems, plus the data pipelines and MLOps that take them to production. Azure AI Engineer certified, with hands-on Databricks, Docker and CI/CD. Responsible-AI focus: explainability, measured privacy and traceability.',
    pt: 'Engenheiro de Dados e IA: construo sistemas de IA generativa e agentes, e os pipelines de dados e o MLOps que os levam a produção. Certificado Azure AI Engineer, com experiência em Databricks, Docker e CI/CD. Foco em IA responsável: explicabilidade, privacidade medida e rastreabilidade.',
    fr: 'Ingénieur Data &amp; IA : je construis des systèmes d\'IA générative et d\'agents, ainsi que les pipelines de données et le MLOps qui les mènent en production. Certifié Azure AI Engineer, avec de l\'expérience en Databricks, Docker et CI/CD. Approche d\'IA responsable : explicabilité, confidentialité mesurée et traçabilité.',
  },

  /* ── CV — skill categories ── */
  'cv.sk.lang':  { es:'Lenguajes &amp; Herramientas', en:'Languages &amp; Tools',   pt:'Linguagens &amp; Ferramentas', fr:'Langages &amp; Outils'    },
  'cv.sk.genai': { es:'IA Generativa',                en:'Generative AI',            pt:'IA Generativa',                fr:'IA Générative'            },
  'cv.sk.azure': { es:'Cloud &amp; Data — Azure',     en:'Cloud &amp; Data — Azure', pt:'Cloud &amp; Data — Azure',     fr:'Cloud &amp; Data — Azure' },
  'cv.sk.ml':    { es:'ML &amp; Data Science',        en:'ML &amp; Data Science',    pt:'ML &amp; Data Science',        fr:'ML &amp; Data Science'    },

  /* ── CV — experience ── */
  'cv.exp1.title':   { es:'Científico de Datos — Especialista en IA', en:'Data Scientist — AI Specialist',           pt:'Cientista de Dados — Especialista em IA',  fr:'Data Scientist — Spécialiste IA'          },
  'cv.exp1.company': { es:'Factoría F5 &nbsp;·&nbsp; Madrid',          en:'Factoría F5 &nbsp;·&nbsp; Madrid',          pt:'Factoría F5 &nbsp;·&nbsp; Madrid',          fr:'Factoría F5 &nbsp;·&nbsp; Madrid'          },
  'cv.exp1.period':  { es:'2023 - Presente', en:'2023 - Present', pt:'2023 - Presente', fr:'2023 - Présent' },
  'cv.exp1.b1': {
    es: '<strong>Desarrollo de Soluciones GenAI:</strong> Diseño y validación de arquitecturas basadas en LLMs y Deep Learning para proyectos de impacto social y eficiencia operativa.',
    en: '<strong>GenAI Solution Development:</strong> Design and validation of LLM and Deep Learning architectures for social impact and operational efficiency projects.',
    pt: '<strong>Desenvolvimento de Soluções GenAI:</strong> Design e validação de arquiteturas baseadas em LLMs e Deep Learning para projetos de impacto social e eficiência operacional.',
    fr: '<strong>Développement de Solutions GenAI :</strong> Conception et validation d\'architectures basées sur des LLMs et le Deep Learning pour des projets d\'impact social et d\'efficacité opérationnelle.',
  },
  'cv.exp1.b2': {
    es: '<strong>Implementación de Pipelines:</strong> Construcción de flujos de trabajo para la ingesta y transformación de datos, asegurando la calidad y trazabilidad de los modelos.',
    en: '<strong>Pipeline Implementation:</strong> Building workflows for data ingestion and transformation, ensuring model quality and traceability.',
    pt: '<strong>Implementação de Pipelines:</strong> Construção de fluxos de trabalho para ingestão e transformação de dados, garantindo qualidade e rastreabilidade dos modelos.',
    fr: '<strong>Implémentation de Pipelines :</strong> Construction de flux de travail pour l\'ingestion et la transformation des données, garantissant la qualité et la traçabilité des modèles.',
  },
  'cv.exp1.b3': {
    es: '<strong>Formación y Consultoría:</strong> Trainer de IA Generativa e integración de APIs en el Bootcamp de IA School; consultoría con administraciones públicas (Ayuntamientos, UE) definiendo métricas de éxito.',
    en: '<strong>Training &amp; Consulting:</strong> Generative AI and API integration trainer at the IA School Bootcamp; consulting for public administrations (City Councils, EU) defining success metrics.',
    pt: '<strong>Formação e Consultoria:</strong> Trainer de IA Generativa e integração de APIs no Bootcamp da IA School; consultoria para administrações públicas (Câmaras Municipais, UE) definindo métricas de sucesso.',
    fr: '<strong>Formation et Conseil :</strong> Formateur en IA Générative et intégration d’APIs au Bootcamp de l’IA School ; conseil auprès d’administrations publiques (Mairies, UE) pour définir des métriques de succès.',
  },

  'cv.exp2.title': { es:'Desarrollador de Software &amp; Productos de IA', en:'Software &amp; AI Product Developer', pt:'Desenvolvedor de Software &amp; Produtos de IA', fr:'Développeur Logiciel &amp; Produits IA' },
  'cv.exp2.company': { es:'Freelance — Autónomo &nbsp;·&nbsp; Madrid', en:'Freelance — Self-employed &nbsp;·&nbsp; Madrid', pt:'Freelance — Autónomo &nbsp;·&nbsp; Madrid', fr:'Freelance — Indépendant &nbsp;·&nbsp; Madrid' },
  'cv.exp2.b1': {
    es: '<strong>Productos GenAI propios:</strong> Desarrollo y opero productos GenAI en producción: SaaS multi-tenant de reseñas por voz (FastAPI, Whisper y Llama vía Groq, Docker) y tutor de idiomas agéntico construido sobre Claude.',
    en: '<strong>Own GenAI products:</strong> I build and run GenAI products in production: a multi-tenant voice-review SaaS (FastAPI, Whisper and Llama via Groq, Docker) and an agentic language tutor built on Claude.',
    pt: '<strong>Produtos GenAI próprios:</strong> Desenvolvo e opero produtos GenAI em produção: SaaS multi-tenant de reviews por voz (FastAPI, Whisper e Llama via Groq, Docker) e tutor de idiomas agêntico construído sobre Claude.',
    fr: '<strong>Produits GenAI propres :</strong> Je développe et exploite des produits GenAI en production : SaaS multi-tenant d’avis vocaux (FastAPI, Whisper et Llama via Groq, Docker) et tuteur de langues agentique construit sur Claude.',
  },
  'cv.exp2.b2': {
    es: '<strong>Desarrollo web:</strong> Sitios e-commerce y aplicaciones web para clientes, con enfoque frontend.',
    en: '<strong>Web development:</strong> E-commerce sites and web applications for clients, with a frontend focus.',
    pt: '<strong>Desenvolvimento web:</strong> Sites e-commerce e aplicações web para clientes, com foco em frontend.',
    fr: '<strong>Développement web :</strong> Sites e-commerce et applications web pour des clients, orientés frontend.',
  },

  'cv.exp3.title':   { es:'Profesor Universitario', en:'University Professor',    pt:'Professor Universitário', fr:'Professeur Universitaire' },
  'cv.exp3.company': {
    es: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colombia',
    en: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colombia',
    pt: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colômbia',
    fr: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colombie',
  },
  'cv.exp3.b1': { es:'<strong>Docencia:</strong> Mercadeo y legislación.', en:'<strong>Teaching:</strong> Marketing and legislation.', pt:'<strong>Docência:</strong> Marketing e legislação.', fr:'<strong>Enseignement :</strong> Marketing et législation.' },

  /* ── CV — education ── */
  'cv.edu.master.title':   { es:'Máster en Inteligencia Artificial',                  en:'Master\'s in Artificial Intelligence',              pt:'Mestrado em Inteligência Artificial',              fr:'Master en Intelligence Artificielle'             },
  'cv.edu.grado.title':    { es:'Grado en Comercio Internacional',                    en:'Degree in International Trade',                    pt:'Licenciatura em Comércio Internacional',           fr:'Licence en Commerce International'               },
  'cv.edu.de.title':       { es:'Curso Universitario Avanzado en Data Engineering',   en:'Advanced University Course in Data Engineering',   pt:'Curso Universitário Avançado em Data Engineering', fr:'Cours Universitaire Avancé en Data Engineering'  },
  'cv.edu.ai102.title': { es:'Azure AI Engineer Associate (AI-102)', en:'Azure AI Engineer Associate (AI-102)', pt:'Azure AI Engineer Associate (AI-102)', fr:'Azure AI Engineer Associate (AI-102)' },
  'cv.edu.aifund.title':   { es:'Azure AI Fundamentals',                              en:'Azure AI Fundamentals',                            pt:'Azure AI Fundamentals',                           fr:'Azure AI Fundamentals'                           },
  'cv.edu.bootcamp.title': { es:'Bootcamp en Inteligencia Artificial',                en:'Artificial Intelligence Bootcamp',                 pt:'Bootcamp em Inteligência Artificial',             fr:'Bootcamp en Intelligence Artificielle'           },
  'cv.edu.java.title':     { es:'Desarrollo de Software con Java',                    en:'Software Development with Java',                   pt:'Desenvolvimento de Software com Java',            fr:'Développement Logiciel avec Java'                },
  'cv.edu.web.title':      { es:'Técnico en Desarrollo Web',                          en:'Web Development Technician',                      pt:'Técnico em Desenvolvimento Web',                  fr:'Technicien en Développement Web'                 },
  'cv.edu.cert':           { es:'Certificación', en:'Certification', pt:'Certificação', fr:'Certification' },
  'cv.edu.degree':         { es:'Titulación',    en:'Degree',        pt:'Titulação',    fr:'Diplôme'        },

  /* ── CV — languages ── */
  'cv.lang.es':       { es:'Español',   en:'Spanish',    pt:'Espanhol',  fr:'Espagnol'  },
  'cv.lang.es.level': { es:'Nativo',    en:'Native',     pt:'Nativo',    fr:'Natif'     },
  'cv.lang.en':       { es:'Inglés',    en:'English',    pt:'Inglês',    fr:'Anglais'   },
  'cv.lang.en.level': { es:'Avanzado',  en:'Advanced',   pt:'Avançado',  fr:'Avancé'    },
  'cv.lang.pt':       { es:'Portugués', en:'Portuguese', pt:'Português', fr:'Portugais' },
  'cv.lang.pt.level': { es:'Intermedio',en:'Intermediate',pt:'Intermédio',fr:'Intermédiaire' },

  /* ── PROJECTS — header ── */
  'projects.label':    { es:'// proyectos[]',  en:'// projects[]',  pt:'// projetos[]',  fr:'// projets[]'  },
  'projects.title':    { es:'Proyectos',        en:'Projects',        pt:'Projetos',        fr:'Projets'        },
  'projects.subtitle': {
    es: 'Una selección de trabajos de desarrollo e investigación',
    en: 'A collection of development work and research projects',
    pt: 'Uma seleção de trabalhos de desenvolvimento e investigação',
    fr: 'Une sélection de travaux de développement et de recherche',
  },

  /* ── PROJECTS — cards ── */
  'projects.private': {
    es:'// código privado', en:'// private code', pt:'// código privado', fr:'// code privé',
  },

  'projects.p1.type': { es:'Data Science · Analítica Deportiva', en:'Data Science · Sports Analytics', pt:'Data Science · Análise Desportiva', fr:'Data Science · Analytique Sportive' },
  'projects.p1.desc': {
    es: 'Laboratorio de ciencia de datos aplicada al fútbol: modelos de goles esperados (xG), forecasting de resultados (Poisson / Dixon-Coles), redes de pases y scouting de jugadores sobre event data profesional.',
    en: 'Data science lab applied to football: expected goals (xG) models, match forecasting (Poisson / Dixon-Coles), passing networks and player scouting on professional event data.',
    pt: 'Laboratório de ciência de dados aplicada ao futebol: modelos de golos esperados (xG), previsão de resultados (Poisson / Dixon-Coles), redes de passes e scouting de jogadores sobre event data profissional.',
    fr: 'Laboratoire de data science appliquée au football : modèles d\'expected goals (xG), prévision de résultats (Poisson / Dixon-Coles), réseaux de passes et scouting de joueurs sur des event data professionnelles.',
  },

  'projects.p2.type': { es:'GenAI · Agentes', en:'GenAI · Agents', pt:'GenAI · Agentes', fr:'GenAI · Agents' },
  'projects.p2.desc': {
    es: 'Tutor agéntico de inglés: agente conversacional construido sobre Claude con voz híbrida (STT/TTS) y app universal iOS / Android / web. Monorepo TypeScript con arquitectura de agentes.',
    en: 'Agentic English tutor: conversational agent built on Claude with hybrid voice (STT/TTS) and a universal iOS / Android / web app. TypeScript monorepo with agent architecture.',
    pt: 'Tutor agêntico de inglês: agente conversacional construído sobre o Claude com voz híbrida (STT/TTS) e app universal iOS / Android / web. Monorepo TypeScript com arquitetura de agentes.',
    fr: 'Tuteur agentique d\'anglais : agent conversationnel construit sur Claude avec voix hybride (STT/TTS) et app universelle iOS / Android / web. Monorepo TypeScript avec architecture d\'agents.',
  },

  'projects.p5.type': { es:'Deep Learning · Computer Vision', en:'Deep Learning · Computer Vision', pt:'Deep Learning · Computer Vision', fr:'Deep Learning · Computer Vision' },
  'projects.p5.desc': {
    es: 'Detección temprana de incendios en imágenes mediante redes neuronales convolucionales. Proyecto desarrollado en el bootcamp Saturdays AI Madrid (6ª edición, 2023).',
    en: 'Early fire detection in images using convolutional neural networks. Project developed at the Saturdays AI Madrid bootcamp (6th edition, 2023).',
    pt: 'Deteção precoce de incêndios em imagens através de redes neuronais convolucionais. Projeto desenvolvido no bootcamp Saturdays AI Madrid (6.ª edição, 2023).',
    fr: 'Détection précoce d\'incendies dans des images par réseaux de neurones convolutifs. Projet développé au bootcamp Saturdays AI Madrid (6e édition, 2023).',
  },

  'projects.p6.type':  { es:'GenAI · Producto SaaS', en:'GenAI · SaaS Product', pt:'GenAI · Produto SaaS', fr:'GenAI · Produit SaaS' },
  'projects.p6.desc': {
    es: 'Reseñas de Google a partir de audio: el cliente escanea un QR, graba su opinión y recibe una reseña de texto pulida lista para publicar. Whisper + Llama vía Groq, multi-tenant, desplegado con Docker y en fase de validación con usuarios.',
    en: 'Google reviews from audio: the customer scans a QR code, records their opinion and gets a polished text review ready to publish. Whisper + Llama via Groq, multi-tenant, deployed with Docker and in user-validation phase.',
    pt: 'Reviews do Google a partir de áudio: o cliente lê um QR, grava a sua opinião e recebe uma review de texto polida pronta a publicar. Whisper + Llama via Groq, multi-tenant, implantado com Docker e em fase de validação com utilizadores.',
    fr: 'Avis Google à partir d\'audio : le client scanne un QR, enregistre son avis et reçoit un texte d\'avis peaufiné prêt à publier. Whisper + Llama via Groq, multi-tenant, déployé avec Docker et en phase de validation utilisateurs.',
  },

  'projects.p9.type': { es:'GenAI · Datos sintéticos · Azure', en:'GenAI · Synthetic Data · Azure', pt:'GenAI · Dados sintéticos · Azure', fr:'GenAI · Données synthétiques · Azure' },
  'projects.p9.desc': {
    es: 'Generador de datos sintéticos tabulares orquestado con agentes LangGraph: núcleo determinista (SDV: GaussianCopula, TVAE, CTGAN) y LLM solo para redactar sobre cifras agregadas. Mide fidelidad, utilidad (TSTR/TRTR) y privacidad (DCR, MIA) con varias semillas. Evolución de mi TFM, desplegado en Azure Container Apps con CI/CD, Key Vault y Entra ID.',
    en: 'Tabular synthetic data generator orchestrated by LangGraph agents: a deterministic core (SDV: GaussianCopula, TVAE, CTGAN) with the LLM only writing from aggregated figures. Measures fidelity, utility (TSTR/TRTR) and privacy (DCR, MIA) across multiple seeds. Evolved from my master\'s thesis, deployed on Azure Container Apps with CI/CD, Key Vault and Entra ID.',
    pt: 'Gerador de dados sintéticos tabulares orquestrado com agentes LangGraph: núcleo determinístico (SDV: GaussianCopula, TVAE, CTGAN) e LLM apenas para redigir sobre valores agregados. Mede fidelidade, utilidade (TSTR/TRTR) e privacidade (DCR, MIA) com várias sementes. Evolução do meu TFM, implantado no Azure Container Apps com CI/CD, Key Vault e Entra ID.',
    fr: 'Générateur de données synthétiques tabulaires orchestré par des agents LangGraph : noyau déterministe (SDV : GaussianCopula, TVAE, CTGAN) et LLM uniquement pour rédiger à partir de chiffres agrégés. Mesure fidélité, utilité (TSTR/TRTR) et confidentialité (DCR, MIA) sur plusieurs graines. Évolution de mon mémoire de master, déployé sur Azure Container Apps avec CI/CD, Key Vault et Entra ID.',
  },

  'projects.p7.type': { es:'Machine Learning · Finanzas', en:'Machine Learning · Finance', pt:'Machine Learning · Finanças', fr:'Machine Learning · Finance' },
  'projects.p7.desc': {
    es: 'Scoring de riesgo crediticio de principio a fin: XGBoost sobre 307.000 préstamos reales de Home Credit (AUC 0.78), explicabilidad SHAP con reason codes que excluyen atributos protegidos, comparativa con Deep Learning, API de scoring con FastAPI + Docker y versión lakehouse en Databricks (Delta, MLflow, Unity Catalog).',
    en: 'End-to-end credit risk scoring: XGBoost on 307,000 real Home Credit loans (AUC 0.78), SHAP explainability with reason codes that exclude protected attributes, a Deep Learning comparison, a scoring API with FastAPI + Docker and a lakehouse version on Databricks (Delta, MLflow, Unity Catalog).',
    pt: 'Scoring de risco de crédito de ponta a ponta: XGBoost sobre 307.000 empréstimos reais da Home Credit (AUC 0.78), explicabilidade SHAP com reason codes que excluem atributos protegidos, comparativa com Deep Learning, API de scoring com FastAPI + Docker e versão lakehouse no Databricks (Delta, MLflow, Unity Catalog).',
    fr: 'Scoring de risque de crédit de bout en bout : XGBoost sur 307 000 prêts réels Home Credit (AUC 0.78), explicabilité SHAP avec des reason codes excluant les attributs protégés, comparaison Deep Learning, API de scoring FastAPI + Docker et version lakehouse sur Databricks (Delta, MLflow, Unity Catalog).',
  },

  'projects.p8.type': { es:'OSINT · Inteligencia Marítima', en:'OSINT · Maritime Intelligence', pt:'OSINT · Inteligência Marítima', fr:'OSINT · Renseignement Maritime' },
  'projects.p8.desc': {
    es: 'Plataforma de inteligencia geoespacial en tiempo real sobre la base open source OSIRIS: mapa WebGL con miles de entidades en vivo (tráfico aéreo y marítimo, sismos, sanciones OFAC, eventos GDELT), scoring de riesgo país y análisis con IA. Especialización marítima propia en desarrollo: chokepoints, AIS y riesgo de cadena de suministro.',
    en: 'Real-time geospatial intelligence platform built on the open source OSIRIS base: WebGL map with thousands of live entities (air and maritime traffic, earthquakes, OFAC sanctions, GDELT events), country risk scoring and AI analysis. Own maritime specialization in progress: chokepoints, AIS and supply chain risk.',
    pt: 'Plataforma de inteligência geoespacial em tempo real sobre a base open source OSIRIS: mapa WebGL com milhares de entidades ao vivo (tráfego aéreo e marítimo, sismos, sanções OFAC, eventos GDELT), scoring de risco-país e análise com IA. Especialização marítima própria em desenvolvimento: chokepoints, AIS e risco de cadeia de abastecimento.',
    fr: 'Plateforme de renseignement géospatial en temps réel sur la base open source OSIRIS : carte WebGL avec des milliers d\'entités en direct (trafic aérien et maritime, séismes, sanctions OFAC, événements GDELT), scoring de risque pays et analyse par IA. Spécialisation maritime propre en cours : chokepoints, AIS et risque de chaîne d\'approvisionnement.',
  },

  /* ── STATUS BAR ── */
  'status.field':  { es:'∇f · campo vectorial',      en:'∇f · vector field',      pt:'∇f · campo vetorial',    fr:'∇f · champ vectoriel'   },
  'status.conway': { es:'Conway · juego de la vida', en:'Conway · game of life',  pt:'Conway · jogo da vida',  fr:'Conway · jeu de la vie' },

  /* ── BLOG — header ── */
  'blog.label':         { es:'// blog.posts[]',  en:'// blog.posts[]',  pt:'// blog.posts[]',  fr:'// blog.posts[]'  },
  'blog.title':         { es:'Blog',              en:'Blog',              pt:'Blog',              fr:'Blog'              },
  'blog.subtitle': {
    es: 'Reflexiones sobre tecnología, desarrollo y ciencia de datos',
    en: 'Thoughts on technology, development, and data science',
    pt: 'Reflexões sobre tecnologia, desenvolvimento e ciência de dados',
    fr: 'Réflexions sur la technologie, le développement et la data science',
  },
  'blog.soon.label': { es:'// estado: próximamente', en:'// status: incoming', pt:'// estado: em breve', fr:'// statut : bientôt' },
  'blog.soon.text': {
    es: 'Preparando contenido de calidad sobre desarrollo de software, inteligencia artificial y ciencia de datos. Artículos, tutoriales y análisis de proyectos — próximamente.',
    en: 'Working on quality content about software development, artificial intelligence, and data science. Articles, tutorials, and project breakdowns — coming soon.',
    pt: 'A preparar conteúdo de qualidade sobre desenvolvimento de software, inteligência artificial e ciência de dados. Artigos, tutoriais e análises de projetos — em breve.',
    fr: 'Préparation de contenu de qualité sur le développement logiciel, l\'intelligence artificielle et la data science. Articles, tutoriels et analyses de projets — bientôt disponible.',
  },
};

/* ── Engine ── */
const LANGS = ['es','en','pt','fr'];
const LANG_LABELS = { es:'ES', en:'EN', pt:'PT', fr:'FR' };

function getLang() {
  return localStorage.getItem('lang') || 'es';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
  updateSwitcher(lang);
}

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const tr = TRANSLATIONS[key];
    if (!tr) return;
    const val = tr[lang] || tr['es'];
    // Use innerHTML so &nbsp; and <strong> work
    el.innerHTML = val;
  });
  document.documentElement.lang = lang;
  // Aviso para contenido que no va por data-i18n (p.ej. cuerpos de posts por idioma)
  window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

function updateSwitcher(activeLang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === activeLang);
  });
}

function buildSwitcher() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher';

  LANGS.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.dataset.lang = lang;
    btn.textContent = LANG_LABELS[lang];
    btn.addEventListener('click', () => setLang(lang));
    switcher.appendChild(btn);
  });

  nav.after(switcher);
}

document.addEventListener('DOMContentLoaded', () => {
  buildSwitcher();
  const lang = getLang();
  applyLang(lang);
  updateSwitcher(lang);
});
