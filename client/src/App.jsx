import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, CreditCard, ChevronRight, Upload, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const App = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        phone: '',
        church: '',
        attending: 'Yes',
        friendCount: 0,
        friendNames: '',
        paymentMode: 'UPI',
        paymentStatus: 'Will do it right away',
        screenshot: null
    });

    const addHeart = (e) => {
        const id = Date.now();
        const newHeart = {
            id,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 20 + 20,
            rotation: Math.random() * 360,
        };
        setHearts((prev) => [...prev, newHeart]);
        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== id));
        }, 1000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, screenshot: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                setSubmitted(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff4d6d', '#ffb3c1', '#ff0054']
                });
            }
        } catch (error) {
            alert('Failed to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (submitted) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '10rem' }} onClick={addHeart}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card"
                >
                    <CheckCircle2 size={80} color="#ff4d6d" style={{ margin: '0 auto 1.5rem' }} />
                    <h1>Registration Successful!</h1>
                    <p style={{ marginTop: '1rem' }}>We can't wait to see you on February 14th!</p>
                    <button
                        className="btn-primary"
                        style={{ marginTop: '2rem' }}
                        onClick={() => setSubmitted(false)}
                    >
                        Register Another Person
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" onClick={addHeart}>
            {/* Persistent Background Floating Hearts */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: Math.random() * 0.5 + 0.1,
                            y: '110vh',
                            x: `${Math.random() * 100}vw`,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: '-10vh',
                            x: `${(Math.random() - 0.5) * 10 + (i * 100 / 15)}vw`
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 20
                        }}
                        style={{ position: 'absolute', fontSize: '2rem' }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, scale: 0, y: heart.y }}
                        animate={{ opacity: 0, scale: 1.5, y: heart.y - 100 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            left: heart.x,
                            top: heart.y,
                            pointerEvents: 'none',
                            zIndex: 9999,
                            fontSize: heart.size,
                            rotate: heart.rotation,
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Section */}
                <section className="hero">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Heart className="floating" size={48} color="#ff4d6d" style={{ marginBottom: '1rem' }} />
                        <h1>Be Love</h1>
                        <p>Bring someone you love...</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="event-details">
                        {[
                            { icon: Calendar, title: "14th February", sub: "Valentine's Day" },
                            { icon: Clock, title: "5:30 PM", sub: "Sharply starts" },
                            { icon: MapPin, title: "INTOUCH Fellowship", sub: "Coimbatore" }
                        ].map((detail, i) => (
                            <motion.div
                                key={i}
                                className="detail-item"
                                whileHover={{ y: -5, color: '#ff4d6d' }}
                            >
                                <detail.icon className="icon" />
                                <h3>{detail.title}</h3>
                                <p>{detail.sub}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p variants={itemVariants} style={{ maxWidth: '800px', margin: '2rem auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
                        You’re invited to an exciting youth gathering! Join us for an evening of
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}> Fellowship, Fun, Games, and Food</span>.
                        Let's share love, laughter & joy together!
                    </motion.p>
                </section>

                {/* Registration Form */}
                <motion.section
                    variants={itemVariants}
                    className="registration-form glass-card"
                    whileHover={{ boxShadow: "0 20px 40px rgba(255, 77, 109, 0.2)" }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Reserve Your Spot</h2>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: [0.9, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ display: 'inline-block', background: 'rgba(255, 77, 109, 0.2)', padding: '0.5rem 1rem', borderRadius: '50px', color: 'var(--primary)', fontWeight: 'bold' }}>
                            Registration Fee: ₹50
                        </motion.div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name 👤</label>
                            <input type="text" name="fullName" required className="glass-input" placeholder="Enter your full name" onChange={handleInputChange} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Age 🎂</label>
                                <input type="number" name="age" required className="glass-input" placeholder="Your age" onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone / WhatsApp 📱</label>
                                <input type="tel" name="phone" required className="glass-input" placeholder="10-digit number" onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Which Church / Fellowship? ⛪</label>
                            <input type="text" name="church" required className="glass-input" placeholder="Name of your church" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Will you be attending? ✅</label>
                            <select name="attending" className="glass-input" onChange={handleInputChange}>
                                <option>Yes</option>
                                <option>Maybe</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>How many friends are you inviting?</label>
                            <input type="number" name="friendCount" required className="glass-input" placeholder="0" min="0" onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Names of friends 📝</label>
                            <textarea name="friendNames" required className="glass-input" placeholder="Mention their names here..." rows="2" onChange={handleInputChange}></textarea>
                        </div>

                        <div style={{ margin: '2rem 0', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)' }}>
                                <CreditCard size={20} /> Payment Details
                            </h3>

                            <div className="qr-section">
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#ccc' }}>Scan to pay ₹50 via UPI</p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    style={{ background: 'white', width: '220px', height: '220px', margin: '0 auto', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                                    <img
                                        src="/qr-code.png"
                                        alt="Payment QR Code"
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        onError={(e) => {
                                            e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Please_Upload_Your_QR_Code';
                                        }}
                                    />
                                </motion.div>
                                <p style={{ marginTop: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>Scan & Pay ₹50</p>
                                <motion.p
                                    whileHover={{ scale: 1.1 }}
                                    style={{ marginTop: '0.5rem', color: 'white', opacity: 0.9, background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                                    GPay Number: <span style={{ fontWeight: 'bold', color: 'var(--gold)', fontSize: '1.2rem' }}>8523935925</span>
                                </motion.p>
                            </div>

                            <div className="form-group" style={{ marginTop: '2rem' }}>
                                <label>Payment Mode 💸</label>
                                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                                    {['UPI', 'Cash (at venue)'].map(mode => (
                                        <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontSize: '1rem' }}>
                                            <input type="radio" name="paymentMode" value={mode} required checked={formData.paymentMode === mode} onChange={handleInputChange} />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Have you completed the payment? 💰</label>
                                <select name="paymentStatus" required className="glass-input" onChange={handleInputChange}>
                                    <option value="">Choose one...</option>
                                    <option>Will do it right away</option>
                                    <option>Yes ✅</option>
                                    <option>I will pay at the venue</option>
                                </select>
                            </div>

                            {formData.paymentMode === 'UPI' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="form-group"
                                >
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Upload size={16} /> Upload Payment Screenshot 📷
                                    </label>
                                    <input type="file" name="screenshot" accept="image/*" required className="glass-input" onChange={handleFileChange} />
                                </motion.div>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', height: '60px' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Complete Registration'} <ChevronRight />
                        </motion.button>
                    </form>
                </motion.section>

                <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--secondary)', opacity: 0.7 }}>
                    <p>© 2026 INTOUCH Fellowship, Coimbatore. Spread Love!</p>
                </footer>
            </motion.div>
        </div>
    );
};

export default App;
