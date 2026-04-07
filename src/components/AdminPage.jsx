import { useEffect, useMemo, useState, useRef } from 'react';
import './admin.css';
import { getApiBaseUrl } from '../lib/apiBaseUrl';
import {
  isNameUnavailableToday,
  loadDailyUnavailableMap,
  normalizeMenuName,
  saveDailyUnavailableMap,
} from '../lib/menuAvailability';

const API_BASE_URL = getApiBaseUrl();
const TOKEN_KEY = 'bb_admin_token';
const SECTION_OPTIONS = [
  'Bakery Items',
  'Breakfast',
  'Lunch',
  'Loaded Energy',
  'Specialty Coffee',
  'Classic Espresso',
  'Iced Latte',
  'Hot Latte',
  'Frappes',
  'Dirty Sodas',
  'Smoothies',
];

const defaultVariation = {name: 'Regular', priceAmount: ''};



const toFormState = (item) => ({
  id: item?.id || null,
  name: item?.name || '',
  description: item?.description || '',
  categoryId: item?.categoryId || '',
  section: item?.section || 'Bakery Items',
  visibility: item?.visible === false ? 'hidden' : 'public',
  variations:
    Array.isArray(item?.variations) && item.variations.length
      ? item.variations.map((variation) => ({
          name: variation?.name || 'Regular',
          priceAmount:
            typeof variation?.priceAmount === 'number'
              ? String((variation.priceAmount / 100).toFixed(2))
              : '',
        }))
      : [{ ...defaultVariation }],
});

const toPayload = (form) => ({
  name: form.name.trim(),
  description: form.description.trim(),
  categoryId: form.categoryId.trim() || null,
  section: form.section,
  visible: form.visibility !== 'hidden',
  variations: form.variations
    .map((variation) => ({
      name: variation.name.trim() || 'Regular',
      priceAmount: Math.round(Number(variation.priceAmount || 0) * 100),
      currency: 'USD',
    }))
    .filter((variation) => Number.isFinite(variation.priceAmount) && variation.priceAmount > 0),
});

async function apiRequest(path, options = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(`Could not connect to API at ${API_BASE_URL}`);
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || 'Request failed');
  }

  return data;
}

