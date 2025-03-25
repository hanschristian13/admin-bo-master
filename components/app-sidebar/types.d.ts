export type NavGroupingType = {
  data: {
    title?: string
    items: {
      name: string
      url: string
      icon: React.ReactElement<SVGProps<SVGSVGElement>>
    }[]
  }
}

export type NavmainType = {
  items: {
    title: string
    url: string
    icon?: React.ReactElement<SVGProps<SVGSVGElement>>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}