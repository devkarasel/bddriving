'use client'
import { useState, useEffect, useCallback } from 'react'
import CustomCursor from '@/components/CustomCursor'

type Tab = 'messages' | 'courses' | 'blogs'

interface Message { _id: string; name: string; email: string; phone?: string; course?: string; message: string; receivedAt: string; read: boolean; replied: boolean }
interface Course { _id?: string; icon: string; title: string; titleBn: string; description: string; price: number; duration: string; sessions: string; slug: string; published: boolean; order: number }
interface Blog { _id?: string; title: string; titleBn: string; excerpt: string; content: string; category: string; slug: string; published: boolean }

const EMPTY_COURSE: Course = { icon: '🚗', title: '', titleBn: '', description: '', price: 0, duration: '', sessions: '', slug: '', published: true, order: 0 }
const EMPTY_BLOG: Blog = { title: '', titleBn: '', excerpt: '', content: '', category: 'Tips', slug: '', published: true }

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [tab, setTab] = useState<Tab>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)
  const [courseForm, setCourseForm] = useState<Course>(EMPTY_COURSE)
  const [blogForm, setBlogForm] = useState<Blog>(EMPTY_BLOG)
  const [editingCourse, setEditingCourse] = useState<string | null>(null)
  const [editingBlog, setEditingBlog] = useState<string | null>(null)
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)

  const token = () => typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : ''
  const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` })

  const login = async () => {
    setLoginErr('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pass }) })
    const data = await res.json()
    if (data.success) { sessionStorage.setItem('admin_token', data.token); setAuthed(true) }
    else setLoginErr('Invalid password')
  }

  const fetchMessages = useCallback(async () => {
    const res = await fetch('/api/admin/messages', { headers: headers() })
    const data = await res.json()
    if (Array.isArray(data)) setMessages(data)
  }, [])

  const fetchCourses = useCallback(async () => {
    const res = await fetch('/api/admin/courses', { headers: headers() })
    const data = await res.json()
    if (Array.isArray(data)) setCourses(data)
  }, [])

  const fetchBlogs = useCallback(async () => {
    const res = await fetch('/api/admin/blogs', { headers: headers() })
    const data = await res.json()
    if (Array.isArray(data)) setBlogs(data)
  }, [])

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    Promise.all([fetchMessages(), fetchCourses(), fetchBlogs()]).finally(() => setLoading(false))
  }, [authed, fetchMessages, fetchCourses, fetchBlogs])

  const markRead = async (id: string) => {
    await fetch('/api/admin/messages', { method: 'PATCH', headers: headers(), body: JSON.stringify({ id, field: 'read', value: true }) })
    fetchMessages()
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch('/api/admin/messages', { method: 'DELETE', headers: headers(), body: JSON.stringify({ id }) })
    setSelectedMsg(null); fetchMessages()
  }

  const saveCourse = async () => {
    if (!courseForm.title || !courseForm.slug) return alert('Title and slug required')
    if (editingCourse) {
      await fetch('/api/admin/courses', { method: 'PUT', headers: headers(), body: JSON.stringify({ id: editingCourse, ...courseForm }) })
    } else {
      await fetch('/api/admin/courses', { method: 'POST', headers: headers(), body: JSON.stringify(courseForm) })
    }
    setCourseForm(EMPTY_COURSE); setEditingCourse(null); setShowCourseForm(false); fetchCourses()
  }

  const deleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return
    await fetch('/api/admin/courses', { method: 'DELETE', headers: headers(), body: JSON.stringify({ id }) })
    fetchCourses()
  }

  const saveBlog = async () => {
    if (!blogForm.title || !blogForm.slug) return alert('Title and slug required')
    if (editingBlog) {
      await fetch('/api/admin/blogs', { method: 'PUT', headers: headers(), body: JSON.stringify({ id: editingBlog, ...blogForm }) })
    } else {
      await fetch('/api/admin/blogs', { method: 'POST', headers: headers(), body: JSON.stringify(blogForm) })
    }
    setBlogForm(EMPTY_BLOG); setEditingBlog(null); setShowBlogForm(false); fetchBlogs()
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch('/api/admin/blogs', { method: 'DELETE', headers: headers(), body: JSON.stringify({ id }) })
    fetchBlogs()
  }

  // ── Login ──
  if (!authed) return (
    <div style={{ background: '#070B14', minHeight: '100vh' }} className="flex items-center justify-center px-6">
      <CustomCursor />
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 flex items-center justify-center font-display font-black text-xl rounded" style={{ background: '#F59E0B', color: '#070B14' }}>BD</div>
          <div>
            <p className="font-display font-bold text-xl leading-none" style={{ color: '#F0F4FF' }}>BD DRIVING</p>
            <p className="text-[10px] tracking-widest" style={{ color: 'rgba(240,244,255,0.4)' }}>ADMIN PANEL</p>
          </div>
        </div>
        <div className="rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 className="font-display font-extrabold text-2xl mb-6 text-center" style={{ color: '#F0F4FF' }}>Admin Login</h1>
          <label className="text-xs tracking-widest uppercase mb-2 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Enter admin password" className="form-field mb-4" />
          {loginErr && <p className="text-xs mb-4 font-mono" style={{ color: '#f87171' }}>{loginErr}</p>}
          <button onClick={login} className="w-full py-3 rounded-xl font-display font-bold text-sm tracking-wider transition-opacity hover:opacity-90" style={{ background: '#F59E0B', color: '#070B14' }}>Login →</button>
        </div>
      </div>
    </div>
  )

  const unread = messages.filter(m => !m.read).length

  return (
    <div style={{background:"#070B14",color:"#F0F4FF"}} className="min-h-screen">
      <CustomCursor />
      {/* Admin Nav */}
      <header className="px-6 h-14 flex items-center justify-between" style={{ background: 'rgba(13,19,33,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center font-display font-black text-base rounded" style={{ background: '#F59E0B', color: '#070B14' }}>BD</div>
          <p className="font-display font-bold tracking-wider" style={{ color: '#F0F4FF' }}>ADMIN PANEL</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" target="_blank" className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }} onMouseEnter={e => (e.currentTarget.style.color='#F59E0B')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.4)')}>View Site →</a>
          <button onClick={() => { sessionStorage.removeItem('admin_token'); setAuthed(false) }} className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }} onMouseEnter={e => (e.currentTarget.style.color='#F59E0B')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.4)')}>Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 w-fit rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {([['messages', `Messages${unread > 0 ? ` (${unread})` : ''}`], ['courses', 'Courses'], ['blogs', 'Blog Posts']] as [Tab, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 font-display font-semibold text-sm uppercase tracking-widest transition-all rounded-lg"
              style={{ background: tab === t ? '#F59E0B' : 'transparent', color: tab === t ? '#070B14' : 'rgba(240,244,255,0.5)' }}>
              {label}
            </button>
          ))}
        </div>

        {loading && <p className="text-muted font-mono text-sm">Loading...</p>}

        {/* ── MESSAGES ── */}
        {tab === 'messages' && (
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
            <div className="space-y-2">
              <p className="section-label mb-4">Inbox ({messages.length})</p>
              {messages.length === 0 && <p className="text-muted text-sm font-mono">No messages yet.</p>}
              {messages.map(m => (
                <div key={m._id} onClick={() => { setSelectedMsg(m); if (!m.read) markRead(m._id) }}
                  className="p-4 rounded-xl transition-all"
                  style={{
                    border: selectedMsg?._id === m._id ? '1px solid rgba(245,158,11,0.6)' : '1px solid rgba(255,255,255,0.08)',
                    background: selectedMsg?._id === m._id ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer'
                  }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-display font-semibold text-sm uppercase" style={{ color: !m.read ? '#F0F4FF' : 'rgba(240,244,255,0.5)', fontWeight: !m.read ? 700 : 600 }}>{m.name}</p>
                    {!m.read && <span className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />}
                  </div>
                  <p className="text-xs line-clamp-1" style={{ color: 'rgba(240,244,255,0.4)' }}>{m.message}</p>
                  <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(240,244,255,0.2)' }}>{new Date(m.receivedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <div>
              {selectedMsg ? (
                <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="font-display font-bold text-xl" style={{ color: '#F0F4FF' }}>{selectedMsg.name}</p>
                      <a href={`mailto:${selectedMsg.email}`} className="text-sm hover:underline" style={{ color: '#F59E0B' }}>{selectedMsg.email}</a>
                      {selectedMsg.phone && <p className="text-xs mt-1" style={{ color: 'rgba(240,244,255,0.4)' }}>{selectedMsg.phone}</p>}
                    </div>
                    <button onClick={() => deleteMsg(selectedMsg._id)} className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.3)' }} onMouseEnter={e => (e.currentTarget.style.color='#f87171')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.3)')}>Delete</button>
                  </div>
                  {selectedMsg.course && (
                    <div className="mb-4 px-3 py-2 inline-block rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <p className="text-xs font-mono" style={{ color: '#F59E0B' }}>Interested in: {selectedMsg.course}</p>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap mb-6" style={{ color: 'rgba(240,244,255,0.7)' }}>{selectedMsg.message}</p>
                  <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs font-mono" style={{ color: 'rgba(240,244,255,0.3)' }}>{new Date(selectedMsg.receivedAt).toLocaleString()}</p>
                    <a href={`mailto:${selectedMsg.email}?subject=Re: BD Driving School Enquiry`} className="text-sm px-5 py-2 rounded-lg font-display font-bold transition-opacity hover:opacity-90" style={{ background: '#F59E0B', color: '#070B14', textDecoration: 'none' }}>Reply via Email</a>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl flex items-center justify-center h-48" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-sm font-mono" style={{ color: 'rgba(240,244,255,0.3)' }}>Select a message to view</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── COURSES ── */}
        {tab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="section-label">Courses ({courses.length})</p>
              <button onClick={() => { setCourseForm(EMPTY_COURSE); setEditingCourse(null); setShowCourseForm(true) }} className="text-sm px-5 py-2 rounded-lg font-display font-bold transition-opacity hover:opacity-90" style={{ background: '#F59E0B', color: '#070B14' }}>+ Add Course</button>
            </div>

            {showCourseForm && (
              <div className="rounded-xl p-6 mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(245,158,11,0.4)' }}>
                <p className="font-display font-bold mb-4" style={{ color: '#F0F4FF' }}>{editingCourse ? 'Edit Course' : 'New Course'}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {[['icon', 'Icon (emoji)', 'text'], ['title', 'Title (English)', 'text'], ['titleBn', 'Title (Bangla)', 'text'], ['slug', 'Slug (e.g. car-driving)', 'text'], ['duration', 'Duration (e.g. 30 Days)', 'text'], ['sessions', 'Sessions (e.g. 20 Sessions)', 'text'], ['price', 'Price (৳)', 'number'], ['order', 'Display Order', 'number']].map(([field, label, type]) => (
                    <div key={field}>
                      <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'rgba(240,244,255,0.4)' }}>{label}</label>
                      <input type={type} value={String(courseForm[field as keyof Course] || '')} onChange={e => setCourseForm({ ...courseForm, [field]: type === 'number' ? Number(e.target.value) : e.target.value })} className="form-field" />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Description</label>
                  <textarea rows={3} value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} className="form-field resize-none" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={courseForm.published} onChange={e => setCourseForm({ ...courseForm, published: e.target.checked })} />
                    <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(240,244,255,0.4)' }}>Published</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button onClick={saveCourse} className="text-sm px-6 py-2 rounded-lg font-display font-bold transition-opacity hover:opacity-90" style={{ background: '#F59E0B', color: '#070B14' }}>Save Course</button>
                  <button onClick={() => setShowCourseForm(false)} className="text-sm px-6 py-2 rounded-lg font-display font-bold transition-colors" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F4FF' }}>Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {courses.length === 0 && <p className="text-muted font-mono text-sm">No courses yet. Add one above.</p>}
              {courses.map(c => (
                <div key={c._id} className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <p className="font-display font-semibold text-sm" style={{ color: '#F0F4FF' }}>{c.title}</p>
                      <p className="text-xs" style={{ color: 'rgba(240,244,255,0.4)' }}>{c.titleBn} · ৳{c.price} · {c.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${c.published ? 'text-green-400 bg-green-400/10' : 'text-muted bg-gray-100/10 rounded'}`}>
                      {c.published ? 'Live' : 'Draft'}
                    </span>
                    <button onClick={() => { setCourseForm(c); setEditingCourse(c._id || null); setShowCourseForm(true) }} className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }} onMouseEnter={e => (e.currentTarget.style.color='#F59E0B')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.4)')}>Edit</button>
                    <button onClick={() => deleteCourse(c._id!)} className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }} onMouseEnter={e => (e.currentTarget.style.color='#f87171')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.4)')}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BLOGS ── */}
        {tab === 'blogs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="section-label">Blog Posts ({blogs.length})</p>
              <button onClick={() => { setBlogForm(EMPTY_BLOG); setEditingBlog(null); setShowBlogForm(true) }} className="text-sm px-5 py-2 rounded-lg font-display font-bold transition-opacity hover:opacity-90" style={{ background: '#F59E0B', color: '#070B14' }}>+ New Post</button>
            </div>

            {showBlogForm && (
              <div className="rounded-xl p-6 mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(245,158,11,0.4)' }}>
                <p className="font-display font-bold mb-4" style={{ color: '#F0F4FF' }}>{editingBlog ? 'Edit Post' : 'New Post'}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {[['title', 'Title (English)'], ['titleBn', 'Title (Bangla)'], ['slug', 'Slug (e.g. driving-tips)'], ['category', 'Category (Tips/Guide/Safety/News)']].map(([field, label]) => (
                    <div key={field}>
                      <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'rgba(240,244,255,0.4)' }}>{label}</label>
                      <input value={String(blogForm[field as keyof Blog] || '')} onChange={e => setBlogForm({ ...blogForm, [field]: e.target.value })} className="form-field" />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Excerpt</label>
                  <textarea rows={2} value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} className="form-field resize-none" />
                </div>
                <div className="mb-4">
                  <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'rgba(240,244,255,0.4)' }}>Content (HTML or plain text)</label>
                  <textarea rows={8} value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} className="form-field resize-none font-mono text-xs" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm({ ...blogForm, published: e.target.checked })} />
                    <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(240,244,255,0.4)' }}>Published</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button onClick={saveBlog} className="text-sm px-6 py-2 rounded-lg font-display font-bold transition-opacity hover:opacity-90" style={{ background: '#F59E0B', color: '#070B14' }}>Save Post</button>
                  <button onClick={() => setShowBlogForm(false)} className="text-sm px-6 py-2 rounded-lg font-display font-bold" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F4FF' }}>Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {blogs.length === 0 && <p className="text-muted font-mono text-sm">No posts yet. Create one above.</p>}
              {blogs.map(b => (
                <div key={b._id} className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p className="font-display font-semibold text-sm line-clamp-1" style={{ color: '#F0F4FF' }}>{b.title}</p>
                    <p className="text-xs" style={{ color: 'rgba(240,244,255,0.4)' }}>{b.titleBn} · {b.category}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${b.published ? 'text-green-400 bg-green-400/10' : 'text-muted bg-gray-100/10 rounded'}`}>
                      {b.published ? 'Live' : 'Draft'}
                    </span>
                    <button onClick={() => { setBlogForm(b); setEditingBlog(b._id || null); setShowBlogForm(true) }} className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }} onMouseEnter={e => (e.currentTarget.style.color='#F59E0B')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.4)')}>Edit</button>
                    <button onClick={() => deleteBlog(b._id!)} className="text-xs font-mono transition-colors" style={{ color: 'rgba(240,244,255,0.4)' }} onMouseEnter={e => (e.currentTarget.style.color='#f87171')} onMouseLeave={e => (e.currentTarget.style.color='rgba(240,244,255,0.4)')}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
