import { FunctionPrimitive } from '@xenopomp/advanced-types';

/**
 * This is plugin`s cycle function.
 *
 * @param callback			this callback is being executed between
 * 											plugin`s init and it`s closing.
 */
const doPluginCycle = (callback: FunctionPrimitive<void>) => {
	return new Promise((resolve, reject) => {
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
		const { paints, name } = style;

		const targetPaint = paints[0];

		let resultColor: string = '';

		if (targetPaint.type === 'SOLID') {
			const { r, g, b } = targetPaint.color;
			const { opacity } = targetPaint;

			resultColor = `rgba(${r * 255} ${g * 255} ${b * 255} / ${opacity})`;
		}

		return { title: name, color: resultColor };
	});

	let outputTwConfig = 'colors: {\n';

	const concatOutput = (...strings: string[]) => {
		outputTwConfig = outputTwConfig.concat(...strings);
	};

	paintStyles.forEach(style => {
		const { title, color } = style;

		concatOutput(`\t'${title}': \'${color}\',\n`);
	});

	concatOutput('},');
});
