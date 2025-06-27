type item = {
  type: string;
  title: string;
  description: string;
  location: string;
  dateLost: string;
  contact: string;
  createdByUser: string;
  isFound: boolean | null;
  isClaimed: boolean | null;
};

const sampleItems: item[] = [
  {
    type: "lost",
    title: "Brown Leather Wallet",
    description: "Lost my brown wallet with some cash and college ID inside. Brand is WildHorn.",
    location: "Cafeteria near Block C",
    dateLost: "2025-06-20",
    contact: "9876543210",
    createdByUser: "user123",
    isFound: false,
    isClaimed: null
  },
  {
    type: "found",
    title: "White AirPods",
    description: "Found a pair of AirPods in a black case near the library steps.",
    location: "Main Library Entrance",
    dateLost: "2025-06-25",
    contact: "alice@example.com",
    createdByUser: "user456",
    isFound: null,
    isClaimed: false
  },
  {
    type: "lost",
    title: "College ID Card",
    description: "Lost my college ID card. It has my name and roll number: Raj Sharma, 23124567.",
    location: "Bus Stop near Gate 2",
    dateLost: "2025-06-22",
    contact: "raj.sharma@email.com",
    createdByUser: "user789",
    isFound: false,
    isClaimed: null
  },
  {
    type: "found",
    title: "Black Fossil Watch",
    description: "Found a men's Fossil watch on the basketball court. Still working and in good condition.",
    location: "Sports Complex",
    dateLost: "2025-06-21",
    contact: "foundwatch@gmail.com",
    createdByUser: "user321",
    isFound: null,
    isClaimed: false
  },
  {
    type: "lost",
    title: "Grey Lenovo Laptop Bag",
    description: "Lost my grey Lenovo laptop bag with a charger and a notebook inside. Bag has a scratch near the zip.",
    location: "Parking Lot near Block A",
    dateLost: "2025-06-18",
    contact: "7008123456",
    createdByUser: "user112",
    isFound: false,
    isClaimed: null
  },
  {
    type: "found",
    title: "SanDisk 32GB Pendrive",
    description: "Found a pendrive labeled 'Project Files' in the computer lab. Might belong to someone from CS branch.",
    location: "Computer Lab 2",
    dateLost: "2025-06-26",
    contact: "john.doe@example.com",
    createdByUser: "user556",
    isFound: null,
    isClaimed: true
  }
];


export default sampleItems