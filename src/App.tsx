/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Pages to be implemented
import Home from './pages/Home';
import Mortgage from './pages/Mortgage';
import CompoundInterest from './pages/CompoundInterest';
import ROI from './pages/ROI';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mortgage-calculator" element={<Mortgage />} />
          <Route path="compound-interest" element={<CompoundInterest />} />
          <Route path="roi-calculator" element={<ROI />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
