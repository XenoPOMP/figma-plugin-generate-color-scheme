/**
 * Checks if provided paint is solid.
 * @param paint
 */
export const isSolidPaint = (paint: Paint): paint is SolidPaint => {
	return paint.type === 'SOLID';
};
