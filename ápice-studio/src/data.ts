/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Frustration, Pillar, SystemNode, PlatformItem, StoryTransformation } from './types';

export const frustrationsData: Frustration[] = [
  {
    id: 'frust-1',
    text: '“Sé mucho más de lo que comunica mi contenido actual.”',
    impact: 'La brecha entre tu experiencia real y tu imagen pública genera desconfianza en clientes de alto valor.'
  },
  {
    id: 'frust-2',
    text: '“Siento que mis competidores se ven más profesionales, aunque su metodología sea inferior.”',
    impact: 'El mercado no premia al mejor, sino al que comunica con mayor claridad y autoridad.'
  },
  {
    id: 'frust-3',
    text: '“Publico constantemente en redes sociales, pero todo se siente improvisado y sin rumbo.”',
    impact: 'Crear contenido sin una estructura de identidad es solo generar ruido; no construye valor a largo plazo.'
  },
  {
    id: 'frust-4',
    text: '“He probado agencias, freelancers y creadores independientes... nada se siente sostenible ni propio.”',
    impact: 'Ellos ejecutan tácticas. Ápice diseña un sistema operativo de comunicación que tú posees por completo.'
  }
];

export const pillarsData: Pillar[] = [
  {
    id: 'pillar-voice',
    title: 'La Voz',
    concept: 'Identidad Verbal',
    description: 'Definimos el tono, el vocabulario y el temperamento de tu comunicación. Tu marca debe sonar con la misma autoridad y calma que tú posees en una sesión privada.',
    visualMetaphor: 'El diapasón que afina toda la sinfonía de contenidos.'
  },
  {
    id: 'pillar-vision',
    title: 'La Visión',
    concept: 'Dirección Estratégica',
    description: 'La comunicación no sigue al algoritmo; sigue a tus objetivos de negocio. Conectamos cada publicación con la expansión y sostenibilidad de tu empresa.',
    visualMetaphor: 'El plano arquitectónico antes de colocar el primer ladrillo.'
  },
  {
    id: 'pillar-pos',
    title: 'El Posicionamiento',
    concept: 'Diferenciación de Alta Gama',
    description: 'Elevamos tu marca por encima del ruido genérico. No competimos por atención masiva; nos posicionamos como la opción inevitable para el cliente ideal.',
    visualMetaphor: 'El ancla que asegura tu lugar único en el mercado.'
  },
  {
    id: 'pillar-narrative',
    title: 'La Narrativa',
    concept: 'Arquitectura de Mensajes',
    description: 'Transformamos ideas complejas en argumentos obvios. Construimos historias que educan al mercado y desmontan objeciones de forma invisible.',
    visualMetaphor: 'El hilo conductor que transforma fragmentos en una historia sólida.'
  },
  {
    id: 'pillar-diff',
    title: 'La Diferenciación',
    concept: 'Valor Inimitable',
    description: 'Extraemos tu genialidad única. Diseñamos un código de comunicación imposible de replicar por tus competidores, basado en tu metodología real.',
    visualMetaphor: 'La huella dactilar de tu pensamiento corporativo.'
  }
];

export const systemNodesData: SystemNode[] = [
  {
    id: 'sys-strat',
    title: '01. Estrategia de Identidad',
    subtitle: 'El Cimiento',
    description: 'Antes de encender una cámara o escribir una sola línea, aislamos tu propuesta de valor, definimos tu narrativa maestra y estructuramos las líneas de pensamiento de tu marca.',
    details: [
      'Auditoría profunda de posicionamiento.',
      'Definición de pilares editoriales exclusivos.',
      'Diseño del ecosistema de mensajes clave.'
    ]
  },
  {
    id: 'sys-msg',
    title: '02. Diseño de Mensajes',
    subtitle: 'La Claridad',
    description: 'Traducimos tu experiencia en un lenguaje digerible y potente. Diseñamos estructuras narrativas precisas que educan al cliente antes de la venta.',
    details: [
      'Redacción de guiones y estructuras narrativas.',
      'Secuenciación de contenidos de alta retención.',
      'Eliminación de tecnicismos vacíos.'
    ]
  },
  {
    id: 'sys-plan',
    title: '03. Planificación de Sistema',
    subtitle: 'El Orden',
    description: 'Reemplazamos la improvisación de "qué publicar hoy" por un calendario predictivo de 30 días sincronizado con tus lanzamientos y ofertas.',
    details: [
      'Estructura de calendario editorial mensual.',
      'Sincronización con embudos de venta.',
      'Gestión de flujos de aprobación en la Plataforma Ápice.'
    ]
  },
  {
    id: 'sys-prod',
    title: '04. Producción Editorial',
    subtitle: 'La Consecuencia',
    description: 'Creamos activos visuales y de audio de altísimo nivel. La producción no busca impresionar con efectos vacíos, sino con la sobriedad y el enfoque del contenido.',
    details: [
      'Dirección creativa y filmación guiada.',
      'Edición de video premium y diseño gráfico minimalista.',
      'Control de calidad tipográfico y estético estricto.'
    ]
  },
  {
    id: 'sys-dist',
    title: '05. Distribución y Expansión',
    subtitle: 'El Impacto',
    description: 'Aseguramos que tu mensaje sea consumido en los canales adecuados por las personas indicadas. Medimos el impacto basado en la claridad y la confianza generadas.',
    details: [
      'Publicación y optimización técnica multi-canal.',
      'Análisis cualitativo del engagement.',
      'Estrategias de amplificación de autoridad.'
    ]
  }
];

