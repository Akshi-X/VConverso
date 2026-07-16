import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Camera, Save, Award, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    native_language: '',
    learning_goal: ''
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile(res.data.profile);
        setFormData({
          name: res.data.profile.name || '',
          bio: res.data.profile.bio || '',
          native_language: res.data.profile.native_language || '',
          learning_goal: res.data.profile.learning_goal || ''
        });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/users/profile', formData);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('avatar', file);

    try {
      const res = await api.post('/users/profile/avatar', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile({ ...profile, avatar: res.data.avatarUrl });
    } catch (err) {
      alert('Failed to upload avatar.');
    }
  };

  if (loading) return <div className="tw-p-8 tw-text-center">Loading...</div>;
  if (error) return <div className="tw-p-8 tw-text-center tw-text-red-500">{error}</div>;

  return (
    <div className="tw-min-h-screen tw-bg-v-bg tw-p-4 md:tw-p-8">
      <div className="tw-max-w-4xl tw-mx-auto tw-space-y-6">
        <Link to="/dashboard" className="tw-inline-flex tw-items-center tw-gap-2 tw-text-v-brown-dark hover:tw-underline tw-font-bold tw-mb-4">
          <ArrowLeft className="tw-w-4 tw-h-4" /> Back to Dashboard
        </Link>
        
        <h1 className="tw-text-3xl tw-font-bold tw-text-v-brown-dark">Your Profile</h1>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
          {/* Avatar and Basic Info */}
          <div className="md:tw-col-span-1 tw-bg-v-card tw-border tw-border-v-brown-med/20 tw-rounded-3xl tw-p-6 tw-text-center tw-shadow-md">
            <div className="tw-relative tw-w-32 tw-h-32 tw-mx-auto tw-mb-4">
              <div className="tw-w-full tw-h-full tw-rounded-full tw-bg-[#EFE4D6] tw-border-4 tw-border-white tw-shadow-sm tw-overflow-hidden tw-flex tw-items-center tw-justify-center">
                {profile?.avatar ? (
                  <img src={`http://localhost:5000${profile.avatar}`} alt="Avatar" className="tw-w-full tw-h-full tw-object-cover" />
                ) : (
                  <User className="tw-w-12 tw-h-12 tw-text-v-brown-med" />
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="tw-absolute tw-bottom-0 tw-right-0 tw-bg-v-brown-dark tw-text-white tw-p-2 tw-rounded-full tw-shadow-md hover:tw-scale-105 tw-transition-all"
              >
                <Camera className="tw-w-4 tw-h-4" />
              </button>
              <input type="file" ref={fileInputRef} className="tw-hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>
            <h2 className="tw-text-xl tw-font-bold tw-text-v-text-prim">{profile?.name}</h2>
            <p className="tw-text-sm tw-text-v-text-sec tw-mb-2">{profile?.email}</p>
            {profile?.email_verified === 1 ? (
              <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-xs tw-font-bold tw-text-green-600 tw-bg-green-100 tw-px-2 tw-py-1 tw-rounded-full">
                Verified
              </span>
            ) : (
              <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-xs tw-font-bold tw-text-amber-600 tw-bg-amber-100 tw-px-2 tw-py-1 tw-rounded-full">
                Unverified
              </span>
            )}
          </div>

          {/* Edit Profile Form */}
          <div className="md:tw-col-span-2 tw-bg-v-card tw-border tw-border-v-brown-med/20 tw-rounded-3xl tw-p-6 tw-shadow-md">
            <h3 className="tw-text-lg tw-font-bold tw-text-v-brown-dark tw-mb-4">Edit Details</h3>
            <form onSubmit={handleSubmit} className="tw-space-y-4">
              <div>
                <label className="tw-block tw-text-xs tw-font-bold tw-text-v-text-sec tw-uppercase tw-tracking-widest tw-mb-1">Display Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="tw-w-full tw-p-3 tw-rounded-xl tw-bg-[#F5EFE6] tw-border tw-border-[#C7B299]/50 focus:tw-outline-none focus:tw-border-v-brown-dark tw-font-medium" />
              </div>
              <div>
                <label className="tw-block tw-text-xs tw-font-bold tw-text-v-text-sec tw-uppercase tw-tracking-widest tw-mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} className="tw-w-full tw-p-3 tw-rounded-xl tw-bg-[#F5EFE6] tw-border tw-border-[#C7B299]/50 focus:tw-outline-none focus:tw-border-v-brown-dark tw-font-medium tw-resize-none tw-h-24" />
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                <div>
                  <label className="tw-block tw-text-xs tw-font-bold tw-text-v-text-sec tw-uppercase tw-tracking-widest tw-mb-1">Native Language</label>
                  <input type="text" name="native_language" value={formData.native_language} onChange={handleChange} className="tw-w-full tw-p-3 tw-rounded-xl tw-bg-[#F5EFE6] tw-border tw-border-[#C7B299]/50 focus:tw-outline-none focus:tw-border-v-brown-dark tw-font-medium" />
                </div>
                <div>
                  <label className="tw-block tw-text-xs tw-font-bold tw-text-v-text-sec tw-uppercase tw-tracking-widest tw-mb-1">Learning Goal</label>
                  <input type="text" name="learning_goal" value={formData.learning_goal} onChange={handleChange} placeholder="e.g., Travel, Career" className="tw-w-full tw-p-3 tw-rounded-xl tw-bg-[#F5EFE6] tw-border tw-border-[#C7B299]/50 focus:tw-outline-none focus:tw-border-v-brown-dark tw-font-medium" />
                </div>
              </div>
              <div className="tw-flex tw-justify-end tw-pt-4">
                <button type="submit" disabled={saving} className="tw-bg-gradient-to-r tw-from-v-brown-dark tw-to-v-brown-med hover:tw-from-v-brown-hover hover:tw-to-v-brown-dark tw-text-white tw-px-6 tw-py-2.5 tw-rounded-xl tw-font-bold tw-flex tw-items-center tw-gap-2">
                  {saving ? <Loader2 className="tw-w-4 tw-h-4 tw-animate-spin" /> : <Save className="tw-w-4 tw-h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Badge Wall */}
        <div className="tw-bg-v-card tw-border tw-border-v-brown-med/20 tw-rounded-3xl tw-p-6 tw-shadow-md">
          <h3 className="tw-text-lg tw-font-bold tw-text-v-brown-dark tw-mb-4 tw-flex tw-items-center tw-gap-2">
            <Award className="tw-w-5 tw-h-5" /> Badge Wall
          </h3>
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
            {profile?.badges?.length > 0 ? (
              profile.badges.map(badge => (
                <div key={badge.badge_id} className="tw-bg-[#F5EFE6] tw-p-4 tw-rounded-2xl tw-text-center tw-border tw-border-[#C7B299]/30">
                  <div className="tw-text-4xl tw-mb-2">{badge.icon}</div>
                  <h4 className="tw-font-bold tw-text-sm tw-text-v-text-prim tw-mb-1">{badge.name}</h4>
                  <p className="tw-text-xs tw-text-v-text-sec tw-m-0">{badge.description}</p>
                </div>
              ))
            ) : (
              <div className="tw-col-span-full tw-text-center tw-py-8 tw-text-v-text-muted">
                <p>You haven't earned any badges yet. Keep learning!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
