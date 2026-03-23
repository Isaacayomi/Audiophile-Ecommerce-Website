import { promises as fs } from "fs";
import path from "path";

export type PersistedOrderItem = {
  name: string;
  quantity: number;
  unitAmount: number;
  image?: string;
};

export type PersistedOrder = {
  id: string;
  sessionId: string;
  paymentStatus: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZipCode: string;
  shippingCountry: string;
  subtotal: number;
  shippingAmount: number;
  amountTotal: number;
  currency: string;
  items: PersistedOrderItem[];
  createdAt: string;
};

const ORDERS_DIR = path.join(process.cwd(), "app", "data");
const ORDERS_FILE = path.join(ORDERS_DIR, "orders.json");

// The app uses a JSON file as a simple persistence layer until a database is added.
const ensureOrdersFile = async () => {
  await fs.mkdir(ORDERS_DIR, { recursive: true });

  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf8");
  }
};

const readOrders = async (): Promise<PersistedOrder[]> => {
  await ensureOrdersFile();
  const content = await fs.readFile(ORDERS_FILE, "utf8");

  try {
    const parsed = JSON.parse(content) as PersistedOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeOrders = async (orders: PersistedOrder[]) => {
  await ensureOrdersFile();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
};

// Upsert by session id makes webhook retries safe, which is important because Stripe can resend events.
export const saveOrder = async (order: PersistedOrder) => {
  const orders = await readOrders();
  const existingIndex = orders.findIndex(
    (entry) => entry.sessionId === order.sessionId,
  );

  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }

  await writeOrders(orders);
  return order;
};

// The success page uses the returned Stripe session id to find the stored order.
export const getOrderBySessionId = async (sessionId: string) => {
  const orders = await readOrders();
  return orders.find((order) => order.sessionId === sessionId) ?? null;
};

