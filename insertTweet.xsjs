var record = [];  
record.push(jsonStr); 
record.push(decodeURI(jsonStr)); 


var output = {}; 
output.data = []; 


var conn = $.db.getConnection();

conn.prepareStatement("SET SCHEMA \"TWEETS\"").execute(); 
var pstmt;


var hTweet     = JSON.parse(decodeURI(jsonStr));
var id         = hTweet.id;
var createdAt  = hTweet.createdAt;
var username   = hTweet.username;
var content    = hTweet.content;

// Not always populated
var latitude   = hTweet.latitude;
var longitude  = hTweet.longitude;
var reTweet    = hTweet.reTweet;
var rtId       = hTweet.rtId;
var rtUsername = hTweet.rtUsername;
var location   = hTweet.location;
var followers  = hTweet.followers;
var rtFollowers = hTweet.rtFollowers;


pstmt = conn.prepareStatement( "insert into \"TWEETS\" values(?,?,?,?,?,?,?,?,?,?,?,?)"); 
pstmt.setString(1,id);
pstmt.setString(2,createdAt);
pstmt.setString(3,latitude);
pstmt.setString(4,longitude);
pstmt.setString(5,username);
pstmt.setString(6,content);
pstmt.setString(7,reTweet);
pstmt.setString(8,rtId);
pstmt.setString(9,rtUsername);
pstmt.setString(10,location);
pstmt.setString(11,followers);
pstmt.setString(12,rtFollowers);
pstmt.execute();


conn.commit();


conn.close();


output.data.push(record); 
$.response.setBody(JSON.stringify(output));
