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
    // {
    //     id: 7,
    //     name: 'Boston Red Sox',
    //     discount: "Free tickets for Neighborhood Night Red Sox games, movie nights, and other events",
    //     details: "Giveaways are organized for members by the Fenway CDC team when tickets are available",
    //     expiry: '',
    //     imageUrl: categoriesImages.red_socks
    // },
    {
        id: 2,
        name: 'Tenderoni\'s',
        discount: 'Free Fries with purchase of $10+',
        expiry: 'Apr 4',
        imageUrl: categoriesImages.pizza
    },
    {
        id: 3,
        name: 'Economy True Value',
        discount: '10% discount',
        expiry: '',
        imageUrl: categoriesImages.hardware
    },
    {
        id: 4,
        name: 'Fern Flowers',
        discount: '10% discount',
        expiry: '',
        imageUrl: categoriesImages.flowers
    },
    {
        id: 5,
        name: 'El Pelon Taqueria',
        discount: "A free 'Mountain Dew' drink with $10 purchase",
        expiry: '',
        imageUrl: categoriesImages.mexican
    },
    {
        id: 6,
        name: 'Saloniki Greek',
        discount: "Enjoy free fries with purchase of $10+",
        expiry: '',
        details: 'This offer is only valid at the Fenway location',
        imageUrl: categoriesImages.greek
    },
    {
        id: 7,
        name: 'Basho Japanese Brasserie',
        discount: '10% off any catering order of $100+',
        expiry: 'Apr 3',
        imageUrl: categoriesImages.sushi
    },
    {
        id: 8,
        name: 'Huntington Theater',
        discount: "$20 tickets",
        expiry: '',
        imageUrl: categoriesImages.theater
    },
    {
        id: 9,
        name: 'YMCA Huntington',
        discount: "10% off YMCA membership",
        expiry: '',
        imageUrl: categoriesImages.gym
    },];