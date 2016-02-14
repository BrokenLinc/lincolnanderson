// Templates
var templates = {
	commandline: function() {
		return pickone([
			{text: 'sudo {action}'},
			{text: '{action}'},
			{text: 'sudo {action} {flag}'},
			{text: '{action} {flag}'},
			{auto:true, cssclass: 'status', 
				text: '{actioning} ...Done.'},
			{auto:true, cssclass: 'error', 
				text: '{ERROR}. could not {verb} {adjective} {noun}'}
		]);
	},
	ERROR: function() {
		return pickone([
			'ERROR',
			'ACCESS DENIED',
			'EAFILEINUSE',
			'FALSE PROTOCOL',
			'NO ENTRY',
			'INCORRECT ACCESS CODES'
		]);
	},
	action: function(){
		return pickone([
			'telnet {verb} {ip}:{port}',
			'{verb} {adjective} {noun}',
			'{verb} {noun} #{randomdigit}',
			'git {verb}',
			'run {exe}'
		]);
	},
	actioning: function(){
		return pickone([
			'{verbing} {adjective} {noun}',
			'{verbing} {noun} #{randomdigit}'
		]);
	},
	verb: function(){
		return pickone([
			'open',
			'close',
			'purge',
			'clean',
			'restart',
			'shutdown',
			'fire',
			'rebase',
			'configure',
			'empty',
			'flash',
			'flush',
			'promote',
			'proxy'
		])
	},
	verbing: function(){
		return pickone([
			'opening',
			'closing',
			'purging',
			'cleaning',
			'restarting',
			'shutting down',
			'firing',
			'rebasing',
			'reconfiguring',
			'emptying',
			'flashing',
			'flushing',
			'promoting',
			'proxying'
		])
	},
	adjective: function() {
		return pickone([
			'IP',
			'DNS',
			'WIN32',
			'master',
			'backup',
			'backdoor',
			'admin',
			'SSL',
			'FAT32',
			'FTP',
			'CPU',
			'RAM',
			'GPU',
			'PCI',
			'parallel',
			'128-bit',
			'5.0Gbps',
			'USB',
			'system',
			'system32',
			'x86'
		])
	},
	noun: function() {
		return pickone([
			'hard drive',
			'hardline',
			'mainframe',
			'router',
			'config',
			'server',
			'switch',
			'socket',
			'partition',
			'access',
			'pipeline',
			'pin',
			'port',
			'cable',
			'line',
			'softline',
			'database'
		])
	},
	randomdigit: function(){
		return randomint(0,9);
	},
	ip: function() {
		return [
			randomint(0,255),
			randomint(0,255),
			randomint(0,255),
			randomint(0,255)
		].join('.');
	},
	port: function() {
		return [
			randomdigit(),
			randomdigit(),
			randomdigit(),
			randomdigit()
		].join('');
	},
	flag: function() {
		return pickone([
			'-m',
			'--safe',
			'--dirty',
			'-c',
			'--input',
			'--hard',
			'--clean',
			'--reset',
			'--soft',
			'-v {randomdigit}',
			'--proxy {ip}',
			'--force',
			'--unsafe'
		]);
	},
	exe: function() {
		return pickone([
			'codecracker.exe',
			'backdoor.exe',
			'portsniffer.exe',
			'protocoltracker.v2.exe',
			'linetracer.exe',
			'hashtablelookup.exe',
			'WURM.exe',
			'remoteBOOTlogger.exe'
		]);
	},
	org: function() {
		return pickone([
			'CIA',
			'FBI',
			'MI6',
			'NSA',
			'FAA',
			'SI7'
		]);
	},
	modifer: null,
	haiku: function() {
		return [
			pickone([
				'softly flowing water',
				'in evenings past',
				'a violet filibuster',
				'can you see him',
				'it is only a waking dream',
				'welcome to tomorrow',
				'take a free sample',
				'say goodbye to yesterday',
				'open seventeen books'
			]),pickone([
				'peering deeply skyward',
				'forever wanting',
				'unquenchable and ravaging',
				'beyond a pale sunrise',
				'arms outstretched',
				'dusk settles in his mind',
				'the tide crawls along the shore',
				'it will be your last',
				'the past haunts us',
				'the close of another chapter'
			]),pickone([
				'lo, she waits for no one',
				'but father has gone',
				'while they watch',
				'thus fortune winks at the meek',
				'so a housefly triumphs',
				'but her rations are cut thin',
				'next, a porcupine suprise',
				'yet poison surges in your veins',
				'for Santa Claus rides alone',
				'but who can remember them all?'
			])
		].join(', ');
	},
	lunch: function() {
		return pickone([
			'Dave\'s',
			'Copper Monkey',
			'Fuji Sushi',
			'Red Robin',
			'Pepper\'s',
			'Bubbaque\'s',
			'Subway',
			'Blue Highway',
			'Sabore',
			'Applebee\'s',
			'Moe\'s'
		]);
	},
	redTeamMember: function() {
		return pickone([
			'Linc',
			'Doris',
			'Peter',
			'Andrew',
			'Drew',
			'Michelle',
			'Chris'
		]);
	},
	loot: function() {
		return pickone([
			'{lootprefix} {lootitem} {lootspecial}'
		]);
	},
	lootprefix: function() {
		return pickone([
			'{quality} {magicalproperty}',
			'{quality}',
			'{magicalproperty}'
		]);
	},
	lootitem: function() {
		return pickone([
			'{lootweapon}',
			'{lootarmor}'
		]);
	},
	lootspecial: function() {
		return pickone([
			'of {lootspirit}',
			'of {statname} {randomstatvalue}',
			''
		]);
	},
	lootweapon: function() {
		return pickone([
			'Longsword',
			'Bastard Sword',
			'Mace',
			'Bo-staff',
			'Staff',
			'Katana',
			'Sai',
			'Nightstick',
			'AK-47',
			'Slingshot',
			'Hypodermic Needle',
			'Shotgun',
			'Axe',
			'Battle-axe',
			'Nunchucks',
			'Hammer',
			'Warhammer',
			'Battle-Stapler',
			'Bullwhip',
			'Ball-in-a-cup',
			'Chainsaw',
			'Machete'
		]);
	},
	lootarmor: function() {
		return pickone([
			'Helm',
			'Breastplate',
			'Boots',
			'Trousers',
			'Belt',
			'Necklace',
			'Bracers',
			'Bracelet',
			'Ring',
			'Bandana',
			'Fedora',
			'Sneakers',
			'Socks',
			'Pants',
			'Pantaloons',
			'McHammerPants',
			'Snap Bracelet',
			'Wallet-Chain',
			'Shoelace',
			'Sunglasses',
			'Binoculars',
			'Top-Hat',
			'Balaclava',
			'Sandals',
			'Crocs',
			'Cargo Shorts',
			'Jeans',
			'Kilt',
			'Kimono'
		]);
	},
	lootspirit: function() {
		return pickone([
			'the Tadpole',
			'the Monkey',
			'Thor',
			'the Lion',
			'the {lootcolor} Flame',
			'the {lootcolor} Dragon',
			'the Battle-Mage',
			'Loki',
			'the Great War',
			'the Bard',
			'the Barbarian',
			'the Thief',
			'the Nerd',
			'the Superdouche',
			'the Douche',
			'the Trump',
			'the Zuckerburg',
			'the Iguana',
			'the Cockroach',
			'the Sloth',
			'the Tiger',
			'the Old Gods',
			'Cthulu'
		]);
	},
	statname: function() {
		return pickone([
			'Might',
			'Intellect',
			'Strength',
			'Critical Strike',
			'Accuracy',
			'Wisdom',
			'Intelligence',
			'Dexterity',
			'Agility',
			'Banality',
			'Embarrassment',
			'Anxiety',
			'Confidence',
			'Constitution',
			'Regret',
			'Levity',
			'Melancholy'
		]);
	},
	quality: function() {
		return pickone([
			'Superior',
			'Inferior',
			'Damaged',
			'Crummy',
			'Shimmering',
			'Gleaming',
			'Unremarkable',
			'Coffee-stained',
			'Lightweight',
			'1986',
			'Ancient',
			'Dusty'
		]);
	},
	magicalproperty: function() {
		return pickone([
			'Flaming',
			'Poisoned',
			'Titanium-Plated',
			'Frozen',
			'Enchanted',
			'Cursed',
			'Elven',
			'Diamond',
			'Viking',
			'Dwarven',
			'Ever-green',
			'Once-lost',
			'Amazonian',
			'Haunted'
		]);
	},
	lootcolor: function() {
		return pickone([
			'Cerulean',
			'Crimson',
			'Yellow',
			'Aquamarine'
		]);
	},
	randomstatvalue: function(){
		var num = randomint(1,18);
		return num<0? num : '+'+num;
	},
	thanks: function(recipient) {
		var string = pickone([
			'Thank you {recipient}, for all those special things you do.',
			'Great work {recipient}. Just a smashing job all around.',
			'Stellar contributions {recipient}. This place wouldn\'t be the same without you.',
			'Let it be known that {recipient} is really making an impact in key areas.',
			'{recipient}, please accept my warmest gratitude.',
			'{recipient}, your hard work hasn\'t gone unnoticed. Thank you.',
			'Wow, {recipient}! You are a really special person! Sincerely, GRATITUDEBOTv9.01b'
		]);
		return string.replace(new RegExp('{recipient}', 'g'), recipient);
	},
	gameidea: function() {
		return pickone([
			'a {gametheme} {gameobjective} {gamegenre} game',
			'a {gametheme} '+this.gamegenre()+'/'+this.gamegenre()+' game'
		]);
	},
	gamegenre: function() {
		return pickone([
			'card',
			'board',
			'falling block',
			'tile',
			'dice',
			'MUD',
			'point-n-click adventure',
			'picture',
			'logical-deduction',
			'word-guessing',
			'wagering'
		]);
	},
	gametheme: function() {
		return pickone([
			'space',
			'wizard',
			'dungeon',
			'naval',
			'medeival',
			'modern-day',
			'futuristic',
			'tron-esque'
		]);
	},
	gameobjective: function() {
		return pickone([
			'exploration',
			'battle',
			'warfare',
			'murder-mystery',
			'facial-identification',
			'vehicle racing'
		]);
	}
}


// Utilities
function randomdigit() {
	return randomint(0,9);
}
function generate(key, data) {
	return processanything(templates[key](data));
}
function randomint(min, max) {
	return min + Math.floor(Math.random()*(max-min+1));
}
function pickone(array) {
	return array[Math.floor(Math.random()*array.length)];
}
function processanything(source) {
	if(typeof(source) == 'string') {
		return process(source);
	} else if(typeof(source) == 'object') {
		source.text = process(source.text);
		return source;
	}
}
function process(source) {
	var string = source;
	for(var i = 0; i < 1000; i++) {
		var matches = string.match(/{([^}]*)}/);
		if (!matches) return string;

		//strip off braces
		var matchkey = matches[1];
		//console.log(matchkey);
		var res = templates[matchkey]();
		string = string.replace(new RegExp('{'+matchkey+'}', 'g'), res);
	}
	return string;
}

generator = {
	templates: templates,
	generate: generate,
	process: process
}