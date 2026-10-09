# JP – Auto Financial Partner

Hotový statický web pro **jpautofinancial.eu**. Nepotřebuje instalaci, databázi ani sestavení. Veškeré obrázky, styly a skripty jsou lokální; web nepoužívá analytiku, cookies ani externí fonty.

## Zveřejnění na GitHub Pages

1. Vytvořte na GitHubu repozitář pro web.
2. Nahrajte do jeho kořenové složky obsah tohoto balíčku: `index.html`, `404.html`, `robots.txt`, `CNAME`, `.nojekyll` a celou složku `assets`. Nenahrávejte samotný ZIP. README je volitelný; k webu není potřeba.
3. Otevřete **Settings → Pages** a jako zdroj vyberte **Deploy from a branch**, větev **main**, složku **/(root)**. Uložte nastavení.
4. V poli **Custom domain** nastavte **jpautofinancial.eu**. Soubor `CNAME` v balíčku již obsahuje tuto doménu.
5. Teprve po přidání domény do GitHub Pages nastavte u správce domény níže uvedené DNS záznamy pro web. Nemažte záznamy e-mailu (MX a příslušné TXT).
6. Po ověření DNS aktivujte v GitHub Pages **Enforce HTTPS**. Změna DNS a vystavení certifikátu mohou trvat až 24 hodin.

### DNS pro hlavní doménu

U záznamů A použijte hostitele `@` (někteří správci místo toho používají prázdné pole nebo celou doménu):

| Typ | Hostitel | Hodnota |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Pokud chcete také adresu **www.jpautofinancial.eu**, přidejte `CNAME` se jménem `www`, směřující na **VASE-GITHUB-JMENO.github.io**. Nahraďte tuto hodnotu skutečným uživatelským jménem nebo názvem organizace, která repozitář vlastní. GitHub pak může přesměrovat www na hlavní doménu. Odstraňte pouze původní konfliktní záznamy pro hostitele, které měníte; ostatní služby domény zachovejte.

Oficiální postup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Zákaz indexování a údaje za tlačítky

- Obě HTML stránky obsahují `noindex, nofollow, nosnippet, noimageindex`.
- `robots.txt` záměrně dovoluje přečíst HTML. Zákaz procházení celé stránky by mohl vyhledávačům zabránit přečíst `noindex`. Samostatný soubor s kontaktními údaji má zákaz procházení.
- E-mail, telefon i všechna bankovní spojení se vloží do stránky až po kliknutí na příslušné tlačítko. Při skrytí se odstraní z jejího obsahu.
- Údaje jsou v samostatném souboru, který se načte až po prvním kliknutí. Base64 je pouze kódování, nikoli šifrování. Návštěvník si údaje i zdrojové soubory může stáhnout; veřejný repozitář také může být nalezen. Pokud má být tajný celý obsah, je potřeba přístupové omezení na jiném hostingu.
- Zákaz indexování je pokyn pro vyhledávače, které ho respektují; nejde o heslo nebo ochranu před sběrem dat. Po zveřejnění je možné `noindex` ověřit v Google Search Console.

Oficiální vysvětlení: https://developers.google.com/search/docs/crawling-indexing/block-indexing

## Úprava údajů

Text webu je v `index.html`, vzhled v `assets/style.css`, chování tlačítek v `assets/app.js`. Logo je původní přiložený soubor v `assets/logo.png`.

Kontaktní údaje v `assets/contact-data.js` jsou uloženy jako UTF-8 JSON zakódovaný do Base64 v proměnné `window.__jpContactData`. Při změně zachovejte klíče `email`, `phone`, `accounts` a `owner`; každé bankovní spojení obsahuje `bank`, `currency`, `iban` a `bic`.

Čísla účtů a BIC byla převzata podle zadání. CZK a USD u HSBC používají stejný IBAN a BIC, jak bylo uvedeno. Kontrola formátu a kontrolních číslic IBAN neověřuje existenci účtu, jeho vlastníka ani přiřazenou měnu.

## Místní náhled

Soubor `index.html` lze otevřít přímo v prohlížeči společně se složkou `assets`. Samostatný náhled dodaný vedle ZIPu obsahuje vše v jednom HTML souboru; do repozitáře ho nenahrávejte.
