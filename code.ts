import { FunctionPrimitive } from '@xenopomp/advanced-types';

import { getPaintTree } from './src/lib/utils';

// Invoke plugin
(async () => {
	console.log(getPaintTree());

	figma.closePlugin();
})();
