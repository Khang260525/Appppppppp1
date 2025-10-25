const CACHE_NAME = 'jpy-work-log-cache-v4-final'; // Tăng version để buộc update cache
// ĐƯỜNG DẪN TUYỆT ĐỐI BẮT ĐẦU VỚI /TÊN_REPO/
const urlsToCache = [
    '/Apptinhtienluong/',
    '/Apptinhtienluong/index.html',
    '/Apptinhtienluong/manifest.json',
    'https://cdn.tailwindcss.com', // Tài nguyên bên ngoài
];

// Sự kiện: INSTALL (Cài đặt)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Lỗi khi thêm vào cache', error);
      })
  );
});

// Sự kiện: ACTIVATE (Kích hoạt) - Xóa các cache cũ
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Sự kiện: FETCH (Truy cập)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Trả về response từ cache nếu có
        if (response) {
          return response;
        }
        // Thử fetch từ mạng nếu không có trong cache
        return fetch(event.request);
      }
    )
  );
});