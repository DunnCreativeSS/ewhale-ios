const _ = require('lodash');
//const utils = require('./utils');

// This bot upvotes whover the target account upvotes

// We import the whaleshares js for now because smoke is not on npm
const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");
//console.log(serviceAccount);
const express = require('express')
var cors = require('cors')
var app = express()
let request = require("request");
app.use(cors())

const steem = require("@whaleshares/wlsjs");
//steem.api.setOptions({ transport: 'ws', url: '188.166.99.136:8090' });
//steem.api.setOptions({ transport: 'ws', url: "188.166.99.137:8090" });
//steem.api.setOptions({url: '188.166.99.136:8090'});

//steem.api.setOptions({ url: '188.166.99.136:8090' });
steem.config.set('address_prefix','WLS');
//steem.config.set('chain_id','1ce08345e61cd3bf91673a47fc507e7ed01550dab841fd9cdb0ab66ef576aaf0');

steem.api.setOptions({url: 'http://rpc.kennybll.com:8090'});
/*
setInterval(function(){
	steem.api.streamTransactions("head",(error, result) => {
let txType = result.operations[0][0]
let txData = result.operations[0][1]
  if(txType === 'comment') {
      if (!permlinks.includes(txData.permlink)){
		  for (var name in names){
			  //console.log(names[name].name);
			  //console.log(names[name].commentothers);
			  if (names[name].name == txData.parent_author){
				  if (names[name].commentothers == true){
					  client.users.get(names[name].id.toString()).send("New comment on your post! https://smoke.io/" + txData.parent_permlink + '/' + txData.permlink + " from " + txData.author);

				  }
			  }
		  }
            channel.send(txData.body + ' https://smoke.io/@' + txData.parent_author + '/' + txData.parent_permlink)

      permlinks.push(txData.permlink)
    
  }
  }
  
});
}, 60); */
app.param('key', function(req, res, next, key) {

    req.key = key;

    next();
});
app.get('/api/reblogs/:key', function (req, res){
	let toSend = [];
	notifications.forEach(notification => {
                if (req.key && req.key	 === notification[0]) {
                  ////console.log('Send push notification', notification[0]);
					if (notification[1].type == 'reblog'){
						if (notification[1].read == 0){
							notification[1].read = 1;
				  toSend.push(notification[1])
						}
					}
                }
              });
delete notifications.notification
			  res.json(toSend);
	});
	
app.get('/api/follows/:key', function (req, res){
	let toSend = [];
	notifications.forEach(notification => {
                if (req.key && req.key	 === notification[0]) {
                  ////console.log('Send push notification', notification[0]);
					if (notification[1].type == 'follows'){
if (notification[1].read == 0){
							notification[1].read = 1;
					  toSend.push(notification[1])
						}					}
                }
              });
delete notifications.notification
			  res.json(toSend);
	});
	app.get('/api/mentions/:key', function (req, res){
	let toSend = [];
	notifications.forEach(notification => {
                if (req.key && req.key	 === notification[0]) {
                  ////console.log('Send push notification', notification[0]);
					if (notification[1].type == 'mention'){
						if (notification[1].read == 0){
							notification[1].read = 1;
				  toSend.push(notification[1])
						}
					}
                }
              });delete notifications.notification
			  res.json(toSend);
	});
app.get('/api/replies/:key', function (req, res){
	let toSend = [];
////console.log(req.key);
////console.log(notifications)
	notifications.forEach(notification => {
////console.log(notification[0])
                if (req.key && req.key	 === notification[0]) {
  //                //console.log('Send push notification', notification[0]);
					if (notification[1].type == 'reply'){
if (notification[1].read == 0){
							notification[1].read = 1;
				  toSend.push(notification[1])
						}					}
                }
              });
delete notifications.notification
			  res.json(toSend);
	});
	
app.get('/api/rvotes/:key', function (req, res){
	let toSend = [];
	notifications.forEach(notification => {
                if (req.key && req.key	 === notification[0]) {
    //              //console.log('Send push notification', notification[0]);
					if (notification[1].type == 'vote'){
if (notification[1].read == 0){
							notification[1].read = 1;
				  toSend.push(notification[1])
						}					}
                }
              });delete notifications.notification
			  res.json(toSend);
	});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/devices', function (req, res){
	//console.log('devices post');
	let deviceid = req.body.deviceid;
	let username = req.body.username;
	let subscription = req.body.subscription;
	let chain = req.body.chain;
	//console.log(deviceid);
	devices.push({deviceid: deviceid, username: username, subscription: subscription, chain: 'whaleshares'});
//console.log(devices);
res.json({deviceid: deviceid, username: username, subscription: subscription, chain: 'whaleshares'});
	});
	let devices = [];
