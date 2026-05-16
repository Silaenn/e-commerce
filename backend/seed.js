const strapi = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

async function seed() {
  const instance = await strapi().load();
  
  // Example: Creating a Category
  const category = await strapi.documents('api::category.category').create({
    data: {
      name: 'Vegetables',
    },
  });
  console.log('Category created:', category.id);
  
  // More seeding logic would go here, 
  // but for now, I recommend the user to use the Strapi Admin UI
  // because handling media file uploads programmatically requires
  // creating Upload files first.
  
  process.exit();
}

seed().catch(console.error);
