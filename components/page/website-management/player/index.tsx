/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import SearchInput from '@/components/form/search-input'
import Link from 'next/link'
import CardPlayer from '@/components/card-player'
import FilterDealerId from '@/components/filter/filter-dealer-id'
import NoData from '@/components/no-data'
import PaginationCustomize from '@/components/pagination'

const Page = ({ list }: any) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2.5">
          <SearchInput param="q" placeholder="Search Username or name..." />
          {/* Use FilterDealerId without the "All" option */}
          <FilterDealerId 
            // showAllOption={false} 
          />
        </div>
      </div>
      <div className="grid gap-4 auto-rows-min lg:grid-cols-3">
        {list?.data.map((item: any) => (
          <Link aria-label="player detail" href={`/player/${item.username}`} key={item.username}>
            <CardPlayer data={item} />
          </Link>
        ))}
      </div>
      {list?.data.length > 0 && (
        <PaginationCustomize totalPages={list?.total_page} paginationItemsToDisplay={12} />
      )}

      <div className="flex items-center justify-center h-full w-full">
        {!list?.data.length && <NoData title="Nothing to display / Select agent first" />}
      </div>
    </div>
  )
}

Page.displayName = 'PageWebsiteManagementPlayer'

export default Page