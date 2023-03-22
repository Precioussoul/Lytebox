import React from 'react'
import Section from './Section'
import SectionTwo from './SectionTwo'
import { modeProps } from '../../types'

const Showcase = ({ mode }: modeProps) => {
  return (
    <div className='showcase'>
      <Section mode={mode} />
      <SectionTwo mode={mode} />
    </div>
  )
}

export default Showcase
