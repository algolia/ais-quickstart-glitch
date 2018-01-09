// only do if not running on glitch
if (!process.env.PROJECT_DOMAIN) {
  // read environment variables (only necessary locally, not on Glitch)
  require('dotenv').config();
}

const algoliasearch = require('algoliasearch');

if (process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_ADMIN_API_KEY && process.env.ALGOLIA_APP_ID) {
  var algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
  var algoliaIndex = algoliaClient.initIndex("movie-actors");  
  console.log("variables assigned")
} else {
  var algoliaClient = ''
  var algoliaIndex = 'blankindex'
  console.log("no variables")
}
// use axios for api calls
const axios = require('axios');

// require algoliasearch from the npm package here for usage

// instantiate constant for algoliasearch passing in variables needed at setup


// (~˘▽˘)~ Useful tips
// index name is currently using project domain from glitch ie dancing-squirrel
// change within parens of initIndex for something relevant to the data you want to index
// good examples are 'movie-actors' or 'dog-pictures' or 'my-contacts'
// you can find this index created under your Algolia dashboard => indices



// (~˘▽˘)~ Useful tips
// call this function from the server.js to start indexing data
// the data url received is in JSON format, so we call .data on it to start working with it
// axios by default uses promises, so we can chain .then on our functions
// we use dataToAlgoliaObject to create usable algoliaObjects in our index
// then we take the response from that function and use sendDataToAlgolia
function indexData(data_url){
  return axios.get(data_url,{})
  .then(function(response){
      return dataToAlgoliaObject(response.data)
    })
  .then(function(response){
     sendDataToAlgolia(response)
  })
  .then(function(response){
    return
  })
  .catch(function(error) {
      console.warn(error)
    })
}

// (~˘▽˘)~ Useful tips
// the data_points we have is still raw with many objects underneath data
// we start with an empty array "algoliaObjects"
// we loop over each data point until we reach the end
// each data point we assign to a variable we create that we can then later use within an algoiaObect
// you can see the title for example by looping through the objects by calling algoliaObject.title indvididually
// change the variable names in here according to what makes sense with the data you are using
// required and best practice for Algolia is to have objectID be the same as the datapoint id 
var algoliaObjects = [];
function dataToAlgoliaObject(data_points){
  // var algoliaObjects = [];
  
  // iterate over data and build the algolia record
  for (var i = 0; i < data_points.length; i++) {
    var data_point = data_points[i];
    var algoliaObject = {
        // (~˘▽˘)~ Useful tips
        // the objectID is the key for the algolia record, and mapping
        // data id to object ID guarantees only one copy of the data in algolia
        //objectID: data_point.objectID,
        name: data_point.name,
        rating: data_point.rating,
        image_path: data_point.image_path,
        alternative_name: data_point.alternative_name
      };
      // (~˘▽˘)~ Useful tips
      // we can see our objects being created in the console!
      // use console.log for debugging while you are learning and creating
      // feel free to remove/comment out when you are done.
    // console.log("inside loop creating Algolia objects ")

    // after creating the algoliaObject with the data we want, we push into our array
    algoliaObjects.push(algoliaObject);
  }

  // we return our array of usable algoliaObjects at the end of this function
  // this will be what we see in our response that we will then send to algolia
  return sendDataToAlgolia(algoliaObjects);
}

// (~˘▽˘)~ Useful tips
// there are a lot of options for your setSettings on how you want to see your data
// using the constant we defined earlier for initiated the index, we call setSettings
// there are a lot of options all listed here: https://www.algolia.com/doc/api-reference/api-parameters/

// (~˘▽˘)~ Basic Setup:
// searchableAttributes: list here what you would like searchable from the algoliaObject you created
// attributesToHighlight: highlights the text you are searching for
// customRanking: choose how your data will be displayed, desc() or asc()
// attributesToRetrieve: return these attributes for dislaying in search results
// ignorePlurals: make plural and singular matches count the same for languages you specify

function configureAlgoliaIndex(){
  // *＼(＾▽＾)／ 🔎 Step 3b: Comment in the lines for which settings you want to use
  console.log("setSettings with Algolia")
  algoliaIndex.setSettings({
    searchableAttributes: [
      'name'
    ],
    attributesToHighlight: [
      'name'
    ],
    customRanking: [
      'desc(rating)'
    ],
    attributesToRetrieve: [
      'name', 
      'rating',
      'image_path'
    ]
  });
}

function sendDataToAlgolia(algoliaObjects){
  algoliaIndex.addObjects(algoliaObjects, function(err, content) {
    console.log("sending data to Algolia")  
  })
}

function checkDataStructure(data_url){
  return axios.get(data_url, {})
  .then(function(response){
    console.log("＼(＾▽＾)／ 🔎 Sample of data: ")
    console.log(response.data[0]);
  })
  .catch(function(error) {
    console.log(error)
  })
};

function checkSettings(){
  if (algoliaObjects.length != 0) {
    algoliaIndex.getSettings(function(err, content) {  
      return content.attributesToRetrieve;
      return true;
    }); 
  } else {
    return null
  }
}

function checkData(){
  if (algoliaObjects.length != 0 ) {
    algoliaIndex.getObjects([algoliaObjects[0]], function(err, content) {
      return content
    });
  } else {
    return null
  }
}
module.exports = {indexData, dataToAlgoliaObject, configureAlgoliaIndex, sendDataToAlgolia, checkDataStructure, checkSettings, checkData}