import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const gmaps = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q + " Boracay Philippines");

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const DAYS = [
  { day: 1, title: "Anniversary Arrival", location: "Station 1, White Beach", date: "Wed Nov 18", dow: "Wednesday", color: "#e11d48",
    activities: [
      { time: "10:15 AM", emoji: "✈️", title: "Fly Manila → Caticlan (5J 897)", desc: "Cebu Pacific direct flight from NAIA T3. Land at Caticlan (MPH) by 11:30am, then 15-min boat ride to Boracay. Booking ref: NPT72R.", tip: "Mish has 20kg checked bag. JP is carry-on only — pack light or add baggage via Manage Booking.", cost: "₱8,817 RT", mq: "Godofredo P. Ramos Airport Caticlan" },
      { time: "12:30 PM", emoji: "🏨", title: "Check in to Resort", desc: "Beachfront at Station 1. Pool, direct beach access, balcony with ocean views. Drop bags, change into beach mode.", tip: "Request a seaview room for the best experience.", mq: "White Beach Station 1 Boracay" },
      { time: "2:00 PM", emoji: "🏖️", title: "White Beach Station 1", desc: "The quietest, most pristine stretch. Powder sand, shallow turquoise water. Claim a cabana, order a mango shake, and just exist.", mq: "White Beach Station 1" },
      { time: "5:00 PM", emoji: "⛵", title: "Anniversary Sunset Paraw Sailing", desc: "Traditional double-outrigger sailboat ride along White Beach at golden hour. Watch the sun melt into the ocean from the water.", tip: "Book a private paraw for no crowds. Ask to go during the last hour before sunset.", cost: "₱1,500", mq: "White Beach Paraw Sailing" },
      { time: "7:30 PM", emoji: "💍", title: "Anniversary Dinner at Rima, Shangri-La", desc: "Fine dining degustation — lamb, baked snapper, pumpkin tortellini. Ocean views, impeccable service. This is THE dinner.", tip: "Reserve ahead and mention it's your anniversary. Window seats have the best views.", cost: "₱5,000", mq: "Rima Restaurant Shangri-La Boracay" },
    ]
  },
  { day: 2, title: "Adventure Day", location: "Around the Island", date: "Thu Nov 19", dow: "Thursday", color: "#f59e0b",
    activities: [
      { time: "7:00 AM", emoji: "🥞", title: "Brunch at Sunny Side Cafe", desc: "Boracay's best breakfast spot, Station 1 beachfront. Ube-stuffed French toast, piri-piri pulled pork eggs benny, shakshuka with feta.", tip: "Go early — this place gets packed by 9am.", cost: "₱1,200", mq: "Sunny Side Cafe Boracay" },
      { time: "9:00 AM", emoji: "🏝️", title: "Island Hopping Tour (Private)", desc: "Private boat to Crocodile Island (best snorkeling), Crystal Cove (hidden caves + lagoons), and Magic Island. Includes snorkel gear and fresh seafood lunch grilled on the boat.", tip: "Private tour means your own pace, no rush. Ask to stop at Puka Beach on the way back.", cost: "₱4,000", mq: "Crystal Cove Island Boracay" },
      { time: "2:00 PM", emoji: "🛶", title: "Crystal Kayak Session", desc: "Transparent kayak over the reef — you see fish and coral directly below you. Surreal. Great for photos and a chill cooldown.", tip: "Available along White Beach. ~30 min session is enough. Very stable, no seasickness.", cost: "₱800", mq: "Crystal Kayak Boracay" },
      { time: "3:30 PM", emoji: "💆", title: "Beachfront Massage", desc: "Wind down after the adventure with a 1-hour couples massage right on the sand. The sound of the waves plus skilled hands — pure reset.", tip: "Station 1 beachfront masseuses are licensed post-rehabilitation. ~₱400-600/hr is standard.", cost: "₱1,200", mq: "White Beach Station 1 Massage" },
      { time: "7:00 PM", emoji: "🥩", title: "Wolfgang's Steakhouse", desc: "The legendary NYC steakhouse, now in Boracay. Dry-aged USDA Prime porterhouse for two, ocean-view open-air dining at Belmont Newcoast.", tip: "The porterhouse for two is the move. Dress up a bit — it's that kind of place.", cost: "₱6,000", mq: "Wolfgang's Steakhouse Boracay Newcoast" },
    ]
  },
  { day: 3, title: "Beaches, Food & Nightlife", location: "Stations 1–3", date: "Fri Nov 20", dow: "Friday", color: "#10b981",
    activities: [
      { time: "8:00 AM", emoji: "☕", title: "Real Coffee & Tea Cafe", desc: "Boracay legend since 1996. Nipa hut vibes, Station 2 beachfront. Famous calamansi muffins — buy extra boxes as pasalubong.", tip: "Cash only. No wifi. Just coffee, muffins, and the ocean.", cost: "₱400", mq: "Real Coffee and Tea Cafe Boracay" },
      { time: "10:00 AM", emoji: "🏖️", title: "Puka Beach Morning", desc: "North end of the island, completely different energy from White Beach. Shell-covered sand, rougher waves, almost no vendors.", tip: "Tricycle from Station 1 is ~₱150. Go before noon when it's quieter.", cost: "₱300", mq: "Puka Shell Beach Boracay" },
      { time: "12:30 PM", emoji: "🦀", title: "Seafood Lunch at Nalka", desc: "Station 1 beachfront. Always packed because the seafood is FRESH. Kare-kare rice bowls, grilled prawns, sinigang.", tip: "Try the seafood platter to share — it's the star of the menu.", cost: "₱2,500", mq: "Nalka Restaurant Boracay" },
      { time: "3:00 PM", emoji: "🏖️", title: "Pool & Beach Time", desc: "Afternoon at your resort — pool, beach cabana, or just the room balcony. Mid-trip recharge.", mq: "White Beach Station 1" },
      { time: "5:00 PM", emoji: "🍕", title: "Sunset at Crust (The Lind)", desc: "Beachfront restaurant. Wood-fired pizza, craft cocktails, and a front-row seat to the Boracay sunset.", tip: "The margherita pizza here is legitimately great.", cost: "₱1,500", mq: "Crust Restaurant The Lind Boracay" },
      { time: "8:00 PM", emoji: "🎉", title: "Salsa Fusion, D'Mall & Epic", desc: "Dinner at Salsa Fusion for creative Mexican-Filipino tapas, then walk through D'Mall for shopping and Coco Mama coconut ice cream.", tip: "D'Mall is an outdoor mall — perfect for evening strolling. Epic gets going after 11pm.", cost: "₱3,500", mq: "D'Mall Boracay" },
    ]
  },
  { day: 4, title: "Recovery & Spa Day", location: "Station 1 & Station 3", date: "Sat Nov 21", dow: "Saturday", color: "#8b5cf6",
    activities: [
      { time: "8:30 AM", emoji: "🥐", title: "Slow Breakfast at Forno Osteria", desc: "Discovery Shores' Italian restaurant. Handmade pastries, eggs any style, excellent espresso. No rush — today is your recovery day.", tip: "Open to walk-ins even if you're not staying at Discovery.", cost: "₱1,500", mq: "Forno Osteria Discovery Shores Boracay" },
      { time: "10:30 AM", emoji: "🧖‍♀️", title: "Couples Spa Treatment", desc: "Signature massage blends Hawaiian Lomi Lomi forearm strokes with Thai stretching. Couples treatment room with ocean views.", tip: "Book on Klook for 15% off.", cost: "₱4,000", mq: "White Beach Station 1 Spa Boracay" },
      { time: "1:00 PM", emoji: "🍽️", title: "Lunch at Crust or In-Room", desc: "Keep it easy — eat at a nearby restaurant or order room service. Today is about zero effort.", cost: "₱1,500", mq: "Crust Restaurant The Lind Boracay" },
      { time: "3:00 PM", emoji: "🏊", title: "Pool & Cabana Time", desc: "Claim a cabana by the pool. Cold drinks, a book, nap in the shade.", tip: "Pool is less crowded in the afternoon.", mq: "White Beach Station 1" },
      { time: "4:30 PM", emoji: "🌿", title: "Optional: Mandala Spa Upgrade", desc: "If you want the ultimate spa experience — Mandala Spa in Station 3 is a hidden jungle sanctuary. Koi ponds, private treatment villas, traditional Hilot massage.", tip: "Book the Terra for Two package: salt scrub + 90-min full body + foot massage with rose petal bath.", cost: "₱3,500–7K", mq: "Mandala Spa and Resort Villas Boracay" },
      { time: "6:00 PM", emoji: "🍹", title: "Golden Hour Cocktails", desc: "Walk down to White Beach for your last Boracay sunset cocktail. Find a beach bar, sink your feet in the sand.", tip: "Station 1 beachfront bars have the best sunset angle — face west.", cost: "₱800", mq: "White Beach Station 1" },
      { time: "7:30 PM", emoji: "🔥", title: "Farewell Dinner at Cyma", desc: "Greek restaurant in D'Mall. The flaming saganaki cheese show is a must-do at least once. Great lamb, seafood, and group platters.", tip: "The lamb chops and grilled octopus are excellent.", cost: "₱3,000", mq: "Cyma Restaurant D'Mall Boracay" },
    ]
  },
  { day: 5, title: "Last Morning & Fly Home", location: "Station 1 → Caticlan → Manila", date: "Sun Nov 22", dow: "Sunday", color: "#0ea5e9",
    activities: [
      { time: "6:30 AM", emoji: "🌅", title: "Sunrise Walk on White Beach", desc: "Set the alarm one last time. The east-facing parts of the beach catch a soft golden glow at sunrise. Almost nobody's out.", tip: "Station 1 heading north is the quietest stretch.", mq: "White Beach Station 1" },
      { time: "8:00 AM", emoji: "☕", title: "Last Coffee at Real Coffee", desc: "One more round of calamansi muffins and drip coffee. Buy your final pasalubong boxes here.", tip: "Grab 3-4 boxes of muffins as pasalubong.", cost: "₱800", mq: "Real Coffee and Tea Cafe Boracay" },
      { time: "10:00 AM", emoji: "🛍️", title: "Pasalubong Run at D'Mall", desc: "Coco Mama coconut products, local pili nuts, dried mango from Budget Mart.", tip: "Budget Mart in D'Mall has the best prices.", cost: "₱1,000", mq: "D'Mall Boracay" },
      { time: "11:30 AM", emoji: "🚤", title: "Check Out & Boat to Caticlan", desc: "Check out, boat to Caticlan jetty port. Your flight is at 4:25pm so you have plenty of buffer.", tip: "Caticlan airport is tiny — arrive 1.5hrs before.", mq: "Caticlan Jetty Port" },
      { time: "4:25 PM", emoji: "✈️", title: "Fly Home — 5J 906 MPH to MNL", desc: "Cebu Pacific flight back to Manila T3, landing by 5:50pm. Home by evening with a tan, a full camera roll, and an anniversary trip you'll never forget. Booking ref: NPT72R.", tip: "Online check-in opens 48hrs before. Window seat on the right side for one last aerial view.", mq: "Godofredo P. Ramos Airport Caticlan" },
    ]
  },
];

