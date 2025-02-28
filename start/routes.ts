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
const SignupController = () => import('#controllers/signup_controller')
const PostsController = () => import('#controllers/posts_controller')
const LogoutController = () => import('#controllers/logout_controller')

router.get('/', [PostsController, 'index']).use(middleware.auth())
router.get('/create-post', [PostsController, 'create']).use(middleware.auth())
router.post('/create-post', [PostsController, 'store']).use(middleware.auth())
router.delete('/posts/:id', [PostsController, 'destroy']).use(middleware.auth())

router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

router.get('/signin', [SigninController, 'index'])
router.post('/signin', [SigninController, 'store'])

router.get('/signup', [SignupController, 'index'])
router.post('/signup', [SignupController, 'store'])

router.get('/posts/:id/edit', [PostsController, 'edit']).use(middleware.auth())
router.get('/posts/:id/view', [PostsController, 'view']).use(middleware.auth())
router.put('/posts/:id', [PostsController, 'update']).use(middleware.auth())
