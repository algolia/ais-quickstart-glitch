const axios = require('axios')
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
// change index name for something that reflects your data source
const algoliaIndex = algoliaClient.initIndex('dog-gifs');

function indexTweets(data_url){
  return axios.get(data_url,{})
  .then(function(response){
      return dataToAlgoliaObject(response.data.data)
    })
  .then(function(response){
     sendDataToAlgolia(response)
  })
  .catch(function(error) {
      console.log(error)
    })
}

function dataToAlgoliaObject(data_points){
  var algoliaObjects = [];
  console.log("looping over data points: " + data_points.length)
  // iterate over data and build the algolia record
  for (var i = 0; i < data_points.length; i++) {
    var data_point = data_points[i];
    var algoliaObject = {
        // the objectID is the key for the algolia record, and mapping
        // data id to object ID guarantees only one copy of the data in algolia
        // change these variables pending on your data source and how you want to display data
        objectID: data_point.id,
        id: data_point.id,
        title: data_point.title,
        created_at: Date.parse(data_point.import_datetime) / 1000,
        trending_date: Date.parse(data_point.trending_datetime) / 100,
        embed_url: data_point.embed_url,
        rating: data_point.rating 
      };
    console.log("inside loop creating Algolia objects " + algoliaObject)
    algoliaObjects.push(algoliaObject);
  }
  configureAlgoliaIndex()
  return algoliaObjects;
}

function sendDataToAlgolia(algoliaObjects){
  console.log("Sending data to Algolia" + algoliaObjects)
  algoliaIndex.addObjects(algoliaObjects, function(err, content) {
    console.log(content);
  });
}

function configureAlgoliaIndex(){
  console.log("Configuring index")
  algoliaIndex.setSettings({
  searchableAttributes: [
    'title'
  ],
  customRanking: ['desc(rating)'],
  });
}

module.exports = {indexTweets}