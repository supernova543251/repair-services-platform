import {
  FaTools,
  FaTruckPickup,
  FaMobileAlt,
  FaCheckCircle,
  FaTag
} from 'react-icons/fa';

const brands_logo = [
  { name: "Iphone", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/iphone/iphone_logo.jpg" },
  { name: "Samsung", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/samsung/samsung_logo.jpg" },
  { name: "Nothing", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/Nothing_logo.jpg" },
  { name: "Motorola", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/motorola/motorla_logo.jpg" },
  { name: "Xiaomi", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/xiaomi/redmi_logo.webp" },
  { name: "Oneplus", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/oneplus/OnePlus-logo.png" },
  { name: "Infinix", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/infinix/infinix_logo.png" },
  { name: "Oppo", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/oppo/Oppo-Logo.jpg" },
  { name: "Vivo", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/vivo/vivo_logo.png" },
  { name: "Realme", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/realme/realme-logo.jpg" },
  { name: "Iqoo", Image: "https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/iqoo/iqoo_logo.jpeg" },
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

export { brands_logo as default, repairSteps };

export const models = {
  'nothing': [
    { name: 'Nothing Phone 1', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/1 Nothing Phone (1) white.png' },
    { name: 'Nothing Phone 2', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/2 Nothing Phone (2) White.webp' },
    { name: 'Nothing Phone 2a', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 Nothing Phone (2a) W.jpg' },
    { name: 'Nothing Phone 2a Plus', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/4 Nothing Phone (2a) Plus Metallic Grey.jpg' },
    { name: 'Nothing Phone 3a', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) White.jpg' },
    { name: 'Nothing Phone 3a Pro', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/6 Nothing Phone (3a) Pro Grey.jpg' }
  ]
}


export const models_variant = {
  'nothing': [
    { name: 'Nothing Phone 1', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/1 Nothing Phone 1 Black.webp' }, { name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/1 Nothing Phone (1) white.png' }] },
    { name: 'Nothing Phone 2', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/2 Nothing Phone (2) black.webp' }, { name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/2 Nothing Phone (2) White.webp' }] },
    { name: 'Nothing Phone 2a', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3_Nothing Phone_2a_b.jpg ' }, { name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 Nothing Phone (2a) W.jpg' }, { name: 'Blue (India-exclusive)', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 Nothing-Phone-2a-Blue.jpg' }, { name: 'Special Edition', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 nothing phone 2a special.jpg' }] },
    { name: 'Nothing Phone 2a Plus', variants: [{ name: 'Metallic Grey', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/4 Nothing Phone (2a) Plus Metallic Grey.jpg' }, { name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/4 Nothing-Phone-2a-Plus-256GB-Black.webp' }] },
    { name: 'Nothing Phone 3a', variants: [{ name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) White.jpg' }, { name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) Black.jpg' }, { name: 'Blue', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) Blue.webp' }] },
    { name: 'Nothing Phone 3a Pro', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/6 Nothing Phone (3A) Pro 5G Black.jpg' }, { name: 'Grey', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/6 Nothing Phone (3a) Pro Grey.jpg' }] }
  ],
  'iphone': [
    { name: 'Nothing Phone 1', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/1 Nothing Phone 1 Black.webp' }, { name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/1 Nothing Phone (1) white.png' }] },
    { name: 'Nothing Phone 2', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/2 Nothing Phone (2) black.webp' }, { name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/2 Nothing Phone (2) White.webp' }] },
    { name: 'Nothing Phone 2a', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3_Nothing Phone_2a_b.jpg ' }, { name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 Nothing Phone (2a) W.jpg' }, { name: 'Blue (India-exclusive)', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 Nothing-Phone-2a-Blue.jpg' }, { name: 'Special Edition', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/3 nothing phone 2a special.jpg' }] },
    { name: 'Nothing Phone 2a Plus', variants: [{ name: 'Metallic Grey', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/4 Nothing Phone (2a) Plus Metallic Grey.jpg' }, { name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/4 Nothing-Phone-2a-Plus-256GB-Black.webp' }] },
    { name: 'Nothing Phone 3a', variants: [{ name: 'White', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) White.jpg' }, { name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) Black.jpg' }, { name: 'Blue', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/5 Nothing Phone (3a) Blue.webp' }] },
    { name: 'Nothing Phone 3a Pro', variants: [{ name: 'Black', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/6 Nothing Phone (3A) Pro 5G Black.jpg' }, { name: 'Grey', image: 'https://cdn.jsdelivr.net/gh/Lets-Repair2025/smartphone-brands/smart-phones-brands/nothing/models/6 Nothing Phone (3a) Pro Grey.jpg' }] }
  ]
}

export const services = {
  'services': [
    { name:'Touchscreen', image:'https://i5.walmartimages.com/asr/5cd2bdf6-855e-4529-b112-1400002bb87d.d9baeef3c2bb8d1988ceb55d435ec84d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
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
}