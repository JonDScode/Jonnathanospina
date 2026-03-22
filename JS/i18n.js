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
    es: 'AI Engineer &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agentes',
    en: 'AI Engineer &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agents',
    pt: 'AI Engineer &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agentes',
    fr: 'Ingénieur IA &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agents',
  },
  'index.cta.projects': { es:'Ver proyectos', en:'View projects', pt:'Ver projetos', fr:'Voir les projets' },
  'index.cta.cv':       { es:'Currículum',    en:'Curriculum',    pt:'Currículo',    fr:'Curriculum'       },

  /* ── INDEX — cards ── */
  'index.card1.title': { es:'AI Engineering', en:'AI Engineering', pt:'AI Engineering', fr:'Ingénierie IA' },
  'index.card1.desc': {
    es: 'Diseño e implementación de sistemas inteligentes basados en LLMs, pipelines de datos y arquitecturas de agentes. IA lista para producción, con enfoque en calidad y trazabilidad.',
    en: 'Design and implementation of intelligent systems based on LLMs, data pipelines and agent architectures. Production-ready AI, focused on quality and traceability.',
    pt: 'Conceção e implementação de sistemas inteligentes baseados em LLMs, pipelines de dados e arquiteturas de agentes. IA pronta para produção, focada em qualidade e rastreabilidade.',
    fr: 'Conception et déploiement de systèmes intelligents basés sur des LLMs, pipelines de données et architectures d\'agents. IA prête pour la production, axée sur la qualité.',
  },
  'index.card2.title': { es:'Data Science', en:'Data Science', pt:'Data Science', fr:'Data Science' },
  'index.card2.desc': {
    es: 'Modelado estadístico, análisis predictivo y visualización avanzada. Transformando datos complejos en conocimiento accionable con metodología rigurosa.',
    en: 'Statistical modeling, predictive analytics and advanced visualization. Turning complex data into actionable knowledge with rigorous methodology.',
    pt: 'Modelagem estatística, análise preditiva e visualização avançada. Transformando dados complexos em conhecimento acionável com metodologia rigorosa.',
    fr: 'Modélisation statistique, analyse prédictive et visualisation avancée. Transformer des données complexes en connaissances actionnables.',
  },
  'index.card3.title': { es:'GenAI &amp; Agentes', en:'GenAI &amp; Agents', pt:'GenAI &amp; Agentes', fr:'GenAI &amp; Agents' },
  'index.card3.desc': {
    es: 'Arquitecturas RAG, Prompt Flows, embeddings y sistemas multi-agente. Construyendo soluciones de IA generativa con Azure AI y modelos de lenguaje de última generación.',
    en: 'RAG architectures, Prompt Flows, embeddings and multi-agent systems. Building generative AI solutions with Azure AI and state-of-the-art language models.',
    pt: 'Arquiteturas RAG, Prompt Flows, embeddings e sistemas multi-agente. Construindo soluções de IA generativa com Azure AI e modelos de linguagem de última geração.',
    fr: 'Architectures RAG, Prompt Flows, embeddings et systèmes multi-agents. Construction de solutions d\'IA générative avec Azure AI et les derniers modèles de langage.',
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
    es: 'AI Engineer &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agentes',
    en: 'AI Engineer &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agents',
    pt: 'AI Engineer &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agentes',
    fr: 'Ingénieur IA &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; GenAI &amp; Agents',
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
    es: 'Científico de Datos e Ingeniero de IA especializado en el diseño e implementación de soluciones basadas en LLMs y sistemas de agentes. Experto en la construcción de pipelines de datos y la industrialización de modelos de Machine Learning bajo un enfoque de IA Responsable y ética. Certificaciones avanzadas en Azure AI y sólida base en programación orientada a objetos — combinando excelencia técnica con visión estratégica de negocio y procesos de innovación tecnológica.',
    en: 'Data Scientist and AI Engineer specializing in the design and implementation of LLM-based solutions and agent systems. Expert in building data pipelines and industrializing Machine Learning models with a focus on Responsible and Ethical AI. Advanced Azure AI certifications and a solid object-oriented programming foundation — combining technical excellence with strategic business vision and technological innovation.',
    pt: 'Cientista de Dados e Engenheiro de IA especializado no design e implementação de soluções baseadas em LLMs e sistemas de agentes. Especialista na construção de pipelines de dados e industrialização de modelos de Machine Learning com foco em IA Responsável e ética. Certificações avançadas em Azure AI e sólida base em programação orientada a objetos — combinando excelência técnica com visão estratégica de negócio.',
    fr: 'Data Scientist et Ingénieur IA spécialisé dans la conception et l\'implémentation de solutions basées sur des LLMs et des systèmes d\'agents. Expert en construction de pipelines de données et industrialisation de modèles de Machine Learning avec une approche d\'IA Responsable et éthique. Certifications Azure AI avancées et solide base en programmation orientée objet.',
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
    es: '<strong>Formación Técnica Avanzada:</strong> Trainer en el Bootcamp de IA School, liderando módulos de IA Generativa, integración de APIs y desarrollo de software robusto.',
    en: '<strong>Advanced Technical Training:</strong> Trainer at the IA School Bootcamp, leading modules on Generative AI, API integration and robust software development.',
    pt: '<strong>Formação Técnica Avançada:</strong> Trainer no Bootcamp da IA School, liderando módulos de IA Generativa, integração de APIs e desenvolvimento de software robusto.',
    fr: '<strong>Formation Technique Avancée :</strong> Formateur au Bootcamp de l\'IA School, animant des modules sur l\'IA Générative, l\'intégration d\'APIs et le développement logiciel robuste.',
  },
  'cv.exp1.b4': {
    es: '<strong>Consultoría Tecnológica:</strong> Colaboración con administraciones públicas (Ayuntamientos, UE) en la definición de métricas de éxito y despliegue de soluciones de innovación.',
    en: '<strong>Technology Consulting:</strong> Collaboration with public administrations (City Councils, EU) on defining success metrics and deploying innovation solutions.',
    pt: '<strong>Consultoria Tecnológica:</strong> Colaboração com administrações públicas (Câmaras Municipais, UE) na definição de métricas de sucesso e implantação de soluções de inovação.',
    fr: '<strong>Conseil Technologique :</strong> Collaboration avec des administrations publiques (Mairies, UE) sur la définition de métriques de succès et le déploiement de solutions d\'innovation.',
  },

  'cv.exp2.title':   { es:'Desarrollador de Software &amp; Frontend', en:'Software &amp; Frontend Developer',    pt:'Desenvolvedor de Software &amp; Frontend', fr:'Développeur Logiciel &amp; Frontend'      },
  'cv.exp2.company': { es:'Freelance &nbsp;·&nbsp; Madrid',            en:'Freelance &nbsp;·&nbsp; Madrid',         pt:'Freelance &nbsp;·&nbsp; Madrid',           fr:'Freelance &nbsp;·&nbsp; Madrid'           },
  'cv.exp2.b1': {
    es: '<strong>Desarrollo Web &amp; Demos:</strong> Creación de sitios e-commerce y aplicaciones web, con enfoque en Frontend Developer para la visualización de soluciones digitales.',
    en: '<strong>Web Development &amp; Demos:</strong> Creation of e-commerce sites and web applications, focused on Frontend development for digital solution visualization.',
    pt: '<strong>Desenvolvimento Web &amp; Demos:</strong> Criação de sites e-commerce e aplicações web, com foco em Frontend Developer para visualização de soluções digitais.',
    fr: '<strong>Développement Web &amp; Démos :</strong> Création de sites e-commerce et d\'applications web, axé sur le développement Frontend pour la visualisation de solutions numériques.',
  },

  'cv.exp3.title':   { es:'Profesor Universitario', en:'University Professor',    pt:'Professor Universitário', fr:'Professeur Universitaire' },
  'cv.exp3.company': {
    es: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colombia',
    en: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colombia',
    pt: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colômbia',
    fr: 'Universidad Autónoma de Occidente &nbsp;·&nbsp; Colombie',
  },
  'cv.exp3.b1': {
    es: '<strong>Análisis y Estructuración:</strong> Liderazgo académico en áreas de mercadeo y legislación, desarrollando una fuerte capacidad analítica para la resolución de problemas complejos y documentación técnica.',
    en: '<strong>Analysis and Structuring:</strong> Academic leadership in marketing and legislation, developing strong analytical skills for complex problem-solving and technical documentation.',
    pt: '<strong>Análise e Estruturação:</strong> Liderança académica nas áreas de marketing e legislação, desenvolvendo forte capacidade analítica para resolução de problemas complexos e documentação técnica.',
    fr: '<strong>Analyse et Structuration :</strong> Leadership académique dans les domaines du marketing et de la législation, développant de solides compétences analytiques pour la résolution de problèmes complexes.',
  },

  /* ── CV — education ── */
  'cv.edu.master.title':   { es:'Máster en Inteligencia Artificial',                  en:'Master\'s in Artificial Intelligence',              pt:'Mestrado em Inteligência Artificial',              fr:'Master en Intelligence Artificielle'             },
  'cv.edu.grado.title':    { es:'Grado en Comercio Internacional',                    en:'Degree in International Trade',                    pt:'Licenciatura em Comércio Internacional',           fr:'Licence en Commerce International'               },
  'cv.edu.de.title':       { es:'Curso Universitario Avanzado en Data Engineering',   en:'Advanced University Course in Data Engineering',   pt:'Curso Universitário Avançado em Data Engineering', fr:'Cours Universitaire Avancé en Data Engineering'  },
  'cv.edu.ai102.title':    { es:'Azure AI Engineer Associate (IA-102)',                en:'Azure AI Engineer Associate (AI-102)',              pt:'Azure AI Engineer Associate (IA-102)',             fr:'Azure AI Engineer Associate (IA-102)'            },
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
