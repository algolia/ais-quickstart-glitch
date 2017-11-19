const express = require('express');
const app = express();
const nunjucks = require('nunjucks')
const algoliaHelper = require('./server/helpers/algolia');
// change URL to your data source you want to search
const dataUrl = 'http://api.giphy.com/v1/gifs/search?q=dogs&api_key=dc6zaTOxFJmzC'
// great resource for inspiration: https://github.com/caesar0301/awesome-public-datasets

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// // index route
// app.get('/', (request, response) => {
//   response.send(nunjucks.render('index.html', getTemplateContext(request)));
// });

// abstract api logic, passing in your data url
algoliaHelper.indexTweets(dataUrl)

function getTemplateContext(request) {
  return {
    algolia: {
      index_name: 'dog-gifs',
      app_id: process.env.ALGOLIA_APP_ID,
      search_api_key: process.env.ALGOLIA_SEARCH_API_KEY
    }
  };
}
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
