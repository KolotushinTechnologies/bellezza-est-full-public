#!/bin/bash

cd crm-client

echo "Updating imports to use types.ts..."

# Fix api.ts
sed -i '' '1s|^|import type { Product, Category } from "./types";\n|' src/api.ts

# Fix ProductsPage.tsx
sed -i '' 's|// import type { Product, Category } from "../App"|import type { Product, Category } from "../types"|' src/components/ProductsPage.tsx

# Fix CategoriesPage.tsx  
sed -i '' 's|// import type { Category } from "../App"|import type { Category } from "../types"|' src/components/CategoriesPage.tsx

# Fix Dashboard.tsx - remove unused handlePageChange
sed -i '' '/const handlePageChange = useCallback/,/}, \[\])/d' src/components/Dashboard.tsx

echo "All imports fixed! Running build..."
npm run build
