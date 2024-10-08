import { isSolidPaint, mergeDeep, rgbToHex, set } from '../utils';

/**
 * Creates paint tree from figma styles
 * to better organization of TW variables.
 */
export const getPaintTree = () => {
	const paintStyles = figma.getLocalPaintStyles();
	let tree: object = {};

	/** Loop over each paint style. */
	paintStyles.flatMap(({ paints, name }) => {
		const targetPaint = paints[0];

		let result = '';

		/** Process only solid paints. */
		if (!isSolidPaint(targetPaint)) {
			return result;
		}

		/** Paint is SOLID here. */
		const { opacity, color } = targetPaint;

		/** Convert rgb to hex. */
		result = rgbToHex(color, opacity);

		/** Get folders and style name. */
		const parts = name.split(/\//gi).map(part => {
			/** Normalize parts here. */
			return part.toLowerCase().trim().replace(/\s/gi, '-');
		});

		/** Form tree with function. */
		tree = mergeDeep(tree, set({}, parts, result));
	});

	return {
		colors: tree,
	};
};
