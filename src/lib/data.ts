import peng_cat from './images/peng_cat.jpg';
import bee_cat from './images/bee_cat.jpg';
import goose_cat from './images/goose_cat.jpg';
import giraffe_cat from './images/giraffe_cat.jpg';

const get_img = (x: Record<string, string>) => x.default;

const get_img_modules = (
	modules: Record<string, Record<string, string>>
) => Object.values(modules).map(get_img);

export const giraffe = get_img_modules(
	import.meta.globEager('./images/giraffe_*.jpg')
);
export const peng = get_img_modules(
	import.meta.globEager('./images/peng*.jpg')
);
export const bee = get_img_modules(
	import.meta.globEager('./images/bee*.jpg')
);
export const goose = get_img_modules(
	import.meta.globEager('./images/goose*.jpg')
);

export const categories = [
	{ title: 'Penguin', subtitle: 'formal chicken', image: peng_cat },
	{
		title: 'Giraffe',
		subtitle: 'long-necked leopard camel moose',
		image: giraffe_cat
	},
	{ title: 'Goose', subtitle: 'cobra chicken', image: goose_cat },
	{ title: 'Bee', subtitle: 'spicy sky raisin', image: bee_cat }
];
