import { getPaintTree } from './src/lib/utils';

// Invoke plugin
(async () => {
	/** Tree formatted to text with indentations. */
	const textToDisplay = JSON.stringify(getPaintTree(), null, 2)
		.replace(/((^\s{2})|(^{)|(^}$))/gm, '')
		.trim();

	figma.closePlugin();
})();
