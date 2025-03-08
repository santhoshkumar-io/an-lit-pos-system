interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    dateAdded: Date;
  }
  
  const PRODUCTS: Product[] = [
    {
      id: 1,
      name: "Screwdriver",
      category: "Tools",
      price: 10.5,
      quantity: 150,
      dateAdded: new Date("2023-01-01"),
    },
    {
      id: 2,
      name: "Hammer",
      category: "Tools",
      price: 12.75,
      quantity: 120,
      dateAdded: new Date("2023-02-15"),
    },
    {
      id: 3,
      name: "Wrench",
      category: "Tools",
      price: 15.0,
      quantity: 200,
      dateAdded: new Date("2023-03-10"),
    },
    {
      id: 4,
      name: "Drill",
      category: "Power Tools",
      price: 55.0,
      quantity: 80,
      dateAdded: new Date("2023-05-25"),
    },
    {
      id: 5,
      name: "Nail Gun",
      category: "Power Tools",
      price: 90.0,
      quantity: 50,
      dateAdded: new Date("2023-06-30"),
    },
    {
      id: 6,
      name: "Saw",
      category: "Tools",
      price: 20.0,
      quantity: 100,
      dateAdded: new Date("2023-04-20"),
    },
    {
      id: 7,
      name: "Laser Cutter",
      category: "Machines",
      price: 500.0,
      quantity: 15,
      dateAdded: new Date("2023-07-15"),
    },
    {
      id: 8,
      name: "Band Saw",
      category: "Machines",
      price: 250.0,
      quantity: 25,
      dateAdded: new Date("2023-08-05"),
    },
  ];
  