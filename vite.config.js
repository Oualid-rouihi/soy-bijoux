import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function adminApiPlugin() {
  return {
    name: 'admin-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/add-product' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { name, price, description, category, badge, images } = data;
              
              const catDir = path.join(process.cwd(), 'public', 'images', 'products', category);
              if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

              const savedImagePaths = [];
              
              for (const img of images) {
                // Save Image
                const base64Data = img.base64.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');
                
                const cleanFilename = img.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
                let uniqueFilename = cleanFilename;
                let counter = 1;
                while (fs.existsSync(path.join(catDir, uniqueFilename))) {
                    const ext = path.extname(cleanFilename);
                    const base = path.basename(cleanFilename, ext);
                    uniqueFilename = `${base}-${counter}${ext}`;
                    counter++;
                }
                const imagePath = path.join(catDir, uniqueFilename);
                fs.writeFileSync(imagePath, buffer);
                savedImagePaths.push(`/images/products/${category}/${uniqueFilename}`);
              }

              // 2. Modify products.js
              const dbPath = path.join(process.cwd(), 'src', 'data', 'products.js');
              let content = fs.readFileSync(dbPath, 'utf8');
              
              // Find max id
              const idMatches = [...content.matchAll(/id:\s*(\d+)/g)];
              let maxId = 0;
              idMatches.forEach(m => {
                const id = parseInt(m[1], 10);
                if (id > maxId) maxId = id;
              });
              const newId = maxId + 1;
              
              const parsedPrice = parseInt(price, 10) || 0;
              const badgeStr = badge ? `'${badge}'` : 'null';
              const nameStr = JSON.stringify(name || 'Nouveau Produit');
              const categoryStr = JSON.stringify(category || 'bracelets');
              const descStr = JSON.stringify(description || '');
              
              const newProductString = `  {
    id: ${newId},
    name: ${nameStr},
    price: ${parsedPrice},
    originalPrice: null,
    category: ${categoryStr},
    badge: ${badgeStr},
    inStock: true,
    description: ${descStr},
    images: ${JSON.stringify(savedImagePaths)},
  },`;
              
              const replaceRegex = /(\];\s*export const getFeaturedProducts)/;
              if (replaceRegex.test(content)) {
                content = content.replace(replaceRegex, newProductString + '\n$1');
              } else {
                 const lastBracket = content.lastIndexOf('];');
                 content = content.substring(0, lastBracket) + newProductString + '\n' + content.substring(lastBracket);
              }
              
              fs.writeFileSync(dbPath, content);
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, id: newId }));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  }
}

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
})
