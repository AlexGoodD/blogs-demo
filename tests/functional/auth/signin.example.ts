import { test } from '@japa/runner'
import Post from '#models/post'
import sinon from 'sinon'

class PostsService {
  async search() {
    const posts = await Post.all()
    return posts
  }
}

class PostsController {
  constructor(private postsService: PostsService) {}
  async index() {
    return this.postsService.search()
  }
}

// Unit tests - Ninguna dependencia

// Integration tests - Dependencias "Controladas"

// E2E tests - Dependencias "No controladas"

test.group('Posts controller', () => {
  test('list posts (unit)', async ({ assert }) => {
    // Given
    const postsService = new PostsService()
    const mockedSearch = sinon.mock()
    mockedSearch.resolves([])
    postsService.search = mockedSearch
    const postsController = new PostsController(postsService)
    // When
    const posts = await postsController.index()
    // Then
    assert.deepEqual(posts, [])
    assert.equal(mockedSearch.callCount, 1)
  })

  test('list posts (integration)', async ({ assert }) => {
    // Given
    const postsService = new PostsService()
    const postsController = new PostsController(postsService)
    // When
    const posts = await postsController.index()
    // Then
    assert.isNotEmpty(posts)
  })

  test('list posts (e2e)', async ({ assert }) => {
    // Given
    // Imaginarse que el serach llame a una API externa, o una base de datos de prod
    const postsService = new PostsService()
    const postsController = new PostsController(postsService)
    // When
    const posts = await postsController.index()
    // Then
    assert.deepEqual(posts, [])
  }).skip()
})
