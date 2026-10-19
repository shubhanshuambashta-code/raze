export const SCENARIOS = {
  'physical-signals': {
    slug: 'physical-signals',
    title: 'Physical Layer: Signals',
    description: 'How bits become electrical signals, light pulses, or radio waves — and travel from one device to another.',
    difficulty: 'beginner',
    icon: '⚡',
    nodes: [
      { id: 'pc', type: 'pc', label: 'Your Computer', sublabel: 'Sends bits', x: 120, y: 250, icon: '💻' },
      { id: 'modem', type: 'modem', label: 'Modem / NIC', sublabel: 'Converts bits → signals', x: 400, y: 250, icon: '📟' },
      { id: 'server', type: 'server', label: 'Remote Server', sublabel: 'Receives bits', x: 680, y: 250, icon: '🖥️' }
    ],
    edges: [
      { id: 'pc-modem', from: 'pc', to: 'modem', bidirectional: true, label: 'Copper / Fiber / Air' },
      { id: 'modem-server', from: 'modem', to: 'server', bidirectional: true, label: 'Network Link' }
    ],
    packets: [
      {
        id: 'bit-stream',
        label: 'Bit stream',
        protocol: 'TCP',
        color: '#0284C7',
        badge: '101',
        osiLayers: [
          {
            layer: 'Physical',
            layerNumber: 1,
            active: true,
            protocol: 'Electrical / Optical / RF',
            headers: {
              'Signal type': 'Varies by medium',
              'Encoding': 'Manchester / NRZ / OFDM',
              'Speed': 'Up to 100 Gbps (fiber)'
            },
            description: 'Raw bits — no addressing, no error checking at this layer'
          },
          {
            layer: 'Data Link',
            layerNumber: 2,
            active: false,
            protocol: 'Ethernet II',
            description: 'Not yet — Layer 1 only cares about transmitting physical signals'
          }
        ]
      },
      {
        id: 'light-pulse',
        label: 'Light pulse',
        protocol: 'TCP',
        color: '#6366F1',
        badge: '⚡',
        osiLayers: [
          {
            layer: 'Physical',
            layerNumber: 1,
            active: true,
            protocol: 'Fiber Optic',
            headers: {
              'Medium': 'Glass fiber (core ~9µm)',
              'Signal': 'Infrared laser pulses',
              'Speed': '~200,000 km/s in fiber',
              'Distance': 'Up to 80km without repeater'
            },
            description: 'Total internal reflection guides infrared pulses down glass silica strands'
          }
        ]
      },
      {
        id: 'radio-wave',
        label: 'Radio wave',
        protocol: 'UDP',
        color: '#D97706',
        badge: '📶',
        osiLayers: [
          {
            layer: 'Physical',
            layerNumber: 1,
            active: true,
            protocol: 'WiFi 802.11',
            headers: {
              'Medium': 'Air (2.4GHz or 5GHz)',
              'Modulation': 'OFDM',
              'Range': '~50m indoors',
              'Interference': 'Walls, microwaves, Bluetooth'
            },
            description: 'Electromagnetic radiation modulated into symbol constellations via QAM/OFDM'
          }
        ]
      }
    ],
    steps: [
      {
        id: 'intro',
        title: 'Everything is a signal',
        explanation: 'All networking starts at Layer 1 — the **Physical layer**. This is where digital data (0s and 1s) becomes a physical signal that can travel through a medium.\n\nThere are three main types of media:\n- **Copper cable** — electrical signals\n- **Fiber optic** — pulses of light\n- **Wireless** — radio waves through air',
        packetAnimations: [],
        highlights: { nodeIds: ['pc', 'modem', 'server'], osiLayerNumbers: [1] },
        durationMs: 7000,
        activeMedium: 'all'
      },
      {
        id: 'binary-to-signal',
        title: 'Binary data: 0s and 1s',
        explanation: 'Inside your computer, everything is **binary** — sequences of 0s and 1s stored as electrical charge in transistors.\n\nTo send a message like `Hello`, the computer converts each character to binary using ASCII:\n- H = 01001000\n- e = 01100101\n- l = 01101100\n\nThat\'s your data — a stream of bits waiting to be transmitted.',
        packetAnimations: [],
        highlights: { nodeIds: ['pc'], osiLayerNumbers: [1] },
        durationMs: 6000,
        interactiveAscii: true
      },
      {
        id: 'copper-signal',
        title: 'Copper wire — electrical voltage',
        explanation: 'The most common medium. Your NIC (Network Interface Card) converts bits to **voltage levels**:\n\n- `1` = high voltage (~+2.5V)\n- `0` = low voltage (0V or negative)\n\nEthernet cables (Cat5e, Cat6) carry these signals at up to **1 Gbps** over 100 meters. Beyond that, the signal degrades (**attenuation**) and needs a repeater.',
        packetAnimations: [{ packetId: 'bit-stream', edgeId: 'pc-modem', direction: 'forward' }],
        highlights: { nodeIds: ['pc', 'modem'], edgeIds: ['pc-modem'], osiLayerNumbers: [1] },
        inspectPacketId: 'bit-stream',
        durationMs: 4500,
        signalDetails: {
          medium: 'Copper (Twisted Pair Cat6)',
          type: 'Differential voltage pulses',
          high: '+2.5V (Logic 1)',
          low: '0V / -2.5V (Logic 0)',
          maxDistance: '100 meters'
        }
      },
      {
        id: 'fiber-signal',
        title: 'Fiber optic — pulses of light',
        explanation: 'Fiber optic cables transmit data as **pulses of infrared laser light** through a glass core thinner than a human hair.\n\nAdvantages over copper:\n- **Speed**: up to 100 Gbps and beyond\n- **Distance**: 80km without amplification\n- **No interference**: immune to electrical noise\n- **No corrosion**: glass doesn\'t rust\n\nBackbone internet cables crossing oceans are all fiber.',
        packetAnimations: [{ packetId: 'light-pulse', edgeId: 'pc-modem', direction: 'forward' }],
        highlights: { nodeIds: ['modem'], edgeIds: ['pc-modem'], osiLayerNumbers: [1] },
        inspectPacketId: 'light-pulse',
        durationMs: 5000,
        signalDetails: {
          medium: 'Single-mode Fiber (9µm core)',
          type: 'Infrared Laser (1310nm / 1550nm)',
          onState: 'Light pulse emitted (1)',
          offState: 'Darkness / idle laser (0)',
          maxDistance: '80 km unamplified'
        }
      },
      {
        id: 'radio-signal',
        title: 'Wireless — radio waves',
        explanation: 'WiFi, 4G/5G, and Bluetooth all transmit data as **radio waves** — oscillating electromagnetic fields that travel through air at the speed of light.\n\n- **2.4 GHz WiFi**: longer range, more interference (microwaves, walls)\n- **5 GHz WiFi**: shorter range, faster, less congestion\n- **6 GHz WiFi (WiFi 6E/7)**: newest bands — WiFi 7 (802.11be) adds 320 MHz channels and multi-link operation\n\nThe air is shared — if two devices transmit simultaneously, signals collide. WiFi uses **CSMA/CA** (listen before transmit) to prevent this.',
        packetAnimations: [{ packetId: 'radio-wave', edgeId: 'pc-modem', direction: 'forward' }],
        highlights: { nodeIds: ['modem', 'server'], edgeIds: ['modem-server'], osiLayerNumbers: [1] },
        inspectPacketId: 'radio-wave',
        durationMs: 5000,
        signalDetails: {
          medium: 'Air / Vacuum (Electromagnetic RF)',
          type: 'OFDM modulated sinusoid (2.4 / 5 / 6 GHz)',
          keyPrinciple: 'CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)',
          range: '~30-50m indoors'
        }
      },
      {
        id: 'receiver',
        title: 'The receiver reconstructs bits',
        explanation: 'At the other end, the receiver\'s NIC converts the physical signal back to bits:\n\n- Samples the voltage levels (copper)\n- Detects light pulse presence/absence (fiber)\n- Decodes radio modulation (wireless)\n\nThe **bit stream** is now identical to what was sent — ready to be handed to **Layer 2** for further processing.\n\nLayer 1 has no addresses, no error correction — it just moves bits. Everything else is the job of higher layers.',
        packetAnimations: [{ packetId: 'bit-stream', edgeId: 'modem-server', direction: 'forward' }],
        highlights: { nodeIds: ['server'], edgeIds: ['modem-server'], osiLayerNumbers: [1] },
        inspectPacketId: 'bit-stream',
        durationMs: 5000
      }
    ]
  },

  'ethernet-frames': {
    slug: 'ethernet-frames',
    title: 'Ethernet Frames',
    description: 'The structure of a Layer 2 Ethernet frame — preamble, MAC addresses, EtherType, payload, and FCS.',
    difficulty: 'beginner',
    icon: '🖼️',
    prerequisites: ['physical-signals'],
    nodes: [
      { id: 'pc-a', type: 'pc', label: 'PC A', sublabel: 'MAC: AA:BB:CC:11:22:33', x: 120, y: 250, icon: '💻' },
      { id: 'switch', type: 'switch', label: 'Switch', sublabel: 'Fast Forwarding', x: 400, y: 250, icon: '🔀' },
      { id: 'pc-b', type: 'pc', label: 'PC B', sublabel: 'MAC: AA:BB:CC:44:55:66', x: 680, y: 250, icon: '💻' }
    ],
    edges: [
      { id: 'a-sw', from: 'pc-a', to: 'switch', bidirectional: true },
      { id: 'sw-b', from: 'switch', to: 'pc-b', bidirectional: true }
    ],
    packets: [
      {
        id: 'frame',
        label: 'Ethernet Frame',
        protocol: 'TCP',
        color: '#0284C7',
        badge: 'Frame',
        fields: [
          { name: 'Preamble', bytes: '7B', hex: '0xAA 0xAA 0xAA 0xAA 0xAA 0xAA 0xAA', desc: 'Alternating 10101010 pattern to synchronize receiver clock and physical layer timing.' },
          { name: 'SFD', bytes: '1B', hex: '0xAB (10101011)', desc: 'Start Frame Delimiter. Breaks the clock pattern to flag that the destination MAC starts on the next bit.' },
          { name: 'Dst MAC', bytes: '6B', hex: 'AA:BB:CC:44:55:66', desc: 'Hardware address of destination host (PC B) or gateway on local broadcast domain.' },
          { name: 'Src MAC', bytes: '6B', hex: 'AA:BB:CC:11:22:33', desc: 'Hardware address of transmitting host (PC A). Used by switches to build MAC forwarding tables.' },
          { name: 'EtherType', bytes: '2B', hex: '0x0800', desc: 'Indicates encapsulated Layer 3 protocol (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP).' },
          { name: 'Payload', bytes: '46-1500B', hex: '[IPv4 Packet]', desc: 'The actual data payload passed down from Layer 3 (IP header + TCP segment + application data).' },
          { name: 'FCS', bytes: '4B', hex: '0x9A2F8B1C', desc: 'Frame Check Sequence (CRC-32 checksum). Verifies data integrity; mismatches are dropped silently.' }
        ],
        osiLayers: [
          {
            layer: 'Physical',
            layerNumber: 1,
            active: true,
            protocol: 'Ethernet',
            headers: {
              'Physical Medium': '1000BASE-T (Cat6 copper)',
              'Line Encoding': '4D-PAM5 (4 pairs, 5 voltage levels)',
              'Baud Rate': '125 MBaud/s per pair'
            },
            description: 'The frame is transmitted as a series of electrical signals on the wire'
          },
          {
            layer: 'Data Link',
            layerNumber: 2,
            active: true,
            protocol: 'Ethernet II',
            headers: {
              'Preamble': '7 bytes — 10101010... (sync clock)',
              'SFD': '1 byte — 10101011 (Start Frame Delimiter)',
              'Dst MAC': 'AA:BB:CC:44:55:66 (PC B)',
              'Src MAC': 'AA:BB:CC:11:22:33 (PC A)',
              'EtherType': '0x0800 (IPv4) or 0x0806 (ARP)',
              'Payload': '46–1500 bytes (data from Layer 3)',
              'FCS': '4 bytes — CRC32 error detection'
            },
            description: 'Ethernet II frame encapsulating Layer 3 IP datagram'
          },
          {
            layer: 'Network',
            layerNumber: 3,
            active: true,
            protocol: 'IPv4',
            headers: {
              'Source IP': '192.168.1.10',
              'Destination IP': '192.168.1.20',
              'TTL': '64',
              'Protocol': '6 (TCP)'
            },
            description: 'IP packet lives inside the Ethernet frame payload'
          }
        ]
      },
      {
        id: 'corrupted',
        label: 'Corrupt Frame',
        protocol: 'TCP',
        color: '#ef4444',
        badge: 'CRC ERR',
        fields: [
          { name: 'Preamble', bytes: '7B', hex: '0xAA...', desc: 'Receiver locked onto clock signals.' },
          { name: 'SFD', bytes: '1B', hex: '0xAB', desc: 'Start Frame Delimiter recognized.' },
          { name: 'Dst MAC', bytes: '6B', hex: 'AA:BB:CC:44:55:66', desc: 'Destination host matched.' },
          { name: 'Src MAC', bytes: '6B', hex: 'AA:BB:CC:11:22:33', desc: 'Source host address.' },
          { name: 'EtherType', bytes: '2B', hex: '0x0800', desc: 'IPv4 packet header.' },
          { name: 'Payload', bytes: '46-1500B', hex: '[CORRUPTED BITS]', desc: 'Bit inversion caused by EMI/noise during wire transit.' },
          { name: 'FCS', bytes: '4B', hex: '0x9A2F8B1C ≠ 0x41E9D21B', desc: 'CRC-32 MISMATCH! Calculated CRC differs from received FCS.' }
        ],
        osiLayers: [
          {
            layer: 'Physical',
            layerNumber: 1,
            active: true,
            description: 'Electrical interference corrupted some bits during transmission'
          },
          {
            layer: 'Data Link',
            layerNumber: 2,
            active: true,
            protocol: 'Ethernet II',
            headers: {
              'FCS check': 'FAILED — CRC mismatch detected',
              'Action': 'Frame is DROPPED silently — no retransmission at Layer 2',
              'Who retransmits?': 'TCP at Layer 4 (if used) handles recovery'
            },
            description: 'Frame integrity verification failed: dropped without ACK or NACK'
          }
        ]
      }
    ],
    steps: [
      {
        id: 'intro',
        title: 'What is an Ethernet frame?',
        explanation: 'Layer 2 (Data Link) packages raw data into **frames** — structured chunks with source/destination addresses and error detection.\n\nEthernet is the most common Layer 2 protocol for wired networks. A frame is like an **envelope**: it wraps the IP packet (the letter) with addressing and delivery instructions.',
        packetAnimations: [],
        highlights: { nodeIds: ['pc-a', 'switch', 'pc-b'] },
        durationMs: 6000,
        activeField: null
      },
      {
        id: 'preamble',
        title: 'Preamble & SFD — synchronization',
        explanation: 'Every frame starts with:\n\n**Preamble** (7 bytes): `10101010 10101010...` — alternating bits that let the receiver synchronize its clock to the sender\'s speed.\n\n**SFD** (Start Frame Delimiter, 1 byte): `10101011` — the last byte switches pattern to signal *"the actual frame starts now."*\n\nWithout this, the receiver wouldn\'t know when data begins.',
        packetAnimations: [],
        highlights: { nodeIds: ['pc-a'], osiLayerNumbers: [1, 2] },
        durationMs: 5000,
        inspectPacketId: 'frame',
        activeField: 'Preamble'
      },
      {
        id: 'mac-fields',
        title: 'Destination & Source MAC addresses',
        explanation: 'After the preamble come the two MAC address fields (6 bytes each):\n\n- **Destination MAC**: who this frame is for — `AA:BB:CC:44:55:66` (PC B)\n- **Source MAC**: who sent it — `AA:BB:CC:11:22:33` (PC A)\n\nMAC addresses are **hardware addresses** burned into the NIC at manufacture. They identify devices on the same **local network** only — they change at every router hop.',
        packetAnimations: [],
        highlights: { nodeIds: ['pc-a'], osiLayerNumbers: [2] },
        inspectPacketId: 'frame',
        durationMs: 5000,
        activeField: 'Dst MAC'
      },
      {
        id: 'ethertype',
        title: 'EtherType — what\'s inside?',
        explanation: 'The **EtherType** field (2 bytes) tells the receiver what Layer 3 protocol is in the payload:\n\n- `0x0800` = IPv4\n- `0x86DD` = IPv6\n- `0x0806` = ARP\n- `0x8100` = 802.1Q VLAN tag\n\nThis lets the NIC hand the payload to the correct Layer 3 handler without reading the contents.',
        packetAnimations: [],
        highlights: { nodeIds: ['pc-a'], osiLayerNumbers: [2, 3] },
        inspectPacketId: 'frame',
        durationMs: 5000,
        activeField: 'EtherType'
      },
      {
        id: 'frame-travels',
        title: 'Frame travels to the switch',
        explanation: 'PC A sends the complete frame. The switch reads only the **Destination MAC** — it doesn\'t care about IP addresses.\n\nThe switch looks up `AA:BB:CC:44:55:66` in its **MAC address table** and forwards the frame out the correct port. Click the packet to see the full frame structure.',
        packetAnimations: [{ packetId: 'frame', edgeId: 'a-sw', direction: 'forward' }],
        highlights: { nodeIds: ['pc-a', 'switch'], edgeIds: ['a-sw'], osiLayerNumbers: [1, 2] },
        inspectPacketId: 'frame',
        durationMs: 4000,
        activeField: 'Payload'
      },
      {
        id: 'fcs',
        title: 'FCS — error detection',
        explanation: 'The last 4 bytes are the **FCS** (Frame Check Sequence) — a CRC32 checksum computed over the entire frame.\n\nThe receiver recalculates the CRC. If it matches → frame is good. If it doesn\'t → **the frame is silently dropped**.\n\nEthernet does NOT retransmit — that\'s TCP\'s job. Dropped frames show up as TCP retransmissions, which you can see in Wireshark.',
        packetAnimations: [{ packetId: 'frame', edgeId: 'sw-b', direction: 'forward' }],
        highlights: { nodeIds: ['switch', 'pc-b'], edgeIds: ['sw-b'], osiLayerNumbers: [2] },
        inspectPacketId: 'frame',
        durationMs: 4500,
        activeField: 'FCS'
      },
      {
        id: 'corrupt',
        title: 'Corrupted frame — silently dropped',
        explanation: 'If interference corrupted any bits during transmission, the FCS check fails at the receiver. PC B checks the CRC — mismatch — and **drops the frame silently**. No error message is sent.\n\nTCP detects the missing data (segment never acknowledged) and retransmits. UDP has no recovery — the data is just lost.\n\nThis is why FCS matters: it prevents corrupted data from being accepted as valid.',
        packetAnimations: [{ packetId: 'corrupted', edgeId: 'a-sw', direction: 'forward' }],
        highlights: { nodeIds: ['pc-a'], edgeIds: ['a-sw'] },
        inspectPacketId: 'corrupted',
        durationMs: 5000,
        activeField: 'FCS',
        isError: true
      }
    ]
  },

  "network-address-types": {
    "slug": "network-address-types",
    "title": "IP Address Types & Ranges",
    "description": "Public vs private, loopback, link-local, multicast, and broadcast addresses — what each range means and when packets using them can cross a router.",
    "difficulty": "beginner",
    "icon": "🗺️",
    "prerequisites": [
      "ip-address"
    ],
    "nodes": [
      {
        "id": "host",
        "type": "pc",
        "label": "Host",
        "sublabel": "192.168.1.10",
        "x": 120,
        "y": 250
      },
      {
        "id": "router",
        "type": "router",
        "label": "Router",
        "sublabel": "192.168.1.1 / 203.0.113.1",
        "x": 400,
        "y": 250
      },
      {
        "id": "internet",
        "type": "internet",
        "label": "Internet",
        "sublabel": "public routable",
        "x": 670,
        "y": 250
      }
    ],
    "edges": [
      {
        "id": "h-r",
        "from": "host",
        "to": "router",
        "bidirectional": true
      },
      {
        "id": "r-i",
        "from": "router",
        "to": "internet",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "private-ranges",
        "label": "Private address ranges (RFC 1918)",
        "protocol": "TCP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "10.0.0.0/8": "Class A private — 16.7M addresses (enterprises, cloud VPCs)",
              "172.16.0.0/12": "Class B private — 1M addresses (172.16–172.31)",
              "192.168.0.0/16": "Class C private — 65K addresses (home routers)",
              "Not routable": "ISPs drop packets with these src/dst IPs — NAT required to reach internet",
              "Free to use": "No registration needed — reuse across organizations (causes overlap in VPN)"
            }
          }
        ]
      },
      {
        "id": "special-ranges",
        "label": "Special purpose addresses",
        "protocol": "ICMP",
        "color": "#F43F5E",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "127.0.0.0/8": "Loopback — 127.0.0.1 = localhost. Never leaves the host.",
              "0.0.0.0/8": "This network — used as src before address assignment (DHCP)",
              "169.254.0.0/16": "Link-local (APIPA) — assigned when DHCP fails. Not routed.",
              "100.64.0.0/10": "Shared address space (RFC 6598) — carrier-grade NAT",
              "240.0.0.0/4": "Reserved (class E) — experimental, not used in production"
            }
          }
        ]
      },
      {
        "id": "broadcast",
        "label": "Broadcast addresses",
        "protocol": "UDP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "255.255.255.255": "Limited broadcast — this network only, not forwarded by routers",
              "192.168.1.255": "Directed broadcast — all hosts in 192.168.1.0/24",
              "Router behavior": "Directed broadcasts not forwarded by default (smurf attack prevention)",
              "Multicast": "224.0.0.0/4 — group membership, more efficient than broadcast"
            }
          }
        ]
      },
      {
        "id": "public-ranges",
        "label": "Public (routable) addresses",
        "protocol": "TCP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "IANA allocated": "Assigned to organizations by regional internet registries (ARIN, RIPE, etc.)",
              "Documentation": "192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 — safe for examples",
              "Bogon filtering": "ISPs drop packets with src = RFC 1918 or unallocated space",
              "IPv4 exhaustion": "IANA /8 blocks fully allocated in 2011 — IPv6 transition ongoing"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "addr-concept",
        "title": "Not all IP addresses are equal",
        "explanation": "IPv4 addresses aren't all interchangeable. Some ranges are **private** (not routable on the internet), some are **special purpose** (loopback, link-local), some are **multicast**, and some are **public** (globally routable).\n\nUnderstanding which range an address falls in immediately tells you where packets with that address can and can't go.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "host",
            "router",
            "internet"
          ]
        },
        "durationMs": 4500
      },
      {
        "id": "private-step",
        "title": "RFC 1918: private ranges are free to reuse",
        "explanation": "Three ranges are reserved for private networks — anyone can use them without registering:\n- **10.0.0.0/8** — large enterprise networks, cloud VPCs\n- **172.16.0.0/12** — medium networks\n- **192.168.0.0/16** — home routers\n\nISPs filter these at their borders — a packet with `10.x.x.x` as destination will never be routed on the public internet. You need **NAT** to reach the internet from a private address.",
        "packetAnimations": [
          {
            "packetId": "private-ranges",
            "edgeId": "h-r",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "host",
            "router"
          ],
          "edgeIds": [
            "h-r"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "inspectPacketId": "private-ranges",
        "durationMs": 4500
      },
      {
        "id": "special-step",
        "title": "Special addresses: loopback and link-local",
        "explanation": "**127.0.0.1** (loopback/localhost): traffic never leaves the host. The OS handles it internally. The entire `127.0.0.0/8` block is loopback.\n\n**169.254.0.0/16** (APIPA/link-local): when a device can't get a DHCP address, it self-assigns one from this range. Only valid on the local segment — routers don't forward it.\n\n**0.0.0.0**: used as \"this host, unknown IP\" in DHCP discovery, or as a wildcard listen address.",
        "packetAnimations": [
          {
            "packetId": "special-ranges",
            "edgeId": "h-r",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "host",
            "router"
          ],
          "edgeIds": [
            "h-r"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "inspectPacketId": "special-ranges",
        "durationMs": 4500
      },
      {
        "id": "broadcast-step",
        "title": "Broadcast: sending to all hosts",
        "explanation": "**255.255.255.255** is the limited broadcast — sent to all hosts on the current network. Routers never forward this (DHCP and ARP use it).\n\nA **directed broadcast** (e.g., 192.168.1.255) reaches all hosts in a specific subnet. Routers may forward directed broadcasts but usually don't by default — they were abused in **smurf DDoS attacks** (send ICMP to directed broadcast with spoofed src = victim).",
        "packetAnimations": [
          {
            "packetId": "broadcast",
            "edgeId": "h-r",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "host",
            "router"
          ],
          "edgeIds": [
            "h-r"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "inspectPacketId": "broadcast",
        "durationMs": 4500
      },
      {
        "id": "public-step",
        "title": "Public addresses: globally routable",
        "explanation": "Everything outside the special ranges is (or should be) publicly routable. ISPs perform **bogon filtering** — dropping packets with source addresses that shouldn't be on the internet (private ranges, unallocated space).\n\nFor documentation and examples, use **192.0.2.0/24**, **198.51.100.0/24**, and **203.0.113.0/24** (RFC 5737) — these are reserved for docs and will never be assigned to real infrastructure.",
        "packetAnimations": [
          {
            "packetId": "public-ranges",
            "edgeId": "r-i",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "router",
            "internet"
          ],
          "edgeIds": [
            "r-i"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "inspectPacketId": "public-ranges",
        "durationMs": 4500
      }
    ]
  },

  "mac-addresses": {
    "slug": "mac-addresses",
    "title": "MAC Addresses & ARP",
    "description": "What MAC addresses are, how ARP discovers them, and what happens when two devices want to talk.",
    "difficulty": "beginner",
    "icon": "🏷️",
    "prerequisites": [
      "ethernet-frames"
    ],
    "nodes": [
      {
        "id": "pc-a",
        "type": "pc",
        "label": "PC A",
        "sublabel": "192.168.1.10\nMAC: AA:BB:CC:11:22:33",
        "x": 100,
        "y": 250
      },
      {
        "id": "switch",
        "type": "switch",
        "label": "Switch",
        "x": 400,
        "y": 250
      },
      {
        "id": "pc-b",
        "type": "pc",
        "label": "PC B",
        "sublabel": "192.168.1.20\nMAC: DD:EE:FF:44:55:66",
        "x": 700,
        "y": 250
      }
    ],
    "edges": [
      {
        "id": "a-sw",
        "from": "pc-a",
        "to": "switch",
        "bidirectional": true
      },
      {
        "id": "sw-b",
        "from": "switch",
        "to": "pc-b",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "arp-request",
        "label": "ARP Request",
        "protocol": "ARP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "Ethernet"
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "FF:FF:FF:FF:FF:FF (BROADCAST — sent to everyone)",
              "Src MAC": "AA:BB:CC:11:22:33 (PC A)",
              "EtherType": "0x0806 (ARP)"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "ARP",
            "headers": {
              "Operation": "1 (REQUEST)",
              "Sender MAC": "AA:BB:CC:11:22:33",
              "Sender IP": "192.168.1.10",
              "Target MAC": "00:00:00:00:00:00 (unknown — what we're asking for)",
              "Target IP": "192.168.1.20 (PC B)"
            }
          }
        ]
      },
      {
        "id": "arp-reply",
        "label": "ARP Reply",
        "protocol": "ARP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "Ethernet"
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "AA:BB:CC:11:22:33 (PC A — unicast reply)",
              "Src MAC": "DD:EE:FF:44:55:66 (PC B)",
              "EtherType": "0x0806 (ARP)"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "ARP",
            "headers": {
              "Operation": "2 (REPLY)",
              "Sender MAC": "DD:EE:FF:44:55:66 (here's my MAC!)",
              "Sender IP": "192.168.1.20",
              "Target MAC": "AA:BB:CC:11:22:33",
              "Target IP": "192.168.1.10"
            }
          }
        ]
      },
      {
        "id": "data",
        "label": "HTTP GET",
        "protocol": "HTTP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "DD:EE:FF:44:55:66 (now known from ARP cache)",
              "Src MAC": "AA:BB:CC:11:22:33"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "192.168.1.10",
              "Dst IP": "192.168.1.20"
            }
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "HTTP",
            "headers": {
              "Method": "GET /"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "what-is-mac",
        "title": "What is a MAC address?",
        "explanation": "A **MAC address** (Media Access Control) is a 48-bit hardware identifier assigned to every network interface at manufacture.\n\nFormat: `AA:BB:CC:11:22:33` — six pairs of hexadecimal digits.\n\n- First 3 bytes (**OUI**): manufacturer ID (AA:BB:CC = vendor)\n- Last 3 bytes: unique device serial\n\nMAC addresses are **local** — they only matter on the same network segment. Every router hop uses different MACs.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "pc-a",
            "pc-b"
          ],
          "osiLayerNumbers": [
            2
          ]
        },
        "durationMs": 7000
      },
      {
        "id": "problem",
        "title": "PC A wants to reach PC B",
        "explanation": "PC A wants to send data to PC B at IP `192.168.1.20`. It knows the IP address (from DNS or static config), but to create an Ethernet frame it needs the **MAC address** too.\n\nPC A checks its **ARP cache** — a local table of IP→MAC mappings. PC B isn't there yet.\n\nSolution: send an **ARP Request** — a broadcast asking *\"Who has 192.168.1.20? Tell me your MAC.\"*",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "pc-a"
          ],
          "osiLayerNumbers": [
            2,
            3
          ]
        },
        "durationMs": 5000
      },
      {
        "id": "arp-request",
        "title": "ARP Request — broadcast to everyone",
        "explanation": "PC A sends an ARP Request with destination MAC `FF:FF:FF:FF:FF:FF` — the **broadcast address**. Every device on the LAN receives this frame.\n\nThe request says: *\"I'm AA:BB:CC:11:22:33 at 192.168.1.10. If you are 192.168.1.20, please tell me your MAC.\"*\n\nEvery device reads it. Only the device with IP 192.168.1.20 replies.",
        "packetAnimations": [
          {
            "packetId": "arp-request",
            "edgeId": "a-sw",
            "direction": "forward"
          },
          {
            "packetId": "arp-request",
            "edgeId": "sw-b",
            "direction": "forward",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc-a"
          ],
          "edgeIds": [
            "a-sw",
            "sw-b"
          ],
          "osiLayerNumbers": [
            2,
            3
          ]
        },
        "inspectPacketId": "arp-request",
        "durationMs": 4000
      },
      {
        "id": "arp-reply",
        "title": "ARP Reply — unicast response",
        "explanation": "PC B recognizes its IP in the request. It sends an **ARP Reply** directly back to PC A (unicast — not broadcast, since it now knows PC A's MAC from the request).\n\nReply: *\"I have 192.168.1.20 — my MAC is DD:EE:FF:44:55:66.\"*\n\nBoth PCs also update their ARP caches. Future communication skips the ARP exchange.",
        "packetAnimations": [
          {
            "packetId": "arp-reply",
            "edgeId": "sw-b",
            "direction": "reverse"
          },
          {
            "packetId": "arp-reply",
            "edgeId": "a-sw",
            "direction": "reverse",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc-b"
          ],
          "edgeIds": [
            "sw-b",
            "a-sw"
          ],
          "osiLayerNumbers": [
            2,
            3
          ]
        },
        "inspectPacketId": "arp-reply",
        "durationMs": 4000
      },
      {
        "id": "data-flows",
        "title": "Now data can flow",
        "explanation": "PC A's ARP cache now has the mapping:\n`192.168.1.20 → DD:EE:FF:44:55:66`\n\nIt can build a proper Ethernet frame and send data directly. ARP entries are cached for a few minutes (typically 20 minutes on Linux, 2 minutes on Windows) to avoid constant ARP storms.",
        "packetAnimations": [
          {
            "packetId": "data",
            "edgeId": "a-sw",
            "direction": "forward"
          },
          {
            "packetId": "data",
            "edgeId": "sw-b",
            "direction": "forward",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc-a",
            "pc-b"
          ],
          "edgeIds": [
            "a-sw",
            "sw-b"
          ]
        },
        "inspectPacketId": "data",
        "durationMs": 4000
      },
      {
        "id": "arp-security",
        "title": "ARP has no authentication",
        "explanation": "ARP was designed in 1982 with zero security. Any device can send an unsolicited **Gratuitous ARP** — claiming any IP's MAC mapping.\n\nThis enables **ARP spoofing**: an attacker poisons your ARP cache, making all traffic go through them first (Man-in-the-Middle).\n\nDefenses: **Dynamic ARP Inspection** (DAI) on managed switches, static ARP entries for critical hosts, or **IPv6 NDP** (which replaces ARP with better security).",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "switch"
          ]
        },
        "durationMs": 7000
      }
    ]
  },

  "broadcast-domain": {
    "slug": "broadcast-domain",
    "title": "Broadcast, Multicast & Unicast",
    "description": "The three ways to address network traffic: one-to-one, one-to-group, and one-to-all.",
    "difficulty": "beginner",
    "icon": "📢",
    "prerequisites": [
      "mac-addresses"
    ],
    "nodes": [
      {
        "id": "sender",
        "type": "pc",
        "label": "Sender",
        "sublabel": "192.168.1.10",
        "x": 80,
        "y": 250
      },
      {
        "id": "switch",
        "type": "switch",
        "label": "Switch",
        "x": 300,
        "y": 250
      },
      {
        "id": "pc-b",
        "type": "pc",
        "label": "PC B",
        "sublabel": "192.168.1.20",
        "x": 520,
        "y": 140
      },
      {
        "id": "pc-c",
        "type": "pc",
        "label": "PC C",
        "sublabel": "192.168.1.30",
        "x": 520,
        "y": 250
      },
      {
        "id": "pc-d",
        "type": "pc",
        "label": "PC D",
        "sublabel": "192.168.1.40",
        "x": 520,
        "y": 360
      }
    ],
    "edges": [
      {
        "id": "s-sw",
        "from": "sender",
        "to": "switch",
        "bidirectional": true
      },
      {
        "id": "sw-b",
        "from": "switch",
        "to": "pc-b",
        "bidirectional": true
      },
      {
        "id": "sw-c",
        "from": "switch",
        "to": "pc-c",
        "bidirectional": true
      },
      {
        "id": "sw-d",
        "from": "switch",
        "to": "pc-d",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "unicast",
        "label": "Unicast",
        "protocol": "TCP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "Specific MAC of PC B only",
              "Delivery": "One device receives it",
              "Switch action": "Forwards to PC B's port only (known MAC)"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Dst IP": "192.168.1.20 (PC B)"
            }
          }
        ]
      },
      {
        "id": "broadcast",
        "label": "Broadcast",
        "protocol": "ARP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "FF:FF:FF:FF:FF:FF (broadcast)",
              "Delivery": "ALL devices on the LAN receive it",
              "Switch action": "Floods out ALL ports",
              "Router action": "STOPS here — routers don't forward broadcasts"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Dst IP": "192.168.1.255 (subnet broadcast)"
            }
          }
        ]
      },
      {
        "id": "multicast",
        "label": "Multicast",
        "protocol": "IGMP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "01:00:5E:xx:xx:xx (multicast range)",
              "Delivery": "Only subscribed devices receive it",
              "Switch action": "Forwards to subscribed ports (IGMP snooping)"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Dst IP": "224.0.0.1 (multicast group address)"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "intro",
        "title": "Three types of network addressing",
        "explanation": "Every network packet has a destination address. There are three fundamental delivery models:\n\n- **Unicast** — one sender, one receiver (most traffic)\n- **Broadcast** — one sender, all devices on the LAN\n- **Multicast** — one sender, a specific group of receivers\n\nEach has a different use case and different behavior at switches and routers.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "sender",
            "switch",
            "pc-b",
            "pc-c",
            "pc-d"
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "unicast",
        "title": "Unicast — one to one",
        "explanation": "**Unicast** is how most traffic works: HTTP, email, file downloads. One sender, one specific receiver.\n\nThe Ethernet frame has a specific destination MAC. The switch **already knows** which port PC B is on (from MAC learning), so it sends the frame **only to PC B**.\n\nPC C and PC D never see this traffic.",
        "packetAnimations": [
          {
            "packetId": "unicast",
            "edgeId": "s-sw",
            "direction": "forward"
          },
          {
            "packetId": "unicast",
            "edgeId": "sw-b",
            "direction": "forward",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "sender",
            "pc-b"
          ],
          "edgeIds": [
            "s-sw",
            "sw-b"
          ]
        },
        "inspectPacketId": "unicast",
        "durationMs": 4000
      },
      {
        "id": "broadcast",
        "title": "Broadcast — one to all",
        "explanation": "**Broadcast** sends to everyone on the local network. Destination MAC is `FF:FF:FF:FF:FF:FF`.\n\nThe switch **floods** the frame out every port. Every device must interrupt its CPU to process this frame.\n\nBroadcast is used for:\n- **ARP** — *Who has this IP?*\n- **DHCP Discover** — *I need an IP address!*\n- **NetBIOS** — Windows name resolution (older)\n\n**Routers stop broadcasts** — they don't forward them between subnets. That's why your home network is a single broadcast domain.",
        "packetAnimations": [
          {
            "packetId": "broadcast",
            "edgeId": "s-sw",
            "direction": "forward"
          },
          {
            "packetId": "broadcast",
            "edgeId": "sw-b",
            "direction": "forward",
            "delayMs": 600
          },
          {
            "packetId": "broadcast",
            "edgeId": "sw-c",
            "direction": "forward",
            "delayMs": 600
          },
          {
            "packetId": "broadcast",
            "edgeId": "sw-d",
            "direction": "forward",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "sender",
            "pc-b",
            "pc-c",
            "pc-d"
          ],
          "edgeIds": [
            "s-sw",
            "sw-b",
            "sw-c",
            "sw-d"
          ]
        },
        "inspectPacketId": "broadcast",
        "durationMs": 5000
      },
      {
        "id": "broadcast-storm",
        "title": "Broadcast storms — why too much is bad",
        "explanation": "In a large network, excessive broadcasts can cause a **broadcast storm** — so many devices sending broadcasts that useful traffic is crowded out.\n\n**Mitigations:**\n- **VLANs** — split one big broadcast domain into smaller ones\n- **Routers** — each subnet is its own broadcast domain\n- **Spanning Tree Protocol** — prevents loops that amplify broadcasts\n\nA 10,000-device network without VLANs would drown in ARP broadcasts.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "switch"
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "multicast",
        "title": "Multicast — one to a group",
        "explanation": "**Multicast** is more efficient than broadcast for group delivery. Devices **subscribe** to a multicast group (e.g., `224.0.0.1`), and only they receive the traffic.\n\nUse cases:\n- **Live video streaming** — one stream, many viewers\n- **Online gaming** — game state to all players\n- **Routing protocols** — OSPF uses `224.0.0.5`\n\nSwitch with **IGMP snooping** only forwards multicast to subscribed ports — like broadcast without the waste.",
        "packetAnimations": [
          {
            "packetId": "multicast",
            "edgeId": "s-sw",
            "direction": "forward"
          },
          {
            "packetId": "multicast",
            "edgeId": "sw-b",
            "direction": "forward",
            "delayMs": 600
          },
          {
            "packetId": "multicast",
            "edgeId": "sw-c",
            "direction": "forward",
            "delayMs": 800
          }
        ],
        "highlights": {
          "nodeIds": [
            "sender",
            "pc-b",
            "pc-c"
          ],
          "edgeIds": [
            "s-sw",
            "sw-b",
            "sw-c"
          ]
        },
        "inspectPacketId": "multicast",
        "durationMs": 4500
      },
      {
        "id": "summary",
        "title": "When to use each",
        "explanation": "| Type | Address | Scale | Example |\n|------|---------|-------|---------|\n| Unicast | Specific MAC/IP | 1:1 | HTTP, SSH, email |\n| Broadcast | FF:FF:FF:FF:FF:FF | 1:LAN | ARP, DHCP |\n| Multicast | 01:00:5E:xx / 224.x | 1:group | Video stream, OSPF |\n\n**Anycast** (Layer 3) is a fourth type — traffic goes to the *nearest* node with that IP. Used by DNS root servers and CDNs.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "sender",
            "switch"
          ]
        },
        "durationMs": 7000
      }
    ]
  },

  "wifi-basics": {
    "slug": "wifi-basics",
    "title": "How WiFi Works",
    "description": "802.11 association, channels, WPA2 authentication, and why WiFi is slower than wired.",
    "difficulty": "beginner",
    "icon": "📶",
    "prerequisites": [
      "broadcast-domain"
    ],
    "nodes": [
      {
        "id": "laptop",
        "type": "laptop",
        "label": "Your Laptop",
        "sublabel": "WiFi client",
        "x": 100,
        "y": 280
      },
      {
        "id": "ap",
        "type": "access-point",
        "label": "Access Point",
        "sublabel": "SSID: HomeNetwork\nCh 6 (2.4 GHz)",
        "x": 400,
        "y": 250
      },
      {
        "id": "router",
        "type": "router",
        "label": "Router",
        "sublabel": "192.168.1.1",
        "x": 680,
        "y": 250
      }
    ],
    "edges": [
      {
        "id": "laptop-ap",
        "from": "laptop",
        "to": "ap",
        "bidirectional": true,
        "label": "Wireless (air)"
      },
      {
        "id": "ap-router",
        "from": "ap",
        "to": "router",
        "bidirectional": true,
        "label": "Ethernet"
      }
    ],
    "packets": [
      {
        "id": "probe-request",
        "label": "Probe Request",
        "protocol": "UDP",
        "color": "#94a3b8",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "802.11 Radio",
            "headers": {
              "Frequency": "2.4 GHz / 5 GHz",
              "Channel": "1-14 (2.4GHz) or 36-165 (5GHz)"
            }
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "802.11 (WiFi)",
            "headers": {
              "Frame type": "Management — Probe Request",
              "Src MAC": "Laptop's MAC",
              "SSID": "(wildcard — asking for any network)",
              "Capabilities": "Supported rates, 802.11n/ac/ax"
            }
          }
        ]
      },
      {
        "id": "probe-response",
        "label": "Probe Response",
        "protocol": "UDP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "802.11",
            "headers": {
              "Frame type": "Management — Probe Response",
              "SSID": "HomeNetwork",
              "BSSID": "AP's MAC address",
              "Security": "WPA2-Personal (AES)",
              "Channel": "6",
              "Beacon interval": "100ms"
            }
          }
        ]
      },
      {
        "id": "auth-request",
        "label": "Auth Request",
        "protocol": "TLS",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "802.11",
            "headers": {
              "Frame type": "Management — Authentication",
              "Algorithm": "Open System (WPA2 handles auth separately)",
              "Status": "0 (success)"
            }
          }
        ]
      },
      {
        "id": "assoc-request",
        "label": "Association Req",
        "protocol": "TCP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "802.11",
            "headers": {
              "Frame type": "Management — Association Request",
              "SSID": "HomeNetwork",
              "Capabilities": "QoS, Short slot time",
              "Listen interval": "10 beacon intervals"
            }
          }
        ]
      },
      {
        "id": "four-way",
        "label": "4-Way Handshake",
        "protocol": "TLS",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "802.11 / EAPOL",
            "headers": {
              "Purpose": "Derive encryption keys from PSK (password)",
              "Message 1": "AP → Client: ANonce (random number)",
              "Message 2": "Client → AP: SNonce + MIC (proves it knows password)",
              "Message 3": "AP → Client: GTK (Group Temporal Key) + MIC",
              "Message 4": "Client → AP: Acknowledgement",
              "Result": "PTK (pairwise key) and GTK (broadcast key) installed"
            }
          }
        ]
      },
      {
        "id": "data-encrypted",
        "label": "Encrypted Data",
        "protocol": "HTTPS",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "802.11ac/ax"
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "802.11",
            "headers": {
              "Frame type": "Data",
              "Encryption": "AES-CCMP (from WPA2) — all data frames encrypted",
              "Key": "PTK derived during 4-way handshake"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4"
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "HTTPS"
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "intro",
        "title": "WiFi is radio networking",
        "explanation": "WiFi (802.11) uses **radio waves** to carry Ethernet-style frames through the air instead of copper cables.\n\nThe **Access Point (AP)** is the central hub — all devices communicate through it, not directly to each other (in infrastructure mode).\n\nConnecting to WiFi has several phases: **discovery → authentication → association → key exchange → data**.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "laptop",
            "ap",
            "router"
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "probe",
        "title": "Step 1 — Probe: find available networks",
        "explanation": "Your laptop sends **Probe Requests** on each channel — broadcasting *\"Is anyone there? What networks are available?\"*\n\nAPs respond with **Probe Responses** announcing their SSID, supported speeds, and security type.\n\nAlternatively, APs periodically broadcast **Beacon frames** every 100ms — even without a probe. Your phone's WiFi list is built from these beacons.",
        "packetAnimations": [
          {
            "packetId": "probe-request",
            "edgeId": "laptop-ap",
            "direction": "forward"
          },
          {
            "packetId": "probe-response",
            "edgeId": "laptop-ap",
            "direction": "reverse",
            "delayMs": 800
          }
        ],
        "highlights": {
          "nodeIds": [
            "laptop",
            "ap"
          ],
          "edgeIds": [
            "laptop-ap"
          ]
        },
        "inspectPacketId": "probe-response",
        "durationMs": 4500
      },
      {
        "id": "auth",
        "title": "Step 2 — 802.11 Authentication",
        "explanation": "The next step is a formal 802.11 **Authentication** exchange. Despite the name, this doesn't verify your password — it just establishes the 802.11 connection.\n\nFor WPA2 networks, the algorithm is always **Open System** — both sides just say *\"let's connect,\"* with the actual security handled separately in the 4-way handshake.",
        "packetAnimations": [
          {
            "packetId": "auth-request",
            "edgeId": "laptop-ap",
            "direction": "forward"
          },
          {
            "packetId": "auth-request",
            "edgeId": "laptop-ap",
            "direction": "reverse",
            "delayMs": 700
          }
        ],
        "highlights": {
          "nodeIds": [
            "laptop",
            "ap"
          ],
          "edgeIds": [
            "laptop-ap"
          ]
        },
        "durationMs": 4000
      },
      {
        "id": "assoc",
        "title": "Step 3 — Association",
        "explanation": "The laptop sends an **Association Request** — formally asking to join the AP's network and specifying its capabilities (supported speeds, QoS features).\n\nThe AP sends back an **Association Response** with an AID (Association ID) — a unique ID that identifies this client to the AP.",
        "packetAnimations": [
          {
            "packetId": "assoc-request",
            "edgeId": "laptop-ap",
            "direction": "forward"
          },
          {
            "packetId": "assoc-request",
            "edgeId": "laptop-ap",
            "direction": "reverse",
            "delayMs": 700
          }
        ],
        "highlights": {
          "nodeIds": [
            "laptop",
            "ap"
          ],
          "edgeIds": [
            "laptop-ap"
          ]
        },
        "durationMs": 4000
      },
      {
        "id": "four-way",
        "title": "Step 4 — WPA2 4-Way Handshake",
        "explanation": "This is where **WPA2 security actually happens**. Both sides use the PSK (your WiFi password) to derive encryption keys:\n\n1. AP sends a random number (ANonce)\n2. Client generates its own random number (SNonce), derives the PTK, sends SNonce + a hash proving it knows the password\n3. AP verifies the hash, sends the group key (GTK)\n4. Client confirms\n\nNeither side ever sends the password. The **PTK** (Pairwise Temporal Key) is used to encrypt all unicast data.",
        "packetAnimations": [
          {
            "packetId": "four-way",
            "edgeId": "laptop-ap",
            "direction": "forward"
          },
          {
            "packetId": "four-way",
            "edgeId": "laptop-ap",
            "direction": "reverse",
            "delayMs": 600
          },
          {
            "packetId": "four-way",
            "edgeId": "laptop-ap",
            "direction": "forward",
            "delayMs": 1200
          },
          {
            "packetId": "four-way",
            "edgeId": "laptop-ap",
            "direction": "reverse",
            "delayMs": 1800
          }
        ],
        "highlights": {
          "nodeIds": [
            "laptop",
            "ap"
          ],
          "edgeIds": [
            "laptop-ap"
          ]
        },
        "inspectPacketId": "four-way",
        "durationMs": 6000
      },
      {
        "id": "data",
        "title": "Connected — encrypted data flows",
        "explanation": "WiFi is now connected. All data is encrypted with **AES-CCMP** (Counter Mode with CBC-MAC Protocol) using the PTK.\n\nThe AP bridges WiFi frames to Ethernet and forwards them to the router for internet access.",
        "packetAnimations": [
          {
            "packetId": "data-encrypted",
            "edgeId": "laptop-ap",
            "direction": "forward"
          },
          {
            "packetId": "data-encrypted",
            "edgeId": "ap-router",
            "direction": "forward",
            "delayMs": 700
          }
        ],
        "highlights": {
          "nodeIds": [
            "laptop",
            "ap",
            "router"
          ],
          "edgeIds": [
            "laptop-ap",
            "ap-router"
          ]
        },
        "inspectPacketId": "data-encrypted",
        "durationMs": 4000
      },
      {
        "id": "wifi-limitations",
        "title": "Why WiFi is slower than Ethernet",
        "explanation": "WiFi has inherent limitations vs wired:\n\n- **Half-duplex**: devices take turns — only one transmits at a time (**CSMA/CA**)\n- **Shared medium**: all devices on same channel share bandwidth\n- **Interference**: walls, microwaves, neighboring networks\n- **Distance**: signal weakens with distance (inverse square law)\n- **Retransmissions**: no FCS acknowledgement at L2 → WiFi has its own ACK per frame\n\nWiFi 6 (802.11ax) uses OFDMA to serve multiple devices simultaneously, closing much of the gap.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "ap"
          ]
        },
        "durationMs": 7000
      }
    ]
  },

  "dhcp": {
    "slug": "dhcp",
    "title": "DHCP — Getting an IP Address",
    "description": "The DORA process: how your device automatically gets an IP, subnet mask, gateway, and DNS server.",
    "difficulty": "beginner",
    "icon": "🪪",
    "prerequisites": [
      "broadcast-domain"
    ],
    "nodes": [
      {
        "id": "client",
        "type": "pc",
        "label": "New Device",
        "sublabel": "No IP yet!",
        "x": 100,
        "y": 250
      },
      {
        "id": "router",
        "type": "router",
        "label": "Router",
        "sublabel": "192.168.1.1",
        "x": 400,
        "y": 250
      },
      {
        "id": "dhcp-srv",
        "type": "dhcp-server",
        "label": "DHCP Server",
        "sublabel": "192.168.1.1 (often router)",
        "x": 680,
        "y": 250
      }
    ],
    "edges": [
      {
        "id": "client-router",
        "from": "client",
        "to": "router",
        "bidirectional": true
      },
      {
        "id": "router-dhcp",
        "from": "router",
        "to": "dhcp-srv",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "discover",
        "label": "DHCP Discover",
        "protocol": "DHCP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "FF:FF:FF:FF:FF:FF (broadcast)",
              "Src MAC": "Client MAC"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "0.0.0.0 (no IP yet!)",
              "Dst IP": "255.255.255.255 (broadcast)"
            }
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "UDP",
            "headers": {
              "Src Port": "68 (DHCP client)",
              "Dst Port": "67 (DHCP server)"
            }
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DHCP",
            "headers": {
              "Message type": "1 (DISCOVER)",
              "Transaction ID": "0x3d1d (random, matches request/reply)",
              "Client MAC": "Client's hardware address",
              "Hostname": "my-laptop (optional)",
              "Requested options": "IP, Subnet, Gateway, DNS"
            }
          }
        ]
      },
      {
        "id": "offer",
        "label": "DHCP Offer",
        "protocol": "DHCP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "FF:FF:FF:FF:FF:FF (still broadcast — client has no IP yet)"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "192.168.1.1",
              "Dst IP": "255.255.255.255"
            }
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DHCP",
            "headers": {
              "Message type": "2 (OFFER)",
              "Offered IP": "192.168.1.50",
              "Subnet mask": "255.255.255.0 (/24)",
              "Lease time": "86400 seconds (24 hours)",
              "Router": "192.168.1.1 (default gateway)",
              "DNS servers": "8.8.8.8, 8.8.4.4"
            }
          }
        ]
      },
      {
        "id": "request",
        "label": "DHCP Request",
        "protocol": "DHCP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Dst MAC": "FF:FF:FF:FF:FF:FF (still broadcast — decline other offers)"
            }
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DHCP",
            "headers": {
              "Message type": "3 (REQUEST)",
              "Requested IP": "192.168.1.50 (confirming the offer)",
              "Server ID": "192.168.1.1 (which server's offer I'm accepting)",
              "Note": "Broadcast so other DHCP servers know to cancel their offers"
            }
          }
        ]
      },
      {
        "id": "ack",
        "label": "DHCP ACK",
        "protocol": "DHCP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DHCP",
            "headers": {
              "Message type": "5 (ACK)",
              "Your IP address": "192.168.1.50",
              "Lease time": "86400 seconds",
              "Router": "192.168.1.1",
              "DNS": "8.8.8.8, 8.8.4.4",
              "Domain name": "home.local"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "intro",
        "title": "The problem: new device, no IP",
        "explanation": "When you connect a device to a network for the first time, it has **no IP address**. Without an IP, it can't communicate.\n\n**DHCP** (Dynamic Host Configuration Protocol) solves this automatically. Your device broadcasts a request, and a DHCP server (usually your router) assigns an IP address, subnet mask, default gateway, and DNS servers.\n\nThe process has 4 steps: **D**iscover → **O**ffer → **R**equest → **A**cknowledge (DORA).",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "client",
            "router",
            "dhcp-srv"
          ]
        },
        "durationMs": 7000
      },
      {
        "id": "discover",
        "title": "D — Discover: searching for a DHCP server",
        "explanation": "The device has no IP, so it broadcasts from `0.0.0.0` to `255.255.255.255` on **UDP port 67**:\n\n*\"Is there a DHCP server out there? I need an IP address!\"*\n\nEvery device on the LAN receives this, but only DHCP servers respond.",
        "packetAnimations": [
          {
            "packetId": "discover",
            "edgeId": "client-router",
            "direction": "forward"
          },
          {
            "packetId": "discover",
            "edgeId": "router-dhcp",
            "direction": "forward",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "client"
          ],
          "edgeIds": [
            "client-router",
            "router-dhcp"
          ],
          "osiLayerNumbers": [
            2,
            3,
            4,
            7
          ]
        },
        "inspectPacketId": "discover",
        "durationMs": 4000
      },
      {
        "id": "offer",
        "title": "O — Offer: server proposes an IP",
        "explanation": "The DHCP server picks an available IP from its pool and sends back an **Offer**:\n\n*\"I have `192.168.1.50` available. Here are your settings: subnet mask, gateway, DNS, and a 24-hour lease.\"*\n\nIf multiple DHCP servers exist, the client may receive multiple offers — it picks the first one.",
        "packetAnimations": [
          {
            "packetId": "offer",
            "edgeId": "router-dhcp",
            "direction": "reverse"
          },
          {
            "packetId": "offer",
            "edgeId": "client-router",
            "direction": "reverse",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "dhcp-srv"
          ],
          "edgeIds": [
            "router-dhcp",
            "client-router"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "inspectPacketId": "offer",
        "durationMs": 4000
      },
      {
        "id": "request",
        "title": "R — Request: client confirms",
        "explanation": "The client broadcasts again (still no IP yet) to **formally accept** the offer and **notify other DHCP servers** that it's choosing this one:\n\n*\"I'd like to accept `192.168.1.50` from server `192.168.1.1`. All other servers, please cancel your offers.\"*\n\nBroadcasting the Request lets other servers free up their reserved IPs.",
        "packetAnimations": [
          {
            "packetId": "request",
            "edgeId": "client-router",
            "direction": "forward"
          },
          {
            "packetId": "request",
            "edgeId": "router-dhcp",
            "direction": "forward",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "client"
          ],
          "edgeIds": [
            "client-router",
            "router-dhcp"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "inspectPacketId": "request",
        "durationMs": 4000
      },
      {
        "id": "ack",
        "title": "A — Acknowledge: done!",
        "explanation": "The DHCP server confirms the lease with an **ACK** — and records the binding in its lease table:\n`192.168.1.50 → Client MAC → expires in 24h`\n\nThe device now configures itself with:\n- IP: `192.168.1.50`\n- Gateway: `192.168.1.1`\n- DNS: `8.8.8.8`\n\nIt can now communicate on the network.",
        "packetAnimations": [
          {
            "packetId": "ack",
            "edgeId": "router-dhcp",
            "direction": "reverse"
          },
          {
            "packetId": "ack",
            "edgeId": "client-router",
            "direction": "reverse",
            "delayMs": 600
          }
        ],
        "highlights": {
          "nodeIds": [
            "client",
            "dhcp-srv"
          ],
          "edgeIds": [
            "router-dhcp",
            "client-router"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "inspectPacketId": "ack",
        "durationMs": 4000
      },
      {
        "id": "lease-renewal",
        "title": "Lease renewal and expiry",
        "explanation": "IP addresses are **leased**, not permanent. At 50% of the lease time (12h for a 24h lease), the client tries to renew directly with the server (unicast, no broadcast).\n\nIf the server is unreachable at 87.5% of the lease, the client broadcasts again (Discover) to find any DHCP server.\n\nWhen a lease expires and can't be renewed — the client loses its IP and must DORA again. This is why hotel WiFi disconnects after a few hours.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "client",
            "dhcp-srv"
          ]
        },
        "durationMs": 6000
      }
    ]
  },

  "http-request": {
    "slug": "http-request",
    "title": "How a Web Request Works",
    "description": "What happens when you type a URL and press Enter — from your browser to the server and back.",
    "difficulty": "simple",
    "icon": "🌐",
    "nodes": [
      {
        "id": "browser",
        "type": "pc",
        "label": "Your Browser",
        "sublabel": "192.168.1.10",
        "x": 80,
        "y": 250
      },
      {
        "id": "router",
        "type": "router",
        "label": "Home Router",
        "sublabel": "192.168.1.1",
        "x": 280,
        "y": 250
      },
      {
        "id": "internet",
        "type": "internet",
        "label": "Internet",
        "x": 480,
        "y": 250
      },
      {
        "id": "server",
        "type": "server",
        "label": "example.com",
        "sublabel": "93.184.216.34",
        "x": 700,
        "y": 250
      }
    ],
    "edges": [
      {
        "id": "browser-router",
        "from": "browser",
        "to": "router",
        "bidirectional": true
      },
      {
        "id": "router-internet",
        "from": "router",
        "to": "internet",
        "bidirectional": true
      },
      {
        "id": "internet-server",
        "from": "internet",
        "to": "server",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "http-get",
        "label": "HTTP GET",
        "protocol": "HTTP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "Ethernet/WiFi",
            "description": "Electromagnetic signals or electrical pulses"
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Src MAC": "AA:BB:CC:11:22:33",
              "Dst MAC": "Router MAC"
            }
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "192.168.1.10",
              "Dst IP": "93.184.216.34",
              "TTL": "64"
            }
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "TCP",
            "headers": {
              "Src Port": "54321",
              "Dst Port": "80",
              "Flags": "PSH,ACK"
            }
          },
          {
            "layer": "Session",
            "layerNumber": 5,
            "active": true,
            "description": "Existing TCP session manages this exchange"
          },
          {
            "layer": "Presentation",
            "layerNumber": 6,
            "active": false,
            "description": "Plain HTTP — no encoding/encryption"
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "HTTP/1.1",
            "headers": {
              "Method": "GET",
              "Path": "/",
              "Host": "example.com",
              "User-Agent": "Mozilla/5.0"
            }
          }
        ]
      },
      {
        "id": "http-response",
        "label": "HTTP 200 OK",
        "protocol": "HTTP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "Ethernet"
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet"
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "93.184.216.34",
              "Dst IP": "192.168.1.10"
            }
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "TCP",
            "headers": {
              "Src Port": "80",
              "Dst Port": "54321",
              "Flags": "PSH,ACK"
            }
          },
          {
            "layer": "Session",
            "layerNumber": 5,
            "active": true
          },
          {
            "layer": "Presentation",
            "layerNumber": 6,
            "active": false
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "HTTP/1.1",
            "headers": {
              "Status": "200 OK",
              "Content-Type": "text/html",
              "Content-Length": "1256"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "intro",
        "title": "You type a URL and press Enter",
        "explanation": "When you type `example.com` and press Enter, your browser starts a journey. It needs to find the server, establish a connection, and request the page.\n\nThe request travels from your device → home router → through the internet → to the web server.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "browser",
            "router",
            "internet",
            "server"
          ]
        },
        "durationMs": 5000
      },
      {
        "id": "get-to-router",
        "title": "Request leaves your device",
        "explanation": "Your browser creates an **HTTP GET** request and sends it to your **home router**. The router acts as the gateway between your home network and the internet.\n\nThe packet contains your IP address (192.168.1.10) as the source.",
        "packetAnimations": [
          {
            "packetId": "http-get",
            "edgeId": "browser-router",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "browser"
          ],
          "edgeIds": [
            "browser-router"
          ],
          "osiLayerNumbers": [
            1,
            2,
            3,
            4,
            7
          ]
        },
        "inspectPacketId": "http-get",
        "durationMs": 3000
      },
      {
        "id": "get-to-internet",
        "title": "Router forwards to the internet",
        "explanation": "The router reads the destination IP (93.184.216.34) and forwards the packet toward the internet. It also performs **NAT** — replacing your private IP with its public IP so the server can reply.\n\nThe packet hops through many routers across the internet to reach the destination.",
        "packetAnimations": [
          {
            "packetId": "http-get",
            "edgeId": "router-internet",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "router"
          ],
          "edgeIds": [
            "router-internet"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "get-to-server",
        "title": "Request arrives at the server",
        "explanation": "After routing through the internet, the request reaches **example.com's server**. The server reads the HTTP GET request and prepares a response with the HTML content of the page.",
        "packetAnimations": [
          {
            "packetId": "http-get",
            "edgeId": "internet-server",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "server"
          ],
          "edgeIds": [
            "internet-server"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "response-from-server",
        "title": "Server sends back the response",
        "explanation": "The server sends an **HTTP 200 OK** response with the page content. It travels the same path back — server → internet → router → your browser.\n\nClick the packet to see the response headers.",
        "packetAnimations": [
          {
            "packetId": "http-response",
            "edgeId": "internet-server",
            "direction": "reverse"
          }
        ],
        "highlights": {
          "nodeIds": [
            "server"
          ],
          "edgeIds": [
            "internet-server"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "inspectPacketId": "http-response",
        "durationMs": 3000
      },
      {
        "id": "response-home",
        "title": "Response arrives at your browser",
        "explanation": "The response travels back through the internet and your router, arriving at your browser. The browser reads the HTML and **renders the webpage** on your screen.\n\nThis entire round trip happens in **milliseconds**.",
        "packetAnimations": [
          {
            "packetId": "http-response",
            "edgeId": "router-internet",
            "direction": "reverse",
            "delayMs": 0
          },
          {
            "packetId": "http-response",
            "edgeId": "browser-router",
            "direction": "reverse",
            "delayMs": 800
          }
        ],
        "highlights": {
          "nodeIds": [
            "browser"
          ],
          "edgeIds": [
            "browser-router",
            "router-internet"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "durationMs": 4000
      },
      {
        "id": "done",
        "title": "Page loaded!",
        "explanation": "Your browser received the HTML, CSS, and JavaScript from the server and rendered the webpage.\n\nThis same process repeats for every resource on the page — images, fonts, scripts — often dozens of requests in parallel.\n\nNext: learn about **DNS** — how `example.com` gets converted to `93.184.216.34` before any of this can happen.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "browser"
          ]
        },
        "durationMs": 6000
      }
    ]
  },

  "dns-resolution": {
    "slug": "dns-resolution",
    "title": "DNS Resolution",
    "description": "How a domain name like 'example.com' gets translated into an IP address before connecting.",
    "difficulty": "simple",
    "icon": "📖",
    "prerequisites": [
      "http-request"
    ],
    "nodes": [
      {
        "id": "browser",
        "type": "pc",
        "label": "Your Browser",
        "sublabel": "192.168.1.10",
        "x": 80,
        "y": 250
      },
      {
        "id": "resolver",
        "type": "dns-server",
        "label": "DNS Resolver",
        "sublabel": "Your ISP / 8.8.8.8",
        "x": 300,
        "y": 150
      },
      {
        "id": "root",
        "type": "dns-server",
        "label": "Root DNS",
        "sublabel": ". (root)",
        "x": 500,
        "y": 80
      },
      {
        "id": "tld",
        "type": "dns-server",
        "label": "TLD Nameserver",
        "sublabel": ".com zone",
        "x": 620,
        "y": 200
      },
      {
        "id": "auth",
        "type": "dns-server",
        "label": "Authoritative NS",
        "sublabel": "example.com zone",
        "x": 500,
        "y": 340
      }
    ],
    "edges": [
      {
        "id": "br-res",
        "from": "browser",
        "to": "resolver",
        "bidirectional": true
      },
      {
        "id": "res-root",
        "from": "resolver",
        "to": "root",
        "bidirectional": true
      },
      {
        "id": "res-tld",
        "from": "resolver",
        "to": "tld",
        "bidirectional": true
      },
      {
        "id": "res-auth",
        "from": "resolver",
        "to": "auth",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "query",
        "label": "DNS Query",
        "protocol": "DNS",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Physical",
            "layerNumber": 1,
            "active": true,
            "protocol": "Ethernet"
          },
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet"
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "192.168.1.10",
              "Dst IP": "8.8.8.8"
            }
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "UDP",
            "headers": {
              "Src Port": "12345",
              "Dst Port": "53",
              "Protocol": "UDP (faster, no handshake)"
            }
          },
          {
            "layer": "Session",
            "layerNumber": 5,
            "active": false
          },
          {
            "layer": "Presentation",
            "layerNumber": 6,
            "active": false
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DNS",
            "headers": {
              "Type": "A (IPv4 address)",
              "Query": "example.com",
              "Recursion desired": "true"
            }
          }
        ]
      },
      {
        "id": "root-referral",
        "label": "Referral (.com)",
        "protocol": "DNS",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4"
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "UDP"
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DNS",
            "headers": {
              "Answer": "Refer to .com TLD servers",
              "NS": "a.gtld-servers.net"
            }
          }
        ]
      },
      {
        "id": "tld-referral",
        "label": "Referral (NS)",
        "protocol": "DNS",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4"
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "UDP"
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DNS",
            "headers": {
              "Answer": "Refer to authoritative nameserver",
              "NS": "ns1.example.com"
            }
          }
        ]
      },
      {
        "id": "answer",
        "label": "DNS Answer",
        "protocol": "DNS",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4"
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": true,
            "protocol": "UDP"
          },
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DNS",
            "headers": {
              "Name": "example.com",
              "Type": "A",
              "IP Address": "93.184.216.34",
              "TTL": "3600 seconds"
            }
          }
        ]
      },
      {
        "id": "final-answer",
        "label": "IP: 93.184.216.34",
        "protocol": "DNS",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Application",
            "layerNumber": 7,
            "active": true,
            "protocol": "DNS",
            "headers": {
              "Cached result": "93.184.216.34",
              "Cached for": "3600 seconds"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "intro",
        "title": "The DNS phone book",
        "explanation": "Computers communicate using **IP addresses** (like 93.184.216.34), not domain names. But humans use names like `example.com`.\n\n**DNS** (Domain Name System) is the internet's phone book — it translates names to IP addresses before your browser can connect.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "browser",
            "resolver",
            "root",
            "tld",
            "auth"
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "query-to-resolver",
        "title": "Browser asks the DNS Resolver",
        "explanation": "Your browser first checks its **local cache** — if it looked up `example.com` recently, it uses the cached IP.\n\nIf not, it sends a **DNS query** to your ISP's DNS resolver (or Google's 8.8.8.8). The query travels over **UDP port 53** — faster than TCP for small lookups.",
        "packetAnimations": [
          {
            "packetId": "query",
            "edgeId": "br-res",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "browser"
          ],
          "edgeIds": [
            "br-res"
          ],
          "osiLayerNumbers": [
            3,
            4,
            7
          ]
        },
        "inspectPacketId": "query",
        "durationMs": 3500
      },
      {
        "id": "resolver-to-root",
        "title": "Resolver asks the Root DNS",
        "explanation": "The resolver doesn't know the answer either, so it starts from the top. It asks a **Root DNS server** — one of 13 root server clusters that know where all top-level domains (.com, .org, .net) live.",
        "packetAnimations": [
          {
            "packetId": "query",
            "edgeId": "res-root",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "resolver",
            "root"
          ],
          "edgeIds": [
            "res-root"
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "root-responds",
        "title": "Root DNS refers to .com TLD",
        "explanation": "The Root server doesn't know `example.com`'s IP, but it knows who manages `.com` — the **TLD nameservers**. It sends back a referral: *\"Ask the .com nameservers.\"*",
        "packetAnimations": [
          {
            "packetId": "root-referral",
            "edgeId": "res-root",
            "direction": "reverse"
          }
        ],
        "highlights": {
          "nodeIds": [
            "root"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "resolver-to-tld",
        "title": "Resolver asks .com TLD nameserver",
        "explanation": "The resolver follows the referral and asks the **.com TLD nameserver** about `example.com`. The TLD server knows which nameservers are **authoritative** for `example.com`.",
        "packetAnimations": [
          {
            "packetId": "query",
            "edgeId": "res-tld",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "tld"
          ],
          "edgeIds": [
            "res-tld"
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "tld-responds",
        "title": "TLD refers to authoritative nameserver",
        "explanation": "The .com TLD server responds: *\"I don't know the IP, but ns1.example.com is authoritative — they'll know.\"* Another referral.",
        "packetAnimations": [
          {
            "packetId": "tld-referral",
            "edgeId": "res-tld",
            "direction": "reverse"
          }
        ],
        "highlights": {
          "nodeIds": [
            "tld"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "resolver-to-auth",
        "title": "Resolver asks authoritative nameserver",
        "explanation": "Finally, the resolver asks **ns1.example.com** — the authoritative nameserver that actually holds the DNS records for `example.com`. This server has the definitive answer.",
        "packetAnimations": [
          {
            "packetId": "query",
            "edgeId": "res-auth",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "auth"
          ],
          "edgeIds": [
            "res-auth"
          ]
        },
        "durationMs": 3000
      },
      {
        "id": "auth-responds",
        "title": "Authoritative NS returns the IP",
        "explanation": "The authoritative nameserver returns the **A record**: `example.com → 93.184.216.34`. It also includes a **TTL** (Time To Live) of 3600 seconds — how long the resolver can cache this answer before asking again.",
        "packetAnimations": [
          {
            "packetId": "answer",
            "edgeId": "res-auth",
            "direction": "reverse"
          }
        ],
        "highlights": {
          "nodeIds": [
            "auth"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "inspectPacketId": "answer",
        "durationMs": 3500
      },
      {
        "id": "resolver-to-browser",
        "title": "Resolver returns IP to browser",
        "explanation": "The resolver sends the IP address back to your browser and **caches** it for 3600 seconds. Next time you visit `example.com`, the answer comes instantly from cache — no DNS chain needed.",
        "packetAnimations": [
          {
            "packetId": "final-answer",
            "edgeId": "br-res",
            "direction": "reverse"
          }
        ],
        "highlights": {
          "nodeIds": [
            "browser"
          ],
          "edgeIds": [
            "br-res"
          ],
          "osiLayerNumbers": [
            7
          ]
        },
        "durationMs": 3500
      },
      {
        "id": "done",
        "title": "DNS resolved — now connecting",
        "explanation": "Your browser now knows that `example.com` is at `93.184.216.34`. The DNS lookup took milliseconds (or was instant from cache).\n\nNow the browser can establish a **TCP connection** to that IP and send the HTTP request.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "browser"
          ]
        },
        "durationMs": 5000
      }
    ]
  },

  "ping-icmp": {
    "slug": "ping-icmp",
    "title": "Ping & ICMP",
    "description": "How ICMP works, what ping measures, TTL hop counting, and how traceroute maps a network path.",
    "difficulty": "simple",
    "icon": "🏓",
    "prerequisites": [
      "ip-address"
    ],
    "nodes": [
      {
        "id": "pc",
        "type": "pc",
        "label": "Your PC",
        "sublabel": "192.168.1.10",
        "x": 80,
        "y": 250
      },
      {
        "id": "router1",
        "type": "router",
        "label": "Router 1",
        "sublabel": "ISP edge\nTTL−1",
        "x": 260,
        "y": 250
      },
      {
        "id": "router2",
        "type": "router",
        "label": "Router 2",
        "sublabel": "Internet\nTTL−1",
        "x": 450,
        "y": 250
      },
      {
        "id": "router3",
        "type": "router",
        "label": "Router 3",
        "sublabel": "Destination ISP\nTTL−1",
        "x": 620,
        "y": 250
      },
      {
        "id": "server",
        "type": "server",
        "label": "Target Host",
        "sublabel": "93.184.216.34",
        "x": 760,
        "y": 250
      }
    ],
    "edges": [
      {
        "id": "pc-r1",
        "from": "pc",
        "to": "router1",
        "bidirectional": true
      },
      {
        "id": "r1-r2",
        "from": "router1",
        "to": "router2",
        "bidirectional": true
      },
      {
        "id": "r2-r3",
        "from": "router2",
        "to": "router3",
        "bidirectional": true
      },
      {
        "id": "r3-srv",
        "from": "router3",
        "to": "server",
        "bidirectional": true
      }
    ],
    "packets": [
      {
        "id": "echo-request",
        "label": "ICMP Echo Req",
        "protocol": "ICMP",
        "color": "#F43F5E",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4 + ICMP",
            "headers": {
              "Protocol": "1 (ICMP)",
              "Src IP": "192.168.1.10",
              "Dst IP": "93.184.216.34",
              "TTL": "64 (decremented at each router hop)",
              "ICMP Type": "8 (Echo Request)",
              "ICMP Code": "0",
              "Identifier": "0x1234 (to match reply)",
              "Sequence": "1",
              "Data": "32 bytes (timestamp + padding)"
            }
          },
          {
            "layer": "Transport",
            "layerNumber": 4,
            "active": false,
            "description": "ICMP is carried directly in IP — no TCP or UDP"
          }
        ]
      },
      {
        "id": "echo-reply",
        "label": "ICMP Echo Reply",
        "protocol": "ICMP",
        "color": "#6366F1",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4 + ICMP",
            "headers": {
              "ICMP Type": "0 (Echo Reply)",
              "Src IP": "93.184.216.34",
              "Dst IP": "192.168.1.10",
              "Identifier": "0x1234 (matches request)",
              "Sequence": "1",
              "RTT": "Measured by sender when reply arrives"
            }
          }
        ]
      },
      {
        "id": "ttl-exceeded",
        "label": "TTL Exceeded",
        "protocol": "ICMP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "ICMP",
            "headers": {
              "ICMP Type": "11 (Time Exceeded)",
              "ICMP Code": "0 (TTL exceeded in transit)",
              "Src IP": "Router's IP (reveals the router!)",
              "Note": "Used by traceroute to map each hop",
              "Payload": "First 8 bytes of original IP + ICMP header"
            }
          }
        ]
      },
      {
        "id": "unreachable",
        "label": "Port Unreachable",
        "protocol": "ICMP",
        "color": "#ef4444",
        "osiLayers": [
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "ICMP",
            "headers": {
              "ICMP Type": "3 (Destination Unreachable)",
              "ICMP Code": "3 (Port Unreachable)",
              "Meaning": "Host is reachable, but no service listening on that port",
              "Traceroute use": "Sent by destination when UDP probe arrives — signals end of route"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "intro",
        "title": "What is ICMP?",
        "explanation": "**ICMP** (Internet Control Message Protocol) is a Layer 3 protocol used for network diagnostics and error reporting. It lives inside IP packets (protocol number 1) — not TCP or UDP.\n\nThe most famous ICMP tool is **ping** — it tests reachability and measures round-trip time.\n\nICMP is also used by routers to report errors: *TTL expired*, *Host unreachable*, *Fragmentation needed*, etc.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "pc",
            "server"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "echo-request",
        "title": "Ping sends ICMP Echo Request",
        "explanation": "Running `ping 93.184.216.34` sends an **ICMP Echo Request** (Type 8) with:\n- A sequence number (increments with each ping)\n- An identifier (links replies to requests)\n- A timestamp in the data payload\n\nThe packet is routed normally through the internet — no special treatment.",
        "packetAnimations": [
          {
            "packetId": "echo-request",
            "edgeId": "pc-r1",
            "direction": "forward"
          },
          {
            "packetId": "echo-request",
            "edgeId": "r1-r2",
            "direction": "forward",
            "delayMs": 400
          },
          {
            "packetId": "echo-request",
            "edgeId": "r2-r3",
            "direction": "forward",
            "delayMs": 800
          },
          {
            "packetId": "echo-request",
            "edgeId": "r3-srv",
            "direction": "forward",
            "delayMs": 1200
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc"
          ],
          "edgeIds": [
            "pc-r1",
            "r1-r2",
            "r2-r3",
            "r3-srv"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "inspectPacketId": "echo-request",
        "durationMs": 5000
      },
      {
        "id": "echo-reply",
        "title": "Target replies with Echo Reply",
        "explanation": "The server receives the Echo Request and sends back an **ICMP Echo Reply** (Type 0) with the same identifier and sequence number.\n\nYour PC measures the time between sending the request and receiving the reply — that's the **Round-Trip Time (RTT)**.\n\n`ping output: 64 bytes from 93.184.216.34: icmp_seq=1 ttl=54 time=12.3 ms`",
        "packetAnimations": [
          {
            "packetId": "echo-reply",
            "edgeId": "r3-srv",
            "direction": "reverse"
          },
          {
            "packetId": "echo-reply",
            "edgeId": "r2-r3",
            "direction": "reverse",
            "delayMs": 400
          },
          {
            "packetId": "echo-reply",
            "edgeId": "r1-r2",
            "direction": "reverse",
            "delayMs": 800
          },
          {
            "packetId": "echo-reply",
            "edgeId": "pc-r1",
            "direction": "reverse",
            "delayMs": 1200
          }
        ],
        "highlights": {
          "nodeIds": [
            "server",
            "pc"
          ],
          "edgeIds": [
            "r3-srv",
            "r2-r3",
            "r1-r2",
            "pc-r1"
          ]
        },
        "inspectPacketId": "echo-reply",
        "durationMs": 5000
      },
      {
        "id": "ttl",
        "title": "TTL — preventing infinite loops",
        "explanation": "Every IP packet has a **TTL** (Time To Live) field — an integer starting at 64 or 128. Each router **decrements TTL by 1** before forwarding.\n\nIf TTL reaches **0**, the router drops the packet and sends an **ICMP Time Exceeded** (Type 11) back to the sender.\n\nThis prevents packets from looping forever if routing tables have loops. It also reveals router hops — the basis of **traceroute**.",
        "packetAnimations": [
          {
            "packetId": "ttl-exceeded",
            "edgeId": "r1-r2",
            "direction": "reverse"
          },
          {
            "packetId": "ttl-exceeded",
            "edgeId": "pc-r1",
            "direction": "reverse",
            "delayMs": 700
          }
        ],
        "highlights": {
          "nodeIds": [
            "router2"
          ],
          "edgeIds": [
            "r1-r2",
            "pc-r1"
          ],
          "osiLayerNumbers": [
            3
          ]
        },
        "inspectPacketId": "ttl-exceeded",
        "durationMs": 5000
      },
      {
        "id": "traceroute",
        "title": "Traceroute — mapping the path",
        "explanation": "**Traceroute** uses TTL cleverly:\n\n1. Send a packet with TTL=1 → Router 1 drops it, sends back TTL Exceeded (reveals Router 1's IP)\n2. Send TTL=2 → Router 2 drops it (reveals Router 2's IP)\n3. Repeat until the destination replies\n\nResult: a complete map of every router on the path, with RTT to each.\n\n```\n1  192.168.1.1    2ms\n2  10.0.0.1       8ms\n3  93.184.216.34  12ms\n```",
        "packetAnimations": [
          {
            "packetId": "ttl-exceeded",
            "edgeId": "pc-r1",
            "direction": "forward"
          },
          {
            "packetId": "ttl-exceeded",
            "edgeId": "pc-r1",
            "direction": "reverse",
            "delayMs": 800
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc",
            "router1"
          ],
          "edgeIds": [
            "pc-r1"
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "icmp-blocked",
        "title": "When ping fails — firewalls & ICMP blocking",
        "explanation": "Ping failure doesn't always mean a host is down. Many firewalls block ICMP:\n\n- `Request timeout` — packet sent, no reply (possibly firewall dropping ICMP)\n- `Destination host unreachable` — local network has no route\n- `Network unreachable` — routing table has no path\n\nSome hosts (like Windows with default firewall) don't respond to ping by default. A service could be running perfectly while ping fails.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "server"
          ]
        },
        "durationMs": 6000
      }
    ]
  },

  "switch-vlans": {
    "slug": "switch-vlans",
    "title": "Switches & VLANs",
    "description": "How switches learn MAC addresses, and how VLANs segment a network into isolated broadcast domains.",
    "difficulty": "simple",
    "icon": "🔀",
    "prerequisites": [
      "broadcast-domain"
    ],
    "nodes": [
      {
        "id": "pc-10a",
        "type": "pc",
        "label": "PC A",
        "sublabel": "VLAN 10 (Sales)\n192.168.10.1",
        "x": 80,
        "y": 130
      },
      {
        "id": "pc-10b",
        "type": "pc",
        "label": "PC B",
        "sublabel": "VLAN 10 (Sales)\n192.168.10.2",
        "x": 80,
        "y": 280
      },
      {
        "id": "switch",
        "type": "switch",
        "label": "Managed Switch",
        "sublabel": "MAC table + VLANs",
        "x": 380,
        "y": 250
      },
      {
        "id": "pc-20a",
        "type": "pc",
        "label": "PC C",
        "sublabel": "VLAN 20 (Finance)\n192.168.20.1",
        "x": 660,
        "y": 130
      },
      {
        "id": "pc-20b",
        "type": "pc",
        "label": "PC D",
        "sublabel": "VLAN 20 (Finance)\n192.168.20.2",
        "x": 660,
        "y": 370
      },
      {
        "id": "router",
        "type": "router",
        "label": "Router",
        "sublabel": "Inter-VLAN routing",
        "x": 380,
        "y": 430
      }
    ],
    "edges": [
      {
        "id": "a-sw",
        "from": "pc-10a",
        "to": "switch",
        "bidirectional": true,
        "label": "Access port: VLAN 10"
      },
      {
        "id": "b-sw",
        "from": "pc-10b",
        "to": "switch",
        "bidirectional": true
      },
      {
        "id": "sw-c",
        "from": "switch",
        "to": "pc-20a",
        "bidirectional": true,
        "label": "Access port: VLAN 20"
      },
      {
        "id": "sw-d",
        "from": "switch",
        "to": "pc-20b",
        "bidirectional": true
      },
      {
        "id": "sw-router",
        "from": "switch",
        "to": "router",
        "bidirectional": true,
        "label": "Trunk port (all VLANs)"
      }
    ],
    "packets": [
      {
        "id": "unknown-frame",
        "label": "First frame",
        "protocol": "TCP",
        "color": "#94a3b8",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Src MAC": "AA:11:22:33:44:55 (PC A — new!)",
              "Dst MAC": "BB:11:22:33:44:55 (PC B)",
              "Switch action": "Learn Src MAC → port 1. Flood Dst MAC (unknown)."
            }
          }
        ]
      },
      {
        "id": "known-frame",
        "label": "Known MAC frame",
        "protocol": "TCP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet",
            "headers": {
              "Src MAC": "AA:11:22:33:44:55 (PC A)",
              "Dst MAC": "BB:11:22:33:44:55 (PC B — known!)",
              "Switch action": "Forward only to port 2. No flooding."
            }
          }
        ]
      },
      {
        "id": "vlan-tagged",
        "label": "802.1Q Frame",
        "protocol": "TCP",
        "color": "#D97706",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "protocol": "Ethernet 802.1Q",
            "headers": {
              "802.1Q Tag": "4 bytes inserted after Src MAC",
              "TPID": "0x8100 (identifies VLAN tag)",
              "PCP": "3 bits — priority (QoS)",
              "VLAN ID": "10 or 20 (12 bits → 4094 possible VLANs)",
              "Purpose": "Trunk links carry multiple VLANs; tag identifies which one"
            }
          }
        ]
      },
      {
        "id": "inter-vlan",
        "label": "Inter-VLAN",
        "protocol": "HTTP",
        "color": "#0284C7",
        "osiLayers": [
          {
            "layer": "Data Link",
            "layerNumber": 2,
            "active": true,
            "description": "Different VLAN — must go through router"
          },
          {
            "layer": "Network",
            "layerNumber": 3,
            "active": true,
            "protocol": "IPv4",
            "headers": {
              "Src IP": "192.168.10.1 (VLAN 10)",
              "Dst IP": "192.168.20.1 (VLAN 20)",
              "Route": "PC A → Switch → Router → Switch → PC C"
            }
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "switch-basics",
        "title": "How a switch works",
        "explanation": "A **switch** connects devices on a LAN and forwards frames based on MAC addresses — more efficiently than an old hub (which flooded everything everywhere).\n\nA switch maintains a **MAC address table** (CAM table) mapping MAC → port number. Initially empty — it learns by watching traffic.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "pc-10a",
            "pc-10b",
            "switch"
          ]
        },
        "durationMs": 5000
      },
      {
        "id": "learning",
        "title": "MAC learning — first frame floods",
        "explanation": "PC A sends a frame to PC B. The switch has never seen either MAC before:\n\n1. **Learns** PC A's MAC → port 1 (source learning)\n2. Looks up PC B's MAC → **not found**\n3. **Floods** the frame out ALL other ports (except port 1)\n\nPC B receives it. PC C and PC D also receive it — they just silently discard it (wrong destination MAC).",
        "packetAnimations": [
          {
            "packetId": "unknown-frame",
            "edgeId": "a-sw",
            "direction": "forward"
          },
          {
            "packetId": "unknown-frame",
            "edgeId": "b-sw",
            "direction": "forward",
            "delayMs": 500
          },
          {
            "packetId": "unknown-frame",
            "edgeId": "sw-c",
            "direction": "forward",
            "delayMs": 500
          },
          {
            "packetId": "unknown-frame",
            "edgeId": "sw-d",
            "direction": "forward",
            "delayMs": 500
          }
        ],
        "highlights": {
          "nodeIds": [
            "switch",
            "pc-10a"
          ],
          "edgeIds": [
            "a-sw",
            "b-sw",
            "sw-c",
            "sw-d"
          ]
        },
        "inspectPacketId": "unknown-frame",
        "durationMs": 4500
      },
      {
        "id": "forwarding",
        "title": "MAC known — direct forward",
        "explanation": "PC B replies to PC A. The switch:\n1. Learns PC B's MAC → port 2\n2. Looks up PC A's MAC → **found on port 1**\n3. Forwards **only to port 1** — PC C and PC D never see this frame\n\nNow both MACs are known. Future frames between A and B are direct — no flooding.",
        "packetAnimations": [
          {
            "packetId": "known-frame",
            "edgeId": "a-sw",
            "direction": "forward"
          },
          {
            "packetId": "known-frame",
            "edgeId": "b-sw",
            "direction": "forward",
            "delayMs": 500
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc-10a",
            "pc-10b"
          ],
          "edgeIds": [
            "a-sw",
            "b-sw"
          ]
        },
        "inspectPacketId": "known-frame",
        "durationMs": 4000
      },
      {
        "id": "vlan-problem",
        "title": "VLANs — the problem they solve",
        "explanation": "Without VLANs, all devices share one broadcast domain. Sales and Finance departments receive each other's ARP broadcasts, DHCP traffic, and potentially sniff each other's traffic.\n\n**VLANs** (Virtual LANs) logically segment a single physical switch into multiple isolated networks. VLAN 10 (Sales) and VLAN 20 (Finance) can't directly communicate — even on the same switch.",
        "packetAnimations": [],
        "highlights": {
          "nodeIds": [
            "pc-10a",
            "pc-10b",
            "switch",
            "pc-20a",
            "pc-20b"
          ]
        },
        "durationMs": 6000
      },
      {
        "id": "access-ports",
        "title": "Access ports — single VLAN",
        "explanation": "**Access ports** connect end devices. The switch assigns each port to exactly one VLAN.\n\nPC A and PC B are on ports assigned to VLAN 10. PC C and PC D are on VLAN 20 ports.\n\nA broadcast from PC A floods only to VLAN 10 ports — PC C and PC D never see it. The VLANs are completely isolated at Layer 2.",
        "packetAnimations": [
          {
            "packetId": "unknown-frame",
            "edgeId": "a-sw",
            "direction": "forward"
          },
          {
            "packetId": "unknown-frame",
            "edgeId": "b-sw",
            "direction": "forward",
            "delayMs": 500
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc-10a",
            "pc-10b"
          ],
          "edgeIds": [
            "a-sw",
            "b-sw"
          ]
        },
        "durationMs": 4500
      },
      {
        "id": "trunk-802q",
        "title": "Trunk ports & 802.1Q tags",
        "explanation": "**Trunk ports** carry multiple VLANs. The router connects via a trunk port.\n\n**802.1Q tagging** adds 4 bytes to each frame identifying its VLAN ID. The receiving side (router or another switch) reads the tag and knows which VLAN this frame belongs to.\n\nClick the packet to see the tag structure.",
        "packetAnimations": [
          {
            "packetId": "vlan-tagged",
            "edgeId": "sw-router",
            "direction": "forward"
          }
        ],
        "highlights": {
          "nodeIds": [
            "switch",
            "router"
          ],
          "edgeIds": [
            "sw-router"
          ],
          "osiLayerNumbers": [
            2
          ]
        },
        "inspectPacketId": "vlan-tagged",
        "durationMs": 4000
      },
      {
        "id": "inter-vlan-routing",
        "title": "Inter-VLAN routing — through the router",
        "explanation": "PC A (VLAN 10) wants to reach PC C (VLAN 20). VLANs are isolated at Layer 2, so they must go through a **router** (Layer 3):\n\n1. PC A → Switch (VLAN 10 port) → Router (trunk)\n2. Router routes IP packet from `192.168.10.x` to `192.168.20.x`\n3. Router → Switch (trunk) → PC C (VLAN 20 port)\n\nThis is **Router-on-a-Stick** — one physical link, multiple sub-interfaces.",
        "packetAnimations": [
          {
            "packetId": "inter-vlan",
            "edgeId": "a-sw",
            "direction": "forward"
          },
          {
            "packetId": "inter-vlan",
            "edgeId": "sw-router",
            "direction": "forward",
            "delayMs": 600
          },
          {
            "packetId": "inter-vlan",
            "edgeId": "sw-router",
            "direction": "reverse",
            "delayMs": 1200
          },
          {
            "packetId": "inter-vlan",
            "edgeId": "sw-c",
            "direction": "forward",
            "delayMs": 1800
          }
        ],
        "highlights": {
          "nodeIds": [
            "pc-10a",
            "router",
            "pc-20a"
          ],
          "edgeIds": [
            "a-sw",
            "sw-router",
            "sw-c"
          ]
        },
        "durationMs": 5000
      }
    ]
  }
};