export const platformItemsData: PlatformItem[] = [
  {
    day: 1,
    type: 'Carrusel',
    title: '7 Pilares que sostienen un negocio',
    caption: 'Mucha gente cree que un negocio crece solo por vender más. Hoy desglosamos los 7 pilares silenciosos de la estructura corporativa. Desliza para entender el orden real.',
    strategyNote: 'Establece autoridad metodológica inmediata al inicio del mes. Desmonta el mito del crecimiento simplista.',
    pillar: 'La Visión'
  },
  {
    day: 2,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 3,
    type: 'Reel',
    title: 'No te involucres en los problemas de tus empleadas',
    caption: 'El error del líder empático es convertirse en psicólogo de su equipo. Tu rol es diseñar el sistema para que realicen su trabajo de forma autónoma, no cargar con su desorganización.',
    strategyNote: 'Dirigido a fundadoras que sufren de burnout debido a la gestión de personal. Apunta a la fibra del dolor de liderazgo.',
    pillar: 'La Voz'
  },
  {
    day: 4,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 5,
    type: 'Reel',
    title: 'No sabes cuánto ganas',
    caption: 'Confundir facturación con beneficio es el primer paso hacia la quiebra invisible. Muchos dueños de salones celebran cifras récord mientras sus cuentas personales siguen vacías.',
    strategyNote: 'Educación financiera contundente. Posiciona la marca como experta en viabilidad de negocio real.',
    pillar: 'La Visión'
  },
  {
    day: 6,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 7,
    type: 'Reel',
    title: 'Trabajas todo el día',
    caption: 'Si tu salón no funciona sin ti, no tienes un negocio; tienes un autoempleo muy caro. La libertad no se compra ganando más, sino estructurando mejor.',
    strategyNote: 'Atracción de clientes cansadas de la esclavitud operativa. Muestra el camino hacia la delegación sistémica.',
    pillar: 'La Narrativa'
  },
  {
    day: 8,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 9,
    type: 'Reel',
    title: 'Liderar te cuesta mucho',
    caption: 'El liderazgo no es un don; es un proceso documentado. Si cada decisión en tu empresa requiere tu aprobación, estás frenando activamente tu propio crecimiento.',
    strategyNote: 'Establece el puente hacia la creación de manuales de procesos y roles claros.',
    pillar: 'El Posicionamiento'
  },
  {
    day: 10,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 11,
    type: 'Carrusel',
    title: 'Delegar un salón: por qué a muchas les sale mal',
    caption: 'Delegar no es "darle trabajo a otros" y esperar lo mejor. Es transferir responsabilidad mediante sistemas de medición. Aquí tienes los 3 errores fatales.',
    strategyNote: 'Profundización en un carrusel educativo. Aporta valor táctico de alta gama para fidelizar la audiencia cualificada.',
    pillar: 'La Diferenciación'
  },
  {
    day: 12,
    type: 'Reel',
    title: 'Tu salón te agota completamente',
    caption: 'Llegar a casa exhausta pensando en nóminas, inventarios y quejas no es normal. Tu negocio debería ser una fuente de paz y recursos, no tu principal estresor diario.',
    strategyNote: 'Conexión emocional profunda basada en el día a día del cliente. Genera alivio y empatía.',
    pillar: 'La Voz'
  },
  {
    day: 13,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 14,
    type: 'Reel',
    title: 'Tener más clientas no arregla el caos',
    caption: 'Llenar la agenda de un negocio desorganizado solo multiplica el desastre. Primero optimiza el sistema de atención y el margen, luego atrae volumen.',
    strategyNote: 'Provoca un cambio de paradigma (Aha Moment). Desafía la creencia común de que el marketing de atracción lo soluciona todo.',
    pillar: 'El Posicionamiento'
  },
  {
    day: 15,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 16,
    type: 'Reel',
    title: 'Rocío y su miedo a contratar',
    caption: 'Caso de estudio: Cómo Rocío pasó de trabajar sola 12 horas diarias a liderar un equipo de 4 personas en menos de 90 días gracias al diseño de perfiles de puesto.',
    strategyNote: 'Prueba social implícita. Relata una transformación real quitando el miedo a la expansión de equipo.',
    pillar: 'La Narrativa'
  },
  {
    day: 17,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 18,
    type: 'Carrusel',
    title: 'Estar ocupada en tu salón, no es lo mismo que avanzar',
    caption: '¿Pasas el día apagando fuegos urgentes pero sientes que tu negocio está en el mismo sitio que hace un año? Confundes actividad con progreso.',
    strategyNote: 'Análisis de productividad de alta gama. Define la diferencia entre trabajar "en" el negocio y trabajar "para" el negocio.',
    pillar: 'La Visión'
  },
  {
    day: 19,
    type: 'Reel',
    title: 'Crecer así puede ser peligroso',
    caption: 'Abrir una segunda sucursal cuando la primera aún requiere tu presencia física es el camino más rápido para duplicar tus problemas y dividir tus ingresos por dos.',
    strategyNote: 'Advertencia estratégica para fundadores ambiciosos pero desorganizados. Frena el impulso de crecer sin bases.',
    pillar: 'La Visión'
  },
  {
    day: 20,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 21,
    type: 'Reel',
    title: 'Testimonio Kathe y Hugo',
    caption: '“Pensábamos que la consistencia en redes era publicar lo que fuera. Ápice nos dio un marco mental. Ahora cada Reel atrae a clientes corporativos dispuestos a pagar el doble.”',
    strategyNote: 'Prueba social explícita. Demuestra que la estructura de comunicación se traduce en un incremento directo de tarifas.',
    pillar: 'La Diferenciación'
  },
  {
    day: 22,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 23,
    type: 'Reel',
    title: 'Tu salón necesita estructura',
    caption: 'Un salón de belleza exitoso es una fábrica de experiencias repetibles. Si la calidad depende de quién atienda hoy, no tienes un sistema de marca.',
    strategyNote: 'Apunta a la consistencia del servicio. Impulsa la estandarización como única vía de libertad.',
    pillar: 'La Narrativa'
  },
  {
    day: 24,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 25,
    type: 'Carrusel',
    title: 'Tu salón no debería quitarte la vida que quieres',
    caption: 'Creaste tu negocio para ser libre y vivir bajo tus propios términos. Si hoy eres esclava de tu local, es hora de rediseñar tu relación con la empresa.',
    strategyNote: 'Cierre de ciclo emocional. Apela a la libertad y el estilo de vida del fundador. Conecta con el propósito humano.',
    pillar: 'La Voz'
  },
  {
    day: 26,
    type: 'Reel',
    title: 'Los dueños no trabajan en sus empresas',
    caption: 'El verdadero dueño de negocio es un asignador de capital y diseñador de sistemas. Si estás barriendo, cobrando o aplicando el producto, eres un empleado con responsabilidades de dueño.',
    strategyNote: 'Declaración audaz e incómoda que fuerza la reflexión del target.',
    pillar: 'El Posicionamiento'
  },
  {
    day: 27,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 28,
    type: 'Reel',
    title: 'Seguir Mal Es Una Decisión',
    caption: 'Seguir quejándote del personal, del mercado y del cansancio sin cambiar tu estructura operativa es decidir activamente mantenerte en el caos. La claridad es una elección.',
    strategyNote: 'Llamada a la acción psicológica (CTA implícito). Empuja al visitante a tomar una decisión de cambio.',
    pillar: 'La Diferenciación'
  },
  {
    day: 29,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  },
  {
    day: 30,
    type: 'Reel',
    title: 'Testimonio María José',
    caption: '“Trabajaba fines de semana completos y sentía que mi marca era invisible. El método Ápice ordenó mi cabeza y mi comunicación. Hoy tengo 3 semanas de lista de espera.”',
    strategyNote: 'Prueba social final de gran impacto antes del cierre mensual.',
    pillar: 'La Voz'
  },
  {
    day: 31,
    type: 'Empty',
    title: '',
    caption: '',
    strategyNote: '',
    pillar: ''
  }
];

