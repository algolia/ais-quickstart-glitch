const express = require('express');
const app = express();
const nunjucks = require('nunjucks')

const algoliaHelper = require('./server/helpers/algolia');

const dataUrl = "https://raw.githubusercontent.com/algolia/datasets/master/movies/actors.json"

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//app.use(requireEnvironmentVariables);
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
app.post('/check-data', (request, response) => {
  algoliaHelper.checkDataStructure(dataUrl)
  response.sendStatus(200)
});

// upload data to Algolia via button in UI
app.post('/upload-data', (request, response) => {
  algoliaHelper.indexTweets(dataUrl).then(() => {
    response.sendStatus(200)
  })
});

// configure index Algolia via button in UI
app.post('/configure-index', (request, response) => {
  algoliaHelper.configureAlgoliaIndex();
  response.sendStatus(200)  
});

function getTemplateContext(request) {
  return {
    algolia: {
      index_name: "movie-actors",
      app_id: process.env.ALGOLIA_APP_ID,
      search_api_key: process.env.ALGOLIA_SEARCH_API_KEY
    },
    data: {
      algolia_env: checkAlgoliaEnvKeys(),
      new_domain: checkNewDomain(),
      data_structure: checkDataStructure(),
      upload_data: checkAlgoliaDataUpload(),
      set_settings: checkAlgoliaSetSettings()
    }
  };
}


function requireEnvironmentVariables(request, response, next) {
  if (process.env.ALGOLIA_APP_ID &&
      process.env.ALGOLIA_ADMIN_API_KEY &&
      process.env.ALGOLIA_SEARCH_API_KEY){
    next();
  } else {
    throw {
      message: "One or more environment variables is missing",
      detail: "Don't worry! If you just remixed, this is normal. See the README for further instructions."
    };
  }
}

// helper methods to check server side data for users set up checklist

// check to see if user has remixed the application
function checkNewDomain() {
  if (process.env.PROJECT_DOMAIN != 'algolia-quickstart') {
    console.log("new domain " + process.env.PROJECT_DOMAIN)
    return true;
  } else {
    console.warn('Project has not been remixed yet.');
    return null;
  }
}

// check to see if user has added variables to their .env file
function checkAlgoliaEnvKeys() {
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
function checkDataStructure(){
  if (algoliaHelper.checkDataStructure === true) {
    return true
  } else {
    console.warn("checkData has not been called yet")
    return null;
  }
}

// check getData
function checkAlgoliaDataUpload(){
  if (algoliaHelper.checkData() != undefined) {
    return true
  } else {
    console.warn("addObjects has not been called yet")
    return null;
  }
}

// check getSettings
function checkAlgoliaSetSettings(){
  if (algoliaHelper.checkSettings() != null) {
    return true
  } else {
      console.warn("setSettings has not been called yet")
      return null;
  }
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});