import type { Localized } from "./types";

/**
 * Privacy Policy and Terms & Conditions content.
 *
 * These are general-purpose templates written for a small Costa Rican surf
 * school / tour operator — NOT legal advice. Before relying on them, have a
 * Costa Rican lawyer review them, and confirm every item marked
 * TODO(client) below matches how the business really operates (especially
 * the cancellation policy, which is a commonly used default, not a policy
 * the client has confirmed).
 */

export type LegalSection = {
  title: Localized<string>;
  paragraphs?: Localized<string[]>;
  bullets?: Localized<string[]>;
};

export type LegalDocument = {
  title: Localized<string>;
  updated: Localized<string>;
  intro: Localized<string>;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: { en: "Privacy Policy", es: "Política de Privacidad" },
  updated: {
    en: "Last updated: November 13, 2026",
    es: "Última actualización: 13 de noviembre de 2026",
  },
  intro: {
    en: "Zalty Boyz (\"we\", \"us\") runs surf lessons and tours in Cocles, Puerto Viejo de Talamanca, Limón, Costa Rica. This policy explains what personal information we collect through this website and when you book with us, how we use it, and the choices you have. We follow Costa Rica's Law No. 8968 on the Protection of Persons Regarding the Processing of Their Personal Data, and we aim to respect the privacy rights of visitors from other countries too.",
    es: "Zalty Boyz (\"nosotros\") ofrece clases de surf y tours en Cocles, Puerto Viejo de Talamanca, Limón, Costa Rica. Esta política explica qué información personal recopilamos a través de este sitio web y cuando reservas con nosotros, cómo la usamos y qué opciones tienes. Cumplimos con la Ley N.° 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de Costa Rica, y buscamos respetar también los derechos de privacidad de visitantes de otros países.",
  },
  sections: [
    {
      title: { en: "Information we collect", es: "Información que recopilamos" },
      bullets: {
        en: [
          "Contact form: your name, email, phone number (optional), travel dates, the activity you're interested in, and your message.",
          "WhatsApp: when you message us (including through the \"Check Availability\" button), we receive your phone number, WhatsApp profile name, and whatever you write — such as dates, group size, and activities.",
          "Bookings: details needed to run your activity safely, such as the number of people, ages of minors, surf or swimming experience, and any health conditions or allergies you choose to tell us about.",
          "Analytics (only if you accept cookies): pages visited, approximate location (country/city), device and browser type, and how you found our site. See our Cookie Policy.",
          "Technical data: like any website, our hosting provider automatically processes your IP address and basic request information to deliver pages and protect the site from abuse.",
        ],
        es: [
          "Formulario de contacto: tu nombre, correo electrónico, número de teléfono (opcional), fechas de viaje, la actividad que te interesa y tu mensaje.",
          "WhatsApp: cuando nos escribes (incluso mediante el botón \"Consultar disponibilidad\"), recibimos tu número de teléfono, tu nombre de perfil de WhatsApp y lo que escribas — como fechas, tamaño del grupo y actividades.",
          "Reservas: los datos necesarios para realizar tu actividad de forma segura, como el número de personas, la edad de menores, experiencia en surf o natación, y cualquier condición de salud o alergia que decidas contarnos.",
          "Analítica (solo si aceptas las cookies): páginas visitadas, ubicación aproximada (país/ciudad), tipo de dispositivo y navegador, y cómo encontraste nuestro sitio. Consulta nuestra Política de Cookies.",
          "Datos técnicos: como cualquier sitio web, nuestro proveedor de hosting procesa automáticamente tu dirección IP e información básica de la solicitud para mostrar las páginas y proteger el sitio contra abusos.",
        ],
      },
    },
    {
      title: { en: "How we use it", es: "Cómo la usamos" },
      bullets: {
        en: [
          "To answer your questions and arrange, confirm, and run your lessons, tours, massages, or classes.",
          "To keep you safe — for example, choosing the right surf spot or tour for your level and health.",
          "To understand how visitors use our website so we can improve it (analytics, only with your consent).",
          "To meet legal, tax, and insurance obligations.",
        ],
        es: [
          "Para responder tus preguntas y organizar, confirmar y realizar tus clases, tours, masajes o sesiones de yoga.",
          "Para tu seguridad — por ejemplo, elegir el lugar de surf o el tour adecuado para tu nivel y salud.",
          "Para entender cómo se usa nuestro sitio web y mejorarlo (analítica, solo con tu consentimiento).",
          "Para cumplir obligaciones legales, tributarias y de seguros.",
        ],
      },
      paragraphs: {
        en: [
          "We don't sell or rent your personal information, and we don't use it for advertising. We'll only send you marketing messages if you've asked us to.",
        ],
        es: [
          "No vendemos ni alquilamos tu información personal, y no la usamos para publicidad. Solo te enviaremos mensajes promocionales si nos lo has pedido.",
        ],
      },
    },
    {
      title: { en: "Who we share it with", es: "Con quién la compartimos" },
      paragraphs: {
        en: [
          "We only share your information with service providers that help us run the business, and only as much as they need:",
        ],
        es: [
          "Solo compartimos tu información con proveedores que nos ayudan a operar el negocio, y únicamente lo necesario:",
        ],
      },
      bullets: {
        en: [
          "WhatsApp / Meta — to message with you.",
          "Our email provider — to deliver contact-form messages to our inbox.",
          "Our website hosting provider — to run this website.",
          "Google — for Google Analytics (only with your consent), and for the Google Maps and YouTube content shown on some pages.",
          "Our partner instructors and therapists (for example, for massage or yoga) — only the details needed to provide the service you booked.",
          "Authorities, insurers, or emergency services — when required by law or needed to protect someone's safety.",
        ],
        es: [
          "WhatsApp / Meta — para comunicarnos contigo.",
          "Nuestro proveedor de correo electrónico — para entregar los mensajes del formulario de contacto.",
          "Nuestro proveedor de hosting — para operar este sitio web.",
          "Google — para Google Analytics (solo con tu consentimiento), y para el contenido de Google Maps y YouTube que aparece en algunas páginas.",
          "Nuestros instructores y terapeutas aliados (por ejemplo, de masaje o yoga) — solo los datos necesarios para el servicio que reservaste.",
          "Autoridades, aseguradoras o servicios de emergencia — cuando la ley lo exija o sea necesario para proteger la seguridad de alguien.",
        ],
      },
    },
    {
      title: { en: "International transfers", es: "Transferencias internacionales" },
      paragraphs: {
        en: [
          "Some of these providers (such as Google, Meta, and our hosting and email providers) store data on servers outside Costa Rica, including in the United States. By using this website or contacting us, you understand your information may be processed in those countries, which may have different data protection rules.",
        ],
        es: [
          "Algunos de estos proveedores (como Google, Meta y nuestros proveedores de hosting y correo) almacenan datos en servidores fuera de Costa Rica, incluso en Estados Unidos. Al usar este sitio web o contactarnos, entiendes que tu información puede procesarse en esos países, que pueden tener normas de protección de datos distintas.",
        ],
      },
    },
    {
      title: { en: "Photos and videos", es: "Fotos y videos" },
      paragraphs: {
        en: [
          "We often take photos and videos during lessons and tours, and some may be shared with you or used on our website, YouTube, or social media. If you'd prefer not to appear in our content, just tell us before or during your activity — or ask us later and we'll remove published content showing you where we reasonably can.",
        ],
        es: [
          "Con frecuencia tomamos fotos y videos durante las clases y tours, y algunos pueden compartirse contigo o usarse en nuestro sitio web, YouTube o redes sociales. Si prefieres no aparecer en nuestro contenido, avísanos antes o durante tu actividad — o pídenoslo después y retiraremos el contenido publicado en el que aparezcas, en la medida de lo razonable.",
        ],
      },
    },
    {
      title: { en: "How long we keep it", es: "Cuánto tiempo la conservamos" },
      paragraphs: {
        en: [
          "We keep inquiry and booking information only as long as needed to provide our services and meet legal, tax, and insurance requirements — then we delete it. Analytics data is kept by Google for up to 14 months.",
        ],
        es: [
          "Conservamos la información de consultas y reservas solo el tiempo necesario para prestar nuestros servicios y cumplir requisitos legales, tributarios y de seguros — luego la eliminamos. Google conserva los datos de analítica hasta por 14 meses.",
        ],
      },
    },
    {
      title: { en: "Your rights", es: "Tus derechos" },
      paragraphs: {
        en: [
          "You can ask us to access, correct, update, or delete your personal information, or withdraw your consent to how we use it (including analytics, at any time via \"Cookie settings\" in the footer). Message us on WhatsApp and we'll respond within a reasonable time. Depending on where you live (for example, the EU, UK, or California), you may have additional rights, and you can also contact your local data protection authority — in Costa Rica, that's PRODHAB (Agencia de Protección de Datos de los Habitantes).",
        ],
        es: [
          "Puedes solicitarnos acceder, rectificar, actualizar o eliminar tu información personal, o retirar tu consentimiento sobre su uso (incluida la analítica, en cualquier momento desde \"Configuración de cookies\" en el pie de página). Escríbenos por WhatsApp y responderemos en un plazo razonable. Según dónde vivas (por ejemplo, la UE, el Reino Unido o California), podrías tener derechos adicionales, y también puedes contactar a tu autoridad local de protección de datos — en Costa Rica, la PRODHAB (Agencia de Protección de Datos de los Habitantes).",
        ],
      },
    },
    {
      title: { en: "Children", es: "Menores de edad" },
      paragraphs: {
        en: [
          "This website isn't aimed at children, and we don't knowingly collect personal information online from anyone under 18. Bookings for minors must be made by a parent or legal guardian.",
        ],
        es: [
          "Este sitio web no está dirigido a menores, y no recopilamos a sabiendas información personal en línea de personas menores de 18 años. Las reservas para menores deben hacerlas su madre, padre o tutor legal.",
        ],
      },
    },
    {
      title: { en: "Security", es: "Seguridad" },
      paragraphs: {
        en: [
          "We use reputable providers and reasonable measures to protect your information, and this website is served over an encrypted (HTTPS) connection. No method of transmission or storage is 100% secure, so we can't guarantee absolute security.",
        ],
        es: [
          "Usamos proveedores confiables y medidas razonables para proteger tu información, y este sitio se sirve mediante una conexión cifrada (HTTPS). Ningún método de transmisión o almacenamiento es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.",
        ],
      },
    },
    {
      title: { en: "Changes to this policy", es: "Cambios a esta política" },
      paragraphs: {
        en: [
          "We may update this policy from time to time. The \"last updated\" date at the top shows when it last changed.",
        ],
        es: [
          "Podemos actualizar esta política ocasionalmente. La fecha de \"última actualización\" al inicio indica cuándo cambió por última vez.",
        ],
      },
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: { en: "Terms & Conditions", es: "Términos y Condiciones" },
  updated: {
    en: "Last updated: November 13, 2026",
    es: "Última actualización: 13 de noviembre de 2026",
  },
  intro: {
    en: "These terms apply when you use this website or book a surf lesson, tour, package, massage, or class with Zalty Boyz (\"we\", \"us\"), based in Cocles, Puerto Viejo de Talamanca, Limón, Costa Rica. By using the site or booking with us, you agree to them — please read them, especially the sections on risk and liability.",
    es: "Estos términos aplican cuando usas este sitio web o reservas una clase de surf, tour, paquete, masaje o clase con Zalty Boyz (\"nosotros\"), con sede en Cocles, Puerto Viejo de Talamanca, Limón, Costa Rica. Al usar el sitio o reservar con nosotros, los aceptas — por favor léelos, especialmente las secciones sobre riesgos y responsabilidad.",
  },
  sections: [
    {
      title: { en: "Bookings", es: "Reservas" },
      paragraphs: {
        en: [
          "Messages and forms sent through this website are inquiries, not confirmed bookings. A booking is confirmed only once we confirm it with you directly (usually on WhatsApp), including the date, time, meeting point, and price. Bookings for anyone under 18 must be made by a parent or legal guardian.",
        ],
        es: [
          "Los mensajes y formularios enviados por este sitio son consultas, no reservas confirmadas. Una reserva queda confirmada solo cuando te la confirmamos directamente (normalmente por WhatsApp), incluida la fecha, hora, punto de encuentro y precio. Las reservas para menores de 18 años deben hacerlas su madre, padre o tutor legal.",
        ],
      },
    },
    {
      title: { en: "Prices and payment", es: "Precios y pago" },
      paragraphs: {
        en: [
          "Prices on this website are in US dollars, per person unless stated otherwise, and are a guide only — \"from\" prices and package prices can vary with group size, season, transport, and the options you choose. The price we confirm with you when you book is the one that applies. We accept cash (preferred), SINPE Móvil, Zelle, PayPal, and bank transfer, and we'll tell you whether a deposit is needed when we confirm your booking.",
        ],
        es: [
          "Los precios en este sitio están en dólares estadounidenses, por persona salvo que se indique lo contrario, y son solo una referencia — los precios \"desde\" y los de los paquetes pueden variar según el tamaño del grupo, la temporada, el transporte y las opciones que elijas. Aplica el precio que te confirmemos al reservar. Aceptamos efectivo (preferido), SINPE Móvil, Zelle, PayPal y transferencia bancaria, y te indicaremos si se requiere un depósito al confirmar tu reserva.",
        ],
      },
    },
    {
      // TODO(client): confirm these cancellation/refund rules match how the
      // business actually works before going live.
      title: { en: "Cancellations, changes, and refunds", es: "Cancelaciones, cambios y reembolsos" },
      bullets: {
        en: [
          "If you cancel or change your booking at least 24 hours before the start time, you can reschedule or receive a full refund of anything you've paid.",
          "Cancellations with less than 24 hours' notice, and no-shows, may be charged in full.",
          "If we cancel because of weather, ocean conditions, or safety concerns, we'll offer you a new date or a full refund.",
          "If you arrive late, we may need to shorten the activity so the next group isn't affected; the full price still applies.",
          "Packages and private trips (such as the Mini Surf Trip) may have different terms, which we'll explain when you book.",
        ],
        es: [
          "Si cancelas o cambias tu reserva con al menos 24 horas de anticipación, puedes reprogramarla o recibir un reembolso completo de lo que hayas pagado.",
          "Las cancelaciones con menos de 24 horas de aviso, y las ausencias sin aviso, pueden cobrarse en su totalidad.",
          "Si cancelamos por clima, condiciones del mar o motivos de seguridad, te ofreceremos una nueva fecha o un reembolso completo.",
          "Si llegas tarde, es posible que debamos acortar la actividad para no afectar al siguiente grupo; se aplica el precio completo.",
          "Los paquetes y viajes privados (como el Mini Viaje de Surf) pueden tener condiciones distintas, que te explicaremos al reservar.",
        ],
      },
    },
    {
      title: { en: "Weather and conditions", es: "Clima y condiciones" },
      paragraphs: {
        en: [
          "Surf and outdoor activities depend on nature. Our guides and instructors may change the location, timing, route, or content of an activity — or stop it — if weather, ocean, river, or trail conditions make it unsafe or unsuitable. Their decisions on safety are final. Wildlife sightings are never guaranteed.",
        ],
        es: [
          "Las actividades de surf y al aire libre dependen de la naturaleza. Nuestros guías e instructores pueden cambiar el lugar, el horario, la ruta o el contenido de una actividad — o suspenderla — si el clima o las condiciones del mar, del río o de los senderos la hacen insegura o inadecuada. Sus decisiones sobre seguridad son definitivas. Nunca se garantiza ver fauna.",
        ],
      },
    },
    {
      title: { en: "Health, fitness, and safety", es: "Salud, condición física y seguridad" },
      bullets: {
        en: [
          "You confirm that you (and anyone you book for) are in good health and fit enough for the activity. Water activities require being comfortable in the water; please tell us if you can't swim.",
          "Tell us before your activity about any medical conditions, injuries, pregnancy, allergies, or medications that could affect your safety.",
          "Follow your instructor's or guide's instructions at all times. We may refuse or end participation, without refund, for anyone who acts unsafely or appears to be under the influence of alcohol or drugs.",
          "Minors must be supervised by a parent or guardian, who is responsible for them, unless we agree otherwise in writing.",
          "We recommend that you have travel and medical insurance that covers adventure activities.",
        ],
        es: [
          "Confirmas que tú (y cualquier persona para quien reserves) gozan de buena salud y tienen la condición física adecuada para la actividad. Las actividades acuáticas requieren sentirse cómodo en el agua; avísanos si no sabes nadar.",
          "Infórmanos antes de tu actividad sobre cualquier condición médica, lesión, embarazo, alergia o medicamento que pueda afectar tu seguridad.",
          "Sigue en todo momento las indicaciones de tu instructor o guía. Podemos negar o terminar la participación, sin reembolso, de cualquier persona que actúe de forma insegura o parezca estar bajo los efectos del alcohol o drogas.",
          "Los menores deben estar supervisados por su madre, padre o tutor, quien es responsable de ellos, salvo que acordemos otra cosa por escrito.",
          "Recomendamos contar con un seguro de viaje y médico que cubra actividades de aventura.",
        ],
      },
    },
    {
      title: { en: "Assumption of risk", es: "Aceptación de riesgos" },
      paragraphs: {
        en: [
          "Surfing, paddling, swimming, hiking, and night walks in the rainforest involve inherent risks that can't be completely removed, even with careful instruction and supervision. These include, among others: waves, currents, and rip tides; contact with surfboards, paddles, rocks, reefs, and other people; slippery, steep, or uneven terrain; river crossings and waterfalls; heat, sun, and dehydration; insects, snakes, and other wildlife; and the time it can take to reach medical help in a rural area.",
          "By taking part, you understand and voluntarily accept these risks for yourself and anyone you book for. We may ask participants (or a parent or guardian for minors) to sign a written waiver and release form before the activity.",
        ],
        es: [
          "El surf, el remo, la natación, las caminatas y los recorridos nocturnos en la selva implican riesgos inherentes que no pueden eliminarse por completo, incluso con instrucción y supervisión cuidadosas. Entre otros: olas, corrientes y corrientes de resaca; contacto con tablas, remos, rocas, arrecifes y otras personas; terreno resbaloso, empinado o irregular; cruces de río y cascadas; calor, sol y deshidratación; insectos, serpientes y otra fauna; y el tiempo que puede tomar recibir atención médica en una zona rural.",
          "Al participar, entiendes y aceptas voluntariamente estos riesgos para ti y para cualquier persona para quien reserves. Podemos pedir a los participantes (o a su madre, padre o tutor en el caso de menores) que firmen un formulario de exoneración de responsabilidad antes de la actividad.",
        ],
      },
    },
    {
      title: { en: "Massage, yoga, and wellness services", es: "Masajes, yoga y servicios de bienestar" },
      paragraphs: {
        en: [
          "Massage, Reiki, Watsu, craniosacral therapy, and yoga are offered for relaxation and general well-being. They aren't medical treatment and don't replace advice from a doctor. Please consult a doctor before taking part if you're pregnant, injured, or have a medical condition, and tell your therapist or teacher about it beforehand. Practice within your own limits and stop if anything feels wrong. Some of these services are provided by partner practitioners and venues (such as One Love Wellness), who are responsible for the services they provide.",
        ],
        es: [
          "El masaje, Reiki, Watsu, la terapia craneosacral y el yoga se ofrecen para la relajación y el bienestar general. No son un tratamiento médico ni reemplazan el consejo de un médico. Consulta a tu médico antes de participar si estás embarazada, lesionado o tienes alguna condición médica, e infórmale a tu terapeuta o instructora con anticipación. Practica dentro de tus propios límites y detente si algo no se siente bien. Algunos de estos servicios los brindan terapeutas y espacios aliados (como One Love Wellness), quienes son responsables de los servicios que prestan.",
        ],
      },
    },
    {
      title: { en: "Personal belongings and equipment", es: "Pertenencias personales y equipo" },
      paragraphs: {
        en: [
          "You're responsible for your own belongings during activities; we aren't responsible for lost, stolen, or damaged personal items (including phones and cameras taken on the water). Please treat the boards and equipment we provide with care — you may be asked to pay for damage caused by misuse or negligence (normal wear and tear excluded).",
        ],
        es: [
          "Eres responsable de tus pertenencias durante las actividades; no nos hacemos responsables por objetos personales perdidos, robados o dañados (incluidos teléfonos y cámaras llevados al agua). Cuida las tablas y el equipo que te proporcionamos — podríamos pedirte pagar los daños causados por mal uso o negligencia (excepto el desgaste normal).",
        ],
      },
    },
    {
      title: { en: "Limitation of liability", es: "Limitación de responsabilidad" },
      paragraphs: {
        en: [
          "To the fullest extent permitted by Costa Rican law, we aren't liable for injury, loss, damage, or expense arising from the inherent risks of the activities described above, from your failure to follow instructions or to disclose relevant health information, from events outside our reasonable control (such as weather, natural events, strikes, or road closures), or from services provided by independent third parties. Where we are found liable, our total liability is limited to the amount you paid us for the activity concerned. Nothing in these terms limits liability that can't be limited by law, including for gross negligence or intentional misconduct, or your rights as a consumer under Costa Rica's Law No. 7472.",
        ],
        es: [
          "En la máxima medida permitida por la ley costarricense, no somos responsables por lesiones, pérdidas, daños o gastos derivados de los riesgos inherentes de las actividades descritas, de no seguir las instrucciones o no informar datos de salud relevantes, de hechos fuera de nuestro control razonable (como clima, eventos naturales, huelgas o cierres de carreteras), ni de servicios prestados por terceros independientes. Si se nos declara responsables, nuestra responsabilidad total se limita al monto que nos pagaste por la actividad correspondiente. Nada en estos términos limita la responsabilidad que no pueda limitarse por ley, incluida la culpa grave o el dolo, ni tus derechos como consumidor según la Ley N.° 7472 de Costa Rica.",
        ],
      },
    },
    {
      title: { en: "Website content", es: "Contenido del sitio web" },
      paragraphs: {
        en: [
          "We try to keep this website accurate and up to date, but descriptions, schedules, photos, and prices are for general information and may change without notice. Photos show typical experiences, not guaranteed conditions. Links to other websites (such as Google Maps, YouTube, WhatsApp, or surf forecasts) are provided for convenience, and we aren't responsible for their content.",
          "All text, photos, videos, logos, and design on this website belong to Zalty Boyz or are used with permission or under a free license. Please don't copy or reuse them without our written permission.",
        ],
        es: [
          "Procuramos que este sitio sea preciso y esté actualizado, pero las descripciones, horarios, fotos y precios son información general y pueden cambiar sin previo aviso. Las fotos muestran experiencias típicas, no condiciones garantizadas. Los enlaces a otros sitios (como Google Maps, YouTube, WhatsApp o pronósticos de surf) se ofrecen por conveniencia, y no somos responsables de su contenido.",
          "Todos los textos, fotos, videos, logotipos y el diseño de este sitio pertenecen a Zalty Boyz o se usan con permiso o bajo una licencia libre. Por favor no los copies ni reutilices sin nuestro permiso por escrito.",
        ],
      },
    },
    {
      title: { en: "Governing law", es: "Ley aplicable" },
      paragraphs: {
        en: [
          "These terms are governed by the laws of the Republic of Costa Rica. If a disagreement comes up, please message us first — we'll do our best to sort it out directly. If we can't, it will be handled by the competent courts of Costa Rica, without affecting any mandatory consumer rights you have.",
          "If any part of these terms is found to be invalid, the rest still applies. We may update these terms from time to time; the version on this page when you book is the one that applies to your booking.",
        ],
        es: [
          "Estos términos se rigen por las leyes de la República de Costa Rica. Si surge algún desacuerdo, escríbenos primero — haremos lo posible por resolverlo directamente. Si no es posible, lo resolverán los tribunales competentes de Costa Rica, sin afectar los derechos obligatorios que tengas como consumidor.",
          "Si alguna parte de estos términos se considera inválida, el resto sigue vigente. Podemos actualizar estos términos ocasionalmente; aplica a tu reserva la versión publicada en esta página al momento de reservar.",
        ],
      },
    },
  ],
};
