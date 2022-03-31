import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GlobalStyle from './style/GlobalStyle'
import { MockedProvider } from './context'

import Header from './components/Header'

import HomeDev from './pages/HomeDev'
import DashBoard from './pages/DashBoard'
import QuatCentQuat from './pages/QuatCentQuat'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MockedProvider>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<HomeDev />} />
          <Route path="/user/:id" element={<DashBoard />} />
          <Route path="*" element={<QuatCentQuat />} />
        </Routes>
      </MockedProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
