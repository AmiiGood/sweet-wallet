async function obtenerDatosFinancieros() {
  try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/card', {
          headers: {
              'token': token
          }
      });
      const datos = await response.json();
      return datos;
  } catch (error) {
      console.error('Error al obtener datos financieros:', error);
      return null;
  }
}

obtenerDatosFinancieros()
  .then(datos => {
      if (datos && datos.informacionBancaria && datos.informacionBancaria.length > 0) {
          let totalIngresos = 0;
          let totalEgresos = 0;
          datos.informacionBancaria.forEach(elemento => {
              totalIngresos += elemento.ingresos;
              totalEgresos += elemento.egresos;
          });

          const saludFinanciera = totalIngresos > totalEgresos ? 'buena' : 'mala';
          const mensajeSaludFinanciera = saludFinanciera === 'buena'
              ? `Tu salud financiera es buena.\nTotal Ingresos: ${totalIngresos}\nTotal Egresos: ${totalEgresos}`
              : `Necesitas mejorar tu salud financiera.\nTotal Ingresos: ${totalIngresos}\nTotal Egresos: ${totalEgresos}`;

          const qrText = mensajeSaludFinanciera;
          const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrText)}`;

          fetch(qrCodeUrl)
              .then(response => response.blob())
              .then(blob => {
                  const imageUrl = URL.createObjectURL(blob);
                  const qrCodeImage = document.getElementById('qrCodeImage');
                  qrCodeImage.src = imageUrl;
              })
              .catch(error => console.error('Error:', error));

          const ctx = document.getElementById('financialHealthChart').getContext('2d');
          const chart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Salud Financiera'],
                  datasets: [{
                      label: 'Salud Financiera',
                      data: [saludFinanciera === 'buena' ? 1 : 0],
                      backgroundColor: saludFinanciera === 'buena' ? 'green' : 'red'
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true,
                          max: 1
                      }
                  }
              }
          });
      } else {
          console.error('No se pudieron obtener los datos financieros');
      }
  })
  .catch(error => console.error('Error al obtener datos financieros:', error));