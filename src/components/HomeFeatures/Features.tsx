import React from 'react'
import Feature from './Feature'
import './feature.scss'
import { modeProps } from '../../types'

const Features = ({ mode }: modeProps) => {
  return (
    <div id='features'>
      <div data-aos='fade-down' className='features-header'>
        <p className='features-header-intro'>Fit for you</p>
        <h3 className='features-header-greeting'>
          <span className={mode}>Welcome to Lytebox</span>
        </h3>
        <p className='features-header-desc'>
          Inside Lytebox, we present everything you need to interact with your
          files in the cloud.
        </p>
      </div>
      <div className='features'>
        <Feature
          image={'/images/folder.png'}
          name={'Managed Files'}
          description={
            'You can easily manage your files with a nice appearance.'
          }
        />
        <Feature
          image={'/images/pie-chart.png'}
          name={'Structured'}
          description={
            'Lytebox is designed to put things in correct order for you.'
          }
        />

        <Feature
          image={'/images/share.png'}
          name={'Share'}
          description={
            "Send files to anyone, even if they don't have Lytebox account."
          }
        />
        <Feature
          image={'/images/data-protection.png'}
          name={'Secured'}
          description={
            'Keep your file safe with multiple layer of protections and virus-free.'
          }
        />
      </div>
    </div>
  )
}

export default Features
