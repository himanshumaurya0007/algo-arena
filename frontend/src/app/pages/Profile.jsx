import { useState, useEffect } from 'react';
import { profileService } from '../../shared/services/profileService';
import Loader from '../../shared/ui/Loader';
import toast from 'react-hot-toast';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    countryCode: '',
    phoneNumber: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await profileService.get();
      const p = response.data;
      setProfile(p);
      setFormData({
        firstName: p.firstName || '',
        lastName: p.lastName || '',
        bio: p.bio || '',
        countryCode: p.countryCode || '',
        phoneNumber: p.phoneNumber || '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await profileService.update(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text font-heading mb-6">Profile</h1>

      <div className="bg-surface rounded-lg border border-border p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Country Code
              </label>
              <input
                type="text"
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({ ...formData, countryCode: e.target.value })
                }
                placeholder="+1"
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

