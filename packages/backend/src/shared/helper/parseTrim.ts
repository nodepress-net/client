import { TransformFnParams } from 'class-transformer';

// otra funcion de trim, que quiero que quite los espacios entre la palabra y que deje solo un espacio
export const parseTrim = () => {
	return (params: TransformFnParams) =>
		typeof params.value === 'string'
			? params.value.replace(/\s+/g, ' ').trim()
			: params.value;
};
