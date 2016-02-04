import config from '../config/config.json'

export default {
	"url": config.server.protocol + "://" + config.server.hostname + ":" + config.server.port + "/",
	"endpoint": {
		"build": "build"
	}
};
