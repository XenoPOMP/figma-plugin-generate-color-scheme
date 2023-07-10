/**
 * SCSS variable boilerplate.
 */
type ScssVariable = {
	name: string;
	groupName: string;
	paint:
		| {
				r: Readonly<number>;
				g: Readonly<number>;
				b: Readonly<number>;
				a: Readonly<number>;
		  }
		| string;
};

/**
 * Math round function.
 *
 * @param {number} num				rounding number.
 * @param {number} [offset]		defines how many digits after coma will be saved.
 *
 * @return {number}						rounded number.
 */
const roundNumber = (num: number, offset?: number): number => {
	const offsetMultiplier =
		offset === null || offset === undefined ? 1 : Math.pow(10, offset);

	return parseInt(`${num * offsetMultiplier}`) / offsetMultiplier;
};

/**
 * All local styles from document.
 */
const styles: PaintStyle[] = figma.getLocalPaintStyles();

/**
 * Collection of SCSS variables from document.
 */
const styleVars: ScssVariable[] = styles.map(style => {
	const { name, paints, description } = style;

	const variablePaint = paints[0];

	return {
		name: name
			.replace(/^.*\//i, '') // replace group name
			.replace(/[\s]/gi, '-') // replace forbidden chars (space)
			.replace(/^(?!(--))/i, '--') // add '--' to start
			.toLowerCase(),
		groupName: /^.*\//i.test(name)
			? name.replace(/\/.*$/i, '')
			: 'Other styles',
		paint:
			variablePaint.type === 'GRADIENT_LINEAR'
				? description
				: {
						r:
							'color' in variablePaint
								? roundNumber(255 * variablePaint.color.r)
								: -1,
						g:
							'color' in variablePaint
								? roundNumber(255 * variablePaint.color.g)
								: -1,
						b:
							'color' in variablePaint
								? roundNumber(255 * variablePaint.color.b)
								: -1,
						a: variablePaint.opacity
							? roundNumber(variablePaint.opacity, 2)
							: -1,
				  },
	};
});

/**
 * Grouped SCSS variables.
 */
let groups: Record<string, string[]> = {};

// Loop over all collected data
styleVars.forEach(variable => {
	const { name, groupName, paint } = variable;

	// Create clear array if it does not exist
	if (groups[groupName] === undefined) {
		groups[groupName] = [];
	}

	// Add new style to group array
	if (typeof paint !== 'string') {
		groups[groupName].push(
			paint.a === -1
				? `${name}: rgb(${paint.r}, ${paint.g}, ${paint.b})`
				: `${name}: rgba(${paint.r}, ${paint.g}, ${paint.b}, ${paint.a})`
		);
	} else {
		groups[groupName].push(`${name}: ${paint}`);
	}
});

/**
 * Plugin`s work result.
 */
let outputText = '&.theme {\n';

for (let groupName in groups) {
	outputText = outputText.concat(`\n\t// ${groupName}\n`);

	groups[groupName].forEach(variable => {
		outputText = outputText.concat(`\t${variable};\n`);
	});
}

// Add ending bracket to output
outputText = outputText.concat(`}`);

// Create text object with variables
(async () => {
	const text = figma.createText();

	text.name = 'Generated SCSS code';
	text.x = -4800;
	text.y = -1472;

	text.resizeWithoutConstraints(2549, 3203);

	figma
		.loadFontAsync(text.fontName as FontName)
		.then(() => {
			text.characters = outputText;

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
			// Close plugin
			figma.closePlugin();
		});
})();