export const HOMEPAGE_LESSONS = {
  beginner: [
    {
      slug: 'physical-signals',
      title: 'Physical Layer: Signals',
      description: 'How bits become electrical signals, light pulses, or radio waves — and travel from one device to another.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '⚡',
      isRoute: true,
      href: '/simulator/physical-signals',
      thumbType: 'signals',
      prereq: null
    },
    {
      slug: 'network-address-types',
      title: 'IP Address Types & Ranges',
      description: 'Public vs private, loopback, link-local, multicast, and broadcast addresses — what each range means and when packets using them can cross a router.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '🗺️',
      isRoute: true,
      href: '/simulator/network-address-types',
      thumbType: 'ip-types',
      prereq: 'ip-address'
    },
    {
      slug: 'ethernet-frames',
      title: 'Ethernet Frames',
      description: 'The structure of a Layer 2 Ethernet frame — preamble, MAC addresses, EtherType, payload, and FCS.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '🖼️',
      isRoute: true,
      href: '/simulator/ethernet-frames',
      thumbType: 'ethernet',
      prereq: 'physical-signals'
    },
    {
      slug: 'mac-addresses',
      title: 'MAC Addresses & ARP',
      description: 'What MAC addresses are, how ARP discovers them, and what happens when two devices want to talk.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '🏷️',
      isRoute: true,
      href: '/simulator/mac-addresses',
      thumbType: 'mac',
      prereq: 'ethernet-frames'
    },
    {
      slug: 'broadcast-domain',
      title: 'Broadcast, Multicast & Unicast',
      description: 'The three ways to address network traffic: one-to-one, one-to-group, and one-to-all.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '📢',
      isRoute: true,
      href: '/simulator/broadcast-domain',
      thumbType: 'broadcast',
      prereq: 'mac-addresses'
    },
    {
      slug: 'wifi-basics',
      title: 'How WiFi Works',
      description: '802.11 association, channels, WPA2 authentication, and why WiFi is slower than wired.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '📶',
      isRoute: true,
      href: '/simulator/wifi-basics',
      thumbType: 'wifi',
      prereq: 'broadcast-domain'
    },
    {
      slug: 'dhcp',
      title: 'DHCP — Getting an IP Address',
      description: 'The DORA process: how your device automatically gets an IP, subnet mask, gateway, and DNS server.',
      level: 'Beginner',
      badgeColor: 'sky',
      icon: '🪪',
      isRoute: true,
      href: '/simulator/dhcp',
      thumbType: 'dhcp',
      prereq: 'broadcast-domain'
    }
  ],
  simple: [
    {
      slug: 'http-request',
      title: 'How a Web Request Works',
      description: 'What happens when you type a URL and press Enter — from your browser to the server and back.',
      level: 'Simple',
      badgeColor: 'emerald',
      icon: '🌐',
      isRoute: true,
      href: '/simulator/http-request',
      thumbType: 'http'
    },
    {
      slug: 'dns-resolution',
      title: 'DNS Resolution',
      description: 'How a domain name like "example.com" gets translated into an IP address before connecting.',
      level: 'Simple',
      badgeColor: 'emerald',
      icon: '📖',
      isRoute: true,
      href: '/simulator/dns-resolution',
      thumbType: 'dns',
      prereq: 'http-request'
    },
    {
      slug: 'ping-icmp',
      title: 'Ping & ICMP',
      description: 'How ICMP works, what ping measures, TTL hop counting, and how traceroute maps a network path.',
      level: 'Simple',
      badgeColor: 'emerald',
      icon: '🏓',
      isRoute: true,
      href: '/simulator/ping-icmp',
      thumbType: 'ping',
      prereq: 'ip-address'
    },
    {
      slug: 'switch-vlans',
      title: 'Switches & VLANs',
      description: 'How switches learn MAC addresses, and how VLANs segment a network into isolated broadcast domains.',
      level: 'Simple',
      badgeColor: 'emerald',
      icon: '🔀',
      isRoute: true,
      href: '/simulator/switch-vlans',
      thumbType: 'vlan',
      prereq: 'broadcast-domain'
    }
  ]
};
