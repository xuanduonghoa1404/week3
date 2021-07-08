import Router from '@koa/router'
const router = new Router({ prefix: '/log' })

router.get('/', async (ctx, next) => {
    ctx.body = 'Some User'
})

export default router