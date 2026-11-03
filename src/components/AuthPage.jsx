import React, { useState } from 'react'
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
function Field({ label, required, icon, error, hint, children }) {
  return (
    <div className={`auth-field${error ? ' has-error' : ''}`}>
      <label className="auth-label">
        {label}{required && <span className="auth-required">*</span>}
      </label>
      <div className="auth-input-wrap">
        <span className="auth-icon">{icon}</span>
        {children}
      </div>
      {error  && <span className="auth-error">{error}</span>}
      {!error && hint && <span className="auth-hint">{hint}</span>}
    </div>
  )
}

/* ── AuthPage ── */
export default function AuthPage() {
  const [tab, setTab]       = useState('register')
  const [showPw, setShowPw] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    fullname: '', username: '', email: '',
    phone: '', age: '', password: '',
  })

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  function validate() {
    const e = {}
    if (!form.fullname.trim())                       e.fullname = "Ism majburiy"
    if (!form.username.trim())                       e.username = "Foydalanuvchi nomi majburiy"
    else if (form.username.length < 3)               e.username = "Kamida 3 ta belgi"
    if (!form.email.trim())                          e.email    = "Email majburiy"
    else if (!/\S+@\S+\.\S+/.test(form.email))      e.email    = "Email noto'g'ri"
    if (!form.phone.trim())                          e.phone    = "Telefon majburiy"
    if (!form.age)                                   e.age      = "Yosh majburiy"
    else if (Number(form.age) < 13 || Number(form.age) > 100) e.age = "13 – 100 orasida"
    if (!form.password)                              e.password = "Parol majburiy"
    else if (form.password.length < 8)               e.password = "Kamida 8 ta belgi"
    if (!agreed)                                     e.terms    = "Shartlarni qabul qiling"
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0)
      alert(`Xush kelibsiz, ${form.fullname}!\nRo'yxatdan o'tish muvaffaqiyatli!`)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ── Header ── */}
        <div className="auth-header">
          <div className="auth-logo">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1>Xush kelibsiz</h1>
          <p>Davom etish uchun hisobingizga kiring</p>
        </div>

        {/* ── Tabs ── */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab${tab === 'register' ? ' active' : ''}`}
            onClick={() => setTab('register')}
          >
            Ro'yxatdan o'tish
          </button>
          <button
            type="button"
            className={`auth-tab${tab === 'login' ? ' active' : ''}`}
            onClick={() => setTab('login')}
          >
            Kirish
          </button>
        </div>

        {/* ── Body ── */}
        <div className="auth-body">

          {tab === 'register' && (
            <form className="auth-form" onSubmit={handleSubmit} noValidate>

              <Field label="To'liq ism" required icon={<UserIcon />} error={errors.fullname}>
                <input className="auth-input" type="text" placeholder="Shokhrukh Karimov"
                  value={form.fullname} onChange={set('fullname')} />
              </Field>

              <div className="auth-row">
                <Field label="Foydalanuvchi nomi" required icon={<AtIcon />} error={errors.username} hint="3+ belgi">
                  <input className="auth-input" type="text" placeholder="shokhrukh_k"
                    value={form.username} onChange={set('username')} />
                </Field>
                <Field label="Yosh" required icon={<CakeIcon />} error={errors.age}>
                  <input className="auth-input" type="number" placeholder="20" min="13" max="100"
                    value={form.age} onChange={set('age')} />
                </Field>
              </div>

              <Field label="Email" required icon={<MailIcon />} error={errors.email}>
                <input className="auth-input" type="email" placeholder="shokhrukh@example.com"
                  value={form.email} onChange={set('email')} />
              </Field>

              <Field label="Telefon" required icon={<PhoneIcon />} error={errors.phone} hint="+998 XX XXX XX XX">
                <input className="auth-input" type="tel" placeholder="+998 90 123 45 67"
                  value={form.phone} onChange={set('phone')} />
              </Field>

              <Field label="Parol" required icon={<LockIcon />} error={errors.password}>
                <input
                  className="auth-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Kamida 8 ta belgi"
                  style={{ paddingRight: 44 }}
                  value={form.password}
                  onChange={set('password')}
                />
                <button type="button" className="auth-eye" onClick={() => setShowPw(v => !v)}>
                  <EyeIcon open={showPw} />
                </button>
              </Field>
              <PasswordStrength password={form.password} />

              <label className="auth-terms" onClick={() => setAgreed(v => !v)}>
                <input type="checkbox" checked={agreed} readOnly />
                <span className="auth-checkbox"><CheckIcon /></span>
                <span>
                  <a href="#">Foydalanish shartlari</a> va <a href="#">Maxfiylik siyosati</a>ni qabul qilaman
                </span>
              </label>
              {errors.terms && <span className="auth-error">{errors.terms}</span>}

              <button type="submit" className="auth-submit">Ro'yxatdan o'tish</button>

              <div className="auth-divider"><span>yoki</span></div>

              <div className="auth-socials">
                <button type="button" className="auth-social"><GoogleIcon /> Google</button>
                <button type="button" className="auth-social"><GithubIcon /> GitHub</button>
              </div>
            </form>
          )}

          {tab === 'login' && (
            <form className="auth-form" onSubmit={e => e.preventDefault()}>
              <Field label="Email yoki username" required icon={<MailIcon />}>
                <input className="auth-input" type="text" placeholder="shokhrukh@example.com" />
              </Field>
              <Field label="Parol" required icon={<LockIcon />}>
                <input
                  className="auth-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Parolingizni kiriting"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" className="auth-eye" onClick={() => setShowPw(v => !v)}>
                  <EyeIcon open={showPw} />
                </button>
              </Field>
              <div className="auth-forgot">
                <a href="#">Parolni unutdingizmi?</a>
              </div>
              <button type="submit" className="auth-submit">Kirish</button>
              <div className="auth-divider"><span>yoki</span></div>
              <div className="auth-socials">
                <button type="button" className="auth-social"><GoogleIcon /> Google</button>
                <button type="button" className="auth-social"><GithubIcon /> GitHub</button>
              </div>
            </form>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="auth-footer">
          {tab === 'register'
            ? <>Hisobingiz bormi? <a href="#" onClick={() => setTab('login')}>Kirish</a></>
            : <>Hisobingiz yo'qmi? <a href="#" onClick={() => setTab('register')}>Ro'yxatdan o'tish</a></>
          }
        </div>

      </div>
    </div>
  )
}
