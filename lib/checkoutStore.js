import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "checkout-orders.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ orders: {} }, null, 2), "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeStore(data) {
  await ensureStore();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function createOrder(order) {
  const store = await readStore();
  store.orders[order.id] = order;
  await writeStore(store);
  return order;
}

export async function getOrder(orderId) {
  const store = await readStore();
  return store.orders[orderId] || null;
}

export async function updateOrder(orderId, updater) {
  const store = await readStore();
  const current = store.orders[orderId];
  if (!current) return null;
  const next = typeof updater === "function" ? updater(current) : { ...current, ...updater };
  store.orders[orderId] = next;
  await writeStore(store);
  return next;
}

export async function findOrderByPaymentIntent(paymentIntentId) {
  const store = await readStore();
  const orders = Object.values(store.orders);
  return orders.find((order) => order.paymentIntentId === paymentIntentId) || null;
}
