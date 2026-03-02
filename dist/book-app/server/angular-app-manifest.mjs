
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "redirectTo": "/books",
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-D4UGXPDL.js",
      "chunk-U3NGL25T.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-LSE7QB2J.js",
      "chunk-U3NGL25T.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-L36QGJQX.js",
      "chunk-NAI7UY6W.js"
    ],
    "route": "/books"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-B3NSED7T.js",
      "chunk-NAI7UY6W.js",
      "chunk-U3NGL25T.js"
    ],
    "route": "/books/add"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-B3NSED7T.js",
      "chunk-NAI7UY6W.js",
      "chunk-U3NGL25T.js"
    ],
    "route": "/books/edit/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-EGZ7VPFB.js",
      "chunk-GXEMNLRS.js"
    ],
    "route": "/quotes"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RSRX4BP2.js",
      "chunk-U3NGL25T.js",
      "chunk-GXEMNLRS.js"
    ],
    "route": "/quotes/add"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-RSRX4BP2.js",
      "chunk-U3NGL25T.js",
      "chunk-GXEMNLRS.js"
    ],
    "route": "/quotes/edit/*"
  },
  {
    "renderMode": 1,
    "redirectTo": "/books",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 10028, hash: 'ee2f90500407aa65c182cae17b8f035b335ef6ccf63938931fb527121e5d831f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 9645, hash: '00d6b58147f9e2fd52c94e58eba23acdf3be1cdf500b67126d04a34865344579', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-RKFOCKZK.css': {size: 7944, hash: 'rWA986oUYBY', text: () => import('./assets-chunks/styles-RKFOCKZK_css.mjs').then(m => m.default)}
  },
};
