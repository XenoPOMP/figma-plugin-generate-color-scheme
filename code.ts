import { FunctionPrimitive } from '@xenopomp/advanced-types';

// Invoke plugin
(async () => {
	// Generate output text
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

			if (opacity === 1) {
				resultColor = `rgb(${r * 255} ${g * 255} ${b * 255})`;
			} else {
				resultColor = `rgba(${r * 255} ${g * 255} ${b * 255} / ${opacity})`;
			}
		}

		const processName = (name: string): string => {
			return name
				.replace(/^.*\//g, '')
				.replace(/\s/g, '-')
				.replace(/^\-{1,2}/g, '')
				.toLowerCase();
		};

		return { title: processName(name), color: resultColor };
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

	// Generate text component
	const text = figma.createText();

	text.name = 'Generated TW config code';
	text.x = -4800;
	text.y = -1472;

	text.resizeWithoutConstraints(2549, 3203);

	figma
		.loadFontAsync(text.fontName as FontName)
		.then(() => {
			text.characters = outputTwConfig;

			text.fontSize = 50;
			text.textAutoResize = 'HEIGHT';
			text.fills = [
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
			figma.notify('Generate TW config for you.');
			figma.closePlugin();
		});
})();
