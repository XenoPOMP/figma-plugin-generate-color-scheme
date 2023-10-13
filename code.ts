import { ArrayType, FunctionPrimitive } from '@xenopomp/advanced-types';

/**
 * This is plugin`s cycle function.
 *
 * @param callback			this callback is being executed between
 * 											plugin`s init and it`s closing.
 */
const doPluginCycle = (callback: FunctionPrimitive<void>) => {
	return new Promise(async (resolve, reject) => {
		callback();

		figma.closePlugin();
	});
};

// Invoke plugin
let ignore = doPluginCycle(() => {
	const paintStyles: Array<{
		title: string;
		color: string;
	}> = figma.getLocalPaintStyles().map(style => {
		const { paints } = style;

		const getColor = (): string => {
			const targetPaint: ArrayType<typeof paints> = paints.at(0);
		};

		return { title: '', color: paints.at(0) ?? 'transparent' };
	});
});
