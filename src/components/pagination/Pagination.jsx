'use client'

import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import PaginationButton from './PaginationButton'

export default function Pagination({ totalPages }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page') || 1)
  const query = searchParams.get('query') || ''

  const handlePageClick = (pageNumber) => {
    // Set the new page parameter and trigger navigation
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    if (query) {
      params.set('query', query) // Ensure the query is preserved
    }
    return `${pathname}?${params.toString()}`
  }

  const renderPaginationButtons = () => {
    console.log('inside renderPaginatioButtons')
    if (totalPages > 7) {
      return (
        <>
          <PaginationButton
            pageIdx={0}
            isActive={currentPage === 1}
            href={handlePageClick}
            buttonIdx={0}
            pageCount={totalPages}
          />
          <PaginationButton
            pageIdx={currentPage}
            isActive={currentPage === 2}
            href={handlePageClick}
            buttonIdx={1}
            pageCount={totalPages}
          />
          <PaginationButton
            pageIdx={currentPage}
            isActive={currentPage === 3}
            href={handlePageClick}
            buttonIdx={2}
            pageCount={totalPages}
          />
          <PaginationButton
            pageIdx={currentPage}
            isActive={currentPage > 3 && currentPage < totalPages - 2}
            href={handlePageClick}
            buttonIdx={3}
            pageCount={totalPages}
          />
          <PaginationButton
            pageIdx={currentPage}
            isActive={currentPage === totalPages - 2}
            href={handlePageClick}
            buttonIdx={4}
            pageCount={totalPages}
          />
          <PaginationButton
            pageIdx={currentPage}
            isActive={currentPage === totalPages - 1}
            href={handlePageClick}
            buttonIdx={5}
            pageCount={totalPages}
          />
          <PaginationButton
            pageIdx={totalPages - 1}
            isActive={currentPage === totalPages}
            href={handlePageClick}
            buttonIdx={6}
            pageCount={totalPages}
          />
        </>
      )
    } else {
      const buttons = []
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <PaginationButton
            key={i}
            pageIdx={i}
            isActive={currentPage === i + 1}
            href={handlePageClick}
            buttonIdx={i}
            pageCount={totalPages}
          />
        )
      }
      return buttons
    }
  }

  return (
    <nav className="flex items-center justify-between border-t border-zinc-950/10 px-4 sm:px-0 dark:border-white/10">
      <div className="-mt-px flex w-0 flex-1">
        <Link
          className={clsx(
            'inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-zinc-500 dark:hover:dark:border-white/10 dark:hover:text-zinc-400',
            { 'pointer-events-none opacity-30 hover:border-transparent hover:text-gray-500': currentPage <= 1 }
          )}
          href={handlePageClick(currentPage - 1)}
          scroll={false}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      {console.log('entering pagination')}
      <div className="hidden md:-mt-px md:flex">
        {/* Render pagination buttons */}
        {renderPaginationButtons()}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          className={clsx(
            'inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:dark:border-white/10 dark:hover:text-zinc-400',
            { 'pointer-events-none opacity-30 hover:border-transparent hover:text-gray-500': currentPage >= totalPages }
          )}
          href={handlePageClick(currentPage + 1)}
          scroll={false}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}
