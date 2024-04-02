async function getInformacion() {
    try {
        const token = localStorage.getItem('token');
        console.log(token);

        const response = await fetch('http://localhost:8080/card', {
            method: 'GET',
            headers: {
                'token': token
            }
        });

        const data = await response.json();
        console.log(data);

        const informacionBancaria = data.informacionBancaria;
        const cardContainer = document.getElementById('cardContainer');
        const transactionContainer = document.querySelector('.transaccion-container');

        informacionBancaria.forEach(doc => {
            const card = document.createElement('div');
            card.innerHTML = `
                <div class="credit-card">
                    <div class="card-header">
                        <div class="chip"></div>
                    </div>
                    <div class="card-body">
                        <span class="card-number">${doc.numeroTarjeta}</span>
                        <div class="card-details">
                            <div class="card-holder">
                                <span class="label">Saldo</span>
                                <span class="value">$${doc.saldo}</span>
                            </div>
                            <div class="card-expiry">
                                <span class="label">Ingresos</span>
                                <span class="value">$${doc.ingresos}</span>
                            </div>
                            <div class="card-expiry">
                                <span class="label">Egresos</span>
                                <span class="value">$${doc.egresos}</span>
                            </div>
                        </div>
                        <button class="delete-btn btn-block">Eliminar</button>
                        <button class="transactions-btn btn-block">Transacciones</button>
                    </div>
                </div>
            `;

            cardContainer.appendChild(card);
            
            const transactionsBtn = card.querySelector('.transactions-btn');
            transactionsBtn.addEventListener('click', () => {
                showTransactions(doc.movimientos, transactionContainer);
            });
        });

    } catch (error) {
        console.error('Error al obtener la información:', error);
    }
}

function showTransactions(movimientos, transactionContainer) {
    transactionContainer.innerHTML = '';
    
    movimientos.forEach(movimiento => {
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction');
        transactionDiv.innerHTML = `
            <p>Tienda: ${movimiento.tienda}</p>
            <p>Descripción: ${movimiento.descripcion}</p>
            <p>Fecha: ${movimiento.fecha}</p>
            <p>Monto: $${movimiento.monto}</p>
        `;
        transactionContainer.appendChild(transactionDiv);
    });
}

window.onload = getInformacion;