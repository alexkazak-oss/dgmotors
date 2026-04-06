Пофикси проект как senior-разработчик и сначала обязательно изучи актуальную локальную документацию Next.js из:

`node_modules/next/dist/docs/`

Важно:
в проекте используется версия Next.js с breaking changes, поэтому нельзя опираться на устаревшие знания о старом Next.js.
Перед любыми изменениями проверь актуальные правила по:

* config
* app router
* middleware / proxy
* turbopack
* aliases
* file structure
* deprecations

После этого устрани все текущие проблемы проекта.

Текущие проблемы:

1. Warning от Next.js:
   Next.js inferred your workspace root, but it may not be correct.
   Обнаружены несколько lockfile:

* /Users/macbook/pnpm-lock.yaml
* /Users/macbook/Desktop/code/dgmotors/dgmotors/package-lock.json

2. Ошибка импорта:
   Module not found: Can't resolve '@/i18n/routing'
   в `middleware.ts`

3. Ошибки TypeScript:

Файл:
`/app/(frontend)/cars/on-order/page.tsx`

Ошибка:
Argument of type '(doc: PayloadDoc, overrides?: { brandSlug?: string; brandTitle?: string; modelSlug?: string; modelTitle?: string; } | undefined) => CarCard'
is not assignable to parameter of type
'(value: JsonObject & TypeWithID, index: number, array: (JsonObject & TypeWithID)[]) => CarCard'

Файл:
`/src/widgets/featured-cars/FeaturedCars.tsx`

Та же ошибка.

Что нужно сделать:

1. Исправить root для Turbopack

* Определи реальный корень проекта.
* Настрой `turbopack.root` в `next.config.ts` / `next.config.js` по актуальным правилам текущей версии Next.js.
* Убери конфликт нескольких lockfile:

  * либо удали лишний lockfile вне проекта,
  * либо зафиксируй один пакетный менеджер,
  * либо явно задай root так, чтобы Next.js не использовал внешний `/Users/macbook/pnpm-lock.yaml`.

2. Починить i18n routing

* Проверь, существует ли `src/i18n/routing.ts` или `i18n/routing.ts`.
* Если файла нет — создай его по актуальной схеме `next-intl`.
* Если файл есть, но путь не совпадает с alias — исправь alias или импорт.
* Проверь `tsconfig.json`, чтобы alias `@/*` соответствовал реальной структуре проекта.
* Приведи `middleware.ts` к рабочей конфигурации с общим `routing`, но только по актуальным правилам текущей версии Next.js и next-intl.

3. Исправить ошибки TypeScript в `.map()`
   Проблема:
   в `Array.map(...)` передаётся функция вида:
   `(doc, overrides?) => ...`
   но `map` ожидает:
   `(value, index, array) => ...`

Нужно:

* не передавать такую функцию напрямую в `map`,
* а обернуть её в безопасный callback:
  `docs.map((doc) => mapPayloadDocToCarCard(doc, overrides))`
* либо изменить сигнатуру helper-функции так, чтобы она не конфликтовала с `Array.map`
* явно типизировать все связанные сущности
* не использовать `any`
* не использовать unsafe cast ради подавления ошибки

4. Пересмотреть helper-архитектуру

* Проверь, правильно ли спроектирован `mapPayloadDocToCarCard`
* при необходимости раздели:

  * чистый маппер `(doc, overrides) => result`
  * адаптер для массива `(doc) => mapper(doc, overrides)`

5. Привести проект к строгой типизации

* убрать `any`
* убрать implicit any
* указать явные типы для всех экспортируемых функций
* исправить слабую типизацию в helpers, widgets, routes, middleware и страницах

6. После исправлений:

* dev-сервер должен стартовать без warning/error
* импорты должны корректно резолвиться
* TypeScript ошибок быть не должно
* покажи финальные изменения по файлам:

  * `next.config.*`
  * `tsconfig.json`
  * `middleware.ts`
  * `src/i18n/routing.ts` или `i18n/routing.ts`
  * `app/(frontend)/cars/on-order/page.tsx`
  * `src/widgets/featured-cars/FeaturedCars.tsx`
  * helper, где объявлен `mapPayloadDocToCarCard`

7. Не просто опиши проблему, а внеси реальные изменения в код и проверь запуск проекта после фикса.
8. Работай как senior: исправь первопричины, а не только симптомы.
9. Не применяй legacy-паттерны старых версий Next.js. Сначала сверься с локальной документацией в `node_modules/next/dist/docs/`.

Дополнительно:

* не используй устаревшие подходы из старых версий Next.js
* сначала прочитай локальные docs проекта
* учти breaking changes текущей версии
* следуй deprecation notices
* после всех изменений выполни проверку запуска и typecheck
