import Link from 'next/link'

const PaginationButton = ({ isActive, href, pageIdx, buttonIdx, pageCount }) => {
  const activePage =
    'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-semibold border-slate-900 text-slate-950'
  const inactivePage =
    'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-semibold text-gray-500'

  const buttonStyle = isActive ? activePage : inactivePage

  let onClickPageIdx = 0

  let pageContent = ''
  if (pageCount > 7) {
    switch (buttonIdx) {
      case 0:
        pageContent = 1
        onClickPageIdx = 1
        break

      case 1:
        if (pageIdx + 1 > 4) {
          pageContent = '...'
        } else {
          pageContent = 2
        }
        onClickPageIdx = 2
        break

      case 2:
        if (pageIdx + 1 >= pageCount - 3) {
          pageContent = pageCount - 4
          onClickPageIdx = pageContent
        } else if (pageIdx > 4) {
          pageContent = pageIdx - 1
          onClickPageIdx = pageContent
        } else {
          pageContent = 3
          onClickPageIdx = 3
        }
        break

      case 3:
        if (pageIdx + 1 >= pageCount - 3) {
          pageContent = pageCount - 3
          onClickPageIdx = pageContent
        } else if (pageIdx > 4) {
          pageContent = pageIdx
          onClickPageIdx = pageContent
        } else {
          pageContent = 4
          onClickPageIdx = 4
        }
        break

      case 4:
        if (pageIdx + 1 >= pageCount - 3) {
          pageContent = pageCount - 2
          onClickPageIdx = pageContent
        } else if (pageIdx > 4) {
          pageContent = pageIdx + 1
          onClickPageIdx = pageContent
        } else {
          pageContent = 5
          onClickPageIdx = 5
        }
        break

      case 5:
        if (pageIdx + 1 >= pageCount - 3) {
          pageContent = pageCount - 1
        } else {
          pageContent = '...'
        }
        onClickPageIdx = pageCount - 1
        break

      case 6:
        pageContent = pageCount
        onClickPageIdx = pageCount
        break
    }
  } else {
    pageContent = pageIdx + 1
    onClickPageIdx = pageIdx
  }

  return (
    <Link className={buttonStyle} href={href(onClickPageIdx)} scroll={false}>
      {pageContent}
    </Link>
  )
}

export default PaginationButton
