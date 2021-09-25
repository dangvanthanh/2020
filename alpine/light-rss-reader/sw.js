self.addEventListener('install', (e) => {
	self.skipWaiting();
});

self.addEventListener('activate', (e) => {
	self.registration
		.unregister()
		.then(() => self.clients.matchAll())
		.then((clients) =>
			clients.forEach((client) => client.navigation(client.url))
		);
});
