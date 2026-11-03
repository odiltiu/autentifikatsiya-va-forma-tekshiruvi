import { z } from 'zod'

// Telefonni bo'sh joy va chiziqchalarsiz ko'rinishga keltiramiz: "+998 90 123-45-67" -> "+998901234567"
const phone = z
  .string()
  .transform((v) => v.replace(/[\s-()]/g, ''))
  // Tuzatildi: oldin ^ va $ yo'q edi, "abc+998901234567xyz" ham o'tib ketardi
  .pipe(z.string().regex(/^\+998\d{9}$/, "Telefon +998 XX XXX XX XX formatida bo'lishi kerak"))

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, "Kamida 3 ta harf bo'lishi kerak"),
  username: z
    .string()
    .trim()
    .min(3, "Kamida 3 ta belgi bo'lishi kerak")
    .max(20, "Ko'pi bilan 20 ta belgi")
    .regex(/^[a-zA-Z0-9_]+$/, 'Faqat lotin harfi, raqam va _ ishlatish mumkin'),
  email: z.string().trim().min(1, 'Email majburiy').email("Email noto'g'ri formatda"),
  phone,
  age: z.coerce
    .number({ error: 'Yoshni kiriting' })
    .int('Yosh butun son bo\'lishi kerak')
    .min(13, "Yosh kamida 13 bo'lishi kerak")
    .max(100, "Yosh 100 dan oshmasligi kerak"),
  password: z
    .string()
    .min(8, "Kamida 8 ta belgi bo'lishi kerak")
    .regex(/[A-Z]/, "Kamida 1 ta katta harf bo'lishi kerak")
    .regex(/[0-9]/, "Kamida 1 ta raqam bo'lishi kerak")
    .regex(/[^a-zA-Z0-9]/, "Kamida 1 ta maxsus belgi bo'lishi kerak"),
  terms: z.literal(true, { error: 'Shartlarni qabul qiling' }),
})

export const loginSchema = z.object({
  login: z.string().trim().min(3, 'Email yoki username kiriting'),
  password: z.string().min(1, 'Parolni kiriting'),
})
