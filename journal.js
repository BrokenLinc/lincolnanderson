var SLACK_TOKEN = "YOUR_TOKEN";
var CHANNEL_ID = "YOUR_CHANNEL_ID";
Router.route('/journal', function () {
  this.layout('JournalLayout');
  this.render('journal');
});


if (Meteor.isClient) {

  var messages = new observable([]);

  Template.channel.onCreated(function(){
    Meteor.call("getMessages", function(error, results) {
      var content = JSON.parse(results.content);
      //console.log(content.messages);
      messages.set(content.messages.reverse());
    });
  });

  Template.channel.helpers({
    messages: function() {
      return messages.get();
    }
  });

  Template.message.helpers({
    isFile: function() {
      return this.type =='message' && this.subtype == 'file_share';
    },
    isText: function() {
      return this.type =='message' && !this.subtype;
    },
    fileThumbUrl: function() {
      return this.file && (this.file.thumb_720 || this.file.thumb_360);
    },
    fileUrl: function() {
      return this.file && this.file.url;
    },
    time: function() {
      return moment(this.ts*1000).format('h:mma MMMM Do, YYYY');
    },
    lines: function() {
      return this.text.split('\n');
    }
  });

}

if (Meteor.isServer) {
    Meteor.methods({
        getMessages: function () {
            this.unblock();
            return Meteor.http.call("GET", "https://slack.com/api/groups.history?channel="+CHANNEL_ID+"&count=1000&token="+SLACK_TOKEN);
        }
    });
}

function observable(defaultValue) {
  this.value = defaultValue;
  this.dependencyTracker = new Tracker.Dependency;
}
observable.prototype.get = function () {
  this.dependencyTracker.depend()
  return this.value;
};
observable.prototype.set = function (value) {
  this.value = value;
  this.dependencyTracker.changed();
};