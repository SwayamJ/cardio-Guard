import './About.css'

export default function About() {
    return (
        <div className="about-wrapper">
            <header className="about-hero">
                <h1>About CardioGuard</h1>
                <p>Understanding cardiovascular disease and the AI behind the prediction</p>
            </header>

            <div className="about-content">

                {/* Section 1 */}
                <section className="about-section">
                    <div className="about-section-icon">❤️</div>
                    <h2>What is Cardiovascular Disease?</h2>
                    <p>
                        Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels.
                        It remains the <strong>leading cause of death globally</strong>, responsible for an estimated
                        17.9 million deaths each year — around 32% of all deaths worldwide.
                    </p>
                    <p>
                        CVD includes conditions such as coronary artery disease, heart attacks, stroke, heart failure,
                        arrhythmia, and peripheral artery disease. Early detection is critical: most cardiovascular
                        events are preventable when risk factors are identified and managed in time.
                    </p>
                    <div className="info-cards">
                        <div className="info-card">
                            <span>🫀</span>
                            <h4>Heart Attack</h4>
                            <p>Blockage of blood flow to the heart muscle due to plaque buildup.</p>
                        </div>
                        <div className="info-card">
                            <span>🧠</span>
                            <h4>Stroke</h4>
                            <p>Interruption of blood supply to the brain causing cell death.</p>
                        </div>
                        <div className="info-card">
                            <span>🩺</span>
                            <h4>Hypertension</h4>
                            <p>Persistently elevated blood pressure damaging arteries over time.</p>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="about-section">
                    <div className="about-section-icon">⚠️</div>
                    <h2>Key Risk Factors</h2>
                    <p>Cardiovascular disease risk is determined by a combination of modifiable and non-modifiable factors:</p>
                    <div className="risk-table">
                        <div className="risk-col">
                            <h4>🔒 Non-modifiable</h4>
                            <ul>
                                <li><strong>Age</strong> — Risk increases significantly over 45</li>
                                <li><strong>Gender</strong> — Men at higher risk at younger ages</li>
                                <li><strong>Genetics</strong> — Family history plays a role</li>
                            </ul>
                        </div>
                        <div className="risk-col">
                            <h4>✏️ Modifiable</h4>
                            <ul>
                                <li><strong>Blood Pressure</strong> — High BP strains the heart</li>
                                <li><strong>Cholesterol</strong> — LDL buildup narrows arteries</li>
                                <li><strong>Glucose / Diabetes</strong> — Damages blood vessels</li>
                                <li><strong>Smoking</strong> — Doubles CVD risk</li>
                                <li><strong>Alcohol</strong> — Raises blood pressure</li>
                                <li><strong>Physical Inactivity</strong> — Leads to obesity, high BP</li>
                                <li><strong>Weight / BMI</strong> — Obesity burdens the heart</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 3 — Model */}
                <section className="about-section">
                    <div className="about-section-icon">🤖</div>
                    <h2>The Gradient Boosting Model</h2>
                    <p>
                        CardioGuard uses a <strong>Gradient Boosting Classifier</strong> wrapped in a scikit-learn
                        pipeline for cardiovascular disease prediction. Gradient Boosting is an ensemble method that
                        builds many decision trees <em>sequentially</em>, each one correcting the errors of the previous.
                    </p>

                    <div className="model-steps">
                        <div className="model-step">
                            <div className="step-num">1</div>
                            <div>
                                <h4>Boosting Strategy</h4>
                                <p>Weak learners (shallow decision trees) are combined with gradient descent to minimize prediction error.</p>
                            </div>
                        </div>
                        <div className="model-step">
                            <div className="step-num">2</div>
                            <div>
                                <h4>Sklearn Pipeline</h4>
                                <p>The model is wrapped in a pipeline that handles preprocessing (scaling, encoding) automatically before prediction.</p>
                            </div>
                        </div>
                        <div className="model-step">
                            <div className="step-num">3</div>
                            <div>
                                <h4>Prediction</h4>
                                <p>Given 11 health features, the model outputs a binary label — <strong>0</strong> (no disease) or <strong>1</strong> (disease present) — along with a probability score.</p>
                            </div>
                        </div>
                    </div>

                    <div className="advantage-grid">
                        {[
                            ['📈', 'High Accuracy', 'Gradient Boosting consistently outperforms simpler models on tabular health data.'],
                            ['🔧', 'Robust Pipeline', 'End-to-end pipeline prevents data leakage and ensures consistent preprocessing.'],
                            ['🧩', 'Feature Importance', 'GB provides interpretable feature importances — blood pressure and age typically rank highest.'],
                            ['⚖️', 'Handles Imbalance', 'Tuned hyperparameters help the model handle class imbalance in medical datasets.'],
                        ].map(([icon, title, desc]) => (
                            <div className="advantage-card" key={title}>
                                <span>{icon}</span>
                                <h4>{title}</h4>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4 — Dataset */}
                <section className="about-section">
                    <div className="about-section-icon">📂</div>
                    <h2>Dataset</h2>
                    <p>
                        The model was trained on the <strong>Cardiovascular Disease dataset</strong> (available on Kaggle),
                        containing <strong>70,000 patient records</strong> with 11 features and a binary target.
                        Each row corresponds to one patient examination.
                    </p>
                    <div className="dataset-pills">
                        {['70,000 Records', '11 Features', 'Binary Target', 'Kaggle Dataset', 'Clinical Data', 'Balanced Split'].map(tag => (
                            <span className="pill" key={tag}>{tag}</span>
                        ))}
                    </div>
                </section>

                {/* Disclaimer */}
                <div className="disclaimer-box">
                    <strong>⚠️ Medical Disclaimer</strong>
                    <p>
                        CardioGuard is a machine-learning demonstration built for educational purposes.
                        It is <em>not</em> a certified medical device and should <em>not</em> replace professional
                        medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
                    </p>
                </div>
            </div>
        </div>
    )
}
