
const rp = require('request-promise').defaults({json: true, headers: {'Accept': 'application/json'}})
const router = require('express').Router()

const api_root = 'https://medium.com'

router.get('/test', (req, res) => {
	console.log('Got Test request!')

	res.setStatus(200).send('ok')
})

router.get('/publication/:id', async (req, res) => {
	const to = ''
	let string = await rp.get(`${api_root}/_/api/collections/${req.params.id}/stream`)
		.catch(err => console.log(`Error: ${err}`))

	data = JSON.parse(string.split("</x>").pop())
	// Lets peep the data
	console.log({data})

	// const postData = data.payload.references.Post
	// const posts = Object.keys(postData).map(el => postData[el])

	res.json(data)
})

module.exports = router
