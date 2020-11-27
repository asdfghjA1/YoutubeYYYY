require('dotenv').config()

var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const VIDEO_ID = process.env.VIDEO_ID

main()//Calling the main function :)

async function main() {
  try {
    const auth = authorize()
    const videoViews = await getVideoViews(auth)
    const videoTitle = await updateVideoTitle(auth, videoViews)
    console.log(videoTitle)
  } catch (e) {
    console.error(e)
  }
  //This prints out the time for when the code was executed
var currentdate = new Date();
var datetime = "This was executed at : " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
console.log(datetime);
}

function authorize() {
  const credentials = JSON.parse(process.env.CLIENT_SECRET)
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  oauth2Client.credentials = JSON.parse(process.env.OAUTH_TOKEN);
  return oauth2Client
}

function getVideoViews(auth) {
  const service = google.youtube('v3')
  return new Promise((resolve, reject) => {
    service.videos.list({
      auth: auth,
      part: 'statistics',
      id: VIDEO_ID
    }, function(err, response) {
      if (err) return reject(err)
      resolve(response.data.items[0].statistics.viewCount)
    })
  })
}

function updateVideoTitle(auth, views) {
  const service = google.youtube('v3')
  return new Promise((resolve, reject) => {
    service.videos.update({
      auth: auth,
      part: 'snippet',
      resource: {
        id: VIDEO_ID,
        snippet: {
          title: `This Video will always have ${new Intl.NumberFormat('en-US').format(views)} views`,
          categoryId: 24 //this is entertainment video id :)
        }
      }
    }, function(err, response) {
      if (err) return reject(err)
      resolve(response.data.snippet.title)
    })
  })
}