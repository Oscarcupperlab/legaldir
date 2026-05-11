export interface BlogSection {
  type: "paragraph" | "heading" | "list" | "quote" | "image";
  text?: string;
  items?: { bold: string; text: string }[];
  src?: string;
  alt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  relatedSlugs: string[];
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-elegir-abogado",
    title: "5 claves para elegir al abogado adecuado según tu caso",
    excerpt:
      "Encontrar al abogado correcto puede marcar la diferencia en el resultado de tu caso. Te explicamos cómo tomar esta decisión con criterio.",
    category: "Consejos",
    date: "10 de abril, 2026",
    author: "Equipo LegalDir",
    readTime: "6 min de lectura",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    relatedSlugs: ["derechos-laborales-basicos", "guia-divorcio", "herencias-guia"],
    content: [
      {
        type: "paragraph",
        text: "Elegir un abogado es una de las decisiones más importantes cuando te enfrentas a un problema legal. No basta con buscar el más barato o el primero que aparezca en Google. Hay criterios clave que marcan la diferencia.",
      },
      {
        type: "heading",
        text: "1. Especialista vs. generalista",
      },
      {
        type: "paragraph",
        text: "El derecho es muy amplio. Un abogado especializado en derecho penal no tiene por qué ser el más indicado para un divorcio. Busca siempre a alguien con experiencia demostrada en el área que necesitas.",
      },
      {
        type: "heading",
        text: "2. Transparencia en honorarios",
      },
      {
        type: "paragraph",
        text: "Un buen abogado te explicará desde el principio cuánto va a costarte el servicio. Desconfía de quienes evitan hablar de precios o dan presupuestos vagos.",
      },
      {
        type: "list",
        items: [
          { bold: "Tarifa fija", text: "ideal para trámites concretos como una herencia sencilla." },
          { bold: "Por horas", text: "habitual en casos complejos o litigios prolongados." },
          { bold: "Éxito", text: "solo cobran si ganas, común en accidentes o despidos." },
        ],
      },
      {
        type: "heading",
        text: "3. La primera consulta",
      },
      {
        type: "paragraph",
        text: "Aprovecha la primera reunión para evaluar si el abogado te escucha, te explica con claridad y genera confianza. La comunicación es tan importante como la competencia técnica.",
      },
      {
        type: "quote",
        text: "Un abogado que no te entiende, o al que tú no entiendes, no es el abogado adecuado para ti.",
      },
      {
        type: "heading",
        text: "4. Colegiación y referencias",
      },
      {
        type: "paragraph",
        text: "Verifica que está colegiado en el Colegio de Abogados de su ciudad. Puedes comprobarlo en los registros públicos de los colegios profesionales. Las valoraciones de otros clientes también son una guía muy útil.",
      },
      {
        type: "heading",
        text: "5. Confianza y comunicación continua",
      },
      {
        type: "paragraph",
        text: "Tu abogado debe mantenerte informado en todo momento sobre el estado de tu caso. La accesibilidad y la comunicación fluida son señales de un profesional comprometido.",
      },
    ],
  },
  {
    slug: "derechos-laborales-basicos",
    title: "Derechos laborales que todo trabajador debería conocer",
    excerpt:
      "Conocer tus derechos como trabajador es el primer paso para defenderlos. Repasamos los más importantes del ordenamiento laboral español.",
    category: "Laboral",
    date: "2 de abril, 2026",
    author: "Equipo LegalDir",
    readTime: "7 min de lectura",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800&q=80",
    relatedSlugs: ["como-elegir-abogado", "guia-divorcio"],
    content: [
      {
        type: "paragraph",
        text: "El Estatuto de los Trabajadores es la norma fundamental que regula la relación entre empleados y empresas en España. Conocer sus puntos clave te puede ahorrar disgustos y protegerte ante situaciones injustas.",
      },
      {
        type: "heading",
        text: "Despido improcedente",
      },
      {
        type: "paragraph",
        text: "Si tu empresa te despide sin causa justificada o sin seguir el procedimiento correcto, tienes derecho a una indemnización de 33 días por año trabajado (con un máximo de 24 mensualidades para contratos desde 2012).",
      },
      {
        type: "list",
        items: [
          { bold: "Despido disciplinario", text: "debe comunicarse por escrito con la causa detallada." },
          { bold: "Despido objetivo", text: "requiere preaviso de 15 días e indemnización de 20 días/año." },
          { bold: "ERE o ERTE", text: "procesos colectivos con condiciones específicas negociadas." },
        ],
      },
      {
        type: "heading",
        text: "Vacaciones y permisos",
      },
      {
        type: "paragraph",
        text: "Todo trabajador tiene derecho a un mínimo de 30 días naturales de vacaciones al año. Los permisos retribuidos incluyen matrimonio (15 días), nacimiento de hijo (16 semanas), fallecimiento de familiar (2-4 días), entre otros.",
      },
      {
        type: "heading",
        text: "Acoso laboral (mobbing)",
      },
      {
        type: "paragraph",
        text: "El acoso laboral es una conducta que atenta contra la dignidad del trabajador. Si lo sufres, puedes denunciarlo ante la Inspección de Trabajo y reclamar daños y perjuicios.",
      },
      {
        type: "quote",
        text: "Conocer tus derechos no es ser conflictivo, es ser un trabajador informado y responsable.",
      },
    ],
  },
  {
    slug: "guia-divorcio",
    title: "Guía completa del divorcio en España: pasos, plazos y costes",
    excerpt:
      "El divorcio es un proceso complejo tanto emocionalmente como legalmente. Te explicamos todo lo que necesitas saber antes de iniciarlo.",
    category: "Familia",
    date: "25 de marzo, 2026",
    author: "Equipo LegalDir",
    readTime: "8 min de lectura",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    relatedSlugs: ["como-elegir-abogado", "herencias-guia"],
    content: [
      {
        type: "paragraph",
        text: "En España, el divorcio está regulado por el Código Civil y se puede iniciar en cualquier momento tras la celebración del matrimonio, sin necesidad de alegar causa alguna desde la reforma de 2005.",
      },
      {
        type: "heading",
        text: "Mutuo acuerdo vs. contencioso",
      },
      {
        type: "paragraph",
        text: "La vía más rápida y económica es el divorcio de mutuo acuerdo, donde ambas partes pactan todos los términos. Si no hay acuerdo, se tramita como contencioso, con mayor coste y duración.",
      },
      {
        type: "list",
        items: [
          { bold: "Mutuo acuerdo", text: "de 2 a 6 meses, desde ~1.500€ con abogado y procurador." },
          { bold: "Contencioso", text: "de 1 a 3 años, costes variables según complejidad." },
          { bold: "Notarial", text: "sin hijos menores, ante notario en pocas semanas." },
        ],
      },
      {
        type: "heading",
        text: "Custodia y régimen de visitas",
      },
      {
        type: "paragraph",
        text: "El juez priorizará siempre el interés del menor. La custodia compartida es cada vez más habitual en España, aunque la exclusiva (generalmente a la madre) sigue siendo frecuente cuando hay conflicto.",
      },
      {
        type: "quote",
        text: "El objetivo del proceso de divorcio no es ganar, sino encontrar el acuerdo más justo para todos, especialmente para los hijos.",
      },
      {
        type: "heading",
        text: "Costes y pensión compensatoria",
      },
      {
        type: "paragraph",
        text: "Si uno de los cónyuges ve empeorada significativamente su situación económica tras el divorcio, puede solicitar una pensión compensatoria. Los costes totales varían según si hay acuerdo, número de hijos y patrimonio a repartir.",
      },
    ],
  },
  {
    slug: "herencias-guia",
    title: "Herencias: qué hacer cuando fallece un familiar",
    excerpt:
      "La muerte de un ser querido trae consigo trámites legales urgentes. Te guiamos paso a paso en el proceso de aceptación o renuncia de una herencia.",
    category: "Civil",
    date: "15 de marzo, 2026",
    author: "Equipo LegalDir",
    readTime: "6 min de lectura",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    relatedSlugs: ["como-elegir-abogado", "guia-divorcio"],
    content: [
      {
        type: "paragraph",
        text: "Cuando fallece un familiar, los herederos disponen de un plazo para aceptar o renunciar a la herencia. El proceso puede parecer complicado, pero siguiendo los pasos correctos es perfectamente manejable.",
      },
      {
        type: "heading",
        text: "Primeros pasos tras el fallecimiento",
      },
      {
        type: "list",
        items: [
          { bold: "Certificado de defunción", text: "se obtiene en el Registro Civil, necesario para todos los trámites." },
          { bold: "Certificado de últimas voluntades", text: "indica si hay testamento y ante qué notario." },
          { bold: "Copia del testamento", text: "o declaración de herederos si no hay testamento." },
        ],
      },
      {
        type: "heading",
        text: "Aceptar o renunciar la herencia",
      },
      {
        type: "paragraph",
        text: "Si la herencia tiene más deudas que activos, puede ser conveniente renunciar. La aceptación a beneficio de inventario es una opción intermedia que limita tu responsabilidad al valor de lo heredado.",
      },
      {
        type: "quote",
        text: "Nunca aceptes una herencia sin antes conocer el inventario completo de bienes y deudas.",
      },
      {
        type: "heading",
        text: "Impuesto de sucesiones",
      },
      {
        type: "paragraph",
        text: "El impuesto de sucesiones varía mucho por comunidad autónoma. En algunas como Madrid o Andalucía está prácticamente bonificado al 99% para familiares directos. El plazo para pagarlo es de 6 meses desde el fallecimiento, prorrogable otros 6.",
      },
    ],
  },
];

export const blogCategories = [...new Set(blogPosts.map((p) => p.category))];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  const post = getPostBySlug(currentSlug);
  if (!post) return [];
  return post.relatedSlugs
    .map((s) => getPostBySlug(s))
    .filter(Boolean) as BlogPost[];
}
