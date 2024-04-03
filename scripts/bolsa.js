function generateCandlestickData(ticker) {
    return fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-10-01/2024-04-02?adjusted=true&sort=asc&limit=120&apiKey=Upy3sjI9oVVEAeyx9Lpvx9kb_sF9qlnv`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud: ' + response.status);
        }
    })
    .then(data => {
        const candlestickData = data.results.map(result => {
            return {
                time: result.t / 1000,
                open: result.o,
                high: result.h,
                low: result.l,
                close: result.c
            };
        });
        return { candlestickData, ticker: data.ticker };
    })
    .catch(error => {
        console.error('Error:', error);
        return { candlestickData: [], ticker: '' };
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    const chartContainer1 = document.getElementById('chart-container-1');
    const chartContainer2 = document.getElementById('chart-container-2');
    const chartContainer3 = document.getElementById('chart-container-3');

    const chart1 = LightweightCharts.createChart(chartContainer1, { width: chartContainer1.offsetWidth, height: 300 });
    const chart2 = LightweightCharts.createChart(chartContainer2, { width: chartContainer2.offsetWidth, height: 300 });
    const chart3 = LightweightCharts.createChart(chartContainer3, { width: chartContainer3.offsetWidth, height: 300 });

    const { candlestickData: appleData, ticker: appleTicker } = await generateCandlestickData('AAPL');
    const { candlestickData: googleData, ticker: googleTicker } = await generateCandlestickData('GOOGL');
    const { candlestickData: microsoftData, ticker: microsoftTicker } = await generateCandlestickData('MSFT');

    const appleSeries = chart1.addCandlestickSeries();
    const googleSeries = chart2.addCandlestickSeries();
    const microsoftSeries = chart3.addCandlestickSeries();

    appleSeries.setData(appleData);
    googleSeries.setData(googleData);
    microsoftSeries.setData(microsoftData);

    // Actualizar el contenido de los elementos #ticker-name-X
    document.getElementById('ticker-name-1').textContent = appleTicker;
    document.getElementById('ticker-name-2').textContent = googleTicker;
    document.getElementById('ticker-name-3').textContent = microsoftTicker;
});