const strapi = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

async function seed() {
  const instance = await strapi().load();

  console.log('--- Memulai Seeding Data ---');

  // 1. Fungsi Helper Upload Gambar
  const uploadFile = async (fileName) => {
    const filePath = path.join(__dirname, 'public/uploads', fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`File ${fileName} tidak ditemukan di uploads, skip.`);
      return null;
    }

    const stats = fs.statSync(filePath);
    const uploadedFiles = await instance.plugins['upload'].services.upload.upload({
      data: {},
      files: {
        path: filePath,
        name: fileName,
        type: fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
        size: stats.size,
      },
    });

    return uploadedFiles[0];
  };

  // 2. Buat Kategori
  const categoriesData = [
    { name: 'Susu Segar', slug: 'susu-segar' },
    { name: 'Minuman Cokelat', slug: 'minuman-cokelat' },
    { name: 'Nutrisi Ibu', slug: 'nutrisi-ibu' }
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const created = await instance.documents('api::category.category').create({
      data: { ...cat, publishedAt: new Date() },
    });
    categories[cat.name] = created.id;
    console.log(`Kategori dibuat: ${cat.name}`);
  }

  // 3. Buat Produk
  const productsData = [
    {
      name: 'Ultra Milk Full Cream 1L',
      slug: 'ultra-milk-full-cream',
      price: 22000,
      sellingPrice: 20000,
      description: 'Susu UHT berkualitas tinggi.',
      categoryNames: ['Susu Segar'],
      imageFile: 'susu_uht_ultra_milk_full_cream_fe70551c6a.jpg'
    },
    {
      name: 'Ultra Milk Cokelat 1L',
      slug: 'ultra-milk-cokelat',
      price: 23000,
      sellingPrice: 21500,
      description: 'Rasa cokelat lezat.',
      categoryNames: ['Susu Segar', 'Minuman Cokelat'],
      imageFile: 'susu_uht_ultra_milk_cokelat_5d5c52af71.jpg'
    },
    {
      name: 'Greenfields Strawberry 250ml',
      slug: 'greenfields-strawberry',
      price: 8500,
      sellingPrice: 7500,
      description: 'Kesegaran strawberry asli.',
      categoryNames: ['Susu Segar'],
      imageFile: 'susu_uht_greenfields_strawberry_42582324e5.png'
    },
    {
      name: 'Milo UHT 200ml',
      slug: 'milo-uht',
      price: 6000,
      sellingPrice: 5500,
      description: 'Minuman cokelat berenergi.',
      categoryNames: ['Minuman Cokelat'],
      imageFile: 'susu_uht_milo_2a86a5880a.jpeg'
    },
    {
      name: 'Prenagen Mommy Strawberry',
      slug: 'prenagen-mommy',
      price: 15000,
      sellingPrice: 13500,
      description: 'Nutrisi lengkap ibu hamil.',
      categoryNames: ['Nutrisi Ibu'],
      imageFile: 'susu_uht_prenagen_mommy_4e970ea4c4.png'
    }
  ];

  for (const prod of productsData) {
    const img = await uploadFile(prod.imageFile);
    await instance.documents('api::product.product').create({
      data: {
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        sellingPrice: prod.sellingPrice,
        description: prod.description,
        categories: prod.categoryNames.map(name => categories[name]),
        images: img ? [img.id] : [],
        publishedAt: new Date()
      },
    });
    console.log(`Produk dibuat: ${prod.name}`);
  }

  // 4. Buat Slider
  const sliderImg = await uploadFile('susu_uht_ultra_milk_full_cream_fe70551c6a.jpg');
  await instance.documents('api::slider.slider').create({
    data: {
      name: 'Promo Gede Susu',
      link: '/products-category/susu-segar',
      image: sliderImg ? sliderImg.id : null,
      publishedAt: new Date()
    }
  });
  console.log('Slider dibuat');

  console.log('--- Seeding Selesai! ---');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