const ACCOM = [
  { name: "Sea Wind Boracay", station: "Station 1", rate: "~₱4,000–5,800/night", total4: "~₱16K–23K", stars: "3.5★", style: "Rustic nipa hut charm", hl: ["Private beachfront","Widest beach in Stn 1","Pool","Eco-friendly","Free breakfast"], vibe: "Old-school Boracay charm. Rustic but romantic. Station 1's quietest, widest beachfront.", pick: true, ph: "+63 36 288 3091", web: "https://seawindboracay.ph/", mq: "Sea Wind Resort Boracay" },
  { name: "Two Seasons Boracay", station: "Station 1", rate: "~₱6,900/night (Std)", total4: "~₱28K", stars: "4★", style: "Zen minimalist boutique", hl: ["Beachfront","34 rooms (intimate)","BarLO restaurant","Spa & pool","Free breakfast"], vibe: "Boutique luxury. Intimate, stylish, zen. BarLO's oyster sisig and 4-cheese pizza are legendary. Slightly over ₱6K budget.", pick: true, ph: "+63 36 288 4384", web: "https://twoseasonsresorts.com/boracay/", mq: "Two Seasons Boracay Resort" },
  { name: "Henann Prime Beach Resort", station: "Station 1", rate: "~₱5,500–6,500/night", total4: "~₱22K–26K", stars: "5★", style: "Modern coastal resort", hl: ["Beachfront (Beach Wing)","2 pools","Pool-access rooms","Sea Salt restaurant","154 rooms"], vibe: "Modern, polished, full-service resort. The pool-access rooms are Henann's signature.", pick: true, ph: "+63 36 288 9200", web: "https://www.henann.com/henannprimebeach/", mq: "Henann Prime Beach Resort Boracay" },
  { name: "Astoria Boracay", station: "Station 1", rate: "~₱4,800–5,500/night", total4: "~₱19K–22K", stars: "4★", style: "Tropical boutique", hl: ["Beachfront","71 rooms","Pool + spa","White Cafe restaurant","Honeymoon suite"], vibe: "Colorful tropical design. Great honeymoon suite option. Good value for quality.", pick: false, ph: "+63 36 288 1111", web: "https://astoriaboracay.com/", mq: "Astoria Boracay" },
  { name: "Pinnacle Resort & Villas", station: "Station 1", rate: "from ₱4,800/night", total4: "~₱19K+", stars: "4★", style: "Hilltop villas", hl: ["Infinity pool","Spacious villas","2-min to beach","Restaurant + spa","Panoramic views"], vibe: "Elevated — hilltop villas with infinity pool. Private pathway to White Beach in 2 minutes.", pick: false, ph: "+63 916 596 5866", web: "https://www.pinnacleboracay.com/", mq: "Pinnacle Resort and Villas Boracay" },
];

