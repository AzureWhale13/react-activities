import { useState } from "react";

/* ---------- Shared styles ---------- */
const card = {
  background: "#fff",
  border: "1px solid #d9dde3",
  borderRadius: 8,
  padding: 20,
  maxWidth: 440,
};
const input = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #b8c0cc",
  borderRadius: 6,
  fontSize: 16,
  boxSizing: "border-box",
};
const btn = {
  padding: "8px 14px",
  border: "none",
  borderRadius: 6,
  background: "#1f4e79",
  color: "#fff",
  fontSize: 15,
  cursor: "pointer",
};
const label = { display: "block", margin: "12px 0 4px", fontWeight: 600 };

/* ---------- Activity 1: Temperature Converter ---------- */
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(""); // keep as string so the input can be empty

  const c = parseFloat(celsius);
  const valid = !isNaN(c);
  const fahrenheit = valid ? (c * 9) / 5 + 32 : "";
  const kelvin = valid ? c + 273.15 : "";

  return (
    <div style={card}>
      <label style={label} htmlFor="celsius">Celsius (°C)</label>
      <input
        id="celsius"
        style={input}
        type="number"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
        placeholder="Enter a temperature"
      />
      <p>Fahrenheit: <strong>{valid ? fahrenheit.toFixed(2) + " °F" : "—"}</strong></p>
      <p>Kelvin: <strong>{valid ? kelvin.toFixed(2) + " K" : "—"}</strong></p>
    </div>
  );
}

/* ---------- Activity 2: Calculator ---------- */
function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState(null); // number or error string

  const handleSubmit = (e) => {
    e.preventDefault();
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return setResult("Please enter two numbers.");
    if (op === "/" && y === 0) return setResult("Cannot divide by zero.");

    const ops = { "+": x + y, "-": x - y, "*": x * y, "/": x / y };
    setResult(ops[op]);
  };

  return (
    <form style={card} onSubmit={handleSubmit}>
      <label style={label}>First number</label>
      <input style={input} type="number" value={a} onChange={(e) => setA(e.target.value)} />

      <label style={label}>Operation</label>
      <select style={input} value={op} onChange={(e) => setOp(e.target.value)}>
        <option value="+">+ Add</option>
        <option value="-">− Subtract</option>
        <option value="*">× Multiply</option>
        <option value="/">÷ Divide</option>
      </select>

      <label style={label}>Second number</label>
      <input style={input} type="number" value={b} onChange={(e) => setB(e.target.value)} />

      <p><button style={btn} type="submit">Calculate</button></p>
      {result !== null && (
        <p style={{ color: typeof result === "string" ? "#b3261e" : "inherit" }}>
          {typeof result === "string" ? result : <>Result: <strong>{result}</strong></>}
        </p>
      )}
    </form>
  );
}

/* ---------- Activity 3: To-Do List ---------- */
function TodoList() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // Never mutate state: create a NEW array
    setTasks([...tasks, { id: Date.now(), title: text.trim() }]);
    setText("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div style={card}>
      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input
          style={input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task"
        />
        <button style={btn} type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p style={{ color: "#667" }}>No tasks yet. Add your first one above.</p>
      ) : (
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}
            >
              {task.title}
              <button style={{ ...btn, background: "#b3261e" }} onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Activity 4: Mini Cart ---------- */
const PRODUCTS = [
  { id: 1, name: "Notebook", price: 45 },
  { id: 2, name: "Ballpen (box)", price: 120 },
  { id: 3, name: "USB Flash Drive", price: 350 },
  { id: 4, name: "Water Bottle", price: 220 },
];

function Cart() {
  const [cart, setCart] = useState([]); // [{ id, name, price, qty }]

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const changeQty = (id, delta) =>
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0) // remove when qty hits 0
    );

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div style={{ ...card, maxWidth: 560 }}>
      <h3 style={{ marginTop: 0 }}>Products</h3>
      {PRODUCTS.map((p) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
          <span>{p.name} — ₱{p.price}</span>
          <button style={btn} onClick={() => addToCart(p)}>Add to cart</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.length === 0 && <p style={{ color: "#667" }}>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
          <span>{item.name} × {item.qty}</span>
          <span>
            ₱{item.qty * item.price}{" "}
            <button style={btn} onClick={() => changeQty(item.id, -1)}>−</button>{" "}
            <button style={btn} onClick={() => changeQty(item.id, 1)}>+</button>
          </span>
        </div>
      ))}
      <hr />
      <p>Total items: <strong>{totalItems}</strong></p>
      <p>Total cost: <strong>₱{totalCost.toLocaleString()}</strong></p>
    </div>
  );
}

/* ---------- Activity 5: Mock Login ---------- */
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "student" && password === "123") {
      setLoggedInUser(username);
      setError("");
      setPassword("");
    } else {
      setError("Incorrect username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername("");
  };

  // Conditional rendering: dashboard if logged in, otherwise the form
  if (loggedInUser) {
    return (
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Welcome, {loggedInUser}!</h3>
        <p>You are now viewing your dashboard.</p>
        <button style={btn} onClick={handleLogout}>Log out</button>
      </div>
    );
  }

  return (
    <form style={card} onSubmit={handleLogin}>
      <label style={label}>Username</label>
      <input style={input} value={username} onChange={(e) => setUsername(e.target.value)} />
      <label style={label}>Password</label>
      <input style={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      <p><button style={btn} type="submit">Log in</button></p>
      <small style={{ color: "#667" }}>Hint: student / 123</small>
    </form>
  );
}

/* ---------- App: tabs to switch between activities ---------- */
const ACTIVITIES = [
  { title: "1. Temperature", Component: TemperatureConverter },
  { title: "2. Calculator", Component: Calculator },
  { title: "3. To-Do List", Component: TodoList },
  { title: "4. Cart", Component: Cart },
  { title: "5. Login", Component: Login },
];

export default function App() {
  const [active, setActive] = useState(0);
  const { Component } = ACTIVITIES[active];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 20, background: "#f4f6f9", minHeight: "100vh" }}>
      <h2>React useState Activities</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {ACTIVITIES.map((a, i) => (
          <button
            key={a.title}
            onClick={() => setActive(i)}
            style={{ ...btn, background: i === active ? "#1f4e79" : "#8a97a8" }}
          >
            {a.title}
          </button>
        ))}
      </div>
      <Component />
    </div>
  );
}
