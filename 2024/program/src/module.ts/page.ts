export class PageDao implements Ipage {
  ui_type = ''

  ui_currentPage = 1

  ui_maxPage = 0

  ui_pageSize = 10

  ui_dataSize = 0

  ui_showSave = false
}

export class ListDao<T> {
  list: Array<T> = []

  pagePagination: PageDao = new PageDao()
}
