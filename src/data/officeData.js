// // src/data/officeData.js
// // ComplaintForm:  import { officeTopAuthority, categoryHeads, departmentHeads, departmentsData } from "../data/officeData";
// // Registration:   import { departmentsData, officeRoles } from "../data/officeData";
// // Users:          import { departmentsData, officeRoles } from "../data/officeData";

// export const officeTopAuthority = {
//   "Guardian Minister Office": "Guardian Minister",
//   "Collector Office":         "Collector",
//   "Zilla Parishad Office":    "CEO",
//   "Mahanagarpalika Office":   "Municipal Commissioner",
//   "Nagar Palika Office":      "Chief Officer",
//   "Grampanchayat Office":     "Sarpanch",
// };

// // categoryHeads → tagTo मध्ये auto-include साठी (middle level)
// export const categoryHeads = {
//   "Guardian Minister Office": {},
//   "Collector Office": {
//     "Administrative":             "Deputy Collector",
//     "Health & Social Welfare":    "Deputy Collector",
//     "Rural & Development":        "Deputy Collector",
//     "Infrastructure & Utilities": "Deputy Collector",
//     "Supply & Control":           "Deputy Collector",
//     "Governance & Law":           "Deputy Collector",
//     "Education":                  "Deputy Collector",
//     "Finance & Audit":            "Deputy Collector",
//   },
//   "Zilla Parishad Office": {
//     "Rural Development":             "Deputy CEO",
//     "Education":                     "Deputy CEO",
//     "Health":                        "Deputy CEO",
//     "Agriculture & Allied Services": "Deputy CEO",
//     "Water & Sanitation":            "Deputy CEO",
//     "Social Welfare":                "Deputy CEO",
//     "Engineering & Works":           "Deputy CEO",
//     "Finance & Accounts":            "Deputy CEO",
//     "Planning & Statistics":         "Deputy CEO",
//     "Supply & Food":                 "Deputy CEO",
//   },
//   "Mahanagarpalika Office": {
//     "Revenue & Tax":      "Additional Commissioner",
//     "Health & Sanitation":"Additional Commissioner",
//     "Water & Sewerage":   "Additional Commissioner",
//     "Engineering & Works":"Additional Commissioner",
//     "Administration":     "Additional Commissioner",
//     "Accounts & Finance": "Additional Commissioner",
//   },
//   "Nagar Palika Office": {
//     "Revenue & Tax":      "Deputy Chief Officer",
//     "Health & Sanitation":"Deputy Chief Officer",
//     "Water & Sewerage":   "Deputy Chief Officer",
//     "Engineering & Works":"Deputy Chief Officer",
//     "Administration":     "Deputy Chief Officer",
//     "Accounts & Finance": "Deputy Chief Officer",
//   },
//   "Grampanchayat Office": {
//     "Administration":      "Gram Sevak",
//     "Water & Sanitation":  "Gram Sevak",
//     "Village Development": "Gram Sevak",
//     "Health & Welfare":    "Gram Sevak",
//     "Agriculture & Allied":"Gram Sevak",
//     "Finance & Accounts":  "Gram Sevak",
//   },
// };

// // officeRoles → Registration / Users dropdown
// export const officeRoles = {
//   "Guardian Minister Office": ["Guardian Minister", "Secretary"],
//   "Collector Office":         ["Collector", "Deputy Collector"],
//   "Zilla Parishad Office":    ["CEO", "Deputy CEO"],
//   "Mahanagarpalika Office":   ["Municipal Commissioner", "Additional Commissioner"],
//   "Nagar Palika Office":      ["Chief Officer", "Deputy Chief Officer"],
//   "Grampanchayat Office":     ["Sarpanch", "Gram Sevak"],
// };

// // departmentHeads → ComplaintForm tagTo checkbox (dept level)
// // Values = officeRoles values शी EXACT match
// export const departmentHeads = {
//   "Guardian Minister Office": {},

