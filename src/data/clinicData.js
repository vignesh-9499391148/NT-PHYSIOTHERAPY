// NT PHYSIOTHERAPY CLINIC - Comprehensive Clinic Data & Content
// Dedicated Physician: Dr. Yuvanraj DN, BPT (Chief Physiotherapist)

export const CLINIC_INFO = {
  name: "NT PHYSIOTHERAPY CLINIC",
  shortName: "NT Physiotherapy",
  logo: "/logo.png",
  tagline: "Restoring Movement, Relieving Pain, Rebuilding Life",
  phone: "+91 9943031349",
  emergencyPhone: "+91 9943031349",
  email: "yuvanraj472001@gmail.com",
  appointmentEmail: "yuvanraj472001@gmail.com",
  address: "Vadamadurai, Dindigul, Tamil Nadu - 624802",
  mapUrl: "https://maps.app.goo.gl/DSeQmiCiZ3vSg5kx8",
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "", // Loaded securely from .env file
  hours: {
    weekdays: "Mon - Sat: 8:00 AM - 10:00 PM",
    saturday: "Saturday: 8:00 AM - 7:00 PM",
    sunday: "Sunday: Closed (Emergency on call)"
  },
  socials: {
    instagram: "https://www.instagram.com/n_t_physiotherapy?rpxt=MW1ha2V5YjEwY3Vwaw==",
    instagramHandle: "@n_t_physiotherapy",
    linkedin: "https://linkedin.com"
  },
  developer: {
    name: "VIGNESH",
    linkedin: "https://www.linkedin.com/in/vignesh-k-35a704285?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  homeVisit: {
    available: true,
    title: "Home Visit Also Available",
    badge: "Home Visit Available",
    coverage: "Vadamadurai, Dindigul & Surrounding Localities",
    description: "Doctor-led physical therapy provided directly at your home for elderly care, post-surgery rehabilitation, stroke recovery, and patients with severe mobility difficulties."
  },
  stats: [
    { number: "3+", label: "Years Dedicated Practice" },
    { number: "500+", label: "Rehabilitated Patients" },
    { number: "1-on-1", label: "Doctor-Led Care" }
  ]
};

export const SERVICES = [
  {
    id: "home-visit-physiotherapy",
    title: "Home Visit Physiotherapy",
    category: "Home Care",
    icon: "Home",
    image: "/home-visit-physiotherapy.png",
    imagePosition: "center 30%",
    description: "Doctor-led home visits for elderly patients, stroke recovery, post-surgery rehab, and severe mobility limitations in Vadamadurai & Dindigul.",
    fullDetails: "When traveling to the clinic is difficult, Dr. Yuvanraj DN brings professional physical therapy directly to your doorstep. Equipped with portable recovery modalities, customized bed-to-standing gait retraining, and compassionate 1-on-1 care.",

    rate: "Contact for Home Booking"
  },
  {
    id: "manual-therapy",
    title: "Manual Therapy",
    category: "Physical Therapy",
    icon: "HandHeart",
    image: "/manual-therapy.png",
    imagePosition: "center 35%",
    description: "Hands-on joint mobilization and soft tissue release administered directly by Dr. Yuvanraj DN, BPT.",
    fullDetails: "Evidence-based joint mobilization and myofascial release techniques designed to alleviate joint restrictions, reduce chronic inflammation, and restore natural movement patterns without invasive treatments.",


  },
  {
    id: "physiotherapy",
    title: "Physiotherapy Rehabilitation",
    category: "Physical Therapy",
    icon: "Activity",
    image: "/physiotherapy-rehab.png",
    imagePosition: "center 30%",
    description: "Individualized biomechanical re-education and progressive strength conditioning for lasting recovery.",
    fullDetails: "A comprehensive movement analysis leads into guided active therapies targeting core stability, kinetic balance, and progressive strength recovery tailored to your body's functional needs.",


  },
  {
    id: "sports-injuries",
    title: "Sports Injury Recovery",
    category: "Sports Rehab",
    icon: "Trophy",
    image: "/sports-injury-recovery.jpg",
    imagePosition: "center 35%",
    description: "Athletic performance rehabilitation for sprains, hamstring strains, rotator cuff tension, and ligament recovery.",
    fullDetails: "Tailored athletic recovery programs combining dynamic functional training, plyometric progressions, and injury prevention conditioning to safely return you to sport.",

  },
  {
    id: "regular-therapy",
    title: "Preventative Mobility Care",
    category: "Physical Therapy",
    icon: "Calendar",
    image: "/preventative-mobility-care.png",
    imagePosition: "center 22%",
    description: "Routine wellness adjustments, flexibility conditioning, and joint preservation to prevent recurring pain.",
    fullDetails: "Maintain your optimal mobility with preventative maintenance sessions designed to identify early tightness and posture imbalances before they turn into severe pain.",

  },
  {
    id: "back-pain-relief",
    title: "Back & Neck Pain Relief",
    category: "Pain Management",
    icon: "ShieldAlert",
    image: "/back-neck-pain-relief.png",
    imagePosition: "center 42%",
    description: "Specialized lumbar decompression and cervical mobility protocols to eliminate chronic disc pain and stiff neck.",
    fullDetails: "Focused spinal decompression, deep core strengthening, and cervical mobility exercises formulated specifically for individuals dealing with disc herniation, sciatica, and chronic neck tightness.",

  }
];

