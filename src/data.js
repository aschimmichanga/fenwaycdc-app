export const categoriesImages = {
    sushi: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713049742/sushi_jvq1fd.jpg',
    pizza: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713125530/apple-event.64d9fae8.jpeg_3_yp2vr4.png',
    hardware: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713296001/Screenshot_2024-04-16_at_3.28.36_PM_mhwywi.png',
    flowers: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713296229/Screenshot_2024-04-16_at_3.35.42_PM_gkzohv.png',
    mexican: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713297149/Screenshot_2024-04-16_at_3.50.56_PM_y3ug2l.png',
    greek: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713297346/Screenshot_2024-04-16_at_3.55.21_PM_evwsr3.png',
    red_socks: "https://res.cloudinary.com/dguy8o0uf/image/upload/v1713297502/Screenshot_2024-04-16_at_3.57.58_PM_nkf1pf.png",
    theater: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713297595/Screenshot_2024-04-16_at_3.59.07_PM_redpgs.png',
    gym: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713297686/Screenshot_2024-04-16_at_4.00.32_PM_n8zi4l.png',
}

export const top_ad = "https://res.cloudinary.com/dguy8o0uf/image/upload/v1714426043/Taste_of_The_Fenway_logo_3_3_oop4zg.jpg"

export const organizations = [
    {
        id: 1,
        name: 'Tenderoni\'s',
        discounts: [{ description: 'Free Fries with purchase of $10+', expiry: new Date(2025, 4, 4) }, { description: '20% off any meal', expiry: new Date(2025, 4, 4) }, { description: "Buy one get one free", expiry: new Date(2025, 4, 4) }, { description: "25% off your next order", expiry: new Date(2025, 4, 4) }, { description: "50% off a side of fries", expiry: new Date(2025, 4, 4) }],
        imageUrl: categoriesImages.pizza
    },
    {
        id: 2,
        name: 'Economy True Value',
        discounts: [{ description: '10% discount', expiry: null }],
        imageUrl: categoriesImages.hardware
    },
    {
        id: 3,
        name: 'Fern Flowers',
        discounts: [{ description: '10% discount', expiry: null }],
        imageUrl: categoriesImages.flowers
    },
    {
        id: 4,
        name: 'El Pelon Taqueria',
        discounts: [{ description: "A free 'Mountain Dew' drink with $10 purchase", expiry: null }],
        imageUrl: categoriesImages.mexican
    },
    {
        id: 5,
        name: 'Saloniki Greek',
        discounts: [{ description: "Enjoy free fries with purchase of $10+", expiry: null }],
        details: 'This offer is only valid at the Fenway location',
        imageUrl: categoriesImages.greek
    },
    {
        id: 6,
        name: 'Basho Japanese Brasserie',
        discounts: [{ description: '10% off any catering order of $100+', expiry: null }],
        imageUrl: categoriesImages.sushi
    },
    {
        id: 7,
        name: 'Huntington Theater',
        discounts: [{ description: "$20 tickets", expiry: null }],
        imageUrl: categoriesImages.theater
    },
    {
        id: 8,
        name: 'YMCA Huntington',
        discounts: [{ description: "10% off YMCA membership", expiry: null }],
        imageUrl: categoriesImages.gym
    },
    {
        id: 9,
        name: 'Boston Red Sox',
        discounts: [{ description: "Free tickets for Neighborhood Night Red Sox games, movie nights, and other events", expiry: null }],
        details: "Giveaways are organized for members by the Fenway CDC team when tickets are available",
        imageUrl: categoriesImages.red_socks
    },];