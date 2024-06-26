import {promisify} from 'node:util'
import {createClient} from '../index.js'

const abortWithError = (err) => {
	console.error(err)
	process.exit(1)
}

if (!process.env.VDV_453_LEITSTELLE) {
	abortWithError('missing/empty $VDV_453_LEITSTELLE')
}
const LEITSTELLE = process.env.VDV_453_LEITSTELLE
if (!process.env.VDV_453_ENDPOINT) {
	abortWithError('missing/empty $VDV_453_ENDPOINT')
}
const ENDPOINT = process.env.VDV_453_ENDPOINT
if (!process.env.PORT) {
	abortWithError('missing/empty $PORT')
}
const PORT = process.env.PORT

const {
	logger,
	httpServer,
	data,
	ausSubscribe,
	ausUnsubscribe,
} = createClient({
	leitstelle: LEITSTELLE,
	endpoint: ENDPOINT,
})

await promisify(httpServer.listen.bind(httpServer))(PORT)
logger.info(`listening on port ${PORT}`)

const {aboId} = await ausSubscribe({
	expiresAt: Date.now() + 10 * 60 * 1000, // for 10min
})
process.on('SIGINT', () => {
	ausUnsubscribe(aboId)
	.then(() => {
		httpServer.close()
	})
	.catch(abortWithError)
})

data.on('aus:IstFahrt', (istFahrt) => {
	console.log(istFahrt)
})
