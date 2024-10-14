import React from 'react'
import Footer from './footer'
import styles from './index.module.scss'
import type { CardTemplateProps } from './types'

const CardTemplate: React.FC<CardTemplateProps> = ({ children, marqueeList }) => {
  return (
    <div className="relative flex flex-1 flex-col justify-center">
      <div className="relative">
        {/* Header */}
        <div className="relative top-[22px] z-10 mx-auto flex aspect-[267/46] w-[80%] items-center justify-center bg-[url('/images/smash-egg/bg-title.png')] bg-contain bg-no-repeat">
          <h1 className="text-center text-[20px] font-extrabold dark:text-white">SMASH EGG</h1>
        </div>

        <div
          className={`relative aspect-[343/326] w-full rounded-xl pb-3.5 pt-4 ${styles['card-bg']} flex flex-col justify-end gap-2`}
        >
          {children}
        </div>
        {/* Footer */}
        <Footer marqueeList={marqueeList} />
      </div>
    </div>
  )
}

export default CardTemplate
