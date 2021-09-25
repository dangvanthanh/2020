const parser = new RSSParser();
const corsEverywhere = 'https://cors-anywhere.herokuapp.com/';

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
