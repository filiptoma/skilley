subory s vynimkou:
- vsetko v priecinkoch .github/ build/ node_modules/ a public/
- .css subory
- react-app-env.d.ts && index.tsx
- .firebaserc
- .gitignore
- firebase.json && package.json && tsconfig.json
- yarn.lock

1. odsadenie je 4 medzery
2. var, const, let: v `.ts` suboroch su camelCase
3. var, const, let: v `.tsx` suboroch su PascalCase
4. typy vramci Typescriptu su PascalCase
4. konstanty v subore src/common/constants.ts su UPPER_CASE (MACRO_CASE)
5. curly brackets - otvaracia: vzdy na rovnakom riadku
6. curly brackets - zatvaracia: bud na rovnakom riadku, ak je vycet vramci zatvoriek kratky, inak ma vzdy
samostatny riadok
7. ak su obe curly brackets na rovnakom riadku, po otvaracej aj pred zatvaracou je prave jedna medzera
8. kazdy operator je zlava aj sprava obaleny prave jednou medzerou
9. otypovanie vramci Typescriptu ma format premenna:<medzera>typ
10. aj ked je to v javascripte optional, vzdy pisat ;
11. string: deklaracia pomocou ""
12. komentar: prve pismeno je velke, ostatne male, bez bodky na konci
13. komentar - na rovnakom riadku: minimalne 2 medzery medzi koncom kodu a komentarom
14. samouzatvaraci html tag ma format <Tag />
15. zoskupovanie importov: 1. skupina su vzdy top-level importy (z balickov z package.json), ostatne skupiny su importy
z lokalnych suborov - tie sa zoskupuju podla zanorenia v suborovom strome projektu - podla urovni zanorenia, nie
samotnych priecinkov
16. vzdy sa pouzivaju arrow funkcie, keyword `function` je deprecated
17. subory: s priponou .tsx vzdy PascalCase (vynimka je index.tsx)
18. subory: s priponou .md je vzdy UPPER_CASE (MACRO_CASE)
19. subory: vsetky ostatne pripony su camelCase
20. suborovy strom projektu je popisany v subore DIRS.md
22. vlastny typ - klucove slovo type - je PascalCase a ma prefix T
23. hooky - .ts a .tsx subory s prefixom `use` su PascalCase po prefixe
24. props: format je prop={value}
25. .tsx files in src/routes folder are named in PascalCase with R prefix
26. vzdy jeden prazdny riadok na konci suboru
27. v komponentoch (.tsx subory) po `=>` alebo `return` vzdy gulate zatvorky a content na novy riadok
28. nazvy priecinkov vzdy snake-case
29. kazdy `export` je na konci suboru, nad nim je jeden volny riadok (ak to nie je prvy riadok suboru)
30. v catch ked zachytavas error vzdy je to `catch (err) {`
31. ak je v {} 3 a viac importov, daj ich pod seba po jednom
32. ak je v komponente 3 a viac props, daj ich pod seba
33. dlzka riadku je max 99 znakov
