import { getPaintTree } from './src/lib/utils';

// Invoke plugin
(async () => {
	const textToDisplay = JSON.stringify(getPaintTree(), null, 2);

	figma.closePlugin();
})();
