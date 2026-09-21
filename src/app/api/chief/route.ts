import { NextResponse } from 'next/server';

const CHIEF_GIFS = [
	'https://media.giphy.com/media/pvbtwLeVDJuMjtABNE/giphy.gif',
	'https://media.giphy.com/media/Gzwqh47290mzu/giphy.gif',
	'https://media.giphy.com/media/rK2bkFx4FmFBqIhIm6/giphy.gif',
	'https://media.giphy.com/media/rg4mqD9gf4HxUl9QE2/giphy.gif',
	'https://media.giphy.com/media/pGeGw61Y9ueS2W6Yhi/giphy.gif',
	'https://media.giphy.com/media/10GRa2yY4v1Ic0/giphy.gif',
	'https://media.giphy.com/media/UXlywgbkv34PkmUGJc/giphy.gif',
	'https://media.giphy.com/media/ubhMewn8fmT9U4yrWu/giphy.gif',
	'https://media.giphy.com/media/FazsBLMForhCthgARJ/giphy.gif',
];

export const dynamic = 'force-dynamic';

export function GET() {
	const randomGif = CHIEF_GIFS[Math.floor(Math.random() * CHIEF_GIFS.length)];

	return NextResponse.redirect(randomGif, {
		status: 307,
		headers: {
			'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
		},
	});
}