//   "Collector Office": {
//     "General Administration Branch":      "Deputy Collector",
//     "Revenue Department":                 "Deputy Collector",
//     "Land Acquisition Department":        "Deputy Collector",
//     "Treasury Department":                "Deputy Collector",
//     "District Planning Committee":        "Deputy Collector",
//     "Legal Cell":                         "Deputy Collector",
//     "RTI Cell":                           "Deputy Collector",
//     "IT Cell":                            "Deputy Collector",
//     "Establishment Section":              "Deputy Collector",
//     "District Health Department":         "Deputy Collector",
//     "Public Health Department":           "Deputy Collector",
//     "Women & Child Development":          "Deputy Collector",
//     "Social Welfare Department":          "Deputy Collector",
//     "Minority Welfare Department":        "Deputy Collector",
//     "Disability Welfare Cell":            "Deputy Collector",
//     "Rural Development Department":       "Deputy Collector",
//     "Agriculture Department":             "Deputy Collector",
//     "Animal Husbandry Department":        "Deputy Collector",
//     "Fisheries Department":               "Deputy Collector",
//     "Cooperation Department":             "Deputy Collector",
//     "Water Supply Department":            "Deputy Collector",
//     "Public Works Department (PWD)":      "Deputy Collector",
//     "Irrigation Department":              "Deputy Collector",
//     "Electricity Board Coordination":     "Deputy Collector",
//     "Town Planning Department":           "Deputy Collector",
//     "District Supply Office":             "Deputy Collector",
//     "Food & Civil Supplies":              "Deputy Collector",
//     "Consumer Protection Cell":           "Deputy Collector",
//     "District Election Office":           "Deputy Collector",
//     "Home Department Coordination":       "Deputy Collector",
//     "Disaster Management Cell":           "Deputy Collector",
//     "Police Administration Coordination": "Deputy Collector",
//     "Primary Education Department":       "Deputy Collector",
//     "Secondary Education Department":     "Deputy Collector",
//     "Higher Education Cell":              "Deputy Collector",
//     "Finance & Accounts Department":      "Deputy Collector",
//     "Audit Department":                   "Deputy Collector",
//   },

//   "Zilla Parishad Office": {
//     "Rural Development Department":             "Deputy CEO",
//     "Village Development Department":           "Deputy CEO",
//     "Panchayat Samiti Coordination":            "Deputy CEO",
//     "MGNREGA Cell":                             "Deputy CEO",
//     "Self Help Group (SHG) Coordination":       "Deputy CEO",
//     "District Rural Livelihood Mission (DRLM)": "Deputy CEO",
//     "Primary Education Department":             "Deputy CEO",
//     "Secondary Education Section":              "Deputy CEO",
//     "School Administration":                    "Deputy CEO",
//     "Mid-Day Meal Section":                     "Deputy CEO",
//     "Sarva Shiksha Abhiyan Cell":               "Deputy CEO",
//     "Adult Education Cell":                     "Deputy CEO",
//     "Public Health Department":                 "Deputy CEO",
//     "Primary Health Centres (PHC)":             "Deputy CEO",
//     "Rural Hospital Administration":            "Deputy CEO",
//     "Immunization Program Section":             "Deputy CEO",
//     "Maternal & Child Health Cell":             "Deputy CEO",
//     "Disease Control Program Cell":             "Deputy CEO",
//     "Agriculture Department":                   "Deputy CEO",
//     "Horticulture Section":                     "Deputy CEO",
//     "Animal Husbandry Department":              "Deputy CEO",
//     "Dairy Development":                        "Deputy CEO",
//     "Fisheries Department":                     "Deputy CEO",
//     "Veterinary Services":                      "Deputy CEO",
//     "Water Supply Department":                  "Deputy CEO",
//     "Rural Water Supply Scheme":                "Deputy CEO",
//     "Sanitation Department":                    "Deputy CEO",
//     "Swachh Bharat Mission (Rural)":            "Deputy CEO",
//     "Drainage & Wastewater Management":         "Deputy CEO",
//     "Backward Class Welfare":                   "Deputy CEO",
//     "Minority Welfare":                         "Deputy CEO",
//     "Women & Child Welfare":                    "Deputy CEO",
//     "Disability Welfare Section":               "Deputy CEO",
//     "Senior Citizen Welfare":                   "Deputy CEO",
//     "ZP Engineering Department":                "Deputy CEO",
//     "Road Construction Section":                "Deputy CEO",
//     "Building Maintenance Section":             "Deputy CEO",
//     "Rural Infrastructure Development":         "Deputy CEO",
//     "Electrical Maintenance":                   "Deputy CEO",
//     "Finance Department":                       "Deputy CEO",
//     "Accounts Section":                         "Deputy CEO",
//     "Audit Section":                            "Deputy CEO",
//     "Budget Planning Cell":                     "Deputy CEO",
//     "Grant Management Section":                 "Deputy CEO",
//     "District Planning Cell":                   "Deputy CEO",
//     "Statistical Department":                   "Deputy CEO",
//     "Monitoring & Evaluation Cell":             "Deputy CEO",
//     "Public Distribution System (PDS)":         "Deputy CEO",
//     "Food & Civil Supplies Coordination":       "Deputy CEO",
//   },

