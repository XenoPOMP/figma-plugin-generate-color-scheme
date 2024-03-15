/**
 * Recursively set value to object using keys.
 * @param object
 * @param paths
 * @param value
 */
export const set = <Value = unknown>(
	object: object,
	paths: string[],
	value: Value
) => {
	return paths.reduceRight((obj, next, idx, fullPath) => {
		if (idx + 1 === fullPath.length) {
			return { [next]: value };
		} else {
			return { [next]: obj };
		}
	}, object);
};
