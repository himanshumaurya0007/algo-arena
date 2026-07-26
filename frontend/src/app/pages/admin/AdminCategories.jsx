import { useState, useEffect } from 'react';
import { adminService } from '../../../shared/services/adminService';
import Loader from '../../../shared/ui/Loader';
import toast from 'react-hot-toast';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', displayOrder: 0 });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCategory(formData);
      toast.success('Category created');
      setShowForm(false);
      setFormData({ name: '', description: '', displayOrder: 0 });
      loadCategories();
    } catch (error) {
      toast.error('Failed to create category');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text font-heading">Categories</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90"
        >
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface rounded-lg border border-border p-6 mb-6 max-w-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-text outline-none focus:border-primary"
              />
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90">
              Create
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">Slug</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-text-muted">Order</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-background/50">
                <td className="px-6 py-4 text-sm text-text">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{cat.slug}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    cat.status === 'Published' ? 'text-green-500 bg-green-500/10' : 'text-yellow-500 bg-yellow-500/10'
                  }`}>
                    {cat.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm text-text-muted">{cat.displayOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCategories;
