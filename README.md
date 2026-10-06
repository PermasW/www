# PERMAS — Railway yayın paketi

Türkçe, mobil uyumlu kurumsal web sitesi. Node.js 22+, harici npm bağımlılığı yok.

## Yerel çalıştırma

```bash
npm start
```

http://localhost:3000 adresini açın. Kontrol: `npm run check`.

## Railway: GitHub üzerinden

1. ZIP'i açın. `package.json`, `Dockerfile`, `railway.json`, `server.mjs` ve `public` klasörünü bir GitHub deposunun köküne yükleyin. Dosyalar alt klasördeyse Railway Root Directory ayarını o klasöre yönlendirin.
2. Railway'de **New Project → Deploy from GitHub repo** ile bu depoyu seçin.
3. Railway kökteki Dockerfile'ı kullanır. `railway.json` başlangıç komutunu ve `/health` sağlık kontrolünü tanımlar. Build Command gerekli değildir.
4. Servisin **Settings → Networking → Generate Domain** bölümünden açık web adresini oluşturun.
5. **Variables** alanında `SITE_URL` değişkenini gerçek HTTPS adresinize ayarlayın: örneğin `https://permas.up.railway.app` veya kendi alan adınız. Bu değişken robots.txt ve sitemap.xml için kullanılır.
6. Kendi alan adınız için Railway'de custom domain ekleyin ve Railway'in verdiği DNS kayıtlarını alan adı sağlayıcınıza girin. Kayıt değerlerini tahmin etmeyin.

`PORT` Railway tarafından sağlanır. Sunucu `0.0.0.0` üzerinde dinler. Veritabanı, API anahtarı veya ücretli bir e-posta servisi gerekmez.

## Railway: CLI alternatifi

Railway CLI kuruluysa proje klasöründe:

```bash
railway login
railway init
railway up
```

Sonrasında Networking bölümünden alan adı oluşturun.

## Dosyalar ve içerik

- `public/index.html`: sayfa metinleri ve bölümler
- `public/styles.css`: responsive tasarım, renkler ve tipografi
- `public/app.js`: mobil menü, erişilebilir sekmeler ve e-posta taslağı
- `public/privacy.html`: uygulamanın mevcut davranışını açıklayan gizlilik sayfası
- `public/assets/permas-logo.png`: hazırlanan özgün logo
- `public/assets/hero.webp`: AI ile üretilmiş konsept salon görseli; gerçek müşteri projesi değildir
- `server.mjs`: statik sunucu, güvenlik başlıkları, sağlık kontrolü ve SEO dosyaları

## İletişim davranışı

Form **otomatik e-posta göndermez**. E-posta uygulamasında taslak açar; ziyaretçi kendisi gönderir. Alternatif olarak talep metnini kopyalar. Veri sunucuda tutulmaz. Doğrudan e-posta ve telefon bağlantıları da vardır. Otomatik gönderim istenirse ayrı bir sunucu entegrasyonu ve e-posta servisi kurulmalıdır.

Telefon ve e-posta, sağlanan teklif dosyasına dayanır. Yayın öncesi firma tarafından doğrulanmalıdır. E-posta hesabının çalışması bu paket tarafından sağlanmaz.

## Yayın içeriği

Müşteri isimleri, gizli teklif fiyatları, kazanılmamış işler veya doğrulanmamış başarı istatistikleri kullanılmamıştır. Restoran, sahne ve kurumsal alanlar uygulama senaryolarıdır; tamamlanmış proje referansı değildir. Site bir CMS içermez; düzenlemeler dosyalardan yapılır.

## Resmî Railway kaynakları

- https://docs.railway.com/builds/dockerfiles
- https://docs.railway.com/deployments/healthchecks
- https://docs.railway.com/guides/express

## Doğrulama

JavaScript sözdizimi; 9 endpoint/asset; sayfa içi bağlantılar; HEAD; 404; dizin dışına erişim; hatalı URL; desteklenmeyen HTTP metotları ve SITE_URL sitemap kontrolleri geçti. Railway hesabına dağıtım yapılmadı. Bu ortamda tarayıcı görsel testi ve Docker build çalıştırılamadı.
