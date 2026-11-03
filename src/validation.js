import { email, registry, z } from 'zod'

export const scheme = z.object({
    fullName: z.string().min(3, 'Kamida 3 ta harf bo\'lishi kerak'),
    username: z.string()
        .min(3, 'Kamida 3 ta belgi bo\'lishi kerak')
        .max(20, 'Ko\'pi bilan 20 ta belgi')
        .regex(/^[a-zA-Z0-9_]+$/, 'Faqat harf, raqam va _ ishlatish mumkin'),
    email: z.string()
        .min(1, 'Email majburiy')
        .email('Email noto\'g\'ri formatda'),
    phone: z.string()
        .regex(/\+998[0-9]{9}/, 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak'),
    age: z.coerce.number()
        .min(13, 'Yosh kamida 13 bo\'lishi kerak')
        .max(100, 'Yosh 100 dan oshmasligi kerak'),
    password: z.string()
        .min(8, 'Kamida 8 ta belgi bo\'lishi kerak')
        .regex(/[A-Z]/, 'Kamida 1 ta katta harf bo\'lishi kerak')
        .regex(/[0-9]/, 'Kamida 1 ta raqam bo\'lishi kerak')
        .regex(/[^a-zA-Z0-9]/, 'Kamida 1 ta maxsus belgi bo\'lishi kerak'),
})