//   "Mahanagarpalika Office": {
//     "Property Tax Department":      "Additional Commissioner",
//     "Assessment Department":        "Additional Commissioner",
//     "Recovery Section":             "Additional Commissioner",
//     "Trade License Department":     "Additional Commissioner",
//     "Advertisement Tax Section":    "Additional Commissioner",
//     "Public Health Department":     "Additional Commissioner",
//     "Solid Waste Management":       "Additional Commissioner",
//     "Sanitation Department":        "Additional Commissioner",
//     "Hospital Administration":      "Additional Commissioner",
//     "Birth & Death Registration":   "Additional Commissioner",
//     "Water Supply Department":      "Additional Commissioner",
//     "Water Billing Section":        "Additional Commissioner",
//     "Sewerage Department":          "Additional Commissioner",
//     "Drainage Maintenance":         "Additional Commissioner",
//     "Town Planning Department":     "Additional Commissioner",
//     "Building Permission Section":  "Additional Commissioner",
//     "Road Construction Department": "Additional Commissioner",
//     "Electrical Department":        "Additional Commissioner",
//     "Garden Department":            "Additional Commissioner",
//     "General Administration":       "Additional Commissioner",
//     "Establishment Section":        "Additional Commissioner",
//     "Legal Cell":                   "Additional Commissioner",
//     "IT Department":                "Additional Commissioner",
//     "RTI Cell":                     "Additional Commissioner",
//     "Finance Department":           "Additional Commissioner",
//     "Accounts Section":             "Additional Commissioner",
//     "Audit Section":                "Additional Commissioner",
//     "Budget Planning":              "Additional Commissioner",
//   },

//   "Nagar Palika Office": {
//     "Revenue Section":             "Deputy Chief Officer",
//     "Property Tax Department":     "Deputy Chief Officer",
//     "Assessment Section":          "Deputy Chief Officer",
//     "Recovery Section":            "Deputy Chief Officer",
//     "Trade License Section":       "Deputy Chief Officer",
//     "Health Department":           "Deputy Chief Officer",
//     "Sanitation Department":       "Deputy Chief Officer",
//     "Solid Waste Management":      "Deputy Chief Officer",
//     "Birth & Death Registration":  "Deputy Chief Officer",
//     "Public Health Inspection":    "Deputy Chief Officer",
//     "Water Supply Section":        "Deputy Chief Officer",
//     "Water Billing Section":       "Deputy Chief Officer",
//     "Sewerage Department":         "Deputy Chief Officer",
//     "Drainage Maintenance":        "Deputy Chief Officer",
//     "Engineering Department":      "Deputy Chief Officer",
//     "Road Construction Section":   "Deputy Chief Officer",
//     "Building Permission Section": "Deputy Chief Officer",
//     "Electrical Section":          "Deputy Chief Officer",
//     "Street Light Maintenance":    "Deputy Chief Officer",
//     "General Administration":      "Deputy Chief Officer",
//     "Establishment Section":       "Deputy Chief Officer",
//     "Legal Cell":                  "Deputy Chief Officer",
//     "IT Section":                  "Deputy Chief Officer",
//     "RTI Cell":                    "Deputy Chief Officer",
//     "Accounts Section":            "Deputy Chief Officer",
//     "Finance Department":          "Deputy Chief Officer",
//     "Audit Section":               "Deputy Chief Officer",
//     "Budget Planning":             "Deputy Chief Officer",
//   },

