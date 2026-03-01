import { Link } from 'react-router-dom'
import './Home.css'

const stats = [
    { value: '17.9M', label: 'Deaths per year globally', icon: '🌍' },
    { value: '32%', label: 'Of all global deaths', icon: '📊' },
    { value: '80%', label: 'Preventable with lifestyle changes', icon: '💪' },
    { value: '5+', label: 'Key risk factors identified', icon: '🔬' },
]

const features = [
    { icon: '🤖', title: 'AI-Powered', desc: 'Gradient Boosting model trained on 70,000+ patient records' },
    { icon: '⚡', title: 'Instant Results', desc: 'Prediction delivered in under a second' },
    { icon: '🎯', title: 'High Accuracy', desc: 'Tuned pipeline for precision on clinical cardio data' },
]

export default function Home() {
    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero-badge">AI Health Technology</div>
                <h1 className="hero-title">
                    Know Your Heart's<br />
                    <span className="hero-accent">Risk Score</span>
                </h1>
                <p className="hero-subtitle">
                    Enter your health metrics and let our Gradient Boosting AI model assess
                    your cardiovascular disease risk in seconds.
                </p>
                <div className="hero-actions">
                    <Link to="/predict" className="btn-primary">
                        Check Your Risk →
                    </Link>
                    <Link to="/about" className="btn-secondary">
                        Learn More
                    </Link>
                </div>

                {/* floating cards */}
                <div className="hero-float hero-float--1">❤️ Heart Rate Normal</div>
                <div className="hero-float hero-float--2">🩺 BP: 120/80</div>
                <div className="hero-float hero-float--3">✅ Low Risk</div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="stats-grid">
                    {stats.map(s => (
                        <div className="stat-card" key={s.label}>
                            <span className="stat-icon">{s.icon}</span>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <h2 className="section-title">Why CardioGuard?</h2>
                <div className="features-grid">
                    {features.map(f => (
                        <div className="feature-card" key={f.title}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-section">
                <div className="cta-inner">
                    <h2>Ready to find out your risk?</h2>
                    <p>Takes less than 2 minutes. No account required.</p>
                    <Link to="/predict" className="btn-primary btn-large">
                        Start Prediction
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <span>© 2025 CardioGuard · Built with React & Gradient Boosting ML</span>
                <span className="footer-disclaimer">For educational purposes only. Not a substitute for medical advice.</span>
            </footer>
        </div>
    )
}
