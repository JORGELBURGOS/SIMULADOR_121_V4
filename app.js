document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales del simulador
    const initialData = {
        clients: [
            { id: 1, name: 'Mercado Pago', type: 'Fintech' },
            { id: 2, name: 'Banco Galicia', type: 'Banco' },
            { id: 3, name: 'Ualá', type: 'Fintech' },
            { id: 4, name: 'Santander', type: 'Banco' },
            { id: 5, name: 'Personal Pay', type: 'Fintech' },
            { id: 6, name: 'BBVA', type: 'Banco' },
            { id: 7, name: 'Brubank', type: 'Fintech' },
            { id: 8, name: 'Naranja X', type: 'Fintech' },
            { id: 9, name: 'Banco Macro', type: 'Banco' },
            { id: 10, name: 'Lemon Cash', type: 'Fintech' },
            { id: 11, name: 'Banco Provincia', type: 'Banco' },
            { id: 12, name: 'Rebanking', type: 'Fintech' },
            { id: 13, name: 'Banco Ciudad', type: 'Banco' },
            { id: 14, name: 'Belo', type: 'Fintech' },
            { id: 15, name: 'Banco Hipotecario', type: 'Banco' },
            { id: 16, name: 'Prex', type: 'Fintech' },
            { id: 17, name: 'Banco Patagonia', type: 'Banco' },
            { id: 18, name: 'Ripio', type: 'Fintech' },
            { id: 19, name: 'Banco Comafi', type: 'Banco' },
            { id: 20, name: 'Buenbit', type: 'Fintech' }
        ],
        products: [
            { id: 1, name: 'Transferencias Inmediatas Salientes', unit: 'Digital Payments', price: 1.2 },
            { id: 2, name: 'Debines Salientes', unit: 'Digital Payments', price: 0.8 },
            { id: 3, name: 'Internet Banking', unit: 'Digital Payments', price: 0.5 },
            { id: 4, name: 'Pagos con Transferencias (PCT)', unit: 'Instant Payments', price: 1.5 },
            { id: 5, name: 'Transferencias Entrantes PSPs', unit: 'Instant Payments', price: 1.0 },
            { id: 6, name: 'Transferencias Salientes PSPs', unit: 'Instant Payments', price: 1.3 },
            { id: 7, name: 'QR Crédito', unit: 'New Products', price: 2.0 },
            { id: 8, name: 'Prevención de Fraude', unit: 'New Products', price: 3.5 },
            { id: 9, name: 'Extracción con Transferencias', unit: 'New Products', price: 1.8 },
            { id: 10, name: 'Transferencias Recurrentes', unit: 'New Products', price: 1.1 },
            { id: 11, name: 'Master Send y Visa Direct', unit: 'New Products', price: 2.5 },
            { id: 12, name: 'Payouts', unit: 'New Products', price: 2.2 },
            { id: 13, name: 'Cripto', unit: 'New Products', price: 2.8 },
            { id: 14, name: 'Remesas', unit: 'New Products', price: 3.0 }
        ],
        transactions: [],
        entornoVariables: [],
        competitivoVariables: [],
        estrategias: [],
        currentYear: new Date().getFullYear(),
        costosOperativos: 32.5,
        gastosGenerales: 14.2,
        bcgData: {
            'Digital Payments': { crecimiento: 15, participacion: 25 },
            'Instant Payments': { crecimiento: 25, participacion: 40 },
            'QR Crédito': { crecimiento: 40, participacion: 10 },
            'Prevención de Fraude': { crecimiento: 5, participacion: 60 },
            'Extracción con Transferencias': { crecimiento: 8, participacion: 15 }
        },
        // Nuevas variables para análisis del entorno
        entornoOptions: {
            politico: [
                { id: 1, name: 'Influencia gubernamental', description: 'Gobiernos y bancos centrales convierten los pagos instantáneos en infraestructura pública esencial 24/7' },
                { id: 2, name: 'Situación política', description: 'Proyectos regionales de interconexión señalan el camino para remesas instantáneas y baratas' },
                { id: 3, name: 'Subsidios gubernamentales', description: 'Inclusión financiera y reducción del uso de efectivo/transferencias P2P gratis o con fee simbólico' },
                { id: 4, name: 'Relaciones bilaterales', description: 'Mandatos "instant-by-default": regulación que obliga a ofrecer transferencias inmediatas' },
                { id: 5, name: 'Regulación & Desregulación', description: 'Impulso a CBDC y stablecoins reguladas como complemento soberano a la red bancaria rápida' }
            ],
            economico: [
                { id: 1, name: 'Tasas de inflación', description: 'Impacto de la inflación en los costos operativos y precios' },
                { id: 2, name: 'Fusiones y transformación', description: 'Crece la consolidación fintech-banca: compras, joint-ventures y "bank-as-a-service"' },
                { id: 3, name: 'Tasas de crecimiento', description: 'Formalización de la economía: millones de nuevos usuarios' },
                { id: 4, name: 'Acceso a financiación', description: 'Liquidación al instante mejora liquidez y reduce necesidad de crédito puente para pymes' },
                { id: 5, name: 'Bancos pierden "float"', description: 'Pero ganan con servicios de valor añadido (request-to-pay, tesorería en tiempo real)' }
            ],
            social: [
                { id: 1, name: 'Valores culturales', description: 'Generación Z & Millennials ya lideran adopción; su peso de consumo acelera lo instantáneo a norma social' },
                { id: 2, name: 'Actitud hacia el riesgo', description: 'Expectativa de "hand-to-hand money": usuarios asumen que el dinero se mueve tan rápido como un chat' },
                { id: 3, name: 'Valores éticos', description: 'Auge de fraude APP → inversión en educación financiera + biometría + IA antifraude' },
                { id: 4, name: 'Población (tamaño)', description: 'Pagos rápidos = puerta de entrada a historial financiero → mayor acceso a microcrédito' },
                { id: 5, name: 'Cultura "pago embebido"', description: 'Redes sociales, super-apps e IoT convierten cualquier interfaz en punto de cobro' }
            ],
            tecnologico: [
                { id: 1, name: 'IoT - Pagos M2M', description: 'Pagos M2M (vehículos, electrodomésticos) y micro-transacciones IoT despegan con 5G/6G' },
                { id: 2, name: 'AV & VR y Comunicaciones', description: 'Cobros QR interoperables y request-to-pay se vuelven funciones básicas' },
                { id: 3, name: 'Inteligencia artificial', description: 'IA en tiempo real analiza cada transacción y frena fraude sin friccionar la experiencia' },
                { id: 4, name: 'Automatización', description: 'Estándar ISO 20022 + APIs abiertas = interoperabilidad global' },
                { id: 5, name: 'Impacto del Blockchain', description: 'Blockchain evoluciona: stablecoins reguladas y depósitos tokenizados se integran en rails bancarios' }
            ],
            ecologico: [
                { id: 1, name: 'Huella de carbono', description: '"Green fintech" incorpora cálculo de huella de carbono por compra y opciones de compensación automática' },
                { id: 2, name: 'Cambio climático', description: 'Data centers crecen; la industria se compromete a energía 100% renovable' },
                { id: 3, name: 'Resiliencia post-desastre', description: 'Pagos instantáneos fortalecen resiliencia post-desastre' },
                { id: 4, name: 'Niveles de polución', description: 'Sustitución de efectivo, cheques y PVC -80% de CO₂ por transacción' },
                { id: 5, name: 'Actitud a tecnologías verdes', description: 'Mayor conciencia ambiental en los consumidores' }
            ],
            legal: [
                { id: 1, name: 'Leyes de salvaguardia', description: 'Monitoreo con IA de Pla y FT' },
                { id: 2, name: 'Nuevas normativas de licencias', description: 'Licencias híbridas para bancos-fintech globales (dinero electrónico)' },
                { id: 3, name: 'Regulaciones sobre criptoactivos', description: 'Nuevas normativas y regulaciones internacionales sobre criptoactivos' },
                { id: 4, name: 'Open Banking / Open Finance', description: 'Acceso obligatorio a cuentas vía API para PISP y fintech' },
                { id: 5, name: 'Verificación de beneficiario', description: 'Nuevas normas de verificación + reembolso APP fraude protegen al consumidor' }
            ]
        },
        // Nuevas variables para análisis competitivo
        competitivoOptions: {
            competencia: [
                { id: 1, name: 'Link', description: 'Principal competidor en el mercado de pagos digitales' },
                { id: 2, name: 'COELSA', description: 'Competidor tradicional con fuerte presencia en el mercado' },
                { id: 3, name: 'Alta Competencia', description: 'Aumento general de competidores en el sector' },
                { id: 4, name: 'Prisma', description: 'Competidor en soluciones de pagos' },
                { id: 5, name: 'Interbanking', description: 'Competidor en soluciones bancarias' }
            ],
            nuevos: [
                { id: 1, name: 'Regulación en sector financiero', description: 'La regulación puede ser obstáculo, pero digitalización facilita nuevos competidores' },
                { id: 2, name: 'Fintech emergentes', description: 'Nuevas fintechs ingresando al mercado con soluciones innovadoras' },
                { id: 3, name: 'Tecnología blockchain', description: 'Nuevas soluciones basadas en blockchain compitiendo con sistemas tradicionales' },
                { id: 4, name: 'Bancos digitales', description: 'Nuevos bancos 100% digitales sin sucursales físicas' },
                { id: 5, name: 'Big Tech', description: 'Empresas tecnológicas grandes ingresando al sector financiero' }
            ],
            sustitutos: [
                { id: 1, name: 'Crypto', description: 'Criptomonedas como alternativa a los sistemas de pago tradicionales' },
                { id: 2, name: 'Rieles marcas', description: 'Soluciones de pago directo entre marcas' },
                { id: 3, name: 'Efectivo digital', description: 'Nuevas formas de efectivo digital' },
                { id: 4, name: 'Billeteras móviles', description: 'Soluciones alternativas de billeteras móviles' },
                { id: 5, name: 'Pagos P2P', description: 'Sistemas de pago peer-to-peer alternativos' }
            ],
            proveedores: [
                { id: 1, name: 'ACI', description: 'Principal proveedor de tecnología de pagos' },
                { id: 2, name: 'Proveedores de infraestructura', description: 'Proveedores de infraestructura tecnológica clave' },
                { id: 3, name: 'Proveedores de seguridad', description: 'Empresas que proveen soluciones de seguridad y antifraude' },
                { id: 4, name: 'Proveedores de datos', description: 'Empresas que proveen datos y analítica' },
                { id: 5, name: 'Proveedores de conectividad', description: 'Proveedores de conectividad y redes' }
            ],
            clientes: [
                { id: 1, name: 'Bancos socios Dueños Coelsa', description: 'Bancos socios con poder de negociación' },
                { id: 2, name: 'Negociacion de Precios Coelsa', description: 'Capacidad de negociación de precios por parte de Coelsa' },
                { id: 3, name: 'Meli volumen', description: 'Mercado Libre como cliente importante con gran volumen' },
                { id: 4, name: 'Grandes fintechs', description: 'Fintechs grandes con poder de negociación' },
                { id: 5, name: 'Bancos tradicionales', description: 'Bancos tradicionales con poder de negociación' }
            ]
        },
        // Estrategias de mitigación predefinidas
        estrategiasMitigacion: {
            politico: [
                "Crear equipo de vigilancia regulatoria para anticipar cambios en normativas",
                "Establecer relaciones con reguladores y participar en mesas de trabajo sectoriales",
                "Diversificar operaciones en múltiples jurisdicciones para reducir riesgo regulatorio"
            ],
            economico: [
                "Implementar estrategias de cobertura contra inflación",
                "Desarrollar modelos de negocio escalables para aprovechar crecimiento del mercado",
                "Crear alianzas estratégicas para compartir costos de infraestructura"
            ],
            social: [
                "Invertir en educación financiera para usuarios",
                "Desarrollar programas de inclusión financiera",
                "Implementar sistemas avanzados de biometría y autenticación"
            ],
            tecnologico: [
                "Invertir en I+D para mantenerse a la vanguardia tecnológica",
                "Adoptar estándares abiertos para facilitar integraciones",
                "Desarrollar capacidades de pagos M2M para IoT"
            ],
            ecologico: [
                "Implementar cálculo de huella de carbono por transacción",
                "Comprometer a energía 100% renovable en data centers",
                "Desarrollar programas de compensación de carbono"
            ],
            legal: [
                "Implementar sistemas avanzados de monitoreo de PLD/FT",
                "Crear equipos especializados en cumplimiento normativo",
                "Desarrollar sistemas de verificación de beneficiario avanzados"
            ],
            competencia: [
                "Diferenciación tecnológica: invertir en mejoras de velocidad y confiabilidad",
                "Programas de lealtad para clientes estratégicos",
                "Desarrollar soluciones integradas que combinen múltiples servicios"
            ],
            nuevos: [
                "Barreras de entrada: desarrollar economías de escala y red",
                "Adquirir startups prometedoras antes que se conviertan en competidores",
                "Crear ecosistemas cerrados con altos costos de cambio"
            ],
            sustitutos: [
                "Integrar funcionalidades de productos sustitutos (ej: crypto)",
                "Educar al mercado sobre ventajas de soluciones tradicionales",
                "Desarrollar interoperabilidad con productos sustitutos"
            ],
            proveedores: [
                "Diversificar base de proveedores para reducir dependencia",
                "Internalizar desarrollos críticos",
                "Negociar contratos a largo plazo con proveedores clave"
            ],
            clientes: [
                "Programas de valor agregado para clientes estratégicos",
                "Desarrollar soluciones personalizadas para grandes clientes",
                "Crear mecanismos de fidelización y retención"
            ]
        }
    };

    // Generar transacciones aleatorias para cada cliente y producto
    function generateInitialTransactions() {
        const transactions = [];
        initialData.clients.forEach(client => {
            initialData.products.forEach(product => {
                const monthlyTransactions = Math.floor(Math.random() * 100000) + 10000;
                for (let month = 1; month <= 12; month++) {
                    transactions.push({
                        clientId: client.id,
                        productId: product.id,
                        month: month,
                        year: initialData.currentYear,
                        quantity: monthlyTransactions * (0.8 + Math.random() * 0.4), // Variación mensual
                        unitPrice: product.price
                    });
                }
            });
        });
        initialData.transactions = transactions;
    }

    // Calcular métricas financieras
    function calculateFinancialMetrics() {
        const metrics = {
            revenue: 0,
            costos: 0,
            gastos: 0,
            ebitda: 0,
            margen: 0,
            roi: 24,
            nps: 68,
            costoPorTransaccion: 0.38
        };

        // Calcular revenue total
        initialData.transactions.forEach(t => {
            metrics.revenue += t.quantity * t.unitPrice;
        });

        // Calcular costos y gastos
        metrics.costos = metrics.revenue * (initialData.costosOperativos / 100);
        metrics.gastos = metrics.revenue * (initialData.gastosGenerales / 100);
        metrics.ebitda = metrics.revenue - metrics.costos - metrics.gastos;
        metrics.margen = (metrics.ebitda / metrics.revenue) * 100;
        metrics.costoPorTransaccion = metrics.costos / initialData.transactions.reduce((sum, t) => sum + t.quantity, 0);
        
        // Ajustar ROI basado en los cambios
        metrics.roi = 24 * (metrics.margen / 43.1); // 43.1 es el margen original
        
        return metrics;
    }

    // Inicializar datos
    generateInitialTransactions();
    const financialMetrics = calculateFinancialMetrics();

    // Navigation between tabs
    const tabs = {
        'dashboard-tab': 'dashboard-content',
        'pl-tab': 'pl-content',
        'entorno-tab': 'entorno-content',
        'competitivo-tab': 'competitivo-content',
        'crecimiento-tab': 'crecimiento-content',
        'estrategias-tab': 'estrategias-content',
        'kpis-tab': 'kpis-content'
    };

    Object.keys(tabs).forEach(tabId => {
        document.getElementById(tabId).addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all content divs
            Object.values(tabs).forEach(contentId => {
                document.getElementById(contentId).classList.add('d-none');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.sidebar .nav-link').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected content and mark tab as active
            document.getElementById(tabs[tabId]).classList.remove('d-none');
            this.classList.add('active');
        });
    });

    // Initialize range sliders
    const costosOperativosSlider = document.getElementById('costos-operativos');
    const costosOperativosValue = document.getElementById('costos-operativos-value');
    const gastosGeneralesSlider = document.getElementById('gastos-generales');
    const gastosGeneralesValue = document.getElementById('gastos-generales-value');
    
    costosOperativosSlider.value = initialData.costosOperativos;
    costosOperativosValue.textContent = `${initialData.costosOperativos}%`;
    
    gastosGeneralesSlider.value = initialData.gastosGenerales;
    gastosGeneralesValue.textContent = `${initialData.gastosGenerales}%`;
    
    costosOperativosSlider.addEventListener('change', function() {
        initialData.costosOperativos = parseFloat(this.value);
        costosOperativosValue.textContent = `${this.value}%`;
        updatePLCharts();
        updateKPIMetrics();
        updateKPITrendChart();
        updateEfficiencyChart();
    });

    gastosGeneralesSlider.addEventListener('change', function() {
        initialData.gastosGenerales = parseFloat(this.value);
        gastosGeneralesValue.textContent = `${this.value}%`;
        updatePLCharts();
        updateKPIMetrics();
        updateKPITrendChart();
        updateEfficiencyChart();
    });

    // Impacto slider for entorno analysis
    const impactoSlider = document.getElementById('entorno-impacto');
    const impactoValue = document.getElementById('impacto-value');
    
    impactoSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        impactoValue.textContent = `${value} - ${getImpactLevel(value)}`;
        impactoValue.className = `badge bg-${getImpactBadgeClass(value)}`;
    });

    // Intensidad slider for competitive analysis
    const intensidadSlider = document.getElementById('competitivo-intensidad');
    const intensidadValue = document.getElementById('intensidad-value');
    
    intensidadSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        intensidadValue.textContent = `${value} - ${getIntensityLevel(value)}`;
        intensidadValue.className = `badge bg-${getImpactBadgeClass(value)}`;
    });

    function getImpactLevel(value) {
        switch(value) {
            case 1: return 'Muy bajo';
            case 2: return 'Bajo';
            case 3: return 'Medio';
            case 4: return 'Alto';
            case 5: return 'Muy alto';
            default: return 'Medio';
        }
    }

    function getIntensityLevel(value) {
        switch(value) {
            case 1: return 'Muy baja';
            case 2: return 'Baja';
            case 3: return 'Media';
            case 4: return 'Alta';
            case 5: return 'Muy alta';
            default: return 'Media';
        }
    }

    function getImpactBadgeClass(value) {
        switch(value) {
            case 1: return 'success';
            case 2: return 'success';
            case 3: return 'warning';
            case 4: return 'danger';
            case 5: return 'danger';
            default: return 'secondary';
        }
    }

    // Form submissions
    document.getElementById('pl-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const ajusteAutomatico = document.getElementById('ajuste-automatico').checked;
        if (ajusteAutomatico) {
            // Simular optimización basada en histórico
            initialData.costosOperativos = 30.0;
            initialData.gastosGenerales = 12.5;
            costosOperativosSlider.value = initialData.costosOperativos;
            costosOperativosValue.textContent = `${initialData.costosOperativos}%`;
            gastosGeneralesSlider.value = initialData.gastosGenerales;
            gastosGeneralesValue.textContent = `${initialData.gastosGenerales}%`;
        }
        updatePLCharts();
        updateKPIMetrics();
        updateKPITrendChart();
        updateEfficiencyChart();
    });

    document.getElementById('bcg-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const unidad = document.getElementById('bcg-unidad').value;
        const crecimiento = parseFloat(document.getElementById('bcg-crecimiento').value);
        const participacion = parseFloat(document.getElementById('bcg-participacion').value);
        
        initialData.bcgData[unidad] = { crecimiento, participacion };
        updateBCGMatrix();
    });

    document.getElementById('estrategia-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('estrategia-tipo').value;
        const unidad = document.getElementById('estrategia-unidad').value;
        const producto = document.getElementById('estrategia-producto').value;
        const inversion = parseFloat(document.getElementById('estrategia-inversion').value);
        const duracion = parseInt(document.getElementById('estrategia-duracion').value);
        const crecimiento = parseFloat(document.getElementById('estrategia-crecimiento').value);
        
        const estrategia = {
            id: Date.now(),
            tipo,
            unidad,
            producto,
            inversion,
            duracion,
            crecimiento,
            fecha: new Date().toISOString().split('T')[0],
            estado: 'En curso'
        };
        
        initialData.estrategias.push(estrategia);
        updateEstrategiasTable();
    });

    // Botones de entorno
    document.querySelector('#entorno-content .btn-outline-primary').addEventListener('click', function() {
        const categoria = document.getElementById('entorno-categoria').value;
        const variable = document.getElementById('entorno-variable').options[document.getElementById('entorno-variable').selectedIndex].text;
        const impacto = parseInt(document.getElementById('entorno-impacto').value);
        
        const variableObj = {
            id: Date.now(),
            categoria,
            variable,
            impacto,
            fecha: new Date().toISOString().split('T')[0]
        };
        
        initialData.entornoVariables.push(variableObj);
        updateEntornoVariablesList();
        updateEntornoRadarChart();
        updateSuggestedStrategies();
    });

    // Botones competitivo
    document.querySelector('#competitivo-content .btn-outline-primary').addEventListener('click', function() {
        const fuerza = document.getElementById('competitivo-fuerza').value;
        const variable = document.getElementById('competitivo-variable').options[document.getElementById('competitivo-variable').selectedIndex].text;
        const intensidad = parseInt(document.getElementById('competitivo-intensidad').value);
        
        const variableObj = {
            id: Date.now(),
            fuerza,
            variable,
            intensidad,
            fecha: new Date().toISOString().split('T')[0]
        };
        
        initialData.competitivoVariables.push(variableObj);
        updateCompetitivoVariablesList();
        updateCompetitivoRadarChart();
        updateSuggestedStrategies();
    });

    // Botones de crecimiento
    document.querySelector('#crecimiento-content .btn-outline-primary').addEventListener('click', function() {
        updateSuggestedStrategies();
    });

    // Funciones de actualización
    function updatePLCharts() {
        const metrics = calculateFinancialMetrics();
        updatePLTable();
        updateRevenueByUnitChart(metrics);
        updateTransactionsCharts();
        updateKPIMetrics();
        updateKPITrendChart();
        updateEfficiencyChart();
    }

    function updateKPIMetrics() {
        const metrics = calculateFinancialMetrics();
        
        // Actualizar los KPI cards en el dashboard
        document.querySelector('.kpi-ebitda .value').textContent = `$${(metrics.ebitda / 1000000).toFixed(1)}M`;
        document.querySelector('.kpi-roi .value').textContent = `${metrics.roi.toFixed(1)}%`;
        document.querySelector('.kpi-cost .value').textContent = `$${metrics.costoPorTransaccion.toFixed(2)}`;
        document.querySelector('.kpi-nps .value').textContent = `${metrics.nps}`;
        
        // Actualizar la tabla de métricas financieras
        const financialTableBody = document.querySelector('#financial tbody');
        financialTableBody.innerHTML = `
            <tr>
                <td>Revenue Bruto</td>
                <td>$${(metrics.revenue / 1000000).toFixed(2)}M</td>
                <td>$4.35M</td>
                <td class="text-success">+${((metrics.revenue / 4350000 - 1) * 100).toFixed(1)}%</td>
                <td class="text-success">+15.2%</td>
                <td><i class="fas fa-arrow-up text-success"></i></td>
            </tr>
            <tr>
                <td>EBITDA</td>
                <td>$${(metrics.ebitda / 1000000).toFixed(2)}M</td>
                <td>$1.82M</td>
                <td class="text-success">+${((metrics.ebitda / 1820000 - 1) * 100).toFixed(1)}%</td>
                <td class="text-success">+22.1%</td>
                <td><i class="fas fa-arrow-up text-success"></i></td>
            </tr>
            <tr>
                <td>Margen EBITDA</td>
                <td>${metrics.margen.toFixed(1)}%</td>
                <td>41.8%</td>
                <td class="text-success">+${(metrics.margen - 41.8).toFixed(1)}pp</td>
                <td class="text-success">+2.5pp</td>
                <td><i class="fas fa-arrow-up text-success"></i></td>
            </tr>
            <tr>
                <td>ROI</td>
                <td>${metrics.roi.toFixed(1)}%</td>
                <td>24.5%</td>
                <td class="${metrics.roi >= 24.5 ? 'text-success' : 'text-danger'}">${(metrics.roi - 24.5).toFixed(1)}pp</td>
                <td class="text-success">+5.0pp</td>
                <td><i class="fas fa-arrow-${metrics.roi >= 24.5 ? 'up text-success' : 'down text-danger'}"></i></td>
            </tr>
            <tr>
                <td>Costo por Transacción</td>
                <td>$${metrics.costoPorTransaccion.toFixed(2)}</td>
                <td>$0.35</td>
                <td class="${metrics.costoPorTransaccion <= 0.35 ? 'text-success' : 'text-danger'}">${((metrics.costoPorTransaccion / 0.35 - 1) * 100).toFixed(1)}%</td>
                <td class="text-success">-5.0%</td>
                <td><i class="fas fa-arrow-${metrics.costoPorTransaccion <= 0.35 ? 'down text-success' : 'up text-danger'}"></i></td>
            </tr>
        `;
    }

    function updateKPITrendChart() {
        const metrics = calculateFinancialMetrics();
        
        // Actualizar los datos del gráfico con los nuevos valores
        if (window.kpiTrendChart) {
            window.kpiTrendChart.data.datasets[0].data = [
                metrics.ebitda * 0.9 / 12, 
                metrics.ebitda * 0.95 / 12, 
                metrics.ebitda / 12,
                metrics.ebitda * 1.05 / 12,
                metrics.ebitda * 1.1 / 12,
                metrics.ebitda * 1.15 / 12,
                metrics.ebitda * 1.2 / 12,
                metrics.ebitda * 1.25 / 12,
                metrics.ebitda * 1.3 / 12,
                metrics.ebitda * 1.35 / 12,
                metrics.ebitda * 1.4 / 12,
                metrics.ebitda * 1.45 / 12
            ];
            
            window.kpiTrendChart.data.datasets[1].data = [
                metrics.roi * 0.95,
                metrics.roi * 0.97,
                metrics.roi,
                metrics.roi * 1.03,
                metrics.roi * 1.05,
                metrics.roi * 1.07,
                metrics.roi * 1.05,
                metrics.roi * 1.07,
                metrics.roi * 1.08,
                metrics.roi * 1.08,
                metrics.roi * 1.08,
                metrics.roi * 1.08
            ];
            
            window.kpiTrendChart.update();
        }
    }

    function updateEfficiencyChart() {
        const metrics = calculateFinancialMetrics();
        const efficiencyImpact = 1 - (metrics.costoPorTransaccion / 0.38 - 1) * 0.5; // Factor de impacto en eficiencia
        
        if (window.efficiencyChart) {
            window.efficiencyChart.data.datasets[0].data = [
                95 * efficiencyImpact,
                92 * efficiencyImpact,
                89 * efficiencyImpact,
                91 * efficiencyImpact,
                94 * efficiencyImpact
            ];
            
            window.efficiencyChart.update();
        }
    }

    function updateEntornoVariablesList() {
        const listContainer = document.querySelector('#entorno-content .list-group');
        listContainer.innerHTML = '';
        
        initialData.entornoVariables.forEach(variable => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <div>
                    <small class="text-muted">${variable.categoria}</small>
                    <div>${variable.variable}</div>
                </div>
                <div>
                    <span class="impact-${variable.impacto >= 4 ? 'high' : variable.impacto <= 2 ? 'low' : 'medium'}">${variable.impacto} - ${getImpactLevel(variable.impacto)}</span>
                    <button class="btn btn-sm btn-link text-danger delete-entorno-variable" data-id="${variable.id}"><i class="fas fa-times"></i></button>
                </div>
            `;
            listContainer.appendChild(item);
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-entorno-variable').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                initialData.entornoVariables = initialData.entornoVariables.filter(v => v.id !== id);
                updateEntornoVariablesList();
                updateEntornoRadarChart();
                updateSuggestedStrategies();
            });
        });
    }

    function updateCompetitivoVariablesList() {
        const listContainer = document.querySelector('#competitivo-content .list-group');
        listContainer.innerHTML = '';
        
        initialData.competitivoVariables.forEach(variable => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <div>
                    <small class="text-muted">${variable.fuerza}</small>
                    <div>${variable.variable}</div>
                </div>
                <div>
                    <span class="impact-${variable.intensidad >= 4 ? 'high' : variable.intensidad <= 2 ? 'low' : 'medium'}">${variable.intensidad} - ${getIntensityLevel(variable.intensidad)}</span>
                    <button class="btn btn-sm btn-link text-danger delete-competitivo-variable" data-id="${variable.id}"><i class="fas fa-times"></i></button>
                </div>
            `;
            listContainer.appendChild(item);
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-competitivo-variable').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                initialData.competitivoVariables = initialData.competitivoVariables.filter(v => v.id !== id);
                updateCompetitivoVariablesList();
                updateCompetitivoRadarChart();
                updateSuggestedStrategies();
            });
        });
    }

    function updateEstrategiasTable() {
        const tableBody = document.querySelector('#estrategias-content tbody');
        tableBody.innerHTML = '';
        
        initialData.estrategias.forEach(estrategia => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${estrategia.tipo}</td>
                <td>${estrategia.fecha}</td>
                <td>$${estrategia.inversion.toLocaleString()}</td>
                <td class="text-success">${Math.floor(Math.random() * 20) + 15}%</td>
                <td class="text-success">+$${Math.floor(estrategia.inversion * 0.3).toLocaleString()}</td>
                <td><span class="badge bg-success">${estrategia.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-chart-line"></i></button>
                    <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-edit"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function updateSuggestedStrategies() {
        // Estrategias sugeridas para análisis de entorno
        const entornoStrategiesContainer = document.querySelector('#entorno-content .card-body .row');
        entornoStrategiesContainer.innerHTML = '';
        
        // Agrupar variables por categoría con impacto alto
        const highImpactCategories = {};
        initialData.entornoVariables.forEach(v => {
            if (v.impacto >= 4) {
                if (!highImpactCategories[v.categoria]) {
                    highImpactCategories[v.categoria] = [];
                }
                highImpactCategories[v.categoria].push(v);
            }
        });
        
        // Generar estrategias para cada categoría con impacto alto
        Object.keys(highImpactCategories).forEach(categoria => {
            const strategies = initialData.estrategiasMitigacion[categoria] || [];
            strategies.forEach((estrategia, index) => {
                if (index < 2) { // Mostrar máximo 2 estrategias por categoría
                    const strategyDiv = document.createElement('div');
                    strategyDiv.className = 'col-md-6';
                    strategyDiv.innerHTML = `
                        <div class="strategy-card p-3 mb-3 bg-light">
                            <h5>${estrategia.split(':')[0] || estrategia}</h5>
                            <p class="small">${estrategia.split(':')[1] || 'Estrategia de mitigación para ' + categoria}</p>
                            <div class="d-flex justify-content-between">
                                <span class="badge bg-${getBadgeColorForCategory(categoria)}">${categoria}</span>
                                <button class="btn btn-sm btn-outline-primary apply-strategy" data-strategy="${estrategia}">Aplicar</button>
                            </div>
                        </div>
                    `;
                    entornoStrategiesContainer.appendChild(strategyDiv);
                }
            });
        });
        
        // Estrategias sugeridas para análisis competitivo
        const competitivoStrategiesContainer = document.querySelector('#competitivo-content .card-body .row');
        competitivoStrategiesContainer.innerHTML = '';
        
        // Agrupar variables por fuerza con intensidad alta
        const highIntensityForces = {};
        initialData.competitivoVariables.forEach(v => {
            if (v.intensidad >= 4) {
                if (!highIntensityForces[v.fuerza]) {
                    highIntensityForces[v.fuerza] = [];
                }
                highIntensityForces[v.fuerza].push(v);
            }
        });
        
        // Generar estrategias para cada fuerza con intensidad alta
        Object.keys(highIntensityForces).forEach(fuerza => {
            const strategies = initialData.estrategiasMitigacion[fuerza] || [];
            strategies.forEach((estrategia, index) => {
                if (index < 2) { // Mostrar máximo 2 estrategias por fuerza
                    const strategyDiv = document.createElement('div');
                    strategyDiv.className = 'col-md-6';
                    strategyDiv.innerHTML = `
                        <div class="strategy-card p-3 mb-3 bg-light">
                            <h5>${estrategia.split(':')[0] || estrategia}</h5>
                            <p class="small">${estrategia.split(':')[1] || 'Estrategia competitiva para ' + fuerza}</p>
                            <div class="d-flex justify-content-between">
                                <span class="badge bg-${getBadgeColorForForce(fuerza)}">${fuerza.replace('actual', 'competencia')}</span>
                                <button class="btn btn-sm btn-outline-primary apply-strategy" data-strategy="${estrategia}">Aplicar</button>
                            </div>
                        </div>
                    `;
                    competitivoStrategiesContainer.appendChild(strategyDiv);
                }
            });
        });
        
        // Agregar event listeners a los botones de aplicar estrategia
        document.querySelectorAll('.apply-strategy').forEach(btn => {
            btn.addEventListener('click', function() {
                const strategyText = this.getAttribute('data-strategy');
                // Aquí podrías abrir el formulario de estrategias con esta estrategia pre-seleccionada
                document.getElementById('estrategias-tab').click();
                document.getElementById('estrategia-tipo').value = strategyText.split(':')[0] || strategyText;
                alert(`Estrategia "${strategyText}" seleccionada. Complete los detalles en el Simulador de Estrategias.`);
            });
        });
    }

    function getBadgeColorForCategory(categoria) {
        const colors = {
            politico: 'primary',
            economico: 'info',
            social: 'success',
            tecnologico: 'info',
            ecologico: 'warning',
            legal: 'danger'
        };
        return colors[categoria] || 'secondary';
    }

    function getBadgeColorForForce(fuerza) {
        const colors = {
            competencia: 'danger',
            nuevos: 'warning',
            sustitutos: 'info',
            proveedores: 'primary',
            clientes: 'success'
        };
        return colors[fuerza] || 'secondary';
    }

    // Initialize charts
    initializeCharts();

    // Funciones para inicializar gráficos
    function initializeCharts() {
        // Financial Summary Chart
        const financialCtx = document.getElementById('financialChart').getContext('2d');
        window.financialChart = new Chart(financialCtx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [1450200, 1520500, 1610800, 1580300, 1620400, 1680500, 1720600, 1750700, 1800800, 1850900, 1901000, 1951100],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'EBITDA',
                        data: [619700, 654600, 699500, 685400, 702300, 728400, 745500, 759600, 782700, 805800, 828900, 852000],
                        backgroundColor: 'rgba(46, 204, 113, 0.7)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Business Unit Distribution Chart
        const businessUnitCtx = document.getElementById('businessUnitChart').getContext('2d');
        window.businessUnitChart = new Chart(businessUnitCtx, {
            type: 'doughnut',
            data: {
                labels: ['Digital Payments', 'Instant Payments'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Revenue by Unit Chart
        const revenueByUnitCtx = document.getElementById('revenueByUnitChart').getContext('2d');
        window.revenueByUnitChart = new Chart(revenueByUnitCtx, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar'],
                datasets: [
                    {
                        label: 'Digital Payments',
                        data: [942630, 988200, 1047020],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)'
                    },
                    {
                        label: 'Instant Payments',
                        data: [507570, 532300, 563780],
                        backgroundColor: 'rgba(231, 76, 60, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Digital Transactions Chart
        const digitalTransactionsCtx = document.getElementById('digitalTransactionsChart').getContext('2d');
        window.digitalTransactionsChart = new Chart(digitalTransactionsCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Transferencias Inmediatas Salientes',
                    data: [520000, 545000, 578000],
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Debines Salientes',
                    data: [320000, 335000, 355000],
                    borderColor: 'rgba(155, 89, 182, 1)',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Internet Banking',
                    data: [280000, 295000, 312000],
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Instant Transactions Chart
        const instantTransactionsCtx = document.getElementById('instantTransactionsChart').getContext('2d');
        window.instantTransactionsChart = new Chart(instantTransactionsCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Pagos con Transferencias (PCT)',
                    data: [320000, 335000, 355000],
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Transferencias Entrantes PSPs',
                    data: [180000, 190000, 201000],
                    borderColor: 'rgba(241, 196, 15, 1)',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Transferencias Salientes PSPs',
                    data: [150000, 158000, 167000],
                    borderColor: 'rgba(230, 126, 34, 1)',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return (value / 1000).toLocaleString() + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // Entorno Radar Chart
        const entornoRadarCtx = document.getElementById('entornoRadarChart').getContext('2d');
        window.entornoRadarChart = new Chart(entornoRadarCtx, {
            type: 'radar',
            data: {
                labels: ['Político', 'Económico', 'Social', 'Tecnológico', 'Ecológico', 'Legal'],
                datasets: [{
                    label: 'Impacto Actual',
                    data: [4, 3, 2, 3, 1, 4],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)'
                },
                {
                    label: 'Impacto Promedio Industria',
                    data: [3, 3, 3, 4, 2, 3],
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(155, 89, 182, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });

        // Competitivo Radar Chart
        const competitivoRadarCtx = document.getElementById('competitivoRadarChart').getContext('2d');
        window.competitivoRadarChart = new Chart(competitivoRadarCtx, {
            type: 'radar',
            data: {
                labels: ['Competencia', 'Nuevos Entrantes', 'Sustitutos', 'Proveedores', 'Clientes'],
                datasets: [{
                    label: 'Intensidad Actual',
                    data: [5, 2, 3, 3, 4],
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(231, 76, 60, 1)'
                },
                {
                    label: 'Intensidad Promedio',
                    data: [4, 3, 3, 3, 3],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });

        // BCG Matrix Chart
        const bcgMatrixCtx = document.getElementById('bcgMatrixChart').getContext('2d');
        window.bcgMatrixChart = new Chart(bcgMatrixCtx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Digital Payments',
                        data: [{x: 15, y: 25}],
                        backgroundColor: 'rgba(52, 152, 219, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'Instant Payments',
                        data: [{x: 25, y: 40}],
                        backgroundColor: 'rgba(231, 76, 60, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'QR Crédito',
                        data: [{x: 40, y: 10}],
                        backgroundColor: 'rgba(46, 204, 113, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'Prevención de Fraude',
                        data: [{x: 5, y: 60}],
                        backgroundColor: 'rgba(241, 196, 15, 1)',
                        pointRadius: 15
                    },
                    {
                        label: 'Extracción con Transferencias',
                        data: [{x: 8, y: 15}],
                        backgroundColor: 'rgba(155, 89, 182, 1)',
                        pointRadius: 15
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Crecimiento de Mercado (%)'
                        },
                        min: 0,
                        max: 50
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Participación de Mercado (%)'
                        },
                        min: 0,
                        max: 70
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.x}% Crecimiento, ${context.parsed.y}% Participación`;
                            }
                        }
                    }
                }
            }
        });
    }

    function updateBCGMatrix() {
        const crecimiento = parseFloat(document.getElementById('bcg-crecimiento').value);
        const participacion = parseFloat(document.getElementById('bcg-participacion').value);
        const unidad = document.getElementById('bcg-unidad').value;
        
        // Actualizar datos
        initialData.bcgData[unidad] = { crecimiento, participacion };
        
        // Actualizar gráfico
        const datasets = window.bcgMatrixChart.data.datasets;
        const index = datasets.findIndex(d => d.label === unidad);
        if (index !== -1) {
            datasets[index].data = [{x: crecimiento, y: participacion}];
            window.bcgMatrixChart.update();
        }
    }

    function updatePLTable() {
        const metrics = calculateFinancialMetrics();
        const tableBody = document.querySelector('#pl-content tbody');
    
        tableBody.innerHTML = `
            <tr>
                <td><strong>Revenue Bruto</strong></td>
                <td>$${(metrics.revenue / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.revenue / 12 * 1.05).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.revenue / 12 * 1.1).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.revenue.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-success">+15%</td>
            </tr>
            <tr>
                <td>Costos Operativos</td>
                <td>$${(metrics.costos / 12 * 0.95).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.costos / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.costos / 12 * 1.05).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.costos.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-danger">+8%</td>
            </tr>
            <tr>
                <td>Gastos Generales</td>
                <td>$${(metrics.gastos / 12 * 0.98).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.gastos / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.gastos / 12 * 1.02).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.gastos.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-success">+3%</td>
            </tr>
            <tr class="table-active">
                <td><strong>EBITDA</strong></td>
                <td>$${(metrics.ebitda / 12 * 0.9).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.ebitda / 12 * 1.0).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${(metrics.ebitda / 12 * 1.1).toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td>$${metrics.ebitda.toLocaleString('es-AR', {maximumFractionDigits: 0})}</td>
                <td class="text-success">+22%</td>
            </tr>
            <tr>
                <td>Margen EBITDA</td>
                <td>${(metrics.margen * 0.98).toFixed(1)}%</td>
                <td>${metrics.margen.toFixed(1)}%</td>
                <td>${(metrics.margen * 1.02).toFixed(1)}%</td>
                <td>${metrics.margen.toFixed(1)}%</td>
                <td class="text-success">+2.5pp</td>
            </tr>
        `;
    }    

    function updateEntornoRadarChart() {
        // Calcular promedios por categoría
        const categories = ['Político', 'Económico', 'Social', 'Tecnológico', 'Ecológico', 'Legal'];
        const averages = categories.map(cat => {
            const vars = initialData.entornoVariables.filter(v => v.categoria.toLowerCase() === cat.toLowerCase());
            if (vars.length === 0) return 3; // Valor por defecto si no hay variables
            return vars.reduce((sum, v) => sum + v.impacto, 0) / vars.length;
        });
        
        // Actualizar gráfico
        window.entornoRadarChart.data.datasets[0].data = averages;
        window.entornoRadarChart.update();
    }

    function updateCompetitivoRadarChart() {
        // Calcular promedios por fuerza
        const forces = ['Competencia', 'Nuevos Entrantes', 'Sustitutos', 'Proveedores', 'Clientes'];
        const averages = forces.map(force => {
            const vars = initialData.competitivoVariables.filter(v => v.fuerza.toLowerCase() === force.toLowerCase().replace(' ', ''));
            if (vars.length === 0) return 3; // Valor por defecto si no hay variables
            return vars.reduce((sum, v) => sum + v.intensidad, 0) / vars.length;
        });
        
        // Actualizar gráfico
        window.competitivoRadarChart.data.datasets[0].data = averages;
        window.competitivoRadarChart.update();
    }

    function updateRevenueByUnitChart(metrics) {
        // Actualizar el gráfico de Revenue por Unidad con los nuevos datos
        const digitalPaymentsRevenue = metrics.revenue * 0.65;
        const instantPaymentsRevenue = metrics.revenue * 0.35;
        
        window.revenueByUnitChart.data.datasets[0].data = [
            digitalPaymentsRevenue * 0.9 / 3,
            digitalPaymentsRevenue * 0.95 / 3,
            digitalPaymentsRevenue / 3
        ];
        
        window.revenueByUnitChart.data.datasets[1].data = [
            instantPaymentsRevenue * 0.9 / 3,
            instantPaymentsRevenue * 0.95 / 3,
            instantPaymentsRevenue / 3
        ];
        
        window.revenueByUnitChart.update();
    }

    function updateTransactionsCharts() {
        const metrics = calculateFinancialMetrics();
        const transactionImpact = metrics.revenue / 4500000; // Factor de impacto basado en revenue
        
        // Actualizar gráfico de transacciones digitales
        window.digitalTransactionsChart.data.datasets[0].data = [
            520000 * transactionImpact,
            545000 * transactionImpact,
            578000 * transactionImpact
        ];
        
        window.digitalTransactionsChart.data.datasets[1].data = [
            320000 * transactionImpact,
            335000 * transactionImpact,
            355000 * transactionImpact
        ];
        
        window.digitalTransactionsChart.data.datasets[2].data = [
            280000 * transactionImpact,
            295000 * transactionImpact,
            312000 * transactionImpact
        ];
        
        window.digitalTransactionsChart.update();
        
        // Actualizar gráfico de transacciones instantáneas
        window.instantTransactionsChart.data.datasets[0].data = [
            320000 * transactionImpact,
            335000 * transactionImpact,
            355000 * transactionImpact
        ];
        
        window.instantTransactionsChart.data.datasets[1].data = [
            180000 * transactionImpact,
            190000 * transactionImpact,
            201000 * transactionImpact
        ];
        
        window.instantTransactionsChart.data.datasets[2].data = [
            150000 * transactionImpact,
            158000 * transactionImpact,
            167000 * transactionImpact
        ];
        
        window.instantTransactionsChart.update();
    }

    // Inicializar variables de entorno y competitivo con algunos datos de ejemplo
    initialData.entornoVariables = [
        { id: 1, categoria: 'Político', variable: 'Influencia gubernamental', impacto: 5, fecha: '2023-01-15' },
        { id: 2, categoria: 'Tecnológico', variable: 'IoT - Pagos M2M', impacto: 3, fecha: '2023-02-20' },
        { id: 3, categoria: 'Legal', variable: 'Nuevas normativas de licencias', impacto: 4, fecha: '2023-03-10' },
        { id: 4, categoria: 'Económico', variable: 'Formalización de la economía', impacto: 2, fecha: '2023-01-25' }
    ];

    initialData.competitivoVariables = [
        { id: 1, fuerza: 'Competencia', variable: 'Link', intensidad: 5, fecha: '2023-01-18' },
        { id: 2, fuerza: 'Sustitutos', variable: 'Crypto', intensidad: 3, fecha: '2023-02-22' },
        { id: 3, fuerza: 'Clientes', variable: 'Meli volumen', intensidad: 4, fecha: '2023-03-05' },
        { id: 4, fuerza: 'Nuevos Entrantes', variable: 'Digitalización del sector', intensidad: 2, fecha: '2023-01-30' }
    ];

    // Inicializar listas y gráficos
    updateEntornoVariablesList();
    updateCompetitivoVariablesList();
    updateEntornoRadarChart();
    updateCompetitivoRadarChart();
    updateSuggestedStrategies();
});