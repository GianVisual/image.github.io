
import React, { useState, useEffect, useMemo } from 'react';
import { QuoteData, Service, Condition } from './types';
import { generateHtml } from './utils/htmlGenerator';
import { InputField } from './components/InputField';

const initialData: QuoteData = {
  clientName: 'Dr. Yubany Pajón',
  clientSpecialty: 'Periodoncia e implantología',
  clientImageUrl: 'https://picsum.photos/800/600',
  projectName: 'Renovación Visual Odontológica',
  projectBadge: 'Propuesta Video-spot comercial',
  heroSubtitle: 'Producción audiovisual diseñada para proyectar la excelencia y profesionalismo.',
  services: [
    { id: '1', title: 'Videos testimoniales', description: 'Producción vertical que captura la esencia y calidad de los procedimientos.' },
    { id: '2', title: 'Flyers conceptuales', description: 'Narrativa persuasiva que conecta emocionalmente mediante contenido de valor.' }
  ],
  price: 300000,
  currency: 'COP (Pesos Colombianos)',
  priceSectionText: 'Inversión Total',
  conditions: [
    { id: '1', title: 'Forma de Pago', description: '50% anticipo, 50% contra entrega.' },
    { id: '2', title: 'Entrega', description: '15 días hábiles post-rodaje.' }
  ],
  whatsappLink: 'https://wa.me/573209263077',
  phone: '320 926 3077',
  email: 'Cotizaciones@gianvisual.com'
};

const App: React.FC = () => {
  const [data, setData] = useState<QuoteData>(initialData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const updateData = (field: keyof QuoteData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    const newService: Service = { id: Date.now().toString(), title: 'Nuevo Servicio', description: 'Descripción aquí' };
    updateData('services', [...data.services, newService]);
  };

  const removeService = (id: string) => {
    updateData('services', data.services.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    const newServices = data.services.map(s => s.id === id ? { ...s, [field]: value } : s);
    updateData('services', newServices);
  };

  const addCondition = () => {
    const newCondition: Condition = { id: Date.now().toString(), title: 'Nueva Condición', description: 'Descripción aquí' };
    updateData('conditions', [...data.conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    updateData('conditions', data.conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    const newConditions = data.conditions.map(c => c.id === id ? { ...c, [field]: value } : c);
    updateData('conditions', newConditions);
  };

  const fullHtml = useMemo(() => generateHtml(data), [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullHtml);
    alert('¡Código HTML copiado al portapapeles!');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#05010f]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#130626] border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            GV
          </div>
          <span className="font-bold text-xl tracking-tight font-montserrat">GIAN VISUAL GENERATOR</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${activeTab === 'edit' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'}`}
          >
            Editor
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${activeTab === 'preview' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'}`}
          >
            Vista Previa
          </button>
          <button 
            onClick={copyToClipboard}
            className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            COPIAR HTML
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex-1 overflow-y-auto p-8 custom-scrollbar ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`}>
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Section 1: Client */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-purple-800 pb-2">
                Sección 1: Datos del Cliente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nombre del Cliente" value={data.clientName} onChange={(v) => updateData('clientName', v)} />
                <InputField label="Especialidad" value={data.clientSpecialty} onChange={(v) => updateData('clientSpecialty', v)} />
              </div>
              <InputField label="URL Imagen Cliente" value={data.clientImageUrl} onChange={(v) => updateData('clientImageUrl', v)} />
              <InputField label="Nombre del Proyecto" value={data.projectName} onChange={(v) => updateData('projectName', v)} />
              <InputField label="Badge del Proyecto" value={data.projectBadge} onChange={(v) => updateData('projectBadge', v)} />
              <InputField label="Descripción (Subtitle)" value={data.heroSubtitle} onChange={(v) => updateData('heroSubtitle', v)} isTextArea />
            </section>

            {/* Section 2: Services */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b border-purple-800 pb-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Sección 2: Servicios
                </h2>
                <button onClick={addService} className="text-sm bg-purple-700/50 hover:bg-purple-600 px-3 py-1 rounded-md transition-colors border border-purple-500/50">
                  + Añadir
                </button>
              </div>
              <div className="space-y-4">
                {data.services.map((service, idx) => (
                  <div key={service.id} className="p-4 bg-[#130626] border border-purple-900/50 rounded-xl relative group">
                    <button 
                      onClick={() => removeService(service.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <InputField label={`Servicio #${idx + 1}`} value={service.title} onChange={(v) => updateService(service.id, 'title', v)} />
                    <InputField label="Descripción" value={service.description} onChange={(v) => updateService(service.id, 'description', v)} isTextArea />
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Pricing */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-purple-800 pb-2">
                Sección 3: Precio e Inversión
              </h2>
              <InputField label="Valor Numérico" type="number" value={data.price} onChange={(v) => updateData('price', parseFloat(v) || 0)} />
              <InputField label="Moneda / Texto Moneda" value={data.currency} onChange={(v) => updateData('currency', v)} />
              <InputField label="Texto Sección (Título)" value={data.priceSectionText} onChange={(v) => updateData('priceSectionText', v)} />
            </section>

            {/* Section 4: Conditions */}
            <section>
               <div className="flex items-center justify-between mb-6 border-b border-purple-800 pb-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Sección 4: Términos y Condiciones
                </h2>
                <button onClick={addCondition} className="text-sm bg-purple-700/50 hover:bg-purple-600 px-3 py-1 rounded-md transition-colors border border-purple-500/50">
                  + Añadir
                </button>
              </div>
              <div className="space-y-4">
                {data.conditions.map((condition, idx) => (
                  <div key={condition.id} className="p-4 bg-[#130626] border border-purple-900/50 rounded-xl relative group">
                    <button 
                      onClick={() => removeCondition(condition.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <InputField label={`Término #${idx + 1}`} value={condition.title} onChange={(v) => updateCondition(condition.id, 'title', v)} />
                    <InputField label="Descripción" value={condition.description} onChange={(v) => updateCondition(condition.id, 'description', v)} isTextArea />
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Contact */}
            <section className="pb-12">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-purple-800 pb-2">
                Sección 5: Contacto
              </h2>
              <InputField label="Link de WhatsApp" value={data.whatsappLink} onChange={(v) => updateData('whatsappLink', v)} />
              <InputField label="Teléfono (Visual)" value={data.phone} onChange={(v) => updateData('phone', v)} />
              <InputField label="Correo Electrónico" value={data.email} onChange={(v) => updateData('email', v)} />
            </section>
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 bg-black overflow-hidden relative ${activeTab === 'edit' ? 'hidden md:block' : 'block'}`}>
          <iframe 
            srcDoc={fullHtml} 
            className="w-full h-full border-none"
            title="Live Preview"
          />
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #05010f;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e0a3b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2d0f59;
        }
      `}</style>
    </div>
  );
};

export default App;
