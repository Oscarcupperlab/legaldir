export interface EspecialidadConfig {
  specialty: string;          // must match DB value exactly
  slug: string;               // URL slug
  title: string;              // <title> tag
  h1: string;                 // page heading
  description: string;        // meta description
  intro: string;              // introductory paragraph
  longIntro: string;          // second paragraph
  faq: { q: string; a: string }[];
  related: string[];          // slugs of related specialties
}

export const especialidades: Record<string, EspecialidadConfig> = {
  "abogados-penales-madrid": {
    specialty: "Penal",
    slug: "abogados-penales-madrid",
    title: "Abogados Penales en Madrid — Encuentra al Mejor Penalista",
    h1: "Abogados Penales en Madrid",
    description:
      "Encuentra los mejores abogados penalistas en Madrid. Especialistas en delitos económicos, tráfico, violencia, robos y más. Consulta gratis disponible.",
    intro:
      "Si te enfrentas a una investigación policial, una denuncia o un juicio penal, necesitas un abogado penalista de confianza en Madrid. En LegalDir encontrarás despachos especializados exclusivamente en derecho penal, con experiencia ante la Audiencia Nacional y los Juzgados de lo Penal de Madrid.",
    longIntro:
      "El derecho penal abarca desde delitos de tráfico y violencia doméstica hasta delitos económicos, estafas, delitos informáticos y extradiciones. La elección del abogado puede marcar la diferencia entre una condena y una absolución. Todos los despachos listados cuentan con trayectoria contrastada en el ámbito penal.",
    faq: [
      {
        q: "¿Cuánto cuesta un abogado penal en Madrid?",
        a: "Los honorarios varían según la complejidad del caso. Un procedimiento penal sencillo puede costar entre 1.000 € y 3.000 €, mientras que causas complejas ante la Audiencia Nacional pueden superar los 10.000 €. Muchos despachos ofrecen primera consulta gratuita.",
      },
      {
        q: "¿Cuándo debo contratar un abogado penalista?",
        a: "Lo antes posible. Si eres investigado, detenido o has recibido una citación judicial, debes contar con asistencia letrada desde el primer momento. Las primeras declaraciones pueden ser determinantes para el resultado del proceso.",
      },
      {
        q: "¿Qué diferencia hay entre un abogado penal y un criminalista?",
        a: "En España ambos términos se usan de forma equivalente. El abogado penalista o criminalista es el especialista en derecho penal que te defiende en juicio o representa a la acusación particular.",
      },
      {
        q: "¿Puedo cambiar de abogado durante el proceso penal?",
        a: "Sí, puedes cambiar de abogado en cualquier momento del procedimiento. Es tu derecho como defendido. El nuevo letrado asumirá el caso desde el punto en que se encuentre.",
      },
    ],
    related: [
      "abogados-trafico-madrid",
      "abogados-civiles-madrid",
      "abogados-administrativos-madrid",
    ],
  },

  "abogados-civiles-madrid": {
    specialty: "Civil",
    slug: "abogados-civiles-madrid",
    title: "Abogados Civiles en Madrid — Contratos, Herencias y Reclamaciones",
    h1: "Abogados Civiles en Madrid",
    description:
      "Abogados especialistas en derecho civil en Madrid: contratos, herencias, reclamaciones de cantidad, responsabilidad civil y más. Consulta tu caso.",
    intro:
      "El derecho civil regula las relaciones entre particulares: contratos, compraventas, arrendamientos, herencias, divorcios o reclamaciones de deudas. En Madrid encontrarás en LegalDir despachos con amplia experiencia en litigación civil ante los Juzgados de Primera Instancia.",
    longIntro:
      "Desde una reclamación por incumplimiento de contrato hasta una disputa hereditaria compleja, el abogado civilista es el profesional que protege tus intereses. Los despachos de nuestro directorio combinan negociación extrajudicial y representación en juicio para obtener el mejor resultado.",
    faq: [
      {
        q: "¿Qué asuntos lleva un abogado civil?",
        a: "Contratos y su incumplimiento, herencias y testamentos, arrendamientos urbanos, reclamaciones de cantidad, responsabilidad civil por daños, propiedad horizontal, separaciones y divorcios de mutuo acuerdo, y nulidad de cláusulas abusivas bancarias.",
      },
      {
        q: "¿Cuánto tarda un juicio civil en Madrid?",
        a: "Los juicios civiles ordinarios en Madrid suelen tardar entre 12 y 24 meses desde la presentación de la demanda hasta la sentencia. Los juicios verbales (menor cuantía) pueden resolverse en 6-9 meses.",
      },
      {
        q: "¿Necesito abogado para reclamar menos de 2.000 €?",
        a: "Para juicios verbales de hasta 2.000 € no es obligatorio contar con abogado ni procurador. Sin embargo, contar con asesoramiento profesional siempre aumenta tus posibilidades de éxito.",
      },
      {
        q: "¿Qué es la responsabilidad civil y cómo se reclama?",
        a: "La responsabilidad civil obliga a quien causa un daño a otra persona a repararlo económicamente. Se puede reclamar extrajudicialmente o mediante demanda civil. Un abogado especialista evaluará si procede reclamación y cuantificará los daños.",
      },
    ],
    related: [
      "abogados-familia-madrid",
      "abogados-inmobiliarios-madrid",
      "abogados-mercantiles-madrid",
    ],
  },

  "abogados-laborales-madrid": {
    specialty: "Laboral",
    slug: "abogados-laborales-madrid",
    title: "Abogados Laboralistas en Madrid — Despidos, ERE y Reclamaciones",
    h1: "Abogados Laboralistas en Madrid",
    description:
      "Especialistas en derecho laboral en Madrid: despidos improcedentes, ERE, accidentes laborales, reclamación de salarios e incapacidades. Primera consulta gratis.",
    intro:
      "Si te han despedido, sufres un accidente laboral, te deniegan la incapacidad o tu empresa no te paga lo acordado, necesitas un abogado laboralista en Madrid. Los despachos de LegalDir actúan ante el Tribunal Superior de Justicia de Madrid y el SMAC para defender tus derechos como trabajador.",
    longIntro:
      "El derecho laboral es dinámico y cambia frecuentemente. Contar con un abogado especializado te garantiza conocer todos los plazos (solo tienes 20 días hábiles para impugnar un despido), negociar la mejor indemnización posible y maximizar tus posibilidades en el juicio.",
    faq: [
      {
        q: "¿Cuánto tiempo tengo para impugnar un despido en Madrid?",
        a: "Tienes 20 días hábiles desde la fecha de efectos del despido para presentar papeleta de conciliación ante el SMAC. Este plazo es improrrogable. Contacta con un abogado laboralista inmediatamente.",
      },
      {
        q: "¿Cuánto me corresponde por despido improcedente?",
        a: "Para contratos desde 2012: 33 días por año trabajado, con un máximo de 24 mensualidades. Para contratos anteriores a febrero de 2012, el cálculo es mixto. Un abogado laboralista calculará exactamente tu indemnización.",
      },
      {
        q: "¿Qué es el SMAC y para qué sirve?",
        a: "El SMAC (Servicio de Mediación, Arbitraje y Conciliación) es un organismo público donde se celebra la conciliación previa obligatoria antes de ir a juicio laboral. Es el primer paso en casi cualquier reclamación laboral.",
      },
      {
        q: "¿Puedo reclamar si fui despedido durante el período de prueba?",
        a: "Durante el período de prueba el empleador puede extinguir el contrato sin necesidad de causa. Sin embargo, existen excepciones: si la causa real es discriminatoria o vulnera derechos fundamentales, el despido puede ser nulo.",
      },
    ],
    related: [
      "abogados-penales-madrid",
      "abogados-administrativos-madrid",
      "abogados-extranjeria-madrid",
    ],
  },

  "abogados-familia-madrid": {
    specialty: "Familia",
    slug: "abogados-familia-madrid",
    title: "Abogados de Familia en Madrid — Divorcios, Custodia y Herencias",
    h1: "Abogados de Familia en Madrid",
    description:
      "Abogados especializados en derecho de familia en Madrid: divorcios, separaciones, custodia de hijos, pensiones alimenticias y herencias. Trato humano y discreto.",
    intro:
      "Los asuntos de familia requieren un abogado que combine rigor jurídico con sensibilidad humana. En LegalDir encontrarás despachos madrileños especializados en divorcios de mutuo acuerdo y contenciosos, custodia compartida, pensiones alimenticias, guarda y visitas, y planificación sucesoria.",
    longIntro:
      "Un proceso de divorcio o separación bien gestionado desde el inicio puede evitar conflictos prolongados y costosos. Los abogados de familia de nuestro directorio priorizan la mediación y los acuerdos cuando es posible, reduciendo el impacto emocional y económico para toda la familia.",
    faq: [
      {
        q: "¿Cuánto tarda un divorcio de mutuo acuerdo en Madrid?",
        a: "Un divorcio de mutuo acuerdo tramitado notarialmente puede resolverse en 1-2 meses. Si es judicial pero no contencioso, suele tardar entre 3 y 6 meses en Madrid. El divorcio contencioso puede prolongarse 12-24 meses.",
      },
      {
        q: "¿Necesito abogado propio o podemos compartir uno en el divorcio?",
        a: "En el divorcio de mutuo acuerdo es posible compartir abogado. Sin embargo, si hay conflictos sobre la custodia, la vivienda habitual o la pensión, es muy recomendable que cada parte tenga su propio letrado.",
      },
      {
        q: "¿Cómo se calcula la pensión alimenticia de los hijos?",
        a: "No existe una fórmula fija. El juez tiene en cuenta los ingresos de ambos progenitores, las necesidades del menor, el tiempo de convivencia y los gastos del hogar. Las tablas orientativas del CGPJ sirven de referencia.",
      },
      {
        q: "¿Qué es la custodia compartida y cuándo se concede?",
        a: "La custodia compartida implica que ambos progenitores comparten por igual el tiempo de convivencia con los hijos. Los tribunales madrileños la conceden cuando ambas partes lo solicitan y no existen circunstancias que la desaconsejen.",
      },
    ],
    related: [
      "abogados-civiles-madrid",
      "abogados-inmobiliarios-madrid",
      "abogados-penales-madrid",
    ],
  },

  "abogados-fiscales-madrid": {
    specialty: "Fiscal",
    slug: "abogados-fiscales-madrid",
    title: "Abogados Fiscalistas en Madrid — Hacienda, IRPF y Planificación Fiscal",
    h1: "Abogados Fiscalistas en Madrid",
    description:
      "Asesores y abogados fiscalistas en Madrid: planificación fiscal, recursos ante Hacienda, IRPF, IVA, impuesto de sociedades y delito fiscal. Empresas y particulares.",
    intro:
      "Hacienda no descansa. Si recibes una paralela, una inspección fiscal o quieres optimizar la carga tributaria de tu empresa, necesitas un abogado fiscalista en Madrid. Los despachos de LegalDir combinan la asesoría fiscal preventiva con la defensa activa ante la AEAT y los tribunales económico-administrativos.",
    longIntro:
      "La planificación fiscal eficiente es legal y necesaria para cualquier empresa o autónomo. Más allá de la declaración anual, los abogados fiscalistas de nuestro directorio te ayudan a estructurar operaciones, aplazar deudas tributarias, recurrir liquidaciones y, si es necesario, defenderte ante el TEAC o los tribunales contencioso-administrativos.",
    faq: [
      {
        q: "¿Qué hace exactamente un abogado fiscalista?",
        a: "Planifica la estructura fiscal de empresas y patrimonios, presenta recursos y reclamaciones ante la AEAT y el TEAC, defiende en inspecciones tributarias, asesora en fusiones y adquisiciones desde el punto de vista fiscal y actúa en procedimientos por delito fiscal.",
      },
      {
        q: "¿Puedo recurrir una liquidación de Hacienda?",
        a: "Sí. Tienes un mes desde la notificación para presentar un recurso de reposición o una reclamación económico-administrativa ante el TEAR. Si este te desestima, puedes llegar al TEAC y posteriormente a los tribunales contencioso-administrativos.",
      },
      {
        q: "¿Cuándo se considera delito fiscal en España?",
        a: "Cuando la cuota defraudada supera los 120.000 € por ejercicio y tributo. La pena puede ser de 1 a 5 años de prisión y el pago de la deuda con recargos. La regularización voluntaria antes de la investigación extingue la responsabilidad penal.",
      },
      {
        q: "¿Qué es una inspección de Hacienda y cómo actuar?",
        a: "Es un procedimiento por el que la AEAT comprueba la situación tributaria del contribuyente. Al recibir la comunicación de inicio, debes contactar inmediatamente con un abogado fiscalista: los plazos son cortos y las consecuencias de no actuar correctamente pueden ser muy graves.",
      },
    ],
    related: [
      "abogados-mercantiles-madrid",
      "abogados-administrativos-madrid",
      "abogados-contencioso-administrativo-madrid",
    ],
  },

  "abogados-inmobiliarios-madrid": {
    specialty: "Inmobiliario",
    slug: "abogados-inmobiliarios-madrid",
    title: "Abogados Inmobiliarios en Madrid — Compraventa, Alquileres y Comunidades",
    h1: "Abogados Inmobiliarios en Madrid",
    description:
      "Abogados especializados en derecho inmobiliario en Madrid: compraventa de viviendas, arrendamientos, comunidades de propietarios, hipotecas y desahucios.",
    intro:
      "Comprar, vender o alquilar un inmueble en Madrid sin asesoramiento jurídico puede costarte muy caro. Los abogados inmobiliarios de LegalDir te acompañan desde la revisión del contrato de arras hasta la firma en notaría, pasando por due diligence registral, negociación de hipotecas y resolución de conflictos con inquilinos o comunidades.",
    longIntro:
      "Madrid es uno de los mercados inmobiliarios más activos de Europa. Los problemas jurídicos más frecuentes incluyen vicios ocultos, okupación, impago de rentas, obras en comunidades y herencias de inmuebles. Contar con un abogado especializado desde el inicio te protege frente a cualquier contingencia.",
    faq: [
      {
        q: "¿Necesito abogado para comprar un piso en Madrid?",
        a: "No es obligatorio pero sí muy recomendable. Un abogado inmobiliario revisará el estado registral y catastral, comprobará cargas y afecciones urbanísticas, revisará el contrato de arras y te acompañará en la firma notarial, evitando sorpresas posteriores.",
      },
      {
        q: "¿Cómo se desahucia a un inquilino que no paga en Madrid?",
        a: "El proceso de desahucio por impago comienza con una demanda de juicio verbal. Si el inquilino no paga ni se opone, el proceso puede resolverse en 2-4 meses. Si hay oposición, puede alargarse 6-12 meses. Un abogado especialista agilizará el proceso.",
      },
      {
        q: "¿Qué es el contrato de arras y qué tipos existen?",
        a: "El contrato de arras es un precontrato de compraventa que asegura la operación. Las arras confirmatorias obligan a ambas partes; las penitenciales permiten desistir perdiendo las arras (comprador) o devolviéndolas dobladas (vendedor). Es esencial que un abogado redacte o revise este documento.",
      },
      {
        q: "¿Puedo reclamar vicios ocultos en un piso comprado?",
        a: "Sí. El Código Civil establece 6 meses desde la entrega para reclamar vicios ocultos. Sin embargo, si el vendedor conocía el vicio y lo ocultó, puede existir responsabilidad por dolo, ampliando el plazo. Un abogado inmobiliario evaluará tu caso.",
      },
    ],
    related: [
      "abogados-civiles-madrid",
      "abogados-familia-madrid",
      "abogados-mercantiles-madrid",
    ],
  },

  "abogados-mercantiles-madrid": {
    specialty: "Mercantil",
    slug: "abogados-mercantiles-madrid",
    title: "Abogados Mercantiles en Madrid — Empresas, Contratos y Concursos",
    h1: "Abogados Mercantiles en Madrid",
    description:
      "Abogados mercantilistas en Madrid para empresas: constitución de sociedades, contratos mercantiles, fusiones, concurso de acreedores y disputas societarias.",
    intro:
      "El derecho mercantil regula la actividad de las empresas: desde su constitución hasta su disolución. Los abogados mercantilistas de LegalDir en Madrid asesoran a startups, pymes y grandes empresas en contratos, operaciones corporativas, financiación, propiedad industrial y litigación comercial.",
    longIntro:
      "En un entorno empresarial cambiante, contar con un asesor jurídico mercantil es una inversión, no un gasto. Los despachos de nuestro directorio combinan el asesoramiento preventivo en contratos y operaciones con la defensa activa en disputas societarias, reclamaciones entre empresas y procedimientos concursales.",
    faq: [
      {
        q: "¿Qué tipo de sociedad me conviene crear en España?",
        a: "La Sociedad Limitada (SL) es la forma más habitual para pymes y startups: capital mínimo de 1 €, responsabilidad limitada y gestión flexible. La SA se usa para grandes empresas o cotizadas. Un abogado mercantil analizará tu situación fiscal y operativa para recomendarte la mejor estructura.",
      },
      {
        q: "¿Qué es el concurso de acreedores y cuándo presentarlo?",
        a: "El concurso de acreedores (antes conocido como 'quiebra') es el procedimiento legal cuando una empresa no puede hacer frente a sus deudas. Debes presentarlo en los 2 meses siguientes a conocer la insolvencia. Presentarlo a tiempo puede salvar la empresa o minimizar la responsabilidad de los administradores.",
      },
      {
        q: "¿Cómo se resuelven los conflictos entre socios?",
        a: "Los estatutos sociales pueden incluir cláusulas de resolución de conflictos: mediación, arbitraje o derechos de adquisición preferente. Si no hay acuerdo, el procedimiento judicial mercantil puede tardar años. Un abogado mercantil intentará siempre resolver el conflicto de forma extrajudicial.",
      },
      {
        q: "¿Qué revisión legal necesita un contrato mercantil?",
        a: "Todo contrato mercantil debe incluir: identificación de partes, objeto, precio y forma de pago, plazo, garantías, causas de resolución, jurisdicción y ley aplicable. Un abogado mercantil redactará o revisará estos elementos para proteger tus intereses.",
      },
    ],
    related: [
      "abogados-fiscales-madrid",
      "abogados-propiedad-intelectual-madrid",
      "abogados-civiles-madrid",
    ],
  },

  "abogados-propiedad-intelectual-madrid": {
    specialty: "Propiedad Intelectual",
    slug: "abogados-propiedad-intelectual-madrid",
    title: "Abogados de Propiedad Intelectual en Madrid — Marcas, Patentes y Copyright",
    h1: "Abogados de Propiedad Intelectual en Madrid",
    description:
      "Abogados especialistas en propiedad intelectual e industrial en Madrid: marcas, patentes, diseños, derechos de autor, software y defensa frente a infracciones.",
    intro:
      "Tu marca, tu invención o tu obra son activos que necesitan protección jurídica. Los abogados de propiedad intelectual e industrial de LegalDir en Madrid registran marcas ante la OEPM y la EUIPO, tramitan patentes, protegen derechos de autor y defienden tus creaciones frente a plagios y usos no autorizados.",
    longIntro:
      "En la economía digital, la propiedad intelectual es uno de los activos más valiosos de cualquier empresa. Desde el nombre de una startup hasta el código fuente de una aplicación, pasando por diseños industriales o secretos comerciales, un abogado especializado garantiza que nadie se beneficie de tu trabajo sin permiso.",
    faq: [
      {
        q: "¿Cómo registro una marca en España?",
        a: "El registro se realiza ante la OEPM (Oficina Española de Patentes y Marcas). El proceso dura aproximadamente 4-6 meses y cuesta desde 143 € para una clase de productos/servicios. Un abogado realizará una búsqueda previa de anterioridades y redactará la solicitud para maximizar las posibilidades de éxito.",
      },
      {
        q: "¿Cuánto dura la protección de una marca registrada?",
        a: "El registro de marca es válido por 10 años renovables indefinidamente. A diferencia de las patentes (20 años no renovables), una marca puede mantenerse protegida para siempre si se renueva y se usa.",
      },
      {
        q: "¿Qué diferencia hay entre propiedad intelectual e industrial?",
        a: "La propiedad intelectual protege creaciones artísticas y literarias (libros, música, software, diseño gráfico). La propiedad industrial protege creaciones técnicas y signos distintivos (marcas, patentes, modelos de utilidad, diseños industriales).",
      },
      {
        q: "¿Qué puedo hacer si alguien copia mi marca o logo?",
        a: "Puedes actuar en vía civil (reclamando daños y cesación) o penal si hay delito contra la propiedad intelectual. También puedes presentar una oposición ante la OEPM si intenta registrar una marca confundible. Un abogado especializado elegirá la vía más eficaz.",
      },
    ],
    related: [
      "abogados-mercantiles-madrid",
      "abogados-civiles-madrid",
      "abogados-penales-madrid",
    ],
  },

  "abogados-administrativos-madrid": {
    specialty: "Administrativo",
    slug: "abogados-administrativos-madrid",
    title: "Abogados Administrativistas en Madrid — Recursos y Sanciones",
    h1: "Abogados Administrativistas en Madrid",
    description:
      "Abogados especialistas en derecho administrativo en Madrid: recursos contra sanciones, licencias, expropiaciones, contratos públicos y responsabilidad patrimonial.",
    intro:
      "Cuando la Administración Pública te sanciona, deniega una licencia, expropía bienes o incumple un contrato, necesitas un abogado administrativista en Madrid. Los despachos de LegalDir actúan ante el Tribunal Superior de Justicia de Madrid, la Audiencia Nacional y el Tribunal Supremo.",
    longIntro:
      "El derecho administrativo regula las relaciones entre los ciudadanos y el Estado. Multas de tráfico, sanciones urbanísticas, expedientes disciplinarios, concursos públicos, permisos de residencia, reclamaciones por mala praxis sanitaria o accidentes en la vía pública son algunas de las materias que cubren los especialistas de nuestro directorio.",
    faq: [
      {
        q: "¿Puedo recurrir una multa de la DGT?",
        a: "Sí. Dispones de 20 días naturales para presentar alegaciones o recurso de reposición ante la DGT. Si se desestima, puedes recurrir ante el Tribunal Económico-Administrativo o impugnarlo judicialmente. Un abogado administrativista evaluará si la sanción tiene vicios que permitan anularla.",
      },
      {
        q: "¿Qué es la responsabilidad patrimonial de la Administración?",
        a: "Es el derecho a ser indemnizado cuando la actuación de una Administración Pública (hospital, Ayuntamiento, etc.) te causa un daño. Cubre desde accidentes en la vía pública hasta errores médicos en la sanidad pública. El plazo de reclamación es de un año.",
      },
      {
        q: "¿Cómo se recurre un expediente de disciplina urbanística?",
        a: "Primero mediante recurso de alzada o reposición ante el propio Ayuntamiento o Comunidad Autónoma. Si se confirma la sanción, puedes acudir al Juzgado de lo Contencioso-Administrativo. Los plazos son cortos y es imprescindible asesoramiento especializado.",
      },
      {
        q: "¿Qué plazo tengo para recurrir un acto administrativo?",
        a: "Para el recurso de alzada: 1 mes desde la notificación. Para recurso contencioso-administrativo: 2 meses desde la resolución denegatoria. Estos plazos son improrrogables y su incumplimiento supone la firmeza del acto.",
      },
    ],
    related: [
      "abogados-contencioso-administrativo-madrid",
      "abogados-fiscales-madrid",
      "abogados-laborales-madrid",
    ],
  },

  "abogados-extranjeria-madrid": {
    specialty: "Extranjería",
    slug: "abogados-extranjeria-madrid",
    title: "Abogados de Extranjería en Madrid — Residencia, Visados y Nacionalidad",
    h1: "Abogados de Extranjería en Madrid",
    description:
      "Abogados especialistas en extranjería e inmigración en Madrid: permisos de residencia y trabajo, visados, reagrupación familiar, nacionalidad española y recursos.",
    intro:
      "Obtener o renovar un permiso de residencia, tramitar la nacionalidad española o recurrir una expulsión requiere conocimiento preciso de la Ley de Extranjería. Los abogados de extranjería de LegalDir en Madrid gestionan toda clase de autorizaciones ante la Oficina de Extranjería, el Consulado y los Juzgados contencioso-administrativos.",
    longIntro:
      "Cada año miles de personas en Madrid necesitan regularizar su situación administrativa, reunir a su familia o iniciar un proyecto empresarial en España. Los despachos de nuestro directorio dominan los procedimientos ante las distintas administraciones y acompañan a sus clientes en cada paso del proceso migratorio.",
    faq: [
      {
        q: "¿Cuánto tarda obtener la residencia en España?",
        a: "Los plazos varían según el tipo de autorización. La residencia no lucrativa puede tardar 1-3 meses; la autorización de trabajo por cuenta ajena, 1-2 meses. La residencia de larga duración (5 años) se resuelve en 3 meses. Un abogado de extranjería prepara un expediente sólido para evitar retrasos.",
      },
      {
        q: "¿Puedo recurrir una denegación de residencia?",
        a: "Sí. Tienes 1 mes para interponer recurso de alzada o reposición ante la Delegación del Gobierno, y posteriormente recurso contencioso-administrativo. Muchas resoluciones denegatorias se revocan en vía judicial cuando están mal motivadas.",
      },
      {
        q: "¿Qué requisitos necesito para la nacionalidad española por residencia?",
        a: "10 años de residencia legal y continuada (2 años para iberoamericanos, filipinos y sefardíes, 1 año para casados con español). Examen DELE A2 y CCSE, certificado de antecedentes penales del país de origen y renuncia a la nacionalidad anterior (salvo excepciones).",
      },
      {
        q: "¿Qué es la Golden Visa y quién puede solicitarla?",
        a: "La Golden Visa (visa de inversor) permite obtener residencia en España a cambio de una inversión significativa: desde 500.000 € en inmuebles, 1 millón en acciones o 2 millones en deuda pública española. Un abogado especializado gestiona el proceso completo en 20 días hábiles.",
      },
    ],
    related: [
      "abogados-administrativos-madrid",
      "abogados-laborales-madrid",
      "abogados-penales-madrid",
    ],
  },

  "abogados-contencioso-administrativo-madrid": {
    specialty: "Contencioso",
    slug: "abogados-contencioso-administrativo-madrid",
    title: "Abogados Contencioso-Administrativo en Madrid — Impugna Actos Públicos",
    h1: "Abogados Contencioso-Administrativo en Madrid",
    description:
      "Abogados especialistas en contencioso-administrativo en Madrid: recurso judicial contra la Administración, sanciones, contratos públicos y responsabilidad patrimonial.",
    intro:
      "Cuando los recursos administrativos se agotan sin éxito, la vía judicial contencioso-administrativa es el último mecanismo para impugnar actos de la Administración. Los abogados contencioso-administrativos de LegalDir en Madrid actúan ante los Juzgados de lo Contencioso-Administrativo, el TSJ de Madrid y la Audiencia Nacional.",
    longIntro:
      "El recurso contencioso-administrativo permite anular actos y disposiciones de la Administración que vulneren el ordenamiento jurídico. Desde la impugnación de un Plan General de Ordenación Urbana hasta la reclamación por un contrato público adjudicado irregularmente, los especialistas de nuestro directorio tienen experiencia en los más variados procedimientos.",
    faq: [
      {
        q: "¿Qué plazo tengo para interponer un recurso contencioso-administrativo?",
        a: "El plazo general es de 2 meses desde la notificación del acto o resolución que se impugna. Para la inactividad de la Administración o vías de hecho, el plazo es de 20 días. Estos plazos son de caducidad: su incumplimiento deja firme el acto.",
      },
      {
        q: "¿Necesito abogado y procurador para el contencioso-administrativo?",
        a: "Sí, salvo en procedimientos abreviados ante los Juzgados de lo Contencioso cuya cuantía no supere los 30.000 €. En el TSJ de Madrid, la Audiencia Nacional y el Tribunal Supremo siempre son obligatorios ambos.",
      },
      {
        q: "¿Cuánto tarda un recurso contencioso-administrativo?",
        a: "En Madrid, los Juzgados de lo Contencioso-Administrativo tienen una carga importante. Un procedimiento ordinario puede tardar 2-4 años. El recurso de apelación ante el TSJ añade 1-2 años más. La casación ante el Tribunal Supremo puede tardar 3-5 años.",
      },
      {
        q: "¿Puede la Administración ser condenada en costas?",
        a: "Sí. Si el recurso prospera, el juzgado puede condenar a la Administración al pago de las costas procesales. La condena en costas actúa como desincentivo para mantener actos ilegales y como compensación para el ciudadano que ha tenido que litigar.",
      },
    ],
    related: [
      "abogados-administrativos-madrid",
      "abogados-fiscales-madrid",
      "abogados-extranjeria-madrid",
    ],
  },

  "abogados-trafico-madrid": {
    specialty: "Tráfico",
    slug: "abogados-trafico-madrid",
    title: "Abogados de Tráfico en Madrid — Accidentes, Multas e Indemnizaciones",
    h1: "Abogados de Tráfico en Madrid",
    description:
      "Abogados especialistas en accidentes de tráfico en Madrid: reclamación de indemnizaciones, defensa por delitos viales, recursos contra multas y retirada de carnet.",
    intro:
      "Después de un accidente de tráfico en Madrid, tienes derecho a una indemnización justa. Los abogados de tráfico de LegalDir negocian con las aseguradoras, aplican el baremo actualizado de tráfico y, si es necesario, acuden a juicio para que recibas la compensación que mereces por tus lesiones, daños materiales y lucro cesante.",
    longIntro:
      "Los accidentes de tráfico generan situaciones complejas: lesiones que pueden tener secuelas a largo plazo, bajas laborales, vehículos siniestrados y disputas con las aseguradoras que intentan minimizar las indemnizaciones. Un abogado especializado en tráfico maximiza tu indemnización y te guía en cada paso del proceso.",
    faq: [
      {
        q: "¿Cuánto tiempo tengo para reclamar tras un accidente de tráfico?",
        a: "El plazo de prescripción para reclamar daños personales por accidente de tráfico es de 1 año desde el alta médica o desde que se estabilizan las lesiones. Para daños materiales, también 1 año. Es importante no esperar demasiado para iniciar la reclamación.",
      },
      {
        q: "¿Cómo se calcula la indemnización por accidente de tráfico?",
        a: "Desde 2016 se aplica el baremo de tráfico (Ley 35/2015), que establece indemnizaciones por lesiones temporales (días de baja), secuelas (puntos de perjuicio físico), daño moral y perjuicio patrimonial. Un abogado calcula el máximo que puedes obtener según tu caso concreto.",
      },
      {
        q: "¿Qué hago si la aseguradora me ofrece una indemnización baja?",
        a: "No aceptes nada sin consultar con un abogado de tráfico. Una vez firmada la renuncia, no podrás reclamar más. Un especialista evaluará si la oferta es adecuada según el baremo y, si no lo es, negociará o iniciará un procedimiento judicial.",
      },
      {
        q: "¿Qué delitos viales pueden llevar a prisión?",
        a: "La conducción con tasas de alcohol superiores a 0,60 mg/l en aire espirado (0,25 mg/l si es reincidente), el exceso de velocidad muy grave, la conducción temeraria y el abandono del lugar del accidente con víctimas pueden conllevar penas de prisión de 3 meses a 2 años.",
      },
    ],
    related: [
      "abogados-penales-madrid",
      "abogados-civiles-madrid",
      "abogados-laborales-madrid",
    ],
  },
};

export const allEspecialidadSlugs = Object.keys(especialidades);
