import React from 'react'

export const sandwichIcon = {
  sandwichBold: {
    html: (
      <g>
        <rect x='0' y='0' width='24' height='4' />
        <rect x='0' y='8' width='24' height='4' />
        <rect x='0' y='16' width='24' height='4' />
      </g>
    ),
    height: 20
  },
  sandwichRegular: {
    html: (
      <g>
        <rect x='0' y='0' width='24' height='3' />
        <rect x='0' y='8' width='24' height='3' />
        <rect x='0' y='16' width='24' height='3' />
      </g>
    ),
    height: 19
  },
  sandwichThin: {
    html: (
      <g>
        <rect x='0' y='0' width='24' height='2' />
        <rect x='0' y='8' width='24' height='2' />
        <rect x='0' y='16' width='24' height='2' />
      </g>
    ),
    height: 18
  },
  sandwichRight: {
    html: (
      <g>
        <rect x='0' y='0' width='24' height='3' />
        <rect x='5' y='8' width='19' height='3' />
        <rect x='0' y='16' width='24' height='3' />
      </g>
    ),
    height: 19
  },
  sandwichLeft: {
    html: (
      <g>
        <rect x='0' y='0' width='14' height='3' />
        <rect x='0' y='8' width='24' height='3' />
        <polygon points='0 16 19 16 19 19 0 19' />
      </g>
    ),
    height: 19
  }
}

export const closeIcon = {
  closeBold: (
    <polygon
      points='10 7.17157288 2.92893219 0.100505063 0.100505063 2.92893219 7.17157288 10 0.100505063 17.0710678 2.92893219 19.8994949 10 12.8284271 17.0710678 19.8994949 19.8994949 17.0710678 12.8284271 10 19.8994949 2.92893219 17.0710678 0.100505063'
    />
  ),
  closeRegular: (
    <polygon
      points='9.5 7.38888889 2.11111111 0 0 2.11111111 7.38888889 9.5 0 16.8888889 2.11111111 19 9.5 11.6111111 16.8888889 19 19 16.8888889 11.6111111 9.5 19 2.11111111 16.8888889 1.76780781e-15'
    />
  ),
  closeThin: (
    <polygon
      points='10 8.58578644 2.22182541 0.807611845 0.807611845 2.22182541 8.58578644 10 0.807611845 17.7781746 2.22182541 19.1923882 10 11.4142136 17.7781746 19.1923882 19.1923882 17.7781746 11.4142136 10 19.1923882 2.22182541 17.7781746 0.807611845 10 8.58578644'
    />
  )
}
