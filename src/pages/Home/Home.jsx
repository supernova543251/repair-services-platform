import React from 'react'
import BrandGrid from '../../components/BrandGrid/BrandGrid'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import './Home.css';
import RepairProcess from '../../components/RepairProcess/RepairProcess';
import ServicesCardView from '../../components/ServicesCardView/ServicesCardView';

function Home() {
  return (
    <div className="home-page">
      <ImageSlider slides={[
        {
          url: 'https://images.wallpapersden.com/image/download/planets-stars-space_Z2ZmbGiUmZqaraWkpJRtZWWtZ2Vl.jpg',
          title: 'Slide 1',
          description: 'Description for slide 1'
        },
        {
          url: 'https://www.netlabindia.com/wp-content/uploads/2021/01/Banner-1200x200.jpg',
          title: 'Slide 2',
          description: 'Description for slide 2'
        }
      ]} />
      <ServicesCardView/>
      <p className="section-title">Brands we work</p>
      <BrandGrid/>
      <RepairProcess/>
    </div>
  )
}

export default Home;