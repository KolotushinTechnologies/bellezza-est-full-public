# CRM Build Fixes - Инструкции по исправлению

## Оставшиеся ошибки TypeScript в CRM

### 1. Удалить неиспользуемый импорт Upload в ProductsPage.tsx
**Файл:** `crm-client/src/components/ProductsPage.tsx`
**Строка 6:** Удалить `Upload` из импорта
```typescript
// Было:
import { Plus, Trash2, X, Upload, AlertTriangle, Edit } from "lucide-react"

// Должно быть:
import { Plus, Trash2, X, AlertTriangle, Edit } from "lucide-react"
```

### 2. Добавить типы для параметров в ProductsPage.tsx
**Файл:** `crm-client/src/components/ProductsPage.tsx`
**Строка 320:** Добавить типы для параметров map
```typescript
// Было:
{product.tags.map((tag, idx) => (

// Должно быть:
{product.tags.map((tag: string, idx: number) => (
```

### 3. Удалить неиспользуемые props из Dashboard.tsx
**Файл:** `crm-client/src/components/Dashboard.tsx`
**Строка 378:** Удалить `currentPage` и `onNavigate` props из Sidebar
```typescript
// Было:
<Sidebar currentPage={currentPage} onNavigate={handlePageChange} onLogout={handleLogout} />

// Должно быть:
<Sidebar onLogout={handleLogout} />
```

### 4. Исправить импорты Product и Category
Эти типы не экспортируются из App.tsx, поэтому их нужно либо:
- Удалить неиспользуемые импорты
- Или создать отдельный файл types.ts с этими типами

**Временное решение:** Закомментировать или удалить неиспользуемые импорты в:
- `crm-client/src/api.ts` (строка 1)
- `crm-client/src/components/CategoriesPage.tsx` (строка 7)
- `crm-client/src/components/ProductsPage.tsx` (строка 7)

## Быстрое исправление

Выполните эти команды для автоматического исправления:

```bash
cd crm-client

# 1. ProductsPage - удалить Upload
sed -i '' 's/import { Plus, Trash2, X, Upload, AlertTriangle, Edit }/import { Plus, Trash2, X, AlertTriangle, Edit }/' src/components/ProductsPage.tsx

# 2. ProductsPage - добавить типы
sed -i '' 's/{product\.tags\.map((tag, idx) =>/{product.tags.map((tag: string, idx: number) =>/' src/components/ProductsPage.tsx

# 3. Dashboard - исправить Sidebar props
sed -i '' 's/<Sidebar currentPage={currentPage} onNavigate={handlePageChange} onLogout={handleLogout} \/>/<Sidebar onLogout={handleLogout} \/>/' src/components/Dashboard.tsx
```

После этого билд должен пройти успешно!
