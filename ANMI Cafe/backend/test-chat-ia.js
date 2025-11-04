// Test rápido del endpoint de chat
const testChat = async () => {
  try {
    console.log('🚀 Enviando petición a http://localhost:3000/api/ai/chat...\n');
    
    const response = await fetch('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pregunta: '¿Qué productos de café tienes disponibles?',
        contexto: 'tienda'
      })
    });

    console.log(`📡 Status: ${response.status} ${response.statusText}\n`);

    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ RESPUESTA DEL CHAT:');
      console.log('==========================================');
      console.log('Pregunta:', data.pregunta);
      console.log('Contexto:', data.contexto);
      console.log('\nRespuesta IA:');
      console.log(data.respuesta);
      console.log('==========================================\n');
    } else {
      console.log('\n❌ ERROR DEL SERVIDOR:');
      console.log('==========================================');
      console.log(JSON.stringify(data, null, 2));
      console.log('==========================================\n');
    }
  } catch (error) {
    console.error('\n❌ ERROR DE CONEXIÓN:', error.message);
    console.error('Asegúrate de que el backend esté corriendo en http://localhost:3000\n');
  }
};

testChat();
