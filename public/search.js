var instantsearch = window.instantsearch;

// create an instantsearch instance with our app id and api key
// var search = instantsearch({
//   appId: window.glitchApp.algolia.app_id,
//   apiKey: window.glitchApp.algolia.search_api_key,
//   indexName: window.glitchApp.algolia.index_name,
//   urlSync: true,
//   searchParameters: {
//     hitsPerPage: 3
//   }
// });

var search = instantsearch({
  appId: 'M438H8L7AG',
  apiKey: '76f893fdbe2b8b87517bcac8a063c150',
  indexName: 'dog-gifs',
  urlSync: true,
  searchParameters: {
    hitsPerPage: 3
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 12,
    templates: {
      empty: `We didn't find any results for the search <em>\"{{query}}\"</em>`,
      item: function(hit) {
        try {
          return `
            <div class="col-md-4" style="text-align: center;">
              <p> 
                <h3 class="hit-text">${hit._highlightResult.title.value}</h3>
              </p>
              <iframe src="${hit.embed_url}" width="300" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
          `;
        } catch (e) {
          console.warn("Couldn't render hit", hit, e);
          return "";
        }
      }
    }
  })
);

// comment in for pagination :)
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination'
  })
);

search.start();