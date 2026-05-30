import type { Project } from '~/types'

const palette = [
  'from-emerald-500/30 to-teal-500/10',
  'from-sky-500/30 to-indigo-500/10',
  'from-amber-500/30 to-rose-500/10',
  'from-fuchsia-500/30 to-purple-500/10',
  'from-orange-500/30 to-red-500/10',
  'from-cyan-500/30 to-blue-500/10',
  'from-lime-500/30 to-emerald-500/10',
  'from-violet-500/30 to-fuchsia-500/10'
]

const pick = <T>(arr: T[], i: number): T => arr[i % arr.length]!

const seed: Omit<Project, 'id' | 'coverColor' | 'currency' | 'postedAt' | 'deadline' | 'bidsCount'>[] = [
  {
    title: 'Lakeside Modern Villa Construction',
    description: 'Build a 4,200 sq ft contemporary villa with infinity pool, smart home wiring, and a 3-car garage on a sloped lakeside lot.',
    category: 'Residential',
    status: 'open',
    budget: 1_250_000,
    location: 'Austin, TX',
    client: 'Harlow Estate Group'
  },
  {
    title: 'Downtown Mixed-Use Tower — Phase II',
    description: '18-story mixed-use tower with retail podium, residential floors, and rooftop amenities. Phase II covers structural and MEP.',
    category: 'Commercial',
    status: 'in-review',
    budget: 47_500_000,
    location: 'Chicago, IL',
    client: 'Meridian Capital Partners'
  },
  {
    title: 'Westbrook Warehouse Retrofit',
    description: 'Convert 60,000 sq ft warehouse into a climate-controlled fulfillment center with new dock doors and conveyor mezzanines.',
    category: 'Industrial',
    status: 'open',
    budget: 3_800_000,
    location: 'Memphis, TN',
    client: 'Northbound Logistics'
  },
  {
    title: 'I-95 Overpass Rehabilitation',
    description: 'Bridge deck replacement, expansion joint upgrades, and structural steel repair on a 4-lane interstate overpass.',
    category: 'Infrastructure',
    status: 'open',
    budget: 9_200_000,
    location: 'Richmond, VA',
    client: 'VDOT — District 5'
  },
  {
    title: 'Heritage Brownstone Restoration',
    description: 'Historically accurate restoration of a 19th-century brownstone façade and interior millwork.',
    category: 'Renovation',
    status: 'awarded',
    budget: 680_000,
    location: 'Brooklyn, NY',
    client: 'Park Slope Preservation Trust'
  },
  {
    title: 'Maple Grove Community Park',
    description: 'New 12-acre community park including playground, splash pad, walking trails, and native landscaping.',
    category: 'Landscaping',
    status: 'open',
    budget: 1_950_000,
    location: 'Madison, WI',
    client: 'City of Madison Parks Dept.'
  },
  {
    title: 'Glasshouse HQ Interior Fit-Out',
    description: 'Premium interior fit-out for a 4-floor tech HQ including custom millwork, glass partitions, and acoustic ceilings.',
    category: 'Interior',
    status: 'in-progress',
    budget: 2_400_000,
    location: 'San Francisco, CA',
    client: 'Glasshouse Inc.'
  },
  {
    title: 'Coastal Resort Standing-Seam Re-Roof',
    description: 'Tear-off and replacement of 42,000 sq ft standing-seam metal roof with hurricane-rated fasteners.',
    category: 'Roofing',
    status: 'open',
    budget: 1_120_000,
    location: 'Naples, FL',
    client: 'Seabright Resorts'
  },
  {
    title: 'Riverside Townhomes — Block C',
    description: '24-unit luxury townhome development with shared courtyard, EV-ready parking, and rooftop terraces.',
    category: 'Residential',
    status: 'open',
    budget: 8_750_000,
    location: 'Portland, OR',
    client: 'Cascade Living Co.'
  },
  {
    title: 'Northgate Medical Office Building',
    description: '4-story medical office building with imaging suite, ambulatory surgery, and 220-stall structured parking.',
    category: 'Commercial',
    status: 'in-review',
    budget: 14_300_000,
    location: 'Seattle, WA',
    client: 'Northgate Health System'
  },
  {
    title: 'Cold Storage Facility Expansion',
    description: 'Add 35,000 sq ft of -10°F cold storage including racking, refrigeration plant, and dock levelers.',
    category: 'Industrial',
    status: 'open',
    budget: 6_400_000,
    location: 'Kansas City, MO',
    client: 'Polar Logistics'
  },
  {
    title: 'Riverbend Trail Pedestrian Bridge',
    description: '380-ft pedestrian truss bridge with cast-in-place abutments and LED handrail lighting.',
    category: 'Infrastructure',
    status: 'open',
    budget: 2_750_000,
    location: 'Boise, ID',
    client: 'Ada County Highway District'
  },
  {
    title: 'Hillcrest Elementary School Renovation',
    description: 'Comprehensive K-5 renovation including new HVAC, classrooms, library, and ADA accessibility upgrades.',
    category: 'Renovation',
    status: 'open',
    budget: 4_650_000,
    location: 'Denver, CO',
    client: 'Denver Public Schools'
  },
  {
    title: 'Civic Center Plaza Greening',
    description: 'Convert 1.8 acres of plaza into a green civic space with stormwater bioswales and shade canopy trees.',
    category: 'Landscaping',
    status: 'in-review',
    budget: 1_180_000,
    location: 'Minneapolis, MN',
    client: 'City of Minneapolis'
  },
  {
    title: 'Boutique Hotel Lobby Redesign',
    description: 'Designer lobby refresh including stone feature wall, custom reception desk, and integrated lighting controls.',
    category: 'Interior',
    status: 'open',
    budget: 540_000,
    location: 'Charleston, SC',
    client: 'Lanterna Hospitality'
  },
  {
    title: 'High-Rise TPO Roof Replacement',
    description: 'Replace 28,000 sq ft of mechanically attached TPO over occupied office space with night-shift logistics.',
    category: 'Roofing',
    status: 'in-progress',
    budget: 920_000,
    location: 'Dallas, TX',
    client: 'Triton Properties'
  },
  {
    title: 'Eastside Custom Home — Modern Farmhouse',
    description: 'Custom 3,600 sq ft modern farmhouse with shou-sugi-ban siding, ADU, and detached workshop.',
    category: 'Residential',
    status: 'open',
    budget: 1_640_000,
    location: 'Nashville, TN',
    client: 'Whitfield Family'
  },
  {
    title: 'Logan Square Retail Center',
    description: 'Ground-up 38,000 sq ft retail center with eight tenant spaces and shared outdoor dining patio.',
    category: 'Commercial',
    status: 'open',
    budget: 11_900_000,
    location: 'Phoenix, AZ',
    client: 'Saguaro Developments'
  },
  {
    title: 'Aerospace Component Cleanroom',
    description: 'ISO Class 7 cleanroom build-out including HEPA filtration, epoxy floors, and gowning vestibules.',
    category: 'Industrial',
    status: 'awarded',
    budget: 5_200_000,
    location: 'Huntsville, AL',
    client: 'Skybound Aerospace'
  },
  {
    title: 'Port Authority Container Yard Paving',
    description: 'Heavy-duty concrete paving and drainage for 12-acre container yard with reefer outlets.',
    category: 'Infrastructure',
    status: 'open',
    budget: 7_800_000,
    location: 'Long Beach, CA',
    client: 'Port of Long Beach'
  },
  {
    title: '1920s Theatre Restoration',
    description: 'Restoration of historic 1,400-seat theatre including ornate plasterwork, new MEP, and modern stage rigging.',
    category: 'Renovation',
    status: 'in-review',
    budget: 8_900_000,
    location: 'Detroit, MI',
    client: 'Motor City Cultural Trust'
  },
  {
    title: 'Resort Pool Deck Hardscape',
    description: 'New travertine pool deck, cabana foundations, and integrated planters for a destination resort.',
    category: 'Landscaping',
    status: 'open',
    budget: 760_000,
    location: 'Scottsdale, AZ',
    client: 'Mirage Resort Group'
  },
  {
    title: 'Law Firm Office Build-Out',
    description: 'Class A office build-out for a 90-attorney law firm with private offices, conference suites, and library.',
    category: 'Interior',
    status: 'open',
    budget: 3_150_000,
    location: 'Washington, DC',
    client: 'Holloway & Pierce LLP'
  },
  {
    title: 'Distribution Center Membrane Roof',
    description: 'New 180,000 sq ft single-ply membrane roof with tapered insulation and structural skylights.',
    category: 'Roofing',
    status: 'open',
    budget: 2_800_000,
    location: 'Columbus, OH',
    client: 'Midwest Distribution Inc.'
  },
  {
    title: 'Bayfront Condominium — Foundation',
    description: 'Mat foundation and below-grade parking for a 22-story bayfront condominium tower.',
    category: 'Residential',
    status: 'in-progress',
    budget: 18_600_000,
    location: 'Miami, FL',
    client: 'Azure Bay Holdings'
  },
  {
    title: 'Innovation Campus — Building 3',
    description: 'Two-story 85,000 sq ft R&D building with wet labs, write-up zones, and rooftop mechanical yard.',
    category: 'Commercial',
    status: 'open',
    budget: 24_400_000,
    location: 'Raleigh, NC',
    client: 'Triangle Innovation Partners'
  }
]

function daysFromNow(days: number): string {
  const d = new Date('2026-05-30T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString()
}

export const mockProjects: Project[] = seed.map((p, i) => ({
  ...p,
  id: `prj_${String(i + 1).padStart(3, '0')}`,
  currency: 'USD',
  coverColor: pick(palette, i),
  postedAt: daysFromNow(-Math.floor((i % 12) * 2 + 1)),
  deadline: daysFromNow(14 + (i % 10) * 3),
  bidsCount: 3 + ((i * 7) % 21)
}))
