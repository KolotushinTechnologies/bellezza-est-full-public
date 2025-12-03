#!/bin/bash

# Script to fix all CRM TypeScript build errors

cd crm-client

echo "Fixing ProductsPage.tsx..."
# Remove Upload import
sed -i '' 's/import { Plus, Trash2, X, Upload, AlertTriangle, Edit }/import { Plus, Trash2, X, AlertTriangle, Edit }/' src/components/ProductsPage.tsx

# Add types to map parameters
sed -i '' 's/{product\.tags\.map((tag, idx) =>/{product.tags.map((tag: string, idx: number) =>/' src/components/ProductsPage.tsx

# Comment out Product and Category imports
sed -i '' 's/^import type { Product, Category } from "..\/App"/\/\/ import type { Product, Category } from "..\/App"/' src/components/ProductsPage.tsx

echo "Fixing Dashboard.tsx..."
# Fix Sidebar props
sed -i '' 's/<Sidebar currentPage={currentPage} onNavigate={handlePageChange} onLogout={handleLogout} \/>/<Sidebar onLogout={handleLogout} \/>/' src/components/Dashboard.tsx

echo "Fixing api.ts..."
# Comment out Product and Category imports
sed -i '' 's/^import type { Product, Category } from ".\/App";/\/\/ import type { Product, Category } from ".\/App";/' src/api.ts

echo "Fixing CategoriesPage.tsx..."
# Comment out Category import
sed -i '' 's/^import type { Category } from "..\/App"/\/\/ import type { Category } from "..\/App"/' src/components/CategoriesPage.tsx

echo "All fixes applied! Running build..."
npm run build
