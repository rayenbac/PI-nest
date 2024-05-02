socket = io('ws://localhost:3000'); // Remplacez l'URL par celle de votre serveur WebSocket

socket.onopen = () => { 
  console.log('WebSocket connection established.');
};

socket.onmessage = (event) => {
  const eventData = JSON.parse(event.data);
  if (eventData.event === 'newProduct') {
    console.log('New product notification received:', eventData.data);
    // Affichez les données de notification sur l'interface utilisateur
  }
};

socket.onclose = () => {
  console.log('WebSocket connection closed.');
};
