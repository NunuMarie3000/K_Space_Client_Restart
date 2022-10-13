import React from 'react'
import Footer from '../body/Footer'

export default function About() {
  return (
    <>
      <div style={{
        height: '100vh',
        padding: '10px 15px 0 15px',
      }}>
        <div style={{
          padding: '5vh 5vw 10vh 5vw', fontFamily: "'Michroma', sans-serif", backgroundColor: 'white',
          opacity: .85,
          color: 'black'
        }}>
          <h1>welcome to k_space <i>v1.0.2</i></h1><br />
          <p style={{ wordSpacing: '5px' }}>My name is Storm O'Bryant and I'm the creator of k_space!</p>
          <p>This project was based on the nostalgia I feel for y2k culture, the early 2000s and simpler times of social media and blogging :) </p>
          <p>This is a passion project that was also my solo project at Code School Memphis for my 301 Course!</p>
        </div>
        <Footer />
      </div>
    </>
  )
}