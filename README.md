# Raze — Interactive Visual Computer Networking Simulator

> An interactive visual simulation platform to explore how computer networks operate from physical signals up to encrypted application payloads.

![Raze Banner](public/vite.svg)

---

## 🌐 Overview

**Raze** transforms abstract networking concepts into tangible, visual, and interactive simulations. Instead of memorizing RFC definitions and static diagrams, Raze allows students, engineers, and networking enthusiasts to step through packets in motion, inspect frame headers byte-by-byte, and watch protocols unfold across topologies in real-time.

---

## ✨ Features

- **Dynamic Topology Animations**: Watch packets and signals traverse network links with smooth, coordinate-based 2D animations.
- **Deep Packet Inspection**: Click on any frame or packet field (preamble, MAC addresses, EtherType, IP headers, TTL, TCP flags, FCS) to inspect its binary structure, purpose, and standard RFC values.
- **Granular Stepping Controls**: Play, pause, step forward, step backward, or reset any protocol exchange at your own pace.
- **Keyboard-First Controls**: Seamless keyboard navigation with <kbd>Space</kbd> to play/pause and <kbd>←</kbd> / <kbd>→</kbd> arrow keys to step through packet flows.
- **Clean Aesthetic**: Engineered with an accessible, high-contrast pastel & light design palette optimized for long study sessions.
- **Zero External Dependencies**: Pure client-side execution with lightning-fast load times and no backend or database required.

---

## 📚 Interactive Modules & Scenarios

Raze covers 11 comprehensive scenarios spanning layers 1 through 7 of the OSI and TCP/IP models:

| Module | Route | Level | Description |
|---|---|---|---|
| **Physical Layer: Signals** | `/simulator/physical-signals` | Beginner | Explore how binary bits are encoded into digital voltages, optical pulses, and electromagnetic waves across physical media. |
| **Ethernet Frames** | `/simulator/ethernet-frames` | Beginner | Understand Layer 2 encapsulation, 7-byte preambles, SFD, MAC addressing, EtherType, payload data, and FCS CRC checksums. |
| **Address Resolution (ARP)** | `/simulator/arp` | Beginner | Trace how a host resolves an unknown MAC address using subnet-wide broadcast requests and unicast replies. |
| **IPv4 Packets** | `/simulator/ipv4-packets` | Intermediate | Inspect Layer 3 headers, versioning, IHL, Total Length, Identification, TTL decrementing, and protocol demultiplexing. |
| **DHCP (DORA Process)** | `/simulator/dhcp` | Beginner | Follow dynamic IP assignment through Discover, Offer, Request, and Acknowledgment transactions. |
| **DNS Resolution** | `/simulator/dns` | Intermediate | Step through recursive DNS queries from local resolver to Root Nameservers (`.`), TLD servers (`.com`), and Authoritative servers. |
| **TCP 3-Way Handshake** | `/simulator/tcp-handshake` | Intermediate | Visualize connection establishment via SYN, SYN-ACK, and ACK packets with Sequence/Acknowledgment number synchronization. |
| **Router Hop by Hop** | `/simulator/routing` | Intermediate | Watch routers inspect destination IPs against routing tables, decrement TTLs, recalculate checksums, and rewrite Layer 2 headers. |
| **Subnetting & CIDR** | `/simulator/subnetting` | Advanced | Calculate network prefixes, subnet masks, usable host ranges, and broadcast boundaries using bitwise operations. |
| **TLS / HTTPS Handshake** | `/simulator/tls-handshake` | Advanced | Understand modern cryptographic handshakes: Client Hello, Server Hello, Certificate exchange, Key Agreement, and symmetric payload encryption. |
| **NAT & Port Forwarding** | `/simulator/nat` | Advanced | See how home routers translate private RFC 1918 addresses (`192.168.x.x`) to public WAN IPs using stateful NAT translation tables. |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and `npm` installed on your machine.

```bash
node --version
npm --version
```

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/raze.git
   cd raze
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 📦 Building for Production

To generate an optimized, minified production build:

```bash
npm run build
```

To preview the built static bundle locally:

```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>Space</kbd> | Toggle Play / Pause simulation |
| <kbd>→</kbd> | Advance to next simulation step |
| <kbd>←</kbd> | Step back to previous simulation step |
| <kbd>Esc</kbd> | Dismiss header inspector or reset view |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
