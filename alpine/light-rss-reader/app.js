const parser = new RSSParser();
const corsEverywhere = 'https://cors-anywhere.herokuapp.com/';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./sw.js')
		.then((reg) => {
			console.log('Registration succeeded. Scope is ' + reg.scope);
		})
		.catch((error) => {
			console.log('Registration failed with ' + error);
		});
}

class IndexedDB {
	constructor(dbName, dbVersion, dbUpgrade) {
		return new Promise((resolve, reject) => {
			this.db = null;

			if (!('indexedDB' in window)) {
				reject('No supported');
			}

			const dbOpen = indexedDB.open(dbName, dbVersion);

			if (dbUpgrade) {
				dbOpen.onupgradeneeded = (e) => {
					dbUpgrade(dbOpen.result, e.oldVersion, e.newVersion);
				};
			}

			dbOpen.onsuccess = () => {
				this.db = dbOpen.result;

				resolve(this);
			};

			dbOpen.onerror = (e) => {
				reject(`IndexedDB error: ${e.target.errorCode}`);
			};
		});
	}
}

function lightRSSReader() {
	return {
		title: 'Light RSS Reader',
		feed: [],
		sources: [
			'https://cprss.s3.amazonaws.com/frontendfoc.us.xml',
			'https://feeds.feedburner.com/CSS-Weekly?format=xml'
		],
		get(source) {
			console.log(source);
			parser.parseURL(corsEverywhere + source, (err, feed) => {
				if (err) {
				}

				feed.items.forEach((entry) => {
					this.addToFeed(entry);
				});
			});
		},
		get sortedFeed() {
			return this.feed.sort((first, second) => {
				return second.date.getTime() - first.date.getTime();
			});
		},
		addToFeed(entry) {
			console.log(entry);
			this.feed.push({
				title: entry.title,
				link: entry.link,
				date: new Date(entry.pubDate)
			});
		},
		init() {
			this.sources.forEach((source) => {
				this.get(source);
			});
		}
	};
}
