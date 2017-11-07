
const router = require('express').Router()

router.get('/test', (req, res) => {
	console.log('Got Test request!')

	res.setStatus(200).send('ok')
})

router.get('/publication/:id', async (req, res) => {
	res.send({id: req.params.id})
})

module.exports = router
