# مجلد شعارات العملاء (Client Logos)

ضع شعارات المؤسسات والشركات هنا بصيغة SVG أو PNG بخلفية شفافة (Transparent Background).

أمثلة مقترحة للتسمية:
- `cic.png` أو `cic.svg`
- `sheraton.png` أو `sheraton.svg`
- `ge.png` أو `ge.svg`
- `anpp.png` أو `anpp.svg`
- `ats.png` أو `ats.svg`

ثم قم بتعيين المسار في `src/data/cateringData.ts` داخل مصفوفة `CLIENT_REFERENCES` في حقل `logo`:
```typescript
{
  name: "Centre International des Conférences (CIC Alger)",
  initials: "CIC",
  logo: "/images/clients/cic.png",
}
```
إذا كان حقل `logo` فارغاً، سيعرض الكاروسيل رمز المؤسسة النصي الفاخر تلقائياً كبديل ذكي.

