import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faBreadSlice,
  faBurger,
  faUtensils,
  faBolt,
  faCarSide,
  faGlassWater,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';
import '../menu.css';
import '../cart.css';
import { getApiBaseUrl } from '../lib/apiBaseUrl';
import { squareVariationMap } from '../data/squareVariationMap';

const API_BASE_URL = getApiBaseUrl();
const THANKSGIVING_PICKUP_NOTE = 'Thanksgiving pre-order · Pickup November 25 by 2 PM';
const SPECIALTY_COFFEE_PREPARATIONS = [
  {
    key: 'hot',
    label: 'Hot',
    sizeOptions: [
      { key: '12-oz', label: '12 oz', lookupName: 'Hot Latte (Regular)', variationId: 'C2ZYCTDM2RNI7L6Z63TTBPGH', fallbackAmount: 500 },
      { key: '20-oz', label: '20 oz', lookupName: 'Hot Latte (Large)', variationId: 'PYWQNX66A6GAA72SYA4AHQI5', fallbackAmount: 600 },
    ],
  },
  {
    key: 'iced',
    label: 'Iced',
    sizeOptions: [
      { key: '16-oz', label: '16 oz', lookupName: 'Iced Latte (16 oz)', variationId: 'NKI77BCAPTLLGNK5QWHZVHPI', fallbackAmount: 550 },
      { key: '20-oz', label: '20 oz', lookupName: 'Iced Latte (20 oz)', variationId: 'EOYF3LMYIPWE2U2MWZFSWSWL', fallbackAmount: 650 },
      { key: '32-oz', label: '32 oz', lookupName: 'Iced Latte (32 oz)', variationId: 'MSLYGJ2QUQYEUTS2JNCCJFIC', fallbackAmount: 750 },
    ],
  },
  {
    key: 'blended',
    label: 'Blended',
    sizeOptions: [
      { key: '16-oz', label: '16 oz', lookupName: 'Frappe (16 oz)', variationId: '6ISQUXJRZKDF5WW25X5QX4UY', fallbackAmount: 600 },
      { key: '20-oz', label: '20 oz', lookupName: 'Frappe (20 oz)', variationId: 'JKCQECBTKMCPJBGOGTZGNDZO', fallbackAmount: 700 },
      { key: '32-oz', label: '32 oz', lookupName: 'Frappe (32 oz)', variationId: 'T7AMKF6IWJZBUW6TWNL6UYBJ', fallbackAmount: 800 },
    ],
  },
];
const LOADED_ENERGY_SIZE_OPTIONS = [
  { key: '16-oz', label: '16 oz', lookupName: 'Loaded Energy (16 oz)', variationId: 'XBWECXD7PPSVJW4R7CECTFKC', fallbackAmount: 600 },
  { key: '20-oz', label: '20 oz', lookupName: 'Loaded Energy (20 oz)', variationId: 'S4PHLOMKZMYNWHTG64CBLEFO', fallbackAmount: 700 },
  { key: '32-oz', label: '32 oz', lookupName: 'Loaded Energy (32 oz)', variationId: '2CPEPVFU3XXQLC5GS7CGVR2V', fallbackAmount: 800 },
];
const thanksgivingPreOrderItems = [
  {
    name: 'Pumpkin Pie',
    variationId: '25V2R7LMAAQTN5SFQU7TJPAN',
    fallbackAmount: 2500,
  },
  {
    name: 'Carrot Cake',
    description: '8 inch · 3 layers',
    variationId: 'UAXGS4GAP54A4KQQQ3YVN5G3',
    fallbackAmount: 6500,
    preorderOnly: true,
  },
  {
    name: 'Brown Butter Pecan Cake',
    description: '8 inch · 3 layers',
    variationId: '7SUP6N44FVRWKHUDHCM74RTJ',
    fallbackAmount: 6500,
    preorderOnly: true,
  },
  {
    name: 'Pumpkin Pie Cheesecake',
    variationId: 'XCTRTZVC2WW456E24PT57DRY',
    fallbackAmount: 6500,
    preorderOnly: true,
  },
  {
    name: 'Mini Butter Croissants',
    options: [
      { key: 'half-dozen', label: 'Half dozen', variationId: '4MJVXWDXBL3FIS7A6XLA7QNJ', fallbackAmount: 1000 },
      { key: 'dozen', label: 'Dozen', variationId: 'JIRL32DOYUYM42M3BZVH4XPC', fallbackAmount: 1800 },
    ],
  },
  {
    name: 'Cookies',
    flavors: ['Kitchen sink', 'Chocolate chunk', 'Snickerdoodle', 'Oatmeal'],
    options: [
      { key: 'half-dozen', label: 'Half dozen', variationId: 'BOTR62XDUWWRXESSFAXNLYDW', fallbackAmount: 1200 },
      { key: 'dozen', label: 'Dozen', variationId: 'U4JY6NDESFWAFR77SM3RIFWN', fallbackAmount: 2400 },
    ],
  },
];