function ItemForm({ form, onChange, onVariationChange, onAddVariation, onRemoveVariation, onSubmit, onCancel, isSaving }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{form.id ? 'Edit Item' : 'Add Item'}</h2>

      <label>
        Item Name
        <input
          type="text"
          value={form.name}
          onChange={(event) => onChange('name', event.target.value)}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(event) => onChange('description', event.target.value)}
          rows={3}
        />
      </label>

      <label>
        Category ID (optional, auto-filled from section if blank)
        <input
          type="text"
          value={form.categoryId}
          onChange={(event) => onChange('categoryId', event.target.value)}
        />
        <small className="admin-field-help">
          Square category identifier for reporting/organization. Leave blank to auto-use the section&apos;s category.
        </small>
      </label>

      <label>
        Section
        <select
          value={form.section}
          onChange={(event) => onChange('section', event.target.value)}
          required
        >
          {SECTION_OPTIONS.map((section) => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </label>

      <label>
        Visibility
        <select
          value={form.visibility}
          onChange={(event) => onChange('visibility', event.target.value)}
          required
        >
          <option value="public">Public</option>
          <option value="hidden">Hidden</option>
        </select>
      </label>

      <div className="admin-variations">
        <div className="admin-variations__header">
          <strong>Variations</strong>
          <button type="button" onClick={onAddVariation}>+ Add variation</button>
        </div>

        {form.variations.map((variation, index) => (
          <div className="admin-variation-row" key={index}>
            <input
              type="text"
              placeholder="Variation name"
              value={variation.name}
              onChange={(event) => onVariationChange(index, 'name', event.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Price (USD)"
              value={variation.priceAmount}
              onChange={(event) => onVariationChange(index, 'priceAmount', event.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => onRemoveVariation(index)}
              disabled={form.variations.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="admin-form__actions">
        <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Item'}</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function AdminPage() {
  const [menuFilter, setMenuFilter] = useState('current');
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(toFormState(null));
  const [isSaving, setIsSaving] = useState(false);
  const [togglingItemId, setTogglingItemId] = useState('');
  const [publishSections, setPublishSections] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dailyUnavailableMap, setDailyUnavailableMap] = useState(() => loadDailyUnavailableMap());
  const [adminTab, setAdminTab] = useState('menu');
  const [orders, setOrders] = useState([]);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const audioRef = useRef(null);

  const isAuthenticated = useMemo(() => Boolean(token), [token]);
  const sectionCategoryMap = useMemo(() => {
    const map = {};

    items.forEach((item) => {
      const section = item?.section || 'Bakery Items';
      const categoryId = item?.categoryId || '';
      if (!map[section] && categoryId) {
        map[section] = categoryId;
      }
    });

    return map;
  }, [items]);

  const unavailableCount = useMemo(
    () => items.filter((item) => isNameUnavailableToday(item?.name, dailyUnavailableMap)).length,
    [items, dailyUnavailableMap],
  );

  const filteredItems = useMemo(() => {
    if (menuFilter === 'all') {
      return items;
    }

    if (menuFilter === 'unavailable') {
      return items.filter((item) => isNameUnavailableToday(item?.name, dailyUnavailableMap));
    }

    return items.filter(
      (item) => item?.visible !== false && !isNameUnavailableToday(item?.name, dailyUnavailableMap),
    );
  }, [items, menuFilter, dailyUnavailableMap]);

  const refreshItems = async (authToken = token) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await apiRequest('/admin/items', {}, authToken);
      setItems(data?.items || []);
    } catch (requestError) {
      setError(requestError.message || 'Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || 'menu' === adminTab) return;

    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated, adminTab, token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      const nextToken = data?.token || '';
      if (!nextToken) {
        throw new Error('Token not returned');
      }

      setToken(nextToken);
      sessionStorage.setItem(TOKEN_KEY, nextToken);
      await refreshItems(nextToken);
      setPassword('');
    } catch (requestError) {
      setError(requestError.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setItems([]);
    setForm(toFormState(null));
    setError('');
  };

  const handleEdit = (item) => {
    setForm(toFormState(item));
    setError('');
    setIsFormOpen(true);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Delete this item from Square?')) {
      return;
    }

    setError('');
    try {
      await apiRequest(`/admin/items/${itemId}`, { method: 'DELETE' }, token);
      await refreshItems();
      if (form.id === itemId) {
        setForm(toFormState(null));
      }
    } catch (requestError) {
      setError(requestError.message || 'Delete failed');
    }
  };

  const handleToggleVisibility = async (item) => {
    if (!item?.id) {
      return;
    }

    setError('');
    setTogglingItemId(item.id);
    try {
      if (item.visible === false) {
        const selectedSection = publishSections[item.id] || item.section || 'Bakery Items';
        const payload = {
          name: item.name || '',
          description: item.description || '',
          categoryId: item.categoryId || sectionCategoryMap[selectedSection] || null,
          section: selectedSection,
          visible: true,
          variations: Array.isArray(item.variations)
            ? item.variations
                .map((variation) => ({
                  name: variation?.name || 'Regular',
                  priceAmount: Math.round(Number(variation?.priceAmount || 0)),
                  currency: variation?.currency || 'USD',
                }))
                .filter((variation) => Number.isFinite(variation.priceAmount) && variation.priceAmount > 0)
            : [],
        };

        await apiRequest(
          `/admin/items/${item.id}`,
          {
            method: 'PATCH',
            body: JSON.stringify(payload),
          },
          token,
        );
      } else {
        await apiRequest(
          `/admin/items/${item.id}/visibility`,
          {
            method: 'PATCH',
            body: JSON.stringify({ visible: false }),
          },
          token,
        );
      }
      await refreshItems();
    } catch (requestError) {
      setError(requestError.message || 'Visibility update failed');
    } finally {
      setTogglingItemId('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const payload = toPayload(form);
    if (!payload.categoryId) {
      payload.categoryId = sectionCategoryMap[payload.section] || null;
    }
    if (!payload.name || payload.variations.length === 0) {
      setError('Name and at least one variation with price are required.');
      return;
    }

    setIsSaving(true);
    try {
      if (form.id) {
        await apiRequest(
          `/admin/items/${form.id}`,
          { method: 'PATCH', body: JSON.stringify(payload) },
          token,
        );
      } else {
        await apiRequest('/admin/items', { method: 'POST', body: JSON.stringify(payload) }, token);
      }

      setForm(toFormState(null));
      setIsFormOpen(false);
      await refreshItems();
    } catch (requestError) {
      setError(requestError.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleDailyAvailability = (itemName) => {
    const key = normalizeMenuName(itemName);
    if (!key) {
      return;
    }

    setDailyUnavailableMap((current) => {
      const next = { ...current };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      saveDailyUnavailableMap(next);
      return next;
    });
  };

  const handleClearDailyUnavailable = () => {
    if (!window.confirm('Mark all items as available for today?')) {
      return;
    }

    setDailyUnavailableMap({});
    saveDailyUnavailableMap({});
  };

  const updateFormField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateVariationField = (index, field, value) => {
    setForm((current) => ({
      ...current,
      variations: current.variations.map((variation, variationIndex) =>
        variationIndex === index ? { ...variation, [field]: value } : variation,
      ),
    }));
  };

  const addVariation = () => {
    setForm((current) => ({ ...current, variations: [...current.variations, { ...defaultVariation }] }));
  };

  const removeVariation = (index) => {
    setForm((current) => ({
      ...current,
      variations: current.variations.filter((_, variationIndex) => variationIndex !== index),
    }));
  };

  const playNotification = async (times = 5) => {
    if (!audioRef.current) return;
    
    for (let i = 0; i < times; i++) {
      audioRef.current.currentTime = 0;
      try {
        await audioRef.current.play();
      } catch (err) {
        // Play may fail if browser doesn't allow it
      }
      // Wait for audio to finish (roughly 1 second per play, plus a small delay)
      await new Promise(resolve => setTimeout(resolve, 1100));
    }
  };

  const fetchOrders = async (authToken = token) => {
    if (!authToken) return;
    try {
      const data = await apiRequest('/admin/orders', {}, authToken);
      const newOrders = data?.orders || [];
      
      // Check if we have new orders and play sound
      if (newOrders.length > lastOrderCount) {
        playNotification(5);
      }
      
      setOrders(newOrders);
      setLastOrderCount(newOrders.length);
    } catch (err) {
      // Silently fail for orders fetch
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin} className="admin-form">
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>
          </form>
          {error ? <p className="admin-error">{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <audio ref={audioRef} src="/notification.mp3" />
      <div className="admin-header">
        <h1>Menu Admin</h1>
        <div className="admin-header__actions">
          <button
            type="button"
            className={adminTab === 'menu' ? '' : 'secondary'}
            onClick={() => setAdminTab('menu')}
          >
            Menu
          </button>
          <button
            type="button"
            className={adminTab === 'orders' ? '' : 'secondary'}
            onClick={() => setAdminTab('orders')}
          >
            Orders {orders.length > 0 ? `(${orders.length})` : ''}
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="secondary"
              onClick={handleClearDailyUnavailable}
              disabled={Object.keys(dailyUnavailableMap).length === 0}
            >
              Reset Daily Availability
            </button>
            <button type="button" className="secondary" onClick={() => refreshItems()} disabled={isLoading}>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setForm(toFormState(null));
                setIsFormOpen(true);
                setError('');
              }}
            >
              New Item
            </button>
            <button type="button" className="danger" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      <p className="admin-note">
        Daily unavailable items: {Object.keys(dailyUnavailableMap).length}
      </p>

      {'menu' === adminTab ? (
        <div className="admin-layout">
          <div className="admin-list">
          <div className="admin-list__header">
            <h2>
              {menuFilter === 'unavailable'
                ? 'Unavailable Items'
                : menuFilter === 'all'
                  ? 'All Square Items'
                  : 'Current Menu Items'} ({filteredItems.length})
            </h2>
            <div className="admin-filter" role="tablist" aria-label="Filter items by availability">
              <button
                type="button"
                className={menuFilter === 'current' ? 'admin-filter__btn active' : 'admin-filter__btn'}
                onClick={() => setMenuFilter('current')}
                aria-pressed={menuFilter === 'current'}
              >
                Current Menu Items
              </button>
              <button
                type="button"
                className={menuFilter === 'unavailable' ? 'admin-filter__btn active' : 'admin-filter__btn'}
                onClick={() => setMenuFilter('unavailable')}
                aria-pressed={menuFilter === 'unavailable'}
              >
                Unavailable ({unavailableCount})
              </button>
              <button
                type="button"
                className={menuFilter === 'all' ? 'admin-filter__btn active' : 'admin-filter__btn'}
                onClick={() => setMenuFilter('all')}
                aria-pressed={menuFilter === 'all'}
              >
                All Square Items ({items.length})
              </button>
            </div>
          </div>
          {isLoading ? <p>Loading...</p> : null}
          {!isLoading && filteredItems.length === 0 ? (
            <p>
              {menuFilter === 'unavailable'
                ? 'No unavailable items right now.'
                : menuFilter === 'all'
                  ? 'No Square items found.'
                  : 'No current menu items found.'}
            </p>
          ) : null}
          {filteredItems.map((item) => (
            <article key={item.id} className="admin-item">
              <div>
                <strong>{item.name}</strong>
                <p>{item.description || 'No description'}</p>
                <p><em>Section: {item.section || 'Bakery Items'}</em></p>
                <p><em>Status: {item.visible === false ? 'Hidden' : 'Public'}</em></p>
                <p>
                  <em>
                    Today: {isNameUnavailableToday(item.name, dailyUnavailableMap) ? 'Unavailable' : 'Available'}
                  </em>
                </p>
                <ul>
                  {item.variations.map((variation) => (
                    <li key={variation.id || variation.name}>
                      {variation.name} — {typeof variation.priceAmount === 'number' ? `$${(variation.priceAmount / 100).toFixed(2)}` : 'N/A'}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="admin-item__actions">
                {item.visible === false ? (
                  <label className="admin-item__section-label">
                    Public section
                    <select
                      value={publishSections[item.id] || item.section || 'Bakery Items'}
                      onChange={(event) =>
                        setPublishSections((current) => ({
                          ...current,
                          [item.id]: event.target.value,
                        }))
                      }
                      disabled={togglingItemId === item.id}
                    >
                      {SECTION_OPTIONS.map((section) => (
                        <option key={`${item.id}-${section}`} value={section}>{section}</option>
                      ))}
                    </select>
                  </label>
                ) : null}
                <button type="button" onClick={() => handleEdit(item)}>Edit</button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleToggleVisibility(item)}
                  disabled={togglingItemId === item.id}
                >
                  {togglingItemId === item.id
                    ? 'Updating...'
                    : item.visible === false
                      ? 'Set Public'
                      : 'Set Hidden'}
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleToggleDailyAvailability(item.name)}
                >
                  {isNameUnavailableToday(item.name, dailyUnavailableMap)
                    ? 'Mark Available Today'
                    : 'Mark Unavailable Today'}
                </button>
                <button type="button" className="danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </div>
      ) : (
        <div className="admin-layout">
          <div className="admin-list">
            <h2>Orders</h2>
            {0 === orders.length ? (
              <p className="admin-note">No orders yet</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {orders.map((order) => (
                  <div key={order.id || order.orderId} style={{ padding: '1rem', background: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong>Order {order.orderId ? order.orderId.slice(0, 12) : 'N/A'}...</strong>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {new Date(order.timestamp || order.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Customer:</strong> {order.customerName || 'Guest'}
                    </p>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      <div style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                        <strong style={{ fontSize: '0.9rem' }}>Items:</strong>
                        <ul style={{ margin: '0.25rem 0', paddingLeft: '1rem', fontSize: '0.85rem' }}>
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.quantity}x {item.name}
                              {item.amount ? ` ($${(item.amount / 100).toFixed(2)})` : ''}
                              {item.note ? ` - ${item.note}` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Total:</strong> {typeof order.total === 'number' ? `$${(order.total / 100).toFixed(2)}` : 'Pending'}
                    </p>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#666' }}>
                      <strong>Status:</strong> {order.status || 'pending'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isFormOpen ? (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label="Item form">
          <div className="admin-modal-card">
            <ItemForm
              form={form}
              onChange={updateFormField}
              onVariationChange={updateVariationField}
              onAddVariation={addVariation}
              onRemoveVariation={removeVariation}
              onSubmit={handleSubmit}
              onCancel={() => {
                setForm(toFormState(null));
                setIsFormOpen(false);
              }}
              isSaving={isSaving}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
