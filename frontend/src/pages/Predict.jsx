import { useState } from 'react'
import './Predict.css'

const INITIAL = {
    age: '', gender: '1', height: '', weight: '',
    ap_hi: '', ap_lo: '',
    cholesterol: '1', gluc: '1',
    smoke: '0', alco: '0', active: '1',
}

const FIELD_INFO = {
    age: { label: 'Age', unit: 'years', type: 'number', min: 1, max: 120, placeholder: 'e.g. 45' },
    height: { label: 'Height', unit: 'cm', type: 'number', min: 50, max: 250, placeholder: 'e.g. 170' },
    weight: { label: 'Weight', unit: 'kg', type: 'number', min: 10, max: 300, placeholder: 'e.g. 75' },
    ap_hi: { label: 'Systolic BP', unit: 'mmHg', type: 'number', min: 50, max: 300, placeholder: 'e.g. 120' },
    ap_lo: { label: 'Diastolic BP', unit: 'mmHg', type: 'number', min: 30, max: 200, placeholder: 'e.g. 80' },
}

function ToggleGroup({ label, name, value, onChange, options }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="toggle-group">
                {options.map(opt => (
                    <button
                        key={opt.value}
                        type="button"
                        className={`toggle-btn ${value === opt.value ? 'selected' : ''}`}
                        onClick={() => onChange(name, opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function Predict() {
    const [form, setForm] = useState(INITIAL)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (name, value) => setForm(f => ({ ...f, [name]: value }))

    const handleInput = e => handleChange(e.target.name, e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setResult(null)
        try {
            const payload = {}
            for (const [k, v] of Object.entries(form)) {
                payload[k] = parseFloat(v)
            }
            const res = await fetch('https://cardio-guard-g4rt.onrender.com/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setResult(data)
        } catch (err) {
            setError(err.message || 'Prediction failed. Is the Flask server running?')
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => { setResult(null); setError(null); setForm(INITIAL) }

    if (result !== null) {
        const positive = result.prediction === 1
        const prob = result.probability != null ? Math.round(result.probability * 100) : null
        return (
            <div className="predict-wrapper">
                <div className={`result-card ${positive ? 'result-positive' : 'result-negative'}`}>
                    <div className="result-icon">{positive ? '⚠️' : '✅'}</div>
                    <h2>{positive ? 'Cardiovascular Disease Detected' : 'No Disease Detected'}</h2>
                    <p className="result-desc">
                        {positive
                            ? 'The model indicates a high likelihood of cardiovascular disease. Please consult a physician.'
                            : 'The model suggests a low likelihood of cardiovascular disease. Keep up the healthy lifestyle!'}
                    </p>
                    {prob !== null && (
                        <div className="prob-bar-wrap">
                            <div className="prob-label">Risk Probability: <strong>{prob}%</strong></div>
                            <div className="prob-bar">
                                <div
                                    className="prob-fill"
                                    style={{ width: `${prob}%`, background: positive ? '#e05c5c' : 'var(--c1)' }}
                                />
                            </div>
                        </div>
                    )}
                    <p className="result-disclaimer">⚠️ This is for educational purposes only. Not a medical diagnosis.</p>
                    <button className="btn-primary" onClick={handleReset}>Try Again</button>
                </div>
            </div>
        )
    }

    return (
        <div className="predict-wrapper">
            <div className="predict-header">
                <h1>Cardiovascular Risk Assessment</h1>
                <p>Fill in your health details below and click <strong>Predict</strong></p>
            </div>

            <form className="predict-form" onSubmit={handleSubmit}>
                {/* Numeric Inputs */}
                <div className="form-section">
                    <h3 className="form-section-title">📋 Basic Information</h3>
                    <div className="form-row">
                        {['age', 'height', 'weight'].map(key => (
                            <div className="form-group" key={key}>
                                <label>{FIELD_INFO[key].label} <span className="unit">({FIELD_INFO[key].unit})</span></label>
                                <input
                                    type="number"
                                    name={key}
                                    value={form[key]}
                                    min={FIELD_INFO[key].min}
                                    max={FIELD_INFO[key].max}
                                    placeholder={FIELD_INFO[key].placeholder}
                                    required
                                    onChange={handleInput}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gender */}
                <div className="form-section">
                    <h3 className="form-section-title">👤 Demographics</h3>
                    <ToggleGroup label="Gender" name="gender" value={form.gender} onChange={handleChange}
                        options={[{ value: '2', label: 'Male' }, { value: '1', label: 'Female' }]} />
                </div>

                {/* BP */}
                <div className="form-section">
                    <h3 className="form-section-title">🩺 Blood Pressure</h3>
                    <div className="form-row">
                        {['ap_hi', 'ap_lo'].map(key => (
                            <div className="form-group" key={key}>
                                <label>{FIELD_INFO[key].label} <span className="unit">({FIELD_INFO[key].unit})</span></label>
                                <input
                                    type="number"
                                    name={key}
                                    value={form[key]}
                                    min={FIELD_INFO[key].min}
                                    max={FIELD_INFO[key].max}
                                    placeholder={FIELD_INFO[key].placeholder}
                                    required
                                    onChange={handleInput}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lab values */}
                <div className="form-section">
                    <h3 className="form-section-title">🔬 Lab Results</h3>
                    <ToggleGroup label="Cholesterol Level" name="cholesterol" value={form.cholesterol} onChange={handleChange}
                        options={[
                            { value: '1', label: 'Normal (1)' },
                            { value: '2', label: 'Above Normal (2)' },
                            { value: '3', label: 'Well Above (3)' },
                        ]} />
                    <ToggleGroup label="Glucose Level" name="gluc" value={form.gluc} onChange={handleChange}
                        options={[
                            { value: '1', label: 'Normal (1)' },
                            { value: '2', label: 'Above Normal (2)' },
                            { value: '3', label: 'Well Above (3)' },
                        ]} />
                </div>

                {/* Lifestyle */}
                <div className="form-section">
                    <h3 className="form-section-title">🏃 Lifestyle Factors</h3>
                    <div className="lifestyle-row">
                        <ToggleGroup label="Smoking" name="smoke" value={form.smoke} onChange={handleChange}
                            options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
                        <ToggleGroup label="Alcohol" name="alco" value={form.alco} onChange={handleChange}
                            options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
                        <ToggleGroup label="Physically Active" name="active" value={form.active} onChange={handleChange}
                            options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
                    </div>
                </div>

                {error && <div className="error-box">❌ {error}</div>}

                <button type="submit" className="btn-primary btn-large submit-btn" disabled={loading}>
                    {loading ? <span className="spinner" /> : '🔍 Predict My Risk'}
                </button>
            </form>
        </div>
    )
}
