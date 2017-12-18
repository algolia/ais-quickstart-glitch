const express = require('express');
const app = express();
const nunjucks = require('nunjucks')

const algoliaHelper = require('./server/helpers/algolia');

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

// check data structure via button in UI and in console logs
app.get('/check-data', (request, response) => {
  algoliaHelper.checkDataStructure(dataUrl).then(() => {
    response.send(nunjucks.render('index.html', getTemplateContext(request)));
  }).catch((err) => {
    response.redirect('/');
  });
});

// upload data to Algolia via button in UI
app.get('/upload-data', (request, response) => {
  algoliaHelper.dataToAlgoliaObject(dataUrl);
  response.send(nunjucks.render('index.html', getTemplateContext(request)));
});

// configure index Algolia via button in UI
app.get('/configure-index', (request, response) => {
  algoliaHelper.configureAlgoliaIndex();
  response.send(nunjucks.render('index.html', getTemplateContext(request)));
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
      data_structure: algoliaDataStructure(),
      upload_data: algoliaUploadData(),
      set_settings: algoliaSetSettings()
    }
  };
}

// helper methods to check server side data for users set up checklist

// check to see if user has remixed the application
function newDomainCheck() {
  if (process.env.PROJECT_DOMAIN != 'instantsearch-quickstart') {
    console.log("new domain " + process.env.PROJECT_DOMAIN)
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

// check if user has viewed data structure
function algoliaDataStructure(){
  if (process.env.CHECK_DATA_URL) {
    return true;
  } else {
    console.warn('Data has not been checked yet');
    return null;
  }
}

// check if 
function algoliaUploadData(){
  if (process.env.SEND_DATA_TO_ALGOLIA) {
    return true;
  } else {
    console.warn('Data has not been sent to Algolia yet');
    return null;
  }
}

function algoliaSetSettings(){
  if (process.env.SET_ALGOLIA_SETTINGS) {
    return true;
  } else {
    console.warn('SetSettings has not been called yet');
    return null;
  }
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});