const BUDGET = [
  { item: "Flights — Cebu Pacific round trip for 2 (promo)", cost: "₱8,817", icon: "✈️" },
  { item: "Accommodation — 4 nights (depends on pick)", cost: "₱19K–28K", icon: "🏨" },
  { item: "Food & Drinks — all 5 days", cost: "₱26,000", icon: "🍽️" },
  { item: "Activities — island hop, paraw, kayak, massage", cost: "₱8,000", icon: "🎯" },
  { item: "Spa & Wellness — couples spa + optional Mandala", cost: "₱8,000", icon: "🧖" },
  { item: "Transport — tricycles, boats, transfers", cost: "₱3,000", icon: "🚤" },
  { item: "Shopping & Pasalubong", cost: "₱3,000", icon: "🛍️" },
];

const FOOD_LIST = [
  { dish: "Ube French Toast", where: "Sunny Side Cafe", note: "Ube-stuffed, golden crispy" },
  { dish: "Calamansi Muffins", where: "Real Coffee", note: "#1 pasalubong since 1996" },
  { dish: "Four Cheese Pizza", where: "BarLO, Two Seasons", note: "Thin crust, beachfront" },
  { dish: "Oyster Sisig", where: "BarLO, Two Seasons", note: "Crispy battered, sizzling" },
  { dish: "Seafood Platter", where: "Nalka", note: "Fresh catch, always packed" },
  { dish: "Porterhouse for Two", where: "Wolfgang's", note: "Dry-aged USDA Prime" },
  { dish: "Coconut Ice Cream", where: "Coco Mama", note: "In a coconut shell" },
  { dish: "Degustation Menu", where: "Rima, Shangri-La", note: "Fine dining experience" },
  { dish: "Flaming Saganaki", where: "Cyma, D'Mall", note: "Cheese set on fire tableside" },
];

