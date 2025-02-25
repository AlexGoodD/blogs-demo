/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const SigninController = () => import('#controllers/signin_controller')
const PostsController = () => import('#controllers/posts_controller')

router.get('/', [PostsController, 'index']).use(middleware.auth())
router.get('/create-post', [PostsController, 'create']).use(middleware.auth())
router.post('/create-post', [PostsController, 'store']).use(middleware.auth())
router.delete('/posts/:id', [PostsController, 'destroy']).use(middleware.auth())

router.get('/signin', [SigninController, 'index'])
router.post('/signin', [SigninController, 'store'])
