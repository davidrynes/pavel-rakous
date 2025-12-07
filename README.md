# Pavel Rakous - Poradce pro správu nemovitostí

Moderní web s CMS systémem pro správu obsahu, vytvořený pomocí Next.js 15 a Sanity.io.

## 🚀 Technologie

- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity.io
- **Styling:** Tailwind CSS
- **Jazyk:** TypeScript
- **Deployment:** Vercel
- **Funkcionalita:**
  - 🌍 Podpora dvou jazyků (CS/EN)
  - 📝 Blog s kategoriemi
  - 📦 Balíčky služeb
  - 👤 Profil autora
  - 📧 Kontaktní formulář
  - 🎨 Minimalistický, vzdušný design

## 📋 Požadavky

- Node.js 18+ (doporučeno 20+)
- npm nebo yarn
- Účet na [Sanity.io](https://www.sanity.io/) (free tier)

## 🛠️ Nastavení projektu

### 1. Instalace závislostí

```bash
npm install
```

### 2. Vytvoření Sanity projektu

1. Přihlaste se na [sanity.io](https://www.sanity.io/)
2. Vytvořte nový projekt v Sanity dashboardu
3. Zkopírujte **Project ID**

### 3. Konfigurace prostředí

Upravte soubor `.env.local` v kořenovém adresáři:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="váš-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-12-06"
SANITY_API_TOKEN="váš-api-token"
```

**Získání API tokenu:**
1. Otevřete [manage.sanity.io](https://manage.sanity.io/)
2. Vyberte váš projekt
3. Jděte do **API** → **Tokens**
4. Vytvořte nový token s **Editor** právy
5. Zkopírujte token do `.env.local`

### 4. Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000)

### 5. Přístup do Sanity Studio

Sanity Studio je dostupné na [http://localhost:3000/studio](http://localhost:3000/studio)

## 📝 Správa obsahu

### Sanity Studio - První kroky

1. Otevřete [http://localhost:3000/studio](http://localhost:3000/studio)
2. Přihlaste se pomocí vašeho Sanity účtu

### Vytvoření základního obsahu:

#### 1. Autor
- Vytvořte dokument **Autor**
- Vyplňte jméno, bio (CS i EN), foto
- Přidejte zkušenosti a kontaktní údaje

#### 2. Kategorie
- Vytvořte několik kategorií pro blog
- Například: "Investice", "Správa", "Tipy", atd.

#### 3. Blog příspěvky
- Vytvořte nové příspěvky
- Vyplňte titulek a obsah v obou jazycích
- Přiřaďte kategorii a autora
- Nastavte datum publikace

#### 4. Balíčky služeb
- Vytvořte balíčky s názvy, popisy a cenami
- Přidejte funkce (features) v obou jazycích
- Nastavte pořadí zobrazení

#### 5. Stránky (volitelné)
- Vytvořte custom stránky (např. "O mně")
- Využijte rich text editor pro formátování

## 🚀 Deployment na Vercel

### 1. Příprava repozitáře

```bash
git init
git add .
git commit -m "Initial commit"
```

Nahrajte na GitHub:
```bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel

1. Otevřete [vercel.com](https://vercel.com/)
2. Klikněte na **New Project**
3. Importujte váš GitHub repository
4. Přidejte environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
5. Klikněte na **Deploy**

### 3. Konfigurace Sanity CORS

1. Otevřete [manage.sanity.io](https://manage.sanity.io/)
2. Vyberte projekt → **API** → **CORS Origins**
3. Přidejte vaši Vercel URL (např. `https://your-site.vercel.app`)
4. Povolte credentials

## 📁 Struktura projektu

```
pavel-rakous/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog stránky
│   ├── balicky/           # Balíčky služeb
│   ├── kontakt/           # Kontaktní stránka
│   ├── o-mne/             # O mně
│   ├── studio/            # Sanity Studio
│   └── layout.tsx         # Root layout
├── components/            # React komponenty
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── lib/                   # Utility funkce
│   ├── language-context.tsx
│   └── sanity-queries.ts
├── sanity/                # Sanity konfigurace
│   ├── schemaTypes/       # Data modely
│   ├── client.ts
│   ├── env.ts
│   └── image.ts
└── sanity.config.ts       # Sanity Studio config
```

## 🎨 Customizace designu

Design je postaven na Tailwind CSS. Upravte barvy a styly v:
- `tailwind.config.ts` - Tailwind konfigurace
- `app/globals.css` - Globální styly
- Komponenty v `components/` a `app/`

## 🌍 Přepínání jazyků

Aplikace podporuje CS/EN přepínání:
- Context: `lib/language-context.tsx`
- Switcher: `components/LanguageSwitcher.tsx`
- Použití: `const { t } = useLanguage(); t('Text CZ', 'Text EN')`

## 📞 Podpora

Pro dotazy kontaktujte vývojáře nebo vytvořte issue v repository.

## 📄 Licence

Tento projekt je vytvořen pro Pavel Rakous.
