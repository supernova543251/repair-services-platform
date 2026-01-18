import {
  FaTools,
  FaTruckPickup,
  FaMobileAlt,
  FaCheckCircle,
  FaTag
} from 'react-icons/fa';

const brands_logo = [
  { name: "Samsung", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/samsung/samsung_logo.jpg" },
  { name: "Apple", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/iphone/iphone_logo.jpg" },
  { name: "Nothing", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/Nothing_logo.jpg" },
  { name: "Motorola", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/motorola/motorla_logo.jpg" },
  { name: "Xiaomi", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/xiaomi/redmi_logo.webp" },
  { name: "Oneplus", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/oneplus/OnePlus-logo.png" },
  { name: "Infinix", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/infinix/infinix_logo.png" },
  { name: "Oppo", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/oppo/Oppo-Logo.jpg" },
  { name: "Vivo", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/vivo/vivo_logo.png" },
  { name: "Realme", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/realme/realme-logo.jpg" },
  { name: "iqoo", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/iqoo/iqoo_logo.jpeg" },
  { name: "Poco", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/poco/poco_logo.jpg" }
];

const repairSteps = [
  {
    number: 1,
    title: 'Choose Repair Service',
    description: 'Select the type of repair you need and submit the form.',
    icon: FaTools,
    color: '#4F46E5'
  },
  {
    number: 2,
    title: 'Pickup from Home',
    description: 'A pickup agent will come to your home and collect the phone.',
    icon: FaTruckPickup,
    color: '#10B981'
  },
  {
    number: 3,
    title: 'Get a Temporary Phone',
    description: 'While your phone is being repaired, you\'ll receive a temporary replacement device.',
    icon: FaMobileAlt,
    color: '#F59E0B'
  },
  {
    number: 4,
    title: 'Phone Repaired & Returned',
    description: 'Once the repair is done, your original phone will be delivered back to your home.',
    icon: FaCheckCircle,
    color: '#8B5CF6'
  },
  {
    number: 5,
    title: 'Apply Discount Code',
    description: 'Use the influencer\'s discount code to get [X%] off your repair.',
    icon: FaTag,
    color: '#EC4899'
  }
];

// Comprehensive smartphone data for all brands
const smartphoneModels = {
  'samsung': {
    series: ['Galaxy S', 'Galaxy A', 'Galaxy M', 'Galaxy Z', 'Galaxy F'],
    models: [
      { 
        name: 'Galaxy S24 Ultra', 
        series: 'Galaxy S',
        variants: [
          { name: 'Black',  },
          { name: 'Titanium Gray', color: '#8E8E93' },
          { name: 'Titanium Violet', color: '#B8AFE6' }
        ]
      },
      { 
        name: 'Galaxy S23', 
        series: 'Galaxy S',
        variants: [
          { name: 'Phantom Black', color: '#000000' },
          { name: 'Cream', color: '#FEF5E7' },
          { name: 'Green', color: '#10B981' }
        ]
      },
      { 
        name: 'Galaxy A54', 
        series: 'Galaxy A',
        variants: [
          { name: 'Awesome Black', color: '#000000' },
          { name: 'Awesome White', color: '#FFFFFF' },
          { name: 'Awesome Violet', color: '#8B5CF6' }
        ]
      },
      { 
        name: 'Galaxy M34', 
        series: 'Galaxy M',
        variants: [
          { name: 'Midnight Blue', color: '#1E3A8A' },
          { name: 'Prism Green', color: '#059669' }
        ]
      },
      { 
        name: 'Galaxy Z Flip5', 
        series: 'Galaxy Z',
        variants: [
          { name: 'Mint', color: '#34D399' },
          { name: 'Graphite', color: '#374151' },
          { name: 'Lavender', color: '#A78BFA' }
        ]
      },
      { 
        name: 'Galaxy F54', 
        series: 'Galaxy F',
        variants: [
          { name: 'Silver', color: '#C0C0C0' },
          { name: 'Green', color: '#065F46' }
        ]
      }
    ]
  },
  'iphone': {
    series: ['iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone SE', 'iPhone 12'],
    models: [
      { 
        name: 'iPhone 15 Pro', 
        series: 'iPhone 15',
        variants: [
          { name: 'Natural Titanium', color: '#8E8E93' },
          { name: 'Blue Titanium', color: '#5E8AAA' },
          { name: 'White Titanium', color: '#F2F2F2' }
        ]
      },
      { 
        name: 'iPhone 15', 
        series: 'iPhone 15',
        variants: [
          { name: 'Black', color: '#1C1C1E' },
          { name: 'Blue', color: '#0A84FF' },
          { name: 'Pink', color: '#FF9AA2' }
        ]
      },
      { 
        name: 'iPhone 14 Pro', 
        series: 'iPhone 14',
        variants: [
          { name: 'Space Black', color: '#000000' },
          { name: 'Gold', color: '#F5D382' },
          { name: 'Silver', color: '#F2F2F2' }
        ]
      },
      { 
        name: 'iPhone 13', 
        series: 'iPhone 13',
        variants: [
          { name: 'Midnight', color: '#000000' },
          { name: 'Starlight', color: '#F2F2F2' },
          { name: 'Pink', color: '#FF9AA2' }
        ]
      },
      { 
        name: 'iPhone SE', 
        series: 'iPhone SE',
        variants: [
          { name: 'Black', color: '#1C1C1E' },
          { name: 'White', color: '#F2F2F2' }
        ]
      }
    ]
  },
  'nothing': {
    series: ['Phone 1', 'Phone 2', 'Phone 2a'],
    models: [
      { 
        name: 'Nothing Phone 2', 
        series: 'Phone 2',
        variants: [
          { name: 'White', color: '#FFFFFF' },
          { name: 'Dark Gray', color: '#2D2D2D' }
        ]
      },
      { 
        name: 'Nothing Phone 2a', 
        series: 'Phone 2a',
        variants: [
          { name: 'White', color: '#FFFFFF' },
          { name: 'Black', color: '#000000' },
          { name: 'Milk White', color: '#F8FAFC' }
        ]
      },
      { 
        name: 'Nothing Phone 1', 
        series: 'Phone 1',
        variants: [
          { name: 'White', color: '#FFFFFF' },
          { name: 'Black', color: '#000000' }
        ]
      }
    ]
  },
  'motorola': {
    series: ['Edge', 'G', 'E', 'Razr'],
    models: [
      { 
        name: 'Moto Edge 40', 
        series: 'Edge',
        variants: [
          { name: 'Black', color: '#000000' },
          { name: 'Blue', color: '#3B82F6' },
          { name: 'Green', color: '#10B981' }
        ]
      },
      { 
        name: 'Moto G84', 
        series: 'G',
        variants: [
          { name: 'Midnight Blue', color: '#1E3A8A' },
          { name: 'Marshmallow Blue', color: '#93C5FD' }
        ]
      },
      { 
        name: 'Moto E32', 
        series: 'E',
        variants: [
          { name: 'Gray', color: '#6B7280' },
          { name: 'Blue', color: '#2563EB' }
        ]
      },
      { 
        name: 'Moto Razr 40', 
        series: 'Razr',
        variants: [
          { name: 'Black', color: '#000000' },
          { name: 'Blue', color: '#1D4ED8' }
        ]
      },
      { 
        name: 'Moto G54', 
        series: 'G',
        variants: [
          { name: 'Pearl Blue', color: '#60A5FA' },
          { name: 'Midnight Blue', color: '#1E3A8A' }
        ]
      }
    ]
  },
  'xiaomi': {
    series: ['Redmi Note', 'Redmi', 'Poco', 'Mi'],
    models: [
      { 
        name: 'Redmi Note 13 Pro', 
        series: 'Redmi Note',
        variants: [
          { name: 'Arctic White', color: '#FFFFFF' },
          { name: 'Ocean Blue', color: '#007AFF' },
          { name: 'Midnight Black', color: '#000000' }
        ]
      },
      { 
        name: 'Redmi 13C', 
        series: 'Redmi',
        variants: [
          { name: 'Starlight Black', color: '#000000' },
          { name: 'Startrail Silver', color: '#C0C0C0' }
        ]
      },
      { 
        name: 'Poco X6 Pro', 
        series: 'Poco',
        variants: [
          { name: 'Racing Gray', color: '#6B7280' },
          { name: 'Spectrum Blue', color: '#3B82F6' }
        ]
      },
      { 
        name: 'Xiaomi 13 Pro', 
        series: 'Mi',
        variants: [
          { name: 'Ceramic Black', color: '#000000' },
          { name: 'Ceramic White', color: '#FFFFFF' }
        ]
      },
      { 
        name: 'Redmi Note 12', 
        series: 'Redmi Note',
        variants: [
          { name: 'Ice Blue', color: '#BFDBFE' },
          { name: 'Onyx Gray', color: '#4B5563' }
        ]
      }
    ]
  },
  'oneplus': {
    series: ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord', 'OnePlus CE'],
    models: [
      { 
        name: 'OnePlus 12', 
        series: 'OnePlus 12',
        variants: [
          { name: 'Silky Black', color: '#000000' },
          { name: 'Emerald Green', color: '#10B981' }
        ]
      },
      { 
        name: 'OnePlus 11', 
        series: 'OnePlus 11',
        variants: [
          { name: 'Titan Black', color: '#1C1C1E' },
          { name: 'Eternal Green', color: '#065F46' }
        ]
      },
      { 
        name: 'OnePlus Nord CE 3', 
        series: 'OnePlus Nord',
        variants: [
          { name: 'Aqua Surge', color: '#06B6D4' },
          { name: 'Gray Shimmer', color: '#6B7280' }
        ]
      },
      { 
        name: 'OnePlus 10 Pro', 
        series: 'OnePlus 11',
        variants: [
          { name: 'Volcanic Black', color: '#000000' },
          { name: 'Emerald Forest', color: '#059669' }
        ]
      },
      { 
        name: 'OnePlus Nord 3', 
        series: 'OnePlus Nord',
        variants: [
          { name: 'Misty Green', color: '#34D399' },
          { name: 'Tempest Gray', color: '#9CA3AF' }
        ]
      }
    ]
  },
  'infinix': {
    series: ['Note', 'Hot', 'Smart', 'Zero'],
    models: [
      { 
        name: 'Infinix Note 30', 
        series: 'Note',
        variants: [
          { name: 'Magic Black', color: '#000000' },
          { name: 'Sunrise Gold', color: '#FBBF24' }
        ]
      },
      { 
        name: 'Infinix Hot 30', 
        series: 'Hot',
        variants: [
          { name: 'Racing Black', color: '#000000' },
          { name: 'Surfing Green', color: '#10B981' }
        ]
      },
      { 
        name: 'Infinix Smart 8', 
        series: 'Smart',
        variants: [
          { name: 'Galaxy White', color: '#FFFFFF' },
          { name: 'Timber Black', color: '#000000' }
        ]
      },
      { 
        name: 'Infinix Zero 30', 
        series: 'Zero',
        variants: [
          { name: 'Golden Hour', color: '#F59E0B' },
          { name: 'Rome Green', color: '#059669' }
        ]
      },
      { 
        name: 'Infinix Note 12', 
        series: 'Note',
        variants: [
          { name: 'Jewel Blue', color: '#1D4ED8' },
          { name: 'Force Black', color: '#000000' }
        ]
      }
    ]
  },
  'oppo': {
    series: ['Reno', 'Find', 'A Series', 'F Series'],
    models: [
      { 
        name: 'Oppo Reno 11', 
        series: 'Reno',
        variants: [
          { name: 'Wave Green', color: '#10B981' },
          { name: 'Rock Gray', color: '#6B7280' }
        ]
      },
      { 
        name: 'Oppo Find N3', 
        series: 'Find',
        variants: [
          { name: 'Classic Black', color: '#000000' },
          { name: 'Vintage Green', color: '#059669' }
        ]
      },
      { 
        name: 'Oppo A79', 
        series: 'A Series',
        variants: [
          { name: 'Glowing Green', color: '#34D399' },
          { name: 'Glowing Black', color: '#000000' }
        ]
      },
      { 
        name: 'Oppo F25 Pro', 
        series: 'F Series',
        variants: [
          { name: 'Ocean Blue', color: '#2563EB' },
          { name: 'Lava Red', color: '#DC2626' }
        ]
      },
      { 
        name: 'Oppo Reno 10', 
        series: 'Reno',
        variants: [
          { name: 'Ice Blue', color: '#BFDBFE' },
          { name: 'Silvery Gray', color: '#9CA3AF' }
        ]
      }
    ]
  },
  'vivo': {
    series: ['V Series', 'Y Series', 'X Series', 'T Series'],
    models: [
      { 
        name: 'Vivo V29', 
        series: 'V Series',
        variants: [
          { name: 'Himalayan Blue', color: '#60A5FA' },
          { name: 'Noble Black', color: '#000000' }
        ]
      },
      { 
        name: 'Vivo Y100', 
        series: 'Y Series',
        variants: [
          { name: 'Crimson Red', color: '#DC2626' },
          { name: 'Crystal Blue', color: '#3B82F6' }
        ]
      },
      { 
        name: 'Vivo X100', 
        series: 'X Series',
        variants: [
          { name: 'Starry Blue', color: '#1E40AF' },
          { name: 'Sunset Orange', color: '#EA580C' }
        ]
      },
      { 
        name: 'Vivo T2', 
        series: 'T Series',
        variants: [
          { name: 'Velocity Wave', color: '#8B5CF6' },
          { name: 'Nitro Blue', color: '#3B82F6' }
        ]
      },
      { 
        name: 'Vivo Y27', 
        series: 'Y Series',
        variants: [
          { name: 'Burgundy Red', color: '#991B1B' },
          { name: 'Sea Green', color: '#059669' }
        ]
      }
    ]
  },
  'realme': {
    series: ['Realme 11', 'Realme Narzo', 'Realme C', 'Realme GT'],
    models: [
      { 
        name: 'Realme 11 Pro+', 
        series: 'Realme 11',
        variants: [
          { name: 'Oasis Green', color: '#10B981' },
          { name: 'Sunrise Beige', color: '#FBBF24' }
        ]
      },
      { 
        name: 'Realme Narzo 60', 
        series: 'Realme Narzo',
        variants: [
          { name: 'Cosmic Black', color: '#000000' },
          { name: 'Martian Green', color: '#059669' }
        ]
      },
      { 
        name: 'Realme C55', 
        series: 'Realme C',
        variants: [
          { name: 'Rainy Night', color: '#1E40AF' },
          { name: 'Sunshower', color: '#F59E0B' }
        ]
      },
      { 
        name: 'Realme GT 2', 
        series: 'Realme GT',
        variants: [
          { name: 'Paper White', color: '#FFFFFF' },
          { name: 'Steel Black', color: '#374151' }
        ]
      },
      { 
        name: 'Realme 10', 
        series: 'Realme 11',
        variants: [
          { name: 'Clash White', color: '#FFFFFF' },
          { name: 'Rush Black', color: '#000000' }
        ]
      }
    ]
  },
  'iqoo': {
    series: ['Z Series', 'Neo', 'Number Series', 'U Series'],
    models: [
      { 
        name: 'iQOO Z7 Pro', 
        series: 'Z Series',
        variants: [
          { name: 'Blue Lagoon', color: '#06B6D4' },
          { name: 'Graphite Matte', color: '#374151' }
        ]
      },
      { 
        name: 'iQOO Neo 7', 
        series: 'Neo',
        variants: [
          { name: 'Interstellar Black', color: '#000000' },
          { name: 'Cyber Blue', color: '#3B82F6' }
        ]
      },
      { 
        name: 'iQOO 11', 
        series: 'Number Series',
        variants: [
          { name: 'Legend', color: '#000000' },
          { name: 'Alpha', color: '#FFFFFF' }
        ]
      },
      { 
        name: 'iQOO Z6', 
        series: 'Z Series',
        variants: [
          { name: 'Chromatic Blue', color: '#2563EB' },
          { name: 'Dynamic Orange', color: '#EA580C' }
        ]
      },
      { 
        name: 'iQOO U3', 
        series: 'U Series',
        variants: [
          { name: 'Black', color: '#000000' },
          { name: 'Blue', color: '#1D4ED8' }
        ]
      }
    ]
  },
  'poco': {
    series: ['Poco X', 'Poco M', 'Poco F', 'Poco C'],
    models: [
      { 
        name: 'Poco X6 Pro', 
        series: 'Poco X',
        variants: [
          { name: 'Racing Gray', color: '#6B7280' },
          { name: 'Spectrum Blue', color: '#3B82F6' }
        ]
      },
      { 
        name: 'Poco M6 Pro', 
        series: 'Poco M',
        variants: [
          { name: 'Power Black', color: '#000000' },
          { name: 'Forest Green', color: '#059669' }
        ]
      },
      { 
        name: 'Poco F5', 
        series: 'Poco F',
        variants: [
          { name: 'Carbon Black', color: '#000000' },
          { name: 'Electric Blue', color: '#2563EB' }
        ]
      },
      { 
        name: 'Poco C65', 
        series: 'Poco C',
        variants: [
          { name: 'Pastel Blue', color: '#93C5FD' },
          { name: 'Glossy Black', color: '#000000' }
        ]
      },
      { 
        name: 'Poco X5', 
        series: 'Poco X',
        variants: [
          { name: 'Ice Blue', color: '#BFDBFE' },
          { name: 'Midnight Black', color: '#000000' }
        ]
      }
    ]
  }
};

// For backward compatibility
const models_variant = smartphoneModels;

export { brands_logo as default, repairSteps, smartphoneModels, models_variant };

export const models = {
  'nothing': [
    { name: 'Nothing Phone 1', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/1 Nothing Phone (1) white.png' },
    { name: 'Nothing Phone 2', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/2 Nothing Phone (2) White.webp' },
    { name: 'Nothing Phone 2a', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 Nothing Phone (2a) W.jpg' }
  ]
};

export const services = {
  'services': [
    { name:'Touchscreen', image:'https://i5.walmartimages.com/asr/5cd2bdf6-855e-4529-b112-1400002bb87d.d9baeef3c2bb8d1988ceb55d435ec84d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
    { name:'Screen Replacement', image:'https://d3nevzfk7ii3be.cloudfront.net/igi/N2F1UsZcNMIXSNnP.full' },
    { name:'Front Glass', image:'https://alephksa.com/cdn/shop/files/SP-GT20_2_9ab1cfbe-60fe-47a4-83fc-635ce4f11e30.png?v=1711868120&width=1445' },
    { name:'Flex connectors', image:'https://alexnld.com/wp-content/uploads/2021/11/SPA2862_2.jpg' },
    { name:'Charging port', image:'https://img.freepik.com/premium-photo/close-up-charging-port-modern-smartphone-gray_93675-108814.jpg' },
    { name:'Power button', image:'https://smartphonegreece439699244.files.wordpress.com/2022/03/power-button-android-phone-smartphonegreece.jpg' },
    { name:'Volume Button', image:'https://smartphonefixcenter.com/wp-content/uploads/2015/11/volume-button-ipho-6.jpg' },
    { name:'Silent Switch', image:'https://img.freepik.com/premium-photo/ring-silent-slide-switch-mobile-phone_271326-1338.jpg' },
    { name:'Home button', image:'https://tipsmake.com/data/thumbs/turn-the-home-button-on-android-into-the-divine-home-button-thumb-rzvGRJc5R.jpg' },
    { name:'Rear Camera', image:'https://cdn.images.express.co.uk/img/dynamic/59/940x/secondary/The-Galaxy-S25-Ultra-5906582.jpg?r=1737625181257' },
    { name:'Front Camera', image:'https://www.noypigeeks.com/wp-content/uploads/2020/03/OPPO-Reno-3-Pro-4G-NoypiGeeks-5732-1024x576.jpg' },
    { name:'Speaker', image:'https://ac3filter.b-cdn.net/wp-content/uploads/733489-780x470.jpg' },
    { name:'Mic', image:'https://cdn.prod.website-files.com/5e83466828f0fa11a39d46ff/66446f577a4af5eec5608558_microphone.webp' },
  ]
};