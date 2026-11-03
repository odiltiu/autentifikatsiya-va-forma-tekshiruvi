import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, loginSchema } from '../validation'
import './auth.css'

/* ── Icons ── */
const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ) : (
    <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  )
const UserIcon  = () => <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const AtIcon    = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
const MailIcon  = () => <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const PhoneIcon = () => <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.53 6.53l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const CakeIcon  = () => <svg viewBox="0 0 24 24"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><line x1="2" y1="21" x2="22" y2="21"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/></svg>
const LockIcon  = () => <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const CheckIcon = () => <svg viewBox="0 0 12 12"><polyline points="1,6 4.5,9.5 11,2"/></svg>
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

/* ── Password strength ── */
function getStrength(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}
const strengthLabels  = ['', 'Zaif', "O'rtacha", 'Yaxshi', 'Kuchli']
const strengthClasses = ['', 'weak',  'fair',     'good',   'strong']

function PasswordStrength({ password }) {
  const s = getStrength(password || '')
  if (!password) return null
  return (
    <div className="auth-strength">
      <div className="auth-strength-bar">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`auth-strength-seg ${i <= s ? `filled ${strengthClasses[s]}` : ''}`} />
        ))}
      </div>
      <span className="auth-strength-label">{strengthLabels[s]}</span>
    </div>
  )
}

/* ── Reusable field ── */
function Field({ id, label, required, icon, error, hint, children }) {
  return (
    <div className={`auth-field${error ? ' has-error' : ''}`}>
      <label className="auth-label" htmlFor={id}>
        {label}{required && <span className="auth-required" aria-hidden="true">*</span>}
      </label>
      <div className="auth-input-wrap">
        <span className="auth-icon" aria-hidden="true">{icon}</span>
        {children}
      </div>
      {error && <span className="auth-error" id={`${id}-error`} role="alert">{error}</span>}
      {!error && hint && <span className="auth-hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  )
}

// Maydonga xato/izoh matnini bog'lash (ekran o'quvchilar uchun)
const describe = (id, errors, hint) => ({
  id,
  'aria-invalid': errors[id] ? 'true' : undefined,
  'aria-describedby': errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined,
})

function PasswordInput({ id, show, onToggle, ...rest }) {
  return (
    <>
      <input
        id={id}
        className="auth-input"
        type={show ? 'text' : 'password'}
        style={{ paddingRight: 44 }}
        autoComplete={id === 'password' ? 'new-password' : 'current-password'}
        {...rest}
      />
      <button type="button" className="auth-eye" onClick={onToggle} aria-label={show ? 'Parolni yashirish' : "Parolni ko'rsatish"}>
        <EyeIcon open={show} />
      </button>
    </>
  )
}

function Socials({ onClick }) {
  return (
    <>
      <div className="auth-divider"><span>yoki</span></div>
      <div className="auth-socials">
        <button type="button" className="auth-social" onClick={() => onClick('Google')}><GoogleIcon /> Google</button>
        <button type="button" className="auth-social" onClick={() => onClick('GitHub')}><GithubIcon /> GitHub</button>
      </div>
    </>
  )
}

const REGISTER_DEFAULTS = { fullName: '', username: '', email: '', phone: '', age: '', password: '', terms: false }

function RegisterForm({ onSuccess, onSocial }) {
  const [showPw, setShowPw] = useState(false)
  const {
    register, handleSubmit, control, reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema), defaultValues: REGISTER_DEFAULTS, mode: 'onTouched' })
  const password = useWatch({ control, name: 'password' })

  const onSubmit = async (values) => {
    // Bu yerda serverga so'rov yuboriladi. Hozircha demo: qisqa kutish
    await new Promise((r) => setTimeout(r, 400))
    onSuccess(`Xush kelibsiz, ${values.fullName}! Ro'yxatdan o'tish muvaffaqiyatli.`)
    reset(REGISTER_DEFAULTS)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field id="fullName" label="To'liq ism" required icon={<UserIcon />} error={errors.fullName?.message}>
        <input className="auth-input" type="text" placeholder="Ali Valiyev" autoComplete="name" {...describe('fullName', errors)} {...register('fullName')} />
      </Field>

      <div className="auth-row">
        <Field id="username" label="Foydalanuvchi nomi" required icon={<AtIcon />} error={errors.username?.message} hint="3-20 belgi">
          <input className="auth-input" type="text" placeholder="ali_v" autoComplete="username" {...describe('username', errors, true)} {...register('username')} />
        </Field>
        <Field id="age" label="Yosh" required icon={<CakeIcon />} error={errors.age?.message}>
          <input className="auth-input" type="number" placeholder="20" min="13" max="100" inputMode="numeric" {...describe('age', errors)} {...register('age')} />
        </Field>
      </div>

      <Field id="email" label="Email" required icon={<MailIcon />} error={errors.email?.message}>
        <input className="auth-input" type="email" placeholder="ali@example.com" autoComplete="email" {...describe('email', errors)} {...register('email')} />
      </Field>

      <Field id="phone" label="Telefon" required icon={<PhoneIcon />} error={errors.phone?.message} hint="+998 XX XXX XX XX">
        <input className="auth-input" type="tel" placeholder="+998 90 123 45 67" autoComplete="tel" {...describe('phone', errors, true)} {...register('phone')} />
      </Field>

      <Field id="password" label="Parol" required icon={<LockIcon />} error={errors.password?.message}>
        <PasswordInput id="password" show={showPw} onToggle={() => setShowPw((v) => !v)} placeholder="Kamida 8 ta belgi" {...describe('password', errors)} {...register('password')} />
      </Field>
      <PasswordStrength password={password} />

      {/* Tuzatildi: oldin label'ga onClick qo'yilgan edi — ichidagi checkbox bosishni qayta yuborib,
          holat ikki marta almashardi va belgini qo'yib bo'lmasdi */}
      <label className="auth-terms" htmlFor="terms">
        <input id="terms" type="checkbox" {...register('terms')} aria-invalid={errors.terms ? 'true' : undefined} />
        <span className="auth-checkbox" aria-hidden="true"><CheckIcon /></span>
        <span>Foydalanish shartlari va maxfiylik siyosatini qabul qilaman</span>
      </label>
      {errors.terms && <span className="auth-error" role="alert">{errors.terms.message}</span>}

      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Yuborilmoqda...' : "Ro'yxatdan o'tish"}
      </button>
      <Socials onClick={onSocial} />
    </form>
  )
}

