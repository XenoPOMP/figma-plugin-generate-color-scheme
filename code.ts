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

		const constructStringColor = (
			rgb: SolidPaint['color'],
			opacity: SolidPaint['opacity']
		) => {
			const { r, g, b } = rgb;

			let result = '';

			if (opacity === 1) {
				const dec2hex = (num: number) => {
					return parseInt(`${num}`).toString(16).toUpperCase();
				};

				const redHex = dec2hex(r * 255);
				const greenHex = dec2hex(g * 255);
				const blueHex = dec2hex(b * 255);

				result = `#${redHex}${greenHex}${blueHex}`;
			} else {
				result = `rgba(${r * 255} ${g * 255} ${b * 255} / ${opacity})`;
			}

			return result;
		};

		if (targetPaint.type === 'SOLID') {
			const { opacity } = targetPaint;

			resultColor = constructStringColor(targetPaint.color, opacity);
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