app.put('/api/devices', function (req, res){
	//console.log('devices put');
	let deviceid = req.body.deviceid;
	let username = req.body.username;
	let subscription = req.body.subscription;
	let chain = req.body.chain;
	//console.log(deviceid);
	
Object.keys(devices).forEach(function(key){
  if(devices[key].deviceid==deviceid)
    delete devices[key];

              });
			  devices.push({deviceid: deviceid, username: username, subscription: subscription, chain: 'whaleshares'});

//console.log(devices);
res.json({deviceid: deviceid, username: username, subscription: subscription, chain: 'whaleshares'});

	});
	
app.put('/api/devices/:deviceid', function (req, res){
	Object.keys(devices).forEach(function(key){
  if(devices[key].deviceid==req.deviceid)
    devices[key].deviceid = req.body.newdev;
//console.log(devices[key]);
res.json(devices[key]);
});

              });
			  
app.get('/api/devices/:deviceid', function (req, res){
	let devs = []
	Object.keys(devices).forEach(function(key){
		//console.log(devices[key].deviceid);
		//console.log(req.params.deviceid);
  if(devices[key].deviceid==req.params.deviceid) {
	  devs.push(devices[key]);
	  //console.log(devices[key]);
  }
});
//console.log('devs');
//console.log(devs);
//console.log('enddevs');
res.json(devs);
})
app.post('/', function(req, res){
	let key = req.body.key;
	////console.log(key);
	let transferothers = req.body.transferothers;
	let transferself = req.body.transferself;
	let commentself = req.body.commentself;
	let commentothers = req.body.commentothers;
	////console.log(commentself);
	for (var n in names){
		if (names[n].conf == key){
			names[n].commentothers = commentothers;
			names[n].transferself = transferself;
			
			names[n].commentself = commentself;
			
			names[n].transferothers = transferothers;
			
			
		}
	}
	res.send('<form action="/" method="post">Comments<input type="checkbox" name="commentself" value="Self">Self<br><input type="checkbox" name="commentothers" value="Others">Others<br><input type="checkbox" name="commentdel" value="Delete">Delete<br>' +
	'Transfers<input type="checkbox" name="transferself" value="Self">Self<br><input type="checkbox" name="transferothers" value="Others">Others<br>  <input type="submit" value="Submit"></form>');

});
// Create constant variables

var port = 8081;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
//const client = new Discord.Client();
/*
const config = { 
  "token"  : "NTEwMTgyMDAzNzM2NDQ0OTI5.DsYtlg.TMNaElmo9LLyUTA56keTfetRArk",
  "prefix" : "+"
}
/client.login(config.token);
var channel;
client.on("ready", () => {
channel = client.channels.get("510190777096208394");
////console.log(channel)
//channel.send('test')

})
let names = {}
client.on("message", (messageContents) => {
//console.log(messageContents.author.id);
//console.log(messageContents.author.username);
//console.log(messageContents.content);
if (messageContents.content.includes('..reg')){
let smokeName = messageContents.content.split(' ')[1];
//console.log(smokeName);
let conf =  doConfs();
	names[smokeName] = {conf: conf, name: smokeName, id: messageContents.author.id, authed: false}

//console.log(conf);
messageContents.channel.send("OK, to verify that @" + smokeName+ " account belongs to you, 0.001 SMOKE to @tradeitforweed Use this token as memo: "+ conf) 
}

})
function doConfs(){
let goforit = true;
let c = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);

for (var n in names){
	if (names[n].conf == c){
		goforit = false;
	}
}
if (goforit == false){
	return doConfs();
}else {
	return (c);
}

}
var bottoken = 'NTAyOTIwMjgBI1wxAWPeC41sXVI9o'

//vote delay in seconds
const DELAY = 5

// Account you would like to vote for whatever they vote for

const TARGET_ACCOUNT = ['officialfuzzy','indica','graylan','blckchnd','murda-ra','powerpics','skylinebuds']

var permlinks = []
// Chain config
steem.api.setOptions({ url: 'ws://104.248.168.86:8090/' });
steem.config.set('address_prefix','SMK');
steem.config.set('chain_id','1ce08345e61cd3bf91673a47fc507e7ed01550dab841fd9cdb0ab66ef576aaf0');
steem.api.getAccounts(['powerpics'], function(err, result) {
                    //console.log(result[0].id);
                    
steem.api.getAccounts(['gyani'], function(err, result) {
                    //console.log(err, result);
					var good = false;
                    for (var r in result[0].witness_votes){
                      if(result[0].witness_votes[r] == 'swapbit'){
						  good = true;
					  }
                    }
                    });
                    });
setInterval(function(){
doCheckWallet();
}, 20000);
function doCheckWallet(){
 steem.api.getAccountHistory('tradeitforweed', -1, 100, (err, result) => {
for (var tx in result){
for (var op in result[tx][1].op){
if (result[tx][1].op[op] === 'transfer' ){
let memo = (result[tx][1].op[1].memo)
let user = (result[tx][1].op[1].from)
for (var name in names){
if (name == user && memo == names[name].conf && names[name].authed == false){
names[name].authed = true;
client.users.get(names[name].id.toString()).send("Thanks! You can check your settings here: http://localhost/" + names[name].conf);
}
}
}
}    
}
});
}
doCheckWallet();
// Check the stream and find only comment tx type and target account voter and then vote
let notifications = []
*/
let notifications = []
let results = []
setInterval(function(){ 
var release = steem.api.streamBlockNumber('head', function(err, result) {
if (!results.includes(result)){ 
results.push(result);
loadBlock(result);
//console.log(result);
}
});

 }, 2.0 * 1000);
