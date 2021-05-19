# eshkal

[![Netlify Status](https://api.netlify.com/api/v1/badges/9ee70894-a1a7-4712-b698-9f76e7035621/deploy-status)](https://app.netlify.com/sites/eshkal/deploys)

 [Link](https://eshkal.netlify.app/) إشكال تساعدك على جعل كلماتك العربية أكثر غموضاً

الأداة بدائية وليست مضمونة في جعل كلماتك مستعصية على القراءة الآلية للنصوص ولكنها تزيد من صعوبة الأمر وقد تساعد على الإشكال في الفهم للآلة مع الحفاظ قدر الإمكان في الوضوح للبشر

يتم تجاهل الكلمات المكونة من ثلاثة حروف فأقل والكلامات البادئة بعلامة #

Eshkal is a simple website that do one function: change the arabic text with multiple shapes.

It's built with simple html/css and JS with the help of a mini ui library <https://felippe-regazio.github.io/plume-css/>

Its functionality is in eshkal.js file, it gets all text, divide it into words, then work on letters inside a word.
It has the following shape variants:

- change letter shape (glyph) - refrence: <https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%AE%D8%B7_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A_%D9%81%D9%8A_%D9%8A%D9%88%D9%86%D9%8A%D9%83%D9%88%D8%AF>
- remove dotts (nekat) from letter
- add random tashkeel
- add english letters instead of arabic ones
- add separators
the previous ways are executed randomly to make sure the output text generated is not expectable.

جميع الحقوق غير محفوظة

يمكنك اعادة استخدام نفس الكود في إصدار أدوات وبرامج أخرى

وأيضاً مرحباً بالتطوير في هذا الكود