const sections = [
  {
    title: 'Daily Bakes',
    dailyMenu: true,
    items: [
      { name: 'Blueberry Scones', lookupName: 'Scone (Regular)', variationId: 'B26BFSNNVQMR2LTHWV75JJBH', fallbackAmount: 300 },
      { name: 'Pumpkin Roll Slice', lookupName: 'Pumpkin Roll (roll slice)', variationId: 'TQ7TU26C5LVCIJVCULF5RK7L', fallbackAmount: 300 },
      { name: 'Chocolate Chip Banana Muffins', lookupName: 'Muffin (single)', variationId: 'YATUUQKWZKNHIJAL5PKKXWQH', fallbackAmount: 300 },
      { name: 'Chocolate Chip Cookies', lookupName: 'Cookie (Regular)', variationId: '7WCHB3ZABC72COZYGSSTF2SS', fallbackAmount: 250 },
      { name: 'Ham & Swiss Croissants', lookupName: 'Croissant (specialty)', variationId: 'IU5OOQJJI5XQD3YQ2O7TFAEC', fallbackAmount: 500 },
    ],
  },
  {
    title: 'Tuesday Spotlight Bake',
    dailyMenu: true,
    items: [
      { name: 'Cookie Butter Tres Leches', lookupName: 'Slice Of Cake (tres leches)', variationId: 'CZT35QGKBILYS3FD22RCHYAU', fallbackAmount: 500 },
    ],
  },
  {
    title: 'Wednesday Spotlight Bake',
    dailyMenu: true,
    items: [
      { name: 'Apple Butter Danishes', lookupName: 'Danish (Regular)', variationId: 'NANPTO7A32H2D2STQDXD4CEI', fallbackAmount: 400 },
      { name: 'Cinnamon Rolls', lookupName: 'Cinnamon Roll (Regular)', variationId: '4EVFHDZ3LHYZOXF4EOGMD3JZ', fallbackAmount: 500 },
    ],
  },
  {
    title: 'Thursday Spotlight Bake',
    dailyMenu: true,
    items: [
      { name: 'Little Debbie Christmas Tree Cheesecake Slice', lookupName: 'Slice Of Cake (cheesecake slice)', variationId: 'S3CPM4OGZKJPDIYCEPDLXQVM', fallbackAmount: 600 },
    ],
  },
  {
    title: 'Friday Spotlight Bake',
    dailyMenu: true,
    items: [
      { name: 'Little Debbie Christmas Tree Cheesecake Slice', lookupName: 'Slice Of Cake (cheesecake slice)', variationId: 'S3CPM4OGZKJPDIYCEPDLXQVM', fallbackAmount: 600 },
      { name: 'Sun Dried Tomato & Feta Quiche', lookupName: 'Quiche Slice (single)', variationId: 'BJ6WQGCEQMZV2XAPYNUUH533', fallbackAmount: 350 },
    ],
  },
  {
    title: 'Saturday Spotlight Bake',
    dailyMenu: true,
    items: [
      { name: 'Carrot Cake', lookupName: 'Slice Of Cake (3 layer/specialty)', variationId: 'XDNGFNGIS7L4ZOVUID3XGINS', fallbackAmount: 600 },
    ],
  },
  {
    title: 'Breakfast',
    items: [
      {
        name: 'Breakfast Biscuit',
        description: 'choice of protein + cheese + two eggs',
        fallbackAmount: 500,
        proteinOptions: ['Bacon', 'Sausage', 'Ham'],
      },
      {
        name: 'Breakfast Sandwich',
        description: 'choice of protein + cheese + two eggs + choice of bagel or croissant',
        fallbackAmount: 650,
        proteinOptions: ['Bacon', 'Sausage', 'Ham'],
      },
      {
        name: 'Breakfast Wrap',
        description: 'choice of protein + cheese + three eggs',
        fallbackAmount: 700,
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
    note: 'Choose a size',
    dynamicSizePricing: true,
    sizeOptions: LOADED_ENERGY_SIZE_OPTIONS,
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
    note: 'Available hot, iced, or blended',
    pricingLines: ['Choose your style and size when ordering'],
    items: [
      { name: 'Tiramisu', lookupName: 'Tiramisu (20 oz)', description: 'mocha + espresso + cream cheese mixture + cold foam + chocolate drizzle', fallbackAmount: 650 },
      { name: 'Cookies & Cream', lookupName: 'Cookies & Cream (20 oz)', description: 'white chocolate vanilla + espresso + oreo cream mixture + chocolate drizzle', fallbackAmount: 650 },
      { name: "Smore's", lookupName: "Smore's (20 oz)", description: 'mocha + espresso + brown sugar + marshmallow fluff mixture + chocolate drizzle', fallbackAmount: 650 },
      { name: 'White Chocolate Raspberry', lookupName: 'White Chocolate Raspberry (20 oz)', description: 'white chocolate + espresso + raspberry cold foam', fallbackAmount: 650 },
      { name: 'Caramel Kolb', lookupName: 'Caramel Kolb (20 oz)', description: 'caramel base + espresso + brown sugar + cookie mixture + caramel drizzle', fallbackAmount: 650 },
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
      { name: 'Cortado', description: 'espresso + equal parts steamed milk', fallbackAmount: 350 },
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
      { name: 'Hot Latte (Medium)', lookupName: 'Hot Latte (12 oz)', priceLookupName: 'Hot Latte (Regular)', description: 'espresso + steamed milk', fallbackAmount: 500 },
      { name: 'Hot Latte (Large)', lookupName: 'Hot Latte (20 oz)', priceLookupName: 'Hot Latte (Large)', description: 'espresso + steamed milk', fallbackAmount: 600 },
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
    dynamicSizePricing: true,
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
    dynamicSizePricing: true,
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

const toSingularKey = (value) => normalize(value).replace(/\b(\w+?)s\b/g, '$1');

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

const getBakeryDateParts = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  );
};

const getThanksgivingPreOrderStatus = (date = new Date()) => {
  const { month, day, hour, minute } = getBakeryDateParts(date);
  const beforeOpening = month < 10;
  const afterClosing = month > 11
    || (month === 11 && (day > 19 || (day === 19 && ((hour * 60) + minute >= 17 * 60))));
  const isOpen = !beforeOpening && !afterClosing;

  return {
    isOpen,
    label: isOpen
      ? 'Pre-order'
      : afterClosing
        ? 'Pre-orders closed'
        : 'Opens October 1',
  };
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

const formatDailyMenuPrice = (amount) => {
  if (!Number.isFinite(amount)) {
    return '$0';
  }

  return `$${(amount / 100).toFixed(2).replace(/\.00$/, '')}`;
};

const toDisplayName = (itemName, variationName) => {
  if (!variationName || normalize(variationName) === 'regular') {
    return itemName;
  }

  return `${itemName} (${variationName})`;
};

const getPreferredVariationRank = (variationName) => {
  const variationKey = normalize(variationName);

  if (variationKey === 'regular') {
    return 0;
  }

  if (variationKey === 'single') {
    return 1;
  }

  if (variationKey === 'default') {
    return 2;
  }

  return 10;
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
      const variationLookupName = `${itemName} (${variation.name || 'Regular'})`;
      const data = {
        variationId: variation.id || null,
        amount: variation.priceAmount,
        currency: variation.currency || 'USD',
        visible: item?.visible !== false,
        stockLimit: variation.stockLimit,
        remainingStock: variation.remainingStock,
        stockConfigured: variation.stockConfigured === true,
        menuName: variation.menuName || '',
        rank: getPreferredVariationRank(variation.name),
      };

      lookup.set(normalize(displayName), data);
      lookup.set(toSingularKey(displayName), data);
      lookup.set(normalize(variationLookupName), data);
      lookup.set(toSingularKey(variationLookupName), data);

      if (data.variationId) {
        lookup.set(`variation:${data.variationId}`, data);
      }

      [normalize(itemName), toSingularKey(itemName)].forEach((itemKey) => {
        const existing = lookup.get(itemKey);
        if (!existing || data.rank < existing.rank) {
          lookup.set(itemKey, data);
        }
      });
    });
  });

  return lookup;
};

