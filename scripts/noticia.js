const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

const currentDate = new Date('2024-04-02');
const startDate = new Date('2024-03-25');
const endDate = new Date('2024-04-02');

const url = `https://api.benzinga.com/api/v2/news?token=82a705bc69754c42be2fafbea81f66fb&page=1&pageSize=5&displayOutput=full&date=${currentDate.toISOString().split('T')[0]}&dateFrom=${startDate.toISOString().split('T')[0]}&dateTo=${endDate.toISOString().split('T')[0]}&updatedSince=1&publishedSince=1&sort=id%3Aasc&tickers=GOOG%2CAAPL%2CMSFT&topics=Business`;

fetch(url, options)
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('news-container');
        data.forEach(news => {
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
            newsElement.innerHTML = `
        <div class="container">
        <div class="row">
          <h3 class="new-title">${news.title}</h3>
          <p class="new-body">${news.body}</p>
          </div>
          </div>
        `;
            console.log(data);
            newsContainer.appendChild(newsElement);
        });
    })
    .catch(err => console.error(err));