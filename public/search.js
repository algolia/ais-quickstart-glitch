$(document).ready(function() {
  var instantsearch = window.instantsearch;

  // create an instantsearch instance with our app id and api key
  var search = instantsearch({
    appId: window.glitchApp.algolia.app_id,
    apiKey: window.glitchApp.algolia.search_api_key,
    indexName: window.glitchApp.algolia.index_name,
    urlSync: true,
    searchParameters: {
      hitsPerPage: 3
    }
  });

// conects the search input on your page to Algolia
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search your favorite actors'
  })
);
  // adds the results of your data, in your return statement you can change what you want shown
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
                  <h3 class="hit-text">${hit._highlightResult.name.value}</h3>
                  <img src="https://image.tmdb.org/t/p/w45/${hit.image_path}" height="50" width="50">
                </p>
                <p>
                  Rating: ⭐️ ${hit.rating}
                </p>

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

  // adds pagination past the results you set on line 33
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );

  search.start();
});