const findSquarePrice = (squareLookup, lookupName, variationId) => {
  const nameMatch = lookupName
    ? squareLookup.get(normalize(lookupName)) || squareLookup.get(toSingularKey(lookupName))
    : null;

  return nameMatch || (variationId ? squareLookup.get(`variation:${variationId}`) : null);
};

const isSquareOptionOrderable = (option) =>
  Boolean(option?.variationId)
  && (option.stockConfigured !== true || option.remainingStock > 0);

const resolvePriceOption = (option, squareLookup) => {
  const fallbackVariationId =
    option.variationId
    || squareVariationMap[option.lookupName]
    || null;
  const live = findSquarePrice(squareLookup, option.lookupName, fallbackVariationId);

  return {
    ...option,
    amount: live?.amount ?? option.fallbackAmount,
    currency: live?.currency || option.currency || 'USD',
    variationId: live?.variationId || fallbackVariationId,
    visible: live?.visible,
    stockLimit: live?.stockLimit,
    remainingStock: live?.remainingStock,
    stockConfigured: live?.stockConfigured === true,
    menuName: live?.menuName || '',
  };
};

const formatPriceRange = (priceOptions = []) => {
  const labels = priceOptions
    .filter((option) => Number.isFinite(option.amount))
    .map((option) => formatPriceLabel(option.amount, option.currency));
  const uniqueLabels = [...new Set(labels)];

  return uniqueLabels.join('–');
};

