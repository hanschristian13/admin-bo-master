import React from 'react'
import { Button } from './button'
import { LuFileOutput } from 'react-icons/lu'
const ButtonExportXLS = () => {
  return (
    <Button>
      <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
        <LuFileOutput />
      </span>
      <span>Export</span>
    </Button>
  )
}

export default ButtonExportXLS
