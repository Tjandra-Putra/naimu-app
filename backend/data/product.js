// product Data
const productList = [
  {
    product_category: "Pants",
    product_title: "Adidas Rekive Woven Track Pants",
    product_description:
      "Go full-on fresh, day after day. With a mix of angles and contrasting hues, these adidas track pants let you play around with style while keeping it classic, too. A smooth weave drapes perfectly and keeps its shape thanks to ribbed cuffs. Mesh lining puts comfort first, and front zip pockets (plus an open pocket in the back) invite you to bring along the essentials.",
    product_image_url: [
      {
        public_id: "test",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg",
      },
      {
        public_id: "test",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1298703124ae4e8082ccaf6a01413103_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_22_model.jpg",
      },
    ],
    shop: {
      name: "Adidas",
      shop_avatar: {
        public_id: "shop_avatar_adidas_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 139,
    product_discount_price: 120,
    product_rating: 4.5,
    product_unit_sold: 35,
    quantity_in_stock: 0,
  },
  {
    product_category: "Jacket",
    product_title: "Adidas Rekive Woven Track Jacket",
    product_description:
      "This adidas track jacket adds a touch of retro style to your everyday look with archive-inspired cut lines. Ripstop overlays meet our signature 3-Stripes and Trefoil logo for a modern take on heritage style. The loose fit and mesh lining create added comfort so you can head out looking and feeling great.",
    product_image_url: [
      {
        public_id: "adidas-rekive-woven-track-jacket-1",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/06391302db9147aaa2d6afa8009184cb_9366/adidas_Rekive_Woven_Track_Jacket_Grey_IC6004_21_model.jpg",
      },
      {
        public_id: "adidas-rekive-woven-track-jacket-2",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c324a3d8239d432d8a24afa8009190ee_9366/adidas_Rekive_Woven_Track_Jacket_Grey_IC6004_23_hover_model.jpg",
      },
      {
        public_id: "adidas-rekive-woven-track-jacket-3",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b0d7f8fcb0204e928a4dafa800919be1_9366/adidas_Rekive_Woven_Track_Jacket_Grey_IC6004_25_model.jpg",
      },
      {
        public_id: "adidas-rekive-woven-track-jacket-4",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/959dcf402b2241e4bbf7afa80091cc3e_9366/adidas_Rekive_Woven_Track_Jacket_Grey_IC6004_01_laydown.jpg",
      },
    ],
    shop: {
      name: "Adidas",
      shop_avatar: {
        public_id: "shop_avatar_adidas_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 149,
    product_discount_price: 140,
    product_rating: 4.7,
    product_unit_sold: 203,
    quantity_in_stock: 3,
  },
  {
    product_category: "Slides",
    product_title: "Island Club Adilette Premium Slides",
    product_description:
      "The Island Club collection conjures feelings of an endless summer. Poolside or not, everyday feels like a vacation in the playful yet chic collection that mixes pastel hues and vivid color-blocking with tonal head-to-toe 'fits. The collection is heavy on nostalgia and good vibes. \n Made with elevated materials, the Island Club Adilette Premium Slides are the perfect summertime companion. Go from laid-back settings to high-heat nights, thanks to the cork footbed and leather upper delivering a more refined look and feel. The bandage-style design hints at textural 3-Stripes, while a Trefoil logo near the heel adds a discreet sporty edge.",
    product_image_url: [
      {
        public_id: "island-club-adilette-premium-slides-1",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/06aaccf76fde4c35ae48afc700fc1548_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM1.jpg",
      },
      {
        public_id: "island-club-adilette-premium-slides-2",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bfba4221032a427297e4e51e43ff1e68_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM3_hover.jpg",
      },
      {
        public_id: "island-club-adilette-premium-slides-3",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ebc55c0f5694572b922afc700fc299e_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM4.jpg",
      },
      {
        public_id: "island-club-adilette-premium-slides-4",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f88f1ed2d0104a6e961cafc700fc3da0_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM5.jpg",
      },
      {
        public_id: "island-club-adilette-premium-slides-5",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e6f9378d1b0e4a868c461dc365774526_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM6.jpg",
      },
      {
        public_id: "island-club-adilette-premium-slides-6",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/05cfb544782a4cdfbf710df180ad733d_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM7.jpg",
      },
    ],
    shop: {
      name: "Adidas",
      shop_avatar: {
        public_id: "shop_avatar_adidas_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 100,
    product_discount_price: 90,
    product_rating: 4.7,
    product_unit_sold: 320,
    quantity_in_stock: 3,
  },
  {
    product_category: "Shorts",
    product_title: "X-city heat.rdy shorts",
    product_description:
      "When the heat haze shimmers above the street, run right through it in these adidas running shorts. HEAT.RDY tech keeps you going in hot conditions, and the lightweight build has a slim fit that doesn't get in the way of your stride. Pockets stash essentials like your key and gel so you can focus on your pace.",
    product_image_url: [
      {
        public_id: "x-city-heat-rdy-shorts-1",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cb963f36178c49c884c5af7200c6a9ba_9366/X-City_HEAT.RDY_Shorts_Black_HN0789_21_model.jpg",
      },
      {
        public_id: "x-city-heat-rdy-shorts-2",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/99d11865d06641e9a06aaf7200c72d03_9366/X-City_HEAT.RDY_Shorts_Black_HN0789_01_laydown.jpg",
      },
      {
        public_id: "x-city-heat-rdy-shorts-3",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f24bd3a4ce6641ab95ecaf7200c6e052_9366/X-City_HEAT.RDY_Shorts_Black_HN0789_25_model.jpg",
      },
      {
        public_id: "x-city-heat-rdy-shorts-4",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/02ac91af5c1f4b5696b0af7200c6f8e4_9366/X-City_HEAT.RDY_Shorts_Black_HN0789_41_detail.jpg",
      },
    ],
    shop: {
      name: "Adidas",
      shop_avatar: {
        public_id: "shop_avatar_adidas_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 79,
    product_discount_price: 69,
    product_rating: 4.7,
    product_unit_sold: 320,
    quantity_in_stock: 3,
  },
  {
    product_category: "T-shirts",
    product_title: "Nike Sportswear",
    product_description:
      "Drape yourself in comfortable, loose cotton. A patchwork bear graphic on the back celebrates the Nike logos of the past.",
    product_image_url: [
      {
        public_id: "nike-sportswear-1",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f57c76d1-0aa3-4bd3-9a2a-3dda917abfa5/sportswear-t-shirt-8xf1GD.png",
      },
      {
        public_id: "nike-sportswear-2",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/53d4d0da-e704-4824-af2e-c6e66bcc4e10/sportswear-t-shirt-8xf1GD.png",
      },
      {
        public_id: "nike-sportswear-3",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9092d78f-7a9f-44f6-bae4-2b13b31dd28c/sportswear-t-shirt-8xf1GD.png",
      },
      {
        public_id: "nike-sportswear-4",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8489126d-1054-44a9-b79a-9a701d05b13b/sportswear-t-shirt-8xf1GD.png",
      },
    ],
    shop: {
      name: "Nike",
      shop_avatar: {
        public_id: "shop_avatar_nike_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 59,
    product_discount_price: 49,
    product_rating: 5,
    product_unit_sold: 320,
    quantity_in_stock: 3,
  },

  {
    product_category: "Sweatshirts",
    product_title: "Adidas Basketball Crew Sweatshirt",
    product_description:
      "This adidas track jacket adds a touch of retro style to your everyday look with archive-inspired cut lines. Ripstop overlays meet our signature 3-Stripes and Trefoil logo for a modern take on heritage style. The loose fit and mesh lining create added comfort so you can head out looking and feeling great.",
    product_image_url: [
      {
        public_id: "test",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1777da19a81f41ac87a3af6d0157688d_faec/adidas_Basketball_Crew_Sweatshirt_Grey_IA3435_HM1.jpg",
      },
      {
        public_id: "test",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/87d1bae305be45f6af28af5e01791342_faec/adidas_Basketball_Crew_Sweatshirt_White_IA3436_HM3_hover.jpg",
      },
      {
        public_id: "test",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b40408245c0b46ac9b4eafa30168dd29_faec/adidas_Basketball_Crew_Sweatshirt_White_IA3436_HM17.jpg",
      },
      {
        public_id: "test",
        url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/877c60ef4ddc4c0d8b58afa301691d46_faec/adidas_Basketball_Crew_Sweatshirt_White_IA3436_HM16.jpg",
      },
    ],
    shop: {
      name: "Adidas",
      shop_avatar: {
        public_id: "shop_avatar_adidas_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 79,
    product_discount_price: 69,
    product_rating: 4.7,
    product_unit_sold: 320,
    quantity_in_stock: 3,
  },
  {
    product_category: "Shoes",
    product_title: "Nike Air Max 270",
    product_description:
      "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colours.",
    product_image_url: [
      {
        public_id: "nike-air-max-270-1",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-shoes-2V5C4p.png",
      },
      {
        public_id: "nike-air-max-270-2",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/sdxif37re9xkdk2d7q0o/air-max-270-shoes-2V5C4p.png",
      },
      {
        public_id: "nike-air-max-270-3",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/lxzehln8xolab8zlfbws/air-max-270-shoes-2V5C4p.png",
      },
      {
        public_id: "nike-air-max-270-4",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/pog7ksulvzectpug6r9j/air-max-270-shoes-2V5C4p.png",
      },
    ],
    shop: {
      name: "Nike",
      shop_avatar: {
        public_id: "shop_avatar_nike_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 229,
    product_discount_price: 49,
    product_rating: 5,
    product_unit_sold: 320,
    quantity_in_stock: 10,
  },
  {
    product_category: "Shoes",
    product_title: "Nike Streakfly",
    product_description:
      "Our lightest racing shoe, the Nike Streakfly is all about the speed you need to take on the competition in a mile, 5K or 10K race. Low profile with sleek details, it feels like it disappears on your foot to help you better connect with the road on the way to your personal best.      ",
    product_image_url: [
      {
        public_id: "nike-streakfly-1",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/01e6bdc4-645d-4626-84c6-c6dd96dfc921/streakfly-road-racing-shoes-V17qZm.png",
      },
      {
        public_id: "nike-streakfly-2",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9449b567-1cb6-4a75-bb3b-45431a5d8501/streakfly-road-racing-shoes-V17qZm.png",
      },
      {
        public_id: "nike-streakfly-3",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69e6462f-a77f-419b-9575-46de92e766cb/streakfly-road-racing-shoes-V17qZm.png",
      },
      {
        public_id: "nike-streakfly-4",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f8f7814e-d298-4207-87b3-348dda65e99e/streakfly-road-racing-shoes-V17qZm.png",
      },
      {
        public_id: "nike-streakfly-5",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a528e0a5-3ab8-439f-b0a0-fe7649c6947d/streakfly-road-racing-shoes-V17qZm.png",
      },
      {
        public_id: "nike-streakfly-6",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/788a1599-aa91-4a54-9cf7-c8b3be2bbaf4/streakfly-road-racing-shoes-V17qZm.png",
      },
      {
        public_id: "nike-streakfly-7",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d158ec42-c41e-4feb-b84f-aad3af139182/streakfly-road-racing-shoes-V17qZm.png",
      },
    ],
    shop: {
      name: "Nike",
      shop_avatar: {
        public_id: "shop_avatar_nike_1",
        url: "https://cdn-icons-png.flaticon.com/512/732/732160.png",
      },
      ratings: 4.8,
    },
    product_price: 149.9,
    product_discount_price: 130,
    product_rating: 5,
    product_unit_sold: 320,
    quantity_in_stock: 100,
  },
];

//export
module.exports = productList;
