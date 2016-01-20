if(Meteor.isServer) {
	//Slack API
	var Fiber = Npm.require('fibers');

	var Articles = new Mongo.Collection('Articles');
	// ArticlesIndex = new EasySearch.Index({
	// 	collection: Articles,
	// 	fields: ['title','body','keywords'],
	// 	engine: new EasySearch.MongoDB()
	// });
	Articles.search = function(query) {
		var filter = { $regex: RegExp.escape(query), $options: 'i' };
	  return Articles.find({
	  	$or:[
		    {title: filter},
		    {body: filter},
		    {keywords: filter}
	    ]
	  }, {
	    limit: 5
	  });
	};

	RegExp.escape = function(s) {  
	  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	Meteor.methods({
	    'addArticle':function(doc) {
	        currentId = (Articles.findOne({},{sort:{id:-1}}) || {}).id || 0;
	        doc.id = currentId + 1;
	        Articles.insert(doc);
	        return doc.id;
	    }
	});

	WebApp.connectHandlers.use("/api/slack/le", function(req, res, next) {
		var type = (req.query.text || '').split(' ')[0];

		var genfn = {
			'haiku':generateHaiku,
			'lunch':generateLunch,
			'redteammember':generateRedTeamMember,
			'loot':generateLoot,
			'thanks':generateThanks
		}[type.toLowerCase()];

		var reply = (genfn && genfn(req.query)) || 'Le what?';

		if(genfn && type === type.toUpperCase()) {
			res.setHeader('content-type', 'application/json');
			res.writeHead(200);
			res.end('{"response_type": "in_channel","text": "'+reply+'"}');
		} else {
			res.writeHead(200);
			res.end(reply);
		}
	});
	WebApp.connectHandlers.use("/api/slack/kb", function(req, res, next) {
	    Fiber(function() {
			var possibleCommand = (req.query.text || '').split('|')[0];

			// Add
			if(possibleCommand.trim().toLowerCase()==="add") {
				var title = req.query.text.split('|')[1];
				var body = req.query.text.split('|')[2];
				var keywords = req.query.text.split('|')[3] || ''; //optional
				
				if(!title || !body) {
		            res.writeHead(200);
		            res.end('Sorry, couldn\'t add your article. Try checking the syntax.');
		            return;
				}

				var article = {
					title: title.trim(),
					body: body.trim(),
					keywords: keywords.trim(),
					author: req.query.user_name
				}
				var articleId = Meteor.call('addArticle', article);

				res.writeHead(200);
            	res.end('Successfully added article #'+articleId+'.');
            	return;
			}

			// Delete
			if(possibleCommand.trim().toLowerCase()==="balete") {
				var id = parseInt(req.query.text.split('|')[1]);

				if(!id) {
		            res.writeHead(200);
		            res.end('Sorry, no results.');
		            return;
				}

				Articles.remove({id:id});

	            res.writeHead(200);
	            res.end('Sorry, no results!'); //Exclamation means you secretly deleted it!
	            return;
			}

			// Load article
			if(parseInt(possibleCommand)) {
				var id = parseInt(possibleCommand);

				var article = Articles.findOne({id:id});
				if(!article) {
		            res.writeHead(200);
		            res.end('Sorry, couldn\'t find article #'+id+'.');
		            return;
				}

	            res.writeHead(200, {'Content-Type': 'application/json'});
	            res.end(JSON.stringify({
				    text: '@'+article.author+' writes "'+article.title+'":',
				    attachments: [
				        {
				            text:article.body
				        }
				    ]
	            }));
	            return;
			}

			// Search
			if(possibleCommand) {
				var searchKeywords = req.query.text;

				//var articles = ArticlesIndex.search(searchKeywords, { limit: 5}).fetch();//Articles.find(); //TODO: search filter
				var articles = Articles.search(searchKeywords);

				if(articles.count()===0) {
		            res.writeHead(200);
		            res.end('Sorry, no results.');
		            return;
				}

	            res.writeHead(200, {'Content-Type': 'application/json'});
	            res.end(JSON.stringify({
				    text: 'Found '+articles.count()+' articles:',
				    attachments: articles.map(function(article){
				    	return {
				    		text:'#'+article.id+': '+article.title
				    	};
				    })
	            }));
	            return;
			}

			res.writeHead(200);
        	res.end('Sorry, couldn\'t understand your request.');
        	return;

	    }).run();
	});
}

// Wrapper functions
function generateHaiku() {
	return generator.generate('haiku');
}
function generateLunch() {
	return generator.generate('lunch');
}
function generateRedTeamMember() {
	return generator.generate('redTeamMember');
}
function generateLoot(q) {
	var loot = generator.generate('loot');

	if(q.user_name) {
		return q.user_name + ' finds and equips the ' + loot + '.'
	} else {
		return loot;
	}

}
function generateThanks(q) {
	var recipient = q.text.split(' ')[1] || 'everyone';
	return generator.generate('thanks', recipient);	
}