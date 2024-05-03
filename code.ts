import { createText, getPaintTree } from './src/lib/utils';

// Invoke plugin
(async () => {
	/** Tree formatted to text with indentations. */
	const textToDisplay = JSON.stringify(getPaintTree(), null, 2)
		.replace(/((^\s{2})|(^{)|(^}$))/gm, '')
		.trim();

	/** Create figma text node. */
	await createText('Generated TW config code', textToDisplay);

	/** Successful plugin execution. */
	figma.notify('Generated TW config for you.');
	figma.closePlugin();
})();
