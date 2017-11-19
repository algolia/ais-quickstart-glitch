const instantsearch = window.instantsearch;

const glitchApp = window.glitchApp;

// // create an instantsearch instance with our app id and api key
// const search = instantsearch({
//   appId: glitchApp.algolia.app_id,
//   apiKey: glitchApp.algolia.search_api_key,
//   indexName: glitchApp.algolia.index_name,
//   urlSync: true,
//   searchParameters: {
//     hitsPerPage: 3
//   }
// });

// create an instantsearch instance with our app id and api key
const search = instantsearch({
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
    hitsPerPage: 10,
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
    }
  })
);

// comment in for pagination :)
// search.addWidget(
//   instantsearch.widgets.pagination({
//     container: '#pagination'
//   })
// );

search.start();