const loadBlock = blockNum => {
steem.api.getBlock(blockNum, function(err, result) {
 //console.log(err, result);


  const operations = [];
//  //console.log(result.timestamp);
// operations.timestamp= result.timestamp;
  result.transactions.forEach(transaction => {
//    transaction.operations.timestamp =result.timestamp;
    operations.push(...transaction.operations);
});
////console.log(operations);  
       const notifications = getNotifications(operations,result.timestamp, blockNum);

});
}

let perms = [];
const getNotifications = (ops,thetimestamp, blockNum) => {
  //const notifications = [];
 
 ops.forEach(op => {
    const type = op[0];
    const params = op[1];
	op.timestamp = thetimestamp;
	op.block=blockNum;
	//console.log(op);
	//console.log(type);
    switch (type) {
      case 'comment': {
        const isRootPost = !params.parent_author;

        /** Find replies */
        if (!isRootPost) {
let ts = Date.parse(op.timestamp) / 1000
          const notification = {
            type: 'reply',
            parent_permlink: params.parent_permlink,
            author: params.author,
            			  post:true,
		  title: 'New Reply!',
		  body: 'New Reply from ' + params.author,
		  chain: 'whaleshares',
			  read:0,
              permlink: params.permlink,
              timestamp: op.timestamp,
			  ts: Date.parse(op.timestamp) / 1000,
			  gk: ts.toString().substr(0,9),
			  gkf: true,
              block: op.block,
          };
		  //console.log(notification);
	if (!perms.includes(params.permlink)){
//perms.push(params.permlink)
          notifications.push([params.parent_author, notification]);
////console.log(notifications); 
}       
}


        /** Find mentions */
        const pattern = /(@[a-z][-\.a-z\d]+[a-z\d])/gi;
        const content = `${params.title} ${params.body}`;
        const mentions = _
          .without(
            _
              .uniq(
                (content.match(pattern) || [])
                  .join('@')
                  .toLowerCase()
                  .split('@'),
              )
              .filter(n => n),
            params.author,
          )
          .slice(0, 9); // Handle maximum 10 mentions per post
        if (mentions.length) {
          mentions.forEach(mention => {
let ts = Date.parse(op.timestamp) / 1000
            const notification = {
				
              type: 'mention',
              is_root_post: isRootPost,
              source: params.author,
              author: params.author,
		  title: 'New Mention!',
		  body: 'New Mention from ' + params.author,
		  chain: 'whaleshares',
			  id: "m-" + Math.random() * 957993706,
			  post:true,
			  read:0,
              permlink: params.permlink,
              timestamp: op.timestamp,
			  ts: Date.parse(op.timestamp) / 1000,
			  gk: ts.toString().substr(0,9),
			  gkf: true,
              block: op.block,
            };
        if (!perms.includes(params.permlink)){
//perms.push(params.permlink);        
    notifications.push([mention, notification]);
}
          });
        }
        break;
      }
      case 'custom_json': {
        let json = {};
        try {
          json = JSON.parse(params.json);
        } catch (err) {
          //console.log('Wrong json format on custom_json', err);
        }
        switch (params.id) {
          case 'follow': {
            /** Find follow */
            if (
              json[0] === 'follow' &&
              json[1].follower &&
              json[1].following &&
              _.has(json, '[1].what[0]') &&
              json[1].what[0] === 'blog'
            ) {
let ts= Date.parse(op.timestamp) / 1000
              const notification = {
                type: 'follow',
                follower: json[1].follower,
				following: json[1].following,
				blog: true,
                block: op.block,
				id: "f-" + Math.random() * 957993706,
			  post:true,
		  title: 'New Follow!',
		  body: 'New Follow from ' + json[1].follower,
		  chain: 'whaleshares',
			  read:0,
              permlink: params.permlink,
              timestamp: op.timestamp,
			  ts: Date.parse(op.timestamp) / 1000,
			  gk: ts.toString().substr(0,9),
			  gkf: true,
              block: op.block,
              };
        if (!perms.includes(params.permlink)){
//perms.push(params.permlink);        
      notifications.push([json[1].following, notification]);
            }
}
            /** Find reblog */
            if (json[0] === 'reblog' && json[1].account && json[1].author && json[1].permlink) {
let ts= Date.parse(op.timestamp) / 1000              
const notification = {
                type: 'reblog',
				id: "r-" + Math.random() * 957993706,
                account: json[1].account,
                source: json[1].account,
                permlink: json[1].permlink,
				read: 0,
		  title: 'New Reblog!',
		  body: 'New Reblog from ' + json[1].account,
		  chain: 'whaleshares',
				timestamp: op.timestamp,
			  ts: Date.parse(op.timestamp) / 1000,
			  gk: ts.toString().substr(0,9),
			  gkf: true,
                block: op.block,
              };
        if (!perms.includes(params.permlink)){
//perms.push(params.permlink);        
      // //console.log('Reblog', [json[1].author, JSON.stringify(notification)]);
              notifications.push([json[1].author, notification]);
            }
}
            break;
          }
        }
        break;
      }
      case 'account_witness_vote': {
        /** Find witness vote */
let ts=Date.parse(op.timestamp) / 1000
        const notification = {
          type: 'witness_vote',
          account: params.account,
          approve: params.approve,
          timestamp: Date.parse(op.timestamp) / 1000,
          block: op.block,
        };
        // //console.log('Witness vote', [params.witness, notification]);
        if (!perms.includes(params.permlink)){
//perms.push(params.permlink);        
notifications.push([params.witness, notification]);
}
        break;

      }
      case 'vote': {
        /** Find downvote */
	let ts =Date.parse(op.timestamp) / 1000
          const notification = {
			id: "v-" + Math.random() * 957993706,
            type: 'vote',
            source: params.voter,
			voter: params.voter,
			read: 0,
            permlink: params.permlink,
            weight: params.weight,
		  title: 'New Vote!',
		  body: 'New Vote from ' + params.voter,
		  chain: 'whaleshares',
			timestamp:op.timestamp,
            ts: Date.parse(op.timestamp) / 1000,
			gk: ts.toString().substring(0, 9),
			gkf: true,
            block: op.block,
          };
          // //console.log('Downvote', JSON.stringify([params.author, notification]));
          notifications.push([params.author, notification]);
        
        break;
      }
      case 'transfer': {
        /** Find transfer */
let ts= Date.parse(op.timestamp) / 1000
        const notification = {
          type: 'transfer',
          from: params.from,
          amount: params.amount,
          memo: params.memo,
		  title: 'New Transfer!',
		  body: 'New Transfer from ' + params.from,
		  chain: 'whaleshares',
          timestamp: Date.parse(op.timestamp) / 1000,
          block: op.block,
        };
        // //console.log('Transfer', JSON.stringify([params.to, notification]));
        notifications.push([params.to, notification]);
        break;
      }
    }
  });
//console.log(notifications);

	notifications.forEach(notification => {
	devices.forEach(device => {
		//console.log(device);
                if (device['username']	 === notification[0]) {
                  ////console.log('Send push notification', notification[0]);"comment":false,"follow":false,"vote":true,"mention":false,"resteem":false}}
				  let doPost = false;
					if (notification[1].type == 'reblog' && device['subscription']['rewhaleshares'] == true){
						
						doPost = true;
					}
					else if (notification[1].type == 'reply' && device['subscription']['mention']== true){
						
						doPost = true;
					}
					else if (notification[1].type == 'mention' && device['subscription']['mention']== true){
						
						doPost = true;
					}
					else if (notification[1].type == 'vote' && device['subscription']['vote']== true){
						
						doPost = true;
					}
					else if (notification[1].type == 'comment' && device['subscription']['comment']== true){
						
						doPost = true;
					}
					else if (notification[1].type == 'follow' && device['subscription']['follow']== true){
						
						doPost = true;
					}
					if (doPost && !postedIds.includes(notification[1].id + notification[1].permlink)){
						postedIds.push(notification[1].id + notification[1].permlink);
						    var message = {
						data: {
							body: notification[1].body,
							title: notification[1].title,
							chain: notification[1].chain,
							author: notification[1].author,
							permlink: notification[1].permlink
						},
						"notification": { "title":notification[1].title, "body":notification[1].body },
						token: device.deviceid
					};
					admin.messaging().send(message)
						.then((response) => {
							console.log("Successfully sent message: ", response);
						}).catch((err) => {
							console.log("Error sending message: ", err);
						})
					}
                }
              });
              });


}
let postedIds = []
//getHead()
//setInterval(function(){ 
//getHead() }, 2.0 * 1000);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ewhale-a4430.firebaseio.com'
});

