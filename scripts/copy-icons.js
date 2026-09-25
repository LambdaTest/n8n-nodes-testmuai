const fs = require('fs');
const path = require('path');

// tsc only emits .js, so mirror every icon under nodes/ and credentials/ into
// dist/ at the same relative path. n8n resolves `file:<name>` icons relative
// to the compiled node / credential file.
const root = path.resolve(__dirname, '..');
const ICON_EXT = /\.(png|svg)$/i;

function copyIcons(srcDir, destDir) {
	for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
		const src = path.join(srcDir, entry.name);
		const dest = path.join(destDir, entry.name);
		if (entry.isDirectory()) {
			copyIcons(src, dest);
		} else if (ICON_EXT.test(entry.name)) {
			fs.mkdirSync(destDir, { recursive: true });
			fs.copyFileSync(src, dest);
		}
	}
}

for (const dir of ['nodes', 'credentials']) {
	copyIcons(path.join(root, dir), path.join(root, 'dist', dir));
}
