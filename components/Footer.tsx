export default function Footer() {
  return (
    <footer className="text-white py-12 px-8 text-center" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          <a href="#about" className="text-white/80 no-underline text-sm transition-colors hover:text-white">Chi Siamo</a>
          <a href="#partnership" className="text-white/80 no-underline text-sm transition-colors hover:text-white">Partnership</a>
          <a href="#privacy" className="text-white/80 no-underline text-sm transition-colors hover:text-white">Privacy Policy</a>
          <a href="mailto:info@powdermatch.com" className="text-white/80 no-underline text-sm transition-colors hover:text-white">Contatti</a>
        </div>
        <div className="pt-8 border-t text-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}>
          <p><strong>© 2026 PowderMatch</strong> - Intelligenza Artificiale per lo Sci</p>
        </div>
      </div>
    </footer>
  )
}
