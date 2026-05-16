const { createStrapi } = require('@strapi/strapi');

async function seed() {
  const instance = await createStrapi().load();

  console.log('--- Memulai Pengisian Data Teks ---');

  // 1. Data Kategori
  const categoriesData = [
    { name: 'Sembako', slug: 'sembako' },
    { name: 'Susu & Olahan', slug: 'susu-dan-olahan' },
    { name: 'Sayur & Buah', slug: 'sayur-dan-buah' },
    { name: 'Telur', slug: 'telur' },
    { name: 'Minuman', slug: 'minuman' }
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    try {
      const created = await instance.documents('api::category.category').create({
        data: { 
          name: cat.name, 
          slug: cat.slug,
          status: 'published' // Di v5 pakai status: 'published' atau publishedAt
        },
      });
      categoryMap[cat.name] = created.id;
      console.log(`✅ Kategori dibuat: ${cat.name}`);
    } catch (err) {
      console.log(`⚠️ Kategori ${cat.name} mungkin sudah ada.`);
    }
  }

  // 2. Data Produk
  const productsData = [
    {
      name: 'Beras Ramos 5kg',
      slug: 'beras-ramos-5kg',
      price: 75000,
      sellingPrice: 69000,
      description: 'Beras Ramos kualitas super, pulen dan putih alami.',
      categoryNames: ['Sembako']
    },
    {
      name: 'Minyak Goreng 2L',
      slug: 'minyak-goreng-2l',
      price: 38000,
      sellingPrice: 35500,
      description: 'Minyak goreng kelapa sawit murni, jernih dan hemat.',
      categoryNames: ['Sembako']
    },
    {
      name: 'Gula Pasir 1kg',
      slug: 'gula-pasir-1kg',
      price: 17000,
      sellingPrice: 16000,
      description: 'Gula pasir kristal putih, manis alami tanpa pemutih.',
      categoryNames: ['Sembako']
    },
    {
      name: 'Telur Ayam 1kg',
      slug: 'telur-ayam-1kg',
      price: 30000,
      sellingPrice: 28000,
      description: 'Telur ayam negeri segar, kaya protein untuk keluarga.',
      categoryNames: ['Telur']
    },
    {
      name: 'Ultra Milk 1L',
      slug: 'ultra-milk-1l',
      price: 22000,
      sellingPrice: 20500,
      description: 'Susu UHT Full Cream tinggi kalsium dan vitamin.',
      categoryNames: ['Susu & Olahan']
    },
    {
      name: 'Cimory Yogurt',
      slug: 'cimory-yogurt',
      price: 10000,
      sellingPrice: 8500,
      description: 'Minuman yogurt segar dengan berbagai varian rasa.',
      categoryNames: ['Susu & Olahan']
    },
    {
      name: 'Wortel Lokal',
      slug: 'wortel-lokal',
      price: 12000,
      sellingPrice: 10000,
      description: 'Wortel segar langsung dari petani, kaya vitamin A.',
      categoryNames: ['Sayur & Buah']
    },
    {
      name: 'Apel Fuji 1kg',
      slug: 'apel-fuji-1kg',
      price: 45000,
      sellingPrice: 42000,
      description: 'Apel fuji manis dan renyah, segar untuk camilan.',
      categoryNames: ['Sayur & Buah']
    },
    {
      name: 'Milo UHT 200ml',
      slug: 'milo-uht-200ml',
      price: 6000,
      sellingPrice: 5500,
      description: 'Minuman cokelat berenergi untuk dukung aktivitas.',
      categoryNames: ['Minuman']
    },
    {
      name: 'Air Mineral 600ml',
      slug: 'air-mineral-600ml',
      price: 4000,
      sellingPrice: 3500,
      description: 'Air mineral pegunungan yang murni dan menyegarkan.',
      categoryNames: ['Minuman']
    }
  ];

  for (const prod of productsData) {
    try {
      const catIds = prod.categoryNames.map(name => categoryMap[name]).filter(id => id);
      await instance.documents('api::product.product').create({
        data: {
          name: prod.name,
          slug: prod.slug,
          price: prod.price,
          sellingPrice: prod.sellingPrice,
          description: prod.description,
          categories: catIds,
          status: 'published'
        },
      });
      console.log(`✅ Produk dibuat: ${prod.name}`);
    } catch (err) {
      console.log(`⚠️ Produk ${prod.name} mungkin sudah ada.`);
    }
  }

  // 3. Slider
  try {
    await instance.documents('api::slider.slider').create({
      data: {
        name: 'Promo Sembako Murah',
        link: '/products-category/sembako',
        status: 'published'
      }
    });
    console.log('✅ Slider dibuat');
  } catch (err) {}

  console.log('--- Pengisian Selesai! Silakan cek Strapi Admin ---');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