const FLIGHTS = {
  ref: "NPT72R",
  out: { route: "Manila (MNL) → Caticlan (MPH)", flight: "5J 897", airline: "Cebu Pacific", date: "Wed Nov 18, 2026", dep: "10:15 AM", arr: "11:30 AM", dur: "~1h 15m", term: "NAIA Terminal 3" },
  ret: { route: "Caticlan (MPH) → Manila (MNL)", flight: "5J 906", airline: "Cebu Pacific", date: "Sun Nov 22, 2026", dep: "4:25 PM", arr: "5:50 PM", dur: "~1h 25m", term: "NAIA Terminal 3" },
  cost: "₱8,817 RT for 2 pax (promo!)", bag: "Mish: 20kg checked + 7kg carry-on · JP: 7kg carry-on only",
  guests: [
    { name: "Michelle Joy Alvior", bag: "20kg checked (Go Basic)", seat: "Unassigned" },
    { name: "John Paul Dionisio", bag: "Carry-on only (Go Basic)", seat: "Unassigned" },
  ],
};

const CONTACTS = [
  { label: "Cebu Pacific Hotline", phone: "+63 2 7020 0888", note: "Reservations & flight changes" },
  { label: "Boracay Tourist Center", phone: "+63 36 288 3689", note: "DENR/Tourism office" },
  { label: "Boracay PNP", phone: "+63 36 288 3033", note: "Police station" },
  { label: "Metro Doctor Medical Center", phone: "+63 36 288 6357", note: "24hr clinic, Station 2" },
  { label: "PH Red Cross Aklan", phone: "+63 36 262 8931", note: "Emergency services" },
  { label: "National Emergency", phone: "1555", note: "24/7 emergency" },
];

const INFO = [
  { label: "Best Season", value: "Nov–May (Amihan / dry season) — peak time" },
  { label: "Weather", value: "27–31°C, occasional brief showers, mostly sunny" },
  { label: "Getting Around", value: "Walking + e-tricycles (₱20–150 per ride)" },
  { label: "Currency", value: "Philippine Peso (₱). Most places take GCash & cards." },
  { label: "Apps", value: "Grab (Manila transfers), GCash (contactless payments)" },
  { label: "WiFi", value: "Free at most resorts. Buy a Smart SIM if needed." },
  { label: "Pack List", value: "Reef shoes, underwater cam, SPF50, light cover-up, smart casual (Wolfgang's/Rima)" },
  { label: "Env Fee", value: "₱75/person at Caticlan jetty (one-time)" },
];

