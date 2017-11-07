
const router = require('express').Router()
const cheerio = require('cheerio')
const Nightmare = require('nightmare')
const rp = require('request-promise').defaults({
	transform: (body) => {
		return cheerio.load(body)
	}
})

const api_root = 'https://medium.com'

router.get('/test', (req, res) => {
	console.log('Got Test request!')

	res.setStatus(200).send('ok')
})


router.get('/scrape', async (req, res) => {
	const nightmare = new Nightmare({ show: true})
	const url = req.query.url || 'https://chatbotsmagazine.com/latest'
	const $ = await rp(url).catch(err => console.log('Error:', err))
	
	await nightmare
		.goto(url)
		.wait('.js-postList:last-child')
		.evaluate(() => {
			// return [..document.querySelectorAll('')]
		})



	
})


// Medium routes, no go for finding most popular posts

router.get('/publication/:id', async (req, res) => {
	const to = req.query.to
	let string = await rp.get({
		uri: `${api_root}/_/api/collections/${req.params.id}/stream`,
		qs: {
			to,
			limit: 1,
			page: '1'
		}
	})
		.catch(err => console.log(`Error: ${err}`))

	const data = JSON.parse(string.split("</x>").pop())
	// Lets peep the data
	console.log({data})

	const postData = data.payload.references.Post
	const posts = Object.keys(postData).map(el => postData[el])

	// post dates
	res.json({
		meta: { count: posts.length },
		paging: data.payload.paging,
		posts: posts.map(el => el.slug)
	})
})

router.get('/archive', async (req, res) => {

	const to = req.query.to
	let string = await rp.get(`https://chatbotsmagazine.com/archive?format=json&to=${to}`)

	const data = JSON.parse(string.split("</x>").pop())
	
	const postData = data.payload.references.Post
	const posts = Object.keys(postData).map(el => postData[el])

	res.json({
		meta: {count: posts.length},
		paging: data.payload.paging,
		posts: posts.map(el => el.slug)
	})
})

module.exports = router