//   "Grampanchayat Office": {
//     "Gram Panchayat Administration":   "Gram Sevak",
//     "Gram Sevak Office":               "Gram Sevak",
//     "Village Records Section":         "Gram Sevak",
//     "Birth & Death Registration":      "Gram Sevak",
//     "RTI & Public Grievance Cell":     "Gram Sevak",
//     "Water Supply & Sanitation":       "Gram Sevak",
//     "Hand Pump Maintenance":           "Gram Sevak",
//     "Village Drainage System":         "Gram Sevak",
//     "Swachh Bharat Mission (Rural)":   "Gram Sevak",
//     "Solid & Liquid Waste Management": "Gram Sevak",
//     "Village Development Plans":       "Gram Sevak",
//     "Rural Housing Scheme":            "Gram Sevak",
//     "MGNREGA Works":                   "Gram Sevak",
//     "Self Help Group Coordination":    "Gram Sevak",
//     "Infrastructure Development":      "Gram Sevak",
//     "Village Health Committee":        "Gram Sevak",
//     "Anganwadi Coordination":          "Gram Sevak",
//     "Maternal & Child Welfare":        "Gram Sevak",
//     "Public Health Awareness":         "Gram Sevak",
//     "Agriculture Support":             "Gram Sevak",
//     "Animal Husbandry":                "Gram Sevak",
//     "Dairy Development":               "Gram Sevak",
//     "Fisheries Assistance":            "Gram Sevak",
//     "Panchayat Accounts Section":      "Gram Sevak",
//     "Grant Management":                "Gram Sevak",
//     "Audit Records":                   "Gram Sevak",
//     "Tax & Fee Collection":            "Gram Sevak",
//   },
// };

// // departmentsData → Office → Category → Sub-departments
// export const departmentsData = {
//   "Guardian Minister Office": {},

//   "Collector Office": {
//     "Administrative": [
//       "General Administration Branch","Revenue Department","Land Acquisition Department",
//       "Treasury Department","District Planning Committee","Legal Cell",
//       "RTI Cell","IT Cell","Establishment Section",
//     ],
//     "Health & Social Welfare": [
//       "District Health Department","Public Health Department","Women & Child Development",
//       "Social Welfare Department","Minority Welfare Department","Disability Welfare Cell",
//     ],
//     "Rural & Development": [
//       "Rural Development Department","Agriculture Department","Animal Husbandry Department",
//       "Fisheries Department","Cooperation Department",
//     ],
//     "Infrastructure & Utilities": [
//       "Water Supply Department","Public Works Department (PWD)","Irrigation Department",
//       "Electricity Board Coordination","Town Planning Department",
//     ],
//     "Supply & Control": [
//       "District Supply Office","Food & Civil Supplies","Consumer Protection Cell",
//     ],
//     "Governance & Law": [
//       "District Election Office","Home Department Coordination",
//       "Disaster Management Cell","Police Administration Coordination",
//     ],
//     "Education": [
//       "Primary Education Department","Secondary Education Department","Higher Education Cell",
//     ],
//     "Finance & Audit": [
//       "Finance & Accounts Department","Audit Department",
//     ],
//   },

//   "Zilla Parishad Office": {
//     "Rural Development": [
//       "Rural Development Department","Village Development Department",
//       "Panchayat Samiti Coordination","MGNREGA Cell",
//       "Self Help Group (SHG) Coordination","District Rural Livelihood Mission (DRLM)",
//     ],
//     "Education": [
//       "Primary Education Department","Secondary Education Section",
//       "School Administration","Mid-Day Meal Section",
//       "Sarva Shiksha Abhiyan Cell","Adult Education Cell",
//     ],
//     "Health": [
//       "Public Health Department","Primary Health Centres (PHC)",
//       "Rural Hospital Administration","Immunization Program Section",
//       "Maternal & Child Health Cell","Disease Control Program Cell",
//     ],
//     "Agriculture & Allied Services": [
//       "Agriculture Department","Horticulture Section","Animal Husbandry Department",
//       "Dairy Development","Fisheries Department","Veterinary Services",
//     ],
//     "Water & Sanitation": [
//       "Water Supply Department","Rural Water Supply Scheme","Sanitation Department",
//       "Swachh Bharat Mission (Rural)","Drainage & Wastewater Management",
//     ],
//     "Social Welfare": [
//       "Backward Class Welfare","Minority Welfare","Women & Child Welfare",
//       "Disability Welfare Section","Senior Citizen Welfare",
//     ],
//     "Engineering & Works": [
//       "ZP Engineering Department","Road Construction Section","Building Maintenance Section",
//       "Rural Infrastructure Development","Electrical Maintenance",
//     ],
//     "Finance & Accounts": [
//       "Finance Department","Accounts Section","Audit Section",
//       "Budget Planning Cell","Grant Management Section",
//     ],
//     "Planning & Statistics": [
//       "District Planning Cell","Statistical Department","Monitoring & Evaluation Cell",
//     ],
//     "Supply & Food": [
//       "Public Distribution System (PDS)","Food & Civil Supplies Coordination",
//     ],
//   },

