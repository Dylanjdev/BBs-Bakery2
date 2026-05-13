import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faBreadSlice,
  faBurger,
  faUtensils,
  faBolt,
  faGlassWater,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';
import '../menu.css';
import '../cart.css';
import { getApiBaseUrl } from '../lib/apiBaseUrl';
import { isMenuItemUnavailableToday, loadDailyUnavailableMap } from '../lib/menuAvailability';
import { squareVariationMap } from '../data/squareVariationMap';

const API_BASE_URL = getApiBaseUrl();
const ORDERABLE_SECTION_TITLES = new Set(['Breakfast', 'Lunch', 'Pre-Orders']);

const specialOfDay = [
  'Sunday – Closed',
  'Monday – Croissants',
  'Tuesday – $10 Coffee Cake & Small/Medium Coffee (Hot or Iced)',
  'Wednesday – Danishes',
  'Thursday – $7 Frappee',
  'Friday – Quiche Day',
  "Saturday – Baker's Choice",
];

const sections = [
  {
    title: 'Bakery Items',
    special: true,
    note: '*selection varies daily*',
    items: [
      { name: 'Muffins', description: 'flour + butter + eggs + sugar + fruit variety', fallbackAmount: 400 },
      { name: 'Brownies', description: 'flour + cocoa powder + eggs + sugar + milk', fallbackAmount: 350 },
      { name: 'Scones', description: 'flour + butter + eggs + buttermilk + fruit variety/savory', fallbackAmount: 400 },
      { name: 'Cinnamon Rolls', description: 'flour + butter + milk + eggs + yeast + cinnamon + sugar + cream cheese', fallbackAmount: 500 },
      {
        name: 'Croissants',
        description: 'flour + milk + butter + salt + yeast',
        fallbackAmount: 400,
        suffix: '/$5.00',
      },
      { name: 'Mini loaf', description: 'flour + butter + eggs + sugar + fruit variety', fallbackAmount: 400 },
      { name: 'Mini Bundts', description: 'flour + sugar + milk + eggs + variety', fallbackAmount: 500 },
      { name: 'Danish', description: 'flour + butter + cream cheese + eggs + fruit variety', fallbackAmount: 350 },
      { name: 'Pastry', description: 'flour + butter + sweet/savory filling variety', fallbackAmount: 500 },
      { name: 'Specialty Buns', description: 'flour + milk + butter + eggs + yeast + sweet/savory variety', fallbackAmount: 500 },
      { name: 'Donuts – Glazed or Powdered', description: 'flour + sugar + yeast + butter + milk + glazed or powdered sugar', fallbackAmount: 250 },
      { name: 'Donuts – Chocolate Glazed', description: 'flour + sugar + yeast + butter + milk + chocolate glaze', fallbackAmount: 300 },
      { name: 'Donuts – Specialty', description: 'flour + sugar + yeast + butter + milk + specialty topping variety', fallbackAmount: 300 },
      { name: 'Cupcakes', description: 'flour + butter + eggs + sugar + frosting variety', fallbackAmount: 350 },
    ],
  },
  {
    title: 'Breakfast',
    items: [
      {
        name: 'Breakfast Biscuit',
        description: 'choice of protein + cheese + two eggs',
        fallbackAmount: 550,
        proteinOptions: ['Bacon', 'Sausage', 'Ham'],
      },
      {
        name: 'Breakfast Sandwich',
        description: 'choice of protein + cheese + two eggs + choice of bagel or croissant',
        fallbackAmount: 700,
        proteinOptions: ['Bacon', 'Sausage', 'Ham'],
      },
      {
        name: 'Breakfast Wrap',
        description: 'choice of protein + cheese + three eggs',
        fallbackAmount: 800,
        proteinOptions: ['Bacon', 'Sausage', 'Ham'],
      },
    ],
  },
  {
    title: 'Lunch',
    items: [
      {
        name: "BB's Signature Grilled Cheese",
        lookupName: 'Grilled Cheese',
        description: 'cheddar + muenster on a flaky croissant',
        fallbackAmount: 500,
      },
      {
        name: "BB's Buttery BLT",
        lookupName: 'BLT',
        description: 'crispy bacon + lettuce + tomato + mayo on a buttery croissant',
        fallbackAmount: 550,
      },
      {
        name: 'Chicken Salad Croissant',
        description: 'housemade chicken salad + lettuce + tomato + pickles on a flaky croissant',
        fallbackAmount: 600,
      },
      {
        name: "BB's Croissant Club",
        lookupName: 'Croissant Club',
        description: 'turkey + bacon + american + lettuce + tomato + pickles + mayo on a flaky croissant',
        fallbackAmount: 700,
      },
      {
        name: 'Italian Wrap',
        description: 'ham + salami + pepperoni + provolone + lettuce + tomato + oil + vinegar',
        fallbackAmount: 800,
      },
      {
        name: 'Buffalo Chicken Wrap',
        description: 'slow roasted chicken + buffalo sauce + pepperjack cheese + lettuce + tomato',
        fallbackAmount: 800,
      },
    ],
  },
  {
    title: 'Loaded Energy',
    note: '32 oz • $8.00',
    items: [
      {
        name: 'Tater Colada',
        lookupName: 'Tater Colada (32 oz)',
        description: 'energy + blue raspberry + coconut + vanilla + lemonade',
        fallbackAmount: 800,
      },
      {
        name: 'Blushing Belle',
        lookupName: 'Blushing Belle (32 oz)',
        description: 'energy + peach + raspberry + vanilla + grenadine + lemonade',
        fallbackAmount: 800,
      },
      {
        name: 'Rip-Tide',
        lookupName: 'Rip-Tide (32 oz)',
        description: 'energy + dragonfruit + pomegranate + blue curacao + lemonade',
        fallbackAmount: 800,
      },
      {
        name: 'Wrecking Ball',
        lookupName: 'Wrecking Ball (32 oz)',
        description: 'energy + blackberry + raspberry + vanilla bean + sours',
        fallbackAmount: 800,
      },
      {
        name: 'Fruit Roll-Up',
        lookupName: 'Fruit Roll-Up (32 oz)',
        description: 'energy + grenadine + pomegranate + strawberry + sours',
        fallbackAmount: 800,
      },
      {
        name: "BB's Fav",
        lookupName: "BB's Fav (32 oz)",
        description: 'energy + vanilla + blue raspberry + cold foam',
        fallbackAmount: 800,
      },
      {
        name: "Honey's Tropical Tumble",
        lookupName: "Honey's Tropical Tumble (32 oz)",
        description: 'energy + strawberry + banana + pineapple + sours',
        fallbackAmount: 800,
      },
      {
        name: "Smokin' Ash",
        lookupName: "Smokin' Ash (32 oz)",
        description: 'energy + blackberry + lime + lemonade',
        fallbackAmount: 800,
      },
      {
        name: "Oatie's Moonbeam",
        lookupName: "Oatie's Moonbeam (32 oz)",
        description: 'energy + blue raspberry + lavender + almond + vanilla + sweet cream',
        fallbackAmount: 800,
      },
      {
        name: "Rip 'n' Dragon",
        lookupName: "Rip 'n' Dragon (32 oz)",
        description: 'energy + dragon fruit + pomegranate + passion fruit + lemonade',
        fallbackAmount: 800,
      },
      {
        name: 'Sherbert Spark',
        lookupName: 'Sherbert Spark (32 oz)',
        description: 'energy + raspberry + orange + lime + cream',
        fallbackAmount: 800,
      },
    ],
  },
  {
    title: 'Specialty Coffee',
    note: 'Pricing & Sizes',
    items: [
      { name: 'Tiramisu', lookupName: 'Tiramisu (20 oz)', description: 'mocha + espresso + cream cheese mixture + cold foam + chocolate drizzle', fallbackAmount: 650 },
      { name: 'Cookies & Cream', lookupName: 'Cookies & Cream (20 oz)', description: 'white chocolate vanilla + espresso + oreo cream mixture + chocolate drizzle', fallbackAmount: 650 },
      { name: "Smore's", lookupName: "Smore's (20 oz)", description: 'mocha + espresso + brown sugar + marshmallow fluff mixture + chocolate drizzle', fallbackAmount: 650 },
      { name: 'White Chocolate Raspberry', lookupName: 'White Chocolate Raspberry (20 oz)', description: 'white chocolate + espresso + raspberry cold foam', fallbackAmount: 650 },
      { name: 'Caramel Kolb', lookupName: 'Caramel Kolb (20 oz)', description: 'caramel base + espresso + brown sugar + cookie mixture + caramel drizzle', fallbackAmount: 650 },
      { name: 'Conor McGregor', lookupName: 'Conor McGregor (20 oz)', description: 'caramel + espresso + irish cream + brown sugar', fallbackAmount: 650 },
      { name: 'Blackstone', lookupName: 'Blackstone (20 oz)', description: 'vanilla + caramel + brown sugar + espresso', fallbackAmount: 650 },
      { name: 'Caramel Fluff', lookupName: 'Caramel Fluff (20 oz)', description: 'espresso + caramel drizzle + cheesecake + marshmallow', fallbackAmount: 650 },
      { name: 'Caramel Toast Crunch', lookupName: 'Caramel Toast Crunch (20 oz)', description: 'espresso + caramel + brown sugar, CTC powder + caramel drizzle', fallbackAmount: 650 },
      { name: 'White Nut', lookupName: 'White Nut (20 oz)', description: 'espresso + almond milk + vanilla + white chocolate drizzle', fallbackAmount: 650 },
      { name: 'Mocha Nut', lookupName: 'Mocha Nut (20 oz)', description: 'coconut mocha + espresso + almond milk + chocolate drizzle', fallbackAmount: 650 },
    ],
  },
  {
    title: 'Classic Espresso',
    items: [
      { name: 'Americano', description: 'espresso + hot water', fallbackAmount: 400 },
      { name: 'Cappuccino', description: 'espresso + steamed milk + foam', fallbackAmount: 450 },
      { name: 'Cortado', description: 'espresso + equal parts steamed milk', fallbackAmount: 450 },
    ],
  },
  {
    title: 'Iced Latte',
    items: [
      { name: 'Iced Latte (Small)', lookupName: 'Iced Latte (16 oz)', description: 'espresso + cold milk + ice', fallbackAmount: 550 },
      { name: 'Iced Latte (Medium)', lookupName: 'Iced Latte (20 oz)', description: 'espresso + cold milk + ice', fallbackAmount: 650 },
      { name: 'Iced Latte (Large)', lookupName: 'Iced Latte (32 oz)', description: 'espresso + cold milk + ice', fallbackAmount: 750 },
    ],
  },
  {
    title: 'Hot Latte',
    items: [
      { name: 'Hot Latte (Medium)', lookupName: 'Hot Latte (12 oz)', description: 'espresso + steamed milk', fallbackAmount: 500 },
      { name: 'Hot Latte (Large)', lookupName: 'Hot Latte (20 oz)', description: 'espresso + steamed milk', fallbackAmount: 600 },
    ],
  },
  {
    title: 'Frappes',
    items: [
      { name: 'Frappe (Small)', lookupName: 'Frappe (16 oz)', description: 'blended espresso + ice + milk', fallbackAmount: 600 },
      { name: 'Frappe (Medium)', lookupName: 'Frappe (20 oz)', description: 'blended espresso + ice + milk', fallbackAmount: 700 },
      { name: 'Frappe (Large)', lookupName: 'Frappe (32 oz)', description: 'blended espresso + ice + milk', fallbackAmount: 800 },
    ],
  },
  {
    title: 'Dirty Sodas',
    note: 'Pricing & Sizes',
    pricingLines: ['Small - $4', 'Medium - $5', 'Large - $6'],
    items: [
      {
        name: 'Berries & Cream',
        description: 'Dr Pepper base + marshmallow cream + blackberry',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'The OG',
        description: 'Dr Pepper base + lime + coconut + cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Sugar Spun',
        description: 'Sprite base + cotton candy + raspberry + marshmallow cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Silver Lining',
        description: 'Diet Coke base + marshmallow cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Dole Whip',
        description: 'Mello Yello base + pineapple juice + coconut + cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Purple Rain',
        description: 'Sprite base + blueberry + lavender + cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Dreamsicle',
        description: 'Orange soda base + vanilla + cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'The Glen CoCo',
        description: 'Mello yello base + green apple + blue raspberry + coconut cream + cold foam',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Toasted Float',
        description: 'diet Dr Pepper base + vanilla salt + white chocolate + marshmallow + cherry cold foam',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: "Ace's Butterbeer",
        description: 'Dr Pepper base + caramel + butter pecan + maple cold foam',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Frosted Lime',
        description: 'Sprite base + lime + white chocolate + sweet cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Peachy Cream',
        description: 'Dr Pepper base + peach vanilla + sweet cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
      {
        name: 'Cherry Dream',
        description: 'Diet Coke base + cherry + vanilla + sweet cream',
        fallbackAmount: 400,
        sizeOptions: [
          { label: 'Small', amount: 400, variationId: '3GGVCBOKAP2OYDA3U7ZZ4VW6' },
          { label: 'Medium', amount: 500, variationId: 'GJMCXRXSWLH3KAST5F4NXPNJ' },
          { label: 'Large', amount: 600, variationId: 'W7ZHSZ623DO2MOAWLV4BG6EN' },
        ],
      },
    ],
  },
  {
    title: 'Smoothies',
    note: 'Pricing & Sizes',
    pricingLines: ['small $6', 'medium $7', 'large $8'],
    items: [
      {
        name: 'Strawberry Fields',
        description: 'strawberry + banana',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
      {
        name: 'Blueberry Bliss',
        description: 'blueberry + banana',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
      {
        name: 'Mango Tango',
        description: 'mango + lemon',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
      {
        name: 'Dragon Glow',
        description: 'dragonfruit + mango',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
      {
        name: 'Pink Dragon',
        description: 'strawberry + dragon fruit',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
      {
        name: 'Summer Sunset',
        description: 'mango + strawberry + raspberry',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
      {
        name: 'Berry Blues',
        description: 'blackberry + blueberry + raspberry',
        fallbackAmount: 600,
        sizeOptions: [
          { label: 'Small', amount: 600, variationId: '6QDMXT5RCKYZ7Q6TO2HD7OBW' },
          { label: 'Medium', amount: 700, variationId: 'KTBW6ZA5LMDCLOHPO4647RVV' },
          { label: 'Large', amount: 800, variationId: 'NZQVES73UOE5XGCFDABWEQQE' },
        ],
      },
    ],
  },
  {
    title: 'Pre-Orders',
    preOrder: true,
    note: 'Ongoing weekly pre-orders • Order by Saturday 6:00 PM for Tuesday pickup',
    items: [
      {
        name: 'White Sandwich Bread',
        lookupName: 'White Bread',
        description: 'freshly baked white sandwich bread loaf',
        fallbackAmount: 600,
      },
      {
        name: 'Cinnamon Raisin Bread',
        description: 'freshly baked cinnamon raisin bread loaf',
        fallbackAmount: 700,
      },
      {
        name: 'Cheddar Jalapeño Bread',
        lookupName: 'Cheddar Jalopeno bread',
        description: 'freshly baked cheddar jalapeño bread loaf',
        fallbackAmount: 700,
      },
    ],
  },
];

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const isWithinPreOrderWindow = (date = new Date()) => {
  const day = date.getDay();
  const minutes = (date.getHours() * 60) + date.getMinutes();
  const saturdayCutoffMinutes = 18 * 60;

  // Weekly pre-orders run Tuesday through Saturday at 5:59 PM.
  if (day === 0 || day === 1) {
    return false;
  }

  if (day === 6) {
    return minutes < saturdayCutoffMinutes;
  }

  return true;
};

const formatPriceLabel = (amount, currency = 'USD') => {
  if (!Number.isFinite(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

const toDisplayName = (itemName, variationName) => {
  if (!variationName || normalize(variationName) === 'regular') {
    return itemName;
  }

  return `${itemName} (${variationName})`;
};

const buildSquareLookup = (squareItems = []) => {
  const lookup = new Map();

  squareItems.forEach((item) => {
    const itemName = item?.name || '';
    const variations = Array.isArray(item?.variations) ? item.variations : [];

    variations.forEach((variation) => {
      if (!Number.isFinite(variation?.priceAmount) || variation.priceAmount <= 0) {
        return;
      }

      const displayName = toDisplayName(itemName, variation.name || 'Regular');
      const data = {
        variationId: variation.id || null,
        amount: variation.priceAmount,
        currency: variation.currency || 'USD',
        visible: item?.visible !== false,
      };

      lookup.set(normalize(displayName), data);
      lookup.set(normalize(itemName), data);
    });
  });

  return lookup;
};

const Menu = ({ onAddToCart, orderingStatus }) => {
  const [squareItems, setSquareItems] = useState([]);
  const [squareLookup, setSquareLookup] = useState(new Map());
  const [error, setError] = useState('');
  const [selectedProteins, setSelectedProteins] = useState({});
  const [dailyUnavailableMap, setDailyUnavailableMap] = useState(() => loadDailyUnavailableMap());
  const [isPreOrderWindowOpen, setIsPreOrderWindowOpen] = useState(() => isWithinPreOrderWindow());

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key) {
        setDailyUnavailableMap(loadDailyUnavailableMap());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu?includeHidden=true`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load menu');
        }

        if (isMounted) {
          setSquareItems(data?.items || []);
          setSquareLookup(buildSquareLookup(data?.items || []));
          setError('');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Failed to load live prices from Square');
        }
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const syncWindowState = () => {
      setIsPreOrderWindowOpen(isWithinPreOrderWindow());
    };

    const intervalId = window.setInterval(syncWindowState, 60_000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const enrichedSections = useMemo(
    () => {
      const lockedCuratedSections = new Set(['Bakery Items', 'Breakfast', 'Lunch', 'Loaded Energy', 'Specialty Coffee', 'Classic Espresso', 'Iced Latte', 'Hot Latte', 'Frappes', 'Dirty Sodas', 'Smoothies', 'Pre-Orders']);
      const curatedNames = new Set(
        sections.flatMap((section) =>
          section.items.flatMap((item) => [
            normalize(item.lookupName || item.name),
            normalize(item.name),
          ]),
        ),
      );

      const extrasBySection = new Map();
      squareItems.forEach((squareItem) => {
        if (squareItem?.visible === false) {
          return;
        }

        const itemName = squareItem?.name || '';
        const targetSection = sections.some((section) => section.title === squareItem?.section)
          ? squareItem.section
          : 'Bakery Items';
        if (lockedCuratedSections.has(targetSection)) {
          return;
        }
        const variations = Array.isArray(squareItem?.variations) ? squareItem.variations : [];

        variations.forEach((variation) => {
          if (!Number.isFinite(variation?.priceAmount) || variation.priceAmount <= 0) {
            return;
          }

          const displayName = toDisplayName(itemName, variation.name || 'Regular');
          const normalizedDisplayName = normalize(displayName);
          if (curatedNames.has(normalizedDisplayName)) {
            return;
          }

          const existing = extrasBySection.get(targetSection) || [];
          existing.push({
            name: displayName,
            description: squareItem?.description || 'Freshly prepared.',
            amount: variation.priceAmount,
            variationId: variation?.id || null,
            isOnlineOrderable: ORDERABLE_SECTION_TITLES.has(targetSection),
            visible: true,
            isUnavailableToday: isMenuItemUnavailableToday(displayName, dailyUnavailableMap),
            label: formatPriceLabel(variation.priceAmount, variation.currency || 'USD'),
          });
          extrasBySection.set(targetSection, existing);
          curatedNames.add(normalizedDisplayName);
        });
      });

      return sections
        .map((section) => ({
          ...section,
          items: [
            ...section.items
              .map((item) => {
              const keepCuratedVisible = lockedCuratedSections.has(section.title);
              const lookupKey = normalize(item.lookupName || item.name);
              const live = squareLookup.get(lookupKey);
              const amount = live?.amount ?? item.fallbackAmount;
              const currency = live?.currency || 'USD';
              const fallbackVariationId =
                squareVariationMap[item.lookupName || item.name]
                || squareVariationMap[item.name]
                || null;

              return {
                ...item,
                amount,
                isPreOrder: section.preOrder === true,
                variationId: live?.variationId || fallbackVariationId,
                isOnlineOrderable: ORDERABLE_SECTION_TITLES.has(section.title),
                visible: keepCuratedVisible ? true : live?.visible !== false,
                isUnavailableToday:
                  isMenuItemUnavailableToday(item.lookupName, dailyUnavailableMap)
                  || isMenuItemUnavailableToday(item.name, dailyUnavailableMap),
                label: `${formatPriceLabel(amount, currency)}${item.suffix || ''}`,
              };
            })
            .filter((item) => item.visible),
            ...(extrasBySection.get(section.title) || []),
          ],
        }))
        .filter((section) => section.items.length > 0);
    },
    [squareLookup, squareItems, dailyUnavailableMap],
  );

  const handleAddToCart = (item) => {
    if (!item?.isOnlineOrderable) {
      return;
    }

    if (item?.isPreOrder && !isPreOrderWindowOpen) {
      return;
    }

    if (item.isUnavailableToday) {
      return;
    }

    const itemKey = item.lookupName || item.name;
    const selectedSizeOption = item.sizeOptions?.length
      ? item.sizeOptions[0]
      : null;
    const selectedProtein = item.proteinOptions?.length
      ? selectedProteins[itemKey] || item.proteinOptions[0]
      : null;
    const resolvedVariationId = selectedSizeOption?.variationId || item.variationId;

    if (!resolvedVariationId) {
      return;
    }

    onAddToCart({
      name: selectedProtein
        ? `${item.name} (${selectedProtein})`
        : selectedSizeOption
          ? `${item.name} (${selectedSizeOption.label})`
          : item.name,
      amount: selectedSizeOption?.amount ?? item.amount,
      label: selectedSizeOption ? formatPriceLabel(selectedSizeOption.amount) : item.label,
      variationId: resolvedVariationId,
      note: selectedProtein ? `Protein: ${selectedProtein}` : '',
      isUnavailableToday: item.isUnavailableToday,
    });
  };

  const handleProteinChange = (item, value) => {
    const itemKey = item.lookupName || item.name;
    setSelectedProteins((current) => ({
      ...current,
      [itemKey]: value,
    }));
  };

  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-heading">
      {!orderingStatus?.isOrderingAllowed && (
        <div
          style={{
            background: 'linear-gradient(135deg, #ffe6ec 0%, #fff0f7 100%)',
            border: '2px solid #d65a8c',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(214, 90, 140, 0.15)',
          }}
        >
          <p
            style={{
              margin: '0',
              fontSize: '1.05rem',
              fontWeight: '600',
              color: '#d65a8c',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            ⏰ Ordering Currently Closed
          </p>
          <p
            style={{
              margin: '0.75rem 0 0 0',
              fontSize: '0.95rem',
              color: '#666',
            }}
          >
            {orderingStatus?.message || 'Orders are not available at this time.'}
          </p>
        </div>
      )}

      <header className="menu-header">
        <h2 id="menu-heading">Our Menu</h2>
        <p className="tagline">Bringing the best bites to your day</p>
      </header>

      <div className="menu-divider" />

      {error ? (
        <p style={{ textAlign: 'center', color: '#d65a8c', marginBottom: '1.5rem' }}>
          Live Square sync is temporarily unavailable. Showing fallback menu pricing.
        </p>
      ) : null}

      {enrichedSections.map((section) => {
        const simpleSheetSectionConfig = {
          'Classic Espresso': {
            icon: faMugHot,
            listAriaLabel: 'Classic espresso items',
          },
          'Iced Latte': {
            icon: faGlassWater,
            listAriaLabel: 'Iced latte items',
          },
          'Hot Latte': {
            icon: faMugHot,
            listAriaLabel: 'Hot latte items',
          },
          Frappes: {
            icon: faGlassWater,
            listAriaLabel: 'Frappes items',
          },
        };

        const isBakerySection = section.title === 'Bakery Items';
        const isBreakfastSection = section.title === 'Breakfast';
        const isLunchSection = section.title === 'Lunch';
        const isLoadedEnergySection = section.title === 'Loaded Energy';
        const isDirtySodasSection = section.title === 'Dirty Sodas';
        const isSmoothiesSection = section.title === 'Smoothies';
        const isSpecialtyCoffeeSection = section.title === 'Specialty Coffee';
        const isPreOrdersSection = section.title === 'Pre-Orders';
        const simpleSheetSection = simpleSheetSectionConfig[section.title];

        if (isBakerySection) {
          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faBreadSlice} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <h3 className="bakery-heading">{section.title}</h3>
                {section.note ? <p className="bakery-note">{section.note}</p> : null}

                <div className="bakery-grid" role="list" aria-label="Bakery items">
                  {section.items.map((item, itemIndex) => (
                    <div
                      className="bakery-item"
                      role="listitem"
                      key={`${section.title}-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                    >
                      <div className="bakery-item__text">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <div className="bakery-item__actions">
                        {item.isUnavailableToday ? (
                          <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                            Unavailable Today
                          </span>
                        ) : null}
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                          disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (isBreakfastSection) {
          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel breakfast-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faBurger} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <h3 className="bakery-heading">{section.title}</h3>

                <div className="breakfast-list" role="list" aria-label="Breakfast items">
                  {section.items.map((item, itemIndex) => (
                    <div
                      className="breakfast-item"
                      role="listitem"
                      key={`${section.title}-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                    >
                      <div className="breakfast-item__text">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <div className="breakfast-item__actions">
                        {item.proteinOptions?.length ? (
                          <select
                            className="protein-select"
                            value={selectedProteins[item.lookupName || item.name] || item.proteinOptions[0]}
                            onChange={(event) => handleProteinChange(item, event.target.value)}
                            aria-label={`Choose protein for ${item.name}`}
                            disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                          >
                            {item.proteinOptions.map((protein) => (
                              <option key={`${item.name}-${protein}`} value={protein}>
                                {protein}
                              </option>
                            ))}
                          </select>
                        ) : null}
                        {item.isUnavailableToday ? (
                          <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                            Unavailable Today
                          </span>
                        ) : null}
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                          disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (isLunchSection) {
          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel breakfast-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faUtensils} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <h3 className="bakery-heading">{section.title}</h3>

                <div className="breakfast-list" role="list" aria-label="Lunch items">
                  {section.items.map((item, itemIndex) => (
                    <div
                      className="breakfast-item"
                      role="listitem"
                      key={`${section.title}-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                    >
                      <div className="breakfast-item__text">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <div className="breakfast-item__actions">
                        {item.isUnavailableToday ? (
                          <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                            Unavailable Today
                          </span>
                        ) : null}
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                          disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (simpleSheetSection) {
          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel breakfast-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={simpleSheetSection.icon} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <h3 className="bakery-heading">{section.title}</h3>

                <div className="breakfast-list" role="list" aria-label={simpleSheetSection.listAriaLabel}>
                  {section.items.map((item, itemIndex) => (
                    <div
                      className="breakfast-item"
                      role="listitem"
                      key={`${section.title}-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                    >
                      <div className="breakfast-item__text">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <div className="breakfast-item__actions">
                        {item.isUnavailableToday ? (
                          <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                            Unavailable Today
                          </span>
                        ) : null}
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                          disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (isLoadedEnergySection) {
          const midpoint = Math.ceil(section.items.length / 2);
          const leftColumnItems = section.items.slice(0, midpoint);
          const rightColumnItems = section.items.slice(midpoint);

          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel coffee-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faBolt} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <div className="coffee-header-row">
                  <h3 className="bakery-heading">{section.title}</h3>
                  <div className="coffee-pricing-card" aria-label="Loaded energy size and price">
                    <p>{section.note}</p>
                  </div>
                </div>

                <div className="coffee-grid" role="list" aria-label="Loaded energy items">
                  <div className="coffee-list-column">
                    {leftColumnItems.map((item, itemIndex) => (
                      <div
                        className="coffee-item"
                        role="listitem"
                        key={`${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                      >
                        <div className="coffee-item__text">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                        <div className="coffee-item__actions">
                          {item.isUnavailableToday ? (
                            <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                              Unavailable Today
                            </span>
                          ) : null}
                          <button
                            className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                            onClick={() => handleAddToCart(item)}
                            aria-label={`Add ${item.name} to cart`}
                            disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) => (
                      <div
                        className="coffee-item"
                        role="listitem"
                        key={`${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                      >
                        <div className="coffee-item__text">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                        <div className="coffee-item__actions">
                          {item.isUnavailableToday ? (
                            <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                              Unavailable Today
                            </span>
                          ) : null}
                          <button
                            className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                            onClick={() => handleAddToCart(item)}
                            aria-label={`Add ${item.name} to cart`}
                            disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (isDirtySodasSection) {
          const midpoint = Math.ceil(section.items.length / 2);
          const leftColumnItems = section.items.slice(0, midpoint);
          const rightColumnItems = section.items.slice(midpoint);

          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel coffee-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faGlassWater} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <div className="coffee-header-row">
                  <h3 className="bakery-heading">{section.title}</h3>
                  <div className="coffee-pricing-card" aria-label="Dirty soda pricing and sizes">
                    {section.pricingLines?.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>
                <div className="coffee-grid" role="list" aria-label="Dirty soda items">
                  <div className="coffee-list-column">
                    {leftColumnItems.map((item, itemIndex) => {
                      const selectedSizeOption = item.sizeOptions?.[0];

                      return (
                        <div
                          className="coffee-item"
                          role="listitem"
                          key={`${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                        >
                          <div className="coffee-item__text">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                          </div>
                          <div className="coffee-item__actions">
                            {item.isUnavailableToday ? (
                              <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                                Unavailable Today
                              </span>
                            ) : null}
                            <span className="price">{formatPriceLabel(selectedSizeOption?.amount ?? item.fallbackAmount)}</span>
                            <button
                              className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                              onClick={() => handleAddToCart(item)}
                              aria-label={`Add ${item.name} to cart`}
                              disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) => {
                      const selectedSizeOption = item.sizeOptions?.[0];

                      return (
                        <div
                          className="coffee-item"
                          role="listitem"
                          key={`${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                        >
                          <div className="coffee-item__text">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                          </div>
                          <div className="coffee-item__actions">
                            {item.isUnavailableToday ? (
                              <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                                Unavailable Today
                              </span>
                            ) : null}
                            <span className="price">{formatPriceLabel(selectedSizeOption?.amount ?? item.fallbackAmount)}</span>
                            <button
                              className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                              onClick={() => handleAddToCart(item)}
                              aria-label={`Add ${item.name} to cart`}
                              disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (isSmoothiesSection) {
          const midpoint = Math.ceil(section.items.length / 2);
          const leftColumnItems = section.items.slice(0, midpoint);
          const rightColumnItems = section.items.slice(midpoint);

          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel coffee-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faGlassWater} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <div className="coffee-header-row">
                  <h3 className="bakery-heading">{section.title}</h3>
                  <div className="coffee-pricing-card" aria-label="Smoothie pricing and sizes">
                    {section.pricingLines?.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>

                <div className="coffee-grid" role="list" aria-label="Smoothie items">
                  <div className="coffee-list-column">
                    {leftColumnItems.map((item, itemIndex) => {
                      const selectedSizeOption = item.sizeOptions?.[0];

                      return (
                        <div
                          className="coffee-item"
                          role="listitem"
                          key={`${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                        >
                          <div className="coffee-item__text">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                          </div>
                          <div className="coffee-item__actions">
                            {item.isUnavailableToday ? (
                              <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                                Unavailable Today
                              </span>
                            ) : null}
                            <span className="price">{formatPriceLabel(selectedSizeOption?.amount ?? item.fallbackAmount)}</span>
                            <button
                              className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                              onClick={() => handleAddToCart(item)}
                              aria-label={`Add ${item.name} to cart`}
                              disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) => {
                      const selectedSizeOption = item.sizeOptions?.[0];

                      return (
                        <div
                          className="coffee-item"
                          role="listitem"
                          key={`${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                        >
                          <div className="coffee-item__text">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                          </div>
                          <div className="coffee-item__actions">
                            {item.isUnavailableToday ? (
                              <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                                Unavailable Today
                              </span>
                            ) : null}
                            <span className="price">{formatPriceLabel(selectedSizeOption?.amount ?? item.fallbackAmount)}</span>
                            <button
                              className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                              onClick={() => handleAddToCart(item)}
                              aria-label={`Add ${item.name} to cart`}
                              disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (isSpecialtyCoffeeSection) {
          const midpoint = Math.ceil(section.items.length / 2);
          const leftColumnItems = section.items.slice(0, midpoint);
          const rightColumnItems = section.items.slice(midpoint);

          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel coffee-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faMugHot} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <div className="coffee-header-row">
                  <h3 className="bakery-heading">{section.title}</h3>
                  <div className="coffee-pricing-card" aria-label="Specialty coffee pricing and sizes">
                    <p>{section.note}</p>
                    <span>12 oz- $5.50</span>
                    <span>20 oz- $6.50</span>
                    <span>32 oz- $7.50</span>
                  </div>
                </div>

                <div className="coffee-grid" role="list" aria-label="Specialty coffee items">
                  <div className="coffee-list-column">
                    {leftColumnItems.map((item, itemIndex) => (
                      <div
                        className="coffee-item"
                        role="listitem"
                        key={`${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                      >
                        <div className="coffee-item__text">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                        <div className="coffee-item__actions">
                          {item.isUnavailableToday ? (
                            <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                              Unavailable Today
                            </span>
                          ) : null}
                          <button
                            className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                            onClick={() => handleAddToCart(item)}
                            aria-label={`Add ${item.name} to cart`}
                            disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) => (
                      <div
                        className="coffee-item"
                        role="listitem"
                        key={`${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                      >
                        <div className="coffee-item__text">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                        <div className="coffee-item__actions">
                          {item.isUnavailableToday ? (
                            <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                              Unavailable Today
                            </span>
                          ) : null}
                          <button
                            className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                            onClick={() => handleAddToCart(item)}
                            aria-label={`Add ${item.name} to cart`}
                            disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (isPreOrdersSection) {
          return (
            <div className="menu-content bakery-layout" key={section.title}>
              <div className="menu-column bakery-panel breakfast-panel">
                <div className="bakery-branding">
                  <FontAwesomeIcon icon={faBreadSlice} className="bakery-branding__icon" aria-hidden="true" />
                  <div>
                    <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                    <p className="bakery-branding__tagline">Bringing the best bites to your day</p>
                  </div>
                </div>

                <div className="menu-divider bakery-divider" />

                <h3 className="bakery-heading">{section.title}</h3>

                <div
                  style={{
                    background: isPreOrderWindowOpen
                      ? 'linear-gradient(135deg, #e6f9ef 0%, #f0fff6 100%)'
                      : 'linear-gradient(135deg, #fff4e6 0%, #fff9f0 100%)',
                    border: isPreOrderWindowOpen ? '2px solid #3aab6e' : '2px solid #d4a84b',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: isPreOrderWindowOpen ? '#1e7a49' : '#a0700a',
                      fontFamily: 'Playfair Display, serif',
                    }}
                  >
                    {isPreOrderWindowOpen
                      ? '✅ Pre-order window is open'
                      : '⏳ Pre-orders open Tuesday and close Saturday at 6:00 PM'}
                  </p>
                  <p style={{ margin: '0.4rem 0 0', fontSize: '0.88rem', color: '#555' }}>
                    We accept bread pre-orders every week. Order by <strong>Saturday at 6:00 PM</strong> for <strong>Tuesday pickup</strong>.
                  </p>
                </div>

                <div className="breakfast-list" role="list" aria-label="Pre-order bread items">
                  {section.items.map((item, itemIndex) => (
                    <div
                      className="breakfast-item"
                      role="listitem"
                      key={`${section.title}-${item.name}-${itemIndex}`}
                    >
                      <div className="breakfast-item__text">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <div className="breakfast-item__actions">
                        {!isPreOrderWindowOpen ? (
                          <span className="menu-unavailable-chip" aria-label="Pre-order window closed">
                            Pre-order window closed
                          </span>
                        ) : null}
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                          disabled={!orderingStatus?.isOrderingAllowed || !isPreOrderWindowOpen || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="menu-content" key={section.title}>
            <div className="menu-column">
              <h3>{section.title}</h3>

              {section.special ? (
                <div className="menu-special">
                  <h4>✨ Special of the Day</h4>
                  <ul>
                    {specialOfDay.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {section.items.map((item, itemIndex) => (
                <div
                  className="menu-item"
                  key={`${section.title}-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                >
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="menu-item-actions">
                    {item.proteinOptions?.length ? (
                      <select
                        className="protein-select"
                        value={selectedProteins[item.lookupName || item.name] || item.proteinOptions[0]}
                        onChange={(event) => handleProteinChange(item, event.target.value)}
                        aria-label={`Choose protein for ${item.name}`}
                        disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                      >
                        {item.proteinOptions.map((protein) => (
                          <option key={`${item.name}-${protein}`} value={protein}>
                            {protein}
                          </option>
                        ))}
                      </select>
                    ) : null}
                    {item.isUnavailableToday ? (
                      <span className="menu-unavailable-chip" aria-label={`${item.name} unavailable today`}>
                        Unavailable Today
                      </span>
                    ) : null}
                    <span className="price">{item.label}</span>
                    <button
                      className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable ? undefined : 'none' }}
                      onClick={() => handleAddToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                      disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !(item.sizeOptions?.[0]?.variationId || item.variationId)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              ))}

              {section.note ? (
                <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>{section.note}</p>
              ) : null}
            </div>
          </div>
        );
      })}

      <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
        Please speak with any of our baristas for clarifications over allergens and intolerances.
      </p>
    </section>
  );
};

export default Menu;
