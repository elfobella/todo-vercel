# 🚀 Vercel Deployment Guide

Bu rehber, Todo App'inizi Vercel'e nasıl deploy edeceğinizi adım adım anlatır.

## 📋 Ön Hazırlık

### 1. GitHub Repository Oluştur

```bash
# Git repo'yu initialize et (eğer henüz yapmadıysan)
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: Todo app with Next.js 15 and Prisma"

# GitHub'da yeni repo oluştur ve push et
git remote add origin https://github.com/username/todo-app.git
git branch -M main
git push -u origin main
```

## 🗄️ Vercel Postgres Database Setup

### Adım 1: Vercel Hesabı

1. [Vercel.com](https://vercel.com) adresine git
2. GitHub hesabınla giriş yap

### Adım 2: Database Oluştur

1. Vercel Dashboard'a git
2. **Storage** sekmesine tıkla
3. **Create Database** butonuna tıkla
4. **Postgres** seçeneğini seç
5. Database için bir isim ver (örn: `todo-database`)
6. **Region** seç (Europe için Frankfurt önerilir)
7. **Create** butonuna bas

### Adım 3: Environment Variables Al

1. Yeni oluşturduğun database'e tıkla
2. **Connect** butonuna bas
3. **.env.local** tab'ına geç
4. Şu değişkenleri göreceksin:
   ```env
   POSTGRES_URL="..."
   POSTGRES_PRISMA_URL="..."
   POSTGRES_URL_NO_SSL="..."
   POSTGRES_URL_NON_POOLING="..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```

5. Bu değerleri kopyala

## 📦 Vercel Projesini Oluştur

### Adım 1: Projeyi Import Et

1. Vercel Dashboard'da **Add New** > **Project**
2. GitHub repository'ni seç ve **Import** et
3. Project ayarlarını kontrol et:
   - **Framework Preset**: Next.js (otomatik tespit edilir)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (otomatik)
   - **Output Directory**: `.next` (otomatik)

### Adım 2: Environment Variables Ekle

1. **Environment Variables** bölümüne git
2. Şu değişkenleri ekle:

   ```
   DATABASE_URL = [Vercel Postgres'ten aldığın POSTGRES_PRISMA_URL]
   DIRECT_URL = [Vercel Postgres'ten aldığın POSTGRES_URL_NON_POOLING]
   ```

   > **ÖNEMLİ**: 
   > - `DATABASE_URL` için `POSTGRES_PRISMA_URL` kullan (connection pooling için)
   > - `DIRECT_URL` için `POSTGRES_URL_NON_POOLING` kullan (migrations için)

3. **Environment** için **Production**, **Preview**, ve **Development** seç (hepsini işaretle)

### Adım 3: Deploy!

1. **Deploy** butonuna bas
2. Build logs'u izle
3. Deploy tamamlanınca **Visit** butonuna tıkla

## 🔧 Database Migration

Deploy edildikten sonra database schema'yı oluşturmalısın.

### Yöntem 1: Vercel CLI ile

```bash
# Vercel CLI'yi yükle (eğer yoksa)
npm install -g vercel

# Vercel'e login ol
vercel login

# Projeye bağlan
vercel link

# Environment variables'ı çek
vercel env pull .env.local

# Migration çalıştır
npx prisma migrate deploy
```

### Yöntem 2: Local'den (Önerilen)

```bash
# .env dosyana Vercel'den aldığın values'ları ekle
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Migration oluştur (ilk kez)
npx prisma migrate dev --name init

# Veya schema'yı direkt push et
npx prisma db push
```

## ✅ Deployment Sonrası Kontroller

### 1. Siteyi Test Et

- Ana sayfanın yüklendiğini kontrol et
- Todo eklemeyi dene
- Todo tamamlama/silme işlemlerini test et
- Mobile görünümü kontrol et

### 2. Database'i Kontrol Et

```bash
# Prisma Studio'yu aç
npx prisma studio
```

veya Vercel Dashboard'dan:
1. Storage > Database'inize git
2. **Data** tab'ından tabloları görün

### 3. Logs Kontrol Et

Vercel Dashboard'da:
1. Project > Deployments
2. Son deployment'a tıkla
3. **Functions** tab'ından logs'u kontrol et

## 🔄 Otomatik Deployments

Artık her `git push` yaptığında Vercel otomatik olarak deploy edecek:

```bash
# Değişiklik yap
git add .
git commit -m "Update: Added new feature"
git push

# Vercel otomatik olarak:
# 1. Build yapacak
# 2. Test edecek
# 3. Deploy edecek
# 4. Size URL verecek
```

## 🌟 Production URLs

Deploy sonrası iki tür URL alacaksın:

1. **Production URL**: `your-app.vercel.app`
2. **Custom Domain** (opsiyonel): `yourdomain.com`

### Custom Domain Eklemek

1. Vercel Dashboard > Project > Settings > Domains
2. Custom domain'ini ekle
3. DNS ayarlarını güncelle (Vercel talimatları verecek)

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Project Settings > Analytics
2. **Enable Analytics**
3. Real-time visitor ve performance metrikleri gör

### Error Tracking

- Vercel otomatik olarak errors'ı yakalar
- Project > Functions tab'ından error logs'u kontrol et

## 🔒 Güvenlik

### Environment Variables

✅ **YAPILMASI GEREKENLER:**
- `.env` dosyası `.gitignore`'da olmalı
- Sensitive data'yı GitHub'a push etme
- Vercel'de environment variables kullan

❌ **YAPILMAMASI GEREKENLER:**
- API keys'leri code'a hardcode etme
- Database credentials'ı public yapma

### Database Security

- Vercel Postgres otomatik olarak SSL kullanır
- Connection pooling aktif
- Automatic backups (Pro plan ile)

## 🚨 Sorun Giderme

### Build Hatası

```bash
# Local'de test et
npm run build

# Prisma client oluştur
npx prisma generate
```

### Database Connection Hatası

1. Environment variables'ı kontrol et
2. Database'in aktif olduğunu kontrol et
3. SSL connection'ı kontrol et (Vercel otomatik halleder)

### Migration Hatası

```bash
# Schema'yı reset et (DANGER: data silinir!)
npx prisma migrate reset

# Fresh migration
npx prisma migrate deploy
```

## 📱 Preview Deployments

Her branch ve PR için Vercel otomatik preview deployment oluşturur:

```bash
# Yeni branch oluştur
git checkout -b feature/new-feature

# Değişiklik yap ve push et
git push origin feature/new-feature

# GitHub'da PR aç
# Vercel otomatik olarak preview URL oluşturacak
```

## 💡 İpuçları

1. **Preview deployments** kullanarak production'a gitmeden önce test et
2. **Vercel Analytics** ile kullanıcı davranışlarını takip et
3. **Custom domain** ekleyerek profesyonel görün
4. **Edge Functions** ile global performance artır
5. **Automatic HTTPS** - Vercel otomatik SSL sertifikası ekler

## 🎯 Next Steps

Deployment sonrası yapabileceklerin:

- [ ] Custom domain ekle
- [ ] Analytics'i aktifleştir
- [ ] Error tracking kur (Sentry entegrasyonu)
- [ ] Performance monitoring
- [ ] SEO optimizasyonu
- [ ] Social media preview images
- [ ] PWA özellikler ekle

## 📚 Faydalı Linkler

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

## 🎉 Tebrikler!

Uygulamanız şimdi production'da! 🚀

Live URL'inizi paylaşabilir ve portfolio'nuza ekleyebilirsin.

**Önemli**: İlk deployment'tan sonra mutlaka todos eklemeyi test et!

