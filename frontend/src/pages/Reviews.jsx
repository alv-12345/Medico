import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContextCore';
import api from '../services/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal';
import { assets } from '../assets/assets';

const Reviews = () => {
    const { user, token } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchReviews = async () => {
        try {
            const { data } = await api.get('/review/all');
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.warn('Please login to submit a review');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/review/add', { rating, comment });
            if (data.success) {
                toast.success('Thank you for your feedback!');
                setComment('');
                setRating(5);
                fetchReviews();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 max-w-7xl mx-auto px-4 sm:px-6"
        >
            <div className="text-center mb-16">
                <Reveal width="100%">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Patient <span className="text-gradient">Experiences</span>
                    </h1>
                </Reveal>
                <Reveal width="100%" delay={0.2}>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                        Your health is our priority. Read what our community has to say or share your own journey with us.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
                {/* Submit Form */}
                <Reveal>
                    <div className="glass-card p-8 rounded-3xl border border-emerald-100 shadow-xl sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Feedback</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Rating</label>
                                <div className="flex gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-2xl transition-all hover:scale-125 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Your Thoughts</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="How was your experience with Medico?"
                                    className="w-full mt-2 bg-gray-50/50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[150px] font-medium"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="primary-gradient text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    'SUBMIT REVIEW'
                                )}
                            </button>
                        </form>
                    </div>
                </Reveal>

                {/* Reviews List */}
                <div className="space-y-8">
                    {fetching ? (
                        <div className="flex flex-col gap-6">
                            {[1, 2, 3].map(n => (
                                <div key={n} className="h-40 bg-gray-100 animate-pulse rounded-3xl"></div>
                            ))}
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-20 glass-card rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-400 font-medium italic">No reviews yet. Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {reviews.map((rev, index) => (
                                <motion.div
                                    key={rev._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card p-8 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all shadow-sm group"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-50 shadow-sm">
                                                <img src={rev.userImage && rev.userImage !== 'null' ? rev.userImage : assets.profile_pic} alt={rev.userName} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 tracking-tight">{rev.userName}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                    {new Date(rev.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < rev.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed font-medium italic group-hover:text-gray-800 transition-colors">
                                        "{rev.comment}"
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Reviews;