//   "Mahanagarpalika Office": {
//     "Revenue & Tax": [
//       "Property Tax Department","Assessment Department","Recovery Section",
//       "Trade License Department","Advertisement Tax Section",
//     ],
//     "Health & Sanitation": [
//       "Public Health Department","Solid Waste Management","Sanitation Department",
//       "Hospital Administration","Birth & Death Registration",
//     ],
//     "Water & Sewerage": [
//       "Water Supply Department","Water Billing Section","Sewerage Department","Drainage Maintenance",
//     ],
//     "Engineering & Works": [
//       "Town Planning Department","Building Permission Section","Road Construction Department",
//       "Electrical Department","Garden Department",
//     ],
//     "Administration": [
//       "General Administration","Establishment Section","Legal Cell","IT Department","RTI Cell",
//     ],
//     "Accounts & Finance": [
//       "Finance Department","Accounts Section","Audit Section","Budget Planning",
//     ],
//   },

//   "Nagar Palika Office": {
//     "Revenue & Tax": [
//       "Revenue Section","Property Tax Department","Assessment Section",
//       "Recovery Section","Trade License Section",
//     ],
//     "Health & Sanitation": [
//       "Health Department","Sanitation Department","Solid Waste Management",
//       "Birth & Death Registration","Public Health Inspection",
//     ],
//     "Water & Sewerage": [
//       "Water Supply Section","Water Billing Section","Sewerage Department","Drainage Maintenance",
//     ],
//     "Engineering & Works": [
//       "Engineering Department","Road Construction Section","Building Permission Section",
//       "Electrical Section","Street Light Maintenance",
//     ],
//     "Administration": [
//       "General Administration","Establishment Section","Legal Cell","IT Section","RTI Cell",
//     ],
//     "Accounts & Finance": [
//       "Accounts Section","Finance Department","Audit Section","Budget Planning",
//     ],
//   },

//   "Grampanchayat Office": {
//     "Administration": [
//       "Gram Panchayat Administration","Gram Sevak Office","Village Records Section",
//       "Birth & Death Registration","RTI & Public Grievance Cell",
//     ],
//     "Water & Sanitation": [
//       "Water Supply & Sanitation","Hand Pump Maintenance","Village Drainage System",
//       "Swachh Bharat Mission (Rural)","Solid & Liquid Waste Management",
//     ],
//     "Village Development": [
//       "Village Development Plans","Rural Housing Scheme","MGNREGA Works",
//       "Self Help Group Coordination","Infrastructure Development",
//     ],
//     "Health & Welfare": [
//       "Village Health Committee","Anganwadi Coordination",
//       "Maternal & Child Welfare","Public Health Awareness",
//     ],
//     "Agriculture & Allied": [
//       "Agriculture Support","Animal Husbandry","Dairy Development","Fisheries Assistance",
//     ],
//     "Finance & Accounts": [
//       "Panchayat Accounts Section","Grant Management","Audit Records","Tax & Fee Collection",
//     ],
//   },
// };


// ==============================

// src/data/officeData.js
// ComplaintForm:  import { officeTopAuthority, categoryHeads, departmentHeads, departmentsData } from "../data/officeData";
// Registration:   import { departmentsData, officeRoles } from "../data/officeData";
// Users:          import { departmentsData, officeRoles } from "../data/officeData";

export const officeTopAuthority = {
  "Guardian Minister Office": "Guardian Minister",
  "Collector Office":         "Collector",
  "Zilla Parishad Office":    "CEO",
  "Mahanagarpalika Office":   "Municipal Commissioner",
  "Nagar Palika Office":      "Chief Officer",
  "Grampanchayat Office":     "Sarpanch",
};

