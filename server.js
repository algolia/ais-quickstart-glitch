const express = require('express');
const app = express();
const nunjucks = require('nunjucks')
const axios = require('axios');

// ＼(＾▽＾)／ 🔎 Step 4a: Comment in this line: 
const algoliaHelper = require('./server/helpers/algolia');

// ＼(＾▽＾)／ 🔎 Step 4b: change from null to a URL to your data source you want to search
const dataUrl = "https://raw.githubusercontent.com/algolia/datasets/master/movies/actors.json"

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// we use nunjucks to send data that we can later use in our views
nunjucks.configure('views', {
  express: app,
  noCache: true
});

// create index route
app.get('/', (request, response) => {
  response.send(nunjucks.render('index.html', getTemplateContext(request)));
});

// create search route
app.get('/search', (request, response) => {
  response.send(nunjucks.render('search.html', getTemplateContext(request)));
});

// check data structure
app.get('/check-data', (request, response) => {
  algoliaHelper.checkDataStructure(dataUrl)
  response.redirect('/');
});

// upload data to Algolia via button in UI
app.get('/upload-data', (request, response) => {
  algoliaHelper.dataToAlgoliaObject(dataUrl);
  response.redirect('/');
});

// configure index Algolia via button in UI
app.get('/configure-index', (request, response) => {
  algoliaHelper.configureAlgoliaIndex();
  response.redirect('/');
});

function getTemplateContext(request) {
  return {
    algolia: {
      index_name: process.env.PROJECT_DOMAIN,
      app_id: process.env.ALGOLIA_APP_ID,
      search_api_key: process.env.ALGOLIA_SEARCH_API_KEY
    },
    data: {
      algolia_env: algoliaClient(),
      new_domain: newDomainCheck(),
      query_data: queryDataCheck()
    }
  };
}

// helper methods to check server side data for users set up checklist

// check to see if user has remixed the application
function newDomainCheck() {
  if (process.env.PROJECT_DOMAIN != 'instantsearch-quickstart') {
    console.log(process.env.PROJECT_DOMAIN)
    return true;
  } else {
    console.warn('Project has not been remixed yet.');
    return null;
  }
}

// check to see if user has added variables to their .env file
function algoliaClient() {
  if (process.env.ALGOLIA_APP_ID &&
      process.env.ALGOLIA_ADMIN_API_KEY &&
      process.env.ALGOLIA_SEARCH_API_KEY) {
    return true;
  } else {
    console.warn('One or more Algolia environment variables missing.');
    return null;
  }
}

// check to see if user has added a data source and sent data to Aloglia for indexing
function queryDataCheck() {
  if (dataUrl != null){
    return true;
  } else {
    console.warn('Project has not set up indexed data yet.');
    return null;
  }
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});