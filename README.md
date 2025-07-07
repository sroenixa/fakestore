# FakeStore

Next.js 15, TypeScript ve Styled Components kullanılarak geliştirilmiş projedir.

## Özellikler

### Temel Fonksiyonlar
- **Ürün Listeleme**: Masaüstünde satır başına 4 ürün, mobilde alt alta duyarlı grid yerleşimi
- **Ürün Detayları**: Görseller, açıklamalar, değerlendirme ve fiyat bilgileriyle detay sayfası
- **Sepet Popup Görünümü**: localStorage ile kalıcı sepet yönetimi
- **Arama ve Filtreler**: Gerçek zamanlı ürün arama, kategoriye, fiyat aralığına ve sıralamaya göre filtreleme
- **Sayfalama**: Sayfa başına 10 ürün ile verimli ürün gezintisi

### Teknik Özellikler
- **Sunucu Taraflı Render (SSR)**: Tüm API istekleri sunucu tarafında yapılır, yüksek performans sağlar.
- **Duyarlı Tasarım**: Mobile-first yaklaşımı ile styled-components kullanılarak geliştirilmiştir
- **TypeScript**: Uygulama genelinde tam tip güvenliği
- **Context API**: Sepet fonksiyonu için global context yönetimi
- **Atomic Design**: Bileşen tabanlı, düzenli bir mimari
- **SEO Optimizasyonu**: Ürün ve sayfalara özel dinamik meta etiketler
- **Görsel Optimizasyonu**: Lazy loading özelliğine sahip Next.js Image bileşeni

## Teknolojiler

- **Framework**: Next.js 15 (App Router)
- **Dil**: TypeScript
- **Stil**: Styled Components
- **State Yönetimi**: React Context API
- **Data Çekme**: Fetch API (Sunucu Taraflı) 
- **Test**: Jest + React Testing Library
- **API**: Fake Store API + NextJS API Routes
- **Ölçeklendirme**: Lighthouse

## Yapılar
- **API Routes**: Fake Store API tarafında filtreleme ve offset özellikleri bulunmadığı için tüm data çekilip API Routes ile filtreleme ve pagination yapılmıştır. 
- **Component Atomic Design**: En küçük yapı taşları için Atoms, atom içeren componentler için Molecules, atom veya molekül içeren karmaşık yapılar için Organisms, sayfalar için Pages yapısı kullanılmıştır.
- **Context API**: Sepet, Dil ve Tema yönetimi için Context yapısı kullanılmıştır.
- **Performans**: Yavaş çalışabilcek API Route'lara cache, componentlere ise dynamic yapı eklenmiştir.


## Başlangıç

### Gereksinimler
- Node.js 18+
- npm or yarn

### Kurulum

1. Repoyu Klonlayın:
2.
```bash
git clone <repository-url>
cd fakestore
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Sunucuyu Başlatın:
```bash
npm run dev
```

4. [http://localhost:3000](http://localhost:3000) linkini açın.

5. env dosyası variables değerlerinin görünmesi için bilerek eklenmiştir. Kendi projenizde bu dosyayı gitignore dosyanıza ekleyiniz. 

## Test

Testleri çalıştırmak için:
```bash
npm run test
```

Kapsam (coverage) ile testleri çalıştırmak için:
```bash
npm run test:coverage
```

### Test Coverage Skorları
| File       | % Stmts | % Branch | % Funcs | % Lines |
|------------|---------|----------|---------|---------|
| All files  | 91.56   | 69.56    | 85      | 91.56   |

Coverage dosyası altında ilgili belgeler mevcuttur.

## Lighthouse Skorları
| Sayfa                   | Performance | Accessibility | Best Practices | SEO  |
|-------------------------|-------------|---------------|----------------|------|
| http://localhost:3000   | 97          | 90            | 96             | 100  |
| http://localhost:3000/products/1 | 98          | 95            | 96             | 100  |
| Ortalama                | 98          | 93            | 96             | 100  |

Lighthouse-reports dosyası altında ilgili belgeler mevcuttur.