// categoryHeads → tagTo मध्ये auto-include साठी (middle level)
export const categoryHeads = {
  "Guardian Minister Office": {},
  "Collector Office": {
    "Administrative":             "Deputy Collector",
    "Health & Social Welfare":    "Deputy Collector",
    "Rural & Development":        "Deputy Collector",
    "Infrastructure & Utilities": "Deputy Collector",
    "Supply & Control":           "Deputy Collector",
    "Governance & Law":           "Deputy Collector",
    "Education":                  "Deputy Collector",
    "Finance & Audit":            "Deputy Collector",
  },
  "Zilla Parishad Office": {
    "Rural Development":             "Deputy CEO",
    "Education":                     "Deputy CEO",
    "Health":                        "Deputy CEO",
    "Agriculture & Allied Services": "Deputy CEO",
    "Water & Sanitation":            "Deputy CEO",
    "Social Welfare":                "Deputy CEO",
    "Engineering & Works":           "Deputy CEO",
    "Finance & Accounts":            "Deputy CEO",
    "Planning & Statistics":         "Deputy CEO",
    "Supply & Food":                 "Deputy CEO",
  },
  "Mahanagarpalika Office": {
    "Revenue & Tax":      "Additional Commissioner",
    "Health & Sanitation":"Additional Commissioner",
    "Water & Sewerage":   "Additional Commissioner",
    "Engineering & Works":"Additional Commissioner",
    "Administration":     "Additional Commissioner",
    "Accounts & Finance": "Additional Commissioner",
  },
  "Nagar Palika Office": {
    "Revenue & Tax":      "Deputy Chief Officer",
    "Health & Sanitation":"Deputy Chief Officer",
    "Water & Sewerage":   "Deputy Chief Officer",
    "Engineering & Works":"Deputy Chief Officer",
    "Administration":     "Deputy Chief Officer",
    "Accounts & Finance": "Deputy Chief Officer",
  },
  "Grampanchayat Office": {
    "Administration":      "Gram Sevak",
    "Water & Sanitation":  "Gram Sevak",
    "Village Development": "Gram Sevak",
    "Health & Welfare":    "Gram Sevak",
    "Agriculture & Allied":"Gram Sevak",
    "Finance & Accounts":  "Gram Sevak",
  },
};

// officeRoles → Registration / Users dropdown
export const officeRoles = {
  "Guardian Minister Office": ["Guardian Minister", "Secretary"],
  "Collector Office":         ["Collector", "Deputy Collector"],
  "Zilla Parishad Office":    ["CEO", "Deputy CEO"],
  "Mahanagarpalika Office":   ["Municipal Commissioner", "Additional Commissioner"],
  "Nagar Palika Office":      ["Chief Officer", "Deputy Chief Officer"],
  "Grampanchayat Office":     ["Sarpanch", "Gram Sevak"],
};

// departmentsData → Office → Categories list (no sub-departments)
export const departmentsData = {
  "Guardian Minister Office": [],

  "Collector Office": [
    "Administrative",
    "Health & Social Welfare",
    "Rural & Development",
    "Infrastructure & Utilities",
    "Supply & Control",
    "Governance & Law",
    "Education",
    "Finance & Audit",
  ],

  "Zilla Parishad Office": [
    "Rural Development",
    "Education",
    "Health",
    "Agriculture & Allied Services",
    "Water & Sanitation",
    "Social Welfare",
    "Engineering & Works",
    "Finance & Accounts",
    "Planning & Statistics",
    "Supply & Food",
  ],

  "Mahanagarpalika Office": [
    "Revenue & Tax",
    "Health & Sanitation",
    "Water & Sewerage",
    "Engineering & Works",
    "Administration",
    "Accounts & Finance",
  ],

  "Nagar Palika Office": [
    "Revenue & Tax",
    "Health & Sanitation",
    "Water & Sewerage",
    "Engineering & Works",
    "Administration",
    "Accounts & Finance",
  ],

  "Grampanchayat Office": [
    "Administration",
    "Water & Sanitation",
    "Village Development",
    "Health & Welfare",
    "Agriculture & Allied",
    "Finance & Accounts",
  ],
};