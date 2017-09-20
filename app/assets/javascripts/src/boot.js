import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'
import SearchRouter from './router/user'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()

  const searchRouter = new SearchRouter()
  searchRouter.register()

  page({click: false})
})
