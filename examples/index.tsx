import React from 'react'
import ReactDOM from 'react-dom/client'

function Examples() {
  return (
    <ul>
      <li>
        <a href="/standard/">Standard modal</a>
      </li>
      <li>
        <a href="/animated/">Animated modal</a>
      </li>
      <li>
        <a href="/swipe-in-from-below/">Swipe in from below modal</a>
      </li>
    </ul>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Examples />
  </React.StrictMode>
)
