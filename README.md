This app demonstrates an issue in the Safari IndexedDB implementation with getting a record from an index by an array key when the keyPath is an array with a single value.

What seems to be happening is that Safari is coercing an Array key path on an index into a string key path when the Array key path contains only a single string. E.g. `["id"]` becomes `"id"`. The index key value follows the same pattern.

## Install and run

```bash
npm i
npm run dev
```

Vite will display a URL where the app is running, e.g. `http://127.0.0.1:5173/`

## Validate

### Chrome

1. Open URL in Chrome
2. Open dev console
3. Click "Open DB" button in Chrome
4. Click "Save Data" button
5. Click "Get Data By Key Array" button (orange)
6. Console logs `{id: 1, title: 'hello', description: 'this is a test'}`

### Safari

1. Open URL in Safari
2. Open dev console
3. Click "Open DB" button in Chrome
4. Click "Save Data" button
5. Click "Get Data By Key Array" button (orange)
6. Console logs `undefined`