function LoginForm({ onSuccess, onSocial }) {
  const [showPw, setShowPw] = useState(false)
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { login: '', password: '' }, mode: 'onTouched' })

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 400))
    onSuccess(`${values.login}, tizimga kirdingiz (demo).`)
    reset()
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field id="login" label="Email yoki username" required icon={<MailIcon />} error={errors.login?.message}>
        <input className="auth-input" type="text" placeholder="ali@example.com" autoComplete="username" {...describe('login', errors)} {...register('login')} />
      </Field>
      <Field id="loginPassword" label="Parol" required icon={<LockIcon />} error={errors.password?.message}>
        <PasswordInput id="loginPassword" show={showPw} onToggle={() => setShowPw((v) => !v)} placeholder="Parolingizni kiriting" aria-invalid={errors.password ? 'true' : undefined} {...register('password')} />
      </Field>
      <button type="submit" className="auth-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Tekshirilmoqda...' : 'Kirish'}
      </button>
      <Socials onClick={onSocial} />
    </form>
  )
}

/* ── AuthPage ── */
export default function AuthPage() {
  const [tab, setTab] = useState('register')
  const [notice, setNotice] = useState(null)

  const switchTab = (next) => {
    setTab(next)
    setNotice(null)
  }
  const onSuccess = (text) => setNotice({ type: 'success', text })
  const onSocial = (name) => setNotice({ type: 'info', text: `${name} orqali kirish hali ulanmagan.` })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1>Xush kelibsiz</h1>
          <p>{tab === 'register' ? "Yangi hisob yarating" : 'Davom etish uchun hisobingizga kiring'}</p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Kirish turi">
          <button type="button" role="tab" aria-selected={tab === 'register'} className={`auth-tab${tab === 'register' ? ' active' : ''}`} onClick={() => switchTab('register')}>
            Ro'yxatdan o'tish
          </button>
          <button type="button" role="tab" aria-selected={tab === 'login'} className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => switchTab('login')}>
            Kirish
          </button>
        </div>

        <div className="auth-body">
          <div aria-live="polite">
            {notice && <p className={`auth-notice ${notice.type}`}>{notice.text}</p>}
          </div>
          {tab === 'register'
            ? <RegisterForm onSuccess={onSuccess} onSocial={onSocial} />
            : <LoginForm onSuccess={onSuccess} onSocial={onSocial} />}
        </div>

        <div className="auth-footer">
          {tab === 'register'
            ? <>Hisobingiz bormi? <button type="button" className="auth-link" onClick={() => switchTab('login')}>Kirish</button></>
            : <>Hisobingiz yo'qmi? <button type="button" className="auth-link" onClick={() => switchTab('register')}>Ro'yxatdan o'tish</button></>}
        </div>
      </div>
    </div>
  )
}