export const FEATURES = [
  {
    id: 1,
    title: "Board-Certified Physiotherapist",
    description: "Dr. Yuvanraj DN, BPT holds specialized clinical qualifications in physical therapy and orthopaedic care.",
    icon: "Award"
  },
  {
    id: 2,
    title: "100% Doctor-Led Care",
    description: "Every appointment, evaluation, and hands-on session is conducted directly by Dr. Yuvanraj DN.",
    icon: "UserCheck"
  },
  {
    id: 3,
    title: "Personalized Therapy Goals",
    description: "Customized recovery milestones designed for your unique daily lifestyle, occupation, or sports routine.",
    icon: "Target"
  },
  {
    id: 4,
    title: "Evidence-Based Protocols",
    description: "Modern kinetic techniques combining hands-on joint mobilization and active corrective exercise.",
    icon: "Network"
  },
  {
    id: 5,
    title: "Comfortable Modern Facility",
    description: "Sanitized private therapy suites equipped with modern physical rehabilitation equipment.",
    icon: "Smile"
  },
  {
    id: 6,
    title: "Dedicated Clinical Attention",
    description: "Zero rush, zero double-booking, and undivided doctor focus during your entire treatment session.",
    icon: "HeartPulse"
  },
  {
    id: 7,
    title: "Modern Modalities",
    description: "Therapeutic stimulation, electro-modalities, and kinetic gait evaluation tools.",
    icon: "Zap"
  },
  {
    id: 8,
    title: "Zero Wait Time Policy",
    description: "Punctual appointment slots respecting your personal time, with morning and evening availability.",
    icon: "Clock"
  }
];

// Single Dedicated Physician
export const TEAM_MEMBERS = [
  {
    id: "dr-yuvanraj-dn",
    name: "Dr. Yuvanraj DN, BPT",
    title: "Chief Physiotherapist & Clinic Director",
    education: "Bachelor of Physiotherapy (BPT)",
    experience: "3+ Years Dedicated Clinical Practice",
    image: "/dr-yuvanraj.jpg",
    bio: "Dr. Yuvanraj DN, BPT personally oversees and conducts all patient evaluations, specialized manual therapy, spine alignment, kinetic rehabilitation, and recovery treatments at NT Physiotherapy Clinic. Dedicated to non-invasive, evidence-based pain relief and functional restoration.",
    socials: {
      instagram: "https://www.instagram.com/n_t_physiotherapy?rpxt=MW1ha2V5YjEwY3Vwaw==",
      instagramHandle: "@n_t_physiotherapy",
      linkedin: "https://linkedin.com"
    }
  }
];

export const TESTIMONIALS = [];

export const BLOG_POSTS = [
  {
    id: "5-exercises-desk-posture",
    title: "5 Simple Stretches to Reverse Desk Posture and Prevent Neck Strain",
    date: "October 18, 2026",
    category: "Ergonomics",
    comments: 4,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=85",
    snippet: "Long hours sitting at a desk cause forward head carriage and thoracic stiffness. Discover five daily stretches to decompress your spine.",
    content: "Sitting for prolonged periods forces your cervical spine into continuous forward flexion, adding excess pressure on neck vertebrae. In this article, Dr. Yuvanraj DN, BPT breaks down the chin tuck, doorway pectoral stretch, and thoracic extension routines to restore neutral posture."
  },
  {
    id: "benefits-early-sports-rehab",
    title: "Why Early Physical Therapy Drastically Shortens Sports Injury Downtime",
    date: "October 12, 2026",
    category: "Sports Health",
    comments: 6,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=85",
    snippet: "Waiting for an injury to 'heal on its own' creates scar tissue adhesions and muscle weakness. Learn the power of active recovery.",
    content: "Modern physical therapy demonstrates that controlled early mobilization significantly outpaces complete immobilization. Gentle joint nutrition, light isometric activation, and lymphatic drainage reduce swelling and prevent neuromuscular atrophy in the critical first two weeks."
  },
  {
    id: "preventing-chronic-back-pain",
    title: "The Ultimate Guide to Long-Term Spinal Health and Disc Preservation",
    date: "October 05, 2026",
    category: "Spine Wellness",
    comments: 8,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85",
    snippet: "Understand the biomechanics of spinal discs, the importance of deep core activation, and how to lift safely.",
    content: "Lower back pain affects nearly 80% of adults at some point. True recovery requires more than masking symptoms with medication; it demands addressing hip mobility deficits and activating the deep stabilizing musculature that protects spinal discs."
  }
];
