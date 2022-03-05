import React from 'react'
import Hero from '../components/Hero';


export default function Home() {
  return (
    <>
      <Hero></Hero>
      <div>
        <br /> <br />
          <image src='../asset/images/question.jpeg' />
            <h3 className='intro-message'>GIFT: Gift Imagine For Them <br /> 
                Don't know what to get for your love ones, friends or co-workers?
                Let GIFT help you figured out what to get for them.
                Sign-up for our app, take a simple personality test and let GIFT find the gifts that suits your recipients.
            </h3>
      </div>
    </>
  )
}