export const transformationStories: StoryTransformation[] = [
  {
    clientName: 'Rosana',
    niche: 'Salones de Belleza de Alta Gama',
    program: 'Programa Despegue',
    before: 'Publicaba diariamente fotos de antes y después sin estrategia. Agotada, sintiéndose esclava de la agenda y de las redes.',
    after: 'Sistema editorial predictivo de 30 días. Procesos delegados y tarifas duplicadas. Su comunicación atrae únicamente a clientes que valoran la experiencia y pagan premium sin cuestionar.',
    quote: '“Por fin mi comunicación está a la altura de mi experiencia. Ápice eliminó el ruido y me dio un sistema real, no consejos de gurú de Instagram.”'
  },
  {
    clientName: 'Alejandro',
    niche: 'Consultoría de Operaciones Financieras',
    program: 'Ecosistema Completo',
    before: 'Ventas basadas puramente en referidos. Redes sociales inactivas por vergüenza a sonar genérico o infantil.',
    after: 'Identidad verbal sólida y sobria en LinkedIn y Youtube. Ecosistema de contenido que educa al cliente corporativo antes de la primera llamada. El 40% de nuevos clientes llegan listos para firmar.',
    quote: '“Ápice entendió que yo no quería bailar en Reels. Diseñaron una comunicación sobria y arquitectónica que genera reuniones de miles de euros.”'
  }
];
