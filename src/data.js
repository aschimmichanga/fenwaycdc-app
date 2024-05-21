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

export const deals = [
    {
        id: 1,
        name: 'Tenderoni\'s',
        discounts: ['Free Fries with purchase of $10+', '20% off any meal', "Buy one get one free", "25% off your next order", "50% off a side of fries"],
        expiry: 'Apr 4',
        imageUrl: categoriesImages.pizza
    },
    {
        id: 2,
        name: 'Economy True Value',
        discounts: ['10% discount'],
        expiry: '',
        imageUrl: categoriesImages.hardware
    },
    {
        id: 3,
        name: 'Fern Flowers',
        discounts: ['10% discount'],
        expiry: '',
        imageUrl: categoriesImages.flowers
    },
    {
        id: 4,
        name: 'El Pelon Taqueria',
        discounts: ["A free 'Mountain Dew' drink with $10 purchase"],
        expiry: '',
        imageUrl: categoriesImages.mexican
    },
    {
        id: 5,
        name: 'Saloniki Greek',
        discounts: ["Enjoy free fries with purchase of $10+"],
        expiry: '',
        details: 'This offer is only valid at the Fenway location',
        imageUrl: categoriesImages.greek
    },
    {
        id: 6,
        name: 'Basho Japanese Brasserie',
        discounts: ['10% off any catering order of $100+'],
        expiry: 'Apr 3',
        imageUrl: categoriesImages.sushi
    },
    {
        id: 7,
        name: 'Huntington Theater',
        discounts: ["$20 tickets"],
        expiry: '',
        imageUrl: categoriesImages.theater
    },
    {
        id: 8,
        name: 'YMCA Huntington',
        discounts: ["10% off YMCA membership"],
        expiry: '',
        imageUrl: categoriesImages.gym
    },
    {
        id: 9,
        name: 'Boston Red Sox',
        discounts: ["Free tickets for Neighborhood Night Red Sox games, movie nights, and other events"],
        details: "Giveaways are organized for members by the Fenway CDC team when tickets are available",
        expiry: '',
        imageUrl: categoriesImages.red_socks
    },];