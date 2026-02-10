/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   Dominio: Plataforma de Alquiler Vacacional
   Anfitrión: Cristian Martinez
   ============================================

   Características ES2023 utilizadas:
   - const/let para declaraciones de variables
   - Template literals para contenido dinámico
   - Arrow functions para todas las funciones
   - Destructuring de objetos y arrays
   - Optional chaining (?.)
   - Nullish coalescing (??)

   ============================================ */

// ============================================
// TODO 1: Crear el objeto de datos del dominio
// ============================================
// Dominio: Plataforma de Alquiler Vacacional
// Entidad: Anfitrión profesional

const entityData = {
  // Información básica del anfitrión
  name: 'Cristian Martinez',
  title: 'Anfitrión Profesional',
  identifier: 'HOST-2025-CM',
  bio: 'Anfitrión con más de 5 años de experiencia en alquileres vacacionales. Me apasiona ofrecer experiencias únicas a mis huéspedes y mostrar lo mejor de Colombia. Especializado en propiedades urbanas y rurales de alta calidad.',
  
  // Información de contacto
  contact: {
    email: 'cristian.martinez@vacaciones.com',
    phone: '+57 312 456 7890',
    location: 'Bogotá, Colombia',
    whatsapp: '+57 312 456 7890'
  },

  // Iniciales para el avatar
  initials: 'CM',

  // Propiedades disponibles (items del dominio)
  items: [
    { 
      name: 'Apartamento Centro', 
      level: 95, 
      category: 'Urbano',
      location: 'Bogotá',
      capacity: 4
    },
    { 
      name: 'Casa Cafetera', 
      level: 88, 
      category: 'Rural',
      location: 'Salento, Quindío',
      capacity: 6
    },
    { 
      name: 'Loft Moderno', 
      level: 92, 
      category: 'Urbano',
      location: 'Medellín',
      capacity: 2
    },
    { 
      name: 'Villa Playa', 
      level: 97, 
      category: 'Costero',
      location: 'Cartagena',
      capacity: 8
    },
    { 
      name: 'Cabaña Montaña', 
      level: 85, 
      category: 'Rural',
      location: 'Villa de Leyva',
      capacity: 5
    },
    { 
      name: 'Penthouse Premium', 
      level: 98, 
      category: 'Urbano',
      location: 'Bogotá',
      capacity: 6
    }
  ],

  // Enlaces y redes sociales
  links: [
    { 
      platform: 'Airbnb', 
      url: 'https://airbnb.com/cristian-martinez', 
      icon: '🏠' 
    },
    { 
      platform: 'Booking', 
      url: 'https://booking.com/cristian-martinez', 
      icon: '🌐' 
    },
    { 
      platform: 'Instagram', 
      url: 'https://instagram.com/cristian_vacaciones', 
      icon: '📸' 
    },
    { 
      platform: 'WhatsApp', 
      url: 'https://wa.me/573124567890', 
      icon: '💬' 
    }
  ],

  // Estadísticas del anfitrión
  stats: {
    totalProperties: 6,
    totalReservations: 342,
    rating: 4.9,
    yearsExperience: 5
  }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// ============================================
// Obtenemos todas las referencias necesarias usando const

// Elementos de información principal
const entityName = document.getElementById('entity-name');
const entityTitle = document.getElementById('entity-title');
const entityLocation = document.getElementById('entity-location');
const entityDescription = document.getElementById('entity-description');
const avatarInitials = document.getElementById('avatar-initials');

// Elementos de contacto
const entityEmail = document.getElementById('entity-email');
const entityPhone = document.getElementById('entity-phone');

// Contenedores de listas
const itemsList = document.getElementById('items-list');
const linksContainer = document.getElementById('links-container');
const statsContainer = document.getElementById('stats');

// Botones de interacción
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');

// Elementos de notificación
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ============================================
// TODO 3: Renderizar información básica
// ============================================
// Muestra la información principal del anfitrión

const renderBasicInfo = () => {
  // Destructuring para extraer propiedades del objeto
  const { 
    name, 
    title, 
    bio, 
    initials,
    contact: { email, phone, location } 
  } = entityData;

  // Actualizar elementos del DOM usando template literals
  entityName.textContent = name;
  entityTitle.textContent = title;
  entityLocation.textContent = `📍 ${location}`;
  entityDescription.innerHTML = `<p>${bio}</p>`;
  avatarInitials.textContent = initials;

  // Información de contacto
  entityEmail.textContent = email;
  entityPhone.textContent = phone;
};

// ============================================
// TODO 4: Renderizar lista de elementos (propiedades)
// ============================================
// Muestra las propiedades del anfitrión con barras de nivel

const renderItems = (showAll = false) => {
  // Extraer el array de propiedades
  const { items } = entityData;

  // Filtrar para mostrar solo las primeras 4 si showAll es false
  const itemsToShow = showAll ? items : items.slice(0, 4);

  // Usar map() para generar el HTML de cada propiedad
  const itemsHtml = itemsToShow.map(item => {
    // Destructuring de cada item
    const { name, level, category, location, capacity } = item;
    
    // Template literal para generar la estructura HTML
    return `
      <div class="item">
        <div class="item-name">${name}</div>
        <div class="item-category">📍 ${location} • 👥 ${capacity} huéspedes</div>
        <div class="item-level">
          <span>Ocupación: ${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Actualizar el contenedor de propiedades
  itemsList.innerHTML = itemsHtml;
};

// ============================================
// TODO 5: Renderizar enlaces/referencias
// ============================================
// Muestra los enlaces a plataformas y redes sociales

const renderLinks = () => {
  // Destructuring para extraer el array de links
  const { links } = entityData;

  // Usar map() para crear HTML de cada enlace
  const linksHtml = links.map(link => {
    const { platform, url, icon } = link;
    
    // Template literal para generar anchor tags
    return `
      <a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer">
        <span>${icon}</span>
        <span>${platform}</span>
      </a>
    `;
  }).join('');

  // Actualizar el contenedor de links
  linksContainer.innerHTML = linksHtml;
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================
// Muestra las estadísticas del anfitrión

const renderStats = () => {
  // Destructuring para extraer estadísticas
  const { stats } = entityData;

  // Crear array de objetos con label y value para cada estadística
  const statsArray = [
    { label: 'Propiedades', value: stats.totalProperties },
    { label: 'Reservaciones', value: stats.totalReservations },
    { label: 'Calificación', value: `${stats.rating} ⭐` },
    { label: 'Años Experiencia', value: stats.yearsExperience }
  ];

  // Generar HTML usando map() y template literals
  const statsHtml = statsArray.map(stat => {
    const { label, value } = stat;
    
    return `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `;
  }).join('');

  // Actualizar el contenedor de estadísticas
  statsContainer.innerHTML = statsHtml;
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================
// Permite alternar entre modo claro y oscuro

const toggleTheme = () => {
  // Obtener el tema actual del atributo data-theme
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  
  // Calcular el nuevo tema
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Actualizar el atributo data-theme
  document.documentElement.dataset.theme = newTheme;

  // Actualizar el ícono del botón
  const themeIcon = themeToggle.querySelector('.theme-icon');
  themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';

  // Guardar la preferencia en localStorage
  localStorage.setItem('theme', newTheme);

  // Mostrar notificación
  showToast(`Tema cambiado a modo ${newTheme === 'dark' ? 'oscuro' : 'claro'}`);
};

const loadTheme = () => {
  // Obtener el tema guardado de localStorage
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  
  // Aplicar el tema guardado
  document.documentElement.dataset.theme = savedTheme;
  
  // Actualizar el ícono del botón
  const themeIcon = themeToggle.querySelector('.theme-icon');
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================
// Copia la información del anfitrión al portapapeles

const copyInfo = () => {
  // Destructuring para extraer información relevante
  const { name, title, bio, contact, stats } = entityData;
  
  // Construir el texto a copiar usando template literals
  const infoText = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${name}
${title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email: ${contact.email}
📱 Teléfono: ${contact.phone}
📍 Ubicación: ${contact.location}

ACERCA DE MÍ:
${bio}

ESTADÍSTICAS:
✅ ${stats.totalProperties} Propiedades
✅ ${stats.totalReservations} Reservaciones
✅ ${stats.rating} ⭐ Calificación
✅ ${stats.yearsExperience} Años de Experiencia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();

  // Copiar al portapapeles usando la API moderna
  navigator.clipboard.writeText(infoText)
    .then(() => {
      // Mostrar notificación de éxito
      showToast('✅ ¡Información copiada al portapapeles!');
    })
    .catch(err => {
      // Manejar errores
      console.error('Error al copiar:', err);
      showToast('❌ Error al copiar información');
    });
};

// ============================================
// Función auxiliar para mostrar notificaciones toast
// ============================================
const showToast = message => {
  // Actualizar el mensaje del toast
  toastMessage.textContent = message;
  
  // Mostrar el toast añadiendo la clase 'show'
  toast.classList.add('show');

  // Ocultar el toast después de 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// ============================================
// Alterna entre mostrar todas las propiedades o solo las primeras 4

// Variable para rastrear el estado de visibilidad
let showingAllItems = false;

const handleToggleItems = () => {
  // Alternar el estado
  showingAllItems = !showingAllItems;
  
  // Re-renderizar items con el nuevo estado
  renderItems(showingAllItems);
  
  // Actualizar el texto del botón
  toggleItemsBtn.textContent = showingAllItems ? 'Mostrar menos ▲' : 'Mostrar más ▼';
  
  // Mostrar notificación
  const message = showingAllItems 
    ? `Mostrando todas las ${entityData.items.length} propiedades` 
    : 'Mostrando primeras 4 propiedades';
  showToast(message);
};

// ============================================
// TODO 10: Event Listeners
// ============================================
// Configurar todos los event listeners usando arrow functions

// Listener para cambio de tema
themeToggle.addEventListener('click', toggleTheme);

// Listener para copiar información
copyBtn.addEventListener('click', copyInfo);

// Listener para mostrar/ocultar propiedades
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================
// Función que inicializa todos los componentes

const init = () => {
  // Cargar tema guardado
  loadTheme();
  
  // Renderizar información básica
  renderBasicInfo();
  
  // Renderizar propiedades (primeras 4 por defecto)
  renderItems();
  
  // Renderizar enlaces sociales
  renderLinks();
  
  // Renderizar estadísticas
  renderStats();
  
  // Mensaje de éxito en consola
  console.log('✅ Aplicación inicializada correctamente');
  console.log('📊 Datos cargados:', entityData);
  
  // Calcular promedio de ocupación usando métodos de array
  const averageOccupancy = entityData.items.reduce((sum, item) => sum + item.level, 0) / entityData.items.length;
  console.log(`📈 Ocupación promedio: ${averageOccupancy.toFixed(1)}%`);
  
  // Mostrar toast de bienvenida
  setTimeout(() => {
    showToast(`¡Bienvenido! Perfil de ${entityData.name} cargado`);
  }, 500);
};

// Ejecutar init cuando el DOM esté listo
init();

// ============================================
// FUNCIONES ADICIONALES - Cálculos con arrays
// ============================================

/**
 * Calcula estadísticas adicionales usando métodos de array
 */
const calculateAdditionalStats = () => {
  const { items, stats } = entityData;
  
  // Filtrar propiedades por categoría
  const urbanProperties = items.filter(item => item.category === 'Urbano');
  const ruralProperties = items.filter(item => item.category === 'Rural');
  
  // Encontrar la propiedad con mayor ocupación
  const topProperty = items.reduce((max, item) => 
    item.level > max.level ? item : max
  );
  
  // Calcular capacidad total
  const totalCapacity = items.reduce((sum, item) => sum + item.capacity, 0);
  
  console.log('📊 Estadísticas adicionales:');
  console.log(`   • Propiedades urbanas: ${urbanProperties.length}`);
  console.log(`   • Propiedades rurales: ${ruralProperties.length}`);
  console.log(`   • Propiedad destacada: ${topProperty.name} (${topProperty.level}%)`);
  console.log(`   • Capacidad total: ${totalCapacity} huéspedes`);
};

// Ejecutar cálculos adicionales
calculateAdditionalStats();

// ============================================
// CHECKLIST DE VERIFICACIÓN ✅
// ============================================
// ✅ La información del anfitrión se muestra correctamente
// ✅ Las propiedades muestran niveles/porcentajes con barras
// ✅ Los enlaces funcionan y abren en nueva pestaña
// ✅ Las estadísticas se muestran correctamente
// ✅ El cambio de tema funciona (claro/oscuro)
// ✅ El botón de copiar funciona y muestra notificación
// ✅ El botón de mostrar más/menos funciona
// ✅ Todo usa sintaxis ES2023 (sin var, sin funciones tradicionales)
// ✅ Template literals para toda interpolación de strings
// ✅ Arrow functions en todo el código
// ✅ Destructuring usado donde corresponde
// ✅ Comentarios en español
// ✅ Nomenclatura técnica en inglés
