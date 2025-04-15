'use client'
import { getAgentList } from '@/service/report'
import React, { useEffect } from 'react'
import SelectForFilter from './select-for-filter'
import { DataSuperAgentType, SuperAgentType } from '@/types/super-agent'

interface FilterDealerIdProps {
  // Optional pageData prop - if provided, will filter options to only show relevant dealers
  pageData?: any[];
  // Optional field to specify which property in pageData contains the dealer_id
  dealerIdField?: string;
  // Optional flag to control whether to show the "All" option
  showAllOption?: boolean;
}

const FilterDealerId: React.FC<FilterDealerIdProps> = ({ 
  pageData, 
  dealerIdField = 'dealer_id',
  showAllOption = true // Default to showing the "All" option
}) => {
  const [dealerList, setDealerList] = React.useState<{ label: string; value: string }[]>([])

  const fetchDealerList = async () => {
    const data = (await getAgentList()) as DataSuperAgentType
    if (data?.data) {
      // Create the all option
      const allOption = { label: "All Agent", value: "all" }
      
      // Map all available dealers from the API
      const mappedData = data.data.map((x: SuperAgentType) => ({ 
        label: x._id, 
        value: x._id 
      }))
      
      // If pageData is provided, filter the dealer list to only include relevant dealers
      if (pageData && pageData.length > 0) {
        // Extract unique dealer IDs from the page data
        const relevantDealerIds = new Set(
          pageData
            .map(item => item[dealerIdField])
            .filter(Boolean) // Remove null/undefined values
        )
        
        // Filter the dealer list to only include relevant dealers
        const filteredDealers = mappedData.filter(dealer => 
          relevantDealerIds.has(dealer.value)
        )
        
        // Set the dealer list with or without the "All" option
        setDealerList(showAllOption ? [allOption, ...filteredDealers] : filteredDealers)
      } else {
        // If no pageData is provided, show all dealers
        setDealerList(showAllOption ? [allOption, ...mappedData] : mappedData)
      }
    }
  }
  
  useEffect(() => {
    fetchDealerList()
  }, [pageData]) // Re-fetch when pageData changes
  
  return (
    <SelectForFilter 
      placeholder={showAllOption ? "Filter Agent" : "Select Agent"} 
      keys="dealer_id" 
      option={dealerList} 
      defaultValue={showAllOption ? "all" : undefined}
      required={!showAllOption} // Make selection required when there's no "All" option
    />
  )
}

export default FilterDealerId