const CHECKLIST_ITEMS = [
  "✅ CEB flights booked — 5J 897 out, 5J 906 return (ref: NPT72R)",
  "Accommodation — pick resort and book 4 nights (Nov 18–22)",
  "Rima (Shangri-La) anniversary dinner reservation — Day 1",
  "Wolfgang's Steakhouse reservation — Day 2",
  "Private island hopping tour — Day 2",
  "Couples spa treatment — Day 4",
  "Optional: Mandala Spa Terra for Two package — Day 4",
  "Real Coffee calamansi muffin pre-order (pasalubong boxes)",
  "Download Grab app + GCash for payments",
  "Pack: reef shoes, underwater camera, sunscreen SPF50",
];

/* ═══════════════════════════════════════════
   TRIP DAY AUTO-DETECT
   ═══════════════════════════════════════════ */

const TRIP_DATES = ["2026-11-18", "2026-11-19", "2026-11-20", "2026-11-21", "2026-11-22"];

function getTripDayIndex() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;
  const idx = TRIP_DATES.indexOf(todayStr);
  return idx >= 0 ? idx : 0; // default to Day 1 if not during trip
}

/* ═══════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════ */

function MapBtn({ query }) {
  return (
    <a href={gmaps(query)} target="_blank" rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors no-underline flex-shrink-0">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Map
    </a>
  );
}

