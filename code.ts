import { createText, getPaintTree } from './src/lib/utils';

// Invoke plugin
(async () => {
	/** Tree formatted to text with indentations. */
	const textToDisplay = JSON.stringify(getPaintTree(), null, 2)
		.replace(/((^\s{2})|(^{)|(^}$))/gm, '')
		.trim();

	/** Create figma text node. */
	const outputText = createText('Generated TW config code');

	figma
		.loadFontAsync(outputText.fontName as FontName)
		.then(() => {
			outputText.characters = textToDisplay;

			outputText.fontSize = 50;
			outputText.textAutoResize = 'HEIGHT';
			outputText.fills = [
				{
					type: 'SOLID',
					color: {
						r: 1,
						g: 1,
						b: 1,
					},
					opacity: 1,
				},
			];
		})
		.finally(() => {
			figma.notify('Generated TW config for you.');
			figma.closePlugin();
		});
})();