const Menu = ({ onAddToCart, orderingStatus }) => {
  const [squareItems, setSquareItems] = useState([]);
  const [squareLookup, setSquareLookup] = useState(new Map());
  const [error, setError] = useState('');
  const [selectedProteins, setSelectedProteins] = useState({});
  const [selectedDrinkSizes, setSelectedDrinkSizes] = useState({});
  const [selectedCoffeePreparations, setSelectedCoffeePreparations] = useState({});
  const [selectedCoffeeSizes, setSelectedCoffeeSizes] = useState({});
  const [isPreOrderWindowOpen, setIsPreOrderWindowOpen] = useState(() => isWithinPreOrderWindow());
  const [thanksgivingStatus, setThanksgivingStatus] = useState(() => getThanksgivingPreOrderStatus());
  const [thanksgivingOptions, setThanksgivingOptions] = useState({
    'Mini Butter Croissants': 'half-dozen',
    Cookies: 'half-dozen',
  });
  const [cookieFlavor, setCookieFlavor] = useState('Kitchen sink');

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu?includeHidden=true`, { cache: 'no-store' });
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

    void loadMenu();
    const intervalId = window.setInterval(loadMenu, 30_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const syncWindowState = () => {
      setIsPreOrderWindowOpen(isWithinPreOrderWindow());
      setThanksgivingStatus(getThanksgivingPreOrderStatus());
    };

    const intervalId = window.setInterval(syncWindowState, 60_000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const specialtyCoffeePreparations = useMemo(
    () => SPECIALTY_COFFEE_PREPARATIONS.map((preparation) => ({
      ...preparation,
      sizeOptions: preparation.sizeOptions.map((option) =>
        resolvePriceOption(option, squareLookup)),
    })),
    [squareLookup],
  );

  const enrichedSections = useMemo(
    () => {
      const lockedCuratedSections = new Set(sections.map((section) => section.title));
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
          : 'Daily Bakes';
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
            stockLimit: variation?.stockLimit,
            remainingStock: variation?.remainingStock,
            stockConfigured: variation?.stockConfigured === true,
            isOnlineOrderable: isSquareOptionOrderable({
              variationId: variation?.id,
              stockConfigured: variation?.stockConfigured,
              remainingStock: variation?.remainingStock,
            }),
            visible: true,
            isUnavailableToday:
              variation?.stockConfigured === true && variation?.remainingStock <= 0,
            label: formatPriceLabel(variation.priceAmount, variation.currency || 'USD'),
          });
          extrasBySection.set(targetSection, existing);
          curatedNames.add(normalizedDisplayName);
        });
      });

      return sections
        .map((section) => {
          const resolvedItems = [
            ...section.items
              .map((item) => {
                const keepCuratedVisible = lockedCuratedSections.has(section.title);
                const priceLookupName = item.priceLookupName || section.priceLookupName || item.lookupName || item.name;
                const fallbackVariationId =
                  item.variationId
                  || squareVariationMap[priceLookupName]
                  || squareVariationMap[item.lookupName || item.name]
                  || squareVariationMap[item.name]
                  || null;
                const live = findSquarePrice(squareLookup, priceLookupName, fallbackVariationId);
                const priceOptions = item.priceOptions?.map((option) =>
                  resolvePriceOption(option, squareLookup)) || [];
                const sizeOptions = (item.sizeOptions || section.sizeOptions)?.map((option) =>
                  resolvePriceOption(option, squareLookup));
                const amount = live?.amount ?? priceOptions[0]?.amount ?? sizeOptions?.[0]?.amount ?? item.fallbackAmount;
                const currency = live?.currency || priceOptions[0]?.currency || sizeOptions?.[0]?.currency || 'USD';
                const priceRangeLabel = formatPriceRange(priceOptions);
                const availabilitySource = [live, ...priceOptions, ...(sizeOptions || [])]
                  .find((option) => typeof option?.visible === 'boolean');
                const orderOption = sizeOptions?.find(isSquareOptionOrderable)
                  || sizeOptions?.[0]
                  || live
                  || priceOptions[0];
                const hasOrderableSize = sizeOptions?.length
                  ? sizeOptions.some(isSquareOptionOrderable)
                  : null;

                return {
                  ...item,
                  name: section.dailyMenu && live?.menuName ? live.menuName : item.name,
                  amount,
                  priceOptions,
                  sizeOptions,
                  isPreOrder: section.preOrder === true,
                  variationId: live?.variationId || priceOptions[0]?.variationId || sizeOptions?.[0]?.variationId || fallbackVariationId,
                  stockLimit: orderOption?.stockLimit,
                  remainingStock: orderOption?.remainingStock,
                  stockConfigured: orderOption?.stockConfigured === true,
                  isOnlineOrderable:
                    availabilitySource?.visible !== false
                    && (hasOrderableSize ?? isSquareOptionOrderable(orderOption)),
                  // Curated menu entries always stay visible. Square availability
                  // controls ordering below, not whether the published menu vanishes.
                  visible: Boolean(live) || keepCuratedVisible,
                  isUnavailableToday:
                    availabilitySource?.visible === false
                    || !(hasOrderableSize ?? isSquareOptionOrderable(orderOption)),
                  label: `${
                    section.dailyMenu
                      ? formatDailyMenuPrice(amount)
                      : priceRangeLabel || formatPriceLabel(amount, currency)
                  }${item.priceSuffix || ''}`,
                };
              })
              .filter((item) => item.visible),
            ...(extrasBySection.get(section.title) || []),
          ];
          const sizePricingOptions = section.dynamicSizePricing
            ? resolvedItems.find((item) => item.sizeOptions?.length)?.sizeOptions || []
            : [];
          const sectionPricingOptions = section.pricingOptions?.map((option) =>
            resolvePriceOption(option, squareLookup)) || [];
          const pricingOptions = sizePricingOptions.length
            ? sizePricingOptions
            : sectionPricingOptions;
          const pricingLines = pricingOptions.map((option) =>
            `${option.label} - ${formatPriceLabel(option.amount, option.currency)}`);

          return {
            ...section,
            items: resolvedItems,
            pricingLines: pricingLines.length ? pricingLines : section.pricingLines,
          };
        })
        .filter((section) => section.items.length > 0);
    },
    [squareLookup, squareItems],
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
    const remainingStock = selectedSizeOption?.remainingStock ?? item.remainingStock ?? 0;
    const stockConfigured = selectedSizeOption?.stockConfigured === true
      || item.stockConfigured === true;

    if (!resolvedVariationId || (stockConfigured && remainingStock <= 0)) {
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
      maxQuantity: stockConfigured ? remainingStock : undefined,
    });
  };

  const handleProteinChange = (item, value) => {
    const itemKey = item.lookupName || item.name;
    setSelectedProteins((current) => ({
      ...current,
      [itemKey]: value,
    }));
  };

  const getSizedDrinkSelection = (item) => {
    const itemKey = item.lookupName || item.name;
    const requestedSizeKey = selectedDrinkSizes[itemKey];
    const sizeOptions = item.sizeOptions || [];
    const getOptionKey = (option) => option.key || normalize(option.label);
    const sizeOption = sizeOptions.find(
      (option) => getOptionKey(option) === requestedSizeKey,
    ) || sizeOptions.find(isSquareOptionOrderable) || sizeOptions[0];

    return {
      itemKey,
      sizeOption,
      getOptionKey,
      isOrderable:
        sizeOption?.visible !== false
        && isSquareOptionOrderable(sizeOption),
    };
  };

  const handleDrinkSizeChange = (item, value) => {
    const itemKey = item.lookupName || item.name;
    setSelectedDrinkSizes((current) => ({
      ...current,
      [itemKey]: value,
    }));
  };

  const handleSizedDrinkAdd = (item, drinkType) => {
    const { sizeOption, isOrderable } = getSizedDrinkSelection(item);
    if (!isOrderable || !orderingStatus?.isOrderingAllowed) {
      return;
    }

    const stockConfigured = sizeOption.stockConfigured === true;
    onAddToCart({
      name: `${item.name} (${sizeOption.label})`,
      amount: sizeOption.amount,
      label: formatPriceLabel(sizeOption.amount, sizeOption.currency),
      variationId: sizeOption.variationId,
      note: `${drinkType}: ${item.name} · Size: ${sizeOption.label}`,
      isUnavailableToday: false,
      maxQuantity: stockConfigured ? sizeOption.remainingStock : undefined,
    });
  };

  const getSpecialtyCoffeeSelection = (item) => {
    const itemKey = item.lookupName || item.name;
    const preparationKey = selectedCoffeePreparations[itemKey] || 'iced';
    const preparation = specialtyCoffeePreparations.find(
      (candidate) => candidate.key === preparationKey,
    ) || specialtyCoffeePreparations[0];
    const requestedSizeKey = selectedCoffeeSizes[itemKey] || '20-oz';
    const sizeOption = preparation?.sizeOptions.find(
      (candidate) => candidate.key === requestedSizeKey,
    ) || preparation?.sizeOptions.find((candidate) => candidate.key === '20-oz')
      || preparation?.sizeOptions[0];

    return {
      itemKey,
      preparation,
      sizeOption,
      isOrderable:
        sizeOption?.visible !== false
        && isSquareOptionOrderable(sizeOption),
    };
  };

  const handleCoffeePreparationChange = (item, value) => {
    const itemKey = item.lookupName || item.name;
    setSelectedCoffeePreparations((current) => ({
      ...current,
      [itemKey]: value,
    }));
  };

  const handleCoffeeSizeChange = (item, value) => {
    const itemKey = item.lookupName || item.name;
    setSelectedCoffeeSizes((current) => ({
      ...current,
      [itemKey]: value,
    }));
  };

  const handleSpecialtyCoffeeAdd = (item) => {
    const { preparation, sizeOption, isOrderable } = getSpecialtyCoffeeSelection(item);
    if (!isOrderable || !orderingStatus?.isOrderingAllowed) {
      return;
    }

    const preparationLabel = preparation.label;
    const sizeLabel = sizeOption.label;
    const stockConfigured = sizeOption.stockConfigured === true;

    onAddToCart({
      name: `${item.name} (${preparationLabel}, ${sizeLabel})`,
      amount: sizeOption.amount,
      label: formatPriceLabel(sizeOption.amount, sizeOption.currency),
      variationId: sizeOption.variationId,
      note: `Specialty coffee: ${item.name} · Preparation: ${preparationLabel} · Size: ${sizeLabel}`,
      isUnavailableToday: false,
      maxQuantity: stockConfigured ? sizeOption.remainingStock : undefined,
    });
  };

  const getThanksgivingSelection = (item) => {
    const option = item.options?.find(
      (candidate) => candidate.key === thanksgivingOptions[item.name],
    ) || item.options?.[0] || item;
    const live = findSquarePrice(squareLookup, null, option.variationId);

    return {
      option,
      amount: live?.amount ?? option.fallbackAmount,
      variationId: live?.variationId || option.variationId,
    };
  };

  const handleThanksgivingPreOrder = (item) => {
    if (!thanksgivingStatus.isOpen) {
      return;
    }

    const selection = getThanksgivingSelection(item);
    const optionLabel = item.options?.length ? selection.option.label : '';
    const flavorLabel = item.flavors?.length ? cookieFlavor : '';
    const cartDetails = [optionLabel, flavorLabel].filter(Boolean).join(' · ');

    onAddToCart({
      name: cartDetails ? `${item.name} (${cartDetails})` : item.name,
      amount: selection.amount,
      label: formatPriceLabel(selection.amount),
      variationId: selection.variationId,
      note: [THANKSGIVING_PICKUP_NOTE, flavorLabel ? `Flavor: ${flavorLabel}` : '']
        .filter(Boolean)
        .join(' · '),
      isSeasonalPreOrder: true,
      isUnavailableToday: false,
    });
  };

  const renderSizedDrinkItem = (item, key, drinkType) => {
    const { sizeOption, getOptionKey, isOrderable } = getSizedDrinkSelection(item);
    const canShowOrderControls =
      item.isOnlineOrderable
      && orderingStatus?.isGloballyEnabled !== false;

    return (
      <div className="coffee-item sized-drink-item" role="listitem" key={key}>
        <div className="coffee-item__text">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
        <div className="coffee-item__actions sized-drink-actions">
          <select
            className="coffee-option-select sized-drink-select"
            value={sizeOption ? getOptionKey(sizeOption) : ''}
            onChange={(event) => handleDrinkSizeChange(item, event.target.value)}
            aria-label={`Choose a size for ${item.name}`}
            disabled={!item.sizeOptions?.length}
          >
            {item.sizeOptions?.map((option) => (
              <option
                key={`${item.name}-${getOptionKey(option)}`}
                value={getOptionKey(option)}
                disabled={option.visible === false || !isSquareOptionOrderable(option)}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span className="price">
            {formatPriceLabel(sizeOption?.amount ?? item.fallbackAmount, sizeOption?.currency)}
          </span>
          <button
            className="add-to-cart-btn"
            style={{ display: canShowOrderControls ? undefined : 'none' }}
            onClick={() => handleSizedDrinkAdd(item, drinkType)}
            aria-label={`Add ${item.name}, ${sizeOption?.label || 'selected size'} to cart`}
            disabled={!orderingStatus?.isOrderingAllowed || !isOrderable}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    );
  };

  const renderSpecialtyCoffeeItem = (item, key) => {
    const { preparation, sizeOption, isOrderable } = getSpecialtyCoffeeSelection(item);
    const canShowOrderControls =
      isOrderable
      && orderingStatus?.isGloballyEnabled !== false;

    return (
      <div className="coffee-item specialty-coffee-item" role="listitem" key={key}>
        <div className="coffee-item__text">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
        <div className="specialty-coffee-order">
          <div className="specialty-coffee-selects">
            <label>
              <span>Style</span>
              <select
                className="coffee-option-select"
                value={preparation.key}
                onChange={(event) => handleCoffeePreparationChange(item, event.target.value)}
                aria-label={`${item.name} preparation`}
              >
                {specialtyCoffeePreparations.map((option) => (
                  <option
                    key={option.key}
                    value={option.key}
                    disabled={!option.sizeOptions.some(
                      (candidate) => candidate.visible !== false && isSquareOptionOrderable(candidate),
                    )}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Size</span>
              <select
                className="coffee-option-select"
                value={sizeOption.key}
                onChange={(event) => handleCoffeeSizeChange(item, event.target.value)}
                aria-label={`${item.name} size`}
              >
                {preparation.sizeOptions.map((option) => (
                  <option
                    key={option.key}
                    value={option.key}
                    disabled={option.visible === false || !isSquareOptionOrderable(option)}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="specialty-coffee-add-row">
            <span className="price">
              {formatPriceLabel(sizeOption.amount, sizeOption.currency)}
            </span>
            <button
              className="add-to-cart-btn"
              style={{ display: canShowOrderControls ? undefined : 'none' }}
              onClick={() => handleSpecialtyCoffeeAdd(item)}
              aria-label={`Add ${item.name}, ${preparation.label}, ${sizeOption.label} to cart`}
              disabled={!orderingStatus?.isOrderingAllowed || !isOrderable}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="menu"
      className={`menu-section${orderingStatus?.isOrderingAllowed ? '' : ' ordering-closed'}`}
      aria-labelledby="menu-heading"
    >
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
            {thanksgivingStatus.isOpen ? '🦃 Thanksgiving Pre-Orders Open' : '⏰ Ordering Currently Closed'}
          </p>
          <p
            style={{
              margin: '0.75rem 0 0 0',
              fontSize: '0.95rem',
              color: '#666',
            }}
          >
            {thanksgivingStatus.isOpen
              ? 'Daily ordering is closed, but Thanksgiving items can still be pre-ordered below.'
              : orderingStatus?.message || 'Orders are not available at this time.'}
          </p>
        </div>
      )}

      <header className="menu-header">
        <h2 id="menu-heading">Our Menu</h2>
        <p className="tagline">Bringing the best bites to your day</p>
        <div className="curbside-pickup-banner" aria-label="Curbside pickup availability">
          <FontAwesomeIcon
            icon={faCarSide}
            className="curbside-pickup-banner__icon"
            aria-hidden="true"
          />
          <div className="curbside-pickup-banner__copy">
            <strong>Regular menu orders are ready in 15 minutes</strong>
            <span>Choose “Add to cart” for curbside pickup. Whole cakes remain preorder only.</span>
          </div>
        </div>
        <p className="menu-availability-note">
          Today&apos;s quantities come directly from the bakery. Items can only be added while daily stock remains.
        </p>
      </header>

      <div className="menu-divider" />

      {error ? (
        <p style={{ textAlign: 'center', color: '#d65a8c', marginBottom: '1.5rem' }}>
          Live Square sync is temporarily unavailable. Displayed prices may use the published fallback menu.
        </p>
      ) : null}

      <div className="thanksgiving-menu" aria-labelledby="thanksgiving-menu-heading">
        <div className="thanksgiving-menu__eyebrow">BB&apos;s Bakery &amp; Cafe</div>
        <div className="thanksgiving-menu__heading-row">
          <span className="thanksgiving-menu__ornament" aria-hidden="true">✦</span>
          <h3 id="thanksgiving-menu-heading">
            Thanksgiving <span>Bakery Pre-Order Menu</span>
          </h3>
          <span className="thanksgiving-menu__ornament" aria-hidden="true">✦</span>
        </div>

        <div className="thanksgiving-menu__items" role="list" aria-label="Thanksgiving pre-order items">
          {thanksgivingPreOrderItems.map((item) => {
            const selection = getThanksgivingSelection(item);

            return (
              <div className="thanksgiving-menu__item" role="listitem" key={item.name}>
                <div className="thanksgiving-menu__item-copy">
                  <h4>{item.name}</h4>
                  {item.description ? <p>{item.description}</p> : null}
                  {item.preorderOnly ? (
                    <p className="thanksgiving-menu__preorder-only">
                      Preorder only · Not available for 15-minute pickup
                    </p>
                  ) : null}
                  {item.flavors?.length ? (
                    <label className="thanksgiving-menu__field">
                      <span>Flavor</span>
                      <select
                        value={cookieFlavor}
                        onChange={(event) => setCookieFlavor(event.target.value)}
                      >
                        {item.flavors.map((flavor) => (
                          <option key={flavor} value={flavor}>{flavor}</option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                  {item.options?.length ? (
                    <label className="thanksgiving-menu__field">
                      <span>Quantity</span>
                      <select
                        value={thanksgivingOptions[item.name] || item.options[0].key}
                        onChange={(event) => setThanksgivingOptions((current) => ({
                          ...current,
                          [item.name]: event.target.value,
                        }))}
                      >
                        {item.options.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label} — {formatPriceLabel(
                              findSquarePrice(squareLookup, null, option.variationId)?.amount
                                ?? option.fallbackAmount,
                            )}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                </div>
                <div className="thanksgiving-menu__item-actions">
                  <strong>{formatPriceLabel(selection.amount)}</strong>
                  <button
                    type="button"
                    className="thanksgiving-menu__order-button"
                    onClick={() => handleThanksgivingPreOrder(item)}
                    disabled={!thanksgivingStatus.isOpen || !selection.variationId}
                    aria-label={`${thanksgivingStatus.label} ${item.name}`}
                  >
                    <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
                    {thanksgivingStatus.label}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="thanksgiving-menu__details">
          <h4>Thanksgiving Pre-Order Information</h4>
          <p>
            Pre-orders and custom orders can be placed by phone, DM, in person, or on our website.
            Orders open <strong>October 1</strong> and close <strong>November 19 at 5 PM</strong>.
            All orders must be paid for when booked and picked up <strong>November 25 by 2 PM</strong>.
          </p>
          <address>
            <span>103 Main St., Pennington Gap, VA</span>
            <a href="tel:+12765370189">276-537-0189</a>
          </address>
        </div>
      </div>

      {enrichedSections.some((section) => section.dailyMenu) ? (
        <div className="menu-content bakery-layout daily-menu-layout">
          <div className="menu-column bakery-panel daily-menu-board">
            <span className="daily-menu-floral-frame" aria-hidden="true">
              <span className="daily-menu-floral-edge daily-menu-floral-edge--top" />
              <span className="daily-menu-floral-edge daily-menu-floral-edge--right" />
              <span className="daily-menu-floral-edge daily-menu-floral-edge--bottom" />
              <span className="daily-menu-floral-edge daily-menu-floral-edge--left" />
              <span className="daily-menu-floral-corner daily-menu-floral-corner--top-left" />
              <span className="daily-menu-floral-corner daily-menu-floral-corner--top-right" />
              <span className="daily-menu-floral-corner daily-menu-floral-corner--bottom-right" />
              <span className="daily-menu-floral-corner daily-menu-floral-corner--bottom-left" />
            </span>
            <div className="bakery-branding">
              <FontAwesomeIcon icon={faBreadSlice} className="bakery-branding__icon" aria-hidden="true" />
              <div>
                <p className="bakery-branding__name">BB&apos;s Bakery & Cafe</p>
                <p className="bakery-branding__tagline">Fresh bakes and spotlight favorites</p>
              </div>
            </div>

            <div className="menu-divider bakery-divider" />

            <div className="daily-menu-columns">
              {enrichedSections
                .filter((section) => section.dailyMenu)
                .map((section, sectionIndex) => (
                  <section
                    className={`daily-menu-group${sectionIndex === 0 ? ' daily-menu-group--primary' : ''}`}
                    key={section.title}
                    aria-labelledby={`daily-menu-group-${sectionIndex}`}
                  >
                    <h3 id={`daily-menu-group-${sectionIndex}`}>{section.title}</h3>
                    <div className="daily-menu-list" role="list">
                      {section.items.map((item, itemIndex) => (
                        <div
                          className="daily-menu-item"
                          role="listitem"
                          key={`${section.title}-${item.variationId || item.lookupName || item.name}-${itemIndex}`}
                        >
                          <div className="daily-menu-item__details">
                            <h4>{item.name}</h4>
                            {item.stockConfigured ? (
                              <span className={`daily-stock-chip${item.remainingStock > 0 ? '' : ' sold-out'}`}>
                                {item.remainingStock > 0
                                  ? `${item.remainingStock} left today`
                                  : 'Sold out'}
                              </span>
                            ) : null}
                          </div>
                          <div className="daily-menu-item__actions">
                            <span className="price">{item.label}</span>
                            <button
                              className="add-to-cart-btn"
                              style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
                              onClick={() => handleAddToCart(item)}
                              aria-label={`Add ${item.name} to cart`}
                              disabled={!orderingStatus?.isOrderingAllowed || item.isUnavailableToday || !item.isOnlineOrderable || !item.variationId}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          </div>
        </div>
      ) : null}

      {enrichedSections.filter((section) => !section.dailyMenu).map((section) => {
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

        const isBreakfastSection = section.title === 'Breakfast';
        const isLunchSection = section.title === 'Lunch';
        const isLoadedEnergySection = section.title === 'Loaded Energy';
        const isDirtySodasSection = section.title === 'Dirty Sodas';
        const isSmoothiesSection = section.title === 'Smoothies';
        const isSpecialtyCoffeeSection = section.title === 'Specialty Coffee';
        const isPreOrdersSection = section.title === 'Pre-Orders';
        const simpleSheetSection = simpleSheetSectionConfig[section.title];

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
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
                        <span className="price">{item.label}</span>
                        <button
                          className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
                    {section.pricingLines?.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>

                <div className="coffee-grid" role="list" aria-label="Loaded energy items">
                  <div className="coffee-list-column">
                    {leftColumnItems.map((item, itemIndex) => renderSizedDrinkItem(
                      item,
                      `${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`,
                      'Loaded energy',
                    ))}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) => renderSizedDrinkItem(
                      item,
                      `${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`,
                      'Loaded energy',
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
                    {leftColumnItems.map((item, itemIndex) => renderSizedDrinkItem(
                      item,
                      `${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`,
                      'Dirty soda',
                    ))}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) => renderSizedDrinkItem(
                      item,
                      `${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`,
                      'Dirty soda',
                    ))}
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
                            <span className="price">{formatPriceLabel(selectedSizeOption?.amount ?? item.fallbackAmount)}</span>
                            <button
                              className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
                            <span className="price">{formatPriceLabel(selectedSizeOption?.amount ?? item.fallbackAmount)}</span>
                            <button
                              className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
                    {section.pricingLines?.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>

                <div className="coffee-style-banner" aria-label="Specialty coffee preparation options">
                  <strong>Available in</strong>
                  <span>Hot</span>
                  <span>Iced</span>
                  <span>Blended</span>
                </div>

                <div className="coffee-grid" role="list" aria-label="Specialty coffee items">
                  <div className="coffee-list-column">
                    {leftColumnItems.map((item, itemIndex) =>
                      renderSpecialtyCoffeeItem(
                        item,
                        `${section.title}-left-${item.variationId || item.lookupName || item.name}-${itemIndex}`,
                      ))}
                  </div>

                  <div className="coffee-list-column">
                    {rightColumnItems.map((item, itemIndex) =>
                      renderSpecialtyCoffeeItem(
                        item,
                        `${section.title}-right-${item.variationId || item.lookupName || item.name}-${itemIndex}`,
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
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
                    <span className="price">{item.label}</span>
                    <button
                      className="add-to-cart-btn"
                          style={{ display: item.isOnlineOrderable && !item.isUnavailableToday && orderingStatus?.isGloballyEnabled !== false ? undefined : 'none' }}
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
