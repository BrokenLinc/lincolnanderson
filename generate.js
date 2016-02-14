Router.route('/generate', function () {
	this.render('generate');
});
if(Meteor.isClient) {
	Template.generate.helpers({
		strings: function() {
			var list = [];
			for(var i = 0; i < 10; i++) {
				list.push(generator.process('{gameidea}'));
			}
			return list;
		}
	});
}