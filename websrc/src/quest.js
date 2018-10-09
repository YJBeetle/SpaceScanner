import http from 'http';

//载入配置文件
const host = {
	hostname: 'localhost',
	port: 4000,
};

let request = (path,data) => {
	return new Promise((resolve, reject) => {
		req = http.request(
			{
				hostname: host.hostname,
				port: host.port,
				path: path,
				method: 'POST',
				headers: {
					'Content-Type':
						(typeof data === 'object') ?
							'application/json' :
							'text/plain',
				},
			},
			resolve
		);
		req.write(
			(typeof data === 'object') ?
				JSON.stringify(data) :
				data
		);
		req.end();
	}).then(response => {
		return new Promise((resolve, reject) => {
			switch (response.statusCode) {
				case 200:
					response.setEncoding('utf8');
					let body = '';
					response.on('data', chunk => {	//可能会分为若干块
						body += chunk;
					});
					response.on('end', () => {
						if (response.headers['content-type'].indexOf("application/json") !== -1)
							resolve(JSON.parse(body));
						else
							resolve(body);
					});
					break;
				case 404:
					resolve(null);
					break;
				default:
					resolve(null);
					break;
			}
		})
	})
};

export default {
	du: {
		new: (path) => {
			return request('/du/new',{path: path});
		},
		list: () => {
			return request('/du/list',{});
		},
	},
};
