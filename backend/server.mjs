
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
const dataFile = path.join(__dirname, "data", "orders.json");
async function readOrders(){ try { return JSON.parse(await fs.readFile(dataFile, "utf-8")); } catch { return []; } }
async function writeOrders(orders){ await fs.writeFile(dataFile, JSON.stringify(orders, null, 2)); }
app.get("/", (req,res)=>res.json({message:"XinnStore backend running"}));
app.get("/api/orders", async (req,res)=>res.json({orders: await readOrders()}));
app.post("/api/orders/create", async (req,res)=>{
  const orders = await readOrders();
  const order = { id: "ORD-"+Date.now(), ...(req.body||{}), status:"pending", createdAt:new Date().toISOString() };
  orders.unshift(order);
  await writeOrders(orders);
  res.json({message:"Order berhasil dibuat", order});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