function Chevron({ open, size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="text-slate-400 transition-transform duration-200 flex-shrink-0"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export default function App() {
  const [openDay, setOpenDay] = useState(getTripDayIndex);
  const [openAct, setOpenAct] = useState(null);
  const [openHotel, setOpenHotel] = useState(null);
  const [selDay, setSelDay] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleDay = (i) => { setOpenDay(prev => prev === i ? null : i); setOpenAct(null); };
  const toggleAct = (id) => setOpenAct(prev => prev === id ? null : id);
  const toggleHotel = (id) => setOpenHotel(prev => prev === id ? null : id);
  const toggleCheck = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }
        .fade-in { animation: fadeIn 0.25s ease; }
        [data-state="active"][role="tab"] { background: #0f172a !important; color: white !important; box-shadow: 0 2px 10px rgba(15,23,42,0.25); }
        [role="tab"] { font-family: 'DM Sans', sans-serif !important; font-weight: 700 !important; font-size: 12px !important; border-radius: 10px !important; padding: 8px 14px !important; }
      `}</style>

      {/* ===== HEADER ===== */}
      <div className="relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg, #1a0a1e 0%, #2d0a22 30%, #4a1942 60%, #1e3a5f 100%)", padding: "44px 20px 34px" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 25% 45%, #e11d48 1px, transparent 1px), radial-gradient(circle at 75% 25%, #f59e0b 1px, transparent 1px)", backgroundSize: "50px 50px, 35px 35px" }} />
        <div className="relative">
          <div className="text-xs font-bold tracking-[4px] text-pink-300 uppercase font-mono">JP & Mish · 1st Anniversary</div>
          <h1 className="text-4xl font-extrabold text-white mt-1.5 mb-0.5 tracking-tight">Boracay</h1>
          <div className="text-sm text-rose-300 font-semibold">5 Days · 4 Nights · Full Send 💍</div>
          <div className="text-xs font-mono mt-1" style={{ color: "rgba(249,168,212,0.5)" }}>November 18–22, 2026</div>
          <div className="flex justify-center gap-1.5 mt-3.5 flex-wrap">
            {DAYS.map((d, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${d.color}25`, color: d.color, border: `1px solid ${d.color}30` }}>
                {d.date.split(" ")[0]}
              </span>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4">
            <span className="text-sm font-extrabold text-amber-300 font-mono">~₱76K–105K for two</span>
            <span className="text-sm font-semibold text-slate-400 font-mono">~$1,300–$1,800</span>
          </div>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <Tabs defaultValue="timeline" className="w-full" onValueChange={() => { setOpenAct(null); setOpenHotel(null); setSelDay(null); }}>
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100 px-4 pt-3.5 pb-2 flex justify-center">
          <TabsList className="bg-transparent gap-1 h-auto p-0">
            <TabsTrigger value="timeline" className="bg-white text-slate-500 border-0 shadow-sm">📋 Timeline</TabsTrigger>
            <TabsTrigger value="calendar" className="bg-white text-slate-500 border-0 shadow-sm">📅 Calendar</TabsTrigger>
            <TabsTrigger value="budget" className="bg-white text-slate-500 border-0 shadow-sm">💰 Budget</TabsTrigger>
            <TabsTrigger value="details" className="bg-white text-slate-500 border-0 shadow-sm">📌 Details</TabsTrigger>
          </TabsList>
        </div>

        {/* ── TIMELINE ── */}
        <TabsContent value="timeline" className="px-3.5 pb-16 pt-4">
          <div className="max-w-[700px] mx-auto space-y-3">
            {DAYS.map((day, di) => {
              const isExpanded = openDay === di;
              return (
                <div key={di} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.06]">
                  {/* Day header — clickable accordion trigger */}
                  <div onClick={() => toggleDay(di)}
                    className="flex items-center gap-3.5 px-4 py-3.5 cursor-pointer select-none transition-colors hover:bg-slate-50/50"
                    style={{ background: `linear-gradient(135deg, ${day.color}08, ${day.color}03)`, borderBottom: isExpanded ? `2px solid ${day.color}20` : "none" }}>
                    <div className="flex-shrink-0 flex items-center justify-center text-white font-extrabold text-base font-mono"
                      style={{ width: 44, height: 44, minWidth: 44, minHeight: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${day.color}, ${day.color}cc)`, boxShadow: `0 0 0 3px ${day.color}20, 0 2px 8px ${day.color}25` }}>
                      {day.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold tracking-[1.5px] uppercase font-mono" style={{ color: day.color }}>{day.dow} · {day.date.split(" ").slice(1).join(" ")}</span>
                      </div>
                      <div className="text-[15px] font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">{day.title}</div>
                      <Badge variant="secondary" className="mt-1 text-[10px] font-bold" style={{ background: `${day.color}12`, color: day.color }}>{day.location}</Badge>
                    </div>
                    {!isExpanded && (
                      <div className="flex gap-0.5 flex-shrink-0">
                        {day.activities.slice(0, 5).map((a, i) => <span key={i} className="text-[14px]">{a.emoji}</span>)}
                      </div>
                    )}
                    <Chevron open={isExpanded} size={14} />
                  </div>

                  {/* Activities — shown when day is expanded */}
                  {isExpanded && (
                    <div className="fade-in">
                      {day.activities.map((act, ai) => {
                        const actKey = `${di}-${ai}`, actOpen = openAct === actKey;
                        return (
                          <div key={ai} onClick={() => toggleAct(actKey)}
                            className={`px-4 py-2.5 cursor-pointer transition-colors ${ai < day.activities.length - 1 ? "border-b border-slate-50" : ""} ${actOpen ? "bg-slate-50/60" : "hover:bg-slate-50/30"}`}>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[17px] flex-shrink-0">{act.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[13.5px] font-bold text-slate-900">{act.title}</span>
                                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{act.time}</span>
                                </div>
                              </div>
                              {act.cost && <span className="text-[11px] font-extrabold font-mono whitespace-nowrap flex-shrink-0" style={{ color: day.color }}>{act.cost}</span>}
                              <Chevron open={actOpen} />
                            </div>
                            {actOpen && (
                              <div className="mt-2.5 pl-[30px] fade-in">
                                <p className="text-[12.5px] text-slate-600 leading-relaxed m-0">{act.desc}</p>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  {act.tip && <p className="text-[11.5px] text-emerald-500 italic leading-snug m-0 flex-1 min-w-[150px]">💡 {act.tip}</p>}
                                  {act.mq && <MapBtn query={act.mq} />}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ── CALENDAR ── */}
        <TabsContent value="calendar" className="px-3.5 pb-16 pt-4">
          <div className="max-w-[880px] mx-auto grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {DAYS.map((day, di) => {
              const sel = selDay === di;
              return (
                <div key={di} onClick={() => setSelDay(sel ? null : di)}
                  className="rounded-xl p-3.5 cursor-pointer transition-all"
                  style={{
                    background: sel ? `linear-gradient(135deg, ${day.color}0a, #fff)` : "#fff",
                    border: sel ? `2px solid ${day.color}` : "1px solid #f0f0f0",
                    boxShadow: sel ? `0 4px 20px ${day.color}18` : "0 1px 3px rgba(0,0,0,0.04)",
                    gridColumn: sel ? "1 / -1" : undefined,
                  }}>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 flex items-center justify-center text-white font-extrabold text-[14px] font-mono"
                      style={{ width: 36, height: 36, minWidth: 36, minHeight: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${day.color}, ${day.color}bb)` }}>{day.day}</div>
                    <div>
                      <div className="text-[10px] font-extrabold tracking-[1.5px] uppercase font-mono" style={{ color: day.color }}>{day.dow} · {day.date.split(" ").slice(1).join(" ")}</div>
                      <div className="text-[13px] font-extrabold text-slate-900 leading-tight mt-0.5">{day.title}</div>
                    </div>
                  </div>
                  {!sel && <div className="flex gap-1 flex-wrap mt-2.5">{day.activities.map((a, i) => <span key={i} title={a.title} className="text-[15px]">{a.emoji}</span>)}</div>}
                  {sel && (
                    <div className="mt-3.5 grid gap-2.5 fade-in" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                      {day.activities.map((act, ai) => (
                        <div key={ai} className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[17px]">{act.emoji}</span>
                            <span className="text-[13px] font-bold text-slate-900 flex-1">{act.title}</span>
                            {act.mq && <MapBtn query={act.mq} />}
                          </div>
                          <div className="text-[10px] font-bold font-mono mb-1" style={{ color: day.color }}>{act.time}{act.cost ? ` · ${act.cost}` : ""}</div>
                          <p className="text-[11.5px] text-slate-500 leading-snug m-0">{act.desc}</p>
                          {act.tip && <p className="text-[10.5px] text-emerald-500 italic mt-1.5 m-0">💡 {act.tip}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ── BUDGET ── */}
        <TabsContent value="budget" className="px-3.5 pb-16 pt-4">
          <div className="max-w-[620px] mx-auto space-y-7">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
                <div className="text-xl font-extrabold text-white tracking-tight">Full Send Budget</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">2 people · 4 nights · Nov 18–22</div>
              </div>
              {BUDGET.map((b, i) => (
                <div key={i} className={`flex items-center gap-3 px-6 py-3 border-b border-slate-50 ${i % 2 ? "bg-slate-50/50" : "bg-white"}`}>
                  <span className="text-lg">{b.icon}</span>
                  <span className="flex-1 text-[13.5px] text-slate-700 font-medium">{b.item}</span>
                  <span className="text-[13px] font-extrabold text-sky-500 font-mono">{b.cost}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-6 py-4 text-white" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
                <div>
                  <div className="text-[15px] font-extrabold">ESTIMATED TOTAL</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Varies by accommodation</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold font-mono">₱76K–105K</div>
                  <div className="text-[11px] text-slate-400 font-mono">~$1,300–$1,800</div>
                </div>
              </div>
            </div>

            {/* Food hitlist */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}>
                <div className="text-lg font-extrabold text-amber-900">🍽 Food & Experience Hitlist</div>
                <div className="text-xs text-amber-800/60 mt-0.5">9 must-tries in Boracay</div>
              </div>
              {FOOD_LIST.map((f, i) => (
                <div key={i} className={`px-6 py-3 border-b border-amber-50 ${i % 2 ? "bg-amber-50/30" : "bg-white"}`}>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap">
                    <span className="text-[13.5px] font-bold text-slate-900">{f.dish}</span>
                    <span className="text-[11px] font-bold text-amber-500">{f.where}</span>
                  </div>
                  <div className="text-[11.5px] text-slate-400 mt-0.5">{f.note}</div>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="text-base font-extrabold text-slate-900">✅ Booking Checklist</div>
                <Badge variant="outline" className="text-[10px] font-bold">{checkedCount}/{CHECKLIST_ITEMS.length}</Badge>
              </div>
              <div className="space-y-1">
                {CHECKLIST_ITEMS.map((item, i) => (
                  <label key={i} className="flex items-start gap-2.5 py-1.5 cursor-pointer group">
                    <Checkbox checked={!!checked[i]} onCheckedChange={() => toggleCheck(i)} className="mt-0.5 flex-shrink-0" />
                    <span className={`text-[12.5px] leading-snug transition-all ${checked[i] ? "text-slate-300 line-through" : "text-slate-600 group-hover:text-slate-900"}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── DETAILS ── */}
        <TabsContent value="details" className="px-3.5 pb-16 pt-4">
          <div className="max-w-[660px] mx-auto space-y-6">

            {/* Accommodation */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-4 text-white" style={{ background: "linear-gradient(135deg, #e11d48, #f43f5e)" }}>
                <div className="text-lg font-extrabold">🏨 Accommodation Options</div>
                <div className="text-xs opacity-80 mt-0.5">Station 1 · Up to ₱6K/night · Tap to expand</div>
              </div>
              {ACCOM.map((h, hi) => {
                const isOpen = openHotel === hi;
                return (
                  <div key={hi} onClick={() => toggleHotel(hi)}
                    className={`px-6 py-3.5 border-b border-slate-100 last:border-0 cursor-pointer transition-colors ${isOpen ? "bg-rose-50/40" : hi % 2 ? "bg-slate-50/50" : "bg-white"}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-extrabold text-slate-900">{h.name}</span>
                          {h.pick && <Badge className="bg-pink-50 text-pink-700 border-pink-200 text-[9px] font-extrabold hover:bg-pink-100">❤️ Mish's pick</Badge>}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{h.station} · {h.stars} · {h.rate}</div>
                      </div>
                      <span className="text-xs font-extrabold text-rose-500 font-mono whitespace-nowrap">{h.total4}</span>
                      <Chevron open={isOpen} />
                    </div>
                    {isOpen && (
                      <div className="mt-3 fade-in" onClick={e => e.stopPropagation()}>
                        <div className="text-[11px] text-slate-500 italic mb-2">{h.style}</div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-2.5">{h.vibe}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {h.hl.map((x, xi) => (
                            <Badge key={xi} variant="secondary" className="bg-rose-50 text-rose-700 border-rose-200 text-[10px] font-semibold">{x}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`tel:${h.ph}`} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-violet-50 text-violet-600 border border-violet-200 no-underline hover:bg-violet-100">📞 {h.ph}</a>
                          <a href={h.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-sky-50 text-sky-600 border border-sky-200 no-underline hover:bg-sky-100">↗️ Website</a>
                          <MapBtn query={h.mq} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Flights */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-4 text-white" style={{ background: "linear-gradient(135deg, #0ea5e9, #38bdf8)" }}>
                <div className="text-lg font-extrabold">✈️ Flight Details</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge className="bg-white/20 text-white border-white/30 text-[10px] font-bold hover:bg-white/30">Ref: {FLIGHTS.ref}</Badge>
                  <span className="text-xs opacity-80">{FLIGHTS.cost}</span>
                </div>
              </div>
              {[FLIGHTS.out, FLIGHTS.ret].map((f, fi) => (
                <div key={fi} className={`p-4 ${fi === 0 ? "bg-sky-50/50 border-b-2 border-sky-100" : "bg-white"}`}>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className={fi === 0 ? "border-sky-300 text-sky-600" : "border-amber-300 text-amber-600"}>
                      {fi === 0 ? "OUTBOUND" : "RETURN"}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] font-bold bg-slate-100 text-slate-600">{f.flight}</Badge>
                    <span className="text-xs text-slate-400 font-mono">{f.date}</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mb-1">{f.route}</div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>🕐 {f.dep} → {f.arr}</span>
                    <span>⏱️ {f.dur}</span>
                    <span>🏢 {f.term}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{f.airline}</div>
                </div>
              ))}
              {/* Guest details */}
              <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Guests & Baggage</div>
                {FLIGHTS.guests.map((g, gi) => (
                  <div key={gi} className="flex items-center justify-between py-1.5">
                    <span className="text-[13px] font-bold text-slate-800">{g.name}</span>
                    <Badge variant="secondary" className="text-[10px] font-semibold">{g.bag}</Badge>
                  </div>
                ))}
                <div className="text-[10px] text-slate-400 mt-2 italic">Online check-in opens 48hrs before departure. Airport counters close 45min before.</div>
              </div>
            </div>

            {/* Practical Info */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-4 text-white" style={{ background: "linear-gradient(135deg, #10b981, #34d399)" }}>
                <div className="text-lg font-extrabold">📝 Practical Info</div>
              </div>
              {INFO.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 px-6 py-2.5 border-b border-slate-50 ${i % 2 ? "bg-slate-50/50" : "bg-white"}`}>
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wide font-mono min-w-[100px] flex-shrink-0 pt-0.5">{item.label}</span>
                  <span className="text-[13px] text-slate-700 font-medium leading-snug">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Contacts */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="px-6 py-4 text-white" style={{ background: "linear-gradient(135deg, #8b5cf6, #a78bfa)" }}>
                <div className="text-lg font-extrabold">📞 Important Contacts</div>
                <div className="text-xs opacity-80 mt-0.5">Save these before you fly</div>
              </div>
              {CONTACTS.map((c, i) => (
                <div key={i} className={`flex items-center gap-3 px-6 py-2.5 border-b border-slate-50 ${i % 2 ? "bg-slate-50/50" : "bg-white"}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold text-slate-900">{c.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{c.note}</div>
                  </div>
                  <a href={`tel:${c.phone}`} onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-violet-50 text-violet-600 border border-violet-200 no-underline whitespace-nowrap flex-shrink-0 hover:bg-violet-100">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
