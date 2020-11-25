const chokidar = require('chokidar');
const path = require('path')

module.exports = (fn) => {
  const watcher = chokidar.watch(path.resolve(__dirname + '/../src'))
  watcher
		.on("change", fn)
		.on("add", fn)
		.on("unlink", fn)
		.on("addDir", fn)
		.on("unlinkDir", fn)
		.on("ready", function () {
			console.log("Ready for changes");	
		})
		.on("error", function (err) {
      console.log("ERROR:".red, err);
      process.exit(1)
    });
}

