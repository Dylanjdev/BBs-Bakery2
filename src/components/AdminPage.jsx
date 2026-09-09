import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './admin.css';
import { getApiBaseUrl } from '../lib/apiBaseUrl';

const API_BASE_URL = getApiBaseUrl();
const TOKEN_KEY = 'bb_admin_token';
const ORDER_POLL_INTERVAL_MS = 3000;
const SECTION_OPTIONS = [
  'Baked Goods',
  'Breakfast',
  'Lunch',
  'Loaded Energy',
  'Specialty Coffee',
  'Classic Espresso',
  'Iced Latte',
  'Hot Latte',
  'Frappes',
  '💥 Dirty Sodas & Lemonades',
  '🍓 Smoothies',
];

const defaultVariation = { name: 'Regular', priceAmount: '' };

const getOrderKey = (order) => order?.orderId || order?.id || '';

const getOrderDate = (order) => new Date(order?.timestamp || order?.createdAt || order?.paidAt);

const isOrderFromToday = (order, now = new Date()) => {
  const orderDate = getOrderDate(order);
  return !Number.isNaN(orderDate.getTime())
    && orderDate.getFullYear() === now.getFullYear()
    && orderDate.getMonth() === now.getMonth()
    && orderDate.getDate() === now.getDate();
};

const getOrderItemPrice = (item) => {
  const amount = item?.price ?? item?.amount ?? item?.basePriceMoney?.amount;
  return typeof amount === 'number' ? amount : null;
};

const formatMoney = (amount) =>
  typeof amount === 'number'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100)
    : 'Pending';

const formatOrderTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Time unavailable';
  }

  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const toFormState = (item) => ({
  id: item?.id || null,
  name: item?.name || '',
  description: item?.description || '',
  categoryId: item?.categoryId || '',
  section: item?.section || 'Baked Goods',
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
  } catch (requestError) {
    if (requestError?.name === 'AbortError') {
      throw requestError;
    }
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
        Online menu availability
        <select
          value={form.visibility}
          onChange={(event) => onChange('visibility', event.target.value)}
          required
        >
          <option value="public">Available</option>
          <option value="hidden">Unavailable</option>
        </select>
        <small className="admin-field-help">
          Unavailable items are removed from the customer menu and rejected at checkout.
        </small>
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
  const [menuSearch, setMenuSearch] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(() => Boolean(sessionStorage.getItem(TOKEN_KEY)));
  const [error, setError] = useState('');
  const [form, setForm] = useState(toFormState(null));
  const [isSaving, setIsSaving] = useState(false);
  const [togglingItemId, setTogglingItemId] = useState('');
  const [publishSections, setPublishSections] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [globalOrderingEnabled, setGlobalOrderingEnabled] = useState(null);
  const [isGlobalOrderingLoading, setIsGlobalOrderingLoading] = useState(() => Boolean(sessionStorage.getItem(TOKEN_KEY)));
  const [orderingControlError, setOrderingControlError] = useState('');
  const [adminTab, setAdminTab] = useState('menu');
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState('');
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState('');
  const [ordersUpdatedAt, setOrdersUpdatedAt] = useState(null);
  const audioRef = useRef(null);
  const knownOrderIdsRef = useRef(null);
  const missingOrderPollsRef = useRef(new Map());
  const suppressedOrderIdsRef = useRef(new Set());
  const ordersRequestInFlightRef = useRef(false);

  const isAuthenticated = Boolean(token);
  const sectionCategoryMap = useMemo(() => {
    const map = {};

    items.forEach((item) => {
      const section = item?.section || 'Baked Goods';
      const categoryId = item?.categoryId || '';
      if (!map[section] && categoryId) {
        map[section] = categoryId;
      }
    });

    return map;
  }, [items]);

  const unavailableCount = useMemo(() => items.filter((item) => item?.visible === false).length, [items]);
  const availableCount = items.length - unavailableCount;

  const filteredItems = useMemo(() => {
    const availabilityMatches = menuFilter === 'all'
      ? items
      : items.filter((item) => (
          menuFilter === 'unavailable' ? item?.visible === false : item?.visible !== false
        ));
    const query = menuSearch.trim().toLowerCase();

    if (!query) {
      return availabilityMatches;
    }

    return availabilityMatches.filter((item) => {
      const searchableText = [
        item?.name,
        item?.description,
        item?.section,
        ...(Array.isArray(item?.variations)
          ? item.variations.map((variation) => variation?.name)
          : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [items, menuFilter, menuSearch]);

  const refreshItems = useCallback(async (authToken = token) => {
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
  }, [token]);

  const refreshGlobalOrderingStatus = useCallback(async () => {
    setIsGlobalOrderingLoading(true);
    setOrderingControlError('');
    try {
      const data = await apiRequest('/ordering-status');
      setGlobalOrderingEnabled(data?.enabled === true);
    } catch (requestError) {
      setOrderingControlError(requestError.message || 'Failed to load online ordering status');
    } finally {
      setIsGlobalOrderingLoading(false);
    }
  }, []);

  const playNotification = useCallback(async (times = 3) => {
    if (!audioRef.current) {
      return;
    }

    for (let index = 0; index < times; index += 1) {
      audioRef.current.currentTime = 0;
      try {
        await audioRef.current.play();
      } catch {
        // Browsers can block audio until the admin has interacted with the page.
        return;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 1100));
    }
  }, []);

  const refreshOrders = useCallback(async (authToken = token, options = {}) => {
    if (!authToken || ordersRequestInFlightRef.current) {
      return;
    }

    ordersRequestInFlightRef.current = true;
    try {
      const data = await apiRequest('/admin/orders', { signal: options.signal }, authToken);
      const receivedOrders = (Array.isArray(data?.orders) ? data.orders : [])
        .filter((order) => isOrderFromToday(order))
        .filter((order) => !suppressedOrderIdsRef.current.has(getOrderKey(order)));
      const receivedOrderIds = new Set(receivedOrders.map(getOrderKey).filter(Boolean));
      const knownOrderIds = knownOrderIdsRef.current;
      const hasNewOrder =
        options.notify !== false
        && knownOrderIds instanceof Set
        && [...receivedOrderIds].some((orderId) => !knownOrderIds.has(orderId));

      const stableOrderIds = new Set(receivedOrderIds);
      if (knownOrderIds instanceof Set) {
        knownOrderIds.forEach((orderId) => {
          if (receivedOrderIds.has(orderId) || suppressedOrderIdsRef.current.has(orderId)) {
            missingOrderPollsRef.current.delete(orderId);
            return;
          }

          const missingPolls = (missingOrderPollsRef.current.get(orderId) || 0) + 1;
          if (missingPolls < 2) {
            missingOrderPollsRef.current.set(orderId, missingPolls);
            stableOrderIds.add(orderId);
          } else {
            missingOrderPollsRef.current.delete(orderId);
          }
        });
      }
      receivedOrderIds.forEach((orderId) => missingOrderPollsRef.current.delete(orderId));

      knownOrderIdsRef.current = stableOrderIds;
      setOrders((currentOrders) => {
        const receivedById = new Map(receivedOrders.map((order) => [getOrderKey(order), order]));
        const retainedOrders = currentOrders.filter((order) => {
          const orderId = getOrderKey(order);
          return stableOrderIds.has(orderId) && !receivedById.has(orderId);
        });

        return [...receivedOrders, ...retainedOrders].sort(
          (firstOrder, secondOrder) => getOrderDate(secondOrder) - getOrderDate(firstOrder),
        );
      });
      setOrdersError('');
      setOrdersUpdatedAt(new Date());

      if (hasNewOrder) {
        void playNotification();
      }
    } catch (requestError) {
      if (requestError?.name !== 'AbortError') {
        setOrdersError(requestError.message || 'Failed to load orders');
      }
    } finally {
      ordersRequestInFlightRef.current = false;
      setIsOrdersLoading(false);
    }
  }, [playNotification, token]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    let isCurrent = true;

    apiRequest('/admin/items', {}, token)
      .then((data) => {
        if (isCurrent) {
          setItems(data?.items || []);
          setError('');
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(requestError.message || 'Failed to load items');
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    apiRequest('/ordering-status')
      .then((data) => {
        if (isCurrent) {
          setGlobalOrderingEnabled(data?.enabled === true);
          setOrderingControlError('');
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setOrderingControlError(requestError.message || 'Failed to load online ordering status');
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsGlobalOrderingLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [token]);

  useEffect(() => {
    if (!token || adminTab !== 'orders') {
      return undefined;
    }

    const controller = new AbortController();
    let timeoutId;

    const pollOrders = async () => {
      await refreshOrders(token, { signal: controller.signal });
      if (!controller.signal.aborted) {
        timeoutId = window.setTimeout(pollOrders, ORDER_POLL_INTERVAL_MS);
      }
    };

    void pollOrders();

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [adminTab, refreshOrders, token]);

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

      setIsLoading(true);
      setToken(nextToken);
      sessionStorage.setItem(TOKEN_KEY, nextToken);
      setPassword('');
    } catch (requestError) {
      setError(requestError.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setItems([]);
    setOrders([]);
    setOrdersError('');
    setOrdersUpdatedAt(null);
    setGlobalOrderingEnabled(null);
    setOrderingControlError('');
    setIsGlobalOrderingLoading(false);
    knownOrderIdsRef.current = null;
    missingOrderPollsRef.current.clear();
    suppressedOrderIdsRef.current.clear();
    setForm(toFormState(null));
    setError('');
  };

  const handleToggleGlobalOrdering = async () => {
    if (globalOrderingEnabled === null || isGlobalOrderingLoading) {
      return;
    }

    const nextEnabled = !globalOrderingEnabled;
    if (!nextEnabled && !window.confirm('Turn off online ordering for every customer?')) {
      return;
    }

    setIsGlobalOrderingLoading(true);
    setOrderingControlError('');
    try {
      const data = await apiRequest(
        '/admin/ordering-status',
        {
          method: 'PATCH',
          body: JSON.stringify({ enabled: nextEnabled }),
        },
        token,
      );
      setGlobalOrderingEnabled(data?.enabled === true);
    } catch (requestError) {
      setOrderingControlError(requestError.message || 'Failed to update online ordering status');
    } finally {
      setIsGlobalOrderingLoading(false);
    }
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
      const selectedSection = publishSections[item.id] || item.section || 'Baked Goods';
      const payload = {
        name: item.name || '',
        description: item.description || '',
        categoryId: item.categoryId || sectionCategoryMap[selectedSection] || null,
        section: selectedSection,
        visible: item.visible === false,
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
      await refreshItems();
    } catch (requestError) {
      setError(requestError.message || 'Availability update failed');
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

  const handleOrderAction = async (order, action) => {
    const orderId = order?.orderId;
    if (!orderId) {
      setOrdersError('This order is missing its Square order ID.');
      return;
    }

    if (action === 'dismiss' && !window.confirm('Dismiss this order from the active orders list?')) {
      return;
    }

    setUpdatingOrderId(orderId);
    setOrdersError('');
    suppressedOrderIdsRef.current.add(orderId);
    try {
      const path = action === 'complete'
        ? `/admin/orders/${orderId}/complete`
        : `/admin/orders/${orderId}`;
      const method = action === 'complete' ? 'PATCH' : 'DELETE';

      await apiRequest(path, { method }, token);
      setOrders((current) => current.filter((currentOrder) => getOrderKey(currentOrder) !== getOrderKey(order)));
      knownOrderIdsRef.current?.delete(orderId);
      missingOrderPollsRef.current.delete(orderId);
    } catch (requestError) {
      suppressedOrderIdsRef.current.delete(orderId);
      setOrdersError(
        requestError.message
          || (action === 'complete' ? 'Failed to complete order' : 'Failed to dismiss order'),
      );
    } finally {
      setUpdatingOrderId('');
    }
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
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      <div className="admin-header">
        <h1>BB&apos;s Admin</h1>
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
            onClick={() => {
              setAdminTab('orders');
              if (!ordersUpdatedAt) {
                setIsOrdersLoading(true);
              }
            }}
          >
            Orders {orders.length > 0 ? `(${orders.length})` : ''}
          </button>
          <div className="admin-toolbar">
            <button
              type="button"
              className="secondary"
              onClick={() => {
                if (adminTab === 'menu') {
                  void Promise.all([refreshItems(), refreshGlobalOrderingStatus()]);
                } else {
                  setIsOrdersLoading(true);
                  void refreshOrders(token, { notify: false });
                }
              }}
              disabled={adminTab === 'menu' ? isLoading : isOrdersLoading}
            >
              {isLoading || isOrdersLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            {adminTab === 'menu' ? (
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
            ) : null}
            <button type="button" className="danger" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      <section className={`admin-global-ordering ${globalOrderingEnabled ? 'on' : 'off'}`}>
        <div>
          <p className="admin-global-ordering__eyebrow">Site-wide control</p>
          <h2>
            {globalOrderingEnabled === null
              ? 'Loading online ordering status...'
              : `Online ordering is ${globalOrderingEnabled ? 'On' : 'Off'}`}
          </h2>
          <p>
            {globalOrderingEnabled === null
              ? 'Checking the shared customer ordering control.'
              : globalOrderingEnabled
              ? 'Customers can order enabled items during normal ordering hours.'
              : 'Add buttons are hidden and checkout is blocked for every customer.'}
          </p>
        </div>
        <button
          type="button"
          className={`admin-global-ordering__toggle ${globalOrderingEnabled ? 'on' : 'off'}`}
          onClick={handleToggleGlobalOrdering}
          disabled={globalOrderingEnabled === null || isGlobalOrderingLoading}
          role="switch"
          aria-checked={globalOrderingEnabled === true}
        >
          <span className="admin-global-ordering__track" aria-hidden="true">
            <span className="admin-global-ordering__thumb" />
          </span>
          <span>
            {isGlobalOrderingLoading
              ? 'Updating...'
              : `Turn ordering ${globalOrderingEnabled ? 'Off' : 'On'}`}
          </span>
        </button>
      </section>
      {orderingControlError ? <p className="admin-error">{orderingControlError}</p> : null}

      {adminTab === 'menu' ? (
        <div className="admin-layout">
          <div className="admin-list">
            <p className="admin-note">
              Online ordering is on for {availableCount} items and off for {unavailableCount}. Customers can still see off items, but cannot add them to an order.
            </p>
            <div className="admin-list__header">
              <h2>
                {menuFilter === 'unavailable'
                  ? 'Online Ordering Off'
                  : menuFilter === 'all'
                    ? 'All Square Items'
                    : 'Online Ordering On'} ({filteredItems.length})
              </h2>
              <div className="admin-filter" role="tablist" aria-label="Filter items by availability">
                <button
                  type="button"
                  className={menuFilter === 'current' ? 'admin-filter__btn active' : 'admin-filter__btn'}
                  onClick={() => setMenuFilter('current')}
                  aria-pressed={menuFilter === 'current'}
                >
                  On ({availableCount})
                </button>
                <button
                  type="button"
                  className={menuFilter === 'unavailable' ? 'admin-filter__btn active' : 'admin-filter__btn'}
                  onClick={() => setMenuFilter('unavailable')}
                  aria-pressed={menuFilter === 'unavailable'}
                >
                  Off ({unavailableCount})
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
            <label className="admin-search">
              <span>Search menu items</span>
              <div className="admin-search__field">
                <input
                  type="search"
                  value={menuSearch}
                  onChange={(event) => setMenuSearch(event.target.value)}
                  placeholder="Search by item, section, or variation..."
                  autoComplete="off"
                />
                {menuSearch ? (
                  <button type="button" className="secondary" onClick={() => setMenuSearch('')}>
                    Clear
                  </button>
                ) : null}
              </div>
            </label>
            {isLoading ? <p>Loading...</p> : null}
            {!isLoading && filteredItems.length === 0 ? (
              <p>
                {menuSearch.trim()
                  ? `No items match “${menuSearch.trim()}” in this filter.`
                  : menuFilter === 'unavailable'
                  ? 'Online ordering is not switched off for any items.'
                  : menuFilter === 'all'
                    ? 'No Square items found.'
                    : 'Online ordering is not switched on for any items.'}
              </p>
            ) : null}
            {filteredItems.map((item) => (
              <article key={item.id} className="admin-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.description || 'No description'}</p>
                  <p><em>Section: {item.section || 'Baked Goods'}</em></p>
                  <p>
                    <span className={item.visible === false ? 'admin-status unavailable' : 'admin-status available'}>
                      Online ordering: {item.visible === false ? 'Off' : 'On'}
                    </span>
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
                      Menu section
                      <select
                        value={publishSections[item.id] || item.section || 'Baked Goods'}
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
                    className={`admin-ordering-toggle ${item.visible === false ? 'off' : 'on'}`}
                    onClick={() => handleToggleVisibility(item)}
                    disabled={togglingItemId === item.id}
                    role="switch"
                    aria-checked={item.visible !== false}
                    aria-label={`Turn online ordering ${item.visible === false ? 'on' : 'off'} for ${item.name}`}
                  >
                    <span className="admin-ordering-toggle__track" aria-hidden="true">
                      <span className="admin-ordering-toggle__thumb" />
                    </span>
                    <span>
                      {togglingItemId === item.id
                        ? 'Updating...'
                        : `Online ordering ${item.visible === false ? 'Off' : 'On'}`}
                    </span>
                  </button>
                  <button type="button" className="danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="admin-layout">
          <div className="admin-orders">
            <div className="admin-orders__header">
              <div>
                <h2>Today&apos;s active paid orders ({orders.length})</h2>
                <p className="admin-orders__updated">
                  {ordersUpdatedAt ? `Updated ${formatOrderTime(ordersUpdatedAt)}` : 'Checking for orders...'}
                </p>
              </div>
              <span className="admin-orders__live">Live</span>
            </div>
            {ordersError ? <p className="admin-error">{ordersError}</p> : null}
            {isOrdersLoading && orders.length === 0 ? <p className="admin-note">Loading orders...</p> : null}
            {!isOrdersLoading && orders.length === 0 && !ordersError ? (
              <p className="admin-note">No active paid orders today.</p>
            ) : (
              <div className="admin-orders__list">
                {orders.map((order) => (
                  <article key={getOrderKey(order)} className="admin-order-card">
                    <div className="admin-order-card__header">
                      <strong>Order #{order.orderId ? order.orderId.slice(-8) : 'unavailable'}</strong>
                      <span className="admin-order-card__time">
                        {formatOrderTime(order.timestamp || order.createdAt)}
                      </span>
                    </div>
                    <p className="admin-order-card__detail">
                      <strong>Customer:</strong> {order.customerName || 'Guest'}
                    </p>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      <div className="admin-order-card__items">
                        <strong>Items:</strong>
                        <ul>
                          {order.items.map((item, index) => {
                            const itemPrice = getOrderItemPrice(item);
                            return (
                              <li key={`${getOrderKey(order)}-${index}`}>
                                {item.quantity || 1}× {item.name || 'Item'}
                                {itemPrice !== null ? ` (${formatMoney(itemPrice)})` : ''}
                                {item.note ? ` — ${item.note}` : ''}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                    <p className="admin-order-card__detail">
                      <strong>Total:</strong> {formatMoney(order.total)}
                    </p>
                    <p className="admin-order-card__detail">
                      <strong>Status:</strong> {order.status || 'paid'}
                    </p>
                    <div className="admin-order-card__actions">
                      <button
                        type="button"
                        className="admin-order-complete"
                        onClick={() => handleOrderAction(order, 'complete')}
                        disabled={updatingOrderId === order.orderId || !order.orderId}
                      >
                        {updatingOrderId === order.orderId ? 'Updating...' : 'Mark complete'}
                      </button>
                      <button
                        type="button"
                        className="admin-order-dismiss"
                        onClick={() => handleOrderAction(order, 'dismiss')}
                        disabled={updatingOrderId === order.orderId || !order.orderId}
                      >
                        Dismiss
                      </button>
                    </div>
                  </article>
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
